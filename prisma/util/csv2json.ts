import * as fs from 'fs';
import * as csv from 'csv-parser';

interface Ingredient {
  name: string;
  carbonFootprint: number;
  categoryId: string;
}

interface IngredientList {
  ingredientList: Ingredient[];
}

const ingredients: Ingredient[] = [];

fs.createReadStream('prisma/util/input.csv')
  .pipe(csv())
  .on('data', (data: any) => {
    console.log(data);
    const ingredient: Ingredient = {
      name: data.name,
      carbonFootprint: parseFloat(data.carbonFootprint),
      categoryId: data.categoryId,
    };
    ingredients.push(ingredient);
  })
  .on('end', () => {
    const ingredientList: IngredientList = {
      ingredientList: ingredients,
    };
    fs.writeFileSync('output.json', JSON.stringify(ingredientList));
  });
