import { Ingredient } from './ingredient.type';

export type CategoryWithIngredientList = {
  id: string;
  name: string;
  Ingredient: Ingredient[];
};
