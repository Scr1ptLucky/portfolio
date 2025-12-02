import { useOS } from "@/contexts/OSContext";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { Window } from "./Window";
import { ReactNode } from "react";

// Placeholder components for apps (will be implemented in next phases)
// Finder imported
// Apps are imported now
// All apps imported

// About Me App (Initial Content)
import { useState } from "react";
import { LoginScreen } from "./LoginScreen";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator } from "../apps/Calculator";
import { Music } from "../apps/Music";
import { Finder } from "../apps/Finder";
import { CV } from "../apps/CV";
import { Trash } from "../apps/Trash";

const AboutApp = () => {
  const { username } = useOS();
  return (
    <div className="p-8 flex flex-col items-center text-center gap-4 h-full overflow-y-auto">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg mb-4 shrink-0" />
      <h1 className="text-3xl font-bold text-gray-800">Olá, {username}!</h1>
      <p className="text-gray-600 max-w-md">
        Sou um Desenvolvedor Junior apaixonado por criar experiências web incríveis.
        Este é meu portfólio interativo inspirado no macOS.
      </p>
      <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-lg text-sm">
        💡 Dica: Explore o sistema clicando nos ícones do Dock abaixo.
        <br/>
        Tente arrastar as janelas e abrir os aplicativos!
      </div>
    </div>
  );
};

export function Desktop() {
  const { windows, setUsername } = useOS();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (name: string) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  return (
    <>
      <AnimatePresence>
        {!isLoggedIn && <LoginScreen onLogin={handleLogin} />}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoggedIn ? 1 : 0, scale: isLoggedIn ? 1 : 1.1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed inset-0 w-full h-full overflow-hidden bg-cover bg-center bg-no-repeat font-sans"
        style={{ backgroundImage: "url('/images/login-bg.gif')" }}
      >
        {/* Overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        <MenuBar />
        
        <div className="relative w-full h-full pt-8 pb-24 px-4">
          {/* Windows Layer */}
          <Window id="finder" initialSize={{ width: 800, height: 500 }}>
            <Finder />
          </Window>
          
          <Window id="music" initialSize={{ width: 700, height: 500 }}>
            <Music />
          </Window>
          
          <Window id="calculator" initialSize={{ width: 320, height: 480 }}>
            <Calculator />
          </Window>
          
          <Window id="trash" initialSize={{ width: 600, height: 400 }}>
            <Trash />
          </Window>
          
          <Window id="cv" initialSize={{ width: 850, height: 700 }}>
            <CV />
          </Window>
          
          <Window id="projects" initialSize={{ width: 900, height: 600 }}>
            <Finder />
          </Window>

          <Window id="about" initialSize={{ width: 600, height: 500 }}>
            <AboutApp />
          </Window>
        </div>

        <Dock />
      </motion.div>
    </>
  );
}
