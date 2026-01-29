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

#### Clear Your Screen

There are times during your interaction with the command prompt when the amount of output provided to you through multiple commands overcrowding the screen and becomes an unusable mess of information. In this case, you need some way to clear the screen and provide you with an empty prompt. You can use the command `cls` to clear your terminal window of your previous results. This comes in handy when you need to refresh your screen and want to avoid fighting to read the terminal and figuring out where your current output starts and the old input ends.

![cmd 2](../../../images/cmd2.gif)

You can see from the GIF above that your terminal was packed, and you issued the `cls` command providing you with a blank slate.

#### History

Command history is a dynamic thing. It allows you to view previously ran commands in your Command Prompt's current active session. To do this, CMD provides you with several different methods of interacting with your command history. For example, you can use the arrow keys to move up and down through your history, the page up and page down keys, and if working on a physical Windows host, you can use the function keys to interact with your session history. The last way you can view your history is by utilizing the command `doskey /history`. Doskey is an MS-DOS utility that keeps a history of commands issued and allows them to be referenced again.

```
C:\htb> doskey /history

systeminfo
ipconfig /all
cls
ipconfig /all
systeminfo
cls
history
help
doskey /history
ping 8.8.8.8
doskey /history
```

The table below shows a list of some of the most valuable functions and commands that can be run to interact with your session history.

| Key / Command | Description |
| ------------- | ----------- |
| `doskey /history` | will print the session's command history to the terminal or output it to a file when specified |
| page up | places the first command in your session history to the prompt |
| page down | places the last command in history to the prompt |
| `[UP]` | allows you to scroll up through your command history to view previously run commands |
| `[DOWN]` | allows you to scroll down to your most recent commands run |
| `[RIGHT]` | types the previous command to prompt one character at a time |
| F3 | will retype the entire previous entry to your prompt |
| F5 | pressing F5 multiple times will allow you to cycle through previous commands |
| F7 | opens an interactive list of previous commands |
| F9 | enters a command to your prompt based on the number specified; the number corresponds to the commands' place in your history |

> [!INFO]
> One thing to remember is that unlike Bash or other shells, CMD does not keep a persistent record of the commands you issue through sessions. So once you close that instance, that history is gone. To save a copy of your issued commands, you can use `doskey` again to output the history to a file, show it on screen, and then copy it.

#### Exit a Running Process

At some point in your journey working with the Command Prompt, there will be times when you will need to be able to interrupt an actively running process, effectively killing it. This can be due to many different factors. However, a lot of the time, you might have the information that you need from a currently running command or find yourself dealing with an application that's locking up unexpectedly. Thus, you need some way of interrupting your current session and any process running in it. Take the following as an example:

```
C:\htb> ping 8.8.8.8

Pinging 8.8.8.8 with 32 bytes of data:
Reply from 8.8.8.8: bytes=32 time=22ms TTL=114
Reply from 8.8.8.8: bytes=32 time=25ms TTL=114

Ping statistics for 8.8.8.8:
    Packets: Sent = 2, Received = 2, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 22ms, Maximum = 25ms, Average = 23ms
Control-C
^C
```

When running a command or process you want to interrupt, you can do so by pressing the `[CTRL + c]` key combination. As previously stated, this is useful for stopping a currently running process that may be non-responsive or just something you want to be completed immediately. Remember that whatever was running will be incomplete and may need more time to close itself out properly, so always be wary of what you are interrupting.

## System Navigation

### Listing a Directory

One of the easiest things you can do when initially poking around on a Windows host is to get a listing of the directory you are currently working in. You do that with the `dir` command.

```
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

### Finding Your Place

Before doing anything on a host, it is helpful to know where you are in the filesystem. You can determine that by utilizing the `cd` or `chdir` commands.

```
C:\htb> cd 

C:\htb  
```

### Moving Around Using CD/CHDIR

Besides listing your current directory, both serve an additional function. These commands will move you to whatever directory you specify after the command. The specified directory can either be a directory relative to your current working directory or an absolute directory starting from the filesystem's root.

```cmd-session
# absolute
C:\htb> cd C:\Users\htb\Pictures

C:\Users\htb\Pictures> 

# relative
C:\htb> cd .\Pictures

C:\Users\htb\Pictures> 
```

### Exploring the File System

You can get a printout of the entire path you specify and its subdirectories by utilizing the `tree` command.

```
C:\htb\student\> tree

Folder PATH listing
Volume serial number is 26E7-9EE4
C:.
├───3D Objects
├───Contacts
├───Desktop
├───Documents
├───Downloads
├───Favorites
│   └───Links
├───Links
├───Music
├───OneDrive
├───Pictures
│   ├───Camera Roll
│   └───Saved Pictures
├───Saved Games
├───Searches
└───Videos
    └───Captures
```

You can utilize the `/F` parameter with the tree command to see a listing of each file and the directories along with the directory tree of the path.

```
C:\htb\student\> tree /F

Folder PATH listing
Volume serial number is 26E7-9EE4
C:.
├───3D Objects
├───Contacts
├───Desktop
│       passwords.txt.txt
│       Project plans.txt
│       secrets.txt
│
├───Documents
├───Downloads
├───Favorites
│   │   Bing.URL
│   │
│   └───Links
├───Links
│       Desktop.lnk
│       Downloads.lnk
│
├───Music
├───OneDrive
├───Pictures
│   ├───Camera Roll
│   └───Saved Pictures
├───Saved Games
├───Searches
│       winrt--{S-1-5-21-1588464669-3682530959-1994202445-1000}-.searchconnector-ms
│
└───Videos
    └───Captures

    <SNIP>
```

### Interesting Directories

Below is a table of common directories that an attacker can abuse to drop files to disk, perform recon, and help facilitate attack surface mapping on a target host.

| Name | Location | Description |
| ---- | -------- | ----------- |
| `%SYSTEMROOT%\Temp` | `C:\Windows\Temp` | Global directory containing temporary system files accessible to all users on the system. All users, regardless of authority, are provided full read, write, and execute permissions in this directory. Useful for dropping files as a low-privileged user on the system. |
| `%TEMP%` | `C:\Users\<user>\AppData\Local\Temp` | Local directory containing a user's temporary files accessible only to the user account that it is attached to. Provides full ownership to the user that owns this folder. Useful when the attacker gains control of a local/domain joined user account. |
| `%PUBLIC%` | `C:\Users\Public` | Publicly accessible directory allowing any interactive logon account full access to read, write, modify, execute, etc. files and subfolders within the directory. Alternative to the global Windows Temp Directory as it's less likely to be monitored for suspicious activity. |
| `%ProgramFiles%` | `C:\Program Files` | Folder containing all 64-bit applications installed on the system. Useful for seeing what kind of applications are installed on the target system. |
| `%ProgramFiles(x86)%` | `C:\Program Files (x86)` | Folder containing all 32-bit applications installed on the system. Useful for seeing what kind of applications are installed on the target system. |

