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

#### Designated Initializers

_Example C code_:

```c
int matrix[4][3] = { [0][0] = 1, [1][1] = 5, [2][2] = 9 };
```

- Initializes the three indicated elements of matrix to the specified values
	- unspecified elements are set to zero by default
	- each set of values that initializes the elements in a row is between braces
	- the entire initialization goes between another pair of braces
	- the values for a row are separated by commas
	- each set of row values is separated from the next set by a comma

## Function Parameters, Returns, and Scope

### Function Definitions and Prototypes

#### Function Prototypes

- A function prototype is a statement that defines a function
	- defines its name, its return value type, and the type of each of its parameters
	- provides all the external specifications for the function
- A function prototype enables the compiler to generate the appropriate instructions at each point where you call the function
	- it also checks that you are using the function correctly in each invocation
- When you include a standard header file in a program, the header file adds the function prototypes for that library to your program
	- the header file `stdio.h` contains function prototypes for `printf()`, among others

- Generally appear at the beginning of a source file prior to the implementations of any functions or in a header file
- Allows any of the functions in the file to call any function regardless of where you have placed the implementation of the functions
- Parameter names do not have to be the same as those used in the function definition
	- not required to include the names of parameters in a function prototype
	- will help keep your programs more consistent in design
	- prevent any errors from occuring if, at any stage, you choose to call a function from another part of your program

_Example C code_:

```c
#include <stdio.h>

// function prototypes
double Average(double data_values[], size_t count);
double Sum(double *x, size_t n);
size t GetData(double*, size_t);

int maint(void) {
    // code in main()
}

// definitions/implementations for Average(), Sum() and GetData()...
```

## Character Arrays and String Functions

### Literals, Null Terminators

- Every time you have displayed a message using the `printf()` function, you have defined the message a string constant
- Understand the difference between singleq quotation and double quotation marks
	- both are used to create two different types of constants in C
- You must specify a double quote within a string as the escape sequence `\"`

#### Null Character

- A special character with the code value 0 is added to the end of each string to mark where it ends
	- this character is known as the null character and you write it as `\0`

### Character Array

- C has no special variable type for strings
	- this means there are no special operators in the language for processing strings
	- the standard library provides an extensive range of functions to handle strings
- Strings are stored in an array of type char
	- characters in a string a stored in adjacent memory cells, one character per cell
- To declare a string in C, simply use the char type and the brackets to indicate the size

_Example C code_:

```c
char myString[20];
```

- This variable can accomodate a string that contains up to 19 characters
	- you must allow one element for the termination character ( `\0`)
- You can initialize a string variable when you declare it
	- it automatically adds the null terminator

_Example C code_:

```c
char word[] = { 'H', 'e', 'l', 'l', 'o', '!' }
```

#### Assigning a Value to a String after Initializing

- Since you can not assign arrays in C, you can not assign strings either

_Example C code_:

```c
char s[100]; // declare
s = "hello"; // initialize - does not work!
```

- You are performing an assignment operation, and you cannot assign one array of characters to another array of characters like this
	- you have to use `strncpy()` to assign a value to a char array after it has been declared or initialized

#### Displaying a String

- When you want to refer to a string stored in an array, you just use the array name by itself
- To display a string as output using the `printf()` function, you do the following

_Example C code_:

```c
printf("\nThe message is : %s", message);
```

- The `%s` format specifier is for outputting a null-terminated string

#### Inputting a String

- To input a string via the keyboard, use the `scanf()` function

_Example C code_:

```c
char input[10];
printf("Please input your name: ");
scanf("%s", input);
```

- The `%s` format specifier is for inputting strings
- No need to use the `&` on a string

### Immutable Strings

#### \#define

- The preprocessor lets you define constants

_Example C code_:

```c
#define TAXRATE 0.015
```

- When your program is compiled, the value 0.015 will be substituted everywhere you have used TAXRATE
	- compile-time substitution
- A defined name is not a variable
	- you can not assign a value to it
- Special syntax
	- no equal sign use to assign the value 0.015 to TAXRATE
	- no semicolon

### Searching, Finding, and Common Functions

#### String Functions

- `strlen()` - Getting the length of a string
- `strcpy()` / `strncpy()` - Copying one character string to another
- `strcat()` / `strncat()` - Combining two character strings together
- `strcmp()` / `strncmp()` - Determining if two character strings are equal

### Searching, Tokenizing, and Analyzing Strings

#### Searching

- The `strchr()` function searches a given string for a specified character
	- first argument to the function is the string to be searched
	- second argument is the character that you are looking for
- The function will search the string starting at the beginning and return a pointer to the first position in the string where the character is found
	- the address of this position in memory
	- is of type char* described as "the pointer to char"
- To store the value that is returned, you must create a variable that can store the address of a character
- If the character is not found, the function returns a special value NULL

_Example C code_:

```c
char str[] = "The quick brown fox"; // the string to be searched
char ch = 'q'; // the character you are looking for
char *pGot_char = NULL; // pointer initialized to NULL
pGot_Char = strchr(str, ch); // stores address where ch is found
```

#### Searching for a Substring

- The `strstr()` function is probably the most useful of all the searching functions
	- searches one string for the first occurence of a substring
	- returns a pointer to the position in the first string where the substring is found
	- if no match, returns NULL

_Example C code_:

```c
char text[] = "Every dog has his day";
char word[] = "dog";
char *pFound = NULL;
pFound = strstr(text, word)
```

#### Tokenizing a String

- A token is a sequence of characters within a string that is bound by a delimiter
- A delimiter can be anything, but, should be unique to the string
	- spaces, commas, and a period are good examples
- Breaking a sentence into words is called tokenizing
- The `strtok()` function is used for tokenizing a string

_Example C code_:

```c
int main() {
    char str[80] = "Hello how are you - my name is - jason";
    const char[s] = "-";
    char *token;
    
    // get the first token
    token = strtok(str, s);
    
    // walk through other tokens
    while(token != NULL) {
        
        printf("%s\n, token)
        token = strtok(NULL, s);
    }
    
    return 0;
}
```

