<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Geo-Story API
## Backend
1. Clonar repositorio
2. Ejecutar
```
yarn install
```
3. Clonar el __.env.template__ y renombrearlo a __.env__
4. Agregar de manera correcta las variables de __.env__
5. Levantar la base de datos
```
docker-compose up -d
```
6. Levantar el modo de desarrollo
```
yarn start:dev
```
7. Ejecutar el seed para cargar la base de datos
```
http://localhost:3000/api/seed
```