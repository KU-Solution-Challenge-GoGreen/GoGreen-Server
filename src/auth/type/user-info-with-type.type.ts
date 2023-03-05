export type UserInfoWithType = {
  id: string;
  name: string;
  VeganType: {
    id: string;
    name: string;
  };
  photo: string | null;
};
