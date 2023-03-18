export type MealFootprint = {
  footprint: number;
  date: Date;
};

export type MealList = {
  id: string;
  name: string;
  photo: string | null;
  createdAt: Date;
  mealList: MealFootprint[];
};
