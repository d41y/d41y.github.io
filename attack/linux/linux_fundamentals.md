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

