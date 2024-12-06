import { PrismaClient, Users } from '@prisma/client';
import { USER_REPOSITORY } from './repository.provider';
import { IProvider } from '../../interface/provider';
import { DATA_SOURCE } from '../../config/datasource.config';

export const usersProviders: IProvider<PrismaClient['users']>[] = [
  {
    provide: USER_REPOSITORY,
    useFactory: (prisma: PrismaClient) => prisma.users,
    inject: [DATA_SOURCE],
  },
];
