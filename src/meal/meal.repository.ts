import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { MealCreateInput } from './type/create-meal-input.type';
import { MealData } from './type/meal.type';
import * as _ from 'lodash';
import { MealSummary } from './type/meal-summary.type';

@Injectable()
export class MealRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMeal(data: MealCreateInput): Promise<MealData> {
    const meal = await this.prisma.meal.create({
      data: {
        title: data.title,
        userId: data.userId,
        recipeId: data.recipeId,
        description: data.description,
        photo: data.photo,
        time: data.time,
      },
      select: {
        id: true,
        title: true,
        userId: true,
        description: true,
        time: true,
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
      time: meal.time,
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

  async getMealById(mealId: string, userId: string): Promise<MealData | null> {
    const meal = await this.prisma.meal.findUnique({
      where: {
        id: mealId,
      },
      select: {
        id: true,
        title: true,
        userId: true,
        description: true,
        time: true,
        photo: true,
        Recipe: {
          select: {
            id: true,
            name: true,
            carbonFootprint: true,
            Meal: {
              where: {
                userId: userId,
              },
              select: {
                photo: true,
              },
            },
          },
        },
      },
    });

    if (!meal) return null;

    return {
      id: meal.id,
      title: meal.title,
      userId: meal.userId,
      description: meal.description,
      time: meal.time,
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
        time: true,
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
      time: meal.time,
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

  async isRecipeExist(mealId: string): Promise<boolean> {
    const recipe = await this.prisma.recipe.findFirst({
      where: {
        id: mealId,
        deletedAt: null,
      },
    });

    return !!recipe;
  }
}
