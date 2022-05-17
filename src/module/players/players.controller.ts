import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CRUD Player')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('create')
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get('find all')
  findAll(@Query() query: any) {
    return this, this.playersService.findAll(query);
  }

  @Get('find one')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Patch('update')
  update(@Param('id') id: string, @Body() dto: UpdatePlayerDto) {
    return this.playersService.update(id, dto);
  }

  @Delete(':delete')
  remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}
