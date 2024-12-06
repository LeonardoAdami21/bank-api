import { PrismaClient } from '@prisma/client';
import { IProvider } from '../../interface/provider';
import { DATA_SOURCE } from '../../config/datasource.config';
import { ACCOUNTS_REPOSITORY } from './repository.provider';

export const accountsProviders: IProvider<PrismaClient['accounts']>[] = [
  {
    provide: ACCOUNTS_REPOSITORY,
    useFactory: (prisma: PrismaClient) => prisma.accounts,
    inject: [DATA_SOURCE],
  },
];
