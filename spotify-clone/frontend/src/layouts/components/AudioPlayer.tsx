import { usePlayerStore } from "@/store/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  useEffect(() => {
    if(isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  },[isPlaying])

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
        playNext();
    }

    audio?.addEventListener("ended", handleEnded)

    return () => audio?.removeEventListener("ended", handleEnded);
  },[playNext])

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    const isSongChangue = prevSongRef.current !== currentSong?.audioUrl;

    if (isSongChangue) {
        audio.src = currentSong?.audioUrl;
        audio.currentTime = 0;
        if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying])

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
