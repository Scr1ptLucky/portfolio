import { Download, File, Folder } from "lucide-react";
import { useState } from "react";

export function FileExplorer() {
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  const files = {
    root: [
      { id: "curriculo", name: "Currículo Ian Leal.pdf", type: "file", icon: File },
      { id: "projetos", name: "Meus Projetos", type: "folder", icon: Folder },
    ],
    projetos: [
      { id: "proj1", name: "Portfólio macOS", type: "file", icon: File },
      { id: "proj2", name: "Site E-commerce", type: "file", icon: File },
      { id: "proj3", name: "App To-Do", type: "file", icon: File },
    ],
  };

  const currentFiles = openFolder ? files[openFolder as keyof typeof files] || files.root : files.root;
  const isInRoot = !openFolder;

  const handleDownloadCV = () => {
    const cvContent = `
CURRÍCULO - IAN LEAL

INFORMAÇÕES PESSOAIS
Nome: Ian Leal
Idade: 24 Anos
Contato: (61) 99878-8740
Email: ian.leal@email.com

OBJETIVO
Desenvolvedor Junior buscando oportunidades para crescer profissionalmente 
e contribuir com projetos inovadores de desenvolvimento web.

EXPERIÊNCIA PROFISSIONAL
- Criação de sites responsivos e modernos
- Desenvolvimento Front-End com React, HTML, CSS e JavaScript
- Projetos interativos e interfaces de usuário intuitivas
- Otimização de performance e UX

HABILIDADES
- React.js
- HTML5 & CSS3
- JavaScript (ES6+)
- Tailwind CSS
- Git & GitHub
- Responsive Design
- UI/UX Básico

EDUCAÇÃO
- Desenvolvimento Web (Em progresso)

PROJETOS DESTACADOS
- Portfólio Interativo Estilo macOS
- Sites Responsivos
- Aplicações Web Interativas

IDIOMAS
- Português (Nativo)
- Inglês (Intermediário)
    `;

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(cvContent));
    element.setAttribute("download", "Curriculo_Ian_Leal.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Toolbar */}
      <div className="bg-blue-200 border-b border-blue-300 p-3 md:p-4 flex items-center gap-3 md:gap-4">
        <button 
          onClick={() => setOpenFolder(null)}
          className="px-2 md:px-3 py-1 bg-blue-300 hover:bg-blue-400 rounded text-xs md:text-sm font-semibold text-gray-800"
        >
          ← Voltar
        </button>
        <span className="text-xs md:text-sm text-gray-700 font-semibold">
          {openFolder ? `Meus Projetos` : "Meus Arquivos"}
        </span>
      </div>

      {/* File List */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {currentFiles.map((file) => (
            <div
              key={file.id}
              onClick={() => {
                if (file.type === "folder") {
                  setOpenFolder(file.id);
                }
              }}
              className={`p-3 md:p-4 bg-white rounded-lg border-2 border-blue-200 flex items-center gap-3 md:gap-4 transition-all ${
                file.type === "folder"
                  ? "cursor-pointer hover:bg-blue-50 hover:border-blue-400"
                  : "cursor-default hover:bg-gray-50"
              }`}
            >
              <file.icon className={`w-6 md:w-8 h-6 md:h-8 flex-shrink-0 ${file.type === "folder" ? "text-yellow-500" : "text-blue-500"}`} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm md:text-base truncate">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {file.type === "folder" ? "Pasta" : "Documento"}
                </p>
              </div>
              {file.id === "curriculo" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadCV();
                  }}
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex-shrink-0"
                  title="Baixar Currículo"
                >
                  <Download className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-blue-200 border-t border-blue-300 px-4 md:px-6 py-2 text-xs text-gray-700">
        {currentFiles.length} item(ns)
      </div>
    </div>
  );
}
