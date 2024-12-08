import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CARDS_REPOSITORY } from './provider/repository.provider';
import { PrismaClient } from '@prisma/client';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class CardsService {
  constructor(
    @Inject(CARDS_REPOSITORY)
    private readonly cardsRepository: PrismaClient['cards'],
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService,
  ) {}
  async create(createCardDto: CreateCardDto, userId: number) {
    try {
      const { type, password, balance, limit, accountId } = createCardDto;
      if (!type || !password || !balance) {
        throw new BadRequestException('All fields are required');
      }
      if (!limit || limit <= 0) {
        throw new BadRequestException('Limit must be greater than balance');
      }
      if (type !== 'CREDIT' && type !== 'DEBIT') {
        throw new BadRequestException('Invalid type');
      }
      const account = await this.accountsService.findOne(accountId);
      const card = await this.cardsRepository.create({
        data: {
          cardNumber: Math.random().toString().slice(2, 12),
          ...createCardDto,
          userId,
          accountId: account.id,
        },
      });
      return card;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const cards = await this.cardsRepository.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return cards;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllCardsByUserId(userId: number) {
    try {
      const cards = await this.cardsRepository.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return cards;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllCardsByAccountId(accountId: number) {
    try {
      const cards = await this.cardsRepository.findMany({
        where: {
          accountId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return cards;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const card = await this.cardsRepository.findUnique({
        where: {
          id,
        },
      });
      if (!card) {
        throw new NotFoundException('Card not found');
      }
      return card;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    try {
      const card = await this.cardsRepository.findUnique({
        where: {
          id,
        },
      });
      if (!card) {
        throw new NotFoundException('Card not found');
      }
      if (!card.type || (card.type !== 'CREDIT' && card.type !== 'DEBIT')) {
        throw new BadRequestException('Invalid type');
      }
      if (card.password !== updateCardDto.password) {
        throw new BadRequestException('Invalid password');
      }
      if (updateCardDto.type !== 'CREDIT' && updateCardDto.type !== 'DEBIT') {
        throw new BadRequestException('Invalid type');
      }
      await this.cardsRepository.update({
        where: {
          id,
        },
        data: {
          ...updateCardDto,
        },
      });
      return {
        message: 'Card updated successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const card = await this.cardsRepository.findUnique({
        where: {
          id,
        },
      });
      if (!card) {
        throw new NotFoundException('Card not found');
      }
      await this.cardsRepository.delete({
        where: {
          id,
        },
      });
      return {
        message: 'Card deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async blockCard(id: number) {
    try {
      const card = await this.cardsRepository.findUnique({
        where: {
          id,
        },
      });
      if (!card) {
        throw new NotFoundException('Card not found');
      }
      await this.cardsRepository.update({
        where: {
          id,
        },
        data: {
          isBlocked: true,
        },
      });
      return {
        message: 'Card blocked successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
