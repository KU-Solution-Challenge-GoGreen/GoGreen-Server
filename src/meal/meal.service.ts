import { Injectable } from '@nestjs/common';
import { MealRepository } from './meal.repository';

@Injectable()
export class MealService {
  constructor(private readonly mealRepository: MealRepository) {}
}
