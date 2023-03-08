import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: '여기에 url 입력하기',
    },
  },
});

const categoryNames = [
  'vegetable',
  'dairy',
  'egg',
  'seafood',
  'poultry',
  'meat',
];

const veganType = [
  {
    name: 'Vegan',
    ingredients: ['vegetable'],
  },
  {
    name: 'Pollo',
    ingredients: ['vegetable', 'poultry', 'egg', 'dairy', 'seafood'],
  },
  {
    name: 'Pesco',
    ingredients: ['vegetable', 'seafood', 'egg', 'dairy'],
  },
  {
    name: 'Ovo',
    ingredients: ['vegetable', 'egg'],
  },
  {
    name: 'Lacto',
    ingredients: ['vegetable', 'dairy'],
  },
  {
    name: 'Lacto-Ovo',
    ingredients: ['vegetable', 'dairy', 'egg'],
  },
  {
    name: 'Flexitarian',
    ingredients: ['vegetable', 'poultry', 'egg', 'dairy', 'seafood', 'meat'],
  },
];

async function main() {
  //한 transaction 에 처리될 수 있도록 transaction api를 사용한다.
  await prisma.$transaction(async (tx) => {
    //재료 카테고리 추가
    const categoryCount = await tx.ingredientCategory.createMany({
      data: categoryNames.map((name) => ({ name })),
    });

    console.log(`Created ${categoryCount.count} categories!`);

    // 재료 카테고리 전체를 가져와서 Map으로 만든다.
    const categories = await tx.ingredientCategory.findMany();
    const categoryMap = new Map(
      categories.map((category) => [category.name, category.id]),
    );

    // VeganType 추가
    for await (const vegan of veganType) {
      const veganType = await tx.veganType.create({
        data: {
          name: vegan.name,
          VeganTypeIngredientCategory: {
            createMany: {
              data: vegan.ingredients.map((ingredient) => ({
                categoryId: categoryMap.get(ingredient)!,
              })),
            },
          },
        },
      });

      console.log(`Created ${veganType.name}!`);
    }
  });
}

main();
