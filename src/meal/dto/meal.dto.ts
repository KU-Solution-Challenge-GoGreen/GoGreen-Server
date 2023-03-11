import { ApiProperty } from '@nestjs/swagger';
import { number } from 'joi';
import * as _ from 'lodash';
import { RecipeSummaryDto } from 'src/recipe/dto/recipe-summary.dto';
import { MealData } from '../type/meal.type';

export class MealDto {
  @ApiProperty({
    type: String,
    description: '식단 ID',
  })
  id!: string;

  @ApiProperty({
    type: String,
    description: '식단 작성자 ID',
  })
  userId!: string;

  @ApiProperty({
    type: RecipeSummaryDto,
    description: '레시피 상세정보',
  })
  recipe!: RecipeSummaryDto;

  @ApiProperty({
    type: String,
    description: '식단 이름',
  })
  title!: string;

  @ApiProperty({
    type: String,
    description: '식단 설명',
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    type: String,
    description: '식단 사진',
  })
  photo!: string | null;

  @ApiProperty({
    type: Date,
    description: '식단 시간',
  })
  time!: Date;

  static of(meal: MealData): MealDto {
    const { id, title, userId, description, recipe, time, photo } = meal;
    return { id, title, userId, description, recipe, photo, time };
  }
}
