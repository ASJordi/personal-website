---
title: "¿Cómo clonar una máquina virtual en Azure?"
description: "Clonar una máquina virtual desde el portal de Azure"
pubDate: "Dec 11 24"
heroImage: "../../assets/blog/images/post52/cover.webp"
tags: ["Azure", "VM"]
---

Clonar una máquina virtual en Azure no es una tarea complicada, aunque sería más fácil si hubiera una opción directa dentro del portal o algún comando, de igual manera son solo algunos pasos a seguir y en unos minutos tendrás tu máquina virtual clonada. En este caso tengo una máquina virtual con Windows 11 y quiero clonarla para tener una copia de seguridad o para realizar pruebas.

![VM base con Windows 11](../../assets/blog/images/post52/1.png)

1. Dentro del recurso de la máquina virtual ir a Settings > Disks y seleccionar el disco que se quiere clonar.

![Seleccionar disco](../../assets/blog/images/post52/2.png)

2. Ahora, seleccionar la opción de **Create snapshot** (instantánea).
![Crear instantánea](../../assets/blog/images/post52/3.png)

3. En la ventana de **Create snapshot** completar los campos requeridos, como suscripción, grupo de recursos, nombre del snapshot, tipo de snapshot (puede ser _incremental_ o _full_), etc. y dar clic en **Review + Create**. Si no se produce ningún error, el snapshot se generará en unos minutos.
![Completar campos](../../assets/blog/images/post52/4.png)

(En caso de que la máquina virtual tenga más de un disco, se debe repetir el proceso anterior para cada uno de ellos).

4. Ahora es necesario crear un nuevo recurso del tipo **Managed Disk** (disco administrado). Completar los campos requeridos considerando lo siguiente:
   1. En el apartado **Source type** seleccionar **Snapshot**.
   2. Seleccionar la suscripción donde se creó el snapshot.
   3. Seleccionar el **snapshot** creado anteriormente.
   4. Dar clic en **Review + Create**.

![Crear disco administrado](../../assets/blog/images/post52/5.png)

(Repetir el paso anterior si se tienen más discos).

5. Acceder al recurso creado y dar clic en **Create VM**.

![Crear VM](../../assets/blog/images/post52/6.png)

6. Completar los campos requeridos para la creación de la máquina virtual (en el apartado **Image** se puede observar que la máquina virtual se crea a partir del disco administrado creado anteriormente), en la sección **Disks** se pueden añadir los discos de datos administrados adicionales. Dar clic en **Review + Create**.

![Completar campos](../../assets/blog/images/post52/7.png)

Finalmente, si no se produce ningún error, la máquina virtual se creará en unos minutos. Acceder al recurso y en caso de que se encuentre detenida iniciarla y acceder a ella.

![Máquina virtual clonada](../../assets/blog/images/post52/8.png)

Este es todo el proceso que se debe llevar a cabo para clonar una máquina virtual desde el portal de Azure y obtener una copia exacta de la máquina virtual original.

![Máquinas virtuales](../../assets/blog/images/post52/9.png)