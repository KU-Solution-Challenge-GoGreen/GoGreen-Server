import { Controller } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('recipes')
@ApiTags('Recipe API')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}
}
