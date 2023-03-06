---
title: "Cómo Utilizar Variables de Entorno en Python"
description: "Cómo Utilizar Variables de Entorno en Python"
pubDate: "Dec 19 2022"
heroImage: "/blog/images/post13/cover.webp"
---

La mayoria de las aplicaciones que desarrollamos tiene como objetivo ser desplegadas en un servidor, por lo que es necesario que estas puedan ser configuradas de manera dinámica. Para esto, es común que utilicemos variables de entorno para almacenar información sensible como credenciales de acceso a bases de datos, claves de API, etc.

En este artículo veremos cómo utilizar variables de entorno en Python.


## ¿Qué es una variable de entorno?

Una variable de entorno es un valor que se almacena en el sistema operativo y que puede ser accedido por cualquier aplicación que se ejecute en el mismo. Estas variables son útiles para almacenar información sensible que no queremos que sea accesible por cualquier persona que tenga acceso al código fuente de nuestra aplicación.

## ¿Qué es un archivo .env?

Un archivo `.env` es un archivo de texto plano que contiene una lista de variables de entorno. Este archivo es utilizado por la librería [python-dotenv](https://pypi.org/project/python-dotenv/) para cargar las variables de entorno en la aplicación.

## ¿Cómo utilizar variables de entorno en Python?

Para utilizar variables de entorno en Python, podemos hacer uso de la librería [python-dotenv](https://pypi.org/project/python-dotenv/). Esta librería nos permite cargar variables de entorno desde un archivo `.env` y acceder a ellas a través de la librería estándar [os](https://docs.python.org/3/library/os.html).

Para instalar la librería `python-dotenv`, podemos ejecutar el siguiente comando:

```bash
pip install python-dotenv
```

Una vez instalada la librería, podemos crear un archivo `.env` en la raíz de nuestro proyecto y agregar las variables de entorno que necesitemos, por ejemplo:

```bash
# .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=database
DB_USER=user
DB_PASSWORD=password
```

Luego, podemos cargar las variables de entorno desde el archivo `.env` utilizando la función `load_dotenv` de la librería `python-dotenv`:

```python
# app.py
from dotenv import load_dotenv

load_dotenv()
```

`load_dotenv` primero busca un archivo `.env` en la raíz del proyecto y luego carga las variables de entorno que se encuentren en el mismo. Si no encuentra un archivo `.env` en la raíz del proyecto, entonces buscará un archivo `.env` en el directorio actual.

```python
# app.py

from dotenv import load_dotenv

load_dotenv()

host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT")
name = os.getenv("DB_NAME")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
```

Por defecto, `load_dotenv` busca un archivo `.env` en la raíz del proyecto. Si queremos cargar un archivo `.env` que se encuentre en otro directorio, podemos utilizar el argumento `dotenv_path`:

```python
# app.py
from dotenv import load_dotenv

dotenv_path = Path('path/to/.env')
load_dotenv(dotenv_path=dotenv_path)
```
Si no se encuentra en un ambiente de desarrollo, y el proyecto esta implementado en un entorno hosteado, como una máquina virtual o un contenedor, el archivo `.env` no estará presente, y se utilizarán las variables de entorno que se encuentren definidas en el host. Por ejemplo, si la aplicación esta implementada en un contenedor de Docker, puede utilizar `--env-file .env` con el comando `docker run`, de esta manera, las variables de entorno definidas en el archivo `.env` serán cargadas en el contenedor.

Para la mayoria de los casos, no es necesario especificar nada más para que la librería `python-dotenv` sea productiva, para más información sobre la librería, pueden consultar la documentación oficial en [https://pypi.org/project/python-dotenv/](https://pypi.org/project/python-dotenv/).

Utilizar un archivo `.env` nos permite tener un control de las variables de entorno que se utilizan en el proyecto, asi como tener un ambiente de desarrollo más limpio y ordenado.