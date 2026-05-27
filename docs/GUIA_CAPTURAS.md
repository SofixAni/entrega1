# Guía de ejecución y capturas de pantalla
## Entrega 1 - Semana 3

Esta guía te indica **exactamente qué pasos seguir** y **en qué momentos tomar capturas** para enriquecer tu entrega con evidencias visuales.

---

## Preparación

### Paso 1: Subir el código al repositorio GitHub
```bash
cd entrega1
git init
git add .
git commit -m "Entrega 1 - Semana 3: Docker con dos contenedores comunicados"
git branch -M main
git remote add origin <URL_DE_TU_REPO>
git push -u origin main
```

📸 **Captura 1**: Vista del repositorio en GitHub mostrando todos los archivos subidos (Dockerfiles, docker-compose.yml, etc.)

---

## Ejecución de la solución

### Paso 2: Verificar que Docker esté funcionando
```bash
docker --version
docker compose version
```

📸 **Captura 2**: Salida mostrando las versiones de Docker y Docker Compose instaladas.

---

### Paso 3: Construir e iniciar los contenedores
```bash
cd entrega1
docker compose up --build
```

📸 **Captura 3**: Proceso de build de las dos imágenes (verás los pasos de cada Dockerfile ejecutándose).

📸 **Captura 4**: Mensaje final indicando que ambos contenedores están corriendo:
- `entrega1-backend  | Backend escuchando en el puerto 4000`
- `entrega1-frontend | nginx ... start worker processes`

---

### Paso 4: Verificar contenedores activos (en otra terminal)
```bash
docker ps
```

📸 **Captura 5**: Tabla con los dos contenedores activos (`entrega1-backend` y `entrega1-frontend`) con sus puertos mapeados.

---

### Paso 5: Inspeccionar la red Docker
```bash
docker network inspect red-entrega1
```

📸 **Captura 6**: JSON mostrando ambos contenedores conectados a la misma red, con sus IPs internas asignadas.

---

## Pruebas de comunicación entre contenedores

### Paso 6: Ping entre contenedores
```bash
docker exec entrega1-frontend ping -c 3 backend
```

📸 **Captura 7**: Respuesta del ping mostrando paquetes recibidos desde el contenedor backend (demuestra que la resolución DNS interna funciona).

---

### Paso 7: Petición HTTP desde frontend hacia backend
```bash
docker exec entrega1-frontend wget -qO- http://backend:4000/api/health
```

📸 **Captura 8**: Respuesta JSON del endpoint /api/health mostrando el estado del backend.

```bash
docker exec entrega1-frontend wget -qO- http://backend:4000/api/mensaje
```

📸 **Captura 9**: Respuesta JSON del endpoint /api/mensaje.

---

### Paso 8: Acceder a la aplicación desde el navegador

Abre en tu navegador: **http://localhost:8080**

📸 **Captura 10**: Vista completa de la aplicación con el badge "✓ Backend conectado", la información del backend, el mensaje y la lista de estudiantes.

📸 **Captura 11**: Agregar un estudiante nuevo a través del formulario (muestra que el frontend está enviando datos correctamente al backend).

📸 **Captura 12**: Lista de estudiantes actualizada después de agregar uno nuevo.

---

### Paso 9: Probar el backend directamente desde el navegador
- http://localhost:4000/api/health
- http://localhost:4000/api/estudiantes

📸 **Captura 13**: JSON crudo de la API mostrando que el backend también es accesible directamente desde el host.

---

### Paso 10: Ver los logs de los contenedores
```bash
docker compose logs --tail=20
```

📸 **Captura 14**: Logs mostrando las peticiones que recibió el backend desde el frontend.

---

## Limpieza (al terminar)

```bash
docker compose down
```

📸 **Captura 15** (opcional): Mensaje indicando que los contenedores y la red fueron detenidos correctamente.

---

## Recomendaciones para la entrega

1. **Inserta las capturas en el documento Word** en la sección "6. Ejecución y pruebas".
2. **Numéralas y referéncialas** desde el texto (ej: "Como se observa en la Figura 1...").
3. **Sube todo a GitHub** antes de hacer la entrega:
   - Código fuente
   - Dockerfiles
   - docker-compose.yml
   - README.md
   - El documento Word en la carpeta docs/
4. **Incluye en la entrega**:
   - URL del repositorio GitHub
   - Documento Word con capturas insertadas
   - (Opcional) Video corto demostrando el funcionamiento

---

## Solución de problemas comunes

**Error: "port is already allocated"**  
Otro proceso usa el puerto 8080 o 4000. Cambia el mapeo en docker-compose.yml o detén el proceso conflictivo.

**Error: "Cannot connect to the Docker daemon"**  
Docker no está corriendo. Inicia Docker Desktop o el servicio de Docker.

**El frontend carga pero dice "Backend desconectado"**  
Verifica con `docker ps` que ambos contenedores estén activos. Revisa los logs con `docker compose logs backend`.
