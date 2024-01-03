---
title: "Aprende a utilizar el operador ternario en JavaScript"
description: "Aprende a utilizar el operador ternario en JavaScript"
pubDate: "March 22 23"
heroImage: "../../assets/blog/images/post29/cover.webp"
tags: ["JS"]
---

Al momento de trabajar con JavaScript es muy común que nos encontremos con la necesidad de realizar una condición, lo más común es utilizar if y else, pero en ocasiones podemos utilizar el operador ternario, ya sea para simplificar el código o para hacerlo más legible.

El contenido de este artículo es el siguiente:

- [if](#if)
- [else](#else)
- [else if](#else-if)
- [Operador ternario](#operador-ternario)


## if

La declaración if se utiliza para ejecutar código cuando una condición específica se cumple. Por ejemplo, tenemos una variable y se desea comprobar si es verdadera.

```js
let variable = true;

if (variable === true) {
  console.log("La variable es verdadera");
	// La variable es verdadera
}
```

En este caso, al comprobar valores booleanos, no es necesario utilizar el operador de comparación estricta, ya que el valor de la variable es booleano, por lo que podemos simplificar el código.

```js
let variable = true;

if (variable) {
	console.log("La variable es verdadera");
	// La variable es verdadera
}
```

También se puede verificar si el valor de la variable es falso.

```js
let variable = false;

if (!variable) {
	console.log("La variable es falsa");
	// La variable es falsa
}
```

Incluso se puede escribir en una sola línea.

```js
let variable = true;

if (variable) console.log("La variable es verdadera");

// La variable es verdadera
```

## else

A menudo se necesita ejecutar un código diferente cuando la condición no se cumple. Para esto se utiliza la declaración else.

```js
let variable = false;

if (variable) {
	console.log("La variable es verdadera");
} else {
	console.log("La variable es falsa");
	// La variable es falsa
}
```

En este ejemplo se puede observar que si la variable es verdadera, se ejecuta el código dentro del if, pero si es falsa, se ejecuta el código dentro del else.

## else if

Comprendiendo el funcionamiento de if y else, podemos utilizar la declaración else if para comprobar múltiples condiciones y ejecutar un código diferente para cada una de ellas.

```js
let variable = 2;

if (variable === 1) {
	console.log("La variable es 1");
} else if (variable === 2) {
	console.log("La variable es 2");
	// La variable es 2
} else {
	console.log("La variable es diferente de 1 y 2");
}
```

Estas comparaciones pueden ser tan grandes como se desee, pero a menudo se recomienda no utilizar demasiados niveles de anidamiento, ya que puede hacer el código difícil de leer y mantener.

## Operador ternario

El operador ternario es un operador condicional que se utiliza para simplificar el código cuando se necesita comprobar una condición y ejecutar un código diferente dependiendo del resultado.

La sintaxis del operador ternario es la siguiente:

```js
condición ? expresión1 : expresión2
```

La expresión1 se ejecuta si la condición es verdadera, y la expresión2 se ejecuta si la condición es falsa.

```js
let variable = true;

variable ? console.log("La variable es verdadera") : console.log("La variable es falsa");

// La variable es verdadera
```

En este ejemplo, la variable es verdadera, por lo que se ejecuta la expresión1, que es la que imprime el mensaje en la consola.

```js
let variable = false;

variable ? console.log("La variable es verdadera") : console.log("La variable es falsa");

// La variable es falsa
```

En este ejemplo, la variable es falsa, por lo que se ejecuta la expresión2, que es la que imprime el mensaje en la consola.

El operador ternario también se puede utilizar para asignar un valor a una variable dependiendo de la condición.

```js
let variable = true;

let mensaje = variable ? "La variable es verdadera" : "La variable es falsa";

console.log(mensaje);

// La variable es verdadera
```

Un ejemplo más complejo sería el siguiente:

```js
let variable = 2;

let mensaje = variable === 1 ? "La variable es 1" : variable === 2 ? "La variable es 2" : "La variable es diferente de 1 y 2";

console.log(mensaje);

// La variable es 2
```

En este ejemplo se puede observar que se utiliza el operador ternario para asignar un valor a la variable mensaje, dependiendo de la condición. Si la variable es 1, se asigna el mensaje "La variable es 1", si es 2, se asigna el mensaje "La variable es 2", y si es diferente de 1 y 2, se asigna el mensaje "La variable es diferente de 1 y 2".

De esta manera se puede simplificar el código y hacerlo más legible cuando se necesitan realizar ciertas condiciones dentro del flujo de un programa.
