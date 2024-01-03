---
title: "Condicionales sin else en JavaScript"
description: "Cómo utilizar condicionales sin else en JavaScript"
pubDate: "March 27 23"
heroImage: "../../assets/blog/images/post30/cover.webp"
tags: ["JS"]
---

Al utilizar JavaScript es muy común que en algun momento se necesite utilizar el [operador ternario](https://asjordi.dev/blog/aprende-a-utilizar-el-operador-ternario-en-javascript), que no es más que una forma de escribir un condicional if-else en una sola línea.

Por ejemplo:

```js
let variable = true;
let resultado = "";

if (variable) {
  resultado = "La variable es verdadera";
} else {
  resultado = "La variable es falsa";
}

// operador ternario
resultado = variable ? "La variable es verdadera" : "La variable es falsa";
```

## if sin else

Hasta aquí todo bien, pero ¿Que pasa si solo se necesita evaluar una condición y no se necesita hacer nada si no se cumple? Veamos un ejemplo:

```js
if (variable) {
  alert("Verdadero");
}
```

En este caso, si la variable es verdadera, se mostrará un alert con el texto "Verdadero", sin considerar el caso en el que la variable sea falsa. Podemos escribirlo utilizando el operador ternario de la siguiente forma:

```js
variable ? alert("Verdadero") : null;
```

En este ejemplo no se necesita especificar `null`, por lo que se puede sustituir al utilizar el operador `&&`:

```js
variable && alert("Verdadero");
```

De esta manera el código queda más limpio y solo se ejecutará el alert si la variable es verdadera.

## Valor null por defecto

En algunos casos es posible que se tenga una función que devuelve un valor cualquiera, pero se desea devolver un valor predeterminado si no se recibe ningún valor. Por ejemplo:

```js
let nombre = null;

const usuario = {
	nombreUsuario: nombre ? nombre : "Invitado",
};

console.log(usuario);
// {nombreUsuario: "Invitado"}
```

En este ejemplo la variable `nombre` se inicializa con el valor `null`, después se define un objeto `usuario` que tiene la propiedad `nombreUsuario` que a su vez se inicializa con el valor de la variable `nombre` o con el valor "Invitado" si la variable es `null`. En este caso, el valor de la propiedad `nombreUsuario` será "Invitado".

Todo funciona bien, pero se puede simplificar utilizando el operador `??` para establecer un valor predeterminado:

```js
const usuario = {
  nombreUsuario: nombre ?? "Invitado",
};

console.log(usuario);
// {nombreUsuario: "Invitado"}
```

De esta manera se devuelve el valor de la variable `nombre` si no es `null` o `undefined`, en caso contrario se devuelve el valor "Invitado".

En conclusión, la sintaxis abreviada `if` en JavaScript es una herramienta valiosa que podemos utilizar para escribir código más limpio y legible utilizando el condicional `if` sin `else` o el operador ternario.
