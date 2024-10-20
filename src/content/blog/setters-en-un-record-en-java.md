---
title: "Setters en un Record en Java"
description: "¿Cómo se pueden modificar los atributos de un Record en Java?"
pubDate: "Oct 21 24"
heroImage: "../../assets/blog/images/post37/cover.webp"
tags: ["Java", "Record"]
---

Un **record** es una estructura que se caracteriza por ser inmutable, es decir, una vez que se ha creado un objeto de tipo **record**, no se pueden modificar sus atributos, es lo equivalente a lo que otros lenguajes de programación denominan *data-class* o DTO (Data Transfer Object). Sin embargo, si se requiere modificar algún atributo mediante un método **setter** y considerando que cada atributo dentro del record es de tipo `final`, ¿cómo se puede lograr esto?

Para mostrar si esto es posible, vamos a crear un record `Product` que tiene dos atributos `name` y `price`, y los respectivos métodos que se crean automáticamente al definir un record en Java:

```java
public record Product(String name, double price) { }
```

Ahora, si se crea un objeto de tipo `Product` y se intenta modificar el atributo `name`, se puede observar que no es posible, y ni siquiera existe un método **setter** para hacerlo:

```java
Product p = new Product("Bread", 1.0);
p.setName("Water"); // Error: cannot resolve method 'setName' in 'Product'
```

Pero, si sabemos que un **record** puede tener métodos adicionales, entonces se puede crear un método `setName(String name)` que modifique el atributo `name` y le asigne el nuevo valor, pues la respuesta es que no, no funciona como lo haría en una clase normal, por ejemplo:

```java
public record Product(String name, double price) {
    // Error: cannot asign a value to final variable 'name'
    public void setName(String name) {
        this.name = name;
    }
}
```

Entonces, ¿cómo se puede modificar un atributo de un **record** en Java? La respuesta es que se puede si el método **set** devuelve una nueva instancia del **record** con cada uno de sus atributos y obviamente con el o los atributos modificados. Este proceso puede ser un poco tedioso dependiendo del número de atributos que tenga el **record**.

```java
public record Product(String name, double price) {
    
    public Product setName(String name) {
        return new Product(name, this.price);
    }
    
    public Product setPrice(double price) {
        return new Product(this.name, price);
    }
    
}
```

De esta manera al invocar cualquiera de los métodos **setter** se obtendrá una nueva instancia del tipo `Product` con el atributo modificado, por ejemplo:

```java
Product p = new Product("Bread", 1.0);
Product q = p.setName("Milk");
Product r = q.setPrice(2.0);
```

Para cada objeto `p`, `q` y `r` se pueden invocar de forma normal sus métodos `get`, `equals`, `hashCode` y `toString`, considerando que ninguno de los objetos es igual a otro, ya que cada uno tiene un valor diferente en sus atributos.

```java
public class Main {
    public static void main(String[] args) {
        Product p = new Product("Bread", 1.0);
        Product q = p.setName("Milk");
        Product r = q.setPrice(2.0);

        System.out.println(p); // Product[name=Bread, price=1.0]
        System.out.println(q); // Product[name=Milk, price=1.0]
        System.out.println(r); // Product[name=Milk, price=2.0]

        System.out.println(p.equals(q)); // false
        System.out.println(q.equals(r)); // false
        System.out.println(r.equals(p)); // false
    }
}
```

En este punto, es importante considerar si este enfoque es el adecuado para el problema que se está resolviendo, considerando que un **record** está diseñado para ser una estructura que permite almacenar y transportar información de una manera simple dentro de una aplicación y ser inmutable, o sí se requiere de una estructura con mayor flexibilidad, entonces se debería utilizar una **clase**. Para mayor información sobre cuándo utilizar un **record** o una **clase**, se puede consultar el siguiente [post](https://asjordi.dev/blog/records-vs-clases-en-java).