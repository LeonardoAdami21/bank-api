import { Module } from '@nestjs/common';
import { databaseConfig } from './database.config';

@Module({
    providers: [...databaseConfig],
    exports: [...databaseConfig],
})
export class DatabaseModule {}
