import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function MiniMusicPlayer() {
  const playerRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(70);
  const [previousVolume, setPreviousVolume] = useState(70);

  // Initialize YouTube Player
  useEffect(() => {
    // Carregar YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Esperar a API estar pronta
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: "jfKfPfyJRdk", // Lofi Girl - 24/7 Lo-Fi Hip-Hop Beats
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
      });
    };

    // Se a API já está carregada
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady?.();
    }
  }, []);

  const onPlayerReady = () => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
      playerRef.current.playVideo();
    }
  };

  const onPlayerStateChange = () => {
    // Manter tocando em loop
  };

  const toggleMute = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      // Unmute
      playerRef.current.setVolume(previousVolume);
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      // Mute
      setPreviousVolume(volume);
      playerRef.current.setVolume(0);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 w-80">
      {/* Compact Lo-Fi Player */}
      <div className="bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-4 space-y-3">
        {/* Album Art - Lofi Car GIF */}
        <div className="rounded-lg overflow-hidden h-20 bg-black flex items-center justify-center relative">
          <img
            src="/images/lofi-car.gif"
            alt="Lofi Car"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Track Info */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-white truncate">Lofi Girl - 24/7 Beats</h3>
          <p className="text-xs text-gray-400">Relaxante • Chill Vibes</p>
        </div>

        {/* Progress Bar - Sempre Verde */}
        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all"
            style={{ width: "100%" }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3">
          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 flex items-center justify-center transition-all shadow-lg flex-shrink-0 hover:shadow-blue-500/50"
            title={isMuted ? "Desmutar" : "Mutar"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white fill-current" />
            ) : (
              <Volume2 className="w-4 h-4 text-white fill-current" />
            )}
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2 flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1.5 bg-gray-700 rounded-full accent-green-500 cursor-pointer appearance-none"
              style={{
                background: `linear-gradient(to right, #22c55e 0%, #22c55e ${volume}%, #374151 ${volume}%, #374151 100%)`
              }}
              title={`Volume: ${volume}%`}
            />
            <span className="text-xs text-gray-400 w-8 text-right flex-shrink-0 font-semibold">{volume}%</span>
          </div>
        </div>

        {/* Live Badge */}
        <div className="text-center pt-1">
          <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/50 rounded text-xs text-green-400 font-bold">
            ▶ TOCANDO
          </span>
        </div>

        {/* Hidden YouTube Player */}
        <div id="youtube-player" style={{ display: "none" }} />
      </div>
    </div>
  );
}

// Extend window interface for YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
