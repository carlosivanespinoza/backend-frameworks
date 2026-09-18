# Reflexion - EC1 F1 A2

**Nombre:** Carlos Ivan Espinoza
**Grupo:**

## 1. Funcion de Node.js

Node.js ejecuta la aplicacion en la terminal sin depender del navegador. En este proyecto permite correr el gestor de tareas como backend de consola y usar recursos del entorno como `process.env`.

## 2. Aportes de TypeScript

TypeScript permite definir tipos e interfaces para detectar errores antes de ejecutar. En la practica ayuda a asegurar que cada tarea tenga identificador, titulo, estado y fecha de creacion.

## 3. Separacion de models, data, services y utils

La separacion ayuda a mantener el codigo ordenado. `models` describe los datos, `data` almacena la informacion en memoria, `services` concentra las reglas de tareas y `utils` guarda funciones reutilizables.

## 4. Funcion sincrona y funcion async

Una funcion sincrona entrega su resultado inmediatamente. Una funcion `async` trabaja con promesas y puede esperar operaciones que tardan, como una consulta o una simulacion con `delay`.

## 5. Por que findTaskById devuelve Task | undefined

Devuelve `Task | undefined` porque una busqueda puede encontrar una tarea o no encontrar nada. TypeScript obliga a considerar ambos casos antes de usar el resultado.

## 6. Ventaja de leer APP_NAME desde process.env

Permite cambiar el nombre de la aplicacion sin modificar el codigo fuente. Esto separa la configuracion del programa y prepara el proyecto para entornos diferentes.

## 7. Diferencia entre pnpm start y pnpm build + pnpm serve

`pnpm start` ejecuta directamente los archivos TypeScript con TSX. `pnpm build` compila el proyecto a JavaScript en `dist` y `pnpm serve` ejecuta ese JavaScript con Node.js.

## 8. Que se reutilizara al construir la API con Express

Se podran reutilizar el modelo `Task`, los datos iniciales, el servicio de tareas y las utilidades. Express se encargara de exponer esas operaciones mediante rutas HTTP.
