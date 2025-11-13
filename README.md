<head>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>

<hr style="border: none; height: 5px; background-color:rgb(0, 126, 78);">

<h3 style="font-family: 'Roboto', sans-serif; text-align: center; color: rgb(152, 161, 158); margin-top: 20px; margin-bottom: 20px;">
  :crossed_swords: ATTACK
</h3>

<hr style="border: none; height: 5px; background-color: rgb(0, 126, 78);">

<details>

<summary>
</summary>

## Binary Exploitation

- [Pwntools](./attack/binary_exploitation/intro_pwntools.md)
- [Stack-Based Buffer Overflows on Linux x86](./attack/binary_exploitation/stack_based_buffer_overflows_linux_x86.md)

## Cloud

## Crypto

## GamePwn

## Hardware / ICS

## Initial Access

- Attacks
  - Applications
    - [Application Discovery & Enum](./attack/initial_access/attacking_common_applications/app_discovery_enum.md)
    - [CMS](./attack/initial_access/attacking_common_applications/attacking_cms.md)
    - [Common Gateway Interfaces](./attack/initial_access/attacking_common_applications/attacking_gateway_interfaces.md)
    - [Customer Service / Configuration Management](./attack/initial_access/attacking_common_applications/attacking_management.md)
    - [Infra & Network Tools](./attack/initial_access/attacking_common_applications/attacking_infra_network_tools.md)
    - [Misc Applications](./attack/initial_access/attacking_common_applications/attacking_misc_apps.md)
    - [Other Notable Apps](./attack/initial_access/attacking_common_applications/attacking_other_apps.md)
    - [Servlet Containers / Software Dev](./attack/initial_access/attacking_common_applications/attacking_servlet_containers.md)
    - [Thick Client Applications](./attack/initial_access/attacking_common_applications/attacking_thick_client.md)
  - Password Attacks
    - [0x00](./attack/initial_access/password_attacks/password_attacks_fundamentals.md)
    - [Linux](./attack/initial_access/password_attacks/linux_password_attacks.md)
    - [Network](./attack/initial_access/password_attacks/network_password_attacks.md)
    - [Remote](./attack/initial_access/password_attacks/remote_password_attacks.md)
    - [Windows](./attack/initial_access/password_attacks/windows_password_attacks.md)
  - Services
    - [0x00](./attack/initial_access/attacking_common_services/attacking_common_services_fundamentals.md)
    - [DNS](./attack/initial_access/attacking_common_services/attacking_dns.md)
    - [Email Services](./attack/initial_access/attacking_common_services/attacking_email_services.md)
    - [FTP](./attack/initial_access/attacking_common_services/attacking_ftp.md)
    - [RDP](./attack/initial_access/attacking_common_services/attacking_rdp.md)
    - [SMB](./attack/initial_access/attacking_common_services/attacking_smb.md)
    - [SQL](./attack/initial_access/attacking_common_services/attacking_sql.md)
- [Footprinting](./attack/initial_access/footprinting.md)
  - [Infrastructure Based Enumeration](./attack/initial_access/footprinting.md#infrastructure-based-enumeration)
  - [Host Based Enumeration](./attack/initial_access/footprinting.md#host-based-enumeration)
- [Shells & Payloads](./attack/initial_access/shells_payloads.md)

## Linux

- [0x00](./attack/linux/linux_fundamentals.md)

## MacOS

- [0x00](./attack/macos/macos_fundamentals.md)

## Mobile

## OSINT

## Pivoting (_partially used as reference for Post-Exploitation/Pivoting .mds_)
- [Chisel](./attack/pivoting/chisel.md)
- [Ligolo](./attack/pivoting/ligolo.md)
- [Socat](./attack/pivoting/socat.md)
- [SSH und Proxychains](./attack/pivoting/ssh_und_proxychains.md)
- [Sshuttle](./attack/pivoting/sshuttle.md)

## Post-Exploitation

- [File Transfer](./attack/post_exploitation/file_transfers.md)
- Password Attacks / Credential Hunting
  - [Linux]((./attack/initial_access/password_attacks/linux_password_attacks.md))
  - [Network]((./attack/initial_access/password_attacks/network_password_attacks.md))
  - [Windows]((./attack/initial_access/password_attacks/windows_password_attacks.md))
- [Persistence]()
- [Pivoting](./attack/post_exploitation/pivoting.md)
- Privesc
  - [Linux](./attack/post_exploitation/privesc/linux_privesc.md)
  - Windows

## Reversing

## [Tools](./attack/tools/tools_list.md)

- [Metasploit](./attack/tools/metasploit.md)
- [nmap](./attack/tools/nmap.md)

## Vuln Scanning

- [Nessus](./attack/vuln_scanning/nessus.md)
- [OpenVAS](./attack/vuln_scanning/openvas.md)

## Web

### 0x00

- [Fuzzing](./attack/web/fundamentals/fuzzing_fundamentals.md)
- [HTTP/HTTPs](./attack/web/fundamentals/http_https_fundamentals.md)
- [Proxies](./attack/web/fundamentals/web_proxy_fundamentals.md)
- [Reconnaissance](./attack/web/fundamentals/web_recon_fundamentals.md)
- [Web Applications](./attack/web/fundamentals/web_applications_fundamentals.md)

### Attacks

Client-side
  - [XSS](./attack/web/web_attacks/client_side/xss.md)

Injections
  - [Command Injections](./attack/web/web_attacks/injection_attacks/command_injections.md)
  - [SQLi](./attack/web/web_attacks/injection_attacks/sqli.md)
    - [SQLMap](./attack/web/web_attacks/injection_attacks/sqli.md#sqlmap)

Server-side
  - [File Inclusion](./attack/web/web_attacks/server_side/file_inclusion.md)
  - [File Upload Attack](./attack/web/web_attacks/server_side/file_upload_attacks.md)
  - [HTTP Verb Tampering](./attack/web/web_attacks/server_side/http_verb_tampering.md)
  - [IDOR](./attack/web/web_attacks/server_side/idor.md)
  - [SSI](./attack/web/web_attacks/server_side/ssi.md)
  - [SSRF](./attack/web/web_attacks/server_side/ssrf.md)
  - [SSTI](./attack/web/web_attacks/server_side/ssti.md)
  - [XLST](./attack/web/web_attacks/server_side/xlst.md)
  - [XXE](./attack/web/web_attacks/server_side/xxe.md)

Web Service & API
  - [0x00](./attack/web/web_attacks/web_service_api/web_service_api.md)
  - [APIs](./attack/web/web_attacks/web_service_api/api_attacks.md)
  - [Web Service](./attack/web/web_attacks/web_service_api/web_service_attacks.md)

### Authentication

- [Broken Authentication](./attack/web/authentication/broken_authentication.md)
- [Login Brute Forcing](./attack/web/authentication/login_brute_forcing.md)

### CMS

- [0x00](./attack/web/cms/cms.md)
- [Wordpress](./attack/web/cms/wordpress.md)

### Web Security

- [JavaScript (De-)Obfuscation](./attack/web/web_security_techniques/javascript_deobfuscation.md)
- [Session Security](./attack/web/web_security_techniques/session_security.md)

## Windows

- [0x00](./attack/windows/windows_fundamentals.md)

### Active Directory

- [0x00](./attack/windows/ad/intro_ad.md)
- Enumeration and Attacks
  1. [Initial Enumeration](./attack/windows/ad/enum_and_attacks/ad_initial_enum.md)
  2. [Foothold](./attack/windows/ad/enum_and_attacks/ad_sniffing_for_foothold.md)
  3. [User Hunting](./attack/windows/ad/enum_and_attacks/ad_user_hunting.md)
  4. [Internal Password Spraying](./attack/windows/ad/enum_and_attacks/ad_internal_password_spraying.md)
  5. [Credentialed Enum & LOTL](./attack/windows/ad/enum_and_attacks/ad_credentialed_enum_lotl.md)
  6. [Kerberoasting](./attack/windows/ad/enum_and_attacks/ad_kerberoasting.md)
  7. [ACL](./attack/windows/ad/enum_and_attacks/ad_acl_abuse.md)
  8. [Extras](./attack/windows/ad/enum_and_attacks/ad_extras.md)
  9. [Domain Trusts Attacks](./attack/windows/ad/enum_and_attacks/ad_domain_trust_attacks.md)
  10. [Cross-Forest Trust Attacks](./attack/windows/ad/enum_and_attacks/ad_cross_forest_trust_attacks.md)
- Mitigation
  - [Defensive Considerations](./attack/windows/ad/enum_and_attacks/ad_defensive_considerations.md)

</details>

<br>
<hr style="border: none; height: 5px; background-color:rgb(0, 126, 78);">

<h3 style="font-family: 'Roboto', sans-serif; text-align: center; color: rgb(152, 161, 158); margin-top: 20px; margin-bottom: 20px;">
  :shield: DEFEND
</h3>

<hr style="border: none; height: 5px; background-color: rgb(0, 126, 78);">

<details>

<summary>
</summary>

## Digital Forensics

Disk Forensics
- [Windows Event Logs](./defend/disk_forensics/windows_event_logs.md)

Memory Forensics

Network Forensics

## Incident Response

- [Security Incident Reporting](./defend/incident_response/security_incident_reporting.md)

## Malware Analysis

- [0x00](./defend/malware_analysis/intro_malware_analysis.md)

## SIEM

- [0x00](./defend/siem/siem_fundamentals.md)

## Threat Hunting

</details>

<br>
<hr style="border: none; height: 5px; background-color:rgb(0, 126, 78);">

<h3 style="font-family: 'Roboto', sans-serif; text-align: center; color: rgb(152, 161, 158); margin-top: 20px; margin-bottom: 20px;">
  :computer: GENERAL
</h3>

<hr style="border: none; height: 5px; background-color: rgb(0, 126, 78);">

<details>

<summary>
</summary>

## Assessments

- [Assessment Standards](./general/assessments/standards.md)
- [Security Assessment](./general/assessments/security_assessment.md)
- [Vulnerability Assessment](./general/assessments/vulnerability_assessment.md)

## DBMS

[0x00](./general/dbms/dbms_fundamentals.md)

Relational

- [MySQL](./general/dbms/mysql_fundamentals.md) 

Non-Relational

- [Neo4J]()

## Elastic Stack

- [Building Great Search Experiences](./general/elastic_stack/building_great_search_experiences.md)
- [Configuring Elasticsearch Index for Time Series Data](./general/elastic_stack/configuring_index_time_series_data.md)
- Data Analysis with Kibana
  - [Search Your Data](./general/elastic_stack/data_analysis_with_kibana/02_search_your_data.md)
  - [Visualize Your Data](./general/elastic_stack/data_analysis_with_kibana/03_visualize_your_data.md)
  - [Additional Visualizations](./general/elastic_stack/data_analysis_with_kibana/04_additional_visualizations.md)
  - [Present Your Data](./general/elastic_stack/data_analysis_with_kibana/05_present_your_data.md)
  - [Analyze Your Data With Machine Learning](./general/elastic_stack/data_analysis_with_kibana/06_analyze_your_data_with_ml.md)
  - [Advanced Kibana](./general/elastic_stack/data_analysis_with_kibana/07_advanced_kibana.md)
  - [Alerting](./general/elastic_stack/data_analysis_with_kibana/08_alerting.md)
- Elasticsearch Engineer
  - [0x00](./general/elastic_stack/elasticsearch_engineer/intro_elasticsearch.md)
  - [Data Modelling](./general/elastic_stack/elasticsearch_engineer/data_modelling.md)
  - [Search](./general/elastic_stack/elasticsearch_engineer/03_search.md)
  - [Aggregations](./general/elastic_stack/elasticsearch_engineer/04_aggregations.md)
  - [Data Processing](./general/elastic_stack/elasticsearch_engineer/05_data_processing.md)
  - [Distributed Datastore](./general/elastic_stack/elasticsearch_engineer/06_distributed_datastore.md)
  - [Data Management](./general/elastic_stack/elasticsearch_engineer/07_data_management.md)
  - [Cluster Management](./general/elastic_stack/elasticsearch_engineer/08_cluster_management.md)
- [ES|QL for Security Analysts](./general/elastic_stack/esql_for_security_analysts.md)
- [Kubernetes Basics](./general/elastic_stack/kubernetes_basics.md)

## Networking

- [0x00](./general/networking/networking_introduction.md)
- Cisco Network Technician
  - [Networking Basics](./general/networking/cisco/networking_basics.md)

## Processes

- [Bug Bounty Hunting Process](./general/processes/bbh_process.md)
- [Incident Handling Process](./general/processes/incident_handling_process.md)
- [Penetration Testing Process](./general/processes/pt_process.md)

## Programming

- [Assembly](./general/programming/assembly/assembly.md)
- [Bash](./general/programming/bash.md)
- [Python](./general/programming/python/python.md)
  - [573 Cheatsheet](./general/programming/python/sans573/cheatsheet.md)

## RegEx

## Reporting

- [Bug Bounty](./general/reporting/bbh_reporting.md)
- [Penetration Test](./general/reporting/pt_reporting.md)

## WebDev

- [Sylius](./general/webdev/sylius.md)
- [Symfony](./general/webdev/symfony.md)

</details>

<br>
<hr style="border: none; height: 5px; background-color:rgb(0, 126, 78);">

<h3 style="font-family: 'Roboto', sans-serif; text-align: center; color: rgb(152, 161, 158); margin-top: 20px; margin-bottom: 20px;">
  :construction: INFRA
</h3>

<hr style="border: none; height: 5px; background-color: rgb(0, 126, 78);">

<details>

<summary>
</summary>

## GitHub

[Cloning GitHub, committing and pushing](./infra_misc/github_cloning_enabling.md)

## VPS

</details>