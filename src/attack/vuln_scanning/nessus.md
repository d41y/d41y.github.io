# Nessus

## Getting Started

### Downloading

To download Nessus, you can navigate to its [Download Page](https://www.tenable.com/downloads/nessus?loginAttempted=true) to download the correct Nessus binary for your system.

### Requesting Free License

Next, you can visit the [Activation Code Page](https://www.tenable.com/products/nessus/activation-code) to request a Nessus Activation Code, which is necessary to get the free version of Nessus.

### Installing Package

With both the binary and activation code in hand, you can now install the Nessus package:

```bash
d41y@htb[/htb]$ dpkg -i Nessus-8.15.1-ubuntu910_amd64.deb

Selecting previously unselected package nessus.
(Reading database ... 132030 files and directories currently installed.)
Preparing to unpack Nessus-8.15.1-ubuntu910_amd64.deb ...
Unpacking nessus (8.15.1) ...
Setting up nessus (8.15.1) ...
Unpacking Nessus Scanner Core Components...
Created symlink /etc/systemd/system/nessusd.service → /lib/systemd/system/nessusd.service.
Created symlink /etc/systemd/system/multi-user.target.wants/nessusd.service → /lib/systemd/system/nessusd.service.
```

### Starting Nessus

Once you have Nessus installed, you can start the Nessus Service:

```bash
d41y@htb[/htb]$ sudo systemctl start nessusd.service
```

### Accessing Nessus

To access Nessus, you can navigate to ```https://localhost:8834```. Once you arrive at the setup page, you should select ```Nessus Essentials``` for the free version, and then you can enter your activation code.

Once you enter your activation code, you can set up a user with a secure password for your Nessus account. Then, the plugins will begin to compile once this step is completed.

Finally, once the setup is complete, you can start creating scans, scan policies, plugin rules, and customizing settings. The settings page has a wealth of options such as setting up a proxy server or SMTP server, standard account management options, and advanced settings to customize the user interface, scanning, logging, performance, and security options.

## Scan

A new scan can be configured by clicking ```New Scan```, and selecting a scan type. Scan templates fall into three categories: Discovery, Vulns, and Compliance.

### New Scan

Here you have options for a basic Host Discovery scan to identify live hosts/open ports or a variety of scan types such as the ```Basic Network Scan```, ```Advanced Scan```, ```Malware Scan```, ```Web Application Tests```, as well as scans targeted at specific CVEs and audit & compliance standards.

### Discovery

In the ```Discovery``` section, under ```Host Discovery```, you're presented with the option to enable scanning for fragile devices. Scanning devices such as network printers often result in them printing out reams of paper with garbage text, leaving the devices unusable.

In ```Port Scanning```, you can choose whether to scan common ports, all ports, or a self-defined rande, depending on your requirements.

Within the ```Service Discovery``` subsection, the ```Probe all ports to find services``` option is selected by default. It's possible that a poorly designed application or service could crash as a result of this probing, but most applications should be robust enough to handle this. Searching for SSL/TLS services is also enabled by default on a custom scan, and Nessus can additionally be instructed to identify expiring and revoked certificates.

### Assessment

Under the ```Assessment``` category, web application scanning can also be enabled if required, and a custom user agent and various other web application scanning options can be specified.

If desired, Nessus can attempt to authenticate against discovered applications and services using provided credentials, or else can perform a brute-force attack with the provided username and password lists.

User enumeration can also be performed using various techniques, such as RID Brute Forcing.

If you opt to perform RID Brute Forcing, you can set the starting and ending UIDs for both domain and local user accounts.

### Advanced

On the advanced tab, safe checks are enabled by default. This prevents Nessus from running checks that may negatively impact the target device or network. You can also choose to slow or throttle the scan if Nessus detects any network congestion, stop attempting to scan any hosts that become unresponsive, and even choose to have Nessus scan your target IP list in random order.

## Advanced Settings

### Scan Policies

Nessus gives you the option to create scan policies. Essentially these are customized scans that allow you to define specific scan options, save the policy configuration, and have them available to you under ```Scan Templates``` when creating a new scan. This gives you the ability to create targeted scans for any number of scenarios, such as a slower, more evasive scan, a web-focused scna, or a scan for a particular client using one or several sets of credentials. Scan policies can be imported from other Nessus scanners or exported to be later imported into another Nessus scanner.

### Creating a Scan Policy

To create a scan policy, you can click on the ```New Policy``` button in the top right, and you will be presented with the list of pre-configured scans. You can choose a scan, such as the ```Basic Network Scan```, then customize it, or you can create your own. You will choose ```Advanced Scan``` to create a fully customized scan with no pre-configured recommendations built-in.

After choosing the scan type as your base, you can give the scan policy a name and a description if needed.

From here, you can configure settings, add in any necessary credentials, and specify any compliance standards to run the scan against. You can choose to enable or disable entire plugin families or individual plugins.

Once you have finished customizing the scan, you can click on ```Save```, and the newly created policy will appear in the policies list. From here on, when you go to create a new scan, there will be a new tab named ```User Defined``` under ```Scan Templates``` that will show all of your custom scan policies.

### Plugins

Nessus works with plugins written in the Nessus Attack Scripting Language and can target new vulns and CVEs. These plugins contain information such as the vuln name, impact, remediation, and a way to test for the presence of a particular issue.

The ```Plugins``` tab provides more information on a particular detection, including mitigation. When conducting recurring scans, there may be a vuln/detection that, upon further examination, is not considered to be an issue. For exmaple, Microsoft DirectAccess allows insecure and null cipher suites. The below scan performed with ```sslscan``` shows an example of insecure and null cipher suites:

```bash
d41y@htb[/htb]$ sslscan example.com

<SNIP>

Preferred TLSv1.0  128 bits  ECDHE-RSA-AES128-SHA          Curve 25519 DHE 253
Accepted  TLSv1.0  256 bits  ECDHE-RSA-AES256-SHA          Curve 25519 DHE 253
Accepted  TLSv1.0  128 bits  DHE-RSA-AES128-SHA            DHE 2048 bits
Accepted  TLSv1.0  256 bits  DHE-RSA-AES256-SHA            DHE 2048 bits
Accepted  TLSv1.0  128 bits  AES128-SHA                   
Accepted  TLSv1.0  256 bits  AES256-SHA                   

<SNIP>
```

However, this is by design. SSL/TLS is not required in this case, and implementing it would result in a negative performance impact. To exclude this false positive from the scan results while keeping the detection active for other hosts, you can create a plugin rule.

Under the ```Resources``` section, you can select ```Plugin Rules```. In the new plugin rule, you input the host to be excluded, along with the Plugin ID for Microsoft DirectAccess, and specify the action to be performed as ```Hide this result```.

You may also want to exclude certain issues from your scan results, such as plugins for issues that are not directly exploitable. You can do this by specifying the plugin ID and host(s) to be excluded.

### Scanning with Creds

Nessus also supports credentialed scanning and provides a lot of flexibility by supporting LM/NTLM hashes, Kerberos authentication, and password authentication.

Creds can be configured for host-based authentication via SSH with a password, public key, certificate, or Kerberos-based authentication. It can also be configured for Windows host-based authentication with a password, Kerberos, LM hash, or NTLM hash.

Nessus also supports authentication for a variety of databases types including Oracle, PostgreSQL, DB2, MySQL, SQL Server, MongoDB, and Sybase.

In addition to that, Nessus can perform plaintext authentication to services such as FTP, HTTP, IMAP, IPMI, Telnet, and more.

Finally, you can check the Nessus output to confirm whether the authentication to the target app or service with the supplied credentials was successful.

## Working with Output

### Reports

Once a scan is completed you can choose to export a report in .pdf, .html, or .csv formats. The .pdf and .html reports give the option for either an Executive Summary or a custom report. The Executive Summary report provides a listing of hosts, a total number of vulns discovered per host, and a ```Show Details``` option to see the severity, CVSS score, plugin number, and name of each discovered issue. The plugin number contains a link to the full plugin writeup from the Tenable plugin database. The PDF option provides the scan results in a format that is easier to share. The CSV report option allows you to select which columns you would like to export. This is particular useful if importing the scan results into another tool such as Splunk if a document needs to be shared with many internal stakeholders responsible for remediation of the various assets scanned or to perform analytics on the scan data.

It is best to always make sure the vulnerabilities are grouped together for a clear understanding of each issues and the assets affected.

### Exporting

Nessus also gives the option to export scans into two formats Nessus (_scan.nessus_) or Nessus DB (_scan.db_). The .nessus file is an .xml file and includes a copy of the scan settings and plugin outputs. The .db file contains the .nessus file and the scan's KB, plugin Audit Trail, and any scan attachments.

Scripts such as the [nessus-report-downloader](https://raw.githubusercontent.com/eelsivart/nessus-report-downloader/master/nessus6-report-downloader.rb) can be used to quickly download scan results in all available formats from the CLI using the Nessus REST API:

```bash
d41y@htb[/htb]$ ./nessus_downloader.rb 

Nessus 6 Report Downloader 1.0

Enter the Nessus Server IP: 127.0.0.1
Enter the Nessus Server Port [8834]: 8834
Enter your Nessus Username: admin
Enter your Nessus Password (will not echo): 

Getting report list...
Scan ID Name                                               Last Modified                  Status         
------- ----                                               -------------                  ------         
1     Windows_basic                                Aug 22, 2020 22:07 +00:00      completed      
         
Enter the report(s) your want to download (comma separate list) or 'all': 1

Choose File Type(s) to Download: 
[0] Nessus (No chapter selection)
[1] HTML
[2] PDF
[3] CSV (No chapter selection)
[4] DB (No chapter selection)
Enter the file type(s) you want to download (comma separate list) or 'all': 3

Path to save reports to (without trailing slash): /assessment_data/inlanefreight/scans/nessus

Downloading report(s). Please wait...

[+] Exporting scan report, scan id: 1, type: csv
[+] Checking export status...
[+] Report ready for download...
[+] Downloading report to: /assessment_data/inlanefreight/scans/nessus/inlanefreight_basic_5y3hxp.csv

Report Download Completed!
```

## Scanning Issues

### Mitigating Issues

Some firewalls will cause you to receive scan results showing either all ports open or no ports open. If this happens, a quick fix is often to configure an advanced scan and disable the ```Ping the remote host``` option. This will stop the scan from using ICMP to verify that the host is "live" and instead proceed with the scan. Some firewalls may return an "ICMP Unreachable" message that Nessus will interpret as a live host and provide many false-positive information findings.

In sensitive networks, you can use rate-limiting to minimize impact.

You can avoid scanning legacy systems and choose the option not to scan pinters. If a host is of particular concern, it should be left out of the target scope or you can use the ```nessusd.rules``` file to configure Nessus scans.

Finally, unless specifically requested, you should never perform DoS checks. You can ensure that these types of plugins are not used by always enabling the "safe checks" option when performing scans to avoid any network plugins that can have a negative impact on a target, such as crashing a network daemon. Enabling the "safe checks" option does not guarantee that a Nessus vuln scan will have zero adverse impact but will significantly minimize potential impact and decrease scanning time.