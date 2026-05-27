# Entrega 1 - Semana 3
## Integración Continua con Docker

Proyecto de software contenerizado mediante **Docker**, compuesto por **dos contenedores comunicados entre sí**:

- **Backend**: API REST construida con **Node.js + Express**
- **Frontend**: Aplicación web construida con **React** y servida con **Nginx**

Ambos servicios se ejecutan en una red personalizada de Docker (`red-entrega1`), lo que les permite descubrirse mutuamente mediante el DNS interno usando el nombre del servicio.

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    red-entrega1 (bridge)                │
│                                                         │
│   ┌──────────────────┐         ┌──────────────────┐     │
│   │  frontend         │ HTTP    │  backend         │     │
│   │  (React + Nginx) │ ──────► │  (Node.js +      │     │
│   │  Puerto: 80      │ /api/*  │   Express)       │     │
│   │                  │         │  Puerto: 4000    │     │
│   └──────────────────┘         └──────────────────┘     │
│           │                                             │
└───────────┼─────────────────────────────────────────────┘
            │
       host:8080
            │
       Navegador
```

---

## Requisitos previos

- Docker Engine 20.10+
- Docker Compose v2+
- Git

---

## Estructura del proyecto

```
entrega1/
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx.conf
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── index.css
├── docs/
│   └── Entrega1_Semana3.docx
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## Cómo ejecutar

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPO>
cd entrega1
```

### 2. Construir e iniciar los contenedores
```bash
docker compose up --build
```

Para ejecutar en segundo plano:
```bash
docker compose up --build -d
```

### 3. Acceder a la aplicación
- **Frontend**: http://localhost:8080
- **Backend (API directa)**: http://localhost:4000/api/health

### 4. Detener los contenedores
```bash
docker compose down
```

---

## Verificación de la comunicación entre contenedores

### Opción A: Desde el navegador
Al abrir http://localhost:8080, la app React muestra:
- Estado del backend (`/api/health`)
- Mensaje proveniente del backend (`/api/mensaje`)
- Listado de estudiantes con CRUD funcional

Si todo está bien comunicado, aparece el indicador **✓ Backend conectado**.

### Opción B: Desde la terminal (ping entre contenedores)
```bash
# Listar contenedores activos
docker ps

# Probar comunicación: hacer ping desde el frontend al backend
docker exec entrega1-frontend ping -c 3 backend

# Probar la API directamente desde el contenedor frontend
docker exec entrega1-frontend wget -qO- http://backend:4000/api/health
```

### Opción C: Inspeccionar la red Docker
```bash
docker network inspect red-entrega1
```

---

## Endpoints del backend

| Método | Endpoint                | Descripción                       |
|--------|-------------------------|-----------------------------------|
| GET    | `/api/health`           | Verificación de estado            |
| GET    | `/api/mensaje`          | Mensaje de bienvenida             |
| GET    | `/api/estudiantes`      | Lista todos los estudiantes       |
| GET    | `/api/estudiantes/:id`  | Obtiene un estudiante específico  |
| POST   | `/api/estudiantes`      | Crea un nuevo estudiante          |
| DELETE | `/api/estudiantes/:id`  | Elimina un estudiante             |

---

## Tecnologías utilizadas

- **Docker** y **Docker Compose** - Contenerización y orquestación
- **Node.js 20** - Runtime del backend
- **Express 4** - Framework web del backend
- **React 18** - Librería del frontend
- **Nginx Alpine** - Servidor web y proxy reverso

---

## Autores

Grupo de trabajo - Integración Continua  
Entrega 1 - Semana 3
