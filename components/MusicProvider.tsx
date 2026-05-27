"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

export const TRACKS = [
  { src: "/outfits/music/atlasaudio-jazz-519632.mp3",                                        title: "Atlas Jazz"        },
  { src: "/outfits/music/sigmamusicart-jazz-lounge-relaxing-background-music-412597.mp3",    title: "Jazz Lounge I"     },
  { src: "/outfits/music/sigmamusicart-jazz-lounge-relaxing-background-music-514554.mp3",    title: "Jazz Lounge II"    },
];

const UNLOCK_EVENTS = ["click", "touchstart", "pointerdown", "keydown"] as const;

interface MusicCtx {
  playing: boolean;
  blocked: boolean;
  trackIdx: number;
  trackTitle: string;
  toggle: () => void;
  next: () => void;
  prev: () => void;
}

const MusicContext = createContext<MusicCtx>({
  playing: false, blocked: false, trackIdx: 0, trackTitle: TRACKS[0].title,
  toggle: () => {}, next: () => {}, prev: () => {},
});

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const mediaRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);

  useEffect(() => {
    const v = document.createElement("video");
    v.src = TRACKS[0].src;
    v.volume = 0.45;
    v.muted = true;
    v.playsInline = true;
    mediaRef.current = v;

    v.play()
      .then(() => { v.muted = false; setPlaying(true); })
      .catch(() => {
        setBlocked(true);
        const unlock = () => {
          v.muted = false;
          v.play().then(() => { setPlaying(true); setBlocked(false); }).catch(() => {});
          UNLOCK_EVENTS.forEach((e) => document.removeEventListener(e, unlock));
        };
        UNLOCK_EVENTS.forEach((e) => document.addEventListener(e, unlock));
      });

    return () => { v.pause(); };
  }, []);

  useEffect(() => {
    const v = mediaRef.current;
    if (!v) return;
    const onEnded = () => setTrackIdx((i) => (i + 1) % TRACKS.length);
    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, []);

  useEffect(() => {
    const v = mediaRef.current;
    if (!v) return;
    const wasPlaying = playing;
    v.pause();
    v.src = TRACKS[trackIdx].src;
    v.muted = false;
    v.load();
    if (wasPlaying) v.play().catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIdx]);

  const toggle = () => {
    const v = mediaRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { v.muted = false; v.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const next = () => setTrackIdx((i) => (i + 1) % TRACKS.length);
  const prev = () => setTrackIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);

  return (
    <MusicContext.Provider value={{ playing, blocked, trackIdx, trackTitle: TRACKS[trackIdx].title, toggle, next, prev }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}
