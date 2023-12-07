# Use a imagem do Node.js
FROM node:21

# Configurar o diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos necessários
COPY package*.json ./
COPY yarn.lock ./

# Instalar as dependências
RUN yarn install --production

# Copiar o código-fonte
COPY dist ./dist

# Expor a porta que seu aplicativo está usando
EXPOSE 80

# Comando para iniciar o aplicativo
CMD ["node", "dist/app/server.js"]
