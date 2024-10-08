---
title: "var en Java"
description: "¿Cómo se usa var en Java?"
pubDate: "Oct 23 24"
heroImage: "../../assets/blog/images/post38/cover.webp"
tags: ["Java"]
---

`var` es una construcción que se introdujo en el JDK 10, se utiliza para crear variables en las cuales no se especifica el tipo de dato, sino que se deja que el compilador infiera el tipo de dato de la variable. Esto es algo que se conoce como **inferencia de tipos**.

`var` no es una _palabra clave_ o _keyword_ de Java, si no que es un **nombre reservado** del lenguaje, a consecuencia de que fue introducida posteriormente y existe la posibilidad de que se haya usado como nombre de alguna variable, clase, método, etc. en código previo a su introducción.

> La **inferencia de tipos** es el proceso en el cual en lugar de declarar una variable con su tipo de dato, se deja que el compilador determine el tipo de dato de la variable de acuerdo al valor que se le asigna, esto es algo que se puede ver al crear una lista y omitir el tipo de dato dentro del operador diamante, tal y como se muestra a continuación:

```java
// Omite el tipo de dato dentro del operador diamante
List<Integer> list = new ArrayList<>();

// Usa el tipo de dato dentro del operador diamante
List<Integer> list = new ArrayList<Integer>();
```

## ¿Cómo se usa var en Java?

Para declarar una variable con `var` se hace de la siguiente manera:

```txt
var nombreDeLaVariable = valor;
```

```java
var n = "John";
```

En este caso el compilador infiere que la variable `n` es de tipo `String` porque se le asigna un valor de tipo `String`, y se omite el tener que declarar el tipo de dato, es decir, no se tiene que hacer lo siguiente:

```java
String n = "John";
```

Si se cambia el valor de la variable por `10` ahora el compilador infiere que la variable `n` es de tipo `int`:

```java
var n = 10;
```

De igual manera, si se cambia el valor de la variable por `10.0` ahora el compilador infiere que la variable `n` es de tipo `double`:

```java
var n = 10.0;
```

Incluso si se cambia el valor de la variable por una instancia de `Random` ahora el compilador infiere que la variable `n` es de tipo `Random`:

```java
var n = new Random();
```

## Limitaciones de var

- Cuando se declaran atributos dentro de una clase, no se puede utilizar `var` para declararlos, ya que el compilador no puede inferir el tipo de dato de un atributo, por lo que se tiene que declarar el tipo de dato de manera explícita.

```java
public class Person {
    private var name; // Error
}
```

```java
public class Person {
    private String name;
}
```

- `var` no se puede utilizar para declarar parámetros de un método o función, ya que el compilador no puede inferir el tipo de dato de un parámetro, por lo que se tiene que declarar el tipo de dato de manera explícita.

```java
public void sayHello(var name) { // Error
    System.out.println("Hello " + name);
}
```

- Entre otras limitaciones, está el hecho que no se puede utilizar `var` al declarar una variable con un valor `null`, ya que por lo menos en Java, `null` no es un tipo de dato válido, y la inferencia de tipos no funciona en este caso.

```java
var y = null; // Error
```

- Tampoco podemos usar `var` para solamente declarar una variable sin inicializar, es necesario asignarle un valor a la variable al momento de declararla.

```java
var x; // Error
x = 10;
```

- Cuando se declaran varias variables del mismo tipo en una sola línea (declaraciones compuestas o compound declaration), no se puede utilizar `var`, en su defecto se debe utilizar una variable con el tipo de dato explícito.

```java
var x = 1, y = 10, z = 10; // Error
int x = 1, y = 10, z = 10;
```

- `var` no se puede utilizar para declarar lambdas, referencias a métodos o similares, por ejemplo:
 
```java
var plusOne = (int x) -> x + 1; // Error

// Se tiene que declarar de la siguiente manera
Function<Integer, Integer> plusOne = x -> x + 1;
```

En el resto de situaciones, `var` puede ser usado de forma normal, considerando que se debe usar a nivel local en el código y no a nivel de atributos de una clase, parámetros de un método, etc. Por ejemplo:

```java
public class Main {

    public static void main(String[] args) {
        var fullName = fullName("Jonh", "Doe");
        System.out.println(fullName);
    }

    public static String fullName(String firstName, String lastName) {
        var fullName = firstName + " " + lastName;
        return fullName;
    }
    
}
```

```java
var names = new String[] { "John", "Jane", "Alice", "Bob" }; // inferred as String[]
var cities = Arrays.asList("Barcelona", "Madrid", "Paris", "London"); // inferred as List<String>
var numbers = List.of(1, 2, 3, 4, 5); // inferred as List<Integer>
```

Algo a considerar, es que en algunos casos al usar `var` se le puede restar legibilidad al código, ya que Java es un lenguaje donde a las variables se les asignan tipos de datos que se conocen de antemano, y al usar `var` se puede perder esa información, por lo que `var` se puede usar en situaciones donde se pueda inferir el tipo de dato de manera clara y no se pierda legibilidad en el código.

```java
// Ambas declaraciones son válidas y son del mismo tipo
var service = new RemoteUserService();
RemoteUserService service = new RemoteUserService();
```

> Es importante que no se confunda la inferencia de tipos con que Java sea un lenguaje fuertemente tipado. El hecho de usar `var` no convierte a la variable en una variable de tipo dinámico, sino que el compilador infiere el tipo de dato de la variable en tiempo de compilación. Por lo que no se puede declarar una variable de tipo `int` y luego asignarle un valor de tipo `String`.

```java
var x = 5;
x = "Hello"; // Error
```