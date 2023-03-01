import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterPayload {
  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: '닉네임',
  })
  name!: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: '비건 타입 Id',
  })
  typeId!: string;
}
