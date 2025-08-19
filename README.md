# 📚 Curso API Node.js

API RESTful para gerenciamento de cursos desenvolvida com **Fastify**, **TypeScript**, **Drizzle ORM** e **PostgreSQL**, com documentação automática e sistema avançado de commits.

## 🚀 Tecnologias

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Fastify](https://fastify.dev/)** - Framework web rápido e eficiente
- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM TypeScript-first
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Zod](https://zod.dev/)** - Validação de esquemas TypeScript
- **[Scalar API Reference](https://scalar.com/)** - Documentação interativa moderna
- **[Swagger/OpenAPI](https://swagger.io/)** - Especificação da API

## 📋 Funcionalidades

- ✅ **CRUD completo de cursos**
- ✅ **Validação automática** com Zod schemas
- ✅ **Documentação interativa** com Scalar API Reference
- ✅ **OpenAPI 3.0** spec automática
- ✅ **Logs estruturados** com Pino
- ✅ **Sistema de commits inteligente** com IA
- ✅ **Conventional Commits** padronizados
- ✅ **Hooks Git** automatizados

## 📖 Documentação da API

### **Documentação Interativa (Recomendada)**
🎯 **Scalar API Reference**: `http://localhost:3000/docs`
- Interface moderna e interativa
- Testes diretos na interface
- Exemplos de código automáticos

### **Swagger UI (Alternativa)**
📋 **Swagger UI**: `http://localhost:3000/documentation`
- Interface clássica do Swagger
- Compatível com ferramentas existentes

### **OpenAPI Spec**
� **JSON Schema**: `http://localhost:3000/documentation/json`
- Especificação completa da API
- Para integração com outras ferramentas

### Pré-requisitos

- Node.js (versão 18+)
- PostgreSQL
- npm ou yarn

### Clone o repositório

```bash
git clone <url-do-repositorio>
cd curos-rapido-rocketseat
```

### Instale as dependências

```bash
npm install
```

### Configure o ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL='postgres://postgres:postgres@localhost:5432/desafio'
```

### Execute as migrações do banco

```bash
npm run db:generate
npm run db:migrate
```

### Inicie o servidor

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

##  Endpoints

### 📝 Criar Curso

**POST** `/courses`

Cria um novo curso no sistema.

#### Body (JSON)

```json
{
  "title": "Nome do Curso",
  "description": "Descrição detalhada do curso"
}
```

#### Validações

- `title`: String obrigatória (3-100 caracteres)
- `description`: String obrigatória (5-500 caracteres)

#### Resposta de Sucesso (201)

```json
{
  "courseID": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### Resposta de Erro (400)

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation error message"
}
```

---

### 📋 Listar Cursos

**GET** `/courses`

Retorna todos os cursos cadastrados.

#### Resposta de Sucesso (200)

```json
{
  "courses": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Curso de JavaScript",
      "description": "Aprenda JavaScript do básico ao avançado"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "Curso de TypeScript",
      "description": "Domine TypeScript e suas funcionalidades"
    }
  ]
}
```

---

### 🔍 Buscar Curso por ID

**GET** `/courses/:id`

Retorna um curso específico pelo seu ID.

#### Parâmetros

- `id` (UUID): ID único do curso

#### Resposta de Sucesso (200)

```json
{
  "course": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Curso de JavaScript",
    "description": "Aprenda JavaScript do básico ao avançado"
  }
}
```

#### Resposta de Erro (404)

```json
{
  "message": "Curso não encontrado"
}
```

#### Resposta de Erro (400) - ID Inválido

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Invalid UUID format"
}
```

## 🧪 Testando a API

### Usando curl

```bash
# Listar cursos
curl -X GET http://localhost:3000/courses

# Criar curso
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Curso de Node.js",
    "description": "Aprenda Node.js na prática"
  }'

# Buscar curso por ID
curl -X GET http://localhost:3000/courses/550e8400-e29b-41d4-a716-446655440000
```

### Usando arquivo de requisições HTTP

O projeto inclui um arquivo `requisicoes.http` com exemplos de todas as rotas para teste no VS Code com a extensão REST Client.

## 📂 Estrutura do Projeto

```
├── src/
│   ├── database/
│   │   ├── client.ts      # Configuração do Drizzle
│   │   └── schema.ts      # Esquemas do banco de dados
│   └── routes/
│       ├── create-course.ts    # Rota para criar curso
│       ├── get-courses.ts      # Rota para listar cursos
│       └── get-course-by-id.ts # Rota para buscar curso por ID
├── server.ts              # Servidor principal
├── package.json
├── drizzle.config.ts      # Configuração do Drizzle Kit
└── README.md
```

## 🗃️ Schema do Banco

### Tabela: courses

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único (Primary Key) |
| title | TEXT | Título do curso (obrigatório, único) |
| description | TEXT | Descrição do curso (obrigatório) |

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run db:generate` - Gera migrações do banco
- `npm run db:migrate` - Executa migrações do banco
- `npm run db:studio` - Abre interface visual do Drizzle Studio
- `npm run commit` - Commit interativo com Conventional Commits
- `npm run commit:ai` - 🤖 **Commit automático com IA**

## 🤖 Automatização de Commits

Este projeto oferece **duas formas** de fazer commits automatizados:

### 1. Commit Interativo em Português 🇧🇷 (Aprendizado)

```bash
npm run commit
```

Prompt guiado em português com:
- 🎯 Tipos de commit com emojis
- 📝 Validação automática
- ✅ Confirmação antes do commit

### 2. Commit com IA Avançada 🤖 (Produtividade)

```bash
# 1. Adicione os arquivos
git add .

# 2. Execute o commit automático inteligente
npm run commit:ai
```

**A IA fará uma análise super detalhada:**
- 🔍 **Analisa cada arquivo individualmente**
- 📊 **Detecta imports, rotas, validações**
- 📈 **Conta linhas adicionadas/removidas**
- 🎯 **Gera mensagem específica e útil**
- ✅ **Segue Conventional Commits**

#### Exemplo de análise da IA:

```bash
🧠 Análise detalhada:
   📄 server.ts:
      📦 Importou: @fastify/swagger, @scalar/fastify-api-reference
      📈 +29 -18 linhas
   📄 src/routes/create-course.ts:
      🛣️  Implementou rotas: .post
      ✅ Adicionou validação de esquemas
      ⚡ Implementou operações assíncronas
      📈 +31 -24 linhas

✨ Mensagem gerada: feat: integrar documentação automática da API
```

#### Tipos de análise que a IA faz:

```bash
# Dependências
chore: adicionar dependências (@scalar/fastify-api-reference)

# Rotas
feat: implementar rotas POST, GET para cursos

# Documentação
docs: documentar endpoints da API com exemplos

# Configuração
feat: configurar documentação automática com Scalar

# Para arquivos de teste
test: adicionar testes

# Para package.json
chore: atualizar dependências
```

Este projeto utiliza **Conventional Commits** para padronizar mensagens de commit.

### Fazendo commits automatizados

Em vez de usar `git commit -m "mensagem"`, use:

```bash
npm run commit
```

Isso irá abrir um prompt interativo que te guiará para criar commits no padrão:

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos de commit disponíveis:

- `feat` - Nova funcionalidade
- `fix` - Correção de bug
- `docs` - Documentação
- `style` - Formatação, pontos e vírgulas, etc
- `refactor` - Refatoração de código
- `test` - Adição ou correção de testes
- `chore` - Manutenção do código
- `perf` - Melhoria de performance
- `ci` - Integração contínua
- `build` - Sistema de build
- `revert` - Reverter commit anterior

### Exemplos de commits com análise inteligente:

```bash
# O sistema automaticamente gera commits detalhados:
feat(api): implementar endpoint POST /courses com validação Zod
- Adiciona rota create-course.ts com schema de validação
- Integra banco de dados PostgreSQL via Drizzle ORM
- Inclui documentação OpenAPI automática

fix(database): corrigir configuração de conexão PostgreSQL
- Atualiza string de conexão no env.ts
- Adiciona tratamento de erro para conexões falhadas

docs(readme): atualizar documentação com Scalar API Reference
- Adiciona seção sobre documentação interativa
- Inclui instruções para acessar /docs
- Documenta sistema de commits inteligentes
```

### Análise detalhada de mudanças

O sistema de commits com IA analisa automaticamente:

- **📁 Arquivos modificados**: Detecta novos arquivos, modificações e exclusões
- **🔍 Tipo de mudança**: Identifica features, fixes, docs, refatorações
- **📝 Contexto técnico**: Analisa imports, schemas, rotas e configurações
- **🎯 Escopo automático**: Determina o módulo/área afetada
- **📊 Estatísticas**: Conta linhas adicionadas/removidas por arquivo

### Exemplo de saída da análise:

```
🔍 Análise das mudanças:
📁 Arquivos modificados: 3
➕ Linhas adicionadas: 45
➖ Linhas removidas: 12

📄 server.ts:
  - Registra plugin de rotas (/src/routes/create-course)
  - Adiciona configuração Scalar API Reference
  
📄 src/routes/create-course.ts:
  - Novo endpoint POST com validação Zod
  - Schema: title (string), description (string), duration_in_minutes (number)
  
📄 package.json:
  - Adiciona dependência @scalar/fastify-api-reference
```

### Validação automática

O projeto possui hooks do Git configurados com **Husky** e **Commitlint** que:

1. ✅ Validam o formato da mensagem antes do commit
2. ✅ Garantem que o padrão Conventional Commits seja seguido
3. ✅ Rejeitam commits que não seguem o padrão

Se você tentar fazer um commit fora do padrão, receberá um erro explicando o que precisa ser corrigido.

## 🔄 Workflow de Desenvolvimento

### Desenvolvimento local

```bash
# 1. Instalar dependências
npm install

# 2. Configurar banco de dados
cp .env.example .env
# Editar .env com suas credenciais PostgreSQL

# 3. Executar migrações
npm run db:migrate

# 4. Iniciar servidor em modo de desenvolvimento
npm run dev

# 5. Testar endpoints
curl http://localhost:3333/courses
```

### Fazendo commits inteligentes

```bash
# 1. Fazer suas modificações
# 2. Adicionar arquivos ao stage
git add .

# 3. Usar commit inteligente (recomendado)
npm run commit

# 4. Ou commit manual seguindo o padrão
git commit -m "feat(api): adicionar nova funcionalidade"
```

### Testando a API

```bash
# Via curl
curl -X GET http://localhost:3333/courses

# Via requisicoes.http (VS Code REST Client)
# Abrir o arquivo requisicoes.http e executar as requisições

# Via documentação interativa
# Acessar http://localhost:3333/docs (Scalar)
# Ou http://localhost:3333/documentation (Swagger UI)
```

## 🛠️ Troubleshooting

### Problemas comuns

#### Erro de módulo ES6/CommonJS
```bash
# Se encontrar erro: "Cannot use import statement outside a module"
# Verificar se está usando tsx para executar TypeScript:
npm run dev  # Usa tsx automaticamente
```

#### Porta já em uso
```bash
# Se a porta 3333 estiver ocupada
lsof -ti:3333 | xargs kill -9  # MacOS/Linux
# Ou mudar a porta no .env
```

#### Banco de dados não conecta
```bash
# Verificar se PostgreSQL está rodando
brew services start postgresql  # MacOS
# Verificar credenciais no .env
# Verificar se o banco existe
```

#### Documentação não aparece
```bash
# Verificar se o servidor está rodando
curl http://localhost:3333/documentation/json
# Deve retornar o schema OpenAPI
```

#### Commits rejeitados
```bash
# Verificar formato da mensagem
# Usar: npm run commit (modo interativo)
# Ou seguir padrão: tipo(escopo): descrição
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

---

<div align="center">
  Desenvolvido com ❤️ durante o curso da Rocketseat
</div>
