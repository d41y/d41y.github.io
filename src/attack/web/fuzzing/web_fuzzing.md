# Web Fuzzing

## Introduction

### Fuzzing vs. Brute-Forcing

- **Fuzzing** casts a wider net. It involves feeding the web application with unexpected inputs, including malformed data, invalid chars, and nonsensical combinations. The goal is to see how the application reacts to these strange inputs and uncover potential vulns in handling unexpected data. Fuzzing tools often leverage wordlists containing common patterns, mutations of existing parameters, or even random char sequences to generate a diverse set of payloads.
- **Brute-forcing**, on the other hand, is a more targeted approach. It focuses on systematically trying out many possibilities for a specific value, such as a password or an ID number. Brute-forcing tools typically rely on predefined lists or dictionaries to guess the correct value through trial and error.

### Why Fuzz Web Applications?

Web apps have become the backbone of modern business and communication, handling vast amounts of sensitive data and enabling critical online interactions. However, their complexity and interconnectedness also make them prime targets for cyberattacks. Manual testing, while essential, can only go so far in identifying vulns. Here's where web fuzzing shines:

- **Uncovering Hidden Vulns**: Fuzzing can uncover vulns that traditional security testing methods might miss. By bombarding a web application with unexpected and invalid inputs, fuzzing can trigger unexpected behaviors that reveal hidden flaws in the code.
- **Automating Security Testing**: Fuzzing automates generating and sending test inputs, saving valuable time and resources. This allows security teams to focus on analyzing results and addressing the vulns found.
- **Simulating Real-World Attacks**: Fuzzers can mimic attacker's techniques, helping you identify weaknesses before malicious actors exploit them. This proactive approach can significantly reduce the risk of a successful attack.
- **Strengthening Inut Validation**: Fuzzing helps identify weaknesses in input validation mechanisms, which are crucial for preventing common vulns like SQLi and XSS.
- **Improving Code Quality**: Fuzzing improves overall code quality by uncovering bugs and errors. Devs can use the feedback from fuzzing to write more robust and secure code.
- **Continuous Security**: Fuzzing can be integrated into the software development lifecycle as part of continuous integration and continuous deployment pipelines (_CI/CD_), ensuring that security testing is performed regularly and vulns are caugth early in the development process.

### Essential Concepts

| Concept | Description | Example |
| ------- | ----------- | ------- |
| Wordlist | A dictionary or list of words, phrases, file, names, directory names, or parameter value used as input during fuzzing | admin, logon, password, backup, config |
| Payload | The actual data sent to the web app during fuzzing. Can be a simple string, numerical value, or complex data structure. | `' OR 1=1 --` |
| Response Analysis | Examining the web app's responses to the fuzzer's payloads to identify anomalies that might indicate vulns. | 200 OK, 500 Internal Server Error |
| Fuzzer | A software tool that automates generating and sending payloads to a web app and analyzing the responses. | ffuf, wfuzz, Burp |
| False Positive | A result that is incorrectly identified as a vuln by the fuzzer. | A 404 Not Found error for a non-existent directory. |
| False Negative | A vuln that exists in the web application but is not detected by the fuzzer. | A subtle logic flaw in a payment processing function. |
| Fuzzing Scope | The specific parts of the web application that you are targeting with your fuzzing efforts. | Only fuzzing the login page or focusing on a particular API endpoint. |

### Tooling

#### Ffuf

FFUF is a fast web fuzzer written in Go. It excels at quickly enumerating directories, files, and parameters within web applications. Its flexibility, speed, and ease of use make it a favorite among security professionals and enthusiasts.

Use cases are: directory and file enumeration, parameter discovery, brute-force attack.

#### Gobuster

Gobuster is another popular web directory and file fuzzer. It's known for its speed and simlicity, making it a great choice for beginners and experienced users alike.

Use cases are: content discovery, DNS subdomain enumeration, WordPress content detection.

#### FeroxBuster

FeroxBuster is a fast, recursive content discovery tool written in Rust. It's designed for brute-force discovery of unlinked content in web applications, making it particularly useful for identifying hidden directories and files. It's more of a "forced browsing" tool than a fuzzer like ffuf.

Use cases are: recursive scanning, unlinked content discovery, high-performance scans.

#### wfuzz/wenum

wenum is an actively maintained fork of wfuzz, a highly versatile and powerful command-line fuzzing tool known for its flexibility and customization options. It's particularly well-suited for parameter fuzzing, allowing you to test a wide range of input values against web apps and uncover potential vulns in how they process those parameters.

If you are using a pentesting Linux distro like Kali, wfuzz may already be pre-installed, allowing you to use it right away if desired. However, there are currently complications when installing wfuzz, so you can substitute it with wenum instead. The commands are interchangeable, and they follow the same syntax, so you can simply replace wenum commands with wfuzz if necessary.

Use cases are: directory and file enumeration, parameter discovery, brute-force attack.

## Directory and File Fuzzing

Web apps often have directories and files that are not directly linked or visible to users. These hidden resources may contain sensitive information, backup files, or even old, vulnerable application versions. Directory and file fuzzing aims to uncover these hidden assets, providing attackers with potential entry points or valuable information for further exploitation.

### Uncovering Hidden Assets

Web apps often house a treasure trove of hidden resources - directories, files, and enpoints that aren't readily accessible through the main interface. These concealed areas might hold valuable information for attackers, including:

- **Sensitive data**: Backup files, config settings, or logs containing user credentials or other confidential information.
- **Outdated content**: Older versions of files or scripts that may be vulnerable to known exploits.
- **Development resources**: Test environments, staging sites, or administrative panels that could be leveraged for further attacks.
- **Hidden functionalities**: Undocumented features or endpoints that could expose unexpected vulnerabilities.

Discovering these hidden assets is crucial for security researches and pentesters. It provides a deeper understanding of a web application's attack surface and potential vulns.

### The Importance of Finding Hidden Assets

Uncovering these hidden gems is far from trivial. Each discovery contributes to a complete picture of the web application's structure and functionality, essential for a thorough security assessment. These hidden areas often lack the robust security measures found in public-facing components, making them prime targets for exploitation. By proactively identifying these vulnerabilities, you can stay one step ahead of malicious actors.

Even if a hidden asset doesn't immediately reveal a vuln, the information gleaned can prove invaluable in the later stages of a pentest. This could include anyting from understanding the underlying technology stack to discovering sensitive data that can be used for further attacks.

Directory and file fuzzing are among the most effective methods for uncovering these hidden assets. This involves systematically probing the web app with a list of potential directory and file names and analyzing the server's responses to identify valid resources.

### Wordlists

