---
title: "Convertir elementos usando map en Java"
description: "Serie: Refactorizando del estilo imperativo al funcional en Java"
pubDate: "May 12 25"
heroImage: "../../assets/blog/images/post77/cover.webp"
tags: ["Java", "Streams", "IntStream", "Funcional"]
---

En el [post anterior](https://asjordi.dev/blog/convertir-un-foreach-con-if-a-un-stream-con-filter-en-java) analizamos la conversión de bucles con condicionales de un estilo imperativo a uno funcional. En este post veremos cómo convertir una iteración que transforma datos a un estilo completamente funcional. Además, también refactorizaremos el código que combina la transformación de datos con el código que filtra a partir de una condición antes de realizar cualquier transformación.

Siempre que transformamos datos dentro de un bucle, podemos usar el método `map()` de `Stream`

## Estilo imperativo a funcional

Consideremos el siguiente ejemplo donde se itera una colección y se realiza una transformación de sus elementos.

```java
List<String> names = Arrays.asList("John", "Jane", "Robert", "Rachel");

for (String name : names) {
    System.out.println(name.toUpperCase());
}
```

En cada paso de la iteración, la variable `name` se vincula a un nuevo valor. A medida que la iteración avanza de un elemento al siguiente de la colección, cada nombre se transforma a mayúsculas utilizando el método `toUpperCase()` y se imprime el valor resultante. Ya hemos visto cómo convertir un `foreach` a un estilo funcional usando el iterador interno de `stream()`. Si aplicamos esto, el código resultaría algo difícil de manejar, con la lambda pasada al `forEach()` realizando tanto la transformación como la impresión, de la siguiente manera:

```java
List<String> names = Arrays.asList("John", "Jane", "Robert", "Rachel");

names.forEach(name -> System.out.println(name.toUpperCase()));
```

Aunque el código anterior producirá los mismos resultados que el código de estilo imperativo, la lambda pasada al método `forEach()` no es coherente, es difícil de leer y modificar. Antes de seguir refactorizando este código, volvamos al de estilo imperativo para realizar una modificación.

```java
List<String> names = Arrays.asList("John", "Jane", "Robert", "Rachel");

for (String name : names) {
    String nameInUpperCase = name.toUpperCase();
    System.out.println(nameInUpperCase);
}
```

En este caso, se ha introducido una variable `nameInUpperCase` que almacena el resultado de la transformación. De post anteriores, sabemos que un `for` se puede convertir en un `stream()` y que la impresión de los valores se puede realizar usando `forEach()`. Ahora solo nos queda la transformación. Dichas transformaciones se pueden realizar utilizando el operador `map()` de `Stream`.

```java
List<String> names = Arrays.asList("John", "Jane", "Robert", "Rachel");

names.stream()
        .map(name -> name.toUpperCase())
        .forEach(nameInUpperCase -> System.out.println(nameInUpperCase));
```

La operación `map()` transforma los datos en un valor diferente de acuerdo con la función invocada desde dentro de la expresión lambda que se le pasa. En este ejemplo, cada nombre se transforma a su valor en mayúsculas. El valor transformado se imprime de acuerdo a la expresión lambda que se le pasa a `forEach()`. El código resultante es más coherente, fácil de leer y modificar.

Podemos hacer que el código sea un poco más conciso utilizando referencias de métodos en lugar de expresiones lambda.

```java
List<String> names = Arrays.asList("John", "Jane", "Robert", "Rachel");

names.stream()
        .map(String::toUpperCase)
        .forEach(System.out::println);
```

> Usar el método `map()` para transformar datos mientras se itera sobre una colección de datos.

## Filtrar y transformar

Supongamos que, en medio de la iteración, queremos filtrar algunos valores de la colección en función de alguna condición y aplicar una transformación solo a esos elementos. Por ejemplo, ¿Qué pasa si queremos transformar e imprimir solo los nombres que tengan una longitud igual a 4? En el estilo imperativo podríamos hacer algo como esto:

```java
List<String> names = Arrays.asList("John", "Jane", "Robert", "Rachel");

for (String name : names) {
    if (name.length() == 4) {
        System.out.println(name.toUpperCase());
    }
}
```

Ya sabemos que un condicional `if` se puede refactorizar usando el método `filter()`. De esta manera, podemos realizar la transformación, utilizando el método `filter()` antes de la operación `map()`.

```java
List<String> names = Arrays.asList("John", "Jane", "Robert", "Rachel");

names.stream()
        .filter(name -> name.length() == 4)
        .map(String::toUpperCase)
        .forEach(System.out::println);
```

El método `filter()` descarta los datos que no se desean y pasa solo los valores que cumplen con la condición específicada. El método `map()` transforma los valores que pasan la condición en este caso, para que se impriman usando `forEach()`.

En cualquier lugar donde veamos una transformación de datos dentro de un bucle `for`, podemos utilizar el método `map()` para realizarlo con un estilo funcional. Además, si dentro del bucle se tiene un condicional para filtrar datos antes de realizar la transformación, podemos usar la API `stream()` llamando al método `filter()` antes de la operación `map()`.