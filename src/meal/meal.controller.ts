import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MealService } from './meal.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MealDto } from './dto/meal.dto';
import { FirebaseAuthGuard } from 'src/auth/guard/auth.guard';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { UserData } from 'src/auth/type/user-data.type';
import { CreateMealPayload } from './payload/create-meal.payload';
import { CreateRecipeDto } from 'src/recipe/dto/create-recipe.dto';

@Controller('meals')
@ApiTags('Meal API')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '식단 등록하기' })
  @ApiCreatedResponse({ type: MealDto })
  async createMeal(
    @CurrentUser() user: UserData,
    @Body() payload: CreateMealPayload,
  ): Promise<MealDto> {
    return this.mealService.createMeal(user.id, payload);
  }
}
