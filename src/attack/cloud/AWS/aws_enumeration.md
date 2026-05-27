# Enumerating AWS Cloud Infrastructure

## Reconnaissance of Cloud Resources on the Internet

### Domain and Subdomain Reconnaissance

Begin analyzing the target from the attacker's perspective. Currently, all you know about your target is its domain name: `offsec.io`.

There are several things you can learn by analyzing the domain and the public IP address.

Begin by getting the authoritative DNS servers, i.e. the name servers that contain all records for this domain. You'll use the `host` command with the `-t ns` argument to query the nameserver records of the `offsec.io` domain:

```bash
kali@kali:~$ host -t ns offseclab.io
offseclab.io name server ns-1536.awsdns-00.co.uk.
offseclab.io name server ns-512.awsdns-00.net.
offseclab.io name server ns-0.awsdns-00.com.
offseclab.io name server ns-1024.awsdns-00.org.
```

The names are very descriptive, and you can deduce the domain is managed by AWS. You can validate this by running the `whois` command to check the DNS registrar information of those domains. You'll pipe the output to the `grep` command to filter only the line that contains the organization name.

```bash
kali@kali:~$ whois awsdns-00.com | grep "Registrant Organization"
Registrant Organization: Amazon Technologies, Inc.
```

Now, you are sure that the `offsec.io` domain is managed by AWS, very likely using the [Route53](https://aws.amazon.com/route53/) service. This doesn't mean the rest of the infrastructure is also hosted in AWS, so you need to keep digging.

Continue by using the `host` command again to get the public IP address of the website `www.offsec.io`.

```bash
kali@kali:~$ host www.offseclab.io
www.offseclab.io has address 52.70.117.69
```

In the same way as before, you can learn some things by querying the DNS and doing a reverse DNS lookup. You'll use the `host` command again, but this time you'll query the public IP. You'll also use `whois` to learn more details about the public IP address, paying special attention to the OrgName value.

```bash
kali@kali:~$ host 52.70.117.69
69.117.70.52.in-addr.arpa domain name pointer ec2-52-70-117-69.compute-1.amazonaws.com

kali@kali:~$ whois 52.70.117.69 | grep "OrgName"
OrgName:        Amazon Technologies Inc.
```

With the whois lookup, you realize that the public IP belongs to Amazon and with the reverse lookup, you learn two things: it's a resource hosted in AWS and the resource is an Amazon Elastic Compute Cloud (_Amazon EC2_) instance.

> [!NOTE]
> The EC2 instance is a virtual machine in the AWS cloud. EC2 is a common service used to host websites, applications, and other services that require a server.

