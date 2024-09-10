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
const players = [];
/** @type {Player[]} */
let generatedPlayers = [];

// Utility function to generate random values between 0 and 10.00
const getRandomValue = () => Number((Math.random() * 10).toFixed(2));

// Create 4 random players with 1000 points
const generatePlayers = () => {
  for (let i = 0; i < 4; i++) {
    const player = {
      playerName: `Player${i + 1}`,
      points: 1000,
    };
    generatedPlayers.push(player);
  }
};

// Utility function to get a random player name
const getRandomPlayerName = () => {
  const allPlayers = [...players, ...generatedPlayers];
  if (allPlayers.length === 0) return "Unknown Player";
  const randomIndex = Math.floor(Math.random() * allPlayers.length);
  return allPlayers[randomIndex].playerName;
};

// Handle socket.io connections
io.on("connection", (socket) => {
  console.log("A player connected", socket.id);

  // When a player is created
  socket.on("createPlayer", (playerName) => {
    const player = {
      playerName,
      points: 1000,
    };
    players.push(player);
    // Send the list of generated players along with the newly created player
    if (generatedPlayers.length === 0) generatePlayers();    
    socket.emit("playerList", [...players, ...generatedPlayers]);
  });

  // Handle the 'startGame' action
  socket.on("startGame", ({ betPoints, detectedValue }) => {
    // Generate random values for the 4 generated players
    generatedPlayers = generatedPlayers.map((player) => {
      const multiplier = getRandomValue();
      return {
        ...player,
        points: player.points - betPoints,
        roundPoints: Number((Math.random() * player.points).toFixed(0)),
        detectedValue: multiplier,
      };
    });
    // Emit the updated player details to all clients
    socket.emit("gameResult", generatedPlayers);
  });

  // Send random messages to a player via socket
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

  // Handle player disconnection
  socket.on("disconnect", () => {
    console.log("A player disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
