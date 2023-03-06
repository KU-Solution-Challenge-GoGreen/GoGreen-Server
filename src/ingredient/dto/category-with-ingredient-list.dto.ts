import { ApiProperty } from '@nestjs/swagger';

export class IngredientDto {
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
}

export class CategoryWithIngredientListDto {
  @ApiProperty({
    type: String,
    description: '카테고리 ID',
  })
  id!: string;

  @ApiProperty({
    type: String,
    description: '카테고리 이름',
  })
  name!: string;

  @ApiProperty({
    type: [IngredientDto],
    description: '카테고리에 속한 재료 리스트',
  })
  ingredientList!: IngredientDto[];
}
