import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginScreen } from "./LoginScreen";
import { X } from "lucide-react";
import { Calculator } from "../apps/Calculator";
import { AboutMe } from "../apps/AboutMe";
import { FileExplorer } from "../apps/FileExplorer";

import { MiniMusicPlayer } from "../apps/MiniMusicPlayer";

interface WindowState {
  id: string;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

export function DesktopWindows() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    aboutme: { id: "aboutme", isOpen: false, zIndex: 1, position: { x: 100, y: 100 } },
    files: { id: "files", isOpen: false, zIndex: 1, position: { x: 200, y: 150 } },
    calculator: { id: "calculator", isOpen: false, zIndex: 1, position: { x: 300, y: 200 } },

  });

  const draggedWindow = useRef<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const desktopRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const openWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        zIndex: Math.max(...Object.values(prev).map((w) => w.zIndex)) + 1,
      },
    }));
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input") || target.closest("iframe")) return;
    
    draggedWindow.current = id;
    const window = windows[id];
    dragOffset.current = {
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggedWindow.current) return;

      const id = draggedWindow.current;
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          position: {
            x: Math.max(0, Math.min(newX, window.innerWidth - 600)),
            y: Math.max(0, Math.min(newY, window.innerHeight - 100)),
          },
          zIndex: Math.max(...Object.values(prev).map((w) => w.zIndex)) + 1,
        },
      }));
    };

    const handleMouseUp = () => {
      draggedWindow.current = null;
    };

    if (draggedWindow.current) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [windows]);

  const Window = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
    const windowState = windows[id];
    if (!windowState.isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed bg-gray-100/90 backdrop-blur-md rounded-lg shadow-2xl border border-gray-300/50 flex flex-col"
        style={{
          width: "600px",
          height: "500px",
          left: `${windowState.position.x}px`,
          top: `${windowState.position.y}px`,
          zIndex: windowState.zIndex,
          overflow: "hidden",
        }}
      >
        {/* Title Bar */}
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 flex items-center justify-between rounded-t-lg cursor-move select-none flex-shrink-0"
          onMouseDown={(e) => handleMouseDown(e, id)}
        >
          <span className="font-semibold text-sm">{title}</span>
          <div className="flex gap-2">
            <button
              onClick={() => closeWindow(id)}
              className="hover:bg-red-500 p-1 rounded transition-colors"
              title="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </motion.div>
    );
  };

  const DesktopIcon = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) => {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="flex flex-col items-center gap-1 p-2 rounded transition-colors group"
      >
        <span className="text-4xl hover:drop-shadow-lg transition-all">{icon}</span>
        <span className="text-xs text-white text-center font-semibold drop-shadow-lg leading-tight">{label}</span>
      </motion.button>
    );
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div
      ref={desktopRef}
      className="fixed inset-0 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/images/login-bg.gif')" }}
    >
      {/* Desktop Icons - Left Sidebar */}
      <div className="fixed left-2 top-8 flex flex-col gap-4 z-10">
        <DesktopIcon
          icon="👨‍💻"
          label="Sobre Mim"
          onClick={() => openWindow("aboutme")}
        />
        <DesktopIcon
          icon="📁"
          label="Arquivos"
          onClick={() => openWindow("files")}
        />
        <DesktopIcon
          icon="🧮"
          label="Calculadora"
          onClick={() => openWindow("calculator")}
        />
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.aboutme.isOpen && (
          <Window key="aboutme" id="aboutme" title="Sobre Mim - Ian Leal">
            <AboutMe />
          </Window>
        )}
        {windows.files.isOpen && (
          <Window key="files" id="files" title="Meus Arquivos">
            <FileExplorer />
          </Window>
        )}
        {windows.calculator.isOpen && (
          <Window key="calculator" id="calculator" title="Calculadora">
            <Calculator />
          </Window>
        )}

      </AnimatePresence>

      {/* Mini Music Player */}
      <MiniMusicPlayer />

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500/40 to-blue-600/40 backdrop-blur-xl border-t border-blue-400/30 px-4 py-3 flex items-center gap-4 z-50">
        <span className="text-white text-sm font-semibold">Ian Leal - Portfólio</span>
        <div className="flex-1" />
        <span className="text-white text-xs">
          {new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}
