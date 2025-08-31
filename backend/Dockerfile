# --- FASE 1: A "OFICINA DE CONSTRUÇÃO" (Builder) ---
# Usamos uma imagem Node.js para ter todas as ferramentas de build
FROM node:18-alpine AS builder

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de gerenciamento de pacotes e o tsconfig
COPY package*.json ./
COPY tsconfig.json ./

# Instala TODAS as dependências, incluindo as de desenvolvimento para o build
RUN npm install

# Copia o schema do Prisma
COPY prisma ./prisma/

# Copia o resto do código do nosso projeto
COPY src ./src/

# Geramos o Prisma Client (essencial para o ambiente do container)
RUN npx prisma generate

# FINALMENTE, CONSTRUÍMOS O PROJETO, CRIANDO A PASTA /dist
RUN npm run build


# --- FASE 2: A "CAIXA DE ENTREGA" FINAL (Produção) ---
# Começamos de uma imagem Node.js limpa e leve
FROM node:18-alpine

WORKDIR /app

# Copiamos os arquivos de gerenciamento de pacotes novamente
COPY package*.json ./

# Instalamos APENAS as dependências de produção, ignorando as de desenvolvimento
RUN npm install --omit=dev

# Copiamos a pasta 'dist' com o código já compilado da fase de construção
COPY --from=builder /app/dist ./dist

# Copiamos o schema do Prisma (necessário em tempo de execução)
COPY --from=builder /app/prisma ./prisma

# Copiamos o Prisma Client já gerado da fase de construção
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client

# Expomos a porta correta que nossa aplicação usa (3333)
EXPOSE 3333

# O comando CORRETO para iniciar a aplicação em produção
CMD [ "npm", "run", "start" ]