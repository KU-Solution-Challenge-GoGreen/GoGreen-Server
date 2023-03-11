import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { CreateRecipePayload } from './payload/create-recipe.payload';
import { IngredientWithCategory } from '../ingredient/type/ingredient-with-category.type';
import { RecipeCreateInput } from './type/recipe-create-input.type';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeBookmarkDto } from './dto/recipe-bookmark.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async createRecipe(
    userId: string,
    payload: CreateRecipePayload,
  ): Promise<CreateRecipeDto> {
    // 재료 ID들로 재료 정보 가져오기
    const ingredients = await this.recipeRepository.getIngredientsByIds(
      payload.ingredientIds,
    );

    if (ingredients.length !== payload.ingredientIds.length) {
      throw new NotFoundException('존재하지 않는 Ingredient가 있습니다.');
    }

    const data: RecipeCreateInput = {
      name: payload.name,
      userId,
      duration: payload.duration,
      carbonFootprint: this.calculateCarbonFootprint(ingredients),
      ingredientIds: payload.ingredientIds,
      steps: payload.steps.map((step, index) => ({
        description: step.description,
        index: index + 1,
        photo: step.photo ?? null,
      })),
    };

    const recipe = await this.recipeRepository.createRecipe(data);

    return CreateRecipeDto.of(recipe, ingredients);
  }

  async toggleRecipeBookmark(
    userId: string,
    recipeId: string,
  ): Promise<RecipeBookmarkDto> {
    const isExist = await this.recipeRepository.isRecipeExist(recipeId);

    if (!isExist) {
      throw new NotFoundException('존재하지 않는 레시피입니다.');
    }

    const result = await this.recipeRepository.toggleRecipeBookmark(
      userId,
      recipeId,
    );

    return RecipeBookmarkDto.of(result);
  }

  private calculateCarbonFootprint(
    ingredients: IngredientWithCategory[],
  ): number {
    return ingredients.reduce((acc, cur) => acc + cur.carbonFootprint, 0);
  }
}
