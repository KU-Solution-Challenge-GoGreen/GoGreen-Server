import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MealService } from './meal.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MealDto } from './dto/meal.dto';
import { FirebaseAuthGuard } from 'src/auth/guard/auth.guard';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { UserData } from 'src/auth/type/user-data.type';
import { MealPayload } from './payload/meal.payload';
import { MealSummaryListDto } from './dto/meal-summary.dto';
import { SearchMealQuery } from './query/search-meal.query';
import { DateQuery } from '../common/query/date.query';

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
    @Body() payload: MealPayload,
  ): Promise<MealDto> {
    return this.mealService.createMeal(user.id, payload);
  }

  @Get(':mealId')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '식단 ID로 조회' })
  @ApiOkResponse({ type: MealDto })
  async getRecipeById(
    @CurrentUser() user: UserData,
    @Param('mealId') mealId: string,
  ): Promise<MealDto> {
    return this.mealService.getMealById(user.id, mealId);
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '식단 검색하기' })
  @ApiOkResponse({ type: MealSummaryListDto })
  async searchMeal(
    @CurrentUser() user: UserData,
    @Query() query: SearchMealQuery,
  ): Promise<MealSummaryListDto> {
    return this.mealService.searchMeal(user.id, query.typeId);
  }

  @Get('users/:userId')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '특정 유저의 식단 리스트' })
  @ApiOkResponse({ type: MealSummaryListDto })
  async getMealList(
    @Param('userId') userId: string,
    @Query() query: DateQuery,
  ): Promise<MealSummaryListDto> {
    return this.mealService.getMealList(userId, query.date);
  }

  @Put(':mealId')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '식단 수정하기' })
  @ApiOkResponse({ type: MealDto })
  async updateMeal(
    @CurrentUser() user: UserData,
    @Param('mealId') mealId: string,
    @Body() payload: MealPayload,
  ): Promise<MealDto> {
    return this.mealService.updateMeal(user.id, mealId, payload);
  }
}
