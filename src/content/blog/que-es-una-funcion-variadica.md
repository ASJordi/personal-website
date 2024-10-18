---
title: "Funciones variádicas en Java"
description: "¿Funciones que aceptan un número indefinido de argumentos?"
pubDate: "Nov 18 24"
heroImage: "../../assets/blog/images/post45/cover.webp"
tags: ["Java", "Fundamentos"]
---

> Una función variádica es aquella que acepta un número indefinido de parámetros.

Veamos cúal es la razón de ser de estas funciones dentro de Java. Supongamos que tenemos un método `summation` que recibe dos números enteros y devuelve la suma de ambos.

```java
public static int summation(int a, int b) {
    return a + b;
}
```

Si queremos sumar tres números, tendríamos que sobrecargar el método `summation` para que acepte tres parámetros.

```java
public static int summation(int a, int b, int c) {
    return a + b + c;
}
```

¿Qué pasa si queremos sumar cuatro números? Nuevamente se debe sobrecargar el método `summation`.

```java
public static int summation(int a, int b, int c, int d) {
    return a + b + c + d;
}
```

Como podemos ver esto no es escalable, ya que en cada ocasión que se necesite un número distinto de parámetros se tendría que sobrecargar el método nuevamente. En este punto se podría considerar el pasar como parámetro un arreglo de enteros, pero esto no hace más que envolver los parámetros reales y hacer que el método dependa ahora de un nuevo tipo de dato de forma explícita.

Para estos casos es que existen las **funciones variádicas**, para aceptar un número indefinido de parámetros sin la necesidad de envolverlos en otro tipo de estructura a la vista. Es importante considerar que internamente Java lo que hace es crear un arreglo con los parámetros que se le pasan a la función variádica, por lo que podemos trabajar con métodos propios de un arreglo.

Una función variádica se declara de la misma manera que cualquier función normal, pero como parámetros el último o el único parámetro que tenga tendrá que cumplir el siguiente formato: `tipoDato... nombreVariable`. Dentro de la forma en que se declara lo único que cambia es la adición de los tres puntos `...` después del tipo de dato. En algunos lenguajes a este tipo de parámetro se le conoce como *varargs*. Veamos como queda el método `summation` como una función variádica.

```java
public static int summation(int... numbers) {
    int sum = 0;

    for (int number : numbers) {
        sum += number;
    }

    return sum;
}
```

Ahora podemos sumar cualquier cantidad de números sin la necesidad de sobrecargar el método `summation`, con la única restricción que todos deben ser del mismo tipo de dato.

```java
System.out.println(summation(1, 2)); // 3
System.out.println(summation(1, 2, 3)); // 6
System.out.println(summation(1, 2, 3, 4)); // 10
System.out.println(summation(2, 8, 16, 32, 64, 128, 256, 512, 1024, 2048)); // 4090
```

Antes se mencionó que internamente Java maneja los parámetros de una función variádica como un arreglo, es decir, los envuelve dentro de un arreglo, y esto nos permite trabajar con métodos propios de un arreglo. Por ejemplo, se puede utilizar el método `sum` de la clase `Arrays` para sumar todos los elementos del arreglo dentro del método `summation`.

```java
public static int summation(int... numbers) {
    return Arrays.stream(numbers).sum();
}
```

Considerando lo anterior, a una función variádica también se le puede pasar como parámetro un arreglo del tipo de datos que acepta por curioso que parezca. De este modo Java ya no tiene que envolver los parámetros en un arreglo, ya que se le está pasando directamente como argumento un arreglo.

```java
int[] numbers = {1, 2, 3, 4, 5};
var sum = summation(numbers);
System.out.println(sum); // 15
```

Pero que pasa si el método `summation` por alguna razón necesita un segundo parámetro del tipo `double`, además de los _n_ números enteros que ya puede recibir al declararse como una función variádica. En este caso se tendría que declarar el método `summation` con los parámetros adicionales que necesita y al final el parámetro variádico o *varargs*, tal y como se muestra a continuación.

```java
public static double summation(double factor, int... numbers) {
    double sum = 0;

    for (int number : numbers) {
        sum += number;
    }

    return factor * sum;
}
```

De esta manera se puede pasar un número double como primer parámetro y los números enteros que se deseen sumar como parámetros adicionales y Java automáticamente sabrá que el primer parámetro es de tipo `double` y los siguientes son de tipo `int`, considerar que el parámetro variádico siempre debe ser el último parámetro de la función, y no el primero, ya que generaría un error de compilación, incluso el propio IDE nos indicaría lo siguiente: `varargs parameter must be the last parameter`.

```java
var res = summation(2.0, 1, 2, 3, 4, 5);
System.out.println(res); // 30.0
```

En conclusión, si se requiere alguna función de utilidad para realizar algún tipo de operaciones con un número indefinido de parámetros y no queremos pasar un arreglo o una lista explícitamente, se puede considerar el uso de una función variádica. Estas resultan útiles, permiten que el código sea más limpio y escalable, y evitan la sobrecarga de métodos.
