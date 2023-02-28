import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service'; // DELETED

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {} // TODO : Firebase Admin

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const headerToken = request.headers['authorization'];
      if (!headerToken) {
        return false;
      }
      const token = headerToken.split('Bearer ')[1];
      const user = await this.firebaseService.verifyToken(token);
      console.log('user : ', user);
      if (user === 'error') {
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
