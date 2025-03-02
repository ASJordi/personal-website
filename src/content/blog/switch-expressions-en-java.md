---
title: "Switch Expression en Java"
description: "Switch expression en Java"
pubDate: "Mar 24 25"
heroImage: "../../assets/blog/images/post70/cover.webp"
tags: ["Java", "Fundamentos"]
---

La palabra clave `switch` representa una estructura de control de flujo que permite evaluar una expresión y ejecutar un bloque de código dependiendo del valor de la expresión. En ocasiones, puede ser una alternativa a una serie de instrucciones `if-else` anidadas, aunque también es el origen de muchos errores de programación si no se maneja correctamente.

A partir de la versión 14 de Java se introdujo una sintaxis más conveniente llamada **switch expression**, motivada por los siguientes aspectos:

- La estructura switch por defecto es del tipo fall-through (caída), lo que significa que si no se incluye una instrucción `break`, la ejecución continúa con la siguiente instrucción, y es una causa común de errores.
- El bloque switch es tratado como un bloque de código, lo cual puede ser un impedimento en la definición de variables.
- La estructura switch es una sentencia, lo que significa que no puede ser utilizada en una expresión, ni asignar su valor a una variable, o retornar un valor.

Ambas sintaxis son válidas en Java, tanto la de **switch statement** (tradicional) como la de **switch expression**. Consideremos el siguiente ejemplo con la estructura tradicional, donde de acuerdo a la cadena de texto que representa un día de la semana, se determina la longitud de la cadena y se asigna a una variable:

```java
String day = "MONDAY";
int length = 0;

switch (day) {
    case "MONDAY":
    case "FRIDAY":
    case "SUNDAY":
        length = 6;
        break;
    case "TUESDAY":
        length = 7;
        break;
    case "THURSDAY":
    case "SATURDAY":
        length = 8;
        break;
    case "WEDNESDAY":
        length = 9;
        break;
    default:
        length = -1;
        break;
}

System.out.println("Length of " + day + " is " + length);
```

Usando la estructura switch expression, el código anterior se simplifica de la siguiente manera:

```java
String day = "MONDAY";
int length = 0;

switch (day) {
    case "MONDAY", "FRIDAY", "SUNDAY" -> length = 6;
    case "TUESDAY" -> length = 7;
    case "THURSDAY", "SATURDAY" -> length = 8;
    case "WEDNESDAY" -> length = 9;
    default -> length = 0;
};

System.out.println("Length of " + day + " is " + length);
```

Aprovechando la estructura de **switch expression**, se puede simplificar aún más el código, eliminando la necesidad de declarar la variable `length` antes del switch, y asignando el valor directamente a la variable en la expresión switch:

```java
String day = "MONDAY";
int length = switch (day) {
    case "MONDAY", "FRIDAY", "SUNDAY" -> 6;
    case "TUESDAY" -> 7;
    case "THURSDAY", "SATURDAY" -> 8;
    case "WEDNESDAY" -> 9;
    default -> -1;
};

System.out.println("Length of " + day + " is " + length);
```

Con **switch expression** ahora se utiliza la sintaxis `case VALUE -> EXPRESSION;` en lugar de `case VALUE: STATEMENTS; break;`. De esta forma, solo el código que se encuentra después de la flecha `->` es ejecutado en caso de que el valor coincida con lo que se está evaluando, y no es necesario incluir la instrucción `break`.

Para evaluar múltiples valores en un solo caso, basta con separarlos por comas, tal y como se muestra en el ejemplo anterior.

El código a la derecha de `->` puede ser una sola expresión, un bloque o una sentencia throw, dado que es un bloque como tal, se pueden definir variables para el bloque en particular y no afectarán a las variables definidas fuera del switch.

## Generar un valor

La sentencia switch al utilizarse como expresión, permite retornar un valor y asignarlo a una variable. Consideremos otro ejemplo para este caso.

```java
int quarter = 0;

String quarterLabel = switch (quarter) {
    case 0 -> "Q1 - Winter";
    case 1 -> "Q2 - Spring";
    case 2 -> "Q3 - Summer";
    case 3 -> "Q3 - Summer";
    default -> "Unknown quarter";
};
```

En este caso, a la variable `quarterLabel` se le asigna el valor que retorna la expresión switch, que es una cadena de texto que representa el cuarto del año. En caso de que el valor de `quarter` no coincida con ninguno de los casos, se asigna el valor por defecto "Unknown quarter".

Si solamente existe una expresión o línea de código en el bloque, el valor producido por la expresión es retornado automáticamente, de lo contrario la sintaxis es un poco diferente y se necesita utilizar un bloque de código `{}`.

Tradicionalmente, se utiliza la palabra clave `return` para denotar el valor que se desea retornar en un bloque de código, pero al trabajar con switch expression se vuelve ambigua y genera un error de compilación. Consideremos el siguiente ejemplo para ilustrar este caso (no compila):

```java
public String convertToLabel(int quarter) {
    String quarterLabel = switch (quarter) {
        case 0  -> {
            System.out.println("Q1 - Winter");
            return "Q1 - Winter";
        }
        default -> "Unknown quarter";
    };
    return quarterLabel;
}
```

El bloque de código para el caso 0 necesita retornar un valor, se realiza utiliza `return`, pero al observar el código podemos notar que existen dos declaraciones de retorno, una en el bloque de código y otra en el método. Aquí es donde radica la ambigüedad: uno puede preguntarse cuál es la semántica del primer retorno. ¿Significa que el programa sale del método con este valor? ¿O sale de la sentencia switch? Esto da lugar a un código poco legible y propenso a errores.

Para resolver este problema se ha creado una nueva sintaxis, la palabra clave `yield`, que se utiliza para retornar un valor en cualquier bloque de código de un switch. El ejemplo anterior se puede reescribir de la siguiente manera:

```java
public String convertToLabel(int quarter) {
    String quarterLabel = switch (quarter) {
        case 0  -> {
            System.out.println("Q1 - Winter");
            yield "Q1 - Winter";
        }
        default -> "Unknown quarter";
    };
    return quarterLabel;
}
```

## Default case

Los casos por defecto permiten que el código gestione los casos en los que el valor del switch no coincide con ninguno de los casos definidos. Los casos de un switch expression deben ser exhaustivos, es decir, deben cubrir todos los posibles valores de la expresión. Al usar un switch tradicional, el caso por defecto es opcional, por lo que, si la evaluación no coincide con ninguno de los casos, el switch no hará nada silenciosamente, esto es un escenario propenso a errores difíciles de depurar, algo que se puede evitar con un caso por defecto.

En la mayoría de los casos, la exhaustividad se puede conseguir con un caso por defecto en ambas sintaxis. Esta gestión es una característica del switch expression que resulta útil al utilizar estructuras más complejas. Consideremos el siguiente ejemplo:

```java
String color = "red";

String colorType = switch (color) {
    case "red", "blue", "green" -> "Primary color";
    case "yellow", "cyan", "magenta" -> "Secondary color";
    default -> "Unknown color";
};
```

## Usar switch expression con : (colon)

Un switch expression puede usar la sintaxis tradicional con `case VALUE:` en lugar de `case VALUE -> EXPRESSION;`, es decir, usar dos puntos en lugar de la flecha. Para este caso se aplica la semántica "fall through" (caída), por lo que es necesario devolver un valor en cada caso usando la palabra clave `yield`. Consideremos el siguiente ejemplo:

```java
int quarter = 10;

String quarterLabel = switch (quarter) {
    case 0: yield "Q1 - Winter";
    case 1: yield "Q2 - Spring";
    case 2: yield "Q3 - Summer";
    case 3: yield "Q3 - Summer";
    default:
        System.out.println("Unknown quarter");
        yield "Unknown quarter";
};
```

## Retornar el valor de un switch expression

Al igual que podemos asignar el valor que retorna un switch expression a una variable, podemos retornarlo directamente en un método. Consideremos el siguiente ejemplo:

```java
public String convertToLabel(int quarter) {
    return switch (quarter) {
        case 0 -> "Q1 - Winter";
        case 1 -> "Q2 - Spring";
        case 2 -> "Q3 - Summer";
        case 3 -> "Q3 - Summer";
        default -> "Unknown quarter";
    };
}
```

## Usar switch expression sin asignar a una variable

Para los casos donde no se necesita retornar, ni asignar un valor a una variable, se puede usar tanto la sintaxis tradicional como la de switch expression. Consideremos el siguiente ejemplo:

```java
int quarter = 0;

switch (quarter) {
    case 0 -> System.out.println("Q1 - Winter");
    case 1 -> System.out.println("Q2 - Spring");
    case 2 -> System.out.println("Q3 - Summer");
    case 3 -> System.out.println("Q3 - Summer");
    default -> System.out.println("Unknown quarter");
}
```

En este caso, se evalúa el valor de `quarter` y se imprime en consola el cuarto del año correspondiente. Este también es un caso válido para usar un switch expression, independientemente de que su función principal pueda considerarse la de asignar un valor a una variable.

## Manejar valores nulos

En Java, los valores nulos pueden ser una fuente de errores, por lo que es importante manejarlos adecuadamente. A partir de la versión 17 se introdujo la capacidad de manejar valores nulos dentro de un switch expression, aspecto que inicialmente generaba un `NullPointerException` al intentar evaluar un valor nulo. Consideremos el siguiente ejemplo:

```java
String input = null;

String result = switch (input) {
    case "hola" -> "Saludaste en español";
    case "hello" -> "Saludaste en inglés";
    case null -> "No escribiste nada";
    default -> "No saludaste";
};

System.out.println(result); // No saludaste
```

El switch expression evalúa el valor de `input`, si el valor es `null` se ejecuta el caso `null`, pero en el caso de que no existan coincidencias y no se proporcione un caso para `null`, y el valor de `input` sea `null`, se lanzará un `NullPointerException`, independientemente de si se proporciona un caso por defecto o no. Para evitar este error, se puede utilizar un caso `null` explícito, como se muestra en el ejemplo anterior. Esta situación no es aplicable al trabajar con valores primitivos, ya que estos no pueden ser nulos.

## Conclusiones

El switch expression es una nueva característica que permite simplificar y ampliar la funcionalidad de la estructura tradicional de switch, permitiendo asignar el valor que retorna a una variable, retornarlo directamente en un método, o simplemente imprimirlo en consola. La nueva sintaxis es más concisa y legible, y evita errores comunes como la falta de la instrucción `break` en los casos, o la ambigüedad en la gestión de valores de retorno.

Ambas sintaxis son válidas en Java, y la elección de una u otra dependerá de las necesidades del problema a resolver. En general, se recomienda utilizar switch expression en lugar de la estructura tradicional, además de que resulta particularmente útil al trabajar con pattern matching en Java.