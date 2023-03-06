import { Controller } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('ingredient')
@ApiTags('Ingredient API')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}
}
