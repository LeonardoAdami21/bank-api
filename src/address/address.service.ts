import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ADDRESS_REPOSITORY } from './provider/repository.provider';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepository: PrismaClient['address'],
  ) {}

  async create(dto: CreateAddressDto) {
    try {
      const {
        number,
        street,
        district,
        city,
        state,
        country,
        zipCode,
        complement,
      } = dto;
      if (
        !number ||
        !street ||
        !district ||
        !city ||
        !state ||
        !country ||
        !zipCode ||
        !complement
      ) {
        throw new BadRequestException('All fields are required');
      }
      if (number <= 0) {
        throw new ConflictException(
          'Number and zipCode must be greater than 0',
        );
      }
      const address = await this.addressRepository.create({
        data: {
          ...dto,
        },
      });
      return address;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const address = await this.addressRepository.findMany();
      return address;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const address = await this.addressRepository.findUnique({
        where: {
          id,
        },
      });
      if (!address) {
        throw new NotFoundException('Address not found');
      }
      return address;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    try {
      const address = await this.addressRepository.findUnique({
        where: {
          id,
        },
      });
      if (!address) {
        throw new NotFoundException('Address not found');
      }
      await this.addressRepository.update({
        where: {
          id,
        },
        data: {
          ...updateAddressDto,
        },
      });
      return {
        message: 'Address updated successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const address = await this.addressRepository.findUnique({
        where: {
          id,
        },
      });
      if (!address) {
        throw new NotFoundException('Address not found');
      }
      await this.addressRepository.delete({
        where: {
          id,
        },
      });
      return {
        message: 'Address deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
