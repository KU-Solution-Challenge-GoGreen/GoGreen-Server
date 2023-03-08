export type RecipeWithStep = {
  id: string;
  name: string;
  duration: number;
  carbonFootprint: number;
  userId: string;
  steps: {
    id: string;
    description: string;
    photo: string | null;
    index: number;
  }[];
};
