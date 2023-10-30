---
title: "Obtener el valor mínimo y máximo de un array de arrays en JavaScript"
description: "Cómo obtener el valor mínimo y máximo de un array de arrays en JavaScript"
pubDate: "March 06 23"
heroImage: "/blog/images/post24/cover.webp"
tags: ["JS"]
---

Cuando se tiene un array de arrays con múltiples elementos, puede ser necesario que se tenga que obtener el valor mínimo o máximo de todos los elementos. En este artículo se mostrará cómo hacerlo utilizando el método `reduce()`.

De manera similar, en el siguiente [artículo](https://asjordi.dev/blog/obtener-el-valor-minimo-y-maximo-de-un-array-de-objetos-en-javascript/) se muestra cómo obtener el valor mínimo y máximo de un array de objetos.

Consideremos el siguiente array de arrays, el cual contiene diversos arrays con el nombre y la edad de los usuarios. A partir de este array, se desea obtener el usuario de mayor y menor edad respectivamente.

```js
const usuarios = [
  ['Nate', 31],
  ['Carlos', 33],
  ['Jazmin', 2],
  ['Susan', 29]
];
```

## Encontrar el valor mayor

Para obtener el usuario de mayor edad del array de arrays, podemos utilizar el método `reduce()`. Este método recibe una función como parámetro, la cual recibe dos parámetros: `previous` y `current`. El primero de ellos es el valor anterior, y el segundo es el valor actual. Para lograr este objetivo es necesario no pasar el valor inicial al método `reduce()`.

```js
const usuarioMayor = usuarios.reduce((previous, current) => {
  return current[1] > previous[1] ? current : previous;
});

console.log(usuarioMayor);
// ["Carlos", 33]
```

Se debe considerar que:

- previous hace referencia al valor acumulado de la iteración anterior.
- current hace referencia al valor actual de la iteración actual.

De esta manera en cada iteración se verifica si el elemento en la posición 1 del elemento actual es mayor al elemento en la posición 1 del elemento anterior. Si es así, se devuelve el elemento actual, de lo contrario se devuelve el elemento anterior.

Por lo tanto, el bucle funciona de la siguiente manera:

- Antes de Nate no hay ningún elemento, por lo que se devuelve el elemento actual.
- Carlos tiene una edad mayor a Nate, por lo que se devuelve el elemento actual.
- Jazmin tiene una edad menor a Carlos, por lo que se devuelve el elemento anterior.
- Susan tiene una edad menor a Carlos, por lo que se devuelve el elemento anterior.

De esta manera, el elemento retornado es el de Carlos, después de haber iterado sobre todos los elementos del array.

## Encontrar el valor menor

Se puede utilizar el mismo enfoque para obtener el usuario de menor edad, solo que en este caso se debe evaluar si la propiedad `edad` del elemento actual es menor a la que se tenía anteriormente. Es decir, solo es necesario cambiar el operador de comparación de mayor a menor.

```js
const usuarioMenor  = usuarios.reduce((previous, current) => {
  return current[1] < previous[1] ? current : previous;
});

console.log(usuarioMenor);
// ["Jazmin", 2]
```

De manera similar al ejemplo anterior, el bucle funciona de la siguiente manera:

- Antes de Nate no hay ningún elemento, por lo que se devuelve el elemento actual.
- Carlos tiene una edad mayor a Nate, por lo que se devuelve el elemento anterior.
- Jazmin tiene una edad menor a Nate, por lo que se devuelve el elemento actual.
- Susan tiene una edad mayor a Jazmin, por lo que se devuelve el elemento anterior.

Por lo que se retorna el array de Jazmin, después de haber iterado sobre todos los arrays del array.

## Abreviando el código

Como se puede observar, el código de ambos ejemplos es muy sencillo y se puede escribir en una sola línea.

```js
const usuarioMayor = usuarios.reduce((prev, cur) => (cur[1] > prev[1] ? cur : prev));

const usuarioMenor = usuarios.reduce((prev, cur) => (cur[1] < prev[1] ? cur : prev));
```

## Utilizar con un array vacío

Si se tiene un array vacio se obtendrá el siguiente error: `TypeError: Reduce of empty array with no initial value`. Esto sucede porque se omite el valor inicial del método `reduce()`.

Podemos configurar esto para que en lugar de devolver un error, devuelva `null`.

```js
const usuarioMayor = usuarios.reduce((previous, current) => {
  return current[1] > previous[1] ? current : previous;
}, null);

console.log(usuarioMayor);
// null
```

De manera abreviada:

```js
const usuarioMayor = usuarios.reduce((prev, cur) => (cur[1] > prev[1] ? cur : prev), null);

console.log(usuarioMayor);
// null
```

En conclusión, el método `reduce()` es una excelente opción para obtener el valor mínimo o máximo tanto de un array de objetos como de un array de arrays.
