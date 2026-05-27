# ----------------------------------------------------
# Dockerfile - Servicio Backend (Node.js + Express)
# Entrega 1 - Semana 3
# ----------------------------------------------------

# Imagen base ligera de Node.js
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias primero (optimiza la caché de Docker)
COPY package*.json ./

# Instalar dependencias en modo producción
RUN npm install --omit=dev

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto en el que escucha el servicio
EXPOSE 4000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=4000

# Comando de inicio
CMD ["node", "server.js"]
