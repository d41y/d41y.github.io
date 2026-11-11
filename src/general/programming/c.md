# C

## Fundamentals of C

### Compiling, Linking, and Running Your First C Program

_Example C code_:

```c
#include <stdio.h>

int main() {
    int myFavoriteNumber = 0;
    
    printf("Please enter your favorite number\n");
    scanf("%d", &myFavoriteNumber);
    printf("You entered number: %d\n", myFavoriteNumber);
    
    return 0;
}
```

A C program usually goes through four steps, before it can be executed:

1. **Preprocessing**: Processes directives such as `#include` and `#define`
2. **Compilation**: Translates C code into Assembly code
3. **Assembly**: Translates Assembly code into machine code (_object files_)
4. **Linking**: Combines object files and libraries into an executable file

To compile a C program:

```bash
gcc main.c -o main
```

- `gcc`: GNU Compiler Collection
- `main.c`: Source file
- `-o main`: Name of the output executable

Running it on Linux:

```bash
./main
```

Running it on Windows:

```
main.exe
```

> [!INFO]
> **On Linking**:
> 
> After compilation and assembly, the program consists of object files. However, these files may contain references to functions and variables that are defined somewhere else.
> 
> | Static Linking | Dynamic Linking |
> | --- | --- |
> | Library code is copied into the executable | Libraries are loaded seperately at runtime |
> | Usually produces larger executables | Usually produces smaller executables |
> | Less dependent on external library files at runtime | Requires the appropriate shared libraries at runtime |
> | _Example_: `.a` or `.lib` | _Example_: `.so`, `.dll`, `.dylib` |

### Main Function, Blocks and Key Elements

_Example C code_:

```c
#include <stdio.h>

int main()
{
    printf("Hi, my name is Jason");
    return 0;
}
```

The `main()` function is the entry point of a C program.

- Every standard hosted C program starts execution in the `main()` function
- The OS starts the program, and execution begins inside `main()`
- A program can contain multiple functions, but it has one `main()` entry point

A block is a section of code enclosed by curly braces `{ }`.

- Blocks group statements together
- Variables declared inside a block generally have block scope
- Blocks can also exist inside other blocks (_nested block_)

Other important C rules are:

- `return 0` ends the execution of the `main()` function and returns an integer value to the OS (_`0` conventionally indicates successful execution while a non-zero value usually indicates an error or abnormal termination_)
- C is case-sensitive
- Most statements end with a semicolon
- Strings are enclosed in double quotation marks
- Comments are ignored by the compiler

## Programming Fundamentals

### Preprocessing: Understanding Directives and Their Impact on Compilation

- Preprocessor statements are identified by the presence of a `#`, which must be the first non-space character on the line
- You can utilize the preprocessor to:
	- create your own constants and macros with the `#define` statement
	- build your own library files with the `#include` statement
	- make more powerful programs with the conditional `#ifdef`, `#endif`, `#else`, and `#ifndef` statements

### Header Files and Libraries

_Example C code_:

```c
#include <stdio.h>

int main()
{
    printf("Hi, my name is Jason");
    return 0;
}
```

- the `#include` statement is a preprocessor directive
- `stdio.h` is a header file (_header files are called that way because they usually are at the beginning of a program source file_)

#### Header Files

- Header files define information about some of the functions that are provided by that file
	- `stdio.h` is the standard C library header and provides functionality for displaying output, among other things
	- we need to include this file in a program when using the `printf()` function from the standard library
	- `stdio.h` contains the information that the compiler needs to understand what `printf()` means, as well as other functions that deal with input and output
- Header files specify information that the compiler uses to integrate any predefined functions within a program
- Two ways to `#include` header files
	- using `< >`: tells the preprocessor to look for the file in one or more standard system directories
	- using `" "`: tells the preprocessor to first look in the current directory

_Example Header file_:

```c
// some header

// typedefs
typedef struct names_st names;

// function prototypes
void get_names(names *);
void show_names(const names *);
char * s_gets(char * st, int n);

// ...
// executable code normally goes into a source code file, not a header file
```

### Reading Input from the Terminal

#### scanf()

- Like `printf()`, `scanf()` uses a control string followed by a list of arguments
	- control string indicates the destination data types for the input stream of characters
- The `scanf()` function uses pointers to variables
- 3 rules
	- returns the number of items that it successfully reads
	- if you use `scanf()` to read a value for one of the basic variable types, precede the variable name with an `&`
	- if you use `scanf()` to read a string into a character array, don't use `&`
- The `scanf()` function uses whitespaces to decide how to divide the input into separate fields

_Example C code_:

```c
#include <stdio.h>

int main() {
    char str[100];
    int i;
    
    printf("Enter a value:");
    scanf("%s %d, str, &i);
    
    printf("\nYou entered: %s %d, str, i);
    
    return 0;
}
```

- When a program uses `scanf()` to gather input from the keyboard, it waits for you to input some text
	- when you enter some text and press enter, then the program proceeds and reads the input

## Variables and Data Types

### Enumerated Data Types and Character Representation

#### Enums

- To declare a variable to be of type enum `primaryColor`
	- use the keyword `enum`
	- followed by the enumerated type name
	- followed by the variable list

_Example C code_:

```c
// [...]
enum primaryColor { red, yellow, blue };
// [...]
enum primaryColor myColor, gregsColors;
// [...]
myColor = red;
```

- Defines the two variables `myColor` and `gregsColor` to be of type `primaryColor`
	- the only permissible values that can be assigned to these variables are the names red, yellow, and blue
- The compiler actually treats enumeration identifiers as integer constants
	- first name in list is 0

> [!INFO]
> If you want to have a specific integer value associated with an enumeration identifier, the integer can be assigned to the identifier when the data type is defined.
> 
> ```c
> enum direction { up, down, left = 10, right };
> ```
> 
> - an enumerated data type direction is defined with the values up, down, left, and right
> - up = 0 because it appears first in the list
> - 1 to down because it appears next
> - 10 to left because it is explicitly assigned this value
> - 11 to right because it appears immediately after left in the list

#### Char

- Chars represent a single character
- Character literals use single quotes
- You can also declare char variables to be unsigned

_Example C code_:

```c
char broiled;       // declare a char variable
broiled = 'T';      // OK
broiled = T;        // Not OK
broiled = "T";      // Not OK

char grade = 65;    // OK for ASCII, but poor style
```

- C contains special characters that represent actions
	- backspacing
	- going to the next line
	- making the terminal bell ring
- -> Escape Sequences (_read [this](https://en.cppreference.com/c/language/escape)_)

### Format Specifiers

- Format specifiers are used when displaying variables as output

_Example C code_:

```c
int sum = 89;
printf("The sum is %d\n", sum);
```

- The `printf()` function can display as output the values of variables
	- can have two arguments enclosed within the parantheses
	- arguments are separated by a comma
	- first argument is always the character string to be displayed
	- along with the display of the character string, you might also frequently want to have the value of certain program variables displayed

_Example C code_:

```c
#include <stdio.h>

int main (void) {
    int integerVar = 100;
    float floatingVar = 331.79;
    double doubleVar = 8.44e+11;
    char charVar = 'W';
    _Bool boolVar = 0;
    
    printf("integerVar = %i\n", integerVar);
    printf("floatingVar = %f\n", floatingVar);
    printf("doubleVar = %e\n", doubleVar);
    printf("doubleVar = %g\n", doubleVar);
    printf("charVar = %c\n", charVar);
    printf("boolVar = %i\n", boolVar);
    
    return 0;
}
```

### Command Line Arguments

- When `main()` is called by the runtime system, two arguments are actually passed to the function
	- the first argument (_`argc` for argument counter_) is an integer value that specifies the number of arguments typed on the command line
	- the second argument (_`argv` for argument vector_) is an array of character pointers

_Example C code_:

```c
#include <stdio.h>

int main (int argc, char *argv[]) {
    int numberOfArguments = argc;
    char *argument1 = argv[0];
    char *argument2 = argv[1];
    
    printf("Number of Arguments: %d\n", numberOfArguments);
    printf("Argument 1 is the program name: %s\n", argument1);
    printf("Argument 2 is the command line argument: %s\n", argument2);
    
    return 0;
}

/*
./main test
=> Number of Arguments: 2
=> Argument 1 is the program name: /full/path/to/binary/main
=> Argument 2 is the command line argument: test
*/
```

## Performing Calculations, Comparisons, and Manipulations

