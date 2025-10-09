#!/bin/bash
# Script para compilar el sitio de Vite en Plesk

echo "--- Iniciando despliegue en $(date) ---"

# Navegamos a la carpeta httpdocs donde está el package.json
cd /var/www/vhosts/ecoservicemexiquense.com.mx/httpdocs

# Cargamos el entorno específico de Node.js v24 para tener acceso a 'npm'
source /opt/plesk/node/24/enable

# Ejecutamos los comandos de compilación
echo "Instalando dependencias..."
npm ci

echo "Compilando el sitio..."
npm run build

echo "--- Despliegue completado ---"