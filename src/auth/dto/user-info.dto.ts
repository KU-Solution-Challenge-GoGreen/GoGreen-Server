import { ApiProperty } from '@nestjs/swagger';
import { UserData } from '../type/user-data.type';

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
    type: String,
    description: '유저 사진',
  })
  photo!: string | null;

  static of(data: UserData): UserInfoDto {
    return {
      id: data.id,
      name: data.name,
      photo: data.photo,
    };
  }
}
