import { IsDate, IsDefined, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class MealPayload {
  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: '레시피 ID',
  })
  recipeId!: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: '식단 이름',
  })
  title!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: '식단 설명',
    nullable: true,
  })
  memo?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: '식단 사진',
    nullable: true,
  })
  photo?: string | null;

  @IsDefined()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    type: Date,
    description: '식단 날짜',
  })
  date!: Date;
}
