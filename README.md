# 🖥️ Portfólio Interativo - Ian Leal

Um portfólio web imersivo e interativo estilo Windows com múltiplos aplicativos integrados. Desenvolvido com **React 19**, **TypeScript**, **Tailwind CSS** e **Framer Motion**.

![Portfolio Preview](https://img.shields.io/badge/Status-Online-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)

---

## 🌐 Acesse Online

**Link do Portfólio:** [https://scr1ptlucky.github.io/portfolio](https://scr1ptlucky.github.io/portfolio)

---

## ✨ Funcionalidades

### 🎮 Aplicativos Integrados

- **👨‍💻 Sobre Mim** - Informações profissionais, experiência e contato
- **📁 Arquivos** - Gerenciador de arquivos com download de currículo
- **🧮 Calculadora** - Calculadora funcional com operações básicas e avançadas
- **🎵 Player Lo-Fi** - Reprodutor de música lo-fi integrado com YouTube

### 🎨 Interface

- **Tela de Login** - Autenticação personalizada com GIF cyberpunk animado
- **Desktop Interativo** - Ícones arrastáveis na área de trabalho
- **Janelas Arrastáveis** - Mova as janelas livremente pela tela
- **Barra de Tarefas** - Exibição de hora e informações do sistema
- **Player Fixo** - Controles de volume e mute sempre visíveis

### 🎬 Recursos Visuais

- Fundo animado com GIF retro pixel art
- Avatar com GIF cyberpunk que pausa ao fazer login
- Efeito de blur dinâmico na tela de login
- Animações suaves com Framer Motion
- Design responsivo e moderno

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- **Node.js** 18+ instalado
- **npm** ou **pnpm** como gerenciador de pacotes
- **Git** para clonar o repositório

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/Scr1ptLucky/portfolio.git
cd portfolio
```

2. **Instale as dependências:**
```bash
pnpm install
# ou
npm install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
pnpm dev
# ou
npm run dev
```

4. **Abra no navegador:**
```
http://localhost:3000
```

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Compila o projeto para produção |
| `pnpm preview` | Visualiza a build de produção localmente |
| `pnpm check` | Verifica erros de TypeScript |
| `pnpm format` | Formata o código com Prettier |

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **Wouter** - Roteamento

### Build & Deploy
- **Vite** - Bundler e dev server
- **Vercel** - Hospedagem e deploy automático

### Bibliotecas Adicionais
- **shadcn/ui** - Componentes UI reutilizáveis
- **Radix UI** - Primitivos acessíveis
- **Sonner** - Notificações toast

---

## 📂 Estrutura do Projeto

```
portfolio/
├── client/
│   ├── public/
│   │   └── images/          # Imagens e GIFs
│   ├── src/
│   │   ├── components/
│   │   │   ├── apps/        # Aplicativos (AboutMe, Calculator, etc)
│   │   │   ├── os/          # Componentes do sistema (Desktop, LoginScreen)
│   │   │   └── ui/          # Componentes UI reutilizáveis
│   │   ├── contexts/        # Contextos React
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── App.tsx          # Componente raiz
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Estilos globais
│   └── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🎯 Como Usar

1. **Digite seu nome** na tela de login
2. **Pressione Enter** para acessar o desktop
3. **Clique nos ícones** para abrir os aplicativos
4. **Arraste as janelas** pela tela
5. **Controle a música** com o player no canto inferior direito

---

## 🔧 Personalizações

### Mudar Informações Pessoais

Edite o arquivo `client/src/components/apps/AboutMe.tsx`:
```tsx
<h1 className="text-4xl font-bold text-white">Seu Nome</h1>
<p className="text-xl text-blue-400 font-semibold">Seu Título</p>
```

### Adicionar Novos Aplicativos

1. Crie um novo componente em `client/src/components/apps/`
2. Importe em `client/src/components/os/DesktopWindows.tsx`
3. Adicione um ícone e label na lista de desktop icons

### Mudar Cores e Temas

Edite `client/src/index.css` para alterar as variáveis CSS:
```css
:root {
  --primary: #3b82f6;
  --secondary: #1e293b;
  /* ... */
}
```

---

## 🌍 Deploy

### Vercel (Recomendado)

1. Faça push para o GitHub
2. Vá em [vercel.com](https://vercel.com)
3. Importe o repositório
4. Clique em "Deploy"
5. Seu site estará online em minutos!

### Netlify

1. Conecte seu repositório GitHub
2. Configure o build: `pnpm build`
3. Diretório de publicação: `dist`
4. Deploy automático a cada push!

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

**Ian Leal** - Desenvolvedor Junior

- 📧 Email: [ianleal101@gmail.com](mailto:ianleal101@gmail.com)
- 📱 Telefone: (61) 99878-8740
- 🔗 GitHub: [@Scr1ptLucky](https://github.com/Scr1ptLucky)
- 🌐 Portfólio: [scr1ptlucky.github.io/portfolio](https://scr1ptlucky.github.io/portfolio)

---

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para:
- Abrir uma issue com sugestões
- Fazer um fork e enviar um pull request
- Reportar bugs

---

## 📞 Suporte

Se tiver dúvidas ou problemas ao rodar o projeto, abra uma issue no GitHub!

---

**Desenvolvido com ❤️ por Ian Leal**
