"use client";

import { useSocket } from "@/providers/socket-provider";

export function SocketIndicator() {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <div className="text-red-500 rounded-full bg-yellow-500 px-6 py-2 ">
        Fallback: Socket not connected
      </div>
    );
  }

  return (
    <div className="text-white rounded-full bg-emerald-500 px-6 py-2 ">
      Fallback: Real time chat
    </div>
  );
}
