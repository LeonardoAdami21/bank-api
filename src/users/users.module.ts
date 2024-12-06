import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DATA_SOURCE } from 'src/config/datasource.config';
import { PrismaClient } from '@prisma/client';
import { usersProviders } from './provider/users.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: DATA_SOURCE,
      useFactory: () => new PrismaClient(),
    },
    ...usersProviders,
  ],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
