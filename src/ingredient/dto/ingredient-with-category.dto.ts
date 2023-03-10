import { ApiProperty } from '@nestjs/swagger';
import { IngredientWithCategory } from '../type/ingredient-with-category.type';

export class IngredientCategoryDto {
  @ApiProperty({
    type: String,
    description: '재료 카테고리 ID',
  })
  id!: string;

  @ApiProperty({
    type: String,
    description: '재료 카테고리 이름',
  })
  name!: string;
}

export class IngredientWithCategoryDto {
  @ApiProperty({
    type: String,
    description: '재료 ID',
  })
  id!: string;

  @ApiProperty({
    type: String,
    description: '재료 이름',
  })
  name!: string;

  @ApiProperty({
    type: Number,
    description: '탄소발자국',
  })
  carbonFootprint!: number;

  @ApiProperty({
    type: IngredientCategoryDto,
    description: '카테고리 정보',
  })
  category!: IngredientCategoryDto;

  static of(ingredient: IngredientWithCategory): IngredientWithCategoryDto {
    return {
      id: ingredient.id,
      name: ingredient.name,
      carbonFootprint: ingredient.carbonFootprint,
      category: {
        id: ingredient.IngredientCategory.id,
        name: ingredient.IngredientCategory.name,
      },
    };
  }
}
