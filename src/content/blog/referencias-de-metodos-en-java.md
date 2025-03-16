---
title: "Referencias de métodos en Java"
description: "Referencias de métodos en Java"
pubDate: "Mar 17 25"
heroImage: "../../assets/blog/images/post69/cover.webp"
tags: ["Java", "Lambdas", "Streams"]
---

Una expresión lambda no es más que la implementación del único método abstracto (SAM) de una interfaz funcional, también se les conoce a estas como _métodos o funciones anónimas_, en general son eso, dado que, no tienen un nombre, se pueden utilizar en cualquier parte del código y guardarse en un campo o variable, así como pasarse como argumento de un método o constructor e incluso ser devueltas por un método como tal.

En ocasiones, el único propósito de una expresión lambda es invocar un método específico en alguna parte del código, por ejemplo, un `Consumer<String>` que solo imprime por consola el valor que recibe. 

```java
Consumer<String> printer = s ->  System.out.println(s);
```

Escrito de esta manera, la expresión lambda solo es una referencia al método `println()`, en este tipo de casos, es donde las **referencias de métodos** toman sentido.

Una **referencia de método** permite simplificar el uso de expresiones lambda al referirse directamente a un método existente en lugar de escribir explícitamente la lógica, de esta forma, el código anterior puede escribirse de la siguiente manera.

```java
Consumer<String> printer = System.out::println;
```

Existen 4 formas en Java de utilizar las referencias de métodos:

- Referencia a un método estático
- Referencia a un método de instancia de un objeto específico
- Referencia a un método de instancia de un objeto arbitrario de un tipo específico
- Referencia a un constructor

El ejemplo anterior equivale a una referencia a un método de instancia de un objeto arbitrario de un tipo específico. Es probable que el propio IDE nos recomiende utilizar una referencia de método en una expresión lambda de manera automática.


## Referencia a un método estático

Se utiliza para referirse a métodos estáticos de una clase y su sintaxís es `Clase::metodoEstatico`. Por ejemplo, el método `parseInt` de la clase `Integer` nos permite convertir una cadena en un entero, recibe un parámetro y retorna un valor entero, considerando esto, podemos escribir una expresión lambda del tipo `Function<String, Integer>` para envolver este comportamiento.

```java
Function<String, Integer> parseInt = s -> Integer.parseInt(s);
```

Podemos ver que esta expresión incluye lógica de más, y no deja de ser una referencia directa al método `parseInt`, por lo que, puede escribirse como una referencia de método.

```java
Function<String, Integer> parseInt = Integer::parseInt;
```

Una referencia a un método estático puede tomar más de un argumento, por ejemplo, al utilizar el método `max()` de la clase `Math`.

```java
IntBinaryOperator max = (a, b) -> Math.max(a, b);
```

La expresión lambda nuevamente hace referencia a un método estático, por lo que se puede escribir de la siguiente manera usando una referencia de método.

```java
IntBinaryOperator max = Math::max;
```

## Referencia a un método de instancia de un objeto específico

Se usa cuando se tiene una instancia específica de un objeto y se quiere llamar a uno de sus métodos, su sintaxis es `objeto::metodoDeInstancia`. Supongamos que tenemos la siguiente cadena de caracteres.

```java
String cadena = "hola mundo";
```

Sí queremos usar un método propio del objeto, por ejemplo, un `Supplier<Integer>` que nos devuelva la longitud de la cadena llamando al método `length()`, podemos escribir una expresión lambda de la siguiente manera.

```java
Supplier<Integer> len = () -> cadena.length();
```

Nuevamente, solo se está haciendo referencia a un método que pertenece a la instancia del objeto, por lo que se puede simplificar de la siguiente manera.

```java
Supplier<Integer> len = cadena::length;
```

En caso de que el método acepte parámetros, por ejemplo, `contains()`, solo es cuestión de definir la expresión adecuada, este método acepta un parámetro de tipo `String` y devuelve un valor booleano, por lo que podemos utilizar un `Predicate<String>`.

```java
Predicate<String> contiene = (str) -> cadena.contains(str);
```

El método `contains()` es propio de la instancia `cadena`, por lo que podemos simplificar la expresión de la siguiente manera.

```java
Predicate<String> contiene = cadena::contains;
```

## Referencia a un método de instancia de un objeto arbitrario de un tipo particular

Se usa cuando no se tiene una instancia específica, pero se está trabajando con un tipo de clase y se quiere llamar a un método de instancia en objetos de ese tipo, su sintaxis es `Clase::metodoDeInstancia`.

Cuando utilizamos este tipo de referencias es necesario considerar que, como se está tomando la referencia a partir de la clase y no es algo estático, no existe una instancia como tal a la cúal le pertenezca, por lo que, es necesario pasar una instancia como parámetro extra, independientemente de los parámetros que requiera el método que se esté usando. Consideremos el método `length()` de la clase `String`.

```java
Function<String, Integer> len = (str) -> str.length();
Function<String, Integer> lenString = String::length;
```

Ambas formas de escribir la expresión son equivalentes, ya que no se está llamando a un método estático o propio de una instancia, es necesario especificar el tipo al que pertenece, en este caso un `String`. Para utilizar la expresión solo es necesario pasar como parámetro una instancia de ese tipo.

```java
Function<String, Integer> lenString = String::length;
String cadena = "hola mundo";
System.out.println(lenString.apply(cadena));
// 10
```

Pasa lo mismo en caso de que el método necesite parámetros, por ejemplo, `repeat()` que necesita un parámetro del tipo `int` que indica el número de veces que se repetirá la cadena que será devuelta, por lo que, la expresión necesitará 3 parámetros, uno para el tipo de la instancia, otro para el parámetro que recibe como tal el método, y por último para el tipo que devuelve.

```java
BiFunction<String, Integer, String> repetir = (str, n) -> str.repeat(n);
BiFunction<String, Integer, String> repetirString = String::repeat;
```

Ahora podemos utilizar nuestra expresión para comprobar que efectivamente se repite la cadena.

```java
BiFunction<String, Integer, String> repetirString = String::repeat;
String cadena = "Java";
System.out.println(repetirString.apply(cadena, 2));
// JavaJava
```

## Referencia a un constructor

Se usa para crear objetos llamando a un constructor, su sintaxis es `Clase::new`. Dependiendo si el constructor recibe parámetros o no, se debe definir el tipo de expresión lambda que se utilizará. Por ejemplo, si se tiene un `Supplier<Random>` que devuelve una instancia de `Random` se puede escribir de la siguiente manera.

```java
Supplier<Random> newRandom = () -> new Random();
```

De nuevo, lo único que realiza la expresión es invocar a otro método, en este caso un constructor sin parámetros, por lo que podemos usar una referencia de método.

```java
Supplier<Random> newRandom = Random::new;
```

En caso de que el constructor acepte parámetros, solo es necesario modificar el tipo de expresión lambda considerando los parámetros que recibe y el tipo que devuelve.

```java
Function<Long, Random> newRandom = Random::new;
```

## Ejemplos

A manera de ejemplo, vamos a considerar algunos casos donde se utilicen las referencias de métodos en combinación con otras características de Java. Para lo cúal vamos a considerar el siguiente record del tipo `Person` que contiene dos atributos, `name` y `lastName`.

```java
record Person(String name, String lastName) {}
```

Si tenemos un `List<Person>` y queremos obtener una lista que contenga solo el `name` de cada uno de los objetos, podemos usar una _referencia de método de instancia de un objeto arbitrario de un tipo particular_ dentro de un `Stream` usando `map`, donde cada elemento será la instancia de la cúal se obtendrá el atributo, para posteriormente almacenarlo en una nueva lista.

```java
public class Main {

    record Person(String name, String lastName) {}

    public static void main(String[] args) {
        List<Person> persons = Arrays.asList(
                new Person("John", "Doe"),
                new Person("Jane", "Doe"),
                new Person("Bob", "Lee")
        );

        var names = persons.stream()
                .map(Person::name)
                .collect(Collectors.toList());

        System.out.println(names);
        // Output: [John, Jane, Bob]
    }
}
```

Si queremos una expresión lambda que nos devuelva una instancia del record `Person`, considerando que necesitamos pasar dos parámetros, podemos realizarlo de la siguiente manera usando una _referencia a un constructor_.

```java
import java.util.function.BiFunction;

public class Main {

    record Person(String name, String lastName) {}

    public static void main(String[] args) {
        BiFunction<String, String, Person> personFactory = Person::new;
        var person = personFactory.apply("John", "Doe");
        System.out.println(person);
        // Output: Person[name=John, lastName=Doe]
    }
}
```

En caso de que necesitemos obtener el atributo `name` de un objeto específico en mayúsculas podemos usar una _referencia a un método de instancia de un objeto específico_.

```java
import java.util.function.Supplier;

public class Main {

    record Person(String name, String lastName) {}

    public static void main(String[] args) {
        var john = new Person("John", "Doe");
        Supplier<String> toUpperCase = john.name::toUpperCase;
        System.out.println(toUpperCase.get());
        // Output: JOHN
    }
}
```

Supongamos que tenemos un método estático que nos permite obtener las iniciales de un objeto `Person` de la forma `X.Y`, donde `X` representa la primera letra del atributo `name` y `Y` del atributo `lastName` respectivamente, podemos utilizar una _referencia a un método estático_ para lograrlo.

```java
import java.util.function.Function;

public class Main {

    record Person(String name, String lastName) {}

    public static String getInitials(Person person) {
        return person.name().charAt(0) + "." + person.lastName().charAt(0) + ".";
    }

    public static void main(String[] args) {
        var john = new Person("John", "Doe");
        Function<Person, String> initials = Main::getInitials;

        System.out.println(initials.apply(john));
        // Output: J.D.
    }
}
```

## Conclusiones

Las referencias de métodos son una forma de simplificar el uso de expresiones lambda al referirse directamente a un método existente en lugar de escribir explícitamente la lógica, resultando en un código más limpio y fácil de leer. Considerando que existen 4 formas de utilizarlas de acuerdo al tipo de operación a realizar, y su completa integración con la API Stream de Java, se convierten en una herramienta poderosa para trabajar con colecciones de datos.

Si quieres saber más al respecto, puedes consultar los posts existentes en el blog respecto a expresiones lambda y Streams en el siguiente [enlace](https://asjordi.dev/blog/tag/Lambdas).
