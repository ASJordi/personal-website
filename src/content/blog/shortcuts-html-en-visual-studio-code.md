---
title: "Shortcuts HTML en Visual Studio Code"
description: "Conoce los Shortcuts HTML que harán tu vida más fácil"
pubDate: "Feb 01 2023"
heroImage: "/blog/images/post15/cover.webp"
tags: ["HTML", "VSCode"]
---

## ¿Qué son los Shortcuts?

Los Shortcuts son atajos de teclado que nos permiten realizar acciones de forma más rápida y eficiente. En Visual Studio Code podemos encontrar una gran cantidad de Shortcuts que nos ayudarán a mejorar nuestra productividad.

Dentro de Visual Studio Code, [Emmet](https://code.visualstudio.com/docs/editor/emmet) proporciona abreviaciones para muchos lenguajes de programación, incluyendo HTML y CSS.

## HTML Boilerplate

Al escribir el simbolo de exclamación `!` y presionar la tecla `TAB` dentro de un archivo `.html` se generará un HTML Boilerplate con la estructura básica de un documento HTML.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
</body>
</html>
```

La estructura del HTML Boilerplate por defecto no contiene la mayoria de etiquetas que utilizamos en nuestros proyectos, por lo que podemos modificarla a nuestro gusto. Para ello, se debe ir a File > Preferences > Configure User Snippets. A continuación, seleccionar *New Global Snippets File* e ingresar la combinación de teclas necesarias para ejecutar el boilerplate, en este caso doble signo de exclamación `!!`.

En el archivo `.json` generado se debe agregar la siguiente estructura:

```json
{
  "HTML boilerplate": {
    "prefix": "!!",
    "body": [
      "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <meta name=\"description\" content=\"\">\r\n  <link rel=\"stylesheet\" type=\"text\/css\" href=\"styles.css\">\r\n  <title>Document<\/title>\r\n<\/head>\r\n<body>\r\n  <header>\r\n  <\/header>\r\n  <main>\r\n  <\/main>\r\n  <footer>\r\n  <\/footer>\r\n  <script src=\"main.js\"><\/script>\r\n<\/body>\r\n<\/html>"
    ],
    "description": "HTML boilerplate with meta tags and links to css and js files"
  }
}
```

Se puede modificar la estructura del HTML Boilerplate a gusto propio, solo considerando que se debe mantener la estructura de un documento HTML y posteriormente se debe guardar el archivo en formato JSON string, por ejemplo, primero se escribe la estructura en HTML, luego utilizando una herramienta como [esta](https://www.freeformatter.com/json-escape.html) se puede convertir a JSON string.

## HTML Shortcuts

Al momento de escribir código HTML, es común que se repitan ciertas estructuras, por ejemplo, un elemento `<div>` con una clase y un `<p>` con un texto. Para evitar escribir todo el código, podemos utilizar los Shortcuts de Emmet para generar la estructura de forma rápida. A continuación, se muestran algunos de los Shortcuts más utilizados.

- Elementos anidados: `nav>ul>li` genera la siguiente estructura:

```html
<nav>
  <ul>
    <li></li>
  </ul>
</nav>
```

- Múltiples elementos: `li*5` genera la siguiente estructura:

```html
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
```

- Etiquetas con texto: `a{Click Me}` genera la siguiente estructura:

```html
<a href="">Click Me</a>
```

- Elementos con varias clases: `div.first-class.second-class` genera la siguiente estructura:

```html
<div class="first-class second-class"></div>
```

- Elementos con ID: `div#main` genera la siguiente estructura:

```html
<div id="main"></div>
```

- Elementos con atributos: `a[href="https://www.google.com"]` genera la siguiente estructura:

```html
<a href="https://www.google.com"></a>
```

- Elementos con atributos y texto: `a[href="https://www.google.com"]{Google}` genera la siguiente estructura:

```html
<a href="https://www.google.com">Google</a>
```

Algunos de los Shortcuts de Emmet pueden ser combinados en combinaciones más complejas, por ejemplo:

- `div>(header>ul>li*2>a)+footer>p`

```html
<div>
  <header>
    <ul>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
    </ul>
  </header>
  <footer>
    <p></p>
  </footer>
</div>
```

- `(section>div>(p+span)*3)+footer>p`

```html
<section>
  <div>
    <p></p>
    <span></span>
    <p></p>
    <span></span>
    <p></p>
    <span></span></div>
</section>
<footer>
  <p></p>
</footer>
```

- `p>{Click }+a{here}+{ to continue}`

```html
<p>Click <a href="">here</a> to continue</p>
```

- `ul>li[id=item$]{Título $}*3`

```html
<ul>
  <li id="item1">Título 1</li>
  <li id="item2">Título 2</li>
  <li id="item3">Título 3</li>
</ul>
```

Estos son algunos de los Shortcuts más utilizados, pero existen muchos más. Para conocerlos todos, se puede consultar la [documentación oficial](https://docs.emmet.io/cheat-sheet/) de Emmet.
