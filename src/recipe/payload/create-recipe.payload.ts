import {
  IsArray,
  IsDefined,
  IsInt,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreateRecipeStepPayload } from './create-recipe-step.payload';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipePayload {
  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: '레시피 이름',
  })
  name!: string;

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    description: '레시피에 포함된 재료 ID List',
  })
  ingredientIds!: string[];

  @IsDefined()
  @IsInt()
  @ApiProperty({
    type: Number,
    description: '레시피 소요시간',
  })
  duration!: number;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({
    type: [CreateRecipeStepPayload],
    description: '레시피 단계',
  })
  steps!: CreateRecipeStepPayload[];
}
