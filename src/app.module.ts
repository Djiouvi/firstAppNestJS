import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import database from '../config/database';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from '../config/loggerMiddleware';

@Module({
  imports: [
    UserModule,

    ConfigModule.forRoot({
      cache: true,
      load: [
        database
      ]
    })
  ]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL})
  }
}
