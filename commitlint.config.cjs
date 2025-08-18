module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // nova funcionalidade
        'fix',      // correção de bug
        'docs',     // documentação
        'style',    // formatação, pontos e vírgulas, etc
        'refactor', // refatoração
        'test',     // testes
        'chore',    // manutenção
        'perf',     // performance
        'ci',       // integração contínua
        'build',    // build
        'revert'    // reverter commit
      ]
    ],
    'subject-case': [0], // Desabilita a regra de case
    'subject-max-length': [2, 'always', 72],
    'subject-min-length': [2, 'always', 3],
    'header-max-length': [2, 'always', 100]
  }
};
