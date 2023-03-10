import { ApiProperty } from '@nestjs/swagger';
import { RecipeSummary } from '../type/recipe-summary.type';

export class RecipeSummaryDto {
  @ApiProperty({
    type: String,
    description: '레시피 ID',
  })
  id!: string;

  @ApiProperty({
    type: String,
    description: '레시피 이름',
  })
  name!: string;

  @ApiProperty({
    type: [String],
    description: '레시피 썸네일 사진 List',
  })
  photos!: string[];
}

export class RecipeSummaryListDto {
  @ApiProperty({
    type: [RecipeSummaryDto],
    description: '레시피 Summary List',
  })
  recipes!: RecipeSummaryDto[];

  static of(recipes: RecipeSummary[]): RecipeSummaryListDto {
    return {
      recipes: recipes.map((recipe) => ({
        id: recipe.id,
        name: recipe.name,
        photos: recipe.photos,
      })),
    };
  }
}
