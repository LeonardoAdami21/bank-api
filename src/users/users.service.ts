import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { PrismaClient, userProfileEnum } from '@prisma/client';
import * as argon from 'argon2';
import { UserProfileEnum } from '../interface/user-profile.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY } from './provider/repository.provider';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: PrismaClient['users']
  ) {}

  async findAll() {
    try {
      const users = await this.userRepository.findMany();
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findUserProfile(userId: number) {
    try {
      const user = await this.userRepository.findUnique({
        where: { id: userId, isActive: true },
      });
      if (user.profile === UserProfileEnum.ADMIN) {
        const admin = await this.userRepository.findUnique({
          where: { id: userId },
          include: { accounts: true },
        });
        return admin;
      }
      if (user.profile === UserProfileEnum.FINANCE) {
        const finance = await this.userRepository.findUnique({
          where: { id: userId },
          include: { accounts: true },
        });
        return finance;
      }
      if (user.profile === UserProfileEnum.USERS) {
        const users = await this.userRepository.findUnique({
          where: { id: userId },
          include: { accounts: true },
        });
        return users;
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findUnique({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async verifyUserActive(id: number) {
    try {
      const user = await this.userRepository.findUnique({
        where: { id, isActive: true },
      });
      if (!user) {
        return false;
      }
      return {
        message: 'User is active',
        data: user,
      };
    } catch (error) {
      return {
        message: 'User is not active',
        data: error,
      };
    }
  }

  async create({
    name,
    document,
    email,
    password,
    rg,
    gender,
    profile,
    userAvatar,
    addressId,
  }: CreateUserDto) {
    try {
      const hashPassword = await argon.hash(password);
      const user = await this.userRepository.create({
        data: {
          name,
          document,
          email,
          password: hashPassword,
          rg,
          gender,
          profile: profile ?? UserProfileEnum.USERS,
          userAvatar,
          addressId,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createAdmin(dto: CreateUserDto) {
    try {
      const hashPassword = await argon.hash(dto.password);
      const user = await this.userRepository.create({
        data: {
          name: dto.name,
          document: dto.document,
          email: dto.email,
          password: hashPassword,
          rg: dto.rg,
          gender: dto.gender,
          profile: userProfileEnum.ADMIN,
          userAvatar: dto.userAvatar,
          addressId: dto.addressId,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createFinance(dto: CreateUserDto) {
    try {
      const hashPassword = await argon.hash(dto.password);
      const user = await this.userRepository.create({
        data: {
          name: dto.name,
          document: dto.document,
          email: dto.email,
          password: hashPassword,
          rg: dto.rg,
          gender: dto.gender,
          profile: userProfileEnum.FINANCE,
          userAvatar: dto.userAvatar,
          addressId: dto.addressId,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAccountByUserId(id: number) {
    try {
      const account = await this.userRepository.findUnique({
        where: { id },
        include: { accounts: true },
      });
      if (!account) {
        throw new NotFoundException('User not found');
      }
      return account;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
