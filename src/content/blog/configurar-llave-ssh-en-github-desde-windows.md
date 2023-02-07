---
title: "Configurar llave SSH en GitHub desde Windows"
description: "Configurar llave SSH en GitHub desde Windows"
pubDate: "Oct 24 2022"
heroImage: "/blog/images/post7/cover.png"
---

Al trabajar con repositorios de manera local y remota utilizando GitHub, habitualmente cuando insertamos cambios (git push), obtenemos nuevos cambios (git pull) o simplemente al clonar (git clone) un repositorio, se realiza a través de internet y el protocolo HTTPS. 

Existe un protocolo más seguro a través del cual podemos establecer una vía de comunicación más segura con GitHub para cualquier operación, se trata de SSH. 

En este tutorial se describe el proceso para crear y configurar una llave SSH con GitHub desde Windows utilizando la herramienta de OpenSSH. 

## ¿Qué es SSH?

SSH o Secure Shell, es un protocolo de administración remota que permite a los usuarios controlar y modificar sus servidores remotos a través de Internet a través de un mecanismo de autenticación. Es un protocolo de capa de aplicación que se ejecuta sobre TCP/IP.

## ¿Qué es una llave SSH?

Una llave SSH es un par de llaves que se utilizan para cifrar y descifrar información. La llave pública (extensión .pub) se utiliza para cifrar la información y la llave privada (sin extensión) para descifrarla.

## OpenSSH

OpenSSH es una herramienta de conectividad para el inicio de sesión remoto que usa el protocolo SSH. De esta manera, todo el tráfico de red se cifra y se puede iniciar sesión en un servidor remoto de forma segura.

## Instalar OpenSSH

Para realizar la instalación de OpenSSH ejecutar PowerShell como administrador. Para verificar si ya está instalado, ejecutar el siguiente comando:

```powershell 
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
```

Este comando devuelve como salida si ya se encuentran instalados o no, tanto el cliente como el servidor de OpenSSH. 

```powershell
Name  : OpenSSH.Client~~~~0.0.1.0
State : NotPresent

Name  : OpenSSH.Server~~~~0.0.1.0
State : NotPresent
```

A continuación, es necesario instalar los componentes del servidor o cliente necesarios, basta con ejecutar el comando que corresponda. 

```powershell
# Instalar OpenSSH Client
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0

# Instalar OpenSSH Server
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

Una vez ejecutados los comandos, ambos deben devolver la siguiente salida. 

```powershell
Path          :
Online        : True
RestartNeeded : False
```

## Configurar OpenSSH

Para configurar el servidor de OpenSSH por primera vez, abrir PowerShell como administrador y ejecutar los siguientes comandos.  

```powershell
# Iniciar el servicio de sshd
Start-Service sshd
```

```powershell
# Opcional, pero recomendado:
Set-Service -Name sshd -StartupType 'Automatic'
```

```powershell
# Configurar el firewall para permitir conexiones SSH
if (!(Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" -ErrorAction SilentlyContinue | Select-Object Name, Enabled)) {
    Write-Output "Firewall Rule 'OpenSSH-Server-In-TCP' does not exist, creating it..."
    New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
} else {
    Write-Output "Firewall rule 'OpenSSH-Server-In-TCP' has been created and exists."
}
```

Ejecutar el siguiente comando para definir el servicio de OpenSSH con arranque automático, es decir, se iniciará junto con el sistema sin la necesidad de ejecutar ningún comando.   

```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
```

En caso contrario, con el siguiente comando se puede iniciar el servicio de OpenSSH. 

```powershell
Start-Service ssh-agent
```

Para ver el estado actual del servicio ejecutar el siguiente comando.
```powershell
Get-Service ssh-agent
```

Para más información sobre el servicio de OpenSSH, se puede consultar la documentación oficial de Microsoft en [Instalación de OpenSSH](https://learn.microsoft.com/es-mx/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui). 


## Crear llave SSH

Antes de generar una nueva clave SSH, verificar si hay claves existentes en la máquina local. Para ello dirigirse a la ruta `C:\Users\user\.ssh` y verificar si ya existe un archivo con extensión .pub. 

En caso de no existir, abrir la terminal de Windows o PowerShell y ejecutar el siguiente comando para generar una nueva llave SSH. Solo es necesario sustituir el correo electrónico por el que se utiliza en GitHub. 

```powershell
ssh-keygen -t ed25519 -C "email@dominio.com"
```

A continuación es necesario definir donde se almacenará la llave, en este caso se utilizará la ruta por defecto, solo es necesario presionar la tecla Enter. 

```powershell
Generating public/private ed25519 key pair.
Enter file in which to save the key (C:\Users\user/.ssh/id_ed25519):
```

En seguida, se debe definir una frase de contraseña para la llave, es opcional, pero brinda mayor seguridad el utilizarla. 

```powershell
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

Se obtiene una salida similar a la siguiente. Lo cual indica que la llave se ha generado correctamente. 

```powershell
Your identification has been saved in C:\Users\user/.ssh/key-github
Your public key has been saved in C:\Users\user/.ssh/key-github.pub
The key fingerprint is:
SHA256:/T9DlP7QXZs5I7j+QnjZMs+CxI65zz5bI4P09n1O2nw ejemplo@asjordi.dev
The key's randomart image is:
+--[ED25519 256]--+
|                 |
|                 |
|               . |
|         .    o .|
|       .S o +o .*|
|      . o+ O o+*o|
|       .==+oB..+o|
|       oo+=+o+B.E|
|       .+=+o+++*.|
+----[SHA256]-----+
```

Para ver las llaves que se han creado, posicionarse en la ruta `C:\Users\user\.ssh` y ejecutar el siguiente comando. 

```powershell
ls
```

Se obtiene una salida similar a la siguiente. 

```powershell
id_ed25519
id_ed25519.pub
```

La llave con extensión .pub es la llave pública y la que no tiene extensión es la llave privada. 

## Agregar llave SSH a OpenSSH

Una vez creadas las llaves SSH, es necesario agregarlas al agente SSH, en este caso OpenSSH. Para ello, ejecutar el siguiente comando. Recordando que se debe estar posicionado en la ruta donde se almacenan las llaves, o bien, se puede especificar la ruta completa.  

```powershell
ssh-add .\id_ed25519
```

## Agregar llave SSH a GitHub

* Para agregar las llaves SSH a GitHub, es necesario copiar el contenido de la llave pública, para ello, ejecutar cualquiera de los siguientes dos comandos, y copiar el contenido que se muestra en pantalla.  

```powershell
Get-Content .\id_ed25519.pub
cat .\id_ed25519.pub
```

* Ingresar a [GitHub](https://github.com) y dirigirse a la sección de configuración de la cuenta.

* En el panel izquierdo, seleccionar la opción **SSH and GPG keys**.

* Hacer clic sobre el botón **New SSH key**.

* En el campo **Title**, colocar un nombre que identifique la llave SSH.

* En el campo **Key**, pegar el contenido de la llave pública que se copió anteriormente.

* Hacer clic sobre el botón **Add SSH key** para agregar la llave SSH a GitHub.

* Confirmar la contraseña de GitHub y listo.

De esta forma, se ha agregado la llave SSH a GitHub. En caso de querer agregar una nueva llave SSH, se debe repetir el proceso anterior, saltando los pasos de configuración de OpenSSH.

Para más información sobre la configuración de llaves SSH en GitHub, se puede consultar la documentación oficial de GitHub en [Conectar a GitHub con SSH](https://docs.github.com/es/authentication/connecting-to-github-with-ssh).