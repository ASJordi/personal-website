---
title: "Cómo mapear objetos en Java con MapStruct"
description: "Mapear objetos en Java"
pubDate: "Feb 10 25"
heroImage: "../../assets/blog/images/post64/cover.webp"
tags: ["Java", "MapStruct", "Lombok"]
---

**MapStruct** es un generador de código que simplifica la implementación de mapeos entre objetos de Java permitiendo realizar este proceso de forma rápida y sencilla. Comúnmente en aplicaciones multicapa de Java se suele requerir mapear diferentes modelos de objetos, por ejemplo, entidades y DTO. Si se realiza de una manera manual puede ser tedioso y propenso a errores. Este es el propósito de MapStruct, simplificar el proceso de mapeo entre objetos. A diferencia de otras librerías, MapStruct genera los mapeos en tiempo de compilación, lo que permite un mejor rendimiento y una comprobación de errores más rápida.

MapStruct al ser un procesador de anotaciones se puede utilizar desde la línea de comandos usando Maven o Gradle, así como desde un IDE como IntelliJ IDEA o Eclipse.

## Instalación

Para este ejemplo vamos a utilizar Maven, por lo que es necesario agregar lo siguiente al archivo `pom.xml`.

```xml
<properties>
    <org.mapstruct.version>1.6.3</org.mapstruct.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct</artifactId>
        <version>${org.mapstruct.version}</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>1.8</source> <!-- Dependiendo de tu proyecto -->
                <target>1.8</target> <!-- Dependiendo de tu proyecto -->
                <annotationProcessorPaths>
                    <path>
                        <groupId>org.mapstruct</groupId>
                        <artifactId>mapstruct-processor</artifactId>
                        <version>${org.mapstruct.version}</version>
                    </path>
                    <!-- Otras dependencias de procesadores de anotaciones -->
                </annotationProcessorPaths>
            </configuration>
        </plugin>
    </plugins>
</build>
```

En caso de utilizar otra herramienta para la construcción de proyectos, se puede consultar la [documentación oficial](https://mapstruct.org/documentation/installation).

## Configurar con Lombok

MapStruct se puede combinar con Lombok para reducir la cantidad de código que se escribe. Para ello, es necesario agregar las dependencias de `lombok` y `lombok-mapstruct-binding`, esta última es necesaria para que MapStruct pueda reconocer las anotaciones de Lombok.

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.36</version>
    <scope>provided</scope>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok-mapstruct-binding</artifactId>
    <version>0.2.0</version>
    <scope>provided</scope>
</dependency>
```

Ahora en el apartado de `annotationProcessorPaths` del `maven-compiler-plugin` se deben configurar estas dependencias.

```xml
<path>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.36</version>
</path>
<path>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok-mapstruct-binding</artifactId>
    <version>0.2.0</version>
</path>
```

Al final, nuestro archivo `pom.xml` queda de la siguiente manera.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>dev.asjordi</groupId>
    <artifactId>MapStruct</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <org.mapstruct.version>1.6.3</org.mapstruct.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.modelmapper</groupId>
            <artifactId>modelmapper</artifactId>
            <version>3.2.0</version>
        </dependency>
        <dependency>
            <groupId>org.mapstruct</groupId>
            <artifactId>mapstruct</artifactId>
            <version>${org.mapstruct.version}</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.36</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok-mapstruct-binding</artifactId>
            <version>0.2.0</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>21</source>
                    <target>21</target>
                    <annotationProcessorPaths>
                        <path>
                            <groupId>org.mapstruct</groupId>
                            <artifactId>mapstruct-processor</artifactId>
                            <version>${org.mapstruct.version}</version>
                        </path>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <version>1.18.36</version>
                        </path>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok-mapstruct-binding</artifactId>
                            <version>0.2.0</version>
                        </path>
                    </annotationProcessorPaths>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.2.5</version>
            </plugin>
        </plugins>
    </build>

</project>
```

## Configurar JUnit

Para realizar pruebas unitarias y verificar que los mapeos se están realizando correctamente, es necesario agregar la dependencia de JUnit al archivo `pom.xml` (este paso es completamente opcional).

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.11.3</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.junit</groupId>
    <artifactId>junit-bom</artifactId>
    <version>5.11.3</version>
    <type>pom</type>
    <scope>test</scope>
</dependency>
```

En el apartado de `build` se debe agregar el plugin `maven-surefire-plugin` para ejecutar las pruebas unitarias.

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.2.5</version>
</plugin>
```

## Crear clases de ejemplo

Supongamos que tenemos una clase `User` con los atributos `id`, `name` y `email` que nos servirá como entidad base para mapearla a un DTO (Data Transfer Object).

```java
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String name;
    private String email;
}
```

Ahora definimos una clase `UserDTO` con los atributos `name` y `email`.

```java
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String name;
    private String email;
}
```

MapStruct también funciona con records, en general, este puede ser un mejor enfoque dado que la principal función de un DTO es almacenar y transferir datos de un punto a otro, donde la inmutabilidad es una característica deseable. Creamos un record `UserRecord` con los atributos `name` y `email`, en este caso no es necesario utilizar Lombok.

Si tienes dudas sobre los records, puedes consultar dentro del [blog](https://asjordi.dev/blog/tag/Record) al respecto.

```java
public record UserRecord(String name, String email) { }
```

## Crear un mapper

Para crear un mapper con MapStruct, se debe crear una interfaz con el nombre `UserMapper` (el nombre depende de cada uno) y anotarla con `@Mapper`. En esta interfaz se deben definir los métodos de mapeo entre las clases `User`, `UserDTO` y `UserRecord`.

```java
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO userToUserDTO(User user);
    UserRecord userToUserRecord(User user);
    User userDTOToUser(UserDTO userDTO);
    User userRecordToUser(UserRecord userRecord);
}
```

La interfaz `UserMapper` tiene las siguientes características:

- La anotación `@Mapper` indica que esta interfaz es un mapper.
- La constante `INSTANCE` es un objeto que se utiliza para obtener una instancia del mapper.
- Los métodos `userToUserDTO` y `userToUserRecord` mapean un objeto `User` a un objeto `UserDTO` y `UserRecord` respectivamente.
- Los métodos `userDTOToUser` y `userRecordToUser` mapean un objeto `UserDTO` y `UserRecord` a un objeto `User` respectivamente.

Si tenemos atributos con diferente nombre, tanto en la entidad (source) como en el DTO (target), se puede utilizar la anotación `@Mapping` para indicar el nombre del atributo en la entidad y el nombre del atributo en el DTO.

```java
@Mapping(source = "name", target = "name")
@Mapping(source = "email", target = "email")
UserDTO userToUserDTO(User user);
```

En este punto ya tenemos tanto la entidad a mapear como el DTO, así como el mapper que se encargará de realizar el mapeo entre ambos.

## Realizar el mapeo

Para realizar el mapeo de una entidad, basta con utilizar el atributo `INSTANCE` de la interfaz `UserMapper` y llamar al método correspondiente, tanto para mapear de la entidad al DTO como del DTO a la entidad.

```java
public class Main {
    public static void main(String[] args) {
        // Mapeo de User a UserDTO y UserRecord
        
        User user = new User(1L, "John Doe", "jonh@gmail.com");
        UserDTO userDTO = UserMapper.INSTANCE.userToUserDTO(user);
        UserRecord userRecord = UserMapper.INSTANCE.userToUserRecord(user);

        System.out.println("User: " + user); // User: User(id=1, name=John Doe, email=jonh@gmail.com)
        System.out.println("UserDTO: " + userDTO); // UserDTO: UserDTO(name=John Doe, email=jonh@gmail.com)
        System.out.println("UserRecord: " + userRecord); // UserRecord: UserRecord[name=John Doe, email=jonh@gmail.com]

        // Mapeo inverso de UserDTO a User y UserRecord a User

        User userFromDTO = UserMapper.INSTANCE.userDTOToUser(userDTO);
        User userFromRecord = UserMapper.INSTANCE.userRecordToUser(userRecord);

        System.out.println("User from DTO: " + userFromDTO); // User from DTO: User(id=null, name=John Doe, email=jonh@gmail.com)
        System.out.println("User from Record: " + userFromRecord); // User from Record: User(id=null, name=John Doe, email=jonh@gmail.com)
    }
}
```

En el ejemplo anterior, se crea un objeto `User` con los atributos `id`, `name` y `email`, luego se mapea a un objeto `UserDTO` y `UserRecord`. Posteriormente, se realiza el mapeo inverso de un objeto `UserDTO` y `UserRecord` a un objeto `User`.

## Test unitarios

Para verificar que los mapeos entre objetos se están realizando correctamente, se pueden realizar pruebas unitarias con JUnit. En este caso, se crea una clase `MapstructTest` con diferentes pruebas unitarias para verificar los mapeos entre objetos.

```java
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class MapstructTest {

    private static User user;

    @BeforeAll
    public static void setup() {
        user = new User(1L, "John Doe", "jonh@gmail.com");
    }

    @Test
    @DisplayName("Test User to UserDTO")
    void testUserToUserDTO() {
        UserDTO userDTO = UserMapper.INSTANCE.userToUserDTO(user);
        assertEquals(user.getName(), userDTO.getName());
        assertEquals(user.getEmail(), userDTO.getEmail());
    }

    @Test
    @DisplayName("Test User to UserRecord")
    void testUserToUserRecord() {
        UserRecord userRecord = UserMapper.INSTANCE.userToUserRecord(user);
        assertEquals(user.getName(), userRecord.name());
        assertEquals(user.getEmail(), userRecord.email());
    }

    @Test
    @DisplayName("Test UserDTO to User")
    void testUserDTOToUser() {
        UserDTO userDTO = UserMapper.INSTANCE.userToUserDTO(user);
        User userFromDTO = UserMapper.INSTANCE.userDTOToUser(userDTO);
        assertEquals(userDTO.getName(), userFromDTO.getName());
        assertEquals(userDTO.getEmail(), userFromDTO.getEmail());
    }

    @Test
    @DisplayName("Test UserRecord to User")
    void testUserRecordToUser() {
        UserRecord userRecord = UserMapper.INSTANCE.userToUserRecord(user);
        User userFromRecord = UserMapper.INSTANCE.userRecordToUser(userRecord);
        assertEquals(userRecord.name(), userFromRecord.getName());
        assertEquals(userRecord.email(), userFromRecord.getEmail());
    }

}
```

Se pueden ejecutar los tests desde el propio IDE o usando el comando `mvn test` desde la línea de comandos.

## Conclusiones

Como hemos visto crear mapeos entre objetos es muy sencillo utilizando MapStruct. Además, al ejecutarse en tiempo de compilación proporciona un mejor rendimiento y una comprobación de errores más rápida. En este ejemplo hemos visto cómo mapear una entidad a un DTO y viceversa, así como realizar pruebas unitarias para verificar que los mapeos se están realizando correctamente, puede que los mapeos del ejemplo sean simples, pero funciona de la misma manera con mapeos más complejos.

Puedes consultar el código fuente de este ejemplo en mi [repositorio de GitHub](https://github.com/ASJordi/mapstruct-ejemplo).