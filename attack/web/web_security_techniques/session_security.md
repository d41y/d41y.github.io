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

