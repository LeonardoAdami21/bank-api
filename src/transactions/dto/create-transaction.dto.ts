import { ApiProperty } from '@nestjs/swagger';
import { transactionType } from '@prisma/client';

export class CreateTransactionDto {
  @ApiProperty({
    example: 1,
    description: 'Account id',
    type: Number,
  })
  accountId: number;

  @ApiProperty({
    example: 100,
    description: 'Transaction amount',
    type: Number,
  })
  amount: number;

  @ApiProperty({
    enum: transactionType,
    example: transactionType.DEPOSIT,
    description: 'Transaction type',
  })
  type: transactionType;

  @ApiProperty({
    example: 'Description of the transaction',
    description: 'Transaction description',
    type: String,
  })
  description?: string;
}
