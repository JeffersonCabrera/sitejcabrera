# Jefferson Cabrera

Sitio profesional sobre arquitectura de software, integración de sistemas y liderazgo técnico. Incluye trayectoria, alcance de trabajo, formación, participación en la comunidad Java y enlaces de JefferBuild.

**Dominio:** [jeffersoncabrera.com](https://jeffersoncabrera.com/).

## Arquitectura

- HTML semántico, CSS organizado por capas y JavaScript sin dependencias de ejecución.
- Navegación por anclas, menú adaptable y enlaces de contacto directos.
- Aparición progresiva del contenido con una duración de **2 segundos**.
- Con movimiento reducido, la aparición conserva la opacidad y elimina el desplazamiento.
- Si JavaScript no está disponible, el contenido y los enlaces de navegación permanecen accesibles.
- Manrope para títulos y Source Sans 3 para lectura, alojadas en el propio sitio.
- Iconos SVG de Lucide integrados en el documento, con etiquetas de texto y sin biblioteca de ejecución.
- Recursos locales; no se hacen solicitudes a servicios externos de fuentes, reproductores o scripts.

## Requisitos

Node.js **24 LTS** recomendado. También se admite Node.js 22 LTS. Utilizar una versión mantenida y su parche de seguridad más reciente.

El proyecto no necesita instalar paquetes de terceros para compilar o mostrar el sitio.

## Vista local

```sh
git clone https://github.com/JeffersonCabrera/sitejcabrera.git
cd sitejcabrera
npm start
```

Abrir `http://127.0.0.1:3000/`. Para elegir otro puerto:

```sh
npm start -- --port 3018
```

El servidor prepara `dist/` y escucha exclusivamente en la interfaz local. Solo atiende rutas públicas autorizadas mediante GET o HEAD. Detener con Ctrl+C y volver a iniciar después de modificar los archivos.

## Preparar la publicación

```sh
npm run build
```

`scripts/site-config.mjs` contiene la lista explícita de archivos públicos. La compilación copia únicamente esos archivos a `dist/`, rechaza enlaces simbólicos y no incorpora documentación, configuración local o archivos del repositorio.

No editar `dist/` directamente: es una salida regenerable.

## Estructura

```text
index.html              Contenido y metadatos
styles.css              Diseño, adaptación y movimiento
script.js               Navegación y aparición progresiva
images/                 Fotografía e identidad visual
fonts/                  Tipografías locales
licenses/               Licencias y atribuciones de recursos visuales
404.html                Página de recurso inexistente
robots.txt              Directivas de rastreo
sitemap.xml             URL canónica
CNAME                   Dominio de GitHub Pages
scripts/
  site-config.mjs       Lista de publicación
  build.mjs             Preparación de dist/
  serve.mjs             Vista local restringida
.github/workflows/      Publicación con GitHub Actions
SECURITY.md             Controles y alcance de seguridad
```

## Mantenimiento

- Editar el contenido profesional en `index.html`, manteniendo la correspondencia con las responsabilidades y fechas verificadas.
- Mantener un solo `h1`, encabezados ordenados, alternativas de imagen y etiquetas de navegación.
- Conservar foco de teclado visible y enlaces externos con `rel="noopener noreferrer"`.
- Centralizar colores, espaciados y duración de aparición en las variables de `styles.css`.
- Evitar estilos y manejadores de eventos inline; mantener el comportamiento en `script.js`.
- Para añadir un recurso público, incorporarlo también a `publicFiles`.
- La fotografía y los activos de identidad se administran en `images/`.

## GitHub Pages

El workflow prepara el sitio en las solicitudes de cambio. Solo despliega desde `main`, mediante un envío o ejecución manual. Publica **dist/**, no la raíz del repositorio.

Las acciones están fijadas a revisiones verificadas y los permisos de escritura de Pages/OIDC se limitan al trabajo de despliegue. Dependabot mantiene las referencias de acciones mediante solicitudes de actualización.

En el repositorio remoto, configurar:

1. **Settings → Pages → Source: GitHub Actions**.
2. El dominio personalizado y sus registros DNS correspondientes.
3. **Enforce HTTPS**, cuando el certificado esté disponible.
4. Protección de la rama principal y del entorno `github-pages` según las personas que mantengan el sitio.

Modificar estos archivos localmente no publica el sitio. El despliegue ocurre cuando se envían los cambios a `main` o se ejecuta el workflow remoto.

## Seguridad y privacidad

La política de contenido restringe la carga de recursos al propio sitio y bloquea scripts inline, formularios, conexiones de datos, objetos y marcos. El sitio no implementa autenticación, pagos, formularios de captura ni almacenamiento de datos personales.

Los enlaces externos abren plataformas independientes con sus propias políticas. GitHub Pages puede registrar información técnica de las visitas como parte de su servicio.

Consultar [SECURITY.md](SECURITY.md) para distinguir los controles del documento, los del servidor local y los que dependen del alojamiento.

## Referencias técnicas

- [GitHub Pages: workflows de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Actions: uso seguro](https://docs.github.com/en/actions/reference/security/secure-use)
- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [OWASP: seguridad HTML5](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
- [Node.js: versiones mantenidas](https://nodejs.org/en/about/previous-releases)

## Licencia

Este repositorio no incluye una licencia de redistribución. La fotografía, identidad visual y contenido profesional pertenecen a sus respectivos titulares.

Las tipografías Manrope y Source Sans 3 se distribuyen bajo SIL Open Font License 1.1. Los iconos Lucide conservan sus avisos ISC y los avisos MIT correspondientes a figuras derivadas de Feather. Las licencias de estos recursos se incluyen en `licenses/` y en la salida pública; no conceden derechos sobre otros archivos del proyecto.

Procedencia: [Manrope en Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope), [Source Sans de Adobe](https://github.com/adobe-fonts/source-sans) y [Lucide](https://lucide.dev/). Los archivos de fuente se conservan sin modificar; el subconjunto de iconos se integra como símbolos SVG.
