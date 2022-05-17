import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { Player } from '../players/entities/player.entity';
import { PlayersService } from '../players/players.service';
import { LocalStrategy } from './strategy/local.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_OR_KEY,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, PlayersService],
})
export class AuthModule {}
