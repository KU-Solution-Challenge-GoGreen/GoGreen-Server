import { Controller, Get, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('auth')
  @UseGuards(FirebaseAuthGuard)
  getAuthTest(): string {
    return this.appService.getInput('Token Verified!');
  }

  @Get('auth/user')
  @UseGuards(FirebaseAuthGuard)
  getDecoratotTest(@CurrentUser() user): string {
    return this.appService.getInput('User Verified! \nuser : ' + user);
  }
}
