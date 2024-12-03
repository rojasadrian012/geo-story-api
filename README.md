<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Geo-Story API

## Backend

1. Clonar repositorio
2. Acceder al directorio
   ```bash
   cd geo-story-api
   ```
3. Ejecutar
   ```bash
   yarn install
   ```
4. Clonar el `__.env.template__` y renombrarlo a `__.env__`
5. Agregar de manera correcta las variables de `__.env__`
6. Levantar la base de datos
   ```bash
   docker-compose up -d
   ```
7. Levantar el modo de desarrollo
   ```bash
   yarn start:dev
   ```
8. Ejecutar el seed para cargar la base de datos
   ```bash
   http://localhost:3000/api/seed
   ```

---

## Información sobre el archivo `seed-data.ts`

El proyecto incluye un archivo llamado `seed-data.ts`, ubicado en el directorio `src\seed\data\seed-data.ts`, donde puedes cargar contenido propio para poblar la base de datos al ejecutar el seed. Este archivo contiene los siguientes elementos clave:
g

### Estructura del archivo `seed-data.ts`:

- **`SeedUser`**: Interface que describe los datos de un usuario para el seed, incluyendo el nombre de usuario, contraseña, nombre completo y roles asignados.

- **`Quizz`**: Interface que representa los cuestionarios con su dificultad, título, preguntas y respuestas.

- **`SeedData`**: Interface que agrupa todos los elementos anteriores y que contiene la estructura general de los datos que se cargarán en la base de datos.

### Personalización del `seed-data.ts`:

Para agregar o modificar los datos cargados en el seed, puedes modificar el archivo `seed-data.ts` de acuerdo con tus necesidades. Los cambios se reflejarán cuando ejecutes el endpoint de seed.

```typescript
export const initialData: SeedData = {
  users: [
    {
      nickname: 'admin',
      password: 'admin123',
      fullName: 'Administrador del Sistema',
      roles: ['admin', 'user'],
    },
    // Agregar más usuarios según sea necesario
  ],
  quizzes: [
    {
      difficulty: levels.l3,
      title: 'Geografía Básica',
      questions: [
        {
          title: '¿Cuál es la capital de Francia?',
          hint: 'Es una ciudad conocida por su Torre Eiffel.',
          answers: [
            { text: 'Madrid', isCorrect: false },
            { text: 'París', isCorrect: true },
            { text: 'Berlín', isCorrect: false },
          ],
        },
      ],
      image: 'geografia-basica.png',
    },
    // Agregar más preguntas según sea necesario
  ],
};
```
