- [Session Security](#session-security)
  - [Intro](#intro)
    - [Session Identifier Security](#session-identifier-security)
    - [Session Attacks](#session-attacks)
  - [Session Attacks](#session-attacks-1)
    - [Session Hijacking](#session-hijacking)
      - [Example](#example)
        - [Part 1: Identify the session identifier](#part-1-identify-the-session-identifier)
        - [Part 2: Simulate an attacker](#part-2-simulate-an-attacker)
    - [Session Fixation](#session-fixation)
      - [Example](#example-1)
      - [Example of vulnerable code](#example-of-vulnerable-code)
    - [Obtaining Session Identifiers without User Interaction](#obtaining-session-identifiers-without-user-interaction)
      - [Obtaining Session Identifiers via Traffic Sniffing](#obtaining-session-identifiers-via-traffic-sniffing)
      - [Obtaining Session Identifiers Post-Exploitation](#obtaining-session-identifiers-post-exploitation)
        - [PHP](#php)
        - [Java](#java)
        - [.NET](#net)
      - [Obtaining Session Identifiers Post-Exploitation - Database Access](#obtaining-session-identifiers-post-exploitation---database-access)

---

# Session Security

## Intro

A user session can defined as a sequence of requests originating from the same client and the associated responses during a specific time period. Modern web apps need to maintain user sessions to keep track of information and status about each user. User sessions faciliate the assignment of access or authorization rights, localization settings, etc., while users interact with an app, pre, and post-authentication.

Each HTTP request should carry all needed information for the server to act upon it appropriately, and the session state resides on the client's side only.

### Session Identifier Security

A unique session identifier (_Session ID_) or token is the basis upon which user sessions are generated and distinguished.

If an attacker obtains a session identifier, this can result in session hijacking, where the attacker can essentially impersonate the victim in the web app. A session identifier can be:

- captured through passive traffic/packet sniffing
- identified in logs
- predicted
- brute forced

A session identifier's security level depends on its:

- Validity Scope (_a secure session identifier should be valid for one session only_)
- Randomnsess (_a secure session identifier should be generated through a robust number/string generation algorithm so that it cannot be predicted_)
- Validity Time (_a secure session identifier should expire after a certain amount of time_)

A session identifier's security level also depends on the location where it is stored:

| Location | Description |
| -------- | ----------- |
| URL | if this is the case, the HTTP _Referer_ header can leak a session identifier to other websites; in addition, browser history will also contain any session identifier stored in the URL |
| HTML | if this is the case, the session identifier can be identified in both the browser's cache memory and any intermediate proxies |
| sessionStorage | ... is a browser storage feature introduced in HTML5; session identifiers stored in sessionStorage can be retrieved as long as the tab or the browser is open; in other words, sessionStorage data gets cleared when the _page session_ ends; note that a page session survives over page reloads and restores |
| localStorage | ... is a browser storage feature introduced in HTML5; session identifiers stored in localStorage can be retrieved as long as localStorage does not get deleted by the user; this is because data stored within localStorage will not be deleted when the browser process is terminated, with the exception of "private browsing" or "incognito" sessions where data stored within localStorage are deleted by the time the last tab is closed |

### Session Attacks

Can be:

- Session Hijacking
- Session Fixation
- XSS
- CSRF
- Open Redirects

## Session Attacks

### Session Hijacking

In session hijacking attacks, the attacker takes advantage of insecure session identifiers, finds a way to obtain them, and uses them to authenticate to the server and impersonate the victim.

An attacker can obtain a victim's session identifier using several methods, with the most common being:

- passive traffic sniffing
- XSS
- browser history or log-diving
- read access to a database containing session information

#### Example

##### Part 1: Identify the session identifier

- log into app, using given creds
- use Web Dev Tools
- look for cookie that can be session identifier

![session security 1](../../../images/session_security1.png)

##### Part 2: Simulate an attacker

- copy cookie
- open new private window
- insert copied cookie
- notice, you can log in without giving creds

![session security 2](../../../images/session_security2.png)

### Session Fixation

... occurs when an attacker can fixate a (_valid_) session identifier. The Attacker will then have to trick the victim into logging into the application using the aforementioned session identifier. If the victim does so, the attacker can proceed to a Session Hijacking attack.

Such bugs usually occur when session identifiers are being accepted from URL Query Strings or Post Data.

Such attacks are usually mounted in three stages:

1. Attacker manages to obtain a valid session identifier
2. Attacker manages to fixate a valid session identifier
3. Attacke tricks the victim into establishing a session using the abovementioned session identifier

#### Example

1. Session fixation identification

![session fixation 1](../../../images/session_fixation1.png)

If any value or a valid session identifier specified in the ```token``` parameter on the URL is propagated to the ```PHPSESSID``` cookie's value, you are probably dealing with a session fixation vuln.

2. Session fixation exploitation attempt

![session fixation 2](../../../images/session_fixation2.png)

Notice that the ```PHPSESSID``` cookie's value is ```IControlThisCookie```. You are dealing with a Session Fixation vuln. An attacker could send a URL similar to the above to a victim. If the victim logs into the application, the attacker could easily hijack their session since the session identifier is already known.

#### Example of vulnerable code

```php
<?php
    if (!isset($_GET["token"])) {
        session_start();
        header("Location: /?redirect_uri=/complete.html&token=" . session_id());
    } else {
        setcookie("PHPSESSID", $_GET["token"]);
    }
?>
```

### Obtaining Session Identifiers without User Interaction

#### Obtaining Session Identifiers via Traffic Sniffing

Traffic Sniffing is something that most penetration testers do when asessing a network's security from the inside. It requires the attacker and the victim to be on the same local network. Then and only then can HTTP traffic be inspected by the attacker. It is impossible to perform traffic sniffing remotely.

1. Obtain the victim's cookie through packet analysis
   1. inside Wireshark, first, apply to see only HTTP traffic
   2. now search within the Packet bytes for any ```auth-session``` cookies
   3. navigate to ```Edit```, then to ```Find Packet```
   4. left click on ```Packet List```, then on ```Packet bytes```
   5. select string and specify ```auth-session```
   6. click ```find```
   7. copy the cookie by right-clicking on a row that contains it
   8. click ```copy```, then ```Value```


2. Hijack the victim's session
   1. back on the browser and change the current cookie's value into the obtained value
   2. refresh page

#### Obtaining Session Identifiers Post-Exploitation

During the post-exploitation phase, session identifiers and session data can be retrieved from either a web server's disk or memory.

##### PHP

The entry ```session.save_path``` in ```PHP.ini``` specifies where session data will be stored.

```bash
d41y@htb[/htb]$ locate php.ini
d41y@htb[/htb]$ cat /etc/php/7.4/cli/php.ini | grep 'session.save_path'
d41y@htb[/htb]$ cat /etc/php/7.4/apache2/php.ini | grep 'session.save_path'
```

A default config could store session data in ```/var/lib/php/sessions``` and could look like this:

![session no interaction 1](../../../images/session_no_interaction_1.png)

The same PHP session identifier could look like this on a local setup:

```bash
d41y@htb[/htb]$ ls /var/lib/php/sessions
d41y@htb[/htb]$ cat //var/lib/php/sessions/sess_s6kitq8d3071rmlvbfitpim9mm
```

![session no interaction 2](../../../images/session_no_interaction_2.png)

For a hacker to hijack the user session related to the session identifier above, a new cookie must be created in the web browser with the following values:

- cookie name: PHPSESSID
- cookie value: s6kitq8d3071rmlvbfitpim9mm

##### Java

"The Manager element represents the session manager that is used to create and maintain HTTP sessions of a web application.

Tomcat provides two standard implementations of Manager. The default implementation stores active sessions, while the optional one stores active sessions that have been swapped out in a storage location that is selected via the use of an appropriate ```Store``` nested element. The filename of the default session data file is ```SESSIONS.ser```."

[More info here!](https://tomcat.apache.org/tomcat-6.0-doc/config/manager.html)

##### .NET

Session data can be found in:

- the application worker process (_```aspnet_wp.exe```_)
- StateServer
- SQL Server

[More info here!](https://www.c-sharpcorner.com/UploadFile/225740/introduction-of-session-in-Asp-Net/)

#### Obtaining Session Identifiers Post-Exploitation - Database Access

In cases where you have direct access to a database, you should always check for any stored user sessions.

```sql
show databases;
use project;
show tables;
select * from users;
```

![session no interaction 3](../../../images/session_no_interaction_3.png)

Here you can see the user's passwords are hashed. You could spend time trying to crack these; however, there is also a "all_sessions" table.

```sql
select * from all_sessions;
select * from all_sessions where id=3;
```

![session no interaction 4](../../../images/session_no_interaction_4.png)

Here you have successfully extracted the sessions!