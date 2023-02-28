import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';
import { PrismaService } from '../common/services/prisma.service';
import { UserInfo } from './type/user-info.type';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headerToken = request.headers['Authorization'];
    if (!headerToken) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    const token = headerToken.split('Bearer ')[1];
    const userId = await this.firebaseService.getUsrIdByVerifyToken(token);
    if (!userId) {
      throw new UnauthorizedException('잘못된 토큰 방식입니다.');
    }

    const user: UserInfo | null = await this.prisma.user.findFirst({
      where: {
        deletedAt: null,
        id: userId,
      },
      select: {
        id: true,
        typeId: true,
        name: true,
        photo: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    request.user = userId;
    return true;
  }
}
