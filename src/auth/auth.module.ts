import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
