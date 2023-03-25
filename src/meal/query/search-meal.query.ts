import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchMealQuery {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: '비건 타입',
    nullable: true,
  })
  typeId?: string | null;
}
