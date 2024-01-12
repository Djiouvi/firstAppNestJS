import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './databaseService';

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseServiceModule {
}
