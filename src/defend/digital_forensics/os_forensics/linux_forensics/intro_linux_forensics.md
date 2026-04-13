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

