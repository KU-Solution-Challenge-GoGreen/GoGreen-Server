import { IsDefined, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserPayload {
  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: '닉네임',
  })
  name!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: '사용자 사진',
  })
  photo?: string | null;
}
