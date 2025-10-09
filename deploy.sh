#!/bin/bash
# Script para compilar el sitio de Vite en Plesk

# --- LA CLAVE FINAL: Añadimos la carpeta de Node al PATH del script ---
# Esto permite que todos los sub-procesos (como los de esbuild) encuentren 'node' y 'npm'.
export PATH=/opt/plesk/node/24/bin:$PATH

echo "--- Iniciando despliegue en $(date) ---"

# 1. Navegamos a la carpeta httpdocs donde está el package.json
cd /var/www/vhosts/ecoservicemexiquense.com.mx/httpdocs

# 2. Ahora podemos usar los comandos cortos porque están en el PATH
echo "Instalando dependencias..."
npm ci

echo "Compilando el sitio..."
npm run build

echo "--- Despliegue completado ---"