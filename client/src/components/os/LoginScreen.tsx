import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const avatarRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (avatarRef.current && isLoggingIn) {
      // Pausar o GIF quando o usuário faz login (capturar frame final)
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx && avatarRef.current) {
        canvas.width = avatarRef.current.width;
        canvas.height = avatarRef.current.height;
        ctx.drawImage(avatarRef.current, 0, 0);
        avatarRef.current.src = canvas.toDataURL();
      }
    }
  }, [isLoggingIn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsLoggingIn(true);
      // Simulate loading/unlocking delay
      setTimeout(() => {
        onLogin(name);
      }, 800);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center font-sans overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login-bg.gif')" }}
    >
      {/* Blur Overlay - Permanece até fazer login */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ${
          isLoggingIn ? "backdrop-blur-none" : "backdrop-blur-2xl"
        }`}
      />

      <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6 w-full max-w-md px-4 md:px-6">
        {/* Avatar com GIF Cyberpunk */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-md"
        >
          <img
            ref={avatarRef}
            src="/images/cyberpunk-eyes.gif"
            alt="Cyberpunk Eyes"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Welcome Text */}
        <motion.h1 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg text-center"
        >
          {name ? `Olá, ${name}` : "Bem-vindo"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-xs md:text-sm text-center"
        >
          Portfólio de Ian Leal - Desenvolvedor Junior
        </motion.p>

        {/* Login Form */}
        <motion.form 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="w-full max-w-[280px] md:max-w-[300px] relative"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome..."
            className="w-full px-4 md:px-5 py-2 md:py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm md:text-base text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all text-center shadow-lg font-medium"
            autoFocus
            disabled={isLoggingIn}
          />
          
          <AnimatePresence>
            {name.trim() && !isLoggingIn && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 flex items-center justify-center transition-all shadow-lg"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </motion.button>
            )}
          </AnimatePresence>

          {isLoggingIn && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </motion.form>

        {!isLoggingIn && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/50 text-xs mt-4 md:mt-6 text-center px-2"
          >
            Digite seu nome e pressione Enter para entrar
          </motion.p>
        )}
      </div>
    </div>
  );
}
