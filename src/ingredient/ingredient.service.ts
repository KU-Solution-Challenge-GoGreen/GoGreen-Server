import { Injectable } from '@nestjs/common';
import { IngredientRepository } from './ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(private readonly ingredientRepository: IngredientRepository) {}
}
