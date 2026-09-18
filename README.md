# Backend Frameworks - Task Manager Backend

Aplicacion de consola modular creada con Node.js, TypeScript y PNPM para administrar tareas en memoria.

## Requisitos

- Node.js LTS
- PNPM
- Git
- Visual Studio Code

## Instalacion

```bash
pnpm install
```

## Comandos

```bash
pnpm dev
pnpm start
pnpm check
pnpm build
pnpm serve
```

Nota: la guia usa TSX para ejecutar TypeScript en desarrollo. En este equipo la descarga de paquetes nuevos desde npm fallo por certificado del registro, por lo que `start` y `dev` usan un ejecutor local basado en TypeScript. Cuando npm funcione correctamente, se puede instalar `tsx @types/node` y cambiar `start` a `tsx src/index.ts`.

En PowerShell tambien puedes probar el nombre de la aplicacion con:

```powershell
$env:APP_NAME="Gestor de tareas UES"; pnpm start
```

## Estructura

```text
src/
  data/
    tasks.ts
  models/
    task.ts
  services/
    task.service.ts
  utils/
    delay.ts
    env.ts
  index.ts
```

## Funcionalidades

- Registrar tareas.
- Consultar todas las tareas.
- Buscar tareas por identificador.
- Marcar tareas como completadas.
- Eliminar tareas.
- Listar tareas pendientes.
- Leer configuracion desde variables de entorno.
- Manejar errores con mensajes comprensibles.
- Simular una operacion asincrona con promesas y `async/await`.

## Evidencias

El proyecto incluye `pnpm-lock.yaml`, `.env.example`, `.gitignore`, `README.md`, `preguntas-cierre.md` y `docs/reflexion.md`. La carpeta `node_modules`, el archivo `.env` y la salida `dist` estan excluidos del repositorio.
