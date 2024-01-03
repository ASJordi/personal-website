---
title: "¿Cómo comparar el contenido de dos repositorios usando Git?"
description: "Entendiendo el comando git diff"
pubDate: "Feb 13 2023"
heroImage: "../../assets/blog/images/post18/cover.webp"
tags: ["Git", "GitHub"]
---

Cuando estamos trabajando con Git, a veces nos encontramos con la necesidad de comparar el contenido de dos repositorios. Por ejemplo, para comparar el contenido de dos ramas, dos commits o dos archivos.

En este post vamos a ver como comparar el contenido de dos repositorios usando Git. Para ello vamos a utilizar el comando `git diff`.

## ¿Qué es git diff?

`git diff` es un comando que nos permite comparar el contenido de dos repositorios. Por lo tanto, permite comparar el contenido de dos ramas, dos commits o dos archivos, o su combinación.

## Comparar dos repositorios

Para este ejemplo se tiene un repositorio `a` con una rama `main` de manera local, se desea comparar con un repositorio `b` con una rama `main` de manera remota.

1. Para comparar los dos repositorios, debemos agregar el repositorio remoto `b` al repositorio local `a`:

```bash
git remote add -f b <url-repositorio-b>
```

> Nota: El comando `git remote add` nos permite agregar un repositorio remoto, el parámetro `-f` nos permite forzar la actualización del repositorio remoto, y "b" es el alias para el repositorio remoto.

2. A continuación, es recomendable actualizar la información de los repositorios remotos localmente:

```bash
git remote update
```

3. Finalmente, podemos comparar las diferencias entre las dos ramas `main` de los dos repositorios:

```bash
git diff main remotes/b/main
```

> Nota: Utilizamos el comando `git diff` para comparar las ramas `main` de los dos repositorios, y el parámetro `remotes/b/main` para indicar que queremos comparar la rama `main` del repositorio remoto `b`. El primer parámetro `main` indica que queremos comparar la rama `main` del repositorio local `a`.

4. Para comparar un archivo en específico, podemos utilizar el comando `git diff` de la siguiente manera:

```bash
git diff main remotes/b/main <archivo>

# Por ejemplo, si queremos comparar el archivo README.md
# git diff main remotes/b/main README.md
```

En general estos son los pasos necesarios para comparar el contenido de dos repositorios, considerando que uno de ellos se encuentra de manera local y el otro de manera remota.

A continuación se muestran algunos ejemplos de como utilizar el comando `git diff`.

### Comparar dos ramas

```bash
git diff <rama1> <rama2>
```

Por ejemplo, si queremos comparar la rama `master` con la rama `develop` podemos ejecutar el siguiente comando:

```bash
git diff master develop
```

### Comparar dos commits

```bash
git diff <commit1> <commit2>
```

Por ejemplo, si queremos comparar el commit `a1b2c3` con el commit `d4e5f6` podemos ejecutar el siguiente comando:

```bash
git diff a1b2c3 d4e5f6
```

### Comparar dos archivos

```bash
git diff <archivo1> <archivo2>
```

Por ejemplo, si queremos comparar el archivo `main.js` con el archivo `utils.js` podemos ejecutar el siguiente comando:

```bash
git diff main.js utils.js
```

### Comparar dos commits de dos ramas

```bash
git diff <rama1>:<commit1> <rama2>:<commit2>
```

Por ejemplo, si queremos comparar el commit `a1b2c3` de la rama `master` con el commit `d4e5f6` de la rama `develop` podemos ejecutar el siguiente comando:

```bash
git diff master:a1b2c3 develop:d4e5f6
```

### Comparar dos commits de dos archivos

```bash
git diff <commit1>:<archivo1> <commit2>:<archivo2>
```

Por ejemplo, si queremos comparar el commit `a1b2c3` del archivo `index.html` con el commit `d4e5f6` del archivo `style.css` podemos ejecutar el siguiente comando:

```bash
git diff a1b2c3:index.html d4e5f6:style.css
```

### Comparar dos commits de dos ramas de dos archivos

```bash
git diff <rama1>:<commit1>:<archivo1> <rama2>:<commit2>:<archivo2>
```

Por ejemplo, si queremos comparar el commit `a1b2c3` del archivo `index.html` de la rama `master` con el commit `d4e5f6` del archivo `style.css` de la rama `develop` podemos ejecutar el siguiente comando:

```bash
git diff master:a1b2c3:index.html develop:d4e5f6:style.css
```
