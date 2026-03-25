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

