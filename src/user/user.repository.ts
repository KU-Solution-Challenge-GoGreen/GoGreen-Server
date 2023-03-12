import { Injectable } from '@nestjs/common';
import { UserData } from 'src/auth/type/user-data.type';
import { PrismaService } from '../common/services/prisma.service';
import { UserPayload } from './payload/user.payload';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(
    userId: string,
    data: UserPayload,
  ): Promise<UserData | null> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        photo: data.photo,
      },
    });
    return user;
  }
}
