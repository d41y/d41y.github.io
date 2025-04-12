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