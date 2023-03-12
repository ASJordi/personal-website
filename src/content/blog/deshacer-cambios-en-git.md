---
title: "Deshacer cambios en Git"
description: "Cómo deshacer cambios en Git utilizando la línea de comandos"
pubDate: "March 15 23"
heroImage: "/blog/images/post27/cover.webp"
---

En caso de que se hayan realizado cambios dentro de un repositorio de Git y se deseen deshacer, se puede realizar tanto con la línea de comandos como con una interfaz gráfica. En este artículo se explicará cómo deshacer cambios en Git utilizando la línea de comandos.

A continuación se describen 3 escenarios en los que se pueden deshacer cambios en Git, considerando que cada uno requiere un enfoque diferente:

- [Deshacer cambios no confirmados](#deshacer-cambios-no-confirmados)
- [Deshacer cambios confirmados pero no publicados](#deshacer-cambios-confirmados-pero-no-publicados)
- [Deshacer cambios publicados](#deshacer-cambios-publicados)

## Deshacer cambios no confirmados

El escenario más común es cuando se han realizado cambios en un archivo y no se han confirmado. En este caso, se puede deshacer los cambios utilizando el comando `git checkout`.

> **Nota:** Se puede utilizar `git status` para verificar los cambios.

Para deshacer los cambios no confirmados, se puede utilizar el siguiente comando:

```bash
git checkout <nombre-archivo.extension>
```

Por ejemplo, se ha realizado un cambio en el archivo `main.js` y se desea revertirlo.

Con el comando `git status` se puede verificar que el archivo se encuentra en la sección de `Changes not staged for commit`.

A continuación se ejecuta el comando `git checkout main.js` para deshacer los cambios.

![git status](/blog/images/post27/1.webp)

De esta manera, el archivo `main.js` volverá a su estado anterior.

## Deshacer cambios confirmados pero no publicados

Si se esta en el punto donde ya se ha realizado un commit con los cambios, pero no se ha publicado en el repositorio remoto, se puede deshacer el commit utilizando el comando `git reset`.

> **Nota:** Se puede utilizar `git log --oneline` para verificar los commits.

Para deshacer los cambios confirmados pero no publicados, se puede utilizar el siguiente comando:

```bash
git reset --soft HEAD~
```

> **Nota:** El comando `HEAD~` se utiliza para referirse al commit anterior, pero es posible especificar el número de commits que se desean deshacer.

Si se desean deshacer los últimos 2 commits, se puede utilizar siguiente comando:

```bash
git reset --soft HEAD~2
```

Por ejemplo, se han realizado 2 commits y se desean deshacer los cambios antes de publicarlos en el repositorio remoto.

Se ejecuta `git status` para verificar los cambios. A continuación se ejecuta el comando `git reset --soft HEAD~2` para deshacer los últimos 2 commits. De esta manera los cambios se deshacen y se vuelven a la sección de `Changes to be committed`.

![git reset](/blog/images/post27/2.webp)

## Deshacer cambios publicados

Este es el escenario más complejo, ya que se requiere deshacer los cambios tanto en el repositorio local como en el remoto. Lo que se describe a continuación no elimina el commit, sino que crea un nuevo commit que deshace los cambios.

El primer paso es asegurarse de que el directorio de trabajo se encuentra limpio y no tiene ningún cambio. Para esto se puede utilizar el comando `git status`.

Después es necesario obtener el hash del commit que se desea deshacer. Para esto se puede utilizar el comando `git log --oneline`, o mediante la interfaz gráfica de Github.

![hash cli](/blog/images/post27/3.webp)

![hash github](/blog/images/post27/4.webp)

Dentro de la terminal, se ejecuta el siguiente comando para deshacer los cambios:

```bash
git revert <hash_commit> --no-edit

# Ejemplo
git revert a3da15f --no-edit
```

> **Nota:** El parámetro `--no-edit` se utiliza para evitar que se abra el editor de texto para editar el mensaje del commit.

Una vez ejecutado el comando, se puede verificar que se ha creado un nuevo commit que deshace los cambios, y por lo tanto los archivos modificados vuelven a su estado anterior.

![git revert](/blog/images/post27/5.webp)

Solo resta publicar los cambios en el repositorio remoto. Para esto se puede utilizar el comando `git push`.

```bash
git push origin <nombre-rama>
```

![git push](/blog/images/post27/6.webp)

En conclusión, se ha visto cómo deshacer cambios con Git en 3 escenarios distintos, que forman parte de la rutina de un desarrollador, y conocer los comandos que se deben utilizar para cada uno de ellos resulta muy útil. Cabe mencionar que si se utiliza una interfaz gráfica, se puede realizar de manera más sencilla.