import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { RegisterData } from './type/register-data.type';
import { UserData } from './type/user-data.type';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: RegisterData): Promise<UserData> {
    return this.prisma.user.create({
      data: {
        id: data.id,
        name: data.name,
      },
      select: {
        id: true,
        name: true,
        photo: true,
      },
    });
  }

  async isUserExist(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
    });

    return !!user;
  }
  async checkDuplicateName(name: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        name,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });
    return !!user;
  }
}
