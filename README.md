<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Geo-Story API
## Backend
1. Clonar repositorio
2. Acceder al directorio
```
cd geo-story-api
```
3. Ejecutar
```
yarn install
```
4. Clonar el __.env.template__ y renombrearlo a __.env__
5. Agregar de manera correcta las variables de __.env__
6. Levantar la base de datos
```
docker-compose up -d
```
7. Levantar el modo de desarrollo
```
yarn start:dev
```
8. Ejecutar el seed para cargar la base de datos
```
http://localhost:3000/api/seed
```