import { ApiProperty } from '@nestjs/swagger';
import { MealSummary } from '../type/meal-summary.type';

export class MealSummaryDto {
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
    description: '레시피 이름',
  })
  recipeName!: string;

  @ApiProperty({
    type: String,
    description: '재료 카테고리 리스트',
  })
  categoryIds!: string[];

  @ApiProperty({
    type: String,
    description: '식단 썸네일 사진',
    nullable: true,
  })
  photo!: string | null;

  @ApiProperty({
    type: Date,
    description: '식단 날짜',
  })
  date!: Date;

  @ApiProperty({
    type: Number,
    description: '탄소 발자국',
  })
  carbonFootprint!: number;
}

export class MealSummaryListDto {
  @ApiProperty({
    type: [MealSummaryDto],
    description: '식단 Summary List',
  })
  meals!: MealSummaryDto[];

  static of(meals: MealSummary[]): MealSummaryListDto {
    return {
      meals: meals.map((meal) => ({
        id: meal.id,
        userId: meal.userId,
        title: meal.title,
        description: meal.description,
        recipeName: meal.recipe.name,
        categoryIds: meal.categories,
        photo: meal.photo,
        date: meal.date,
        carbonFootprint: meal.recipe.carbonFootprint,
      })),
    };
  }
}
