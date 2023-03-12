---
title: "Cómo cambiar el último mensaje de commit"
description: "Cómo cambiar el último mensaje de commit en Git"
pubDate: "March 13 23"
heroImage: "/blog/images/post26/cover.webp"
---

Al momento de hacer un commit en Git, es posible que nos equivoquemos al escribir el mensaje de commit, ya sea por un error de tipeo o por escribir un mensaje que no es el correcto para el commit que se está realizando.

Incluso, si este error ya se ha subido a un repositorio remoto, es posible cambiar el mensaje del commit sin necesidad de hacer un nuevo commit.

Para este ejemplo se considerará el siguiente commit:

![Commit](/blog/images/post26/1.webp)

## Corregir mensaje sin subir a repositorio remoto

Si el commit aún no se ha subido a un repositorio remoto, es posible corregir el mensaje del commit con el siguiente comando:

```bash
git commit --amend
```

Este comando abrirá el editor de texto configurado en el sistema operativo para que se pueda modificar el mensaje del commit.

Dependiendo del editor de texto configurado (en este caso se utiliza VS Code), el mensaje del commit se mostrará de la siguiente manera:

![Editor de texto](/blog/images/post26/2.webp)

Solo es necesario modificar el mensaje del commit y guardar los cambios.

Una manera mas rápida de corregir el mensaje del commit es con el siguiente comando:

```bash
git commit --amend -m "Nuevo mensaje de commit"
```

De esta manera el mensaje del commit se cambiará por el que se ha especificado en el comando, y estará listo para ser subido al repositorio remoto.

![Nuevo mensaje de commit](/blog/images/post26/3.webp)

## Corregir mensaje subido a repositorio remoto

Pero que pasa si el commit ya se ha subido a un repositorio remoto, ¿Cómo se puede corregir el mensaje del commit?

![Commit subido a repositorio remoto](/blog/images/post26/4.webp)

En primer lugar se debe correjir el mensaje del último commit con el comando mostrado anteriormente de manera local:

```bash
git commit --amend -m "Nuevo mensaje de commit"
```

El siguiente paso es realizar un _force push_ para que los cambios se reflejen en el repositorio remoto, es decir, es necesario sobreescribir el commit que se ha subido anteriormente.

```bash
git push --force-with-lease origin your-branch
```

En mi caso el comando sería:

```bash
git push --force-with-lease origin main
```

![Force push](/blog/images/post26/5.webp)

Realizando estos pasos, el mensaje del commit se habrá corregido y se habrá subido al repositorio remoto.

En conclusión, es posible corregir el mensaje de un commit en Git, ya sea que se haya subido o no al repositorio remoto de una manera sencilla y rápida.