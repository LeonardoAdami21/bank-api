import { Controller, Get, Param, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { requestUser } from 'src/jwt/request.type';
import { Roles } from '../guards/roles.decorator';
import { UserProfileEnum } from '../interface/user-profile.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserProfileEnum.ADMIN)
  @ApiOperation({ summary: 'Get all Users' })
  @ApiOkResponse({ description: 'All Users' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'User Profile' })
  @ApiOkResponse({ description: 'User Profile' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get(':id')
  async findUserProfile(@Request() req: requestUser) {
    return this.usersService.findUserProfile(+req.user.id);
  }
}
