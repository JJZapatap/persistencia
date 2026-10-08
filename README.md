# Agenda personal MVC con localStorage

Aplicación académica CRUD desarrollada con HTML, CSS y JavaScript. Permite registrar, buscar, listar, actualizar y eliminar contactos. El código está organizado con el patrón Modelo Vista Controlador y utiliza `localStorage` para conservar la información en el navegador.

## Uso inmediato

Esta versión no necesita:

- Supabase ni otra base de datos.
- Claves API.
- Cuenta de usuario.
- PHP, MySQL o XAMPP.
- Node.js, npm o compilación.

Para ejecutarla mediante un servidor local:

```bash
python -m http.server 5500
```

Después abra:

```text
http://localhost:5500
```

También puede utilizar Live Server en Visual Studio Code o publicarla directamente en GitHub Pages.

## Publicar en GitHub Pages

1. Cree un repositorio, por ejemplo `agenda-mvc-localstorage`.
2. Suba el contenido completo de esta carpeta a la raíz del repositorio.
3. Confirme que `index.html` se encuentre en la raíz.
4. Abra **Settings > Pages**.
5. En **Build and deployment** seleccione **Deploy from a branch**.
6. Seleccione la rama `main` y la carpeta `/ (root)`.
7. Pulse **Save** y espere la dirección pública.

No es necesario modificar ningún archivo antes de publicarla.

## Estructura del proyecto

```text
agenda_mvc_localstorage/
|-- index.html
|-- css/
|   `-- styles.css
|-- js/
|   |-- app.js
|   |-- models/
|   |   `-- contacto.model.js
|   |-- views/
|   |   `-- contacto.view.js
|   `-- controllers/
|       `-- contacto.controller.js
|-- README.md
|-- PUBLICACION_GITHUB.md
|-- .gitignore
`-- .nojekyll
```

## Responsabilidades MVC

- **Modelo:** lee, valida y escribe contactos en `localStorage`.
- **Vista:** administra formulario, tabla, búsqueda, mensajes y DOM.
- **Controlador:** recibe eventos y coordina las operaciones CRUD.
- **app.js:** crea las instancias y pone en marcha la aplicación.

La Vista no accede directamente a `localStorage`. Todas las operaciones de persistencia están encapsuladas en `ContactoModel`.

## Operaciones disponibles

- Insertar un contacto.
- Listar los contactos guardados.
- Buscar por nombres, apellidos, documento, correo, teléfono o ciudad.
- Actualizar un contacto existente.
- Eliminar con confirmación.
- Evitar documentos o correos duplicados.
- Rechazar fechas de nacimiento futuras.
- Ordenar por apellidos y nombres.

## Clave de almacenamiento

Los contactos se guardan en:

```text
agenda_mvc_contactos_v1
```

El Modelo almacena un arreglo JSON con los contactos y sus fechas de creación y actualización.

## Alcance y limitaciones

`localStorage` pertenece al origen web y al perfil del navegador. Por esta razón:

- Los contactos no se sincronizan entre equipos o navegadores.
- GitHub no recibe ni almacena los contactos registrados.
- Si el usuario borra los datos del sitio, los contactos se eliminan.
- No existe autenticación ni aislamiento real entre usuarios.
- No debe utilizarse para información sensible o de producción.

Esta versión es apropiada para explicar CRUD, persistencia local, JSON, eventos y patrón MVC. La versión con Supabase es más adecuada cuando se requieren autenticación, almacenamiento remoto y acceso desde varios dispositivos.

## Pruebas sugeridas

1. Registrar tres contactos y recargar la página.
2. Confirmar que los registros permanecen.
3. Buscar por apellido, correo y ciudad.
4. Actualizar un teléfono y volver a recargar.
5. Cancelar una eliminación y confirmar que el registro permanece.
6. Confirmar una eliminación y verificar que no vuelve a aparecer.
7. Intentar repetir un documento o correo.
8. Abrir la aplicación en otro navegador y comparar los resultados.

## Referencias

- https://developer.mozilla.org/docs/Web/API/Window/localStorage
- https://developer.mozilla.org/docs/Web/API/Storage
- https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
