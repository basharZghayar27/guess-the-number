// src/hooks/useSocket.js
import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { setRandomMessage } from "../../store/messageSlice";
import { setPlayers, setPlayerName } from "../../store/playerSlice";
import {
  setConnected,
  setGameBet,
  setGameResult,
  setGameStarted,
} from "../../store/gameSlice";

const socket = io("http://localhost:3000");

export const useSocket = () => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    socket.on("connect", () => {
      dispatch(setGameStarted(false));
      dispatch(setConnected(false));
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      dispatch(setConnected(false));
    });

    socket.on("playerList", (players) => {
      setIsConnected(true);
      dispatch(setPlayers(players));
    });

    socket.on("gameStarted", (result) => {
      dispatch(setGameStarted(true));
      dispatch(setGameResult(result));
    });

    socket.on("gameResult", (result) => {
      dispatch(setGameBet(result));
    });

    socket.on("randomMessage", (messageData) => {
      dispatch(setRandomMessage(messageData));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("playerList");
      socket.off("gameStarted");
      socket.off("randomMessage");
    };
  }, [dispatch]);

  const createPlayer = useCallback((playerName: string) => {
    setIsConnected(true);
    dispatch(setPlayerName({ playerName }));

    socket.emit("createPlayer", playerName);
  }, []);

  const startGame = useCallback(
    (playerName: string, betPoints: number, detectedValue: number) => {
      socket.emit("startGame", { playerName, betPoints, detectedValue });
    },
    []
  );

  const sendMessage = useCallback((message: string) => {
    socket.emit("messageToPlayer", message);
  }, []);

  return { isConnected, createPlayer, startGame, sendMessage };
};
