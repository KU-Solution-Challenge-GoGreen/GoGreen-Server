import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientRepository } from './ingredient.repository';
import { IngredientWithCategory } from './type/ingredient-with-category.type';
import { CategoryWithIngredientList } from './type/category-with-ingredient-list.type';
import { IngredientBulkCreatePayload } from './payload/ingredient-bulk-create.payload';
import * as _ from 'lodash';
import { IngredientCreateInput } from './type/ingredient-create-input.type';
import { Ingredient } from './type/ingredient.type';

@Injectable()
export class IngredientService {
  constructor(private readonly ingredientRepository: IngredientRepository) {}

  async bulkCreateIngredient(
    payload: IngredientBulkCreatePayload,
  ): Promise<number> {
    // 각 재료의 categoryId를 뽑아와서, 중복을 제거한 뒤 존재 여부를 확인
    await this.isCategoryListExist(
      _.uniqBy(payload.ingredientList, 'categoryId').map((ingredient) => {
        return ingredient.categoryId;
      }),
    );

    const ingredientList: IngredientCreateInput[] = payload.ingredientList.map(
      (ingredient) => ({
        name: ingredient.name,
        carbonFootprint: ingredient.carbonFootprint,
        categoryId: ingredient.categoryId,
      }),
    );

    return this.ingredientRepository.bulkCreateIngredient(ingredientList);
  }

  async getIngredientList(): Promise<Ingredient[]> {
    return [];
  }

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

  async getCategoryWithIngredientList(
    categoryId: string,
  ): Promise<CategoryWithIngredientList> {
    const category =
      await this.ingredientRepository.getCategoryWithIngredientList(categoryId);

    if (!category) {
      throw new NotFoundException('존재하지 않는 Category입니다.');
    }

    return category;
  }

  private async isCategoryListExist(categoryIdList: string[]): Promise<void> {
    const isCategoryListExist =
      await this.ingredientRepository.isCategoryListExist(categoryIdList);

    if (!isCategoryListExist) {
      throw new NotFoundException('존재하지 않는 Category입니다.');
    }
  }
}
