---
title: "¿Cómo usar la clase Properties en Java?"
description: "Guardar configuraciones en archivos de propiedades en Java"
pubDate: "Oct 30 24"
heroImage: "../../assets/blog/images/post40/cover.webp"
tags: ["Java", "Properties"]
---

## Introducción

Cuando trabajamos en una aplicación de Java, es común que necesitemos trabajar con algunas configuraciones, por ejemplo, la URL de una base de datos, el puerto de un servidor, entre otros. En lugar de codificar estas configuraciones directamente en el código, nos interesa obtenerlas de algún lugar externo al código, por ejemplo, un archivo de propiedades. O incluso poder guardar configuraciones en tiempo de ejecución para leerlas posteriormente.

En cualquiera de estos casos, podemos desarrollar nuestras propias soluciones para determinados escenarios, por ejemplo, crear un archivo de texto y en la primera línea guardar la URL de la base de datos, en la segunda línea el puerto del servidor, etc. Pero esto puede ser tedioso y propenso a errores, es de esta manera que se necesita una solución más robusta y escalable. Para este tipo de casos, Java nos provee una solución muy sencilla y eficiente de utilizar, la clase `Properties`.

## ¿Qué es la clase Properties?

`Properties` es una clase que se encuentra en el paquete `java.util` y que permite guardar configuraciones tanto temporalmente en memoria como de manera persistente en un archivo de propiedades, para luego poder leerlas y utilizarlas en nuestra aplicación. Al crear una instancia de la clase `Properties`, se obtiene un objeto que se comporta como un diccionario, donde cada configuración se guarda como un par clave-valor (key-value).

## Uso de la clase Properties

Para comenzar se debe crear una instancia de la clase `Properties`.

```java
Properties props = new Properties();
```

Al heredar de la clase `HashTable` (que a su vez hereda de `Dictionary`), dentro de la clase `Properties` podemos observar que tiene métodos del tipo `Object`, cuando en realidad se espera que los valores sean cadenas de caracteres o `String`, y no, no es necesario hacer un casting a `String` cada vez que se trabaje con un valor. De esta forma, aunque dentro de la instancia se tengan métodos comúnes de un mapa, en la mayoría de los casos no será necesario utilizarlos. Por ejemplo, en lugar de utilizar `get(Object key)` se puede utilizar `getProperty(String key)`.

### Definir propiedades

Para definir una propiedad se utiliza el método `setProperty(String key, String value)`, tal y como lo indica su nombre, este método recibe dos parámetros, la clave (como se quiere llamar a la propiedad) y el valor (el valor de la propiedad), considerando que siempre se espera que ambos parámetros sean de tipo `String`.

```java
Properties props = new Properties();
props.setProperty("DB_HOST", "localhost");
props.setProperty("DB_PORT", "3306");
props.setProperty("DB_USER", "root");
props.setProperty("DB_PASS", "p4ssw0rd");
```

### Obtener una propiedad

Para obtener una propiedad se puede utilizar el método `getProperty(String key)`, que recibe como parámetro la clave de la propiedad que se quiere obtener, en caso de que la propiedad no exista, se devolverá `null`.

```java
var API_URL = props.getProperty("API_URL");
System.out.println(API_URL);

// Output
null
```

Para evitar obtener `null` en caso de que una propiedad no exista, se puede utilizar el método `getProperty(String key, String defaultValue)`, que recibe como segundo parámetro un valor por defecto.

```java
var API_URL = props.getProperty("API_URL", "http://api.example.com");
System.out.println(API_URL);

// Output
http://api.example.com
```

### Iterar sobre las propiedades

Al ser un objeto de tipo mapa (aunque no se recomienda utilizar los métodos de `HashTable`), se tiene el método `entrySet()`, pero como se ve es del tipo `Object`, una alternativa para iterar sobre todas las propiedades es utilizar el método `stringPropertyNames()`, que devuelve un conjunto de cadenas de caracteres con todas las claves de las propiedades (los valores devueltos no tienen un orden específico).

```java
for (String prop : props.stringPropertyNames()) {
    System.out.println(prop + " = " + props.getProperty(prop));
}

// Output
DB_PORT = 3306
DB_PASS = p4ssw0rd
DB_USER = root
DB_HOST = localhost
```

Una manera más rápida de mostrar todas las propiedades es utilizar el método `list(PrintStream out)`, que imprime todas las propiedades en el flujo de salida que se le pase como parámetro, por ejemplo `System.out`.

```java
props.list(System.out);

// Output
-- listing properties --
DB_PORT=3306
DB_PASS=p4ssw0rd
DB_USER=root
DB_HOST=localhost
```

### Guardar propiedades en un archivo

`Properties` proporciona los métodos `store()` y `storeToXML()` para poder guardar las propiedades en un formato _properties_ (key=value) y en formato _XML_ (puede resultar útil si las propiedades se utilizarán en diferentes ambientes) respectivamente. No utilizar el método `save()` ya que está obsoleto y no se recomienda su uso, dado que no lanza excepciones en caso de que ocurra algún error.

Antes de guardar las propiedades en un archivo, podemos hacer lo siguiente para verificar por consola lo que realmente se guarda utilizando el método `store()` y `System.out`, es importante controlar de alguna manera la excepción que se lanza.

```java
props.store(System.out, "Database Configuration");

// Output
#Database Configuration
#Thu Oct 10 11:06:04 CST 2024
DB_HOST=localhost
DB_PASS=p4ssw0rd
DB_PORT=3306
DB_USER=root
```

Analizando el resultado, se puede observar que en la primera línea se guarda el comentario que se pasa como segundo argumento (no importa si es una cadena vacía, en caso de ser `null` no se imprime), en la segunda línea se guarda la fecha y hora en la que se guardaron las propiedades, y a partir de la tercera línea se guardan las propiedades en el formato _key=value_.

Si se utiliza el método `storeToXML()` se obtendrá un archivo con el siguiente contenido:

```xml
props.storeToXML(System.out, "Database Configuration");

// Output
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<comment>Database Configuration</comment>
<entry key="DB_PORT">3306</entry>
<entry key="DB_PASS">p4ssw0rd</entry>
<entry key="DB_USER">root</entry>
<entry key="DB_HOST">localhost</entry>
</properties>
```

Para guardar las propiedades en un archivo llamado `db.properties` se puede hacer lo siguiente:

```java
var path = Paths.get("db.properties");
var oss = Files.newOutputStream(path);
props.store(oss, "Database configuration");
// Se puede hacer con try-with-resources
```

Una vez ejecutado, y sí no se lanza ninguna excepción, se podrá observar que se ha creado un archivo con el nombre `db.properties` en el directorio donde se ejecutó el programa, con el siguiente contenido:

```properties
#Database configuration
#Thu Oct 10 11:13:26 CST 2024
DB_HOST=localhost
DB_PASS=p4ssw0rd
DB_PORT=3306
DB_USER=root
```

Para guardar las propiedades en formato XML basta con cambiar el método `store()` por `storeToXML()`.

```java
var path = Paths.get("db.properties.xml");
var oss = Files.newOutputStream(path);
props.storeToXML(oss, "Database configuration");
// Se puede hacer con try-with-resources
```

### Cargar propiedades desde un archivo

Supongamos que se ha modificado alguna propiedad o agregado una nueva dentro del archivo `db.properties` o `db.properties.xml`, para cargar las propiedades desde cualquiera de los dos archivos, ya sea en formato _properties_ o _XML_, se pueden utilizar los métodos `load()` y `loadFromXML()` respectivamente. Es importante controlar de alguna manera la excepción que se lanza en caso de que el archivo no exista o no se pueda leer.

```java
Properties props = new Properties();
var path = Paths.get("db.properties");
var in = Files.newInputStream(path);
props.load(in);
// Se puede hacer con try-with-resources
```

```java
Properties props = new Properties();
var path = Paths.get("db.properties.xml");
var in = Files.newInputStream(path);
props.loadFromXML(in);
// Se puede hacer con try-with-resources
```

Una vez cargadas las propiedades, se pueden mostrar por consola para verificar que se han cargado correctamente.

```java
props.list(System.out);
```

## Conclusión

Tal y como hemos visto la clase `Properties` nos permite trabajar con archivos de propiedades o configuraciones de una manera eficiente y sencilla, tanto para guardar como para leer propiedades, lo cual resulta interesante de conocer y utilizar en nuestras aplicaciones de Java.