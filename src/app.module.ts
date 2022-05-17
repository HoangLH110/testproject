import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth/auth.module';
import * as typeOrmConfig from './typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './module/players/players.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    PlayersModule,
    RouterModule.register([
      {
        path: 'api/v1/',
        module: PlayersModule,
      },
    ]),
    AuthModule,
    RouterModule.register([
      {
        path: 'api/v1/',
        module: AuthModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
