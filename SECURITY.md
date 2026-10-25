# Seguridad

## Alcance

Sitio estático de presentación profesional. No incluye cuentas, sesiones, formularios de captura, pagos, base de datos o API. La información publicada es accesible al público.

Para comunicar un problema, escribir a **jeffersoncabreradev@gmail.com** con una descripción reproducible y el recurso afectado. Evitar publicar credenciales o información sensible en incidencias públicas.

## Controles del sitio

- Política CSP en los documentos HTML: fuentes de recursos restringidas, scripts y estilos inline bloqueados, conexiones de datos y formularios deshabilitados.
- Sin bibliotecas de ejecución, scripts de análisis ni contenido incrustado de terceros. Las fuentes y los iconos se alojan localmente, con sus licencias; no se consultan proveedores externos al cargar la página.
- Política `no-referrer` y enlaces externos con `noopener noreferrer`.
- Sin evaluación dinámica de código, inserción de HTML a partir de entradas externas o almacenamiento de información personal en el navegador.
- Lista cerrada de archivos para publicación. El artefacto excluye fuentes de herramientas, documentación de desarrollo, configuraciones y metadatos del repositorio.
- GitHub Actions con revisiones fijadas, credenciales de checkout no persistentes y permisos separados entre preparación y despliegue.
- Sin dependencias npm de ejecución o desarrollo. Las acciones se actualizan mediante Dependabot.

## Servidor local

La vista local sirve únicamente los archivos públicos preparados, en `127.0.0.1`. Rechaza hosts ajenos a localhost, rutas no autorizadas y métodos distintos de GET/HEAD; no lista directorios. Establece límites de cabeceras y tiempos de conexión.

Este servidor agrega CSP como cabecera y las cabeceras `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, `Cross-Origin-Opener-Policy` y `Cross-Origin-Resource-Policy`. No es un servidor de producción.

## Límites del alojamiento

La CSP incluida en `<meta>` no sustituye todas las posibilidades de una cabecera HTTP. En particular, `frame-ancestors` no funciona en una política declarada mediante `<meta>`; por eso no se declara allí como una protección efectiva.

GitHub Pages administra TLS y las cabeceras HTTP de su servicio. Un archivo `_headers` o `.htaccess` dentro de este proyecto no configura esas cabeceras en Pages. El servidor local no modifica la configuración del alojamiento remoto.

Antes de publicar, verificar en GitHub el dominio, el certificado, **Enforce HTTPS**, la protección de rama y los permisos del entorno. Si se requieren políticas HTTP adicionales como `frame-ancestors`, HSTS o restricciones de permisos específicas, configurarlas en una capa de alojamiento que permita controlar cabeceras y revisar el resultado servido por esa capa.

Los controles descritos reducen la superficie del sitio; no constituyen una certificación de cumplimiento normativo o ausencia de vulnerabilidades. La configuración remota y las cabeceras efectivas se revisan después del despliegue.

## Mantenimiento

1. Usar versiones LTS de Node.js con parches vigentes.
2. Revisar las solicitudes de actualización de GitHub Actions, incluidas las revisiones fijadas.
3. Añadir solo los recursos públicos necesarios a `scripts/site-config.mjs`.
4. Mantener la CSP alineada con los recursos utilizados. No añadir `unsafe-inline` o `unsafe-eval` para resolver errores de integración.
5. Conservar secretos y archivos de trabajo fuera de los recursos publicados.

## Documentación

Revisión de referencias: 25 de octubre de 2026.

- [GitHub: publicación de artefactos Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub: seguridad de Actions](https://docs.github.com/en/actions/reference/security/secure-use)
- [GitHub: HTTPS en Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [MDN: CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [MDN: frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
- [OWASP: HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
