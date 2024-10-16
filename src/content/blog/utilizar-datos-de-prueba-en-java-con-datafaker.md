---
title: "Utilizar datos de prueba en Java con DataFaker"
description: "¿Cómo generar datos de prueba en Java?"
pubDate: "Nov 13 24"
heroImage: "../../assets/blog/images/post44/cover.webp"
tags: ["Java", "DataFaker"]
---

DataFaker es una biblioteca para Java que permite generar datos de prueba de manera sencilla. Esto puede resultar útil en situaciones donde se necesitan datos para generar tests, alguna demostración o simplemente para llenar una base de datos con datos de prueba, y evitar tener que hacerlo manualmente. Esta biblioteca está basada en Java Faker (aunque esta tiene tiempo sin actualizarse) y posee más de 200 proveedores de datos diferentes, por lo que el tipo de datos que se pueden generar es muy variado.

## Instalación

DataFaker se puede instalar utilizando Maven, Gradle o Ivy, para este caso se utilizará Maven, por lo que solo se debe agregar la siguiente dependencia al archivo `pom.xml`:

```xml
<dependency>
    <groupId>net.datafaker</groupId>
    <artifactId>datafaker</artifactId>
    <version>2.4.0</version>
</dependency>
``` 

## Uso

Para utilizar DataFaker, se debe crear una instancia de la clase `DataFaker` y luego se pueden utilizar los métodos de esta clase para generar los datos de prueba.

```java
Faker f = new Faker();
```

Por ejemplo, si se necesita un nombre y apellido se puede utilizar alguno de los métodos dentro de `name()`:

```java
var name = f.name().firstName();
var lastName = f.name().lastName();
System.out.println("Hello, my name is " + name + " " + lastName);

// Output
Hello, my name is Patsy Heller
```

Si ejecutamos el código anterior un par de veces, podemos observar que los nombres generados son diferentes y están en un idioma diferente. Para hacer que los datos sean aún más realistas se puede especificar un parámetro `Locale` dentro del constructor de `Faker` de alguna de las siguientes maneras:

```java
Faker f = new Faker(Locale.ENGLISH);

Faker f = new Faker(Locale.forLanguageTag("es"));

Faker f = new Faker(Locale.forLanguageTag("es-MX"));

Faker f = new Faker(new Locale("es")); // Esto esta deprecado desde el JDK 19
```

Utilizando cualquiera de las opciones anteriores los datos generados estarán en el idioma especificado, aunque depende de cada proveedor de datos si lo soporta o no. Para má información sobre los `Locales` se puede consultar la [documentación oficial](https://www.oracle.com/java/technologies/javase/jdk17-suported-locales.html).

Para realizar un ejemplo más variado consideremos el siguiente record de tipo `Person`:

```java
public record Person(Integer id, String firstName, String lastName, String username, String address, String job, String favoriteColor) { }
```

Ahora se puede generar una lista de 10 personas con datos de prueba de la siguiente manera:

```java
Faker f = new Faker(Locale.forLanguageTag("es-MX"));
List<Person> persons = new ArrayList<>();

for (int i = 0; i < 10; i++) {
    persons.add(
            new Person(
                    f.number().numberBetween(1, 1000),
                    f.name().firstName(),
                    f.name().lastName(),
                    f.internet().username(),
                    f.address().fullAddress(),
                    f.job().title(),
                    f.color().name()
            )
    );
}
```

Finalmente, se puede imprimir la lista de personas generadas:

```java
persons.forEach(System.out::println);
```

De esta manera se pueden generar datos de prueba de manera sencilla y rápida utilizando DataFaker, para obtener más información sobre los proveedores de datos disponibles se puede consultar la [documentación oficial](https://www.datafaker.net/documentation/getting-started/).