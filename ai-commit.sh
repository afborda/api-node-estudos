#!/usr/bin/env bash

# ai-commit.sh - script melhorado para gerar mensagens de commit com IA e fallback
# Uso: npm run commit:ai  (ou ./ai-commit.sh)

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🤖 Gerando commit com IA...${NC}"

# Garantir que estamos no root do repositório
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || true)
if [ -z "$REPO_ROOT" ]; then
    echo -e "${RED}❌ Este diretório não é um repositório git.${NC}"
    exit 1
fi
cd "$REPO_ROOT" || exit 1

# Checar staged changes
if git diff --cached --quiet; then
    echo -e "${RED}❌ Nenhuma mudança staged. Execute: git add <arquivos>${NC}"
    exit 1
fi

echo -e "${GREEN}📂 Arquivos staged:${NC}"
git diff --cached --name-only | sed 's/^/  /'
echo ""

DIFF_OUTPUT=$(git diff --cached --no-color) || DIFF_OUTPUT=""
ADDED_LINES=$(echo "$DIFF_OUTPUT" | grep -c "^+[^+]" || echo "0")
REMOVED_LINES=$(echo "$DIFF_OUTPUT" | grep -c "^-[^-]" || echo "0")
MODIFIED_FILES=$(git diff --cached --name-only | wc -l | tr -d ' ')

echo -e "${BLUE}� Estatísticas:${NC}"
echo "  📁 Arquivos modificados: $MODIFIED_FILES"
echo "  ➕ Linhas adicionadas: $ADDED_LINES"
echo "  ➖ Linhas removidas: $REMOVED_LINES"
echo ""

echo -e "${YELLOW}� Gerando mensagem de commit...${NC}"

# Preparar prompt para IA (se você usa alguma CLI/API, substitua aqui a chamada)
PROMPT="Analise as seguintes mudanças e gere uma mensagem de commit no formato Conventional Commits (tipo(escopo): descrição curta).\n\n$DIFF_OUTPUT"

# Tenta usar uma CLI local chamada `openai-commit` (opcional). Se não existir, cai no fallback
AI_MESSAGE=""
if command -v openai-commit >/dev/null 2>&1; then
    AI_MESSAGE=$(echo "$PROMPT" | openai-commit 2>/dev/null || true)
fi

# Se existir .env, carregue variáveis (não sobrescreve variáveis já definidas)
if [ -f "$REPO_ROOT/.env" ]; then
    # shellcheck disable=SC1090
    set -o allexport; source "$REPO_ROOT/.env"; set +o allexport
fi

# Suporte para Gemini (Generative Language API) via API KEY
# Procura por GEMINI_API_KEY, GEMINI_KEY ou GENERATIVE_API_KEY nas variáveis de ambiente
GEMINI_KEY=${GEMINI_API_KEY:-${GEMINI_KEY:-${GENERATIVE_API_KEY:-}}}
if [ -n "$GEMINI_KEY" ] && [ -z "$AI_MESSAGE" ]; then
    echo -e "${BLUE}🌌 Usando Gemini (Generative Language) para gerar mensagem...${NC}"

    # Prefer using jq to build payload and parse response
    if command -v jq >/dev/null 2>&1; then
        PAYLOAD=$(jq -nc --arg text "$PROMPT" '{prompt:{text:$text},temperature:0.0,maxOutputTokens:256}')
        ENDPOINT="https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key=$GEMINI_KEY"
        RESPONSE=$(curl -s -X POST "$ENDPOINT" -H 'Content-Type: application/json' -d "$PAYLOAD")
        AI_MESSAGE=$(echo "$RESPONSE" | jq -r '.candidates[0].output' 2>/dev/null || true)
    else
        # sem jq: tentar payload simples (menos robusto)
        ENDPOINT="https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key=$GEMINI_KEY"
        RESPONSE=$(curl -s -X POST "$ENDPOINT" -H 'Content-Type: application/json' -d "{\"prompt\":{\"text\":\"$(echo "$PROMPT" | sed 's/"/\\"/g')\"},\"temperature\":0.0,\"maxOutputTokens\":256}")
        # extrair com sed/grep (pode falhar em casos complexos)
        AI_MESSAGE=$(echo "$RESPONSE" | sed -n 's/.*"output":"\([^"]*\)".*/\1/p' | sed 's/\\n/\n/g' || true)
    fi
fi

# Fallback simples se a CLI de IA não estiver disponível ou não retornar mensagem
if [ -z "$AI_MESSAGE" ]; then
    FILES=$(git diff --cached --name-only)
    if echo "$FILES" | grep -q "test"; then
        AI_MESSAGE="test: adicionar/atualizar testes"
    elif echo "$FILES" | grep -E "README|\.md" >/dev/null; then
        AI_MESSAGE="docs: atualizar documentação"
    elif echo "$FILES" | grep -q "package\.json"; then
        AI_MESSAGE="chore: atualizar dependências"
    elif echo "$FILES" | grep -q "src/routes"; then
        AI_MESSAGE="feat(api): implementar/atualizar rotas da API"
    elif echo "$FILES" | grep -q "src/database"; then
        AI_MESSAGE="feat(database): atualizar esquema do banco"
    else
        AI_MESSAGE="feat: implementar melhorias"
    fi
fi

# Limpar whitespace e quebras de linha
AI_MESSAGE=$(echo "$AI_MESSAGE" | tr -d '\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')

echo -e "${GREEN}✨ Mensagem gerada:${NC} $AI_MESSAGE"
echo ""

read -r -p "🤔 Confirmar commit com esta mensagem? (y/N): " confirm
if [[ ! $confirm =~ ^[yY](es)?$ ]]; then
    echo -e "${RED}❌ Commit cancelado.${NC}"
    echo "Dica: rode 'git diff --cached' para revisar as mudanças." 
    exit 1
fi

# Executar commit
git commit -m "$AI_MESSAGE"
RC=$?
if [ $RC -eq 0 ]; then
    echo -e "${GREEN}✅ Commit realizado com sucesso!${NC}"
    exit 0
fi

echo -e "${RED}❌ git commit falhou com código $RC.${NC}"
echo -e "${YELLOW}Se o erro for causado por hooks, você pode forçar com --no-verify.${NC}"
read -r -p "Forçar commit ignorando hooks (git commit --no-verify)? (y/N): " force
if [[ $force =~ ^[yY](es)?$ ]]; then
    git commit --no-verify -m "$AI_MESSAGE"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Commit forçado com sucesso!${NC}"
    else
        echo -e "${RED}❌ Falha ao forçar commit.${NC}"
        exit 1
    fi
else
    echo -e "${BLUE}ℹ️ Commit não realizado.${NC}"
    exit $RC
fi
