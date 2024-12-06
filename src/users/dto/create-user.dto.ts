import { ApiProperty } from '@nestjs/swagger';
import { userProfileEnum } from '@prisma/client';
import { UserProfileEnum } from '../../interface/user-profile.interface';

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
    enum: UserProfileEnum,
    example: UserProfileEnum.USERS,
  })
  profile?: UserProfileEnum;

  @ApiProperty()
  addressId?: number;
}
