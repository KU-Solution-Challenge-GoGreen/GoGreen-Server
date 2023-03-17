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
    const userValid = await this.prisma.meal.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });
    if (!userValid) return null;

    const nameValid = await this.prisma.user.findFirst({
      where: {
        name: data.name,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });
    if (nameValid) return null;

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        photo: data.photo,
      },
    });

    const resData: UserData = {
      id: user.id,
      name: user.name,
      photo: user.photo,
    };
    return resData;
  }
}
