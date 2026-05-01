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

...