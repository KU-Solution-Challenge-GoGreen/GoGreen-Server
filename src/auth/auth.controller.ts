import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CheckDuplicateDto } from './dto/check-duplicate.dto';
import { RequestWithAuth } from './type/request-with-auth';
import { FirebaseService } from './firebase/firebase.service';
import { UserInfoDto } from './dto/user-info.dto';
import { RegisterPayload } from './payload/register.payload';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject() private readonly firebaseService: FirebaseService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '회원가입합니다.' })
  @ApiOkResponse({ type: UserInfoDto })
  async register(
    @Req() req: RequestWithAuth,
    @Body() createUserPayload: RegisterPayload,
  ): Promise<UserInfoDto> {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException();
    }
    const token = authorization.split('Bearer ')[1];
    const userId = await this.firebaseService.getUsrIdByVerifyToken(token);
    if (!userId) {
      throw new UnauthorizedException();
    }

    return this.authService.register(createUserPayload, userId);
  }

  @Get('name/:name/duplicate')
  @ApiOperation({ summary: '이름이 중복인지 확인합니다.' })
  @ApiOkResponse({
    type: CheckDuplicateDto,
    description: '중복이면 true, 중복이 아니면 false를 반환합니다.',
  })
  async checkDuplicateName(
    @Param('name') name: string,
  ): Promise<CheckDuplicateDto> {
    return CheckDuplicateDto.of(
      await this.authService.checkDuplicateName(name),
    );
  }
}
