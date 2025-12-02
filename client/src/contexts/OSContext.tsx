import React, { createContext, useContext, useState, ReactNode } from "react";

export type AppID = "finder" | "music" | "calculator" | "trash" | "cv" | "projects" | "about";

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position?: { x: number; y: number };
}

interface OSContextType {
  windows: Record<AppID, WindowState>;
  activeApp: AppID | null;
  username: string;
  setUsername: (name: string) => void;
  musicState: {
    isPlaying: boolean;
    volume: number;
    currentSongIndex: number;
  };
  toggleMusic: () => void;
  setVolume: (vol: number) => void;
  nextSong: () => void;
  prevSong: () => void;
  openApp: (id: AppID) => void;
  closeApp: (id: AppID) => void;
  minimizeApp: (id: AppID) => void;
  maximizeApp: (id: AppID) => void;
  focusApp: (id: AppID) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

const INITIAL_WINDOWS: Record<AppID, WindowState> = {
  finder: { id: "finder", title: "Finder", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  music: { id: "music", title: "Music", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  calculator: { id: "calculator", title: "Calculator", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  trash: { id: "trash", title: "Trash", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  cv: { id: "cv", title: "Curriculum Vitae", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  projects: { id: "projects", title: "My Projects", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  about: { id: "about", title: "About Me", isOpen: true, isMinimized: false, isMaximized: false, zIndex: 10 }, // Starts open
};

export function OSProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<Record<AppID, WindowState>>(INITIAL_WINDOWS);
  const [activeApp, setActiveApp] = useState<AppID | null>("about");
  const [username, setUsername] = useState("Visitante");
  const [maxZIndex, setMaxZIndex] = useState(10);
  
  // Music State
  const [musicState, setMusicState] = useState({
    isPlaying: false,
    volume: 50,
    currentSongIndex: 0
  });

  const toggleMusic = () => setMusicState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  const setVolume = (volume: number) => setMusicState(prev => ({ ...prev, volume }));
  const nextSong = () => setMusicState(prev => ({ ...prev, currentSongIndex: (prev.currentSongIndex + 1) % 4 })); // Assuming 4 songs for now
  const prevSong = () => setMusicState(prev => ({ ...prev, currentSongIndex: (prev.currentSongIndex - 1 + 4) % 4 }));

  const focusApp = (id: AppID) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setActiveApp(id);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: newZIndex, isMinimized: false },
    }));
  };

  const openApp = (id: AppID) => {
    if (!windows[id].isOpen) {
      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isOpen: true, zIndex: newZIndex, isMinimized: false },
      }));
      setActiveApp(id);
    } else {
      focusApp(id);
    }
  };

  const closeApp = (id: AppID) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
    if (activeApp === id) {
      setActiveApp(null);
    }
  };

  const minimizeApp = (id: AppID) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    if (activeApp === id) {
      setActiveApp(null);
    }
  };

  const maximizeApp = (id: AppID) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
    focusApp(id);
  };

  return (
    <OSContext.Provider
      value={{
        windows,
        activeApp,
        username,
        setUsername,
        musicState,
        toggleMusic,
        setVolume,
        nextSong,
        prevSong,
        openApp,
        closeApp,
        minimizeApp,
        maximizeApp,
        focusApp,
      }}
    >
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (context === undefined) {
    throw new Error("useOS must be used within an OSProvider");
  }
  return context;
}
