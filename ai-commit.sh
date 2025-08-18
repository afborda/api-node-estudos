#!/bin/bash

# Script para commit automático com IA
# Uso: ./ai-commit.sh

echo "🤖 Gerando commit com IA..."

# Verifica se há mudanças staged
if [ -z "$(git diff --cached --name-only)" ]; then
    echo "❌ Nenhum arquivo staged para commit!"
    echo "Execute: git add <arquivos>"
    exit 1
fi

# Lista os arquivos modificados
echo "📂 Arquivos modificados:"
git diff --cached --name-only

echo ""
echo "🔄 Analisando mudanças..."

# Pega o diff das mudanças
DIFF=$(git diff --cached)

# Cria um prompt simples para a IA
PROMPT="Com base nas mudanças abaixo, gere uma mensagem de commit seguindo o padrão Conventional Commits (tipo(escopo): descrição).
Use apenas lowercase na descrição e mantenha conciso (máximo 50 caracteres):

Mudanças:
$DIFF

Responda APENAS com a mensagem de commit, sem explicações:"

echo "💭 Gerando mensagem de commit..."

# Simula geração de IA (você pode integrar com uma API real aqui)
# Por enquanto, vamos usar uma lógica simples baseada nos arquivos

FILES=$(git diff --cached --name-only)
if echo "$FILES" | grep -q "README\|\.md"; then
    COMMIT_MSG="docs: atualizar documentação"
elif echo "$FILES" | grep -q "\.ts\|\.js"; then
    COMMIT_MSG="feat: implementar nova funcionalidade"
elif echo "$FILES" | grep -q "test\|spec"; then
    COMMIT_MSG="test: adicionar testes"
elif echo "$FILES" | grep -q "package\.json\|yarn\.lock\|package-lock\.json"; then
    COMMIT_MSG="chore: atualizar dependências"
else
    COMMIT_MSG="chore: atualizar arquivos"
fi

echo "✨ Mensagem gerada: $COMMIT_MSG"
echo ""
read -p "🤔 Confirmar commit? (y/N): " confirm

if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    git commit -m "$COMMIT_MSG"
    echo "✅ Commit realizado com sucesso!"
else
    echo "❌ Commit cancelado."
fi
