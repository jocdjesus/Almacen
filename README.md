# Almacen

## Instalación

### Instalaciones previas:

- **Instalar Expo Go** en tu dispositivo móvil Android o iOS. (Es necesario instalar Expo 50).
- **Tener instalado MongoDB** para el correcto funcionamiento de la aplicación.
- **Tener instalado Node.js.**

  

### Instalación:
1. Clona el repositorio:
   ```bash
   git clone https://github.com/jocdjesus/Almacen.git
   ```
2. Instalar Expo CLI:
   ```bash
   npm install -g expo-cli
   ```
3. Descarga dependencias:
   cd Almacen/ecommerce-master
   ```bash
   npm i
   ```
4. Correr API's:
   Dirígete a Almacen/ecommerce-master/pages/api/producto y escribe el siguiente comando:
   ```bash
   node producto.js
   ```
   Dirígete a Almacen/ecommerce-master/pages/api/usuario y escribe el siguiente comando:
   ```bash
   node usuario.js
   ```
5. Correr el programa:
   Ejecuta el programa con:
   ```bash
   npx expo start
   ```
Adicional:
   Antes de ejecutar el programa, a veces es necesario ingresar el comando:
   ```bash
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
