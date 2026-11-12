# Biblioteca Municipal

Página web de una biblioteca hecha con HTML, CSS y JavaScript puro (sin dependencias).

## Funciones
- Catálogo de libros con búsqueda por título o autor (ignora tildes).
- Filtro por género y por disponibilidad.
- Reservar y cancelar reservas (se guardan en el navegador con `localStorage`).
- Diseño responsive.

## Estructura
```
biblioteca/
├── index.html
├── css/styles.css
├── js/
│   ├── books.js   # datos del catálogo
│   └── app.js     # lógica
└── README.md
```

## Uso
Abre `index.html` en el navegador. No requiere instalación.

## Publicar en GitHub Pages
1. Sube el repositorio a GitHub.
2. Ve a **Settings → Pages**.
3. En *Source* elige la rama `main` y la carpeta `/ (root)`.
4. Guarda y espera a que aparezca el enlace.

## Personalizar
Edita `js/books.js` para agregar libros y `css/styles.css` (variables en `:root`) para cambiar los colores.
