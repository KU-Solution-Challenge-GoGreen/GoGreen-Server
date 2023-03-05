import { UserInfo } from './user-info.type';

export type RequestWithAuth = Request & {
  headers: {
    authorization?: string;
  };
  user: UserInfo;
};
