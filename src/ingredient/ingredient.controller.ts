import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IngredientWithCategoryDto } from './dto/ingredient-with-category.dto';
import { CategoryWithIngredientListDto } from './dto/category-with-ingredient-list.dto';
import { BulkCreateDto } from '../common/dto/bulk-create.dto';
import { IngredientBulkCreatePayload } from './payload/ingredient-bulk-create.payload';

@Controller('ingredients')
@ApiTags('Ingredient API')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post('bulk')
  @ApiOperation({ summary: '재료 정보 일괄 등록' })
  @ApiOkResponse({ type: BulkCreateDto })
  async bulkCreateIngredient(
    @Body() payload: IngredientBulkCreatePayload,
  ): Promise<BulkCreateDto> {
    return BulkCreateDto.of(
      await this.ingredientService.bulkCreateIngredient(payload),
    );
  }

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
