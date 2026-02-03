"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const formatTimeRemaining = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const Room = () => {
  const params = useParams();
  const roomId = params.roomId as string;

  const [copyStatus, setCopyStatus] = useState<string>("COPY");
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopyStatus("COPIED!");
    setTimeout(() => {
      setCopyStatus("COPY");
    }, 2500);
  };

  return (
    <main className="flex flex-col h-screen max-h-screen overflow-hidden">
      <header className="border-b border-zinc-800 bg-zinc-900/30 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs uppercase">ROOM ID</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-green-500">{roomId}</span>
              <button
                onClick={() => handleCopy()}
                className="text-[10px] bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer uppercase"
              >
                {copyStatus}
              </button>
            </div>
          </div>

          <div className="h-8 bg-zinc-700 w-px" />

          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase">
              SELF-DESTRUCT
            </span>
            <span
              className={`text-sm font-bold flex items-center gap-2 ${
                timeRemaining !== null && timeRemaining < 60
                  ? "text-red-500"
                  : "text-amber-500"
              }`}
            >
              {timeRemaining !== null
                ? formatTimeRemaining(timeRemaining)
                : "--:--"}
            </span>
          </div>
        </div>

        <button className="text-xs px-3 py-2 rounded bg-zinc-800 hover:bg-red-600 text-zinc-400 hover:text-white font-bold transition-all group flex items center gap-2 disabled:opacity-50 cursor-pointer">
          <span className="group-hover:animate-pulse">💣</span>
          <span>DESTROY NOW</span>
        </button>
      </header>
    </main>
  );
};

export default Room;
