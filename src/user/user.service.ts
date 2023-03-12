import { ConflictException, Injectable } from '@nestjs/common';
import { UserPayload } from './payload/user.payload';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUser(userId: string, payload: UserPayload) {
    return await this.userRepository.updateUser(userId, payload);
  }
}
