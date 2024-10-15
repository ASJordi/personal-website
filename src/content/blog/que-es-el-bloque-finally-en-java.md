---
title: "El bloque finally en Java"
description: "¿Qué es el bloque finally en Java y cómo se utiliza?"
pubDate: "Nov 11 24"
heroImage: "../../assets/blog/images/post43/cover.webp"
tags: ["Java", "Exceptions"]
---

Cuando se trabaja con excepciones en Java, es común encontrase con la necesidad de utilizar un bloque `try-catch` para manejarlas y no solo delegar su manejo a quien llame a esta parte del código. Sin embargo, en ocasiones es necesario realizar ciertas acciones, independientemente de si se lanzó o no una excepción, o si el flujo de ejecución del programa se completó con éxito, por ejemplo, cerrar un archivo, una conexión a una base de datos, etc.

Para estos casos es que se utiliza el bloque `finally`. Este bloque se coloca después del bloque `catch`, o incluso después del bloque `try` si no se utiliza un bloque `catch`. El código que se coloque dentro del bloque `finally` se ejecutará en dos escenarios:

- Cuando termine el bloque `try` y no se haya lanzado ninguna excepción.
- Cuando ocurra una excepción, por lo que el flujo de ejecución se interrumpirá y se ejecutará el bloque `catch`.

## Ejemplo 1

Consideremos un método `divide` que recibe dos números enteros y retorna el resultado de la división entre ellos. En este se utiliza un bloque `try-catch` para manejar la excepción que se lanza cuando se intenta dividir por cero, así como un bloque `finally` para imprimir un mensaje que indique que se están limpiando los recursos.

```java
public static int divide(int a, int b) {
        try {
            return a / b;
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
            throw e;
        } finally {
            System.out.println("Cleaning up resources...");
        }
    }
```

Al llamar al método `divide` con los valores `10` y `2`, se obtendrá la siguiente salida:

```
Cleaning up resources...
5
```

Como podemos ver, no se lanzó ninguna excepción, por lo que el método retornó el resultado de la división y se ejecutó el bloque `finally`, aunque en la salida se muestra primero el mensaje del bloque `finally`. Por otro lado, si se llama al método `divide` con los valores `10` y `0`, se obtendrá la siguiente salida:

```
Error: / by zero
Cleaning up resources...
Exception in thread "main" java.lang.ArithmeticException: / by zero ...
```

En este caso, se lanzó una excepción, por lo que el flujo de ejecución se interrumpió y se ejecutó el bloque `catch`, pero antes de lanzar la excepción nuevamente, se ejecutó el bloque `finally`. En ambos ejemplos hemos visto que el bloque `finally` se ejecuta siempre, independientemente del resultado obtenido.

## Ejemplo 2

La principal utilidad del bloque `finally` es para liberar recursos que se hayan adquirido en el bloque `try`, como por ejemplo, cerrar un archivo, una conexión a una base de datos, o una conexión de red. Para ejemplificar esto, consideremos un método `readFile` que lee el contenido de un archivo y retorna la primera línea. En este se utiliza un bloque `try-catch` para manejar la excepción que se lanza si no se puede leer el archivo, así como un bloque `finally` para cerrar el archivo.

```java
public static String readFile() throws IOException {
    FileReader reader = null;
    try {
        reader = new FileReader("file.txt");
        BufferedReader buffer = new BufferedReader(reader);
        return buffer.readLine();
    } catch (IOException e) {
        System.out.println("Error: " + e.getMessage());
        throw new RuntimeException(e);
    } finally {
        if (reader != null) reader.close();
    }
}
```

En caso de que se ejecute el método `readFile` y no se pueda leer el archivo, se obtendrá la siguiente salida:

```
Error: file.txt (The system cannot find the file specified)
Exception in thread "main" java.lang.RuntimeException: java.io.FileNotFoundException: file.txt (The system cannot find the file specified) ...
```

Como podemos ver, se lanzó una excepción, por lo que el flujo de ejecución se interrumpió y se ejecutó el bloque `catch`, pero antes de lanzar la excepción nuevamente, se ejecutó el bloque `finally` para cerrar el archivo. Por otro lado, si se crea un archivo `file.txt` con el contenido `Hello world!` y se llama al método `readFile`, se obtendrá la siguiente salida, sin lanzar ninguna excepción:

```java
Hello world!
```

Algunos aspectos a tener en cuenta en este ejemplo son:

- Se declaró la variable `reader` fuera del bloque `try` para que pueda ser accedida desde el bloque `finally`, es decir, este dentro del scope de ambos bloques.
- Se verificó si la variable `reader` es diferente de `null` antes de intentar cerrar el archivo, ya que si no se pudo abrir el archivo, esta variable seguirá siendo `null` y lanzará una excepción al intentar cerrarla.
- La posible excepción que puede lanzar el método `close` al intentar cerrar el archivo dentro del bloque `finally` no se maneja y se propaga en la firma del método, en caso de que se quiera manejar, se puede envolver en un bloque `try-catch` dentro del bloque `finally`.

## Conclusión

El uso de `finally` dentro de Java se ha vuelto tan habitual que el propio lenguaje tiene una alternativa que permite simplificar el manejo de recursos, el bloque `try-with-resources`. Este bloque se encarga de cerrar los recursos automáticamente al finalizar su uso, por lo que no es necesario utilizar un bloque `finally` para liberar los recursos. Sin embargo, es importante tener en cuenta que el bloque `finally` sigue siendo útil en ciertos casos y ambas opciones pueden ser utilizadas en conjunto.
