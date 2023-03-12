import { ApiProperty } from '@nestjs/swagger';
import { UserData } from '../../auth/type/user-data.type';

export class UserDto {
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
    description: '사용자 사진',
  })
  photo!: string | null;

  static of(data: UserData): UserDto {
    return {
      id: data.id,
      name: data.name,
      photo: data.photo,
    };
  }
}
