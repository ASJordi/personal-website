---
layout: "../../layouts/PostLayout.astro"
title: "Cómo evitar bucles anidados en JavaScript"
description: "Cómo evitar bucles anidados en JavaScript"
pubDate: "Dec 21 2022"
heroImage: "/blog/images/post14/cover.png"
---

Cuando tenemos dos arreglos y queremos combinarlos, podemos usar un bucle anidado. Pero, ¿qué pasa si cada arreglo tiene demasiados elementos? ¿Cómo podemos evitar los bucles anidados en JavaScript? 

En este caso tenemos dos arreglos, el arreglo `carros` y el arreglo `precios`. En el primer arreglo tenemos los atributos `modelo` y `marca` y en el segundo arreglo tenemos los atributos `precio` y `marca`. 

```js
const carros = [
  {modelo: 2020, marca: 'Ford'},
  {modelo: 2019, marca: 'Chevrolet'},
  {modelo: 2018, marca: 'Toyota'},
  {modelo: 2017, marca: 'Nissan'},
  {modelo: 2016, marca: 'Hyundai'},
  {modelo: 2015, marca: 'Mazda'},
  {modelo: 2014, marca: 'Honda'},
  {modelo: 2013, marca: 'Subaru'}
];

const precios = [
  {precio: 30000, marca: 'Ford'},
  {precio: 25000, marca: 'Chevrolet'},
  {precio: 20000, marca: 'Toyota'},
  {precio: 15000, marca: 'Nissan'},
  {precio: 10000, marca: 'Hyundai'},
  {precio: 8000, marca: 'Mazda'},
  {precio: 7000, marca: 'Honda'},
  {precio: 6000, marca: 'Subaru'}
];
```

Si necesitamos saber los precios de los carros que tenemos en el arreglo `carros` se deben relacionar ambos arreglos, para esto podemos usar un bucle anidado como solución. 

```js
const carrosConPrecio = carros.map(carro => {
  const precio = precios.find((precioMap) => {
    return precioMap.marca === carro.marca
  }).precio 
  return {
    ...{...carro, precio}
  }
});

// output
[
  { modelo: 2020, marca: 'Ford', precio: 30000 },
  { modelo: 2019, marca: 'Chevrolet', precio: 25000 },
  { modelo: 2018, marca: 'Toyota', precio: 20000 },
  { modelo: 2017, marca: 'Nissan', precio: 15000 },
  { modelo: 2016, marca: 'Hyundai', precio: 10000 },
  { modelo: 2015, marca: 'Mazda', precio: 8000 },
  { modelo: 2014, marca: 'Honda', precio: 7000 },
  { modelo: 2013, marca: 'Subaru', precio: 6000 }
]
```

En el código anterior, primero usamos el método `map` para recorrer el arreglo `carros` y luego usamos el método `find` para recorrer el arreglo `precios` y encontrar el precio del carro. 

Este código funciona, pero si tenemos muchos elementos en los arreglos, el código se vuelve muy lento, por ejemplo, las iteraciones que se hacen en el bucle anidado son 36 en un principio. Si los comienzan a aumentar, el código se vuelve relativamente lento. 

Una solución para reducir el numero de iteraciones es realizar una búsqueda por referencia en lugar de una búsqueda iterativa. Para ello se debe transformar el arreglo `precios` en un objeto. 

```js
const nuevaListaPrecios = precios.reduce((acc, act) => {
  return {
    ...acc,
    [act.marca]: act.precio
  };
}, {});
```

Obtenemos el siguiente objeto. 

```js
{
  Ford: 30000,
  Chevrolet: 25000,
  Toyota: 20000,
  Nissan: 15000,
  Hyundai: 10000,
  Mazda: 8000,
  Honda: 7000,
  Subaru: 6000
}
```

Ahora podemos usar el objeto `nuevaListaPrecios` para obtener el precio de los carros a partir del método `map`. 

```js
const carrosConPrecioActual = carros.map(carro => {
  const precio = nuevaListaPrecios[carro.marca];
  return {
    ...{...carro, precio}
  }
});
```

Como se observa, la diferencia esta en la forma en que se realiza la búsqueda, en el primer caso se realiza una búsqueda iterativa y en el segundo caso se realiza una búsqueda por referencia o por llave (key).

Por lo tanto, el código anterior es mucho más rápido que el código con el bucle anidado obteniendo el mismo resultado, con solo realizar 16 iteraciones respecto a las 36 que se realizaban en el primer caso.