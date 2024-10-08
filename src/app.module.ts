import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthMidelware } from './modules/main/middlewares/auth.middleware';
import { RateLimiterMidelware } from './modules/main/middlewares/ratelimiter.middleware';
import { UserController } from './modules/user/user.contoller';
import { IdeaController } from './modules/idea/idea.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { getMongooseConfig } from './config/db.config'
import { AuthModule } from './modules/auth/auth.module';
import { CheckoutModule } from './modules/checkout/checkout.module';


@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      useFactory: async () => getMongooseConfig(), // Call the config function
    }),
    UserModule,
    AuthModule,
    CheckoutModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(
      RateLimiterMidelware)
    .forRoutes(
      IdeaController,
      UserController) // Use the middlware for controllers
  
    consumer
    .apply(AuthMidelware)
    .forRoutes(
      IdeaController) // Use the middlware for controllers
  }

}
