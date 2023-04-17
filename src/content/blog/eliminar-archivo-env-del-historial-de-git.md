---
title: "Eliminar archivo .env del historial de Git"
description: "Cómo eliminar un archivo .env del historial de Git"
pubDate: "April 17 23"
heroImage: "/blog/images/post34/cover.webp"
badge: "Git"
---

Cuando trabajamos con Git, es muy común que se tengan archivos que no queremos incluir en el repositorio, como por ejemplo, archivos de configuración de entornos, como el archivo `.env`. En caso de que ya se hayan añadido al repositorio, e incluso subido a un repositorio remoto, es posible que queramos eliminarlos completamente del historial de Git.

En este post, vamos a ver cómo eliminar un archivo .env del historial de Git, y este proceso es válido para cualquier otro archivo que no queramos que Git tenga en cuenta.

- [Eliminar un archivo .env del historial de Git](#eliminar-un-archivo-env-del-historial-de-git)
	- [Añadir el archivo al archivo .gitignore](#añadir-el-archivo-al-archivo-gitignore)
	- [Eliminar un archivo solo de Git](#eliminar-un-archivo-solo-de-git)
	- [Eliminar completamente un archivo del historial de Git](#eliminar-completamente-un-archivo-del-historial-de-git)

# Eliminar un archivo .env del historial de Git

En el siguiente ejemplo, accidentalmente añadimos el archivo `.env` a nuestro repositorio, y lo subimos a un repositorio remoto.

![Subir archivo .env](/blog/images/post34/1.webp)

> **Nota:** En caso de que este escenario suceda, es importante actualizar las keys de acceso a los servicios que tengamos configurados en el archivo `.env`.

## Añadir el archivo al archivo .gitignore

El primer paso es añadir el archivo `.env` al archivo `.gitignore`, para que Git no lo tenga en cuenta en el futuro.

En mi caso lo añado al final del archivo `.gitignore`:

```bash
# .gitignore

# ...

.env
```

A continuación, se realiza un commit con la modificación realizada en el archivo `.gitignore`.

![Commit con la modificación del archivo .gitignore](/blog/images/post34/2.webp)

Como podemos ver, el archivo `.env` aún sigue apareciendo en el historial de Git, incluso después de haberlo añadido al archivo `.gitignore`. Por lo tanto, se puede ver que el archivo `.gitignore` no deshace los cambios que ya se han realizado en el repositorio. Entonces ¿Cómo podemos eliminar el archivo `.env` del historial de Git?

## Eliminar un archivo solo de Git

Para eliminar un archivo solo de Git, podemos utilizar el comando `git rm -r --cached <file>`. En este caso el archivo que queremos eliminar es el archivo `.env`:

```bash
git rm -r --cached .env
```

Si realizamos un commit con este cambio, el archivo `.env` ya no aparecerá en Github.

![Commit con la eliminación del archivo .env](/blog/images/post34/3.webp)

Sin embargo, esto no resuelve completamente el problema. Si revisamos el historial de Git, podemos ver que el archivo `.env` sigue apareciendo con todo su contenido.

![Historial de Git](/blog/images/post34/4.webp)

## Eliminar completamente un archivo del historial de Git

Para eliminar por completo el archivo `.env` del historial de Git, podemos utilizar siguiente comando:

```bash
git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch .env" HEAD
```

> **Nota:** Este comando puede tardar un poco en ejecutarse, dependiendo del tamaño del repositorio y generar algunas advertencias, ya que se está modificando el historial de Git.

Para realizar un `push` de los cambios realizados, es necesario utilizar el comando `git push --force`, en este caso al branch `main`:

```bash
git push --force origin main
```

Si revisamos el historial nuevamente, podemos ver los commits que incluyen el archivo `.env`, pero no podemos ver el contenido del archivo, por lo que el archivo `.env` ya no aparece en el historial de Git.

![Historial de Git](/blog/images/post34/5.webp)

Listo! Ya hemos eliminado el archivo `.env` del historial de Git, y ahora podemos seguir trabajando con Git sin tener que preocuparnos por este archivo.

Este proceso puede ser aplicado a cualquier otro archivo que no queramos que Git tenga en cuenta.