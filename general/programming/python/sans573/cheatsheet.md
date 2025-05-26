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

