import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

export function MusicPlayerSpotify() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const PLAYLISTS = [
    { id: 1, title: "Lo-Fi Study Beats", artist: "Chill Vibes", duration: "3:45" },
    { id: 2, title: "Coding Night", artist: "Dev Tunes", duration: "4:20" },
    { id: 3, title: "Focus Flow", artist: "Brain Waves", duration: "3:10" },
    { id: 4, title: "Deep Work", artist: "Productivity", duration: "5:15" },
  ];

  const currentTrack = PLAYLISTS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLISTS.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLISTS.length) % PLAYLISTS.length);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black flex flex-col p-6 gap-6">
      {/* YouTube Lo-Fi Embed - Clean */}
      <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
        <iframe
          width="100%"
          height="180"
          src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1"
          title="Lo-Fi Hip Hop Radio"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full"
        />
      </div>

      {/* Player Card */}
      <div className="flex-1 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-xl p-6 shadow-2xl border border-gray-700/50 flex flex-col justify-between">
        {/* Track Info */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-white">{currentTrack.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{currentTrack.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{Math.floor(progress / 100 * 180)}s</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button 
            onClick={prevTrack}
            className="text-gray-400 hover:text-white transition-colors hover:scale-110"
          >
            <SkipBack className="w-6 h-6 fill-current" />
          </button>

          <button 
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center transition-colors shadow-lg hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-black fill-current" />
            ) : (
              <Play className="w-6 h-6 text-black fill-current ml-1" />
            )}
          </button>

          <button 
            onClick={nextTrack}
            className="text-gray-400 hover:text-white transition-colors hover:scale-110"
          >
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center justify-center gap-3 mt-6 text-gray-400">
          <Volume2 className="w-4 h-4" />
          <input 
            type="range" 
            min="0" 
            max="100" 
            defaultValue="70"
            className="w-24 h-1 bg-gray-700 rounded-full accent-green-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Playlist */}
      <div className="bg-gray-800/30 rounded-lg p-4 max-h-24 overflow-y-auto border border-gray-700/30">
        <h4 className="text-white font-semibold mb-2 text-xs">PLAYLIST</h4>
        <div className="space-y-1">
          {PLAYLISTS.map((track, idx) => (
            <div
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(idx);
                setProgress(0);
                setIsPlaying(true);
              }}
              className={`p-2 rounded cursor-pointer transition-colors text-xs ${
                idx === currentTrackIndex
                  ? "bg-green-500/30 text-green-300"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/30"
              }`}
            >
              <p className="font-semibold">{track.title}</p>
              <p className="opacity-70">{track.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
