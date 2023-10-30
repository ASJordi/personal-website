---
title: "Remover vocales de un String con JavaScript"
description: "Cómo remover todas las vocales de un String con JavaScript"
pubDate: "March 20 23"
heroImage: "/blog/images/post28/cover.webp"
tags: ["JS"]
---

En este post vamos a ver cómo remover todas las vocales de un String con JavaScript. Para ello vamos a usar la función replace() de JavaScript.

La idea es que dado un String, queremos obtener otro String que no incluya las letras `a`, `e`, `i`, `o` y `u`.

## Remover vocales

Consideremos el siguiente String:

```js
let frase = "Esto es una oración con todas las vocales";
```

Para remover todas las vocales es necesario utilizar el método `replace()` y una expresión regular que nos permita encontrar todas las vocales.

```js
let fraseSinVocales = frase.replace(/[aeiou]/gi, '');
```

De esta manera obtenemos el siguiente resultado:

```js
console.log(fraseSinVocales);

// st s n rcón cn tds ls vcls
```

Pero, ¿Qué pasa con las vocales acentuadas? Para removerlas es necesario modificar la expresión regular, y de paso incluir las vocales en mayúsculas.

```js
let fraseSinVocales = frase.replace(/[aáAÁeéEÉiíIÍoOóÓuúÚ]/gi, '');

console.log(fraseSinVocales);

// st s n rcn cn tds ls vcls
```
Listo, de esta manera se pueden remover todas las vocales de un String con JavaScript utilizando pocas líneas de código.

## Explicación

En primer lugar se utiliza el método `replace()` que recibe como primer parámetro una expresión regular. Por ejemplo se puede reemplazar la letra `a` por una cadena vacía de la siguiente manera:

```js
let frase = "Esto es una oración con todas las vocales";

let fraseSinLetraA = frase.replace("a", "");

console.log(fraseSinLetraA);

// Esto es un oración con todas las vocales
```

Como se puede ver, solo se reemplazó la primera letra `a` que encontró. En este punto es donde toma mayor importancia el uso de una expresión regular.

- Se inicia envolviendo la expresión entre barras invertidas `/ /`.
- Después se abren corchetes `[ ]` para indicar que se va a buscar una lista de caracteres.
- La ultima parte es utilizar la bandera `gi` que significa `global ignore` y hace referencia a que se debe buscar en todo el String y no solo en la primera coincidencia, así como que la busqueda no distinga entre mayúsculas y minúsculas.

Y de esta manera se obtiene el resultado deseado.
