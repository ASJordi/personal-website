---
title: "Nested Classes en Java"
description: "Clases anidadas en Java"
pubDate: "Mar 31 25"
heroImage: "../../assets/blog/images/post71/cover.webp"
tags: ["Java", "Fundamentos"]
---

En Java podemos definir una clase dentro de otra clase, a este tipo de clases se les denomina **clases anidadas** o **nested classes**. Las clases anidadas se utilizan para agrupar clases que tienen una relación lógica entre sí, de tal forma que se facilite la lectura y mantenimiento del código.

```java
class OuterClass {
    // Cuerpo de la clase
    class InnerClass {
        // Cuerpo de la clase interna
    }
}
```

Las clases anidadas se dividen en dos categorías: **no estáticas** y **estáticas**.

- Las clases anidadas no estáticas (non-static nested classes) también se conocen como **inner classes**.
- Las clases anidadas que se declaran como estáticas se conocen como **static nested classes**.

```java
class OuterClass {
    // Cuerpo de la clase
    class InnerClass {
        // Cuerpo de la clase interna
    }

    static class StaticNestedClass {
        // Cuerpo de la clase anidada estática
    }
}
```

Una clase anidada es un miembro de la clase que la contiene. Las inner class tiene acceso a otros miembros de la clase que las contiene, incluso si están declarados como `private`. Por otra parte, las clases anidadas estáticas no tiene acceso a otros miembros de la clase que las contiene. Como miembros de la clase `OuterClass`, las clases anidadas pueden ser declaradas como `private`, `public`, `protected` o `default`, considerando que la `OuterClass` solo puede ser declarada como `public` o `default`, no tiene sentido declararla como `private` o `protected`.

## ¿Por qué usar nested classes?

Entre las razones para utilizar este tipo de clases se encuentran las siguientes:

- Es una forma de agrupar lógicamente las clases que solo se utilizan es un lugar. Si una clase es útil para otra clase, entonces es lógico que estén anidadas en esa clase y mantenerlas juntas. De esta forma, anidar estas _helper classes_ hace que el paquete sea más limpio y fácil de entender.
- Aumenta la encapsulación: Consideremos dos clases de nivel superior, `A` y `B`, en las que `B` necesita acceder a miembros de `A` que, de otro modo, se declararían privados. Al ocultar la clase `B` dentro de la clase `A`, los miembros de `A` pueden declararse privados y `B` puede acceder a ellos. Además, la propia clase `B` puede ocultarse del mundo exterior usando `private` como nivel de acceso.
- Permiten tener un código más legible y fácil de mantener. Anidar clases pequeñas dentro de clases má grandes sitúa el código má cerca de donde se utiliza, considerando que todo dependerá de la lógica de negocio que se esté implementando.

## Inner classes

Al igual que ocurren con los métodos y atributos de instancia, una **inner class** está asociada a una instancia de la clase que la contiene, por lo que, tiene acceso directo a los métodos y atributos de ese objeto. Además, al estar asociada a una instancia, no puede definir ningún miembro estático por sí misma.

Los objetos que son instancias de una inner class existen dentro de una instancia de la clase que la contiene. Por ejemplo, consideremos las siguientes clases:

```java
public class OuterClass {
    class InnerClass {
        
    }
}
```

Una instancia de `InnerClass` solo puede existir dentro de una instancia de `OuterClass` y tiene acceso directo a los métodos y atributos de su instancia adjunta. Para crear una instancia de `InnerClass`, primero debemos crear una instancia de `OuterClass` y, a continuación, generar una instancia de `InnerClass` utilizando la instancia de `OuterClass`.

```java
OuterClass outerClass = new OuterClass();
OuterClass.InnerClass innerClass = outerClass.new InnerClass();
```

Existen dos tipos adicionales de inner classes. Podemos declarar una inner class dentro del cuerpo de un método, este tipo se denomina **local classes**. También se puede declarar una inner class dentro del cuerpo de un método sin darle un nombre a la clase, este tipo se denomina **anonymous classes**.

Se pueden utilizar los mismos modificadores para las inner classes que para cualquier otro miembro de la clase externa. Por ejemplo, se puede declarar una inner class como `private`, `public`, `protected` o `default` (package-private).

> La serialización de inner classes, incluidas clases locales y anónimas, es problemática y no es aconsejable.

## Inner Class Ejemplo

Imaginemos que tenemos un sistema de facturación. La clase principal `Invoice` representa una factura, y la inner class `TaxCalculator` se encarga de calcular impuestos para los productos de la factura.

```java
public class Invoice {

    private String customerName;
    private double subtotal;

    public Invoice(String customerName, double subtotal) {
        this.customerName = customerName;
        this.subtotal = subtotal;
    }

    public double calculateTotal() {
        TaxCalculator taxCalculator = new TaxCalculator();
        double tax = taxCalculator.calculateTax(subtotal);
        return subtotal + tax;
    }

    public void printInvoice() {
        System.out.println("Customer: " + customerName);
        System.out.println("Subtotal: $" + subtotal);
        System.out.println("Total (including tax): $" + calculateTotal());
    }

    private class TaxCalculator {
        private static final double TAX_RATE = 0.16;

        public double calculateTax(double amount) {
            return amount * TAX_RATE;
        }
    }

    public static void main(String[] args) {
        Invoice invoice = new Invoice("Alice Johnson", 100.0);
        invoice.printInvoice();
    }
}
```

Analicemos el código anterior a detalle.

- Clase principal `Invoice`:
  - Representa una factura con los atributos `customerName` y `subtotal`.
  - Contiene métodos públicos para calcular el total (`calculateTotal`) e imprimir la factura (`printInvoice`).
- Inner Class `TaxCalculator`:
  - Se declara como `private`, ya que solo es útil dentro del contexto de la clase que la contiene `Invoice`.
  - Tiene una constante estática `TAX_RATE` y un método para calcular el impuesto (`calculateTax`).
- Método `main`:
  - Crea una instancia de `Invoice`.
  - Llamanos al método `printInvoice`, que a su vez llama al método `calculateTotal` de la inner class `TaxCalculator`.

Al ejecutar el código obtenemos la siguiente salida.

```java
Customer: Alice Johnson
Subtotal: $100.0
Total (including tax): $116.0
```

## Static nested classes

Al igual que los métodos y atributos de clases, una clase estática anidada está asociada a su clase externa. Y al igual que los métodos estáticos de una clase, no puede referirse directamente a variables de instancia o métodos definidos en la clase que la contiene, solo puede utilizarlos a través de una referencia a un objeto.

Una clase estática anidada interactúa con los miembros de instancia de su clase externa como cualquier otra clase de nivel superior. En efecto, una clase estática anidada es conductualmente una clase de nivel superior que ha sido anidada en otra clase de nivel superior por conveniencia.

```java
public class OuterClass {
    static class StaticNestedClass {
        
    }
}
```

Una clase estática anidada se puede instanciar de la misma manera que una clase de nivel superior, sin necesidad de una instancia de la clase que la contiene.

```java
OuterClass.StaticNestedClass nestedObject = new OuterClass.StaticNestedClass();
```

```java
import dev.asjordi.OuterClass.StaticNestedClass;

public class Main {
    public static void main(String[] args) {
        StaticNestedClass nestedObject = new StaticNestedClass();
    }
}
```

## Inner Class y Nested Static Class Ejemplo

El siguiente ejemplo, `OuterClass`, junto con `Main`, demuestra a qué miembros de clase de `OuterClass` pueden acceder una clase interna (`InnerClass`), una clase estática anidada (`StaticNestedClass`) y una clase de nivel superior (`Main`):

```java
public class OuterClass {

    String outerField = "Outer field";
    static String staticOuterField = "Static outer field";

    class InnerClass {
        void accessMembers() {
            System.out.println(outerField);
            System.out.println(staticOuterField);
        }
    }

    static class StaticNestedClass {
        void accessMembers(OuterClass outer) {
            // Non-static field 'outerField' cannot be referenced from a static context
            // System.out.println(outerField);
            System.out.println(outer.outerField);
            System.out.println(staticOuterField);
        }
    }

    public static void main(String[] args) {
        System.out.println("Inner class:");
        System.out.println("------------");
        OuterClass outerClass = new OuterClass();
        OuterClass.InnerClass innerClass = outerClass.new InnerClass();
        innerClass.accessMembers();

        System.out.println("\nStatic nested class:");
        System.out.println("--------------------");
        StaticNestedClass staticNestedClass = new StaticNestedClass();
        staticNestedClass.accessMembers(outerClass);

        System.out.println("\nTop-level class:");
        System.out.println("--------------------");
        Main topLevelObject = new Main();
        topLevelObject.accessMembers(outerClass);
    }
}
```

```java
public class Main {
    void accessMembers(OuterClass outer) {
        // Non-static field 'outerField' cannot be referenced from a static context
        // System.out.println(OuterClass.outerField);
        System.out.println(outer.outerField);
        System.out.println(OuterClass.staticOuterField);
    }
}
```

```java
Inner class:
------------
Outer field
Static outer field

Static nested class:
--------------------
Outer field
Static outer field

Top-level class:
--------------------
Outer field
Static outer field
```

Se puede notar que la clase `StaticNestedClass` no puede acceder directamente a los miembros de instancia de `OuterClass`, pero puede acceder a los miembros estáticos de `OuterClass`. Para poder acceder a los miembros de instancia de `OuterClass`, se debe pasar una instancia de `OuterClass` como argumento al método `accessMembers`. Por otro lado, la clase `InnerClass` puede acceder a los miembros de instancia y estáticos de `OuterClass`.

Similarmente, la clase `Main` no puede acceder directamente a los miembros de instancia de `OuterClass`, pero puede acceder a los miembros estáticos de `OuterClass`.

## Shadowing

Si una declaración de un tipo (como una variable o parámetro) en un determinado ámbito (como una inner class o un método) tiene el mismo nombre que otra declaración del ámbito que la rodea, la declaración oculta la declaración del ámbito que la rodea. De esta forma, no se puede hacer referencia a una declaración que está sombreada (shadowed declaration) solo por su nombre. Consideremos el siguiente ejemplo:

```java
public class ShadowTest {

    public int x = 0;

    class FirstLevel {

        public int x = 1;

        void methodInFirstLevel(int x) {
            System.out.println("x = " + x);
            System.out.println("this.x = " + this.x);
            System.out.println("ShadowTest.this.x = " + ShadowTest.this.x);
        }
    }

    public static void main(String... args) {
        ShadowTest st = new ShadowTest();
        ShadowTest.FirstLevel fl = st.new FirstLevel();
        fl.methodInFirstLevel(23);
    }
}
```

```java
x = 23
this.x = 1
ShadowTest.this.x = 0
```

En el ejemplo se definen tres variables con el nombre `x`: el atributo de la clase `ShadowTest`, el atributo de la clase `FirstLevel` y el parámetro del método `methodInFirstLevel`. La variable `x` definida como parámetro del método `methodInFirstLevel()` oculta la variable de la inner class `FirstLevel`. Por lo que, cuando se utiliza `x` dentro del método, esta se refiere al parámetro. Para hacer referencia al atributo de la inner class, se debe usar la palabra clave `this`, que representa el ámbito que la rodea.

Para hacer referencia a variables de un ámbito mayor, se puede realizar utilizando el nombre de la clase a la que pertenecen, seguido de un punto y el nombre de la variable.

## Local classes

Las clases locales son clases que se definen en un bloque, que es un grupo de cero o más sentencias entre llaves `{}`. Normalmente, las clases locales se definen en el cuerpo de un método.

### Declaración

Se puede definir una clase local dentro de cualquier bloque, por ejemplo, podemos definir una clase local en el cuerpo de un método.

```java
public class LocalClassExample {

    static String regularExpression = "[^0-9]";

    public static void validatePhoneNumber(String phoneNumber1, String phoneNumber2) {

        final int numberLength = 10;

        class PhoneNumber {

            String formattedPhoneNumber = "";

            PhoneNumber(String phoneNumber){
                String currentNumber = phoneNumber.replaceAll(regularExpression, "");
                if (currentNumber.length() == numberLength) formattedPhoneNumber = currentNumber;
                else formattedPhoneNumber = "";
            }

            public String getNumber() {
                return formattedPhoneNumber;
            }
        }

        PhoneNumber myNumber1 = new PhoneNumber(phoneNumber1);
        PhoneNumber myNumber2 = new PhoneNumber(phoneNumber2);

        if (myNumber1.getNumber().isEmpty()) System.out.println("First number is invalid");
        else System.out.println("First number is " + myNumber1.getNumber());
        if (myNumber2.getNumber().isEmpty())System.out.println("Second number is invalid");
        else System.out.println("Second number is " + myNumber2.getNumber());
    }

    public static void main(String... args) {
        validatePhoneNumber("123-456-7890", "456-7890");
    }
}
```

El ejemplo valida un número de teléfono eliminando primero todos los caracteres del número excepto los dígitos del 0 al 9. Después comprueba si contiene exactamente diez dígitos y, si es así, lo almacena. Si no, almacena una cadena vacía. La clase `PhoneNumber` es una clase local que se define en el método `validatePhoneNumber`. Al final se obtiene como resultado lo siguiente:

```java
First number is 1234567890
Second number is invalid
```

### Acceder a los miembros de la clase que la contiene

Una clase local tiene acceso a los miembros de la clase que la contiene. En el ejemplo anterior, el constructor PhoneNumber() accede al atributo LocalClassExample.regularExpression.

Además, una clase local tiene acceso a variables locales. Sin embargo, una clase local solo puede acceder a las variables locales del tipo `final`. Cuando una clase local accede a una variable local o parámetro del bloque que la encierra, captura esa variable o parámetro. Por ejemplo, el constructor `PhoneNumber()` puede acceder a la variable local `numberLength` porque está declarada como `final`.

Sin embargo, a partir de Java 8, una clase local puede acceder a variables locales y parámetros del bloque que la contienen que sean finales o efectivamente finales. Una variable o parámetro cuyo valor no se cambia nunca después de inicializarse es efectivamente final.

Por ejemplo, supongamos que la variable `numberLength` no está declarada como `final`, y dentro del constructor PhoneNumber() se le asigna otro valor, por ejemplo 7. Debido a esta sentencia de asignación, la variable `numberLength` ya no es efectivamente final. Como resultado, el compilador genera un mensaje de error similar a `Variable 'numberLength' is accessed from within inner class, needs to be final or effectively final`.

```java
PhoneNumber(String phoneNumber) {
    numberLength = 7;
    String currentNumber = phoneNumber.replaceAll(
        regularExpression, "");
    if (currentNumber.length() == numberLength)
        formattedPhoneNumber = currentNumber;
    else
        formattedPhoneNumber = null;
}
```

A partir de Java 8, si se declara la clase local en un método, esta puede acceder a los parámetros del método. Por ejemplo, se puede definir el siguiente método en la clase local `PhoneNumber`:

```java
public void printOriginalNumbers() {
    System.out.println("Original numbers are " + phoneNumber1 +" and " + phoneNumber2);
}
```

El método `printOriginalNumbers()` accede a los parámetros `phoneNumber1` y `phoneNumber2` del método `validatePhoneNumber()`.

Las declaraciones de un tipo (por ejemplo, una variable) en una clase local ocultan cualquier declaración del tipo que se encuentre en el bloque que la contiene.

Una cosa interesante es que podemos declarar una interfaz dentro de un método, y a su vez declarar una clase local que la implemente.

```java
public void greetInEnglish() {

    interface HelloThere {
        void greet(String name);
    }

    class EnglishHelloThere implements HelloThere {
        public void greet(String name) {
            System.out.println("Hello " + name);
        }
    }

    HelloThere myGreeting = new EnglishHelloThere();
    myGreeting.greet("John Doe");
}
```

Una clase local puede contener declaraciones de métodos estáticos.

```java
public void sayGoodbyeInEnglish() {
    class EnglishGoodbye {
        public static void sayGoodbye() {
            System.out.println("Bye bye");
        }
    }
    EnglishGoodbye.sayGoodbye();
}
```

Una clase local puede tener miembros estáticos, ya sea del tipo `final` o no. Aunque en la mayoría de ocasiones tiene sentido que este tipo de miembros sean `final`.

```java
public void sayGoodbyeInEnglish() {
    class EnglishGoodbye {
        public static final String farewell = "Bye bye";
        public void sayGoodbye() {
            System.out.println(farewell);
        }
    }
    EnglishGoodbye myEnglishGoodbye = new EnglishGoodbye();
    myEnglishGoodbye.sayGoodbye();
}
```

## Clases anónimas

Una clase anónima es una clase que no tiene nombre, y que permite declarar o instanciar implementaciones de clases o interfaces al mismo tiempo sin la necesidad de utilizar un archivo adicional. Por lo que, este tipo de clases son de un solo uso y no se pueden reutilizar en otro lugar. Mientras que las clases locales son declaraciones de clase, las clases anónimas son expresiones, lo que significa que la clase se define en otra expresión, y esto produce como resultado un único objeto que se puede almacenar en una variable.

Para má información puedes consultar el siguiente post [Clases anónimas en Java](https://asjordi.dev/blog/clases-anonimas-en-java/).

## Conclusiones

En definitiva las clases anidadas y sus diferentes tipos representan una herramienta que nos permite estructurar y organizar el código de manera lógica y cohesiva, sin dejar de lado la encapsulación de funcionalidades que solo son relevantes dentro de un contexto específico. Además, facilitan el acceso a los miembros de la clase que las contiene, simplificando la interacción entre clases. Sin embargo, su uso debe ser considerado, ya que un diseño excesivamente anidado puedo complicar la mantenibilidad del código.