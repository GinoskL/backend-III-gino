# 🐾 Adoptme Backend API

Backend API para la plataforma de adopción de mascotas Adoptme, desarrollado con Node.js, Express y MongoDB.

## 📋 Características

- **Gestión de Usuarios**: Registro, autenticación y perfil de usuarios
- **Gestión de Mascotas**: CRUD completo para mascotas disponibles
- **Sistema de Adopciones**: Proceso completo de adopción
- **Autenticación JWT**: Sistema seguro de autenticación
- **Documentación Swagger**: API completamente documentada
- **Tests Funcionales**: Suite completa de tests con Mocha y Chai
- **Dockerizado**: Listo para despliegue en contenedores

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18 o superior
- MongoDB
- Docker (opcional)

### Instalación Local

1. **Clonar el repositorio**
\`\`\`bash
git clone https://github.com/tu-usuario/adoptme-backend.git
cd adoptme-backend
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Configurar variables de entorno**
\`\`\`bash
cp .env.example .env
# Editar .env con tus configuraciones
\`\`\`

4. **Iniciar MongoDB**
\`\`\`bash
# Asegúrate de que MongoDB esté corriendo en tu sistema
mongod
\`\`\`

5. **Ejecutar la aplicación**
\`\`\`bash
# Desarrollo
npm run dev

# Producción
npm start
\`\`\`

La API estará disponible en `http://localhost:8080`

## 🐳 Instalación con Docker

### Opción 1: Usar imagen de DockerHub

\`\`\`bash
# Descargar y ejecutar la imagen
docker run -p 8080:8080 --env-file .env gino123/adoptme-backend:latest
\`\`\`

### Opción 2: Construir localmente

\`\`\`bash
# Construir la imagen
docker build -t adoptme-backend .

# Ejecutar el contenedor
docker run -p 8080:8080 --env-file .env adoptme-backend
\`\`\`

### Docker Compose (Recomendado)

\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    image: gino123/adoptme-backend:latest
    ports:
      - "8080:8080"
    environment:
      - MONGO_URL=mongodb://mongo:27017/adoptme
      - PORT=8080
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
\`\`\`

\`\`\`bash
docker-compose up -d
\`\`\`

## 📚 Documentación API

### Swagger UI
Una vez que la aplicación esté corriendo, puedes acceder a la documentación interactiva en:
- **Local**: http://localhost:8080/api-docs
- **Docker**: http://localhost:8080/api-docs

### Endpoints Principales

#### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:uid` - Obtener usuario por ID
- `PUT /api/users/:uid` - Actualizar usuario
- `DELETE /api/users/:uid` - Eliminar usuario

#### Mascotas
- `GET /api/pets` - Obtener todas las mascotas
- `POST /api/pets` - Crear nueva mascota
- `PUT /api/pets/:pid` - Actualizar mascota
- `DELETE /api/pets/:pid` - Eliminar mascota

#### Adopciones
- `GET /api/adoptions` - Obtener todas las adopciones
- `GET /api/adoptions/:aid` - Obtener adopción por ID
- `POST /api/adoptions/:uid/:pid` - Crear nueva adopción

#### Sesiones
- `POST /api/sessions/register` - Registrar usuario
- `POST /api/sessions/login` - Iniciar sesión
- `GET /api/sessions/current` - Usuario actual
- `POST /api/sessions/logout` - Cerrar sesión

## 🧪 Testing

### Ejecutar Tests

\`\`\`bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests específicos
npm test -- --grep "Adoptions"
\`\`\`

### Cobertura de Tests

Los tests incluyen:
- ✅ Tests funcionales para todos los endpoints de adopciones
- ✅ Validación de respuestas exitosas y errores
- ✅ Casos edge y manejo de errores
- ✅ Setup y cleanup automático de datos de prueba

## 🏗️ Estructura del Proyecto

\`\`\`
adoptme-backend/
├── src/
│   ├── controllers/     # Controladores de rutas
│   ├── dao/            # Data Access Objects
│   ├── dto/            # Data Transfer Objects
│   ├── repository/     # Capa de repositorio
│   ├── routes/         # Definición de rutas
│   ├── services/       # Lógica de negocio
│   ├── config/         # Configuraciones
│   └── app.js          # Punto de entrada
├── test/               # Tests funcionales
├── logs/               # Archivos de log
├── Dockerfile          # Configuración Docker
├── docker-compose.yml  # Orquestación Docker
└── README.md
\`\`\`

## 🔧 Scripts Disponibles

\`\`\`bash
npm start          # Iniciar en producción
npm run dev        # Iniciar en desarrollo con nodemon
npm test           # Ejecutar tests
npm run test:watch # Tests en modo watch
npm run docker:build # Construir imagen Docker
npm run docker:run   # Ejecutar contenedor Docker
\`\`\`

## 🌐 Despliegue

### DockerHub
La imagen oficial está disponible en:
**🐳 [gino123/adoptme-backend](https://hub.docker.com/r/gino123/adoptme-backend)**

\`\`\`bash
docker pull gino123/adoptme-backend:latest
\`\`\`

### Variables de Entorno Requeridas

\`\`\`env
MONGO_URL=mongodb://localhost:27017/adoptme
PORT=8080
JWT_PRIVATE_KEY=your-jwt-secret
SESSION_SECRET=your-session-secret
NODE_ENV=production
\`\`\`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Gino** - [GitHub](https://github.com/tu-usuario)

---

## 📋 Checklist Proyecto Final Backend 3

- ✅ **Documentación Swagger**: Módulo Users completamente documentado
- ✅ **Tests Funcionales**: Suite completa para adoption.router.js
- ✅ **Dockerización**: Dockerfile optimizado y funcional
- ✅ **DockerHub**: Imagen publicada y accesible
- ✅ **README**: Documentación completa con instrucciones

**🎯 Proyecto listo para entrega!**
