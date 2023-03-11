import { ApiProperty } from '@nestjs/swagger';
import { IngredientDto } from '../../ingredient/dto/category-with-ingredient-list.dto';
import { IngredientCategoryDto } from '../../ingredient/dto/ingredient-with-category.dto';
import { RecipeStepDto } from './recipe-step.dto';
import { RecipeDetail } from '../type/recipe-detail.type';
import * as _ from 'lodash';

export class RecipeDto {
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
  @ApiProperty({
    type: [String],
    description: '썸네일 사진 List',
  })
  photos!: string[];

  @ApiProperty({
    type: Boolean,
    description: '북마크 여부',
  })
  isBookmarked!: boolean;

  static of(recipe: RecipeDetail): RecipeDto {
    return {
      id: recipe.id,
      userId: recipe.userId,
      name: recipe.name,
      carbonFootprint: recipe.carbonFootprint,
      duration: recipe.duration,
      ingredients: recipe.ingredients,
      categories: _.uniqBy(recipe.ingredients, 'IngredientCategory.id').map(
        (ingredient) => ingredient.IngredientCategory,
      ),
      steps: recipe.steps,
      photos: recipe.photos,
      isBookmarked: recipe.isBookmarked,
    };
  }
}
