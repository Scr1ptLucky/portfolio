import { useState } from "react";
import { Folder, FileCode, ChevronRight, ChevronDown, Search, ArrowLeft, ArrowRight as ArrowRightIcon } from "lucide-react";

interface FileSystemItem {
  id: string;
  name: string;
  type: "folder" | "file";
  icon?: React.ReactNode;
  children?: FileSystemItem[];
  content?: string; // Description for projects
  tags?: string[];
}

const PROJECTS_DATA: FileSystemItem[] = [
  {
    id: "root",
    name: "Macintosh HD",
    type: "folder",
    children: [
      {
        id: "projects",
        name: "Meus Projetos",
        type: "folder",
        children: [
          {
            id: "proj-1",
            name: "E-commerce React",
            type: "file",
            content: "Uma loja virtual completa com carrinho de compras, integração de pagamentos e painel administrativo. Desenvolvido com React, Node.js e MongoDB.",
            tags: ["React", "Node.js", "MongoDB"]
          },
          {
            id: "proj-2",
            name: "App de Tarefas",
            type: "file",
            content: "Aplicativo de produtividade com drag-and-drop, categorias personalizáveis e modo escuro. Focado em UX/UI e performance.",
            tags: ["Vue.js", "Firebase", "Tailwind"]
          },
          {
            id: "proj-3",
            name: "Dashboard Financeiro",
            type: "file",
            content: "Painel de controle para finanças pessoais com gráficos interativos e relatórios em tempo real.",
            tags: ["TypeScript", "D3.js", "Next.js"]
          }
        ]
      },
      {
        id: "skills",
        name: "Habilidades",
        type: "folder",
        children: [
          { id: "skill-1", name: "Frontend.md", type: "file", content: "React, Vue, Tailwind, HTML5, CSS3, JavaScript (ES6+)" },
          { id: "skill-2", name: "Backend.md", type: "file", content: "Node.js, Express, Python, SQL, MongoDB" },
          { id: "skill-3", name: "Tools.md", type: "file", content: "Git, Docker, VS Code, Figma, Photoshop" }
        ]
      },
      {
        id: "documents",
        name: "Documentos",
        type: "folder",
        children: []
      }
    ]
  }
];

export function Finder() {
  const [currentPath, setCurrentPath] = useState<FileSystemItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [sidebarSelection, setSidebarSelection] = useState("projects");

  // Initialize with root's children if empty
  if (currentPath.length === 0) {
    const root = PROJECTS_DATA[0];
    const projectsFolder = root.children?.find(c => c.id === "projects");
    if (projectsFolder) setCurrentPath([root, projectsFolder]);
  }

  const currentFolder = currentPath[currentPath.length - 1];

  const handleNavigate = (item: FileSystemItem) => {
    if (item.type === "folder") {
      setCurrentPath([...currentPath, item]);
      setSelectedItem(null);
    } else {
      setSelectedItem(item.id);
    }
  };

  const handleBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedItem(null);
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col text-sm font-sans">
      {/* Toolbar */}
      <div className="h-12 bg-[#F6F6F6] border-b border-[#E5E5E5] flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-500">
            <button onClick={handleBack} disabled={currentPath.length <= 1} className="p-1 hover:bg-black/5 rounded disabled:opacity-30">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-black/5 rounded disabled:opacity-30" disabled>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="font-semibold text-gray-700 flex items-center gap-1">
            {currentFolder?.name}
          </div>
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="pl-8 pr-3 py-1 bg-[#E3E3E3] rounded-md text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400/50 w-48 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-[#F1F1F1]/50 backdrop-blur-xl border-r border-[#E5E5E5] p-3 flex flex-col gap-4 shrink-0">
          <div>
            <div className="text-[11px] font-bold text-gray-400 px-2 mb-1">Favorites</div>
            <SidebarItem icon={<Folder className="w-4 h-4 text-blue-500" />} label="All Projects" active={sidebarSelection === "projects"} onClick={() => setSidebarSelection("projects")} />
            <SidebarItem icon={<FileCode className="w-4 h-4 text-blue-500" />} label="Applications" active={sidebarSelection === "apps"} onClick={() => setSidebarSelection("apps")} />
            <SidebarItem icon={<Folder className="w-4 h-4 text-blue-500" />} label="Documents" active={sidebarSelection === "docs"} onClick={() => setSidebarSelection("docs")} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-gray-400 px-2 mb-1">iCloud</div>
            <SidebarItem icon={<Folder className="w-4 h-4 text-blue-500" />} label="iCloud Drive" active={sidebarSelection === "icloud"} onClick={() => setSidebarSelection("icloud")} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white flex">
          {/* File List */}
          <div className={`${selectedItem ? 'w-1/2 border-r border-[#E5E5E5]' : 'w-full'} overflow-y-auto p-2`}>
            <div className="grid grid-cols-1 gap-1">
              {currentFolder?.children?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNavigate(item)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${selectedItem === item.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  {item.type === "folder" ? (
                    <Folder className={`w-5 h-5 ${selectedItem === item.id ? 'text-white' : 'text-blue-400'}`} />
                  ) : (
                    <FileCode className={`w-5 h-5 ${selectedItem === item.id ? 'text-white' : 'text-gray-400'}`} />
                  )}
                  <span className="truncate">{item.name}</span>
                  {item.type === "folder" && <ChevronRight className={`w-4 h-4 ml-auto ${selectedItem === item.id ? 'text-white' : 'text-gray-300'}`} />}
                </div>
              ))}
              {currentFolder?.children?.length === 0 && (
                <div className="text-gray-400 text-center mt-10 italic">Pasta vazia</div>
              )}
            </div>
          </div>

          {/* Preview Pane */}
          {selectedItem && (
            <div className="w-1/2 bg-[#F9F9F9] p-6 flex flex-col items-center text-center overflow-y-auto">
              {(() => {
                const item = currentFolder?.children?.find(c => c.id === selectedItem);
                if (!item) return null;
                return (
                  <>
                    <div className="w-24 h-24 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center mb-4">
                      <FileCode className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-400 mb-6">Project File • 24 KB</p>
                    
                    <div className="w-full text-left bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Description</h4>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {item.content || "No description available."}
                      </p>
                      
                      {item.tags && (
                        <>
                          <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium border border-blue-100">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-6 bg-[#F6F6F6] border-t border-[#E5E5E5] flex items-center px-4 text-[10px] text-gray-500 shrink-0">
        {currentFolder?.children?.length || 0} items • {selectedItem ? '1 item selected' : 'No selection'}
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer transition-colors ${active ? 'bg-[#DCDCDC]' : 'hover:bg-[#E8E8E8]'}`}
    >
      {icon}
      <span className="text-gray-700">{label}</span>
    </div>
  );
}
