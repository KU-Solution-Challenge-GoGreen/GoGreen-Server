import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserPayload } from './payload/user.payload';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUser(userId: string, payload: UserPayload) {
    const user = await this.userRepository.updateUser(userId, payload);
    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }
    return UserDto.of(user);
  }
}
