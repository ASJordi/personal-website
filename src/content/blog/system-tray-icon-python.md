---
title: "Icono de la Bandeja del Sistema en Python"
description: "Icono de la Bandeja del Sistema en Python"
pubDate: "Nov 28 2022"
heroImage: "/blog/images/post8/cover.webp"
---

En este artículo se explica cómo crear y utilizar iconos en la bandeja del sistema con Python, básicamente, es poder tener en la parte inferior derecha de la barra de tareas un icono que permita una serie de interacciones y de esta manear proveer funcionalidades extra para una aplicación.

## ¿Qué es un icono de la bandeja del sistema?

Un icono de la bandeja del sistema es un icono que se muestra en la parte inferior derecha de la barra de tareas, en el área de notificación. Este icono permite que el usuario interactúe con la aplicación, por ejemplo, abrir una ventana, mostrar un menú, etc.

## Implementación

Para poder implementar el icono en la bandeja del sistema, se utilizará la biblioteca ``pystray``. Para instalarla solo es necesario hacer uso de ``pip`` con el siguiente comando.

```python
pip install pystray
```

A parte de pystray, se utilizará la biblioteca de ``pillow``, la cual permitirá agregar una imagen y esta será la que aparecerá como icono en la barra de tareas.

```python
pip install pillow
```

Una vez instaladas ambas bibliotecas, es necesario importarlas dentro del archivo principal.

```python
import pystray
import PIL.Image
```

Posteriormente, se carga la imagen a utilizar como icono.

```python
image = PIL.Image.open('icon.png')
```

Antes de crear el icono del sistema, es necesario definir una función que se ejecutará de manera general al momento de hacer clic sobre cada uno de los elementos individuales del menú. Misma que recibe los parámetros icon e item, donde icon hace referencia a la instancia del menú e item a cada uno de los elementos del menú.

```python
  def on_clicked(icon, item):
    print('Hello World!')
```

Es necesario crear una segunda función, cuyo único propósito será terminar la ejecución del icono.

```python
def on_quit(icon):
  icon.stop()
```

La instancia del icono se crea a partir de ``pystray.Icon`` y el menú principal a partir de ``pystray.Menu``. Se puede definir un nombre, imagen de icono (imagen definida en pasos anteriores) y tooltip (texto que aparece al posicionar el cursor sobre el icono) para el icono resultante.

La definición de los elementos del menú principal se realiza a partir de ``pystray.MenuItem``, misma que recibe el nombre del elemento a mostrar y la función a ejecutar al realizar clic.

```python
icon = pystray.Icon('Windows Menu', image, 'Windows Menu', menu=pystray.Menu(
  pystray.MenuItem('Say Hello', on_clicked),
  pystray.MenuItem('Exit', on_quit),
))
```

En este caso se definieron dos elementos del menú, el primero ejecutará la función ***on_clicked*** mostrando un mensaje por consola, y el segundo la función ***on_quit***.

Para ejecutar y mostrar el icono en la bandeja del sistema, se utiliza el método run.

```python
icon.run()
```

Ahora solo es necesario ejecutar el archivo principal y se mostrará el icono en la bandeja del sistema.

![Icono del sistema](/blog/images/post8/1.webp)

Al hacer clic derecho sobre el icono, se mostrará el menú con los elementos definidos.

![Elementos del menú](/blog/images/post8/2.webp)

## Agregar Submenús

Para agregar submenús, se debe definir un nuevo menú a partir de ``pystray.Menu`` dentro de un elemento del tipo ``pystray.MenuItem`` y agregarlo como elemento del menú principal del icono.

```python
icon = pystray.Icon('Windows Menu', image, 'Windows Menu', menu=pystray.Menu(
    pystray.MenuItem('Say Hello', on_clicked),
    pystray.MenuItem('SubMenu', pystray.Menu(
        pystray.MenuItem('Item 1', on_clicked),
        pystray.MenuItem('Item 2', on_clicked),
    )),
    pystray.MenuItem('Exit', on_quit),
))
```
Una vez ejecutado el archivo principal, se mostrará el icono en la bandeja del sistema con el nuevo submenú.

![Elementos del submenú](/blog/images/post8/3.webp)

Al hacer clic sobre el elemento del submenú, se ejecutará la función definida en el paso anterior.

En este punto cualquiera de los elementos del menú principal o submenú ejecutará la función ``on_clicked`` mostrando un mensaje por consola. Para poder diferenciar entre los elementos del menú principal y submenú, se puede agregar un condicional de la siguiente manera haciendo uso de los parametros que recibe la función.

```python
def on_clicked(icon, item):
  if str(item) == 'Say Hello':
      print('Hello World!')
  elif str(item) == 'Item 1':
      print('Item 1')
  elif str(item) == 'Item 2':
      print('Item 2')
  else:
      print('Not implemented yet')
```

De esta manera ya se ha creado un icono de la bandeja del sistema con un menú principal y un submenú. Mismos que pueden ser modificados a gusto del desarrollador, agregando más elementos, cambiando el nombre, imagen, o incluso las funciones que pueden ejecutar.

A continuación se muestra el código completo del ejemplo.

```python
import pystray
import PIL.Image

image = PIL.Image.open('icon.png')

def on_clicked(icon, item):
    if str(item) == 'Say Hello':
        print('Hello World!')
    elif str(item) == 'Item 1':
        print('Item 1')
    elif str(item) == 'Item 2':
        print('Item 2')
    else:
        print('Not implemented yet')

def on_quit(icon):
    icon.stop()

icon = pystray.Icon('Windows Menu', image, 'Windows Menu', menu=pystray.Menu(
    pystray.MenuItem('Say Hello', on_clicked),
    pystray.MenuItem('SubMenu', pystray.Menu(
        pystray.MenuItem('Item 1', on_clicked),
        pystray.MenuItem('Item 2', on_clicked),
    )),
    pystray.MenuItem('Exit', on_quit),
))

icon.run()
```

Para mas información sobre la biblioteca pystray, se puede consultar la documentación oficial haciendo [clic aquí.](https://pystray.readthedocs.io/en/latest/)

![Ejemplo menú](/blog/images/post8/example.gif)
