import { ApiProperty } from '@nestjs/swagger';
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
  memo!: string | null;

  @ApiProperty({
    type: String,
    description: '레시피 탄소발자국',
  })
  carbonFootprint!: number;

  @ApiProperty({
    type: String,
    description: '식단 사진',
    nullable: true,
  })
  photo!: string | null;

  @ApiProperty({
    type: Date,
    description: '식단 날짜',
  })
  date!: Date;

  static of(meal: MealData): MealDto {
    const { id, title, userId, memo, recipe, date, photo, carbonFootprint } =
      meal;
    return {
      id,
      title,
      userId,
      memo,
      recipe,
      photo,
      date,
      carbonFootprint,
    };
  }
}
