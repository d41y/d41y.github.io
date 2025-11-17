- [Penetration Testing Process](#penetration-testing-process)
  - [Overview](#overview)
    - [Risk Management](#risk-management)
    - [Testing Methods](#testing-methods)
      - [External Pentest](#external-pentest)
      - [Internal Pentest](#internal-pentest)
    - [Types of Pentests](#types-of-pentests)
    - [Types of Testing Environments](#types-of-testing-environments)
  - [Precautionary Measures during Pentests](#precautionary-measures-during-pentests)
    - [Checklist](#checklist)
  - [Pentest Phases](#pentest-phases)
    - [Pre-Engagement](#pre-engagement)
      - [Scoping Questionnaire](#scoping-questionnaire)
      - [Pre-Engagement Meeting](#pre-engagement-meeting)
        - [Contract Checklist](#contract-checklist)
        - [RoE](#roe)
      - [Kick-Off Meeting](#kick-off-meeting)
      - [Contractos Agreement](#contractos-agreement)
        - [Checklist for Physical Assessments](#checklist-for-physical-assessments)
    - [Information Gathering](#information-gathering)
      - [OSINT](#osint)
      - [Infrastructure Enumeration](#infrastructure-enumeration)
      - [Service Enumeration](#service-enumeration)
      - [Host Enumeration](#host-enumeration)
      - [Pillaging](#pillaging)
    - [Vulnerability Assessment](#vulnerability-assessment)
      - [Vulnerability Research and Analysis](#vulnerability-research-and-analysis)
      - [The Return](#the-return)
    - [Exploitation](#exploitation)
      - [Priorization of Possible Attacks](#priorization-of-possible-attacks)
      - [Preparation for the Attack](#preparation-for-the-attack)
    - [Post-Exploitation](#post-exploitation)
      - [Evasive Testing](#evasive-testing)
      - [Information Gathering](#information-gathering-1)
      - [Pillaging](#pillaging-1)
      - [Persistence](#persistence)
      - [Vulnerability Assessment](#vulnerability-assessment-1)
      - [PrivEsc](#privesc)
      - [Data Exfiltration](#data-exfiltration)
    - [Lateral Movement](#lateral-movement)
      - [Pivoting](#pivoting)
      - [Evasive Testing](#evasive-testing-1)
      - [Information Gathering](#information-gathering-2)
      - [Vulnerability Assessment](#vulnerability-assessment-2)
      - [PrivEsc](#privesc-1)
      - [Post-Exploitation](#post-exploitation-1)
    - [PoC](#poc)
    - [Post-Engagement](#post-engagement)
      - [Cleanup](#cleanup)
      - [Documenting and Reporting](#documenting-and-reporting)
      - [Report Review Meeting](#report-review-meeting)
      - [Deliverable Acceptance](#deliverable-acceptance)
      - [Post-Remediation Testing](#post-remediation-testing)
      - [Data Retention](#data-retention)
      - [Close Out](#close-out)

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

## Overview

A Penetration Test is an organized, targeted, and authorized attack attempt to test IT infrastructure and its defenders to determine their susceptibility to IT security vulns. A pentest uses methods and techniques that real attackers use. As penetration testers, you apply various techniques and analyses to gauge the impact that a particular vuln or chain of vulns may have on the confidentiality, integrity, and availability of an organization's IT systems and data.

A pentest aims to uncover and identify all vulns in the systems under investigation and improve the security for the tested systems.

### Risk Management

In general, it is part of risk management for a company. The main goal of IT security risk management is to identify, evaluate, and mitigate any potential risks that could damage the confidentiality, integrity, and availability of an organization's information system and data and reduce the overall risk to an acceptable level. This includes identifying potential threats, evaluating their risks, and taking the necessary steps to reduce or eliminate them. This is done by implementing the appropriate security protocols and policies, including access control, encryption, and other security measures. By taking the time to properly manage the security risks of an organization's IT systems, it is possible to ensure that the data is kept safe and secure.

However, you cannot eliminate every risk. There's still the nature of the inherent risk of a security breach that is present even when the company has taken all steps to manage the risk. Therefore, some risks will remain. Inherent risk is the level of risk that is present even when the appropriate security controls are in place. Companies can accept, transfer, avoid and mitigate risks on various ways.

During a pentest, you prepare detailed documentation on the steps taken and the results achieved. However, it is the client's responsibility or the operator of their systems under investigation to rectify the vulns found. Your role is as trusted advisors to report vulns, detailed reproduction steps, and provide appropriate remediation recommendations, but you do not go in and apply patches or make code changes, etc. It is important to note that a pentest is not monitoring the IT infrastructure or systems but a momentary snapshot of the security status. A statement to this regard should be reflected in your pentest report deliverable.

### Testing Methods

#### External Pentest

Many pentests are performed from an external perspective or as an anonymous user on the internet. Most customers want to ensure that they are as protected as possible against attacks on their external network perimeter. You can perform testing from your own host or from a VPS. Some clients don't care about stealth, while others request that you proceed as quietly as possible, approaching the target systems in a way that avoids firewall bans, IDS/IPS detection, and alarm triggers. They may ask for a stealthy or "hybrid" approach where you gradually become "noisier" to test their detection capabilities. Ultimately your goal here is to access external-facing hosts, obtain sensitive data, or gain access to the internal network.

#### Internal Pentest

In contrast to an external pentest, an internal pentest is when you perform testing from within the corporate network. This stage may be executed after successfully penetrating the corporate network via the external pentest or starting from an assumed breach scenario. Internal pentests may also access isolated systems with no internet access whatsoever, which usually requires your physical presence at the client's facility.

### Types of Pentests

| Type | Information Provided |
| ---- | -------------------- |
| Blackbox | minimal; only the essential information, such as IP addresses and domains, is provided |
| Greybox | extended; in this case, you are provided with additional information, such as specific URLs, hostnames, subnets, and similar |
| Whitebox | Maximum; here everythin is disclosed to you; this gives you an internal view of the entire structure, which allows you to prepare an attack using internal information; you may be given detailed configs, admin creds, web app source code, etc. |
| Red-Teaming | May include physical testing and social engineering, among other things; can be combined wit any of the above types |
| Purple-Teaming | It can be combined with any of the above; however, it focuses on working closely with the defenders |

### Types of Testing Environments

- Network
- IoT
- Hosts
- Web App
- Cloud
- Server
- Mobile
- Source Code
- Security Policies
- API
- Physical Security
- Firewalls
- Thick Clients
- Employees
- IDS/IPS

## Precautionary Measures during Pentests

Each country has specific laws which regulate computer-related activities, copyright protection, interception of electronic communication, use and disclosure of protected health information, and collection of personal information from children, respectively.

It is essential to follow these laws to protect individuals from unauthorized access and exploitation of their data and to ensure their privacy.

### Checklist

- [ ] Obtain written consent from the owner or authorized representive of the computer being tested
- [ ] Conduct the testing within the scope of the consent obtained only and respect any limitations specified
- [ ] Take measure to prevent causing damage to the systems or networks being tested
- [ ] Do not access, use or disclose personal data or any other information obtained during the testing without permission
- [ ] DO not intercept electronic communication without the consent of one of the parties to the communication
- [ ] Do not conduct testing on systems or networks that are covered by the Health Insurance Portability and Accountability Act (_HIPAA_) without proper authorization

## Pentest Phases

### Pre-Engagement

... is the stage of preparation for the actual penetration test. During this stage, many questions are asked, and some contractual agreements are made. The client informs you about what they want to be tested, and you explain in detail how to make the test as efficient as possible.

It consists of three essential components:

1. Scoping questionnaire
2. Pre-engagement meeting
3. Kick-off meeting

Before any of these can be discussed in detail, a Non-Disclosure Agreement (_NDA_) must be signed by all parties. There are several types of NDAs:

| Type | Description |
| Unilateral NDA | This type of NDA obligates only one party to maintain confidentiality and allows the other party to share the information received with third parties |
| Bilaterial NDA | In this type, both parties are obligated to keep the resulting and acquired information confidential; this is the most common type of NDA that protects the work of pentesters |
| Multilateral NDA | Multilateral NDA is a commitment to confidentiality by more than two parties; if you conduct a pentest for a cooperative network, all parties responsible and involved must sign this document |

Exceptions can be made in urgent cases.

This stage also requires the preparation of several documents before a penetration test can be conducted that must be signed by your client and you so that the declaration of consent can also be presented in written form if required. These documents include:

- NDA
- Scoping Questionnaire
- Scoping Document
- Pentest Proposal (_Contract/Scope of Work_)
- RoE
- Contractors Agreement
- Reports

#### Scoping Questionnaire

After initial contact is made with the client, you typically send them a Scoping Questionnaire to better understand the services they are seeking:

- [ ] Internal Vulnerability Assessment
- [ ] Internal Pentest
- [ ] Wireless Security Assessment
- [ ] Physical Security Assessment
- [ ] Red Team Assessment
- [ ] External Vulnerability Assessment
- [ ] External Pentest
- [ ] Application Security Assessment
- [ ] Social Engineering Assessment
- [ ] Web App Security Assessment

Aside from the assessment type, client name, address, and key personal contact information, some other crucial pieces of information include:

- How may expected live hosts?
- How many IPs/CIDR ranges in scope?
- How many domains/subdomains are in scope?
- How many wireless SSIDs in scope?
- How many web/mobile apps? If testing is authenticated, how many roles?
- For a phishing assessment, how many users will be targeted? Will the client provide a list, or will you be required to gather the list via OSINT?
- If the client is requesting a physical assessment, how many locations? If multiple sites are in scope, are they geographically dispersed?
- What is the objective of the red team assessment? Are any activities out of scope?
- Is a separate AD security assessment desired?
- Will network testing be conducted from an anonymous user on the network or a standard domain user?
- Do you need to bypass Network Access Control?

#### Pre-Engagement Meeting

Once you have an initial idea of the client's project requirements, you can move on to the pre-engagement meeting. This meeting discusses all relevant and essential components with the customer before the pentest, explaining them to your customer. The information you gather during this phase, along with the data collected from the scoping questionnaire, will server as inputs to the Penetration Testin Proposal, also known as the Contract or Scope of Work.

##### Contract Checklist

- [ ] NDA
- [ ] Goals
- [ ] Scope
- [ ] Pentest Type
- [ ] Methodologies
- [ ] Pentesting Locations
- [ ] Time Estimation
- [ ] Third Parties
- [ ] Evasive Testing
- [ ] Risks
- [ ] Scope Limitations & Restrictions
- [ ] Information Handling
- [ ] Contact Information
- [ ] Lines of Communication
- [ ] Reporting
- [ ] Payment Terms

##### RoE

Based on the Contract Checklist and the input shared in scoping, the Pentesting Proposal and the associated RoE are created.

- [ ] Introduction
- [ ] Contractor
- [ ] Pentesters
- [ ] Contact Information
- [ ] Purpose
- [ ] Goals
- [ ] Scope
- [ ] Lines of Communication
- [ ] Time Estimation
- [ ] Time of the Day to Test
- [ ] Pentest Type
- [ ] Pentest Locations
- [ ] Methodologies
- [ ] Objectives / Flags
- [ ] Evidence Handling
- [ ] System Backups
- [ ] Information Handling
- [ ] Incidident Handling and Reporting
- [ ] Status Meeting
- [ ] Reporting
- [ ] Retesting
- [ ] Disclaimers and Limitation of Liability
- [ ] Permission to Test

#### Kick-Off Meeting

The kick-off meeting usually occurs at a scheduled time and in-person after signing all contractual documents. This meeting usually includes POCs, client technical support staff, and the pentester team, the actual pentesters, and sometimes a project manager or even the sales account executive. Together, you will go over the nature of the pentest.

You should also inform your customers about potential risks during a pentest.

Explaining the pentest process gives everyone involved a clear idea of your entire process. This demonstrates your professional approach and convinces your questioners that you know what you are doing.

#### Contractos Agreement

If the pentest also includes physical testing, then an additional contractor's agreement is required. Since it is not only a virtual environment but also a physical intrusion, completely different laws apply. It is also possible that many of the employees have not been informed about the test.

##### Checklist for Physical Assessments

- [ ] Introduction
- [ ] Contractor
- [ ] Purpose
- [ ] Goal
- [ ] Pentesters
- [ ] Contact Information
- [ ] Physical Addresses
- [ ] Building Name
- [ ] Floors
- [ ] Physical Room Identifications
- [ ] Phyiscal Components
- [ ] Timeline
- [ ] Notarization
- [ ] Permission to Test

### Information Gathering

You obtain the necessary information relevant to you in many different ways. They can be divided into the following categories:

- OSINT
- Infrastructure Enumeration
- Service Enumeration
- Host Enumeration

#### OSINT

... is a process for finding publicly available information on a target company or individuals that allows the identification of events, external and internal dependencies, and connections. OSINT uses public information from freely available sources to obtain the desired results.

It is possible to find highly sensitive information such as passwords, hashes, keys, and much more that can give you access to the network within just a few minutes.

#### Infrastructure Enumeration

During the infrastructure enumeration, you try to overview the company's position on the internet and intranet. You use services such as DNS to create a map of the client's servers and hosts and develop an understanding of how their infrastructure is structured. This includes name servers, mail servers, web servers, cloud instances, and more.

In this phase, you also try to determine the company's security measures. The more precise this information is, the easier it will be to disguise your attacks. But identifying firewalls, such as WAFs, also gives you an excellent understanding of what techniques could trigger an alarm for your customer and what methods can be used to avoid that alarm.

#### Service Enumeration

in service enumeration, you identify services that allow you to interact with the host or server over the network. Therefore, it is crucial to find out about the service, what version it is, what information it provides you, and the reason it can be used. Once you understand the background of what this service has been provisioned for, some logical conclusions can be drawn to provide you with several options.

#### Host Enumeration

Once you have a detailed list of the customer's infrastructure, you examine every single host listed in the scoping document. You try to identify which OS is running on the host or server, which services it uses, which versions of the services, and much more. Again, apart from the active scans, you can also use various OSINT methods to tell you how this host or server may be configured.

During internal host enumeration, which in most cases comes after the successful exploitation of one or more vulns, you also examine the host or server from the inside. This means you look for sensitive files, local services, scripts, apps, information, and other things that could be stored on the host. This is also an essential part of the post-exploitation phase, where you try to exploit and elevate privileges.

#### Pillaging

... is performed after hitting the post-exploitation stage to collect sensitive information locally on the already exploited host, such as employee names, customer data, and much more.

### Vulnerability Assessment

During the vulnerability assessment, you examine and analyze the information gathered during the information gathering phase. The vulnerability assessment phase is an analytical process based on the findings.

An analysis is a detailed examination of an event or process, describing its origin and impact, that with the help of precautious and actions, can be triggered to support or prevent future occurences.

Any analysis can very complicated, as many different factors and their interdependencies play a significant role. Apart from the fact that you work with the three different times during each analysis, the origin and destination play a significant role. There are four different types of analysis:

- descriptive
- diagnostic
- predictive
- prescriptive

#### Vulnerability Research and Analysis

Information gathering and vulnerability research can be considered a part of descriptive analysis. This is where you identify the individual network or system you are investigating. In vulnerability research, you look for known vulns, exploits, and security holes that have already been discovered and reported. Therefore, if you have identified a version of a service or application through information gathering and found a Common Vulnerabilities and Exposure, it is very likely that this vuln is still present.

You can find vulnerability disclosures for each componenet using many different sources:

- CVEdetails
- Exploit DB
- Vulners
- Packet Storm Security
- NIST

This is where diagnostic analysis and predictive analysis is used. Once you have found a published vulnerability like this, you can diagnose it to determine what is causing or has caused the vuln. Here, you must understand the functionality of the PoC code or the application or service itself as best as possible, as many manual configs by admins will require some customization for the PoC. Each PoC is tailored to a specific case that you will also need to adapt to yours in most cases.

#### The Return

Suppose you are unable to detect or identify potential vulns from your analysis. In that case, you will return to the information gathering stage and look for more in-depth information that you have gathered so far.

### Exploitation

During the exploitation phase, you look for ways that these weaknesses can be adapted to your case to obtain the desired role. If you want to get a revshell, you need to modify the PoC to execute the code, so the target system connects back to you over an encrypted connection to an IP address you specify. Therefore, the preparation of an exploit is mainly part of the exploitation stage.

#### Priorization of Possible Attacks

Once you have found one or two vulns during the vulnerability assessment stage that you can apply to your target network/system, you can prioritize those attacks. Which of those attacks you prioritize higher than the others depends on the following factors:

- Probability of Success
- Complexity
- Probability of Damage

First, you need to assess the probability of successfully executing a particular attack against the target. CVSS scoring can help you there, using the NCD calculator better to calculate the specific attacks and their probability of success.

Complexity represents the effort of exploiting a specific vuln. This is used to estimate how much time, effort and research is required to execute the attack on the system successfully. Your experience plays an important role here because if you are to carry out an attack that you have never used before, this will logically require much more research and effort since you must understand the attack and the exploit structure in detail before applying it.

Estimating the probability of damage caused by the execution of an exploit plays a critical role, as you must avoid any damage to the target systems. Generally, you do not perform DoS attacks unless your client requires them. Nevertheless, attacking running services live with exploits that can cause damage to the software or the OS is something that you must avoid at all times.

In addition, you can assign these factors to a personal point system which will allow the evaluation to be more accurately calculated basen on your skills and knowledge:

| Factor | Points |
| ------ | ------ |
| Probability of Success | 10 |
| Complexity - Easy | 5 |
| Complexity - Medium | 3 |
| Complexity - Hard | 1 |
| Probability of Damage | -5 |
| **Summary** | **max. 15** |

#### Preparation for the Attack

Sometimes you will run into a situation where you can't find high-quality, known working PoC exploit code. Therefore, it may be necessary to reconstruct the exploit locally on a VM representing your target host to figure out precisely what needs to be adapted and changed. Once you have set up the system locally and installed known components to mirror the target environment as closely as possible, you can start preparing the exploit by following the steps described in the exploit. Then you test this on a locally hosted VM to ensure it works and does not damage significantly. In other situations, you will encounter misconfigurations and vulns that you see very often and know exactly which tool or exploit to use and whether the exploit or technique is "safe" or can cause instability.

If ever in doubt before running an attack, it's always best to check with your client, providing them all necessary data so they can make an informed decision on whether they would like you to attempt exploitation or just mark the finding as an issue. If they opt for you but not to proceed with exploitation, you can note in the report that it was not confirmed actively but is likely an issue that needs to be addressed. You have a certain amount of leeway during pentests and should always use your best judgement if a particular attack seems too risky or could potentially cause a disruption. When in doubt, communicate. Your team lead/manager, the client, will almost certainly prefer extra communication that run into a situation where they are trying to bring a system back online after a failed exploit attempt.

Once you have successfully exploited a target and have initial access, you'll move on to the post-exploitation and lateral movement stages.

### Post-Exploitation

Assume you successfully exploited the target system during the exploitation stage. As with the exploitation stage, you must again consider whether or not to utilize evasive testing in the post-exploitation stage. You are already on the system in the post-exploitation phase, making it much more difficult to avoid an alert. The post-exploitation stage aims to obtain sensitive and security-relevant information from a local perspective and business-relevant information that, in most cases, requires higher privileges than a standard user. This stage includes:

- Evasive Testing
- Information Gathering
- Pillaging
- Vulnerability Assessment
- PrivEsc
- Persistence
- Data Exfiltration

#### Evasive Testing

If a skilled admin monitors the system, any change or even a single command could trigger an alarm that will give you away. In many cases, you get kicked out of the network, and then threat hunting begins where you are the focus. You may also lose access to a host or a user account. This pentest would have failed but succeeded in some ways because the client could detect some actions. You can provide value to the client in this situation by still writing up an entire attack chain and helping them identify gaps in their monitoring and processes where they did not notice your actions. For you, you can study how and why the client detected you and work on improving your evasion skills. Perhaps you did not thoroughly test a payload, or you got careless and ran a command such as ```net user``` or ```whoami``` that is often monitored by EDR systems and flagged an anomalous activity.

Evasive testing is divided into three different categories:

- Evasive
- Hybrid Evasive
- Non-Evasive

#### Information Gathering

Since you have gained a new perspective on the system and the network of your target system in the exploitation stage, you are basically in a new environment. This means you first have to to reacquaint yourself with what you are working with and what options are available. Therefore, in the post-exploitation stage, you go through the information gathering and vulnerability assessment stages again, which you can consider as part of the current stage. This is because the information you had up to this point was gathered from an external perspective, not an internal one.

From the inside (_local_) perspective, you have many more possibilities and alternatives to access certain information that is relevant to you. Therefore, the information gathering stage starts all over again from the local perspective. You search and gather as much information as you can. The difference here is that you also enumerate the local network and local services such as printers, database servers, virtualization services, etc. Often you will find shares intended for employees to use to exchange and share data and files. The investigation of these services and network components is called Pillaging.

#### Pillaging

... is the stage where you examine the role of the host in the corporate network. You analyze the network configurations, including but not limited to:

- Interfaces
- Routing
- DNS
- ARP
- Services
- VPN
- IP Subnets
- Shares
- Network Traffic

Understanding the role of the system you are on also gives you an excellent understanding of how it communicates with other network devices and its purpose. From this, you can find out, for example, what alternative subdomains exist, whether it has multiple network interfaces, whether there are other hosts with which this system communicates, if admins are connecting to other hosts from it, and if you can potentially reuse credentials or steal an SSH key to further access or establish persistence, etc. This helps, above all, to get an overview of the network's structure.

For example, you can use the policies installed on this system to determine what other hosts are using on the network. Because admins often use particular schemas to secure their network and prevent users from changing anything on it. For example, suppose you discover that the password policy requires only eight chars but no special chars. In that case, you can conclude that you have a relatively high probability of guessing other users' passwords on this and other systems.

During the pillaging stage, you will also hunt for sensitive data such as passwords on shares, local machines, in scripts, configurations files, password vaults, documents, and even email.

Your main goals with pillaging are to show the impact of successful exploitation and, if you have not yet reached the goal of the assessment, to find additional data such as passwords that can be inputs to other stages such as lateral movement.

#### Persistence

Once you have an overview of the system, your immediate next step is maintaining access to the exploited host. This way, if the connection is interrupted, you can still access it. This step is essential and often used as the first step before the information gathering and pillaging stages.

You should follow non-standardized sequences because each system is individually configured by a unique admin who brings their own preferences and knowledge. It is recommended that you work flexibly during this phase and adapt to the circumstances. For example, suppose you have used a buffer overflow attack on a service that is likely to crash it. In that case, you should establish persistence to the system asap to avoid having to attack the service multiple times and potentially causing a disruption. Often if you lose the connection, you will not be able to access the system in the same way.

#### Vulnerability Assessment

If you can maintain access and have good overview of the system, you can use the information about the system and its services and any other data stored on it to repeat the vulnerability assessment stage, but this time from inside the system. You analyze the information and prioritize it accordingly. The goal you pursue next is the escalation of privileges.

Again, it is essential to distinguish between exploits that can harm the system and attacks against the services that do not cause any disruption. In doing so, you weigh the components you have already gone through in the first vulnerability assessment.

#### PrivEsc

... is significant, and in most cases, it represents a critical moment that can open many more new doors for you. Getting the highest privileges on the system or domain is often crucial. Therefore you want to get the privileges of the root or the domain administrator/local administrator/SYSTEM because this will often allow you to move through the entire network without any restrictions.

However, it is essential to remember that the escalation of privileges does not always have to occur locally on the system. You can also obtain stored credentials during the information gathering stage from other users who are members of a higher privileged group. Exploiting these privileges to log in as another user is also part of PrivEsc because you have escalated your privileges using the new set of creds.

#### Data Exfiltration

During the data exfiltration and pillaging stage, you will often be able to find, among other things, considerable personal information and customer data. Some clients will want to check whether it is possible to exfiltrate these types of data. This means you try to transfer this information from the target system to your own. Security systems such as Data Loss Prevention (_DLP_) and Endpoint Detection Response (_EDR_) help detect and prevent data exfiltration. In addition to network monitoring, many companies use encryption on hard drives to prevent external parties from viewing such information. Before exfiltrating any actual data, you should check with the customer and your manager. It can often be enough to create some bogus data and exfiltrate it to your system. That way, the protection mechanisms that look for patterns in data leaving the network will be tested, but you will not be responsible for any live sensitive data on your testing machine.

### Lateral Movement

The goal is here that you test what an attacker could do within the network. After all, the main goal is not only to successfully exploit a publicly available system but also get sensitive data or find all ways that an attacker could render the network unusable. One of the most common examples is ransomware. If a system in the corporate network is infected with ransomware, it can spread across the entire network. It locks down all the systems using various encryption methods, making them unusable for the whole company until a decryption key is entered.

In the most cases, the company is financially extorted to make a profit. Often, it is only at this moment that companies realize how important IT security is. If they had had a good pentester who tested things they probably could have prevented such a situation and the financial damage. It is often forgotten that in many countries, the CEOs are held liable for not securing their customer data appropriately.

In this stage you want to test how far you can move manually in the entire network and what vulns you can find from the internal perspective that might be exploited. In doing so, you will again run through several phases:

- Pivoting
- Evasive Testing
- Information Gathering
- Vulnerability Assessment
- PrivEsc
- Post-Exploitation

#### Pivoting

In most cases, the system you use will not have the tools to enumerate the internal network efficiently. Some techniques allow you to use the exploited host as a proxy and perform all the scans from your attack machine or VM. In doing so, the exploited system represents and routes all your network requests sent from your attack machine to the internal network and its network components.

In this way, you make sure that non-routable networks can still be reached. This allows you to scan them for vulns and penetrate deeper into the network. This process is also known as pivoting or tunneling.

#### Evasive Testing

Also, in this stage, you should consider whether evasive testing is part of the assessment scope. There are different procedures for each tactic, which support you in disguising these requests to not trigger an internal alarm among the admins and the blue team.

There are many ways to protect against lateral movement, including network (_micro_) segmentation, threat monitoring, IPS/IDS, EDR, etc. To bypass these efficiently, you need to understand how they work and what they respond to. Then you can adapt and apply methods and strategies that help avoid detection.

#### Information Gathering

Before you target the internal network, you must first get an overview of which systems and how many can be reached from your system. This information may already be available to you from the last post-exploitation stage, where you took a closer look at the settings and configurations of the system.

You return to the information gathering stage, but this time, you do it from inside the network with a different view of it. Once you have discovered all hosts and servers, you can enumerate them individually.

#### Vulnerability Assessment

... from the inside of the network differs from the previous procedures. This is because far more errors occur inside a network than on hosts and servers exposed to the internet. Here, the groups to which one has been assigned and the rights to different system components play an essential role. In addition, it is common for users to share information and documents and work on them together.

This type of information is of particular interest to you when planning your attacks. For example, if you compromise a user account assigned to a dev group, you may gain access to most of the resources used by company devs. This will likely provide you with crucial internal information about the systems and could help you to identify flaws or further your access.

#### PrivEsc

Once you have found and prioritized these paths, you can jump to the step where you use these to access the other systems. You often find ways to crack passwords and hashes and gain higher privileges. Another standard method is to use your existing creds on other systems. There will also be situations where you do not even have to crack hashes but can use them directly. For example, you can use the tool Responder to intercept NTLMv2 hashes. If you can intercept a hash from an admin, then you can use the pass-the-hash technique to log in as that admin on multiple hosts and servers.

After all, the lateral movement stage aims to move through the internal network. Existing data and information can be veratile and often used in many ways.

#### Post-Exploitation

Once you have reached one or more hosts or servers, you go through the steps of the post-exploitation stage again for each system. Here you again collect system information, data from created users, and business information that can be presented as evidence. However, you must again consider how this different information must be handled and the rules defined around sensitive data in the contract.

### PoC

... is a project management term. In project management, it serves as proof that a project is feasible in principle. The criteria for this can lie in technical or business factors. Therefore, it is the basis for further work, in your case, the necessary steps to secure the corporate network by confirming the discovered vulns. In other words, it serves as a decision-making basis for the further course of action. At the same time, it enables risks to be identified and minimized.

A PoC can have many different representations. For example, documentation of the vulns found can also consitute a PoC. The more practical version of a PoC is a script or code that automatically exploits the vulns found. This demonstrates the flawless exploitation of the vulnerabilities. This variant is straightforward for an admin or dev because they can see what steps your script takes to exploit the vuln.

### Post-Engagement

#### Cleanup

Once testing is complete, you should perform any necessary cleanup, such as deleting tools/scripts uploaded to target systems, reverting any (_minor_) configuration changes you may have made, etc. You should have detailed notes of all your activities, making any cleanup activities easy and efficient. If you cannot access a system where an artifact needs to be deleted, or another change reverted, you should alert the client and list these issues in the report appendices. Even if you can remove any uploaded files and revert changes, you should document these changes in your report appendices in case the client receives alerts that they need to follow up on and confirm that the activity in question was part of your sanctioned testing.

#### Documenting and Reporting

You must make sure to have adequate documentation for all findings that you plan to include in your report. This includes command output, screenshots, a listing of affected hosts, and anything else specific to the client environment or finding. You should also make sure that you have retrieved all scan and log output if the client hosted a VM in their infrastructure for an internal pentest and any other data that may be included as part of the report or as supplementary documentation. You should not keep any Personal Identifiable Information (_PII_), potentially incriminating info, or other sensitive data you came across throughout testing.

You should already have a detailed list of the findings you will include in the report and all necessary details to tailor the findings to the client's environment. Your report deliverable should consist of the following:

- An attack chain detailing steps taken to achieve compromise
- A strong executive summary that a non-technical audience can understand
- Detailed findings specific to the client's environment that include a risk rating, finding impact, remediation recommendations, and high-quality external references related to the issue
- Adequate steps to reproduce each finding so the team responsible for remediation can understand and test the issue while putting fixes in place
- Near, medium, and long-term recommendations specific to the environment
- Appendices which include information such as the target scope, OSINT data, password cracking analysis, discovered ports/services, compromised hosts, compromised accounts, files transferred to client-owned systems, any account creation/system modifications, an Acitve Directory security analysis, relevant scan data/supplementary documentation, and any other information necessary to explain a specific finding or recommendation further

#### Report Review Meeting

Once the draft report is deliverd, and the client has had a chance to distribute it internally and review it in-depth, it is customary to hold a report review meeting to walk through the assessment results. The report review meeting typically includes the same folks from the client and the firm performing the assessment. Depending on the types of findings, the client may bring in additional technical subject matter experts if the finding is related to a system or app they are responsible for. Typically you will not read the entire report word for word but walk through each finding briefly and give an explanation from your own perspective/experience. The client will have the opportunity to ask questions about anything in the report, ask for clarifications, or point out issues that need to be corrected. Often the client will come with a list of questions about specific findings and will not want to cover every finding in detail.

#### Deliverable Acceptance

The scope of work should clearly define the acceptance of any project deliverables. In pentest assessments, generally, you deliver a report marked DRAFT and give the client a chance to review and comment. Once the client has submitted feedback either by email or during a report review meeting, you can issue them a new version of the report marked FINAL. Some audit firms that clients may be beholden to will not accept a pentest report with a DRAFT designation. Other companies will not care, but keeping a uniform approach all customers is best.

#### Post-Remediation Testing

Since a pentest is essentially an audit, you must remain impartial third parties and not perform remediation on your findings. You must maintain a degree of independence and can serve as trusted advisors by giving general remediation advice on how a specific issue could be fixed or be available to explain further/demonstrate a finding so the team assigned to remediate it has a better understanding. You should not be implementing changes yourself or even giving precise remediation advice. This will help maintain the assessment's integrity and not introduce any potential conflict of interest into the process.

#### Data Retention

After a pentest concludes, you will have a considerable amount of client-specific data such as scan results, log output, credentials, screenshots, and more. Data retention and destruction requirements may differ from county to country and firm to firm, and procedures surrounding each should be outlined clearly in the contract language of the scope of work and the RoE.

You should retain evidence for some time after the penstest in case questions arise about specific findings or to assist with retesting "closed" findings after the client has performed remediation activities. Any data retained after the assessment should be stored in a secure location owned and controlled by the firm and encrypted at rest. All data should be wiped from tester systems at the conclusion of an assessment. A new virtual machine specific to the client in question should be created for any post-remediation testing or investigation of findings related to client inquiries.

#### Close Out

Once you have delivered the final report, assisted the client with questions regarding remediation, and performed post-remediation testing/issued a new report, you can finally close the project. At this stage, you should ensure that any systems used to connect to the client's systems or process data have been wiped or destroyed and that any artifacts leftover from the engagement are stored securely (_encrypted_) per your firm's policy and per contractual obligations to your client. The final steps would be invoicing the client and collecting payment for services rendered. Finally, it is always good to follow up with a post-assessment client satisfaction survey so the team and management, in particular, can see what went well during the engagement and what could be improved upon from a company process standpoint and the individual consultant assigned to the project. Discussions for follow-on work may arise in the weeks or months after if the client was pleased with your work and day-to-day interactions.

As you continually grow your technical skillset, you should always look for ways to improve your soft skills and become more well-rounded professional consultants. In the end, the client will usually remember interactions during the assessment, communication, and how they were treated/valued by the firm they engage, not the fancy exploit chain the pentester pulled of to pwn their systems. Take time to self-reflect and work on continuous improvement in all aspects of your role as a professional pentester.