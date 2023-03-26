import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from '../common/middlewares/logger.middlewares';
import { configModule } from './modules/config.module';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';
import { FirebaseModule } from '../auth/firebase/firebase.module';
import { IngredientModule } from '../ingredient/ingredient.module';
import { RecipeModule } from '../recipe/recipe.module';
import { MealModule } from '../meal/meal.module';
import { UserModule } from 'src/user/user.module';
import { VeganTypeModule } from '../vegan-type/vegan-type.module';

@Module({
  imports: [
    configModule,
    CommonModule,
    FirebaseModule,
    AuthModule,
    IngredientModule,
    RecipeModule,
    MealModule,
    UserModule,
    VeganTypeModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
