import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CheckDuplicateDto } from './dto/check-duplicate.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
