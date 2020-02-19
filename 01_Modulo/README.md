### Módulo 1
#### Conceitos do NodeJS
___
#### Caracteristicas
**Docente**: Diego Fernandes

**Quantidade de Aulas**: 11 aulas

**Quantidade de  Módulos**: 2 módulos
___
#### Minhas Anotações
**NODE.JS**

NodeJs não é uma linguagem, é uma Plataforma que usar linguagem JavaScript.
NodeJS é executado com base em eventos, chamado the callback, funcionado através de uma pilha.
É escolhida por causa da sua interação e não bloqueia as requisições durante outras.

**YARN**

O yarn é um gerenciador de pacote escolhido por causa ser mais rápido.

**API REST**

API REST, entendi que a api é o próprio back-end com as características de receber métodos HTTP (post, get, put, delete) para fazer um processamento.
As informações são sempre através de JSON.

**Métodos**

 1. **POST**: Método para criação, é comum vir com informações no  body
 1. **GET**: Método para buscar, é comum vir com informações nas queryParms como filtros
 1. **PUT**: Método para atualização, é comum vir com informações no  body
 1. **DELETE**: Método para deletar, é comum vir com na url, ou seja, Route Params

**Códigos de respostas**

 1. **1xx**: Inciados em 1 =>Informação (Quase não usado).
 1. **2xx**: Inciados em 2 =>SUCESSO.
 1. **3xx**: Inciados em 3 => REDIRECTION.
 1. **4xx**: Inciados em 4 =>ERROR. (Informações ou requisitos inválidos).
 1. **5xx**: Inciados em 5 ou superior  =>ERRO no Servidor. (Problema com o servidor).

 **Middleawares**
 
É uma função que executa antes das rotas. É caracterizada pelos parâmetros (req, res, next), sento o next uma função dizendo que a api pode continue a execução.
Existe dois tipos de middleawares, os globais que são colocamos um o **.use** antes das rotas, e os específicos são colocados nas **próprias rotas como segundo parâmetros** (obs: pode ter *n* middleawares específicos).
Os middleawares também podem **alterar a variável req**. Exemplo: adicionando uma nova  variável (user).

**Debug Node.js in VS Code**

O debug é relativamente fácil,  para iniciar (deixar a opção ativar) precisar:

 1. Clicar no inseto do menu lateral
 1. Criar o arquivo: launch.json
 1. Parar o servidor
 1. Definir os breakpoints
 1. Iniciar o debug
