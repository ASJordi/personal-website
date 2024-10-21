---
title: "¿Para qué sirve el modificador static en Java?"
description: "Modificador static en Java"
pubDate: "Nov 25 24"
heroImage: "../../assets/blog/images/post47/cover.webp"
tags: ["Java", "Fundamentos"]
---

El modificador `static` en Java se utiliza para definir variables o métodos que pertenecen a la clase en sí misma, en lugar de a una instancia específica de la clase. Esto significa que, solo existe una copia del elemento que es compartida por todas las instancias de la clase y se puede acceder a esta sin la necesidad de crear una instancia propia dentro de un ámbito global.

Los atributos estáticos se pueden utilizar para compartir información global que no depende de una instancia, por ejemplo, contadores globales, constantes (`static final`), etc. Por otra parte, los métodos estáticos se pueden utilizar para definir métodos de utilidad de manera global que no dependen de una instancia.

Cuando creamos una instancia de un objeto podemos acceder a sus atributos y métodos colocando el nombre del objeto seguido de un punto y el nombre del atributo o método. Por ejemplo, consideremos la clase `Empleado` que tiene 4 atributos y sus respectivos métodos getter y setter.

```java
public class Empleado {

    private String nombre;
    private String apellido;
    private double salarioBase;
    private int diasLaboralesBase;

    public Empleado(String nombre, String apellido, double salarioBase, int diasLaboralesBase) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.salarioBase = salarioBase;
        this.diasLaboralesBase = diasLaboralesBase;
    }

    // Getters y Setters
}
```

Si creamos dos instancias de esta clase, cada uno de los valores que se pasan al constructor son propios de la instancia y no se comparten entre ellas, por lo que si queremos acceder a estos valores debemos hacerlo a través de la instancia.

```java
Empleado juan = new Empleado("Juan", "Perez", 300, 5);
Empleado pedro = new Empleado("Pedro", "Gomez", 300, 5);

System.out.println(juan.getNombre()); // Juan
System.out.println(pedro.getNombre()); // Pedro
```

## Atributos estáticos

Hasta este punto todo normal, pero dentro de la clase hay algunos atributos que no deberían depender de cada instancia y ser propios de la clase, por ejemplo, el salario base y los días laborales base. Por lo que podemos hacer que estos atributos sean constantes, estáticos y accesibles a través de la clase de manera global utilizando `public static final` (pueden ser privados, o no ser constantes, todo depende de la necesidad).

```java
public class Empleado {

    private String nombre;
    private String apellido;
    public static final double SALARIO_BASE = 300;
    public static final int DIAS_LABORALES_BASE = 5;

    public Empleado(String nombre, String apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }

    // Getters y Setters
}
```

De esta manera para acceder a estos atributos no es necesario crear una instancia de la clase, sino que podemos acceder a ellos directamente a través del nombre de la clase.

```java
System.out.println(Empleado.SALARIO_BASE); // 300
System.out.println(Empleado.DIAS_LABORALES_BASE); // 5
```

> Al trabajar con atributos estáticos dentro de la clase no es necesario utilizar `this` para acceder a ellos, ya que no pertenecen a una instancia en particular.

Por ejemplo, si queremos calcular el salario de un empleado, podemos hacerlo usando estos atributos dentro de un método no estático y llamarlo desde las instancias que creamos anteriormente.

```java
public double calcularSueldo() {
    return SALARIO_BASE * DIAS_LABORALES_BASE;
}
```

```java
System.out.println(juan.calcularSueldo()); // 1500.0
System.out.println(pedro.calcularSueldo()); // 1500.0
```

Existe el caso donde creamos una instancia y al colocar `.` y el nombre del atributo estático (el IDE por sí mismo no los muestra) podemos acceder sin problemas, pero esto no es recomendable, se debe acceder utilizando el nombre de la clase seguido de `.` y el nombre del atributo.

```java
juan.SALARIO_BASE; // No recomendado
Empleado.SALARIO_BASE; // Recomendado
```

A manera de ejemplo, a continuación se muestran algunas otras maneras de definir atributos estáticos.

```java
// atributo estático básico
public static int contador = 0;

// atributo estático final
public static final double PI = 3.1416;

// atributo estático privado (mejor encapsulamiento)
private static int numeroEmpleados = 0;

// Método para incrementar el contador de empleados
public void incrementar() {
    contador++;
    numeroEmpleados++;
}
```

## Métodos estáticos

Ya que tenemos atributos estáticos, también podemos tener métodos estáticos, estos métodos no dependen de una instancia en particular y pueden ser utilizados de manera global. Dentro de la clase `Empleado` podemos tener un método que calcule cuantas instancias de la clase se han creado. Para ello, primero se debe definir un atributo estático que se incremente cada vez que se crea una instancia y luego un método estático que devuelva este valor.

> **Nota**: Los métodos estáticos no pueden acceder a los atributos no estáticos de la clase, es decir, solo pueden acceder a los atributos definidos como estáticos. También, no pueden acceder a los métodos no estáticos de la clase.

```java
public class Empleado {

    private String nombre;
    private String apellido;
    public static final double SALARIO_BASE = 300;
    public static final int DIAS_LABORALES_BASE = 5;
    private static int NUMERO_EMPLEADOS = 0;

    public Empleado(String nombre, String apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        NUMERO_EMPLEADOS++;
    }

    public double calcularSueldo() {
        return SALARIO_BASE * DIAS_LABORALES_BASE;
    }

    public static int getNumeroEmpleados() {
        return NUMERO_EMPLEADOS;
    }
    
    // Getters y Setters
}
```

El atributo `NUMERO_EMPLEADOS` se declara como `private static` para que sea accesible solo dentro de la clase, no pueda ser modificado desde fuera y sea compartido por todas las instancias, y su valor se incrementa dentro del constructor cada vez que se crea una nueva instancia. El método `getNumeroEmpleados()` se declara como `public static` para que pueda ser accedido sin la necesidad de crear una instancia y devuelva el valor del atributo (esto representa un ejemplo de encapsulamiento).

```java
Empleado juan = new Empleado("Juan", "Perez");
Empleado pedro = new Empleado("Pedro", "Gomez");

System.out.println(Empleado.getNumeroEmpleados()); // 2
```

De esta manera, podemos obtener la cantidad de instancias creadas de la clase `Empleado` sin la necesidad de crear una instancia y sin la necesidad de exponer el atributo `NUMERO_EMPLEADOS`.

En resumen, los atributos y métodos del tipo `static` se deben utilizar para cosas que realmente tienen un estado global que deba compartirse entre distintas instancias, un claro ejemplo es la clase `Math` que tiene métodos estáticos para realizar operaciones matemáticas, o la clase `System` que tiene atributos y métodos estáticos para interactuar con el sistema.
