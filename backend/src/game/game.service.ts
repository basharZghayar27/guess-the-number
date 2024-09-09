import { Injectable } from '@nestjs/common';
import { PlayerService } from '../player/player.service';

interface Bet {
  playerId: string;
  points: number;
  multiplier: number;
}

@Injectable()
export class GameService {
  private currentMultiplier: number = 1;
  private isRoundActive: boolean = false;
  private bets: Bet[] = [];
  private roundInterval: NodeJS.Timeout | null = null;

  constructor(private playerService: PlayerService) {}

  startNewRound(): { message: string; startTime: number } {
    if (this.isRoundActive) {
      throw new Error('A round is already in progress');
    }

    this.isRoundActive = true;
    this.currentMultiplier = 1;
    this.bets = [];

    const startTime = Date.now();
    this.roundInterval = setInterval(() => this.updateMultiplier(), 100);

    return { message: 'New round started', startTime };
  }

  private updateMultiplier() {
    this.currentMultiplier += 0.01;
    if (Math.random() < 0.01 || this.currentMultiplier >= 10) {
      this.endRound();
    }
  }

  placeBet(playerId: string, points: number, multiplier: number): { success: boolean; message: string } {
    if (!this.isRoundActive) {
      return { success: false, message: 'No active round' };
    }

    const player = this.playerService.getPlayer(playerId);
    if (player.points < points) {
      return { success: false, message: 'Not enough points' };
    }

    this.bets.push({ playerId, points, multiplier });
    this.playerService.deductPoints(playerId, points);

    return { success: true, message: 'Bet placed successfully' };
  }

  endRound(): { winners: any[]; losers: any[]; finalMultiplier: number } {
    if (!this.isRoundActive) {
      throw new Error('No active round to end');
    }

    this.isRoundActive = false;
    if (this.roundInterval) {
      clearInterval(this.roundInterval);
    }

    const winners = [];
    const losers = [];

    this.bets.forEach((bet) => {
      const player = this.playerService.getPlayer(bet.playerId);
      if (bet.multiplier <= this.currentMultiplier) {
        const winnings = Math.floor(bet.points * bet.multiplier);
        this.playerService.addPoints(bet.playerId, winnings);
        winners.push({ ...player, points: winnings });
      } else {
        losers.push(player);
      }
    });

    return { winners, losers, finalMultiplier: this.currentMultiplier };
  }

  getCurrentMultiplier(): number {
    return this.currentMultiplier;
  }

  isRoundInProgress(): boolean {
    return this.isRoundActive;
  }
}