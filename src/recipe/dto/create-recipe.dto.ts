import { IngredientDto } from '../../ingredient/dto/category-with-ingredient-list.dto';
import { IngredientCategoryDto } from '../../ingredient/dto/ingredient-with-category.dto';
import { RecipeStepDto } from './recipe-step.dto';
import { ApiProperty } from '@nestjs/swagger';
import { RecipeData } from '../type/recipe-data.type';
import { IngredientWithCategory } from '../../ingredient/type/ingredient-with-category.type';
import * as _ from 'lodash';

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

  static of(
    recipe: RecipeData,
    ingredients: IngredientWithCategory[],
  ): CreateRecipeDto {
    return {
      id: recipe.id,
      userId: recipe.userId,
      name: recipe.name,
      carbonFootprint: recipe.carbonFootprint,
      duration: recipe.duration,
      ingredients: ingredients.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        carbonFootprint: ingredient.carbonFootprint,
      })),
      //ingredient 안의 IngredientCategory.id를 뽑아서 중복을 제거
      categories: _.uniqBy(ingredients, 'IngredientCategory.id').map(
        (ingredient) => ingredient.IngredientCategory,
      ),
      steps: recipe.steps.map((step) => ({
        id: step.id,
        index: step.index,
        description: step.description,
        photo: step.photo,
      })),
    };
  }
}
