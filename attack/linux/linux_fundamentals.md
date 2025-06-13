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
      - [Linux Containers](#linux-containers)

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

#### Linux Containers