const minimumVersions = new Map([
  [22, [23, 4]],
  [24, [22, 1]],
]);

export function assertSupportedRuntime() {
  const [major, minor, patch] = process.versions.node.split('.').map(Number);
  const minimum = minimumVersions.get(major);
  if (minimum && (minor > minimum[0] || (minor === minimum[0] && patch >= minimum[1]))) return;

  throw new Error(
    `Se requiere Node.js 22.23.4+ (22 LTS) o 24.22.1+ (24 LTS). Versión actual: ${process.versions.node}.`,
  );
}
