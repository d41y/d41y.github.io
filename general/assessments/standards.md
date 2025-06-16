- [Assessment Standards](#assessment-standards)
  - [Compliance Standards](#compliance-standards)
    - [Payment Card Industry Data Security Standard (_PCI DSS_)](#payment-card-industry-data-security-standard-pci-dss)
    - [Health Insurance Portability and Accountability Act (_HIPAA_)](#health-insurance-portability-and-accountability-act-hipaa)
    - [ISO 27001](#iso-27001)
  - [Pentesting Standards](#pentesting-standards)
    - [Penetration Testing Execution Standard (_PTES_)](#penetration-testing-execution-standard-ptes)
    - [Open Source Security Testing Methodology Manual (_OSSTMM_)](#open-source-security-testing-methodology-manual-osstmm)
    - [National Institute of Standards and Technology (_NIST_)](#national-institute-of-standards-and-technology-nist)
    - [Open Web App Security Project (_OWASP_)](#open-web-app-security-project-owasp)

---

# Assessment Standards

Both pentests and vuln assessments should comply with specific standards to be accredited and accepted by governments and legal authorities. Such standards help ensure that the assessment is carried out thoroughly in a generally agreed-upon manner to increase the efficiency of these assessments and reduce the likelihood of an attack on the organization.

## Compliance Standards

### Payment Card Industry Data Security Standard (_PCI DSS_)

... is a commonly known standard in information security that implements requirements for organizations that handle credit cards. While not a government regulation, organizations that store, process, or transmit cardholder data must still implement PCI DSS guidelines. This would include banks or online stores that handle their own payment solutions.

PCI DSS requirements include internal and external scanning of assets. For example, any credit card data that is being processed or transmitted must be done in a Cardholder Data Environment (_CDE_). The CDE environment must be adequately segmented from normal assets. CDE environments are segmented off from an organization's regular environment to protect any cardholder data from being compromised during an attack and limit internal access to data.

### Health Insurance Portability and Accountability Act (_HIPAA_)

... is used to protect patients' data. HIPAA does not necessarily require vulnerability scans or assessments; however, a risk management and vulnerability identification are required to maintain HIPAA accreditation.

### ISO 27001

... is a standard used worldwide to manage information security. ISO 27001 requires organizations to perform quarterly external and internal scans.

Although compliance is essential, it should not drive a vulnerability management program. Vulnerability management should consider the uniqueness of an environment and the associated risk appetite to an organization.

The Inernational Organization for Standardization (_ISO_) maintains technical standards for pretty much anything you can imagine. The ISO 27001 standard deals with information security. ISO 27001 compliance depends upon maintaining an effective Information Security Management System. To ensure compliance, organizations can perform pentests in a carefully designed way.

## Pentesting Standards

### Penetration Testing Execution Standard (_PTES_)

... can be applied to all types of pentests. It outlines the phases of a pentest and how they should be conducted. There are the sections in the PTES:

- pre-engagement interactions
- intelligence gathering
- threat modelling
- vulnerability analysis
- exploitation
- post exploitation
- reporting

### Open Source Security Testing Methodology Manual (_OSSTMM_)

... is another set of guidelines pentesters can use to ensure they're doing their jobs properly. It can be used alongside other pentest standards.

It is divided into five different channels for five different areas of pentesting:

1. Human Security
2. Phyiscal Security
3. Wireless Communication
4. Telecommunications
5. Data Networks

### National Institute of Standards and Technology (_NIST_)

... is well kown for their NIST Cybersecurity Framework, a system for designing incident response policies and procedures. NIST also has a pentesting framework. The phases of the NIST framework include:

- Planning
- Discovery
- Attack
- Reporting

### Open Web App Security Project (_OWASP_)

... is typically the go-to organization for defining testing standards and classifying risks to web apps.