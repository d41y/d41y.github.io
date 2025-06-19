- [Network Enumeration with Nmap](#network-enumeration-with-nmap)
  - [Host Discovery](#host-discovery)
    - [Scan Network Range](#scan-network-range)
    - [Scan IP List](#scan-ip-list)
    - [Scan Multiple IPs](#scan-multiple-ips)
    - [Scan Single IP](#scan-single-ip)

---

# Network Enumeration with Nmap

## Host Discovery

When you need to conduct an internal pentest for the entire network of a company, then you should, first of all, get an overview of which systems are online that you can work with. To actively discover such systems on the network, you can use various nmap host discovery options. There are many options nmap provides to determine whether your target is alive or not. The most effective host discovery method is to use ICMP echo requests.

It is always recommended to store every single scan. This can later be used for comparison, documentation, and reporting. After all, different tools may produce different results. Therefore it can be beneficial to distinguish which tool procudes which result.

### Scan Network Range

```bash
d41y@htb[/htb]$ sudo nmap 10.129.2.0/24 -sn -oA tnet | grep for | cut -d" " -f5

10.129.2.4
10.129.2.10
10.129.2.11
10.129.2.18
10.129.2.19
10.129.2.20
10.129.2.28
# 10.129.2.0/24: target network range
# -sn: disables port scanning
# -oA tnet: stores the results in all formats starting with the name 'tnet'
```

This scanning method works only if the firewall of the hosts allow it. Otherwise, you can use other scanning techniques to find out if the hosts are active or not.

### Scan IP List

During an internal pentest, it is not uncommon for you to be provided with an IP list with the host you need to test. Nmap also gives you the option of working with lists and reading the hosts from this list instead of manually defining or typing them in.

Such a list could look something like this:

```bash
d41y@htb[/htb]$ cat hosts.lst

10.129.2.4
10.129.2.10
10.129.2.11
10.129.2.18
10.129.2.19
10.129.2.20
10.129.2.28
```

If you use the same scanning technique on the predefined list, the command will look like this:

```bash
d41y@htb[/htb]$ sudo nmap -sn -oA tnet -iL hosts.lst | grep for | cut -d" " -f5

10.129.2.18
10.129.2.19
10.129.2.20
# -iL: performs defined scans against targets in provided 'hosts.txt' list
```

In this example, you see that only 3 of 7 hosts are active. This may mean that the other hosts ignore the default ICMP echo requests because of their firewall configuration. Since nmap does not receive a response, it marks those hosts as inactive.

### Scan Multiple IPs


It can also happen that you only need to scan a small part of a network. An alternative to the method you used last time is to specify mulitple IP addresses.

```bash
d41y@htb[/htb]$ sudo nmap -sn -oA tnet 10.129.2.18 10.129.2.19 10.129.2.20| grep for | cut -d" " -f5

10.129.2.18
10.129.2.19
10.129.2.20
```

If these IP addresses are next to each other, you can also define the range in the respective octet.

```bash
d41y@htb[/htb]$ sudo nmap -sn -oA tnet 10.129.2.18-20| grep for | cut -d" " -f5

10.129.2.18
10.129.2.19
10.129.2.20
```

### Scan Single IP

Before you scan a single host for open ports and its services, you first have to determine if it is alive or not.

```bash
d41y@htb[/htb]$ sudo nmap 10.129.2.18 -sn -oA host 

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-14 23:59 CEST
Nmap scan report for 10.129.2.18
Host is up (0.087s latency).
MAC Address: DE:AD:00:00:BE:EF
Nmap done: 1 IP address (1 host up) scanned in 0.11 seconds
```

If you disable port scan, nmap automatically ping scans with ICMP echo requests. Once such a request is sent, you usually expect an ICMP reply if the pinged host is alive. The more interesting fact is that your previous scans did not do that because before nmap could send an ICMP echo request, it would send an ARP ping resulting in an ARP reply. You can confirm this with the ```--packet-trace``` option. To ensure that ICMP echo requests are sent, you also define the option ```-PE``` for this.

```bash
d41y@htb[/htb]$ sudo nmap 10.129.2.18 -sn -oA host -PE --packet-trace 

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 00:08 CEST
SENT (0.0074s) ARP who-has 10.129.2.18 tell 10.10.14.2
RCVD (0.0309s) ARP reply 10.129.2.18 is-at DE:AD:00:00:BE:EF
Nmap scan report for 10.129.2.18
Host is up (0.023s latency).
MAC Address: DE:AD:00:00:BE:EF
Nmap done: 1 IP address (1 host up) scanned in 0.05 seconds
# --packet-trace: shows all packets sent and received
```

Another way to determine why nmap has your target marked as "alive" is with the ```--reason``` option.

```bash
d41y@htb[/htb]$ sudo nmap 10.129.2.18 -sn -oA host -PE --reason 

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 00:10 CEST
SENT (0.0074s) ARP who-has 10.129.2.18 tell 10.10.14.2
RCVD (0.0309s) ARP reply 10.129.2.18 is-at DE:AD:00:00:BE:EF
Nmap scan report for 10.129.2.18
Host is up, received arp-response (0.028s latency).
MAC Address: DE:AD:00:00:BE:EF
Nmap done: 1 IP address (1 host up) scanned in 0.03 seconds
# --reason: displays the reason for specific result
```

You can see here that nmap does indeed detect whether the host is alive or not through the ARP request and ARP reply alone. To disable ARP requests and scan you target with the desired ICMP echo request, you can disable ARP pings by setting the ```--disable-arp-ping``` option. Then you can scan your target again and look at the packets sent and received.

```bash
d41y@htb[/htb]$ sudo nmap 10.129.2.18 -sn -oA host -PE --packet-trace --disable-arp-ping 

Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-15 00:12 CEST
SENT (0.0107s) ICMP [10.10.14.2 > 10.129.2.18 Echo request (type=8/code=0) id=13607 seq=0] IP [ttl=255 id=23541 iplen=28 ]
RCVD (0.0152s) ICMP [10.129.2.18 > 10.10.14.2 Echo reply (type=0/code=0) id=13607 seq=0] IP [ttl=128 id=40622 iplen=28 ]
Nmap scan report for 10.129.2.18
Host is up (0.086s latency).
MAC Address: DE:AD:00:00:BE:EF
Nmap done: 1 IP address (1 host up) scanned in 0.11 seconds
```

