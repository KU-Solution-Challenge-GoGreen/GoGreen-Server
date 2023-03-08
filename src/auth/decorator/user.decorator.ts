import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithAuth } from '../type/request-with.auth.type';
import { UserData } from '../type/user-data.type';

export const CurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext): UserData => {
    const request: RequestWithAuth = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
