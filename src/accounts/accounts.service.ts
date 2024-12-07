import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { accountType, PrismaClient } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { ACCOUNTS_REPOSITORY } from './provider/repository.provider';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(ACCOUNTS_REPOSITORY)
    private readonly accountsRepository: PrismaClient['accounts'],
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async create(
    dto: { agency: string; balance: number; type: accountType },
    userId: number,
  ) {
    try {
      const { agency, balance, type } = dto;
      if (!agency || !balance || !type) {
        throw new BadRequestException('All fields are required');
      }
      const user = await this.usersService.findAccountByUserId(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const account = await this.accountsRepository.create({
        data: {
          accountNumber: Math.random().toString().slice(2, 12),
          agency,
          balance,
          type,
          userId,
        },
      });
      return account;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const accounts = await this.accountsRepository.findMany();
      return accounts;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllAccountsByUserId(userId: number) {
    try {
      const accounts = await this.accountsRepository.findMany({
        where: {
          userId: userId,
        },
      });
      return accounts;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findTransactionsByAccountId(accountId: number) {
    try {
      const transactions = await this.accountsRepository.findUnique({
        where: {
          id: accountId,
        },
        include: {
          transactions: true,
        },
      });
      return transactions;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const account = await this.accountsRepository.findUnique({
        where: {
          id,
        },
      });
      if (!account) {
        throw new NotFoundException('Account not found');
      }
      return account;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, balance: number) {
    try {
      if (!balance) {
        throw new BadRequestException('All fields are required');
      }
      const account = await this.accountsRepository.findUnique({
        where: {
          id,
        },
      });
      if (!account) {
        throw new NotFoundException('Account not found');
      }
      await this.accountsRepository.update({
        where: {
          id,
        },
        data: {
          balance,
        },
      });
      return {
        message: 'Account updated successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
