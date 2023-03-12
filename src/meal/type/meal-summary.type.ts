export type MealSummary = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  recipe: {
    name: string;
    carbonFootprint: number;
  };
  categories: string[];
  photo: string | null;
  time: Date;
};
