---
title: "Obtener el valor mínimo y máximo de un array de objetos en JavaScript"
description: "Cómo obtener el valor mínimo y máximo de un array de objetos en JavaScript"
pubDate: "March 01 23"
heroImage: "/blog/images/post23/cover.webp"
tags: ["JS"]
---

Cuando se tiene un array de objetos con múltiples propiedades, es posible que necesitemos obtener el valor mínimo o máximo de uno de ellos a partir de una propiedad, y de esta forma devolver el objeto completo.

Consideremos el siguiente array de objetos:

```js
const usuarios = [
  { nombre: "Nate", edad: 31 },
  { nombre: "Carlos", edad: 33 },
  { nombre: "Jazmin", edad: 2 },
  { nombre: "Susan", edad: 29 },
];
```

## Encontrar el valor mayor

Para obtener el usuario de mayor edad del array de objetos, podemos utilizar el método `reduce()`. Este método recibe una función como parámetro, la cual recibe dos parámetros: `previous` y `current`. El primero de ellos es el valor anterior, y el segundo es el valor actual.

```js
const usuarioMayor = usuarios.reduce((previous, current) => {
  return current.edad > previous.edad ? current : previous;
});

console.log(usuarioMayor);
// { nombre: "Carlos", edad: 33 }
```

Este método realiza un bucle que itera sobre cada uno de los objetos del array. Por cada objeto se evalua si la propiedad `edad` del elemento actual es mayor a la que se tenía anteriormente. Si este es el caso, se devuelve el elemento actual, de lo contrario se devuelve el elemento anterior.

Por lo que el bucle funciona de la siguiente manera:

- Antes de Nate no hay ningún elemento, por lo que se devuelve el elemento actual.
- Carlos tiene una edad mayor a Nate, por lo que se devuelve el elemento actual.
- Jazmin tiene una edad menor a Carlos, por lo que se devuelve el elemento anterior.
- Susan tiene una edad menor a Carlos, por lo que se devuelve el elemento anterio, que es Carlos.

Por lo que el resultado final es el objeto de Carlos, después de haber iterado sobre todos los elementos del array considerando la propiedad `edad`.

## Encontrar el valor menor

Se puede utilizar el mismo enfoque para obtener el usuario de menor edad, solo que en este caso se debe evaluar si la propiedad `edad` del elemento actual es menor a la que se tenía anteriormente.

```js
const usuarioMenor = usuarios.reduce((previous, current) => {
  return current.edad < previous.edad ? current : previous;
});

console.log(usuarioMenor);
// { nombre: "Jazmin", edad: 2 }
```

De manera similar al ejemplo anterior, el bucle funciona de la siguiente manera:

- Antes de Nate no hay ningún elemento, por lo que se devuelve el elemento actual.
- Carlos tiene una edad mayor a Nate, por lo que se devuelve el elemento anterior.
- Jazmin tiene una edad menor a Nate, por lo que se devuelve el elemento actual.
- Susan tiene una edad mayor a Jazmin, por lo que se devuelve el elemento anterior.

Por lo que se retorna el objeto de Jazmin, después de haber iterado sobre todos los objetos del array.

## Abreviando el código

Como se puede observar, el código de ambos ejemplos es muy sencillo y se puede escribir en una sola línea.

```js
const usuarioMayor = usuarios.reduce((prev, cur) =>
  cur.edad > prev.edad ? cur : prev
);

const usuarioMenor = usuarios.reduce((prev, cur) =>
  cur.edad < prev.edad ? cur : prev
);
```

## Utilizar con un array vacío

Si se tiene un array vacio se obtendrá el siguiente error: `TypeError: Reduce of empty array with no initial value`. Esto sucede porque se omite el valor inicial del método `reduce()`.

Podemos configurar esto para que en lugar de devolver un error, devuelva `null`.

```js
const usuarioMayor = usuarios.reduce((previous, current) => {
  return previous?.edad > current.edad ? previous : current;
}, null);

console.log(usuarioMayor);
// null
```

De manera abreviada:

```js
const usuarioMayor = usuarios.reduce(
  (prev, cur) => (prev?.edad > cur.edad ? prev : cur),
  null
);

console.log(usuarioMayor);
// null
```

Se puede notar que para que funcione, es necesario intercambiar la posición de los parámetros `previous` y `current` en la función de retorno. Es necesario para que el valor inicial sea el primero en ser evaluado.

En conclusión, el método `reduce()` es una excelente opción para obtener el valor mínimo o máximo de un array de objetos, siempre y cuando se conozca la propiedad que se desea evaluar.
