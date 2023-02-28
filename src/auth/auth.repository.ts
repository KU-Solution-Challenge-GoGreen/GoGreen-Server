import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async checkDuplicateName(name: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
      },
    });
    return !!user;
  }
}
