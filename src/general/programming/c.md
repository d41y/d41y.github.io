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

