import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient, transactionType } from '@prisma/client';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TRANSACTION_REPOSITORY } from './provider/repository.provider';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: PrismaClient['transactions'],
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService,
  ) {}

  async create(dto: CreateTransactionDto) {
    try {
      const { accountId, amount, type, description } = dto;
      if (!accountId || !amount || !type) {
        throw new BadRequestException('All fields are required');
      }
      const account = await this.accountsService.findOne(accountId);
      if (!account) {
        throw new NotFoundException('Account not found');
      }
      if (type === 'WITHDRAW' && account.balance < amount) {
        throw new BadRequestException('Insufficient balance');
      }
      const newBalance =
        type === transactionType.DEPOSIT
          ? account.balance + amount
          : account.balance - amount;

      await this.accountsService.update(account.id, newBalance, account.userId);
      const transaction = await this.transactionRepository.create({
        data: {
          amount,
          type,
          description,
          accountId,
        },
      });
      return transaction;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(limit?: number, page?: number) {
    try {
      if (page < 1) {
        throw new BadRequestException('Page must be greater than 0');
      }
      const transactions = await this.transactionRepository.findMany({
        skip: Number(page - 1) * limit,
        take: Number(limit || 10),
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          account: true,
        },
      });

      const total = await this.transactionRepository.count();
      const lastPage = Math.ceil(total / limit);
      return {
        total: total,
        lasPage : lastPage,
        currentPage: page,
        perPage: limit,
        previous: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
        data: transactions,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const transaction = await this.transactionRepository.findUnique({
        where: {
          id,
        },
      });
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }
      return transaction;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findTransactionByAccountId(accountId: number) {
    try {
      const transactions = await this.transactionRepository.findMany({
        where: {
          accountId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          account: true,
        },
      });
      return transactions;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
