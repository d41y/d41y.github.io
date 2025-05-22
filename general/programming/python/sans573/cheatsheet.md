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

