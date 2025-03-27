# Projeto Laravel + Angular

Este repositório contém um backend desenvolvido em Laravel e um frontend desenvolvido em Angular.

## Tecnologias Utilizadas

### Backend (Laravel)
- PHP 8+
- Laravel 12
- SQLite

### Frontend (Angular)
- Angular 19
- TypeScript 5.7
- Bootstrap 5.3
- Ngx-Mask
- RxJS 7.8
- Zone.js

## Estrutura do Projeto

```
/projeto
|-- backend/ (Laravel API)
|-- frontend/ (Angular App)
```

## Como Configurar o Projeto


## Está com preguiça de configurar o projeto? Apenas rode:

🐳 **Certifique-se de ter o Docker previamente instalado.** 🐳

```sh
git clone https://github.com/erickmolina2002/teste-angular-visionnaire.git && cd teste-angular-visionnaire && docker compose up -d --build
```

☕ **Isso pode levar um tempinho... Aproveite para pegar um café!** ☕


### Backend (Laravel)

1. Clone o repositório e acesse a pasta do backend:

   ```sh
   git clone https://github.com/erickmolina2002/teste-angular-visionnaire.git
   cd teste-angular-visionnaire
   cd backend
   ```

2. Copie o arquivo de exemplo do ambiente e configure as variáveis:

   ```sh
   cp .env.example .env
   ```

3. Instale as dependências do Laravel:

   ```sh
   composer install
   ```
4. Inicie o servidor:

   ```sh
   php artisan serve
   ```

5. Rodar migrates:

   ```sh
   php artisan migrate
   ```
---

### Frontend (Angular)

1. Acesse a pasta do frontend:

   ```sh
   cd ../frontend
   ```

2. Instale as dependências do Angular:

   ```sh
   npm install
   ```
3. Iniciar o servidor de desenvolvimento:

   ```sh
   npm start
   ```

## Rotas Principais

### Backend
- `GET /api/phones` - Lista todos os telefones
- `POST /api/phones` - Cria um novo telefone
- `GET /api/phones/{phone}` - Retorna um telefone específico
- `PUT/PATCH /api/phones/{phone}` - Atualiza um telefone
- `DELETE /api/phones/{phone}` - Remove um telefone

## Licença

Este projeto está licenciado sob a MIT License.

