import { ApiProperty } from '@nestjs/swagger';

export class BulkCreateDto {
  @ApiProperty({
    type: Number,
    description: '성공한 데이터 개수',
  })
  count!: number;

  static of(count: number): BulkCreateDto {
    return {
      count,
    };
  }
}
