import {
  completeTask,
  createTask,
  deleteTask,
  findTaskById,
  findTaskByIdAsync,
  listPendingTasks,
  listTasks
} from './services/task.service.js';
import { delay } from './utils/delay.js';
import { getAppName, getNodeEnv } from './utils/env.js';

const showTasks = (title: string, tasksToShow = listTasks()): void => {
  console.log(`\n${title}`);

  const rows = tasksToShow.map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status,
    createdAt: task.createdAt.toLocaleString()
  }));

  console.table(rows);
};

const showControlledError = (error: unknown): void => {
  const message = error instanceof Error
    ? error.message
    : 'Ocurrio un error desconocido.';

  console.error(`Error controlado: ${message}`);
};

const main = async (): Promise<void> => {
  console.log(`\n${getAppName()}`);
  console.log(`Entorno de ejecucion: ${getNodeEnv()}`);
  console.log('Iniciando aplicacion...');
  await delay(300);

  showTasks('Tareas iniciales');

  const newTask = createTask('  Construir mi primer servicio  ');
  console.log(`Tarea creada con id ${newTask.id}: ${newTask.title}.`);

  const foundTask = findTaskById(newTask.id);
  console.log(foundTask
    ? `Busqueda por id ${newTask.id}: ${foundTask.title}.`
    : `No se encontro la tarea ${newTask.id}.`);

  completeTask(newTask.id);
  console.log(`Tarea ${newTask.id} completada.`);

  const pendingTask = createTask('Preparar evidencia de la actividad');
  console.log(`Tarea pendiente creada con id ${pendingTask.id}.`);

  showTasks('Tareas pendientes', listPendingTasks());

  const deletedTask = deleteTask(2);
  console.log(`Tarea eliminada correctamente: ${deletedTask.title}.`);

  showTasks('Estado final');

  try {
    createTask('   ');
  } catch (error: unknown) {
    showControlledError(error);
  }

  try {
    const missingTask = findTaskById(999);

    if (!missingTask) {
      throw new Error('No existe una tarea con el id 999.');
    }
  } catch (error: unknown) {
    showControlledError(error);
  }

  try {
    completeTask(999);
  } catch (error: unknown) {
    showControlledError(error);
  }

  try {
    deleteTask(999);
  } catch (error: unknown) {
    showControlledError(error);
  }

  try {
    await findTaskByIdAsync(999);
  } catch (error: unknown) {
    showControlledError(error);
  }
};

main().catch((error: unknown) => {
  console.error('Error no controlado:', error);
  process.exitCode = 1;
});
