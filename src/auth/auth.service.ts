import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterPayload } from './payload/register.payload';
import { UserInfoWithType } from './type/user-info-with-type.type';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(
    payload: RegisterPayload,
    userId: string,
  ): Promise<UserInfoWithType> {
    const [isDuplicateName, isUserExist, isVeganTypeValid] = await Promise.all([
      this.authRepository.checkDuplicateName(payload.name),
      this.authRepository.isUserExist(userId),
      this.authRepository.isVeganTypeValid(payload.typeId),
    ]);

    if (isDuplicateName) {
      throw new ConflictException('이미 존재하는 이름입니다.');
    }

    if (isUserExist) {
      throw new ConflictException('이미 존재하는 사용자입니다.');
    }

    if (!isVeganTypeValid) {
      throw new NotFoundException('존재하지 않는 비건유형입니다.');
    }

    return this.authRepository.register({
      id: userId,
      name: payload.name,
      typeId: payload.typeId,
    });
  }

  async checkDuplicateName(name: string): Promise<boolean> {
    return this.authRepository.checkDuplicateName(name);
  }
}
