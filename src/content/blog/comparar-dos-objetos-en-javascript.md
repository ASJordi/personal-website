---
title: "Comparar dos Objetos en JavaScript"
description: "Cómo comparar dos Objetos en JavaScript"
pubDate: "Dec 14 2022"
heroImage: "/blog/images/post12/cover.webp"
tags: ["JS"]
---

En ocasiones es necesario comparar dos objetos en JavaScript, por ejemplo, para saber si son iguales o no. En este artículo veremos cómo hacerlo.

A simple vista, parece que comparar dos objetos en JavaScript es una tarea sencilla, pero no lo es. Esto se debe a que los objetos en JavaScript son referencias a una ubicación de memoria, por lo que si dos variables apuntan al mismo objeto, entonces son iguales.

Por ejemplo, si utilizamos el operador de igualdad `===` no funcionará dado que las variables apuntan a una ubicación de memoria diferente, y no se comparan valores como en los datos primitivos.

Otra forma de realizar esta comparación es convirtiendo los objetos a cadenas de texto con `JSON.stringify` y luego compararlas con el operador de igualdad `===`, pero si los atributos del objeto no están en el mismo orden, entonces no serán iguales.

## Comparar dos Objetos en JavaScript

Para realizar la comparación de dos objetos podemos crear una función que realice esta tarea implementando diferentes validaciones, dado que los objetos pueden tener diferentes tipos de datos, y objetos anidados.

```js
function compareObjects(obj1, obj2) {
  const firstObjectKeys = Object.keys(obj1);
  const secondObjectKeys = Object.keys(obj2);

  if (firstObjectKeys.length !== secondObjectKeys.length)
    return false;

  return firstObjectKeys.every((key) => {
    if(obj1[key] === null && obj2[key] === null)
      return true;

    if(obj1[key] === null || obj2[key] === null)
      return false;

    if(typeof obj1[key] === 'object' && typeof obj2[key] === 'object')
      return compareObjects(obj1[key], obj2[key])

    return obj1[key] === obj2[key]
  });
}
```

Esta función realiza la validación de diferentes escenarios:

* Objetos con atributos en diferente ordene.
* Objetos con diferentes cantidades de atributos.
* Objetos con atributos de diferentes tipos de datos.
* Objetos con atributos anidados.
* Objetos con atributos nulos.
* Objetos con objetos anidados.

Por ejemplo, se tienen los siguientes dos objetos:

```js
const personOne = {
  name: 'John',
  age: 30,
  address: {
    street: 'Main Street',
    number: 123,
    city: 'New York',
    country: 'USA',
  },
};

const personTwo = {
  age: 30,
  name: 'John',
  address: {
    street: 'Main Street',
    number: 123,
    city: 'New York',
    country: 'USA',
  },
};
```

Si ejecutamos la función `compareObjects` con los objetos `personOne` y `personTwo` como parámetros, nos devolverá `true`:

```js
compareObjects(personOne, personTwo); // true
```

En conclusión, podemos comparar dos objetos en JavaScript de diferentes formas, la mostrada en este artículo es una de ellas, pero existen otras formas de realizar esta tarea.
