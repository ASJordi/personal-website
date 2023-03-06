---
title: "Comandos básicos de NPM"
description: "Comandos básicos y shortcuts de NPM"
pubDate: "Feb 20 2023"
heroImage: "/blog/images/post20/cover.webp"
---

Si estás empezando a trabajar con JavaScript, probablemente en algún momento tendrás que utilizar Node.js y NPM. La mayoría de los proyectos de JavaScript utilizan NPM para instalar dependencias y paquetes de terceros, y para ejecutar scripts de desarrollo.

En este artículo, vamos a ver los comandos básicos de NPM, y algunos shortcuts que te pueden ayudar a ahorrar tiempo.

## ¿Qué es NPM?

El Gestor de paquetes de Node o Node Package Manager (NPM) fue lanzado en 2010 como un sistema de administración y distribución de paquetes para Node.js a través de internet y accesible localmente utilizando la línea de comandos del sistema. Por defecto NPM se instala junto con Node.js. En caso de no tener instalado Node.js puedes consultar el siguiente artículo: [Instalar Node.js en Windows](https://asjordi.dev/blog/instalar-nodejs-en-windows).

En la web de [NPM](https://www.npmjs.com/) se pueden encontrar paquetes para propósitos específicos, además de que se pueden descargar, instalar y actualizar paquetes de forma sencilla.

## ¿Cómo usar NPM?

Para usar NPM, debemos abrir una terminal y ejecutar el comando `npm` seguido de la acción que queramos realizar. Por ejemplo, para instalar un paquete, ejecutamos el comando `npm install` seguido del nombre del paquete que queremos instalar. Por ejemplo, para instalar el paquete `express` ejecutamos el siguiente comando:

```bash
npm install express
```

Al ejecutar este comando se creará una nueva carpeta llamada `node_modules` en la carpeta donde se ejecutó el comando. Dentro de esta carpeta se instalará el paquete `express` y todas sus dependencias.

## Paquetes globales y locales

Los paquetes que se instalan con NPM pueden ser globales o locales.

- **Paquetes locales**: Son paquetes que se instalan dentro de la carpeta en la cual se ejecuta el comando `npm install`, específicamente en la carpeta `node_modules`. Estos paquetes solo están disponibles para el proyecto en el que se instalaron.
- **Paquetes globales**: Son paquetes que se instalan fuera de la carpeta en la cual se ejecuta el comando `npm install -g`. Por lo general este tipo de paquetes se pueden ejecutar desde la linea de comandos y son reutilizables en cualquier proyecto.

## package.json y package-lock.json

Cuando instalamos un paquete con NPM, se crea un archivo llamado `package.json` en la carpeta donde se ejecutó el comando. Contiene información sobre el proyecto, como el nombre, la versión, las dependencias, los scripts, etc. Este archivo es muy importante, ya que es el que se utiliza para instalar las dependencias de un proyecto, así como los scripts que se ejecutan en el proyecto.

Por otra parte, el archivo `package-lock.json` es un archivo generado automáticamente por NPM que contiene información detallada sobre las dependencias del proyecto y sus versiones en específico y se puede observar a manera de árbol.

La diferencia principal entre `package.json` y `package-lock.json` es que el primero se utiliza para definir las propiedades y dependencias del proyecto, mientras que el segundo se utiliza para almacenar información detallada sobre las versiones exactas de las dependencias y sus sub-dependencias que se instalaron en el proyecto, lo que ayuda a garantizar que el proyecto se ejecute de la misma manera en diferentes entornos.

## Dependencias del proyecto y dependencias de desarrollo

Al utilizar Node.js, las dependencias de un proyecto se dividen en dos tipos:

- **Dependencias del proyecto**: Son paquetes que son necesarios para que el proyecto funcione correctamente. Por ejemplo, si se está desarrollando un servidor web, se debe instalar el paquete `express` para poder crear un servidor web. Estos se registran en la sección `dependencies` del archivo `package.json`.

- **Dependencias de desarrollo**: Son paquetes que son necesarios para el desarrollo del proyecto, pero no son necesarios para que el proyecto funcione correctamente en un ambiente de producción. Por ejemplo, si se instala nodemon con el comando `npm install -D nodemon`, para reiniciar el servidor cada vez que se guardan cambios en el código. Estos se registran en la sección `devDependencies` del archivo `package.json`.
  
### Instalar paquetes por versión

Cuando instalamos un paquete con NPM, por defecto se instala la última versión disponible. Sin embargo, podemos instalar una versión específica de un paquete utilizando el comando `npm install` seguido del nombre del paquete y la versión que queremos instalar. La versión del paquete es declarada en el archivo `package.json` y tiene la siguiente estructura:

```json
"dependencies":
{
	"express": "^4.17.1"
}
```

- Para instalar la ultima versión de un paquete podemos ejecutar los siguientes comandos:

```bash
npm i express
npm i express@latest
```

- Si se desea instalar una versión específica de un paquete, se debe utilizar el símbolo `@` seguido de la versión que queremos instalar.

```bash
npm i express@4.18.1
```

- Si se desea instalar la última versión de un paquete, pero que sea menor a la versión especificada, se debe utilizar el símbolo `~` seguido de la versión que queremos instalar.

```bash
npm i express@~4.18.1
```

- Si se desea instalar la última versión de un paquete, pero que sea mayor a la versión especificada, se debe utilizar el símbolo `^` seguido de la versión que queremos instalar.

```bash
npm i express@^4.18.1
```

### Desinstalar paquetes

Para desinstalar un paquete, se debe ejecutar el comando `npm uninstall` seguido del nombre del paquete que queremos desinstalar.

```bash
npm uninstall <nombre_paquete>
```

Por ejemplo, para desinstalar el paquete `express` ejecutamos el siguiente comando:

```bash
npm uninstall express
```

### Actualizar paquetes

En ocasiones es necesario actualizar un determinado paquete una vez que el proyecto ya ha sido creado. Para actualizar todos los paquetes de un proyecto, se debe ejecutar el comando `npm update` sin especificar el nombre del paquete.

```bash
npm update
```

En caso de solo requerir actualizar un paquete, se debe ejecutar el comando `npm update` seguido del nombre del paquete que queremos actualizar.

```bash
npm update <nombre_paquete>
```

Por ejemplo, para actualizar el paquete `express` ejecutamos el siguiente comando:

```bash
npm update express
```

### Listar paquetes

Para listar todos los paquetes instalados en un proyecto, se debe ejecutar el comando `npm list`.

```bash
npm list
```

### Auditar paquetes

Es normal que dentro de todas las dependencias de un proyecto algunas de ellas tengan vulnerabilidades. Para auditar las dependencias de un proyecto, se debe ejecutar el comando `npm audit`.

```bash
npm audit
```

Este comando escanea las dependencias del proyecto y muestra una lista de vulnerabilidades encontradas. Para solucionar las vulnerabilidades encontradas, se debe ejecutar el comando:

```bash
npm audit fix
```

De esta manera, se actualizarán las dependencias que tengan vulnerabilidades. Para ver un informe detallado de las vulnerabilidades encontradas, se debe ejecutar el comando:

```bash
npm audit fix --dry-run
```

### Remover paquetes duplicados

Conforme aumenta el tamaño de un proyecto, el directorio `node_modules` puede llegar a ser muy grande. E incluso, puede llegar a contener paquetes duplicados. Para eliminar los paquetes duplicados, se debe ejecutar el siguiente comando:

```bash
npm dedupe
```

Este comando realiza una busqueda dentro del árbol de dependencias y busca la manera en la que se pueden eliminar los paquetes duplicados y compartirlos entre las dependencias, de esta manera se reduce el tamaño del directorio `node_modules` y la redundancia de los paquetes.

Al ser un árbol de dependencias las ramas son en su mayoria independientes, el siguiente comando intenta reorganizar esas ramas para identificar los paquetes innecesarios y eliminarlos.

```bash
npm prune
```

### Publicar paquetes

Si se desea publicar un paquete en NPM, se debe crear una cuenta en la página de [NPM](https://www.npmjs.com/). Una vez creada la cuenta, se debe ejecutar el comando `npm login` para iniciar sesión en NPM.

```bash
npm login
```

Luego de iniciar sesión, se debe ejecutar el comando `npm publish` para publicar el paquete.

```bash
npm publish
```

Al ejecutar este comando el paquete se publicará en NPM y estará disponible para ser instalado por otros desarrolladores. Es importante mencionar que se debe tener en consideración que el nombre del paquete debe ser único, de lo contrario se generará un error.

Para más información sobre NPM se puede consultar la documentación oficial en el siguiente [enlace](https://docs.npmjs.com/).