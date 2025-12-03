import { useOS, AppID } from "../../contexts/OSContext";
import { Rnd } from "react-rnd";
import { X, Minus, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useRef } from "react";

interface WindowProps {
  id: AppID;
  children: ReactNode;
  initialSize?: { width: number; height: number };
  initialPosition?: { x: number; y: number };
}

export function Window({ id, children, initialSize = { width: 600, height: 400 }, initialPosition }: WindowProps) {
  const { windows, closeApp, minimizeApp, maximizeApp, focusApp } = useOS();
  const windowState = windows[id];
  const nodeRef = useRef(null); // Ref for draggable node to avoid findDOMNode warning

  if (!windowState.isOpen) return null;

  // Calculate center position if not provided
  const defaultX = typeof window !== 'undefined' ? (window.innerWidth - initialSize.width) / 2 : 100;
  const defaultY = typeof window !== 'undefined' ? (window.innerHeight - initialSize.height) / 2 : 100;

  return (
    <AnimatePresence>
      {!windowState.isMinimized && (
        <Rnd
          default={{
            x: initialPosition?.x || defaultX,
            y: initialPosition?.y || defaultY,
            width: initialSize.width,
            height: initialSize.height,
          }}
          minWidth={300}
          minHeight={200}
          bounds="parent"
          dragHandleClassName="window-header"
          style={{ zIndex: windowState.zIndex }}
          onMouseDown={() => focusApp(id)}
          enableResizing={!windowState.isMaximized}
          disableDragging={windowState.isMaximized}
          size={windowState.isMaximized ? { width: "100%", height: "100%" } : undefined}
          position={windowState.isMaximized ? { x: 0, y: 32 } : undefined} // 32px for menu bar
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full flex flex-col bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Window Header */}
            <div className="window-header h-10 flex items-center justify-between px-4 bg-gradient-to-b from-white/50 to-white/20 border-b border-white/10 cursor-default">
              <div className="flex items-center gap-2 group">
                <button
                  onClick={(e) => { e.stopPropagation(); closeApp(id); }}
                  className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E] flex items-center justify-center hover:brightness-90 transition-all"
                >
                  <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
                  className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24] flex items-center justify-center hover:brightness-90 transition-all"
                >
                  <Minus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); maximizeApp(id); }}
                  className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29] flex items-center justify-center hover:brightness-90 transition-all"
                >
                  <Maximize2 className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
                </button>
              </div>
              <div className="text-sm font-medium text-gray-700/80">{windowState.title}</div>
              <div className="w-14" /> {/* Spacer for centering title */}
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto relative">
              {children}
            </div>
          </motion.div>
        </Rnd>
      )}
    </AnimatePresence>
  );
}
