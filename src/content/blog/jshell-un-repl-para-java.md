---
title: "JShell: Un REPL para Java"
description: "Código Java interactivo con JShell"
pubDate: "Feb 03 25"
heroImage: "../../assets/blog/images/post63/cover.webp"
tags: ["Java", "Fundamentos", "JShell"]
---

Cuando comenzamos a aprender un nuevo lenguaje de programación o queremos ver el resultado de un código rápidamente, dentro de Java puede ser un proceso tedioso y lento, ya que típicamente se sigue el siguiente proceso, independientemente de la creación de un nuevo proyecto o la utilización de un IDE:

- Escribir el programa.
- Compilar y corregir cualquier error.
- Ejecutar el programa.
- Verificar el resultado.
- Editar el programa.
- Repetir el proceso.

Entendiendo esta situación y sabiendo qué varios lenguajes compilados incluyen lo que comúnmente se conoce como **REPL** o _Read-Eval-Print-Loop_ para la interpretación de sentencias, donde básicamente se sigue el siguiente proceso:

- Read: Lee lo que se introduce en la consola.
- Eval: Evalúa o ejecuta el código.
- Print: Muestra una salida por consola como consecuencia de la evaluación, ya sea porque el comando explícitamente la requiere, o porque el propio REPL la muestra.
- Loop: Repite el proceso.

En Java desde la versión 9, se introdujo una herramienta para este propósito, **JShell**. La cual nos permite ejecutar fragmentos de código rápidamente de manera interactiva sin la necesidad de crear un proyecto.

## Instalación

**JShell** viene incluido dentro del propio JDK de Java, por lo que si ya se encuentra instalado y configuradas las variables de entorno necesarias, con esto basta para poder utilizarlo. En caso contario se puede consultar cualquiera de los siguientes enlaces para hacerlo:

- [Instalar OpenJDK](https://asjordi.dev/blog/como-instalar-el-openjdk-de-java-en-windows/)
- [Instalar Temurin](https://asjordi.dev/blog/como-instalar-el-jdk-de-java-usando-temurin-en-windows/)

## Ejecución

Una vez instalado y configurado el JDK, dentro del directorio `/bin` existe un archivo llamado `jshell` que es el que se debe ejecutar. Para ello abrimos una nueva terminal y si es la primera vez que se utiliza o se requiere ejecutar en modo más verboso `-v` ejecutamos el siguiente comando, de lo contrario simplemente ejecutamos `jshell`:

```bash
# Modo verboso
jshell -v

# Modo normal
jshell
```

```bash
➜ jshell -v
|  Welcome to JShell -- Version 21.0.5
|  For an introduction type: /help intro
```

Una vez dentro de **JShell** podemos desactivar el modo verboso con el comando `/set feedback normal` o para activarlo `/set feedback verbose`. También podemos consultar la ayuda con el comando `/help`.

JShell se ejecuta en modo interactivo, por lo que podemos navegar por el historial de comandos con las flechas arriba y abajo, y si estamos escribiendo o editando algo en múltiples líneas podemos navegar igualmente, incluso si presionamos la tecla `tab` obtenemos un autocompletado, tal cual como si estuviéramos en un IDE.

Para salir de **JShell** simplemente ejecutamos el comando `/exit` o presionamos `Ctrl + D`.

```bash
jshell> /exit
|  Goodbye
```

## Imports por defecto

Por defecto JShell realiza una serie de importaciones las cuales se pueden consultar con el comando `/imports`, aunque también podemos añadir nuevas importaciones:

```bash
jshell> /imports
|    import java.io.*
|    import java.math.*
|    import java.net.*
|    import java.nio.file.*
|    import java.util.*
|    import java.util.concurrent.*
|    import java.util.function.*
|    import java.util.prefs.*
|    import java.util.regex.*
|    import java.util.stream.*
```

## Expresiones

Podemos escribir cualquier expresión de Java válida, y como resultado se mostrará el valor de la expresión, su tipo, y en caso de que no se le asigne una variable, se almacenará en una variable temporal `$`. Como dato no es necesario utilizar `;` al final de cada expresión.

```bash
jshell> 10 + 10
$1 ==> 20
|  created scratch variable $1 : int
```

Podemos consultar o utilizar el resultado de una expresión anterior, simplemente referenciando el número de la variable temporal:

```bash
jshell> $1
$1 ==> 20
|  value of $1 : int
```

```bash
jshell> $1 + 3
$3 ==> 23
|  created scratch variable $3 : int
```

## Variables

Es posible declarar variables tal y como se haría en un programa de Java, donde utilizamos un tipo seguido del nombre y un valor, una vez declaradas serán visibles dentro del scope actual.

```bash
jshell> int x = 5
x ==> 5
|  created variable x : int
```

Nuevamente, para consultar su valor simplemente referenciamos el nombre de la variable:

```bash
jshell> x
x ==> 5
|  value of x : int
```

## Métodos

También se pueden definir métodos e incluso sustituirlos por nuevas implementaciones. Considerar que podemos escribir todo en una sola línea o conforme avanzamos presionar `Enter` para continuar en la siguiente línea y **JShell** automáticamente detectará el final del método.

```bash
jshell> void sayHello(String name){
   ...>     System.out.println("Hello " + name);
   ...> }
|  created method sayHello(String)
```

Para ejecutar un método lo llamamos por su nombre y pasamos los argumentos necesarios:

```bash
jshell> sayHello("Lucas")
Hello Lucas
```

En caso de necesitar modificar un método, podemos volver a definirlo y **JShell** automáticamente lo reemplazará:

```bash
jshell> void sayHello(String name){
   ...>     System.out.println("Hello " + name + "!");
   ...> }
|  modified method sayHello(String)
|    update overwrote method sayHello(String)
```

```bash
jshell> sayHello("Ramiro");
Hello Ramiro!
```

## Clases

Al igual que los métodos, podemos definir clases completas y utilizarlas en cualquier momento. En este caso, definimos una clase `Person` con los atributos `name` y `lastName`, un constructor y un método `getName()` que retorna el nombre completo.

```bash
jshell> class Person {
   ...>     private String name;
   ...>     private String lastName;
   ...>     public Person(String name, String lastName) {
   ...>         this.name = name;
   ...>         this.lastName = lastName;
   ...>     }
   ...>     public String getName() {
   ...>         return this.name + " " + this.lastName;
   ...>     }
   ...> }
|  created class Person
```

Creamos una instancia de la clase `Person` y la asignamos a una variable `person`.

```bash
jshell> Person person = new Person("Carlos", "Perez")
person ==> Person@71423665
|  created variable person : Person
```

Ahora podemos ejecutar el método `getName()` de la instancia `person` y asignarlo nuevamente a una variable `name` usando la inferencia de tipos.

```bash
jshell> var name = person.getName();
name ==> "Carlos Perez"
|  created variable name : String
```

## Comandos

Independientemente de lo que podamos ejecutar usando la sintaxís propia de Java, **JShell** también incluye una serie de comandos que nos permiten realizar tareas específicas, para consultar la lista completa de comandos podemos utilizar el comando `/help`. Algunos de los comandos más comunes y de acuerdo a lo que hemos estado viendo son:

### Listar sources

El comando `/list` nos permite ver todo el código que hemos introducido en la sesión actual de **JShell** junto a un número de identificación, que puede ser utilizado por otros comandos.

```bash
jshell> /list

   1 : 10 + 10
   2 : $1
   3 : $1 + 3
   4 : int x = 5;
   5 : x
   7 : sayHello("Jordi")
   8 : void sayHello(String name){
           System.out.println("Hello " + name + "!");
       }
   9 : sayHello("Jordi");
  10 : sayHello("Ramiro");
  11 : class Person {
           private String name;
           private String lastName;
           public Person(String name, String lastName) {
               this.name = name;
               this.lastName = lastName;
           }
           public String getName() {
               return this.name + " " + this.lastName;
           }
       }
  12 : Person person = new Person("Carlos", "Perez");
  13 : person.getName()
  14 : var name = person.getName();
```

## Listar types

El comando `/types` nos permite ver todos los tipos que hemos introducido en **JShell**, por ejemplo, clases e interfaces.

```bash
jshell> /types
|    class Person
```

### Listar variables

El comando `/vars` nos permite ver todas las variables que hemos introducido en **JShell**, ya sea de manera explícita o implícita.

```bash
jshell> /vars
|    int $1 = 20
|    int $3 = 23
|    int x = 5
|    Person person = Person@71423665
|    String name = "Carlos Perez"
```

### Listar métodos

El comando `/methods` nos permite ver todos los métodos que hemos introducido en **JShell**.

```bash
jshell> /methods
|    void sayHello(String)
```

### Editar un source externamente

El comando `/edit` nos permite editar un source externamente, por ejemplo, si queremos modificar el método `sayHello` que definimos anteriormente, simplemente ejecutamos el comando `/edit sayHello` y se abrirá un editor de texto muy básico donde podemos modificarlo.

```bash
jshell> /edit sayHello
|  modified method sayHello(String)
|    update overwrote method sayHello(String)
```

### Eliminar sources

El comando `/drop` nos permite eliminar snippets de código, variables, métodos o clases de la sesión actual. Se puede usar de varias formas:

- `/drop 1`: Elimina el snippet con el número 1.
- `/drop 1 2 3`: Elimina los snippets con IDs 1, 2 y 3
- `/drop nombreVariable`: Elimina una variable con ese nombre.
- `/drop nombreMetodo`: Elimina un método con ese nombre.

Podemos utilizar `/list` para verificar los snippets que tenemos y sus respectivos ID. Considerar que si eliminamos un snippet que es utilizado por otro, este último dejará de funcionar y se marcará como inactivo.

## Reinicio de la sesión

El comando `/reset` nos permite reiniciar la sesión actual de **JShell**, eliminando todas las variables, métodos y clases que hayamos definido.

```bash
jshell> /reset
|  Resetting state.
```

## Casos de uso

### Verificar el tipo de retorno

Sabemos que cuando dividimos dos números enteros en Java no obtenemos como resultado un número decimal, sino un número entero, algo que puede ser confuso, pero con **JShell** podemos verificar rápidamente el valor y tipo de retorno de cualquier operación.

```bash
jshell> 1 / 2
$1 ==> 0
|  created scratch variable $1 : int
```

```bash
jshell> 1.0 / 2
$2 ==> 0.5
|  created scratch variable $2 : double
```

```bash
jshell> 1 / 2.0
$3 ==> 0.5
|  created scratch variable $3 : double
```

```bash
jshell> 1.0f / 2
$4 ==> 0.5
|  created scratch variable $4 : float
```

```bash
jshell> 1 / 2.0f
$5 ==> 0.5
|  created scratch variable $5 : float
```

### Verificar matices y sutilezas

En Java existen ciertos matices y sutilezas que pueden ser confusas, por ejemplo, la comparación de referencias de números `Integer`
usando autoboxing cuyos valores están entre -128 y 127 (inclusivos) devuelve `true` si se comparan con `==`, pero si los valores son mayores o menores, la comparación devuelve `false`. Este comportamiento se debe a que esos valores están cacheados y se reutilizan.

```bash
jshell> Integer x = 127
x ==> 127
|  created variable x : Integer

jshell> Integer y = 127
y ==> 127
|  created variable y : Integer

jshell> x == y
$3 ==> true
|  created scratch variable $3 : boolean
```

```bash
jshell> Integer x = 128
x ==> 128
|  created variable x : Integer

jshell> Integer y = 128
y ==> 128
|  created variable y : Integer

jshell> x == y
$3 ==> false
|  created scratch variable $3 : boolean
```

En cambio, si utilizamos el método `equals()` de la clase `Integer` la comparación devolverá `true` en ambos casos.

```bash
jshell> x.equals(y)
$4 ==> true
|  created scratch variable $4 : boolean
```

## Conclusiones

**JShell** es una herramienta muy útil para crear prototipos y probar fragmentos de código Java sin la necesidad de crear un proyecto y seguir el proceso de compilación y ejecución. Además, nos permite explorar y aprender nuevas características del lenguaje de manera interactiva y rápida sin la necesidad de un IDE, permitiendo usar Java de una manera más accesible y dinámica tanto para desarrollo como para aprendizaje. Si te interesa aprender más sobre **JShell** puedes consultar la [documentación oficial](https://docs.oracle.com/en/java/javase/21/jshell/index.html).