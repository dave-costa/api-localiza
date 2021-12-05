# api-localiza

### Índice

- 👨‍🏫 [Introdução](#introdução)
- 💻 [Ambiente de desenvolvimento](#ambiente-de-desenvolvimento-e)
- 📂 [Estrutura do projeto](#estrutura-do-projeto)

### Introdução

Este é o repositório da api da plataforma **LOCALIZA**.

:warning: Certifique-se de ler a documentação e as instruções antes de começar a trabalhar.
:warning: Você nunca deve publicar sem autorização, ou fazer mudanças no código que faz o ambiente rodar sem avisar.
:warning: Obrigatório o uso de convencional commits.

### Ambiente de desenvolvimento

Antes de começar certifique-se de instalar o [NodeJS >= 14.0.0](https://nodejs.org/en/) e o [Yarn >= 1.22.4](https://classic.yarnpkg.com/en/)

1. Clone esse projeto `git clone https://github.com/dave-costa/api-localiza`
2. Entre no diretorio do projeto `cd api-localiza`
3. Instale as dependencias de desenvolvimento `yarn install`
4. Renomeie o .env.example para .env `cp .env.example .env`

### Estrutura do projeto

Até este exato momento estamos reaproveitando a estrutura do adonis, e separando os arquivos em módulos para tornar mais escalável
```
App
└─── Controllers: Separado por módulos
    └───http: protocolo
        └───Auth: Responsavel pela autenticação
        └───Business: Responsavel por transacoes e negociações entre usuarios
        └───Messages: Serviço de mensagens entre usuarios
        └───User: Tudo relacionado ao usuario
│── Middleware
│── Models
│── Services: Responsável por servir serviços externos
│── Utils: funções usadas globalmente que retornam um valor
│── Validators: Validadores de requests
Start
└─── routes
    └───auth: rotas responsáveis pela autenticação
    └───business: rotas responsáveis por transacoes e negociações entre usuarios
    └───messages: rotas para mensagens entre usuarios
    └───users: rotas relacionadas aos usuarios

```
1. yarn install
2. docker-compose up -d
3. node ace migration:run
4. node ace db:seed
5. yarn dev

@Localiza
Dave->CEO
