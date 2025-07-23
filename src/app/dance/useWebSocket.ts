import { useEffect, useRef, useCallback } from "react";
import { message } from "antd";

interface WebSocketMessage {
  type: "courseUpdate" | "error";
  data: {
    courseId: string;
    status: "available" | "unavailable";
    teacherName?: string;
    courseName?: string;
  };
}

export const useWebSocket = (
  onCourseUpdate: (courseId: string, status: string) => void,
) => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    try {
      // Replace with your WebSocket server URL
      const wsUrl =
        process.env.NEXT_PUBLIC_WS_URL || "wss://your-ws-server.com";
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log("WebSocket Connected");
        message.success("Connected to real-time updates");

        // Clear any reconnection timeout
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
      };

      ws.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);

          if (message.type === "courseUpdate") {
            onCourseUpdate(message.data.courseId, message.data.status);

            // Show notification for available seats
            if (message.data.status === "available") {
              message.info(
                `Seat available in ${message.data.courseName} with ${message.data.teacherName}!`,
                3,
              );
            }
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.current.onclose = () => {
        console.log("WebSocket Disconnected");
        message.warning("Connection lost. Reconnecting...");

        // Attempt to reconnect after 5 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 5000);
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket Error:", error);
        message.error("Connection error");
      };
    } catch (error) {
      console.error("WebSocket Connection Error:", error);
    }
  }, [onCourseUpdate]);

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connect]);

  // Function to send messages to the WebSocket server
  const sendMessage = useCallback((message: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected");
    }
  }, []);

  return { sendMessage };
};
