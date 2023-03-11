import { Injectable } from '@nestjs/common';
import { MealDto } from './dto/meal.dto';
import { MealRepository } from './meal.repository';
import { CreateMealPayload } from './payload/create-meal.payload';
import { MealCreateInput } from './type/create-meal-input.type';

@Injectable()
export class MealService {
  constructor(private readonly mealRepository: MealRepository) {}

  async createMeal(
    userId: string,
    payload: CreateMealPayload,
  ): Promise<MealDto> {
    const input: MealCreateInput = {
      userId,
      title: payload.title,
      description: payload.description ?? null,
      photo: payload.photo ?? null,
      time: payload.time,
      recipeId: payload.recipeId,
    };

    const meal = this.mealRepository.createMeal(input);
    return meal;
  }
}
