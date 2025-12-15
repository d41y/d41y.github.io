# Password Attacks Fundamentals

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

## Password Management

### Password Policy

A password policy is a set of rules designed to enhance computer security by encouraging users to create strong passwords and use them appropriately according to the organization's standard. The scope of a password policy extends beyond minimum password requirements to encompass the entire password lifecycle.

#### Policy Standards

Due to compliance requirements and best practices, many companies follow established IT security standards. While adhering to these standards does not guarantee complete security, it is a widely accepted industry practice that defines a baseline for security controls with an organization. However, compliance alone should not be the sole measure of an organization's security controls.

Some security standards include sections on password policies or guidelines. Here are few of the most common:

- NIST SP800-63B
- CIS Password Policy Guide
- PCI DSS

These standards offer different perspectives on password security. You can study them to help shape your own password policy.

#### Sample Password Policy

To illustrate important considerations, here is a sample password policy. It requires that all passwords:

- minimum of 8 chars
- include uppercase and lowercase letters
- include at least one number
- include at least one special char
- it should not be the username
- it should be changed every 60 days

#### Enforcing Password Policy

A password policy is a set of guidelines for how passwords should be created, managed, and stored within an organization. To implement this policy effectively, it must be enforced using the technology at your disposal or by acquiring the necessary tools. Most apps and identity management systems offer features to support the enforcement of such policies.

For instance, if you use AD for authentication, you can configure an AD Password Policy GPO to ensure users comply with your policy.

Once the technical aspect is covered, the policy must be communicated to the rest ot the company. Subsequently, processes and procedures should be created to guarantee that the password policy is applied everywhere.

#### Creating a Strong Password

Creating a strong password doesn't have to be be difficult. Tools like [PasswordMonster](https://www.passwordmonster.com/) help evaluate the strength of passwords, while [1Password Password Generator](https://1password.com/password-generator/) can generate securen ones.

### Password Managers

A password manager is an app that securely stores passwords and sensitive information in an encrypted database. In addition to keeping data safe, password managers offer features such as password generation, two-factor authentication support, secure from filling, browser integration, multi-device synchronization, security alerts, and more.

#### How does it work?

The implementation of password managers varies by provider, but most operate using a master password to encrypt the password database.

The encryption and authentication rely on cryptographic hash functions and key derivation functions to prevent unauthorized access to the encrypted database and its content. The specific mechanisms used depend on the provider and whether the password manager is cloud-based or locally stored.

#### Cloud Password Managers

One of the key considerations when choosing a password manager is convenience. The average person owns three or four devices and uses them to log into different websites and applications. A cloud-based password manager allows users to synchronize their encrypted password database across multiple devices. Most of them provide:

- a mobile app
- a browser add-on
- some other features

Each password manager vendor implements security in their own way, and usually provide a technical document detailing how their system works.

A common implementation for cloud password manager involve deriving encryption keys from the master password. This approach supports Zero-Knowledge Encryption, which ensures that no one, not even the service provider, can access your secured data. To illustrate this, examine Bitwarden's approach to password derivation:

- **Master key**: Derived from the master password using a key derivation function.
- **Master password hash**: Generated using the master password to authenticate the user to the cloud service.
- **Decryption key**: Created using the master key to form a symmetric key, which is then used to decrypt vault items.

#### Local Password Managers

Local password managers use encryption methods similar to those of cloud-based implementations. The most notable difference lies in data transmission and authenticate. To encrypt the database, local password managers focus on securing the database stored on the local system, using various cryptographic hash functions. They also employ key derivation functions with random salt to prevent precomputed keys and to hinder dictionary and guessing attacks. Some offer additional protections such as memory protection and keylogger resistance, using a secure desktop environment similar to Windows User Account Control (_UAC_).

Some of the most widely used local password managers are:

- KeePass
- KWalletManager
- Pleasant Password Server
- Password Safe

#### Alternatives

By default, most OS and apps are built around password based authentication. However, administrators can adopt third-party identity providers or apps to enhance identity protection. Some of the most common alternatives include:

- MFA
- FID002
- One-Time Passwords
- Time-Based One-Time Passwords
- IP restrictions
- Device compliance enforcement via tools like Microsoft Endpoint Manager or Workspace ONE

#### Going Passwordless

Many companies - including Microsoft, Auth0, Okta, and Ping Identity - are advocating for a passwordless future. This strategy aims to remove passwords as an authentication method altogether.

Passwordless authentication is achieved when an authentication factor other than a password is used. A password is a knowledge factor, meaning it's something a user knows. The problem with relying on a knowledge factor alone is that it's vulnerable to theft, sharing, repeat use, misuse, and other risks. Passwordless authentication ultimately means no more passwords. Instead, it relies on a possession factor or an inherent factor to verify user identity with greater assurance.

As new technology and standards evolve, you need to investigate and understand the details of their implementations to determine whether those alternatives will provide the security you need for the authentication process.