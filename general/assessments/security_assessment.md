- [Security Assessment](#security-assessment)
  - [Vulnerability Assessments](#vulnerability-assessments)
  - [Penetration Test](#penetration-test)
  - [Vulnerability Assessment vs. Pentest](#vulnerability-assessment-vs-pentest)
  - [Other Types of Assessments](#other-types-of-assessments)
    - [Security Audits](#security-audits)
    - [Bug Bounties](#bug-bounties)
    - [Red Team Assessments](#red-team-assessments)
    - [Purple Assessment](#purple-assessment)

---

# Security Assessment

The primary purpose of most types of security assessments is to find and confirm vulnerabilities are present, so you can work to patch, mitigate, or remove them. There are different ways and methodologies to test how secure a computer system is. Some types of security assessments are more appropriate for certain networks than others. But they all serve a purpose in improving cybersecurity. All organizations have different compliance requirements and risk tolerance, face different threats, and have different business models that determine the types of systems they run externally and internally. Some organizations have a much more mature security posture than their peers and can focus on advanced red team simulations conducted by third parties, while others are still working to establish baseline security. Regardless, all organizations must stay on top of both legacy and recent vulns and have system for detecting and mitigating risks to their systems and data.

## Vulnerability Assessments

... are appropriate for all organizations and networks. A vulnerability assessment is based on a particular security standard, and compliance with these standards is analyzed.

A vulnerability assessment can be based on various security standards. Which standards apply to a particular network will depend on many factors. These factors can include industry-specific and regional data security regulations, the size and form of a company's network, which types of applications they use or develop, and their security maturity level.

Vulnerability assessments may be performed independently or alongside other security assessments depending on an organization's situation.

## Penetration Test

... is a type of simulated cyber attack, and pentesters conduct actions that a threat actor may perform to see if certain kinds of exploits are possible. The key difference between a pentest and an actual cyber attack is that the former is done with the full legal consent of the entity being pentested. Whether a pentester is an employee or a third-party contractor, they will need to sign a lengthy legal document with the target company that describes what they're allowed to do and what they're not allowed to do.

As with a vulnerability assessment, an effective pentest will result in a detailed report full of information that can be used to improve a network's security. All kinds of pentests can be performed according to an organization's specific needs.

| Type of Pentest | Description |
| --------------- | ----------- |
| Black Box | with no knowledge of a network's configuration or applications; typically just given network access and nothing else; perspective of external attacker |
| Grey Box | done with a little bit of knowledge of the network; from the perspective of an employee who doesn't work in the IT department; typically given network ranges or individual IP addresses |
| White Box | typically conducted by giving the pentester full access to all systems, configs, build documents, etc.; goal is to discover as many flaws as possible |

- Application pentesters assess web apps, thick-client apps, APIs, and mobile apps
- Network or infrastructure pentesters assess all aspects of a computer network, including its networking devices such as routers and firewalls, workstations, servers, and apps
- Physical pentesters try to leverage physical security weaknesses and breakdowns in processes to gain access to a facility such as data center or office building
- Social engineering pentesters test human beings

Pentesting is most appropriate for organizations with a medium or high security maturity level. Security maturity measures how well developed a company's cybersecurity program is, and securityy maturity takes years to build. It involves hiring knowledgeable cybersecurity professionals, having well-designed security policies and enforcement, baseline hardening standards for all device types in the network, strong regulatory compliance, well-executed cyber incident response plans, a seasoned computer security incident response team, an established change protocol process, chief information security officer, a chief technical officer, frequent security testing performed over the years, and strong security culture. Security culture is all about the attitude and habits employees have toward cybersecurity. Part of this can be taught through security awareness training programs and part by building security intwo the company's culture. Everyone, from secretaries to sysadmins to C-level staff, should be security conscious, understand how to avoid risky practices, and be educated on recognizing suspicious activity that should be reported to the security staff.

Organizations with a lower security maturity level may want to focus on vulnerability assessments because a pentest could find too many vulnerabilities to be useful and could overwhelm staff tasked with remediation. Before penetration testing is considered, there should be a track record of vulnerability assessments and actions taken in response to vulnerability assessments.

## Vulnerability Assessment vs. Pentest

| Vulnerability Assessment | Pentest |
| ------------------------ | ------- |
| cost-effective method of identifying low hanging vulns | provides an in-depth analysis of vulns and overall organisational security |
| skillset needed to conduct assessments is low | provides logical and realistic recommendations tailored to the target organisation |
| may not identify vulns requiring manual inspection | cost significantly more time and money |
| potential false positives | requires a more in-depth security knowledge |
| generic recommendations that may not be relevant | |

## Other Types of Assessments

### Security Audits

... are typically requirements from outside the organization, and they're typically mandated by government agencies or industry associations to assure that an organization is compliant with specific security regulations.

### Bug Bounties

Bug bounty programs are implemented by all kinds of organizations. They invite members of the general public, with some restrictions, to find security vulns in their apps. Bug bounty hunters can be paid anywhere from a few hundred dollars to hundreds of thousands of dollars for their findinds, which is a small price to pay for a company to avoid a critical RCE vuln from falling into the wrong hands.

### Red Team Assessments

Companies with larger budgets and more resources can hire their own dedicated red teams or use the services of third-party consulting firms to perform red team assessments. A red team consists of offensive security professionals who have considerable experience with pentesting. A red team plays a vital role in an organization's security posture.

A red team is a type of evasive black box pentesting, simulating all kinds of cyber attacks from the perspective of an external threat actor. These assessments typically have an end goal. The assessors only report the vulns that led to the completion of the goal, not as many vulns as possible as with a pentest.

### Purple Assessment

A blue team consists of defensive security specialists. These are often people who work in a SOC or CSIRT. Often, they have experience with digital forensics too. So if blue teams are defensive and red teams are offensive, red mixed with blue is purple.

Purple teams are formed when offensive and defensive securit specialists work together with a common goal, to improve the security of their network.