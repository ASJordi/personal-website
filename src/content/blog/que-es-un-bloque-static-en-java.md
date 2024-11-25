---
title: "¿Qué es un bloque static en Java?"
description: "Bloque static en Java"
pubDate: "Nov 27 24"
heroImage: "../../assets/blog/images/post48/cover.webp"
tags: ["Java", "Fundamentos"]
---

Un bloque `static` en Java es un bloque de código que se ejecuta una sola vez cuando la clase es cargada por el _ClassLoader_, es decir, cuando se carga la clase en memoria. Una vez que la clase ya se ha cargado, el bloque `static` no se ejecutará nuevamente. Su principal objetivo es para ejecutar cierto código la primera vez que se carga la clase, antes de que se cree cualquier instancia, por ejemplo, para inicializar variables estáticas de la clase. Como dato una clase puede tener más de un bloque `static`, y estos se ejecutarán en el orden en que se encuentren declarados. La sintaxis de un bloque `static` es la siguiente:

```java
static {
    // Código a ejecutar
}
```

Supongamos que tenemos la siguiente clase:

```java
public class Main {
    static {
        System.out.println("Ejecutando bloque estático de Main");
    }

    public static void main(String[] args) {
        System.out.println("Ejecutando método main de Main");
    }
}
```

Sabiendo que el punto de entrada de una aplicación Java es el método `main`, al ejecutar la clase `Main` esta se cargará en memoria y lo primero que se ejecutará será el bloque `static` y luego el método `main`. Considerar que el bloque `static` se ejecutará siempre antes que cualquier método estático o no estático de la clase, incluso antes del propio constructor de la clase.

```
Ejecutando bloque estático de Main
Ejecutando método main de Main
```

Al igual que los métodos `static`, un bloque `static` no pueden acceder a variables de instancia de la clase, ya que estos se ejecutan antes de que se cree cualquier instancia de la clase. Sin embargo, pueden acceder a atributos y métodos estáticos de la clase, solo hay que tener en consideración que en caso de requerir atributos estáticos en el bloque, estos deben estar declarados antes de este mismo para que puedan ser utilizados (el orden de declaración importa).

```java
// Uso incorrecto
// Cannot read value of field 'EDAD_MAXIMA' before the field's definition

public class Persona {
    static {
        System.out.println("La edad máxima es: " + EDAD_MAXIMA);
    }

    private static int EDAD_MAXIMA = 100;
}
```

```java
// Uso correcto
public class Persona {
    private static int EDAD_MAXIMA = 100;

    static {
        System.out.println("La edad máxima es: " + EDAD_MAXIMA);
    }
}
```

Veamos otro ejemplo, tenemos la clase `Persona` con la siguiente estructura:

```java
public class Persona {
    private String name;
    private int age;
    private static int numeroPersonas;
    public static final int EDAD_MAXIMA;

    static {
        numeroPersonas = 0;
        EDAD_MAXIMA = 100;
        System.out.println("Número de personas al inicio: " + numeroPersonas);
    }

    public Persona(String name, int age) {
        this.name = name;
        this.age = age;
        numeroPersonas++;
        System.out.println("Se ha creado una persona con nombre " + name + " y edad " + age);
    }

    public static int getNumeroPersonas() {
        return numeroPersonas;
    }
    
    // Getters y setters
}
```

El bloque `static` se utiliza para inicializar el valor de los atributos estáticos `numeroPersonas` y `EDAD_MAXIMA` respectivamente (un atributo estático puede ser inicializado desde la declaración), y posteriormente llamar al método `getNumeroPersonas()` e imprimir por consola el valor de `numeroPersonas` al inicio (debería ser 0).

Si creamos dos instancias de esta clase y llamamos al método `getNumeroPersonas()`, deberíamos obtener la siguiente salida:

```java
public class Main {
    public static void main(String[] args) {
        Persona persona1 = new Persona("Juan", 25);
        Persona persona2 = new Persona("María", 30);
        System.out.println("Número de personas al final: " + Persona.getNumeroPersonas());
    }
}
```

```
Número de personas al inicio: 0
Se ha creado una persona con nombre Juan y edad 25
Se ha creado una persona con nombre María y edad 30
Número de personas al final: 2
```

Como vemos el bloque `static` se ejecuta antes de crear cualquier instancia y ejecuta el código que tiene dentro, posteriormente se crean las dos instancias de la clase, y al final se obtiene el número de instancias. En este ejemplo podemos observar claramente que el bloque `static` solo se ejecuta una vez, independientemente del número de instancias generadas.

En general, este es el uso del bloque `static`, para ejecutar código una sola vez al cargar la clase en memoria, como inicializar variables estáticas, cargar librerías, entre otros.
