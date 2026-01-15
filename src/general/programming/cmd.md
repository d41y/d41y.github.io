# CMD

## Command Prompt Basics

### CMD.exe

The Command Prompt, also known as cmd.exe or CMD, is the default command line interpreter for the Windows OS. Originally based on the COMMAND.COM interpreter in DOS, the Command Prompt is ubiquitous across nearly all Windows OS. It allows users to input commands that are directly interpreted and then executed by the OS. A single command can accomplish tasks such as changing a user's password or checking the status of network interfaces. This also reduces system resources, as graphical-based programs require more CPU and memory.

While often overshadowed by its sleek counterpart PowerShell, knowledge of cmd.exe and its commands continue to pay dividends in modern times.

### Accessing CMD

There are multiple ways to access the Command Prompt on a Windows system. How you wish to access the prompt is up to personal preference as well as meeting specific criteria depending on the resources that are available at the time. Before explaining thos criteria, there are some essential concepts to explain first.

#### Local Access vs. Remote Access

**Local Access** is synonymous with having direct physical access to the machine itself. This level of access does not require the machine to be connected to a network, as it can be accessed directly through the peripherals connected to the machine. From the desktop, you can open up the command prompt by:

- Using the `Windows key` + `[r]` to bring up the run prompt, and then typing `cmd`. OR
- Accessing the executable from the drive path `C:\Windows\System32\cmd.exe`.

```cmd
Microsoft Windows [Version 10.0.19044.2006]
(c) Microsoft Corporation. All rights reserved.

C:\Users\htb>
```

You can your commands, scripts, or other actions as needed.

**Remote Access** is the equivalent of accessing the machine using virtual peripherals over the network. This level of access does not require direct physical access to the machine but requires the user to be connected to the same network or have a route to the machine they inted to access remotely. You can do this through the use of telnet, SSH, PsExec, WinRM, RDP, or other protocols as needed. For a sysadmin, remote management and access are a boon to your workflow. You would not have to go to the user's desk and physically access the host to perform your duties. This convenience for sysadmins can also implant a security threat into your network. If these remote access tools are not configured correctly, or a threat gains access to valid credentials, an attacker can now have wide-ranging access to your environments. You must maintain the proper balance of availability and integrity of your networks for a proper security posture.

### Basic Usage

Looking at the command prompt, what you see now is similar to what it was decades ago. Moreover, navigation of the command prompt has remained mostly unchanged as well. Navigating through the file system is like walking down a hallway filled with doors. As you move into hollway (_directory_), you can look to see what is there (_`dir`_), then either issue additional commands or keep moving.

```cmd
C:\Users\htb\Desktop> dir
  
 Volume in drive C has no label.
 Volume Serial Number is DAE9-5896

 Directory of C:\Users\htb\Desktop

06/11/2021  11:59 PM    <DIR>          .
06/11/2021  11:59 PM    <DIR>          ..
06/11/2021  11:57 PM                 0 file1.txt
06/11/2021  11:57 PM                 0 file2.txt
06/11/2021  11:57 PM                 0 file3.txt
04/13/2021  11:24 AM             2,391 Microsoft Teams.lnk
06/11/2021  11:57 PM                 0 super-secret-sauce.txt
06/11/2021  11:59 PM                 0 write-secrets.ps1
               6 File(s)          2,391 bytes
               2 Dir(s)  35,102,117,888 bytes free
```

1. The current path location (_`C:\Users\htb\Desktop`_)
2. The command you have issued (_`dir`_)
3. The results of the command (_output_)

### Case Study: Windows Recovery

In the event of a user lockout or some technical issues preventing/inhibiting regular use of the machine, booting from a Windows installation disc gives you the option to boot to Repair Mode. From here, the user is provided access to a command prompt, allowing for command-line-based troubleshooting of the device.

![cmd 1](../../../images/cmd1.gif)

While useful, this also poses a potential risk. For example, on this Windows 7 machine, you can use the recovery command prompt to tamper with the filesystem. Specifically, replacing the Sticky Keys binary with a copy of cmd.exe.

Once the machine is rebooted, you can press `[Shift]` five times on the Windows login screen to invoke Sticky Keys. Since the executable has been overwritte, what you get instead is another command prompt - this time with NT AUTHORITY\SYSTEM permissions. You have bypassed any authentication and now have access to the machine as the super user.

