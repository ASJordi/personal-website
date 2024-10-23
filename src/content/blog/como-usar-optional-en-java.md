---
title: "¿Cómo usar Optional en Java?"
description: "Optional en Java"
pubDate: "Dec 02 24"
heroImage: "../../assets/blog/images/post49/cover.webp"
tags: ["Java", "Streams", "Optional"]
---

La clase `Optional` fue introducida en Java desde la versión 8, esta clase es el equivalente a `Maybe` en otros lenguajes de programación. Básicamente, `Optional` es una clase tipo contenedor que puede o no contener un valor, esto nos ayuda a evitar el ya conocido problema de los `NullPointerException`. De esta manera cualquier operación que sea propensa a devolver un `null` puede devolver un objeto de tipo `Optional<T>`, donde `T` es el tipo de dato que se espera, y de esta manera utilizar los múltiples métodos que nos ofrece esta clase para trabajar con valores que pueden o no estar presentes.

Dentro de Java cualquier método que devuelva un tipo de valor también puede devolver `null`, para ejemplificar esto considerar la siguiente clase `RepositorioAlumno` que representa un repositorio de alumnos, la cual tiene dos métodos `buscarPorId` y `buscarPorNombre` que devuelven un objeto de tipo `Alumno` o `null` si no se encuentra el alumno.

```java
public record Alumno(int id, String nombre, String apellido) { }
```

```java
public class RepositorioAlumno {
    List<Alumno> alumnos;

    public RepositorioAlumno() {
        this.alumnos = new ArrayList<>();
        cargarAlumnos();
    }

    public Alumno buscarPorId(int id) {
        Alumno alumno = null;

        for (Alumno a : this.alumnos) {
            if (a.id() == id) {
                alumno = a;
                break;
            }
        }

        return alumno;
    }

    public Alumno buscarPorNombre(String nombre) {
        Alumno alumno = null;

        for (Alumno a : this.alumnos) {
            if (a.nombre().equals(nombre)) {
                alumno = a;
                break;
            }
        }

        return alumno;
    }

    private void cargarAlumnos() {
        this.alumnos.add(new Alumno(1, "Marcos", "Perez"));
        this.alumnos.add(new Alumno(2, "Lucia", "Gomez"));
        this.alumnos.add(new Alumno(3, "Juan", "Garcia"));
        this.alumnos.add(new Alumno(4, "Ana", "Martinez"));
        this.alumnos.add(new Alumno(5, "Pedro", "Lopez"));
    }
}
```

Creamos una instancia de la clase y ejecutamos el método `buscarPorId`.

```java
RepositorioAlumno repo = new RepositorioAlumno();
Alumno alumno = repo.buscarPorId(10);
System.out.println(alumno.nombre());
```

Si ejecutamos el código anterior obtendremos un `NullPointerException` ya que el objeto `alumno` es `null` y estamos intentando acceder a un método de un objeto que no existe. Por lo que, si sabemos que el método `buscarPorId` es propenso a devolver un `null`, antes de poder llamar a cualquier método del objeto devuelto debemos hacer una validación para verificar si el objeto es distinto de `null`.

```java
RepositorioAlumno repo = new RepositorioAlumno();
Alumno alumno = repo.buscarPorId(10);

if (alumno != null) {
    System.out.println(alumno.nombre());
}
```

Para este caso sabemos que no existe ningún alumno con `id = 10` por lo que el objeto `alumno` será `null` y no se imprimirá nada por consola. Esta sería la forma normal de trabajar con valores que pueden ser `null`, pero existe la posibilidad de que en algún momento estos valores no sean manejados y se produzca un `NullPointerException`. En este contexto es donde `Optional<T>` intenta mejorar esta forma de trabajar para realizar de manera más explícita la comprobación de sí un objeto/variable tiene un valor o no.

## Crear un Optional

Optional tiene tres métodos estáticos que permiten crear un objeto de tipo `Optional<T>`, estos son:

- `empty()`: Devuelve un objeto `Optional` vacío, es decir, un objeto que no contiene ningún valor, pero que no es `null`.
- `of(T value)`: Devuelve un objeto `Optional` con el valor pasado como argumento, si el valor es `null` se lanzará una excepción `NullPointerException`.
- `ofNullable(T value)`: Devuelve un objeto `Optional` con el valor pasado como argumento, si el valor es `null` se devolverá un objeto `Optional` vacío. Este método es la combinación de los dos anteriores.

```java
Optional<Integer> edad = Optional.empty();
Optional<String> nombre = Optional.of("John");
Optional<String> primerApellido = Optional.ofNullable("Doe");
Optional<String> segundoApellido = Optional.ofNullable(null);
```

Entendiendo lo anterior, podemos modificar los métodos `buscarPorId` y `buscarPorNombre` para que devuelvan un objeto de tipo `Optional<Alumno>`.

```java
public Optional<Alumno> buscarPorId(int id) {
    Optional<Alumno> alumno = Optional.empty();

    for (Alumno a : this.alumnos) {
        if (a.id() == id) {
            alumno = Optional.of(a);
            break;
        }
    }

    return alumno;
}

public Optional<Alumno> buscarPorNombre(String nombre) {
    Optional<Alumno> alumno = Optional.empty();

    for (Alumno a : this.alumnos) {
        if (a.nombre().equals(nombre)) {
            alumno = Optional.of(a);
            break;
        }
    }

    return alumno;
}
```

En la declaración de cada método se define que deben devolver un objeto del tipo `Optional<Alumno>`, en caso de que el alumno no sea encontrado se devolverá un objeto `Optional` vacío que no contiene ningún valor, pero que no es `null`.

## Obtener un valor de un Optional

La clase `Optional` ofrece una serie de métodos que nos permiten trabajar con los valores que pueden o no estar presentes de varias maneras, muchos de ellos están vinculados con el uso de `Streams`, aunque dentro de los más utilizados se encuentran los siguientes:

- `isPresent()`: Devuelve `true` si el objeto `Optional` contiene un valor, de lo contrario devuelve `false`.
- `isEmpty()`: Devuelve `true` si el objeto `Optional` no contiene un valor, de lo contrario devuelve `false`.
- `get()`: Devuelve el valor contenido en el objeto `Optional`, si el objeto no contiene ningún valor se lanzará una excepción `NoSuchElementException`.
- `orElse(T other)`: Devuelve el valor contenido en el objeto `Optional`, si el objeto no contiene ningún valor se devolverá el valor pasado como argumento.
- `orElseGet(Supplier<? extends T> other)`: Devuelve el valor contenido en el objeto `Optional`, si el objeto no contiene ningún valor se devolverá el valor generado por el `Supplier`.
- `orElseThrow()`: Devuelve el valor contenido en el objeto `Optional`, si el objeto no contiene ningún valor se lanzará la excepción generada por el `Supplier`.
- `ifPresent(Consumer<? super T> consumer)`: Ejecuta el `Consumer` pasado como argumento si el objeto `Optional` contiene un valor.

Antes de poder obtener el valor que tenga un objeto `Optional` es útil utilizar los métodos `isPresent` o `isEmpty` dentro de un bloque `if` para verificar si el objeto contiene un valor o no.

```java
RepositorioAlumno repo = new RepositorioAlumno();
Optional<Alumno> alumnoOptional = repo.buscarPorId(1);

if (alumnoOptional.isEmpty()) System.out.println("No se encontro el alumno");
else System.out.println("Alumno encontrado");
```

De esta manera podemos obtener el objeto `Alumno` contenido en el objeto `Optional` utilizando alguno de los métodos mencionados anteriormente, por ejemplo, obtener el nombre del alumno.

```java
RepositorioAlumno repo = new RepositorioAlumno();
Optional<Alumno> alumnoOptional = repo.buscarPorId(1);

if (alumnoOptional.isPresent()) {
    System.out.println(alumno.get().nombre());
}
```

O si queremos evitar este tipo de comprobaciones podemos utilizar alguno de los métodos `orElse` teniendo en cuenta que pueden pasar 3 escenarios, que se devuelva el valor contenido en el `Optional`, que se devuelva el valor pasado como argumento o que se lance una excepción.

```java
RepositorioAlumno repo = new RepositorioAlumno();
Optional<Alumno> alumnoOptional = repo.buscarPorId(1);

Alumno alumno1 = alumnoOptional.orElse(new Alumno(0, "No", "Encontrado"));
Alumno alumno2 = alumnoOptional.orElseGet(() -> new Alumno(0, "No", "Encontrado"));
Alumno alumno3 = alumnoOptional.orElseThrow();
```

Esta forma condicional de obtener el valor de un objeto `Optional` también se puede realizar utilizando el método `ifPresent` que recibe un `Consumer` como argumento y hará que se ejecute el `Consumer` si el objeto `Optional` contiene un valor.

```java
RepositorioAlumno repo = new RepositorioAlumno();
Optional<Alumno> alumnoOptional = repo.buscarPorId(1);

alumnoOptional.ifPresent(alumno -> {
    System.out.println("Alumno encontrado: " + alumno.nombre() + " " + alumno.apellido());
});
```

## Optional y Streams

Siguiendo con el ejemplo anterior, podemos modificar los métodos `buscarPorId` y `buscarPorNombre` para que devuelvan un objeto de tipo `Optional<Alumno>` utilizando la API Stream de Java y hacer el código más limpio y eficiente.

```java
public Optional<Alumno> buscarPorId(int id) {
    return this.alumnos.stream().filter(a -> a.id() == id).findFirst();
}

public Optional<Alumno> buscarPorNombre(String nombre) {
    return this.alumnos.stream().filter(a -> a.nombre().equals(nombre)).findFirst();
}
```

En conclusión `Optional` es una clase bastante útil y disponible en versiones recientes, ya que permite siempre devolver un valor independientemente de que sea `null` o no, y nos ofrece una serie de métodos que nos permiten trabajar de manera más segura con valores que pueden o no estar presentes. Además de su integración con la API de `Streams` que nos permite realizar operaciones de manera más eficiente y segura.