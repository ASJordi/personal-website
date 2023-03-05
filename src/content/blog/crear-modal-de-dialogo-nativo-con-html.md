---
title: "Crear modal de diálogo nativo con HTML"
description: "Cómo crear un modal de diálogo nativo utilizando solo HTML"
pubDate: "March 08 23"
heroImage: "/blog/images/post25/cover.webp"
---

Generalmente para crear un modal se utiliza JavaScript, pero actualmente se puede crear un modal de diálogo nativo utilizando solo HTML, por lo que resulta interesante conocerlo.

La estructura del elemento `dialog` es la siguiente, considerando que puede tener un estado que indica si esta abierto o no.

```html
<dialog open>
	<p>Hola!</p>
</dialog>
```

El código anterior renderiza el modal de diálogo con el texto "Hola! Soy un modal de diálogo" y el estado abierto por defecto.

![Ejemplo modal de diálogo](/blog/images/post25/modal.webp)

## Abrir dinámicamente el modal

Usualmente un modal se abre con una determinada acción, por ejemplo un clic en un botón. Para esto el elemento `dialog` tiene una API de JavaScript que nos permite abrirlo de forma dinámica. Solo es necesario asignarle un identificador.

```html
<dialog id="mydialog">
	<p>Hola! Solo me muestro con un clic</p>
</dialog>
```

Asignado el identificador podemos abrirlo de la siguiente forma.

```js
window.mydialog.show();
```

Asi mismo, se puede abrir de una manera más explicita utilizando el método `showModal()`. Este método abre el modal de diálogo de forma modal, y permite tener un fondo y centrar el modal de diálogo.

```js
window.mydialog.showModal();
```

Hasta aquí puede resultar raro mostrar el modal de diálogo directamente, por lo que se puede agregar un botón para esta acción.

```html
<button onclick="window.mydialog.showModal();">Mostrar modal</button>
<dialog id="mydialog">
	<p>Hola! Solo me muestro con un clic</p>
</dialog>
```

## Cerrar el modal

Hay dos maneras de cerrar el modal de diálogo, la primera es utilizando el método `close()` de la API de JavaScript.

```js
<button onclick='window.mydialog.close();'>Cerrar modal</button>
```

Mientras que la segunda manera es utilizando un formulario con el método `dialog` dentro del elemento `dialog`, tal y como se muestra a continuación.

```html
<form method="dialog">
	<button>Cerrar</button>
</form>
```

## Personalizar el modal

El elemento `dialog` tiene una serie de atributos que nos permiten personalizar el modal de diálogo, como el tamaño, el color de fondo, el color de texto, etc.

A continuación se agrega un estilo para modificar el color de fondo utilizando el pseudo-elemento `::backdrop`.

```css
dialog::backdrop {
  background: rgba(255, 255, 0, 0.1);
}
```

Ahora se debería ver de la siguiente manera.

![Ejemplo modal de diálogo](/blog/images/post25/demo.gif)

El elemento `dialog` tiene un soporte muy bueno, por lo que no debería haber problemas para utilizarlo. Se puede consultar en el sitio [caniuse.com](https://caniuse.com/#feat=dialog).

En general resulta interesante conocer este elemento, ya que permite crear un modal de diálogo nativo utilizando solo HTML sin la necesidad de utilizar JavaScript, además de que puede ser personalizado.