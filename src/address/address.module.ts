import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { addressProviders } from './provider/adddress.provider';
import { DATA_SOURCE } from 'src/config/datasource.config';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AddressController],
  providers: [AddressService, {
    provide: DATA_SOURCE,
    useFactory: () => new PrismaClient(),
  }, ...addressProviders],
})
export class AddressModule {}
