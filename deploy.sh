#!/bin/bash
# Script para compilar el sitio de Vite en Plesk

echo "--- Iniciando despliegue en $(date) ---"

# Navegamos a la carpeta raíz del repositorio. 
# Asegúrate de que esta ruta sea la correcta para tu servidor.
cd /var/www/vhosts/ecoservicemexiquense.com.mx/Eco-Service-Landingpage

# Cargamos el entorno específico de Node.js v24 para tener acceso a 'npm'
# Esta línea es la clave para que encuentre los comandos.
source /opt/plesk/node/24/enable

# Ejecutamos los comandos de compilación
echo "Instalando dependencias..."
npm ci

echo "Compilando el sitio..."
npm run build

echo "--- Despliegue completado ---"