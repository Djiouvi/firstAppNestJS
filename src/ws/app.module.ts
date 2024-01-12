import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from '../config/loggerMiddleware';
import { HttpExceptionFilter } from '../config/httpExceptionFilter';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { DatabaseServiceModule } from '../config/databaseService.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guard/auth.guard';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    UserModule,
    AuthModule,

    DatabaseServiceModule,

    ConfigModule.forRoot({
      cache: true,
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
