# 00 - Einführung

### Pivoting

= "dem Angreifer vorher nicht bekannte Netze über einen erreichbaren Host zu erreichen. [...] oftmals der Entry-Host, welcher uns Zugang zu internen Netzen bietet."

### Tunneling

- Teilmenge von Pivoting
    - Netzverkehr in ein anderes Protokoll kapseln und weiterleiten
- "Gefängnis-Werkzeug-in-Kuchen-Vergleich"
- VPN und bestimmte Arten von Browsern = andere Form von Tunneln des Netzverkehrs

### Lateral Movement

= vorhandene Rechte horizontal oder vertikal zu eskalieren

-> mit Creds zu einem kompromittierten Host weitere Hosts mit den selben Creds übernehmen = **Horizontal Lateral Movement** <br>
-> Creds zu Admin-Accounts und nutzen diese im kompromittierten Netz = **Vertical Lateral Movement**