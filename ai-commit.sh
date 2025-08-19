#!/bin/bash

# Script para commit automático com IA
# Uso: ./ai-commit.sh

echo "🤖 Analisando mudanças com IA..."

# Verifica se há mudanças staged
if [ -z "$(git diff --cached --name-only)" ]; then
    echo "❌ Nenhum arquivo staged para commit!"
    echo "Execute: git add <arquivos>"
    exit 1
fi

# Lista os arquivos modificados
FILES=$(git diff --cached --name-only)
echo "📂 Arquivos modificados:"
echo "$FILES"

echo ""
echo "� Analisando mudanças detalhadamente..."

# Pega informações detalhadas das mudanças
DIFF=$(git diff --cached --stat)
DETAILED_DIFF=$(git diff --cached)

echo "📊 Estatísticas das mudanças:"
echo "$DIFF"
echo ""

# Função para analisar mudanças de forma muito detalhada
analyze_changes_detailed() {
    local files="$1"
    local detailed_diff="$2"
    
    echo "🧠 Análise detalhada:"
    
    # Análise por arquivo
    while IFS= read -r file; do
        if [ ! -z "$file" ]; then
            echo "   📄 $file:"
            
            # Pega apenas as mudanças deste arquivo
            file_diff=$(git diff --cached "$file")
            
            # Análise específica por tipo de arquivo
            case "$file" in
                *.md|README*)
                    if echo "$file_diff" | grep -q "^+.*#"; then
                        headers=$(echo "$file_diff" | grep "^+.*#" | sed 's/^+//' | head -3)
                        echo "      ✨ Adicionou seções: $(echo "$headers" | tr '\n' ', ' | sed 's/,$//')"
                    fi
                    if echo "$file_diff" | grep -q "^+.*\*\*\|^+.*\`"; then
                        echo "      📝 Melhorou formatação e destaque de código"
                    fi
                    if echo "$file_diff" | grep -q "^+.*http\|^+.*npm\|^+.*git"; then
                        echo "      🔗 Adicionou links e comandos de referência"
                    fi
                    ;;
                *.ts|*.js)
                    if echo "$file_diff" | grep -q "^+.*import\|^+.*require"; then
                        imports=$(echo "$file_diff" | grep "^+.*import" | sed "s/.*from ['\"]//;s/['\"].*//" | head -3)
                        echo "      📦 Importou: $(echo "$imports" | tr '\n' ', ' | sed 's/,$//')"
                    fi
                    if echo "$file_diff" | grep -q "^+.*\.get\|^+.*\.post\|^+.*\.put\|^+.*\.delete"; then
                        routes=$(echo "$file_diff" | grep -o "\.get\|\.post\|\.put\|\.delete" | sort -u | tr '\n' ' ')
                        echo "      🛣️  Implementou rotas: $routes"
                    fi
                    if echo "$file_diff" | grep -q "^+.*schema.*:"; then
                        echo "      ✅ Adicionou validação de esquemas"
                    fi
                    if echo "$file_diff" | grep -q "^+.*async\|^+.*await"; then
                        echo "      ⚡ Implementou operações assíncronas"
                    fi
                    if echo "$file_diff" | grep -q "^+.*export"; then
                        exports=$(echo "$file_diff" | grep "^+.*export" | wc -l)
                        echo "      📤 Exportou $exports nova(s) função(ões)"
                    fi
                    ;;
                package.json)
                    if echo "$file_diff" | grep -q "\"dependencies\""; then
                        new_deps=$(echo "$file_diff" | grep "^+.*\".*\":" | sed 's/.*"\([^"]*\)".*/\1/' | head -5)
                        echo "      📦 Adicionou dependências: $(echo "$new_deps" | tr '\n' ', ' | sed 's/,$//')"
                    fi
                    if echo "$file_diff" | grep -q "\"scripts\""; then
                        echo "      🔧 Atualizou scripts npm"
                    fi
                    ;;
                *.env)
                    echo "      🔐 Atualizou variáveis de ambiente"
                    ;;
                *.sql|*migration*)
                    echo "      🗄️  Atualizou esquema do banco de dados"
                    ;;
            esac
            
            # Análise de linhas adicionadas/removidas
            additions=$(echo "$file_diff" | grep -c "^+" || echo "0")
            deletions=$(echo "$file_diff" | grep -c "^-" || echo "0")
            echo "      📈 +$additions -$deletions linhas"
        fi
    done <<< "$files"
    
    echo ""
    
    # Gera mensagem de commit baseada na análise
    if echo "$files" | grep -q "README\|\.md"; then
        if echo "$detailed_diff" | grep -q "^+.*#.*API\|^+.*endpoint"; then
            echo "docs: documentar endpoints da API"
        elif echo "$detailed_diff" | grep -q "^+.*install\|^+.*npm run"; then
            echo "docs: atualizar guia de instalação e uso"
        elif echo "$detailed_diff" | grep -q "^+.*commit\|^+.*git"; then
            echo "docs: adicionar guia de commits automatizados"
        else
            echo "docs: melhorar documentação do projeto"
        fi
    elif echo "$files" | grep -q "package\.json"; then
        if echo "$detailed_diff" | grep -q "@scalar\|swagger"; then
            echo "feat: integrar documentação automática da API"
        elif echo "$detailed_diff" | grep -q "commit\|husky"; then
            echo "feat: configurar sistema de commits automatizados"
        else
            echo "chore: atualizar dependências do projeto"
        fi
    elif echo "$files" | grep -q "server\.ts\|app\.ts"; then
        if echo "$detailed_diff" | grep -q "scalar\|swagger"; then
            echo "feat: configurar documentação automática com Scalar"
        elif echo "$detailed_diff" | grep -q "register.*Route"; then
            echo "feat: registrar novas rotas da API"
        else
            echo "feat: atualizar configuração do servidor"
        fi
    elif echo "$files" | grep -q "routes/"; then
        if echo "$detailed_diff" | grep -q "schema.*tags\|summary"; then
            echo "feat: adicionar documentação automática nas rotas"
        elif echo "$detailed_diff" | grep -q "\.post.*courses"; then
            echo "feat: implementar criação de cursos"
        elif echo "$detailed_diff" | grep -q "\.get.*courses"; then
            echo "feat: implementar listagem de cursos"
        else
            echo "feat: implementar nova funcionalidade da API"
        fi
    elif echo "$files" | grep -q "\.sh"; then
        echo "feat: melhorar script de commits automatizados"
    else
        # Análise genérica mais inteligente
        total_additions=$(echo "$detailed_diff" | grep -c "^+" || echo "0")
        total_deletions=$(echo "$detailed_diff" | grep -c "^-" || echo "0")
        
        if [ "$total_additions" -gt 50 ]; then
            echo "feat: implementar nova funcionalidade significativa"
        elif [ "$total_deletions" -gt "$total_additions" ]; then
            echo "refactor: limpar e organizar código"
        else
            echo "feat: implementar melhorias no projeto"
        fi
    fi
}

# Gera mensagem inteligente com análise detalhada
COMMIT_MSG=$(analyze_changes_detailed "$FILES" "$DETAILED_DIFF")

echo ""
echo "� Resumo da análise:"
TOTAL_FILES=$(echo "$FILES" | wc -l | tr -d ' ')
TOTAL_ADDITIONS=$(echo "$DETAILED_DIFF" | grep -c "^+" || echo "0")
TOTAL_DELETIONS=$(echo "$DETAILED_DIFF" | grep -c "^-" || echo "0")

echo "   📊 $TOTAL_FILES arquivo(s) modificado(s)"
echo "   ➕ $TOTAL_ADDITIONS linhas adicionadas"
echo "   ➖ $TOTAL_DELETIONS linhas removidas"
echo ""
echo "✨ Mensagem de commit gerada:"
echo "   📝 $COMMIT_MSG"
echo ""
read -p "🤔 Confirmar commit com esta mensagem? (y/N): " confirm

if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    git commit -m "$COMMIT_MSG"
    echo ""
    echo "✅ Commit realizado com sucesso!"
    echo "🎉 Mensagem: $COMMIT_MSG"
else
    echo "❌ Commit cancelado."
    echo "💡 Dica: Execute 'git diff --cached' para ver as mudanças detalhadas"
fi
