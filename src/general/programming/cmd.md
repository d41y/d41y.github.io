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

## Getting Help

The command prompt has a built-in help function that can provide you with detailed information about the available commands on your systems and how to utilize those functions.

### How to Get Help

When first looking at the command prompt interface, it can be overwhelming to stare at a blank prompt. Some initial questions might emerge, such as:

- What commands do I have access to?
- How do I use these commands?

While utilizing the command prompt, finding help is as easy as typing `help`. Without any additional parameters, this command provides a list of built-in commands and basic information about each displayed command's usage.

```
C:\htb> help

For more information on a specific command, type HELP command-name
ASSOC          Displays or modifies file extension associations.
ATTRIB         Displays or changes file attributes.
BREAK          Sets or clears extended CTRL+C checking.
BCDEDIT        Sets properties in boot database to control boot loading.
CACLS          Displays or modifies access control lists (ACLs) of files.
CALL           Calls one batch program from another.
CD             Displays the name of or changes the current directory.
CHCP           Displays or sets the active code page number.
CHDIR          Displays the name of or changes the current directory.
CHKDSK         Checks a disk and displays a status report.

<snip>
```

From this output, you can see that it prints out a list of system commands (_builtins_) and provides a basic description of its functionality. This is important because you can quickly and efficiently parse the list of built-in functions provided by the command prompt to find the function that suits your needs. From here, you can transition into answering the second question on how these commands are used. To print out detailed information about a particular command, you can issue the following: `help [command name]`

```
C:\htb> help time

Displays or sets the system time.

TIME [/T | time]

Type TIME with no parameters to display the current time setting and a prompt
for a new one. Press ENTER to keep the same time.

If Command Extensions are enabled, the TIME command supports
the /T switch which tells the command to just output the
current time, without prompting for a new time.
```

As you can see from the output above, when you issued the command `help time`, it printed the help details for time. This will work for any system command built-in but not for every command accessible on the system. Certain commands do not have a help page associated  with them. However, they will redirect you to running the proper command to retrieve the desired information. For example, running `help ipconfig` will give you the following output.

```
C:\htb> help ipconfig

This command is not supported by the help utility. Try "ipconfig /?".
```

In the previous example, the help feature let you know that it could not provide more information as the help utility does not directly support it. However, utilizing the suggested `ipconfig /?` will provide you with the information you need to utilize the command correctly. Be aware that several commands use the `/?`modifier interchangeably with help.

### Why Do You Need the Help Utility?

**Example**: Imagine that you are tasked to assist in an internal on-site engagement for your company. You are immediately dropped into a command prompt session on a machine from within the internal network and have been tasked with enumerating the systems. As per the rules of engagement, you have been stripped of any devices on your person and told that the firewall is blocking all outbound network traffic. You begin your enumeration on the system but need help remembering the systax for a specific command you have in mind. You realize that you cannot reach the Internet by any means.

Although this scenario might seem slightly exaggerated, there will be scenarios similar to this one as an attacker where your network access will be heavily limited, monitored, or strictly unavailable. Sometimes, you do not have every command and all parameters and syntax memorized; however, you will still be expected to perform even under these limitations. In instances where you are expected to perform, you will need alternate ways to gather the information you need instead of relying on the Internet as a quick fix to your problems.

The `help` utility serves as an offline manual for CMD and DOS compatible Windows system commands. Offline refers to the fact that this utility can be used on a system without network access.

There will be times, when you may not have direct access to the Internet. The `help` utility is meant to bridge that gap when you need assistance with commands or specific syntax for said commands on your system and may not have the external resources available to ask for help. This does not imply that the Internet is not a valuable tool to use in engagements. However, if you do not have the luxury of searching for answers to your questions, you need some way to retrieve said information.

### Where Can You Find Additional Help?

[Microsoft Documentation](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands) has a complete listing of the commands that can be issued within the command-line interpreter as well as detailed descriptions of how to use them.

[ss64](https://ss64.com/nt/) is a handy quick reference for anything command-line related, including cmd, PowerShell, Bash, and more.

### Basic Tips & Tricks