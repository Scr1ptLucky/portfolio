import { useState } from "react";
import { Trash2, File, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TrashItem {
  id: string;
  name: string;
  type: string;
  deletedDate: string;
  size: string;
}

const INITIAL_TRASH_ITEMS: TrashItem[] = [
  { id: "1", name: "projeto_antigo_v1.zip", type: "ZIP Archive", deletedDate: "Ontem, 14:30", size: "45 MB" },
  { id: "2", name: "ideias_ruins.txt", type: "Text Document", deletedDate: "Hoje, 09:15", size: "2 KB" },
  { id: "3", name: "design_rejeitado.png", type: "PNG Image", deletedDate: "Hoje, 10:00", size: "1.2 MB" },
  { id: "4", name: "bug_fix_final_final.js", type: "JavaScript File", deletedDate: "Semana passada", size: "15 KB" },
];

export function Trash() {
  const [items, setItems] = useState<TrashItem[]>(INITIAL_TRASH_ITEMS);
  const [isEmptying, setIsEmptying] = useState(false);

  const handleEmptyTrash = () => {
    if (items.length === 0) return;
    
    setIsEmptying(true);
    setTimeout(() => {
      setItems([]);
      setIsEmptying(false);
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans">
      {/* Toolbar */}
      <div className="h-12 bg-[#F6F6F6] border-b border-[#E5E5E5] flex items-center justify-between px-4 shrink-0">
        <div className="font-semibold text-gray-700">Lixeira</div>
        <button
          onClick={handleEmptyTrash}
          disabled={items.length === 0 || isEmptying}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isEmptying ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          <span>Esvaziar</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-1">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <Trash2 className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-sm font-medium">A lixeira está vazia</p>
          </div>
        ) : (
          <div className="grid grid-cols-1">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">
              <div className="col-span-5">Nome</div>
              <div className="col-span-3">Data da Exclusão</div>
              <div className="col-span-2">Tipo</div>
              <div className="col-span-2 text-right">Tamanho</div>
            </div>

            {/* Items */}
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-12 gap-4 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 cursor-default group border-b border-gray-50 last:border-0"
                >
                  <div className="col-span-5 flex items-center gap-3 overflow-hidden">
                    <File className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate font-medium group-hover:text-blue-600">{item.name}</span>
                  </div>
                  <div className="col-span-3 text-gray-500 text-xs flex items-center">{item.deletedDate}</div>
                  <div className="col-span-2 text-gray-500 text-xs flex items-center">{item.type}</div>
                  <div className="col-span-2 text-right text-gray-500 text-xs flex items-center justify-end font-mono">{item.size}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#F6F6F6] border-t border-[#E5E5E5] flex items-center px-4 text-[10px] text-gray-500 shrink-0">
        {items.length} itens
      </div>
    </div>
  );
}
