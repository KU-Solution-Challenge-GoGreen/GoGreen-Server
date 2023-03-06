import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientRepository } from './ingredient.repository';
import { IngredientWithCategory } from './type/ingredient-with-category.type';

@Injectable()
export class IngredientService {
  constructor(private readonly ingredientRepository: IngredientRepository) {}

  async getIngredientById(
    ingredientId: string,
  ): Promise<IngredientWithCategory> {
    const ingredient = await this.ingredientRepository.getIngredientById(
      ingredientId,
    );

    if (!ingredient) {
      throw new NotFoundException('존재하지 않는 Ingredient입니다.');
    }

    return ingredient;
  }
}
