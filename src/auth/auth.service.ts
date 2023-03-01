import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterPayload } from './payload/register.payload';
import { UserInfo } from './type/user-info.type';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(payload: RegisterPayload, userId: string): Promise<UserInfo> {
    return {} as any;
  }

  async checkDuplicateName(name: string): Promise<boolean> {
    return this.authRepository.checkDuplicateName(name);
  }
}
