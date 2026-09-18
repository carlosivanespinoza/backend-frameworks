import { mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const [, , entryArg, watchFlag] = process.argv;

if (!entryArg) {
  console.error('Uso: node scripts/run-typescript.mjs src/index.ts [--watch]');
  process.exit(1);
}

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tempDir = resolve(rootDir, '.tmp-start');
const configPath = ts.findConfigFile(rootDir, ts.sys.fileExists, 'tsconfig.json');

if (!configPath) {
  console.error('No se encontro tsconfig.json.');
  process.exit(1);
}

const loadConfig = () => {
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);

  if (configFile.error) {
    throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
  }

  return ts.parseJsonConfigFileContent(configFile.config, ts.sys, rootDir, {
    noEmit: false,
    outDir: tempDir
  });
};

const reportDiagnostics = (diagnostics) => {
  if (diagnostics.length === 0) {
    return;
  }

  const host = ts.createCompilerHost({});
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, host));
};

const compile = async () => {
  await rm(tempDir, { recursive: true, force: true });
  await mkdir(tempDir, { recursive: true });

  const parsedConfig = loadConfig();
  const program = ts.createProgram(parsedConfig.fileNames, parsedConfig.options);
  const emitResult = program.emit();
  const diagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  reportDiagnostics(diagnostics);

  if (diagnostics.length > 0 || emitResult.emitSkipped) {
    process.exitCode = 1;
    return undefined;
  }

  const relativeEntry = entryArg.replace(/^src[\\/]/, '').replace(/\.ts$/, '.js');
  return resolve(tempDir, relativeEntry);
};

const runOnce = async () => {
  const compiledEntry = await compile();

  if (!compiledEntry) {
    return;
  }

  await import(`${pathToFileURL(compiledEntry).href}?t=${Date.now()}`);
};

if (watchFlag === '--watch') {
  await runOnce();
  console.log('\nModo watch activo. Presiona Ctrl+C para salir.');
  ts.sys.watchDirectory(resolve(rootDir, 'src'), async () => {
    console.clear();
    await runOnce();
  }, true);
} else {
  await runOnce();
}
