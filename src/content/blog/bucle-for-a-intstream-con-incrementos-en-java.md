---
title: "Bucle for a IntStream con iterate en Java"
description: "Serie: Refactorizando del estilo imperativo al funcional en Java"
pubDate: "Apr 28 25"
heroImage: "../../assets/blog/images/post75/cover.webp"
tags: ["Java", "Streams", "IntStream", "Funcional"]
---

En el [post anterior](https://asjordi.dev/blog/como-refactorizar-bucles-for-a-intstream-en-java) analizamos la conversión de un simple bucle `for` a un `IntStream`, pasando de un estilo imperativo a uno funcional. Ahora veremos cómo abordar bucles que son un poco más complejos, específicamente aquellos cuando tenemos que pasar por encima de algunos valores en un rango.

Al iterar sobre un rango de valores uno a la vez, el método `range` de `IntStream` resulta útil para implementarlo. Este método devuelve un flujo que generará un valor a la vez para el rango de valores especificado. A primera vista, para omitir algunos valores, podemos pensar en utilizar el método `filter()` en el flujo (Stream). Sin embargo, existe una solución más simple, el método `iterate()` de `IntStream`.

## Del estilo imperativo al funcional

Consideremos el siguiente bucle que nos permite saltar algunos valores en un rango:

```java
for(int i = 0; i < 15; i += 3) {
    System.out.println(i);
}
```

El valor de la variable `i` que actúa como índice comienza en `0` y se incrementa de `3` en `3` a medida que la iteración avanza. Cuando tenemos un bucle similar a este, donde la iteración no es sobre cada valor de un rango, sino que se saltan algunos valores, podemos considerar el método `iterate()` de `IntStream` para implementarlo.

Antes de refactorizar el código, veamos más de cerca el bucle `for` y la posible lógica para implementar el mismo comportamiento utilizando lambdas.

```java
for(int i = 0; i < 15; i = i + 3) // imperativo
for(seed, i -> i < 15, i -> i + 3) // funcional
```

El primer argumento que se pasa al bucle `for` es el valor inicial o `seed` para la iteración y puede permanecer como esta. El segundo argumento es un predicado que indica que el valor de la variable `i`, no debe superar el valor de `15`. Esto lo podemos reemplazar a un estilo funcional con un `IntPredicate`. El tercer argumento incrementa el valor de la variable `i` o índice y eso, en el estilo funcional, es simplemente un `IntUnaryOperator`. `IntStream` tiene el método estático `iterate()` que representa la definición anterior: `iterate(int seed, IntPredicate hasNext, IntUnaryOperator next)`.

Refactoricemos el bucle `for` a un `IntStream` utilizando el método `iterate()`.

```java
IntStream.iterate(0, i -> i < 15, i -> i + 3)
        .forEach(System.out::println);
```

De esta forma, los `;` se convierten en `,`, usamos dos lambdas, una para el predicado y otra para el operador de incremento.

## Iteración sin límites con break

Además de iterar por un rango de valores, a menudo podemos utilizar un bucle sin límites, lo que genera un poco más de complejidad. Consideremos el siguiente bucle con un estilo imperativo, que no tiene límites respecto hasta donde iterar, y utiliza un condicional `if` para salir del bucle con `break`.

```java
for (int i = 0;; i+= 3) {
    if (i > 20) break;
    System.out.println(i);
}
```

Ahora no hay condición de terminación en la declaración del bucle, por lo que no tiene límites, tal y como indican los `;;` en la declaración. Sin embargo, dentro del bucle tenemos un `break` para salir del bucle en caso de que el valor de `i` sea mayor que `20`.

En un estilo funcional, podemos omitir el segundo argumento del método `iterate()`, él `IntPredicate` específicamente, para convertir la iteración en un flujo infinito. El equivalente a un `break` es el método `takeWhile()`. Este método terminará el iterador interno del flujo, si el predicado de tipo `IntPredicate` se evalúa como `false`. Por lo tanto, podemos refactorizar el bucle `for` a un `IntStream` de la siguiente manera:

```java
IntStream.iterate(0, i -> i + 3)
        .takeWhile(i -> i <= 20)
        .forEach(System.out::println);
```

El método `iterate()` tiene una sobrecarga, donde solo se pasa el valor inicial y el operador de incremento, es decir, una donde no se pasa él `IntPredicate`. Esta versión sin predicado se utiliza para crear un flujo infinito que genera valores a partir del valor inicial. El `IntUnaryOperator` que se pasa como segundo argumento determina cómo se incrementa el valor de `seed`. Por lo tanto, en el ejemplo anterior el flujo generará los valores `0, 3, 6, 9, 12, 15, ...`. Como queremos limitar la iteración para que el índice no supere el valor de `20` usando el método `takeWhile()`. El predicado que se le pasa al método `takeWhile()` indica si la iteración puede continuar siempre y cuando el valor actual sea menor o igual a `20`.

En general, cuando tengamos un bucle `for` con un incremento en un rango de valores (distinto a 1), podemos usar el método `iterate()` con tres argumentos, en caso de que tenga una condición de terminación interna con un `break`, podemos usar `iterate()` con dos argumentos y `takeWhile()` para limitar la iteración.