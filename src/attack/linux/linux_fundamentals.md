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
  - [System Management](#system-management)
    - [Service and Process Management](#service-and-process-management)
      - [Systemctl](#systemctl)
      - [Kill a Process](#kill-a-process)
      - [Background a Process](#background-a-process)
      - [Foreground a Process](#foreground-a-process)
      - [Execute Multiple Commands](#execute-multiple-commands)
    - [Task Scheduling](#task-scheduling)
      - [systemd](#systemd)
        - [Create a Timer](#create-a-timer)
        - [Create a Service](#create-a-service)
        - [Reload systemd](#reload-systemd)
        - [Start the Timer \& Service](#start-the-timer--service)
      - [cron](#cron)
    - [Network Services](#network-services)
      - [Network File System (_NFS_)](#network-file-system-nfs)
    - [Backup and Restore](#backup-and-restore)
      - [rsync](#rsync)
      - [rsync - auto-synchronization](#rsync---auto-synchronization)
    - [File System Management](#file-system-management)
      - [Regular Files](#regular-files)
      - [Directories](#directories)
      - [Symbolic Links](#symbolic-links)
      - [Disk \& Drives](#disk--drives)
      - [Mounting](#mounting)
        - [Mounted File Systems at Boot](#mounted-file-systems-at-boot)
      - [SWAP](#swap)
        - [Creating a Swap Space](#creating-a-swap-space)
        - [Sizing and Managing Swap Space](#sizing-and-managing-swap-space)
        - [Swap Space for Hibernation](#swap-space-for-hibernation)
    - [Containerization](#containerization)
      - [Dockers](#dockers)
      - [Linux Containers (_LXC_)](#linux-containers-lxc)
        - [Securing LXC](#securing-lxc)
  - [Networking](#networking)
    - [Configuration](#configuration)
      - [Configuring Network Interfaces](#configuring-network-interfaces)
      - [Activate Network Interface](#activate-network-interface)
      - [Assign IP Address to an Interface](#assign-ip-address-to-an-interface)
      - [Assign a Netmask to an Interface](#assign-a-netmask-to-an-interface)
      - [Assign the Route to an Interface](#assign-the-route-to-an-interface)
      - [Editing DNS Settings](#editing-dns-settings)
        - [/etc/resolv.conf](#etcresolvconf)
      - [Editing Interfaces](#editing-interfaces)
        - [/etc/network/interfaces](#etcnetworkinterfaces)
      - [Restart Networking Service](#restart-networking-service)
    - [Network Access Control (_NAC_)](#network-access-control-nac)
      - [Discretionary Access Control](#discretionary-access-control)
      - [Mandatory Access Control](#mandatory-access-control)
      - [Role-Based Access Control](#role-based-access-control)
    - [Monitoring](#monitoring)
    - [Troubleshooting](#troubleshooting)
    - [Hardening](#hardening)
      - [SELinux](#selinux)
      - [AppArmor](#apparmor)
      - [TCP Wrappers](#tcp-wrappers)
    - [Remote Desktop Protocols](#remote-desktop-protocols)
      - [XServer](#xserver)
      - [XDMCP](#xdmcp)
      - [VNC](#vnc)
  - [Hardening](#hardening-1)
    - [Security](#security)
      - [TCP Wrappers](#tcp-wrappers-1)
    - [Firewall Setup](#firewall-setup)
      - [iptables](#iptables)
        - [Tables](#tables)
        - [Chains](#chains)
        - [Rules and Targets](#rules-and-targets)
        - [Matches](#matches)
    - [System Logs](#system-logs)
      - [Kernel Logs](#kernel-logs)
      - [System Logs](#system-logs-1)
      - [Authentication Logs](#authentication-logs)
      - [Application Logs](#application-logs)
      - [Security Logs](#security-logs)
  - [Distros](#distros)
    - [Solaris](#solaris)
      - [Differences to other Linux Distros](#differences-to-other-linux-distros)
      - [Command Examples](#command-examples)
        - [System Information](#system-information-1)
        - [Installing Packages](#installing-packages)
        - [Permission Management](#permission-management)
        - [NFS](#nfs)
        - [Process Mapping](#process-mapping)
        - [Executable Access](#executable-access)

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

## System Management

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

### Task Scheduling

#### systemd

... is a service used in Linux systems such as Ubuntu, Redhat Linux, and Solaris to start processes and scripts at a specifc time. With it, you can set up processes and scripts to run at a specific time or time interval and can also specify events and triggers that will trigger a specific task. To do this, you need to take some steps and precautions before your scripts or processes are automatically executed by the system.

1. create a timer
2. create a service
3. activate the timer

##### Create a Timer

Create a dir and the timer-file.

```bash
d41y@htb[/htb]$ sudo mkdir /etc/systemd/system/mytimer.timer.d
d41y@htb[/htb]$ sudo vim /etc/systemd/system/mytimer.timer
```

The timer file must contain "Unit", "Timer", and "Install".

- **Unit**: specifies a description for the timer
- **Timer**: specifies when to start the timer and when to activate it
- **Install**: specifies where to install the timer

```bash
# mytimer.timer file
[Unit]
Description=My Timer

[Timer]
OnBootSec=3min
OnUnitActiveSec=1hour

[Install]
WantedBy=timers.target
```

Here it depends on how you want to use your script. For example, if you want to run your script only once after the system boot, you should use ```OnBootSec``` setting in ```Timer```.

##### Create a Service

```bash
d41y@htb[/htb]$ sudo vim /etc/systemd/system/mytimer.service
```

Here you set a description and specify the full path to the script you want to run. The "multi-user.target" is the unit system that is activated when starting a normal multi-user mode. It defines the services that should be started on a normal system startup.

```bash
[Unit]
Description=My Service

[Service]
ExecStart=/full/path/to/my/script.sh

[Install]
WantedBy=multi-user.target
```

After that, you have to let systemd read the folders again to include the changes.

##### Reload systemd

```bash
d41y@htb[/htb]$ sudo systemctl daemon-reload
```

After that, you can use ```systemctl``` to start the service manually and enable the autostart.

##### Start the Timer & Service

```bash
d41y@htb[/htb]$ sudo systemctl start mytimer.timer
d41y@htb[/htb]$ sudo systemctl enable mytimer.timer
```

This way mytimer.service will be launched according to the intervals you set in mytimer.timer.

#### cron

... is another tool that can be used in Linux systems to schedule and automate processes. It allows users and admins to execute tasks at a specific time or specific intervals. For the above examples, you can also use cron to automate the same tasks. You just need to create script and then tell the cron daemon to call it at a specific time.

To set up the cron daemon, you need to store the tasks in a file called crontab and then tell the daemon when to run the tasks. Then you can schedule and automate the tasks by configuring the cron daemon accordingly.

Example:

```bash
# System Update
0 */6 * * * /path/to/update_software.sh

# Execute scripts
0 0 1 * * /path/to/scripts/run_scripts.sh

# Cleanup DB
0 0 * * 0 /path/to/scripts/clean_database.sh

# Backups
0 0 * * 7 /path/to/scripts/backup.sh
```

It is also possible to receive notifications when a task is executed successfully or unsuccessfully. In addition, you can create logs to monitor the execution of the tasks.

### Network Services

#### Network File System (_NFS_)

... is a network protocol that allows you to store and manage files on remote systems as if they were stored on the local system. It enables easy and efficient management of file across networks. For example, admins use NFS to store and manage files centrally to enable easy collaboration of data. For Linux, there are several NFS servers, including NFS-UTILS, NFS-Ganesha, and OpenNFS.

It can also be used to share and manage resources efficiently, e. g., to replicate file systems between servers. It also offers features such as access controls, real-time file transfer, and support for multiple users accessing data simultaneously. You can use this service just like FTP in case there is no FTP client installed on the target system, or NFS is running instead of FTP.

```bash
# installing
d41y@htb[/htb]$ sudo apt install nfs-kernel-server -y
# server status
d41y@htb[/htb]$ systemctl status nfs-kernel-server

● nfs-server.service - NFS server and services
     Loaded: loaded (/lib/system/system/nfs-server.service; enabled; vendor preset: enabled)
     Active: active (exited) since Sun 2023-02-12 21:35:17 GMT; 13s ago
    Process: 9234 ExecStartPre=/usr/sbin/exportfs -r (code=exited, status=0/SUCCESS)
    Process: 9235 ExecStart=/usr/sbin/rpc.nfsd $RPCNFSDARGS (code=exited, status=0/SUCCESS)
   Main PID: 9235 (code=exited, status=0/SUCCESS)
        CPU: 10ms
```

You can configure NFS via the config file ```/etc/exports```. This file specifies which directories should be shared and the access rights for users and systems. It is also possible to configure settins such as the transfer speed and the use of encryption. NFS access rights determine which users and systems can access the shared directories and what actions they can perform. Here are some important access rights that can be configured in NFS:

| Permission | Description |
| ---------- | ----------- |
| rw | gives users and systems read and write permissions to the shared directory |
| ro | gives users and systems read-only access to the shared directory |
| no_root_squash | prevents the root user on the client from being restricted to the rights of a normal user |
| root_squash | restricts the rights of the root user on the client to the rights of a normal user |
| sync | synchronizes the transfer of data to ensure that changes are only transferred after they have been saved on the file system |
| async | transfers data asynchronously, which makes the transfer faster, but may cause inconsistencies in the file systemif changes have not been fully committed |

```bash
# create NFS share
cry0l1t3@htb:~$ mkdir nfs_sharing
cry0l1t3@htb:~$ echo '/home/cry0l1t3/nfs_sharing hostname(rw,sync,no_root_squash)' >> /etc/exports
cry0l1t3@htb:~$ cat /etc/exports | grep -v "#"

/home/cry0l1t3/nfs_sharing hostname(rw,sync,no_root_squash)

# mount NFS share
cry0l1t3@htb:~$ mkdir ~/target_nfs
cry0l1t3@htb:~$ mount 10.129.12.17:/home/john/dev_scripts ~/target_nfs
cry0l1t3@htb:~$ tree ~/target_nfs

target_nfs/
├── css.css
├── html.html
├── javascript.js
├── php.php
└── xml.xml

0 directories, 5 files
```

### Backup and Restore

When backing up data on an Ubuntu system, you have several options:

- Rsync
- Deja Dup
- Duplicity

#### rsync

```bash
# install
d41y@htb[/htb]$ sudo apt install rsync -y

# backup a local dir to your backup-server
# -a preserves the original file attributes
# -v verbose
d41y@htb[/htb]$ rsync -av /path/to/mydirectory user@backup_server:/path/to/backup/directory

# customized (compression, incremental backups)
# -z compression
# --backup creates incremental backups
# --delete removes files from the remote host that is no longer present in the source dir
d41y@htb[/htb]$ rsync -avz --backup --backup-dir=/path/to/backup/folder --delete /path/to/mydirectory user@backup_server:/path/to/backup/directory

# restore your backup
d41y@htb[/htb]$ rsync -av user@remote_host:/path/to/backup/directory /path/to/mydirectory

# secure transfer of your backup
# uses ssh
d41y@htb[/htb]$ rsync -avz -e ssh /path/to/mydirectory user@backup_server:/path/to/backup/directory
```

#### rsync - auto-synchronization

```bash
# set up key-based authentication
d41y@htb[/htb]$ ssh-keygen -t rsa -b 2048

d41y@htb[/htb]$ ssh-copy-id user@backup_server

# backup-script
#!/bin/bash

rsync -avz -e ssh /path/to/mydirectory user@backup_server:/path/to/backup/directory

# permission and cron
d41y@htb[/htb]$ chmod +x RSYNC_Backup.sh

d41y@htb[/htb]$ crontab -e

-> 0 * * * * /path/to/RSYNC_Backup.sh
```

### File System Management

The best file system choice depends on the specific requirements of the app or user such as:

- ext2
  - an older file system with no journaling capabilities, which makes it less suited for modern systems but still useful in certain low-overhead scenarios
- ext3/ext4
  - are more advanced, with journaling, and ext4 is the default choice for most modern Linux systems because it offers a balance of performance, reliability, and large file support
- Btrfs
  - known for advanced features like snapshotting and built-in data integrity checks, making it ideal for complex storage setups
- XFS
  - excels at handling large files and has high performance; it is best suited for environments with high I/O demands
- NTFS
  - originally developed for Windows, is useful for compatibility when dealing with dual-boot systems or external drives that need to work on both Linux and Windows systems

When selecting a file system, it's essential to analyze the needs of the application or user factors such as performance, data integrity, compatibility, and storage requirements will influence the decision.

Linux's file system architecture is based on the Unix model, organized in a hierarchical structure. This structure consists of several components, the most critical being inodes. Inodes are data structures that store metadata about each file and directory, including permissions, ownership, size, and timestamps. Inodes do not store the file's actual data or name, but they contain pointers to the blocks where the file's data is stored on the disk.

The inode table is a collection of these inodes, essentially acting as a database that the Linux kernel uses to track every file and directory on the system. This structure allows the OS to efficiently access and manage files. Understanding and managing inodes is a crucial aspect of file system management in Linux, especially in scenarios where a disk is running out of inode space before running out of actual storage capacity.

In Linux, files can be stored in one of several key types:

- regular files
- directories
- symbolic links

#### Regular Files

... are the most common type and typically consist of text data and/or binary data. They reside in various directories throughout the file system, not just in the root directory. The root directory is simply the top of the hierarchical directory tree, and files can exist in any directory within that structure.

#### Directories

... are special types of files that act as containers for other files. When a file is stored in a directory, that directory is referred to as the file's parent directory. Directories help organize files within the Linux file system, allowing for an efficient way to manage collections of files.

#### Symbolic Links

... act as shortcuts or references to other files or directories. Symbolic links allow quick access to files located in different parts of the file system without duplicating the file itself. Symlinks can be used to streamline access or organize complex directory structures by pointing to important files across various locations.

Each category of user can have different permission levels. For example, the owner of a file may have permission to read, write, and execute it, while others may only have read access. These permissions are independent for each category, meaning changes to one user's permissions do not necessarily affect others.

```bash
# -i for inode
d41y@htb[/htb]$ ls -il

total 0
10678872 -rw-r--r--  1 cry0l1t3  htb  234123 Feb 14 19:30 myscript.py
10678869 -rw-r--r--  1 cry0l1t3  htb   43230 Feb 14 11:52 notes.txt
```

#### Disk & Drives

Disk management on Linux involves managing physical storage devices, including hard drives, solid-state drives, and removable storage devices. The main tool for disk management on Linux is the fdisk, which allows you to create, delete, and manage partitions on a drive. It can also display information about the partition table, including the size and type of each partition. Partitioning a drive on Linux involves dividing the physical storage space into separate, logical sections. Each partition can then be formatted with a specific file system, such as ext4, NTFS, or FAT32, and can be mounted as a separate file system. The most common partitioning tool on Linux is also fdisk, gpart, and GParted.

```bash
d41y@htb[/htb]$ sudo fdisk -l

Disk /dev/vda: 160 GiB, 171798691840 bytes, 335544320 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x5223435f

Device     Boot     Start       End   Sectors  Size Id Type
/dev/vda1  *         2048 158974027 158971980 75.8G 83 Linux
/dev/vda2       158974028 167766794   8792767  4.2G 82 Linux swap / Solaris

Disk /dev/vdb: 452 KiB, 462848 bytes, 904 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

#### Mounting

Each logical partition or storage drive must be assigned to a specific directory in the file system. This process is known as mounting. Mounting involves linking a drive or partition to a directory, making its contents accessible within the overall file system hierarchy. Once a drive is mounted to a directory, it can be accessed and used like any other directory on the system.

The mount command is commonly used to manually mount file systems on Linux. However, if you want certain file systems or partitions to be automatically mounted when the system boots, you can define them in the ```/etc/fstab``` file. This file lists the file systems and their associated mount points, along with options like read/write permissions and file system types, ensuring that specific drives or partitions are available upon startup without needing manual intervention.

##### Mounted File Systems at Boot

```bash
d41y@htb[/htb]$ cat /etc/fstab

# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a device; this may
# be used with UUID= as a more robust way to name devices that works even if
# disks are added and removed. See fstab(5).
#
# <file system>                      <mount point>  <type>  <options>  <dump>  <pass>
UUID=3d6a020d-...SNIP...-9e085e9c927a /              btrfs   subvol=@,defaults,noatime,nodiratime,nodatacow,space_cache,autodefrag 0 1
UUID=3d6a020d-...SNIP...-9e085e9c927a /home          btrfs   subvol=@home,defaults,noatime,nodiratime,nodatacow,space_cache,autodefrag 0 2
UUID=21f7eb94-...SNIP...-d4f58f94e141 swap           swap    defaults,noatime 0 0
```

To view the currently mounted file systems, you can use the ```mount``` command without any arguments. The output will show a list of all the currently mounted file systems, including the device name, file system type, mount point, and options.

```bash
d41y@htb[/htb]$ mount

sysfs on /sys type sysfs (rw,nosuid,nodev,noexec,relatime)
proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)
udev on /dev type devtmpfs (rw,nosuid,relatime,size=4035812k,nr_inodes=1008953,mode=755,inode64)
devpts on /dev/pts type devpts (rw,nosuid,noexec,relatime,gid=5,mode=620,ptmxmode=000)
tmpfs on /run type tmpfs (rw,nosuid,nodev,noexec,relatime,size=814580k,mode=755,inode64)
/dev/vda1 on / type btrfs (rw,noatime,nodiratime,nodatasum,nodatacow,space_cache,autodefrag,subvolid=257,subvol=/@)
```

To mount a file system, you can use the mount command followed by the device name and the mount point. For example, to mount a USB drive with the device name ```/dev/sdb1``` to the directory ```/mnt/usb```, you should use the following command:

```bash
d41y@htb[/htb]$ sudo mount /dev/sdb1 /mnt/usb
d41y@htb[/htb]$ cd /mnt/usb && ls -l

total 32
drwxr-xr-x 1 root root   18 Oct 14  2021 'Account Takeover'
drwxr-xr-x 1 root root   18 Oct 14  2021 'API Key Leaks'
drwxr-xr-x 1 root root   18 Oct 14  2021 'AWS Amazon Bucket S3'
drwxr-xr-x 1 root root   34 Oct 14  2021 'Command Injection'
drwxr-xr-x 1 root root   18 Oct 14  2021 'CORS Misconfiguration'
drwxr-xr-x 1 root root   52 Oct 14  2021 'CRLF Injection'
drwxr-xr-x 1 root root   30 Oct 14  2021 'CSRF Injection'
drwxr-xr-x 1 root root   18 Oct 14  2021 'CSV Injection'
drwxr-xr-x 1 root root 1166 Oct 14  2021 'CVE Exploits'
...SNIP...
```

To unmount a file system in Linux, you can use the ```umount``` command followed by the mount point of the file system you want to unmount. The mount point is the location in the file system where the file system is mounted and is accessible to you. For example, to unmount the USB drive that was previously mounted to the directory ```/mnt/usb```, you should use the following command:

```bash
d41y@htb[/htb]$ sudo umount /mnt/usb
```

It is important to note that you must have sufficient permissions to unmount a file system. You also cannot unmmount a file system that is in use by a running process. To ensure that there are no running processes that are using the file system, you can use the ```lsof``` command to list the open files on the file system.

```bash
cry0l1t3@htb:~$ lsof | grep cry0l1t3

vncserver 6006        cry0l1t3  mem       REG      0,24       402274 /usr/bin/perl (path dev=0,26)
vncserver 6006        cry0l1t3  mem       REG      0,24      1554101 /usr/lib/locale/aa_DJ.utf8/LC_COLLATE (path dev=0,26)
vncserver 6006        cry0l1t3  mem       REG      0,24       402326 /usr/lib/x86_64-linux-gnu/perl-base/auto/POSIX/POSIX.so (path dev=0,26)
vncserver 6006        cry0l1t3  mem       REG      0,24       402059 /usr/lib/x86_64-linux-gnu/perl/5.32.1/auto/Time/HiRes/HiRes.so (path dev=0,26)
vncserver 6006        cry0l1t3  mem       REG      0,24      1444250 /usr/lib/x86_64-linux-gnu/libnss_files-2.31.so (path dev=0,26)
vncserver 6006        cry0l1t3  mem       REG      0,24       402327 /usr/lib/x86_64-linux-gnu/perl-base/auto/Socket/Socket.so (path dev=0,26)
vncserver 6006        cry0l1t3  mem       REG      0,24       402324 /usr/lib/x86_64-linux-gnu/perl-base/auto/IO/IO.so (path dev=0,26)
...SNIP...
```

If you find any processes that are using the file system, you need to stop them before you can unmount the file system. Additionally, you can also unmount a file system automatically when the system is shut down by adding an entry to the ```/etc/fstab``` file. The ```/etc/fstab``` file contains information about all the file systems that are mounted on the system, including the options for automatic mounting at boot time and other mount options. To unmount a file system automatically at shutdown, you need to add the ```noauto``` option to the entry in the ```/etc/fstab``` file for that file system:

```bash
/dev/sda1 / ext4 defaults 0 0
/dev/sda2 /home ext4 defaults 0 0
/dev/sdb1 /mnt/usb ext4 rw,noauto,user 0 0
192.168.1.100:/nfs /mnt/nfs nfs defaults 0 0
```

#### SWAP

Swap space is an essential part of memory management in Linux and plays a critical role in ensuring smooth system performance, especially when the available physical memory is fully utilized. When the system runs out of physical memory, the kernel moves inactive pages of the memory to the swap space, freeing up RAM for active processes. This process is known as swapping.

##### Creating a Swap Space

Swap space can be set up either during the installation of the OS or added later using the ```mkswap``` and ```swapon``` commands.

- ```mkswap```
  - is used to prepare a device or file to be used as swap space by creating a Linux swap area
- ```swapon```
  - activates the swap space, allowing the system to use it

##### Sizing and Managing Swap Space

The size of the swap space is not fixed and depends on your system's physical memory and intended usage. For example, a system with less RAM or running memory-intensive apps might need more swap space. However, modern systems with large amounts of RAM may require less or even no swap space, depending on specific use cases.

When setting up swap space, it's important to allocate it on a dedicated partition or file, seperate from the rest of the file system. This prevents fragmentation and ensures efficient use of the swap are when needed. Additionally, because sensitive data can be temporarily stored in swap space, it's recommended to encrypt the swap space to safeguard against potential data exposure.

##### Swap Space for Hibernation

Besides extending physical memory, swap space is also used for hibernation. Hibernation is a power-saving feature that saves the system's state to the swap space and powers of the system. When the system is powered back on, it restores its previous state from the swap space, resuming exactly where it left off.

### Containerization

... is the process of packaging and running apps in isolated environments, typically referred to as containers. These containers provide lightweight, consistent environments for apps to run, ensuring that they behave the same way, regardless of where they are deployed.

Containers differ from VMs in that they share the host system's kernel, making them far more lightweight and efficient.

Containers are highly configurable, allowing users to tailor them to their specific needs, and their lightweight nature makes it easy to run multiple containers simultaneously on the same host system.

Security is a critical aspect of containerization. Containers isolate apps from the host and from each other, providing a barrier that reduces the risk of malicious activities affecting the host or other containers. This isolation, along with proper configuration and hardening techniques, adds an additional layer of security. However, it is important to note that containers do not offer the same level of isolation as traditional VMs.

#### Dockers

Docker is an open-source platform for automating the deployment of apps as self-contained units called containers. It uses a layerd filesystem and resource isolation features to provide flexibility and portability. Additionally, it provides a robust set of tools for creating, deploying, and managing apps, which helps streamline the containerization process.

```bash
### install docker
#!/bin/bash

# Preparation
sudo apt update -y
sudo apt install ca-certificates curl gnupg lsb-release -y
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update -y
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Add user htb-student to the Docker group
sudo usermod -aG docker htb-student
echo '[!] You need to log out and log back in for the group changes to take effect.'

# Test Docker installation
docker run hello-world
```

The Docker engine and specific Docker images are needed to run a container. These can be obtained from the Docker Hub, a repo of pre-made images, or created by the user. The Docker Hub is a cloud-based registry for software repos or a library for Docker images. It is divided into a public and a private area. The public area allows users to upload and share images with the community. It also contains official images from the Docker development team and established open-source projects. Images uploaded to a private area of the registry are not publicly accessible. They can be shared within a company or with teams and acquaintances.

Creating a Docker image is done by creating a Dockerfile, which contains all the instructions the Docker engine needs to create the container. You can use Docker containers as your "file hosting" server when transferring specific files to your target system. Therefore, you must create a Dockerfile based on Ubuntu 22.04 with Apache and SSH server running. With this, you can use ```scp``` to transfer files to the docker image, and Apache allows you to host files and use tools ```curl```, ```wget```, and others on the target system to donwload the required files. Such a Dockerfile could look like the following:

```bash
# Use the latest Ubuntu 22.04 LTS as the base image
FROM ubuntu:22.04

# Update the package repository and install the required packages
RUN apt-get update && \
    apt-get install -y \
        apache2 \
        openssh-server \
        && \
    rm -rf /var/lib/apt/lists/*

# Create a new user called "docker-user"
RUN useradd -m docker-user && \
    echo "docker-user:password" | chpasswd

# Give the docker-user user full access to the Apache and SSH services
RUN chown -R docker-user:docker-user /var/www/html && \
    chown -R docker-user:docker-user /var/run/apache2 && \
    chown -R docker-user:docker-user /var/log/apache2 && \
    chown -R docker-user:docker-user /var/lock/apache2 && \
    usermod -aG sudo docker-user && \
    echo "docker-user ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# Expose the required ports
EXPOSE 22 80

# Start the SSH and Apache services
CMD service ssh start && /usr/sbin/apache2ctl -D FOREGROUND
```

After you have defined your Dockerfile, you need to convert it into an image. With the ```build``` command, you take the directory with the Dockerfile, execute the steps from the Dockerfile, and store the image in your local Docker Engine. If one of the steps fails due to an error, the container creation will be aborted. With the option ```-t```, you give your container a tag, so it is easier to identify and work with later.

```bash
d41y@htb[/htb]$ docker build -t FS_docker .
```

Once the Docker image has been created, it can be executed through the Docker engine, making it a very efficient and easy way to run a container. It is similar to the virtual machine concept, based on images. Still, these images are read-only templates and provide the file system necessary for runtime and all parameters. A container can be considered a running process of an image. When a container is to be started on a system, a package with the respective image is first loaded if unavailable locally. You can start the container by the following command:

```bash
d41y@htb[/htb]$ docker run -p <host port>:<docker port> -d <docker container name>

...

d41y@htb[/htb]$ docker run -p 8022:22 -p 8080:80 -d FS_docker
```

In this case, you start a new container from the image ```FS_docker``` and map the host ports 8022 and 8080 to container ports 22 and 80, respectively. The container runs in the background, allowing you to access the SSH and HTTP services inside the container using the specified host ports.

When managing Docker containers, Docker provides a comprehensive suite of tools that enable you to easily create, deploy, and manage containers. With these powerfull tools, you can list, start and stop containers and effectively manage them, ensuring seamless execution of apps. Some of the most commonly used Docker management commands are:

- ```docker ps```
  - list all running containers
- ```docker stop```
  - stop a running container
- ```docker start```
  - start a stopped container
- ```docker restart```
  - restart a running container
- ```docker rm```
  - remove a container
- ```docker rmi```
  - remove a Docker image
- ```docker logs```
  - view the logs of a container

It is important to note that Docker commands can be combined with various options to add extra functionality. For example, you can specify which ports to expose, mount volumes to retain data, or set environment variables to configure your containers. This flexibility allows you to customize your Docker containers to meet specific needs and requirements.

When working with Docker images, it's crucial to understand that any changes made to a running container based on an image are not automatically saved to the image. To preverse these changes, you need to create a new image that inlcudes them. This is done by writing a new Dockefile, which starts with the ```FROM``` statement and then includes the necessary commands to apply the changes. Once the Dockerfile is ready, you can use the ```docker build``` command to build the new image and assign it a uniqe tag to identify it. This process ensures that the original image remains unchanged, while the new image reflects the upadtes.

It's also important to note that Docker containers are stateless by design, meaning that any changes made inside a running container are lost once the container is stopped or removed. For this reason, it's best practice to use volumes to persist data outside of the container or store application state.

In production environments, managing containers at scale becomes more complex. Tools like Docker Compose or Kubernetes help orchestrate containers, enabling you to manage, scale, and link mulitple containers efficiently.

#### Linux Containers (_LXC_)

... is a lightweight virtualization technology that allows multiple isolated Linux systems to run on a single host. LXC uses key resource isolation features, such as control groups (_cgroups_) and namespaces, to ensure that each container operates independently. Unlike traditional VMs, which require a full OS for each instance, containers share the host's kernel, making LXC more efficient in terms of resource usage.

LXC provides a comprehensive set of tools and APIs for managing and configuring containers, making it a popular choice for containerization on Linux systems. However, while LXC and Docker are both containerizations technologies, they serve different purposes and have unique features.

Docker builds upen the idea of containerization by adding ease of use and portability, which has made it highly popular in the world of DevOps, Docker emphasizes packaging apps with all their dependencies in a portable "image", allowing them to be easily deployed across different environments. However, there are some differences between the two that can be distinguished based on the following categories:

| Category | Description |
| -------- | ----------- |
| Approach | LXC is often seen as a more traditional, system-level containerization tool, focusing on creating Linux environments that behave like lightweight VMs; docker is app-focused, meaning it is optimized for packaging and deploying single apps or microservices |
| Image building | Docker uses a standardized image format that includes everything needed to run an app; LXC, while capable of similar functionality, typically requires more manual setup for building and managing environments |
| Portability | Docker excels in portability, its container images can be easily shared across different systems via Dockeer Hub or other registries; LXC environments are less portable in this sense, as they are more tightly integrated with the host system's configuration |
| Easy of use | Docker is designed with simplicity in mind, offering a user-friendly CLI and extensive community support; LXC, while powerful, may require more in-depth knowledge of Linux system administration, making it less straightforward for beginners |
| Security | Docker containers are generally more secure out of the box, thanks to additional isolation layers like AppArmor and SELinux, along with its read-only filesystem feature; LXC containers, while secure, may need additional configurations to match the level of isolation Docker offers by default; interestingly, when misconfigured, both Docker and LXC can present a vector for local privilege escalation |

In LXC, images are manually built by creating a root filesystem and installing the necessary packages and configurations. Those containers are tied to the host system, may not be easily portable, and may require more technical expertise to configure and manage.

On the other hand, Docker is an app-centric platform that builds on top of LXC and provides a more user-friendly interface for containerization. Its images are built using a Dockerfile, which specifies the base image and the steps required to build the image. Those images are designed to be portable so they can be easily moved from on environment to another.

To install LXC on a Linux distro, you can use the distro's package manager.

```bash
d41y@htb[/htb]$ sudo apt-get install lxc lxc-utils -y
```

Once LXC is installed, you can start creating and managing containers on the Linux host. It is worth noting that LXC requires the Linux kernel to support the necessary features for containerization. Most modern Linux kernels have built-in support for containerization, but some older kernels may require additional configuration or patching to enable support for LXC.

To create a new LXC container, you can use the ```lxc-create``` command followed by the container's name and the template to use.

```bash
d41y@htb[/htb]$ sudo lxc-create -n linuxcontainer -t ubuntu
```

When working with LXC containers, several tasks are involved in managing them. These tasks include creating new containers, configuring their settings, starting and stopping them as necessary, and monitoring their performance. Fortunately, there are many command-line tools and configuration files available that can assist with these tasks. These tools enable you to quickly and easily manage your containers, ensuring they are optimized for your specific needs and requirements. By leveraging these tools effectively, you can ensure that your LXC containers run efficiently allowing you to maximize your system's performance and capabilities.

- ```lxc-ls```
  - list all existing containers
- ```lxc-stop -n <container>```
  - stop a running container
- ```lxc-start -n <container>```
  - start a stopped container
- ```lxc-restart -n <container>```
  - restart a running container
- ```lxc-config -n <container name> -s storage```
  - manage container storage
- ```lxc-config -n <container name> -s network```
  - manage container network settings
- ```lxc-config -n <container name> -s security```
  - manage container security settings
- ```lxc-attach -n <container>```
  - connect to a container
- ```lxc-attach -n <container> -f /path/to/share```
  - connect to a container and share a specific directory or file

Containers are particularly useful because they allow you to quickly create and run isolated environments tailored to your specific testing needs.

LXC containers can be accessed using various methods, such as SSH or console. It is recommended to restrict access to the container by disabling unneccessary services, using secure protocols, and enforcing strong authentication mechanisms.

##### Securing LXC

Limit the resources to the container. In order to configure ```cgroups``` for LXC and limit the CPU and memory, a container can create a new configuration file in the ```/usr/share/lxc/config/<container name>.conf``` directory with the name of your container.

```bash
d41y@htb[/htb]$ sudo vim /usr/share/lxc/config/linuxcontainer.conf
```

In this configuration file, you can add the following lines to limit the CPU and memory the container can use.

```
lxc.cgroup.cpu.shares = 512
lxc.cgroup.memory.limit_in_bytes = 512M
```

When working with containers, it is important to understand the ```lxc.cgroup.cpu.shares``` parameter. This parameter determines the CPU time a container can use in relation to the other containers on the system. By default, this value is set to 1024, meaning the container can use up to its fair share of CPU time. However, if you set this value to 512, for example, the container can only use half of the CPU time available on the system. This can be a useful way to manage resources and ensure all containers have the necessary access to CPU time.

One of the key parameters in controlling the resource allocation of a container is the ```lxc.cgroup.memory.limit_in_bytes``` parameter. This parameter allows you to set the maximum amount of memory a container can use. It's important to note that this value can be specified in a variety of units, including bytes, kilobytes (_K_), megabytes (_M_), gigabytes (_G_), or terabytes (_T_), allowing for a high degree of granularity in defining container resource limits. After adding these two lines, you can save and close the file.

To apply these changes, you must restart the LXC service:

```bash
d41y@htb[/htb]$ sudo systemctl restart lxc.service
```

LXC uses namespaces to provide an isolated environment for processes, networks, and file systems from the host system. Namespaces are a feature of the Linux kernel that allows for creating isolated environments by providing an abstraction of system resources.

Namespaces are a crucial aspect of containerization as they provide a high degree of isolation for the container's processes, network interfaces, routing tables, and firewall rules. Each container is allocated a unique process id (_pid_) number space, isolated from the host system's process IDs. This ensures that the container's processes cannot interfere with the host system's processes, enhancing system stability and reliability. Additionally, each container has its own network interface, routing tables, and firewall rules, which are completely separate from the host system's network interfaces. Any network-related activity within the container is cordoned off from the host system's network, providing an extra layer of network security.

Moreover, containers come with their own root file system, which is entirely different from the host system's root file system. This separation between the two ensures that any changes or modifications made within the container's file system do not affect the host system's file system. However, it's important to remember that while namespaces provide a high level of isolation, they do not provide complete security. Therefore, it is always advisable to implement additional security measures to further protect the container and the host system from potential security breaches.

## Networking

### Configuration

#### Configuring Network Interfaces

```bash
cry0l1t3@htb:~$ ifconfig

eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 178.62.32.126  netmask 255.255.192.0  broadcast 178.62.63.255
        inet6 fe80::88d9:faff:fecf:797a  prefixlen 64  scopeid 0x20<link>
        ether 8a:d9:fa:cf:79:7a  txqueuelen 1000  (Ethernet)
        RX packets 7910  bytes 717102 (700.2 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 7072  bytes 24215666 (23.0 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

eth1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.106.0.66  netmask 255.255.240.0  broadcast 10.106.15.255
        inet6 fe80::b8ab:52ff:fe32:1f33  prefixlen 64  scopeid 0x20<link>
        ether ba:ab:52:32:1f:33  txqueuelen 1000  (Ethernet)
        RX packets 14  bytes 1574 (1.5 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 15  bytes 1700 (1.6 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 15948  bytes 24561302 (23.4 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 15948  bytes 24561302 (23.4 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0


cry0l1t3@htb:~$ ip addr

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 8a:d9:fa:cf:79:7a brd ff:ff:ff:ff:ff:ff
    altname enp0s3
    altname ens3
    inet 178.62.32.126/18 brd 178.62.63.255 scope global dynamic eth0
       valid_lft 85274sec preferred_lft 85274sec
    inet6 fe80::88d9:faff:fecf:797a/64 scope link 
       valid_lft forever preferred_lft forever
3: eth1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether ba:ab:52:32:1f:33 brd ff:ff:ff:ff:ff:ff
    altname enp0s4
    altname ens4
    inet 10.106.0.66/20 brd 10.106.15.255 scope global dynamic eth1
       valid_lft 85274sec preferred_lft 85274sec
    inet6 fe80::b8ab:52ff:fe32:1f33/64 scope link 
       valid_lft forever preferred_lft forever
```

#### Activate Network Interface

```bash
d41y@htb[/htb]$ sudo ifconfig eth0 up     # OR
d41y@htb[/htb]$ sudo ip link set eth0 up
```

#### Assign IP Address to an Interface

```bash
d41y@htb[/htb]$ sudo ifconfig eth0 192.168.1.2
```

#### Assign a Netmask to an Interface

```bash
d41y@htb[/htb]$ sudo ifconfig eth0 netmask 255.255.255.0
```

#### Assign the Route to an Interface

```bash
d41y@htb[/htb]$ sudo route add default gw 192.168.1.1 eth0
```

#### Editing DNS Settings

```bash
d41y@htb[/htb]$ sudo vim /etc/resolv.conf
```

##### /etc/resolv.conf

```
nameserver 8.8.8.8
nameserver 8.8.4.4
```

> [!NOTE]
> After completing the necessary modifications to the network configuration, it is essential to ensure that these changes are saved to persist across reboots. This can be achieved by editing the ```/etc/network/interfaces``` file, which defines network interfaces for Linux-based OS. Thus, it is vital to save any changes made to this file to avoid any potential issues with network connectivity.<br><br>
> It's important to note that changes made directly to the ```/etc/resolv.conf``` file are not persistent across reboots or network configuration changes. This is because the file may be automatically overwritten by network management services like NetworkManageer or systemd-resolved. To make DNS changes permanent, you should configure DNS settings through the appropriate network management tool, such as editing network configuration files or using network management utilities that store persistent settings.

#### Editing Interfaces

```bash
d41y@htb[/htb]$ sudo vim /etc/network/interfaces
```

##### /etc/network/interfaces

```bash
auto eth0
iface eth0 inet static
  address 192.168.1.2
  netmask 255.255.255.0
  gateway 192.168.1.1
  dns-nameservers 8.8.8.8 8.8.4.4
```

#### Restart Networking Service

```bash
d41y@htb[/htb]$ sudo systemctl restart networking
```

### Network Access Control (_NAC_)

| Type | Description |
| ---- | ----------- |
| Discretionary Access Control (_DAC_) | this model allows the owner of the resource to set permissions for who can access it |
| Mandatory Access Control (_MAC_) | permissions are enforced by the OS, not the owner of the resource, making it more secure but less flexible |
| Role-Based Access Control (_RBAC_) | permissions are assigned based on the roles within an organization, making it easier to manage user privileges |

Configuring Linux network devices for NAC involves setting up security policies like SELinux, AppArmor profiles for application security, and using TCP wrappers to controll access to services based on IP addresses.

Tools such as syslog, rsyslog, ss, lsof, and the ELK stack can be used to monitor and analyze network traffic. These tools help identify anomalies, potential information disclosure/expose, security breaches, and other critical network issues.

#### Discretionary Access Control

... is a crucial component of modern security systems as it helps organizations provide access to their resources while managing the associated risks of unauthorized access. It is a widely used access control system that enables users to manage acces to their resources by granting resource owners the responsibility of controlling access permissions to their resources. This means that users and groups who own a specific resource can decide who access to their resource and what actions they are authorized to perform. These permissions can be set for reading, writing, executing, or deleting the resource.

#### Mandatory Access Control

... is used in infrastructure that provides more fine-grained control over resource access than DAC systems. Those systems define rules that determine resource access based on the resource's security level and the user's security level or process requesting access. Each resource is assigned a security label that identifies its security level, and each user or process is assigend a security clearance that identifies its security level. Access to a resource is only granted if the user's or process's security level is equal to or greater than the security level of the resource. MAC is often used in OS and apps that require a high level of security, such as military or government systems, financial systems, and healthcare systems. MAC systems are designed to prevent unauthorized access to resources and minimize the impact of security breaches.

#### Role-Based Access Control

... assigns permissions to users based on their roles within an organization. Users are assigned roles based on their job responsibilities or other criteria, and each role is granted a set of permissions that determine the actions they can perform. RBAC simplifies the management of access permissions, reduces the risk of errors, and ensures that users can access only the resources necessary to perform their job functions. It can restrict access to sensitive resources and data, limit the impact of security breaches, and ensure compliance with regulatory requirements. Compared to DAC systems, RBAC provides a more flexible and scalable approach to managing resource access. In an RBAC system, each user is assigned one or more roles, and each role is assigned a set of permissions that define the user's action. Resource access it granted based on the user's assigned role rather than their identity or ownership of the resource. RBAC systems are typically used in environments with many users and resources, such as large organizations, government agencies, and financial institutions.

### Monitoring

Network monitoring involves capturing, analyzing, and interpreting network traffic to identify security threats, performance issues, and suspicious behavior. The primary goal of analyzing and monitoring network traffic is identifying security threats and vulns.

### Troubleshooting

Network troubleshooting is an essential process that involves diagnosing and resolving network issues that can adversely affect the performance and reliability of the network. Various tools can help you identify and resolve issues regarding network troubleshooting on Linux systems:

- ping
- traceroute
- netstat
- wireshark
- tcpdump
- nmap

### Hardening

By implementing the following security measures and ensuring that you set up corresponding protection against potential attackers, you can significantly reduce the risk of data leaks and ensure your system remains secure.

#### SELinux

... is a mandatory access control system integrated into the Linux kernel.

#### AppArmor

... is a MAC system that controls access to system resources and apps, but it operates in a simpler, more user-friendly manner.

#### TCP Wrappers

... are a host-based network access control tool that restricts access to network services based on the IP address of incoming connections.

### Remote Desktop Protocols

... are used in Windows, Linux, and MacOS to provide graphical remote access to a system. These protocols allow admins to manage, troubleshoot, and update systems remotely.

#### XServer

... is the user-side part of the X Window System network protocol (_X11 / X_). The X11 is a fixed system that consists of a collection of protocols and applications that allow you to call application windows on displays in a graphical user interface. X11 is predominant on Unix systems, but X servers are also available for other OS. Nowadays, the XServer is part of almost every desktop installation of Ubuntu and its derivatives and does not need to be installed.

When a desktop is started on a Linux computer, the communication of the graphical user interface with the OS happens via an X server. The computer's internal network is used, even if the computer should not be in a network. The practical thing about the X protocol is network transparency. This protocol mainly uses TCP/IP as transport base but can also be used on pure Unix sockets. The ports that are utilized for X server are typically located in the range of TCP/6001-6009, allowing communication between the client and server. When starting a new desktop session via X server the TCP port 6000 would be opened for the first X display ```:0```. This range of ports enables the server to perform its tasks such as hosting apps, as well as providing services to clients. They are often used to provide remote access to a system, allowing users to access apps and data from anywhere in the world. Additionally, these ports are also essential for the secure sharing of files and data, making them an integral part of the Open X Server. Thus an X server is not dependent on the local computer, it can be used to access other computers, and other computers can use the local X server. Provided that both local and remote computers contain Unix/Linux systems, additional protocols such as VNC and RDP generate the graphical output on the remote computer and transport it over the network. Whereas with X11, it is rendered on the local computer. This saves traffic and a load on the remote computer. However, X11's significant disadvantage is the unencrypted data transmission. However, this can be overcome by tunneling the SSH protocol.

For this, you have to allow X11 fowarding in the SSH config file ```/etc/ssh/sshd_config``` on the server that provides the application by changing this option to yes.

```bash
d41y@htb[/htb]$ cat /etc/ssh/sshd_config | grep X11Forwarding

X11Forwarding yes
```

With this you can start the app from your client with the following command:

```bash
d41y@htb[/htb]$ ssh -X htb-student@10.129.23.11 /usr/bin/firefox

htb-student@10.129.14.130's password: ********
<SKIP>
```

X11 is not a secure protocol by default because its communication is unencrypted. As such, you should pay attention and look for those TCP ports when you deal with Linux-based targets.

#### XDMCP

The X Display Manager Control Protocol (_XDMCP_) protocol is used by the X Display Manager for communication through UDP port 177 bewteen X terminals and computers operating under Unix/Linux. It is used to manage remote X Window sessions on other machines and is often used by Linux system admins to provide access to remote desktops. XDMCP is an insecure protocol and should not be used in any environment that requires high level of security.

#### VNC

Virtual Network Computing (_VNC_) is a remote desktop sharing system based on the RFB protocol that allows users to control a computer remotely. It allows a user to view and interact with a desktop environment over a network connection. The user can control the remote computer as if sitting in front of it. This is also one of the most common protocols for remote graphical connections for linux hosts.

VNC is generally considered to be secure. It uses encryption to ensure the data is safe while in transit and requires authentication before a user can gain access. Admins make use of VNC to access computers that are not physically accessible. This could be used to troubleshoot and maintain servers, access applications on other computers, or provide remote access to workstations. VNC can also be used for screen sharing, allowing multiple users to collaborate on a project or troubleshoot a problem.

There are two different concepts for VNC servers. The usual server offers the actual screen of the host computer for user support. Because the keyboard and mouse remain usable at the remote computer, an arrangement is recommended. The second group of server programs allows user login to virtual sessions, similar to the terminal server concept.

Server and viewer programs for VNC are available for all common OS. Therefore, many IT services are performed with VNC.

Traditionally, the VNC server listens on TCP port 5900. So it offers its display 0 there. Other displays can be offered via additional ports, mostly 590[x], where x is the display number.

For these VNC connections, many different tools are used. Some are:

- TigerVNC
- TightVNC
- RealVNC
- UltraVNC

```bash
### Configuration
htb-student@ubuntu:~$ touch ~/.vnc/xstartup ~/.vnc/config
htb-student@ubuntu:~$ cat <<EOT >> ~/.vnc/xstartup

#!/bin/bash
unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS
/usr/bin/startxfce4
[ -x /etc/vnc/xstartup ] && exec /etc/vnc/xstartup
[ -r $HOME/.Xresources ] && xrdb $HOME/.Xresources
x-window-manager &
EOT

htb-student@ubuntu:~$ cat <<EOT >> ~/.vnc/config

geometry=1920x1080
dpi=96
EOT

htb-student@ubuntu:~$ chmod +x ~/.vnc/xstartup

### start the VNC server
htb-student@ubuntu:~$ vncserver

New 'linux:1 (htb-student)' desktop at :1 on machine linux

Starting applications specified in /home/htb-student/.vnc/xstartup
Log file is /home/htb-student/.vnc/linux:1.log

Use xtigervncviewer -SecurityTypes VncAuth -passwd /home/htb-student/.vnc/passwd :1 to connect to the VNC server.

### list sessions
htb-student@ubuntu:~$ vncserver -list

TigerVNC server sessions:

X DISPLAY #     RFB PORT #      PROCESS ID
:1              5901            79746

### setting up an ssh tunnel
d41y@htb[/htb]$ ssh -L 5901:127.0.0.1:5901 -N -f -l htb-student 10.129.14.130

htb-student@10.129.14.130''s password: *******

### connecting to the vnc server
d41y@htb[/htb]$ xtightvncviewer localhost:5901

Connected to RFB server, using protocol version 3.8
Performing standard VNC authentication

Password: ******

Authentication successful
Desktop name "linux:1 (htb-student)"
VNC server default format:
  32 bits per pixel.
  Least significant byte first in each pixel.
  True colour: max red 255 green 255 blue 255, shift red 16 green 8 blue 0
Using default colormap which is TrueColor.  Pixel format:
  32 bits per pixel.
  Least significant byte first in each pixel.
  True colour: max red 255 green 255 blue 255, shift red 16 green 8 blue 0
Same machine: preferring raw encoding
```

## Hardening

### Security

One of the Linux OS's most important security measures is keeping the OS and installed packages up to date:

```bash
d41y@htb[/htb]$ apt update && apt dist-upgrade
```

Moreover, you can use:

- ```iptables```
  - for firewall rules
- ```sudoers```
  - to (un)set privileges
- ```fail2ban```
  - for handling high amounts of failed logins
- ...

#### TCP Wrappers

... are a security mechanism used in Linux system that allow the system admins to control which services are allowed access to the system. It works by restricting access to certain services based on the hostname or IP address of the user requesting access. When a client attempts to connect to a service the system will first consult the rules defined in the TCP wrappers configuration files to determine the IP address of the client. If the IP address matches the criteria specified in the configuration files, the system will then grant the client access to the service. However, if the criteria are not met, the connection will be denied, providing an additional layer of security for the service. TCP wrappers use the following configuration files:

- ```/etc/hosts.allow```
- ```/etc/hosts.deny```

In short, the ```/etc/hosts.allow``` file specifies which services and hosts are allowed to the system, whereas the ```/etc/hosts.deny``` file specifies which services and hosts are not allowed access. These files can be configured by adding specific rules to the files.

```bash
### /etc/hosts.allow
d41y@htb[/htb]$ cat /etc/hosts.allow

# Allow access to SSH from the local network
sshd : 10.129.14.0/24

# Allow access to FTP from a specific host
ftpd : 10.129.14.10

# Allow access to Telnet from any host in the inlanefreight.local domain
telnetd : .inlanefreight.local

### /etc/hosts.deny
d41y@htb[/htb]$ cat /etc/hosts.deny

# Deny access to all services from any host in the inlanefreight.com domain
ALL : .inlanefreight.com

# Deny access to SSH from a specific host
sshd : 10.129.22.22

# Deny access to FTP from hosts with IP addresses in the range of 10.129.22.0 to 10.129.22.255
ftpd : 10.129.22.0/24
```

### Firewall Setup

The primary goal of firewalls is to provide a security mechanism for controlling and monitoring network traffic between different network segments, such as internal and external networks or different network zones. Firewalls play a crucial role in protecting computer networks from unauthorized access, malicious traffic, and other security threats. Linux provides built-in firewall capabilities that can be used to control network traffic.

#### iptables

... provides a flexible set of rules for filtering network traffic based on various criteria such as source and destination IP address, port numbers, protocols, and more.

The main components of iptables are:

| Component | Description |
| --------- | ----------- |
| Tables | ... are used to organize and categorize firewall rules |
| Chains | ... are used to group a set of firewall rules applied to a specific type of network traffic |
| Rules | ... define the criteria for filtering network traffic and the actions to take for packets that match the criteria |
| Matches | are used to match specific criteria for filtering network traffic, such as source or destination IP addresses, ports, protocols, and more |
| Targets | ... specify the action for packets that match a specific rule |

##### Tables

When working with firewalls on Linux systems, it is important to understand how tables work in iptables. Tables in iptables are used to categorize and organize firewall rules based on the type of traffic that they are designed to handle. Each table is responsible for performing a specific set of tasks.

| Table Name | Description | Built-In Chains |
| ---------- | ----------- | --------------- |
| filter | used to filter network traffic based on IP addresses, ports, and protocols | INPUT, OUTPUT, FORWARD |
| nat | used to modify the source or destination IP addresses of network packets | PREROUTING, POSTROUTING |
| mangle | used to modify the header fields of network packets | PREROUTING, OUTPUT, INPUT, FORWARD, POSTROUTING |

In addition to the built-in tables, iptables provides a fourth table called the raw table, which is used to configure special packet processing options. The raw table contains two built-in chains: PREROUTING, and OUTPUT.

##### Chains

In iptabels, chains organize rules that define how network traffic should be filtered or modified. There are two types of chains in iptables:

- Built-in chains
- User-defined chains

The built-in chains are pre-defined and automatically created when a table is created. Each table has a different set of built-in chains.

User-defined chains can simplify rule management by grouping firewall rules based on specific criteria, such as source IP address, destination port, or protocol. They can be added to any of the three main tables. For example, if an organization has multiple web servers that all require similar firewall rules, the rules for each server could be grouped in a user-defined chain.

##### Rules and Targets

Iptables rules are used to define the criteria for filtering network traffic and the actions to take for packets that match the criteria. Rules are added to chains using the ```-A``` option followed by the chain name, and they can be modified or deleted using various other options.

Each rule consists of a set of criteria or matches and a target specifying the action for packets that match the criteria. The criteria or matches match specific fields in the IP header, such as the source or destination IP address, protocol, source, destination port number, and more. The target specifies the action for packets that match the criteria. They specify the action to take for packets that match a specific rule. For example, targets can accept, drop, reject, or modify the packets. Some of the common targets used in iptables rules include the following:

| Target Name | Description |
| ----------- | ----------- |
| ACCEPT | allows the packet to pass through the firewall and continue to its destination |
| DROP | drops the packet, effectively blocking it from passing through the firewall |
| REJECT | drops the packet and sends an error message back to the source address, notifying them that the packet was blocked |
| LOG | logs the packet information to the system log |
| SNAT | modifies the source IP address of the packet, typically used for NAT to translate private IP addresses to puclic IP addresses |
| DNAT | modifies the destinatio IP address of the packet, typically used for NAT to forward traffic from one IP address to another |
| MASQUERADE | similar to SNAT but used when the source IP address is not fixed, such as in a dynamic IP address scenario |
| REDIRECT | redirects packets to another port or IP address |
| MARK | adds or modifies the Netfilter mark value of the packet, which can be used for advanced routing or other purposes |

Example:

```bash
d41y@htb[/htb]$ sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
# allows incoming TCP traffic on port 22 to be accepted
```

##### Matches

... are used to specify the criteria that determine whether a firewall rule should be applied to a particular packet or connection. Matches are used to match specific characteristics of network traffic, such as the source or destination IP address, protocol, port number, and more.

| Match Name | Description |
| ---------- | ----------- |
| ```-p``` / ```--protocol``` | specifies the protocol to match |
| ```--dport``` | specifies the destination port to match |
| ```--sport``` | specifies the source port to match |
| ```-s``` / ```--source``` | specifies the source IP address to match |
| ```-d``` / ```--destination``` | specifies the destination IP address to match |
| ```-m state``` | matches the state of a connection |
| ```-m multiport``` | machtes multiple ports or port ranges |
| ```-m tcp``` | matches TCP packets and includes additional TCP-specific options |
| ```-m udp``` | matches UDP packets and includes additional UDP-specific options |
| ```-m string``` | matches packets that contain a specific string |
| ```-m limit``` | matches packets at a specified rate limit |
| ```-m conntrack``` | matches packets based on their connection tracking information |
| ```-m mark``` | matches packets based on their Netfilter mark value |
| ```-m mac``` | matches packets based on their MAC address |
| ```-m iprange``` | matches packets based on a range of IP addresses |

Example:

```bash
d41y@htb[/htb]$ sudo iptables -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
# adds a rule to the INPUT chain in the filter table that matches incoming TCP traffic on port 80
```

### System Logs


... on Linux are a set of files that contain information about the system and the activities taking place on it. These logs are important for monitoring and troubleshooting the system, as they can provide insights into system behavior, application security, and security events. These system logs can be a valuable source of information for identifying potential security weaknesses and vulnerabilities within a Linux system as well. By analyzing the logs on your target systems, you can gain insights into the system's behavior, network activity, and user activity and can use this information to identify any abnormal activity, such as unauthorized logins, attempted attacks, clear text credentials, or unusual file access, which could indicate a potential security breach.

As pentesters, you can also use system logs to monitor the effectiveness of your security testing activities. By reviewing the logs after performing security testing, you can determine if your activities triggered any security events, such as intrusion detection alerts or system warnings. This information can help you refine your testing strategies and improve overall security of the system.

In order to ensure the security of a Linux system, it is important to configure system logs properly. This includes setting the appropriate log levels, configuring log rotation to prevent log files from becoming too large, and ensuring that the logs are stored securely and protected from unauthorized access. In addition, it is important to regularly review and analyze the logs to identify potential security risks and respond to any security events in a timely manner. There are several different types of system logs on Linux:

- Kernel logs
- System logs
- Authentication logs
- Application logs
- Security logs

#### Kernel Logs

... contain information about the system's kernel, including hardware drivers, system calls, and kernel events. They are stored in ```/var/log/kern.log```. They can also provide insights into system crashes, resource limitations, and other events that could lead to a denial of service or other security issues. In addition, kernel logs can help you identify suspicious system calls or other activities that could indicate the presence of malware or other malicious software on the system. By monitoring this file, you can detect any unusual behavior and take appropriate action to prevent further damage to the system.

#### System Logs

... contain information about system-level events, such as service starts and stops, login attempts, and system reboots. They are stored in the ```/var/log/syslog``` file. By analyzing login attempts, service starts and stops, and other system-level events, you can detect any possible access or activities on the system. This can help you identify any vulnerabilities that could be exploited and help you recommend security measures to mitigate these risks. In addition, you can use the ```syslog``` to identify potential issues that could impact the availability or performance of the system, such as failed service starts or system reboots.

Example:

```bash
Feb 28 2023 15:00:01 server CRON[2715]: (root) CMD (/usr/local/bin/backup.sh)
Feb 28 2023 15:04:22 server sshd[3010]: Failed password for htb-student from 10.14.15.2 port 50223 ssh2
Feb 28 2023 15:05:02 server kernel: [  138.303596] ata3.00: exception Emask 0x0 SAct 0x0 SErr 0x0 action 0x6 frozen
Feb 28 2023 15:06:43 server apache2[2904]: 127.0.0.1 - - [28/Feb/2023:15:06:43 +0000] "GET /index.html HTTP/1.1" 200 13484 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
Feb 28 2023 15:07:19 server sshd[3010]: Accepted password for htb-student from 10.14.15.2 port 50223 ssh2
Feb 28 2023 15:09:54 server kernel: [  367.543975] EXT4-fs (sda1): re-mounted. Opts: errors=remount-ro
Feb 28 2023 15:12:07 server systemd[1]: Started Clean PHP session files.
```

#### Authentication Logs

... contain information about user authentication attempts, including successful and failes attempts. They are stored in the ```/var/log/auth.log``` file. It is important to note that while the ```/var/log/syslog``` file may contain similar login information, the ```/var/log/auth.log``` file specifically focuses on user authentication attempts, making it a more valuable resource for identifying potential security threats. Therefore, it is essential for penetration testers to review the logs stored in the ```/var/log/auth.log``` file to ensure that the system is secure and has not been compromised.

Example:

```bash
Feb 28 2023 18:15:01 sshd[5678]: Accepted publickey for admin from 10.14.15.2 port 43210 ssh2: RSA SHA256:+KjEzN2cVhIW/5uJpVX9n5OB5zVJ92FtCZxVzzcKjw
Feb 28 2023 18:15:03 sudo:   admin : TTY=pts/1 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/bash
Feb 28 2023 18:15:05 sudo:   admin : TTY=pts/1 ; PWD=/home/admin ; USER=root ; COMMAND=/usr/bin/apt-get install netcat-traditional
Feb 28 2023 18:15:08 sshd[5678]: Disconnected from 10.14.15.2 port 43210 [preauth]
Feb 28 2023 18:15:12 kernel: [  778.941871] firewall: unexpected traffic allowed on port 22
Feb 28 2023 18:15:15 auditd[9876]: Audit daemon started successfully
Feb 28 2023 18:15:18 systemd-logind[1234]: New session 4321 of user admin.
Feb 28 2023 18:15:21 CRON[2345]: pam_unix(cron:session): session opened for user root by (uid=0)
Feb 28 2023 18:15:24 CRON[2345]: pam_unix(cron:session): session closed for user root
```

#### Application Logs

... contain information about the activities of specific applications running on the system. They are often stored in their own files. These logs are particularly important when you are targeting specific applications, such as web servers or databases, as they can provide insights into how these apps are processing and handling data. By examining these logs, you can identify potential vulnerabilities or misconfigurations. These logs can be used to identify unauthorized login attempts, data exfiltration, or other suspicious activity.

Besides, access and audit logs are critical logs that record information about the actions of users and processes on the system. They are crucial for security and compliance purposes, and you can use them to identify potential security issues and attack vectors.

Example:

```bash
2023-03-07T10:15:23+00:00 servername privileged.sh: htb-student accessed /root/hidden/api-keys.txt
```

#### Security Logs

... are often recorded in a variety of log files, depending on the specific security application or tool in use. As pentesters, you can use log analysis tools and techniques to search for specific events or patterns of activity that may indicate a security issue and use that information to further test the system for vulnerabilities or potential attack vectors.

It is important to be familiar with the default locations for access logs and other log files on the Linux system, as this information can be useful when performing a security assessment or penetration test. By understanding how security related events are recorded and stored, you can more effectively analyze log data and identify potential security issues.

## Distros

### Solaris

... is a Unix-based OS developed by Sun Microsystems in the 1990s. It is known for its robustness, scalability, and support for high-end hardware and software systems. Solaris is widely used in enterprise environments for mission-critical applications, such as database management, cloud computing, and virtualization. Overall, it is designed to handle large amounts of data and provide reliable and secure services to users and is often used in enterprise environments where security, performance, and stability are key requirements.

#### Differences to other Linux Distros

- proprietary OS; source code not available to the general public
- uses a Service Management Facility (_SMF_), which is a highly advanced service management framework that provides better reliability and availability for system services
- has a number of unique features
  - support for high-end hardware and software systems
  - designed to work with large-scale data centers and complex network infrastructures
  - can handle large amounts of data without any performance issues
- uses the Image Packaging System (_IPS_)
- provides advanced security features, such as Role-Based Access Control and mandatory access controls

#### Command Examples

##### System Information

```bash
# uname -a 
$ showrev -a

Hostname: solaris
Kernel architecture: sun4u
OS version: Solaris 10 8/07 s10s_u4wos_12b SPARC
Application architecture: sparc
Hardware provider: Sun_Microsystems
Domain: sun.com
Kernel version: SunOS 5.10 Generic_139555-08
```

##### Installing Packages

```bash
# sudo apt-get install
$ pkgadd -d SUNWapchr
```

##### Permission Management

```bash
# find / -perm 4000
$ find / -perm -4000
```

##### NFS

```bash
$ share -F nfs -o rw /export/home

# cat /etc/dfs/dfstab

share -F nfs -o rw /export/home
```

##### Process Mapping

```bash
# lists all files opened by the Apache web server process
$ pfiles `pgrep httpd`
```

##### Executable Access

```bash
# d41y@htb[/htb]$ sudo strace
$ truss ls
# shows the system calls made by the ls command

execve("/usr/bin/ls", 0xFFBFFDC4, 0xFFBFFDC8)  argc = 1
...SNIP...
```