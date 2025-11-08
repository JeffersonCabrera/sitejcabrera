{
# Sitio Personal — Jefferson Cabrera

Descripción breve
- Sitio web estático que presenta el perfil profesional, proyectos y contacto de Jefferson Christopher Cabrera Villacorta.
- Página principal: [index.html](index.html)

Estado
- Página lista para despliegue estático (GitHub Pages). Configuración de CI/CD: [.github/workflows/static.yml](.github/workflows/static.yml)
- Dominio configurado: [CNAME](CNAME)

Estructura del proyecto
- [index.html](index.html) — Documento HTML principal.
- [styles.css](styles.css) — Estilos principales y variables CSS.
- [script.js](script.js) — Lógica de interacción y animaciones.
  - Funciones y manejadores relevantes: [`typeWriter`](script.js), [`createParticles`](script.js), [`scrollActive`](script.js), [`scrollHeader`](script.js), [`scrollUp`](script.js), manejador del formulario (`contactForm` en `script.js`).
- [package.json](package.json) — Scripts y dependencias para desarrollo local; comandos disponibles: `start`, `dev` (ver [package.json](package.json)).
- [images/](images/) — Activos de imagen utilizados en la web.
- [.github/workflows/static.yml](.github/workflows/static.yml) — Workflow para despliegue a GitHub Pages.
- [.vscode/settings.json](.vscode/settings.json) — Ajustes de previsualización local.
- [CNAME](CNAME) — Dominio personalizado para GitHub Pages.

Cómo ejecutar localmente
1. Instalar dependencias de desarrollo:
   ```sh
   npm install
```
