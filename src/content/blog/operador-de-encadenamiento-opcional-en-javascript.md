---
title: "Operador de encadenamiento opcional en JavaScript"
description: "Cómo utilizar el operador de encadenamiento opcional en JavaScript"
pubDate: "April 03 23"
heroImage: "/blog/images/post32/cover.webp"
tags: ["JS"]
---

El encadenamiento opcional es una funcionalidad introducida en ES2020. Permite leer el valor de una propiedad ubicada dentro de una cadena de objetos sin tener que validar que cada referencia de la cadena exista. El operador de encadenamiento opcional es `?.` y se puede utilizar en cualquier lugar donde se pueda utilizar el operador de acceso a propiedades `.`.

Utilizemos el siguiente objeto de tipo `usuario` para ilustrar el uso del operador de encadenamiento opcional:

```js
const usuario = {
  nombre: 'Pepe',
  apellido: 'Perez',
  direccion: {
    calle: 'C/ Falsa',
    numero: 123
  }
}
```

En caso de que se tenga un subobjeto dentro del objeto `usuario` llamado `direccionEnvio` podemos comprobar si existe de la siguiente manera:

```js
if (usuario.direccionEnvio && usuario.direccionEnvio.calle) {
  console.log(usuario.direccionEnvio.calle)
}
```

Sin embargo, esta manera de comprobación puede ser no muy útil si tenemos que comprobar que existen varios subobjetos dentro del objeto `usuario` con múltiples propiedades.

El operador de encadenamiento opcional nos permite comprobar si existe un subobjeto dentro de un objeto de manera más sencilla:

```js
console.log(usuario.direccionEnvio?.calle)

// undefined
```

En caso de que el subobjeto `direccionEnvio` no exista, el resultado será `undefined`. Si el subobjeto `direccionEnvio` existe, el resultado será el valor de la propiedad `calle`. En este caso se obtiene `undefined` porque no existe, y no lanza un error.

El operador de encadenamiento opcional realiza la evaluación de izquierda a derecha. De esta manera primero se evalúa si existe el subobjeto `direccionEnvio` y luego si existe la propiedad `calle` dentro del subobjeto `direccionEnvio`.

## Utilizar con arrays

Es muy común utilizar este operador para evaluar objetos, pero tambien se puede utilizar para evaluar arrays. En este caso, el operador de encadenamiento opcional nos permite comprobar si existe un elemento dentro de un array en una posición determinada.

```js
console.log(usuario.direccionEnvio?.['calle'])

// undefined
```

## Utilizar con funciones

El operador de encadenamiento opcional también se puede utilizar para evaluar funciones. En este caso, el operador de encadenamiento opcional nos permite comprobar si existe una función dentro de un objeto y ejecutarla.

Supongamos que el subobjeto `direccionEnvio` tiene una función llamada `calcularCostoEnvio()` y se desea ejecutarla, pero considerando que ni siquiera el subobjeto `direccionEnvio` existe en nuestro objeto `usuario` se debería comprobar si existe el subobjeto y luego si existe la función.

```js
usuario.direccionEnvio?.calcularCostoEnvio()
```

Esto retornará `undefined` dado que no existe el subobjeto `direccionEnvio` y no se ejecutará la función `calcularCostoEnvio()`.

## Retornar un valor por defecto

Como podemos ver, ya no se recibe un error cuando se intenta acceder a una propiedad de un objeto que no existe. Sin embargo, en algunos casos es necesario retornar un valor por defecto en caso de que el subobjeto o la propiedad no exista, y no solo `undefined`.

Para esto podemos utilizar el operador de encadenamiento opcional junto con el operador de asignación nula `??` para retornar un valor por defecto en caso de que el subobjeto o la propiedad no exista.

Este operador utiliza la siguiente sintaxis:

```js
evaluation ?? fallback
```

Para nuestro ejemplo anterior, podemos retornar un valor por defecto en caso de que el subobjeto `direccionEnvio` no exista:

```js
console.log(usuario.direccionEnvio?.calcularCostoEnvio() ?? 'No hay dirección de envío')

// No hay dirección de envío
```

En este caso, si el subobjeto `direccionEnvio` no existe, se retornará el valor por defecto `No hay dirección de envío`. Si el subobjeto `direccionEnvio` existe, se ejecutará la función `calcularCostoEnvio()` y se retornará su valor.

En conclusión hemos aprendido como evaluar si tanto los objetos como sus propiedades existen sin la necesidad de realizarlo de manera manual, e incluso como retornar un valor por defecto en caso de que el subobjeto o la propiedad no exista. De igual manera se puede consultar la documentación oficial de [MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Optional_chaining).
