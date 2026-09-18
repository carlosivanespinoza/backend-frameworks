# Preguntas de cierre - EC1 F1 A2

## 1. Cual es la funcion de Node.js dentro de esta aplicacion?

Node.js permite ejecutar JavaScript fuera del navegador. En este proyecto se usa para correr una aplicacion de consola desde la terminal, leer variables de entorno con `process.env` y ejecutar el codigo compilado en `dist/index.js`.

## 2. Que ventajas ofrece TypeScript frente a JavaScript?

TypeScript ayuda a detectar errores antes de ejecutar el programa. Por ejemplo, la interfaz `Task` exige que cada tarea tenga `id`, `title`, `status` y `createdAt`, y el tipo `TaskStatus` evita usar estados no permitidos.

## 3. Para que sirven las importaciones y exportaciones?

Sirven para dividir el proyecto en modulos. Cada archivo expone solo lo que otros necesitan usar, como el servicio de tareas en `task.service.ts` o la funcion `delay` en `utils/delay.ts`.

## 4. Que responsabilidad tiene cada modulo del proyecto?

`models` define la forma de los datos. `data` guarda las tareas en memoria. `services` contiene las reglas para crear, buscar, completar, filtrar y eliminar tareas. `utils` tiene funciones reutilizables. `index.ts` coordina la ejecucion y muestra resultados.

## 5. Cual es la diferencia entre una operacion sincrona y una asincrona?

Una operacion sincrona termina antes de continuar con la siguiente instruccion. Una operacion asincrona puede tardar y devuelve una promesa, como ocurre con `delay` y `findTaskByIdAsync`.

## 6. Para que se utilizan async y await?

`async` declara una funcion que trabaja con promesas y `await` espera el resultado de una promesa antes de continuar. En este proyecto se usan para simular una operacion asincrona y manejar sus errores con `try/catch`.

## 7. Por que las variables sensibles no deben escribirse directamente en el codigo?

Porque el codigo puede subirse a GitHub o compartirse con otras personas. Las claves, tokens y contrasenas deben vivir en variables de entorno o archivos locales ignorados por Git, como `.env`.

## 8. Que errores controla la aplicacion y como responde ante ellos?

La aplicacion controla titulo vacio, busqueda de tarea inexistente, intento de completar una tarea inexistente, eliminacion de una tarea inexistente y fallo durante una operacion asincrona. En cada caso muestra un mensaje claro con `Error controlado`.
