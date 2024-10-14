---
title: "¿Cómo calcular el máximo y mínimo en Java usando Streams?"
description: "Usar max() y min() de un Stream"
pubDate: "Nov 06 24"
heroImage: "../../assets/blog/images/post42/cover.webp"
tags: ["Java", "Streams", "Comparator"]
---

En este post vamos a ver cómo usar la API de Streams de Java para calcular el máximo y mínimo de una colección de elementos. Para ello, vamos a usar los métodos `max()` y `min()` de la clase `Stream`. Estos métodos nos permiten obtener el máximo y mínimo de una colección de elementos, respectivamente, utilizando un comparador personalizado.

Supongamos que tenemos una lista del tipo `List<Exam>` donde `Exam` es un record con dos propiedades `name` y `grade`, y queremos obtener el examen con la nota más alta y la nota más baja. 

```java
public record Exam(String name, Double grade) { }
```

```java
var exams = Arrays.asList(
        new Exam("Alice", 9.5),
        new Exam("Bob", 6.0),
        new Exam("Charlie", 7.5),
        new Exam("David", 8.0),
        new Exam("Eve", 8.5)
);
```

En versiones recientes de Java se puede utilizar el método `max()` y `min()` de la clase `Stream` para este propósito pasando un comparador personalizado y obteniendo un `Optional<T>` con el resultado. En caso de que la versión de Java no sea compatible con los métodos `max()` y `min()`, se puede utilizar el método `collect()` pasando como parámetro un `Collector`, ya sea `Collectors.maxBy()` o `Collectors.minBy()`, y a su vez un comparador personalizado. En caso de utilizar esta última opción en una versión de Java reciente el propio IDE nos sugerirá cambiarlo por el método `max()` o `min()`.

Comencemos creando un comparador personalizado del tipo `Comparator<Exam>` que nos permita obtener las calificaciones en orden ascendente.

```java
Comparator<Exam> byGradeAsc = (e1, e2) -> (int) (e1.grade() - e2.grade());
```

A manera de ejemplo, este comparador devolverá un número negativo si la calificación del primer examen es menor que la del segundo, cero si son iguales y un número positivo si la calificación del primer examen es mayor que la del segundo, para más información puedes consultar este [enlace](https://asjordi.dev/blog/como-funciona-comparator-en-java) a un post donde se explica cómo funciona la interfaz `Comparator`.

Este comparador se puede definir de otra manera utilizando el método `comparingDouble()` de la clase `Comparator` que nos permite crear un comparador a partir de una función que extrae un valor doble de un objeto sin la necesidad de escribir el comparador manualmente.

```java
Comparator<Exam> byGradeAscClean = Comparator.comparingDouble(Exam::grade);
```

En esta definición se le indica al comparador que debe de tomar un objeto del tipo `Exam`, extraer el valor de la propiedad `grade` y comparar los valores utilizando un tipo de dato `Double`.

Estas dos maneras son equivalentes y se pueden utilizar indistintamente, puede que la segunda sea un poco más difícil de entender al principio, pero una vez que se entiende es más fácil de escribir y leer.

Ahora que se tiene el comparador, solo resta utilizarlo en los métodos `max()` y `min()` para obtener el examen con la calificación más alta y más baja, respectivamente.

```java
var highestGrade = exams.stream().max(byGradeAscClean);
var lowestGrade = exams.stream().min(byGradeAscClean);
```

En este caso, se obtiene un `Optional<Exam>` con el examen con la calificación más alta y más baja, respectivamente. En caso de que la lista de exámenes esté vacía, se obtendrá un `Optional.empty()`. Para obtener el valor del `Optional` se puede utilizar el método `ifPresent()` que recibe un `Consumer` y ejecuta el código que se le pase como argumento si existe un valor.

```java
highestGrade.ifPresent(ex -> System.out.println("Highest grade: " + ex.name() + " " + ex.grade()));
lowestGrade.ifPresent(ex -> System.out.println("Lowest grade: " + ex.name() + " " + ex.grade()));

// Output
Highest grade: Alice 9.5
Lowest grade: Bob 6.0
```

O simplemente pasar como argumento un método de referencia para imprimir el valor del `Optional`, en caso de que él `Optional` esté vacío no se imprimirá nada, caso contrario se imprimirá el valor del `Optional` llamando al método `toString()` del objeto `Exam`.

```java
highestGrade.ifPresent(System.out::println);
lowestGrade.ifPresent(System.out::println);

// Output
Exam[name=Alice, grade=9.5]
Exam[name=Bob, grade=6.0]
```

Listo, de esta manera se puede obtener el máximo y mínimo de una colección de elementos utilizando la API de Streams de Java y la interfaz `Comparator`.