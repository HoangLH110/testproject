import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { runInThisContext } from 'vm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}
  async create(createPlayer: any) {
    const creataPlayer = this.playerRepository.create(createPlayer);
    return await this.playerRepository.save(creataPlayer);
  }

  async findAll(query: any) {
    return this.playerRepository.find();
  }

  async findOne(query: any): Promise<Player> {
    const user = await this.playerRepository.findOne({ where: query });
    if (user) {
      user.username = user.username;
      return user;
    }
    return null;
  }

  update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.playerRepository.update(id, updatePlayerDto);
  }

  remove(id: string) {
    return this.playerRepository.delete(id);
  }
}
