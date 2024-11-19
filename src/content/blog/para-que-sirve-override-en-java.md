---
title: "¿Para qué sirve @Override en Java?"
description: "¿Es necesaria la anotación @Override en Java?"
pubDate: "Nov 20 24"
heroImage: "../../assets/blog/images/post46/cover.webp"
tags: ["Java", "Fundamentos"]
---

¿Por qué cuando extendemos de una clase e implementamos un método de la clase padre, debemos usar la anotación `@Override`? ¿Qué pasa si no la usamos? ¿Es necesaría incluso si el programa compila? Estas pueden ser algunas preguntas relacionadas con utilizar o no la anotación `@Override` en Java.

## ¿Qué es @Override en Java?

La anotación `@Override` es una anotación de Java que se utiliza para indicar que un método de una subclase está sobrescribiendo un método de su superclase. Es decir, se utiliza para asegurarse de que el método que estamos sobrescribiendo realmente existe en la superclase. Si no existe, el compilador lanzará un error. Esta es una definición general de la anotación `@Override`, aunque hay algunos detalles más que veremos a continuación.

Tenemos la clase `Animal` con dos métodos, `sound` y `eat`, ambos métodos imprimen por consola un mensaje genérico. Podemos crear una instancia para verificar el comportamiento de estos métodos.

```java
public class Animal {
    public void sound() {
        System.out.println("Generic animal sound");
    }

    public void eat() {
        System.out.println("Generic animal eating");
    }
}
```

```java
public static void main(String[] args) {
    Animal animal = new Animal();
    animal.sound(); // Generic animal sound
    animal.eat(); // Generic animal eating
}
```

Después, tenemos la clase `Cat` que extiende de `Animal` y sobrescribe ambos métodos para imprimir mensajes específicos de un gato, considerar que no se está utilizando la anotación `@Override` en ninguno de los métodos.

```java
public class Cat extends Animal {
    public void sound() {
        System.out.println("Meow meow");
    }

    public void eat() {
        System.out.println("Cat is eating");
    }
}
```

Dentro de la clase `Cat` el propio IDE nos muestra un _warning_ indicando es necesario agregar la anotación `@Override` justo antes de cada método sobrescrito, hasta aquí todo bien, si creamos una instancia de la clase y llamamos a los métodos, el programa compilará y ejecutará sin problemas.

```java
public static void main(String[] args) {
    Animal animal = new Cat();
    animal.sound(); // Meow meow
    animal.eat(); // Cat is eating
}
```

El motivo por el cúal el propio IDE indica que se debe de utilizar la anotación `@Override`, es porque esta anotación permite verificar si el método que estamos sobrescribiendo realmente existe en la superclase y se está extendiendo correctamente.

Por ejemplo, si el método `sound` se cambia por `soound` no existe algo que nos avise que no se está sobrescribiendo un método de la superclase. Considerando esto, si ejecutamos el ejemplo anterior nuevamente, el método `sound` que se ejecutará será el de la superclase `Animal`.

```java
public class Cat extends Animal {
    public void soound() {
        System.out.println("Meow meow");
    }

    public void eat() {
        System.out.println("Cat is eating");
    }
}
```

```java
public static void main(String[] args) {
    Animal animal = new Cat();
    animal.sound(); // Generic animal sound
    animal.eat(); // Cat is eating
}
```

Esto representa un problema, dado que el código no se comporta como se espera, y encontrar el error puede llevar algo de tiempo. En cambio, si cada método tiene la anotación `@Override`, esto no representará un problema, ya que automáticamente el compilador lanzará un error indicando que el método que estamos sobrescribiendo no existe en la superclase, y el propio IDE mostrará un _warning_.

```java
public class Cat extends Animal {
    @Override
    public void sound() {
        System.out.println("Meow meow");
    }

    @Override
    public void eat() {
        System.out.println("Cat is eating");
    }
}
```

El propósito de `@Override` no solo es declarar una expresión de intención, sino también para ayudar a detectar errores en tiempo de compilación y garantizar que el código se comporte como se espera brindando seguridad y confianza al programador. Por lo tanto, es una buena práctica utilizar la anotación siempre que se sobrescriba un método de una superclase, incluso aunque el programa compile sin problemas.