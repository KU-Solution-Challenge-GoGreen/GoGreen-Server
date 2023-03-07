import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { UserData } from '../auth/type/user-data.type';
import { CreateRecipePayload } from './payload/create-recipe.payload';
import { FirebaseAuthGuard } from '../auth/guard/auth.guard';

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
}
