# Projeto Final — Web 2

API em **ExpressJS**.

## Como rodar

```bash
npm install
cp .env.example .env
npm run dev
```

A API sobe em `http://localhost:3000`.

## Endpoints

Todas as rotas de `/turma` e `/frequencia`, exceto
`GET /turma/:id/frequencia`, exigem `Authorization: Bearer <token>`.

| Verbo | Rota | Acesso |
|---|---|---|
| POST | `/auth/cadastro` | Público |
| POST | `/auth/login` | Público |
| GET | `/auth/perfil` | Logado |
| POST, GET | `/turma` | Logado |
| GET, PUT, DELETE | `/turma/:id` | Logado; alterações somente pelo professor dono |
| POST | `/frequencia` | Professor dono da turma |
| POST | `/turma/:id/frequencia` | Professor dono da turma |
| GET | `/frequencia` | Logado; lista as frequências do professor e do aluno |
| GET | `/turma/:id/frequencia` | Público |
| GET | `/frequencia/:id` | Professor da turma ou aluno associado |
| PUT, DELETE | `/frequencia/:id` | Professor dono da turma |

O cadastro público recebe `nome`, `email` e `senha`; a senha é armazenada
como hash e nunca aparece nas respostas. O login retorna um token JWT.

### Testar cadastro de usuário

Com a API em execução, envie:

```bash
curl -i -X POST http://localhost:3000/auth/cadastro \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria Silva","email":"maria.silva@escola.com","senha":"senha123"}'
```

Resposta esperada (`201 Created`):

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria.silva@escola.com"
}
```

O campo `senha` não é retornado. Para repetir o teste, use um e-mail ainda
não cadastrado, pois o e-mail deve ser único.

### Testar as requisições com a extensão Flashpost

1. Instale e abra a extensão **Flashpost** no VS Code.
2. Inicie a API em um terminal com `npm run dev`. Mantenha esse terminal aberto;
   os exemplos abaixo usam `http://localhost:3000`.
3. No Flashpost, crie uma requisição e configure o método, a URL e, quando
   necessário, o corpo como JSON (`Content-Type: application/json`).
4. Cadastre um usuário:
   - Método: `POST`
   - URL: `http://localhost:3000/auth/cadastro`
   - Corpo:
     ```json
     {
       "nome": "Maria Silva",
       "email": "maria.flashpost@escola.com",
       "senha": "senha123"
     }
     ```
   - Clique em **Send** e confira o status `201`. Guarde o `id` retornado.
     Use outro e-mail se esse já estiver cadastrado.
5. Faça login com o mesmo usuário:
   - Método: `POST`
   - URL: `http://localhost:3000/auth/login`
   - Corpo:
     ```json
     {
       "email": "maria.flashpost@escola.com",
       "senha": "senha123"
     }
     ```
   - Clique em **Send** e copie o valor de `token` da resposta.
6. Teste o perfil:
   - Método: `GET`
   - URL: `http://localhost:3000/auth/perfil`
   - Em **Headers**, adicione `Authorization` com o valor `Bearer <token>`,
     substituindo `<token>` pelo token copiado no passo anterior.
   - A resposta esperada é `200` com `id`, `nome` e `email`.
7. Crie uma turma:
   - Método: `POST`
   - URL: `http://localhost:3000/turma`
   - Use o mesmo header `Authorization`.
   - Corpo:
     ```json
     {
       "nomeP": "Engenharia de Software"
     }
     ```
   - Confira o status `201` e guarde o `id` da turma. O professor e o código
     são definidos automaticamente pela API.
8. Teste as consultas:
   - `GET http://localhost:3000/turma` com o header `Authorization`.
   - `GET http://localhost:3000/turma/<id-da-turma>` com o header.
   - `GET http://localhost:3000/turma/<id-da-turma>/frequencia` sem header
     (essa consulta é pública).
9. Lance uma frequência:
   - Método: `POST`
   - URL: `http://localhost:3000/turma/<id-da-turma>/frequencia`
   - Use o header `Authorization` do professor dono da turma.
   - Corpo:
     ```json
     {
       "alunoId": 1,
       "status": "presente"
     }
     ```
   - Troque `alunoId` pelo ID de um usuário já cadastrado. A resposta `201`
     contém o `id` da frequência; `data` é preenchida automaticamente.
10. Com o header de autenticação, teste:
    - `GET http://localhost:3000/frequencia`
    - `GET http://localhost:3000/frequencia/<id-da-frequencia>`
11. Para testar as outras operações:
    - `POST http://localhost:3000/frequencia`, com o header de autenticação
      e o corpo `{"turmaId":1,"alunoId":1,"status":"presente"}`. Use IDs
      existentes; o usuário autenticado precisa ser dono da turma.
    - `PUT http://localhost:3000/turma/<id-da-turma>`, com o corpo
      `{"nomeP":"Engenharia de Software II"}`.
    - `PUT http://localhost:3000/frequencia/<id-da-frequencia>`, com o corpo
      `{"status":"ausente"}`.
    - Método `DELETE` para
      `http://localhost:3000/frequencia/<id-da-frequencia>` remove a frequência.
      Para remover a turma e suas frequências, use `DELETE` em
      `http://localhost:3000/turma/<id-da-turma>`. Essas alterações só são
      permitidas ao professor dono.

Na criação de uma turma, envie `nomeP`: `profId` vem do usuário autenticado e
`codigoTurm` é gerado pela API. Na criação de frequência envie `turmaId`,
`alunoId` e `status`; `data` é preenchida automaticamente.

O esquema de usuário não define um campo de papel (professor/aluno); por isso,
o usuário autenticado que cria uma turma é considerado seu professor. Consulte
[`contrato.json`](./contrato.json) para exemplos de sucesso e erro de todas as rotas.

