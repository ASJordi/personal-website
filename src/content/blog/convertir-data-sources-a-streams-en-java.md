---
title: "Convertir Data Sources a Streams en Java"
description: "Serie: Refactorizando del estilo imperativo al funcional en Java"
pubDate: "May 19 25"
heroImage: "../../assets/blog/images/post78/cover.webp"
tags: ["Java", "Streams", "IntStream", "Funcional"]
---

En publicaciones anteriores de esta serie de tutoriales, analizamos la conversión de bucles con estilo imperativo a un estilo funcional. En este post, veremos cómo ver un data source desde una perspectiva funcional, como un _Stream_ o flujo de datos y cómo convertir la iteración usando la API Stream en Java.

Ya hemos visto como usar los métodos `filter()` y `map()` para filtrar y transformar datos, respectivamente, y cómo usar estas operaciones en medio de un pipeline de operaciones. Podemos usar los métodos `range()` y `rangeClosed()` para crear un flujo de valores en un rango de números determinado. Esto funciona bien cuando queremos iterar sobre un rango conocido de valores, pero a menudo, podemos requerir trabajar con datos que provienen de fuentes externas, por ejemplo, un archivo de texto. Si podemos trabajar con un recurso externo como un flujo (stream), entonces podemos aplicar fácilmente operaciones funcionales. En este post veremos un ejemplo que ilustra esta idea.

## Estilo imperativo a funcional

Supongamos que queremos iterar sobre las líneas de un archivo, y a su vez contar la cantidad de líneas donde aparece una determinada palabra. A continuación, se muestra el código que realiza esta tarea de forma imperativa:

```java
Path path = Paths.get("data.txt");
String targetWord = "lorem";

try (Reader r = new FileReader(path.toFile());
     BufferedReader br = new BufferedReader(r)) {
    String line;
    int count = 0;

    while ((line = br.readLine()) != null) {
        if (line.contains(targetWord)) {
            count++;
        }
    }

    System.out.printf("Found %d lines with the word %s%n", count, targetWord);

} catch (IOException e) {
    e.printStackTrace();
}
```

En este ejemplo, utilizamos la variable `path` para hacer referencia a un archivo de texto llamado `data.txt`, y `targetWord` es la palabra que queremos buscar en cada línea del archivo, en caso de querer utilizar otro archivo y palabra a buscar, simplemente debemos cambiar el valor de estas variables.

Este ejemplo consta de dos partes principales. Utilizamos `BufferedReader` para leer el contenido del archivo que nos interesa consultar. Luego, en el bucle `while`, verificamos cada línea para ver si contiene la palabra deseada y, si es así, incrementamos el valor de la variable de conteo `count` para indicar que hemos encontrado una línea que contiene la palabra.

Examinemos las dos partes, comenzado por la segunda. Si observamos de cerca el bucle, a partir de post anteriores, podemos reconocer que la presencia de un condicional `if` es una señal de que podemos usar la operación `filter()` si podemos escribir el código como una secuencia funcional. Una vez que filtramos las líneas que contiene la palabra deseada, podemos contar la cantidad de líneas, utilizando el método `count()` de la API Stream.

Pasemos a la primera parte. Los datos, es decir, las líneas de texto, proviene del archivo cuya ruta se proporciona en la variable `path`. Estamos leyendo los datos utilizando el método `readLine()` de `BufferedReader` e iterando sobre cada línea de texto. Entonces puede surgir la siguiente pregunta, ¿Es posible obtener el contenido de un archivo como un flujo de datos en Java?

Afortunadamente, la respuesta es que sí. Se han agregado características al JDK que permiten trabajar con archivos como un flujo de datos (stream). Una forma sencilla de convertir el contenido de un archivo en un flujo de datos es utilizando el método `lines()` de la clase `Files` que forma parte del paquete `java.nio.file`. Ahora podemos refactorizar el código anterior para que sea más funcional.

```java
Path path = Paths.get("data.txt");
String targetWord = "lorem";

try (Stream<String> stream = Files.lines(path)) {
    var count = stream.filter(line -> line.contains(targetWord)).count();
    System.out.printf("Found %d lines with the word %s%n", count, targetWord);

} catch (IOException e) {
    e.printStackTrace();
}
```

El método `lines()` no solo proporciona un flujo de datos sobre el contenido de un archivo, sino que también elimina gran parte de los problemas que implica leer las líneas de un archivo. En lugar del iterador externo, donde obteníamos una línea a la vez, el stream permite utilizar un iterador interno, de forma que podemos centrarnos en qué hacer con cada línea de texto a medida que aparece en el flujo de datos.

En el código refactorizado, el flujo de datos se cierra automáticamente al final del bloque `try-with-resources`, por lo que no es necesario cerrarlo explícitamente. El método `filter()` se utiliza para filtrar las líneas que contienen la palabra deseada, y el método `count()` se utiliza para contar la cantidad de líneas que cumplen con el criterio de filtrado.

Siempre que se trabaje con una colección de datos de un recurso externo, nos podemos preguntar si existe una manera para obtener un stream del contenido del recurso. Es probable que exista una función dentro del JDK o incluso una biblioteca de terceros. Una vez que obtenemos un flujo de datos, podemos usar operadores funcionales como `filter()`, `map()`, etc., para iterar y realizar operaciones sobre los datos.

En esta serie de publicaciones cubrimos las siguientes conversiones del estilo imperativo al funcional:

1. [Convertir un simple for](https://asjordi.dev/blog/como-refactorizar-bucles-for-a-intstream-en-java/)
2. [Convertir loops con steps](https://asjordi.dev/blog/bucle-for-a-intstream-con-iterate-en-java/)
3. [Convertir un foreach con if](https://asjordi.dev/blog/convertir-un-foreach-con-if-a-un-stream-con-filter-en-java)
4. [Convertir iteraciones con transformaciones](https://asjordi.dev/blog/convertir-elementos-usando-map-en-java)
5. [Convertir Data Sources a Streams](https://asjordi.dev/blog/convertir-data-sources-a-streams-en-java)
