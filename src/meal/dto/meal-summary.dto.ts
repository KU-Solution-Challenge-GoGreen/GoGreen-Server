import { ApiProperty } from '@nestjs/swagger';

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
  categories!: string[];

  @ApiProperty({
    type: String,
    description: '식단 썸네일 사진',
    nullable: true,
  })
  photo!: string | null;

  @ApiProperty({
    type: Date,
    description: '식단 작성 시간',
  })
  time!: Date;
}
