export type CategoryWithIngredientList = {
  id: string;
  name: string;
  Ingredient: {
    id: string;
    name: string;
    carbonFootprint: number;
  }[];
};
