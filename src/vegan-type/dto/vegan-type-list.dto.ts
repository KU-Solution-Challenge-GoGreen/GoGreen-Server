import { ApiProperty } from '@nestjs/swagger';
import { CategoryData } from '../type/category-data.type';
import { VeganTypeWithIngredient } from '../type/vegan-type-with-ingredient.type';

class CategoryAvailabilityDto {
  @ApiProperty({
    description: '카테고리 ID',
    type: String,
  })
  id!: string;

  @ApiProperty({
    description: '카테고리 이름',
    type: String,
  })
  name!: string;

  @ApiProperty({
    description: '카테고리 섭취가능 여부',
    type: Boolean,
  })
  isAvailable!: boolean;
}

class VeganTypeDto {
  @ApiProperty({
    description: '비건타입 ID',
    type: String,
  })
  id!: string;

  @ApiProperty({
    description: '비건타입 이름',
    type: String,
  })
  name!: string;

  @ApiProperty({
    description: '카테고리 섭취 가능 여부',
    type: [CategoryAvailabilityDto],
  })
  categoryAvailabilityList!: CategoryAvailabilityDto[];
}

export class VeganTypeListDto {
  @ApiProperty({
    description: '비건타입 리스트',
    type: [VeganTypeDto],
  })
  veganTypeList!: VeganTypeDto[];

  static of(
    veganTypeList: VeganTypeWithIngredient[],
    categoryList: CategoryData[],
  ): VeganTypeListDto {
    return {
      veganTypeList: veganTypeList.map((veganType) => {
        return {
          id: veganType.id,
          name: veganType.name,
          categoryAvailabilityList: categoryList.map((category) => {
            return {
              id: category.id,
              name: category.name,
              isAvailable: veganType.categoryIds.includes(category.id),
            };
          }),
        };
      }),
    };
  }
}
