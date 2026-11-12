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

### cast and sizeof Operators

#### cast

- It is possible for you to demand the precise type conversion that you want
	- called a cast and consists of preceding the quantity with the name of the desired type in parantheses
	- parantheses and type name together constitute a cast operator
	- the actual type desired, such as long, is substituted for the word type
- The type cast operator has a higher precedence than all the arithmetic operators except the unary minus and unary plus

_Example C code_:

```c
(int) 21.51 + (int) 26.99
// evaluated in C as
// 21 + 26
```

#### sizeof

- You can find out how many bytes are occupied in memory by a given type by using the sizeof operator
	- `sizeof` is a special keyword in C
- `sizeof` is actually an operator, and not a function
	- evaluated at compile time and not at runtime, unless a variable-length array is used in its argument
- The argument to the `sizeof` operator can be a variable, an array name, the name of a basic data type, the name of a derived data type, or an expression
- You can also apply the `sizeof` operator to an expression
	- result is the size of the value that results from evaluating the expression
- Use the `sizeof` operator wherever possible to avoid having to calculate and hard-code sizes into your program

### Operator Precedence

- Precedence dictates the order of evaluation when two operators share an operand

```
x = 7 + 3 * 2
x = 7 + 6
x = 13
```

- Each operator is assigned a precedence level
- Whatever is enclosed in parantheses is executed first

#### Associativity

- What if two operators have the same precedence?
	- then associativity rules are applied
- If they share an operand, they are executed according to the order in which they occur in the statement
	- for most operators, the order is from left to right

| **Operator**                                                       | **Description**                                                                                                                                                                                                     | **Associativity** |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| ()  <br>[]  <br>.  <br>->                                          | Parentheses (grouping)  <br>Brackets (array subscript)  <br>Member selection via object name  <br>Member selection via pointer                                                                                      | left-to-right     |
| ++  --  <br>+  -  <br>!  ~  <br>(_type_)  <br>*  <br>&  <br>sizeof | Unary preincrement/predecrement  <br>Unary plus/minus  <br>Unary logical negation/bitwise complement  <br>Unary cast (change _type_)  <br>Dereference  <br>Address  <br>Determine size in bytes                     | right-to-left     |
| *  /  %                                                            | Multiplication/division/modulus                                                                                                                                                                                     | left-to-right     |
| +  -                                                               | Addition/subtraction                                                                                                                                                                                                | left-to-right     |
| <<  >>                                                             | Bitwise shift left, Bitwise shift right                                                                                                                                                                             | left-to-right     |
| <  <=  <br>>  >=                                                   | Relational less than/less than or equal to  <br>Relational greater than/greater than or equal to                                                                                                                    | left-to-right     |
| ==  !=                                                             | Relational is equal to/is not equal to                                                                                                                                                                              | left-to-right     |
| &                                                                  | Bitwise AND                                                                                                                                                                                                         | left-to-right     |
| ^                                                                  | Bitwise exclusive OR                                                                                                                                                                                                | left-to-right     |
| \|                                                                 | Bitwise inclusive OR                                                                                                                                                                                                | left-to-right     |
| &&                                                                 | Logical AND                                                                                                                                                                                                         | left-to-right     |
| \|                                                                 | Logical OR                                                                                                                                                                                                          | left-to-right     |
| ?:                                                                 | Ternary conditional                                                                                                                                                                                                 | right-to-left     |
| =  <br>+=  -=  <br>*=  /=  <br>%=  &=  <br>^=  \|=  <br><<=  >>=   | Assignment  <br>Addition/subtraction assignment  <br>Multiplication/division assignment  <br>Modulus/bitwise AND assignment  <br>Bitwise exclusive/inclusive OR assignment  <br>Bitwise shift left/right assignment | right-to-left     |
| ,                                                                  | Comma (separate expressions)                                                                                                                                                                                        | left-to-right     |
## Program Flow Control

#### switch Statements

##### goto

- Has two parts - the goto and a label name
- label name is following the same convention used in naming a variable

_Example C code_:

```c
goto part2;
```

- For the above to there must be another statement bearing the part2 label
- You should never need to use the goto statement

## Arrays

### Declaring, Initiliazing, and Accessing Elements

- Arrays allow you to group values together under a single name
- An array is a fixed number of data items that are all of the same type

- Data items in an array are referred to as elements
- The elements in an array have to be the same type
- Declaring to use an array in a program is similar to a normal variable that contains a single value

_Example C code_:

```c
long numbers[10];
```

- The number between square brackets defines how many elements the array contains
	- called the size of the array or the array dimension

- Each of the data items stored in an array is accessed by the same name
- You select a particular element by using an index value between square brackets following the array name
	- index values for elements in an array of size 10 would be from 0-9
	- arrays are zero based

#### Array out of Bounds

- If you use an expression or a variable for an index value that is outside the range for the array, your program may crash or the array can contain garbage data
	- referred to as an out of bounds error
- The compiler cannot check for out of bounds errors so your program will still compile

### Syntax, Partial, and Designated Values

#### Initializing an Array

- It is not necessary to completely initialize an entire array
- If fewer initial values are specified, only an equal number of elements are initialized
	- remaining values in the array are set to zero

_Example C code_:

```c
float sample_data[500] = { 100.0, 300.0, 500.5 };
```

- Initializes the first three values of sample to 100.0, 300.0, and 500.5, and sets the remaining 497 elements to zero

### Multidimensional Arrays

- When listing elements for initialization, the values are listed by row
	- the difference is that you put the initial values for each row between `{ }`, and then enclose all the rows between braces

_Example C code_:

```c
int numbers[3][4] = {
    { 10, 20, 30, 40 },
    { 11, 21, 31, 41 },
    { 12, 22, 32, 42 }
};
```

- Commas are required after each brace that closes off a row, except in the case of the final row

