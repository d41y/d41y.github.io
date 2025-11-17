<head>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>

<hr style="border: none; height: 5px; background-color:rgb(0, 126, 78);">

<h3 style="font-family: 'Roboto', sans-serif; text-align: center; color: rgb(152, 161, 158); margin-top: 20px; margin-bottom: 20px;">
  :crossed_swords: ATTACK
</h3>

<hr style="border: none; height: 5px; background-color: rgb(0, 126, 78);">

## Binary Exploitation

- [Stack-Based Buffer Overflows on Linux x86](./src/attack/binary_exploitation/stack_based_buffer_overflows_linux_x86.md)

## Cloud

## Crypto

## GamePwn

## Hardware / ICS

-  [0x00](./src/attack/hardware_ics/hardware_ics_fundamentals.md)

## Initial Access

- Attacks
  - Applications
    - [Application Discovery & Enum](./src/attack/initial_access/attacking_common_applications/app_discovery_enum.md)
    - [CMS](./src/attack/initial_access/attacking_common_applications/attacking_cms.md)
    - [Common Gateway Interfaces](./src/attack/initial_access/attacking_common_applications/attacking_gateway_interfaces.md)
    - [Customer Service / Configuration Management](./src/attack/initial_access/attacking_common_applications/attacking_management.md)
    - [Infra & Network Tools](./src/attack/initial_access/attacking_common_applications/attacking_infra_network_tools.md)
    - [Misc Applications](./src/attack/initial_access/attacking_common_applications/attacking_misc_apps.md)
    - [Other Notable Apps](./src/attack/initial_access/attacking_common_applications/attacking_other_apps.md)
    - [Servlet Containers / Software Dev](./src/attack/initial_access/attacking_common_applications/attacking_servlet_containers.md)
    - [Thick Client Applications](./src/attack/initial_access/attacking_common_applications/attacking_thick_client.md)
  - Password Attacks
    - [0x00](./src/attack/initial_access/password_attacks/password_attacks_fundamentals.md)
    - [Linux](./src/attack/initial_access/password_attacks/linux_password_attacks.md)
    - [Network](./src/attack/initial_access/password_attacks/network_password_attacks.md)
    - [Remote](./src/attack/initial_access/password_attacks/remote_password_attacks.md)
    - [Windows](./src/attack/initial_access/password_attacks/windows_password_attacks.md)
  - Services
    - [0x00](./src/attack/initial_access/attacking_common_services/attacking_common_services_fundamentals.md)
    - [DNS](./src/attack/initial_access/attacking_common_services/attacking_dns.md)
    - [Email Services](./src/attack/initial_access/attacking_common_services/attacking_email_services.md)
    - [FTP](./src/attack/initial_access/attacking_common_services/attacking_ftp.md)
    - [RDP](./src/attack/initial_access/attacking_common_services/attacking_rdp.md)
    - [SMB](./src/attack/initial_access/attacking_common_services/attacking_smb.md)
    - [SQL](./src/attack/initial_access/attacking_common_services/attacking_sql.md)
- [Footprinting](./src/attack/initial_access/footprinting.md)
  - [Infrastructure Based Enumeration](./src/attack/initial_access/footprinting.md#infrastructure-based-enumeration)
  - [Host Based Enumeration](./src/attack/initial_access/footprinting.md#host-based-enumeration)
- [Shells & Payloads](./src/attack/initial_access/shells_payloads.md)

## Linux

- [0x00](./src/attack/linux/linux_fundamentals.md)

## MacOS

- [0x00](./src/attack/macos/macos_fundamentals.md)

## Mobile

## OSINT

## Pivoting (_partially used as reference for Post-Exploitation/Pivoting .mds_)
- [Chisel](./src/attack/pivoting/chisel.md)
- [Ligolo](./src/attack/pivoting/ligolo.md)
- [Socat](./src/attack/pivoting/socat.md)
- [SSH und Proxychains](./src/attack/pivoting/ssh_und_proxychains.md)
- [Sshuttle](./src/attack/pivoting/sshuttle.md)

## Post-Exploitation

- [File Transfer](./src/attack/post_exploitation/file_transfers.md)
- Password Attacks / Credential Hunting
  - [Linux](./src/attack/post_exploitation/password_attacks/linux_password_attacks.md)
  - [Network](./src/attack/post_exploitation/password_attacks/network_password_attacks.md)
  - [Windows](./src/attack/post_exploitation/password_attacks/windows_password_attacks.md)
- [Persistence]()
- [Pivoting](./src/attack/post_exploitation/pivoting.md)
- Privesc
  - [Linux](./src/attack/post_exploitation/privesc/linux_privesc.md)
  - [Windows](./src/attack/post_exploitation/privesc/windows_privesc.md)

## Reversing

## [Tools](./src/attack/tools/tools_list.md)

- [Metasploit](./src/attack/tools/metasploit.md)
- [nmap](./src/attack/tools/nmap.md)

## Vuln Scanning

- [Nessus](./src/attack/vuln_scanning/nessus.md)
- [OpenVAS](./src/attack/vuln_scanning/openvas.md)

## Web

### 0x00

- [Fuzzing](./src/attack/web/fundamentals/fuzzing_fundamentals.md)
- [HTTP/HTTPs](./src/attack/web/fundamentals/http_https_fundamentals.md)
- [Proxies](./src/attack/web/fundamentals/web_proxy_fundamentals.md)
- [Reconnaissance](./src/attack/web/fundamentals/web_recon_fundamentals.md)
- [Web Applications](./src/attack/web/fundamentals/web_applications_fundamentals.md)

### Attacks

Client-side
  - [XSS](./src/attack/web/web_attacks/client_side/xss.md)

Injections
  - [Command Injections](./src/attack/web/web_attacks/injection_attacks/command_injections.md)
  - [SQLi](./src/attack/web/web_attacks/injection_attacks/sqli.md)
    - [SQLMap](./src/attack/web/web_attacks/injection_attacks/sqli.md#sqlmap)

Server-side
  - [File Inclusion](./src/attack/web/web_attacks/server_side/file_inclusion.md)
  - [File Upload Attack](./src/attack/web/web_attacks/server_side/file_upload_attacks.md)
  - [HTTP Verb Tampering](./src/attack/web/web_attacks/server_side/http_verb_tampering.md)
  - [IDOR](./src/attack/web/web_attacks/server_side/idor.md)
  - [SSI](./src/attack/web/web_attacks/server_side/ssi.md)
  - [SSRF](./src/attack/web/web_attacks/server_side/ssrf.md)
  - [SSTI](./src/attack/web/web_attacks/server_side/ssti.md)
  - [XLST](./src/attack/web/web_attacks/server_side/xlst.md)
  - [XXE](./src/attack/web/web_attacks/server_side/xxe.md)

Web Service & API
  - [0x00](./src/attack/web/web_attacks/web_service_api/web_service_api.md)
  - [APIs](./src/attack/web/web_attacks/web_service_api/api_attacks.md)
  - [Web Service](./src/attack/web/web_attacks/web_service_api/web_service_attacks.md)

### Authentication

- [Broken Authentication](./src/attack/web/authentication/broken_authentication.md)
- [Login Brute Forcing](./src/attack/web/authentication/login_brute_forcing.md)

### CMS

- [0x00](./src/attack/web/cms/cms.md)
- [Wordpress](./src/attack/web/cms/wordpress.md)

### Web Security

- [JavaScript (De-)Obfuscation](./src/attack/web/web_security_techniques/javascript_deobfuscation.md)
- [Session Security](./src/attack/web/web_security_techniques/session_security.md)

## Windows

- [0x00](./src/attack/windows/windows_fundamentals.md)

### Active Directory

- [0x00](./src/attack/windows/ad/intro_ad.md)
- Enumeration and Attacks
  1. [Initial Enumeration](./src/attack/windows/ad/enum_and_attacks/ad_initial_enum.md)
  2. [Foothold](./src/attack/windows/ad/enum_and_attacks/ad_sniffing_for_foothold.md)
  3. [User Hunting](./src/attack/windows/ad/enum_and_attacks/ad_user_hunting.md)
  4. [Internal Password Spraying](./src/attack/windows/ad/enum_and_attacks/ad_internal_password_spraying.md)
  5. [Credentialed Enum & LOTL](./src/attack/windows/ad/enum_and_attacks/ad_credentialed_enum_lotl.md)
  6. [Kerberoasting](./src/attack/windows/ad/enum_and_attacks/ad_kerberoasting.md)
  7. [ACL](./src/attack/windows/ad/enum_and_attacks/ad_acl_abuse.md)
  8. [Extras](./src/attack/windows/ad/enum_and_attacks/ad_extras.md)
  9. [Domain Trusts Attacks](./src/attack/windows/ad/enum_and_attacks/ad_domain_trust_attacks.md)
  10. [Cross-Forest Trust Attacks](./src/attack/windows/ad/enum_and_attacks/ad_cross_forest_trust_attacks.md)

<br>
<hr style="border: none; height: 5px; background-color:rgb(0, 126, 78);">

<h3 style="font-family: 'Roboto', sans-serif; text-align: center; color: rgb(152, 161, 158); margin-top: 20px; margin-bottom: 20px;">
  :shield: DEFEND
</h3>

<hr style="border: none; height: 5px; background-color: rgb(0, 126, 78);">

## Defensive Considerations, Mitigation, Hardening

- [AD](./src/defend/defensive_considerations/ad_defensive_considerations.md)
- [Common Applications](./src/defend/defensive_considerations/common_application_hardening.md)

## Digital Forensics

Disk Forensics
- [Windows Event Logs](./src/defend/disk_forensics/windows_event_logs.md)

Memory Forensics

Network Forensics

## Incident Response

- [Security Incident Reporting](./src/defend/incident_response/security_incident_reporting.md)

## Malware Analysis

- [0x00](./src/defend/malware_analysis/intro_malware_analysis.md)

## SIEM

- [0x00](./src/defend/siem/siem_fundamentals.md)

## Threat Hunting

<br>
<hr style="border: none; height: 5px; background-color:rgb(0, 126, 78);">

<h3 style="font-family: 'Roboto', sans-serif; text-align: center; color: rgb(152, 161, 158); margin-top: 20px; margin-bottom: 20px;">
  :computer: GENERAL
</h3>

<hr style="border: none; height: 5px; background-color: rgb(0, 126, 78);">

## Assessments

- [Assessment Standards](./src/general/assessments/standards.md)
- [Security Assessment](./src/general/assessments/security_assessment.md)
- [Vulnerability Assessment](./src/general/assessments/vulnerability_assessment.md)

## DBMS

[0x00](./src/general/dbms/dbms_fundamentals.md)

Relational

- [MySQL](./src/general/dbms/mysql_fundamentals.md) 

Non-Relational

- [Neo4J]()

## Elastic Stack

- [Building Great Search Experiences](./src/general/elastic_stack/building_great_search_experiences.md)
- [Configuring Elasticsearch Index for Time Series Data](./src/general/elastic_stack/configuring_index_time_series_data.md)
- Data Analysis with Kibana
  - [Search Your Data](./src/general/elastic_stack/data_analysis_with_kibana/02_search_your_data.md)
  - [Visualize Your Data](./src/general/elastic_stack/data_analysis_with_kibana/03_visualize_your_data.md)
  - [Additional Visualizations](./src/general/elastic_stack/data_analysis_with_kibana/04_additional_visualizations.md)
  - [Present Your Data](./src/general/elastic_stack/data_analysis_with_kibana/05_present_your_data.md)
  - [Analyze Your Data With Machine Learning](./src/general/elastic_stack/data_analysis_with_kibana/06_analyze_your_data_with_ml.md)
  - [Advanced Kibana](./src/general/elastic_stack/data_analysis_with_kibana/07_advanced_kibana.md)
  - [Alerting](./src/general/elastic_stack/data_analysis_with_kibana/08_alerting.md)
- Elasticsearch Engineer
  - [0x00](./src/general/elastic_stack/elasticsearch_engineer/01_intro_elasticsearch.md)
  - [Data Modelling](./src/general/elastic_stack/elasticsearch_engineer/02_data_modelling.md)
  - [Search](./src/general/elastic_stack/elasticsearch_engineer/03_search.md)
  - [Aggregations](./src/general/elastic_stack/elasticsearch_engineer/04_aggregations.md)
  - [Data Processing](./src/general/elastic_stack/elasticsearch_engineer/05_data_processing.md)
  - [Distributed Datastore](./src/general/elastic_stack/elasticsearch_engineer/06_distributed_datastore.md)
  - [Data Management](./src/general/elastic_stack/elasticsearch_engineer/07_data_management.md)
  - [Cluster Management](./src/general/elastic_stack/elasticsearch_engineer/08_cluster_management.md)
- [ES|QL for Security Analysts](./src/general/elastic_stack/esql_for_security_analysts.md)
- [Kubernetes Basics](./src/general/elastic_stack/kubernetes_basics.md)

## Networking

- [0x00](./src/general/networking/networking_introduction.md)
- Cisco Network Technician
  - [Networking Basics](./src/general/networking/cisco/networking_basics.md)

## Processes

- [Bug Bounty Hunting Process](./src/general/processes/bbh_process.md)
- [Incident Handling Process](./src/general/processes/incident_handling_process.md)
- [Penetration Testing Process](./src/general/processes/pt_process.md)

## Programming

- [Assembly](./src/general/programming/assembly/assembly.md)
- [Bash](./src/general/programming/bash.md)
- [Python](./src/general/programming/python/python.md)
  - [573 Cheatsheet](./src/general/programming/python/sans573/cheatsheet.md)

## RegEx

## Reporting

- [Bug Bounty](./src/general/reporting/bbh_reporting.md)
- [Penetration Test](./src/general/reporting/pt_reporting.md)

## WebDev

- [Sylius](./src/general/webdev/sylius.md)
- [Symfony](./src/general/webdev/symfony.md)