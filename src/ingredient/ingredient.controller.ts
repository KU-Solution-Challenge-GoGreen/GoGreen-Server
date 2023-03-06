import { Controller, Get, Param } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IngredientWithCategoryDto } from './dto/ingredient-with-category.dto';
import { CategoryWithIngredientListDto } from './dto/category-with-ingredient-list.dto';

@Controller('ingredients')
@ApiTags('Ingredient API')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get(':ingredientId')
  @ApiOperation({ summary: 'id로 재료 정보 가져오기' })
  @ApiOkResponse({ type: IngredientWithCategoryDto })
  async getIngredientById(
    @Param('ingredientId') ingredientId: string,
  ): Promise<IngredientWithCategoryDto> {
    return IngredientWithCategoryDto.of(
      await this.ingredientService.getIngredientById(ingredientId),
    );
  }

  @Get('categories/:categoryId')
  @ApiOperation({ summary: '특정 카테고리의 재료 정보 가져오기' })
  @ApiOkResponse({ type: [CategoryWithIngredientListDto] })
  async getCategoryWithIngredientList(
    @Param('categoryId') categoryId: string,
  ): Promise<CategoryWithIngredientListDto> {
    return CategoryWithIngredientListDto.of(
      await this.ingredientService.getCategoryWithIngredientList(categoryId),
    );
  }
}
