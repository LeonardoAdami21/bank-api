import { ApiProperty } from '@nestjs/swagger';
import { cardType } from '@prisma/client';

export class CreateCardDto {
  @ApiProperty({
    enum: cardType,
    example: cardType.CREDIT,
    description: 'Card type',
  })
  type: cardType;

  @ApiProperty({
    description: 'Card Holder',
    example: 'John Doe',
  })
  cardHolder: string;

  @ApiProperty({
    description: 'Card Expiry Date',
    example: new Date(),
    type: Date,
  })
  expiryDate: Date;

  @ApiProperty({
    description: 'Card CVV',
    example: '123',
    type: String
  })
  cvv: string;

  @ApiProperty({
    description: 'Account id',
    example: 1,
    type: Number
  })
  accountId: number;

  @ApiProperty({
    description: 'Card password',
    type: String,
    example: '1234',
  })
  password: string;

  @ApiProperty({
    description: 'Card balance',
    type: Number,
    example: 100,
  })
  balance: number;

  @ApiProperty({
    description: 'Card Limit',
    type: Number,
    example: 2000,
  })
  limit?: number;
}
