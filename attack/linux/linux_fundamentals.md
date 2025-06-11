- [Linux Fundamentals](#linux-fundamentals)
  - [Intro](#intro)
    - [Components](#components)
    - [Architecture](#architecture)
    - [File System Hierarchy](#file-system-hierarchy)
  - [The Shell](#the-shell)
    - [Prompt Description](#prompt-description)
      - [Unprivileged](#unprivileged)
      - [Privileged](#privileged)
      - [PS1](#ps1)
    - [Getting Help](#getting-help)
      - [man](#man)
      - [apropos](#apropos)
    - [System Information](#system-information)
      - [hostname](#hostname)
      - [whoami](#whoami)
      - [id](#id)
      - [uname](#uname)
  - [Workflow](#workflow)
    - [Editing Files](#editing-files)
      - [vimtutor](#vimtutor)
    - [File Descriptors and Redirections](#file-descriptors-and-redirections)
      - [STDIN and STDOUT](#stdin-and-stdout)
      - [STDOUT and STDERR](#stdout-and-stderr)
      - [Redirect STDERR to Null Device](#redirect-stderr-to-null-device)
      - [Redirect STDOUT to a File](#redirect-stdout-to-a-file)
      - [Redirect STDOUT and STDERR to Separate Files](#redirect-stdout-and-stderr-to-separate-files)
      - [Redirect STDIN](#redirect-stdin)
      - [Redirect STDIN Stream to a File](#redirect-stdin-stream-to-a-file)
    - [Filter Contents](#filter-contents)
    - [Service and Process Management](#service-and-process-management)
      - [Systemctl](#systemctl)
      - [Kill a Process](#kill-a-process)
      - [Background a Process](#background-a-process)
      - [Foreground a Process](#foreground-a-process)
      - [Execute Multiple Commands](#execute-multiple-commands)

---

# Linux Fundamentals

## Intro

### Components

| Component | Description |
| --------- | ----------- |
| Bootloader | a piece of code that runs to guide the booting process to start the OS |
| OS Kernel | the kernel is the main component of an OS; it manages the resources for system's I/O devices at the hardware level |
| Daemons | background services; their purposes is to ensure that key functions such as scheduling, printing, and multimedia are working correctly; these small programs load after you booted or log into the computer |
| OS Shell | the OS shell or the command language interpreter is the interface between the OS and the user; this interface allows the user to tell the OS what to do |
| Graphics Server | provides a graphical sub-system called "X" or "X-Server" that allows graphical programs to run locally or remotely on the X-windowing system |
| Windows Manager | also known as a graphical user interface (_GUI_); there are many options including GNOME, KDE, MATE, Unity, and Cinnamon; a desktop environment usually has several applications, including file and web browser; these allow the user to access and manage the essential and frequently accessed features and services of an OS |
| Utilities | apps or utilities are programs that perform particular functions for the user or another program |


### Architecture

| Layer | Description |
| ----- | ----------- |
| Hardware | peripheral devices such as the system's RAM, hard drive, CPU and others |
| Kernel | the core of the linux OS whose function is to virtualize and control common computer hardware resources like CPU, allocated memory, accessed data, and others; the kernel gives each process its own virtual resources and prevents/mitigates conflicts between processes |
| Shell | a command-line interface, also known as a shell that a user can enter commands into to execute the kernel's functions |
| System Utility | makes available to the user all of the OS's functionality |

### File System Hierarchy

| Path | Description |
| ---- | ----------- |
| ```/``` | the top-level directory is the root filesystem and contains all of the files required to boot the OS before other filesystems are mounted, as well as the files required to boot the other filesystems; after boot, all of the other filesystems are mounted at standard mount points as subdirectories of the root |
| ```/bin``` | contains essential command binaries |
| ```/boot``` | consists of the static bootloader, kernel executable, and files required to boot the Linux OS |
| ```/dev``` | contains device files to faciliate access to every hardware device attached to the system |
| ```/etc``` | local system configuration files; configuration files for installed applications may be saved here as well |
| ```/home``` | each user on the system has a subdirectory here for storage |
| ```/lib``` | shared library files that are required for system boot |
| ```/media``` | external removable media devices such as USB drives are mounted here |
| ```/mnt``` | temporary mount point for regular filesystems |
| ```/opt``` | optional files such as third-party tools can be saved here |
| ```/root``` | the home directory for the root user |
| ```/sbin``` | this directory contains executables used for system administration |
| ```/tmp``` | the OS and many programs use this directory to store temporary files; this directory is generally cleared upon system boot and may be deleted at other times without any warning |
| ```/usr``` | contains executables, libraries, man files, etc. |
| ```/var``` | this directory contains variable data files such as log files, email in-boxes, web app related files, cron files, and more |

## The Shell

### Prompt Description

The bash prompt is simple to understand. By default, it shows information like your username, your computer's name, and the folder/directory you're currently working in. It's a line of text that appears on the screen to let you know the system is ready for you. The prompt appears on a new line, and the cursor is placed right after it, waiting for you to type a command.

#### Unprivileged

```bash
$
```

#### Privileged

```bash
#
```

#### PS1

The ```PS1``` variable in Linux systems controls how your command prompt looks in the terminal. It's like a template that defines the text you see each time the system is ready for you to type a command. By customizing the PS1 variable, you can change the prompt to display information such as your username, your computer's name, the current folder you're in, or even add colors and special chacters. This allows you to personalize the command-line interface to make it more informative or visually appealing.

[This](https://bash-prompt-generator.org/) can help you.

Further customization can be done by editing ```.bashrc```.

### Getting Help

#### man

... displays the manual pages for commands and provides detailed information about their usage.

```bash
d41y@htb[/htb]$ man ls

...

LS(1)                            User Commands                           LS(1)

NAME
       ls - list directory contents

SYNOPSIS
       ls [OPTION]... [FILE]...

DESCRIPTION
       List  information  about  the FILEs (the current directory by default).
       Sort entries alphabetically if none of -cftuvSUX nor --sort  is  speci‐
       fied.

       Mandatory  arguments  to  long  options are mandatory for short options
       too.

       -a, --all
              do not ignore entries starting with .

       -A, --almost-all
              do not list implied . and ..

       --author
 Manual page ls(1) line 1 (press h for help or q to quit)
```

#### apropos

This tool searches the descriptions for instances of a given keyword.

```bash
d41y@htb[/htb]$ apropos sudo

sudo (8)             - execute a command as another user
sudo.conf (5)        - configuration for sudo front end
sudo_plugin (8)      - Sudo Plugin API
sudo_root (8)        - How to run administrative commands
sudoedit (8)         - execute a command as another user
sudoers (5)          - default sudo security policy plugin
sudoreplay (8)       - replay sudo session logs
visudo (8)           - edit the sudoers file
```

> [!TIP]
> You can get a detailed explanation of each shell command with this [tool](https://explainshell.com/).

### System Information

#### hostname

... prints the name of the computer that you are logged into.

```bash
d41y@htb[/htb]$ hostname

nixfund
```

#### whoami

Gets the current username.

```bash
cry0l1t3@htb[/htb]$ whoami

cry0l1t3
```

#### id

Prints out your effective group membership and IDs.

```bash
cry0l1t3@htb[/htb]$ id

uid=1000(cry0l1t3) gid=1000(cry0l1t3) groups=1000(cry0l1t3),1337(hackthebox),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),116(lpadmin),126(sambashare)
```

#### uname

```bash

UNAME(1)                                    User Commands                                   UNAME(1)

NAME
       uname - print system information

SYNOPSIS
       uname [OPTION]...

DESCRIPTION
       Print certain system information.  With no OPTION, same as -s.

       -a, --all
              print all information, in the following order, except omit -p and -i if unknown:

       -s, --kernel-name
              print the kernel name

       -n, --nodename
              print the network node hostname

       -r, --kernel-release
              print the kernel release

       -v, --kernel-version
              print the kernel version

       -m, --machine
              print the machine hardware name

       -p, --processor
              print the processor type (non-portable)

       -i, --hardware-platform
              print the hardware platform (non-portable)

       -o, --operating-system
```

```uname -a``` prints all information about the machine in a specific order.

```bash
cry0l1t3@htb[/htb]$ uname -a

Linux box 4.15.0-99-generic #100-Ubuntu SMP Wed Apr 22 20:32:56 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
```

To obtain kernel release:

```bash
cry0l1t3@htb[/htb]$ uname -r

4.15.0-99-generic
```

## Workflow

### Editing Files

#### vimtutor

... to practice and get familiar with the editor.

```bash
d41y@htb[/htb]$ vimtutor

...

===============================================================================
=    W e l c o m e   t o   t h e   V I M   T u t o r    -    Version 1.7      =
===============================================================================

     Vim is a very powerful editor that has many commands, too many to
     explain in a tutor such as this.  This tutor is designed to describe
     enough of the commands that you will be able to easily use Vim as
     an all-purpose editor.

     The approximate time required to complete the tutor is 25-30 minutes,
     depending upon how much time is spent with experimentation.

     ATTENTION:
     The commands in the lessons will modify the text.  Make a copy of this
     file to practice on (if you started "vimtutor" this is already a copy).

     It is important to remember that this tutor is set up to teach by
     use.  That means that you need to execute the commands to learn them
     properly.  If you only read the text, you will forget the commands!

     Now, make sure that your Caps-Lock key is NOT depressed and press
     the   j   key enough times to move the cursor so that lesson 1.1
     completely fills the screen.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

### File Descriptors and Redirections

By default, the first three file descriptors in Linux are:

1. Data Stream for Input
   1. STDIN - 0
2. Data Stream for Output
   1. STDOUT - 1
3. Data Stream for Output that relates to an error occuring
   1. STDERR - 2

#### STDIN and STDOUT

```bash
┌──(d41y㉿kali)-[~]
└─$ cat                          
Think Outside the Box # STDIN
Think Outside the Box # STDOUT
```

#### STDOUT and STDERR

```bash
┌──(d41y㉿kali)-[~]
└─$ find /etc/ -name shadow                             
/etc/shadow # STDOUT
find: ‘/etc/cni/net.d’: Permission denied # STDERR
```

#### Redirect STDERR to Null Device

```bash
┌──(d41y㉿kali)-[~]
└─$ find /etc/ -name shadow 2>/dev/null
/etc/shadow
```

#### Redirect STDOUT to a File

```bash
┌──(d41y㉿kali)-[~]
└─$ find /etc/ -name shadow 2>/dev/null > result.txt # to null device
                                                                                
┌──(d41y㉿kali)-[~]
└─$ cat result.txt # got redirected to file
/etc/shadow
```

#### Redirect STDOUT and STDERR to Separate Files

```bash
┌──(d41y㉿kali)-[~]
└─$ find /etc/ -name shadow 2>error.txt >result.txt 
                                                                                
┌──(d41y㉿kali)-[~]
└─$ cat error.txt     
find: ‘/etc/ipsec.d/private’: Permission denied
find: ‘/etc/redis’: Permission denied
find: ‘/etc/polkit-1/rules.d’: Permission denied
find: ‘/etc/ssl/private’: Permission denied
find: ‘/etc/credstore’: Permission denied
find: ‘/etc/credstore.encrypted’: Permission denied
find: ‘/etc/cni/net.d’: Permission denied
find: ‘/etc/ldap/slapd.d/cn=config’: Permission denied
find: ‘/etc/openvas/gnupg’: Permission denied
find: ‘/etc/vpnc’: Permission denied
                                                                                
┌──(d41y㉿kali)-[~]
└─$ cat result.txt 
/etc/shadow
```

#### Redirect STDIN

```bash
┌──(d41y㉿kali)-[~]
└─$ cat < result.txt 
/etc/shadow
```

#### Redirect STDIN Stream to a File

```bash
┌──(d41y㉿kali)-[~]
└─$ cat << EOF > result.txt 
heredoc> Hack
heredoc> The                                           
heredoc> Box
heredoc> EOF
                                                                                
┌──(d41y㉿kali)-[~]
└─$ cat result.txt         
Hack
The
Box
```

### Filter Contents

- more
- less
- head
- tail
- sort
- grep
- cut
- tr
- column
- awk
- sed
- wc

### Service and Process Management

#### Systemctl

```bash
d41y@htb[/htb]$ systemctl start ssh

d41y@htb[/htb]$ systemctl status ssh

● ssh.service - OpenBSD Secure Shell server
   Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2020-05-14 15:08:23 CEST; 24h ago
   Main PID: 846 (sshd)
   Tasks: 1 (limit: 4681)
   CGroup: /system.slice/ssh.service
           └─846 /usr/sbin/sshd -D

Mai 14 15:08:22 inlane systemd[1]: Starting OpenBSD Secure Shell server...
Mai 14 15:08:23 inlane sshd[846]: Server listening on 0.0.0.0 port 22.
Mai 14 15:08:23 inlane sshd[846]: Server listening on :: port 22.
Mai 14 15:08:23 inlane systemd[1]: Started OpenBSD Secure Shell server.
Mai 14 15:08:30 inlane systemd[1]: Reloading OpenBSD Secure Shell server.
Mai 14 15:08:31 inlane sshd[846]: Received SIGHUP; restarting.
Mai 14 15:08:31 inlane sshd[846]: Server listening on 0.0.0.0 port 22.
Mai 14 15:08:31 inlane sshd[846]: Server listening on :: port 22.

d41y@htb[/htb]$ systemctl enable ssh

Synchronizing state of ssh.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install enable ssh

d41y@htb[/htb]$ systemctl list-units --type=service

UNIT                                                       LOAD   ACTIVE SUB     DESCRIPTION              
accounts-daemon.service                                    loaded active running Accounts Service         
acpid.service                                              loaded active running ACPI event daemon        
apache2.service                                            loaded active running The Apache HTTP Server   
apparmor.service                                           loaded active exited  AppArmor initialization  
apport.service                                             loaded active exited  LSB: automatic crash repor
avahi-daemon.service                                       loaded active running Avahi mDNS/DNS-SD Stack  
bolt.service                                               loaded active running Thunderbolt system service

d41y@htb[/htb]$ journalctl -u ssh.service --no-pager

-- Logs begin at Wed 2020-05-13 17:30:52 CEST, end at Fri 2020-05-15 16:00:14 CEST. --
Mai 13 20:38:44 inlane systemd[1]: Starting OpenBSD Secure Shell server...
Mai 13 20:38:44 inlane sshd[2722]: Server listening on 0.0.0.0 port 22.
Mai 13 20:38:44 inlane sshd[2722]: Server listening on :: port 22.
Mai 13 20:38:44 inlane systemd[1]: Started OpenBSD Secure Shell server.
Mai 13 20:39:06 inlane sshd[3939]: Connection closed by 10.22.2.1 port 36444 [preauth]
Mai 13 20:39:27 inlane sshd[3942]: Accepted password for master from 10.22.2.1 port 36452 ssh2
Mai 13 20:39:27 inlane sshd[3942]: pam_unix(sshd:session): session opened for user master by (uid=0)
Mai 13 20:39:28 inlane sshd[3942]: pam_unix(sshd:session): session closed for user master
Mai 14 02:04:49 inlane sshd[2722]: Received signal 15; terminating.
Mai 14 02:04:49 inlane systemd[1]: Stopping OpenBSD Secure Shell server...
Mai 14 02:04:49 inlane systemd[1]: Stopped OpenBSD Secure Shell server.
-- Reboot --
```

#### Kill a Process

A process can be in the following states:

- runnning
- waiting
- stopped
- zombie

Processes can be controlled using ```kill```, ```pkill```, ```pgrep```, and ```killall```. To interact with a process, you must send a signal to it. You can view all signals with the following command:

```bash
d41y@htb[/htb]$ kill -l

 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP
 2) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL     10) SIGUSR1
1)  SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM     15) SIGTERM
2)  SIGSTKFLT   17) SIGCHLD     18) SIGCONT     19) SIGSTOP     20) SIGTSTP
3)  SIGTTIN     22) SIGTTOU     23) SIGURG      24) SIGXCPU     25) SIGXFSZ
4)  SIGVTALRM   27) SIGPROF     28) SIGWINCH    29) SIGIO       30) SIGPWR
5)  SIGSYS      34) SIGRTMIN    35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3
6)  SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8
7)  SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12 47) SIGRTMIN+13
8)  SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12
9)  SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7
10) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2
11) SIGRTMAX-1  64) SIGRTMAX
```

Most commonly used signals are:

| Signal | Description |
| ------ | ----------- |
| 1 | SIGHUP - is sent to a process when the terminal that controls it is closed |
| 2 | SIGINT - sent when a user presses ```[Ctrl] + C``` in the controlling terminal to interrupt a process |
| 3 | SIGQUIT - sent when a user presses ```[Ctrl] + D``` to quit |
| 9 | SIGKILL - immediately kill a process with no clean-up operations |
| 15 | SIGTERM - program termination |
| 19 | SIGSTOP - stop the program; it cannot be handled anymore |
| 20 | SIGTSTP - sent when a user presses ```[Ctrl] + Z``` to request for a service to suspend; the user can handle it afterward |

To force a kill:

```bash
d41y@htb[/htb]$ kill 9 <PID> 
```

#### Background a Process

```bash
d41y@htb[/htb]$ ping -c 10 www.hackthebox.eu

d41y@htb[/htb]$ vim tmpfile
[Ctrl + Z]
[2]+  Stopped                 vim tmpfile

d41y@htb[/htb]$ jobs

[1]+  Stopped                 ping -c 10 www.hackthebox.eu
[2]+  Stopped                 vim tmpfile

d41y@htb[/htb]$ bg

d41y@htb[/htb]$ 
--- www.hackthebox.eu ping statistics ---
10 packets transmitted, 0 received, 100% packet loss, time 113482ms

[ENTER]
[1]+  Exit 1                  ping -c 10 www.hackthebox.eu
```

... or automatically set the process with an ```&``` at the end of the command:

```bash
d41y@htb[/htb]$ ping -c 10 www.hackthebox.eu &

[1] 10825
PING www.hackthebox.eu (172.67.1.1) 56(84) bytes of data.

d41y@htb[/htb]$ 

--- www.hackthebox.eu ping statistics ---
10 packets transmitted, 0 received, 100% packet loss, time 9210ms

[ENTER]
[1]+  Exit 1                  ping -c 10 www.hackthebox.eu
```

#### Foreground a Process

```bash
d41y@htb[/htb]$ jobs

[1]+  Running                 ping -c 10 www.hackthebox.eu &

d41y@htb[/htb]$ fg 1
ping -c 10 www.hackthebox.eu

--- www.hackthebox.eu ping statistics ---
10 packets transmitted, 0 received, 100% packet loss, time 9206ms
```

#### Execute Multiple Commands

```bash
d41y@htb[/htb]$ echo '1'; echo '2'; echo '3'

1
2
3

d41y@htb[/htb]$ echo '1'; ls MISSING_FILE; echo '3'

1
ls: cannot access 'MISSING_FILE': No such file or directory
3

d41y@htb[/htb]$ echo '1' && ls MISSING_FILE && echo '3'

1
ls: cannot access 'MISSING_FILE': No such file or directory
```

