import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'; // DELETED

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // TODO : Firebase Admin

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const result = true;
    const request = context.switchToHttp().getRequest();
    const headerToken = request.headers['authorization'];
    if (!headerToken) {
      return false;
    }
    const token = headerToken.split('Bearer ')[1];
    console.log('header : ', headerToken);
    console.log('token : ', token);
    // TODO : functions to authorize request -> assign to result
    return result;
  }
}
