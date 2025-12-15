# Security Monitoring & SIEM Fundamentals

## SIEM

### What is SIEM?

Security Information and Event Management (_SIEM_) encompasses the utilization of software offerings and solutions that merge the management of security data with the supervision of security events. These instruments facilitate real-time evaluations of alerts related to security, which are produced by network hardware and apps.

SIEM tools posses an extensive range of core functionalities, such as the collection and administration of log events, the capacity to examine log events and supplementary data from various sources, as well as operational features like incident handling, visual summaries, and documentation.

Employing SIEM innovations, IT personnel can detect cyberattacks at the time of or even prior to their occurrence, thereby enhancing the speed of their response during incident resolution. Consequently, SIEM plays an indispensable role in the effectiveness and ongoing supervision of a company's information security framework. It serves as the bedrock of an organization's security tactics, offering a holistic method for identifying and managing potential threats.

### How does a SIEM Solution work?

SIEM systems function by gathering data from a variety of sources, including PCs, network devices, servers, and more. This data is then standardized and consolidated to facilitate ease of analysis.

SIEM platforms employ security experts who scrutinize the data in order to identify and detect potential threats. This procedure allows businesses to locate security breaches and examine alerts, offering crucial insights into the organization's security standing.

Alerts notify Security Operations/Monitoring personnel that they must look into a possible security event or incident. These notifications are usually concise and inform staff of a specific attack targeting the organization's information systems. Alerts can be conveyed through multiple channels, such as emails, console pop-up messages, text messages, or phone calls to smartphones.

SIEM systems generate a vast number of alerts owing to the substantial volume of events produced for each monitored platform. It is not unusual for an hourly log of events to range from hundreds to thousands. As a result, fine-tuning the SIEM for detecting and alerting on high-risk events is crucial.

The capacity to accurately pinpoint high-risk events is what distinguishes SIEM from other network monitoring and detection tools, such as Intrusion Prevention Systems or Intrusion Detection Systems. SIEM does not supplant the logging capabilities of these devices; rather, it operates in conjunction with them by processing and amalgamating their log data to recognize events that could potentially lead to system exploitation. By integrating data from numerous sources, SIEM solutions deliver a holistic strategy for threat detection and management.

### Data Flows within a SIEM

1. SIEM solutions ingest logs from various data sources. Each SIEM tool possesses unique capabilities for collecting logs from different sources. This process is known as data ingestion or data collection.
2. The gathered data is processed and normalized to be understood by the SIEM correlation engine. The raw data must be written or read in a format that can be comprehended by the SIEM and converted into a common format from various types of datasets. This process is called data normalization and data aggregation.
3. Finally, the most crucial part of SIEM, where SOC teams utilize the normalized data collected by the SIEM to create various detection rules, dashboards, visualizations, alerts, and incidents. This enables the SOC team to identify potential security risks and respond swiftly to security incidents.

## Elastic Stack

### What is the Elastic Stack?

The Elastic Stack, created by Elastic, is an open-source collection of mainly three apps (_Elasticsearch, Logstash, and Kibana_) that work in harmony to offer users comprehensive search and visualization capabilities for real-time analysis and exploration of log file sources.

The high-level architecture of the Elastic stack can be enhanced in resource-intensive environments with the addition of Kafka, RabbitMQ, and Redis for buffering and resiliency, and nginx for security.

#### Components

##### Elasticsearch

... is a distributed and JSON-based search engine, designed with RESTful APIs. As the core component of the Elastic Stack, it handles indexing, storing, and querying. Elasticsearch empowers users to conduct sophisticated queries and perform analytics operations on the log file records processed by Logstach.

##### Logstash

... is responsible for collecting, transforming, and transporting log file records. Its strength lies in its ability to consolidate data from various sources and normalize them. Logstash operates in three main areas:

1. **Process input**: Logstah ingests log file records from remote locations, converting them into a format that machines can understand. It can receive records through different input methods, such as reading from a flat file, a TCP socket, or directly from syslog messages. After processing the input, Logstash proceeds to the next function.
2. **Transform and enrich log records**: Logstash offers numerous ways to modify a log record's format and even content. Specifically, filter plugins can perform intermediary processing on an event, often based on a predefined condition. Once a log record is transformed, Logstash processes it further.
3. **Send log records to Elasticsearch**: Logstash utilizes output plugins to transmit log records to Elasticsearch.

##### Kibana

... serves as the visualization tool for Elasticsearch documents. Users can view the data stored in Elasticsearch and execute queries through Kibana. Additionally, Kibana simplifies the comprehension of query results using tables, charts, and custom dashboards.

##### Beats

... is an additional component of the Elastic Stack. These lightweight, single-purpose data shippers are designed to be installed on remote machines to forward logs and metrics to either Logstash or Elasticsearch directly. Beats simplify the process of collecting data from various sources and ensure that the Elastic Stack receives the necessary information for analysis and visualization.

### Elastic Stack as a SIEM Solution

The Elastic Stack can be used as a SIEM solution to collect, store, analyze, and visualize security-related data from various sources.

To implement the Elastic Stack as a SIEM solution, security-related data from various sources such as firewalls, IDS/IPS, and enpoints should be ingested into the Elastic Stack using Logstash. Elasticsearch should be configured to store and index the security data, and Kibana should be used to create custom dashboards and visualizations to provide insights into security-related events.

To detect security-related incidents, Elasticsearch can be used to perform searches and correlations on the collected security data.

As SOC analysts, you are likely to extensively use Kibana as your primary interface when working with the Elastic Stack. Therefore, it is essential to become proficient with its functionalities and features.

Kibana Query Language (_KQL_) is a powerful and user-friendly query language designed specifically for searching and analyzing data in Kibana. It simplifies the process of extracting insights from your indexed Elasticsearch data, offering a more intuitive approach than Elasticsearch's Query DSL.

- **Basic Structure**: KQL queries are composed of ```field:value``` pairs, with the field representing the data's attribute and the value presenting the date you're searching for.

```
event.code:4625
```

The KQL query ```event.code:4625``` filters data in Kibana to show events that have the Windows event code 4625. This Windows event code is associated with failed login attempts in a Windows OS.

By using this query, SOC analysts can identify failed login attempts on Windows machines within the Elasticsearch index, and investigate the source of the attempts and potential security threats. This type of query can help identify brute force attacks, password guessing, and other suspicious activities related to login attempts on Windows systems.

By further refining the query with additional conditions, such as the source IP address, username, or time range, SOC analysts can gain more specific insights and effectively investigate potential security incidents.

- **Free Text Search**: KQL supports free text search, allowing you to search for a specific term across multiple fields without specifying a field name.

```
"svc-sql1"
```

This query returns records containing the string "svc-sql1" in any indexed field.

- **Logical Operators**: KQL supports logical operators AND, OR, and NOT for contructing more complex queries, Parantheses can be used to group expressions and control the order of evaluation.

```
event.code:4625 AND winlog.event_data.SubStatus:0xC0000072
```

The KQL query ```event.code:4625 AND winlog.event_data.SubStatus:0xC0000072``` filters data in Kibana to show events that have the Windows event code 4625 and the SubStatus value of 0xC0000072.

In Windows, the SubStatus value indicates the reason for a login failure. A SubStatus value of 0xC0000072 indicates that the account is currently disabled.

By using this query, SOC analysts can identify failed login attempts against disabled accounts. Such a behavior requires further investigation, as the disabled account's credentials may have been identified somehow by an attacker.

- **Comparison Operatos**: KQL supports various comparison operators such as ```,```, ```:>```, ```:>=```, ```:<```, ```:<=``` and ```:!```. These operators enable you to define precise conditions for matching field values.

```
event.code:4625 AND winlog.event_data.SubStatus:0xC0000072 AND @timestamp >= "2023-03-03T00:00:00.000Z" AND @timestamp <= "2023-03-06T23:59:59.999Z"
```

By using this query, SOC analysts can identify failed login attempts against disabled accounts that took place between March 3rd 2023 and March 6th 2023.

- **Wildcards and RegEx**: KQL supports wildcards and RegEx to search for patterns in field values.

```
event.code:4625 AND user.name: admin*
```

The Kibana KQL query ```event.code:4625 AND user.name: admin*``` filters data in Kibana to show events that have the Windows event code 4625 and where the username starts with "admin", such as "admin", "administrator", "admin123", etc.

This query can be useful in identifying potentially malicious login attempts targeted at administrator accounts.

### Identifying Available Data

#### Leverage KQL's Free Text Search

Using the "Discover" feature, you can effortlessly explore and sift through the available data, as well as gain insights into the architecture of the available fields, before you start constructing KQL queries.

- By using a search engine for the Windows event logs that are associated with failed login attempts, you will come across resources such as [https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventid=4625](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/event.aspx?eventid=4625)
- Using KQL's free text search you can search for ```4625```. In the returned records you notice ```event.code:4625```, ```winlog.event_id:4625```, and ```@timestamp```
  - ```event.code``` is related to the Elastic Common Schema (_ECS_)
  - ```winlog.event_id``` is related to Winlogbeat
  - If the organization you work for is using the Elastic Stack across all offices and security departments, it is preferred that you use the ECS fields in your queries
  - ```@timestamp``` typically contains the time extracted from the original event and it is different from ```event.created```
  - When it comes to disabled accounts, the aforementioned resource informs you that a SubStatus value of 0xC0000072 inside a 4625 Windows event log indicates that the account is currently disabled. Again using KQL's free text search you can search for ```0xC0000072```. By expanding the returned record you notice ```winlog.event_data.SubStatus``` that is related to Winlogbeat.

#### Leverage Elastic's Documentation

It could be a good idea to first familiarize yourself with Elastic's comprehensive documentation before delving into the "Discover" feature. The documentation provides a wealth of information on the different types of fields you may encounter. Some good resources to start with are:

- Elastic Common Schema
- Elastic Common Schema event fields
- Winlogbeat fields
- Winlogbeat ECS fields
- Winlogbeat security module fields
- Filebeat fields
- Filebeat ECS fields

### Elastic Common Schema (_ECS_)

... is a shared and extensible vocabulary for events and logs across the Elastic Stack, which ensures consistent field formats across different data sources. When it comes to KQL searches within the Elastic Stack, using ECS fields presents several key advantages:

- **Unified Data View**: ECS enforces a structured and consistent approach to data, allowing for unified views across multiple data sources. For instance, data originating from Windows logs, network traffic, endpoint events, or cloud-based data sources can all be searched and correlated using the same field names.
- **Improved Search Efficieny**: By standardizing the field names across different data types, ECS simplifies the process of writing queries in KQL. This means that analysts can efficiently construct queries without needing to remember specific field names for each data source.
- **Enhanced Correlations**: ECS allows for easier correlation of events across different sources, which is pivotal in cybersecurity investigations. For example, you can correlate an IP address involved in a security incident with network traffic logs, firewall logs, and endpoint data to gain a more comprehensive understanding of the incident.
- **Better Visualization**: Consistent field naming conventions improve the efficacy of visualizations in Kibana. As all data sources adhere to the same schema, creating dashboards and visualizations becomes easier and more intuitive. This can help in spotting trends, identifying anomalies, and visualizing security incidents.
- **Interoperability with Elastic Solutions**: Using ECS fields ensures full compatibility with advanced Elastic Stack features and solutions, such as Elastic Security, Elastic Observability, and Elastic Machine Learning. This allows for advanced threat hunting, anomaly detection, and performance monitoring.
- **Future-proofing**: AS ECS is the foundational schema across the Elastic Stack, adopting ECS ensures future compatibility with enhancements and new features that are introduced into the Elastic ecosystem.

## SOC

### What is a SOC?

A Security Operations Center (_SOC_) is an essential facility that houses a team of information security experts responsible for continuously monitoring and evaluating an organization's security status. The main objective of a SOC team is to identify, examine, and address cybersecurity incidents by employing a mix of technology solutions and a comprehensive set of procedures.

The SOC team usually consists of proficient security analysts, engineers, and managers overseeing security operations. They collaborate closely with organization incident response teams to guarantee security concerns are promptly detected and resolved.

Various technology solutions, such as SIEM systems systems, IDS/IPS, and Endpoint Detection and Response tools, are utilized by the SOC team to monitor and identify security threats. They also make use of threat intelligence and engage in threat hunting initiatives to proactively detect potential threats and vulns.

Besides employing technology solutions, the SOC team follows a series of well-defined processes for addressing security incidents. These processes encompass incident triage, containment, elimination, and recovery. The SOC team cooperates closely with the incident response team to ensure proper handling of security incidents, safeguarding the organization's security stance.

In summary, a SOC is a vital element of an organization's cybersecurity approach. It offers continuous monitoring and response capabilities, enabling organizations to promptly detect and address security incidents, minimizing the consequences of a security breach and decreasing the likelihood of future attacks.

### Roles within a SOC

| Role | Description |
| ---- | ----------- |
| SOC Director | Responsible for overall management and strategic planning of the SOC, including budgeting, staffing, and alignment with organizational security objectives. |
| SOC Manager | Oversees day-to-day operations, manages the team, coordinates incident response efforts, and ensures smooth collaboration with other departments. |
| Tier 1 Analyst | Monitors security alerts an events, triages potential incidents, and escalates them to higher tiers for further investigation. |
| Tier 2 Analyst | Performs in-depth analysis of escalated incidents, identifies patterns and trends, and develops mitigation strategies to address security threats. |
| Tier 3 Analyst | Provides advanced expertise in handling complex security incidents, conducts threat hunting activities, and collaborates with other teams to improve the organization's security posture. |
| Detection Engineer | Is responsible for developing, implementing, and maintaining detection rules and signatures for security monitoring tools. They work closely with security analysts to identify gaps in detection coverage and continuously improve the organization's ability to detect and respond to threats. |
| Incident Responder | Takes charge of active security incidents, carries out in-depth digital forensics and containment and remediation efforts, and collaborates with other teams to restore affected systems and prevent future consequences. |
| Threat Intelligence Analyst | Gathers, analyzes, and disseminates threat intelligence data to help SOC team members better understand the threat landscape and proactively defend against emerging risks. |
| Security Engineer | Develops, deploys, and maintains security tools, technologies, and infrastructure, and provides technical expertise to the SOC team. |
| Compliance and Governance Specialist | Ensures that the organization's security practices and processes adhere to relevant industry standards, regulations, and best practices, and assis with audit and reporting requirements. |
| Security Awareness and Training Coordinator | Develops and implements security training and awareness programs to educate employees about cybersecurity best practices and promote a culture of security within the requirements. |


It is important to note that the specific roles and responsibilities within each tier can vary depending on the organization's size, industry, and specific security requirements.

In general, the tiered structure can be described as follows:

- **Tier 1 Analyst**: Also known as "first responders", these analysts monitor security events and alerts, perform initial triage, and escalate potential incidents to higher tiers for further investigation. Their main goal is to quickly identify and prioritize security incidents.
- **Tier 2 Analysts**: These analysts are more experienced and perform deeper analysis of escalated incidents. They identify patterns and trends, develop mitigation strategies, and sometimes assist in incident response efforts. They may also be responsible for tuning security monitoring tools to reduce false positives and improve detection capabilities.
- **Tier 3 Analysts**: Often considered the most experienced and knowledgeable analysts on the team, Tier 3 analysts handle the most complex and high-profile security incidents. They may also engage in proactive threat hunting, develop advanced detection and prevention strategies, and collaborate with other teams to improve the organization's overall security posture.

## MITRE ATT&CK

### What is MITRE ATT&CK?

The MITRE ATT&CK framework serves as an extensive, regularly updated resource outlining the tactics, techniques, and procedures employed by cyber threat actors. This structured methodology assists cybersecurity experts in comprehending, identifying, and reacting to threats more proactively and knowledgeably.

The ATT&CK framework compromises matrices tailored to various computing contexts, such as enterprise, mobile, or cloud systems. Each matrix links the tactics and techniques to distinct TTPs. This linkage allows security teams to methodically examine and predict attacker activities.

### Use Case in Security Operations

The MITRE ATT&CK framework not only serves as a comprehensive resource for understanding adversarial tactics, techniques, and procedures, but it also plays a crucial role in several aspects of SOC. These include:

- **Detection and Response**: The framework supports SOCs in devising detection and response plans based on recognized attacker TTPs, empowering security teams to pinpoint potential dangers and develop proactive countermeasures.
- **Security Evaluation and Gap Analysis**: Organizations can leverage the ATT&CK framework to identify the strengths and weaknesses of their security posture, subsequently prioritizing security control investments to effectively defend against releveant threats.
- **SOC Maturity Assessment**: The ATT&CK framework enables organizations to assess their SOC maturity by measuring their ability to detect, respond to, and mitigate various TTPs. This assessment assists in identifying areas for improvement and prioritizing resources to strengthen the overall security posture.
- **Threat Intelligence**: The framework offers a unified language and format to describe adversarial actions, enabling organizations to bolster their threat intelligence and improve collaboration among internal teams or with external stakeholder.
- **Cyber Threat Intelligence Enrichment**: Leveraging the ATT&CK framework can help organizations enrich their cyber threat intelligence by providing context on attacker TTPs, as well as insights into potential targets and indicators of compromise. This enrichment allows for more informed decision-making and effective threat mitigation strategies.
- **Behavioral Analytics Development**: By mapping the TTPs outlined in the ATT&CK framework to specific user and system behaviors, organizations can develop behavioral analytics models to identify anomalous activities indicative of potential threats. This approach enhances detection capabilities and helps security teams proactively mitigate risks.
- **Red Teaming and Pentesting**: The ATT&CK framework presents a systematic way to replicate genuine attacker techniques during red teaming exercises and pentests, ultimately assessing an organization's defensive capabilities.
- **Training and Education**: The comprehensive and well-organized nature of the ATT&CK framework makes it an exceptional resource for training and educating security professionals on the latest adversarial tactics and methods.

## Alert Triage

... is the process of evaluating and prioritizing security alerts generated by various monitoring and detection systems to determine their level of threat and potential impact on an organization's systems and data. It involves systematically reviewing and categorizing alerts to effectively allocate resources and respond to security incidents.

Escalation is an important aspect of alert triaging in a SOC environment. The escalation process typically involves notifying supervisors, incident response teams, or designated individuals within the organization who have the authority to make decisions and coordinate the response effort. The SOC analyst provides detailed information about the alert, including its severity, potential impact, and any relevant findings from the initial investigation. This allows the decision makers to assess the situation and determine the appropriate course of action, such as involving specialized teams, initiating broader incident response procedures, or engaging external resources if necessary.

Escalation ensures that critical alerts receive prompt attention and facilitates effective coordination among different stakeholders, enabling a timely and efficient response to potential security incidents. It helps to leverage the expertise and decision-making capabilities of individuals who are responsible for managing and mitigating higher-level threats or incidents within the organization.

### Triaging Process

#### 1. Initial Alert Review

- Thoroughly review the initial alert, including metadata, timestamp, source IP, destination IP, affected systems, and triggering rule/signature.
- Analyze associated logs to understand the alert's context.

#### 2. Alert Classification

- Classify the alert based on severity, impact, and urgency using the organization's predefined classification system.

#### 3. Alert Correlation

- Cross-reference the alert with related alerts, events, or incidents to identify patterns, similarities, or potential indicators of compromise.
- Query the SIEM or log management system to gather relevant log data.
- Leverage threat intelligence feeds to check for known attack patterns or malware signatures.

#### 4. Enrichment of Alert Data

- Gather additional information to enrich the alert data and gain context:
  - Collect network packet captures, memory dumps, or file samples associated with the alert.
  - Utilize external threat intelligence sources, open-source tools, or sandboxes to analyze suspicious files, URLs, or IP addresses.
  - Conduct recon of affected system for anomalies.

#### 5. Risk Assessment

- Evaluate the potential risk and impact to critical assets, data, or infrastructure:
  - Consider the value of affected systems, sensivity of data, compliance requirements, and regulatory implications.
  - Determine likelihood of a successful attack or potential lateral movement.

#### 6. Contextual Analysis

- The analyst considers the context surrounding the alert, including the affected assets, their criticality, and the sensivity of the data they handle.
- They evaluate the security controls in place, such as firewalls, intrusion detection/prevention systems, and endpoint protection solutions, to determine if the alert indicates a potential failure or evasion technique.
- The analyst assesses the relevant compliance requirements, industry regulations, and contractual obligations to understand the implications of the alert on the organization's legal and regulatory compliance posture.

#### 7. Incident Response Planning

- Initiate an incident response plan if the alert is significant:
  - Document alert details, affected systems, observed behaviors, potential IOCs, and enrichment data.
  - Assign incident response team members with defined roles and responsibilities.
  - Coordinate with other teams as necessary.

#### 8. Consultation with IT Operations

- Assess the need for additional context or missing information by consulting with IT operations or relevant departments:
  - Engage in discussions or meetings to gather insights on the affected systems, recent changes, or ongoing maintenance activities.
  - Collaborate to understand any known issues, misconfigurations, or network changes that could potentially generate false-positgitive alerts.
  - Gain a holistic understanding of the environment and any non-malicious activities that might have triggered the alert.
  - Document the insights and information obtained during the consultation.

#### 9. Response Execution

- Based on the alert reviewing, risk assessment, and consultation, determine the appropriate response actions.
- If the additional context resolves the alert or identifies it as a non-malicious event, take necessary actions without escalation.
- If the alert still indicates potential security concerns or requires further investigation, proceed with the incident response actions.

#### 10. Escalation

- Identify triggers for escalation based on organization's policies and alert severity:
  - Triggers may include compromise of critical systems/assets, ongoing attacks, unfamiliar/sophisticated techniques, widespread impact, or insider threats.
- Assess the alert against escalation triggers, considering potential consequences if not escalated.
- Follow internal escalation process, notifying higher-level teams/management responsible for incident response.
- Provide comprehensive alert summary, severity, potential impact, enrichment data, and risk assessment.
- Document all communication related to escalation.
- In some cases, escalate to external entities bases on legal/regulatory requirements.

#### 11. Continuous Monitoring:

- Continuously monitor the situation and incident response progress.
- Maintain open communication with escalated teams, providing updates on developments, findings, or changes in severity/impact.
- Collaborate closely with escalated teams for a coordinated response.

#### 12. De-escalation:

- Evaluate the need for de-escalation as the incident response progresses and the situation is under control.
- De-escalate when the risk is mitigated, incident is contained, and further escalation is unnecessary.
- Notify relevant parties, providing a summary of actions taken, outcomes, and lessons learned.