# Portafolio Personal de Jefferson Cabrera

 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Un portafolio web estático, moderno y responsivo para mostrar mi perfil profesional, proyectos y experiencia como Líder Técnico Backend Java.

**[Ver Demo en Vivo](https://jeffersoncabrera.com)**

--- 

## ✨ Características (Features)

-   **Diseño Moderno y Responsivo:** Adaptable a cualquier dispositivo, desde móviles hasta escritorios.
-   **Single Page Application (SPA):** Navegación fluida en una sola página.
-   **Animaciones y Transiciones:** Efectos sutiles para una experiencia de usuario dinámica.
-   **Secciones Clave:**
    -   **Inicio:** Presentación principal.
    -   **Perfil:** Resumen sobre mí y mis habilidades.
    -   **Proyectos:** Muestra de trabajos y casos de estudio.
    -   **Experiencia:** Línea de tiempo de mi carrera profesional.
    -   **Contacto:** Enlaces directos para contactarme.
-   **Despliegue Automatizado:** Integración continua con GitHub Actions para despliegues automáticos.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto fue construido utilizando tecnologías web estándar y algunas librerías para mejorar la funcionalidad y la experiencia de usuario.

-   **Frontend:**
    -   HTML5
    -   CSS3 (con variables CSS para theming)
    -   JavaScript (ES6+)
-   **Librerías:**
    -   [Swiper.js](https://swiperjs.com/): Para carruseles interactivos y táctiles.
    -   [Font Awesome](https://fontawesome.com/): Para la iconografía.
-   **Desarrollo y Despliegue:**
    -   [Node.js](https://nodejs.org/): Para el entorno de desarrollo local.
    -   [http-server](https://www.npmjs.com/package/http-server): Servidor web ligero para desarrollo.
    -   [GitHub Pages](https://pages.github.com/): Para el hosting estático.
    -   [GitHub Actions](https://github.com/features/actions): Para la integración y despliegue continuo (CI/CD).

---

## 🚀 Cómo Empezar (Getting Started)

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

-   [Node.js](https://nodejs.org/en/download/) (versión 18.x o superior recomendada)
-   [npm](https://www.npmjs.com/get-npm) (generalmente viene con Node.js)

### Instalación y Ejecución

1.  **Clona el repositorio:**
    ```sh
    git clone https://github.com/sitejcabrera/sitejcabrera.git
    cd sitejcabrera
    ```

2.  **Instala las dependencias de desarrollo:**
    Este comando instalará `http-server`.
    ```sh
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```sh
    npm start
    ```
    El sitio se abrirá automáticamente en tu navegador en `http://localhost:3000`.

---

## 📦 Despliegue (Deployment)

El despliegue de este sitio está completamente automatizado usando **GitHub Actions**.

-   **Activador:** Cada vez que se realiza un `push` a la rama `main`.
-   **Proceso:** El workflow definido en `.github/workflows/static.yml` se activa, empaqueta el contenido del repositorio y lo despliega en **GitHub Pages**.
-   **Dominio:** El sitio se sirve bajo el dominio personalizado `jeffersoncabrera.com`, configurado en el archivo `CNAME`.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.