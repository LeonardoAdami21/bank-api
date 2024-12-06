import { PrismaClient } from '@prisma/client';
import { IProvider } from '../../interface/provider';
import { DATA_SOURCE } from '../../config/datasource.config';
import { ADDRESS_REPOSITORY } from './repository.provider';

export const addressProviders: IProvider<PrismaClient['address']>[] = [
  {
    provide: ADDRESS_REPOSITORY,
    useFactory: (prisma: PrismaClient) => prisma.address,
    inject: [DATA_SOURCE],
  },
];
