"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    if (audioRef.current && audioRef.current.readyState >= 3) {
      setAudioLoaded(true);
    }
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (!isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Playback failed:", err);
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={togglePlay}
        disabled={!audioLoaded}
        className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-400"
      >
        {audioLoaded ? (isPlaying ? "Pause Music" : "Play Music") : "Loading..."}
      </button>

      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
        onCanPlayThrough={() => setAudioLoaded(true)}
      >
        <source src="/api/music" type="audio/mp3" />
      </audio>
    </div>
  );
}
