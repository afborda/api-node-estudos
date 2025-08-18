# 🤖 Guia de Automatização de Commits

## Como usar o sistema de commits automatizados

### 1. Fazer mudanças no código
```bash
# Edite seus arquivos normalmente
code src/routes/create-course.ts
```

### 2. Adicionar arquivos ao staging
```bash
git add .
# ou
git add arquivo-especifico.ts
```

### 3. Fazer commit automatizado
```bash
npm run commit
```

### 4. Seguir o prompt interativo (EM PORTUGUÊS! 🇧🇷)

O sistema irá perguntar:

1. **Tipo do commit**: Escolha entre feat, fix, docs, etc.
   ```
   ? Selecione o tipo de mudança que você está commitando:
   ❯ feat:     ✨ Nova funcionalidade
     fix:      🐛 Correção de bug
     docs:     📚 Documentação
     style:    💎 Formatação, ponto e vírgula, etc
     refactor: 📦 Refatoração de código
     perf:     🚀 Melhoria de performance
     test:     🚨 Adição ou correção de testes
     chore:    🔧 Manutenção
   ```

2. **Escopo (opcional)**: Área afetada (api, database, routes, etc.)
   ```
   ? Selecione o ESCOPO desta mudança (opcional):
   ❯ api
     database
     routes
     server
     docs
   ```

3. **Descrição curta**: Resumo da mudança (obrigatório)
   ```
   ? Escreva uma descrição CURTA e IMPERATIVA da mudança:
   ```

4. **Descrição longa (opcional)**: Detalhes adicionais
   ```
   ? Forneça uma descrição MAIS LONGA da mudança (opcional):
   ```

5. **Breaking changes (opcional)**: Se quebra compatibilidade
   ```
   ? Liste qualquer BREAKING CHANGE (opcional):
   ```

6. **Issues relacionadas (opcional)**: Números de issues
   ```
   ? Liste qualquer ISSUE FECHADA por esta mudança (opcional):
   ```

### Exemplo de fluxo completo:

```bash
# 1. Fazer mudanças
echo "console.log('Nova feature')" >> src/routes/create-course.ts

# 2. Adicionar ao staging
git add .

# 3. Commit automatizado
npm run commit

# O prompt irá aparecer EM PORTUGUÊS:
? Selecione o tipo de mudança que você está commitando: feat
? Selecione o ESCOPO desta mudança (opcional): api
? Escreva uma descrição CURTA e IMPERATIVA da mudança: adicionar log na criação de curso
? Forneça uma descrição MAIS LONGA da mudança (opcional): (enter para pular)
? Liste qualquer BREAKING CHANGE (opcional): (enter para pular)
? Liste qualquer ISSUE FECHADA por esta mudança (opcional): (enter para pular)
? Tem certeza de que deseja prosseguir com o commit acima? Yes

# Resultado: feat(api): adicionar log na criação de curso
```

## 🚫 O que NÃO fazer

```bash
# ❌ Commit manual sem padrão
git commit -m "mudanças"

# ❌ Mensagem sem tipo
git commit -m "adicionei uma feature"

# ❌ Mensagem muito longa no título
git commit -m "feat: esta é uma mensagem muito longa que vai quebrar as regras de tamanho máximo configuradas"
```

## ✅ O que fazer

```bash
# ✅ Usar o sistema automatizado
npm run commit

# ✅ Ou seguir o padrão manualmente
git commit -m "feat(api): adicionar novo endpoint"
git commit -m "fix(database): corrigir query de busca"
git commit -m "docs(readme): atualizar documentação"
```

## 🛡️ Validações ativas

- ✅ Tipo obrigatório (feat, fix, docs, etc.)
- ✅ Descrição entre 3-72 caracteres
- ✅ Header máximo de 100 caracteres
- ✅ Formato conventional commits válido
- ✅ Descrição em lowercase

## 🔧 Personalização

Para modificar as regras, edite o arquivo `commitlint.config.js`:

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Suas regras customizadas aqui
  }
};
```
