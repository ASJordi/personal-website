---
layout: "../../layouts/PostLayout.astro"
title: "Cómo configurar un entorno virtual en Python"
description: "Cómo mostrar Cómo configurar un entorno virtual en Python"
pubDate: "Dec 05 2022"
heroImage: "/blog/images/post10/cover.png"
---

## Introducción

Cuando se desarrolla en Python un enfoque básico es escribir todo el código necesario en un solo archivo y ejecutarlo desde la terminal. Funciona bien para proyectos simples, pero conforme aumenta el tamaño es necesario trabajar con múltiples archivos, paquetes y dependencias. 

Por ejemplo, al instalar un paquete en una versión X, todo funciona bien, pero al actualizar este mismo a una versión posterior, de repente el programa muestra errores y no se ejecuta, o incluso al cambiar de versión de Python, en este punto, se puede optar por utilizar entornos virtuales y evitar este y más problemas. 



## ¿Qué es un entorno virtual?

De acuerdo con la documentación oficial de Python:

> "Un entorno virtual es un entorno de Python, de modo que el intérprete, las bibliotecas y los scripts de Python instalados en él están aislados de los instalados en otros entornos virtuales, y (por defecto) cualquier biblioteca instalada en un sistema, es decir, una que está instalada como parte de su sistema operativo"

De acuerdo con la definición, al utilizar un entorno virtual para un proyecto, este se convierte en una aplicación autónoma, independiente del sistema y módulos de Python instalados. 

Este entorno tiene su propia estructura, por lo que también contiene una versión de pip e interprete definido. 

A continuación vamos a ver cómo configurar un entorno virtual en Python. Para ello vamos a utilizar el módulo `venv` que viene incluido en la instalación de Python.

## Crear un entorno virtual

Por defecto, desde Python 3.3, `virtualenv` ya viene integrado, en caso contrario puede ejecutar el siguiente comando. 

```python
pip install virtualenv
```

Para crear un entorno virtual, primero debemos crear una carpeta para el proyecto, por ejemplo, `python-env`.

```bash
mkdir python-env
cd python-env
```

Una vez dentro de la carpeta, ejecutamos el siguiente comando:

```bash
# python<version> -m venv <virtual-environment-name>
python -m venv env
```

El comando anterior creará una carpeta llamada `env` que contendrá los archivos necesarios para el entorno virtual.

Dentro de esta carpeta, se encuentran dos carpeta; la carpeta Scripts contiene los scripts necesarios para manejar el entorno virtual, así como pip y el propio interprete de Python, dentro de la carpeta Lib se encuentran las bibliotecas por defecto y las que se instalen posteriormente. 

## Activar el entorno virtual

Para activar el entorno virtual, debemos ejecutar el siguiente comando:

```bash
# Windows
env/Scripts/activate.bat // CMD
env/Scripts/Activate.ps1 //Powershel

# Linux
source env/bin/activate
```

Al ejecutar el comando anterior, se mostrará el nombre del entorno virtual en la terminal, por ejemplo, `(env)`.

## Verificar paquetes instalados

Para verificar los paquetes instalados en el entorno virtual, ejecutamos el siguiente comando:

```bash
pip list
```

Este comando mostrará los paquetes instalados en el entorno virtual, por ejemplo:

```bash
Package    Version
---------- -------
pip        22.2.2
setuptools 63.2.0
```

## Instalar paquetes

Para instalar paquetes en el entorno virtual, ejecutamos el siguiente comando:

```bash
pip install <package-name>
```

Por ejemplo, para instalar el paquete `requests` ejecutamos el siguiente comando:

```bash
pip install requests
```

## Generar archivo requirements.txt

Para generar un archivo con los paquetes instalados en el entorno virtual, ejecutamos el siguiente comando:

```bash
pip freeze > requirements.txt
```

## Desactivar el entorno virtual

Para desactivar el entorno virtual, ejecutamos el siguiente comando:

```bash
deactivate
```

Para más información sobre entornos virtuales en Python, puedes consultar la documentación oficial de Python [aquí](https://docs.python.org/3/library/venv.html).