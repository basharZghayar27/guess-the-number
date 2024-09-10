// src/hooks/useSocket.js
import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { setRandomMessage } from "../../store/messageSlice";
import { setPlayers } from "../../store/playerSlice";
import { setConnected, setGameResult } from "../../store/gameSlice";

const socket = io("http://localhost:3000");

export const useSocket = () => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    socket.on("connect", () => {
      dispatch(setConnected(false));
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      dispatch(setConnected(false));
    });

    socket.on("playerList", (players) => {
      console.log("TEst", players);
      
      dispatch(setPlayers(players));
    });

    socket.on("gameResult", (result) => {
      dispatch(setGameResult(result));
    });

    socket.on("randomMessage", (messageData) => {
      dispatch(setRandomMessage(messageData));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("playerList");
      socket.off("gameResult");
      socket.off("randomMessage");
    };
  }, [dispatch]);

  const createPlayer = useCallback((playerName: string) => {
    setIsConnected(true);
    dispatch(setConnected(true));
    socket.emit("createPlayer", playerName);
  }, [dispatch]);

  const startGame = useCallback((betPoints: number, detectedValue: number) => {
    socket.emit("startGame", { betPoints, detectedValue });
  }, []);

  const sendMessage = useCallback((message: string) => {
    socket.emit("messageToPlayer", message);
  }, []);

  return { isConnected, createPlayer, startGame, sendMessage };
};
