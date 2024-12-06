import { forwardRef, Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { DATA_SOURCE } from 'src/config/datasource.config';
import { PrismaClient } from '@prisma/client';
import { accountsProviders } from './provider/accounts.provider';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    {
      provide: DATA_SOURCE,
      useFactory: () => new PrismaClient(),
    },
    ...accountsProviders,
  ],
  exports: [AccountsService, ...accountsProviders],
})
export class AccountsModule {}
