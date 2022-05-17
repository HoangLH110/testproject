import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Player } from '../players/entities/player.entity';
import { AuthService } from './auth.service';
import { LoginDto, RegisterForPlayerDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterForPlayerDto) {
    return await this.authService.register(body);
  }

  @Post('/login')
  async login(@Body() body: LoginDto): Promise<Player> {
    const user = await this.authService.login(body);
    return user;
  }
}
