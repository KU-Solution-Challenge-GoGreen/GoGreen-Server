import { Injectable, NotFoundException } from '@nestjs/common';
import { MealDto } from './dto/meal.dto';
import { MealRepository } from './meal.repository';
import { CreateMealPayload } from './payload/create-meal.payload';
import { MealCreateInput } from './type/create-meal-input.type';
import { MealSummaryListDto } from './dto/meal-summary.dto';
import { MealSummary } from './type/meal-summary.type';

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
      date: payload.date,
      recipeId: payload.recipeId,
    };

    return this.mealRepository.createMeal(input);
  }
  async getMealById(userId: string, mealId: string): Promise<MealDto> {
    const meal = await this.mealRepository.getMealById(mealId);

    if (!meal) {
      throw new NotFoundException('존재하지 않는 식단ID입니다.');
    }
    return MealDto.of(meal);
  }

  async searchMeal(
    userId: string,
    typeId?: string,
  ): Promise<MealSummaryListDto> {
    const possibleIngredientIds =
      await this.mealRepository.getPossibleIngredientIds(typeId);

    if (possibleIngredientIds.length === 0) {
      throw new NotFoundException('잘못된 vegan type입니다.');
    }

    const meals: MealSummary[] = await this.mealRepository.searchMeal(
      userId,
      possibleIngredientIds,
    );

    return MealSummaryListDto.of(meals);
  }

  async getMealList(userId: string, date: Date): Promise<MealSummaryListDto> {
    await this.validateUserId(userId);
    const meals: MealSummary[] = await this.mealRepository.getMealListByDate(
      userId,
      date,
    );

    return MealSummaryListDto.of(meals);
  }

  private async validateRecipeId(recipeId: string): Promise<void> {
    const isExist = await this.mealRepository.isRecipeExist(recipeId);

    if (!isExist) {
      throw new NotFoundException('존재하지 않는 레시피입니다.');
    }
  }

  private async validateUserId(userId: string): Promise<void> {
    const isExist = await this.mealRepository.isUserExist(userId);
    if (!isExist) {
      throw new NotFoundException('존재하지 않는 User입니다.');
    }
  }
}
