# OpenVAS

## Getting Started

OpenVAS, by Greenbone Networks, is a publicly available vulnerability scanner. Greenbone Networks has an entire Vulnerability Manager, part of which is the OpenVAS scanner. Greenbone's Vulnerability Manager is also open to the public an free to use. OpenVAS has the capabilities to perform scans, including authenticated and unauthenticated testing.

### Installing

```bash
d41y@htb[/htb]$ sudo apt-get update && apt-get -y full-upgrade
d41y@htb[/htb]$ sudo apt-get install gvm && openvas

...

d41y@htb[/htb]$ gvm-setup
# followed by setuo process which can take up to 30 min
```

### Starting OpenVAS

```bash
d41y@htb[/htb]$ gvm-start
```

## Scan

The OpenVAS Greenbone Security Assistant app has various tabs that you can interact with. If you navigate to the ```Scans``` tab, you will see the scans that have run in the past. You will also be able to see how to create a new task to run a scan. The tasks work off of the scanning configurations that the user sets up.

### Configuration

Before setting up any scans, it is best to configure the targets for the scan. If you navigate to the ```Configurations``` tab and select ```Targets```, you will see targets that have been already added to the app.

To add your own, click the icon in the upper left and add an individual target or host list. You also can configure other options such as the ports, authentication, and methods of identifying if the host is reachable. For the ```Alive Test```, the ```Scan Config Default``` option from OpenVAS leverages the ```NVT Ping Host``` in the ```NVT Family```.

Typically, an ```authenticated scan``` leverages a high privileged user such as root or administrator. Depending on the permission level for the user, if it's the highest permission level, you'll retrieve the maximum amount of information back from the host in regards to the vulns present since you would have full access.

### Setting up Scans

Mulitple scan configurations leverage OpenVAS Network Vulnerability Test Families, which consist of many different categories of vulnerabilities, such as ones for Windows, Linux, web apps, etc.

OpenVAS has various scan configurations to choose from for scanning a network. It's recommended only leveraging the ones below, as other options could cause system disruptions on a network:

- Base
  - is meant to enumerate information about the host's status and OS
  - does not check for vulns
- Discovery
  - meant to enumerate information about the system
  - identifies the host's services, hardware, accessible ports, and software being used
  - does not check for vulns
- Host Discovery
  - solely tests whether the host is alive and determines what devices are active on the network
  - does not check for vulns
- System Discovery
  - enumerates the target host further
  - attempts to identify the OS and hardware associated with the host
- Full and fast
  - config is recommended as the safest option and leverages intelligence to use the best NVT checks for the host(s) based on accessible ports

## Exporting the Results

OpenVAS provides the scan results in a report that can be accessed when you are on the ```Scans``` page.

Once you click the report, you can view the scan results and OS information, open ports, services, etc., in other tabs in the scan report.

### Exporting Formats

There are various export formats for reporting purposes, including XML, CSV, PDF, ITG, and TXT. If you choose to export your report out as an XML, you can leverage various XML parsers to view the data in an easier to read format.

The ```openvasreporting``` tool offers various options when generating output.

```bash
d41y@htb[/htb]$ python3 -m openvasreporting -i report-2bf466b5-627d-4659-bea6-1758b43235b1.xml -f xlsx
```