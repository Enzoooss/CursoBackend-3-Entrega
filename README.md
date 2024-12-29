
# Proyecto Ecommerce

## Descripción 📝
Proyecto Final para el curso Backend de Coderhouse.

## Tecnologías utilizadas 🛠️
- **[Node.js](https://nodejs.org/en)** - Entorno de ejecución para JavaScript
- **[Express](https://expressjs.com/es/)** - Framework web para Node.js
- **[MongoDB](https://www.mongodb.com/es)** - Base de datos NoSQL

## Instalación y Uso 🚀

### Opción 1: Instalación Local

#### Descargar el proyecto
1. Descargar el repositorio en formato ZIP
   - Ir a "Code" → "Download ZIP"
   - Descomprimir el archivo

2. Instalar dependencias
   ```bash
   npm install
   ```

3. Iniciar el proyecto
   ```bash
   npm start
   # o
   npm run dev
   ```

4. Acceder a la aplicación
   - Abrir en el navegador: [http://localhost:8080](http://localhost:8080)

### Opción 2: Clonar el repositorio
```bash
git clone https://github.com/Enzoooss/CursoBackend-3-Entrega.git
cd CursoBackend-3-Entrega
npm install
npm start
```

### Opción 3: Docker Compose 🐳

1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema

2. Crea un archivo `docker-compose.yml` con el siguiente contenido:
   ```yaml
   version: '3.8'
   services:
     app:
       image: 2deoctubredel96/entragafinal-3:latest
       ports:
         - "8080:8080"
       environment:
         - NODE_ENV=production
   ```

3. Ejecuta el contenedor:
   ```bash
   docker-compose up -d
   ```

4. Accede a la aplicación en [http://localhost:8080](http://localhost:8080)

## Información Docker 🐋
- **Imagen Docker**: [2deoctubredel96/entragafinal-3](https://hub.docker.com/repository/docker/2deoctubredel96/entragafinal-3)
- **Tag**: latest
- **SHA**: sha256-9cd188c0e60531108f0344bad61b32c38e506ccf7ebf876257238fc1b1e007a2

## Enlaces 🔗
- [Repositorio GitHub](https://github.com/Enzoooss/CursoBackend-3-Entrega)
- [Docker Hub](https://hub.docker.com/repository/docker/2deoctubredel96/entragafinal-3/tags/latest)


