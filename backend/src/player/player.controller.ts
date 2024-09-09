import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  createPlayer(@Body() playerInfo: { name: string }) {
    this.playerService.createPlayer(playerInfo.name);
    return { message: 'Player created!' };
  }

  @Get(':id')
  getPlayer(@Param('id') id: string) {
    return this.playerService.getPlayer(id);
  }

  @Get()
  getAllPlayers() {
    return this.playerService.getAllPlayers();
  }
}
