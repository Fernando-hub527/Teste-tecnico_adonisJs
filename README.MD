# 🚀 **AdonisJS - CRUD** 

Este projeto é a implementação de um **CRUD completo** utilizando o AdonisJs e Mysql

### 🛠️ **Destaques do Projeto**
- **🚀 Integração com Docker**: Ambiente de desenvolvimento fácil de configurar com Docker.
- **🔒 Testes de Integração**: Testes de integração que validam o funcionamento das rotas e a interação entre os componentes.
- **📦 DTOs**: Utilização de **Data Transfer Objects** (DTOs) para garantir que os dados sejam manipulados de forma segura e eficiente.
- **⚡ Alternativa ao `try/catch`**: Implementação do **ResultWrapper** para tratamento de erros, simplificando a manutenção e tornando o código mais limpo e previsível.

### 💡 **Objetivo**
Embora o principal objetivo seja configurar um simples CRUD, tento deixar esse projeto o mais completo possível, incluindo features
que tornam a aplicação mais preparada para resolver problemas reais


---

## Requisitos

Para executar a aplicação é necessário que as seguintes ferramentas esttejam instaladas:

- [Docker](https://www.docker.com/): Para executar os contêineres da aplicação e banco de dados.
- [Docker Compose](https://docs.docker.com/compose/): Para orquestrar os contêineres.
- **(Opcional)** [Node.js](https://nodejs.org/): Caso queira rodar a aplicação localmente fora do Docker.

---

## Como executar a aplicação

### Ambiente de Desenvolvimento

Para rodar a aplicação em desenvolvimento:

1. Clone este repositório:
   ```bash
   git clone https://github.com/Fernando-hub527/Teste-tecnico_adonisJs.git
   cd Teste-tecnico_adonisJs 
   ```
2. Inicie os contêineres:
    ```bash
    docker-compose up -d
    ```
2. Testes os endpoints da aplicação:
    ```bash
    URL: http://localhost:3333
    ```

### Rodando os Testes

1. Inicie os contêineres:
    ```bash
    docker-compose up -d
    ```
2. Execute os testes com o comando:
    ```bash
    sudo docker exec -it adonis-app node ace test
    ```

## 📚 Rotas da Aplicação

Abaixo está a lista de rotas disponíveis na aplicação, organizadas por recurso. Todas as rotas (exceto login e criação de usuário) exigem um token de autenticação.

### 🧑‍💼 Clientes (`/api/v1/client`)

| Método  | Rota                  | Descrição                 | Middleware |
|---------|-----------------------|---------------------------|------------|
| ➕ `POST`   | `/api/v1/client`       | Criar um cliente          | ✅ `auth`   |
| ✏️ `PATCH`  | `/api/v1/client/:id`   | Editar um cliente         | ✅ `auth`   |
| ❌ `DELETE` | `/api/v1/client/:id`   | Remover um cliente        | ✅ `auth`   |
| 🔍 `GET`    | `/api/v1/client/:id`   | Buscar um cliente         | ✅ `auth`   |
| 📃 `GET`    | `/api/v1/client`       | Listar todos os clientes  | ✅ `auth`   |

---

### 🛒 Produtos (`/api/v1/product`)

| Método  | Rota                  | Descrição                 | Middleware |
|---------|-----------------------|---------------------------|------------|
| ➕ `POST`   | `/api/v1/product`      | Criar um produto          | ✅ `auth`   |
| ✏️ `PATCH`  | `/api/v1/product/:id`  | Editar um produto         | ✅ `auth`   |
| ❌ `DELETE` | `/api/v1/product/:id`  | Remover um produto        | ✅ `auth`   |
| 🔍 `GET`    | `/api/v1/product`      | Buscar um produto         | ✅ `auth`   |
| 📃 `GET`    | `/api/v1/products`     | Listar todos os produtos  | ✅ `auth`   |

---

### 💰 Vendas (`/api/v1/sale`)

| Método  | Rota                  | Descrição                 | Middleware |
|---------|-----------------------|---------------------------|------------|
| ➕ `POST`   | `/api/v1/sale`         | Registrar uma venda       | ✅ `auth`   |

---

### 🔑 Autenticação e Usuários

| Método  | Rota                  | Descrição                 | Middleware |
|---------|-----------------------|---------------------------|------------|
| 🔓 `POST`   | `/api/v1/login`        | Realizar login            | ❌          |
| ➕ `POST`   | `/api/v1/user`         | Criar um usuário          | ❌          |

---

### 🛠️ Observações

- ✅ **Middleware `auth`**: Todas as rotas protegidas exigem que seja enviado um token JWT no header da requisição (Esse token 
recuperado através da rota de login)
- ❌ **Rotas públicas**: A criação de usuários e login não requerem autenticação.


## 🗂️ Esquemas da API

Abaixo estão os principais esquemas utilizados nas rotas da aplicação para criação de recursos. Estes esquemas são enviados como corpo da requisição nas rotas `POST` correspondentes.

### 🧑‍💼 Cliente (`/api/v1/client`)

Esquema para a criação de um novo cliente:

```json
{
  "cpf": "12345678900",
  "name": "João Silva",
  "telephone": "11987654321"
}
```

### 🛒 Produto (/api/v1/product)

Esquema para a criação de um novo produto:

```json
{
  "price": 99.99,
  "name": "Produto Exemplo"
}
```

### 💰 Venda (/api/v1/sale)

Esquema para registrar uma nova venda:

```json
{
  "clientId": 1,
  "productId": 2,
  "amount": 3
}
```

### 🔑 Usuário (/api/v1/user)

Esquema para a criação de um novo usuário:

```json
{
  "fullName": "Maria Oliveira Silva Basto",
  "email": "maria.oliveira@gmail.com",
  "password": "senha1234"
}
```
### 🔑 Usuário (/api/v1/login)

Esquema para a criação de um novo usuário:

```json
{
  "email": "maria.oliveira@gmail.com",
  "password": "senha1234"
}
```