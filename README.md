# Projeto Controle de Veículos e Abastecimentos 🚗⛽

Este projeto tem como objetivo ser uma API RESTful para controle de veículos e abastecimentos.

<br/>

<div align="center">

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>




## Tecnologias utilizadas

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv](https://www.npmjs.com/package/dotenv)

### Dependências de desenvolvimento

- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

As dependências utilizadas no projeto estão listadas no arquivo `package.json`. Certifique-se de tê-las instaladas antes de executar a aplicação.


## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/sTrkalec/Fueltrack.git
```

2. Instale as dependências:
```bash
cd Fueltrack
npm install
```


3. Crie um arquivo `.env` com as variáveis de ambiente necessárias. Você pode usar o arquivo `.env.example` como base:


4. Inicie o banco de dados PostgreSQL utilizando o docker (Caso não queira, configure o PostgreeSQL manualmente):

```bash
docker-compose up -d
```

5. Execute as migrações do banco de dados:
 ```bash
 npx prisma migrate dev
 ```

6. Inicie a aplicação:

```bash
npm run dev
```


## Configuração do PostgreSQL e Prisma

Para configurar o PostgreSQL e o Prisma, siga os passos abaixo:

1. Instale o Docker:

- [Docker para Windows](https://docs.docker.com/docker-for-windows/install/)
- [Docker para Mac](https://docs.docker.com/docker-for-mac/install/)
- [Docker para Linux](https://docs.docker.com/engine/install/)

2. O arquivo docker-compose.yaml está composto com os seguintes comandos:

```yaml
version: '3'

services:
  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    volumes:
      - ./data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
```

3. Ao utilizar o docker-compose, o banco de dados ficará salvo na máquina local, pois ele cria uma pasta chamada "data" no repositório. Dessa forma, é possível matar o container sem perder os dados cadastrados no banco.
## Rotas 🚗
<br/>


### Usuários

#### `POST /users/register`

Cria um novo usuário com as informações especificadas no corpo da requisição.

Exemplo de corpo da requisição:

```json
{
"cpf": "12345678911",
"password": "senha123"
}
```

#### `POST /login`

Realiza o login do usuário e retorna um token de autenticação.

Exemplo de corpo da requisição:

```json
{
"cpf": "12345678911",
"password": "senha123"
}
```

resposta: 

```json
{
	"user": {
		"id": 1,
		"cpf": "01356938108",
		"password": "$2b$10$4zedcHaVuhyNWoRKA46Q6OK97SA1ZVo4TR7ZGlfhT2AxzrYR8ZNyG",
		"createdAt": "2023-03-24T19:06:31.003Z"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc5NzAwOTY3LCJleHAiOjE2Nzk3MTE3Njd9.FX1WGAWLO0tGo60yPGDL_AiPbAKEcVXAK0vEpi1Tgl8"
}

```
<br/>

### Veículos

#### `GET /vehicles`

Retorna uma lista de todos os veículos cadastrados.

#### `GET /vehicles/{id}`

Retorna as informações do veículo com o ID especificado.

#### `POST /vehicles`

Cria um novo veículo com as informações especificadas no corpo da requisição.

Exemplo de corpo da requisição:

```json
{
  "plate": "NCW-5386",
  "renavam": "50761463980",
  "color": "Red",
  "power": 100,
  "model": "Onix",
  "brand": "Chevrolet",
}
```

#### `PUT /vehicles/{id}`

Atualiza as informações do veículo com o ID especificado.

Exemplo de corpo da requisição:

```json
{
  "plate": "NCW-5386",
  "renavam": "50761463980",
  "color": "Black",
  "power": 140,
  "model": "Onix",
  "brand": "Chevrolet",
}
```


#### `DELETE /vehicles/{id}`

Remove o veículo com o ID especificado.

<br/>

### Abastecimentos


#### `GET /refuelings/{idFuel}`

Retorna as informações do abastecimento com o ID especificado.

#### `GET /refuelings/`

Retorna as informações de todos abastecimento do usuario.

#### `POST /refueling/vehicle/:{idVehiclel}/`

Registra um novo abastecimento para o veículo com o ID especificado.

Exemplo de corpo da requisição:

```json
{
  "amount": 50.5,
  "fuelType": "Gasolina",
  "price": 200.00
}
```


#### `PUT /refueling/vehicle/:{idVehiclel}/:{idFuel}`

Atualiza as informações do abastecimento com o ID especificado, registrado para o veículo com o ID especificado.

Exemplo de corpo da requisição:


```json
{
  "amount": 50.5,
  "fuelType": "Gasolina",
  "price": 200.00
}
```


#### `DELETE /refuelings/{idFuel}`

Remove o abastecimento com o ID especificado, registrado para o veículo com o ID especificado.

<br/>

## Autenticação

A API usa autenticação baseada em token JWT (JSON Web Token) para proteger os endpoints de acesso restrito. Para enviar o token de autenticação nas requisições, você precisa adicionar um header chamado `Authorization` contendo o token JWT válido.

O token JWT é obtido ao autenticar o usuário na API, na criação do usuário ou login (endpoint `/users`) 

### Enviando o token de autenticação

Para enviar o token de autenticação em uma requisição, adicione um header `Authorization` contendo o token JWT válido. O header deve ter o seguinte formato:

```http
Authorization: Bearer seu-token-jwt-aqui
```

<br/>

## Middlewares personalizados

A API possui dois middlewares personalizados que adicionam funcionalidades específicas:

1. `authMiddleware`: Middleware de autenticação que verifica se o token JWT enviado na requisição é válido. Esse middleware é utilizado em todos os endpoints que exigem autenticação.

2. `validateUserMiddleware`: Middleware que verifica se o CPF e a senha do usuário são válidos. Esse middleware é utilizado no endpoint de criação de usuário (`POST /users`).

3. `validateVehicleMiddleware`: Middleware que verifica se a placa e o Renavam de um veículo são válidos. Esse middleware é utilizado nos endpoints de criação e atualização de veículo (POST /vehicles e PUT /vehicles/:id).

<br/>

## Conclusão

O FuelTrack é um sistema de cadastro de veículos e abastecimentos que utiliza uma API RESTful construída com Node.js, TypeScript e Prisma ORM.

A aplicação possui um conjunto de rotas que permitem ao usuário cadastrar e gerenciar veículos e abastecimentos, além de um sistema de autenticação baseado em tokens JWT e uma série de middlewares para validação de entrada de dados.

Esperamos que este projeto tenha sido útil para você e que tenha fornecido insights valiosos sobre como construir uma API RESTful em Node.js. Sinta-se à vontade para contribuir, abrir issues e enviar pull requests. Obrigado por conferir o FuelTrack!




