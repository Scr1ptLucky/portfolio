import { Download, FileText, Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

export function CV() {
  const handleDownload = () => {
    // In a real app, this would trigger a file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'curriculo.pdf';
    // link.click(); // Commented out to prevent actual download attempt in demo
    alert("Download do currículo iniciado! (Simulação)");
  };

  return (
    <div className="w-full h-full bg-[#525659] flex flex-col">
      {/* Toolbar */}
      <div className="h-12 bg-[#323639] flex items-center justify-between px-4 shadow-md z-10 shrink-0">
        <div className="text-gray-300 font-medium text-sm truncate">
          Curriculo_Desenvolvedor_Junior.pdf
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Baixar PDF</span>
          </button>
        </div>
      </div>

      {/* PDF Preview Area */}
      <div className="flex-1 overflow-y-auto p-8 flex justify-center">
        <div className="w-full max-w-[800px] bg-white shadow-2xl min-h-[1000px] p-12 text-gray-800 font-sans">
          {/* Header */}
          <div className="border-b-2 border-gray-800 pb-8 mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide">Seu Nome</h1>
              <h2 className="text-xl text-blue-600 font-medium">Desenvolvedor Frontend Junior</h2>
            </div>
            <div className="text-right text-sm text-gray-600 space-y-1">
              <div className="flex items-center justify-end gap-2">
                <span>seu.email@exemplo.com</span>
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-end gap-2">
                <span>(11) 99999-9999</span>
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-end gap-2">
                <span>São Paulo, SP</span>
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-end gap-2">
                <span>github.com/seu-usuario</span>
                <Github className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="col-span-2 space-y-8">
              <section>
                <h3 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Resumo Profissional
                </h3>
                <p className="text-gray-700 leading-relaxed text-justify">
                  Desenvolvedor Junior apaixonado por criar interfaces web modernas e responsivas. 
                  Focado em React e ecossistema JavaScript, com forte atenção aos detalhes de UX/UI. 
                  Busco oportunidade para aplicar meus conhecimentos em projetos desafiadores e evoluir tecnicamente.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4">
                  Experiência Profissional
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-gray-800">Desenvolvedor Frontend Freelancer</h4>
                      <span className="text-sm text-gray-500">Jan 2024 - Presente</span>
                    </div>
                    <p className="text-sm text-gray-600 italic mb-2">Projetos Autônomos</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Desenvolvimento de landing pages responsivas para comércios locais.</li>
                      <li>Criação de portfólios interativos utilizando React e Framer Motion.</li>
                      <li>Otimização de performance e SEO para sites institucionais.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4">
                  Projetos Destacados
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-800">E-commerce Dashboard</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Painel administrativo completo com gráficos e gestão de produtos.
                      <br/>
                      <span className="text-blue-600 font-medium text-xs">Tech Stack: React, Tailwind, Recharts</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">macOS Portfolio</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Este site! Um sistema operacional simulado na web.
                      <br/>
                      <span className="text-blue-600 font-medium text-xs">Tech Stack: React, TypeScript, Framer Motion</span>
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4">
                  Habilidades
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Tailwind CSS", "HTML5/CSS3", "Next.js"].map(skill => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">Backend & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Node.js", "Git", "Figma", "VS Code", "Linux"].map(skill => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4">
                  Educação
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Análise e Desenv. de Sistemas</h4>
                    <p className="text-xs text-gray-600">Universidade Exemplo</p>
                    <p className="text-xs text-gray-500">2023 - 2025 (Em andamento)</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Full Stack Bootcamp</h4>
                    <p className="text-xs text-gray-600">Rocketseat / Alura</p>
                    <p className="text-xs text-gray-500">2023 - Concluído</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4">
                  Idiomas
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex justify-between">
                    <span>Português</span>
                    <span className="text-gray-500">Nativo</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Inglês</span>
                    <span className="text-gray-500">Intermediário</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
