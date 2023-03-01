import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithAuth } from '../type/request-with-auth';
import { UserInfo } from '../type/user-info.type';

export const CurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext): UserInfo => {
    const request: RequestWithAuth = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
