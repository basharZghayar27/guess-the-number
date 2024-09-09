import { Module } from '@nestjs/common';
import { PlayerModule } from 'src/player/player.module';
import { GameService } from './game.service';

@Module({
  imports: [PlayerModule],
  controllers: [],
  providers: [GameService],
  exports: [],
})
export class GameModule {}
