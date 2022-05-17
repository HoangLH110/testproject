import { ApiProperty } from '@nestjs/swagger';

export class RegisterForPlayerDto {
  @ApiProperty({
    example: 'Cristiano Ronaldo',
  })
  name: string;

  @ApiProperty({
    example: '7',
  })
  numberPlayer: string;

  @ApiProperty({
    example: 'Manchester United',
  })
  club: string;

  @ApiProperty({
    example: 'ST',
  })
  role: string;

  @ApiProperty({
    example: 'test',
  })
  username: string;

  @ApiProperty({
    example: '12345',
  })
  password: string;
}

export class LoginDto {
  @ApiProperty({
    example: 'test',
  })
  username: string;

  @ApiProperty({
    example: '12345',
  })
  password: string;
}
