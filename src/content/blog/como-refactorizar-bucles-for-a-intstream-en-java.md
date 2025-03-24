---
title: "Cómo refactorizar bucles for a IntStream en Java"
description: "Serie: Refactorizando del estilo imperativo al funcional en Java"
pubDate: "Apr 21 25"
heroImage: "../../assets/blog/images/post74/cover.webp"
tags: ["Java", "Streams", "IntStream", "Funcional"]
---

## Introducción

Las versiones anteriores de Java admitían el paradigma orientado a objetos combinado con un estilo imperativo de programación. A partir de Java 8, se introdujo el estilo funcional de programación al código. Ambos estilos de programación tienen sus propias ventajas y desventajas, e incluso se pueden combinar dentro del mismo código.

El estilo imperativo es donde decimos qué hacer y también cómo hacerlo. Mientras que el estilo funcional es declarativo por naturaleza, donde decimos qué hacer y delegamos el cómo o los detalles de implementación a la API. El código con un estilo imperativo puede ser más fácil de escribir, ya que la mayoría de nosotros estamos muy familiarizados con él. Sin embargo, el código se vuelve verboso, complejo y en ocasiones difícil de leer y mantener. Por su parte el estilo funcional puede ser difícil al principio, principalmente porque no es tan extenso su uso y enseñanza, pero en general, es más fácil de leer, comprender y modificar. Con la práctica, el estilo funcional se vuelve más fácil de entender y escribir.

Este es el primer post de una serie, donde analizaremos una serie de ejemplos de código donde se usa un estilo imperativo, y lo refactorizaremos para usar un estilo funcional equivalente.

## Simple for loop

Comencemos con el tradicional bucle `for` en el que realizamos una acción de acuerdo al valor de un índice en un rango determinado.

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

En este bucle, la esencia es el rango de valores de `i` que va de 0 a 4. Podemos clasificar como ruido a la propia sintaxis y a la operación de incremento de `i`. Para mantener la esencia o propósito del bucle y eliminar el ruido, podemos usar un estilo funcional con `IntStream`.

```java
IntStream.range(0, 5)
        .forEach(i -> System.out.println(i));
```

El código anterior es la forma en la que podemos escribir el bucle `for` con bastante facilidad. La clave está en la sentencia **"un índice sobre un rango"**. El método `range` de `IntStream` crea un rango de valores enteros donde el primer argumento es el valor inicial y el segundo argumento es el valor final. Considerar que el valor final no está incluido en el rango. El método `forEach` sirve para iterar sobre cada elemento del rango y realizar una acción, en este caso, imprimir el valor de `i`.

Podemos escribir este código de una manera más concisa, eliminando la variable `i` y usando el método `forEach` con una referencia de método.

```java
IntStream.range(0, 5)
        .forEach(System.out::println);
```

De esta manera el estilo funcional se vuelve más conciso, más fácil de leer y la intención es más clara en esta versión.

En caso de que el bucle `for` se ejecute hasta incluir el valor final, tal y como se muestra a continuación:

```java
for (int i = 0; i <= 5; i++) {
    System.out.println(i);
}
```

Podemos usar el método `rangeClosed` de `IntStream` para crear un rango de valores enteros que incluya el valor final.

```java
IntStream.rangeClosed(0, 5)
        .forEach(System.out::println);
```

Tanto si se utiliza el método `range` como el método `rangeClosed`, se obtiene un flujo de valores `int` (`IntStream`) sobre los cuales podemos iterar usando el método `forEach`.

En los ejemplos anteriores donde se usa un estilo funcional, el _iterador interno_ nos quita de encima la carga de la iteración. El propio flujo se encarga de recorrer el rango de valores, uno a la vez, y de esta manera solo tenemos que centrarnos en lo que se debe hacer con cada elemento, a medida que se va obteniendo dentro del método `forEach`. En los ejemplos anteriores solamente se imprime el valor proporcionado, pero se puede realizar cualquier operación, por ejemplo, guardar información en una base de datos, enviar información a un servicio web, etc.

A diferencia del iterador externo que nos proporciona el bucle `for`, el código que utiliza el iterador interno es más conciso, tiene menos ruido, evita la necesidad de mutar explícitamente la variable de índice, y es más fácil de leer y modificar.

En cualquier lugar que se encuentre un bucle `for` se puede utilizar el método `range` o `rangeClosed` de `IntStream` para iterar desde el valor inicial hasta el valor final, ya sea que el valor final esté incluido o no. De esta manera, se puede refactorizar el código de un estilo imperativo a un estilo funcional, asegurándose de verificar que el código funcione tal y como se espera, y que no haya efectos secundarios no deseados, en el mejor de los casos usando pruebas unitarias.