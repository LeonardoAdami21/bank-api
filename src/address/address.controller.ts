import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('address')
@ApiBearerAuth()
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: 'Create an address' })
  @ApiCreatedResponse({
    description: 'The address has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'All fields are required' })
  @ApiConflictResponse({
    description: 'Number and zipCode must be greater than 0',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @ApiOperation({ summary: 'Get all addresses' })
  @ApiOkResponse({
    description: 'Find all addresses',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @ApiOperation({ summary: 'Get one address' })
  @ApiOkResponse({
    description: 'Find one address',
  })
  @ApiNotFoundResponse({ description: 'Address not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one address' })
  @ApiOkResponse({
    description: 'The address has been successfully updated.',
  })
  @ApiNotFoundResponse({ description: 'Address not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @ApiOperation({ summary: 'Delete one address' })
  @ApiOkResponse({
    description: 'The address has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Address not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
