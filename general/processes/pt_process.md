- [Penetration Testing Process](#penetration-testing-process)

---

# Penetration Testing Process

```mermaid
flowchart LR


A["Pre-Engagement"]:::white@{shape: doc}
B["Information Gathering"]:::blue@{shape: circle}
C["Post-Exploitation"]:::green@{shape: circle}
D["Vulnerability Assessment"]:::yellow@{shape: circle}
E["Exploitation"]:::green@{shape: circle}
F["Lateral Movement"]:::red@{shape: circle}
G["PoC"]:::purple@{shape: hex}
H["Post-Engagemment"]:::white@{shape: lin-doc}

A --> B
C --> B
B <--> D
E --> B
D --> C
D <--> F
D --> E
C <--> E
C --> F
E --> F
C -.-> G
F -.-> G
E -.-> G
G --> H

classDef white stroke: white
classDef blue stroke: blue
classDef yellow stroke: yellow
classDef green stroke: green
classDef red stroke: red
classDef purple stroke: purple
```

## Steps

### Pre-Engagment

### Information Gathering

### Vulnerability Assessment

### Exploitation

### Post-Exploitation

### Lateral Movement

### Proof-of-Concept

### Post-Engagement

## Overview

### Risk Management

### Testing Methods

#### External Pentest

#### Internal Pentest

### Types of Pentests

### Types of Testing Environments

## Precautionary Measures during Pentests

## Pentest Phases

### Pre-Engagement

### Information Gathering

### Vulnerability Assessment

### Exploitation

### Post-Exploitation

### Lateral Movement

### PoC

### Post-Engagement