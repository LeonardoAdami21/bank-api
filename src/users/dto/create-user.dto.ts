import { ApiProperty } from '@nestjs/swagger';
import { userProfileEnum } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  document: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  rg?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  userAvatar?: string;

  @ApiProperty({
    enum: userProfileEnum,
    example: userProfileEnum.USERS, 
  })
  profile?: userProfileEnum;

  @ApiProperty()
  addressId?: number;
}
