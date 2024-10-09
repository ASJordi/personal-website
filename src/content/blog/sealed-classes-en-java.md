---
title: "Sealed Classes en Java"
description: "¿Qué son las sealed classes en Java y cómo se utilizan?"
pubDate: "Oct 28 24"
heroImage: "../../assets/blog/images/post39/cover.webp"
tags: ["Java"]
---

Las **sealed classes** son una característica que se introdujo de manera previa en el JDK 15 y formalmente en el JDK 17. Una **sealed class** es una clase que no puede ser extendida por clases que no estén permitidas explícitamente (en la declaración de la clase), por lo que el número de subclases es limitado y conocido de antemano.

Tienen como propósito permitir un control más preciso sobre la jerarquía de herencia, así como facilitar el modelado de dominios donde se conocen todas las subclases posibles, y mejorar la seguridad y mantenibilidad del código.

La diferencia entre una **sealed class** y una clase del tipo `final`, es que esta última no puede ser extendida por ninguna clase, mientras que una **sealed class** puede ser extendida por un número limitado de clases.

## Declaración de una sealed class

Supongamos que tenemos dos clases, una clase `Shape` y una clase `Circle`, ambas son clases normales, por lo que `Shape` puede ser extendida por cualquier clase.

```java
public class Shape {
    // ...
}

public class Circle extends Shape {
    // ...
}
```

Si utilizamos la palabra clave `final` en la clase `Shape`, entonces no podrá ser extendida por ninguna clase.

```java
public final class Shape {
    // ...
}

public class Circle extends Shape { // Error
    // ...
}
```

Ahora, sí queremos que la clase `Shape` sea extendida solo por clases determinadas (por ejemplo, `Circle` y `Square`), entonces podemos declararla como una **sealed class**.

```java
public sealed class Shape permits Circle, Square {
    // ...
}
```

Analizando la declaración anterior, vemos que es necesario colocar `sealed` antes de la palabra `class` para indicar que es una **sealed class**. Luego, se utiliza la palabra `permits` seguida de una lista de clases que pueden extender la clase actual, en el ejemplo anterior, solo las clases `Circle` y `Square` pueden extender la clase `Shape`.

Pasa lo mismo si se trabaja con una clase del tipo `abstract`, es decir, una clase que no puede ser instanciada, pero que puede ser extendida por otras clases.

```java
public sealed abstract class Shape permits Circle, Square {
    // ...
}
```

También se puede aplicar este concepto a interfaces.

```java
public sealed interface Shape permits Circle, Square {
    // ...
}
```

> **Nota**: Las subclases permitidas deben estar dentro del mismo módulo o paquete que la clase **sealed**, de lo contrario se mostrará un mensaje de error.

## Clases permitidas

Una vez que se ha declarado una clase como `sealed` y se han específicado las clases permitidas, al momento de extender de la clase `Shape` por una clase permitida ( al colocar `extends Shape`) el IDE mostrará un mensaje de error similar a este _Modifier 'sealed', 'non-sealed' or 'final' expected_, ¿Qué significa esto?.

Se debe tener en consideración que cada una de las clases permitidas (subclases) debe ser declarada con alguna de las siguientes palabras clave:

- `final`: Indica que la clase no puede ser extendida.
- `sealed`: Indica que la clase es una **sealed class** y que tiene subclases permitidas.
- `non-sealed`: Indica que la clase no es una **sealed class** y que puede ser extendida por cualquier clase.

Para poner en práctica lo anterior, trabajemos con la clase `Shape` y las clases `Circle`, `Square` y `Triangle` para ver cómo se pueden declarar las clases permitidas de acuerdo a lo mencionado anteriormente.

```java
public sealed class Shape permits Circle, Square, Triangle {
    // ...
}
```

### Clase `Circle` - `final`

Si queremos que la clase `Circle` sea del tipo `final` y por consecuencia no pueda ser extendida, entonces se debe declarar de la siguiente manera:

```java
public final class Circle extends Shape {
    // ...
}
```

De esta manera se evita que la clase `Circle` sea extendida por cualquier otra clase.

### Clase `Square` - `sealed`

Si queremos que la clase `Square` sea del tipo `sealed` y que tenga subclases permitidas que puedan extender de ella, entonces se debe declarar de la siguiente manera:

```java
public sealed class Square extends Shape permits SquareChild1, SquareChild2 {
    // ...
}
```

Para este ejemplo, cada una de las clases permitidas (`SquareChild1` y `SquareChild2`) se declaran del tipo `final` para que no puedan ser extendidas por ninguna otra clase.

```java
public final class SquareChild1 extends Square {
    // ...
}

public final class SquareChild2 extends Square {
    // ...
}
```

Si se quisiera que estas clases a su vez puedan ser extendidas por más clases, entonces se deberían de declarar como `sealed` o que puedan ser extendidas por cualquier clase con `non-sealed`.

### Clase `Triangle` - `non-sealed`

Para el caso de la clase `Triangle` al declararse como `non-sealed` se permite que esta clase pueda ser extendida por cualquier otra clase, sin la necesidad de especificar las clases permitidas.

```java
public non-sealed class Triangle extends Shape {
    // ...
}
```

Por ejemplo, si se crea la clase `TriangleChild` que extiende de `Triangle`, no se mostrará ningún mensaje de error.

```java
public class TriangleChild extends Triangle {
    // ...
}
```

En este punto es importante considerar que si se declara una clase como `non-sealed` se _"rompe"_ de cierta manera el propósito de las **sealed classes**, ya que se permite que esta clase sea extendida por cualquier otra clase y no se limita el número de subclases permitidas.

## ¿Un `record` puede ser una sealed class?

Por su parte, un **record** no puede ser del tipo `sealed` dado que este ya es del tipo `final` y no puede ser extendido por ninguna otra clase. Pero lo que si se puede hacer es declarar un **record** como permitido en una **interfaz** del tipo `sealed` (considerar que un record no puede extender de una clase, solo implementar interfaces). Por ejemplo, si se tiene un record llamado `Rectangle` y una interfaz `Shape` del tipo `sealed`, se puede declarar a `Rectangle` como permitido en la interfaz `Shape` y de esta manera `Rectangle` podrá implementar la interfaz `Shape` y todos los métodos que esta interfaz contenga.

```java
public sealed interface Shape permits Rectangle {
    // ...
}

public record Rectangle() implements Shape {
    // ...
}
```

## ¿Qué pasa con las clases internas?

Si una clase declarada como `sealed` tiene clases internas (anidadas o inner classes), se da por hecho que estas clases pertenecen a la clase principal y, por lo tanto, no es necesario declararlas como permitidas. Por ejemplo, se tiene la clase `Animal` declarada como `sealed` y a su vez tiene como clases internas a `Dog` y `Cat`, estas clases no necesitan ser declaradas como permitidas, pero deben extender de la clase principal y ser del tipo `final`, `sealed` o `non-sealed`.

```java
public sealed class Animal {

    public final class Dog extends Animal { }

    public final class Cat extends Animal { }

}
```

## Conclusiones

Las **sealed classes** son una forma de limitar una jerarquía de clases a un número finito de subclases permitidas, aunque hemos visto, que si se declara una clase como `non-sealed` se pierde un poco el propósito o al declararse una subclase como `sealed` se puede extender aún más esta jerarquía.

Es importante considerar de que al declarar una clase como `sealed` esto solo hace referencia a quiénes pueden extender de ella, pero no limita la creación de instancias de la clase principal, ni modifica la semántica de la clase, es decir, no se modifica el comportamiento interno de la clase.