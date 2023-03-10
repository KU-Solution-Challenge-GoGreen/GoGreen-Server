import { ApiProperty } from '@nestjs/swagger';

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
