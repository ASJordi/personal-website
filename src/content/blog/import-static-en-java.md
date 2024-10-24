---
title: "import static en Java"
description: "Importar variables y métodos estáticos en Java"
pubDate: "Dec 04 24"
heroImage: "../../assets/blog/images/post50/cover.webp"
tags: ["Java", "Fundamentos"]
---

La palabra clave `import` nos permite **importar** clases, interfaces, enumeraciones, etc. de otros paquetes con el objetivo de poder utilizarlos en nuestro código. Por ejemplo, si queremos utilizar la clase `ArrayList` de la librería `java.util`, podemos importarla de la siguiente manera y crear una instancia de la misma:

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
    }
}
```

También podríamos importar una clase utilizando su nombre completo, considerando que este se compone del nombre del paquete y el nombre de la clase, interfaz, etc. separados por un punto, lo cual puede ser tedioso y hacer el código menos legible, aunque al final también es una manera válida de hacerlo:

```java
public class Main {
    public static void main(String[] args) {
        java.util.ArrayList<String> list = new java.util.ArrayList<>();
    }
}
```

O incluso podemos importar todo el contenido de un paquete utilizando el carácter comodín `*`, lo cual nos permitiría utilizar cualquier clase, interfaz, etc. del paquete sin tener que escribir su nombre completo o tener múltiples `import` que apunten al mismo paquete pero a diferentes clases, interfaz, etc.:

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        Map<String, String> map = new HashMap<>();
        Set<String> set = new HashSet<>();
    }
}
```

`import static` no funciona para importar clases, sino para importar **variables y métodos estáticos** de una clase, lo cual nos permite utilizarlos sin tener que escribir el nombre de la clase a la que pertenecen. Su sintaxis es similar a la de `import`, pero con la palabra clave `static` seguida de la clase y el miembro estático que queremos importar. Por ejemplo, si queremos utilizar la constante `PI` de la clase `Math` de la librería `java.lang`, podemos importarla de la siguiente manera y utilizarla sin tener que escribir `Math.PI`:

```java
import static java.lang.Math.PI;

public class Main {
    public static void main(String[] args) {
        System.out.println(PI);
    }
}
```

En caso de no importar la constante `PI` de esta manera, tendríamos que importar la clase `Math` y utilizar la constante `PI` de la siguiente manera:

```java
import java.lang.Math;

public class Main {
    public static void main(String[] args) {
        System.out.println(Math.PI);
    }
}
```

El principal beneficio de `import static` es que nos permite utilizar variables y métodos estáticos de manera más sencilla y legible, sin la necesidad de escribir el nombre completo de la clase a la que pertenecen. Por ejemplo, si queremos utilizar el método `asList` de la clase `Arrays` de la librería `java.util`, podemos importarlo de la siguiente manera y utilizarlo sin tener que escribir `Arrays.asList`:

```java
import java.util.List;
import static java.util.Arrays.asList;

public class Main {
    public static void main(String[] args) {
        List<String> list = asList("a", "b", "c");
    }
}
```

`import static` también nos permite importar todos los miembros estáticos de una clase utilizando el carácter comodín `*`, por ejemplo, si queremos importar todos los miembros estáticos de la clase `Arrays` de la librería `java.util`, podemos hacerlo de la siguiente manera:

```java
import static java.util.Arrays.*;

public class Main {
    public static void main(String[] args) {
        int[] array = {3, 1, 2};
        sort(array);
        int suma = stream(array).sum();
        System.out.println(suma);
    }
}
```

En resumen, `import static` nos permite importar variables y métodos estáticos de una clase para utilizarlos sin tener que escribir el nombre completo de la clase a la que pertenecen, lo cual nos permite hacer nuestro código más sencillo y legible. Es importante utilizarlo con moderación y en casos donde realmente mejore la legibilidad del código, ya que en exceso puede hacer que el código sea más difícil de entender.