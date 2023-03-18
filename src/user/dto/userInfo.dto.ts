import { ApiProperty } from '@nestjs/swagger';
import { UserMealCountRecord } from '../type/user-meal-count-record.type';

export class UserMealCountDto {
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

export class UserInfoDto {
  // 사용자의 id
  @ApiProperty({
    type: String,
    description: '유저 Id',
  })
  id!: string;

  // 사용자의 name
  @ApiProperty({
    type: String,
    description: '닉네임',
  })
  name!: string;

  // 사용자의 photo
  @ApiProperty({
    type: String,
    description: '사용자 사진',
  })
  photo!: string | null;

  // 사용자의 6개월치 채식 횟수
  @ApiProperty({
    type: [UserMealCountDto],
    description: '6개월동안의 채식 횟수 기록',
  })
  mealCount!: UserMealCountDto[];

  // 사용자의 6개월치 탄소발자국 평균
  @ApiProperty({
    type: Number,
    description: '6개월동안의 탄소발자국 평균',
  })
  avgFootprint!: number;

  // 사용자의 가입 경과일수
  @ApiProperty({
    type: Number,
    description: '가입 경과일',
  })
  sinceSignUp!: number;
}
