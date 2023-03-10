import { RecipeSummary } from 'src/recipe/type/recipe-summary.type';

export type MealData = {
  id: string;
  title: string;
  userId: string;
  description: string | null;
  photo: string | null;
  carbonFootprint: number;
  time: Date;
  recipe: RecipeSummary;
};
