---
title: "Pattern Matching en Java"
description: "Del instanceof al Pattern Matching en Java"
pubDate: "Apr 07 25"
heroImage: "../../assets/blog/images/post72/cover.webp"
tags: ["Java", "Pattern Matching"]
---

## Introducción

Si el tema de **pattern matching** te resulta nuevo, puede que lo relaciones con el uso de expresiones regulares. Las expresiones regulares son una forma de pattern matching que se utiliza para analizar cadenas de texto, por lo que es un buen punto de partida para entender el pattern matching en Java. Consideremos el siguiente código:

```java
public static void main(String[] args) {
    String str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Nullam ex ligula, imperdiet semper tortor dictum, condimentum pulvinar eros. " +
            "In sed ligula sed tellus vehicula accumsan eget vel mauris. " +
            "Nam ut purus vel sem fermentum dictum ut sodales nulla. " +
            "Aenean et pretium massa. " +
            "Donec ultricies scelerisque massa. " +
            "Vivamus id bibendum eros, ut ullamcorper dolor.";

    Pattern pattern = Pattern.compile("\\btellus\\b");
    Matcher matcher = pattern.matcher(str);

    while (matcher.find()) {
        String group = matcher.group();
        int start = matcher.start();
        int end = matcher.end();
        System.out.println("Se ha encontrado la palabra " + group + " en la posición " + start + " y acaba en la posición " + end);
    }
}
```

Tenemos la cadena de texto `str` que es analizada con la expresión regular `\\btellus\\b`. Esta expresión comienza y termina con `\b`. Este carácter tiene un significado especial dentro de las expresiones regulares, ya que indica el inicio o el final de una palabra. Para este caso en particular, estamos buscando la palabra `tellus` en la cadena de texto. Si ejecutamos el código, obtendremos la siguiente salida:

```
Se ha encontrado la palabra tellus en la posición 152 y acaba en la posición 158
```

Este resultado nos indica que hay una única ocurrencia de la palabra `tellus` en la cadena de texto, y que esta comienza en la posición 152 y acaba en la posición 158. El pattern matching en las expresiones regulares funciona de la siguiente manera:

1. Coincide con un patrón dado; en este caso, la palabra `tellus`.
2. Después de encontrar el patrón, se puede obtener información adicional sobre la coincidencia, como la posición de inicio y fin de la coincidencia.

Hay tres conceptos que se deben tener en cuenta a lo largo de este post, y que son fundamentales en el pattern matching:

- Lo que se necesita hacer coincidir; esto se llama **matched target**. En el ejemplo anterior, es la cadena de texto `str`.
- Con qué se hace la comparación; esto se llama **pattern**. En el ejemplo anterior, es la expresión regular `\\btellus\\b`.
- El resultado de la comparación; esto se llama **match result**. En el ejemplo anterior, es el índice de inicio y fin de la coincidencia.

## ¿Qué es el pattern matching?

El **pattern matching** en Java es una característica que simplifica y mejora la legibilidad del código al realizar verificaciones de tipos y desestructuraciones en objetos. Se introdujo gradualmente a partir de la versión 16.

El pattern matching permite escribir código más conciso al combinar:

- **Verificación de tipos** (`instanceof`).
- **Asignación de una variable** con un tipo específico si la verificación de tipo es exitosa.

## instanceof

El operador `instanceof` se utiliza para verificar si un objeto es una instancia de una clase, interfaz o subclase. Si la verificación es exitosa, se puede hacer un **casting** del objeto a la clase o interfaz correspondiente. Consideremos las siguientes clases, donde `Animal` es la clase base y, `Perro` y `Gato` son subclases de `Animal`:

```java
static class Animal {
    void hacerSonido() {
        System.out.println("Hace un sonido");
    }
}

static class Perro extends Animal {
    void hacerSonido() {
        System.out.println("Ladra");
    }
}

static class Gato extends Animal {
    void hacerSonido() {
        System.out.println("Maulla");
    }
}
```

Ahora podemos crear un método que reciba un objeto del tipo `Object` y verifique si es una instancia de `Perro` o `Gato`:

```java
public static void comprobar(Object o) {
    if (o instanceof Perro) {
        System.out.println("Es un perro");
    } else if (o instanceof Gato) {
        System.out.println("Es un gato");
    } else {
        System.out.println("Es un animal");
    }
}
```

Para comprobar el funcionamiento del método y el operador `instanceof`, podemos hacer lo siguiente:

```java
Perro perro = new Perro();
comprobar(perro);
```

Obtenemos como salida `Es un perro`. Ahora podemos utilizar esta implementación para realizar un casting del objeto a la clase correspondiente y llamar al método `hacerSonido`:

```java
public static void comprobar(Object o) {
    if (o instanceof Perro) {
        Perro perro = (Perro) o;
        perro.hacerSonido();
    } else if (o instanceof Gato) {
        Gato gato = (Gato) o;
        gato.hacerSonido();
    } else {
        System.out.println("Es un animal");
    }
}
```

Esto funciona tal y como se espera, pero que pasaría si agregamos una comprobación al principio del método para verificar si el objeto es una instancia de `Animal`:

```java
public static void comprobar(Object o) {
    if (o instanceof Animal) {
        System.out.println("Es un animal");
    } else if (o instanceof Perro) {
        Perro perro = (Perro) o;
        perro.hacerSonido();
    } else if (o instanceof Gato) {
        Gato gato = (Gato) o;
        gato.hacerSonido();
    } else {
        System.out.println("No es un animal");
    }
}
```

En este caso a pesar de que sabemos que el objeto es una instancia de `Perro`, la comprobación de `Animal` se ejecuta primero, y, por lo tanto, la salida será `Es un animal`. Tiene sentido, ya que `Perro` es una subclase de `Animal`. Por lo que si queremos realizar este tipo de comprobaciones, debemos considerar los casos más específicos primero, y los más generales al final.

```java
public static void comprobar(Object o) {
    if (o instanceof Perro) {
        Perro perro = (Perro) o;
        perro.hacerSonido();
    } else if (o instanceof Gato) {
        Gato gato = (Gato) o;
        gato.hacerSonido();
    } else if (o instanceof Animal) {
        System.out.println("Es un animal");
    } else {
        System.out.println("No es un animal");
    }
}
```

## Pattern Matching para instanceof

Hay varias maneras de extender el pattern matching, la primera se denomina **Pattern matching for instanceof**. Esta característica permite combinar la verificación de tipos y la asignación de una variable con un tipo específico si la verificación de tipo es exitosa. Consideremos el siguiente ejemplo:

```java
public static void print(Object o) {
    if (o instanceof String s) System.out.println("This is a String of length " + s.length());
    else System.out.println("This is not a String");
}
```

Comencemos describiendo los tres elementos clave del pattern matching:

- **Matched target**: Es cualquier objeto de cualquier tipo. Es el operador de la izquierda de `instanceof`, en este caso `o`.
- **Pattern**: Es un tipo seguido de la variable que se asignará si la verificación de tipo es exitosa. Es el operador a la derecha de `instanceof`, en este caso `String s`. El tipo puede ser una clase, clase abstracta o una interfaz.
- **Match result**: El resultado de la coincidencia es una nueva referencia al objeto que se asigna a la variable `s`. Este solamente se crea si el _matched target_ coincide con el _pattern_. La variable tiene el tipo correspondiente al _pattern_, en este caso `String`. La variable `s` se puede llamar **pattern variable** del _pattern_. Algunos patrones pueden tener más de una variable.

En el ejemplo anterior, la variable `o` es el elemento que se necesita hacer coincidir, el _matched target_. El _pattern_ es la declaración `String`, y el resultado de la coincidencia es la variable `s`. Si el objeto `o` es una instancia de `String`, la variable `s` se asigna con el objeto `o`. Si el objeto `o` no es una instancia de `String`, la variable `s` no se crea y el bloque `else` se ejecuta.

El patrón `String s` se llama _type pattern_, porque verifica el tipo del _matched target_. Dado que `String` implementa la interfaz `CharSequence`, podemos utilizar el patrón `CharSequence s` en lugar de `String s`:

```java
public static void print(Object o) {
    if (o instanceof CharSequence s) System.out.println("This is a CharSequence of length " + s.length());
    else System.out.println("This is not a CharSequence");
}
```

```java
public static void main(String[] args) {
    print("Hello"); // This is a String of length 5
    print(5); // This is not a String
    print('c'); // This is not a String
}
```

### Usar la variable del patrón (_pattern variable_)

Podemos utilizar la variable `s` en cualquier parte que tenga sentido. El propio bloque `if` es el primer lugar donde se puede utilizar esta variable. El siguiente método verifica si el objeto es una instancia de `String` y, posteriormente si no es una cadena vacía. Vemos que la variable `s` se utiliza en la expresión booleana justo después del operador `&&`, esto tiene sentido porque la expresión booleana es evaluada solamente si la primera parte es `true`, es decir, si el objeto es una instancia de `String` se crea la variable `s` y se evalúa la expresión booleana.

```java
public void print(Object o) {
    if (o instanceof String s && !s.isEmpty()) {
        int length = s.length();
        System.out.println("This object is a non-empty string of length " + length);
    } else {
        System.out.println("This object is not a string.");
    }
}
```

Hay casos en los que el código comprueba el tipo real de una variable, y si no es el tipo esperado, se salta el resto del código. Por ejemplo:

```java
public void print(Object o) {
    if (!(o instanceof String)) {
        return;
    }
    String s = (String)o;
    // do something with s
}
```

Podemos escribir este código de otra forma aprovechando el pattern matching para instanceof:

```java
public void print(Object o) {
    if (!(o instanceof String s)) {
        return;
    }

    System.out.println("This is a String of length " + s.length());
}
```

La variable `s` esta disponible fuera del bloque `if` siempre y cuando el objeto `o` sea una instancia de `String`. Si el objeto `o` no es una instancia de `String`, la variable `s` no se crea y el bloque `return` se ejecuta.

En ocasiones el propio compilador nos indica que el código fallará al utilizar el pattern matching para `instanceof`. Por ejemplo, el siguiente código no compila:

```java
Double pi = Math.PI;
if (pi instanceof String s) {
    // this will never be true!
}
```

El compilador sabe que la clase `String` es del tipo `final`, por lo que no hay manera de que `pi` sea una instancia de `String`.

### Código más limpio con Pattern Matching for instanceof

Hay muchos lugares donde el uso del pattern matching para `instanceof` puede hacer que el código sea más limpio y legible. Por ejemplo, tenemos la clase `Point` que tiene dos atributos `x` e `y`, y el método `equals()` que compara dos objetos de tipo `Point`:

```java
public class Point {
    private int x;
    private int y;
    
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Point)) {
            return false;
        }
        Point point = (Point) o;
        return x == point.x && y == point.y;
    }
}
```

Esta es una manera clásica de escribir el método `equals()`, incluso puede ser generada por el propio IDE. Podemos reescribir este método utilizando el pattern matching para `instanceof`, lo que hace que el código sea más limpio y legible:

```java
public boolean equals(Object o) {
    return o instanceof Point point &&
            x == point.x &&
            y == point.y;
}
```

## Pattern Matching para switch

El pattern matching se puede utilizar con `switch statements` o `switch expressions`. Esto nos permite hacer coincidir un _matched target_ con varios patrones a la vez. Hasta ahora los patrones (_patterns_) son patrones de tipo, al igual que en el pattern matching para `instanceof`. Para este caso el _matched target_ es el valor que se evalúa en él `switch`. Existen varios patrones en este escenario, cada caso del `switch` es por sí mismo un patrón que sigue la sintaxis descrita en la sección anterior. Consideremos el siguiente código:

```java
Object o = 21;
String formatted = null;
if (o instanceof Integer i) {
    formatted = String.format("int %d", i);
} else if (o instanceof Long l) {
    formatted = String.format("long %d", l);
} else if (o instanceof Double d) {
    formatted = String.format("double %f", d);
} else {
    formatted = String.format("Object %s", o.toString());
}
```

Podemos ver que contiene tres tipos de patrones (_type patterns_), uno por cada `if`. El pattern matching con `switch` nos permite simplificar este código:

```java
Object o = 21;
String formatter = switch(o) {
    case Integer i -> String.format("int %d", i);
    case Long l -> String.format("long %d", l);
    case Double d -> String.format("double %f", d);
    default -> String.format("Object %s", o.toString());
};
```

El pattern matching con switch no solo hace que el código sea más legible, sino que también lo hace más eficiente. La evaluación de una declaración `if-else` es proporcional a la cantidad de casos o ramificaciones que tiene, duplicar la cantidad de ramificaciones duplicaría el tiempo de evaluación. La evaluación de un switch no depende de la cantidad de casos. De esta forma podemos decir que, la complejidad de la declaración if es O(n), mientras que la complejidad de un switch es O(1).

Que un `switch` acepte el pattern matching por sí mismo no es una extensión propia del pattern matching, sino una nueva característica del switch, que acepta un patrón como caso.

> Los casos deben ser exhaustivos en caso de utilizar un switch expression, es decir, deben cubrir todos los posibles valores del _matched target_, o simplemente agregar un caso `default`.

## Guarded Patterns

En el caso del _pattern matching for instanceof_ sabemos que la variable del patrón solo se crea si el objeto coincide con el patrón y puede ser utilizada en una expresión booleana inmediatamente después del operador `&&`.

```java
Object object = "Hello";
if (object instanceof String s && !s.isEmpty()) {
    int length = s.length();
    System.out.println("This object is a non-empty string of length " + length);
}
```

Esto funciona bien en una sentencia `if`, porque el argumento de la sentencia es de tipo booleano. En una expresión switch, no podemos hacer esto, por lo tanto, no podemos escribir lo siguiente:

```java
Object object = "Hello";
String formatter = switch(o) {
    // This doesn't work
    case String s && !s.isEmpty() -> String.format("Non-empty string %s", s);
        case Object o -> String.format("Object %s", o.toString());
};
```

El pattern matching para switch se ha ampliado para permitir que se agregue una expresión booleana después del patrón de tipo. Esta expresión se denomina **guard**. Un **guarded pattern** es un patrón seguido de una expresión booleana, que se evalúa si el objeto coincide con el patrón. Para esto se utiliza la cláusula `when` seguida de la expresión booleana. Consideremos el siguiente ejemplo:

```java
public static void main(String[] args) {
    Object o = "Hello";
    String formatter = switch(o) {
        case String s when !s.isEmpty() -> String.format("Non-empty string %s", s);
        default -> String.format("Object %s", o.toString());
    };

    System.out.println(formatter); // Non-empty string Hello
}
```

Esta etiqueta de caso extendida se denomina _guarded case label_. La expresión `String s when !s.isEmpty()` es un tipo de esta etiqueta, que está formada por un patrón de tipo y una expresión booleana.

## Conclusiones

El pattern matching es una característica muy interesante que actualmente se puede utilizar usando la palabra clave `instanceof`, `switch expressions` y `extended for loop`. Soporta dos tipos de patrones, patrones de tipo (_type patterns_) y patrones de registro (_record patterns_). Con respecto al pattern matching aplicado a records, es un tema que se trata en el siguiente post. El pattern matching aún tiene características que se están desarrollando y que se espera que estén disponibles en futuras versiones de Java.
