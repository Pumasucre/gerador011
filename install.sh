#!/bin/bash

# TUMALU AI - Script de Instalação Rápida
# Execute este script para configurar o projeto automaticamente

echo "🚀 Instalando TUMALU AI..."
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "❌ Node.js não está instalado. Por favor, instale Node.js 18+ primeiro."
    echo "   Download: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detectado: $(node --version)"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Instalação concluída com sucesso!"
    echo ""
    echo "📝 Próximos passos:"
    echo "   1. Obtenha seu token gratuito em: https://huggingface.co/settings/tokens"
    echo "   2. Execute: npm run dev"
    echo "   3. Abra: http://localhost:3000"
    echo "   4. Cole seu token do Hugging Face na interface"
    echo ""
    echo "🎉 Divirta-se gerando conteúdo com IA!"
else
    echo ""
    echo "❌ Erro durante a instalação. Tente executar manualmente:"
    echo "   npm install"
    exit 1
fi
