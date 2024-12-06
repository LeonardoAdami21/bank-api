import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { requestUser } from '../jwt/request.type';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { IsPublic } from '../strategy/isPublic';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
@ApiTags('Authentication and authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @ApiBody({
    type: LoginAuthDto,
  })
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({ description: 'Login successfully' })
  @ApiBadRequestResponse({ description: 'User is not active' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async login(@Request() req: requestUser) {
    return this.authService.login(req.user);
  }

  @IsPublic()
  @ApiOperation({ summary: 'Register user' })
  @ApiOkResponse({ description: 'User created successfully' })
  @ApiBadRequestResponse({ description: 'User already exists' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('register')
  async register(@Body() dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }
}
