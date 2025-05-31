---
title: "Cómo escribir DTOs en Java"
description: "DTOs en Java"
pubDate: "Jun 02 2025"
heroImage: "../../assets/blog/images/post80/cover.webp"
tags: ["Java", "Fundamentos", "Record", "Lombok"]
---

Un DTO (Data Transfer Object) es un objeto que permite mover datos entre diferentes capas de una aplicación, por ejemplo, entre un cliente y un servidor. Dentro de Java existen diferentes formas de implementarlo, ya sea con alguna estructura propia del lenguaje o alguna librería externa, lo cual está condicionado por la versión de Java que se esté utilizando. Durante este post veremos tres formas de implementar un DTO: dos de ellas utilizando solo Java y la última con una librería externa.

## Definición de DTO

Crear un DTO conlleva tener los siguientes elementos:

- Propiedades.
- Constructor vacío y/o constructor con parámetros.
- Getters y setters.
- toString().
- equals().
- hashCode().

Para los siguientes ejemplos utilizaremos una clase `User` con los siguientes atributos:

- `id` (int).
- `name` (String).
- `lastName` (String).
- `username` (String).
- `email` (String).

Un DTO puede o no contener todos los elementos de un objeto normal, dependiendo de la necesidad del mismo.

## POJO

Considerando todos los elementos anteriores, un DTO en su forma más básica y sin utilizar ninguna librería externa ni características de versiones nuevas de Java, se puede ver como un POJO (Plain Old Java Object).

```java
import java.util.Objects;

/**
 * Data Transfer Object (DTO) for representing user information.
 */
public class UserDto {

    private int id;
    private String username;
    private String email;

    /**
     * Constructor to initialize a UserDto object with the given parameters.
     *
     * @param id       the unique identifier for the user
     * @param username the username of the user
     * @param email    the email address of the user
     */
    public UserDto(int id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    /**
     * Gets the unique identifier of the user.
     *
     * @return the user ID
     */
    public int getId() {
        return id;
    }

    /**
     * Sets the unique identifier of the user.
     *
     * @param id the user ID to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Gets the username of the user.
     *
     * @return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username of the user.
     *
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Gets the email address of the user.
     *
     * @return the email address
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email address of the user.
     *
     * @param email the email address to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Returns a string representation of the UserDto object.
     *
     * @return a string containing the user's ID, username, and email
     */
    @Override
    public String toString() {
        return "UserDto{" + "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    /**
     * Compares this UserDto object to another object for equality.
     *
     * @param o the object to compare with
     * @return true if the objects are equal, false otherwise
     */
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof UserDto userDto)) return false;
        return getId() == userDto.getId() && Objects.equals(getUsername(), userDto.getUsername()) && Objects.equals(getEmail(), userDto.getEmail());
    }

    /**
     * Generates a hash code for the UserDto object based on its fields.
     *
     * @return the hash code
     */
    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUsername(), getEmail());
    }
}
```

A pesar de que es un objeto muy sencillo, con solo 3 atributos, la cantidad de código que se tiene que escribir es considerable, incluso si se utiliza un IDE que genere el código automáticamente. Esta es la manera más básica/tradicional de crear un DTO, pero no es la única. A continuación veremos otras maneras de hacerlo.

## Lombok

Lombok es una librería que permite reducir la cantidad de código que se tiene que escribir para crear un DTO, y en general para cualquier objeto, mediante el uso de anotaciones. Una ventaja es que nos permite reducir el boilerplate code. El código anterior se puede simplificar de la siguiente manera:

```java
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoLombok {

    private int id;
    private String username;
    private String email;

}
```

De esta forma, el código se reduce considerablemente, por lo que nos podemos concentrar en definir lo que realmente importa, que son los atributos del DTO. Solo es necesario utilizar las anotaciones correctas y Lombok realizará el resto. Una vez que se compila el código, Lombok generará el código para el constructor, getters, setters, toString(), equals() y hashCode() automáticamente.

## Record

A partir de Java 14, se introdujo la característica de `Record`, que permite crear clases inmutables de una manera más sencilla. Un `Record` es una clase especial, muy similar a una clase normal de Java, pero con algunas diferencias clave, por ejemplo, la manera en que se declara. Considerando que es inmutable, resulta muy conveniente para utilizar como DTO.

```java
public record UserRecord(int id, String username, String email) { }
```

Ahora solo es necesario definir los atributos y nada más. El compilador generará automáticamente el constructor, getters, toString(), equals() y hashCode(). De esta manera, resulta más sencillo y limpio crear un DTO, o incluso un objeto normal, sin la necesidad de escribir tanto código.

## Uso

Una vez vistas las maneras en que se puede crear un DTO, veamos cómo se puede utilizar.

```java
public class Main {

    public static void main(String[] args) {
        User user = new User(1, "John", "Doe", "jdoe", "johndoe@gmail.com");
        UserDto userDto = new UserDto(user.getId(), user.getUsername(), user.getEmail());
        UserDtoLombok userDtoLombok = new UserDtoLombok(user.getId(), user.getUsername(), user.getEmail());
        UserRecord userRecord = new UserRecord(user.getId(), user.getUsername(), user.getEmail());
    }

}
```

Partiendo de un objeto "más completo", podemos obtener solo los datos que se requieren para el DTO, y así evitar enviar información innecesaria. El objeto `User` sirve como base para los demás objetos, es decir, es el objeto completo que contiene todos los atributos, mientras que los demás objetos son solo una representación de los atributos que se requieren. La manera de utilizar cualquier representación es similar, con la excepción de que un `Record` no tiene setters, ya que es inmutable.

## Conclusión

En este post hemos visto tres maneras de crear un DTO en Java, cada una con sus ventajas y desventajas. En general, utilizar versiones más recientes de Java es recomendable, ya que pueden tener características que faciliten ciertas tareas, como en este caso el uso de `Record`.

Si te interesa saber más sobre Lombok o los records en general, puedes consultar los siguientes enlaces:

- [Record](https://asjordi.dev/blog/tag/Record/)
- [Lombok](https://asjordi.dev/blog/proyecto-lombok-en-java/)
- 