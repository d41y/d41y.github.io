- [File Inclusion](#file-inclusion)
  - [Intro](#intro)
    - [Examples of Vulnerable Code - PHP](#examples-of-vulnerable-code---php)
    - [Examples of Vulnerable Code - NodeJS](#examples-of-vulnerable-code---nodejs)
    - [Examples of Vulnerable Code - Java](#examples-of-vulnerable-code---java)
    - [Examples of Vulnerable Code - .NET](#examples-of-vulnerable-code---net)
  - [Local File Inclusion](#local-file-inclusion)
    - [Basic LFI](#basic-lfi)
    - [Path Traversal](#path-traversal)
    - [Filename Prefix](#filename-prefix)
    - [Appended Extensions](#appended-extensions)
    - [Second Order Attacks](#second-order-attacks)
  - [Basic Bypasses](#basic-bypasses)
    - [Non-Recursive Path Traversal Filters](#non-recursive-path-traversal-filters)
    - [Encoding](#encoding)
    - [Approved Paths](#approved-paths)
    - [Appended Extension](#appended-extension)
      - [Path Truncation](#path-truncation)
      - [Null Bytes](#null-bytes)

---

# File Inclusion

## Intro

Many modern back-end languages use HTTP parameters to sprecify what is shown on the web page, which allows for building dynamic web pages, reduces the script's overall size, and simplifies the code. In such cases, parameters are used to specify which resource is shown on the page. If such functionalities are not securely coded, an attacker may manipulate these parameters to display the content of any local file on the hosting server, leading to a Local File Inclusion (_LFI_) vulnerability.

The most common place you usually find LFI within is templating engines. In order to have most of the web app looking the same when navigating between pages, a template engine displays a page that shows common static parts, such as the header, navigation bar, and footer, and then dynamically loads other content that changes between pages. Otherwise every page on the server would need to be modifified when changes are made to any of the staitc parts. This is why you often see a parameter like ```index.php?page=about```, where ```index.php``` sets static content, and then only pulls the dynamic content specified in the parameter, which in this case may be read from a file called ```about.php```. As you have control over the ```about``` portion of the request, it may be possible to have the web app grab other files and display them on the page.

LFIs can lead to source code disclosure, sensitive data exposure, and even remote code execution under certain conditions. Leaking source code may allow attackers to test the code for other vulns, which may reveal previously unknown vulns. Furthermore, leaking sensitive data may enable attackers to enumerate the remote server for other weaknesses or even leak credentials and keys that may allow them to access the remote server directly. Under specific conditions, LFI may also allow attackers to execute code on the remote server, which may compromise the entire back-end server and any other servers connected to it.

### Examples of Vulnerable Code - PHP

In PHP, you may use the ```include()``` function to load a local or remote file as you load a page. If the path to the ```include()``` is taken from a user-controlled parameter like a GET parameter, and the code does not explicitly filter and sanitize the user input, then the code becomes vulnerable to File Inclusion.

Example:

```php
if (isset($_GET['language'])) {
    include($_GET['language']);
}
```

You see that the ```language``` parameter is directly passed to the ```include()``` function. So, any path you pass in the ```language``` parameter will be loaded on the page, including any local files on the back-end server. This is not exclusive to the ```include()``` function, as there are many other PHP functions that would lead to the same vulnerability if you had control over the path passed into them. Such functions include ```include_once()```, ```require()```, ```require_once()```, ```file_get_contents()```, and several others as well.

| Function | Read Content | Execute | Remote URL |
| -------- | ------------ | ------- | ---------- |
| ```include()``` / ```inlcude_once()``` | YES | YES | YES |
| ```require()``` / ```require_once()``` | YES | YES | NO |
| ```file_get_content()``` | YES | NO | YES |
| ```fopen()``` / ```file()``` | YES | NO | NO |

### Examples of Vulnerable Code - NodeJS

```javascript
if(req.query.language) {
    fs.readFile(path.join(__dirname, req.query.language), function (err, data) {
        res.write(data);
    });
}
```

As you can see, whatever parameter passed from the URL gets used by the ```readfile``` function, which then writes the file content in the HTTP response. Another example is the ```render()``` function in the Express.js framework. The followwing example shows how the language parameter is used to determine which directory to pull the ```about.html``` page from:

```javascript
app.get("/about/:language", function(req, res) {
    res.render(`/${req.params.language}/about.html`);
});
```

Unlike your earlier examples where GET parameters were specified after a ```?``` char in the URL, the above example takes the parameter from the URL path. As the parameter is directly used within the ```render()``` function to specify the rendered file, you can change the URL to show a different file instead.

| Function | Read Content | Execute | Remote URL |
| -------- | ------------ | ------- | ---------- |
| ```fs.readFile()``` | YES | NO | NO |
| ```fs.sendFile()``` | YES | NO | NO |
| ```res.render()``` | YES | YES | NO |

### Examples of Vulnerable Code - Java

```jsp
<c:if test="${not empty param.language}">
    <jsp:include file="<%= request.getParameter('language') %>" />
</c:if>
```

The ```include``` function may take a file or a page URL as its arguments and then renders the object into the front-end template, similar to the ones you saw earlier with NodeJS. The ```import``` function may also be used to render a local file or a URL, such as the following example:

```jsp
<c:import url= "<%= request.getParameter('language') %>"/>
```

| Function | Read Content | Execute | Remote URL |
| -------- | ------------ | ------- | ---------- |
| ```include``` | YES | NO | NO |
| ```import``` | YES | YES | YES |

### Examples of Vulnerable Code - .NET

```cs
@if (!string.IsNullOrEmpty(HttpContext.Request.Query['language'])) {
    <% Response.WriteFile("<% HttpContext.Request.Query['language'] %>"); %> 
}
```

The ```Response.WriteFile``` function works very similar to all of your earlier examples, as it takes a file path for its input and writes its content to the response. The path may be retrieved from a GET parameter for dynamic content loading.

Furthermore, the ```@Html.Partial()``` function may also be used to render the specified files as part of the front-end template, similarly to what you saw earlier:

```cs
@Html.Partial(HttpContext.Request.Query['language'])
```

Finally, the ```include``` function may be used to render local files or remote URLs, and may also execute the specified files as well:

```cs
<!--#include file="<% HttpContext.Request.Query['language'] %>"-->
```

| Function | Read Content | Execute | Remote URL |
| -------- | ------------ | ------- | ---------- |
| ```@Html.Partial()``` | YES | NO | NO |
| ```@Html.RemotePartial()``` | YES | NO | YES |
| ```Response.WriteFile()``` | YES | NO | NO |
| ```include()``` | YES | YES | YES |

## Local File Inclusion

### Basic LFI

Exmaple of a webpage:

![lfi 1](../../../../images/lfi1.png)

If you select a language by clicking on it, you see that the content text changes to it.

![lfi 2](../../../../images/lfi2.png)

You also notice that the URL includes a ```language``` parameter that is now set to the language you selected. There are several ways the content could be changed to match the language you specified. It may be pulling the content from a different database table based on the specified parameter, or it may be loading an entirely different version of the web app. However, as previously disccused, loading part of the page using template engines is the easiest and most common method utilized.

So, if the web app is indeed pulling a file that is now being included in the page, you may be able to change file being pulled to read the content of a different local file. Two common readable files that are available on most back-end servers are ```/etc/passwd``` on Linux and ```C:\Windows\boot.ini``` on Windows.

![lfi 3](../../../../images/lfi3.png)

As you can see, the page is indeed vulnerable, and you are able to read the content of the ```passwd``` file.

### Path Traversal

In the earlier example, you read a file by specifying its absolute path. This would work if the whole input was used within the ```include()``` function without any additions, like the following example:

```php
include($_GET['language']);
```

In this case, if you try to read ```/etc/passwd```, then the include function would fetch that file directly. However, in many occasions, web devs may append or prepend a string to the ```language``` parameter. For example, the ```language``` parameter may be used for the filename, and may be added after a directory:

```php
include("./languages/" . $_GET['language']);
```

In this case, if you attempt to read ```/etc/passwd```, then the path passed to ```include()``` would be ```.languages//etc/passwd```, and as this file does not exist, you will not be able to read anything.

You can easily, bypass this restriction by traversing directories using relative paths. To do so, you can add ```../``` before your file name, which refers to the parent directory. For example, if the full path of the language directory is ```/var/wwww/html/language```, then using ```../index.php``` would refer to the ```index.php``` file on the parent directory.

So, you can sue this trick to go back several directories until you reach the root path, and then specify your absolute file path, and the file should exist.

![lfi 4](../../../../images/lfi4.png)

As you can see, this time you were able to read the file regardless of the directory you were in. This trick would work even if the entire parameter was used in the ```include()``` function, so you can default to this technique, and it should work in both cases. Furthermore, if you were at the root path and used ```../``` then you would still remain in the root path. So, if you were not sure if the directory the app is in, you can add ```../``` many times, and it should not break the path.

### Filename Prefix

In the previous example, you used the ```language``` parameter after the directory, so you could traverse the path to read the ```passwd```. On some occasions, you input may be appended after a different string. For example, it may be used with a prefix to get the full filename:

```php
include("lang_" . $_GET['language']);
```

In this case, if you try to traverse the directory with ```../../../etc/passwd```, the final string would be ```lang_../../../etc/passwd```, which is invalid.

Instead, you can prefix a ```/``` before your payload, and this should consider the prefix as a directory, and then you should bypass the filename and be able to traverse directories:

![lfi 5](../../../../images/lfi5.png)

> [!NOTE]
> This may not always work, as in this example a directory named ```lang_``` may not exist, so your relative path may not be correct. Furthermore, any prefix appended to your input may break some file inclusion techniques, like using PHP wrappers and filters or RFI.

### Appended Extensions

Another very common example, is when an extension is appended to the ```language``` parameter:

```php
include($_GET['language'] . ".php");
```

This is quite common, as in this case, you would not have to write the extension every time you need to change the language. This may also be safer as it may restrict you to only including PHP files. In this case, if you try to read ```/etc/passwd```, then the file included would be ```/etc/passwd.php```, which does not exist.

### Second Order Attacks

Another common LFI attack is a Second Order Attack. This occurs because many web application functionalities may be insecurely pulling files from the back-end server based on user-controlled parameters.

For example, a web app may allow you to download your avatar through a URL like ```/profile/$username/avatar.png```. If you craft a malicious LFI username, then it may be possible to change the file being pulled to another local file on the server and grab it instead of your avatar.

In this case, you could be poisining a database entry with a malicious LFI payload in your username. Then, another web application functionality would utilize this poisened entry to perform your attack. This is why this attack is called Second Order Attack.

Devs often overlook these vulnerabilities, as they may protect against direct user input, but they may trust values pulled from their database, like your username in this case. If you managed to poison your username during your registration, then the attack would be possible.

## Basic Bypasses

### Non-Recursive Path Traversal Filters

One of the most basic filters against LFI is a search and replace filter, where it simply deletes substrings of ```../``` to avoid path traversals:

```php
$language = str_replace('../', '', $_GET['language']);
```

The above code is supposed to prevent path traversal, and hece renders LFI useless.

![lfi 6](../../../../images/lfi6.png)

You see that all ```../``` substrings were removed, which resulted in a final path being ```./languages/etc/passwd```. However, this filter is very insecure, as it is not recursively removing the substring, as it runs a single time on the input string and does not apply the filter on the output string. For example, if you use ```....//``` as your payload, then the filter would remove ```../``` and the output string would be ```../```, which means you may still perform path traversal.

![lfi 7](../../../../images/lfi7.png)

The inclusion was successful this time, you're able to read ```/etc/passwd``` successfully. The ```....//``` substring is not the only bypass you can use, as you may use ```..././``` or ```....\/``` and several other recursive LFI payloads. Furthermore, in some cases, escaping the forward slash char may also work to avoid path traversal filters, or adding extra forward slashes.

### Encoding

Some web filters may prevent input filters that include certain LFI-related chars, like a ```.``` or a ```/``` used for path traversals. However, some of these filters may be bypassed by URL encoding your input, such that it would no longer include these bad characters, but would still be decoded back to your path traversal string once it reaches the vulnerable function. Core PHP filters on versions 5.3.4 and earlier were specifically vulnerable to this bypass, but even on newer versions you may find custom filters that may be bypassed through URL encoding.

If the target web app did not allow ```.``` and ```/``` in your input, you can URL encode ```../``` into ```%2e%2e%2f```, which may bypass the filter.

![lfi 8](../../../../images/lfi8.png)

As you can see, you were also able to successfully bypass the filter and use path traversal to read ```/etc/passwd```.

### Approved Paths

Some web apps may also use Regex to ensure that the file being included is under a specific path. For example, the web app you have been dealing with may only accept paths that are under the ```./language``` directory:

```php
if(preg_match('/^\.\/languages\/.+$/', $_GET['language'])) {
    include($_GET['language']);
} else {
    echo 'Illegal path specified!';
}
```

To find the approved path, you can examine the requests sent by the existing forms, and see what path they use for the normal web functionality. Furthermore, you can fuzz web directories under the same path, and try different ones until you get a match. To bypass this, you may use path traversal and start your payload with the approved path, and then use ```../``` to go back to the root directory and read the file you specify.

![lfi 9](../../../../images/lfi9.png)

Some web apps may apply this filter along with one of the earlier filters, so you may combine both techniques by starting your payload with the approved path, and then URL encode your payload or use recursive payload.

### Appended Extension

There are a couple of techniques you may use, but they are obsolete with modern versions of PHP and only work with PHP versions before 5.3/5.4.

#### Path Truncation

In earlier versions of PHP, defined strings have a maximum length of 4096 chars, likely due to the limitation of 32-bit systems. If a longer string is passed, it will simply be truncated, and any chars after the maximum length will be ignored. Furthermore, PHP also used to remove trailing slashes and single dots in path names, so if you call ```/etc/passwd/.``` then the ```./``` would also be truncated, and PHP would call ```/etc/passwd```. PHP, and Linux systems in general, also disregard multiple slashes in the path. Similarly, a current directory shortcut ```.``` in the middle of the path would also be disregarded.

If you combine both of these techniques of the PHP limitations together, you can create very long strings that evaluate to a correct path. Whenever you reach th 4096 char limitation, the appended extension ```.php``` would be truncated, and you would have a path without an appended extension. Finally, it is also important to note that you would also need to start the path with a non-existing directory for this technique to work.

Example:

```
?language=non_existing_directory/../../../etc/passwd/./././././ [REPEATED ~2048 times]
```

Command to automate the creation of this string:

```bash
d41y@htb[/htb]$ echo -n "non_existing_directory/../../../etc/passwd/" && for i in {1..2048}; do echo -n "./"; done
non_existing_directory/../../../etc/passwd/./././<SNIP>././././
```

You may also increase the count of ```../```, as adding more would still land you in the root directory, as explained in the previous section. However, if you use this method, you should calculate the full length of the string to ensure only ```.php``` gets truncated and not your requested file at the end of the string. This is why it would be easier to use the first method.

#### Null Bytes

PHP versions before 5.5 were vulnerable to null byte injection, which means that adding a ```%00``` at the end of the string would terminate the string and not consider anything after it. This is due to how strings are stored in low-level memory, where strings in memory must use a null byte to indicate the end of the string, as seen in Assembly, C, or C++ languages.

To exploit this vuln, you can end your payload with a null byte ```/etc/passwd%00```, such that the final path passed to ```include()``` would be ```/etc/passwd%00.php```. This way, even though ```.php``` is appended to your string, anything after the null byte would be truncated, and so the path used would actually be ```/etc/passwd```, leading you to bypass the appended extension.