# Nebenjob

Zugang Alex - https://wikare.de/s/jkENHLqYjtgLd4d

# TODO

- Gespielte Boxen (_im Wesentlichen die Initial Accesses und generische PrivEscs_) in Notizen einpflegen

- setup
  - Terminal Emulator: Kitty, Wave, wezterm, ghostty
  - shell: zsh (_ohmyzsh_)
  - tmux

- Attack cycle / workflow with clickable links
  - Cyber Kill Chain / MITRE Attack Chain

- Templates
  - BBH

- pt_process.md
  - Anpassen von mermaid

- Module für CPTS
  - Footprinting
  - OSINT Corporate Recon
  - Shells & Payloads
  - Password Attacks
  - Attacking Common Services
  - Pivoting, Tunneling, Port Forwarding
  - AD Enum & Attacks
  - Attacking common apps
  - linux privesc
  - wind privesc
  - documentation and reporting
  - attacking enterprise networks

# Certs

**Gedachter Verlauf**:

```mermaid
flowchart LR

0@{shape: circle, label: "Starting Point"}

    0 --> sub1
    subgraph sub1["Basics Attack/Defend"]
        direction TB
            A1[CBBH]:::attack -.-> A2[CPTS]:::attack
            A1[CBBH]:::attack -.-> A2b[OSCP]:::attack
            A2[CPTS]:::attack -.-> D1[BTL 1]:::defend
            A2b[OSCP]:::attack -.-> D1[BTL 1]:::defend
            D1[BTL 1]:::defend -.-> D2[CDSA]:::defend
    end
    sub1 -.-> sub2
    subgraph sub2["AD"]
        direction TB
            A3[CRTP]:::attack -.-> A4[CAPE]:::attack
    end
    sub2 -.-> sub3
    subgraph sub3["Expert"]
        direction TB
            A5[CRTO 1]:::attack -.-> A6[CRTO 2]:::attack
            A6[CRTO 2]:::attack -.-> D3[CCD]:::defend
            D3[CCD]:::defend -.-> A7[CWEE]:::attack
            A7[CWEE]:::attack -.-> A8[OSEP]:::attack
    end

classDef attack stroke:red
classDef defend stroke:blue
```