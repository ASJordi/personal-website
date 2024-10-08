---
title: "Records vs Clases en Java"
description: "Diferencias entre Records y Clases en Java"
pubDate: "Oct 16 24"
heroImage: "../../assets/blog/images/post36/cover.webp"
tags: ["Java", "Record"]
---

Si ya conoces los **records** en Java puede que su uso te resulte muy similar al de las clases, pero hay diferencias importantes que se deben tener en consideración. En este artículo vamos a ver las diferencias entre los **records** y las **clases** en Java. Si aún no conoces los **records** te recomiendo la lectura de mi post [Records en Java: qué son y cómo utilizarlos](https://asjordi.dev/blog/records-en-java-que-son-y-como-utilizarlos).

## Inmutabilidad

Un objeto inmutable es aquel cuyos atributos no pueden ser modificados una vez que se ha creado el objeto. En el caso de los **records**, estos son inmutables, es decir, una vez que se ha creado un objeto de tipo **record**, no se pueden modificar sus atributos. Por otra parte, una clase puede o no ser inmutable, dependiendo de cómo se haya implementado. Esta parte asegura la integridad de los datos y evita que se modifiquen de forma accidental.

## Propósito

Comúnmente se escriben clases simplemente para almacenar datos, como los de una consulta a una base de datos, o los datos de un formulario. En muchos casos, estos datos son inmutables, ya que se necesita asegurar la validez de los datos sin utilizar sincronización. Para lograr esto se escribe una clase con los siguientes elementos:

- Atributos privados para cada campo.
- Getters para cada campo.
- Un constructor que inicializa todos los campos.
- Un método `equals` que compara los objetos por igualdad.
- Un método `hashCode` que genera un código hash basado en los campos.
- Un método `toString` que genera una representación de cadena de los campos.

Por ejemplo, si se tiene una clase `Person` con dos atributos `name` y `lastName`, se podría escribir de la siguiente manera:

```java
public class Person {
    
    private final String name;
    private final String lastName;
    
    public Person(String name, String lastName) {
        this.name = name;
        this.lastName = lastName;
    }

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }
    
    @Override
    public String toString() {
        return "Person{" + "name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person person)) return false;
        return Objects.equals(getName(), person.getName()) && Objects.equals(getLastName(), person.getLastName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getLastName());
    }
}
```

Esta es una solución para la tarea, pero es mucho código para lo que realmente se necesita. En caso de que la clase tuviera más atributos, sería un código aún más largo de escribir, incluso si se realiza con la ayuda de un IDE o un plugin como GitHub Copilot. Una mejor solución sería declarar nuestra clase como una data-class, es decir, una clase que solo almacena datos, y no tiene por qué tener un comportamiento específico, y aquí es donde entran los **records**. 

De este modo la clase `Person` se podría reescribir como un **record** de la siguiente manera:

```java
public record Person(String name, String lastName) { }
```

Esto automáticamente genera los métodos `equals`, `hashCode` y `toString`, así como los métodos `getter` para cada uno de los atributos.

## ¿Cuáles son las diferencias entre un Record y una Clase?

- **Inmutabilidad**: Los **records** son inmutables, es decir, una vez que se ha creado un objeto de tipo **record**, no se pueden modificar sus atributos. En cambio, una clase puede o no ser inmutable, dependiendo de cómo se haya implementado.
- **Métodos generados**: Los **records** generan automáticamente los métodos `equals`, `hashCode` y `toString`, así como los métodos `getter` para cada uno de los atributos. En cambio, en las clases, estos métodos deben ser implementados manualmente o con la ayuda de un IDE.
- **Uso en POO**: Los **records** no pueden heredar de otras clases, ni ser extendidos por otras clases, pero sí pueden implementar interfaces. En cambio, las clases pueden heredar de otras, ser extendidas, y en general son ideales para cubrir los conceptos de la Programación Orientada a Objetos.
- **Sintaxis**: La sintaxis de un **record** es más simple que la de una clase, ya que se puede definir en una sola línea, mientras que una clase requiere de varias líneas de código.
- **Propósito**: Los **records** son una estructura que se asemeja a un DTO (Data Transfer Object), es decir, una clase que ayuda a modelar datos inmutables, por su parte una **clase** es una estructura más general que puede tener comportamiento y estado.

## ¿Cuándo usar un Record y cuándo una Clase?

Si lo que se requiere es una estructura de datos inmutables para almacenar datos y no se necesita realizar modificaciones en los atributos (simplemente se ve como un objeto para transportar información). Por otro lado, si se necesita una estructura más general que posea una lógica única y métodos específicos, un enfoque para un paradigma orientado a objetos, aplicar patrones de diseño, o trabajar con JPA o Hibernate, etc., entonces se debería utilizar una clase.

## Extra: Record con atributos mutables

Consideremos el siguiente ejemplo, se tienen dos records `Product` con los atributos `name` y `price`, y `Cart` con un solo atributo `products` del tipo `ArrayList<Product>` y algunos métodos para obtener la cantidad de productos y el total del carrito.

```java
package org.jordi.example;

public record Product(String name, double price) { }
```

```java
package org.jordi.example;

import java.util.ArrayList;
import java.util.List;

public record Cart(List<Product> products) {

    public Cart() {
        this(new ArrayList<>());
    }

    public int getQuantity() {
        return this.products.size();
    }

    public double getTotal() {
        return this.products.stream().mapToDouble(Product::price).sum();
    }
}
```

La cuestión en este caso es que cada uno de los **record** es inmutable por sí mismo, pero en el caso del record `Cart` al tener un atributo del tipo `ArrayList<>` y dado que por naturaleza un `ArrayList` es mutable, se puede modificar el contenido de la lista una vez que se crea una instancia del record `Cart`.

```java
package org.jordi.example;

public class Main {
    public static void main(String[] args) {
        Product water = new Product("Water", 15);
        Product milk = new Product("Milk", 22);

        Cart cart = new Cart();
        cart.products().add(water);
        cart.products().add(milk);
        System.out.println("Price: " + cart.getTotal());

        cart.products().clear();
        System.out.println("Quantity: " + cart.getQuantity());
        System.out.println("Price: " + cart.getTotal());
    }
}
```

El código anterior compila sin problemas, ya que solo se está modificando el contenido de la lista, pero no se está modificando el atributo `products` en sí. Este solo es un ejemplo para un caso particular, que probablemente no sea necesario, pero es bueno saber que esto se puede realizar.