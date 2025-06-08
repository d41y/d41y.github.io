- [Web Service \& API](#web-service--api)
  - [Web Services vs. API](#web-services-vs-api)
  - [Web Service Approaches/Technologies](#web-service-approachestechnologies)
    - [XML-RPC](#xml-rpc)
    - [JSON-RPC](#json-rpc)
    - [SOAP (_Simple Object Access Protocol_)](#soap-simple-object-access-protocol)
    - [WS-BPEL (_Web Services Business Process Execution Language_)](#ws-bpel-web-services-business-process-execution-language)
    - [RESTful (_Representation State Transfer_)](#restful-representation-state-transfer)
  - [Web Service Description Language (_WSDL_)](#web-service-description-language-wsdl)
    - [Example](#example)
    - [WSDL File Breakdown](#wsdl-file-breakdown)
      - [Definition](#definition)
      - [Data Types](#data-types)
      - [Messages](#messages)
      - [Operation](#operation)
      - [Port Type](#port-type)
      - [Binding](#binding)
      - [Service](#service)

---

# Web Service & API

>[!NOTE]
> Web services provide a standard means of interoperating between different software applications, running on a variety of platforms and/or frameworks. Web services are characterized by their great interoperability and extensibility, as well as their machine-processable descriptions thanks to the use of XML.<br><br>
> \- World Wide Web Consortium

Web services enable applications to communicate with each other. The applications can be entirely different. Consider the following scenario:

- one application written in Java is running on a Linux host and is using an Oracle database
- another application written in C++ is running on a Windows host and is using an SQL Server database

These two applications can communicate with eath other over the internet with the help of web services.

An application programming interface (_API_) is a set of rules that enables data transmission between different software. The technical specification of each API dictates the data exchange.

**Example**: A piece of software needs to access information, such as ticket prices for specific dates. To obtain the required information, it will make a call to the API of another software. The other software will return any data/functionality requested.

The interface through which these two pieces of software exchanged data is what the API specifies.

## Web Services vs. API

- web services are a type of application programming interface; the opposite is not always true
- web services need a network to achieve their objective; APIs can achieve their goal even offline
- web services rarely allow external access, and there are a lot of APIs that welcome external developer tinkering
- web services usually utilize SOAP for security reasons; APIs can be found using different designs, such as XML-RPC, JSON-RPC, SOAP, and REST
- web services usually utilize the XML format for data encoding; APIs can be found using different formats to store data, with the most popular being JS Object Notation

## Web Service Approaches/Technologies

### XML-RPC

- uses XML for encoding/decoding the remote procedure call (_RPC_) and the respective parameter(s); HTTP is usually the transport of choice

```http
  --> POST /RPC2 HTTP/1.0
  User-Agent: Frontier/5.1.2 (WinNT)
  Host: betty.userland.com
  Content-Type: text/xml
  Content-length: 181

  <?xml version="1.0"?>
  <methodCall>
    <methodName>examples.getStateName</methodName>
    <params>
       <param>
 		     <value><i4>41</i4></value>
 		     </param>
		  </params>
    </methodCall>

  <-- HTTP/1.1 200 OK
  Connection: close
  Content-Length: 158
  Content-Type: text/xml
  Date: Fri, 17 Jul 1998 19:55:08 GMT
  Server: UserLand Frontier/5.1.2-WinNT

  <?xml version="1.0"?>
  <methodResponse>
     <params>
        <param>
		      <value><string>South Dakota</string></value>
		      </param>
  	    </params>
   </methodResponse>
```

The payload in XML is essentially a single ```<methodCall>``` structure. ```<methodCall>``` should contain a ```<methodName>``` sub-item, that is related to the method to be called. If the call requires parameters, then ```<methodCall>``` must contain a ```<params>``` sub-item.

### JSON-RPC

- uses JSON to invoke functionality; HTTP is usually the transport of choice

```http
  --> POST /ENDPOINT HTTP/1.1
   Host: ...
   Content-Type: application/json-rpc
   Content-Length: ...

  {"method": "sum", "params": {"a":3, "b":4}, "id":0}

  <-- HTTP/1.1 200 OK
   ...
   Content-Type: application/json-rpc

   {"result": 7, "error": null, "id": 0}
```

The method ```{"method": "sum", "params": {"a":3, "b":4}, "id":0}``` object is serialized using JSON. Note the three properties: ```method```, ```params``` and ```id.method``` contains the name of the method to invoke. ```params``` contains an array carrying the arguments to be passed. ```id``` contains an identifier established by the client. The server must reply with the same value in the response object if included.

### SOAP (_Simple Object Access Protocol_)

- uses XML but provides more functionalities than XML-RPC; SOAP defines both a header structure and a payload structure; the former identifies the actions that SOAP nodes are expected to take on the message, while the latter deals with the carried information; a Web Services Definition Language (_WSDL_) declaration is optional; WSDL specifies how a SOAP service can be used; various lower-level protocols (_HTTP included_) can be the transport
- Anatomy of a SOAP Message:
  - ```soap:Envelope```: (_Required block_) Tag to differentiate SOAP from normal XML; this tag requires a ```namespace``` attribute
  - ```soap:Header```: (_Optional block_) Enables SOAP's extensibility through SOAP modules
  - ```soap:Body```: (_Required block_) Contains the procedure, parameters, and data
  - ```soap:Fault```: (_Optional block_) Used within ```soap:Body``` for error messages upon a failed API call

```http
  --> POST /Quotation HTTP/1.0
  Host: www.xyz.org
  Content-Type: text/xml; charset = utf-8
  Content-Length: nnn

  <?xml version = "1.0"?>
  <SOAP-ENV:Envelope
    xmlns:SOAP-ENV = "http://www.w3.org/2001/12/soap-envelope"
     SOAP-ENV:encodingStyle = "http://www.w3.org/2001/12/soap-encoding">

    <SOAP-ENV:Body xmlns:m = "http://www.xyz.org/quotations">
       <m:GetQuotation>
         <m:QuotationsName>MiscroSoft</m:QuotationsName>
      </m:GetQuotation>
    </SOAP-ENV:Body>
  </SOAP-ENV:Envelope>

  <-- HTTP/1.0 200 OK
  Content-Type: text/xml; charset = utf-8
  Content-Length: nnn

  <?xml version = "1.0"?>
  <SOAP-ENV:Envelope
   xmlns:SOAP-ENV = "http://www.w3.org/2001/12/soap-envelope"
    SOAP-ENV:encodingStyle = "http://www.w3.org/2001/12/soap-encoding">

  <SOAP-ENV:Body xmlns:m = "http://www.xyz.org/quotation">
  	  <m:GetQuotationResponse>
  	     <m:Quotation>Here is the quotation</m:Quotation>
     </m:GetQuotationResponse>
   </SOAP-ENV:Body>
  </SOAP-ENV:Envelope>
```

### WS-BPEL (_Web Services Business Process Execution Language_)

- are essentially SOAP web services with more functionality for describing and invoking business processes
- heavily resemble SOAP services

### RESTful (_Representation State Transfer_)

- usually use XML or JSON; WSDL declarations are supported but uncommon; HTTP is the transport of choice, and HTTP verbs are used to access/change/delete resources and use data

XML:

```http
  --> POST /api/2.2/auth/signin HTTP/1.1
  HOST: my-server
  Content-Type:text/xml

  <tsRequest>
    <credentials name="administrator" password="passw0rd">
      <site contentUrl="" />
    </credentials>
  </tsRequest>
```

JSON:

```http
  --> POST /api/2.2/auth/signin HTTP/1.1
  HOST: my-server
  Content-Type:application/json
  Accept:application/json

  {
   "credentials": {
     "name": "administrator",
    "password": "passw0rd",
    "site": {
      "contentUrl": ""
     }
    }
  }
```

## Web Service Description Language (_WSDL_)

... is an XML-based file exposed by web services that informs clients of the provided services/methods, including where they reside and the method-calling convention.

A web service's WSDL file should not always be accessible. Developers may not want to publicly expose a web service's WSDL file, or they may expose it through an uncommon location, following a security through obscurity approach. In the latter case, directory/parameter fuzzing may reveal the location and content of a WSDL file.

### Example

Suppose you are assessing a SOAP service residing in ```http://<TARGET IP>:3002```. You have not been informed of a WSDL file.

Start by performing basic directory fuzzing against the web service.

```bash
d41y@htb[/htb]$ dirb http://<TARGET IP>:3002

-----------------
DIRB v2.22    
By The Dark Raver
-----------------

START_TIME: Fri Mar 25 11:53:09 2022
URL_BASE: http://<TARGET IP>:3002/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt

-----------------

GENERATED WORDS: 4612                                                          

---- Scanning URL: http://<TARGET IP>:3002/ ----
+ http://<TARGET IP>:3002/wsdl (CODE:200|SIZE:0)                            
                                                                               
-----------------
END_TIME: Fri Mar 25 11:53:24 2022
DOWNLOADED: 4612 - FOUND: 1
```

It looks like ```http://<TARGET IP>:3002/wsdl``` exists.

```bash
d41y@htb[/htb]$ curl http://<TARGET IP>:3002/wsdl 
```

The response is empty. Maybe there is a parameter that will provide you with access to the SOAP web service's WSDL file. Perform parameter fuzzing:

```bash
d41y@htb[/htb]$ ffuf -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt -u 'http://<TARGET IP>:3002/wsdl?FUZZ' -fs 0 -mc 200

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v1.3.1 Kali Exclusive <3
________________________________________________

 :: Method           : GET
 :: URL              : http://<TARGET IP>:3002/wsdl?FUZZ
 :: Wordlist         : FUZZ: /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200
 :: Filter           : Response size: 0
________________________________________________

:: Progress: [40/2588] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: Error
:: Progress: [537/2588] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: Erro
wsdl [Status: 200, Size: 4461, Words: 967, Lines: 186]
:: Progress: [982/2588] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: Erro:: 
Progress: [1153/2588] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: Err::
Progress: [1780/2588] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: Err:: 
Progress: [2461/2588] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: Err:: 
Progress: [2588/2588] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: Err:: 
Progress: [2588/2588] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: Errors: 0 ::
```

It looks like ```wsdl``` is a valid parameter.

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

You identified the SOAP service's WSDL file.

### WSDL File Breakdown

#### Definition

- the root element of all WSDL files; inside the definition, the name of the web service is specified, all namespaces used across the WSDL document are declard, and all other service elements are defined

```xml
<wsdl:definitions targetNamespace="http://tempuri.org/" 

    <wsdl:types></wsdl:types>
    <wsdl:message name="LoginSoapIn"></wsdl:message>
    <wsdl:portType name="HacktheBoxSoapPort">
  	  <wsdl:operation name="Login"></wsdl:operation>
    </wsdl:portType>
    <wsdl:binding name="HacktheboxServiceSoapBinding" type="tns:HacktheBoxSoapPort">
  	  <wsdl:operation name="Login">
  		  <soap:operation soapAction="Login" style="document"/>
  		  <wsdl:input></wsdl:input>
  		  <wsdl:output></wsdl:output>
  	  </wsdl:operation>
    </wsdl:binding>
    <wsdl:service name="HacktheboxService"></wsdl:service>
</wsdl:definitions>
```

#### Data Types

- the data types to be used in the exchanged messages

```xml
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
```

#### Messages

- defines input and output operations that the web service supports; in other words, through the ```messages``` element, the messages to be exchanged, are defined and presented either as an entire document or as arguments to be mapped to a method invocation

```xml
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
```

#### Operation

- defines the available SOAP actions alongsinde the encoding of each message

#### Port Type

- Encapsulates every possible input and output message into an operation; more specifically, it defines the web service, the available operations and the exchanged messages

```xml
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
```

#### Binding

- binds the operation to a particular port type; think of bindings as interfaces; a client will call the relevant port type and, using the details provided by the binding, will be able to access the operations bound to this port type; in other words, bindings provide web service access details, such as the message format, operations, messages, and interfaces

```xml
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
```

#### Service

- a client makes a call to the web service through the name of the service specified in the service tag; through this element, the client identifies the location of the web service

```xml
    <wsdl:service name="HacktheboxService">

      <wsdl:port name="HacktheboxServiceSoapPort" binding="tns:HacktheboxServiceSoapBinding">
        <soap:address location="http://localhost:80/wsdl"/>
      </wsdl:port>

    </wsdl:service>
```