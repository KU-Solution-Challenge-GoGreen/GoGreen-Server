import { UserData } from './user-data.type';

export type RequestWithAuth = Request & {
  headers: {
    authorization?: string;
  };
  user: UserData;
};
