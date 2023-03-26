import { PrismaService } from '../common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CategoryData } from './type/category-data.type';
import { VeganTypeWithIngredient } from './type/vegan-type-with-ingredient.type';

@Injectable()
export class VeganTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCategoryList(): Promise<CategoryData[]> {
    return this.prisma.ingredientCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
  async getVeganTypeList(): Promise<VeganTypeWithIngredient[]> {
    const types = await this.prisma.veganType.findMany({
      select: {
        id: true,
        name: true,
        VeganTypeIngredientCategory: {
          select: {
            categoryId: true,
          },
        },
      },
    });

    return types.map((type) => {
      return {
        id: type.id,
        name: type.name,
        categoryIds: type.VeganTypeIngredientCategory.map(
          (category) => category.categoryId,
        ),
      };
    });
  }
}
