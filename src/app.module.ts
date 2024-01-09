import { Module } from '@nestjs/common';
import { ControllerModule } from './Test/controller.module';
import { ConfigModule } from '@nestjs/config';
import database from '../config/database';
import { UserModule } from './user/user/user.module';

@Module({
  imports: [
    ControllerModule,
    UserModule,

    ConfigModule.forRoot({
      cache: true,
      load: [
        database
      ]
    })
  ]
})
export class AppModule {
}
