- [File Inclusion](#file-inclusion)
  - [Intro](#intro)

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