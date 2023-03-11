import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { MealCreateInput } from './type/create-meal-input.type';
import { MealData } from './type/meal.type';

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
      recipe: {
        id: meal.Recipe.id,
        name: meal.Recipe.name,
        photos: meal.Recipe.Meal.map((m) => m.photo).filter(
          (photo) => photo !== null,
        ) as string[],
      },
    };
  }
}
