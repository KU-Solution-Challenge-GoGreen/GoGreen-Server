import { Controller, Get, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/guard/auth.guard';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Root API')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('auth')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  async getAuthTest(): Promise<string> {
    return this.appService.getInput('Token Verified!');
  }

  @Get('auth/user')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  getDecoratotTest(@CurrentUser() user): string {
    return this.appService.getInput('User Verified! \nuser : ' + user);
  }
}
