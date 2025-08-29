# --- FASE 1: A "OFICINA DE CONSTRUÇÃO" ---
# Usamos uma imagem Node.js para ter todas as ferramentas de build
FROM node:20-alpine AS builder

# Definimos a pasta de trabalho dentro do container
WORKDIR /app

# Copiamos os arquivos de gerenciamento de pacotes
COPY package*.json ./

# Instalamos TODAS as dependências, incluindo as de desenvolvimento
RUN npm install

# Copiamos o schema do Prisma
COPY prisma ./prisma/

# Copiamos o resto do código do nosso projeto
COPY . .

# Geramos o Prisma Client (essencial para o ambiente do container)
RUN npx prisma generate

# Executamos o build do TypeScript, que cria a pasta /dist
RUN npm run build


# --- FASE 2: A "CAIXA DE ENTREGA" FINAL ---
# Começamos de uma imagem Node.js limpa e leve
FROM node:20-alpine

WORKDIR /app

# Copiamos os arquivos de gerenciamento de pacotes novamente
COPY package*.json ./

# Instalamos APENAS as dependências de produção
RUN npm install --omit=dev

# Copiamos a pasta 'dist' com o código compilado da fase de construção
COPY --from=builder /app/dist ./dist

# Copiamos o schema do Prisma (necessário em tempo de execução)
COPY --from=builder /app/prisma ./prisma

# Copiamos o Prisma Client já gerado da fase de construção
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client

# Expomos a porta que nossa aplicação usa
EXPOSE 3333

# O comando para iniciar a aplicação
CMD ["node", "dist/server.js"]