---
title: "Notificaciones de Windows con Python"
description: "Cómo mostrar notificaciones de Windows con Python"
pubDate: "Nov 30 2022"
heroImage: "/blog/images/post9/cover.webp"
---

En este artículo se explica cómo crear y mostrar notificaciones de Windows utilizando Python. Para ello se utiliza el módulo ``winotify``, el cual permite mostrar notificaciones personalizables en Windows 10 y Windows 11. 

Este módulo proporciona las siguientes características, mismas que lo diferencian de otros: 
- Permite mantener las notificaciones en el centro de notificaciones del sistema. 
- Puede incluir hasta 5 botones por notificación. 
- Ejecuta acciones a través de la propia notificación. 

## Instalación

Para instalar el módulo ``winotify``, se debe ejecutar el siguiente comando en la terminal: 

```bash
pip install winotify
```

## Uso

Para comenzar es necesario importar el módulo ``winotify`` en el archivo principal: 

```python
from winotify import Notification, audio, Notifier
```

### Crear Notificación 

Para crear una notificación, se debe crear una instancia de la clase ``Notification``, la cual recibe los siguiente parámetros:
- Identificador
- Título
- Contenido de la notificación
- Duración de la notificación
- Icono de la notificación

```python
toast = Notification(app_id="Windows app",
                     title="Winotify Test Toast",
                     msg="Hello World!",
                     duration="short",
                     icon=r"c:\path\to\icon.png")
```

### Mostrar Notificación

Para mostrar la notificación, se debe ejecutar el método ``show`` de la instancia de la clase ``Notification``: 

```python
toast.show()
```

Con esto, se mostrará la notificación en el sistema y posteriormente se cerrará, de acuerdo con la duración definida.

![Notificacion simple](/blog/images/post9/1.webp)

### Agregar Sonido

Para agregar un sonido a la notificación, se debe crear una instancia de la clase ``audio``, la cual recibe como parámetro el path del archivo de audio y si se desea que se repita o no. En este caso se utiliza el sonido por defecto del sistema. Asi mismo, se pueden agregar sonidos predeterminados del sistema.

```python
toast.set_audio(audio.Default, loop=False)
```

### Agregar Botones

Para agregar botones a la notificación, se debe utilizar el método ``add_actions`` de la instancia de la clase ``Notification``, el cual recibe como parámetros el texto del botón y la acción a ejecutar al hacer clic. En este caso se agrega un botón que dirige a un sitio web.

```python
toast.add_actions(label="Google", launch="https://google.com")
```

![Notificacion con botones](/blog/images/post9/2.webp)

Como se mencionó anteriormente, las notificaciones permanecen en el centro de notificaciones del sistema.

![Notificacion en el centro de notificaciones](/blog/images/post9/3.webp)

A continuación se muestra el codigo completo utilizado para mostrar la notificación: 

```python
from winotify import Notification, audio, Notifier

toast = Notification(app_id="Windows app",
                     title="Winotify Test Toast",
                     msg="Hello World!",
                     duration="short",
                     icon=r"C:\Users\user\Desktop\icon.png")

toast.set_audio(audio.Default, loop=False)

toast.add_actions(label="Google", launch="https://google.com")

toast.show()
```
En conclusión, este módulo resulta muy útil, dado que es relativamente fácil de implementar. Además de que posible integrarlo con una aplicación como medio para mostrar resultados de una acción, por ejemplo con el icono de la bandeja del sistema explicado en el artículo [Icono de la Bandeja del Sistema en Python](https://asjordi.dev/blog/system-tray-icon-python/) de este blog.

Para consultar el código completo y documentación, se puede visitar el [repositorio de GitHub](https://github.com/versa-syahptr/winotify).