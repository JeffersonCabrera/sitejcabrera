import { copyFile, lstat, mkdir, realpath, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { projectDirectory, publicFiles } from './site-config.mjs';
import { assertSupportedRuntime } from './runtime.mjs';

export async function buildSite() {
  assertSupportedRuntime();
  const root = await realpath(projectDirectory);
  const output = resolve(root, 'dist');
  if (dirname(output) !== root) throw new Error('Directorio de salida inválido.');

  // La salida es una carpeta dedicada; nunca seguir un enlace al limpiarla.
  try {
    const existing = await lstat(output);
    if (existing.isSymbolicLink() || !existing.isDirectory()) {
      throw new Error('La salida debe ser un directorio físico del proyecto.');
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const sources = [];
  for (const relativePath of publicFiles) {
    const source = resolve(root, relativePath);
    const actual = await realpath(source);
    const metadata = await lstat(source);
    if (!metadata.isFile() || metadata.isSymbolicLink() || actual !== source) {
      throw new Error(`El recurso público debe ser un archivo físico: ${relativePath}`);
    }
    sources.push({ source, relativePath });
  }

  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  for (const { source, relativePath } of sources) {
    const destination = join(output, relativePath);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(source, destination);
  }
  return output;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const output = await buildSite();
    process.stdout.write(`Sitio preparado en ${output}\n`);
  } catch (error) {
    process.stderr.write(`No se pudo preparar el sitio: ${error.message}\n`);
    process.exitCode = 1;
  }
}
