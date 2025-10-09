#!/bin/bash
# Script para compilar el sitio de Vite en Plesk

echo "--- Iniciando despliegue en $(date) ---"

# 1. Navegamos a la carpeta httpdocs donde está el package.json
cd /var/www/vhosts/ecoservicemexiquense.com.mx/httpdocs

# 2. Usamos las rutas absolutas para llamar a node y al script de npm

# Comando para 'npm ci'
echo "Instalando dependencias..."
/opt/plesk/node/24/bin/node /opt/plesk/node/24/lib/node_modules/npm/bin/npm-cli.js ci

# Comando para 'npm run build'
echo "Compilando el sitio..."
/opt/plesk/node/24/bin/node /opt/plesk/node/24/lib/node_modules/npm/bin/npm-cli.js run build

echo "--- Despliegue completado ---"