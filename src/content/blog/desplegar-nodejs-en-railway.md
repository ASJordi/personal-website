---
title: "Cómo desplegar aplicación Node.js en Railway"
description: "Cómo desplegar aplicación Node.js en Railway"
pubDate: "Oct 19 2022"
heroImage: "../../assets/blog/images/post6/cover.webp"
tags: ["NodeJS"]
---

## ¿Qué es Railway?

Railway.app es un proveedor de servicios en la nube que permite desplegar diversos tipos de aplicaciones web fácilmente.

Es tan sencillo su uso como, configurar el despliegue a partir de GitHub y realizar algunas configuraciones básicas por medio de su interfaz. Además de que, en su plan gratuito brinda 500 horas de ejecución y 5 dólares por mes.

En este tutorial se muestra el proceso de despliegue de un proyecto de Node.js, específicamente un API en Railway.

## Requisitos

- Tener una cuenta en [Railway](https://railway.app/).
- Proyecto Node.js

## Crear proyecto en Railway

* Para crear un proyecto en Railway, se debe ingresar a la plataforma y seleccionar la opción **New Project**.

![Crear proyecto en Railway](../../assets/blog/images/post6/01.webp)

* En la siguiente pantalla seleccionar **Deploy from GitHub repo**, esto permitirá desplegar el proyecto desde GitHub y configurar el despliegue de forma automática.

![Seleccionar deploy](../../assets/blog/images/post6/02.webp)

* A continuación, se mostrarán los proyectos alojados en GitHub y a los cuales Railway tiene acceso, solo basta con seleccionar el proyecto deseado.

![Seleccionar proyecto](../../assets/blog/images/post6/03.webp)

* En caso de no ver el proyecto, hacer clic en **Configure GitHub App** y dar los permisos necesarios para que Railway acceda al repositorio deseado.

![Configurar GitHub App](../../assets/blog/images/post6/04.webp)

* En la siguiente ventana tenemos dos opciones, **Deploy Now** y **Add variables**, realmente no hay diferencia en la opción a elegir, en caso de que tu proyecto tenga variables de entorno, seleccionar la opción 2 o simplemente hacer clic en **Deploy Now** y más adelante se pueden configurar.

![Configurar despliegue](../../assets/blog/images/post6/05.webp)

* Railway comenzará la creación y despliegue automático de la aplicación de Node.js, es normal que la primera ejecución falle en caso de requerir variables de entorno no configuradas o conexiones a otros servicios, por ejemplo, MySQL.

![Configurar proyecto](../../assets/blog/images/post6/06.webp)

## Configurar variables de entorno

* Para configurar las **variables de entorno** del proyecto hacer clic sobre el servicio, se mostrará una ventana con diversas configuraciones, seleccionar **Variables**, clic en **New Variable** e ingresar el nombre y valor correspondiente, para guardar hacer clic en **Add**.

![Configurar variables](../../assets/blog/images/post6/07.webp)

* Una vez agregadas las variables de entorno necesarias, se configurará automáticamente un nuevo deploy. En la sección **Deployments** se puede ver el estado.

![Configurar nuevo deploy](../../assets/blog/images/post6/08.webp)

![Inicio de deploy](../../assets/blog/images/post6/09.webp)

## Configurar dominio

* En este punto la aplicación de Node.js ya se encuentra desplegada, pero aún no tiene asignado un dominio para su consulta, para ello dirigirse a la sección **Settings** y seleccionar **Generate Domain** para generar un dominio.

![Generar dominio](../../assets/blog/images/post6/10.webp)

* Este dominio puede configurarse posicionando el cursor sobre el apartado del dominio actual y clic en el botón **Editar**.

![Configurar dominio](../../assets/blog/images/post6/11.webp)

* Una vez realizado este proceso, podemos acceder a nuestra aplicación a través del dominio proporcionado, o incluso configurar uno propio.

![Acceder a la aplicación](../../assets/blog/images/post6/12.webp)

Estos son todos los pasos necesarios para el despliegue de una aplicación de Node.js en Railway, en caso de no contar con un repositorio de GitHub, también se puede configurar utilizando el [CLI]( https://docs.railway.app//develop/cli) de Railway.
