import { Injectable, NotFoundException } from '@nestjs/common';
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
    await this.validateRecipeId(payload.recipeId);

    const input: MealCreateInput = {
      userId,
      title: payload.title,
      description: payload.description ?? null,
      photo: payload.photo ?? null,
      time: payload.time,
      recipeId: payload.recipeId,
    };

    const meal = await this.mealRepository.createMeal(input);
    return MealDto.of(meal);
  }

  private async validateRecipeId(recipeId: string): Promise<void> {
    const isExist = await this.mealRepository.isMealExist(recipeId);

    if (!isExist) {
      throw new NotFoundException('존재하지 않는 레시피입니다.');
    }
  }
}
