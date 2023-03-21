import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth/guard/auth.guard';
import { UserDto } from './dto/user.dto';
import { UserDetailDto } from './dto/user-detail.dto';
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

  @Get(':userId')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자의 탄소발자국 관련 정보를 조회합니다.' })
  @ApiOkResponse({ type: UserDetailDto })
  async getUserInfo(@Param('userId') userId: string): Promise<UserDetailDto> {
    return this.userService.getUserInfo(userId);
  }
}
