import { RecipeData } from './recipe-data.type';
import { IngredientWithCategory } from '../../ingredient/type/ingredient-with-category.type';

export type RecipeDetail = RecipeData & {
  isBookmarked: boolean;
  photos: string[];
  ingredients: IngredientWithCategory[];
};
