import { ApiProperty } from '@nestjs/swagger';

export class CheckDuplicateDto {
  @ApiProperty({
    description: '중복이면 true, 중복이 아니면 false를 반환합니다.',
    type: Boolean,
  })
  isDuplicated!: boolean;

  static of(isDuplicated: boolean): CheckDuplicateDto {
    return {
      isDuplicated,
    };
  }
}
