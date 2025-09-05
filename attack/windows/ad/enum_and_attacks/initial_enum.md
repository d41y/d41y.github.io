- [Initial Enumeration](#initial-enumeration)
  - [External Recon and Enumeration Principles](#external-recon-and-enumeration-principles)
    - [What and where to look for?](#what-and-where-to-look-for)
      - [Finding Address Spaces](#finding-address-spaces)
      - [DNS](#dns)
      - [Public Data](#public-data)
    - [Overarching Enum Principles](#overarching-enum-principles)
    - [Example Enum Process](#example-enum-process)
      - [Check for ASN/IP \& Domain Data](#check-for-asnip--domain-data)
      - [Hunting for Files and Email Addresses](#hunting-for-files-and-email-addresses)
      - [Username Harvesting](#username-harvesting)
      - [Credential Hunting](#credential-hunting)

---

# Initial Enumeration

## External Recon and Enumeration Principles

### What and where to look for?

When conducting your external recon, there are several key items that you should be looking for. This information may not always be publicly accessible, but it would be prudent to see what is out there. If you get stuck, during a pentest, looking back at what could be obtained through passive recon can give you a nudge needed to move forward, such as password breach data that could be used to access a VPN or other externally facing service. The table below highlights the **WHAT** in what you would be searching for during this phase of your engagement.

| Data Point | Description |
| ---------- | ----------- |
| IP Space | Valid ASN for your target, netblocks in use for the organization's public facing infra, cloud presence and the hosting providers, DNS record entries, etc. |
| Domain Information | Based on IP data, DNS, and site registrations. Who administers the domain? Are there any subdomains tied to your target? Are there any publicly accessible domain services present? Can you determine what kind of defenses are in place? |
| Schema Format | Can you discover the organization's email accounts, AD usernames, and even password policies? Anything that will give you information you can use to build a valid username list to test external-facing services for password spraying, credential stuffing, brute forcing, etc. |
| Data Disclosures | For data disclosures you will be looking for publicly accessible files for any information that helps shed light on the target. For example, any published files that contain ```intranet``` site listings, user metadata, shares, or other critical software or hardware in the environment. |
| Breach Data | Any publicly released usernames, passwords, or other critical information that can help an attacker gain a foothold. |

The list of data points above can be gathered in many different ways. There are many different websites and tools that can provide you with some or all of the information above that you could use to obtain information vital to your assessment. The table below lists a few potential resources and examples that can be used.

| Resource | Examples |
| -------- | -------- |
| ASN / IP registrars | [IANA](https://www.iana.org/), [arin](https://www.arin.net/) for searching the Americas, [RIPE](https://www.ripe.net/) for searching in Europe, [BGP Toolkit](https://bgp.he.net/) |
| Domain Registrars & DNS | [Domaintools](https://www.domaintools.com/), [PTRArchive](http://ptrarchive.com/), [ICANN](https://lookup.icann.org/lookup), manual DNS record requests against the domain in question or against well known DNS servers, such as 8.8.8.8. |
| Social Media | Searching Linkedin, Twitter, Facebook, your region's major social media sites, news articles, and any relevant info you can find about the organization. |
| Public-Facing Company Websites | Often, the public websites for a corporation will have relevant info embedded. News articles, embedded documents, and the "About us" and "Contact us" pages can also be gold mines. |
| Cloud & Dev Storage Spaces | [GitHub](https://github.com/), [AWS S3 buckets & Azure Blog Storage containers](https://grayhatwarfare.com/), Google searches using "Dorks" |
| Breach Data Sources | [HaveIBeenPwned](https://haveibeenpwned.com/) to determine if any corporate email accounts appear in public data, [Dehashed](https://www.dehashed.com/) to search for corporate emails with cleartext passwords or hashes you can try to crack offline. You can then try these passwords against any exposed login portals that may use AD authentication. |

#### Finding Address Spaces

![initial enum 1](../../../../images/ad_initial_enum1.png)

The BGP-Toolkit is a fantastic resource for researching what address blocks are assigned to an organization and what ASN they reside within. Many large corporations will often self-host their infra, and since they have such a large footprint, they will have their own ASN. This will typically not be the case for smaller organizations or fledging companies. As you research, keep this in mind since smaller organizations will often host their websites and other infra in someone else's space.

#### DNS

... is a great way to validate your scope and find out about reachable hosts the customer did not disclose in their scoping document. Sites like [domaintools](https://whois.domaintools.com/), and [viewdns.info](https://viewdns.info/) are great spots to start. You can get back many records and other data ranging from DNS resolution to testing for DNSSEC and if the site is accessible in more restricted countries. Sometimes you may find additional hosts out of scope, but looking interesting. In that case, you could bring this list to your client to see if any of them should indeed be included in the scope. You may also find interesting subdomains that were not listed in the scoping documents, but reside on in-scope IP addresses and therefore are fair game.

![initial enum 2](../../../../images/ad_initial_enum2.png)

There is also a great way to validate some of the data found from your IP/ASN searches. Not all information about the domain found will be current, and running checks that can validate what you see is always good practice.

#### Public Data

Social media can be a treasure trove in interesting data that can clue you in to how the organization is structured, what kind of equipment they operate, potential software and security implementations, their schema, and more. On top of that list are job-related sites like Linkedin, Indeed.com, and Glassdoor. Simple job postings often reveal a lot about the company. For example, take a look at the job listing below. It's for a SharePoint Admin and can key you in on many things. You can tell from the listing that the company has been using SharePoint for a while and has a mature program since they are talking about security programs, backups & disaster recovery, and more. What is interesting to you in this posting is that you can see the company likely uses SharePoint 2013 and SharePoint 2016. That means they may have upgraded in place, potentially leaving vulnerabilities in play that may not exist in newer versions. This also means you may run into different versions of SharePoint during your engagements.

![initial enum 3](../../../../images/ad_initial_enum3.png)

Websites hostes by the organization are also great places to dig for information. You can gather contact emails, phone numbers, organizational charts, published documents, etc. These sites, specifically the embedded documents, can often have links to internal infra or intranet sites that you would not otherwise know about. Checking any publicly accessible information for those types of details can be quick wins when trying to formulate a picture of the domain structure. With the growing use of sites such as GitHub, AWS cloud storage, and other web-hosted platforms, data can also be leaked unintentionally. For example, a dev working on a project may accidently leave some credentials or notes hardcoded into a code release. If you know where to look for that data, it can give you an easy win. It could mean the difference between having to password spray and brute-force credentials for hours or days or gaining a quick foothold with developer credentials, which may also have elevated permissions.

### Overarching Enum Principles

Keeping in mind that your goal is to understand your target better, you are looking for every possible avenue you can find that will provide you with a potential route to the inside. Enum itself if an iterative process you will repeat several times throughout a pentest. Besides the customer's scoping document, this is your primary source of information, so you want to ensure you are leaving no stone unturned. When starting your enum, you will first use passive resources, starting wide in scope and narrowing down. Once you exhaust your initial run of passive enum, you will need to examine the results and then move into your active enum phase.

### Example Enum Process

#### Check for ASN/IP & Domain Data

Start first by checking netblocks data and seeing what you can find.

![initial enum 4](../../../../images/ad_initial_enum4.png)

From this look, you have already gleaned some interesting info.

- IP Address: 134.209.24.248
- Mail Server: mail1.inlanefreight.com
- Nameservers: NS1.inlanefreight.com & NS2.inlanefreight.com

For now, this is what you care about from its output. Inlanefreight is not a large corporation, so you didn't expect to find that it had its own ASN. Validate:

![initial enum 5](../../../../images/ad_initial_enum5.png)

In the request above, you utilized viewdns.info to validate the IP address of your target. Both results match, which is a good sign.

```bash
d41y@htb[/htb]$ nslookup ns1.inlanefreight.com

Server:		192.168.186.1
Address:	192.168.186.1#53

Non-authoritative answer:
Name:	ns1.inlanefreight.com
Address: 178.128.39.165

nslookup ns2.inlanefreight.com
Server:		192.168.86.1
Address:	192.168.86.1#53

Non-authoritative answer:
Name:	ns2.inlanefreight.com
Address: 206.189.119.186 
```

You now have two new IP addresses to add to your list for validation and testing. Before taking any further action with them, ensure they are in-scope for your test.

#### Hunting for Files and Email Addresses

Moving on to examining the website ```inlanefreight.com``` by first checking for leaked documents and email addresses via Google Dorks.

```
# on google

filetype:pdf inurl:inlanefreight.com
intext:"@inlanefreight.com" inurl:inlanefreight.com
```

Browsing the contact page, you can several emails for staff in different offices around the globe. You now have an idea of their email naming convention and where some people work in the organization. This could be handy in later password spraying attacks or if social engineering / phishing were part of your engagement scope.

![initial enum 6](../../../../images/ad_initial_enum6.png)

#### Username Harvesting

You can use a tool such as linkedin2username to scrape data from a company's Linkedin page and create various mashups of usernames that can be added to your list of potential password spraying targets.

#### Credential Hunting

Dehashed is an excellent tool for hunting for cleartext credentials and password hashes in breach data. You can search either on the site or using a script that performs queries via the API. Typically you will find many old passwords for users that do not work on externally-facing portals that use AD auth, but you may get lucky. This is another tool that can be useful for creating a user list for external or internal password spraying.

```bash
d41y@htb[/htb]$ sudo python3 dehashed.py -q inlanefreight.local -p

id : 5996447501
email : roger.grimes@inlanefreight.local
username : rgrimes
password : Ilovefishing!
hashed_password : 
name : Roger Grimes
vin : 
address : 
phone : 
database_name : ModBSolutions

id : 7344467234
email : jane.yu@inlanefreight.local
username : jyu
password : Starlight1982_!
hashed_password : 
name : Jane Yu
vin : 
address : 
phone : 
database_name : MyFitnessPal

<SNIP>
```