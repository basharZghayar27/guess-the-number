const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

// Define the player structure
/**
 * @typedef {Object} Player
 * @property {string} playerName
 * @property {number} points
 * @property {number} [detectedValue]
 */

/** @type {Player[]} */
let players = [];
/** @type {Player[]} */
let generatedPlayers = [];
/** @type {Player} */
let currentPlayer = {};

let gameBet = 0;

const getRandomValue = () => Number((Math.random() * 10).toFixed(2));

const generatePlayers = () => {
  for (let i = 0; i < 4; i++) {
    const player = {
      playerName: `Player${i + 1}`,
      points: 1000,
    };
    generatedPlayers.push(player);
  }
};

const getRandomPlayerName = () => {
  const allPlayers = [...players, ...generatedPlayers];
  if (allPlayers.length === 0) return "Unknown Player";
  const randomIndex = Math.floor(Math.random() * allPlayers.length);
  return allPlayers[randomIndex].playerName;
};

io.on("connection", (socket) => {
  socket.on("createPlayer", (playerName) => {
    players = [];
    currentPlayer = { ...currentPlayer, playerName: playerName };
    const player = {
      playerName,
      points: 1000,
    };
    players.push(player);
    if (generatedPlayers.length === 0) generatePlayers();
    socket.emit("playerList", [...players, ...generatedPlayers]);
  });

  socket.on("startGame", ({ playerName, betPoints, detectedValue }) => {
    gameBet = getRandomValue();
    const allPlayers = [...players, ...generatedPlayers];
    const roundPoints = betPoints * detectedValue;
    generatedPlayers = allPlayers.map((player) => {
      const multiplier = getRandomValue();
      if (playerName !== player.playerName) {
        return {
          ...player,
          points: player.points - betPoints * multiplier,
          roundPoints: betPoints * multiplier,
          detectedValue: multiplier,
        };
      } else {
        return {
          ...player,
          points: player.points - roundPoints,
          roundPoints: roundPoints,
          detectedValue: detectedValue,
        };
      }
    });
    socket.emit("gameStarted", generatedPlayers);
    socket.emit("gameResult", gameBet);
  });

  socket.on("messageToPlayer", (message) => {
    const randomMessage = `Random Message: ${Math.random()
      .toString(36)
      .substr(2, 5)}`;
    const randomPlayerName = getRandomPlayerName();
    socket.emit("randomMessage", {
      message: randomMessage,
      playerName: randomPlayerName,
    });
  });

  socket.on("disconnect", () => {
    players = [];
    generatedPlayers = [];
    console.log("A player disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
