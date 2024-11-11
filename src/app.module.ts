import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';
import { BudgetsModule } from './budgets/budgets.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AccountsModule, TransactionsModule, CategoriesModule, BudgetsModule, CardsModule],
})
export class AppModule {}
