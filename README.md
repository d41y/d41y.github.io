# Cybersecurity Notes by d41y

[![GitHub Repo Size](https://img.shields.io/github/repo-size/d41y/d41y.github.io)](https://github.com/d41y/d41y.github.io)
[![License](https://img.shields.io/badge/license-Educational-blue)](https://github.com/d41y/d41y.github.io)

> A comprehensive, structured set of cybersecurity notes covering offensive, defensive, and general topics for learning, reference, and practical application.

---

## Table of Contents

- [Overview](#overview)
- [Sections](#sections)
  - [ATTACK](#attack)
  - [DEFEND](#defend)
  - [GENERAL](#general)
- [Browsing the Notes](#browsing-the-notes)

---

## Overview

**Cybersecurity Notes** is a curated collection of knowledge, examples, and practical references for cybersecurity enthusiasts, students, and professionals.  
The notes are written in Markdown and organized for easy navigation via [mdBook](https://rust-lang.github.io/mdBook/).

The content is divided into three main areas:

1. **ATTACK** – Offensive security, exploitation, pentesting, and adversarial techniques.  
2. **DEFEND** – Defensive strategies, hardening, incident response, and digital forensics.  
3. **GENERAL** – Core concepts, tools, programming, networking, and assessments.

---

## Sections

### ATTACK

Offensive security and penetration testing topics:

- **Binary Exploitation** – Stack-based buffer overflows on Linux x86  
- **Cloud, Crypto, GamePwn, Hardware/ICS attacks**  
- **Initial Access** – Application discovery, password attacks, services  
- **Linux, MacOS, Mobile, OSINT**  
- **Pivoting & Post-Exploitation** – Chisel, Ligolo, Socat, SSH, Sshuttle  
- **Reversing & PoCs** – Examples and test cases  
- **Tools** – Metasploit, nmap  
- **Vulnerability Scanning** – Nessus, OpenVAS  
- **Web Security** – Client-side, server-side, Web Services/API, Authentication, CMS  
- **Wi-Fi & Windows** – Pentesting basics and Active Directory enumeration  

### DEFEND

Defensive strategies, mitigation, and incident response:

- **Defensive Considerations & Hardening** – AD, common applications  
- **Digital Forensics** – Disk, memory, network analysis  
- **Incident Response** – Reporting and handling  
- **Malware Analysis** – Introductory guides  
- **SIEM & Threat Hunting** – Security monitoring fundamentals  

### GENERAL

Foundational topics across cybersecurity:

- **Assessments** – Security and vulnerability assessments  
- **DBMS** – Relational (MySQL) and Non-relational (Neo4J)  
- **Elastic Stack** – Kibana, Elasticsearch, search analysis, visualization  
- **Networking** – General networking, Cisco basics  
- **Processes** – Bug bounty, penetration testing, incident handling  
- **Programming** – Assembly, Bash, Python (including 573 cheatsheet)  
- **Reporting & Web Development** – Bug bounty, PT reporting, Sylius, Symfony  

---

## Browsing the Notes

This repository is structured for **mdBook**, providing a web-based book interface.

To run locally:

```bash
# Install mdBook if not installed
cargo install mdbook

# Serve the book locally
mdbook serve