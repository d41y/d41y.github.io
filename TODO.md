# Nebenjob

Zugang Alex - https://wikare.de/s/jkENHLqYjtgLd4d

# TODO

- Doku für:
  - Linux Fundamentals
  - Windwos Fundamentals

- Attack cycle / workflow with clickable links
  - Cyber Kill Chain / MITRE Attack Chain

# Certs

Red:

1. CBBH
2. CPTS/OSCP
3. CRTP
4. CAPE
5. CRTO
6. CRTO 2
7. OSEP

Blue:

1. BTL 1
2. CDSA
3. CCD

**Gedachter Verlauf**:

```mermaid
flowchart LR

classDef attack stroke:red
classDef defend stroke:blue

0@{shape: circle, label: "Starting Point"}

A1[CBBH]
A2[CPTS]
A3[CRTP]
A4[CAPE]
%%A5[CRTO 1]
%%A6[CRTO 2]
%%A7[OSEP]

D1[BTL 1]
D2[CDSA]
%%D3[CCD]

0 --> A1
subgraph "Basics Attack/Defend"
    direction TB
        A1:::attack -.-> A2
        A2:::attack -.-> D1
        D1:::defend -.-> D2
end
subgraph "AD"
    direction TB
        D2:::defend -.-> A3
        A3:::attack -.-> A4:::attack
end
```