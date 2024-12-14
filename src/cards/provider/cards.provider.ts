import { PrismaClient } from '@prisma/client';
import { IProvider } from '../../interface/provider';
import { DATA_SOURCE } from '../../config/datasource.config';
import { CARDS_REPOSITORY } from './repository.provider';


export const cardsProviders: IProvider<PrismaClient['cards']>[] = [
  {
    provide: CARDS_REPOSITORY,
    useFactory: (prisma: PrismaClient) => prisma.cards,
    inject: [DATA_SOURCE],
  },
];
