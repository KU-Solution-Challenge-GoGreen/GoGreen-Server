import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { IngredientWithCategory } from './type/ingredient-with-category.type';
import { CategoryWithIngredientList } from './type/category-with-ingredient-list.type';
import { IngredientCreateInput } from './type/ingredient-create-input.type';
import { Ingredient } from './type/ingredient.type';

@Injectable()
export class IngredientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async bulkCreateIngredient(data: IngredientCreateInput[]): Promise<number> {
    const result = await this.prisma.ingredient.createMany({
      data,
    });

    return result.count;
  }

  async getIngredientById(
    ingredientId: string,
  ): Promise<IngredientWithCategory | null> {
    return this.prisma.ingredient.findUnique({
      where: {
        id: ingredientId,
      },
      select: {
        id: true,
        name: true,
        carbonFootprint: true,
        IngredientCategory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getIngredientList(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany({
      select: {
        id: true,
        name: true,
        carbonFootprint: true,
      },
    });
  }

  async getCategoryWithIngredientList(
    categoryId: string,
  ): Promise<CategoryWithIngredientList | null> {
    return this.prisma.ingredientCategory.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
        name: true,
        Ingredient: {
          select: {
            id: true,
            name: true,
            carbonFootprint: true,
          },
        },
      },
    });
  }

  async isCategoryListExist(categoryIds: string[]): Promise<boolean> {
    const categoryList = await this.prisma.ingredientCategory.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
      select: {
        id: true,
      },
    });

    return categoryList.length === categoryIds.length;
  }
}
