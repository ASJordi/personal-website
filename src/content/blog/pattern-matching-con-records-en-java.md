---
title: "Pattern Matching con Records en Java"
description: "Pattern Matching con Records en Java"
pubDate: "Apr 14 25"
heroImage: "../../assets/blog/images/post73/cover.webp"
tags: ["Java", "Pattern Matching"]
---

Un **record** es un tipo especial de clase inmutable que se utiliza habitualmente como un DTO (Data Transfer Object) para almacenar datos y transferirlos entre diferentes partes de una aplicación. Si te interesa saber más sobre records y pattern matching en Java puedes consultar los siguientes enlaces:

- [Records](https://asjordi.dev/blog/tag/Record/)
- [Pattern Matching](https://asjordi.dev/blog/pattern-matching-en-java/)

Un **record pattern** es un tipo especial de patrón que fue introducido formalmente a partir de la versión 21 de Java. Un _record_ se construye a partir de los componentes (fields) que se declaran en su definición. En el siguiente ejemplo, el record `Point` tiene dos componentes `x` e `y`:

```java
public record Point(int x, int y) { }
```

Los componentes o atributos del record permiten aplicar un nuevo concepto dentro del pattern matching, la **deconstrucción de un record** o **record deconstruction**. Sabemos que al utilizar el pattern matching con `instanceof` en caso de que el objeto sea una instancia de lo que estamos comparando, podemos declarar una variable y asignarle el valor del objeto automáticamente. En el caso de los records, podemos hacer lo mismo.

```java
Point o = new Point(0, 1);
if (o instanceof Point p) {
    System.out.println(p.x());
    System.out.println(p.y());
}
```

Podemos llevar este principio un paso más allá utilizando la deconstrucción del record en el mismo `instanceof`:

```java
Point o = new Point(0, 1);
if (o instanceof Point(int x, int y)) {
    System.out.println(x);
    System.out.println(y);
}
```

El _matched target_ o lo que se busca hacer coincidir sigue siendo la referencia a `o`. Lo que corresponde con un _record pattern_ del tipo `Point(int x, int y)`. En este caso se declaran dos variables o _pattern variables_: `x` e `y` respectivamente. Si `o` es una instancia de `Point`, entonces estas dos variables son creadas y se inicializan con los valores de `x` e `y` del propio record de forma automática.

Un patrón de record se construye utilizando el nombre del record, `Point` en este caso, y un patrón de tipo por cada atributo o componente que tenga el record. Por lo tanto, cuando se define `o instanceof Point(int x, int y)`, `int x` e `int y` son patrones de tipo, que se utilizan para hacer coincidir el primer y segundo componente del record `Point`. Considerar que en este caso, se define un patrón de tipo utilizando tipos primitivos.

> **Nota**. El nombre de las variables que se declaran en el patrón de tipo no tiene por qué coincidir con los nombres de los componentes del record. Lo único a considerar es que el tipo de la variable debe coincidir con el tipo del componente del record y el número de variables debe coincidir con el número de componentes del record, es decir, se sigue un orden respecto a los atributos y como están declarados en el record.

Un _record pattern_ se construye utilizando el constructor canónico del record, es decir, el constructor que es generado automáticamente por el compilador. Incluso si se crean otros constructores distintos al canónico, el patrón del record siempre utilizará la sintaxis del constructor canónico. Por lo tanto, el siguiente código no compilará:

```java
public record Point(int x, int y) {
    public Point(int x) {
        this(x, 0);
    }
}

Point o = new Point(0, 1);
// This doesn't compile
if (o instanceof Point(int x)) {}
```

Tal y como se mencionó anteriormente, el patrón de record se construye utilizando el constructor canónico del record. Por lo que es importante que al realizar la deconstrucción de un record, se utilicen las variables que se han declarado en el patrón de tipo.

## Inferencia de tipos en record patterns

El patrón de record también admite la inferencia de tipos. El tipo de cada uno de los atributos o componentes que se utiliza al escribir el patrón se puede inferir usando `var`. Como el matching de cada atributo es en realidad un patrón de tipos, se puede hacer matching de un tipo que sea una extensión del tipo real del atributo, en caso contrario se obtendrá un error de compilación.

```java
Point o = new Point(0, 1);
if (o instanceof Point(var x, var y)) {
    System.out.println(x);
    System.out.println(y);
}
```

En este caso, `var x` e `var y` son patrones de tipo que se utilizan para hacer coincidir el primer y segundo componente del record `Point`. La inferencia de tipos se realiza automáticamente, por lo que no es necesario especificar el tipo de las variables explícitamente.

## Usar con switch expressions

Podemos utilizar la deconstrucción de un record en un `switch expression`. Consideremos el siguiente record `Box` con un único atributo `o` de tipo `Object`:

```java
public record Box(Object o) { }
```

```java
Box o = new Box("Hello");

switch (o) {
    case Box(String s) -> System.out.println("Length: " + s.length());
    case Box(Integer i) -> System.out.println("Value: " + i);
    default -> System.out.println("Box contains something else");
}
```

En este caso, el `switch expression` verifica que `o` sea del tipo `Box`, y posteriormente verifica si el atributo es de un tipo en particular. Si `o` es una instancia de `Box`, entonces se verifica si el atributo es de tipo `String` o `Integer`. En caso de que `o` sea una instancia de `Box` y el atributo sea de tipo `String`, se imprime la longitud de la cadena. Si el atributo es de tipo `Integer`, se imprime el valor del entero. En caso contrario, se imprime un mensaje indicando que el `Box` contiene algo distinto.

La comprobación de tipos también verifica que el tipo del atributo coincida con el tipo del patrón de tipo. Si el tipo del atributo no coincide con el tipo del patrón de tipo, se obtendrá un error de compilación. Consideremos el siguiente ejemplo:

```java
public record Box(CharSequence o) { }

switch (o) {
    case Box(String s) -> System.out.println("Length: " + s.length());
    // Does not compile
    case Box(Integer i) -> System.out.println("Value: " + i);
    default -> System.out.println("Box contains something else");
}
```

## Boxing y unboxing

Actualmente, los patrones de record no soportan boxing y unboxing. Por lo tanto, no se pueden utilizar tipos primitivos en los patrones de record cuando los atributos del record son de un tipo de referencia. Consideremos el siguiente ejemplo:

```java
public record Point(Integer x, Integer y) { }

Point o = new Point(0, 1);
// Does not compile
if (o instanceof Point(int x, int y)) { }
```

> **Nota**. Puede que en futuras versiones de Java se añada soporte para boxing y unboxing en los patrones de record, al menos en la versión 21 LTS no está soportado aún.

## Nested record patterns

Los patrones de record soportan el anidamiento de patrones. Es decir, se pueden utilizar patrones de record dentro de otros patrones de record. La inferencia de tipos también se aplica a los patrones de record anidados. Consideremos los siguientes dos records `Point` y `Circle`:

```java
public record Point(double x, double y) { }

public record Circle(Point center, double radius) { }
```

```java
Circle o = new Circle(new Point(0, 0), 1);

if (o instanceof Circle(Point(var x, var y), var r)) {
    System.out.println("Circle with center at (" + x + ", " + y + ") and radius " + r);
}
```

Al momento de realizar la deconstrucción anidada de un record, se debe tener en cuenta que el orden de los patrones de tipo debe coincidir con el orden de los componentes (atributos) del record. En este caso, el patrón de record `Circle(Point(var x, var y), var r)` se utiliza para hacer coincidir:

- El primer patrón de tipo `Point(var x, var y)`, que es un record que a su vez tiene dos componentes `x` e `y`.
- El segundo patrón de tipo `var r`, que se utiliza para hacer coincidir el segundo componente del record `Circle` de tipo `double`.

En caso de que no se necesite deconstruir un componente del record que a su vez sea un record, se puede utilizar un patrón de tipo que no deconstruya el record anidado. Consideremos el siguiente ejemplo:

```java
Circle o = new Circle(new Point(0, 0), 1);

if (o instanceof Circle(Point p, var r)) {
    System.out.println("Circle with center at (" + p.x() + ", " + p.y() + ") and radius " + r);
}
```

Pasa lo mismo si se utiliza un `switch expression` con patrones de record anidados:

```java
Circle o = new Circle(new Point(0, 0), 1);

switch (o) {
    case Circle(Point(var x, var y), var r) -> System.out.println("Circle");
    default -> System.out.println("Unknown");
}
```

## Unnamed variables

En los patrones de record, se pueden utilizar variables sin nombre o _unnamed variables_ para ignorar los valores de los componentes del record que no se utilizarán posteriormente. Las variables sin nombre se representan con un guion bajo `_`. Considerar que esta característica está disponible a partir de la versión 22 de Java. Tomemos como ejemplo los records `Point` y `Circle`:

```java
Circle o = new Circle(new Point(0, 0), 1);

if (o instanceof Circle(Point(var _, var _), var r)) {
    System.out.println("Circle with radius " + r);
}
```

O incluso podemos evitar el uso de `var _` y colocar directamente `_`:

```java
Circle o = new Circle(new Point(0, 0), 1);

if (o instanceof Circle(Point(_, _), var r)) {
    System.out.println("Circle with radius " + r);
}
```

En este caso, el patrón de record `Circle(Point(_, _), var r)` se utiliza para hacer coincidir el record `Circle` y se ignoran los valores de los componentes `x` e `y` del record `Point`. Por lo que, no se declaran variables para estos componentes y tampoco es posible acceder a ellos posteriormente.

## Ejemplo

Ahora que ya hemos visto como funciona el **pattern matching con records** y algunas características que podemos utilizar a la par, como la deconstrucción de un record, la inferencia de tipos, el uso de _unnamed variables_ y el anidamiento de patrones de record, vamos a ver un ejemplo completo que englobe todas estas características. Consideremos la siguiente estructura de records que implementan la interfaz `Figura`:

```java
public interface Figura { }

public record Rectangulo(double ancho, double alto) implements Figura { }

public record Cuadrado(double lado) implements Figura { }

public record Triangulo(double base, double altura) implements Figura { }
```

Consideremos el siguiente método `calcularArea` que calcula el área de una figura `f` que implementa la interfaz `Figura`. En principio se verifica si `f` es una instancia de `Rectangulo`, `Cuadrado` o `Triangulo` y se calcula el área correspondiente usando `instanceof`.

```java
public static double calcularArea(Figura f) {
    if (f instanceof Rectangulo r) {
        return r.ancho * r.alto;
    } else if (f instanceof Cuadrado c) {
        return c.lado * c.lado;
    } else if (f instanceof Triangulo t) {
        return t.base * t.altura / 2;
    } else {
        throw new IllegalArgumentException("Figura desconocida");
    }
}
```

Mejoremos el método `calcularArea` usando la deconstrucción de un record, y de esta forma evitar acceder a cada uno de los atributos desde el objeto como tal.

```java
public static double calcularArea(Figura f) {
    if (f instanceof Rectangulo(double ancho, double alto)) {
        return ancho * alto;
    } else if (f instanceof Cuadrado(double lado)) {
        return lado * lado;
    } else if (f instanceof Triangulo(double base, double altura)) {
        return base * altura / 2;
    } else {
        throw new IllegalArgumentException("Figura desconocida");
    }
}
```

En lugar de declarar el tipo específico de cada atributo del record, podemos utilizar la inferencia de tipos para simplificar el código.

```java
public static double calcularArea(Figura f) {
    if (f instanceof Rectangulo(var ancho, var alto)) {
        return ancho * alto;
    } else if (f instanceof Cuadrado(var lado)) {
        return lado * lado;
    } else if (f instanceof Triangulo(var base, var altura)) {
        return base * altura / 2;
    } else {
        throw new IllegalArgumentException("Figura desconocida");
    }
}
```

Ahora podemos mejorar aún más el método `calcularArea` utilizando un `switch expression` en lugar de un `if-else` y retornar el área de la figura correspondiente directamente, considerando que este debe ser exhaustivo respecto a los tipos.

```java
public static double calcularArea(Figura f) {
    return switch (f) {
        case Rectangulo(var ancho, var alto) -> ancho * alto;
        case Cuadrado(var lado) -> lado * lado;
        case Triangulo(var base, var altura) -> base * altura / 2;
        default -> throw new IllegalArgumentException("Figura desconocida");
    };
}
```

Como una nota adicional, podemos evitar declarar un caso por default si utilizamos un `sealed interface` para la interfaz `Figura`, de este modo se garantizan implícitamente todos los subtipos posibles de `Figura`.

```java
public sealed interface Figura { }
```

```java
public sealed interface Figura permits Rectangulo, Cuadrado, Triangulo { }
```

Agreguemos dos nuevos records que implementan la interfaz `Figura`:

```java
public record Circulo(Punto p, double radio) implements Figura { }

public record Punto(double x, double y) { }
```

Ahora podemos modificar el método `calcularArea` para que soporte el cálculo del área de un círculo, además de la deconstrucción de un record anidado y el uso de _unnamed variables_, ya que no necesitamos acceder a las coordenadas del punto para calcular el área del círculo.

```java
public static double calcularArea(Figura f) {
    return switch (f) {
        case Rectangulo(var ancho, var alto) -> ancho * alto;
        case Cuadrado(var lado) -> lado * lado;
        case Triangulo(var base, var altura) -> base * altura / 2;
        case Circulo(Punto(_, _), var radio) -> Math.PI * radio * radio;
        default -> throw new IllegalArgumentException("Figura no soportada");
    };
}
```

## Conclusión

El pattern matching con records es una característica muy interesante y poderosa que se ha introducido en versiones recientes, y no solo permite mejorar la forma en que se escribe y estructura el código, sino que también permite un nuevo enfoque de programación orientada a datos dentro de Java en conjunto con características más modernas como los records, sealed classes, y el propio pattern matching.