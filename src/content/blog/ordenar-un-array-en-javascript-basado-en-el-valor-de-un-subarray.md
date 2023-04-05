---
title: "Ordenar un array en JavaScript basado en el valor de un subarray"
description: "Cómo ordenar un array en JavaScript basado en el valor de un subarray"
pubDate: "April 05 23"
heroImage: "/blog/images/post33/cover.webp"
badge: "JS"
---

Anteriormente hablamos de [cómo obtener el valor mínimo y máximo de un array de arrays en JavaScript](https://asjordi.dev/blog/obtener-el-valor-minimo-y-maximo-de-un-array-de-arrays-en-javascript/), en este artículo vamos a ver cómo ordenar un array en JavaScript basado en el valor de un subarray.

Para esto utilizaremos el siguiente array de usuarios:

```js
const usuarios = [
  ['Nate', 31],
  ['Carlos', 33],
  ['Jazmin', 2],
  ['Susan', 29]
]
```

Este array de usuarios contiene 4 sub-arrays, cada uno con el nombre y la edad de un usuario.

## Ordenar un array por el valor de un subarray

Para lograr ordenar el array, se utilizará el método `sort()`. En su forma más simple, al llamarlo dentro de un array, intentará ordenar los elementos de acuerdo a su contenido, por ejemplo, si el array contiene `strings`, los ordenará alfabéticamente, si contiene `números`, los ordenará de menor a mayor, etc.

```js
console.log(['b', 'c', 'a'].sort())

// ['a', 'b', 'c']
```

Pero para nuestro objetivo es un poco más complicado ya que se tiene un array de arrays. Utilizar el método `sort()` tomaría el primer elemento del array como su método de clasificación, por lo que se ordenaría por el primer elemento de cada sub-array, en este caso, el **nombre**.

```js
console.log(usuarios.sort())

// [['Carlos', 33], ['Jazmin', 2], ['Nate', 31], ['Susan', 29]]
```

Esto funciona si se desea ordenar el array por el primer elemento de cada sub-array, pero en nuestro caso, queremos ordenar el array por el segundo elemento de cada sub-array, en este caso, la **edad**.

Para esto se utilizan los parámetros de la función de comparación que se le pasa al método `sort()`.

```js
usuarios.sort((a, b) => {
  // TODO
})
```

Esta es la sintaxis de la función de comparación que se le pasa al método `sort()`. Esta función recibe dos parámetros, `a` y `b`, que son los elementos que se están comparando en cada iteración.

```js
usuarios.sort((a, b) => {
  return a[1] - b[1]
})
```

De esta manera se obtendria el siguiente resultado:

```js
console.log(usuarios)

// [['Jazmin', 2], ['Susan', 29], ['Nate', 31], ['Carlos', 33]]
```

A su vez, también se puede cambiar el orden de la comparación, para que ordene de mayor a menor, simplemente cambiando el orden de los parámetros de la función de comparación.

```js
usuarios.sort((a, b) => {
	return b[1] - a[1]
})
```

Similar al ejemplo anterior, esto se traduce en el siguiente resultado:

```js
console.log(usuarios)

// [['Carlos', 33], ['Nate', 31], ['Susan', 29], ['Jazmin', 2]]
```

Incluso, esto se puede hacer en una sola línea:

```js
usuarios.sort((a, b) => a[1] - b[1])

console.log(usuarios)

// [['Jazmin', 2], ['Susan', 29], ['Nate', 31], ['Carlos', 33]]
```

Y de esta manera es posible ordenar un array de acuerdo con el valor de un subarray, de una manera muy sencilla y sin necesidad de escribir código adicional.