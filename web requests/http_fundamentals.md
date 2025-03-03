# HyperText Transfer Protocol (HTTP)

_Most internet communications are made with web requests through the HTTP protocol. HTTP is an application-level protocol used to access the World Wide Web resources. The term 'hypertext' stands for text containing links to other resources and text that the readers can easily interpret.<br> HTTP communication consists of a client and a server, where the client requests the server for a resource. the server processes the requests and returns the requested resource. The default port for HTTP communication is port 80, though this can be changed to any other port, depending on the web server configuration._

## Uniform Resource Locator (URL)

![URL-Structure](../images/url_structure.png)

| Structure-Element | Example | Description |
| ------ | ------ | ------ |
| **Schema** | _http://<br>https://_ | is used to identify the protocol being accessed by the client |
| **User Info** | _admin:password@_ | optional component that contains the credentials used to authenticate to the host, and is separated from the host with an '@' sign |
| **Host** | _inlanefreight.com_ | signifies the resource location<br>can be hostname or IP address |
| **Port** | _:80_ | is separated from the host by a colon<br>if no port is specified, http schemes default to port 80 and https to port 443 |
| **Path** | _/dashboard.php_ | points to the resource being accessed, which can be a file or a folder<br>if there is no path specified, the server returns the default index |
| **Query String** | _?login=true_ | starts with a question mark, and consists of a parameter and a value<br>multiple parameters can be separated by an ampersand |
| **Fragments** | _#status_ | are proccessed by the browser on the client-side to locate sections within the primary resource |

## HTTP Flow

![HTTP-Flow](../images/http_flow.png)

1. 