export type IngredientWithCategory = {
  id: string;
  name: string;
  carbonFootprint: number;
  IngredientCategory: {
    id: string;
    name: string;
  };
};
