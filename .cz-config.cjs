module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:     ✨ Nova funcionalidade'
    },
    {
      value: 'fix',
      name: 'fix:      🐛 Correção de bug'
    },
    {
      value: 'docs',
      name: 'docs:     📚 Documentação'
    },
    {
      value: 'style',
      name: 'style:    💎 Formatação, ponto e vírgula, etc (sem mudança de código)'
    },
    {
      value: 'refactor',
      name: 'refactor: 📦 Refatoração de código (sem nova funcionalidade ou correção)'
    },
    {
      value: 'perf',
      name: 'perf:     🚀 Melhoria de performance'
    },
    {
      value: 'test',
      name: 'test:     🚨 Adição ou correção de testes'
    },
    {
      value: 'chore',
      name: 'chore:    🔧 Manutenção (atualizações de dependências, configurações, etc)'
    },
    {
      value: 'build',
      name: 'build:    📦 Mudanças no sistema de build ou dependências externas'
    },
    {
      value: 'ci',
      name: 'ci:       👷 Mudanças na integração contínua'
    },
    {
      value: 'revert',
      name: 'revert:   ⏪ Reverter commit anterior'
    }
  ],

  scopes: [
    { name: 'api' },
    { name: 'database' },
    { name: 'routes' },
    { name: 'server' },
    { name: 'docs' },
    { name: 'config' },
    { name: 'tests' },
    { name: 'deps' }
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // override the messages, defaults are as follows
  messages: {
    type: 'Selecione o tipo de mudança que você está commitando:',
    scope: '\\nSelecione o ESCOPO desta mudança (opcional):',
    customScope: 'Informe o escopo desta mudança:',
    subject: 'Escreva uma descrição CURTA e IMPERATIVA da mudança:\\n',
    body: 'Forneça uma descrição MAIS LONGA da mudança (opcional). Use "|" para quebrar linhas:\\n',
    breaking: 'Liste qualquer BREAKING CHANGE (opcional):\\n',
    footer: 'Liste qualquer ISSUE FECHADA por esta mudança (opcional). Ex: #31, #34:\\n',
    confirmCommit: 'Tem certeza de que deseja prosseguir com o commit acima?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  
  // limit subject length
  subjectLimit: 72,
  
  // override the body max length
  breaklineChar: '|',
  footerPrefix: 'ISSUES FECHADAS:',
  
  // skip any questions you want
  skipQuestions: ['ticketNumber'],

  // specify the length of the commit line
  upperCaseSubject: false
};
