---
title: "Tips para escribir mejor código en Java"
description: "Tips y trucos para escribir código más limpio y eficiente en Java."
pubDate: "May 26 25"
heroImage: "../../assets/blog/images/post79/cover.webp"
tags: ["Java", "Fundamentos"]
---

Cada uno de los siguientes tips/trucos por sí solos pueden parecer insignificantes, pero en conjunto permiten tener un código más fácil de leer, más mantenible y menos propenso a errores, a la vez que hacen uso de características modernas de Java. En cada uno de los ejemplos se muestra una versión "mala" y una versión "buena" del código, donde la segunda es la recomendada.

## 1. try-with-resources

En lugar de tener que preocuparse por cerrar recursos manualmente, ya sea comprobando si han sido abiertos o utilizando un bloque `finally`, podemos utilizar un bloque `try-with-resources` que se encarga de cerrar automáticamente los recursos una vez que ya no se están utilizando. Esto es especialmente útil para manejar archivos, conexiones de red, bases de datos, etc.

```java
BufferedReader br = null;

try {
    br = new BufferedReader(new FileReader("data.txt"));
    String line;

    while ((line = br.readLine()) != null) System.out.println(line);
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (br != null) try {
        br.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

```java
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
    String line;
    while ((line = br.readLine()) != null) System.out.println(line);
} catch (IOException e) {
    e.printStackTrace();
}
```

## 2. StringBuilder

Dado que un `String` es inmutable, cuando se concatena utilizando el operador `+` se crean múltiples objetos `String` en memoria, lo que puede ser ineficiente. En su lugar, podemos utilizar un `StringBuilder`, que es mutable y permite concatenar cadenas de manera más eficiente. Incluso el propio IDE puede llegar a realizar esta recomendación de manera automática.

```java
String res = "";

for (int i = 0; i < 10000; i++) {
    res += i;
}

System.out.println(res);
```

```java
StringBuilder res = new StringBuilder();

for (int i = 0; i < 10000; i++) {
    res.append(i);
}

System.out.println(res);
```

## 3. Early Return

En lugar de anidar múltiples bloques `if` y `else`, podemos utilizar un retorno anticipado para simplificar el flujo del código. Esto mejora la legibilidad y mantenibilidad del código.

```java
private void processOrder(Order o) {
    if (o != null) {
        if (o.isValid()) {
            if (o.hasValidItems()) {
                // process order
            } else {
                // handle invalid items
            }
        } else {
            // handle invalid order
        }
    } else {
        // handle null order
    }
}
```

```java
private void processOrder(Order o) {
    if (o == null) {
        // handle null order
        return;
    }
    
    if (!o.isValid()) {
        // handle invalid order
        return;
    }
    
    if (!o.hasValidItems()) {
        // handle order with invalid items
        return;
    }
    
    // Process order
}
```

## 4. Enums

Los `enums` proveen seguridad de tipos, permiten crear un código más autodocumentado y evitan el uso de constantes mágicas, incluso permiten agregar métodos y atributos a los mismos. En lugar de utilizar constantes enteras o cadenas de texto, podemos utilizar `enums` para representar un conjunto fijo de valores.

```java
class Status {
    public static final int ACTIVE = 1;
    public static final int INACTIVE = 0;
}

public void process(int status) {
    if (status == Status.ACTIVE) {
        // do something
    }
}
```

```java
public enum Status {
    ACTIVE,
    INACTIVE
}

public void process(Status status) {
    if (status == Status.ACTIVE) {
        // do something
    }
}
```

## 5. Optional

El uso de `Optional` permite evitar las posibles comprobaciones respecto de `null`, las excepciones `NullPointerException` y el uso de bloques `if-else`, lo que mejora la legibilidad y mantenibilidad del código. En lugar de devolver `null` para indicar la ausencia de un valor, podemos utilizar `Optional` para representar un valor que puede o no estar presente.

```java
public static String getNormalizedName(Person p) {
    if (p != null && p.getName() != null) {
        return p.getName().toUpperCase();
    }

    return null;
}
```

```java
public static String getNormalizedName(Person p) {
    return Optional.ofNullable(p)
            .map(Person::getName)
            .map(String::toUpperCase)
            .orElse("UNKNOWN");
}
```

## 6. Lambdas y Referencias de Métodos

Utilizar lambdas y referencias de métodos permite escribir código más conciso y legible, especialmente al trabajar con colecciones y la API de Streams. De esta manera se pueden eliminar clases anónimas, bucles innecesarios y código verboso.

```java
List<String> names = Arrays.asList("John", "Mary", "Peter", "Paul", "Anna");

Collections.sort(names, new Comparator<String>() {
    @Override
    public int compare(String o1, String o2) {
        return o1.compareTo(o2);
    }
});
```

```java
List<String> names = Arrays.asList("John", "Mary", "Peter", "Paul", "Anna");

names.sort(String::compareTo);
```

## 7. Static Factory Methods

En ocasiones puede resultar factible usar métodos de fábrica estáticos en lugar de constructores, ya que permiten crear instancias de una clase de manera más legible y flexible. Esto es especialmente útil cuando se trabaja con clases inmutables o cuando se desea proporcionar diferentes formas de crear instancias.

```java
public class Car {

    public Car (String model, int year, String color) {
        // logic
    }

}

public static void main(String[] args) {
    var car = new Car("Fiat", 2020, "red");
}
```

```java
public class Car {
    
    private String model;
    private int year;
    private String color;

    private Car (String model, int year, String color) {
        this.model = model;
        this.year = year;
        this.color = color;
    }
    
    public static Car of(String model, int year, String color) {
        // Extra validation or logic
        return new Car(model, year, color);
    }

}

public static void main(String[] args) {
    var car = Car.of("Toyota", 2020, "Red");
}
```

## 8. Logging

En lugar de utilizar `System.out.println` para imprimir mensajes de depuración o información, es recomendable utilizar un framework de logging como `Log4j`, `SLF4J` o `java.util.logging`. Esto permite un mejor control sobre los niveles de logging, la configuración y la salida de los mensajes. Incluso algunos frameworks, como SLF4J, permiten un logging parametrizable, o el uso de `Supplier` para evitar la creación de cadenas innecesarias.

```java
System.out.println("Attempting to read last fetch date");
```

```java
LOGGER.log(Level.INFO, () -> "Attempting to read last fetch date");
```

## 9. Objects.requireNonNull

`Objects.requireNonNull` es un método estático que permite verificar si un objeto es `null` y lanzar una `NullPointerException` con un mensaje personalizado. Esto es útil para validar argumentos en métodos y constructores, evitando la necesidad de escribir bloques `if` adicionales.

```java
public class Person {

    private String name;

    public void setName(String name) {
        if (name == null) {
            throw new IllegalArgumentException("Name cannot be null");
        }
        
        this.name = name;
    }

}
```

```java
import java.util.*;

public class Person {

    private String name;

    public void setName(String name) {
        this.name = Objects.requireNonNull(name, "Name cannot be null");
    }

}
```

## 10. computeIfAbsent en Map

El método `computeIfAbsent` de la interfaz `Map` permite calcular un valor y agregarlo al mapa solo si la clave no está presente. Esto es útil para evitar comprobaciones adicionales e inicializar valores de manera más concisa.

```java
String str = "hello";
Map<String, List<String>> map = new HashMap<>();

if (!map.containsKey("key")) {
    map.put("key", new ArrayList<>());
}

map.get("key").add(str);
```

```java
String str = "hello";
Map<String, List<String>> map = new HashMap<>();
map.computeIfAbsent("key", k -> new ArrayList<>()).add(str);
```

## 11. merge en Map

El método `merge` de la interfaz `Map` permite combinar valores de manera más concisa y eficiente. Esto es útil para evitar comprobaciones adicionales y simplificar la lógica de combinación.

```java
String str = "hello";
Map<Character, Integer> map = new HashMap<>();

for (char c : str.toCharArray()) {
    if (!map.containsKey(c)) {
        map.put(c, 1);
    } else {
        map.put(c, map.get(c) + 1);
    }
}
```

```java
String str = "hello";
Map<Character, Integer> map = new HashMap<>();

for (char c : str.toCharArray()) {
    map.merge(c, 1, Integer::sum);
}
```

## 12. Records

Los `records` son una característica relativamente nueva que permite crear clases inmutables de manera más concisa. Esto es útil para representar datos sin necesidad de escribir código adicional para constructores, métodos `equals`, `hashCode` y `toString`, es decir, evitar el típico boilerplate de Java. Pueden resultar muy útiles para representar objetos de valor o DTOs (Data Transfer Objects), y también pueden ser utilizados con Pattern Matching.

```java
public class Person {
    private final String name;
    private final int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

```java
public record Person(String name, int age) {}
```

## Conclusión

Estos son solo algunos de los muchos tips y trucos que pueden ayudarte a escribir código más limpio y eficiente en Java. A continuación puedes encontrar enlaces a diferentes post donde se ven a profundidad algunos de estos temas.

- [try-with-resources](https://asjordi.dev/blog/try-with-resources-en-java/)
- [Bloque finally](https://asjordi.dev/blog/que-es-el-bloque-finally-en-java-y-como-se-utiliza/)
- [Enums](https://asjordi.dev/blog/que-son-los-enums-en-java/)
- [Optional](https://asjordi.dev/blog/como-usar-optional-en-java/)
- [Stream API](https://asjordi.dev/blog/tag/Streams/)
- [Lambdas](https://asjordi.dev/blog/tag/Lambdas/)
- [Pattern Matching](https://asjordi.dev/blog/pattern-matching-en-java/)