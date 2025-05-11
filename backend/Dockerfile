# Usa una imagen oficial de Node.js como base
FROM node:22.14.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del backend
COPY . .

# Expone el puerto que usa tu app
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]