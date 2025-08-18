# 📚 Curso API Node.js

API RESTful para gerenciamento de cursos desenvolvida com **Fastify**, **TypeScript**, **Drizzle ORM** e **PostgreSQL**.

## 🚀 Tecnologias

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Fastify](https://fastify.dev/)** - Framework web rápido e eficiente
- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM TypeScript-first
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Zod](https://zod.dev/)** - Validação de esquemas TypeScript
- **[Swagger](https://swagger.io/)** - Documentação automática da API

## 📋 Funcionalidades

- ✅ Criar novo curso
- ✅ Listar todos os cursos
- ✅ Buscar curso por ID
- ✅ Validação de dados com Zod
- ✅ Documentação automática com Swagger
- ✅ Logs estruturados com Pino

## 🛠️ Instalação

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

## 📖 Documentação da API

A documentação Swagger está disponível em: `http://localhost:3000/docs`

## 🔗 Endpoints

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

### 1. Commit Interativo (Recomendado para aprendizado)

```bash
npm run commit
```

### 2. Commit com IA (Super rápido!) 🚀

```bash
# 1. Adicione os arquivos
git add .

# 2. Execute o commit automático
npm run commit:ai
```

A IA irá:
- ✅ Analisar as mudanças nos arquivos
- ✅ Gerar uma mensagem seguindo Conventional Commits
- ✅ Mostrar a mensagem antes de confirmar
- ✅ Fazer o commit automaticamente

#### Exemplos de mensagens geradas pela IA:

```bash
# Para arquivos .md
docs: atualizar documentação

# Para arquivos .ts/.js
feat: implementar nova funcionalidade

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

### Exemplos de commits:

```bash
feat(api): adicionar endpoint para deletar curso
fix(database): corrigir conexão com postgresql
docs(readme): atualizar instruções de instalação
style(routes): formatar código das rotas
refactor(server): reorganizar estrutura do servidor
```

### Validação automática

O projeto possui hooks do Git configurados com **Husky** e **Commitlint** que:

1. ✅ Validam o formato da mensagem antes do commit
2. ✅ Garantem que o padrão Conventional Commits seja seguido
3. ✅ Rejeitam commits que não seguem o padrão

Se você tentar fazer um commit fora do padrão, receberá um erro explicando o que precisa ser corrigido.

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
