import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { MealRepository } from './meal.repository';

@Module({
  controllers: [MealController],
  providers: [MealService, MealRepository],
})
export class MealModule {}
