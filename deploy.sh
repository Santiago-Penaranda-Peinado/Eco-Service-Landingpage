#!/bin/bash
# Script para compilar el sitio de Vite en Plesk

# --- Añadimos la carpeta de Node al PATH del script ---
export PATH=/opt/plesk/node/24/bin:$PATH

echo "--- Iniciando despliegue en $(date) ---"

# 1. Navegamos a la carpeta httpdocs
cd /var/www/vhosts/ecoservicemexiquense.com.mx/httpdocs

# 2. Instalamos y compilamos
echo "Instalando dependencias..."
npm ci
echo "Compilando el sitio..."
npm run build

# 3. Copiamos los archivos PHP de forma segura a 'dist'
echo "Copiando archivos de formulario a 'dist'..."
cp enviar-formulario.php dist/
cp -r phpmailer/ dist/ # Asegúrate que el nombre (mayúsculas/minúsculas) sea correcto

# 4. Corremos la reparación de permisos
echo "Reparando permisos de archivos..."
plesk repair fs ecoservicemexiquense.com.mx -y

echo "--- Despliegue completado ---"