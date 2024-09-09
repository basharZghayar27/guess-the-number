import { Injectable } from '@nestjs/common';
import { IPlayer } from './dtos/IPlayer';

@Injectable()
export class PlayerService {
  private players: Map<string, IPlayer> = new Map();

  createPlayer(name: string): void {
    const id = (this.players.size + 1).toString();
    this.players.set(id, { id, name, points: 1000 });
  }

  getPlayer(id: string): IPlayer {
    const player = this.players.get(id);
    return player;
  }

  addPoints(id: string, points: number): void {
    const player = this.getPlayer(id);
    player.points += points;
  }

  deductPoints(id: string, points: number): void {
    const player = this.getPlayer(id);
    player.points -= points;
  }

  getAllPlayers(): IPlayer[] {
    return Array.from(this.players.values());
  }
}
