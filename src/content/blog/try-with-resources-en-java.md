---
title: "Try with resources en Java"
description: "Cerrar recursos automáticamente en Java"
pubDate: "Dec 16 24"
heroImage: "../../assets/blog/images/post53/cover.webp"
tags: ["Java", "Exceptions"]
---

Al trabajar con recursos en Java, como archivos, conexiones a bases de datos, sockets, etc., es importante cerrarlos correctamente una vez que ya no se necesitan, de lo contrario se pueden producir algunos problemas como fugas de memoria o bloqueos de recursos. 

En Java, la forma tradicional de cerrar recursos es utilizando bloques `try-catch-finally`, donde dentro del bloque `finally` se cierran los recursos, siempre y cuando estos tengan un método `close()`, para más información sobre este bloque puedes consultar el siguiente [post](https://asjordi.dev/blog/que-es-el-bloque-finally-en-java-y-como-se-utiliza).

El bloque `try-with-resources` es una alternativa al bloque `try-catch-finally` cuando se trabaja con recursos que se pueden cerrar automáticamente, siendo necesario que estos implementen la interfaz `AutoCloseable` o `Closeable`, siendo esta la única condición para que un determinado recurso pueda ser utilizado en este bloque. Considerando que los recursos se cerrarán automáticamente sin importar si se lanzan excepciones o no en el flujo de ejecución.

La sintaxis del bloque `try-with-resources` es la siguiente:

```java
try (ResourceType resource = new ResourceType()) {
    // Código que utiliza el recurso
} catch (Exception e) {
    // Manejo de excepciones
}
```

Para ejemplificar el uso del bloque `try-with-resources`, consideremos que tenemos un método `readFile` que recibe como parámetro el nombre de un archivo y retorna un `String` con el contenido del archivo, en primera instancia este solo utiliza un bloque `try-catch` para leer el archivo y cerrar los recursos manualmente.

```java
public static String readFile(String name) {
    StringBuilder sb = new StringBuilder();
    File file = new File(name);

    try {
        Reader r = new FileReader(file);
        BufferedReader br = new BufferedReader(r);
        String line = "";
        while ((line = br.readLine()) != null) {
            sb.append(line).append("\n");
        }
        
        r.close();
        br.close();
    } catch (FileNotFoundException e) {
        System.out.println(e.getMessage());
        throw new RuntimeException(e);
    } catch (IOException e) {
        System.out.println(e.getMessage());
        throw new RuntimeException(e);
    }

    return sb.toString();
}
```

Ahora implementemos este método utilizando el bloque `try-catch-finally`:

```java
public static String readFile(String name) throws IOException {
    StringBuilder sb = new StringBuilder();
    File file = new File(name);

    Reader r = null;
    BufferedReader br = null;
    
    try {
        r = new FileReader(file);
        br = new BufferedReader(r);
        String line = "";
        while ((line = br.readLine()) != null) {
            sb.append(line).append("\n");
        }
    } catch (FileNotFoundException e) {
        System.out.println(e.getMessage());
        throw new RuntimeException(e);
    } catch (IOException e) {
        System.out.println(e.getMessage());
        throw new RuntimeException(e);
    } finally {
        r.close();
        br.close();
    }

    return sb.toString();
}
```

Considerando este método podemos ver lo siguiente:

- Los recursos `Reader` y `BufferedReader` se inicializan fuera del bloque `try`, para que puedan ser cerrados en el bloque `finally`.
- En caso de que cualquiera de los recursos sea `null`, se lanzará una excepción al intentar cerrarlo, por lo que se deben anidar bloques `try-catch` adicionales para manejar estas excepciones.
- Se pueden propagar las excepciones lanzadas al cerrar los recursos en la firma del método, lo que puede no ser deseable.

Al utilizar el bloque `try-with-resources`, el código anterior se simplifica y se vuelve más legible, ya que los recursos se cierran automáticamente y no es necesario anidar bloques `try-catch` adicionales.

```java
public static String readFile(String name) {
    StringBuilder sb = new StringBuilder();
    File file = new File(name);

    try (Reader r = new FileReader(file);
         BufferedReader br = new BufferedReader(r)) {
        String line = "";
        while ((line = br.readLine()) != null) {
            sb.append(line).append("\n");
        }
    } catch (IOException e) {
        System.out.println(e.getMessage());
        throw new RuntimeException(e);
    }

    return sb.toString();
}
```

Los recursos `Reader` y `BufferedReader` se declaran e inicializan dentro del bloque `try`, en caso de solo ser un recurso no es necesario colocar `;` al final de la declaración, en caso contrario se deben separar por `;` tal y como se muestra en el ejemplo. Es importante recordar que cada recurso debe implementar la interfaz `AutoCloseable` o `Closeable` para poder ser utilizado en este bloque.

Ahora podemos ejecutar el método e imprimir por consola el contenido del archivo:

```java
var output = readFile("file.txt");
System.out.println(output);

// Output:
Hello world!
```

Listo, de esta manera nos aseguramos de que todos los recursos utilizados se cierren automáticamente, sin la necesidad de llamar al método `close()` explícitamente. En caso de que se utilice un bloque `try-catch-finally` para cerrar los recursos el propio IDE nos sugerirá reemplazarlo por un bloque `try-with-resources` si es posible.