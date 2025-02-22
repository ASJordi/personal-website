---
title: "Pasar funciones lambda como argumentos de métodos en Java"
description: "Funciones anónimas como argumentos de métodos"
pubDate: "Feb 24 25"
heroImage: "../../assets/blog/images/post66/cover.webp"
tags: ["Java", "Lambdas", "Streams"]
---

Si ya conoces las funciones anónimas o lambdas en Java, puede que sepas como crear tus propias interfaces funcionales y utilizarlas como parámetros para otros métodos. En caso de que no, puedes consultar el siguiente [post](https://asjordi.dev/blog/funciones-anonimas-lambda-en-java/) donde se explica cómo funcionan en detalle.

Durante este post, vamos a ver cómo podemos recibir lambdas como parámetro de un método en Java, considerando que una lambda no es más que una forma concisa de representar la implementación de una interfaz funcional, siendo esta una interfaz con un único método abstracto (Single Abstract Method, SAM).

De esta forma, si una lambda no es más que la implementación de una interfaz funcional, podemos invertir la relación y definir un método que acepte como argumento una interfaz funcional, permitiendo de esta manera que se pueda pasar una lambda como argumento para posteriormente ser ejecutada de acuerdo al tipo de la interfaz funcional.

## Ejemplo Consumer

Para ilustrar este concepto, vamos a utilizar la interfaz funcional `Consumer<T>`, la cual representa una operación que acepta un único argumento de tipo `T` y no devuelve ningún resultado (consume una acción). Esta interfaz funcional tiene un único método abstracto llamado `accept` que es el que contiene la implementación de la lambda.

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Jon", "Arya");
        print(names, name -> System.out.println("Hello " + name));
    }

    public static void print(List<String> list, Consumer<String> consumer) {
        for (String s : list) {
            consumer.accept(s);
        }
    }
}
```

Para este ejemplo, se define el método `print()` que recibe una lista de nombres y un `Consumer<String>`. Dentro del método, se itera sobre la lista de nombres y se llama al método `accept()` del `Consumer` con cada nombre de la lista.

```java
Hello Jon
Hello Arya
```

Es importante tener en consideración que una lambda no deja de ser un objeto en Java, por lo que puede tener métodos del tipo `default` o `static`. `Consumer` tiene un método `andThen()` que permite encadenar otro `Consumer` después de la ejecución del primero.

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Jon", "Arya");
        print(names, name -> System.out.println("Hello " + name));
    }

    public static void print(List<String> list, Consumer<String> consumer) {
        for (String s : list) {
            consumer.andThen(name -> System.out.println("Goodbye " + name)).accept(s);
        }
    }
}
```

En este caso, se encadena otro `Consumer` que imprime "Goodbye" seguido del nombre del elemento actual, después de ejecutar el primer `Consumer`.

```
Hello Jon
Goodbye Jon
Hello Arya
Goodbye Arya
```

## Ejemplo Predicate

La interfaz funcional `Predicate<T>` representa una función que acepta un argumento de tipo `T` y devuelve un valor booleano. Esta interfaz funcional tiene un único método abstracto llamado `test` que es el que contiene la implementación de la lambda. Se suele utilizar para filtrar elementos de una colección.

```java
import java.util.*;
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7);
        var evenNumbers = filter(list, i -> i % 2 == 0);
    }

    public static List<Integer> filter(List<Integer> list, Predicate<Integer> predicate) {
        List<Integer> result = new ArrayList<>();
        for (Integer i : list) {
            if (predicate.test(i)) {
                result.add(i);
            }
        }
        return result;
    }
}
```

En este caso, el método `filter()` recibe una lista de enteros y un `Predicate<Integer>`. Dentro del método, se itera sobre la lista de enteros y se llama al método `test()` del `Predicate` con cada entero de la lista. Si el resultado es `true`, se añade el entero a la lista de resultados. Se pasa una lambda como argumento que comprueba si un número es par.
```
[2, 4, 6]
```

Al igual que otras interfaces funcionales, `Predicate` tiene métodos `default` y `static`. Por ejemplo, el método `negate()` devuelve un `Predicate` que representa la negación de la condición original.

```java
import java.util.*;
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7);
        var evenNumbers = filter(list, i -> i % 2 == 0);
    }

    public static List<Integer> filter(List<Integer> list, Predicate<Integer> predicate) {
        List<Integer> result = new ArrayList<>();
        for (Integer i : list) {
            if (predicate.negate().test(i)) {
                result.add(i);
            }
        }
        return result;
    }
}
```

En este caso, se añade el método `negate()` al `Predicate` para obtener la negación de la condición original, es decir, se añaden a la lista de resultados los números que no son pares.

```
[1, 3, 5, 7]
```

De esta manera, se pueden encadenar múltiples `Predicate` para filtrar elementos de una colección de acuerdo a diferentes condiciones lógicas.

## Ejemplo Function

En su forma más simple la interfaz funcional `Function<T, R>` representa una función genérica, que acepta un argumento de tipo `T` y devuelve un resultado de tipo `R`. Esta interfaz funcional tiene un único método abstracto llamado `apply` que es el que contiene la implementación de la lambda.

```java
import java.util.*;
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ana", "Carlos", "Pedro", "Sofia");
        List<Integer> lengths = convert(names, String::length);
    }

    public static <String, Integer> List<Integer> convert(List<String> lista, Function<String, Integer> f) {
        List<Integer> result = new ArrayList<>();
        for (String e : lista) {
            result.add(f.apply(e));
        }
        return result;
    }
}
```

El método `convert()` recibe una lista del tipo String y un `Function<String, Integer>`. Dentro del método, se itera sobre la lista de cadenas y se llama al método `apply()` de `Function` que convierte la cadena en un entero que representa la longitud de esta misma. Se invoca el método pasando una referencia a un método estático `String::length` como lambda, es decir, una referencia al método `length()` de la clase `String` (referencia de método).

```
[3, 6, 5, 5]
```

`Function` tiene otros métodos, por ejemplo, el método `andThen()` que permite encadenar otra función después de la ejecución de la primera, o el método `compose()` que permite realizar composición de funciones. En cualquiera de los casos, todo depende de la lógica que se quiera implementar al utilizar esta interfaz funcional.

## Conclusión

En resumen, lo único que se debe tener en consideración en caso de requerir pasar una lambda como argumento de un método, es que una función anónima o lambda no deja de ser una implementación de una interfaz funcional, por lo que se puede tomar este concepto y aplicarlo a cualquier método que acepte una interfaz funcional como argumento, obteniendo de esta forma un código más limpio y conciso, e incluso aprovechando los métodos `default` y `static` que la interfaz pueda tener para realizar operaciones más complejas.