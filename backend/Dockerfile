# Etapa 1: Base da Imagem
# Use uma imagem oficial do Node.js. A versão 'alpine' é leve e boa para produção.
# Substitua '18' pela versão do Node que você usa no seu projeto, se for diferente.
FROM node:18-alpine

# Etapa 2: Preparar o ambiente dentro do container
# Cria o diretório de trabalho dentro do container
WORKDIR /app

# Etapa 3: Instalar as dependências
# Copia o package.json e o package-lock.json primeiro.
# Isso aproveita o cache do Docker: se esses arquivos não mudarem, o 'npm install' não roda de novo em builds futuros.
COPY package*.json ./
RUN npm install

# Etapa 4: Copiar o código da sua aplicação
# Copia todo o resto do código para o diretório de trabalho no container
COPY . .

# Etapa 5: Expor a porta
# Informe ao Docker que o container vai escutar nesta porta.
# !! IMPORTANTE !!: Troque 3000 pela porta que seu backend realmente usa.
EXPOSE 3000

# Etapa 6: Comando para iniciar a aplicação
# Este é o comando que será executado quando o container iniciar.
CMD [ "npm", "run", "dev:run" ]