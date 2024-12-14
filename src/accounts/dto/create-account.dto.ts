import { ApiProperty } from '@nestjs/swagger';
import { accountType } from '@prisma/client';

export class CreateAccountDto {

  @ApiProperty({
    example: 'Nubank',
    description: 'Agency Name',
    type: String,
  })
  agency: string;

  @ApiProperty({
    example: 100,
    description: 'Account balance',
    type: Number,
  })
  balance: number;

  @ApiProperty({
    enum: accountType,
    example: accountType.CHECKING,
    description: 'Account type',
  })
  type: accountType;
}
