---
layout: "../../layouts/PostLayout.astro"
title: "Ordenar un arreglo de objetos por propiedad en JavaScript"
description: "Cómo ordenar un arreglo de objetos por propiedad en JavaScript"
pubDate: "Dec 12 2022"
heroImage: "/blog/images/post11/cover.png"
---

Ordenar un arreglo de objetos a partir de una propiedad en JavaScript es una tarea muy común y relativamente sencilla. En este artículo veremos cómo hacerlo. 

## ¿Por qué ordenar un arreglo de objetos?

En muchas ocasiones necesitamos ordenar un arreglo de objetos a partir de una propiedad. Por ejemplo, si tenemos un arreglo de usuarios y queremos ordenarlos por nombre, o si tenemos un arreglo de productos y queremos ordenarlos por precio. 

## Definición del arreglo de objetos

Durante este artículo vamos a trabajar con el siguiente arreglo de objetos:

```js
let computadoras = [
  {id: 102, marca: "HP", modelo: "Pavilion", precio: 40000, stock: 5},
  {id: 105, marca: "Asus", modelo: "VivoBook", precio: 50000, stock: 7},
  {id: 101, marca: "Dell", modelo: "Inspiron", precio: 30000, stock: 10},
  {id: 103, marca: "Lenovo", modelo: "Ideapad", precio: 35000, stock: 8},
  {id: 106, marca: "Acer", modelo: "Aspire", precio: 45000, stock: 6},
  {id: 104, marca: "Apple", modelo: "Macbook", precio: 120000, stock: 3},
];
```

Al hacer un `console.table(computadoras);` obtenemos un arreglo de objetos tal y como se define, y sin ordenar:

![Arreglo de objetos original](/blog/images/post11/1.png)

## Ordenar un arreglo de objetos por propiedad

Para ordenar un arreglo de objetos por propiedad, podemos usar el método `sort()` de JavaScript. Este método recibe como parámetro una función que recibe dos parámetros, `a` y `b`, que representan cada uno de los elementos del arreglo. 

Por ejemplo, si tenemos el arreglo `[3, 1, 2]` y utilizamos el método `sort()` con la función `(a, b) => a - b`, el resultado será `[1, 2, 3]`. Si utilizamos la función `(a, b) => b - a`, el resultado será `[3, 2, 1]`.

Para ordenar nuestro arreglo de objetos por precio, podemos usar la función `(a, b) => a.precio - b.precio`, considerando un orden ascendente. Si queremos un orden descendente, podemos usar la función `(a, b) => b.precio - a.precio`. 

```js
computadoras.sort((a, b) => a.precio - b.precio);

computadoras.sort((a, b) => b.precio - a.precio);
```

![Arreglo de objetos ordenado por precio](/blog/images/post11/2.png)

![Arreglo de objetos ordenado por precio descendente](/blog/images/post11/3.png)

Para ordenar nuestro arreglo de objetos por marca, podemos usar la función `(a, b) => a.marca.localeCompare(b.marca)`, considerando un orden ascendente. Si queremos un orden descendente, podemos usar la función `(a, b) => b.marca.localeCompare(a.marca)`. 

```js
computadoras.sort((a, b) => a.marca.localeCompare(b.marca));

computadoras.sort((a, b) => b.marca.localeCompare(a.marca));
```

![Arreglo de objetos ordenado por marca](/blog/images/post11/4.png)

![Arreglo de objetos ordenado por marca descendente](/blog/images/post11/5.png)

De esta manera ya hemos ordenado un arreglo de objetos por distintas propiedades, tanto numéricas como alfabéticas, y de forma ascendente y descendente. 

En conclusión el método `sort()` de JavaScript nos permite ordenar un arreglo de objetos por propiedad de forma muy sencilla, incluso evitando el uso de bucles y condicionales.