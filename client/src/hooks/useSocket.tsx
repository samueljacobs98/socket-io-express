import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

type EventHandler = {
  name: string;
  handler: (data: unknown) => void;
};

export const useSocket = (path: string, eventHandlers: EventHandler[]) => {
  const socketRef = useRef(io(path));

  const [isConnected, setIsConnected] = useState(socketRef.current.connected);

  const onConnect = () => {
    console.log("connected!");
    setIsConnected(true);
  };

  const onDisconnect = () => {
    console.log("disconnected!");
    setIsConnected(false);
  };

  useEffect(() => {
    const socket = socketRef.current;

    // Listen for socket events
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    eventHandlers.forEach((e) => socket.on(e.name, e.handler));

    // Cleanup on component unmount
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      eventHandlers.forEach((e) => socket.off(e.name, e.handler));
    };
  }, [path, eventHandlers]);

  // useEffect(() => {
  //   const socket = socketRef.current;

  //   console.log("isConnected", isConnected);
  //   if (isConnected) {
  //     console.log("sending message");
  //     socket.emit("message", JSON.stringify({ message: "hello" }));
  //   }
  // }, [isConnected]);

  const emit = (eventName: string, data: unknown) => {
    socketRef.current.emit(eventName, data);
  };

  return { isConnected, emit };
};
