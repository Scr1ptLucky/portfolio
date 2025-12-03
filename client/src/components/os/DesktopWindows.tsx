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
  const [isMobile, setIsMobile] = useState(false);
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    aboutme: { id: "aboutme", isOpen: false, zIndex: 1, position: { x: 100, y: 100 } },
    files: { id: "files", isOpen: false, zIndex: 1, position: { x: 200, y: 150 } },
    calculator: { id: "calculator", isOpen: false, zIndex: 1, position: { x: 300, y: 200 } },
  });

  const draggedWindow = useRef<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const desktopRef = useRef<HTMLDivElement>(null);

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogin = (username: string) => {
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
    if (isMobile) return;
    
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
    if (isMobile) return;

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
  }, [windows, isMobile]);

  const Window = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
    const window = windows[id];
    
    if (isMobile) {
      // Modal fullscreen para mobile
      return (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 md:relative md:w-[600px] md:h-[500px] md:rounded-lg md:shadow-2xl md:border md:border-white/10"
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-gray-800 to-gray-700 border-b border-white/10 flex-shrink-0">
            <h2 className="text-white font-semibold text-sm md:text-base">{title}</h2>
            <button
              onClick={() => closeWindow(id)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </motion.div>
      );
    }

    // Desktop version com drag
    return (
      <motion.div
        key={id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          position: "absolute",
          left: `${window.position.x}px`,
          top: `${window.position.y}px`,
          zIndex: window.zIndex,
        }}
        className="w-[600px] h-[500px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl border border-white/10 flex flex-col overflow-hidden"
      >
        {/* Title Bar */}
        <div
          onMouseDown={(e) => handleMouseDown(e, id)}
          className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-700 border-b border-white/10 cursor-move flex-shrink-0"
        >
          <h2 className="text-white font-semibold">{title}</h2>
          <button
            onClick={() => closeWindow(id)}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </motion.div>
    );
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div
      ref={desktopRef}
      className="fixed inset-0 z-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login-bg.gif')" }}
    >
      {/* Desktop Icons - Responsive Layout */}
      <div className="absolute left-0 top-0 p-4 md:p-8 flex flex-wrap gap-4 md:gap-8 md:flex-col md:w-auto w-full">
        {/* Sobre Mim */}
        <button
          onClick={() => openWindow("aboutme")}
          className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity group"
        >
          <div className="text-4xl md:text-5xl group-hover:scale-110 transition-transform">👨‍💻</div>
          <span className="text-white text-xs md:text-sm font-medium text-center max-w-[60px]">Sobre Mim</span>
        </button>

        {/* Arquivos */}
        <button
          onClick={() => openWindow("files")}
          className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity group"
        >
          <div className="text-4xl md:text-5xl group-hover:scale-110 transition-transform">📁</div>
          <span className="text-white text-xs md:text-sm font-medium text-center max-w-[60px]">Arquivos</span>
        </button>

        {/* Calculadora */}
        <button
          onClick={() => openWindow("calculator")}
          className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity group"
        >
          <div className="text-4xl md:text-5xl group-hover:scale-110 transition-transform">🧮</div>
          <span className="text-white text-xs md:text-sm font-medium text-center max-w-[60px]">Calculadora</span>
        </button>
      </div>

      {/* Windows Container */}
      <AnimatePresence>
        {windows.aboutme.isOpen && (
          <div className={isMobile ? "fixed inset-0 z-50 overflow-y-auto" : "absolute inset-0 pointer-events-none"}>
            <Window key="aboutme" id="aboutme" title="Sobre Mim">
              <AboutMe />
            </Window>
          </div>
        )}

        {windows.files.isOpen && (
          <div className={isMobile ? "fixed inset-0 z-50 overflow-y-auto" : "absolute inset-0 pointer-events-none"}>
            <Window key="files" id="files" title="Arquivos">
              <FileExplorer />
            </Window>
          </div>
        )}

        {windows.calculator.isOpen && (
          <div className={isMobile ? "fixed inset-0 z-50 overflow-y-auto" : "absolute inset-0 pointer-events-none"}>
            <Window key="calculator" id="calculator" title="Calculadora">
              <Calculator />
            </Window>
          </div>
        )}
      </AnimatePresence>

      {/* Mini Music Player */}
      <MiniMusicPlayer />
    </div>
  );
}
