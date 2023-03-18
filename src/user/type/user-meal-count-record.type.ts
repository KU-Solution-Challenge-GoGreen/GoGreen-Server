import { ApiProperty } from '@nestjs/swagger';

export class UserMealCount {
  @ApiProperty({
    type: Date,
    description: '날짜',
  })
  date!: Date;

  @ApiProperty({
    type: String,
    description: '채식 횟수',
  })
  count!: number;
}

export class UserMealCountRecord {
  @ApiProperty({
    type: [UserMealCount],
    description: '식단 횟수 기록',
  })
  mealRecord!: UserMealCount[];
}
