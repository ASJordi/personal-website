---
title: "Desestructurar objetos en JavaScript "
description: "Desestructuración de objetos en JavaScript"
pubDate: "Feb 22 2023"
heroImage: "../../assets/blog/images/post21/cover.webp"
tags: ["JS"]
---

Al trabajar con JavaScript, es posible que se necesite trabajar con objetos que contienen muchos datos, por lo que es posible que desee extraer solo algunos de ellos. Con la desestructuración de objetos, puede extraer los datos que necesita de un objeto y almacenarlos en variables de forma rápida y sencilla.

## ¿Qué es la desestructuración de objetos?

La desestructuración de objetos es una forma de extraer datos de un objeto y almacenarlos en variables. Se puede realizar en una sola línea de código, lo que hace que el código sea más legible y fácil de mantener.

Se realiza utilizando la sintaxis de asignación de desestructuración que permite desempaquetar valores de matrices o propiedades de objetos en distintas variables.

Se tiene el siguiente objeto:

```js
const usuario = {
  nombre: 'Juan',
  edad: 25,
};
```

Antes de ES2015, para extraer los datos de un objeto, se necesitaba una variable para cada propiedad del objeto. Por ejemplo:

```js
const nombre = usuario.nombre;
const edad = usuario.edad;
```

Esto todavía funciona, pero se puede optimizar al omitir la variable intermedia y asignar directamente el valor de la propiedad del objeto a la variable.

```js
const { nombre, edad } = usuario;

console.log(nombre); // Juan
console.log(edad); // 25
```

## Desestructurar y mantener el resto de un objeto

Se tiene un objeto con múltiples propiedades y se desea extraer solo algunas de ellas. Para mantener el resto de las propiedades, se puede utilizar la sintaxis de rest operator.

```js
const usuario = {
	nombre: 'Juan',
	edad: 25,
	pais: 'México',
};

const { nombre, ...rest } = usuario;

console.log(nombre); // Juan

console.log(rest); // { edad: 25, pais: 'México' }
```

## Desestructurar objetos anidados

En muchas ocasiones los objetos contienen otros objetos, por lo que es posible que desee extraer datos de un objeto anidado. Considerar el siguiente objeto:

```js
const usuario = {
	nombre: 'Juan',
	edad: 25,
	usuario: "juan23",
	direccion: {
		pais: 'México',
		estado: 'CDMX',
	},
};
```

Se requiere extraer el país del objeto, para lo cual se puede utilizar la siguiente sintaxis:

```js
const { direccion: { pais } } = usuario;

console.log(pais); // México
```

Si deseamos extraer todo el objeto de `direccion` y el país, se puede utilizar la siguiente sintaxis:

```js
const { direccion, direccion: { pais } } = usuario;

console.log(direccion); // { pais: 'México', estado: 'CDMX' }

console.log(pais); // México
```

Si no se pasa la referencia al objeto `direccion`, se obtendrá un error de referencia.

## Desestructurar con un alias

Se puede utilizar un alias para cambiar el nombre de la variable que se utilizará para almacenar el valor de la propiedad del objeto. Considerar el objeto `usuario` del ejemplo anterior:

```js
const { direccion: address} = usuario;

console.log(address); // { pais: 'México', estado: 'CDMX' }
```

## Desestructurar posibles valores nulos

Considerar el siguiente objeto, donde la propiedad `twitter` y `facebook` son opcionales y por lo tanto pueden ser valores nulos:

```js
const usuario = {
	nombre: 'Juan',
	edad: 25,
	usuario: "juan23",
	twitter: "@juan23",
	facebook: "juan23",
};
```
Para el objeto anterior, se puede utilizar la siguiente sintaxis para extraer los datos de las propiedades `twitter` y `facebook`:

```js
const { twitter, facebook } = usuario;

console.log(twitter); // @juan23
console.log(facebook); // juan23
```

Esto funciona bien, pero si se tiene un usuario que no tiene una cuenta de Twitter, se obtendrá un error de referencia. Por ejemplo si se tiene el siguiente objeto:

```js
const usuario2 = {
	nombre: 'Pedro',
	edad: 25,
	usuario: "pedro_9",
};
```

Al intentar extraer los datos de las propiedades `twitter` y `facebook` del objeto `usuario2`, se obtendrá un error de referencia. Para lo cual podemos establecer un valor por defecto para las propiedades `twitter` y `facebook`:

```js
const { twitter = '', facebook = '' } = usuario2;

console.log(twitter); // ''
console.log(facebook); // ''
```

## Desestructurar con un bucle

Todos los ejemplos anteriores funcionan con objetos individuales, pero también se puede utilizar la desestructuración de objetos con un bucle. Considerar el siguiente array de objetos:

```js
const usuarios = [
	{
		nombre: 'Juan',
		edad: 25,
		usuario: "juan23",
		twitter: "@juan23",
		facebook: "juan23",
	},
	{
		nombre: 'Pedro',
		edad: 25,
		usuario: "pedro_9",
	},
	{
		nombre: 'Luis',
		edad: 25,
		usuario: "luis_9",
		twitter: "@luis_9",
	},
];
```

Podemos recorrer el array de objetos y extraer los datos de las propiedades `nombre` y `edad` de cada objeto:

```js
for (const { nombre, edad } of usuarios) {
	console.log(nombre, edad);
}

// Juan 25
// Pedro 25
// Luis 25
```

## Desestructuración dinámica

¿Qué pasa si solo conocemos el nombre de la propiedad que queremos desestructurar en tiempo de ejecución?

Por ejemplo, un usuario puede hacer clic en un botón para mostrar su perfil. El handler tendría la siguiente sintaxis:

```js
const obtenerNombre = "nombre";
```

Para extraer el valor de la propiedad `nombre` del objeto `usuario`, se puede utilizar la siguiente sintaxis:

```js
const { [obtenerNombre]: valorRetornado } = usuario;

console.log(valorRetornado); // Juan
```

## Desestructurar parámetros de una función

Tenemos una función que devuelve un objeto con múltiples propiedades.

```js
const obtenerProducto = () => {
	return {
		id: 1,
		nombre: 'Monitor 20 pulgadas',
		precio: 300,
		disponible: true,
	};
};
```

Si lo llamamos, obtendremos el siguiente resultado:

```js
const producto = obtenerProducto();

console.log(producto); // { id: 1, nombre: 'Monitor 20 pulgadas', precio: 300, disponible: true }
```

Sin embargo, solo se requiere obtener el valor del `id`, para lo cual se puede utilizar la siguiente sintaxis:

```js
const { id } = obtenerProducto();

console.log(id); // 1
```

De esta manera podemos desestructurar el objeto que devuelve la función y obtener solo el valor de la propiedad que nos interesa.
