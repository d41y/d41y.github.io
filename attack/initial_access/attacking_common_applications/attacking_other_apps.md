- [Attacking Other Notable Applications](#attacking-other-notable-applications)
  - [Honorable Mentions](#honorable-mentions)

---

# Attacking Other Notable Applications

## Honorable Mentions

- **Axis2**

This can be abused similar to Tomcat. You will often actually see it sitting on top of a Tomcat installation. If you cannot get RCE via Tomcat, it is worth checking for weak/default admin credentials on Axis2. You can then upload a webshell in the form of an AAR file. There is also a Metasploit module that can assist with this.

- **Websphere**

Websphere has suffered from many different vulns over the years. Furthermore, if you can log in to the administrative console with default credentials such as ```system:system``` you can deploy a WAR file and gain RCE via a webshell or revshell.

- **Elasticsearch**

ES has had its fair share of vulns as well. Though old, pentesters have seen [this](https://www.exploit-db.com/exploits/36337) before on forgotten ES installs during an assessment for a large enterprise.

- **Zabbix**

Zabbix is an open-source system and network monitoring solution that has had quite a few vulns discovered such as SQLi, authentication bypass, stored XSS, LDAP password disclosure, and RCE. Zabbix also has built-in functionality that can be abused to gain RCE.

- **Nagios**

Nagios is another system and network monitoring product. Nagios has has a wide variety of issues over the years, including RCE, root privilege escalation, SQLi, code injection, and stored XSS. If you come across a Nagios instance, it is worth checking for the default creds ```nagiosadmin:PASSWORD``` and fingerprinting the version.

- **WebLogic**

WebLogic is a Java EE application server. There are many unauthenticated RCE exploits from 2007 up to 2021, many of which are Java Deserialization vulns.

- **Wikis** / **Intranets**

You may come across internal Wikis, custom intranet pages, SharePoint, etc. These are worth assessing for known vulns but also searching if there is a document repo. Pentesters have run into many intranet pages that had a search functionality which led to discovering valid credentials.

- **DotNetNuke**

DNN is an open-source CMS written in C# that uses the .NET framework. It has had a few sever issues over time, such as authentication bypass, directory traversal, stored XSS, file upload bypass, and arbitrary file download.

- **vCenter**

vCenter is often present in large organizations to manage multiple instances of ESXi. It is worth checking for weak credentials and vulns such as this [Apache Struts 2 RCE](https://blog.gdssecurity.com/labs/2017/4/13/vmware-vcenter-unauthenticated-rce-using-cve-2017-5638-apach.html) that scanners like Nessus don't pick up. This unauthenticated OVA file upload vuln was disclosed in early 2021. vCenter comes as both a Windows and a Linux appliance. If you get a shell on the Windows appliance, privilege escalation is relatively simple using JuicyPotato or similar. Pentesters have already seen vCenter running as SYSTEM and even running as a domain admin! It can be a great foothold in the environment or be a single source of compromise.

This list is not exhaustive.