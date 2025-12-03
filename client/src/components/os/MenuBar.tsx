import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Wifi, Battery, Search, Command, Play, Pause, Volume2, Volume1, VolumeX } from "lucide-react";
import { useOS } from "../../contexts/OSContext";

export function MenuBar() {
  const [time, setTime] = useState(new Date());
  const { musicState, toggleMusic, setVolume } = useOS();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVolumeClick = () => {
    if (musicState.volume > 0) setVolume(0);
    else setVolume(50);
  };

  return (
    <div className="h-8 w-full bg-white/20 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 fixed top-0 z-50 text-white text-sm font-medium shadow-sm select-none">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 font-bold text-base hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">
          <span className="text-lg"></span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="font-bold cursor-default">Finder</span>
          <span className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">Arquivo</span>
          <span className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">Editar</span>
          <span className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">Visualizar</span>
          <span className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">Ir</span>
          <span className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">Janela</span>
          <span className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">Ajuda</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Music Controls */}
        <div className="flex items-center gap-2 mr-4 bg-black/20 rounded-full px-2 py-0.5 border border-white/10">
          <button onClick={toggleMusic} className="hover:text-blue-300 transition-colors">
            {musicState.isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
          <button onClick={handleVolumeClick} className="hover:text-blue-300 transition-colors">
            {musicState.volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : 
             musicState.volume < 50 ? <Volume1 className="w-3.5 h-3.5" /> : 
             <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3 mr-2">
          <Battery className="w-5 h-5" />
          <Wifi className="w-4 h-4" />
          <Search className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">
          <Command className="w-4 h-4" />
          <span className="capitalize">{format(time, "EEE d MMM HH:mm", { locale: ptBR })}</span>
        </div>
      </div>
    </div>
  );
}
