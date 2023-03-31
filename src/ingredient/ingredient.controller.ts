import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IngredientWithCategoryDto } from './dto/ingredient-with-category.dto';
import { CategoryWithIngredientListDto } from './dto/category-with-ingredient-list.dto';
import { BulkCreateDto } from '../common/dto/bulk-create.dto';
import { IngredientBulkCreatePayload } from './payload/ingredient-bulk-create.payload';
import { IngredientListDto } from './dto/ingredient-list.dto';
import { FirebaseAuthGuard } from '../auth/guard/auth.guard';

@Controller('ingredients')
@ApiTags('Ingredient API')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post('bulk')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '재료 정보 일괄 등록' })
  @ApiCreatedResponse({ type: BulkCreateDto })
  async bulkCreateIngredient(
    @Body() payload: IngredientBulkCreatePayload,
  ): Promise<BulkCreateDto> {
    return BulkCreateDto.of(
      await this.ingredientService.bulkCreateIngredient(payload),
    );
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '모든 재료 정보 가져오기' })
  @ApiOkResponse({ type: [IngredientListDto] })
  async getIngredientList(): Promise<IngredientListDto> {
    return IngredientListDto.of(
      await this.ingredientService.getIngredientList(),
    );
  }

  @Get('categories/:categoryId')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '특정 카테고리의 재료 정보 가져오기' })
  @ApiOkResponse({ type: [CategoryWithIngredientListDto] })
  async getCategoryWithIngredientList(
    @Param('categoryId') categoryId: string,
  ): Promise<CategoryWithIngredientListDto> {
    return CategoryWithIngredientListDto.of(
      await this.ingredientService.getCategoryWithIngredientList(categoryId),
    );
  }

  @Get(':ingredientId')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'id로 재료 정보 가져오기' })
  @ApiOkResponse({ type: IngredientWithCategoryDto })
  async getIngredientById(
    @Param('ingredientId') ingredientId: string,
  ): Promise<IngredientWithCategoryDto> {
    return IngredientWithCategoryDto.of(
      await this.ingredientService.getIngredientById(ingredientId),
    );
  }
}
