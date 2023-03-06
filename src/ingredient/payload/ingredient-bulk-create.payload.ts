import {
  IsArray,
  IsDefined,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class IngredientCreatePayload {
  @IsDefined()
  @IsString()
  @ApiProperty({
    description: '재료 이름',
    type: String,
  })
  name!: string;

  @IsDefined()
  @IsNumber()
  @ApiProperty({
    description: '탄소발자국',
    type: Number,
  })
  carbonFootprint!: number;

  @IsDefined()
  @IsString()
  @ApiProperty({
    description: '카테고리 ID',
    type: String,
  })
  categoryId!: string;
}

export class IngredientBulkCreatePayload {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientCreatePayload)
  @ApiProperty({
    description: '등록하려는 재료 목록',
    type: [IngredientCreatePayload],
  })
  ingredientList!: IngredientCreatePayload[];
}
