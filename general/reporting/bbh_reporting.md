- [Reporting](#reporting)
  - [Essential Elements of a good Bug Report](#essential-elements-of-a-good-bug-report)
  - [CWE \& CVSS](#cwe--cvss)
    - [CWE (_Common Weakness Enumeration_)](#cwe-common-weakness-enumeration)
    - [CVSS (_Common Vulnerability Scoring System_)](#cvss-common-vulnerability-scoring-system)
  - [CVSS Calculator](#cvss-calculator)
    - [Attack Vector](#attack-vector)
    - [Attack Complexity](#attack-complexity)
    - [Privileges Required](#privileges-required)
    - [User Interaction](#user-interaction)
    - [Scope](#scope)
    - [Confidentiality](#confidentiality)
    - [Integrity](#integrity)
    - [Availability](#availability)
    - [Good Report Examples](#good-report-examples)

---

# Reporting

## Essential Elements of a good Bug Report

| Element | Description |
| ------- | ----------- |
| Vulnerability Title | Including vuln type, affected domain/parameter/endpoint, impact etc. |
| CWE & CVSS Score | For communicating the characteristics and severity of the vuln |
| Vulnerability Description | Better understanding of the vuln cause |
| PoC | Steps to reproduce exploiting the identified clearly and concisely |
| Impact | Elaborate more on what an attacker can achieve by fully exploiting the vulnerability; business impact and maximum damage should be included in the impact statement |
| Remediation | Optional in BBP, but goot to have |

## CWE & CVSS

### CWE (_Common Weakness Enumeration_)

A community-developed list of software and hardware weakness types. It serves as a common language, a measuring stick for security tools, and as a baseline for weakness identification, mitigation, and prevention efforts.

### CVSS (_Common Vulnerability Scoring System_)

When it comes to communicating the severity of an identified vuln, the CVSS should be used, as it is a published standard used by organizations worldwide.

## CVSS Calculator

Can be found [here](https://www.first.org/cvss/calculator/3-1).

### Attack Vector

_Shows how the vuln can be exploited._

- Network (N)
  - Attackers can only exploit this vuln through the network layer
- Adjacent (A)
  - Attackers can exploit this vuln only if they reside in the same physical or logical network
- Local (L)
  - Attackers can exploit this vuln only by accessing the target system locally or remotely or through user interaction
- Physical (P)
  - Attackers can exploit this vuln through physical interaction/manipulation

### Attack Complexity

_Depicts the conditions beyond the attackers' control and must be present to exploit the vuln successfully._

- Low (L)
  - No special preparations should take place to exploit the vuln successfully; the attackers can exploit the vuln repeatedly without any issue
- High (H)
  - Special preparations and information gathering should take place to exploit the vuln successfully

### Privileges Required

_Show the level of privileges the attacker must have to exploit the vuln successfully._

- None (N)
  - No special access related to settings or files is required to exploit the vuln successfully; the vuln can be exploited from an unauthorized perspective
- Low (L)
  - Attackers should posses standard user privileges to exploit the vuln successfully; the exploitation in this case usually affects files and settings owned by a user or non-sensitive assets
- High (H)
  - Attacker should possess admin-level privileges to exploit the vuln successfully; the exploitation in this case usually affects the entire vulnerable system

### User Interaction

_Shows if the attacker can successfully exploit the vuln on their own or user interaction is required._

- None (N)
  - Attackers can successfully exploit the vuln independently
- Required (R)
  - A user should take some action before the attacker can successfully exploit the vuln

### Scope

_Shows if successful exploitation of the vuln can affect components other than the affected one._

- Unchanged (U)
  - Successful exploitation of the vuln affects the vulnerable components or affects resources managed by the same security authority
- Changed (C)
  - Successful exploitation of the vuln can affect components other than the affected one or resources beyond the scope of the affected component's security authority

### Confidentiality

_Shows how much the vulnerable component's confidentiality is affected upon successfully exploiting the vuln; confidentiality limits information access and disclosure to authorized users only and prevents unauthorized users from accessing information._

- None (N)
  - The confidentiality of the vulnerable component does not get impacted
- Low (L)
  - The vulnerable component will experience some loss of confidentiality upon successfully exploitation of the vuln; in this case, the attackers do not have control over what information is obtained
- High (H)
  - The vulnerable component will experience total (_or serious_) loss of confidentiality upon successfully exploiting the vuln; in this case, the attackers have total (_or some_) control over what information is obtained

### Integrity

_Shows how much the vulnerable component's integrity is affected upon successfully exploiting the vuln. Integrity refers to the trustworthiness and veracity of information._

- None (N)
  - The integrity of the vulnerable component does not get impacted
- Low (L)
  - Attackers can modify data in a limited manner on the vulnerable component upon successfully exploiting the vuln; attackers do not have control over the consequence of a modification, and the vulnerable component does not get seriously affected in this case
- High (H)
  - Attacker can modify all or critical data on the vulnerable component upon successfully exploiting the vuln; attackers have control over the consequences of a modification, and the vulnerable component will experience a total loss of integrity

### Availability

_Shows how much the vulnerable component's availability is affected upon successfully exploiting the vuln; availability refers to the accessibility of information resources in terms of network bandwith, disk space, processor cycles, etc._

- None (N)
  - The availability of the vulnerable component does not get impacted
- Low (L)
  - The vulnerable component will experience some loss of availability upon successfully exploiting the vuln; the attacker does not have complete control over the vulnerable component's availability and cannot deny the service to users, and performance is just reduced
- High (H)
  - The vulnerable component will experience total (_or sever_) availability loss upon successfully exploiting the vuln; the attacker has complete (_or significant_) control over the vulnerable component's availability and can deny the service to users; performance is significantly reduced

### Good Report Examples

- [Remote Code Execution in Slack desktop apps](https://hackerone.com/reports/783877)
- [A staff member with no permissions can edit Store Customer Email](https://hackerone.com/reports/980511)
- [XSS while logging using Google](https://hackerone.com/reports/691611)
- [Cross-site Scripting (XSS) on HackerOne careers page](https://hackerone.com/reports/474656)
- [SSRF in Exchange leads to ROOT access in all instances](https://hackerone.com/reports/341876)