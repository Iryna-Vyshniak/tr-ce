import { useEffect, useRef, useState } from "react";

import type { InterrogationAudioClip } from "../data/interrogationAudio";

interface InterrogationAudioPlayerProps {
  clip: InterrogationAudioClip;
  isPlaying: boolean;
  listenLabel: string;
  pauseLabel: string;
  progressLabel: string;
  unavailableLabel: string;
  onPlayingChange: (isPlaying: boolean) => void;
}

function formatTime(seconds: number) {
  const totalSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function InterrogationAudioPlayer({
  clip,
  isPlaying,
  listenLabel,
  pauseLabel,
  progressLabel,
  unavailableLabel,
  onPlayingChange,
}: InterrogationAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(clip.duration);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!isPlaying && audio && !audio.paused) {
      audio.pause();
    }
  }, [isPlaying]);

  function handleTogglePlayback() {
    const audio = audioRef.current;

    if (!audio || hasError) {
      return;
    }

    if (audio.paused) {
      void audio.play().catch(() => {
        setHasError(true);
        onPlayingChange(false);
      });
      return;
    }

    audio.pause();
  }

  function handleSeek(nextTime: number) {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  if (hasError) {
    return (
      <p className="trce-interrogation-audio__unavailable" role="status">
        {unavailableLabel}
      </p>
    );
  }

  return (
    <div className="trce-interrogation-audio">
      <audio
        onEnded={() => onPlayingChange(false)}
        onError={() => {
          setHasError(true);
          onPlayingChange(false);
        }}
        onLoadedMetadata={(event) => {
          if (Number.isFinite(event.currentTarget.duration)) {
            setDuration(event.currentTarget.duration);
          }
        }}
        onPause={() => onPlayingChange(false)}
        onPlay={() => onPlayingChange(true)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        preload="metadata"
        ref={audioRef}
        src={clip.src}
      />

      <button
        aria-label={isPlaying ? pauseLabel : listenLabel}
        className="trce-interrogation-audio__control"
        onClick={handleTogglePlayback}
        type="button"
      >
        <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
        <span>{isPlaying ? pauseLabel : listenLabel}</span>
      </button>

      <label className="trce-interrogation-audio__progress">
        <span className="sr-only">{progressLabel}</span>
        <input
          aria-label={progressLabel}
          max={duration || clip.duration}
          min="0"
          onChange={(event) => handleSeek(Number(event.currentTarget.value))}
          step="0.01"
          type="range"
          value={Math.min(currentTime, duration || clip.duration)}
        />
        <span aria-hidden="true">
          {formatTime(currentTime)} / {formatTime(duration || clip.duration)}
        </span>
      </label>
    </div>
  );
}
