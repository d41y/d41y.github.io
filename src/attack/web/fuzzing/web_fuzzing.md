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

Wordlists are the lifeblood of directory and file fuzzing. They provide the potential directory and file names your chosen tool will use to probe the web application. Effective wordlists can significantly increase your chances of discovering hidden assets.

Wordlists are typically compiled from various sources. This often includes scraping the web for common directly and file names, analyzing publicly available data breaches, and extracting directory information from known vulns. These wordlists are then meticulously curated, removing duplicates and irrelevant entries to ensure optimal efficiency and effectiveness during fuzzing operations. The goal is to create a comprehensive list of potential directories and file names that will likely be found on web servers, allowing you to thoroughly probe a target application for hidden assets.

One of the most comprehensive and widely-used collections of wordlists is SecLists. This open-source project on GitHub provides a vast repository for various security testing purposes, including directory and file fuzzing.

### Directory Fuzzing

Directory fuzzing helps you discover hidden directories on the web server.

```bash
d41y@htb[/htb]$ ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -u http://IP:PORT/FUZZ


        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : http://IP:PORT/FUZZ
 :: Wordlist         : FUZZ: /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200-399
________________________________________________

[...]

w2ksvrus                [Status: 301, Size: 0, Words: 1, Lines: 1, Duration: 0ms]
:: Progress: [220559/220559] :: Job [1/1] :: 100000 req/sec :: Duration: [0:00:03] :: Errors: 0 ::
```

- `-w`: Specifies the path to the wordlist you want to use. In this case, you're using a medium-sized directory list from SecLists.
- `-u`: Specifies the base URL to fuzz. The `FUZZ` keyword acts as a placeholder where the fuzzer will insert words from the wordlist.

### File Fuzzing

While directory fuzzing focuses on finding folders, file fuzzing dives deeper into discovering specific files within those directories or even in the root of the web application. Web apps use various file types to serve content and perform different functions. Some common file extensions include:

- `.php`: Files containing PHP code, a popular server-side scripting language.
- `.html`: Files that define the structure and content of web pages.
- `.txt`: Plain text files, often storing simple information or logs.
- `.bak`: Backup files are created to preserve previous versions of files in case of errors or modifications.
- `.js`: Files containing JS code add interactivity and dynamic functionality to web pages.

By fuzzing for these common extensions with a wordlist of common file names, you increase your chances of discovering files that might be unintentionally exposed or misconfigured, potentially leading to information disclosure or other vulns.

For example, if the website uses PHP, discovering a backup file like `config.php.bak` could reveal sensitive information such as database credentials or API keys. Similarly, finding an old or unused script like `test.php` might expose vulns that attackers could exploit.

```bash
d41y@htb[/htb]$ ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt -u http://IP:PORT/w2ksvrus/FUZZ -e .php,.html,.txt,.bak,.js -v 


        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : http://IP:PORT/w2ksvrus/FUZZ.html
 :: Wordlist         : FUZZ: /usr/share/seclists/Discovery/Web-Content/common.txt
 :: Extensions       : .php .html .txt .bak .js 
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200-299,301,302,307,401,403,405,500
________________________________________________

[Status: 200, Size: 111, Words: 2, Lines: 2, Duration: 0ms]
| URL | http://IP:PORT/w2ksvrus/dblclk.html
    * FUZZ: dblclk

[Status: 200, Size: 112, Words: 6, Lines: 2, Duration: 0ms]
| URL | http://IP:PORT/w2ksvrus/index.html
    * FUZZ: index

:: Progress: [28362/28362] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: Errors: 0 ::
```

The ffuf output shows that it discovered two files within the `/w2ksvrus` directory.

## Recursive Fuzzing

### How it works

Recursive fuzzing is automated way to delve into the depths of a web application's directory structure. It's a pretty basic 3 step process:

1. **Initial Fuzzing**:
	1. The fuzzing process begins with the top-level directory, typically the web root.
	2. The fuzzer starts sending requests based on the provided wordlist containing the potential directory and file names.
	3. The fuzzer analyzes server responses, looking for successful results that indicate the existence of a directory.
2. **Directory Discovery and Expansion**:
	1. When a valid directory is found, the fuzzer doesn't just note it down. It creates a new branch for that directory, essentially appending the directory name to the base URL.
	2. For example, if the fuzzer finds a directory named `admin` at the root level, it will create a new branch like `http://localhost/admin`.
	3. This new branch becomes the starting point for a fresh fuzzing process. The fuzzer will again iterate through the wordlist, appending each entry to the new branch's URL.
3. **Iterative Depth**:
	1. The process repeats for each discovered directory, creating further branches and expanding the fuzzing scope deeper into the web application's structure.
	2. This continues until a specified depth limit is reached or no more valid directories are found.

Imagine a tree structure where the web root is the trunk, and each discovered directory is a branch. Recursive fuzzing systematically explores each branch, going deeper and deeper until it reaches the leaves (_files_) or encounters a predetermined stopping point.

Using ffuf to demonstrate recursive fuzzing:

```bash
d41y@htb[/htb]$ ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -ic -v -u http://IP:PORT/FUZZ -e .html -recursion 

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : http://IP:PORT/FUZZ
 :: Wordlist         : FUZZ: /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt
 :: Extensions       : .html 
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200-299,301,302,307,401,403,405,500
________________________________________________

[Status: 301, Size: 0, Words: 1, Lines: 1, Duration: 0ms]
| URL | http://IP:PORT/level1
| --> | /level1/
    * FUZZ: level1

[INFO] Adding a new job to the queue: http://IP:PORT/level1/FUZZ

[INFO] Starting queued job on target: http://IP:PORT/level1/FUZZ

[Status: 200, Size: 96, Words: 6, Lines: 2, Duration: 0ms]
| URL | http://IP:PORT/level1/index.html
    * FUZZ: index.html

[Status: 301, Size: 0, Words: 1, Lines: 1, Duration: 0ms]
| URL | http://IP:PORT/level1/level2
| --> | /level1/level2/
    * FUZZ: level2

[INFO] Adding a new job to the queue: http://IP:PORT/level1/level2/FUZZ

[Status: 301, Size: 0, Words: 1, Lines: 1, Duration: 0ms]
| URL | http://IP:PORT/level1/level3
| --> | /level1/level3/
    * FUZZ: level3

[INFO] Adding a new job to the queue: http://IP:PORT/level1/level3/FUZZ

[INFO] Starting queued job on target: http://IP:PORT/level1/level2/FUZZ

[Status: 200, Size: 96, Words: 6, Lines: 2, Duration: 0ms]
| URL | http://IP:PORT/level1/level2/index.html
    * FUZZ: index.html

[INFO] Starting queued job on target: http://IP:PORT/level1/level3/FUZZ

[Status: 200, Size: 126, Words: 8, Lines: 2, Duration: 0ms]
| URL | http://IP:PORT/level1/level3/index.html
    * FUZZ: index.html

:: Progress: [441088/441088] :: Job [4/4] :: 100000 req/sec :: Duration: [0:00:06] :: Errors: 0 ::
```

Notice the addition of the `-recursive` flag. This tells ffuf to fuzz any directory recursively. For example, if ffuf discovers an admin directory, it will automatically start a new fuzzing process on `http://localhost/admin/FUZZ`. In fuzzing scenarios where wordlists contain comments, the `-ic` option proves invaluable. By enabling this option, ffuf intelligently ignores commented lines during fuzzing, preventing them from being treated as valid inputs.

### Be Responsible

While recursive fuzzing is a powerful technique, it can also be resource-intensive, especially on large web applications. Excessive requests can overwhelm the target server, potentially causing performance issues or triggering security mechanisms.

To mitigate these risks, ffuf provides options for fine-tuning the recursive fuzzing process:

- `-recursive-depth`: This flag allows you to set a maximum depth for recursive exploration.
- `-rate`: You can control the rate at which ffuf sends requests per second, preventing the server from being overloaded.
- `-timeout`: This option sets the timeout for individual requests, helping to prevent the fuzzer from hanging on unresponsive targets.

## Parameter and Value Fuzzing

### GET Parameters: Openly Sharing Information

You'll often spot GET parameters right in the URL, following a question mark. Multiple parameters are strung together using ampersands. For example:

```
https://example.com/search?query=fuzzing&category=security
```

In this URL:

- `query` is a parameter with the value "fuzzing"
- `category` is another parameter with the value "security"

GET parameters are like postcards - their information is visible to anyone who glances at the URL. They're primarily used for actions that don't change the server's state, like searching or filtering.

### POST Parameters: Behind-the-Scenes Communication

While GET parameters are like open postcards, POST parameters are more like sealed envelopes, carrying their information discreetly within the body of the HTTP request. They are not visible directly in the URL, making them the preferred method for tansmitting sensitive data like login credentials, personal information, or financial details.

When you submit a form or interact with a web page that uses POST requests, the following happens:

1. `Data Collection`: The information entered into the form fields is gathered and prepared for transmission.
2. `Encoding`: This data is encoded into a specific format, typically `application/x-www-form-urlencoded` or `multipart/form-data`:
	1. `application/x-www-form-urlencoded`: This format encodes the data as key-value pairs separated by ampersands, similar to GET parameters but placed within the request body instead of the URL.
	2. `multipart/form-data`: This format is used when submitting files along with other data. It divides the request body into multiple parts, each containing a specific piece of data or a file.
3. `HTTP Request`: The encoded data is placed within the body of an HTTP POST request and sent to the web server.
4. `Server-Side Processing`: The server receives the POST request, decodes the data, and processes it according to the application's logic.

Here's a simplified example of how a POST request might look when submitting a login form:

```http
POST /login HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded

username=your_username&password=your_password
```

### Why Parameters Matter for Fuzzing

Parameters are the gateways through which you can interact with a web application. By manipulating their values, you can test how the application responds to different inputs, potentially uncovering vulns. For instance:

- Altering a product ID in a shopping cart URL could reveal pricing errors or unauthorized access to other users' orders.
- Modifying a hidden parameter in a request might unlock hidden features or administrative functions.
- Injecting malicious code into a search query could expose vulnerabilities like XSS or SQLi.

### wenum

Manually guessing parameter values would be tedious and time-consuming. This is where wenum comes in handy. It allows you to automate the process of testing many potential values, significantly increasing your chances of finding the correct one.

Use wenum to fuzz the `x` parameter's value, starting with the `common.txt` wordlist:

```bash
d41y@htb[/htb]$ wenum -w /usr/share/seclists/Discovery/Web-Content/common.txt --hc 404 -u "http://IP:PORT/get.php?x=FUZZ"

...
 Code    Lines     Words        Size  Method   URL 
...
 200       1 L       1 W        25 B  GET      http://IP:PORT/get.php?x=OA... 

Total time: 0:00:02
Processed Requests: 4731
Filtered Requests: 4730
Requests/s: 1681
```

- `-w`: Path to your wordlist.
- `--hc 404`: Hides responses with the 404 status code.
- `http://IP:PORT/get.php?x=FUZZ`: This makes the target URL.

Analyzing the results, you'll notice that most requests return the "invalid paramater value" message and the incorrect value you tried. However, one line stands out:

```bash
 200       1 L       1 W        25 B  GET      http://IP:PORT/get.php?x=OA...
```

This indicates that when the parameter `x` was set to the value `OA...`, the server responded with a `200 OK` statucs code, suggesting a valid input.

If you try accessing `http://IP:PORT/get.php?x=OA...`, you'll see the flag.

```bash
d41y@htb[/htb]$ curl http://IP:PORT/get.php?x=OA...

HTB{...}
```

### POST

Fuzzing POST parameters requires a slightly different approach than fuzzing GET parameters. Instead of appending values directly to the URL, you'll use ffuf to send the payloads within the request body. This enables you to test how the application handles data submitted through forms or other POST mechanisms.

Your target application also features a POST parameter named `y` within the `post.php` script. Probe it with curl to see its default behavior.

```bash
d41y@htb[/htb]$ curl -d "" http://IP:PORT/post.php

Invalid parameter value
y:
```

The `-d` flag instructs curl to make a POST request with an empty body. The response tells you what the parameter `y` is expected but not provided.

As with GET parameters, manually testing POST parameter values would be inefficient. You'll use ffuf to automate this process.

```bash
d41y@htb[/htb]$ ffuf -u http://IP:PORT/post.php -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "y=FUZZ" -w /usr/share/seclists/Discovery/Web-Content/common.txt -mc 200 -v

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : POST
 :: URL              : http://IP:PORT/post.php
 :: Wordlist         : FUZZ: /usr/share/seclists/Discovery/Web-Content/common.txt
 :: Header           : Content-Type: application/x-www-form-urlencoded
 :: Data             : y=FUZZ
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200
________________________________________________

[Status: 200, Size: 26, Words: 1, Lines: 2, Duration: 7ms]
| URL | http://IP:PORT/post.php
    * FUZZ: SU...

:: Progress: [4730/4730] :: Job [1/1] :: 5555 req/sec :: Duration: [0:00:01] :: Errors: 0 ::
```

The main difference here is the use of the `-d` flag, which tells ffuf that the payload `y=FUZZ` should be sent in the request body as POST data.

Again, you'll see mostly invalid parameter responses. The correct value (_`SU...`_) will stand out with its `200 OK` status code.

```bash
000000326:  200     1 L      1 W     26 Ch     "SU..."
```

Similarly, after identifying `SU...` as the correct value, validate it with curl:

```bash
d41y@htb[/htb]$ curl -d "y=SU..." http://IP:PORT/post.php

HTB{...}
```

## Virtual Host and Subdomain Fuzzing

Both virtual hosting and subdomains play pivotal roles in organizing and managing web content.

Virtual hosting enables multiple websites or domains to be served from a single server or IP address. Each vhost is associated with a unique domain name or hostname. When a client sends an HTTP request, the web server examines the `Host` header to determine which vhost's content to deliver. This facilitates efficient utilization and cost reduction, as multiple websites can share the same server infrastructure.

Subdomains, on the other hand, are extenstions of a primary domain name, creating a hierarchical structure within the domain. They are used to organize different sections or services within a website. For example, `blod.example.com` and `shop.example.com` are subdomains of the main domain `example.com`. Unlike vhosts, subdomains are resolved to specific IP addresses through DNS records.

| Feature | vHosts | Subdomains |
| ------- | ------ | ---------- |
| Identifaction | Identified by the `Host` header in HTTP requests. | Identified by DNS records, pointing to specific IP addresses. |
| Purpose | Primarily used to host multiple websites on a single server. | Used to organize different sections or services within a website. |
| Security Risks | Misconfigured vhosts can expose internal applications or sensitive data. | Subdomain vulns can occur if DNS records are mismanaged. |

### Gobuster

... is a versatile command-line tool renowned for its directory/file and DNS capabilities. It systematically probes target web servers or domains to uncover hidden directories, files, and subdomains, making it a valuable asset in security assessments and pentesting.

Gobuster's flexibility extends to fuzzing for various types of content:

- **Directories**: Discover hidden directories on a web server.
- **Files**: Identify files with specific extensions.
- **Subdomains**: Enumerate subdomains of a given domain.
- **vHosts**: Uncover hidden virtual hosts by manipulating the `Host` header.

#### vHost Fuzzing

```bash
d41y@htb[/htb]$ gobuster vhost -u http://inlanefreight.htb:81 -w /usr/share/seclists/Discovery/Web-Content/common.txt --append-domain
```

- **`gobuster vhost`**: This flag activates Gobuster's vhost fuzzing mode, instructing it to focus on discovering virtual hosts rather than directories or files.
- **`-u http://inlanefreight.htb:81`**: This specifies the base URL of the target server. Gobuster will use this URL as the foundation for constructing requests with different vhost names.
- **`-w /usr/share/seclists/Discovery/Web-Content/common.txt`**: This points to the wordlist file that Gobuster will use to generate potential vhost names.
- **`--append-domain`**: This crucial flag instructs Gobuster ot append the base domain to each word in the wordlist. This ensures that the `Host` header in each request includes a complete domain name, which is essential for vhost discovery.

Running the command will execute a vhost scan against the target:

```bash
d41y@htb[/htb]$ gobuster vhost -u http://inlanefreight.htb:81 -w /usr/share/seclists/Discovery/Web-Content/common.txt --append-domain

===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:             http://inlanefreight.htb:81
[+] Method:          GET
[+] Threads:         10
[+] Wordlist:        /usr/share/SecLists/Discovery/Web-Content/common.txt
[+] User Agent:      gobuster/3.6
[+] Timeout:         10s
[+] Append Domain:   true
===============================================================
Starting gobuster in VHOST enumeration mode
===============================================================
Found: .git/logs/.inlanefreight.htb:81 Status: 400 [Size: 157]
...
Found: admin.inlanefreight.htb:81 Status: 200 [Size: 100]
Found: android/config.inlanefreight.htb:81 Status: 400 [Size: 157]
...
Progress: 4730 / 4730 (100.00%)
===============================================================
Finished
===============================================================
```

#### Subdomain Fuzzing

```bash
d41y@htb[/htb]$ gobuster dns -d inlanefreight.com -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt 
```

- **`gobuster dns`**: Activates Gobuster's DNS fuzzing mode, directing it to focus on discovering subdomains.
- **`-d inlanefreight.com`**: Specifies the target domain for which you want to discover subdomains.
- **`-w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt`**: This points to the wordlist file that Gobuster will use to generate potential subdomain names.

Running this command, Gobuster might produce output similar to:

```bash
d41y@htb[/htb]$ gobuster dns -d inlanefreight.com -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt 

===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Domain:     inlanefreight.com
[+] Threads:    10
[+] Timeout:    1s
[+] Wordlist:   /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt
===============================================================
Starting gobuster in DNS enumeration mode
===============================================================
Found: www.inlanefreight.com

Found: blog.inlanefreight.com

...

Progress: 4989 / 4990 (99.98%)
===============================================================
Finished
===============================================================
```