import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { requestUser } from '../jwt/request.type';
import {
  ApiBadGatewayResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../guards/roles.decorator';
import { UserProfileEnum } from '../interface/user-profile.interface';

@Controller('cards')
@ApiTags('Cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Roles(UserProfileEnum.USERS)
  @ApiOperation({
    summary: 'Create card',
  })
  @ApiCreatedResponse({
    description: 'The card has been successfully created.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadGatewayResponse({ description: 'All fields are required' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createCardDto: CreateCardDto, @Request() req: requestUser) {
    return this.cardsService.create(createCardDto, req.user.id);
  }

  @Roles(UserProfileEnum.USERS)
  @ApiOperation({
    summary: 'Get all cards',
  })
  @ApiOkResponse({
    description: 'The cards have been successfully found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @ApiOperation({
    summary: 'Get all cards by account id',
  })
  @ApiOkResponse({
    description: 'The cards have been successfully found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('account/:accountId')
  findAllCardsByAccountId(@Param('accountId') accountId: number) {
    return this.cardsService.findAllCardsByAccountId(accountId);
  }

  @Roles(UserProfileEnum.USERS)
  @ApiOperation({
    summary: 'Get card by id',
  })
  @ApiOkResponse({
    description: 'The card has been successfully found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cardsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Get all cards by user id',
  })
  @ApiOkResponse({
    description: 'The cards have been successfully found.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('user/:userId')
  findAllCardsByUserId(@Param('userId') userId: number) {
    return this.cardsService.findAllCardsByUserId(userId);
  }

  @Roles(UserProfileEnum.USERS)
  @ApiOperation({
    summary: 'Update card',
  })
  @ApiOkResponse({
    description: 'The card has been successfully updated.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @ApiOperation({
    summary: 'Block card',
  })
  @ApiOkResponse({
    description: 'The card has been successfully blocked.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch('block/:id')
  blockCard(@Param('id') id: number) {
    return this.cardsService.blockCard(+id);
  }

  @Roles(UserProfileEnum.USERS)
  @ApiOperation({
    summary: 'Delete card',
  })
  @ApiOkResponse({
    description: 'The card has been successfully deleted.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cardsService.remove(+id);
  }
}
