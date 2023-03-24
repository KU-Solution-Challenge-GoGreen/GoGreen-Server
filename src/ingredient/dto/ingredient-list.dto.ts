import { IngredientDto } from './category-with-ingredient-list.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from '../type/ingredient.type';

export class IngredientListDto {
  @ApiProperty({
    type: [IngredientDto],
    description: '재료 리스트',
  })
  ingredientList!: IngredientDto[];

  static of(ingredientList: Ingredient[]): IngredientListDto {
    return {
      ingredientList: ingredientList.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        carbonFootprint: ingredient.carbonFootprint,
      })),
    };
  }
}
