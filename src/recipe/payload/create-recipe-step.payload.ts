import { IsDefined, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @ApiPropertyOptional({
    type: String,
    description: '레시피 단계 photo',
    nullable: true,
  })
  photo?: string | null;
}
