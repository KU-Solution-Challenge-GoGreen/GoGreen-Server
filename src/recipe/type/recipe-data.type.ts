import { RecipeStepData } from './recipe-step-data.type';

export type RecipeData = {
  id: string;
  name: string;
  duration: number;
  carbonFootprint: number;
  userId: string;
  steps: RecipeStepData[];
};
