import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../guards/roles.decorator';
import { UserProfileEnum } from '../interface/user-profile.interface';
import { requestUser } from '../jwt/request.type';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UsersAuthGuard } from '../guards/users-auth.guard';

@Controller('accounts')
@ApiTags('Accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Roles(UserProfileEnum.USERS)
  @ApiOperation({ summary: 'Create account' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiCreatedResponse({ description: 'Account created successfully' })
  @ApiBadRequestResponse({ description: 'All fields are required' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(
    @Body() createAccountDto: CreateAccountDto,
    @Request() req: requestUser,
  ) {
    const formattedBalance = +createAccountDto.balance;
    return this.accountsService.create(
      { ...createAccountDto, balance: formattedBalance },
      req.user.id,
    );
  }

  @Roles(UserProfileEnum.USERS)
  @ApiOperation({ summary: 'Get all accounts' })
  @ApiOkResponse({ description: 'Accounts found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll(@Request() req: requestUser) {
    return this.accountsService.findAll(req.user.id);
  }

  @Roles(UserProfileEnum.USERS)
  @ApiParam({ name: 'userId', required: true, type: Number })
  @ApiOperation({ summary: 'Get all accounts by user id' })
  @ApiOkResponse({ description: 'Accounts found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/user/:userId')
  findAllAccountsByUserId(@Param('userId') userId: number) {
    return this.accountsService.findAllAccountsByUserId(+userId);
  }

  @Roles(UserProfileEnum.USERS)
  @ApiOperation({ summary: 'Get account by id' })
  @ApiOkResponse({ description: 'Accounts found' })
  @ApiNotFoundResponse({ description: 'Account not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.accountsService.findOne(+id);
  }

  @Roles(UserProfileEnum.USERS)
  @ApiOperation({ summary: 'Update account' })
  @ApiOkResponse({ description: 'Account updated successfully' })
  @ApiBadRequestResponse({ description: 'All fields are required' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateAccountDto,
    @Request() req: requestUser,
  ) {
    const formattedBalance = +dto.balance;
    return this.accountsService.update(+id, formattedBalance, req.user.id);
  }

  @Roles(UserProfileEnum.USERS)
  @ApiOperation({ summary: 'Delete account' })
  @ApiOkResponse({ description: 'Account deleted successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  remove(@Param('id') id: number, @Request() req: requestUser) {
    return this.accountsService.delete(+id, req.user.id);
  }
}
