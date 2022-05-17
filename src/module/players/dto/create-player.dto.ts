import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({
    name: 'name',
    example: 'Cristiano Ronaldo',
  })
  name: string;
  @ApiProperty({
    name: 'playerNumber',
    example: '7',
  })
  playerNumber: string;
  @ApiProperty({
    name: 'club',
    example: 'Real Madrid',
  })
  club: string;
  @ApiProperty({
    name: 'role',
    example: 'LW',
  })
  role: string;
  @ApiProperty({
    name: 'username',
    example: 'cr7',
  })
  username: string;
  @ApiProperty({
    name: 'password',
    example: '',
  })
  password: string;
}
