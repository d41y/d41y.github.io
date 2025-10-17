- [ES|QL for Security Analysts](#esql-for-security-analysts)
  - [Getting Started](#getting-started)
    - [Elasticsearch | Query Language](#elasticsearch--query-language)
    - [Why is it needed?](#why-is-it-needed)
    - [Requirements](#requirements)
    - [ES|QL Syntax](#esql-syntax)
    - [Example](#example)
    - [ES|QL Basic Commands](#esql-basic-commands)
      - [FROM](#from)
      - [KEEP](#keep)
      - [EVAL](#eval)
      - [WHERE](#where)
      - [SORT](#sort)
      - [LIMIT](#limit)
  - [Operators](#operators)
    - [Relation Operators](#relation-operators)
    - [Mathematical Operators](#mathematical-operators)
    - [Logical Operators](#logical-operators)
    - [NULL Values](#null-values)
    - [LIKE](#like)
    - [RLIKE](#rlike)
    - [IN](#in)
    - [Comments](#comments)
    - [Metadata Fields](#metadata-fields)
  - [Functions](#functions)
    - [IP Functions - CIDR\_MATCH](#ip-functions---cidr_match)
    - [String Functions - to/from base64](#string-functions---tofrom-base64)
    - [String Functions - TO\_LOWER/TO\_UPPER](#string-functions---to_lowerto_upper)
    - [Aggregate Functions - STATS \[...\] BY](#aggregate-functions---stats--by)
    - [Grouping Functions - Bucket](#grouping-functions---bucket)
  - [Investigating Events](#investigating-events)
    - [ES|QL within Timeline](#esql-within-timeline)
    - [Building ES|QL Security Queries](#building-esql-security-queries)
  - [Rule Creation with ES|QL](#rule-creation-with-esql)
    - [Rule Creation Workflow](#rule-creation-workflow)
    - [Aggregating vs Non-Aggregating Rules](#aggregating-vs-non-aggregating-rules)
    - [Rule Creation](#rule-creation)
    - [Considerations When Writing Rules](#considerations-when-writing-rules)

---

# ES|QL for Security Analysts

## Getting Started

### Elasticsearch | Query Language

- Dynamic language designed from the ground up to transform, enrich, and simplify investigations
  - faster results
  - simplified user experience
  - new search capabilities
  - quicker insights
  - accurate alerting
- Uses a dedicated query engine
- Brings together the capabilities of multiple languages

### Why is it needed?

- Purpose for creation
  - flexible searches with the ability to define fields at query time
  - accurate detection rules that help reduce alert fatigue
  - work with summarized data using aggregations in queries
  - providing data enrichment at query time

### Requirements

- Elastic Stack version 8.14
- Data

### ES|QL Syntax

- Each command works on the output of the previous one using the pipe character

```
source-command
| processing-command1
| processing-command2
```

- Can be written in multiple lines or one

```
source-command | processing-command1 | processing-command2
```

### Example

```
FROM logs-network*
| KEEP @timestamp, source.ip, destination.ip, source.bytes, destination.bytes
| EVAL total.bytes = source.bytes + destination.bytes
| WHERE total.bytes > 10000
| SORT source.ip, total.bytes desc
| LIMIT 2
```

### ES|QL Basic Commands

#### FROM

... retrieves data from ES

- Can specify Indices, Data Streams, and Aliases
- Wildcards and comma-separated lists can be used to query multiple sources
- Returns 1000 results by default

#### KEEP

... specifies which columns are returned and in which order

- Results will be printed in a table format
- The order of field in the query will dictate the column order

#### EVAL

... enables you to calculate new values and add them as a new column

- This new column is only created in the output table, it is not stored in ES
- EVAL typically uses functions to calculate values

#### WHERE

... returns a table with the rows where the specified condition is true

- Key command to filter data
- The condition can include operators (_<, ==, and, or, ..._) and functions

#### SORT

... orders the rows of the table

- ```asc```/```desc``` define the order -> ascending is used if not specified
- Multiple columns can be specified

#### LIMIT

... sets how many rows are returned by the query

- A limit of 10.000 rows still applies
- Useful for calculating the top results in a search

## Operators

Query building-blocks for working with data

- Relational operators (_<, >, <=, >=, ==, !=_)
- Mathematical operators (_+, -, *, /_)
- Logical operators (_AND, OR, NOT_)
- NULL value predicates (_IS NULL, IS NOT NULL_)
- Other comparison operators (_LIKE, RLIKE, IN_)

### Relation Operators

- Return a boolean result
- Comparisons can be made to values and to other fields of the same type
- If either field being compared is multi-value the result will be NULL
- Only certain fields are supported (_date, numbers, text, keywords, IP_)

### Mathematical Operators

- EVAL's best friend
- If either field is multi-value the result will be NULL
- Only certain fields are supported (_date, numbers, text, keywords, IP_)

### Logical Operators

- Serve them with a side of parantheses for best results

### NULL Values

- When ingesting data, empty fields will be set to NULL
- By default NULL values are larger than other values
- NULL values are ignored when included in calculations
- Great for finding fields that contain data

### LIKE

- Matches a string against a pattern using wildcards
  - ```*``` matches zero or more matches
  - ```?``` matches one character

### RLIKE

- Matches strings using RegEx
- More versatile than the LIKE operator but more compute intensive
- Useful for matching known complex patterns

### IN

- Matches values in a comma-separated list of literals, fields, or expressions
- Useful when filtering for multiple values

### Comments

- Helpful for testing parts of a query, debugging, and documenting

```
// for single line comments
/* and */ for block comments
```

### Metadata Fields

- ES|QL can access these metadata fields by using the METADATA directive in the FROM command:
  - _index: Index in which the document is stored
  - _id: Unique identifier for the document
  - _version: Version of the document

## Functions

Functions that help work with data:

- Working with strings
- IP address CIDR notation search
- Grouping Functions
- Aggregation Functions

### IP Functions - CIDR_MATCH

- Used for IPv4/IPv6 CIDR matching
- Returns "true" if the IP is contained in the specified CIDR blocks

### String Functions - to/from base64

- Encoding is useful to obfuscate URL paths, process arguments, ...
- Further commands can be appended afterwards
- Query will crash if no base64 values are ingested

### String Functions - TO_LOWER/TO_UPPER

- These commands will convert input text to either uppercase or lowercase
- Useful in case insensivity situations

### Aggregate Functions - STATS [...] BY

- "STATS ... BY" will group rows into buckets based on a common value you specify
- Can be used to calculate one or more aggregated values over grouped rows
- If "BY" is omitted no grouping will happen and only one calculation over all data will occur
- Multiple aggregation functions are supported (_Avg, Count, Sum, Percentile, ..._)

### Grouping Functions - Bucket

- Creates groups of values out of a numeric or date range
- Useful to find anomalies in data over time or numeric data

Bucket can be used in 2-parameter mode

- Useful for when you don't want to specify the interval:
  - Second parameter is the size of each bucket
  - It must be a double for numbers or a time period for dates

## Investigating Events

### ES|QL within Timeline

- Timeline is the investigative pane in Security
- Use ES|QL to find specific events
- Cannot pin events like in query
- Staging area for rule creation

### Building ES|QL Security Queries

- Understand what data is available
  - Which integrations do you have?
  - What fields are available?
- Define the goals and scope of the query
  - Similar to hypothesis-driven threat hunting
  - What fields and ES|QL functions are necessary?
- Develop the query:
  - gather the necessary information
  - aggregations can provide unexpected results, test them separately
  - remember you can comment out
  - leave LIMIT and data conversions until the end if possible

## Rule Creation with ES|QL

### Rule Creation Workflow

- Create ES|QL queries in Timeline or Discover first
- Create ES|QL rules in second
- Considerations:
  - Is this query applicable over time?
  - Do I want this query running on a schedule?
  - Will this query result in false positives? How many?
- Use your "strongest" ES|QL queries

### Aggregating vs Non-Aggregating Rules

- Aggregating rules
  - Use STATS... BY functions
  - Create a new field
  - Performs some type of mathematical operation
- Non-Aggregating rules
  - Non-aggregating queries retrieve specific records without performing calculations on grouped data
  - Necessary for de-duplication

### Rule Creation

- You can optionally assign a Timeline template to aide your analysis when this alert triggers
- Identifying information on the rule goes in the "About rule" section
- Set the schedule that your rule will run
  - a rule that runs every 5 minutes with 1 additional look-back minute will look at the last 6 minutes of data
- Alerts can also be sent via connectors

### Considerations When Writing Rules

- The LIMIT command specifies the number of rows that can be returned
- A detection rule's max_signals setting specifies the maximum number of alerts it can create every time it runs
  - The max_signals default value is 100
- If the LIMIT value is lower than the max_signals value, the rule uses the LIMIT value to determine the maximum number of alerts the rule generates
  - If the LIMIT value is higher than the max_signals value, the rule uses the max_signals value