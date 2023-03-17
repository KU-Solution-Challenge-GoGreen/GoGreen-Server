export type MealCreateInput = {
  title: string;
  userId: string;
  recipeId: string;
  description: string | null;
  photo: string | null;
  date: Date;
};
