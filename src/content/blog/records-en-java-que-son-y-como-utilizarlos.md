---
title: "Records en Java: qué son y cómo utilizarlos"
description: "Records en Java"
pubDate: "Oct 14 24"
heroImage: "../../assets/blog/images/post35/cover.webp"
tags: ["Java", "Record"]
---

Los registros o **records** son una nueva característica incorporada de forma previa en el JDK 14, y de forma definitiva en el JDK 17. Son una implementación de las data-classes o del patrón DTO (Data Transfer Object) tal y como se conoce en otros lenguajes de programación. En general son una forma para almacenar valores de forma inmutable, y que además permiten la creación de objetos de forma más sencilla, dado que solo necesitamos especificar que atributos queremos que tenga el objeto, y el compilador se encargará de generar un constructor, getters, métodos equals, hashcode y toString de manera automática.

## ¿Qué es un Record?

Un record es una estructura superior al igual que lo son las clases, enums e interfaces, por lo que la manera más habitual de crear un record es mediante un archivo .java.

```java
package org.jordi.example;

public record User() {

}
```

Como se puede ver es una estructura similar a la de una clase, pero en lugar de la palabra reservada `class` se utiliza `record`. Una cosa que destaca son los paréntesis `()` que se encuentran después del nombre del record, estos se utilizan para definir los componentes del record, que son los atributos que tendrá el objeto.

## Declarar atributos en un Record

Dentro de los paréntesis que componen la declaración del record, se especifican los atributos que tendrá.

```java
public record User(String name, String email, boolean isAdmin) {

}
```

En este caso, el record `User` tiene tres atributos `name` y `email` de tipo `String`, e `isAdmin` de tipo `boolean`. Al momento de compilar, el compilador de Java convertirá este record en una clase normal de la cual se pueden crear instancias. Cada uno de los atributos se convertirán en atributos de clase, los cuales serán del tipo `private final`, es decir, serán inmutables. Esto es una de las particularidades de los records, crean estructuras inmutables.

```java
// El compilador generará algo similar a esto.
private final String name;
private final String email;
private final boolean isAdmin;
```

También se creará de forma automática un constructor con todos los atributos del record como parámetros, cuya función será la de establecer los valores de los atributos. En el caso del record `User`, el constructor se vería de la siguiente manera:

```java
// El compilador generará algo similar a esto.
public User(String name, String email, boolean isAdmin) {
    this.name = name;
    this.email = email;
    this.isAdmin = isAdmin;
}
```

Posteriormente, para cada uno de los atributos se generará un método `getter` que tendrá como nombre el mismo nombre de cada uno de los atributos, es decir, se omitirá el prefijo `get`.

```java
// Los métodos getter generados será algo similar a esto.
public String name() {
    return this.name;
}

public String email() {
    return this.email;
}

public boolean isAdmin() {
    return this.isAdmin;
}
```

Es importante tener en cuenta que **no se generarán métodos setter**. Como se mencionó antes, cada uno de los atributos tiene el modificador `final`, por lo que no se pueden modificar una vez que se han establecido. La única manera de realizar esto sería creando una nueva instancia del record con los valores actualizados.

Además, se generarán los métodos `equals`, `hashCode` y `toString` de forma automática. Estos métodos se generan de forma predeterminada, pero se pueden sobrescribir si se desea.

## Crear métodos personalizados en un Record

Además de los métodos generados de forma automática, se pueden crear métodos personalizados en un record. Se declaran de la misma forma que en una clase normal, dentro del cuerpo del record, considerar que está no es la razón por la que un record debe llevar obligatoriamente corchetes `{}` (es un tema de compatibilidad y para que el compilador no se confunda). A continuación se crean dos métodos que permiten obtener información a partir de los atributos del record.

```java
public record User(String name, String email, boolean isAdmin) {
    
    public String getUserName() {
        return "@" + name;
    }
    
    public void isAdministrator() {
        if (isAdmin) {
            System.out.println("User is an administrator");
        } else {
            System.out.println("User is not an administrator");
        }
    }
}
```

Tal y como se muestra, los métodos pueden ser de cualquier tipo, y pueden recibir parámetros si es necesario. En este caso, el método `getUserName` devuelve el nombre del usuario precedido por el carácter `@`, y el método `isAdministrator` imprime en consola si el usuario es administrador o no.

Volviendo al tema de la inmutabilidad, si se desea crear un método `setter`, automáticamente se generará un error de compilación, recordando que los atributos de un record son de tipo `final`.

```java
public record User(String name, String email, boolean isAdmin) {
    
    public void setName(String name) {
        this.name = name; // Error de compilación
    }
}
```

## Constructor adicional en un Record

También es posible crear más de un constructor en un record. Considerando que existe la obligación de invocar al constructor principal o canónico en cada uno de los constructores adicionales. Por ejemplo, si se declara un constructor vacío, se producirá un error de compilación.

```java
public record User(String name, String email, boolean isAdmin) {
    
    public User() {} // Error de compilación
}
```

Tampoco es posible darle un valor inicial solo a algunos atributos y a otros no, ya que todos los atributos deben ser inicializados en el constructor principal.

```java
public record User(String name, String email, boolean isAdmin) {
    
    public User(String name) {
        this.name = name; // Error de compilación
    }
}
```

Un constructor válido, en el que se reciben los parámetros `name` y `email`, y se establece el valor de `isAdmin` a `false` sería el siguiente:

```java
public record User(String name, String email, boolean isAdmin) {
    
    public User(String name, String email) {
        this(name, email, false);
    }
}
```

## Herencia en un Record

Un record tiene algunas limitaciones específicas respecto a la herencia:

- Un record no puede extender de otra clase (excepto de Object, pero es algo implícito).
- Un record no puede ser una clase base (superclase) de otra clase.

Todo esto es debido a que un record es una estructura de datos inmutable, e implícitamente de tipo `final`, por lo que la herencia no tiene mucho sentido en este contexto.

## Interfaces en un Record

A diferencia de la herencia, un record puede implementar interfaces. Esto puede ser útil en algunos casos, por ejemplo, si se desea que un record tenga un comportamiento específico, o si se desea que un record tenga un método que no se pueda generar de forma automática, aunque no sea el propósito principal de un record.

```java
public record User(String name, String email, boolean isAdmin) implements Runnable {

    @Override
    public void run() {
        System.out.println("Running...");
    }
}
```

## Crear una instancia de un Record

Un record se crea de la misma forma que una clase, por lo que se puede crear una instancia utilizando cualquiera de los constructores que se hayan definido.

```java
User admin = new User("Jordi", "me@asjordi.dev", true);
```

Para obtener el valor de cualquiera de los atributos, se utiliza el método `getter` correspondiente, recordando que el prefijo `get` se omite, por lo cual se accede directamente al nombre del atributo.

```java
System.out.println(admin.name());
admin.isAdministrator();
```

Para utilizar cualquiera de los métodos personalizados, se invocan de la misma forma que en una clase normal.

```java
System.out.println(admin.getUserName());
```

Como se generan de forma automática los métodos `equals`, `hashCode` y `toString`, se pueden utilizar de la misma forma que en una clase normal.

```java
public static void main(String[] args) {
    User admin = new User("Jordi", "me@asjordi.dev", true);
    User user = new User("John", "johndoe@gmail.com");

    // Utiliza por defecto el método toString
    System.out.println(admin);

    // Utiliza el método equals
    System.out.println(admin.equals(user));
}
```

## Conclusiones

Los records son una nueva característica de Java que permiten crear estructuras de datos inmutables de forma sencilla y sin escribir tanto código. Son una alternativa a las clases habituales de Java y pueden ser una buena opción es casos en los que se necesiten objetos inmutables, como por ejemplo en la creación de DTO. Aunque los records no son una solución para todos los problemas, pueden ser una buena opción en muchos casos. Sin olvidar que para poder utilizarlos es necesario tener instalado el JDK 17 o superior.