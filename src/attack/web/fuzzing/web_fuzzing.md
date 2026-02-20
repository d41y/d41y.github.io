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

## Filtering Fuzzing Output

Web fuzzing tools like gobuster, ffuf, and wfuzz are designed to perform comprehensive scans, often generating a vast amount of data. Sifting through this output to identify the mose relevant findings can be a daunting task. However, these tools offer powerful filtering mechanisms to streamline your analysis and focus on the results that matter most.

### Gobuster

| Flag | Description |
| ---- | ----------  |
| `-s` | Include only responses with the specified status codes. |
| `-b` | Exclude responses with the specified status codes. |
| `--exclude-length` | Exclude responses with specific content lengths. |

### Ffuf

| Flag | Description |
| ---- | ----------  |
| `-mc` | Include only responses that match the specified status codes (_multiple sc can be comma separated_). |
| `-fc` | Exclude responses that match the specified status codes, using the same format as `-mc`. |
| `-fs` | Exclude responses with a specific size or range of sizes. |
| `-ms` | Include only responses that match a specific size or range of sizes. |
| `-fw` | Exclude responses containing the specified number of words in the response. |
| `-mw` | Include only responses that have the specified amount of words in the response body. |
| `-fl` | Exclude responses with a specific number of lines or range of lines. |
| `-ml` | Include only responses that have the specified amount of lines in the response body. |
| `-mt` | Include only responses that meet a specific time-to-first-byte condition. |

### wenum

| Flag | Description |
| ---- | ----------  |
| `--hc` | Exclude responses that match the specified status codes. |
| `--sc` | Include only responses that match the specified status codes. |
| `--hl` | Exclude responses with the specified content length. |
| `--sl` | Include only responses with the specified content length. |
| `--hw` | Exclude responses with the specified number of words. |
| `--sw` | Include only responses with the specified number of words. |
| `--hs` | Exclude responses with the specified response in size. |
| `--ss` | Include only responses with the specified response size. |
| `--hr` | Exclude responses whose body matches the specified regular expression. |
| `--sr` | Include only respones whose body matches the specified regular expression. |
| `--filter`/`--hard-filter` | General-purpose filter to show/hide responses or prevent their post-processing using a regex. |

### Feroxbuster

| Flag                    | Description                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `--dont-scan`           | Exclude specific URLs or patterns from being scanned.                               |
| `-S`, `--filter-size`   | Exclude responses based on their size.                                              |
| `-X`, `--filter-regex`  | Exclude responses whose body or headers match the specified regex.                  |
| `-W`, `--filter-words`  | Exclude responses with a specific word count or range of line counts.               |
| `-N`, `--filter-lines`  | Exclude responses with a specific line count or range of line counts.               |
| `-C`, `--filter-status` | Exclude responses based on specific HTTP status codes. This operates as a denylist. |
| `--filter-similar-to`   | Exclude responses that are similar to a given webpage.                              |
| `-s`, `--status-codes`  | Include only responses with the specified status codes.                             |

## Validating Findings

### Why Validate?

- **Confirming Vulns**: Ensures that the discovered issues are real vulns and not just false positives.
- **Understanding Impact**: Helps you assess the severity of the vulnerability and the potential impact on the web application.
- **Reproducing the Issue**: Provides a way to consistently replicate the vulnerability, aiding in developing a fix or mitigation strategy.
- **Gather Evidence**: Collect proof of the vulnerability to share with developers.

### Manual Verification

1. **Reproducing the Request**: Use a tool like `curl` or your web browser to manually send the same request that triggered the unusual response during fuzzing.
2. **Analyzing the Response**: Carefully examine the response to confirm whether it indicates vulnerability. Look for error messages, unexpected content, or behavior that deviates from the expected norm.
3. **Exploitation**: If the finding seems promising, attempt to exploit the vulnerability in a controlled environment to assess its impact and severity. This step should be performed with caution and only after obtaining proper authorization.

To responsibly validate and exploit a finding, avoiding actions that could harm the production system or compromise sensitive data is crucial. Instead, focus on creating a PoC that demonstrates the existence of the vulnerability without causing damage. For example, if you suspect a SQLi vulnerability, you could craft a harmless SQL query that returns the SQL server version string rather than trying to extract or modify sensitive data.

## Web APIs

### Web APIs

A Web API, or Web Application Programming Interface, is a set of rules and specifications that enable different software applications to communicate over the web. It functions as a universal language, allowing diverse software components to exchange data and services seamlessly, regardless of their underlying technologies or programming languages.

Essentially, a Web API serves as a bridge between a server and a client that wants to access or utilize that data or functionality.

#### Represential State Transfer (_REST_)

REST APIs are a popular architecturual style for building web services. They use a stateless, client-server communication model where clients send requests to access or manipulate resources. REST APIs utilize standard HTTP methods to perform CRUD operations on resources identified by unique URLs. They typically exchange data in lightweight formats like JSON or XML, making them easy to integrate with various applications and platforms.

```http
GET /users/123
```

#### Simple Object Access Protocol (_SOAP_)

SOAP APIs follow a more formal and standardized protocol for exchanging structured information. They use XML to define messages, which are then encapsulated in SOAP envelopes and transmitted over network protocols like HTTP or SMTP. SOAP APIs often include built-in security, reliability, and transaction management features, making them suitable for enterprise-level applications requiring strict data integrity and error handling.

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:GetStockPrice>
         <tem:StockName>AAPL</tem:StockName>
      </tem:GetStockPrice>
   </soapenv:Body>
</soapenv:Envelope>
```

#### GraphQL

... is a relatively new query language and runtime for APIs. Unlike REST APIs, which expose multiple endpoints for different resources, GraphQL provides a single endpoint where clients can request the data they need using a flexible query language. This eliminates the problem of over-fetching or under-fetching data, which is common in REST APIs. GraphQL's strong typing and introspection capabilities make it easier to evolve APIs over time without breaking existing clients, making it a popular choice for modern web and mobile applications.

```graphql
query {
  user(id: 123) {
    name
    email
  }
}
```

#### Advantages of Web APIs

Web APIs have revolutionized application development and interaction by providing standardized ways for clients to access and manipulate server-stored data. They enable devs to expose specific features or services of their applications to external users or other applications, promoting code reusability and facilitating the creation of mashups and composite applications.

Furthermore, Web APIs are instrumental in integrating third-party services, such as social media logins, secure payment processing, or mapping functionalities, into applications. This streamlined integration allows devs to incorporate external capabilities without reinventing the wheel.

APIs are also the cornerstore of microservices architecture, where large, monolithic applications are broken down into smaller, independent services that communicate through well-defined APIs. This architectural approach enhances scalability, flexibility, and resilience, making it ideal for modern web applications.

#### How APIs are different from a Web Server

While both traditional web pages and Web APIs play vital roles in the web ecosystem, they have distinct structure, communication, and functionality characteristics.

| Feature | Web Server | API |
| ------- | ---------- | --- |
| Purpose | Primarily designed to serve static content and dynamic web pages. | Primarily designed to provide a way for different software applications to communicate with eath other, exchange data, and trigger actions. |
| Communication | Communicates with web browsers using the HTTP. | Can use various protocols for communication, including HTTP, HTTPS, SOAP, and others, depending on the specific API. |
| Data Format | Primarily deals with HTML, CSS, JavaScript, and other web-related formats. | Can exchange data in various formats, including JSON, XML, and others, depending on the API specification. |
| User Interaction | Users interact with web servers directly through web browsers to view web pages and content. | Users typically do not interact with APIs directly; instead applications use APIs to access data or functionality on behalf of the user. |
| Access | Web servers are usually publicly accessible over the internet. | APIs can be publicly accessible, private, or partner. |
| Example | When you access a website like `https://www.example.com`, you are interacting with a web server that sends you the HTML, CSS, and JavaScript code to render the web page in your browser. | A weather app on your phone might use a weather API to fetch weather data from a remote server. The app then processes this data and displays it to you in a user-friendly format. You are not directly interacting with the API, but the app is using it behind the scenes to provide you with the weather information. |

### Identifying Endpoints

#### REST

REST APIs are built around the concept of resources, which are identified by unique URLs called endpoints. These endpoints are the targets for client requests, and they often include parameters to provide additional context or control over the requested operation.

Endpoints in REST APIs are structured as URLs representing the resources you want to access or manipulate. For example:

- `/users`: represents a collection of user resources
- `/users/123`: represents a specific user with ID 123
- `/products`: represents a collection of product resources
- `/products/456`: represents a specific product with the ID 456

The structure of these endpoints follows a hierarchical pattern, where more specific resources are nested under broader categories.

Parameters are used to modify the behavior of API requests or provide additional information. In REST APIs, there are several types of parameters.

| Parameter Type | Description | Example |
| -------------- | ----------- | ------- |
| Query Parameters | Appended to the endpoint URL after a question mark. Used for filtering, sorting, or pagination. | `/users?limit=10&sort=name` |
| Path Parameters | Embedded directly within the endpoint URL. Used to identify specific resources. | `/products/{id}pen_spark` |
| Request Body Parameters | Sent in the body of POST, PUT, or PATCH requests. Used to create or update resources. | `{ "name": "New Product", "price": 99.99 }` |

##### Discovering Endpoints and Parameters

Discovering the available endpoints and parameters of a REST API can be accomplished through several methods:

1. **API Documentation**: The most reliable way to understand and API is to refer to its official documentation. This documentation often includes a list of available endpoints, their parameters, expected request/response formats, and example usage. Look for specifications like Swagger, or RAML, which provide machine-readable API descriptions.
2. **Network Traffic Analysis**: If documentation is not available or incomplete, you can analyze network traffic to observe how the API is used. Tools like Burp Suite or your browser's developer tools allow you to intercept and inspect API requests and responses, revealing endpoints, parameters, and data formats.
3. **Parameter Name Fuzzing**: Similar to fuzzing for directories and files, you can use the same tools and techniques to fuzz for parameter names within API requests. Tools like ffuf and wfuzz, combined with appropriate wordlists, can be used to discover hidden or undocumented parameters. This can be particularly useful when dealing with APIs that lack comprehensive documentation.

#### SOAP

SOAP APIs are structured differently from REST APIs. They rely on XML-based messages and Web Services Description Language files to define their interfaces and operations.

Unlike REST APIs, which use distinct URLs for each resource, SOAP APIs typically expose a single endpoint. This endpoint is a URL where the SOAP servers listens for incoming requests. The content of the SOAP message itself determines the specific operation you want to perform.

SOAP parameters are defined within the body of the SOAP message, an XML document. These parameters are organized into elements and attributes, forming a hierarchical structure. The specific structure of the parameters depends on the operation being invoked. The parameters are defined in the Web Services Description Language file, an XML-based document that describes the web's interface, operations, and message formats.

Imagine a SOAP API for a library that offers a book search service. The WSDL file might define an operation called `SearchBooks` with the following input parameters:

- `keywords`: the search terms to use
- `author`: the name of the author
- `genre`: the genre of the book

A sample SOAP request to this API might look like:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lib="http://example.com/library">
   <soapenv:Header/>
   <soapenv:Body>
      <lib:SearchBooks>
         <lib:keywords>cybersecurity</lib:keywords>
         <lib:author>Dan Kaminsky</lib:author>
      </lib:SearchBooks>
   </soapenv:Body>
</soapenv:Envelope>
```

In this request:

- The `keywords` parameter is set to "cybersecurity" to search for books on that topic.
- The `author` parameter is set to "Dan Kaminsky" to further refine the search.
- The `genre` parameter is not included, meaning the search will not be filtered by genre.

##### Discovering Endpoints and Parameters

To identify the available endpoints (_operations_) and parameters for a SOAP API, you can utilize the following methods:

1. **WSDL Analysis**: The WSDL file is the most valuable resource for understanding a SOAP API. It describes:
	1. Available operations (_endpoints_)
	2. Input parameters for each operation
	3. Output parameters for each operation
	4. Data types used for parameters
	5. The location (_URL_) of the SOAP endpoint
2. **Network Traffic Analysis**: Similar to REST APIs, you can intercept and analyze SOAP traffic to observe the requests and responses between clients and the server. Tools like Wireshark or tcpdump can capture SOAP traffic, allowing you to examine the structure of SOAP messages and extract information about endpoints and parameters.
3. **Fuzzing for Parameter Names and Values**: While SOAP APIs typically have a well-defined structure, fuzzing can still be helpful in uncovering hidden or undocumented operations or parameters. You can use fuzzing tools to send malformed or unexpected values within SOAP requests and see how the server responds.

#### GraphQL

GraphQL APIs are designed to be more flexible and efficient than REST and SOAP APIs, allowing clients to request precisely the data they need in a single request.

Unlike REST or SOAP APIs, which often expose multiple endpoints for different purposes, GraphQL APIs typically have a single endpoint. This endpoint is usually a URL like `/graphql` and serves as the entry point for all queries and mutations sent to the API.

GraphQL uses a unique query language to specify the data requirements. Within this language, queries and mutations act as the vehicle for defining parameters and structuring the requested data.

##### Queries

Queries are designed to fetch data from the GraphQL server. They pinpoint the exact fields, relationships, and nested objects the client desires, eliminating the issue of over-fetching or under-fetching data common in REST APIs. Arguments within queries allow for further refinement, such as filtering or pagination.

| Component | Description | Example |
| --------- | ----------- | ------- |
| Field | Represents a specific piece of data you want to retrieve. | `name`, `email` |
| Relationship | Indicates a connection between different types of data. | `posts` | 
| Nested Objects | A field that returns another object, allowing you to traverse deeper into the data graph. | `posts { title, body }` |
| Argument | Modifies the behavior of a query or field. | `posts(limit: 5)` |

```graphql
query {
  user(id: 123) {
    name
    email
    posts(limit: 5) {
      title
      body
    }
  }
}
```

In this example:

- You query for information about a user with the ID 123.
- You request their name and email.
- You also fetch their first 5 posts, including the title and body of each post.

##### Mutations

Mutations are the counterparts to queries designed to modify data on the server. They encompass operations to create, update, or delete data. Like queries, mutations can also accept arguments to define the input values for these operations.

| Component | Description | Example |
| --------- | ----------- | ------- |
| Operation | The action to perform. | `createPost` |
| Argument | Input data required for the operation. | `title: "New Post", body: "This is the content of the new post"` |
| Selection | Fields you want to retrieve in the response after the mutation completes. | `id`, `title` |

```graphql
mutation {
  createPost(title: "New Post", body: "This is the content of the new post") {
    id
    title
  }
}
```

This mutation creates a new post with the specified title and body, returning the id and title of the newly created post in the response.

##### Discovering Queries and Mutations

There are a few ways to discover GraphQL Queries and Mutations:

1. **Introspection**: GraphQL's introspection system is a powerful tool for discovery. By sending an introspection query to the GraphQL endpoint, you can retrieve a complete schema describing the API's capabalities. This includes availabe types, fields, queries, mutations, and arguments. Tools and IDEs can leverage this information to offer auto-completion, validation, and documentation for your GraphQL queries.
2. **API Documentation**: Well-documented GraphQL APIs provide comprehensive guides and references alongside introspection. These typically explain the purpose and usage of different queries and mutations, offer examples of valid structures, and detail input arguments and response formats. Tools like GraphiQL or GraphQL Playground, often bundled with GraphQL servers, provide an interactive environment for exploring the schema and experimenting with queries.
3. **Network Traffic Analysis**: Like REST and SOAP, analyzing network traffic can yield insights into GraphQL API structure and usage. By capturing and inspecting requests and responses sent to the graphql endpoint, you can observe real-world queries and mutations. This helps you understand the expected format of requests and the types of data returned, aiding in tailored fuzzing efforts.

