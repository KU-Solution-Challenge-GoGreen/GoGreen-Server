import { ApiProperty } from '@nestjs/swagger';

export class RecipeStepDto {
  @ApiProperty({
    type: String,
    description: '레시피 단계 ID',
  })
  id!: string;

  @ApiProperty({
    type: Number,
    description: '레시피 단계 index from 1',
  })
  index!: number;

  @ApiProperty({
    type: String,
    description: '레시피 단계 description',
  })
  description!: string;

  @ApiProperty({
    type: String,
    description: '레시피 단계 photo',
    nullable: true,
  })
  photo!: string | null;
}
