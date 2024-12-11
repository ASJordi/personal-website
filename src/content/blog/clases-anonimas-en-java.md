---
title: "Clases anónimas en Java"
description: "Clases de un solo uso en Java"
pubDate: "Jan 20 25"
heroImage: "../../assets/blog/images/post61/cover.webp"
tags: ["Java", "Fundamentos"]
---

Una **clase anónima** es una clase que no tiene nombre, y que permite declarar o instanciar implementaciones de clases o interfaces al mismo tiempo sin la necesidad de utilizar un archivo adicional. Por lo que, este tipo de clases son de un solo uso y no se pueden reutilizar en otro lugar. Mientras que las clases locales son declaraciones de clase, las clases anónimas son expresiones, lo que significa que la clase se define en otra expresión, y esto produce como resultado un único objeto que se puede almacenar en una variable.

Son útiles en determinadas situaciones donde solo existe un único uso de la clase y la implementación que se haga en ella, como por ejemplo, definir un método concreto de una interfaz, o una clase abstracta. Tienen un uso más común al trabajar en Java Swing con los event listeners o al utilizar funciones anónimas (arrow functions).

Como curiosidad, dado que es una clase que no tiene un nombre, el compilador de Java le asigna un nombre automático, que se compone de la clase que la contiene, seguido de un número que indica la posición de la clase anónima en la clase que la contiene, por ejemplo, `ClaseContenedora$1.class`.

## Sintaxis

Como se mencionó antes, una clase anónima es una expresión, su sintaxis es como la invocación de un constructor de una clase, pero en lugar de invocar un constructor, se tiene un bloque de código que define la estructura de la clase anónima. La sintaxis es la siguiente:

```java
ClaseOInterfaz nombreVariable = new ClaseOInterfaz() {
    // Cuerpo de la clase anónima
};
```

La declaración de una clase anónima consta de los siguientes elementos:

- El operador `new`.
- El nombre de la clase a extender o la interfaz a implementar.
- Paréntesis que contienen los argumentos del constructor (si es que tiene), es igual a como se crea una instancia de una clase normal. Cuando se implementa una interfaz, no hay un constructor, por lo que los paréntesis están vacíos.
- Llaves que contienen el cuerpo de la clase anónima.
- Dado que es una expresión, se puede declarar e instanciar la clase anónima en una sola línea, y almacenarla en una variable.

## Tipos de clases anónimas

Las clases anónimas pueden ser de los siguientes tipos:

- Clase anónima que extiende una clase.
- Clase anónima que extiende una clase abstracta.
- Clase anónima que implementa una interfaz.
- Clase anónima como un argumento de un método.

### Clase anónima que extiende una clase

Podemos crear una clase anónima que extiende de una clase y definir un comportamiento específico. En el siguiente ejemplo, se tiene la clase `Carro` con un método `tipoMotor()` que imprime el tipo de motor del carro, por defecto es de combustión interna. Luego, se crea una clase anónima que extiende de `Carro` y se sobreescribe el método `tipoMotor()` para que imprima que el motor es de tipo eléctrico.

```java
public class Carro {
    public void tipoMotor() {
        System.out.println("Motor de combustión interna");
    }
}

public class Main {
    public static void main(String[] args) {
        Carro carroCombustion = new Carro();

        Carro carroElectrico = new Carro(){
            @Override
            public void tipoMotor() {
                System.out.println("Motor eléctrico");
            }
        };

        carroCombustion.tipoMotor(); // Motor de combustión interna
        carroElectrico.tipoMotor(); // Motor eléctrico
    }
}
```

### Clase anónima que extiende una clase abstracta

De igual manera, se puede crear una clase anónima que extienda de una clase abstracta e implementar los métodos abstractos o modificar el comportamiento de los métodos que no son abstractos. En el siguiente ejemplo, se tiene una clase abstracta `ConexionBD` con un método abstracto `obtenerConexion()` que simula la conexión a una base de datos. Luego, se crean dos clases anónimas a partir de `ConexionBD` y se sobreescribe el método `obtenerConexion()` para que imprima el tipo de conexión que se está realizando.

```java
public abstract class ConexionBD {
    public abstract void obtenerConexion();
}

public class Main {
    public static void main(String[] args) {
        ConexionBD conexionMySQL = new ConexionBD() {
            @Override
            public void obtenerConexion() {
                System.out.println("Conexión a MySQL");
            }
        };

        ConexionBD conexionPostgreSQL = new ConexionBD() {
            @Override
            public void obtenerConexion() {
                System.out.println("Conexión a PostgreSQL");
            }
        };

        conexionMySQL.obtenerConexion(); // Conexión a MySQL
        conexionPostgreSQL.obtenerConexion(); // Conexión a PostgreSQL
    }
}
```

### Clase anónima que implementa una interfaz

También se puede crear una clase anónima que implemente una interfaz y sobreescribir los métodos que contenga. En el siguiente ejemplo, se crea una clase anónima usando la interfaz `Comparator<T>` para ordenar una lista de números enteros de forma descendente.

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(5, 10, 56, 3, 2, 1, 0);
        
        Comparator<Integer> ordenDescendente = new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o2 - o1;
            }
        };
        
        numeros.sort(ordenDescendente);
        
        System.out.println(numeros); // [56, 10, 5, 3, 2, 1, 0]
    }
}
```

Funciona de la misma manera si utilizamos nuestras propias interfaces. Considerar el siguiente ejemplo, donde se tiene una interfaz `Operacion` con un método `calcular()` que recibe dos parámetros y retorna un resultado. Después, se crea una clase anónima que implementa la interfaz `Operacion` y se sobreescribe el método `calcular()` para realizar una suma y una resta.

```java
public interface Operacion {
    double calcular(double a, double b);
}

public class Main {
    public static void main(String[] args) {
        Operacion suma = new Operacion() {
            @Override
            public double calcular(double a, double b) {
                return a + b;
            }
        };

        Operacion resta = new Operacion() {
            @Override
            public double calcular(double a, double b) {
                return a - b;
            }
        };

        System.out.println("Suma: " + suma.calcular(3, 2));
        System.out.println("Resta: " + resta.calcular(3, 2));
    }
}
```

### Clase anónima como un argumento de un método

En caso de que ya hayas trabajado con la clase `Thread` de Java, habrás notado que se puede pasar una clase anónima como argumento de método para definir el comportamiento del hilo. En el siguiente ejemplo, se pasa como argumento una clase anónima que implementa la interfaz `Runnable` para definir el comportamiento del hilo.

```java
public class Main {
    public static void main(String[] args) {
        Thread hilo = new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    System.out.println("Hola, soy un hilo");
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
        
        hilo.start();
    }
}
```

Retomando el ejemplo anterior donde se crea una clase anónima a partir de la interfaz `Comparator<T>`, se puede simplificar el código utilizando una clase anónima como argumento del método `sort()` de la lista, considerando que una clase anónima sirve para eso, para ser utilizada en un solo lugar.

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(5, 10, 56, 3, 2, 1, 0);

        numeros.sort(new Comparator<Integer>(){
            @Override
            public int compare(Integer o1, Integer o2) {
                return o2 - o1;
            }
        });

        System.out.println(numeros); // [56, 10, 5, 3, 2, 1, 0]
    }
}
```

Como último ejemplo, pero enfocado en Java Swing, podemos considerar lo siguiente, donde se pasa una clase anónima de tipo `ActionListener` como argumento del método `addActionListener()` de un botón. En este caso, se imprime un mensaje en la consola cuando se presiona el botón.

```java
JButton boton = new JButton("Clic aquí");
boton.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("¡Botón presionado!");
    }
});
```

## Ventajas de las clases anónimas

- Los objetos se crean solo cuando son necesario, y no se necesita crear una clase adicional.
- Se tiene la posibilidad de modificar el comportamiento de una clase o interfaz sin necesidad de crear una subclase, ya sea para declarar atributos o métodos adicionales.
- Permiten hacer nuestro código más conciso y legible, ya que se puede definir la implementación de una clase o interfaz en el mismo lugar donde se necesita.
- Ahorran tiempo ya que no se necesita crear un archivo adicional para una clase que solo se usará una vez.

## Ámbito (Scope) de las clases anónimas

Al igual que las clases normales, las clases anónimas tienen el mismo acceso a las variables locales del ámbito que las contiene.

- Una clase anónima tiene acceso a los miembros de la clase que la contiene.
- Una clase anónima no puede acceder a variables locales de su ámbito de aplicación que no estén declaradas como finales o efectivamente finales.
- Al igual que una clase anidada, una declaración de un tipo (como una variable) en una clase anónima hace sombra (shadow) a cualquier otra declaración en el ámbito que la rodea que tenga el mismo nombre

Las clases anónimas también tienen las mismas restricciones que las clases locales con respecto a sus miembros:

- No se pueden declarar inicializadores estáticos o interfaces en una clase anónima.
- Una clase anónima puede tener miembros estáticos siempre que sean variables constantes.

Dentro de una clase anónima podemos declarar lo siguiente:

- Campos.
- Métodos extras (aunque no implementen ningún método de tipo superclase o interfaz).
- Inicializadores de instancia.
- Clases locales.

En una clase anónima no se pueden declarar constructores, ya que no tienen nombre y no se pueden invocar directamente.

## Conclusión

Las clases anónimas son una característica de Java puede que no sea tan conocida, pero que se suele utilizar incluso sin saberlo. Son útiles en situaciones donde se necesita una implementación determinada de una clase o interfaz para utilizar en un solo lugar sin reutilizarla. Hemos visto las diferentes maneras de utilizarlas y la flexibilidad que nos brindan para modificar el comportamiento de una clase o interfaz sin necesidad de crear una subclase. Si necesitas un poco más de información, puedes revisar la documentación oficial de Java en cualquiera de los siguientes enlaces:

- [Clases anónimas - docs.oracle.com](https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html)
- [Clases anónimas - dev.java](https://dev.java/learn/classes-objects/nested-classes/#anonymous)
