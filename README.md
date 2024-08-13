## 📋 Instruções para Teste

Para rodar o projeto localmente, siga os passos abaixo:
  
  *Primeiramente crie um arquivo .env seguindo o exemplo do arquivo .env.example.
  *certifique-se de ter mySQL executando na sua máquina local.


1. **Instale as dependências:**
   ```bash
   npm install

2. **Rodar migrations do projeto**
  ```bash
    npx prisma migrate deploy
    npx prisma generate

3. **Iniciar projeto**
   ```bash
   npm run start:dev
