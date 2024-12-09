---
title: "Variables atómicas en Java"
description: "Variables atómicas en Java"
pubDate: "Mar 03 25"
heroImage: "../../assets/blog/images/post67/cover.webp"
tags: ["Java", "Concurrencia", "Atomic"]
---

Durante este post veremos el propósito de las clases que forman parte del paquete `java.util.concurrent.atomic` dentro de Java y cómo podemos utilizarlas para trabajar con variables atómicas. Para comenzar, consideremos el siguiente código.

```java
public class Main {

    private static int total = 0;

    public static class Counter implements Runnable {
        private final int n;

        public Counter(int n) {
            this.n = n;
        }

        @Override
        public void run() {
            for (int i = 0; i < this.n; i++) {
                total = total + 1;
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(new Counter(10000));
        Thread t2 = new Thread(new Counter(10000));

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Total: " + total);
    }
}
```

En este código, tenemos una clase `Counter` que implementa la interfaz `Runnable`, recibe un número `n` en su constructor y ejecuta un ciclo `for` por `n` iteraciones en el método `run`, donde en cada una incrementa en `1` el valor de la variable `total`. Luego, en el método `main`, creamos dos instancias de `Counter` y las ejecutamos en dos hilos diferentes. Al final, imprimimos el valor de `total`.

A simple vista puede parecer que, si ejecutamos este código, el valor final será `20000`, dado que en cada hilo se incrementará el valor de la variable `total` de uno en uno hasta que sea igual a `10000` (iteraciones). Sin embargo, en concurrencia esto no es necesariamente cierto. La razón es que la operación `total = total + 1` no es atómica. En otras palabras, no es una operación que se ejecuta en un solo paso. En realidad, esta operación se descompone en tres pasos:

1. Leer el valor actual de `total`.
2. Incrementar el valor leído en `1`.
3. Asignar el nuevo valor a `total`.

Si dos hilos ejecutan la operación `total = total + 1` al mismo tiempo, es posible que ambos lean el mismo valor de `total`, lo incrementen en `1` y lo asignen a `total`. Como resultado, el incremento de uno de los hilos se pierde (corrupción de memoria). 

Existe una solución para este problema, se puede realizar utilizando `syncronized` o `locks`, pero en ocasiones puede que no sea posible o deseable utilizar estos enfoques. Existen formas más eficientes para evitar que el valor de una variable pueda ser corrompido si se accede desde múltiples hilos, y es aquí donde toma relevancia el paquete `java.util.concurrent.atomic`.

## Variables atómicas

En Java, las variables atómicas son tipos de datos proporcionados por el paquete `java.util.concurrent.atomic` que permiten realizar operaciones atómicas de manera eficiente y segura en entornos concurrentes, siendo una alternativa segura a los primitivos para trabajar con múltiples hilos.

Una operación atómica es aquella que ocurre completamente o no ocurre en absoluto, sin interferencias de otros hilos. Estas variables se utilizan para evitar problemas de condiciones de carrera sin necesidad de usar bloqueos explícitos como synchronized.

Todas las clases dentro de este paquete son muy parecidas en cuanto a funcionamiento, con la diferencia del tipo de dato que manejan. Algunas de las clases más comunes son:

- AtomicInteger: Maneja enteros con operaciones atómicas.
- AtomicLong: Maneja números largos (long) de manera atómica.
- AtomicBoolean: Maneja valores booleanos de manera atómica.
- AtomicIntegerArray: Maneja arreglos de enteros de manera atómica.
- AtomicReference<V>: Maneja referencias a objetos genéricos de manera atómica.

Considerar que estas clases no son un reemplazo para los primitivos, sino una alternativa para trabajar con ellos de manera segura en entornos concurrentes y, por lo tanto, no se tienen los métodos `equals()`, `hashCode()` y `compareTo()`.

Aunque los métodos no estén declarados como `synchronized`, las operaciones que realizan son atómicas, lo que significa que no se pueden interrumpir por otros hilos. Por ejemplo, si dos hilos intentan incrementar el valor de una variable atómica al mismo tiempo, uno de ellos se bloqueará hasta que el otro termine su operación.

Todos los métodos de estas clases proporcionan una forma para cambiar el valor de una variable, incrementarlo, decrementarlo, recuperarlo, hacer operaciones combinadas, etc., de manera atómica. Basta con observar la firma de cada método para darse cuenta de su propósito, o acceder a la [documentación oficial de Java](https://devdocs.io/openjdk~21/java.base/java/util/concurrent/atomic/package-summary) para más detalles.

## AtomicInteger

Para ilustrar el uso de variables atómicas, modifiquemos el código anterior para utilizar `AtomicInteger` en lugar de `int`.

```java
import java.util.concurrent.atomic.AtomicInteger;

public class Main {

    private static AtomicInteger total = new AtomicInteger();

    public static class Counter implements Runnable {
        private final int n;

        public Counter(int n) {
            this.n = n;
        }

        @Override
        public void run() {
            for (int i = 0; i < this.n; i++) {
                total.incrementAndGet();
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(new Counter(10000));
        Thread t2 = new Thread(new Counter(10000));

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Total: " + total);
    }
}
```

En este código, hemos reemplazado la variable `total` de tipo `int` por una variable `AtomicInteger`. En la clase `Counter`, en lugar de incrementar la variable `total` con `total = total + 1`, utilizamos el método `incrementAndGet()` de `AtomicInteger`. Este método incrementa el valor de la variable en `1` y devuelve el nuevo valor. Otra opción para lograr el mismo resultado es utilizar el método `addAndGet(1)`.

Ahora al ejecutar el código las veces que queramos, el resultado siempre será `20000`, ya que la operación de incremento es atómica y no es posible que múltiples hilos modifiquen el valor de `total` al mismo tiempo y puedan corromper su valor, asegurando que el resultado tenga sentido.

## Conclusiones

Hemos visto como mediante el uso de variables atómicas podemos asegurarnos de que el valor de una variable no se corrompa al utilizarse en multiples hilos, siendo una alternativa más factible y eficiente respecto a `synchronized` o `locks` en ciertos escenarios. Cabe mencionar que el uso de variables atómicas no es la solución a todos los problemas de concurrencia, pero es una herramienta muy útil para trabajar con variables compartidas en entornos multihilo. Además de la facilidad de uso entre tipos de clases, dado que comparten similitudes en sus métodos y funcionamiento.