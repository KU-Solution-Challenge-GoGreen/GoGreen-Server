import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { IngredientWithCategory } from './type/ingredient-with-category.type';
import { CategoryWithIngredientList } from './type/category-with-ingredient-list.type';

@Injectable()
export class IngredientRepository {
  constructor(private readonly prisma: PrismaService) {}

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
}
