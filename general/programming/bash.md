- [Intro to Bash Scripting](#intro-to-bash-scripting)
	- [0x00](#0x00)
	- [Working Components](#working-components)
		- [Conditional Execution](#conditional-execution)
			- [Shebang](#shebang)
			- [If-Else-Fi](#if-else-fi)
		- [Arguments, Variables, and Arrays](#arguments-variables-and-arrays)
			- [Arguments](#arguments)
			- [Special Variables](#special-variables)
			- [Variables](#variables)
			- [Arrays](#arrays)
		- [Comparison Operators](#comparison-operators)
			- [String Operators](#string-operators)
			- [Integer Operators](#integer-operators)
		- [File Operators](#file-operators)
			- [Boolean and Logical Operators](#boolean-and-logical-operators)
			- [Logical Operators](#logical-operators)
		- [Arithmetic](#arithmetic)

---

# Intro to Bash Scripting

## 0x00

Bash is the scripting language that is used to communicate with Unix-based OS and give commands to the system.

Like a programming language, a scripting language has almost the same structure, which can be divided into:

- Input & Output
- Arguments, Variables & Arrays
- Conditional execution
- Arithmetic
- Loops
- Comparison operators
- Functions

It is often common to automate some processes not to repeat them all the time or process and filter a large amount of information. In general, a script does not create a process, but it is executed by the interpreter that executes the script, in this case, the Bash. To execute a script, you have to specify the interpreter and tell it which script it should process. Such a call looks like this:

```bash
d41y@htb[/htb]$ bash script.sh <optional arguments>

d41y@htb[/htb]$ sh script.sh <optional arguments>

d41y@htb[/htb]$ ./script.sh <optional arguments>
```

Look at such a script and see how they can be created to get specific results. If you execute this script and specify a domain, you see what this script provides.

```bash
d41y@htb[/htb]$ ./CIDR.sh inlanefreight.com

Discovered IP address(es):
165.22.119.202

Additional options available:
	1) Identify the corresponding network range of target domain.
	2) Ping discovered hosts.
	3) All checks.
	*) Exit.

Select your option: 3

NetRange for 165.22.119.202:
NetRange:       165.22.0.0 - 165.22.255.255
CIDR:           165.22.0.0/16

Pinging host(s):
165.22.119.202 is up.

1 out of 1 hosts are up.
```

Now look at the script in detail and read it line by line in the best possible way.

```bash
#!/bin/bash

# Check for given arguments
if [ $# -eq 0 ]
then
	echo -e "You need to specify the target domain.\n"
	echo -e "Usage:"
	echo -e "\t$0 <domain>"
	exit 1
else
	domain=$1
fi

# Identify Network range for the specified IP address(es)
function network_range {
	for ip in $ipaddr
	do
		netrange=$(whois $ip | grep "NetRange\|CIDR" | tee -a CIDR.txt)
		cidr=$(whois $ip | grep "CIDR" | awk '{print $2}')
		cidr_ips=$(prips $cidr)
		echo -e "\nNetRange for $ip:"
		echo -e "$netrange"
	done
}

# Ping discovered IP address(es)
function ping_host {
	hosts_up=0
	hosts_total=0
	
	echo -e "\nPinging host(s):"
	for host in $cidr_ips
	do
		stat=1
		while [ $stat -eq 1 ]
		do
			ping -c 2 $host > /dev/null 2>&1
			if [ $? -eq 0 ]
			then
				echo "$host is up."
				((stat--))
				((hosts_up++))
				((hosts_total++))
			else
				echo "$host is down."
				((stat--))
				((hosts_total++))
			fi
		done
	done
	
	echo -e "\n$hosts_up out of $hosts_total hosts are up."
}

# Identify IP address of the specified domain
hosts=$(host $domain | grep "has address" | cut -d" " -f4 | tee discovered_hosts.txt)

echo -e "Discovered IP address:\n$hosts\n"
ipaddr=$(host $domain | grep "has address" | cut -d" " -f4 | tr "\n" " ")

# Available options
echo -e "Additional options available:"
echo -e "\t1) Identify the corresponding network range of target domain."
echo -e "\t2) Ping discovered hosts."
echo -e "\t3) All checks."
echo -e "\t*) Exit.\n"

read -p "Select your option: " opt

case $opt in
	"1") network_range ;;
	"2") ping_host ;;
	"3") network_range && ping_host ;;
	"*") exit 0 ;;
esac
```

1. Check for given arguments

In the first part of the script, you have an if-else statement that checks if you have specified a domain representing the target company.

2. Identify network range for the specified IP address(es)

Here you have created a function that makes a "whois" query for each IP address and displays the line for the reserved network range, and stores it in the CIDR.txt.

3. Ping discovered IP address(es)

This additional function is used to check if the found hosts are reachable with the respective IP addresses. With the For-Loop, you ping every IP address in the network range and count the results.

4. Identify IP address(es) of the specified domain

As the first step in this script, you identify the IPv4 address of the domain returned to you.

5. Available Options

Then you decide which functions you want to use to find out more information about the infrastructure.

## Working Components

### Conditional Execution

Conditional execution allows you to control the flow of your script by reaching different conditions.

When defining various conditions, you specify which functions or sections of code should be executed for a specific value. If you reach a specific condition, only the code for that condition is executed, and the others are skipped. As soon as the code section is completed, the following commands will be executed outside the conditional execution.

```bash
#!/bin/bash

# Check for given argument
if [ $# -eq 0 ]
then
	echo -e "You need to specify the target domain.\n"
	echo -e "Usage:"
	echo -e "\t$0 <domain>"
	exit 1
else
	domain=$1
fi

<SNIP>
```

In summary, this code section works with the following components:

- ```#! /bin/bash``` - Shebang
- ```if-else-fi``` - Conditional execution
- ```echo``` - Prints specific output
- ```$#``` / ```$0``` / ```$1``` - Special variables
- ```domain``` - Variables

The conditions of the conditional executions can be defined using variables, values, and strings. These values are compared with the comparison operators (```-eq```).

#### Shebang

The shebang line is always at the top of each script and always starts with ```#!```. This line contains the path to the specified interpreter (```/bin/bash```) with which the script is executed. You can also use Shebang to define other interpreters like Python, Perl, and others.

```bash
#!/usr/bin/env python
```

```bash
#!/usr/bin/env perl
```

#### If-Else-Fi

One of the most fundamental programming tasks is to check different conditions to deal with these. Checking of conditions usually has two different forms in programming and scripting languages, the if-else condition and case statements. In pseudo-code, the if condition means the following:

```
if [ the number of given arguments equals 0 ]
then
	Print: "You need to specify the target domain."
	Print: "<empty line>"
	Print: "Usage:"
	Print: "   <name of the script> <domain>"
	Exit the script with an error
else
	The "domain" variable serves as the alias for the given argument 
finish the if-condition
```

By default, an If-Else condition can contain only a single "If", as shown in the next example.

```bash
#!/bin/bash

value=$1

if [ $value -gt "10" ]
then
        echo "Given argument is greater than 10."
fi
```

When execution:

```bash
d41y@htb[/htb]$ bash if-only.sh 5

d41y@htb[/htb]$ bash if-only.sh 12

Given argument is greater than 10.
```

When adding Elif or Else, you add alternatives to treat specific values or statuses. If a particular value does not apply to the first case, it will be caught by others.

```bash
#!/bin/bash

value=$1

if [ $value -gt "10" ]
then
	echo "Given argument is greater than 10."
elif [ $value -lt "10" ]
then
	echo "Given argument is less than 10."
else
	echo "Given argument is not a number."
fi
```

When executed:

```bash
d41y@htb[/htb]$ bash if-elif-else.sh 5

Given argument is less than 10.

d41y@htb[/htb]$ bash if-elif-else.sh 12

Given argument is greater than 10.

d41y@htb[/htb]$ bash if-elif-else.sh HTB

if-elif-else.sh: line 5: [: HTB: integer expression expected
if-elif-else.sh: line 8: [: HTB: integer expression expected
Given argument is not a number.
```

You could extend your script and specify several conditions. This could look something like this:

```bash
#!/bin/bash

# Check for given argument
if [ $# -eq 0 ]
then
	echo -e "You need to specify the target domain.\n"
	echo -e "Usage:"
	echo -e "\t$0 <domain>"
	exit 1
elif [ $# -eq 1 ]
then
	domain=$1
else
	echo -e "Too many arguments given."
	exit 1
fi

<SNIP>
```

Here you define another condition (```elif [<condition>]; then```) that prints a line telling you (```echo -e "..."```) that you have given more than one argument and exits the program with an error (```exit 1```).

### Arguments, Variables, and Arrays

#### Arguments

The advantage of bash scripts is that you can always pass up to 9 arguments (```$0```-```$9```) to the script without assigning them to variables or setting the corresponding requirements for these. 9 arguments because the first argument ```$0``` is reserved for the script. As you can see here, you need the dollar sign before the name of the variable to use it at the specified position. The assignment would look like this in comparison:

```bash
d41y@htb[/htb]$ ./script.sh ARG1 ARG2 ARG3 ... ARG9
       ASSIGNMENTS:       $0      $1   $2   $3 ...   $9
```

This means that you have automatically assigned the corresponding arguments to the predefined variables in this place. These variables are called special variables. These special variables serve as placeholders. If you now look at the code section again, you will see where and which arguments have been used.

```bash
#!/bin/bash

# Check for given argument
if [ $# -eq 0 ]
then
	echo -e "You need to specify the target domain.\n"
	echo -e "Usage:"
	echo -e "\t$0 <domain>"
	exit 1
else
	domain=$1
fi

<SNIP>
```

There are several ways how you can execute your script. However, you must first set the script's execution privileges before executing it with the interpreter defined in it.

```bash
# Set Execution Privileges
d41y@htb[/htb]$ chmod +x cidr.sh

# Execution without Arguments
d41y@htb[/htb]$ ./cidr.sh

You need to specify the target domain.

Usage:
	cidr.sh <domain>

# Execution without Execution Permissions
d41y@htb[/htb]$ bash cidr.sh

You need to specify the target domain.

Usage:
	cidr.sh <domain>
```

#### Special Variables

... use the Internal Field Separator (_IFS_) to identify when an argument ends and the next begins. Bash provides various special variables that assist while scripting. Some of these variables are:

| Special Variable | Description |
| ---------------- | ----------- |
| ```$#``` | This variable holds the number of arguments passed to the script. |
| ```$@``` | This variable can be used to retrieve the list of command-line arguments. |
| ```$n``` | Each command-line argument can be selectively retrieved using its position. For example, the first argument is found at ```$1```. |
| ```$$``` | The process ID of the currently executing process. |
| ```$?``` | The exit status of the script. This variable is useful to determine a command's success. The value 0 represents successful execution, while 1 is a result of a failure. |

#### Variables

You also see at the end of the if-else loop that you assign the value of the first argument to the variable called "domain". The assignment of variables takes place without the dollar sign. The dollar sign is only intended to allow this variable's corresponding value to be used in other code sections. When assigning variables, there must be no spaces between the names and values.

```bash
<SNIP>
else
	domain=$1
fi
<SNIP>
```

In constrast to other programming languages, there is no direct differentiation and recognition between the types of variables in Bash like strings, integers, and boolean. All contents of the variables are treated as string chars. Bash enables arithmetic functions depending on whether only numbers are assigned or not. It is important to note when declaring variables that they do not contain a space. Otherwise, the actual variable name will be interpreted as an internal function or command.

```bash
# Error
d41y@htb[/htb]$ variable = "this will result with an error."

command not found: variable

# Without an Error
d41y@htb[/htb]$ variable="Declared without an error."
d41y@htb[/htb]$ echo $variable

Declared without an error.
```

#### Arrays

There is also the possibility of assigning several values to a single variable in Bash. This can be beneficial if you want to scan multiple domains or IP addresses. These variables are called arrays that you can use to store and process an ordered sequence of specific type values. Arrays identify each stored entry with an index starting with 0. When you want to assign a value to an array componenet, you do so in the same way as with standard shell variables. All you do is specify the field index enclosed in square brackets. The declaration for arrays looks like this in Bash:

```bash
#!/bin/bash

domains=(www.inlanefreight.com ftp.inlanefreight.com vpn.inlanefreight.com www2.inlanefreight.com)

echo ${domains[0]}
```

You can also retrieve them individually using the index using the variables with the corresponding index in curly brackets. Curly brackets are used for variable expansion.

```bash
d41y@htb[/htb]$ ./Arrays.sh

www.inlanefreight.com
```

It is important to note that single quotes and double quotes prevent the separation by a space of individual values in the array. This means that all spaces between the single and double quotes are ignored and handled as a single value assigned to the array.

```bash
#!/bin/bash

domains=("www.inlanefreight.com ftp.inlanefreight.com vpn.inlanefreight.com" www2.inlanefreight.com)
echo ${domains[0]}
```

```bash
d41y@htb[/htb]$ ./Arrays.sh

www.inlanefreight.com ftp.inlanefreight.com vpn.inlanefreight.com
```

### Comparison Operators

To compare specific values with each other, you need elements that are called comparison operators. The comparison operators are used to determine how the defined values will be compared. For these operators, you differentiate between:

- string operators
- integer operators
- file operators
- boolean operators

#### String Operators

If you compare strings, then you know what you would like to have in the corresponding value.

| Operator | Description |
| -------- | ----------- |
| ```==``` | is equal to |
| ```!=``` | is not equal to |
| ```<``` | is less than in ASCII alphabetical order |
| ```>``` | is greater than in ASCII alphabetical order |
| ```-z``` | if the string is empty |
| ```-n``` | if the string is not null |

It is important to note here that you put the variable for the given argument in double quotes. This tells Bash that the content of the variable should be handled as a string. Otherwise, you would get an error.

```bash
#!/bin/bash

# Check the given argument
if [ "$1" != "HackTheBox" ]
then
	echo -e "You need to give 'HackTheBox' as argument."
	exit 1

elif [ $# -gt 1 ]
then
	echo -e "Too many arguments given."
	exit 1

else
	domain=$1
	echo -e "Success!"
fi
```

String comparison operators (```<``` / ```>```) work only within the double square brackets (```[[ condition ]]```). You can find the ASCII table on the internet or by using the following command in the terminal.

```bash
d41y@htb[/htb]$ man ascii
```

#### Integer Operators

Comparing integer numbers can be very useful for you if know what values you want to compare. Accordingly, you define the next steps and commands how the script should handle the corresponding value.

| Operator | Description |
| -------- | ----------- |
| ```-eq``` | is equal to |
| ```-ne``` | is not equal to |
| ```-lt``` | is less than |
| ```-le``` | is less than or equal to |
| ```-gt``` | is greater than |
| ```-ge``` | is greater than or equal to |

```bash
#!/bin/bash

# Check the given argument
if [ $# -lt 1 ]
then
	echo -e "Number of given arguments is less than 1"
	exit 1

elif [ $# -gt 1 ]
then
	echo -e "Number of given arguments is greater than 1"
	exit 1

else
	domain=$1
	echo -e "Number of given arguments equals 1"
fi
```

### File Operators

The file operators are useful if you want to find out specific permissions or if they exist.

| Operator | Description |
| ```-e``` | if the file exist |
| ```-f``` | tests if it is a file |
| ```-d``` | tests if it is a directory |
| ```-L``` | tests if it is a symbolic link |
| ```-N``` | checks if the file was modified after it was last read |
| ```-O``` | if the current user owns the file |
| ```-G``` | if the file's group id matches the current user's |
| ```-s``` | tests if the file has a size greater than 0 |
| ```-r``` | tests if the file has read permissions |
| ```-w``` | tests if the file has write permissions |
| ```-x``` | tests if the file has execute permissions |

```bash
#!/bin/bash

# Check if the specified file exists
if [ -e "$1" ]
then
	echo -e "The file exists."
	exit 0

else
	echo -e "The file does not exist."
	exit 2
fi
```

#### Boolean and Logical Operators

You get a boolean value "false" or "true" as a result with logical operators. Bash gives you the possibility to compare strings by using double square brackets. To get these boolean values, you can use the string operators. Whether the comparison matches or not, you get the boolean value "false" or "true".

```bash
#!/bin/bash

# Check the boolean value
if [[ -z $1 ]]
then
	echo -e "Boolean value: True (is null)"
	exit 1

elif [[ $# > 1 ]]
then
	echo -e "Boolean value: True (is greater than)"
	exit 1

else
	domain=$1
	echo -e "Boolean value: False (is equal to)"
fi
```

#### Logical Operators

With logical operators, you can define several conditions within one. This means that all the conditions you define must match before the corresponding code can be executed.

| Operator | Description |
| -------- | ----------- |
| ```!``` | logical negation NOT |
| ```&&``` | logical AND |
| ```\|\|``` | logical OR |

```bash
#!/bin/bash

# Check if the specified file exists and if we have read permissions
if [[ -e "$1" && -r "$1" ]]
then
	echo -e "We can read the file that has been specified."
	exit 0

elif [[ ! -e "$1" ]]
then
	echo -e "The specified file does not exist."
	exit 2

elif [[ -e "$1" && ! -r "$1" ]]
then
	echo -e "We don't have read permission for this file."
	exit 1

else
	echo -e "Error occured."
	exit 5
fi
```

### Arithmetic

In Bash, you have seven different arithemtic operators you can work with. These are used to perform different mathematical operations or to modify certain integers.

| Operator | Description |
| -------- | ----------- |
| ```+``` | Addition |
| ```-``` | Subtraction |
| ```*``` | Multiplication |
| ```/``` | Division |
| ```%``` | Modulus |
| ```variable++``` | Increase the value of the variable by 1 |
| ```variable--``` | Decrease the value of the variable by 1 |

You can summarize all these operators in a small script:

```bash
#!/bin/bash

increase=1
decrease=1

echo "Addition: 10 + 10 = $((10 + 10))"
echo "Subtraction: 10 - 10 = $((10 - 10))"
echo "Multiplication: 10 * 10 = $((10 * 10))"
echo "Division: 10 / 10 = $((10 / 10))"
echo "Modulus: 10 % 4 = $((10 % 4))"

((increase++))
echo "Increase Variable: $increase"

((decrease--))
echo "Decrease Variable: $decrease"
```

The output of this script looks like this:

```bash
d41y@htb[/htb]$ ./Arithmetic.sh

Addition: 10 + 10 = 20
Subtraction: 10 - 10 = 0
Multiplication: 10 * 10 = 100
Division: 10 / 10 = 1
Modulus: 10 % 4 = 2
Increase Variable: 2
Decrease Variable: 0
```

You can also calculate the length of the variable. Using this function ```${#variable}```, every character gets counted, and you get the total number of chars in the variable.

```bash
#!/bin/bash

htb="HackTheBox"

echo ${#htb}
```

```bash
d41y@htb[/htb]$ ./VarLength.sh

10
```

If you look at your CIDR.sh script, you will see that you have used the increase and decrease operators several times. This ensures that the while loop runs and pings the hosts while the variable "stat" has a value of 1. If the ping command ends with code 0, you get a message that the host is up and the "stat" variable, as well as the variables "hosts_up" and "hosts_total" get changed.

```bash
<SNIP>
	echo -e "\nPinging host(s):"
	for host in $cidr_ips
	do
		stat=1
		while [ $stat -eq 1 ]
		do
			ping -c 2 $host > /dev/null 2>&1
			if [ $? -eq 0 ]
			then
				echo "$host is up."
				((stat--))
				((hosts_up++))
				((hosts_total++))
			else
				echo "$host is down."
				((stat--))
				((hosts_total++))
			fi
		done
	done
<SNIP>
```

