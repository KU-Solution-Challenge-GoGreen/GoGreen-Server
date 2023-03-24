import { RecipeSummary } from 'src/recipe/type/recipe-summary.type';

export type MealData = {
  id: string;
  title: string;
  userId: string;
  memo: string | null;
  photo: string | null;
  carbonFootprint: number;
  date: Date;
  recipe: RecipeSummary;
};
