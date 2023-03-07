import { IngredientDto } from '../../ingredient/dto/category-with-ingredient-list.dto';
import { IngredientCategoryDto } from '../../ingredient/dto/ingredient-with-category.dto';
import { RecipeStepDto } from './recipe-step.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({
    type: String,
    description: '레시피 ID',
  })
  id!: string;

  @ApiProperty({
    type: String,
    description: '레시피 작성자 ID',
  })
  userId!: string;

  @ApiProperty({
    type: String,
    description: '레시피 이름',
  })
  name!: string;

  @ApiProperty({
    type: String,
    description: '레시피 탄소발자국',
  })
  carbonFootprint!: number;

  @ApiProperty({
    type: Number,
    description: '레시피 소요시간',
  })
  duration!: number;

  @ApiProperty({
    type: [IngredientDto],
    description: '레시피 재료 List',
  })
  ingredients!: IngredientDto[];

  @ApiProperty({
    type: [IngredientCategoryDto],
    description: '레시피에 포함된 재료 카테고리 List',
  })
  categories!: IngredientCategoryDto[];

  @ApiProperty({
    type: [RecipeStepDto],
    description: '레시피 단계',
  })
  steps!: RecipeStepDto[];
}
