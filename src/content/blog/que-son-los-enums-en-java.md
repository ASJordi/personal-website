---
title: "¿Qué son los enums en Java?"
description: "Enums en Java"
pubDate: "Dec 30 24"
heroImage: "../../assets/blog/images/post57/cover.webp"
tags: ["Java", "Fundamentos"]
---

En Java las enumeraciones o `enum` son un tipo especial de clase que representa un grupo de constantes (valores inmutables), es decir, un conjunto fijo de valores que no cambian con el tiempo, por lo que todos los posibles valores se conocen en tiempo de compilación, por ejemplo, los días de la semana, los meses del año, los colores, etc.

Dado que un `enum` es un tipo de clase se podría pensar que necesitamos instanciarlo para usarlo, sin embargo, esto no es necesario, aunque tiene las mismas capacidades que una clase normal, como atributos, métodos, constructores e incluso implementar interfaces, la única consideración es que no se puede implementar el concepto de herencia en un `enum`. Su principal objetivo es definir nuestros propios tipos de datos (Enumerated Data Types). Algunas propiedades a destacar de un `enum` son:

- Cada `enum` internamente es implementado como una clase usando el class type.
- Cada constante de un `enum` representa un objeto de tipo `enum`.
- Todos los `enums` implícitamente extiende de `java.lang.Enum`, como una clase solo puede extender de un padre, un `enum` no puede extender de otra clase.
- Cada constante de un `enum` es implícitamente del tipo `public static final`.
- Pueden utilizarse en estructuras de control como `switch`.
- Se puede declarar un método `main()` dentro de un `enum`.
- El método `toString()` se sobrescribe para devolver el nombre de la constante.

## Declaración de un enum

Podemos declarar un `enum` dentro o fuera de una clase, o en un archivo por separado, pero no dentro de un método. La sintaxis para declarar un `enum` es la siguiente:

```java
enum NombreEnum {
    CONSTANTE1, CONSTANTE2, CONSTANTE3, ...
}
```

> Por convención las constantes de un `enum` se escriben en mayúsculas.
> Regularmente la primera línea de un `enum` es la declaración de las constantes, seguido de los atributos, métodos y constructores en caso de ser necesario.

```java
// Enum declarado fuera de una clase
enum Color {
    RED, GREEN, BLUE;
}

public class Main {
    public static void main(String[] args) {}
}
```

```java
// Enum declarado dentro de una clase
public class Main {
    public static void main(String[] args) {}

    enum Color {
        RED, GREEN, BLUE;
    }
}
```

Para acceder a cualquiera de las constantes de un `enum` solo necesitamos usar el nombre del `enum` seguido de un punto y el nombre de la constante.

```java
Color color = Color.RED;
```

Puede que no sea tan necesario, pero si requerimos obtener el nombre de una constante tal cual fue declarada, podemos usar el método `name()`, aunque en ocasiones se omite por el método `toString()` en caso de necesitar algo más descriptivo.

```java
System.out.println(Color.RED.name()); // RED
System.out.println(Color.RED); // RED
```

## Obtener constantes de un enum

Podemos obtener todos las constantes de un `enum` utilizando el método `values()`, el cual nos devuelve un arreglo con todas las constantes.

```java
Color[] colors = Color.values();

for (Color color : colors) {
    System.out.println(color);
}
```

En caso de que necesitemos obtener una constante con base en su nombre, ya sea porque lo recibimos como entrada, lo obtenemos de un archivo o de una base de datos, podemos usar el método `valueOf()`, solo debemos considerar que este método es sensible a mayúsculas y minúsculas, por lo que si el nombre no coincide con ninguna constante se lanzará una excepción de tipo `IllegalArgumentException`.

```java
Color color = Color.valueOf("RED");
System.out.println(color); // RED
```

Anteriormente, vimos como podemos obtener todas las constantes como un arreglo, por lo que puede que pienses si es posible obtener el índice de una constante, la respuesta es sí, podemos usar el método `ordinal()` para obtener el índice de una constante, al igual que en un arreglo el índice comienza en cero.

```java
System.out.println(Color.RED.ordinal()); // 0
System.out.println(Color.GREEN.ordinal()); // 1
System.out.println(Color.BLUE.ordinal()); // 2
```

## Usar un enum en un switch

Una de las ventajas de usar un `enum` es que podemos utilizarlo en una estructura de control `switch`, lo cual nos permite simplificar el código y hacerlo más legible.

```java
Color color = Color.RED;

switch (color) {
    case RED -> System.out.println("Red");
    case GREEN -> System.out.println("Green");
    case BLUE -> System.out.println("Blue");
    default -> System.out.println("Unknown color");
}
```

## Atributos y constructores en un enum

Cada una de las constantes de un `enum` puede tener atributos personalizados, tal y como en una clase normal, solo es necesario considerar que debe existir un constructor que inicialice los atributos, de esta manera al momento de cargar las constantes, se llamará al constructor correspondiente implícitamente. Sabiendo que cada constante es un objeto de tipo `enum` en la declaración deberemos pasar los valores de los atributos de acuerdo al constructor.

```java
public enum Usuario {
    ADMINISTRADOR("Admin", 1, "Administrador"), 
    USUARIO("User", 2, "Usuario"), 
    INVITADO("Guest", 3, "Invitado");

    private final String nombre;
    private final int nivel;
    private final String descripcion;
    private final int code = 0;

    Usuario(String nombre, int nivel, String descripcion) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.descripcion = descripcion;
    }
}
```

Para este `enum` tenemos 3 constantes, cada una con 3 atributos, `nombre`, `nivel` y `descripcion`, además de un atributo `code` que es común para todas las constantes, pero no es necesario que sea inicializado en el constructor, ya que es un valor constante. Cada uno de los atributos puede tener diferentes modificadores de acceso, todo depende de nuestras necesidades.

## Métodos en un enum

Considerando el ejemplo anterior, podemos inferir que al ser cada atributo del tipo `private` necesitamos una manera de acceder a ellos, por lo que podemos declarar métodos `getter` para cada uno de los atributos.

```java
package org.jordi.example;

public enum Usuario {
    ADMINISTRADOR("Admin", 1, "Administrador"),
    USUARIO("User", 2, "Usuario"),
    INVITADO("Guest", 3, "Invitado");

    private final String nombre;
    private final int nivel;
    private final String descripcion;
    private final int code = 0;

    Usuario(String nombre, int nivel, String descripcion) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.descripcion = descripcion;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public int getNivel() {
        return nivel;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public int getCode() {
        return code;
    }
}
```

También podemos declarar métodos de utilidad en un `enum`, por ejemplo, un método que nos permita obtener una constante con base en un nivel. Solo hay que considerar que el método debe ser estático, ya que no podemos instanciar un `enum`.

```java
public static Usuario getUsuario(int nivel) {
    for (Usuario u : Usuario.values()) {
        if (u.getNivel() == nivel) {
            return u;
        }
    }
    return null;
}
```

## Métodos abstractos en un enum

Ya hemos visto como implementar métodos en un `enum`, pero si necesitamos que cada constante implemente un método de manera diferente, podemos declarar un método abstracto y cada constante deberá implementarlo de manera obligatoria a su manera, considerar que con esto la sintaxís cambia un poco en la declaración de las constantes. Por ejemplo, declaremos un método abstracto `mostrarPermisos()` que imprima por consola los permisos de cada constante.

```java
public enum Usuario {
    ADMINISTRADOR("Admin", 1, "Administrador"){
        @Override
        public void mostrarPermisos() {
            System.out.println("Permisos: \n- Crear usuarios\n- Eliminar usuarios\n- Modificar usuarios");
        }
    },
    USUARIO("User", 2, "Usuario"){
        @Override
        public void mostrarPermisos() {
            System.out.println("Permisos: \n- Modificar perfil\n- Ver perfil");
        }
    },
    INVITADO("Guest", 3, "Invitado"){
        @Override
        public void mostrarPermisos() {
            System.out.println("Permisos: \n- Ver perfil");
        }
    };

    private final String nombre;
    private final int nivel;
    private final String descripcion;
    private final int code = 0;

    Usuario(String nombre, int nivel, String descripcion) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.descripcion = descripcion;
    }

    public abstract void mostrarPermisos();

    public static Usuario getUsuario(int nivel) {
        for (Usuario u : Usuario.values()) {
            if (u.getNivel() == nivel) {
                return u;
            }
        }
        return null;
    }

    // Getters
}
```

## Interfaces en un enum

Un `enum` puede implementar una o varias interfaces, de la misma manera que una clase normal, solo es necesario separar las interfaces con una coma.

```java
public enum Usuario implements Serializable {
// Código
}
```

## EnumSet y EnumMap

Java proporciona dos clases para trabajar con `enum`, `EnumSet` y `EnumMap`, las cuales son más eficientes que las clases `HashSet` y `HashMap` respectivamente, ya que están diseñadas para trabajar con `enum`. `EnumSet` es una colección de elementos únicos de un `enum`, mientras que `EnumMap` es una implementación de `Map` que utiliza un `enum` como clave.

```java
// Contiene todos los valores del enum Usuario
EnumSet<Usuario> users = EnumSet.allOf(Usuario.class);
// Contiene valores especificos del enum Usuario
EnumSet<Usuario> users2 = EnumSet.of(Usuario.ADMINISTRADOR, Usuario.USUARIO);
// Contiene valores en un rango del enum Usuario
EnumSet<Usuario> users3 = EnumSet.range(Usuario.ADMINISTRADOR, Usuario.USUARIO);

// Contiene todos los valores del enum Usuario
EnumMap<Usuario, String> usersMap = new EnumMap<>(Usuario.class);
usersMap.put(Usuario.ADMINISTRADOR, "Admin");
usersMap.put(Usuario.USUARIO, "User");
usersMap.put(Usuario.INVITADO, "Guest");
```

## Ejemplo completo

Ya hemos visto las diferentes características de un `enum`, ahora veamos un ejemplo donde hagamos uso de todas ellas.

```java
public class Main {
    public static void main(String[] args) {

        Usuario admin = Usuario.ADMINISTRADOR;
        Usuario user = Usuario.getUsuario(2);
        Usuario guest = Usuario.valueOf("INVITADO");

        // Invocar métodos
        System.out.println(admin.getNombre());
        System.out.println(user.getNivel());
        System.out.println(guest.getDescripcion());

        // Switch
        Usuario u = Usuario.USUARIO;
        switch (u) {
            case ADMINISTRADOR -> u.mostrarPermisos(); // Llamada a método abstracto
            case USUARIO -> System.out.println(u.getNombre());
            case INVITADO -> System.out.println(u.getDescripcion());
        }
        
        // Recorrer todos los valores
        for (Usuario usuario : Usuario.values()) {
            System.out.println(usuario.getNombre());
        }

    }
}
```

## Conclusión

Los `enums` son una característica muy útil en Java, ya que nos permiten definir nuestros propios tipos de datos, lo que nos ayuda a hacer nuestro código más legible y mantenible, además de que nos permite trabajar con constantes de manera más eficiente. Aunque no es una característica nueva, es importante conocerla y saber cómo utilizarla, porque en muchos casos nos puede ayudar a simplificar nuestro código.