import { ApiProperty } from '@nestjs/swagger';

class VeganTypeDto {
  @ApiProperty({
    type: String,
    description: '비건 타입 Id',
  })
  id!: string;

  @ApiProperty({
    type: String,
    description: '비건 타입 이름',
  })
  name!: string;
}

export class UserInfoDto {
  @ApiProperty({
    type: String,
    description: '유저 Id',
  })
  id!: string;

  @ApiProperty({
    type: String,
    description: '닉네임',
  })
  name!: string;

  @ApiProperty({
    type: VeganTypeDto,
    description: '비건 타입',
  })
  veganType!: VeganTypeDto;

  @ApiProperty({
    type: String,
    description: '유저 사진',
  })
  photo!: string | null;
}
