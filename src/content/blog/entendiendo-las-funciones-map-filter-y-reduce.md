---
title: "Entendiendo las funciones Map, Filter & Reduce"
description: "Las funciones Map, Filter & Reduce en JavaScript"
pubDate: "Feb 06 2023"
heroImage: "/blog/images/post16/cover.webp"
tags: ["JS"]
---

Las funciones Map, Filter y Reduce tienen una cosa en común: todas se conocen como **Funciones de Orden Superior**.

## ¿Qué es una función de orden superior?

Una función de orden superior es una función que puede tomar otra función como argumento o devolver una función como resultado. En ocasiones, usar este tipo de funciones puede hacer que nuestro código sea más legible y fácil de mantener.

## .Map()

La función **Map()** realiza una función callback en cada elemento de un array. Devolverá un nuevo array a partir de los valores devueltos para que el array inicial pueda permanecer sin modificar. Teniendo en cuenta el siguiente ejemplo:

```js
const numbers = [1, 2, 3, 4, 5];
const doubleNumbers = numbers.map(function (num) {
	return num * 2;
});

// console.log(doubleNumbers); // [2, 4, 6, 8, 10]
```

Lo que se realiza es simplemente multiplicar cada elemento del array por 2. La función **Map()** devuelve un nuevo array con los valores devueltos por la función callback. Esta función se puede simplificar utilizando una función de flecha:

```js
const numbers = [1, 2, 3, 4, 5];
const doubleNumbers = numbers.map((num) => num * 2);

// console.log(doubleNumbers); // [2, 4, 6, 8, 10]
```

## .Filter()

La función **Filter()** devuelve un nuevo array con los elementos que cumplan con la condición de la función callback. Tal y como su nombre lo indica, permite filtrar los elementos de un array. Por ejemplo, el siguiente código devuelve un nuevo array con los números pares del array original:

```js
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(function (num) {
	return num % 2 === 0;
});

// console.log(evenNumbers); // [2, 4]
```

Considerando el ejemplo, cuando se ejecuta la función **Filter()**, se evalúa la condición de la función callback para cada elemento del array. Si la condición es verdadera, el elemento se agrega al nuevo array. En este caso, la condición es que el número sea divisible entre 2, es decir, que sea par. Si la condición es falsa, el elemento no se agrega al nuevo array. En este caso, la condición es que el número no sea divisible entre 2, es decir, que sea impar.

De igual manera, esta función se puede simplificar utilizando una función de flecha:

```js
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter((num) => num % 2 === 0);

// console.log(evenNumbers); // [2, 4]
```

## .Reduce()

La función **Reduce()** ejecuta una función callback en cada elemento del array, devolviendo un único valor. Esta función es muy útil para realizar operaciones matemáticas en un array. Toma dos argumentos: una función callback y un valor inicial. La función callback toma dos argumentos: un acumulador y el valor actual. El acumulador es el valor devuelto por la función callback en la iteración anterior. El valor actual es el elemento actual del array.

Por ejemplo, el siguiente código devuelve la suma de todos los elementos del array:

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce(function (accumulator, currentValue) {
	return accumulator + currentValue;
});

// console.log(sum); // 15
```

En este caso, la función callback toma dos argumentos: el acumulador y el valor actual. El acumulador es el valor devuelto por la función callback en la iteración anterior. El valor actual es el elemento actual del array. En la primera iteración, el acumulador es 0 y el valor actual es 1. En la segunda iteración, el acumulador es 1 y el valor actual es 2. En la tercera iteración, el acumulador es 3 y el valor actual es 3, y asi sucesivamente. Al final, el acumulador es 15, que es la suma de todos los elementos del array.

A su vez, esta función se puede simplificar utilizando una función de flecha:

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue);

// console.log(sum); // 15
```

Hasta aquí, hemos visto cómo se utilizan las funciones Map, Filter y Reduce con un ejemplo sencillo, aunque no es el único uso que se le puede dar a estas funciones dentro de JavaScript.
