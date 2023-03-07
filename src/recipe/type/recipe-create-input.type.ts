export type RecipeCreateInput = {
  name: string;
  duration: number;
  carbonFootprint: number;
  userId: string;
  ingredientIds: string[];
  steps: {
    description: string;
    photo: string | null;
    index: number;
  }[];
};
