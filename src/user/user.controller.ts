import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { FirebaseAuthGuard } from 'src/auth/guard/auth.guard';
import { UserData } from 'src/auth/type/user-data.type';
import { UserDto } from './dto/user.dto';
import { UserPayload } from './payload/user.payload';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('User API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':userId')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자 정보를 수정합니다.' })
  @ApiCreatedResponse({ type: UserDto })
  async updateUser(
    @Param('userId') userId: string,
    @Body() payload: UserPayload,
  ): Promise<UserDto> {
    return this.userService.updateUser(userId, payload);
  }
}
