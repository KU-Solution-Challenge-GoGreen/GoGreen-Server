import { Controller } from '@nestjs/common';
import { MealService } from './meal.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('meals')
@ApiTags('Meal API')
export class MealController {
  constructor(private readonly mealService: MealService) {}
}
