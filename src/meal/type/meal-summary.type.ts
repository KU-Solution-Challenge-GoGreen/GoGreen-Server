export type MealSummary = {
  id: string;
  user: {
    id: string;
    name: string;
  };
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
