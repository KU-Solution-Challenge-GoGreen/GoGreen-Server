import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchMealQuery {
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: '비건 타입',
  })
  typeId?: string;
}
