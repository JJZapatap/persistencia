# Publicación rápida en GitHub Pages

## No requiere configuración

La aplicación funciona sin Supabase, claves API o base de datos. No modifique rutas ni nombres de carpetas.

## Pasos

1. Cree un repositorio nuevo en GitHub.
2. Use un nombre como `agenda-mvc-localstorage`.
3. Suba todos los archivos de esta carpeta a la raíz del repositorio.
4. Compruebe que `index.html` esté en la raíz.
5. Abra **Settings > Pages**.
6. En **Source** seleccione **Deploy from a branch**.
7. Seleccione `main` y `/ (root)`.
8. Pulse **Save**.
9. Espere la dirección pública y abra la aplicación.

## Verificación funcional

- [ ] La portada y el formulario cargan correctamente.
- [ ] Se puede registrar un contacto.
- [ ] El contacto permanece después de recargar.
- [ ] La búsqueda filtra los resultados.
- [ ] Editar conserva los cambios.
- [ ] Eliminar solicita confirmación.
- [ ] No se permiten documentos o correos duplicados.
- [ ] Una fecha futura es rechazada.

## Recordatorio

Los contactos se guardan únicamente en el navegador del visitante. Publicar el código en GitHub Pages no publica ni comparte los datos registrados.
