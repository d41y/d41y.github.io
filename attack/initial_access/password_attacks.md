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

by default, John uses predefined incremental modes specified in its config file (```john.conf```), which define character sets and password lengths. You can customize these or define your own to target passwords that use special characters or specific patterns.

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