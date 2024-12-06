import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
    required: true,
    type: String,
  })
  name: string;

  @ApiProperty({
    example: '12345678901 or 12345678901234',
    description: 'User document',
    required: true,
    type: String,
  })
  document: string;

  @ApiProperty({
    example: '0Wf0n@example.com',
    description: 'User email',
    required: true,
    type: String,
  })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'User password',
    required: true,
    type: String,
  })
  password: string;

  @ApiProperty({
    example: '123456',
    description: 'User rg',
    required: false,
    type: String,
  })
  rg?: string;

  @ApiProperty({
    example: 'Male or Female',
    description: 'User gender',
    required: false,
    type: String,
  })
  gender?: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'User avatar',
    required: false,
    type: String,
  })
  userAvatar?: string;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'User address id',
    example: 1,
  })
  addressId?: number;
}
