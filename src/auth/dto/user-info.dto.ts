import { ApiProperty } from '@nestjs/swagger';
import { UserInfoWithType } from '../type/user-info-with-type.type';

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

  static of(data: UserInfoWithType): UserInfoDto {
    return {
      id: data.id,
      name: data.name,
      photo: data.photo,
      veganType: {
        id: data.VeganType.id,
        name: data.VeganType.name,
      },
    };
  }
}
