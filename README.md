# Simple Parking
###### Esse documento auxiliará no desenvolvimento do aplicativo

### Dados do projeto
**Empresa:** Simple System Tecnologia SSTEC\
**Nome do app:** Simple Parking\
**Site:** simpleparking.com\
**Tecnologias de desenvolvimento:** [Angular 10](https://angular.io/docs) | [Typescript](https://www.typescriptlang.org/)

### Requisitos
- [VS Code](https://code.visualstudio.com/ "Visual Studio Code").
- [Node LTS](https://nodejs.org/en/ "Node Js") Aplicação Web|Mobile - BackEnd
- [Cmder](https://cmder.net/ "Cmder")

### Instalação
- Via Executavel.

### Estrutura dos arquivos do FrontEnd da Aplicação -> Web

**src/** - Arquivos de códigos da aplicação.\
**src/assets/** - Arquivos estáticos: fontes, imagens, etc. e arquivos de estilo\
**src/app/commons/** - Arquivos comuns da aplicação. Inclui funções e utilitários.\
**src/app/exemplo/** - Arquivos de uma tela.\
**src/app/exemplo/exemplo-form/exemplo-form.component.ts** - Formulario utilizados na tela.\
**src/app/exemplo/exemplo-list/exemplo-list.component.ts** - Listas utilizadas na tela.\
**src/app/exemplo/exemplo.component.html** - A tela.\
**src/app/exemplo/exemplo.component.ts** - Arquivo com metodos e objetos referente a tela.\
**src/app/exemplo/exemplo.component.css** - Arquivo com estilos referentes a tela.\
**src/app/app.module.ts** - Configura os modulos do sitema.\
**src/app/app.routing.ts** - Configura a navegação do sistema.\
**.gitignore** - Configura arquivos a serem ignorados pelo git.\
**App.js** - Arquivo inicial. Arquivo chamado pelo Expo.\
**package.json** - Arquivo de dependências e detalhes do projeto.\
**README.md** - Leia-me com instruções.\
**yarn.lock** - Mapa de dependencias gerenciado pelo yarn| Caso algúem use o Yarn.\
**package-lock** - Mapa de dependencias gerenciado pelo NPM| Caso algúem use o NPM.\

### Nomeação dos arquivos e componentes
  - Os componentes são nomeados com o padrão do Angular 10

### GitFlow
O GitFlow Workflow é um design de fluxo de trabalho Git que define um modelo de ramificação projetado em torno da versão do projeto. Isso fornece uma estrutura robusta para gerenciar projetos maiores.\
[Saiba mais](https://datasift.github.io/gitflow/IntroducingGitFlow.html) sobre o GitFlow.\
[Explicação da ferramenta git-flow](https://fjorgemota.com/git-flow-uma-forma-legal-de-organizar-repositorios-git/) se for usar ela.

![](https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fraw.githubusercontent.com%2FVoronenko%2Fgitflow-release%2Fmaster%2Fimages%2Fgit-workflow-release-cycle-4maintenance.png&f=1)

### Versionamento Semântico
O Versionamento Semântico são regras que formalizam de forma prática e eficiente o incremento de versões de software. O versionamento do Simple Parking deve basedado na versão 2 do Versionamento Semântico utilizando as regras 2, 3, 4, 6, 7, 8, 9 e 11 encontradas no [site do samver.org](https://semver.org/lang/pt-BR/).

### Commits Semânticos
Para uma melhor navegação pelos commits, possibilitando um entendimento melhor e mais rápido, e consequentemente melhorando a manutenção do sistema, utilizamos um padrão na escrita do commit similar ao proposto por http://karma-runner.github.io/3.0/dev/git-commit-msg.html.
As linhas das mensagens de commit não devem exceder 72 caracteres. Essa convenção permite uma boa leitura dos commits na maiorias dos terminais.

**Formato da mensagem de commit:**\
\<tipo\>\(<escopo>\): \<assunto\>\
\<linha em branco\>\
\<mensagem\>\
\<linha em branco\>\
\<rodapé\>

**Exemplo:**
```sh
chore(eslint): instalar dependência eslint

A dependência eslint é um utilitário de linting para JavaScript.
Auxilia o desenvolvedor a escrever o código em um padrão
preestabelecido.

BREAKING CHANGE:
Quanto ao foo.bar, foo.baz deve ser utilizado ao invés disso.
```

**\<tipo\>:**
  - **feat** - nova funcionalidade/recurso (features)
  - **fix** - correção de bug
  - **perf** - uma mudança de código que melhora a performance
  - **docs** - alterações na documentação
  - **style** - formatação, falta de ponto e vírgula, etc; não afetam o significado do código
  - **refactor** - refatoração do código, não corrige um bug nem adiciona um recurso; por exemplo, renomear variável
  - **test** - adição ou correção de testes
  - **chore** - atualizando tasks do Grunt, Webpack, etc; mudanças que não modificam o src/

**\<escopo\>:** Opcional, principalmente se a alteração for global.\
Exemplos: init, runner, watcher, config, web-server, proxy, etc.

**\<assunto\>:** Deve ser escrito na forma imperativa, ou se preferir, de uma forma que complete a frase "Se aplicado, este commit irá ".

**\<corpo\>:** Deve conter descrições mais precisas do que está contido no commit, mostrando as razões ou consequências geradas pela alteração, assim como instruções futuras.

**\<rodapé\>:** È dedicado para notas e avisos importantes, como fechamento de issue e se existem mudanças radicais que quebrem funcionalidades. No caso de mudanças de quebras (BREAKING CHANGE) deve ser indicado “BREAKING CHANGE:” seguido com a explicação que leva a inclusão dessa marcação.

**Correção de Erros:**
```
npm install -g win-node-env
