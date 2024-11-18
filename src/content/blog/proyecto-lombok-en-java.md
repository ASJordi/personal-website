---
title: "Proyecto Lombok en Java"
description: "Lombok en Java"
pubDate: "Jan 06 25"
heroImage: "../../assets/blog/images/post59/cover.webp"
tags: ["Java", "Lombok", "Fundamentos"]
---

## Introducción

**Lombok** es una librería que actúa como procesador de anotaciones para Java, diseñada para eliminar la redundancia en el código. Su principal función es automatizar la generación de código repetitivo o "boilerplate" - esos elementos que, aunque necesarios, no aportan valor directo a la lógica de nuestro programa. Principalmente, se utiliza para la generación de forma automática en tiempo de compilación de métodos getter y setter, constructores, métodos `equals()`, `hashCode()`, `toString()`, entre otros elementos comunes en las clases Java.

En lugar de escribir manualmente decenas de líneas de código para estas funciones básicas, Lombok permite definirlas mediante simples anotaciones, lo que resulta en un código más limpio, mantenible y menos propenso a errores.

## Instalación

Para utilizar Lombok en un proyecto Java, es necesario agregar la dependencia correspondiente en el archivo `pom.xml` (en caso de un proyecto Maven) o `build.gradle` (en caso de un proyecto Gradle), además de instalar el plugin correspondiente en el IDE que estemos utilizando. Durante este post, utilizaremos Maven e IntelliJ IDEA como ejemplo.

```xml
<dependencies>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.36</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

En caso de alguna duda siempre se puede revisar la documentación oficial de Lombok:

- [Lombok con Maven](https://projectlombok.org/setup/maven)
- [Lombok en IntelliJ IDEA](https://projectlombok.org/setup/intellij)


## @Data

Cuando creamos una clase regularmente realizamos las siguientes acciones, ya sea manualmente o con algún atajo que nos proporcione nuestro IDE:

- Encapsular atributos y generar sus métodos `getter` y `setter`
- Generar un constructor vacío y otro que reciba todos los atributos
- Implementar los métodos `equals()`, `hashCode()` y `toString()`

Bueno, Lombok tiene la anotación `@Data` que nos permite hacer todo esto en una sola línea, generar todo lo relacionado con los _POJO (Plain Old Java Objects)_. Esta anotación es una combinación de las anotaciones `@Getter`, `@Setter`, `@EqualsAndHashCode`, `@NoArgsConstructor` y `@AllArgsConstructor` que veremos más adelante.

```java
import lombok.Data;

@Data
public class Persona {
    private String nombre;
}
```

```java
public class Main {
    public static void main(String[] args) {
        Persona p1 = new Persona();
        p2.setNombre("Maria");

        System.out.println(p1.getNombre());
    }
}
```

## @NoArgsConstructor, @AllArgsConstructor y @RequiredArgsConstructor

Estas anotaciones nos permiten generar constructores de forma automática con diferentes combinaciones de argumentos, considerando que los atributos se usan de acuerdo al orden en que fueron declarados en la clase.

- `@NoArgsConstructor`: Genera un constructor sin argumentos (vacío), en caso de que no sea posible generar uno, se lanzará una excepción, para evitarlo basta con usar la anotación de la siguiente manera `@NoArgsConstructor(force = true)`.
- `@AllArgsConstructor`: Genera un constructor con todos los atributos de la clase como argumentos.
- `@RequiredArgsConstructor`: Genera un constructor para todos los campos finales y/o marcados con la anotación `@NonNull`.

```java
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Persona {
    private String nombre;
}
```

# @Getter y @Setter

Estas anotaciones nos permiten generar los métodos `getter` y `setter` de forma automática para todos los atributos de la clase, o solo para los que sean marcados con la anotación correspondiente, es decir, pueden ser utilizadas a nivel de clase o atributo.

```java
import lombok.*;

@Getter
@Setter
public class Persona {
    private String nombre;
    private String apellido;
}
```

```java
import lombok.*;

public class Persona {
    @Getter @Setter
    private String nombre;
    private String apellido;
}
```

# @ToString

Esta anotación genera el método `toString()` de forma automática, el cual retorna una representación en forma de cadena de la clase y sus atributos con el siguiente formato: `NombreClase(atributo1=valor1, atributo2=valor2, ...)`. Por defecto todos los atributos no estáticos de la clase son incluidos en el resultado, pero se pueden excluir atributos específicos mediante el atributo `@ToString.Exclude`. En caso de que solo se quiera mostrar el valor del atributo y no el nombre tal cúal se declara, se puede usar `@ToString(includeFieldNames = false)`.

```java
import lombok.*;

@AllArgsConstructor
@ToString
public class Persona {
    private String nombre;
    @ToString.Exclude
    private String apellido;
}

// Output: Persona(nombre=Maria)
```

# @EqualsAndHashCode

Permite generar los métodos `equals()` y `hashCode()` a partir de todos los atributos de la clase, en caso de que se quiera excluir o incluir algún atributo se puede hacer mediante la anotación `@EqualsAndHashCode.Exclude` y `@EqualsAndHashCode.Include` respectivamente.

```java
import lombok.*;

@AllArgsConstructor
@EqualsAndHashCode
public class Persona {
    private String nombre;
    private String apellido;
    @EqualsAndHashCode.Exclude
    private int edad;
}
```

# @Value

Anteriormente en Java para crear una clase inmutable era necesario realizar una serie de pasos, como hacer que la clase y/o atributos fueran del tipo `final`, y que no se generarán los métodos `setter`. Lombok nos facilita la creación de clases inmutables mediante la anotación `@Value`, la cual combina las anotaciones `@Getter`, `@ToString`, `@EqualsAndHashCode` y `@AllArgsConstructor` para generar una clase inmutable. Todos los atributos son marcados del tipo `private final` y no se generan los métodos `setter`. Es la variante inmutable de `@Data`.

```java
import lombok.*;

@Value
public class Persona {
    String nombre;
    String apellido;
    int edad;
}
```

En versiones recientes de Java esta anotación pierde sentido frente al uso de `Records`, dado que tienen el mismo propósito, y es más práctico utilizar records. Si te interesa saber más sobre este tema en el blog hay más publicaciones al respecto de los [records](https://asjordi.dev/blog/tag/Record/).

```java
public record Persona(String nombre, String apellido, int edad) {}
```

# @val

Esta anotación nos permite declarar una variable como `final` y automáticamente inferir su tipo de dato, es decir, no es necesario especificar el tipo de dato de la variable, Lombok se encarga de inferirlo. Es útil en caso de que el tipo de dato de la variable sea muy largo o complejo, de esta manera se evita repetirlo.

```java
public static void main(String[] args) {
    val str = "Hello World";
    val x = 10;
}
```

Esta anotación puede perder sentido si utilizamos directamente `final var` o simplemente `var` para la inferencia de tipos, lo cual resulta más cómodo dado que es una característica propia del lenguaje. Si te interesa saber más sobe esto puede consultar el siguiente [post](https://asjordi.dev/blog/var-en-java/)

```java
public static void main(String[] args) {
    final var str = "Hello World";
    var x = 10;
}
```

# @var

Funciona exactamente igual que `@val`, pero no declara la variable como `final`, simplemente infiere su tipo. Es necesario considerar el concepto de inferencia de tipos, ya que no se puede declarar algo del tipo `String` y por el hecho de que no sea `final` querer asignarle un valor de tipo `int`. Nuevamente, esta anotación es sustituida por `var` en versiones recientes de Java.

```java
public static void main(String[] args) {
    var str = "Hello World";
    var x = 10;
}
```

# @NonNull

Esta anotación se puede utilizar en atributos de clase y parámetros de un método, básicamente indica que el valor de un atributo no puede ser nulo, en caso de que se intente asignar un valor `null` a un atributo marcado con `@NonNull` se lanzará una excepción `NullPointerException`, es decir, se utiliza `if (param == null) throw new NullPointerException("param is marked non-null but is null");`. Independientemente de la excepción que genera, su uso es más visible dentro del propio IDE, dado que este nos indicará de alguna manera que este valor no puede ser nulo.

```java
import lombok.*;

@Data
@AllArgsConstructor
public class Persona {
    @NonNull
    private String nombre;
    private String apellido;
    private int edad;
}
```

# @Cleanup

Esta anotación permite asegurarnos de que cualquier recurso que la utilice en caso de tener un método `close()` o que implemente las interfaces `AutoCloseable` o `Closeable` se cierre de forma automática al finalizar el bloque de código en el que se encuentra. Es útil en caso de trabajar con recursos que necesiten ser liberados, como archivos, conexiones a bases de datos, etc.

```java
import lombok.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        @Cleanup
        BufferedReader br = new BufferedReader(new FileReader("datos.txt"));
        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
    }
}
```

Este resultado se puede obtener de forma manual si utilizamos un `try with resources`.

```java
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader br = new BufferedReader(new FileReader("datos.txt"))){
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
```

# @Builder

Esta anotación nos permite generar un patrón de diseño _Builder_ de forma automática, es decir, un objeto que nos permite construir objetos complejos paso a paso, de forma que se puedan configurar diferentes atributos de un objeto sin tener que llamar a un constructor con muchos parámetros. Es útil en caso de que una clase tenga muchos atributos y no queramos tener un constructor con muchos parámetros.

```java
import lombok.*;

@Builder
public class Persona {
    private String nombre;
    private String apellido;
    private int edad;
}
```

# @With

Esta anotación nos permite crear un método que nos devuelve una copia del objeto actual con un atributo modificado, es decir, genera un método `withNombreAtributo(Object object)` que nos permite crear una copia del objeto actual con el atributo `object` modificado por el valor que le pasemos como argumento. Es útil en caso de que queramos modificar un atributo de un objeto sin modificar el objeto original.

```java
@With
@AllArgsConstructor
@ToString
public class Persona {
    private String nombre;
    private String apellido;
    private int edad;
}
```

```java
public static void main(String[] args) {
    Persona p = new Persona("Luis", "García", 25);
    var p2 = p.withNombre("Juan");

    System.out.println(p); // Persona(nombre=Luis, apellido=García, edad=25)
    System.out.println(p2); // Persona(nombre=Juan, apellido=García, edad=25)
}
```

Hasta este punto hemos visto algunas de las anotaciones que se pueden llegar a utilizar con más frecuencia, cada una de estas puede o no aceptar configuraciones adicionales, de igual forma existen otras que se encuentran marcadas como experimentales, en cualquiera de los casos es importante consultar la [documentación oficial](https://projectlombok.org/features/) para obtener el máximo provecho de todas las características que nos ofrece Lombok y las ventajas respecto a la generación de código repetitivo.