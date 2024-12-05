import { ApiProperty, PartialType } from '@nestjs/swagger';

export class LoginAuthDto {
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
}
