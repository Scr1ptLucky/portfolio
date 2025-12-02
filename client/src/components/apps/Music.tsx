import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic } from "lucide-react";
import { motion } from "framer-motion";
import { useOS } from "@/contexts/OSContext";

const SONGS = [
  { id: 1, title: "Lo-Fi Study Beats", artist: "Chill Vibes", duration: "3:45" },
  { id: 2, title: "Coding Night", artist: "Dev Tunes", duration: "4:20" },
  { id: 3, title: "Focus Flow", artist: "Brain Waves", duration: "3:10" },
  { id: 4, title: "Deep Work", artist: "Productivity", duration: "5:15" },
];

export function Music() {
  const { musicState, toggleMusic, nextSong, prevSong } = useOS();
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const currentSong = SONGS[musicState.currentSongIndex];

  useEffect(() => {
    if (musicState.isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [musicState.isPlaying]);

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Sidebar & Content Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50 border-r border-gray-200 p-4 hidden sm:flex flex-col gap-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Biblioteca</div>
          <div className="flex items-center gap-2 text-red-500 bg-red-50 px-2 py-1.5 rounded-md font-medium text-sm">
            <Play className="w-4 h-4 fill-current" />
            Ouvir Agora
          </div>
          <div className="flex items-center gap-2 text-gray-600 px-2 py-1.5 rounded-md font-medium text-sm hover:bg-gray-100 transition-colors cursor-pointer">
            <ListMusic className="w-4 h-4" />
            Explorar
          </div>
          <div className="flex items-center gap-2 text-gray-600 px-2 py-1.5 rounded-md font-medium text-sm hover:bg-gray-100 transition-colors cursor-pointer">
            <Volume2 className="w-4 h-4" />
            Rádio
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50">
          <motion.div
            key={currentSong.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md aspect-video rounded-xl shadow-2xl mb-8 overflow-hidden relative"
          >
            <img 
              src="/images/lofi-girl.jpg" 
              alt="Lo-Fi Girl" 
              className="w-full h-full object-cover"
            />
            {!musicState.isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
            )}
          </motion.div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{currentSong.title}</h2>
            <p className="text-gray-500 font-medium">{currentSong.artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md mb-8 group cursor-pointer">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-400 group-hover:bg-red-500 transition-colors" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-8">
            <button onClick={prevSong} className="text-gray-400 hover:text-gray-900 transition-colors">
              <SkipBack className="w-8 h-8 fill-current" />
            </button>
            <button 
              onClick={toggleMusic}
              className="w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shadow-sm"
            >
              {musicState.isPlaying ? (
                <Pause className="w-8 h-8 text-gray-900 fill-current" />
              ) : (
                <Play className="w-8 h-8 text-gray-900 fill-current ml-1" />
              )}
            </button>
            <button onClick={nextSong} className="text-gray-400 hover:text-gray-900 transition-colors">
              <SkipForward className="w-8 h-8 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
