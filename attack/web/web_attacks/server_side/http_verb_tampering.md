- [HTTP Verb Tampering](#http-verb-tampering)
  - [Intro](#intro)
    - [HTTP Verb Tampering](#http-verb-tampering-1)
    - [Insecure Configurations](#insecure-configurations)
    - [Insecure Coding](#insecure-coding)
  - [Bypassing Basic Authentication](#bypassing-basic-authentication)
    - [Identify](#identify)
    - [Exploit](#exploit)

---

# HTTP Verb Tampering

## Intro

The HTTP protocol works by accepting various HTTP methods as verbs at the beginning of an HTTP request. Depending on the web server config, web apps may be scripted to accept certain HTTP methods for their various functionalities and perform a particular action based on the type of the request.

Suppose both the web app and the back-end web server are configured only to accept GET and POST requests. In that case, sending a different request will cause a web server error page to be displayed, which is not a severe vulnerability in itself. On the other hand, if the web server configs are not restricted to only accept the HTTP methods required by the web server, and the web app is not developed to handle other types of HTTP requests, then you may be able to exploit this insecure config to gain access to functionalities you do not have access to, or even bypass certain security controls.

### HTTP Verb Tampering

HTTP has [9 different verbs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) that can be accepted as HTTP methods by web servers. Most common are:

| Verb | Description |
| ---- | ----------- |
| **HEAD** | identical to a GET request, but its response only contains headers, without the response body |
| **PUT** | writes the request payload to the specified location |
| **DELETE** | deletes the resource at the specified location |
| **OPTIONS** | shows different options accepted by a web server, like accepted HTTP verbs |
| **PATCH** | apply partial modifications to the resource at the specified location |

### Insecure Configurations

Insecure web server configs cause the first type of HTTP Verb Tampering vulns. A web server's authentication configuration may be limited to specific HTTP methods, which would leave some HTTP methods accessible without authentication. For example, a system admin may use the following config to require authentication on a particular web page:

```xml
<Limit GET POST>
    Require valid-user
</Limit>
```

Even though the config specifies both GET and POST requests for the authentication method, an attacker may still use a different HTTP method to bypass this authentication mechanism altogether. This eventually leads to an authentication bypass and allows attackers to access web pages and domains they should not have access to.

### Insecure Coding

... causes the other type of HTTP Verb Tampering vulns. This can occur when a web developer applies specific filters to mitigate particular vulns while not covering all HTTP methods with that filter. For example, if a web page was found to be vulnerable to a SQLi vuln, and the back-end developer mitigated the SQLi vuln by the following applying input sanitization filters:

```php
$pattern = "/^[A-Za-z\s]+$/";

if(preg_match($pattern, $_GET["code"])) {
    $query = "Select * from ports where port_code like '%" . $_REQUEST["code"] . "%'";
    ...SNIP...
}
```

The sanitization filter is only being tested on the GET parameter. If the GET requests do not contain any bad chars, then the query would be executed. However, when the query is executed the ```_REQUEST['code']``` parameters are being used, which may also contain POST parameters, leading to an inconsistency in the use of HTTP verbs. In this case, an attacker may use a POST request to perform SQLi, in which case the GET parameters would be empty. The request would pass the security filter, which would make the function still vulnerable to SQLi.

## Bypassing Basic Authentication

### Identify

![http verb tampering 1](../../../../images/http_verb_tampering_1.png)

In this example, you can add new files by typing their names and hitting enter.

However, suppose you are trying to delete all files ny clicking on the red ```Reset``` button. In that case, you see that this functionality seems to be restricted for authenticated users only, as you get the following HTTP Basic Auth prompt:

![http verb tampering 2](../../../../images/http_verb_tampering_2.png)

Since you don't have any creds, you will get a ```401 Unauthorized``` page in response.

To identify which pages are restricted by this authentication, you can examine the HTTP request after clicking the Reset button or look at the URL that the button navigates to after clicking it. You'll see that it is at ```/admin/reset.php```. So either the ```/admin``` directory is restricted to authenticated users only, or only the ```/admin/reset.php``` page is. You can confirm this by visiting the ```/admin``` directory, and you do indeed get prompted to log in again. This means that the full ```/admin``` directory is restricted.

### Exploit

To try and exploit the page, you need to identify the HTTP request method used by the web app. You can intercept the request with Burp and examine it.

As the page uses a GET request, you can send a POST request and see whether the web page allows POST requests. To do so, you can right-click on the intercepted request in Burp and select ```Change Request Method```, and it will automatically change the request into a POST request.

Once you do so, you can click ```Forward``` and examine the page in your browser. Unfortunately, you still get prompted to log in and will get a ```401 Unauthorized``` page if you don't provide the creds.

So, it seems like the web server configs do cover both GET and POST requests. However, you can utilize many other HTTP methods, most notably the HEAD method, which is identical to a GET request but does not return the body in the HTTP response. If this is successful, you may not receive any output, but the reset function should still get executed, which is your main target.

To see whether the server accepts HEAD requests, you can send an OPTIONS request to it and see what HTTP methods are accepted:

```bash
d41y@htb[/htb]$ curl -i -X OPTIONS http://SERVER_IP:PORT/

HTTP/1.1 200 OK
Date: 
Server: Apache/2.4.41 (Ubuntu)
Allow: POST,OPTIONS,HEAD,GET
Content-Length: 0
Content-Type: httpd/unix-directory
```

You can see, the response shows ```Allow: POST, OPTIONS, HEAD, GET```, which means that the web server indeed accepts HEAD requests, which is the default config for many web servers. Now try to intercept the Resest request again, and this time use a HEAD request to see how the web server handles it:

![http verb tampering 3](../../../../images/http_verb_tampering_3.png)

Once you change POST to HEAD and forward the request, you will see that you no longer get a login prompt or a ```401 Unauthorized``` page and get an empty output instead, as expected with a HEAD request. If you go back to the file manager web app, you will see that all files have indeed been deleted, meaning that you successfully triggered the Reset functionality without having admin access or any creds.