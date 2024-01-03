import { Module } from '@nestjs/common';
import { ControllerModule } from './Test/controller.module';

@Module({
  imports: [ControllerModule]
})
export class AppModule {
}
