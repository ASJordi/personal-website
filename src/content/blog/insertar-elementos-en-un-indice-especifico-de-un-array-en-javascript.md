---
title: "Insertar elementos en un índice específico de un array en JavaScript"
description: "Insertar elementos en un índice específico de un array en JavaScript"
pubDate: "March 29 23"
heroImage: "/blog/images/post31/cover.webp"
tags: ["JS", "Arrays"]
---

En este post vamos a ver como insertar elementos en un índice específico de un array en JavaScript. Para ello vamos a utilizar el método [splice()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).

Consideremos el siguiente array, que hace referencia a un menú de barra lateral:

```js
const sideBarMenu = ['Inicio', 'Sobre', 'Contacto', 'Blog']
```

En caso de que un usuario inicie sesión, el menú debe mostrar la opción de `Perfil` antes de `Sobre`.

## Agregar elementos en un índice específico

Para realizar la tarea descrita, se puede utilizar el método `splice()`, este nos permite insertar elementos en un índice específico de un array e incluso eliminar elementos.

Para agregar un elemento, utilizamos los primeros dos parámetros del método `splice()`, y en el tercero se especifica el elemento que queremos insertar.

```js
if (isLogged) {
  sideBarMenu.splice(2, 0, 'Perfil')
}
```

Ahora, la variable `sideBarMenu` tiene los siguientes elementos:

```js
['Inicio', 'Sobre', 'Perfil', 'Contacto', 'Blog']
```

El método `splice()` recibe 3 parámetros:

- El índice donde queremos insertar el elemento.
- El número de elementos que queremos eliminar.
- El elemento que queremos insertar.

En nuestro ejemplo, la posición del índice es `2`, y no queremos eliminar ningún elemento, por lo que el segundo parámetro es `0`. El tercer parámetro es el elemento que queremos insertar, en este caso `Perfil`.

> **Nota:** El índice de un array comienza en `0`. En el ejemplo anterior, el índice `2` inserta el elemento `Perfil` en la posición `3`.

## Agregar varios elementos en un índice específico

Una característica interesante del método `splice()` es que podemos insertar varios elementos a partir de un índice específico.

```js
if (isLogged) {
  sideBarMenu.splice(2, 0, 'Perfil', 'Cerrar Sesión')
}
```

De esta manera la variable `sideBarMenu` tiene los siguientes elementos:

```js
[ 'Inicio', 'Sobre', 'Perfil', 'Cerrar Sesión', 'Contacto', 'Blog' ]
```

Listo, ahora ya sabes como insertar elementos en un índice específico de un array en JavaScript utilizando el método `splice()`.
