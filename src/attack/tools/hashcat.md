# Cracking Passwords with Hashcat

## Intro

### Hashing vs. Encryption

#### Hashing

... is the process of converting some text to a string, which is unique to that particular text. Usually, a hash function always returns hashes with the same lenght irrespective of the type, lenght, or size of data. Hashing is a one-way process, meaning there is no way of reconstructing the original plaintext from a hash. Hashing can be used for various purposes. Some hash functions can be keyed - one such example is HMAC, which acts as a checksum to verify if a particular message was tampered with during transmission.

As hashing is a one-way process, the only way to attack it is to use a list containing possible passwords. Each password from this list is hashed and compared to the original hash.

One protection employed against the brute-forcing of hashed is "salting". A salt is a random piece of data added to the plaintext before hashing it. This increases the computation time but does not prevent brute force altogether.

Consider the plaintext password value "p@ssw0rd". The MD5 hash for this can be calculated as follows:

```bash
d41y@htb[/htb]$ echo -n "p@ssw0rd" | md5sum

0f359740bd1cda994f8b55330c86d845
```

Now, suppose a random salt such as "123456" is introduced and appended to the plaintext.

```bash
d41y@htb[/htb]$ echo -n "p@ssw0rd123456" | md5sum

f64c413ca36f5cfe643ddbec4f7d92d0
```

A completely new hash was generated using this method, which will not be present in any pre-computed list. An attacker trying to crack this hash will have to sacrifice extra time to append this salt before calculating the hash.

Some hash functions such as MD5 have also been vulnerable to collisions, where two sets of plaintext can produce the same hash.

#### Encryption

... is the process of converting data into a format in which the original content is not accessible. Unlike hashing, encryption is reversible. Encryption algorithms are of two types: Symmetric and Asymmetric.

##### Symmetric Encryption

Symmetric algorithms use a key or secret to encrypt the data and use the same key to decrypt it. A basic example of symmetric encryption is XOR.

```bash
d41y@htb[/htb]$ python3

Python 3.8.3 (default, May 14 2020, 11:03:12) 
[GCC 9.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> from pwn import xor
>>> xor("p@ssw0rd", "secret")
b'\x03%\x10\x01\x12D\x01\x01'
```

Anyone who has the key can decrypt the ciphertext and obtain the plaintext.

```bash
d41y@htb[/htb]$ python3

Python 3.8.3 (default, May 14 2020, 11:03:12) 
[GCC 9.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> from pwn import xor
>>> xor('\x03%\x10\x01\x12D\x01\x01', "secret")
b'p@ssw0rd'
```

##### Asymmetric Encryption

On the other hand, asymmetric algorithms divide the key into two parts. The public key can be given to anyone who wishes to encrypt some information and pass it securely to the owner. The owner then uses their private key to decrypt the content.

One of the prominent uses of asymmetric encryption is the HTTPS protocol in the form of SSL. When a client connects to a server hosting an HTTPS website, a public key exchange occurs. The client's browser uses this public key to encrypt any kind of data sent to the server. The server decrypts the incoming traffic before passing it on to the processing device.

### Identifying Hashes

Most hashing algorithms produce hashes of a constant length. The length of a particular hash can be used to map it to the algorithm it was hashed with.

Sometimes, hashes are stored in certain formats. For example, `hash:salt` or `$id$salt$hash`.

The hash `2fc5a684737ce1bf7b3b239df432416e0dd07357:2014` is a SHA1 hash with the salt of `2014`.

The hash `$6$vb1tLY1qiY$M.1ZCqKtJBxBtZm1gRi8Bbkn39KU0YJW1cuMFzTRANcNKFKR4RmAQVk4rqQQCkaJT6wXqjUkFcA/qNxLyqW.U/` contains three fields delimited by `$`, where the first field is the `id`. This is used to identify the type of algorithm used for hashing. The following list contains some ids and their corresponding algorithms.

```
$1$  : MD5
$2a$ : Blowfish
$2y$ : Blowfish, with correct handling of 8 bit characters
$5$  : SHA256
$6$  : SHA512
```

The next field, `vb1tLY1qiY`, is the salt used during hashing, and the final field is the actual hash.

Open and closed source software use many different kinds of hash formats. For example, the Apache web server stores its hashes in the format `$apr1$71850310$gh9m4xcAn3MGxogwX/ztb.`, while WordPress stores hashes in the form `$P$984478476IagS59wHZvyQMArzfx58u.`.

#### Hashid

... is a Python tool, which can be used to detect various kinds of hashes.

Hashes can be supplied as command-line arguments or using a file.

```bash
d41y@htb[/htb]$ hashid '$apr1$71850310$gh9m4xcAn3MGxogwX/ztb.'

Analyzing '$apr1$71850310$gh9m4xcAn3MGxogwX/ztb.'
[+] MD5(APR) 
[+] Apache MD5
```

```bash
d41y@htb[/htb]$ hashid hashes.txt 

--File 'hashes.txt'--
Analyzing '2fc5a684737ce1bf7b3b239df432416e0dd07357:2014'
[+] SHA-1 
[+] Double SHA-1 
[+] RIPEMD-160 
[+] Haval-160 
[+] Tiger-160 
[+] HAS-160 
[+] LinkedIn 
[+] Skein-256(160) 
[+] Skein-512(160) 
[+] Redmine Project Management Web App 
[+] SMF ≥ v1.1 
Analyzing '$P$984478476IagS59wHZvyQMArzfx58u.'
[+] Wordpress ≥ v2.6.2 
[+] Joomla ≥ v2.5.18 
[+] PHPass' Portable Hash 
--End of file 'hashes.txt'--
```

If known, `hashid` can also provide the corresponding Hashcat hash mode with the `-m` flag if it is able to determine the hash type.

```bash
d41y@htb[/htb]$ hashid '$DCC2$10240#tom#e4e938d12fe5974dc42a90120bd9c90f' -m
Analyzing '$DCC2$10240#tom#e4e938d12fe5974dc42a90120bd9c90f'
[+] Domain Cached Credentials 2 [Hashcat Mode: 2100
```

> [!INFO]
> **CONTEXT MATTERS!**

### Hashcat Overview

Hashcat is a popular open-source password cracking tool.

```bash
d41y@htb[/htb]$ hashcat -h

hashcat (v6.1.1) starting...

Usage: hashcat [options]... hash|hashfile|hccapxfile [dictionary|mask|directory]...

- [ Options ] -

 Options Short / Long           | Type | Description                                          | Example
================================+======+======================================================+=======================
 -m, --hash-type                | Num  | Hash-type, see references below                      | -m 1000
 -a, --attack-mode              | Num  | Attack-mode, see references below                    | -a 3
 -V, --version                  |      | Print version                                        |
 -h, --help                     |      | Print help                                           |
     --quiet                    |      | Suppress output                                      |
     --hex-charset              |      | Assume charset is given in hex                       |
     --hex-salt                 |      | Assume salt is given in hex                          |
     --hex-wordlist             |      | Assume words in wordlist are given in hex            |
     --force                    |      | Ignore warnings                                      |
     --status                   |      | Enable automatic update of the status screen         |
     --status-json              |      | Enable JSON format for status output                 |
     --status-timer             | Num  | Sets seconds between status screen updates to X      | --status-timer=1
     --stdin-timeout-abort      | Num  | Abort if there is no input from stdin for X seconds  | --stdin-timeout-abort=300
     --machine-readable         |      | Display the status view in a machine-readable format |

<SNIP>
```

Hashcat supports the following attack modes:

- **0**: Straight
- **1**: Combination
- **3**: Brute-force
- **6**: Hybrid Wordlist + Mask
- **7**: Hybrid Mask + Wordlist

The hash type value is based on the algorithm of the hash to be cracked. A complete list of hash types and their corresponding examples can be found [here](https://hashcat.net/wiki/doku.php?id=example_hashes).

```bash
d41y@htb[/htb]$ hashcat --example-hashes | less

hashcat (v6.1.1) starting...

MODE: 0
TYPE: MD5
HASH: 8743b52063cd84097a65d1633f5c74f5
PASS: hashcat

MODE: 10
TYPE: md5($pass.$salt)
HASH: 3d83c8e717ff0e7ecfe187f088d69954:343141
PASS: hashcat

MODE: 11
TYPE: Joomla < 2.5.18
HASH: b78f863f2c67410c41e617f724e22f34:89384528665349271307465505333378
PASS: hashcat

MODE: 12
TYPE: PostgreSQL
HASH: 93a8cf6a7d43e3b5bcd2dc6abb3e02c6:27032153220030464358344758762807
PASS: hashcat

MODE: 20
TYPE: md5($salt.$pass)
HASH: 57ab8499d08c59a7211c77f557bf9425:4247
PASS: hashcat

<SNIP>
```

The benchmark test (_or performance test_) for a particular hash type can be performed using the `-b` flag.

```bash
d41y@htb[/htb]$ hashcat -b -m 0
hashcat (v6.1.1) starting in benchmark mode...

Benchmarking uses hand-optimized kernel code by default.
You can use it in your cracking session by setting the -O option.
Note: Using optimized kernel code limits the maximum supported password length.
To disable the optimized kernel code in benchmark mode, use the -w option.

OpenCL API (OpenCL 1.2 pocl 1.5, None+Asserts, LLVM 9.0.1, RELOC, SLEEF, DISTRO, POCL_DEBUG) - Platform #1 [The pocl project]
=============================================================================================================================
* Device #1: pthread-Intel(R) Core(TM) i7-5820K CPU @ 3.30GHz, 4377/4441 MB (2048 MB allocatable), 6MCU

Benchmark relevant options:
===========================
* --optimized-kernel-enable

Hashmode: 0 - MD5


Speed.#1.........:   449.4 MH/s (12.84ms) @ Accel:1024 Loops:1024 Thr:1 Vec:8

Started: Fri Aug 28 21:52:35 2020
Stopped: Fri Aug 28 21:53:25 2020
```

You can also run `hashcat -b` to run benchmarks for all hash modes.

Hashcat has two main ways to optimize speed:

- **Optimized Kernels**: This is the `-O` flag, which, according to the documentation, means `Enable optimized kernels (limits password length)`. The magical password length number is generally 32, with most wordlists won't even hit that number. This can take the estimated time from days to hours, so it is always recommended to run with `-O` first and then rerun after without the `-O` if your GPU is idle.
- **Workload**: This is the `-w` flag, which, according to the documentation, means `Enable a specific workload profile`. The default number is 2, but if you want to use your computer while Hashcat is running, set this to 1. If you plan on the computer only running Hashcat, this can be set to 3.

## Attack Types

### Dictionary Attack

This attack reads from a wordlist and tries to crack the supplied hashes. Dictionary attacks are useful if you know that the target organization uses weak passwords or just wants to run through some cracking attempts rather quickly. Its basic syntax is:

```bash
d41y@htb[/htb]$ hashcat -a 0 -m <hash type> <hash file> <wordlist>
```

For example, the following commands will crack a SHA256 hash using the rockyou.txt wordlist.

```bash
d41y@htb[/htb]$ echo -n '!academy' | sha256sum | cut -f1 -d' ' > sha256_hash_example
d41y@htb[/htb]$ hashcat -a 0 -m 1400 sha256_hash_example /opt/useful/seclists/Passwords/Leaked-Databases/rockyou.txt

hashcat (v6.1.1) starting...

<SNIP>

Dictionary cache built:
* Filename..: /opt/useful/seclists/Passwords/Leaked-Databases/rockyou.txt
* Passwords.: 14344392
* Bytes.....: 139921507
* Keyspace..: 14344385
* Runtime...: 2 secs

Approaching final keyspace - workload adjusted.  

006fc3a9613f3edd9f97f8e8a8eff3b899a2d89e1aabf33d7cc04fe0728b0fe6:!academy
                                                 
Session..........: hashcat
Status...........: Cracked
Hash.Name........: SHA2-256
Hash.Target......: 006fc3a9613f3edd9f97f8e8a8eff3b899a2d89e1aabf33d7cc...8b0fe6
Time.Started.....: Fri Aug 28 21:58:44 2020 (4 secs)
Time.Estimated...: Fri Aug 28 21:58:48 2020 (0 secs)
Guess.Base.......: File (/opt/useful/seclists/Passwords/Leaked-Databases/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:  3383.5 kH/s (0.46ms) @ Accel:1024 Loops:1 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests
Progress.........: 14344385/14344385 (100.00%)
Rejected.........: 0/14344385 (0.00%)
Restore.Point....: 14340096/14344385 (99.97%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidates.#1....: $HEX[216361726f6c796e] -> $HEX[042a0337c2a156616d6f732103]

Started: Fri Aug 28 21:58:05 2020
Stopped: Fri Aug 28 21:58:49 2020
```

In the above example, the hash cracked in 4 seconds. Cracking speed varies depending on the underlying hardware, hash type, and complexity of the password.

### Combination Attacks

The combination attack modes take in two wordlists as input and create combinations from them. This attack is useful because it is not uncommon for users to join two or more words together, thinking that this creates a stronger password.

To demonstrate consider the following wordlists:

```bash
d41y@htb[/htb]$ cat wordlist1

super
world
secret

d41y@htb[/htb]$ cat wordlist2

hello
password
```

If given these two word lists Hashcat will produce exactly 3 x 2 = 6 words, such as the following:

```bash
d41y@htb[/htb]$ awk '(NR==FNR) { a[NR]=$0 } (NR != FNR) { for (i in a) { print $0 a[i] } }' file2 file1

superhello
superpassword
worldhello
wordpassword
secrethello
secretpassword
```

This can also be done with Hashcat using the `--stdout` flag which can be very helpful for debugging purposes and seeing how the tool is handling things.

The syntax for the combination attack is:

```bash
d41y@htb[/htb]$ hashcat -a 1 -m <hash type> <hash file> <wordlist1> <wordlist2>
```

See this example in practice:

```bash
d41y@htb[/htb]$ echo -n 'secretpassword' | md5sum | cut -f1 -d' '  > combination_md5

2034f6e32958647fdff75d265b455ebf
```

```bash
d41y@htb[/htb]$ hashcat -a 1 -m 0 combination_md5 wordlist1 wordlist2

hashcat (v6.1.1) starting...
<SNIP>

Dictionary cache hit:
* Filename..: wordlist1
* Passwords.: 3
* Bytes.....: 19
* Keyspace..: 6

The wordlist or mask that you are using is too small.
This means that hashcat cannot use the full parallel power of your device(s).
Unless you supply more work, your cracking speed will drop.
For tips on supplying more work, see: https://hashcat.net/faq/morework

Approaching final keyspace - workload adjusted.  

2034f6e32958647fdff75d265b455ebf:secretpassword  
                                                 
Session..........: hashcat
Status...........: Cracked
Hash.Name........: MD5
Hash.Target......: 2034f6e32958647fdff75d265b455ebf
Time.Started.....: Fri Aug 28 22:05:51 2020, (0 secs)
Time.Estimated...: Fri Aug 28 22:05:51 2020, (0 secs)
Guess.Base.......: File (wordlist1), Left Side
Guess.Mod........: File (wordlist2), Right Side
Speed.#1.........:       42 H/s (0.02ms) @ Accel:1024 Loops:2 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests
Progress.........: 6/6 (100.00%)
Rejected.........: 0/6 (0.00%)
Restore.Point....: 0/3 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-2 Iteration:0-2
Candidates.#1....: superhello -> secretpassword
```

### Mask Attack

Mask attacks are used to generate words matching a specific pattern. This type of attack is particularly useful when password length or format is known. A mask can be created using static characters, ranges of chars, or placeholders. The following list shows some important placeholders:

| Placeholder | Meaning                                             |
| ----------- | --------------------------------------------------- |
| `?l`        | lower-case ASCII letters (a-z)                      |
| `?u`        | upper-case ASCII letters (A-Z)                      |
| `?d`        | digits (0-9)                                        |
| `?h`        | 0123456789abcdef                                    |
| `?H`        | 0123456789ABCDEF                                    |
| `?s`        | special chars («space»!"#$%&'()*+,-./:;<=>?@[]^_\`{ |
| `?a`        | ?l?u?d?s                                            |
| `?b`        | 0x00 - 0xff                                         |

The above placeholders can be combined with options `-1` to `-4` which can be used for custom placeholders. See the _Custom charsets_ section [here](https://hashcat.net/wiki/doku.php?id=mask_attack) for a detailed breakdown of each of these four command-line parameters that can be used to configure four custom charsets.

Consider the company Inlane Freight, which this time has passwords with the scheme `ILFREIGHT<userid><year>`, where userid is 5 chars long. The mask `ILFREIGHT?l?l?l?l?l20[0-1]?d` can be used to crack passwords with the specified pattern, where `?l` is a letter and `20[0-1]?d` will include all years from 2000 to 2019.

An example:

```bash
d41y@htb[/htb]$ echo -n 'ILFREIGHTabcxy2015' | md5sum | tr -d " -" > md5_mask_example_hash
```

```bash
d41y@htb[/htb]$ hashcat -a 3 -m 0 md5_mask_example_hash -1 01 'ILFREIGHT?l?l?l?l?l20?1?d'

hashcat (v6.1.1) starting...
<SNIP>

d53ec4d0b37bbf565b1e09d64834e1ae:ILFREIGHTabcxy2015
                                                 
Session..........: hashcat
Status...........: Cracked
Hash.Name........: MD5
Hash.Target......: d53ec4d0b37bbf565b1e09d64834e1ae
Time.Started.....: Fri Aug 28 22:08:44 2020, (43 secs)
Time.Estimated...: Fri Aug 28 22:09:27 2020, (0 secs)
Guess.Mask.......: ILFREIGHT?l?l?l?l?l20?1?d [18]
Guess.Charset....: -1 01, -2 Undefined, -3 Undefined, -4 Undefined 
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:  3756.3 kH/s (0.36ms) @ Accel:1024 Loops:1 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests
Progress.........: 155222016/237627520 (65.32%)
Rejected.........: 0/155222016 (0.00%)
Restore.Point....: 155215872/237627520 (65.32%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidates.#1....: ILFREIGHTuisba2015 -> ILFREIGHTkmrff2015
```

The `-1` option was used to specify a placeholder with just 0 and 1. Hashcat could crack the hash in 43 seconds on CPU power. The `--increment` flag can be used to increment the mask length automatically, with a length limit that can be supplied using the `--increment-max` flag.

### Hybrid Mode

Hybrid mode is a variation of the combinator attack, wherein multiple modes can be used together for a fine-tuned wordlist creation. This mode can be used to perform very targeted attacks by creating very customized wordlists. It is particularly useful when you know or have a general idea of the organization's password policy or common password syntax. The attack mode for the hybrid attack is 6.

Consider a password such as `football1$`. The example below shows how a wordlist can be used in combination with a mask.

```bash
d41y@htb[/htb]$ echo -n 'football1$' | md5sum | tr -d " -" > hybrid_hash
```

Hashcat reads words from the wordlist and appends a unique string based on the mask supplied. In this case, the mask `?d?s` tells hashcat to append a digit and a special character at the end of each word in the rockyou.txt wordlist.

```bash
d41y@htb[/htb]$ hashcat -a 6 -m 0 hybrid_hash /opt/useful/seclists/Passwords/Leaked-Databases/rockyou.txt '?d?s'

hashcat (v6.1.1) starting...
<SNIP>

f7a4a94ff3a722bf500d60805e16b604:football1$      
                                                 
Session..........: hashcat
Status...........: Cracked
Hash.Name........: MD5
Hash.Target......: f7a4a94ff3a722bf500d60805e16b604
Time.Started.....: Fri Aug 28 22:11:15 2020, (0 secs)
Time.Estimated...: Fri Aug 28 22:11:15 2020, (0 secs)
Guess.Base.......: File (/opt/useful/seclists/Passwords/Leaked-Databases/rockyou.txt), Left Side
Guess.Mod........: Mask (?d?s) [2], Right Side
Guess.Queue.Base.: 1/1 (100.00%)
Guess.Queue.Mod..: 1/1 (100.00%)
Speed.#1.........:  5118.2 kH/s (11.56ms) @ Accel:768 Loops:82 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests
Progress.........: 755712/4733647050 (0.02%)
Rejected.........: 0/755712 (0.00%)
Restore.Point....: 0/14344385 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:82-164 Iteration:0-82
Candidates.#1....: 1234562= -> class083~
```

Attack mode 7 can be used to prepend chars to words using a given mask. The following example shows a mask using a custom character set to add a prefix to each word in the rockyou.txt wordlist. The custom char mask `20?1?d` with the custom char set `-1 01` will prepend various years to each word in the worlist.

```bash
d41y@htb[/htb]$ echo -n '2015football' | md5sum | tr -d " -" > hybrid_hash_prefix
```

```bash
d41y@htb[/htb]$ hashcat -a 7 -m 0 hybrid_hash_prefix -1 01 '20?1?d' /opt/useful/seclists/Passwords/Leaked-Databases/rockyou.txt

hashcat (v6.1.1) starting...
<SNIP> 

eac4fe196339e1b511278911cb77d453:2015football    
                                                 
Session..........: hashcat
Status...........: Cracked
Hash.Name........: MD5
Hash.Target......: eac4fe196339e1b511278911cb77d453
Time.Started.....: Thu Nov 12 01:32:34 2020 (0 secs)
Time.Estimated...: Thu Nov 12 01:32:34 2020 (0 secs)
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt), Right Side
Guess.Mod........: Mask (20?1?d) [4], Left Side
Guess.Charset....: -1 01, -2 Undefined, -3 Undefined, -4 Undefined
Speed.#1.........:     8420 H/s (0.22ms) @ Accel:384 Loops:64 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests
Progress.........: 1280/286887700 (0.00%)
Rejected.........: 0/1280 (0.00%)
Restore.Point....: 0/20 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-64 Iteration:0-64
Candidates.#1....: 2001123456 -> 2017charlie
```

## Wordlists

### Creating Custom Wordlists

