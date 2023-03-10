import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { IngredientWithCategory } from '../ingredient/type/ingredient-with-category.type';
import { RecipeCreateInput } from './type/recipe-create-input.type';
import { RecipeData } from './type/recipe-data.type';
import { RecipeDetail } from './type/recipe-detail.type';
import { RecipeSummary } from './type/recipe-summary.type';

@Injectable()
export class RecipeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRecipe(data: RecipeCreateInput): Promise<RecipeData> {
    const recipe = await this.prisma.recipe.create({
      data: {
        name: data.name,
        duration: data.duration,
        carbonFootprint: data.carbonFootprint,
        RecipeStep: {
          createMany: {
            data: data.steps,
          },
        },
        userId: data.userId,
        RecipeIngredient: {
          createMany: {
            data: data.ingredientIds.map((ingredientId) => ({
              ingredientId,
            })),
          },
        },
      },
      select: {
        id: true,
        name: true,
        duration: true,
        carbonFootprint: true,
        userId: true,
        RecipeStep: {
          select: {
            id: true,
            description: true,
            index: true,
            photo: true,
          },
        },
      },
    });

    return {
      id: recipe.id,
      name: recipe.name,
      duration: recipe.duration,
      carbonFootprint: recipe.carbonFootprint,
      userId: recipe.userId,
      steps: recipe.RecipeStep.map((step) => ({
        id: step.id,
        description: step.description,
        index: step.index,
        photo: step.photo,
      })),
    };
  }

  async isRecipeExist(recipeId: string): Promise<boolean> {
    return (
      (await this.prisma.recipe.count({
        where: {
          id: recipeId,
          deletedAt: null,
        },
      })) > 0
    );
  }

  async toggleRecipeBookmark(
    userId: string,
    recipeId: string,
  ): Promise<boolean> {
    //bookmark되어있으면 삭제, 아니면 생성
    const bookmark = await this.prisma.recipeBookmark.findFirst({
      where: {
        userId,
        recipeId,
      },
      select: {
        id: true,
      },
    });

    if (bookmark) {
      await this.prisma.recipeBookmark.delete({
        where: {
          id: bookmark.id,
        },
      });
    } else {
      await this.prisma.recipeBookmark.create({
        data: {
          userId,
          recipeId,
        },
      });
    }

    return !bookmark;
  }

  async getRecipeById(id: string, userId): Promise<RecipeDetail | null> {
    const recipe = await this.prisma.recipe.findFirst({
      where: {
        id,

        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        duration: true,
        carbonFootprint: true,
        userId: true,
        Meal: {
          where: {
            userId,
          },
          select: {
            photo: true,
          },
        },
        RecipeBookmark: {
          where: {
            userId,
          },
          select: {
            id: true,
          },
        },
        RecipeStep: {
          select: {
            id: true,
            description: true,
            index: true,
            photo: true,
          },
        },
        RecipeIngredient: {
          select: {
            Ingredient: {
              select: {
                id: true,
                name: true,
                carbonFootprint: true,
                IngredientCategory: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return (
      recipe && {
        id: recipe.id,
        name: recipe.name,
        duration: recipe.duration,
        carbonFootprint: recipe.carbonFootprint,
        userId: recipe.userId,
        isBookmarked: recipe.RecipeBookmark.length > 0,
        steps: recipe.RecipeStep.map((step) => ({
          id: step.id,
          description: step.description,
          index: step.index,
          photo: step.photo,
        })),
        ingredients: recipe.RecipeIngredient.map(
          (recipeIngredient) => recipeIngredient.Ingredient,
        ),
        // photo가 null이 아닌 경우만 배열에 담아서 photos에 넘겨줌
        photos: recipe.Meal.map((meal) => meal.photo).filter(
          (photo) => photo !== null,
        ) as string[],
      }
    );
  }

  async getRecipeSummaryByUserId(userId: string): Promise<RecipeSummary[]> {
    const recipes = await this.prisma.recipe.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        Meal: {
          select: {
            photo: true,
          },
        },
      },
    });

    return recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      photos: recipe.Meal.map((meal) => meal.photo).filter(
        (photo) => photo !== null,
      ) as string[],
    }));
  }

  async getIngredientsByIds(ids: string[]): Promise<IngredientWithCategory[]> {
    return this.prisma.ingredient.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        name: true,
        carbonFootprint: true,
        IngredientCategory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
