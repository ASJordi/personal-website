---
title: "Comandos esenciales de Git"
description: "Comandos esenciales para comenzar a usar Git"
pubDate: "Feb 15 2023"
heroImage: "../../assets/blog/images/post19/cover.webp"
tags: ["Git"]
---

El control de versiones es una herramienta muy útil para el desarrollo de software, y Git es uno de los sistemas de control de versiones más populares. Este permite que los desarrolladores puedan trabajar en equipo en un mismo proyecto, y que puedan realizar cambios en el código sin temor a perderlo, o simplemente para trabajar en proyectos personales.

Si cuentas con experiencia en programación puede que aprender Git no sea muy complicado.

En caso de que no se haya instalado Git, se puede consultar el siguiente artículo: [Instalar y Configurar Git en Windows](https://asjordi.dev/blog/instalar-y-configurar-git-en-windows).

A continuación se listan los comandos más esenciales para comenzar a usar Git.

### git config

Este comando es uno de las más básicos, y es el que se utiliza para configurar Git al terminar de instalarlo, o incluso posteriormente. Permite configurar el nombre de usuario, correo electrónico, editor de texto predeterminado, entre otras cosas.

```bash
# Configurar nombre de usuario
git config --global user.name "Nombre de usuario"
# Configurar correo electrónico
git config --global user.email "Email de usuario"
# Definir el nombre de la rama principal
git config --global init.defaultBranch main
# Habilitar la interfaz de línea de comandos
git config --global user.ui true
# Estandarizar los saltos de línea
git config --global core.autocrlf true
# Asignar VS Code como editor de texto por defecto
git config --global core.editor "code --wait"
git config --global -e
```

### git init

Este comando permite inicializar un repositorio Git en un directorio. Es decir, permite que Git comience a realizar un seguimiento de los cambios en el directorio.

```bash
git init
```

### git clone

Este comando permite clonar un repositorio Git existente en un directorio. Es decir, permite que Git descargue un repositorio existente de un servicio de almacenamiento como GitHub en un directorio local.

```bash
git clone <url_repositorio>
```

### git add

Este comando es uno de los más importantes, y es el que se utiliza para agregar archivos al área de preparación. Es decir, permite que Git comience a realizar un seguimiento de los cambios en los archivos.

```bash
# Agregar todos los archivos
git add .

# Agregar un archivo específico
git add <archivo>
```

### git branch

Este comando permite crear una nueva rama. Es decir, permite que Git cree una nueva línea de desarrollo.

```bash
git branch <nombre_rama>
```

Además, tiene algunas opciones adicionales que permiten listar las ramas existentes, eliminar ramas, y cambiar de rama.

```bash
# Listar las ramas existentes
git branch

# Listar ramas locales y remotas
git branch -a

# Hacer el comando más verboso
git branch -v

# Retornar todas las ramas que no han sido fusionadas
git branch --no-merged

# Eliminar una rama
git branch -d <nombre_rama>
```

### git commit

Este comando permite crear un nuevo commit. Es decir, permite que Git guarde los cambios realizados en los archivos.

```bash
git commit -m "Mensaje del commit"
```

Además, tiene algunas opciones adicionales que permiten crear un commit sin pasar por el área de preparación, y crear un commit sin mensaje.

```bash
# Crear un commit sin pasar por el área de preparación
git commit -am "Mensaje del commit"

# Crear un commit sin mensaje
git commit --allow-empty-message -m ""
```

### git push

Este comando permite enviar los commits locales a un repositorio remoto. Es decir, permite que Git envíe los cambios realizados en el repositorio local a un repositorio remoto tal como GitHub.

```bash
git push <nombre_repositorio_remoto> <nombre_rama>
```

### git status

Este comando permite mostrar el estado del repositorio. Es decir, permite que Git muestre los archivos que han sido modificados, los archivos que han sido agregados al área de preparación.

```bash
git status
```

### git diff

Este comando permite mostrar las diferencias entre los archivos, commits, ramas, entre otros. Como ejemplo se puede consultar el siguiente artículo: [¿Cómo comparar el contenido de dos repositorios usando Git?](asjordi.dev/como-comparar-el-contenido-de-dos-repositorios-usando-git).

```bash
# Mostrar las diferencias entre los archivos
git diff <archivo1> <archivo2>

# Mostrar las diferencias entre los commits
git diff <commit1> <commit2>

# Mostrar las diferencias entre las ramas
git diff <rama1> <rama2>
```

### git show

Este comando permite mostrar el contenido específico de un commit.

```bash
git show <commit>
```

### git merge

Este comando permite fusionar una rama con otra. Es de utilidad cuando se trabaja en equipo, y se desea integrar los cambios realizados en una rama a otra.

```bash
git merge <rama>
```

### git tag

Este comando permite crear una etiqueta, que es un marcador para un commit específico. Es de utilidad cuando se desea marcar un commit específico, por ejemplo, cuando se realiza una versión de un proyecto.

```bash
# Crear una etiqueta
git tag <nombre_etiqueta>

# Crear una etiqueta anotada
git tag -a <nombre_etiqueta> -m "Mensaje de la etiqueta"
```

### git log

Este comando permite mostrar el historial de commits del repositorio, incluyendo información como el autor, fecha, mensaje, entre otros.

```bash
# Mostrar el historial de commits
git log

# Mostrar el historial de commits en una sola línea
git log --oneline

# Mostrar el historial de commits de manera atraciva
git log --pretty=oneline --graph --decorate --all
```

### git reset

Este comando permite deshacer cambios realizados en el repositorio. De esta forma, permite que Git deje de realizar un seguimiento de los cambios realizados en los archivos y mover el puntero HEAD al commit especificado.

```bash
git reset <commit id>
```

### git rm

Este comando se utiliza para eliminar archivos o directorios del repositorio, los elimina tanto del sistema de archivos como del árbol de Git.

```bash
# Eliminar un archivo
git rm <archivo>

# Eliminar un directorio
git rm -r <directorio>
```

### git remote

Este comando permite agregar un repositorio remoto al repositorio local. Asi mismo, permite eliminar y renombrar repositorios remotos.

```bash
# Agregar un repositorio remoto
git remote add <nombre_repositorio_remoto> <url_repositorio_remoto>

# Eliminar un repositorio remoto
git remote rm <nombre_repositorio_remoto>

# Renombrar un repositorio remoto
git remote rename <nombre_repositorio_remoto> <nuevo_nombre_repositorio_remoto>

# Listar los repositorios remotos
git remote -v
```

### git pull

Este comando permite traer los cambios realizados en un repositorio remoto al repositorio local. Es decir, permite que Git descargue los cambios realizados en el repositorio remoto en un repositorio local.

```bash
git pull <nombre_repositorio_remoto> <nombre_rama>
```

### git fetch

Este comando permite traer los cambios realizados en un repositorio remoto al repositorio local, pero sin realizar un merge.

```bash
git fetch <nombre_repositorio_remoto> <nombre_rama>
```

### git checkout

Permite cambiar a una rama existente o crear una nueva rama y cambiar a ella.

```bash
# Cambiar a una rama existente
git checkout <nombre_rama>

# Crear una nueva rama y cambiar a ella
git checkout -b <nombre_rama>
```

### git stash

Este comando permite guardar temporalmente los cambios realizados en el repositorio.

```bash
# Guardar temporalmente los cambios realizados
git stash

# Listar los cambios guardados temporalmente
git stash list

# Eliminar los ultimos cambios guardados temporalmente
git stash drop

# Eliminar todos los cambios guardados temporalmente
git stash clear
```

### git fsck

Este comando permite verificar la integridad de los objetos del repositorio y verificar que no existan objetos corruptos.

```bash
git fsck
```

Estos son algunos de los comandos más utilizados en Git. Sin embargo, existen muchos más. Para conocerlos todos, se puede consultar la [documentación oficial de Git](https://git-scm.com/doc).
