---
title: "Funciones anónimas lambda en Java"
description: "Funciones anónimas en Java"
pubDate: "Feb 17 25"
heroImage: "../../assets/blog/images/post65/cover.webp"
tags: ["Java", "Lambdas", "Streams"]
---

En Java, una función o método tiene un nombre, un tipo de retorno y una serie de parámetros que recibe, además de un cuerpo que contiene las instrucciones que se ejecutarán al invocar la función. Las funciones en Java son métodos que son declarados dentro de una clase o interfaz, y que pueden ser invocados mediante una instancia de la clase que las contiene o de manera directa si son estáticas.

Desde Java 8, se introdujeron las funciones anónimas, también conocidas como **lambdas**. En su forma más simple, una **función anónima** es una función que no tiene nombre ni identificador. Es decir, no se declaran en una clase o interfaz, sino que se definen en el lugar donde se necesita. Principalmente, una función anónima se utiliza para pasarse como parámetro de un método, también se puede utilizar como cualquier valor asignándola a una variable, pero teniendo en consideración que siempre será una función.

## Sintaxis de una función anónima

La sintaxis de una función anónima en Java es la siguiente:

```java
(parametros) -> { cuerpo de la función }
```

Donde:

- `parametros`: Son los parámetros que recibe la función y no es necesario colocar el tipo de dato de los parámetros, ya que Java lo infiere automáticamente, cuando se tiene un solo parámetro se pueden omitir los paréntesis.
- `->`: Es el operador de flecha que separa los parámetros del cuerpo de la función.
- `cuerpo de la función`: Contiene el código que se ejecutará al invocar la función, puede ser una sola línea o un bloque de código.

Por ejemplo, si se desea crear una función que reciba dos números enteros y devuelva la suma de ambos, la función anónima se vería de la siguiente manera:

```java
(a, b) -> {
    return a + b;
};
```

Si la función solo debe realizar una única operación, se pueden omitir las llaves y la palabra reservada `return`, quedando de la siguiente manera:

```java
(a, b) -> a + b;
```

En este punto aún no compila el código, aunque la sintaxis es correcta, si se intenta asignar a una variable, por ejemplo, utilizando `var` se puede observar que la inferencia de tipos no funciona, incluso si se le asigna un tipo a los parámetros de la función, el compilador no puede inferir el tipo de la función, y es algo que tiene sentido dentro de Java.

```java
var func = (int a, int b) -> a + b;
```

Al final, cuando declaramos una función anónima no se está simplemente definiendo una función, sino que se está implementando una interfaz mediante una clase anónima escrita de una forma muy concisa. De esta manera se puede decir que una función anónima es una forma de implementar una interfaz funcional, por lo que solo se podrán definir funciones anónimas para aquellos tipos que sean compatibles con una interfaz funcional.

## Interfaces funcionales

Dentro de Java existen ciertas interfaces con la anotación `@FunctionalInterface`, que son interfaces que tienen un solo método abstracto a implementar (aunque pueden tener métodos default y estáticos), estas interfaces son conocidas como **interfaces funcionales** y se pueden utilizar tanto con funciones anónimas como con clases anónimas, e incluso podemos definir interfaces funcionales propias con la anotación `@FunctionalInterface` y considerando la restricción de un solo método abstracto (Single Abstract Method - SAM).

Por ejemplo, la interfaz `Runnable` es una interfaz funcional que tiene un solo método abstracto `run()`, por lo que puede implementarse de la siguiente manera:

```java
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hola mundo");
    }
};
```

```java
Runnable r = () -> System.out.println("Hello, world!");
```

Podemos utilizar este enfoque en muchas situaciones, por ejemplo, al utilizar un `Thread` para ejecutar un proceso en segundo plano, se puede pasar una función anónima que implemente la interfaz `Runnable`:

```java
public static void main(String[] args) {
    Runnable r = () -> System.out.println("Hello, world!");

    new Thread(r).start();
}
```

Existen muchas interfaces funcionales dentro de Java y de acuerdo con su semántica, se pueden utilizar en determinadas situaciones. El paquete `java.util.function` contiene muchas interfaces funcionales que hacen que una función anónima se comporte como las funciones lambda de cualquier otro lenguaje de programación. Por ejemplo, se puede utilizar la interfaz `Consumer` para definir una función que no devuelva nada, pero que acepte un argumento:

```java
public static void main(String[] args) {
    Consumer<String> consumer = (s) -> System.out.println(s);
    consumer.accept("Hola mundo");
}
```

Con `Supplier` se puede definir una función que no acepte argumentos, pero que devuelva un valor:

```java
public static void main(String[] args) {
    Supplier<Integer> supplier = () -> 10;
    var result = supplier.get();
}
```

Si se requiere fabricar una función anónima para cualquier propósito, se tiene la interfaz `Function`, que acepta un argumento y devuelve un valor:

```java
public static void main(String[] args) {
    Function<String, Integer> f = s -> s.length();
    var len = f.apply("Java");
}
```

## Conclusión

En general, está es la manera en que se puede trabajar con funciones anónimas dentro de Java, así como la manera en que son manejadas, donde básicamente son una forma de implementar interfaces funcionales de una manera más concisa y legible. Se pueden utilizar en cualquier lugar donde se requiera una interfaz funcional, como parámetros de métodos, asignaciones de variables, entre otros. Considerar que el paquete `java.util.function` contiene muchas interfaces funcionales que de acuerdo al contexto pueden resultar muy útiles, por lo que es recomendable revisar la [documentación oficial](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/package-summary.html) de Java para conocer todas las interfaces funcionales disponibles.