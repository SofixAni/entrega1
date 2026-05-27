# ----------------------------------------------------
# Dockerfile - Servicio Frontend (React + Nginx)
# Entrega 1 - Semana 3
# Build multi-etapa: compila el bundle y lo sirve con Nginx
# ----------------------------------------------------

# ===== Etapa 1: Build =====
FROM node:20-alpine AS build

WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente y construir el bundle de producción
COPY . .

# Variable de entorno que React inyecta en el build
ARG REACT_APP_API_URL=http://localhost:4000
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# ===== Etapa 2: Servir con Nginx =====
FROM nginx:alpine

# Copiar el bundle compilado al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuración personalizada de Nginx (proxy hacia el backend)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
