import {
    IsArray,
    IsDefined,
    IsInt,
    IsString,
    ValidateNested,
  } from 'class-validator';
  import { CreateRecipeStepPayload } from './create-recipe-step.payload';
  import { ApiProperty } from '@nestjs/swagger';
  import { Type } from 'class-transformer';
  
  export class CreateMealPayload {
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
  
    @IsDefined()
    @IsString()
    @ApiProperty({
      type: String,
      description: '식단 설명',
    })
    description: string;

    @IsDefined()
    @IsString()
    @ApiProperty({
      type: String,
      description: '식단 사진',
    })
    photo: string;

    @IsDefined()
    @IsDate()
    @Type((value) => new Date(value))
    @ApiProperty({
      type: Date,
      description: '식단 날짜',
    })
    time!: number;
  }
  