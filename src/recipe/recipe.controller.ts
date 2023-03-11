import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { UserData } from '../auth/type/user-data.type';
import { CreateRecipePayload } from './payload/create-recipe.payload';
import { FirebaseAuthGuard } from '../auth/guard/auth.guard';
import { RecipeBookmarkDto } from './dto/recipe-bookmark.dto';
import { RecipeDto } from './dto/recipe.dto';

@Controller('recipes')
@ApiTags('Recipe API')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '레시피 생성' })
  @ApiCreatedResponse({ type: CreateRecipeDto })
  async createRecipe(
    @CurrentUser() user: UserData,
    @Body() payload: CreateRecipePayload,
  ): Promise<CreateRecipeDto> {
    return this.recipeService.createRecipe(user.id, payload);
  }

  @Post(':recipeId/bookmark')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '레시피 북마크 상태를 토글합니다.' })
  @ApiCreatedResponse({ type: RecipeBookmarkDto })
  async toggleRecipeBookmark(
    @CurrentUser() user: UserData,
    @Param('recipeId') recipeId: string,
  ): Promise<RecipeBookmarkDto> {
    return this.recipeService.toggleRecipeBookmark(user.id, recipeId);
  }
  @Get(':recipeId')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '레시피 ID로 조회' })
  @ApiOkResponse({ type: RecipeDto })
  async getRecipeById(
    @CurrentUser() user: UserData,
    @Param('recipeId') recipeId: string,
  ): Promise<RecipeDto> {
    return this.recipeService.getRecipeById(recipeId, user.id);
  }
}
