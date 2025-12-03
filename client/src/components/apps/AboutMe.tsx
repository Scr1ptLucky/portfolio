import { Mail, Phone, Github, Linkedin } from "lucide-react";

export function AboutMe() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col p-4 md:p-8 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6 md:mb-8 pb-4 md:pb-6 border-b-2 border-blue-500/30">
        <img
          src="/images/profile.jpg"
          alt="Ian Leal"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg border-4 border-blue-500 flex-shrink-0"
        />
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-white text-center md:text-left">Ian Leal</h1>
          <p className="text-lg md:text-xl text-blue-400 font-semibold text-center md:text-left">Desenvolvedor Junior</p>
          <p className="text-gray-300 text-center md:text-left">24 Anos</p>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Sobre Mim</h2>
        <p className="text-gray-300 leading-relaxed">
          Sou um Desenvolvedor Junior apaixonado por criar experiências web incríveis e inovadoras. 
          Tenho experiência em desenvolvimento front-end, criação de sites responsivos e projetos interativos.
          Sempre buscando aprender novas tecnologias e melhorar minhas habilidades.
        </p>
      </div>

      {/* Experience Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Experiência</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold mt-1">✓</span>
            <span>Criação de sites responsivos e modernos</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold mt-1">✓</span>
            <span>Desenvolvimento Front-End com React, HTML, CSS e JavaScript</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold mt-1">✓</span>
            <span>Projetos interativos e interfaces de usuário intuitivas</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold mt-1">✓</span>
            <span>Otimização de performance e UX</span>
          </li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-800/50 rounded-lg p-4 md:p-6 shadow-md border border-blue-500/30">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Contato</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-300">
            <Phone className="w-5 h-5 text-blue-400" />
            <span>(61) 99878-8740</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="w-5 h-5 text-blue-400" />
            <span>ianleal101@gmail.com</span>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/Scr1ptLucky/portfolio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a href="#" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold">
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
