# especifica a criação de sistema operacional de 
FROM node:20-alpine

# Define a pasta onde o codigo vai ser executado
WORKDIR /app

#Copia os arquivos packet.json e package-lock.json para a pasta /app
COPY package*.json ./

# Instala as dependências 
RUN npm install

# Copia o restante dos arquivos para a pasta /app
COPY . .

# Informar a porta que aplicação vai entrar
EXPOSE 8080

# Comando para iniciar aplicação
CMD [ "npm", "run", "dev" ]