# AdoptMe - Backend III

Proyecto final del curso **Backend III - Coderhouse**.
Se trata de una API para gestionar usuarios, mascotas y adopciones, desarrollada con Node.js, Express y MongoDB.

El objetivo principal es poner en práctica todo lo visto en el curso:

* Testing (unitario y funcional)
* Documentación con Swagger
* Seguridad
* Escalabilidad y performance
* Y finalmente, **dockerizar el proyecto** 🚀

---

## ⚙️ Instalación local

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/GinoskL/backend3-adoptme.git
   cd backend3-adoptme
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Configurar las variables de entorno:
   Crear un archivo **.env** en la raíz con algo como:

   ```
   MONGO_URL=mongodb://localhost:27017/adoptme
   PORT=8080
   JWT_PRIVATE_KEY=mi_secreto_jwt
   SESSION_SECRET=mi_sesion_secreta
   NODE_ENV=development
   ```

4. Levantar el servidor:

   ```bash
   npm start
   ```

---

## 📖 Documentación API (Swagger)

El proyecto incluye documentación con **Swagger**.
Para acceder, levantar el servidor y entrar a:

👉 [http://localhost:8080/api/docs](http://localhost:8080/api/docs)

---

## 🧪 Tests

El proyecto tiene tests desarrollados con **Mocha + Chai + Supertest**.

Para correrlos:

```bash
npm test
```

---

## 🐳 Docker

La imagen de este proyecto está publicada en Docker Hub:
👉 [ginoskl/adoptme-backend](https://hub.docker.com/r/ginoskl/adoptme-backend)

### Correr la imagen

1. Crear un archivo `.env` con las variables necesarias (ver ejemplo arriba).
2. Ejecutar:

   ```bash
   docker run -p 8080:8080 --env-file .env ginoskl/adoptme-backend:latest
   ```

### Con Docker Compose (incluye Mongo)

```yaml
version: '3.8'
services:
  app:
    image: ginoskl/adoptme-backend:latest
    ports:
      - "8080:8080"
    env_file: .env
    depends_on:
      - mongo
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
volumes:
  mongo_data:
```

Levantar con:

```bash
docker-compose up -d
```

---

## 📌 Endpoints principales

* **Usuarios** → `/api/users`
* **Mascotas** → `/api/pets`
* **Adopciones** → `/api/adoptions`
* **Mocks** → `/api/mocks`

---

## 👨‍💻 Autor

**Gino Zampierón**
[GitHub](https://github.com/GinoskL)

---
