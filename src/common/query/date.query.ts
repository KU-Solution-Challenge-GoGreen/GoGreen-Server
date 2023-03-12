import { IsDate, IsDefined } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DateQuery {
  @IsDefined()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    type: Date,
    description: '날짜',
    example: '2023-03-19',
  })
  date!: Date;
}
