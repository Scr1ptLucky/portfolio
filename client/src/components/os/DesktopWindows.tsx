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
    aboutme: { id: "aboutme", isOpen: false, zIndex: 1, position: { x: 50, y: 50 } },
    files: { id: "files", isOpen: false, zIndex: 1, position: { x: 100, y: 100 } },
    calculator: { id: "calculator", isOpen: false, zIndex: 1, position: { x: 150, y: 150 } },
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
            x: Math.max(0, Math.min(newX, window.innerWidth - 400)),
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
      // Modal fullscreen para mobile - otimizado
      return (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 safe-area-inset"
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm border-b border-white/5 flex-shrink-0">
            <h2 className="text-white font-semibold text-base truncate">{title}</h2>
            <button
              onClick={() => closeWindow(id)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors active:bg-white/20"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content - com padding seguro */}
          <div className="flex-1 overflow-y-auto pb-safe">
            {children}
          </div>
        </motion.div>
      );
    }

    // Desktop version com drag - otimizado
    return (
      <motion.div
        key={id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          left: `${window.position.x}px`,
          top: `${window.position.y}px`,
          zIndex: window.zIndex,
        }}
        className="w-[500px] h-[450px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl border border-white/10 flex flex-col overflow-hidden backdrop-blur-sm"
      >
        {/* Title Bar */}
        <div
          onMouseDown={(e) => handleMouseDown(e, id)}
          className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-b border-white/5 cursor-move flex-shrink-0 hover:from-gray-800 hover:to-gray-700 transition-colors"
        >
          <h2 className="text-white font-semibold text-sm">{title}</h2>
          <button
            onClick={() => closeWindow(id)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-white" />
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
      <div className="absolute left-0 top-0 p-3 md:p-6 flex flex-wrap gap-3 md:gap-6 md:flex-col md:w-auto w-full">
        {/* Sobre Mim */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openWindow("aboutme")}
          className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity group"
        >
          <div className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-200">👨‍💻</div>
          <span className="text-white text-xs md:text-sm font-medium text-center max-w-[60px] leading-tight">Sobre Mim</span>
        </motion.button>

        {/* Arquivos */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openWindow("files")}
          className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity group"
        >
          <div className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-200">📁</div>
          <span className="text-white text-xs md:text-sm font-medium text-center max-w-[60px] leading-tight">Arquivos</span>
        </motion.button>

        {/* Calculadora */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openWindow("calculator")}
          className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity group"
        >
          <div className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-200">🧮</div>
          <span className="text-white text-xs md:text-sm font-medium text-center max-w-[60px] leading-tight">Calculadora</span>
        </motion.button>
      </div>

      {/* Windows Container */}
      <AnimatePresence mode="wait">
        {windows.aboutme.isOpen && (
          <div className={isMobile ? "fixed inset-0 z-50" : "absolute inset-0 pointer-events-none"}>
            <Window key="aboutme" id="aboutme" title="Sobre Mim">
              <AboutMe />
            </Window>
          </div>
        )}

        {windows.files.isOpen && (
          <div className={isMobile ? "fixed inset-0 z-50" : "absolute inset-0 pointer-events-none"}>
            <Window key="files" id="files" title="Arquivos">
              <FileExplorer />
            </Window>
          </div>
        )}

        {windows.calculator.isOpen && (
          <div className={isMobile ? "fixed inset-0 z-50" : "absolute inset-0 pointer-events-none"}>
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
