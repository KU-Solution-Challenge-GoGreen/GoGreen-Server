import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { IngredientWithCategory } from '../ingredient/type/ingredient-with-category.type';
import { RecipeCreateInput } from './type/recipe-create-input.type';
import { RecipeWithStep } from './type/recipe-with-step.type';

@Injectable()
export class RecipeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRecipe(data: RecipeCreateInput): Promise<RecipeWithStep> {
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
      // (userId, recipeId)로 unique constraint 안 걸려있어서 배열로 타입이 추정되는 듯.
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
