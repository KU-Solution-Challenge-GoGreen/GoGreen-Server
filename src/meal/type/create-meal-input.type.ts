export type CreateMealInput = {
  title: string;
  userId: string;
  recipeId: string;
  memo: string | null;
  photo: string | null;
  date: Date;
};
