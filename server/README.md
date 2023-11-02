- USER

  - id
  - username
  - email
  - ip
  - password
  - profilePicture
  - followers
    - user id
    - username
  - following
    - user id
    - username

- POST
  - createdBy
  - createdAt
  - comments[]
    - createdBy
    - comment
  - image
  - description
  - prompt
  - likes
    - user id
    - username
  - private = false

CASO USER ID SEJA IGUAL E NOME DIFERENTE, ATUALIZA O NOME

API DE GERAR IMAGEM COM PROMPT
GERA IMAGEM
CRIA POST PUBLIC FALSE
RETURNA POST PRO USUARIO COM IMAGEM CRIADA

SE O USUARIO POSTA -> TORNA TRUE E ADICIONA DES OU OUTRO
