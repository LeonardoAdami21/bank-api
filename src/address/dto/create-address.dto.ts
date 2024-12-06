import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    example: 'Av. Paulista, 1234',
    description: 'User address',
    type: String,
  })
  street: string;

  @ApiProperty({
    example: 1234,
    description: 'User address number',
    type: Number,
  })
  number: number;

  @ApiProperty({
    example: 'Jardim Paulista',
    description: 'User address district',
    type: String,
  })
  district: string;

  @ApiProperty({
    example: 'Sao Paulo',
    description: 'User address city',
    type: String,
  })
  city: string;

  @ApiProperty({
    example: 'SP',
    description: 'User address state',
    type: String,
  })
  state: string;

  @ApiProperty({
    example: 'Brazil',
    description: 'User address country',
    type: String,
  })
  country: string;

  @ApiProperty({
    example: '12345678',
    description: 'User address zip code',
    type: String,
  })
  zipCode: string;

  @ApiProperty({
    example: 'Complemento',
    description: 'User address complement',
    type: String,
  })
  complement: string;
}
