---
layout: "../../layouts/PostLayout.astro"
title: "Primeros pasos con bucles en JavaScript"
description: "Primeros pasos con loops en JavaScript"
pubDate: "Feb 08 2023"
heroImage: "/blog/images/post17/cover.png"
---

Los bucles o loops son una parte fundamental de JavaScript y cualquier otro lenguaje de programación, estos pueden mejorar la eficiencia y simplicidad de nuestro código sin importar el tamaño del proyecto.

En este artículo, aprenderemos los 3 bucles más utilizados en JavaScript: **for**, **while** y **do while**.

Antes de seguir adelante, es necesario entender que es una estructura de control de flujo y su función dentro de la programación.

## ¿Qué es una estructura de control de flujo?

Como su nombre lo indica, es una estructura que controla el flujo de nuestro código, es decir, el orden en el que se ejecutan las instrucciones. Tambien permite ejecutar tareas repetitivas o complejas. 

## Bucle for

El bucle `for` es una estructura de control de flujo que nos permite ejecutar un bloque de código un número determinado de veces. A menudo, este bucle es utilizado para iterar sobre los elementos de un arreglo, y es el bucle más utilizado en JavaScript cuando se conoce el número de iteraciones que se van a realizar.

La sintaxis de este bucle es la siguiente:

```js
for (inicialización; condición; incremento) {
	// código a ejecutar
}
```

Por ejemplo, si queremos iterar los elementos de un array e imprimirlos en la consola, podemos hacerlo de la siguiente manera:

```js
const array = [1, 2, 3, 4, 5];

for (let i = 0; i < array.length; i++) {
	console.log(`Elemento ${i}: ${array[i]}`);
}

// Elemento 0: 1
// Elemento 1: 2
// Elemento 2: 3
// Elemento 3: 4
// Elemento 4: 5
```

En este ejemplo, la variable `i` es la variable de control del bucle, la cual se inicializa en 0, la condición es que `i` sea menor que el tamaño del array, y el incremento es que `i` se incremente en 1 cada vez que se ejecute el bucle. 

En caso de que, no se conozca el número de iteraciones que se van a realizar, se puede utilizar el bucle `while`.

## Bucle while

El bucle `while` es una estructura de control de flujo que nos permite ejecutar un bloque de código mientras se cumpla una condición. Es el bucle más utilizado en JavaScript cuando no se conoce el número de iteraciones que se van a realizar.

La sintaxis de este bucle es la siguiente:

```js
while (condición) {
	// código a ejecutar
}
```

La **condición** es una expresión booleana que se evalúa antes de cada iteración del bucle. Si la condición es verdadera, el bloque de código se ejecuta, y si es falsa, el bucle termina.

Por ejemplo, si queremos imprimir los números del 1 al 5 en la consola, podemos hacerlo de la siguiente manera:

```js
let i = 1;

while (i <= 5) {
	console.log(i);
	i++;
}

// 1
// 2
// 3
// 4
// 5
```

En este ejemplo, la variable `i` es la variable de control del bucle, la cual se inicializa en 1, la condición es que `i` sea menor o igual a 5, y el incremento es que `i` se incremente en 1 cada vez que se ejecute el bucle. 

> **Nota:** Es importante tener en cuenta que el bucle `while` puede ejecutarse infinitamente si la condición nunca se vuelve falsa. Por lo tanto, es importante asegurarse de que la condición se vuelva falsa en algún momento.

En este punto, se conocen los 2 bucles más utilizados en JavaScript, pero ¿qué pasa si queremos ejecutar un bloque de código al menos una vez, y luego repetirlo mientras se cumpla una condición? Para este caso, se puede utilizar el bucle `do while`.

## Bucle do while

El bucle `do while` es una estructura de control de flujo que nos permite ejecutar un bloque de código al menos una vez, y luego repetirlo mientras se cumpla una condición. 

Es similar al bucle `while`, pero la diferencia es que el bloque de código se ejecuta al menos una vez, incluso si la condición es falsa.

Resulta útil cuando se necesita ejecutar un bloque de código al menos una vez, incluso antes de que la condición se evalúe.

La sintaxis de este bucle es la siguiente:

```js
do {
	// código a ejecutar
} while (condición);
```

Por ejemplo: 

> Supongamos que quieres probar gratis una aplicación de música y pagar un mes después. Usando el bucle `do while` sería así: "Ejecuta primero la app de música, luego comprueba el pago".
> Pero si usamos el bucle `while`, el código necesitará comprobar primero la condición (en este caso el pago), lo que significa que no puedes obtener una prueba gratuita ya que necesitas pagar primero.

```js
let musicPayment = false;

do {
	console.log('Ejecutando prueba gratis de la app de música...');
	musicPayment++;
} while (musicPayment === true);

console.log('Prueba gratis finalizada');

// Ejecutando prueba gratis de la app de música...
// Prueba gratis finalizada
```

En este ejemplo, la variable `musicPayment` es la variable de control del bucle, la cual se inicializa en `false`, la condición es que `musicPayment` sea igual a `true` para que se ejecute el bucle, en caso contrario, el bucle termina.

Los bucles `for`, `while` y `do while` son las estructuras de control de flujo más comunes, pero hay otros bucles que se pueden utilizar en JavaScript, como el bucle `for in` y el bucle `for of`.