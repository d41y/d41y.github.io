# Introduction to Painless

## The Case for Painless

### The need for scripting in Painless

- ES can help you solve many problems right out of the box
- There will be times, however, when you will need to write a script as part of the solution
	- For example, you may want to modify the way in which documents are scored in a full-text search
	- Or you may want to calculate the duration of a trip and store it in a new field
	- Or you may want to use an advanced optimization algorithm to find the best route for a package delivery driver
- In such cases, you will need to use ES's Painless scripting language

### Example: Generate a loan quote

- Say you have an index that keeps track of loan applicants and their credit ratings

```json
PUT borrowers/_doc/1
{
	"id": "001",
	"name": "Joe",
	"credit_rating", 450
}

PUT borrowers/_doc/2 {
	"id": "002",
	"name": "Mary",
	"credit_rating": 650
}
```

- A bank wants to use this data to determine an interest rate based on their credit rating and also classify them according to risk level
- Specifically, the bank wants a query that that will return a loan quote as follows:
	- The quote should include a risk rating with a value of `Good` or `Poor` which will be based on the borrower's credit rating and a risk threshold should appear in the results of the query
	- An interest rate offer with a value based on the risk rating should also be included
	- The risk threshold, together with the good and poor interest rates will be provided as an input to the query
	- For example, the bank may want to generate quotes with a good interest rate of 10% to borrowers with a credit rating higher than 500 and 15% otherwise

### Painless to the Rescue

- Using Painless, you can write the following DSL query:

```json
GET borrowers/_search
{
"fields": [
"loan_quote.loan_id", "loan_quote.interest_rate", "loan_quote.risk_rating"
],
"runtime_mappings": { "loan_quote": {
"type": "composite", "script": {
"lang": "painless",
"source": """
String loanId = params['_source']['name'] + "-" + params['_source']['id']; if
(doc['credit_rating'].value > params.risk_threshold) {
emit(["loan_id": loanId, "risk_rating": "Good", "interest_rate": params['go
} else {
emit(["loan_id": loanId, "risk_rating": "Poor", "interest_rate": params['po
}
...
```

## Introduction to Painless

### Getting started

- You can start writing and running scripts using the `_scripts` API with the `_execute` end-point:

```json
POST _scripts/painless/_execute
{
"script":{
"lang": "painless",
"source": "(2 + 1) * 4"
}
```

- The source code in this case is simply an single-line numerical expression
- Note the use of JSON to encapsulate the script

### Basics of Painless scripting

- Writing complex code as an inline expression is not very practical
- You can write blocks of code using `"""` as the block delimiter

```json
POST _scripts/painless/_execute
{
"script":{
"lang": "painless",
"source": """
return (2 + 1) * 4;"""
}
```

### Variables and types

- Variables in Painless can be declared by specifying their type, name, and initial value

```json
POST _scripts/painless/_execute
{
"script":{
"lang": "painless",
"source": """ int x = 2; int y = 1;
return (x + y) * 4;"""
}
```

### Data types

- Painless has the same data types as Java, including:
	- Primitive types: byte, char, short, int, long, float, double, and boolean
	- Object wrappers for primitive types: Integer, Long, Float, Double, and Boolean String
	- Other object types, including Date and others
	- Data structures
	- Arrays, Lists, Maps, and others

### Expressions

- You can write numerical expressions using `+`, `-`, `*`, `/` and `%`
	- _Be aware that `4/3` is not the same expression as `4.0/3.0`_
- You can also use bitwise operators `&`, `|`, `^`, `<<`, `>>`
- For string expressions you can use `+`
	- _Note that using `+` to concatenate a string with a non-string value will coerce this value into a string as part of the concatenation_
- You can use parantheses to create sub-expressions and control the order of evaluation

### Maps and ArrayLists

- In Painless, Maps and ArrayList are particularly easy to build and use
	- `m = ["a": 1, "b": 2]` creates a Map `m` containing two keys, `a` and `b` with values 1 and 2, respectively
		- `m.get("a")` returns `1`, the value of key `a`
		- `m.put("c": 3)` adds a new key `c` to `m` with a value of `3`
		- `m.remove("a")` removes the entry in the Map with a key of `a`
	- `a = [1,2]` creates an ArrayList `a` containing two values, `1` and `2`, in that order
	- `a[0]` returns `1`, while `a[1]` returns `2`
	- `a.add(3)` adds `3` to the end of `a`
	- `a.remove(2)` removes the element at position `2` from `a`, shifting the remaining elements to the left

### Script parameters

- To make scripts more general and efficient, you can use script parameters
	- Values that change from one execution to another should be passed as parameters
	- The compiled version of the source will be cached by ES and can be reused with new data

```json
POST _scripts/painless/_execute
{
	"script": {
		"lang": "painless",
		"source": """
			String name = params.name;
			return "Hello, " + name + ", welcome to Painless programming!"
		""",
		"params": {
			"name": "Maria Smith"
		}
	}
}
```

### Conditional statements

- Painless supports `if` and `if-else` conditional statements

```json
POST _scripts/painless/_execute
{
	"script": {
		"lang": "painless",
		"source": """
			int score = params.score; String testResult;
			if (score >= 60) {testResult = "Pass";
			} else {
				testResult = "Fail";
			}
			return testResult;
		""",
		"params": {"score": 85
		}
	}
}
```

### The conditional operator

- Instead of using an if-statement to set the value of a variable, you can use the conditional operator `?`

```json
POST _scripts/painless/_execute
{
	"script": {
		"lang": "painless",
		"source": """
			int score = params.score;
			String testResult;
			testResult = (score >= 60) ? "Pass" : "Fail";
			return testResult;
		""",
		"params": {"score": 85
		}
	}
}
```

### Loops

- Painless supports for, while, do-while, and for-each loops

### Methods

- Methods and functions (_methods that return values_) are supported inside Painless scripts
- Methods allow you to write reusable Painless code
- Unfortunately, methods cannot be saved outside a script and must be copy-pasted from script to script

```json
POST _scripts/painless/_execute
{
	"script": {
		"lang": "painless",
		"source": """
			double areaCircle(double r) {
				return Math.Pi * r * r;
			}
			return areaCircle(params.r)
		""",
		"params": {
			"r": 2
		}
	}
}
```

### Storing a Script

- A Painless script can be stored in the cluster state using the `_script` API and giving it a name (_its id_)

```json
PUT _scripts/hello_world
{
	"script": {
		"lang": "painless",
		"source": """
			return params.greeting + ", " + params.name + "!"
		"""
	}
```

- Later on, during an ES operation, such as search or update, the script can be invoked by id with parameters values passed on invocation

