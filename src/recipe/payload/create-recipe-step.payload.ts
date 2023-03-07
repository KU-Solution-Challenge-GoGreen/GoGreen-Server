import { IsDefined, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeStepPayload {
  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: '레시피 단계 description',
  })
  description!: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === undefined ? null : value))
  @ApiProperty({
    type: String,
    description: '레시피 단계 photo',
  })
  photo!: number | null;
}
