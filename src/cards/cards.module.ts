import { forwardRef, Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { DATA_SOURCE } from '../config/datasource.config';
import { PrismaClient } from '@prisma/client';
import { AccountsModule } from '../accounts/accounts.module';
import { cardsProviders } from './provider/cards.provider';

@Module({
  imports: [forwardRef(() => AccountsModule)],
  controllers: [CardsController],
  providers: [
    CardsService,
    {
      provide: DATA_SOURCE,
      useFactory: () => new PrismaClient(),
    },
    ...cardsProviders,
  ],
  exports: [CardsService, ...cardsProviders],
})
export class CardsModule {}
