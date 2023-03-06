---
title: "Instalar Node.js en Windows"
description: "Cómo instalar Node.js en Windows"
pubDate: "Oct 05 2022"
heroImage: "/blog/images/post3/cover.webp"
---

Node.js es un entorno de tiempo de ejecución de JavaScript. Es de código abierto y multiplataforma. Node.js se ejecuta del lado del servidor o backend. Su desarrollo permitió la ejecución de código de JavaScript fuera de un navegador web.

Una de sus principales características es que permite una programación asincróna, además de que, permite crear sitios web dinámicos eficientes con JavaScript.

Node.js está basado en el motor V8 de Google, uno de los intérpretes de lenguaje de programación que existen. Este motor se encarga de compilar el código de JavaScript en código de máquina, un código de nivel más bajo que no hace falta que sea interpretado por el navegador.

Node.js puede ser instalado de diferentes maneras, a continuación, se muestran los pasos para su instalación en Windows.

1. Descargar el instalador .MSI de Node.js del sitio web oficial (https://nodejs.org/es/download/) de acuerdo con la arquitectura de la computadora (32 o 64 bits). Se puede elegir entre la versión LTS o la actual, para el tutorial se eligió la versión **Actual**.

![Descargar Node.js](/blog/images/post3/download.webp)

2. Ejecutar el archivo de instalación.

![Ejecutar instalador](/blog/images/post3/installer.webp)

3. A continuación, el asistente de instalación se abrirá, hacer clic en **Next**.

![Asistente de instalación](/blog/images/post3/install.webp)

4. Es necesario aceptar la ***Licencia de Uso***, para lo cual basta con marcar la casilla correspondiente y clic en **Next**.

![Aceptar licencia de uso](/blog/images/post3/license.webp)

5. Seleccionar la carpeta de instalación, por defecto se instala en **C:\Program Files\nodejs**. Se puede cambiar la ruta de instalación, para lo cual, se debe marcar la casilla **Customize** y clic en **Browse** para seleccionar la ruta de instalación. Posteriormente, clic en **Next**.

![Seleccionar ruta de instalación](/blog/images/post3/path.webp)

6. En la sección de **Configuración personalizada** se puede elegir la instalación de los componentes adicionales, para el tutorial se seleccionó la opción **Default** y se realizó clic en **Next**.

![Configuración personalizada](/blog/images/post3/custom.webp)

7. En la sección de **Herramientas para módulos nativos** marcar la casilla para que el instalador realice la instalación de los componentes necesarios para módulos nativos y hacer clic en **Next**.

![Herramientas adicionales](/blog/images/post3/tools.webp)

8. Para comenzar la instalación de Node.js hacer clic en **Install** (el asistente solicitará permisos de administrador).

![Comenzar instalación](/blog/images/post3/begin-install.webp)

9. El proceso de instalación puede tomar unos minutos, no cancelar y esperar hasta que finalice.

![Proceso de instalación de Node.js](/blog/images/post3/process-install.webp)

10.  Una vez finalizada la instalación, se mostrará el mensaje de instalación exitosa. Hacer clic en **Finish**.

![Instalación finalizada](/blog/images/post3/finish.webp)

11.  En caso de haber marcado la casilla del ***Paso 7***, al cerrar la ventana del asistente de instalación se ejecutará en la línea de comandos automáticamente el proceso de descarga e instalación de las herramientas adicionales.

![Instalación de herramientas adicionales](/blog/images/post3/install-tools.webp)

12. Para verificar si Node.js se ha instalado satisfactoriamente en el sistema, ejecutar el siguiente comando en la línea de comandos o terminal de Windows.

```bash
node -v
```

13. Si la instalación fue exitosa, se mostrará la versión de Node.js instalada en el sistema.

```bash
v18.9.1
```

14. Para verificar si npm (manejador de paquetes de node) se ha instalado satisfactoriamente en el sistema, ejecutar el siguiente comando en la línea de comandos o terminal de Windows.

```bash
npm -v
```

15. Si la instalación fue exitosa, se mostrará la versión de npm instalada en el sistema.

```bash
8.19.12
```

16. Una vez finalizados los pasos anteriores, se ha realizado la instalación completa de Node.js en el sistema.