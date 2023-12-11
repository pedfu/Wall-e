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

FOI ADICIONADO -> import FormData from 'form-data'; EM index.modern.mjs em imaginesdk/dist

TROCAR SDK POR CHAMDA POR API DA IMAGINESDK
-> https://platform.imagine.art/playground/text-to-image

# Authentication

- User
- Login
  - Generate a JSON Web Toke (JWT) to authenticate the user

bcrypt -> encript password
jsonwebtoken -> generate JWT
bull -> redis queue
