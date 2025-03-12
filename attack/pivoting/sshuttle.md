- [SShuttle](#sshuttle)
    - [Funktionsweise](#funktionsweise)
    - [Verwendung](#verwendung)
  - [Aufgabe 1](#aufgabe-1)
  - [Aufgabe 2](#aufgabe-2)

---

# SShuttle

= ähnlich zu Proxychains, baut selbst SSH auf

**Voraussetzungen**: <br>
- sudo/root auf dem Client
    - Server braucht keine Sudo/Root-Rechte
- SSH-Verbindung
    - Inkl. Creds
- Python
    - 3.8 oder größer
    - statische Kopie oder installier

_UDP-/ICMP-Verbindugen werden nicht weitergeleitet!_

### Funktionsweise

- Während VPNs Daten paketweise weiterleiten und keine einzelnen Verbindungen verfolgen, verfolgt Sshuttle jede einzelne Verbindung
- fügt den TCP-Datenstrom lokal zusammen, multiplexed ihn zustandsbehaftet über eine SSH-Sitzung und zerlegt ihn am anderen Ende wieder in Pakete -> **sichere Daten-über-TCP-Übertragung**

### Verwendung

- muss nicht auf dem Remote-Server installiert werden
    - überträgt seinen Source-Code selbstständig und führt ihn mit dem Python-Interpreter aus
    - somit wird eine transparenter Proxy auf der lokalen Maschine erstellt, welcher alle Verbindungen, die auf 0.0.0.0/0 matchen, weiterleitet
- erzeugt bei der Ausführung mehrere IPTables-Regeln

Beispiel einiger Befehle:

```bash
# Basic Command
sshuttle -r username@address[:port] subnet

# Automatisches Erkennen des Subnets über die Routing Table des Ziels
sshuttle -r username@address[:port] -N

# Problem: Keine Key/Identity File unterstützung
# Workaround: ssh-cmd 
sshuttle -r user@address[:port] --ssh-cmd "ssh -i KEYFILE" subnet

# Möglicher Fehler: Broken Pipe -> Ziel IP ist in Subnet enthalten
# Lösung: ignorieren der Ziel IP
sshuttle -r user@address[:port] subnet -x address

# Auto Auffüllen von /etc/host durch sshuttle
sshuttle -r user@address[:port] subnet -H
```

Wobei:

- -r
    - IP-Adresse des Sshuttle-Servers
    - Aufbau von SSH-Verbindung zu dieser IP
    - Spezifischer Port für Sshuttle kann angegeben werden
- --listen
    - Spezifizieren der Listener Adresse/Port auf Client
    - Standard 127.0.0.1 und Random Port
    - 0.0.0.0:0 möglich mit IP-Forwarding
- --ssh-cmd
    - Befehl der beim Erstellen der SSH-Verbindung ausgeführt werden soll
    - Wichtig beim Arbeiten mit Identity Files
- -N
    - Zieht zusätzliche routbare Netze aus der Routing Table des Servers
    - In Tests kein direktes Ergebnis zu erkennen
- -H
    - Kurzform von "--auto-hosts"
    - Füllt /etc/hosts automatisch mit IP/Hostname-Einträgen
    - Einträge müssen in /etc/hosts des Servers vorhanden sein
    - Werden nach Beenden wieder gelöscht
- -x
    - Excluden von bestimmten Netzbereichen
    - Diese werden nicht weitergeleitet
- --python
    - Angeben des Remote Python Interpreters
    - Standard ist einfach nur "python"
    - Wichtig wenn statische Kopie verwendet wird

_Es wird empfohlen, Sshuttle nicht als Background Process laufen zu lassen, da dies die Ausführung stören kann!_

-----------

## Aufgabe 1

**Ähnlich zum vorherigen Ausbildungsteil sollt ihr wieder eine Verbindung so aufbauen, dass ihr euch direkt per SSH auf den Webserver verbinden könnt - dieses Mal nur mit Sshuttle. Es soll am Ende möglich sein, mit einem**

```bash
sshuttle -r user@10.10.1.253 -N --ssh-cmd "ssh -J user@192.168.1.1,user@10.1.5.251"
[...]
c : Connected to server.

...

curl -I 10.10.1.253
HTTP/1.1 200 OK
[...]
```

_andere Route:_

```bash
sshuttle -r user@186.222.240.1 -N --ssh-cmd "ssh -J user@192.168.1.1,user@149.75.248.253,user@169.254.241.152"
[...]
c : Connected to server.

...

curl -I 10.10.1.253
HTTP/1.1 200 OK
[...]
```

## Aufgabe 2

**Richtet bei der SSH Verbindung zu einem beliebigen Target den Login mit Identity File ein. Versucht anschließend Sshuttle mit dieser Identity File zu starten.**

Zunächst:

```bash
ssh-keygen

...

ssh-copy-id -i ~/.ssh/id_rsa user@192.168.1.1
```

Dann:

```bash
sshuttle -r user@192.168.1.1 --ssh-cmd "ssh -i ~/.ssh/id_rsa" -N -x 192.168.1.1
```

Ich werde in diesem Fall nicht nach einem Passwort gepromptet.