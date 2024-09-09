import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import { PlayerService } from '../player/player.service';

@WebSocketGateway({ namespace: '/game' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.playerService.createPlayer(client.id);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('placeBet')
  handlePlaceBet(client: Socket, payload: { points: number; multiplier: number }) {
    const playerId = client.id;
    const result = this.gameService.placeBet(playerId, payload.points, payload.multiplier);
    this.server.to(client.id).emit('betPlaced', result);
  }

  @SubscribeMessage('startRound')
  handleStartRound() {
    const roundData = this.gameService.startNewRound();
    this.server.emit('roundStarted', roundData);

    // Simulate multiplier updates
    const updateInterval = setInterval(() => {
      const multiplier = this.gameService.getCurrentMultiplier();
      this.server.emit('multiplierUpdated', { multiplier });

      if (!this.gameService.isRoundInProgress()) {
        clearInterval(updateInterval);
        const results = this.gameService.endRound();
        this.server.emit('roundEnded', results);
      }
    }, 100);
  }
}