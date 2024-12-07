import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../guards/roles.decorator';
import { UserProfileEnum } from '../interface/user-profile.interface';

@Controller('transactions')
@ApiTags('Trabsactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Roles(UserProfileEnum.USERS)
  @ApiOperation({ summary: 'Create transaction' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'All fields are required' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Roles(UserProfileEnum.USERS)
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiOkResponse({
    description: 'The records have been successfully fetched.',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll(@Query('limit') limit: number= 10, @Query('page') page: number = 1) {
    return this.transactionsService.findAll(+limit, +page);
  }

  @Roles(UserProfileEnum.USERS)
  @ApiOperation({ summary: 'Get one transaction' })
  @ApiOkResponse({
    description: 'Returns a single transaction.',
  })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  @ApiBadRequestResponse({ description: 'All fields are required' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Roles(UserProfileEnum.USERS)
  @Get('account/:accountId')
  @ApiParam({ name: 'accountId', required: true, type: Number })
  @ApiOperation({ summary: 'Find transactions by account id' })
  @ApiOkResponse({
    description: 'The records have been successfully fetched.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findTransactionByAccountId(@Param('accountId') accountId: number) {
    return this.transactionsService.findTransactionByAccountId(+accountId);
  }
}
