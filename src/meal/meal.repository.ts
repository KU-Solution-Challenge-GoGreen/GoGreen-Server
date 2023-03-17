import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateMealInput } from './type/create-meal-input.type';
import { MealData } from './type/meal.type';
import * as _ from 'lodash';
import { MealSummary } from './type/meal-summary.type';
import { UpdateMealInput } from './type/update-meal-input.type';

@Injectable()
export class MealRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMeal(data: CreateMealInput): Promise<MealData> {
    const meal = await this.prisma.meal.create({
      data: {
        title: data.title,
        userId: data.userId,
        recipeId: data.recipeId,
        description: data.description,
        photo: data.photo,
        date: data.date,
      },
      select: {
        id: true,
        title: true,
        userId: true,
        description: true,
        date: true,
        photo: true,
        Recipe: {
          select: {
            id: true,
            name: true,
            carbonFootprint: true,
            Meal: {
              where: {
                userId: data.userId,
              },
              select: {
                photo: true,
              },
            },
          },
        },
      },
    });

    return {
      id: meal.id,
      title: meal.title,
      userId: meal.userId,
      description: meal.description,
      date: meal.date,
      photo: meal.photo,
      carbonFootprint: meal.Recipe.carbonFootprint,
      recipe: {
        id: meal.Recipe.id,
        name: meal.Recipe.name,
        photos: meal.Recipe.Meal.map((m) => m.photo).filter(
          (photo) => photo !== null,
        ) as string[],
      },
    };
  }

  async updateMeal(mealId: string, data: UpdateMealInput): Promise<MealData> {
    await this.prisma.meal.update({
      where: {
        id: mealId,
      },
      data: {
        title: data.title,
        recipeId: data.recipeId,
        description: data.description,
        photo: data.photo,
        date: data.date,
      },
      select: null,
    });

    const updatedMeal = await this.getMealById(mealId);
    return updatedMeal!;
  }

  async getMealById(mealId: string): Promise<MealData | null> {
    const meal = await this.prisma.meal.findUnique({
      where: {
        id: mealId,
      },
      select: {
        id: true,
        title: true,
        userId: true,
        description: true,
        date: true,
        photo: true,
        Recipe: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
    });

    if (!meal) return null;

    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id: meal.Recipe.id,
      },
      select: {
        id: true,
        name: true,
        carbonFootprint: true,
        Meal: {
          where: {
            userId: meal.Recipe.userId,
          },
          select: {
            photo: true,
          },
        },
      },
    });

    return {
      id: meal.id,
      title: meal.title,
      userId: meal.userId,
      description: meal.description,
      date: meal.date,
      photo: meal.photo,
      carbonFootprint: recipe!.carbonFootprint,
      recipe: {
        id: recipe!.id,
        name: recipe!.name,
        photos: recipe!.Meal.map((m) => m.photo).filter(
          (photo) => photo !== null,
        ) as string[],
      },
    };
  }

  async searchMeal(
    userId: string,
    ingredientIds: string[],
  ): Promise<MealSummary[]> {
    const meals = await this.prisma.meal.findMany({
      where: {
        userId: {
          not: userId,
        },
        Recipe: {
          RecipeIngredient: {
            every: {
              ingredientId: {
                in: ingredientIds,
              },
            },
          },
        },
      },
      select: {
        id: true,
        title: true,
        userId: true,
        description: true,
        date: true,
        photo: true,
        Recipe: {
          select: {
            id: true,
            name: true,
            carbonFootprint: true,
            RecipeIngredient: {
              select: {
                Ingredient: {
                  select: {
                    categoryId: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return meals.map((meal) => ({
      id: meal.id,
      title: meal.title,
      userId: meal.userId,
      description: meal.description,
      date: meal.date,
      photo: meal.photo,

      recipe: {
        name: meal.Recipe.name,
        carbonFootprint: meal.Recipe.carbonFootprint,
      },
      // 재료 카테고리만 가져와서 중복 제거
      categories: _.uniqBy(
        meal.Recipe.RecipeIngredient,
        'Ingredient.categoryId',
      ).map((ingredient) => ingredient.Ingredient.categoryId),
    }));
  }

  async getPossibleIngredientIds(typeId?: string): Promise<string[]> {
    const ingredients = await this.prisma.veganType.findUnique({
      where: {
        id: typeId,
      },
      select: {
        VeganTypeIngredientCategory: {
          select: {
            IngredientCategory: {
              select: {
                Ingredient: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return ingredients!.VeganTypeIngredientCategory.flatMap((category) =>
      category.IngredientCategory.Ingredient.map((i) => i.id),
    );
  }

  async getMealListByDate(userId: string, date: Date): Promise<MealSummary[]> {
    const meals = await this.prisma.meal.findMany({
      where: {
        userId: userId,
        date,
      },
      select: {
        id: true,
        title: true,
        userId: true,
        description: true,
        date: true,
        photo: true,
        Recipe: {
          select: {
            id: true,
            name: true,
            carbonFootprint: true,
            RecipeIngredient: {
              select: {
                Ingredient: {
                  select: {
                    categoryId: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return meals.map((meal) => ({
      id: meal.id,
      title: meal.title,
      userId: meal.userId,
      description: meal.description,
      date: meal.date,
      photo: meal.photo,
      recipe: {
        name: meal.Recipe.name,
        carbonFootprint: meal.Recipe.carbonFootprint,
      },
      // 재료 카테고리만 가져와서 중복 제거
      categories: _.uniqBy(
        meal.Recipe.RecipeIngredient,
        'Ingredient.categoryId',
      ).map((ingredient) => ingredient.Ingredient.categoryId),
    }));
  }

  async isRecipeExist(mealId: string): Promise<boolean> {
    const recipe = await this.prisma.recipe.findFirst({
      where: {
        id: mealId,
        deletedAt: null,
      },
    });

    return !!recipe;
  }

  async isUserExist(userId: string): Promise<boolean> {
    return this.prisma.user
      .count({
        where: {
          id: userId,
          deletedAt: null,
        },
      })
      .then((count) => count > 0);
  }

  async getAuthorId(mealId: string): Promise<string> {
    const meal = await this.prisma.meal.findUnique({
      where: {
        id: mealId,
      },
      select: {
        userId: true,
      },
    });

    return meal!.userId;
  }
}
