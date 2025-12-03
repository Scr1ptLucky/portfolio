import { useOS, AppID } from "../../contexts/OSContext";
import { motion } from "framer-motion";
import { useRef } from "react";

interface DockItemProps {
  id: AppID;
  icon: string;
  label: string;
}

const DOCK_ITEMS: DockItemProps[] = [
  { id: "finder", icon: "/images/icon-finder.png", label: "Finder" },
  { id: "projects", icon: "/images/icon-folder.png", label: "Projects" },
  { id: "music", icon: "/images/icon-music.png", label: "Music" },
  { id: "calculator", icon: "/images/icon-calculator.png", label: "Calculator" },
  { id: "cv", icon: "/images/icon-cv.png", label: "Resume" },
  { id: "trash", icon: "/images/icon-trash.png", label: "Trash" },
];

export function Dock() {
  const { openApp, windows, activeApp } = useOS();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-3 px-4 py-3 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl">
        {DOCK_ITEMS.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            isOpen={windows[item.id].isOpen}
            isActive={activeApp === item.id}
            onClick={() => openApp(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

function DockIcon({
  item,
  isOpen,
  isActive,
  onClick,
}: {
  item: DockItemProps;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <div className="group relative flex flex-col items-center gap-1">
      {/* Tooltip */}
      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-md pointer-events-none whitespace-nowrap">
        {item.label}
      </div>

      <motion.button
        ref={ref}
        onClick={onClick}
        whileHover={{ scale: 1.2, y: -10 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl relative transition-all duration-200 ease-out"
      >
        <img
          src={item.icon}
          alt={item.label}
          className="w-full h-full object-cover drop-shadow-lg"
        />
      </motion.button>

      {/* Active Indicator */}
      <div className={`w-1 h-1 rounded-full bg-white/80 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
