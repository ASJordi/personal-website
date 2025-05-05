---
title: "Convertir un forEach con if a un Stream con filter en Java"
description: "Serie: Refactorizando del estilo imperativo al funcional en Java"
pubDate: "May 05 25"
heroImage: "../../assets/blog/images/post76/cover.webp"
tags: ["Java", "Streams", "IntStream", "Funcional"]
---

En el [post anterior](https://asjordi.dev/blog/bucle-for-a-intstream-con-iterate-en-java/) vimos cómo convertir un bucle `for` con incremento distinto de 1, y un bucle `for` infinito a un estilo completamente funcional utilizando el método `iterate()` de `IntStream`. En este post veremos como convertir un bucle `foreach` de un estilo imperativo a un estilo funcional, además de cómo filtrar elementos de acuerdo a una condición.

En Java 5 se introdujo la sintaxis de `foreach`, la cual se utiliza para iterar sobre colecciones de elementos. Por ejemplo, para iterar una colección de cadenas que representan nombres, podemos escribir `for(String name: names){}`. En segundo plano, él `foreach` se convierte, a nivel de código de bytes, para utilizar un `Iterator`, mientras que el iterator nos dice que hay un elemento, busca el siguiente elemento para procesarlo. En otras palabras, él `foreach` es una sintaxis concisa y agradable para la iteración con un bucle while sobre los elementos proporcionados por un `Iterator`. Podemos convertir un `foreach` a un estilo funcional con bastante facilidad.

## Estilo imperativo a funcional

Consideremos el siguiente ejemplo donde se itera una colección de nombres usando un `foreach`.

```java
List<String> names = Arrays.asList("John", "Jane", "Robert", "Rachel");

for (String name : names) {
    System.out.println(name);
}
```

En cada paso de la iteración, la variable `name` se vincula a un nuevo valor, a medida que la iteración avanza de un elemento al siguiente en la colección. La conversión del estilo imperativo `foreach` al estilo funcional es un uso directo del método iterador interno del `forEach`. Se denomina _iterador interno_ porque el avance al siguiente elemento se maneja internamente y de forma automática en lugar de que se haga de forma externa o explícitamente.

Refactorizamos el bucle anterior a un estilo funcional.

```java
List<String> names = Arrays.asList("John", "Jane", "Robert", "Rachel");

names.forEach(name -> System.out.println(name));
```

Podemos modificar el código anterior para que sea aún más conciso usando una referencia de método.

```java
List<String> names = Arrays.asList("John", "Jane", "Robert", "Rachel");

names.forEach(System.out::println);
```

Es bastante sencillo, el bucle `foreach` se convirtió en una llamada al método `forEach()` de la colección. En cada paso de la iteración, la lambda proporcionada al método como argumento se invoca con el siguiente elemento de la colección.

A continuación, veremos una ligera variación de este ejemplo, usando `stream()` y `forEach()`.

```java
List<String> names = Arrays.asList("John", "Jane", "Robert", "Rachel");

names.stream().forEach(name -> System.out.println(name));
```

El método `forEach()` está disponible tanto en `Collection<T>` como en `Stream<T>`. Los métodos como `filter()`, que usaremos a continuación, están disponibles solo en `Stream<T>` y no en `Collection<T>`. Esto se realiza de esta manera por diseño para brindar eficiencia cuando múltiples operaciones intermedias pueden preceder a la operación terminal como `forEach()`, `findFirst()`, `collect()`, etc.

## Filtrar elementos con if

Supongamos que, en medio de la iteración, queremos filtrar o elegir algunos valores de la colección en función de alguna condición. Por ejemplo, ¿Qué pasa si queremos imprimir solo los nombres cuya longitud sea igual a 4? Con un estilo imperativo, podríamos hacerlo de la siguiente manera.

```java
List<String> names = Arrays.asList("John", "Jane", "Robert", "Rachel");

for(String name: names) {
    if(name.length() == 4) {
        System.out.println(name);
    }
}
```

Usando un estilo funcional, el método `filter()` de `Stream` es el reemplazo directo a un condicional `if`. Este método permite filtrar elementos de la secuencia de acuerdo con una condición dada. La condición se proporciona como una lambda que toma un elemento y devuelve un valor booleano. Si el predicado se evalúa como `true` para un elemento, se incluye en la secuencia resultante; de lo contrario, se excluye.

```java
List<String> names = Arrays.asList("John", "Jane", "Robert", "Rachel");

names.stream()
        .filter(name -> name.length() == 4)
        .forEach(name -> System.out.println(name));
```

El método `filter()` actúa como una compuerta, se abre para dejar pasar algunos elementos y se cierra para rechazar o descartar algunos otros a medida que avanza la iteración sobre la colección.

En cualquier lugar que nos encontremos un bucle `foreach`, podemos usar el método `forEach()` directamente sobre la colección. Si el cuerpo del bucle tiene un condicional para filtrar elementos, podemos usar el método `filter()` de `Stream` para lograr el mismo efecto.