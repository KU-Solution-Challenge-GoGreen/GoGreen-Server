export type MealSummary = {
  id: string;
  userId: string;
  title: string;
  memo: string | null;
  recipe: {
    name: string;
    carbonFootprint: number;
  };
  categories: string[];
  photo: string | null;
  date: Date;
};
