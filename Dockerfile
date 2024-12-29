# Usar la imagen base de node
FROM node:20

# Crear un grupo y usuario para evitar problemas de permisos
RUN groupadd -r nodeapp && useradd -r -g nodeapp nodeapp

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar las dependencias necesarias para producción
RUN npm ci --only=production

# Instalar dependencias de desarrollo para bcrypt (si las necesitas)
RUN apt-get update && apt-get install -y build-essential

# Reinstalar bcrypt (si es necesario)
RUN npm uninstall bcrypt && npm install bcrypt

# Copiar el resto de los archivos del proyecto
COPY . .

# Asegurarse de que los permisos son correctos
RUN chown -R nodeapp:nodeapp /app

# Cambiar al usuario creado previamente
USER nodeapp

# Declarar el puerto en el que la aplicación se ejecutará dentro del contenedor
EXPOSE 8080

# Configurar la variable de entorno del puerto (en caso de que necesites personalizarla)
ENV PORT=8080

# El comando para arrancar la aplicación
CMD ["npm", "start"]
