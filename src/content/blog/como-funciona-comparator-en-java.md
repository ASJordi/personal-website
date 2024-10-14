---
title: "¿Cómo funciona Comparator en Java?"
description: "Comparar objetos en Java de forma personalizada"
pubDate: "Nov 04 24"
heroImage: "../../assets/blog/images/post41/cover.webp"
tags: ["Java", "Comparator"]
---

## Introducción

En ocasiones al trabajar en algún proyecto surge la necesidad de ordenar algún tipo de colección de objetos, para ello se puede pensar que es necesario implementar nuestros propios algoritmos de ordenamiento, pero esto es un tanto innecesario, aunque no está de más saber cómo funcionan. Por ejemplo, si se tiene un arreglo de números enteros, se puede utilizar el método `Arrays.sort()` que acepta un arreglo de primitivos y lo ordena de forma ascendente aprovechando que no es necesario asignar el resultado a una nueva variable, ya que el método modifica el arreglo original.

```java
int[] numbers = {9, 8, 5, 3, 1, 2, 4, 6, 7};
Arrays.sort(numbers);
System.out.println(Arrays.toString(numbers));

// Output
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Esto también aplica cuando se tiene una colección de objetos personalizados, por ejemplo, un record del tipo `Movie`, pero si vemos el método `Arrays.sort()` no acepta un arreglo de objetos de este tipo, por lo que se debe de utilizar el método `sort()` que acepta como parámetros un objeto de tipo `T` y un objeto de tipo `Comparator<? super T>` que es una interfaz funcional. Esta interfaz es muy importante, ya que muchos otros métodos dentro de Java la utilizan para comparar objetos de forma personalizada. Por ejemplo, el método `Collections.sort()` o el método `sort()` de un objeto `List`, incluso los `Stream` aceptan un `Comparator` para ordenar los elementos.

## ¿Qué es Comparator?

La interfaz funcional **Comparator** (al ser funcional se puede escribir como una expresión lambda) es una interfaz que permite comparar dos objetos de tipo `T`, por lo que sirve para comparar enteros, cadenas, objetos personalizados, etc. La interfaz tiene varios métodos estáticos y default, pero lo importante es el método `compare()` que es el que se debe de implementar para comparar dos objetos. `compare()` recibe dos objetos de tipo `T` y devuelve un entero. La firma del método es la siguiente:

```java
int compare(T o1, T o2);
```

Este método devuelve un número negativo si `o1` es menor que `o2`, cero si son iguales y un número positivo si `o1` es mayor que `o2`, regularme se devuelve `-1`, `0` o `1` respectivamente. 

### ¿Qué significa que un objeto es menor, igual o mayor que otro?

Analicemos lo que retorna el método `compare()` ya que de esto depende el ordenamiento de los objetos, es importante considerar que el significado de lo que retorna el método es relativo, es decir, si se quiere ordenar de forma ascendente o descendente va de acuerdo a la situación y manera en como se implemente. Consideremos el siguiente _record_ para cada ejemplo:

```java
public record Movie(
        String name,
        List<String> actors,
        int budget,
        int year
) {
}
```

- Si el primer argumento es menor que el segundo, se retorna un número negativo. Por ejemplo, para ordenar películas por año de lanzamiento, se puede devolver -1 cuando la película `a` es menor que la película `b`:

```java
// a < b -> -1
a.year() < b.year() -> -1
```

- Si el primer argumento es mayor que el segundo, se retorna un número positivo. Por ejemplo, para ordenar películas por presupuesto, se puede devolver 1 cuando la película `a` es mayor que la película `b`:

```java
// a > b -> 1
a.budget() > b.budget() -> 1
```

- Si el primer argumento es igual al segundo, se retorna cero. Por ejemplo, para ordenar películas por el número de actores, se puede devolver 0 cuando la película `a` es igual a la película `b`:

```java
// a == b -> 0
a.actors().size() == b.actors().size() -> 0
```

## Uso de Comparator

Supongamos que tenemos las siguientes películas dentro de un objeto del tipo `List<Movie>`:

```java
Movie movie1 = new Movie("The Godfather", Arrays.asList("Marlon Brando", "Al Pacino"), 6000000, 1972);
Movie movie2 = new Movie("The Godfather: Part II", Arrays.asList("Al Pacino", "Robert De Niro"), 13000000, 1974);
Movie movie3 = new Movie("The Shawshank Redemption", Arrays.asList("Tim Robbins", "Morgan Freeman"), 25000000, 1994);
Movie movie4 = new Movie("The Dark Knight", Arrays.asList("Christian Bale", "Heath Ledger"), 185000000, 2008);

List<Movie> movies = Arrays.asList(movie1, movie2, movie3, movie4);
```

Si se quiere ordenar las películas por año de lanzamiento de forma ascendente, se puede crear un objeto de tipo `Comparator<Movie>` y sobrescribir el método `compare()`, para después pasar este objeto al método `sort()` de la lista:

```java
Comparator<Movie> comparatorByYear = new Comparator<Movie>() {
    @Override
    public int compare(Movie o1, Movie o2) {
        return o1.year() - o2.year();
    }
};

movies.sort(comparatorByYear);
```

También se puede implementar como una clase anónima dentro del método `sort()`:

```java
movies.sort(new Comparator<Movie>() {
    @Override
    public int compare(Movie o1, Movie o2) {
        return o1.year() - o2.year();
    }
});
```

O de forma más concisa utilizando una expresión lambda directamente en el método `sort()`:

```java
movies.sort((p1, p2) -> p1.year() - p2.year());
```

Cualquiera de estas implementaciones ordenará la lista de forma ascendente por año de lanzamiento. Si se quiere ordenar de forma descendente, se puede cambiar el orden de los argumentos en la expresión lambda, o agregar un signo negativo en la resta:

```java
movies.sort((p1, p2) -> p2.year() - p1.year());
// o
movies.sort((p1, p2) -> - (p1.year() - p2.year()));
```

Algunos otros ejemplos de cómo se puede ordenar una lista de objetos personalizados son:

- Ordenar las películas por el número de actores de forma ascendente (menos actores a más actores):

```java
movies.sort((p1, p2) -> p1.actors().size() - p2.actors().size());
```

- Ordenar las películas por presupuesto de forma descendente (más presupuesto a menos presupuesto):

```java
movies.sort((p1, p2) -> p2.budget() - p1.budget());
// o 
movies.sort((p1, p2) -> - (p1.budget() - p2.budget()));
```

- Ordenar las películas por nombre de forma ascendente:

```java
movies.sort((p1, p2) -> p1.name().compareTo(p2.name()));
```

Entre otros ejemplos, podemos tener el caso donde se necesita ordenar una lista de enteros de forma descendente, 

```java
List<Integer> numbers = Arrays.asList(5, 3, 1, 2, 4);
numbers.sort((n1, n2) -> n2 - n1);

// Output
[5, 4, 3, 2, 1]
```

Para realizar esto, también se puede utilizar el método estático `Comparator.reverseOrder()` que devuelve un comparador que ordena los elementos de forma descendente y `Comparator.naturalOrder()` que ordena los elementos de forma ascendente.

```java
numbers.sort(Comparator.reverseOrder());
numbers.sort(Comparator.naturalOrder());
```

### Usar Integer.compare()

Dentro de Java ya existen métodos que nos permiten realizar este tipo de comparaciones de una forma eficiente, por ejemplo `Integer.compare()` que compara dos enteros y devuelve un número negativo si el primer argumento es menor que el segundo, cero si son iguales y un número positivo si el primer argumento es mayor que el segundo. Sí analizamos cómo funciona este método, podemos ver que es similar a lo que se ha explicado anteriormente, y retorna exactamente lo que requiere el método `compare()` de la interfaz `Comparator`. La implementación de `Integer.compare()` es la siguiente:

```java
public static int compare(int x, int y) {
    return (x < y) ? -1 : ((x == y) ? 0 : 1);
}
```

Por lo que, si se quiere ordenar las películas por año de lanzamiento de forma ascendente, se puede utilizar `Integer.compare()`:

```java
movies.sort((p1, p2) -> Integer.compare(p1.year(), p2.year()));
```

### Utilizando métodos de referencia

En algunas ocasiones se pueden utilizar métodos de referencia para realizar las comparaciones de forma diferente a las anteriores, por ejemplo, para ordenar una lista de enteros de forma ascendente:

```java
List<Integer> numbers = Arrays.asList(5, 3, 1, 2, 4);
numbers.sort(Integer::compareTo);

// Output
[1, 2, 3, 4, 5]
```

Integer no es la única clase que tiene un método `compareTo()`, por ejemplo, String tiene un método `compareTo()` que compara dos cadenas lexicográficamente, por lo que se puede utilizar para ordenar una lista de cadenas, o incluso utilizar CharSequence con su método `compare()` (técnicamente representa una secuencia de caracteres).

```java
List<String> names = Arrays.asList("John", "Alice", "Bob", "Charlie");
names.sort(CharSequence::compare);
names.sort(String::compareTo);

// Output
[Alice, Bob, Charlie, John]
```

Retomando el ejemplo de las películas, si se quiere ordenar las películas por año de lanzamiento de forma ascendente, se puede utilizar el método `comparingInt()` como método de referencia:

```java
movies.sort(Comparator.comparingInt(Movie::year));
```

O para comparar de acuerdo a un atributo de tipo `String`, en este caso el nombre de la película:

```java
movies.sort(Comparator.comparing(Movie::name));
```

### Ordenar por múltiples atributos

En ocasiones se puede requerir ordenar una lista de objetos por múltiples atributos, por ejemplo, si se quiere ordenar las películas por año de lanzamiento de forma ascendente y por presupuesto de forma descendente, se puede utilizar el método `thenComparing()` que recibe un `Comparator` y se encarga de ordenar por múltiples atributos. Por ejemplo, si existierán dos películas a y b, con el mismo año de lanzamiento, se ordenarán por presupuesto.

```java
movies.sort(Comparator.comparingInt(Movie::year).thenComparing((p1, p2) -> p2.budget() - p1.budget()));
```

## Conclusiones

Los comparadores son útiles en Java en muchas ocasiones, ya que permiten comparar objetos de forma personalizada, y no solo eso, sino que también se pueden utilizar en muchos métodos de colecciones de Java, e incluso tener más de un comparador para ordenar de diferentes formas. De cualquier manera, se puede consultar la documentación de `Comparator` dentro del IDE o en la [documentación oficial de Java](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Comparator.html#compare(T,T)) para ver los métodos que se pueden utilizar y cómo se pueden implementar. 