# TUMALU AI - Gerador de Conteúdo com IA

Aplicação Full-Stack completa para geração de imagens e vídeos usando APIs gratuitas do Hugging Face.

## 🚀 Funcionalidades

### 1. Geração de Imagens (FLUX.1-schnell)
- Geração real de imagens usando o modelo FLUX.1-schnell
- Entrada de prompts personalizados
- Download direto das imagens geradas
- Interface responsiva e profissional

### 2. Geração de Vídeos com Lip Sync (LivePortrait)
- Upload de imagem facial
- Upload de áudio
- Geração de vídeo com sincronização labial realista
- Download direto dos vídeos gerados

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta gratuita no Hugging Face
- Token de acesso do Hugging Face (gratuito)

## 🔑 Como Obter o Token do Hugging Face

1. Acesse: https://huggingface.co/join
2. Crie uma conta gratuita
3. Vá em: https://huggingface.co/settings/tokens
4. Clique em "New token"
5. Escolha "Read" como permissão
6. Copie o token gerado (começa com `hf_`)

## 🛠️ Instalação

### Passo 1: Clone ou extraia o projeto

```bash
cd tumalu-ai
```

### Passo 2: Instale as dependências

```bash
npm install
```

Isso instalará todas as dependências necessárias, incluindo:
- Next.js 14
- React 18
- @gradio/client (para integração com Hugging Face)
- Tailwind CSS
- Lucide React (ícones)
- TypeScript

### Passo 3: Execute o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:3000

## 🎯 Como Usar

### 1. Configurar o Token

1. Abra a aplicação no navegador
2. Cole seu token do Hugging Face no campo "Hugging Face Access Token"
3. O token é necessário para fazer as chamadas às APIs

### 2. Gerar Imagens

1. Clique na aba "Gerar Imagem"
2. Digite um prompt descritivo (ex: "Professional influencer holding a smartphone, studio lighting")
3. Clique em "Gerar Imagem"
4. Aguarde a geração (leva alguns segundos)
5. Faça download da imagem gerada

### 3. Gerar Vídeos

1. Clique na aba "Gerar Vídeo (Lip Sync)"
2. Faça upload de uma imagem com um rosto
3. Faça upload de um arquivo de áudio
4. Clique em "Gerar Vídeo"
5. Aguarde a geração (pode levar alguns minutos)
6. Faça download do vídeo gerado

## 🏗️ Estrutura do Projeto

```
tumalu-ai/
├── app/
│   ├── api/
│   │   ├── generate-image/
│   │   │   └── route.ts          # API para geração de imagens
│   │   └── generate-video/
│   │       └── route.ts          # API para geração de vídeos
│   ├── globals.css               # Estilos globais
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal (interface)
├── package.json                  # Dependências
├── tsconfig.json                 # Configuração TypeScript
├── tailwind.config.js            # Configuração Tailwind
├── next.config.js                # Configuração Next.js
└── README.md                     # Este arquivo
```

## 🔧 Tecnologias Utilizadas

### Frontend
- **Next.js 14** (App Router)
- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **Lucide React** para ícones

### Backend (API Routes)
- **Next.js API Routes**
- **@gradio/client** para integração com Hugging Face Spaces

### APIs de IA (Gratuitas)
- **FLUX.1-schnell** (black-forest-labs/FLUX.1-schnell) - Geração de imagens
- **LivePortrait** (KwaiVGI/LivePortrait) - Geração de vídeos com lip sync

## 📝 Detalhes Técnicos

### Geração de Imagens

A API `/api/generate-image` usa o cliente Gradio para conectar ao Space FLUX.1-schnell:

```typescript
const client = await Client.connect('black-forest-labs/FLUX.1-schnell', {
  hf_token: token,
});

const result = await client.predict('/infer', {
  prompt: prompt,
  seed: Math.floor(Math.random() * 1000000),
  randomize_seed: true,
  width: 1024,
  height: 1024,
  num_inference_steps: 4,
});
```

### Geração de Vídeos

A API `/api/generate-video` usa o cliente Gradio para conectar ao Space LivePortrait:

```typescript
const client = await Client.connect('KwaiVGI/LivePortrait', {
  hf_token: token,
});

const result = await client.predict('/run', {
  source_image: imageBlob,
  driving_audio: audioBlob,
  flag_relative_motion: true,
  flag_do_crop: true,
  flag_remap_input: true,
});
```

## 🎨 Interface

A interface foi desenvolvida com:
- Design dark mode profissional
- Sistema de abas funcional
- Feedback visual de loading
- Mensagens de erro claras
- Preview de imagens e vídeos
- Botões de download

## ⚠️ Limitações e Considerações

### Rate Limits
- As APIs do Hugging Face têm limites de taxa
- Com token gratuito: ~100 requisições/hora
- Em caso de erro de rate limit, aguarde alguns minutos

### Tempo de Processamento
- **Imagens**: 5-30 segundos
- **Vídeos**: 2-10 minutos (depende do tamanho dos arquivos)

### Tamanho de Arquivos
- **Imagens**: Recomendado até 5MB
- **Áudios**: Recomendado até 10MB
- Arquivos maiores podem causar timeout

## 🐛 Troubleshooting

### Erro: "Token inválido"
- Verifique se o token começa com `hf_`
- Gere um novo token em: https://huggingface.co/settings/tokens

### Erro: "Rate limit exceeded"
- Aguarde alguns minutos antes de tentar novamente
- Considere usar um token com mais recursos

### Erro ao gerar vídeo
- Certifique-se de que a imagem contém um rosto visível
- Use áudios em formatos comuns (MP3, WAV)
- Aguarde, o processo pode levar alguns minutos

### Erro de instalação
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Deploy em Produção

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Outras Plataformas
- O projeto é compatível com qualquer plataforma que suporte Next.js
- Netlify, Railway, Render, etc.

## 📄 Licença

Este projeto é de código aberto para fins educacionais.

## 🤝 Suporte

Para problemas ou dúvidas:
1. Verifique a seção de Troubleshooting
2. Consulte a documentação do Hugging Face
3. Verifique os logs do console do navegador

## 🎓 Recursos Adicionais

- [Documentação FLUX](https://huggingface.co/black-forest-labs/FLUX.1-schnell)
- [Documentação LivePortrait](https://huggingface.co/spaces/KwaiVGI/LivePortrait)
- [Gradio Client Documentation](https://www.gradio.app/docs/python-client)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Desenvolvido com ❤️ usando Next.js, React e APIs gratuitas do Hugging Face**
