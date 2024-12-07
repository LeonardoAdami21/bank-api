import { forwardRef, Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { DATA_SOURCE } from '../config/datasource.config';
import { PrismaClient } from '@prisma/client';
import { transactionProviders } from './provider/transaction.provider';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [forwardRef(() => AccountsModule)],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: DATA_SOURCE,
      useFactory: () => new PrismaClient(),
    },
    ...transactionProviders,
  ],
  exports: [TransactionsService, ...transactionProviders],
})
export class TransactionsModule {}
