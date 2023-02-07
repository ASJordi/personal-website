---
title: "Cómo desplegar un sitio web a Firebase"
description: "Cómo desplegar un sitio web a Firebase"
pubDate: "Oct 17 2022"
heroImage: "/blog/images/post5/cover.png"
---

Firebase Hosting es un servicio de hosting rápido y seguro para aplicaciones web con contenido estático o dinámico. Entre sus principales características se encuentran la facilidad de despliegue, un plan gratis de alojamiento, dominio con certificado SSL gratis y una visualización previa del contenido antes de su publicación. 

Por lo que, Firebase Hosting representa una alternativa para el despliegue de aplicaciones como demo o, incluso para un ambiente de producción. 

En la presente guía se describe el proceso necesario para desplegar un sitio web en Firebase Hosting utilizando el CLI de Firebase. 

## Requisitos

Para poder desplegar un sitio web en Firebase Hosting es necesario contar con una cuenta de Google y una cuenta de Firebase.

## Crear un proyecto en Firebase

* Ingresar al sitio web de Firebase disponible en [firebase.com](https://firebase.google.com/) e iniciar sesión. 
  
![Crear proyecto en Firebase](/blog/images/post5/01.png)

* Hacer clic en el botón de **Ir a la consola** en la parte superior.
  
* Para crear un nuevo proyecto hacer clic en el botón **Add project**.

![Crear proyecto en Firebase](/blog/images/post5/02.png)

* Definir un nombre de proyecto y clic en **Continue**. De esta manera se asigna un identificador y URL único del proyecto.

![Crear proyecto en Firebase](/blog/images/post5/03.png)

* En la siguiente ventana desactivar la opción de ***Enable Google Analytics for this project*** y hacer clic en **Create project**. 

![Crear proyecto en Firebase](/blog/images/post5/04.png)

* Una vez creado el proyecto hacer clic en **Continue**. Esto automáticamente nos redirige al panel principal del proyecto. 

![Crear proyecto en Firebase](/blog/images/post5/05.png)

## Configurar el proyecto

* Seleccionar el apartado **Hosting** del panel izquierdo y clic en **Get started**.

![Seleccionar Hosting](/blog/images/post5/06.png)

![Seleccionar Hosting](/blog/images/post5/07.png)

* A continuación, se despliega una ventana con las instrucciones necesarias para subir nuestra página o aplicación web a Firebase Hosting. 
  
* Antes de comenzar con este proceso, es necesario tener instalado Node.js en la computadora. En caso de no tenerlo instalado, se puede consultar el proceso en la guía [Instalar Node.js en Windows](https://asjordi.dev/blog/instalar-nodejs-en-windows). 
  
* Ingresamos a la ruta del proyecto utilizando la terminal del sistema operativo para ejecutar los comandos mostrados a continuación. 

![CLI](/blog/images/post5/08.png)

* Ejecutar el siguiente comando para instalar la herramienta de línea de comandos de Firebase.

``` sh
npm install -g firebase-tools 
```

* Ahora es necesario autenticarse, para lo cual ejecutar el siguiente comando. Solo es necesario seleccionar una cuenta de Google e ingresar la contraseña.

```sh
firebase login
```

* Una vez iniciada la sesión, se debe inicializar un proyecto de Firebase con el siguiente comando. 

```sh
firebase init
```

* A continuación, es necesario realizar algunas configuraciones. 
  * Confirmar ingresando la letra ***y***.
  * Seleccionar **Hosting** con la tecla espacio y enter para confirmar. 
  * Seleccionar **Use an existing project**.
  * Seleccionar el proyecto creado anteriormente de la lista mostrada. 
  * En el apartado de selección del directorio público, colocar la ruta **./** para usar la raíz del directorio, o en caso de tener los archivos de la página web en una subcarpeta, colocar el nombre de esta, por ejemplo **public** o **dist**.
  * Ingresar **n** para el punto de single-page app.
  * Ingresar **n** para evitar que se sobre escriba el archivo index.html.

![CLI](/blog/images/post5/09.png)

## Desplegar el sitio web

* Una vez completados los pasos anteriores con exito, para desplegar el sitio web en Firebase Hosting, ejecutar el siguiente comando. 

```sh 
firebase deploy
```

![Desplegar sitio](/blog/images/post5/10.png)

* De esta forma, todo el contenido de nuestra página o aplicación web se ha desplegado en el hosting y es accesible a través de la URL que nos proporciona Firebase. 

* En caso de no conocer la URL del proyecto, dirigirse a la sección **Hosting** en el panel de Firebase y en el apartado **Domain** se encuentra. 
  
![URL del proyecto](/blog/images/post5/11.png)

![Proyecto desplegado](/blog/images/post5/12.png)