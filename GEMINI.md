# GEMINI.md

## Resumen del Proyecto

Este proyecto es un sitio web estático de portafolio personal para Jefferson Cabrera, un Líder Técnico Backend Java. Muestra su perfil profesional, proyectos e información de contacto.

El sitio está construido con HTML, CSS y JavaScript puros. Está diseñado como una aplicación de una sola página (single-page application) con desplazamiento suave entre las secciones.

**Tecnologías Clave:**
-   **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
-   **Librerías:**
    -   [Swiper.js](https://swiperjs.com/) para carruseles táctiles.
    -   [Font Awesome](https://fontawesome.com/) para íconos.
    -   [Google Fonts](https://fonts.google.com/) para la tipografía.
-   **Despliegue:** El sitio está configurado para un despliegue estático en GitHub Pages. Un flujo de trabajo de GitHub Actions (`.github/workflows/static.yml`) automatiza el proceso de despliegue en cada `push` a la rama `main`.
-   **Desarrollo:** Se utiliza [Node.js](https://nodejs.org/) con `http-server` para el desarrollo local.

## Ejecución y Desarrollo Local

Para ejecutar este proyecto localmente, necesitas tener Node.js y npm instalados.

1.  **Instalar Dependencias:**
    Abre tu terminal en la raíz del proyecto y ejecuta el siguiente comando para instalar las dependencias de desarrollo (en este caso, `http-server`):
    ```sh
    npm install
    ```

2.  **Ejecutar el Servidor de Desarrollo:**
    Una vez completada la instalación, puedes iniciar el servidor de desarrollo local con:
    ```sh
    npm start
    ```
    Esto iniciará un servidor, normalmente en `http://localhost:3000`, y abrirá automáticamente el sitio en tu navegador web predeterminado.

## Convenciones de Desarrollo

-   **Estructura:** El proyecto sigue una estructura estándar para un proyecto web simple:
    -   `index.html`: El archivo HTML principal.
    -   `styles.css`: La hoja de estilos principal.
    -   `script.js`: El archivo JavaScript principal.
    -   `images/`: Contiene todos los recursos de imagen.
-   **Estilos:** El proyecto utiliza variables de CSS para mantener un tema consistente (colores, fuentes, etc.). Los estilos son responsivos y se adaptan a diferentes tamaños de pantalla.
-   **JavaScript:** El archivo `script.js` está bien organizado, con el código separado en secciones lógicas para funcionalidades como el menú móvil, el comportamiento del scroll y las animaciones.
-   **CI/CD:** Todos los cambios enviados a la rama `main` activarán el flujo de trabajo de GitHub Actions para desplegar la última versión en GitHub Pages.