- [Python](#python)

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

### Variables

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

#### Strings

Strings in Python can be specified using both ```"``` and ```'```. When typing out strings that contain either symbol as a natural part of the string itself, it is a good idea to use the other kind of quotes.

#### Integers

#### Booleans

A boolean value is a truth value and can either be ```True``` or ```False```. ```None``` is a special "nothingness" of a value similar to ```null``` in other languages. The usefulness of this value is, that it allows you to define variables in the code but not give them a concrete value just yet. It also allows you to create a more meaningful program flow and decide to pass along either some data or ```None``` in case of errors. Moreover, it allows you to return it as a value if "none of something" was found.

#### Comments

Comments work the same way in Python as they do in all other languages: they are ignored when the program runs and are only for the developers' eyes. It can sometimes be advisible to use comments to remember what a piece of code does or explain some oddity. However, it is strongly recommended to write clean and simple code that will not need further explanation other than the code itself.

### Coding Style

In Python, variable names follow the snake_case naming convention. This means that variable names should be all lower case initially, and an underscore should separate any potential need for multiple words in the name. While ignoring these naming conventions will not cause any issues for the script, other Python developers may get thrown off if they expect one set of rules but face others.