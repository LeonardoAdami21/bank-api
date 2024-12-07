import { PrismaClient, Users } from '@prisma/client';
import { IProvider } from '../../interface/provider';
import { DATA_SOURCE } from '../../config/datasource.config';
import { TRANSACTION_REPOSITORY } from './repository.provider';

export const transactionProviders: IProvider<PrismaClient['transactions']>[] = [
  {
    provide: TRANSACTION_REPOSITORY,
    useFactory: (prisma: PrismaClient) => prisma.transactions,
    inject: [DATA_SOURCE],
  },
];
