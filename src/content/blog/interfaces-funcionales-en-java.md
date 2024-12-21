---
title: "Interfaces funcionales en Java"
description: "Interfaces funcionales en Java"
pubDate: "Mar 10 25"
heroImage: "../../assets/blog/images/post68/cover.webp"
tags: ["Java", "Lambdas", "Streams"]
---

## Introducción

Una interfaz funcional es una interfaz que tiene un único método abstracto o Single Abstract Method (SAM), aunque también puede tener métodos default o estáticos con implementaciones concretas. La anotación `@FunctionalInterface` se utiliza para marcar estas interfaces, aunque no es obligatorio, es una buena práctica para que el compilador pueda verificar que cumple con la definición. Este tipo de interfaces son la base para las expresiones lambda y referencias de métodos en Java.

Existen 4 interfaces funcionales que pueden considerarse como base: `Consumer`, `Supplier`, `Predicate` y `Function`, no son las únicas, ya que el paquete donde se encuentran, `java.util.function` contiene alrededor de 40 interfaces funcionales, algunas son especializaciones de las anteriores, pero todas son útiles en diferentes contextos.

Las clases anónimas son implementaciones de interfaces o de clases abstractas que se crean directamente en el lugar donde se necesitan. En algunas ocasiones nos permiten implementar más de un método abstracto, aunque existe el caso donde solo es necesario implementar uno solo, por ejemplo, si usamos una interfaz funcional. Puede que esta no sea la manera más clara de realizarlo, ya que la sintaxis es un poco más verbosa.

Una alternativa es utilizar expresiones lambda, lo que nos permite escribir de manera más concisa y clara el código. Ambas alternativas son equivalentes, pero en versiones recientes de Java, resulta más cómodo utilizar expresiones lambda, considerando que la interfaz debe tener un único método abstracto, que será el que se implementará usando la expresión lambda.

```java
public class Main {
    public static void main(String[] args) {
        Runnable r = new Runnable() {
            @Override
            public void run() {
                System.out.println("Hello, world!");
            }
        };
        
        Runnable r2 = () -> System.out.println("Hello, world!");
    }
}
```

Si aún no estás familiarizado con las clases anónimas y expresiones lambda, te recomiendo leer los siguientes artículos que he escrito anteriormente al respecto:

- [Clases anónimas](https://asjordi.dev/blog/clases-anonimas-en-java/)
- [Expresiones lambda](https://asjordi.dev/blog/funciones-anonimas-lambda-en-java/)
- [Pasar lambda como argumento de un método](https://asjordi.dev/blog/pasar-funciones-lambda-como-argumentos-de-metodos-en-java/)

## `Supplier<T>`

Esta interfaz no recibe ningún argumento y retorna un valor del tipo `T`. Es decir, una expresión lambda que implementa esta interfaz no toma argumentos y retorna un objeto, por lo que se puede utilizar como un atajo para cosas fáciles de recordar, mientras no sean confusas. Es una interfaz muy simple, no tiene métodos default ni estáticos, solo el método abstracto `get`.

```java
@FunctionalInterface
public interface Supplier<T> {
    T get();
}
```

Por ejemplo, podemos crear un `Supplier<String>` que retorne un `String` con el mensaje `Hello, world!`.

```java
Supplier<String> s = () -> "Hello, world!";
```

Podemos usar un `Supplier<Integer>` para retornar un nuevo objeto cada vez que se invoque el método `get`.

```java
import java.util.Random;
import java.util.function.Supplier;

public class Main {
    public static void main(String[] args) {
        Random r = new Random();
        Supplier<Integer> newRandom = () -> r.nextInt(100);

        for (int i = 0; i < 10; i++) {
            int value = newRandom.get();
            System.out.println(value);
        }
    }
}
```

Las expresiones lambda se utilizan para procesar datos en una aplicación, por lo que, la rapidez con la que se pueda ejecutar una lambda es importante. De esta manera, cualquier ciclo en la CPU que puede ahorrarse, representa una optimización significativa en una aplicación real. Siguiendo este principio, la API del JDK ofrece especializaciones optimizadas de las interfaces funcionales.

Si retomamos el ejemplo anterior, vemos que él `Supplier<Integer>` retorna un objeto de tipo `Integer`, pero el método `Random.nextInt()` retorna un `int`, así que pasan las siguientes cosas:

- El `int` retornado por `Random.nextInt()` se envuelve en un objeto `Integer` usando auto-boxing.
- Después este `Integer` es desempaquetado para obtener el `int` original usando auto-unboxing.

Esto quiere decir que, cuando se usa auto-boxing se está creando un nuevo objeto que envuelve el valor primitivo, y al desempaquetar se obtiene el valor primitivo original. Este proceso no es gratis, la mayoría del tiempo el costo es mínimo comparado con otras cosas, por ejemplo, obtener datos de una base de datos o usar un servicio remoto. Pero en algunos casos, este tipo de costos no son aceptables, por lo que se deben evitar.

Como se mencionó antes, la buena noticia es que existen interfaces funcionales especializadas, por ejemplo, `IntSupplier` que es una especialización de `Supplier<Integer>`, pero en este caso, retorna un `int` directamente.

```java
@FunctionalInterface
public interface IntSupplier {
    int getAsInt();
}
```

Ahora podemos modificar el código anterior para usar un `IntSupplier` en lugar de un `Supplier<Integer`.

```java
import java.util.Random;
import java.util.function.IntSupplier;

public class Main {
    public static void main(String[] args) {
        Random r = new Random();
        IntSupplier newRandom = () -> r.nextInt(100);

        for (int i = 0; i < 10; i++) {
            int value = newRandom.getAsInt();
            System.out.println(value);
        }
    }
}
```

Para este caso en lugar de llamar al método `get()` llamamos al método `getAsInt()`, que retorna un `int` directamente. Al ejecutar este código se obtiene el mismo resultado, pero evitando el tiempo requerido para realizar el boxing / unboxing, lo que resulta en un mejor rendimiento.

Dentro del JDk tenemos cuatro de estas especializaciones, `IntSupplier`, `LongSupplier`, `DoubleSupplier` y `BooleanSupplier`, que son equivalentes a `Supplier<Integer>`, `Supplier<Long>`, `Supplier<Double>` y `Supplier<Boolean>` respectivamente.

## `Consumer<T>`

Esta interfaz es lo opuesto a `Supplier<T>`, recibe un argumento del tipo `T` y no retorna nada. Es decir, una expresión lambda que implementa esta interfaz toma un objeto y no retorna nada, por lo que se puede utilizar para realizar acciones con los objetos que recibe. Esta interfaz tiene un método abstracto y uno default, `accept` y `andThen` respectivamente.

```java
@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);
    
    // default and static methods
}
```

Podemos crear un `Consumer<String>` que solamente imprima por consola el valor recibido como argumento.

```java
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        Consumer<String> printer = s -> System.out.println(s);

        for (int i = 0; i < 10; i++) {
            printer.accept("i: " + i);
        }
    }
}
```

Supongamos que queremos imprimir enteros, podemos escribir un `Consumer<Integer>` que imprima el valor recibido.

```java
Consumer<Integer> printer = i -> System.out.println(i);`
```

Esta interfaz tiene 3 especializaciones para trabajar con tipos primitivos, `IntConsumer`, `LongConsumer` y `DoubleConsumer`, todas tienen los mismos dos métodos que `Consumer`, `accept` y `andThen`. Si usamos un `IntConsumer`, el método `accept` recibe un `int` y no un `Integer`, lo que evita el boxing / unboxing.

Respecto al método `andThen`, este método retorna un `Consumer` que ejecuta el método `accept` de la instancia actual y después el método `accept` de la instancia que se pasa como argumento. Básicamente, se encadenan dos `Consumer<T>` para ejecutarlos en secuencia.

```java
import java.util.function.IntConsumer;

public class Main {
    public static void main(String[] args) {
        IntConsumer printer = s -> System.out.println(s);
        int value = 64;
        printer.accept(value);
    }
}
```

### `BiConsumer<T, U>`

Existe otra variante de `Consumer<T>`, que es `BiConsumer<T, U>`, recibe dos argumentos de los tipos `T` y `U` y no retorna nada. Esta interfaz tiene el mismo método abstracto que `Consumer`, `accept`, con la variante de que recibe dos argumentos en lugar de uno, y `andThen` que tiene la misma funcionalidad que en `Consumer`.

```java
@FunctionalInterface
public interface BiConsumer<T, U> {
    void accept(T t, U u);

    // default and static methods
}
```

Podemos crear una implementación para imprimir por consola una cantidad determinada de números aleatorios usando una instancia de `Random` y un `BiConsumer<Random, Integer>`.

```java
import java.util.Random;
import java.util.function.BiConsumer;

public class Main {
    public static void main(String[] args) {
        BiConsumer<Random, Integer> printRandomNumber = (r, n) -> {
            for (int i = 0; i < n; i++) {
                System.out.println(r.nextInt(n));
            }
        };

        printRandomNumber.accept(new Random(), 10);
    }
}
```

Existen 3 especializaciones de esta interfaz para trabajar con tipos primitivos: `ObjIntConsumer<T>`, `ObjLongConsumer<T>` y `ObjDoubleConsumer<T>`.

## `Predicate<T>`

La interfaz funcional `Predicate<T>` se utiliza para evaluar una condición sobre un objeto de tipo `T` y retornar un valor booleano. Esta interfaz es especialmente útil para filtrar elementos de una colección o al trabajar con `Streams`. Tiene un método abstracto, `test(T t)`, que recibe un objeto y retorna un valor booleano, `true` si la condición se cumple y `false` en caso contrario. Esta interfaz es un poco más complicada, dado que tiene métodos default y estáticos.

```java
@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t);

    // default and static methods
}
```

Podemos crear un `Predicate<String>` que evalúe si la longitud de la cadena es mayor a 5, para usarlo solo necesitamos llamar al método `test`.

```java
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        Predicate<String> greaterThan5 = s -> s.length() > 5;
        boolean isGreaterThan5 = greaterThan5.test("Hello World");
        System.out.println(isGreaterThan5);
    }
}
```

Supongamos que necesitamos evaluar valores enteros, entonces podríamos escribir algo como esto.

```java
Predicate<Integer> isGreaterThan10 = i -> i > 10;
```

Lo mismo que ocurre para `Consumer` y `Supplier`, también ocurre para `Predicate`, por lo que existen especializaciones para trabajar con tipos primitivos, `IntPredicate`, `LongPredicate` y `DoublePredicate`, los tres tienen el mismo método abstracto `test` y una serie de métodos default y estáticos.

```java
import java.util.function.IntPredicate;

public class Main {
    public static void main(String[] args) {
        IntPredicate isGreaterThan10 = i -> i > 10;
        int value = 5;
        System.out.println(isGreaterThan10.test(value));
    }
}
```

Respecto a los métodos default y estáticos, estos permiten encadenar varios `Predicate` para evaluar una condición más compleja. Por ejemplo, podemos crear un `Predicate<String>` que evalúe si la longitud de la cadena es mayor a 5 y si la cadena contiene la letra `a`.

```java
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        Predicate<String> greaterThan5 = s -> s.length() > 5;
        Predicate<String> containsA = s -> s.contains("a");
        var res = greaterThan5.and(containsA).test("Hello World");
        System.out.println(res);
    }
}
```

### `BiPredicate<T, U>`

Existe otra variante de `Predicate<T>`, que es `BiPredicate<T, U>`, que recibe dos argumentos de los tipos `T` y `U` y retorna un valor booleano. Esta interfaz tiene el mismo método abstracto que `Predicate`, `test`, con la variante respecto al número de argumentos. Para esta interfaz no existen especializaciones para trabajar con tipos primitivos.

```java
@FunctionalInterface
public interface BiPredicate<T, U> {
    boolean test(T t, U u);
}
```

Podemos crear una implementación para evaluar si la longitud de una cadena es mayor a un número determinado.

```java
import java.util.function.BiPredicate;

public class Main {
    public static void main(String[] args) {
        BiPredicate<String, Integer> greaterThan = (s, n) -> s.length() > n;
        System.out.println(greaterThan.test("Hello, world!", 5));
    }
}
```

## `Function<T, R>`

La interfaz funcional `Function<T, R>` se utiliza para transformar un objeto de tipo `T` en un objeto de tipo `R`. Tiene un método abstracto `apply(T t)`, que recibe un objeto y retorna otro objeto. Esta interfaz también tiene métodos default y estáticos. Puede verse como una interfaz de uso general que puede resultar útil para ciertos casos, pero se debe considerar si es posible usar una interfaz más específica.

```java
@FunctionalInterface
public interface Function<T, R> {
    R apply(T t);

    // default and static methods
}
```

Esta interfaz se usa con la API Stream para mapear objetos de un tipo a otro, por ejemplo, un `Predicate<T>` puede verse como un tipo de función especializada que retorna un valor booleano. 

Por ejemplo, se puede implementar un `Function<String, Integer>` que retorne la longitud de una cadena dada.

```java
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<String, Integer> length = s -> s.length();
        int lengthResult = length.apply("Hello, world!");
        System.out.println(lengthResult);
    }
}
```

Aquí vemos el boxing / unboxing en acción nuevamente. Primero, el método `length()` retorna un `int`, pero la función retorna un `Integer`, por lo que se realiza un auto-boxing. Después el resultado es asignado a una variable de tipo `int`, por lo que se realiza un auto-unboxing. Este comportamiento puede importar o no, según sea el caso.

Existen especializaciones para `Function<T, R>` que son más complejas que las vistas para `Consumer`, `Supplier` y `Predicate`, dado que, se definen funciones especializadas tanto para el tipo del argumento como para el tipo de retorno. Tanto el argumento de entrada como el de salida pueden ser de cuatro tipos diferentes:

- De tipo parametrizado `T`.
- De tipo primitivo `int`.
- De tipo primitivo `long`.
- De tipo primitivo `double`.

Hay una interfaz especial que extiende de `Function<T, T>`, que es `UnaryOperator<T>`. El concepto de operador unario se utiliza para nombrar las funciones que toman un argumento de un tipo determinado y devuelven un resultado del mismo tipo. Existen 16 tipos de funciones de este tipo dentro del paquete `java.util.function`.

| Parámetro | T                   | int                 | long                 | double               |
|-----------|---------------------|---------------------|----------------------|----------------------|
| T         | UnaryOperator<T>    | IntFunction<T>      | LongFunction<T>      | 	DoubleFunction<T>   |
| int       | ToIntFunction<T>    | IntUnaryOperator    | LongToIntFunction    | 	DoubleToIntFunction |
| long      | ToLongFunction<T>   | IntToLongFunction   | LongUnaryOperator    | DoubleToLongFunction |
| double    | ToDoubleFunction<T> | IntToDoubleFunction | LongToDoubleFunction | DoubleUnaryOperator  |

Todos los métodos abstractos de estas interfaces siguen la misma convención: se nombran según el tipo devuelto de esa función.

- `apply()` para las funciones que retornan un tipo genérico `T`.
- `applyAsInt()` para las funciones que retornan un tipo primitivo `int`.
- `applyAsLong()` para las funciones que retornan un tipo primitivo `long`.
- `applyAsDouble()` para las funciones que retornan un tipo primitivo `double`.

Para ejemplificar el uso de `UnaryOperator<T>`, podemos transformar los elementos de una lista usando el método `replaceAll()` de la clase `List` que recibe un `UnaryOperator<T>`. Usamos esta interfaz dado que, una vez declarada una lista no se puede cambiar su tipo, pero sí se pueden cambiar los elementos que contiene, cosa que no se puede realizar utilizando `Function<T, R>`.

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.UnaryOperator;

public class Main {
    public static void main(String[] args) {
        List<String> strings = Arrays.asList("hello", "world", "java");
        UnaryOperator<String> toUpperCase = word -> word.toUpperCase();
        strings.replaceAll(toUpperCase);
        System.out.println(strings);
    }
}
```

El código anterior modifica los elementos de la lista `strings` para que sean todos en mayúsculas, al ejecutarse se obtiene como resultado la lista `["HELLO", "WORLD", "JAVA"]`.

### `BiFunction<T, U, R>`

Existe otra variante de `Function<T, R>`, que es `BiFunction<T, U, R>`, la cual recibe dos argumentos de los tipos `T` y `U` y retorna un objeto de tipo `R`. Esta interfaz tiene un único método abstracto, `apply(T t, U u)`, que recibe dos argumentos y retorna un objeto. Esta interfaz también tiene métodos default y estáticos.

```java
@FunctionalInterface
public interface BiFunction<T, U, R> {
    R apply(T t, U u);
    
    // default and static methods
}
```

Creamos una expresión lambda implementando esta interfaz para obtener el índice de un `String` dentro de otro `String`.

```java
import java.util.function.BiFunction;

public class Main {
    public static void main(String[] args) {
        BiFunction<String, String, Integer> findWordInSentence = (word, sentence) -> sentence.indexOf(word);
        System.out.println(findWordInSentence.apply("world", "Hello world!"));
    }
}
```

`UnaryOperator<T>` tiene una variante que recibe dos argumentos, `BinaryOperator<T>`, que extiende de `BiFunction<T, U, R>`. Dentro del paquete `java.util.function` existen más especializaciones de `BiFunction<T, U, R>`: `IntBinaryOperator`, `LongBinaryOperator` y `DoubleBinaryOperator`, `ToIntBiFunction<T>`, `ToLongBiFunction<T> `y `ToDoubleBiFunction<T>`.

## Conclusión

El paquete `java.util.function` se ha vuelto fundamental en Java, ya que todas las expresiones lambda que se usan con colecciones o streams se basan en estas interfaces. Este paquete contiene muchas interfaces y encontrar la adecuada puede ser un poco complicado. Por lo que podemos considerar lo siguiente:

- Existen 4 categorías de interfaces funcionales: los suppliers, consumers, predicates y functions.
- Algunas de estas interfaces tiene versiones que aceptan dos argumentos en lugar de uno.
- La mayoría de estas interfaces tienen versiones especializadas para trabajar con tipos primitivos.
- Hay extensiones para `Function<T, R>` y `BiFunction<T, U, R>` para los casos donde todos los tipos sean iguales.

En general, estas son las bases para trabajar con expresiones lambda y streams en Java, por lo que es importante conocerlas y saber cuándo utilizarlas. Si bien es cierto que las expresiones lambda y las referencias de métodos son más fáciles de usar, es relevante conocer las interfaces funcionales que se están utilizando de fondo. Para más información puedes consultar la [documentación oficial](https://docs.oracle.com/en/java/javase/23/docs/api/java.base/java/util/function/package-summary.html).