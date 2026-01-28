# 🚀 GUIA DE INÍCIO RÁPIDO - TUMALU AI

## Instalação em 3 Passos

### 1️⃣ Instalar Dependências

```bash
npm install
```

### 2️⃣ Iniciar Servidor

```bash
npm run dev
```

### 3️⃣ Obter Token do Hugging Face

1. Acesse: https://huggingface.co/settings/tokens
2. Clique em "New token"
3. Escolha permissão "Read"
4. Copie o token (começa com `hf_`)

## 🎯 Como Usar

1. Abra http://localhost:3000
2. Cole seu token no campo "Hugging Face Access Token"
3. Escolha entre:
   - **Gerar Imagem**: Digite um prompt e clique em "Gerar"
   - **Gerar Vídeo**: Faça upload de imagem + áudio e clique em "Gerar"

## ⚡ Exemplos de Prompts

### Para Imagens:
```
- "Professional influencer holding a smartphone, studio lighting"
- "Beautiful landscape with mountains and lake at sunset"
- "Modern office workspace with laptop and coffee"
```

### Para Vídeos:
- **Imagem**: Foto de um rosto (pode ser sua selfie)
- **Áudio**: Qualquer arquivo de áudio (MP3, WAV)

## 📊 Tempo de Processamento

- **Imagens**: 5-30 segundos
- **Vídeos**: 2-10 minutos

## 🆘 Problemas Comuns

### Token inválido
✅ Verifique se começou com `hf_` e tem permissão "Read"

### Rate limit
✅ Aguarde alguns minutos antes de tentar novamente

### Vídeo não gerado
✅ Certifique-se que a imagem contém um rosto visível

## 📚 Recursos

- [Documentação Completa](README.md)
- [FLUX Space](https://huggingface.co/spaces/black-forest-labs/FLUX.1-schnell)
- [LivePortrait Space](https://huggingface.co/spaces/KwaiVGI/LivePortrait)

---

**Pronto para criar! 🎨**
