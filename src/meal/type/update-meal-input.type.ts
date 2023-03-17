export type UpdateMealInput = {
  title: string;
  recipeId: string;
  description: string | null;
  photo: string | null;
  date: Date;
};
