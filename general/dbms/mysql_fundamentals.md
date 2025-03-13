- [MySQL](#mysql)
  - [Command line](#command-line)
  - [Creating a Database](#creating-a-database)
  - [Tables](#tables)
    - [Table properties](#table-properties)
  - [Statements](#statements)
    - [INSERT Statement](#insert-statement)
    - [SELECT Statement](#select-statement)
    - [DROP Statement](#drop-statement)
    - [ALTER Statement](#alter-statement)
    - [UPDATE Statement](#update-statement)
  - [Query Results](#query-results)
    - [Sorting Results](#sorting-results)
    - [Limit Results](#limit-results)
    - [WHERE Clause](#where-clause)
    - [LIKE Clause](#like-clause)
  - [SQL Operators](#sql-operators)
    - [AND](#and)
    - [OR](#or)
    - [NOT](#not)
    - [Symbol Operators](#symbol-operators)
    - [Operators in Queries](#operators-in-queries)
    - [Multiple Operator Precedence](#multiple-operator-precedence)

---

# MySQL

## Command line

The ```mysql``` utility is used to authenticate to and interact with a MySQL/MariaDB database. The ```-u``` flag is used to supply the username and the ```-p``` flag for the password, which should be passed empty, so you are prompted to enter the passwort and do not pass it directly on the command line since it could be stored in cleartext in the ```bash_history```.

```bash
d41y@htb[/htb]$ mysql -u root -p

Enter password: <password>
...SNIP...

mysql> 

# or

d41y@htb[/htb]$ mysql -u root -p<password> # no spaces between '-p' and the password

...SNIP...

mysql> 
```

When you do not specify a host, it will default to the ```localhost``` server. You can specify a remote host and port using the ```-h``` and ```-P``` flag.

```bash
d41y@htb[/htb]$ mysql -u root -h docker.hackthebox.eu -P 3306 -p 

Enter password: 
...SNIP...

mysql> 
```

> [!TIP]
> The default MySQL/MariaDB port is 3306, but can be configured to another port.

## Creating a Database

Once you log in to the database using the ```mysql``` utility, you can start using SQL queries to interact with the DBMS.

```bash
mysql> CREATE DATABASE users;

Query OK, 1 row affected (0.02 sec)

mysql> SHOW DATABASES;

+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| users              |
+--------------------+

mysql> USE users;

Database changed
```

## Tables

DBMS stores data in the form of tables. A table is made up of horizontal rows and vertical columns. The intersection of a row and a column is called a cell. Every table is created with a fixed set of columns, where each column is of a particular data type.

A data type defines what kind of value is to be held by a column. [Here](https://dev.mysql.com/doc/refman/8.0/en/data-types.html) is a list of all data types in MySQL.

```bash
mysql> CREATE TABLE logins (
    ->     id INT,
    ->     username VARCHAR(100),
    ->     password VARCHAR(100),
    ->     date_of_joining DATETIME
    ->     );
Query OK, 0 rows affected (0.03 sec)
```

The ```CREATE TABLE``` first specifies the table name, and then you specify each column by its name and its data type, all being comma separated. After the name and type, you can specify properties.


A list of all tables in the current database can be obtained using the ```SHOW TABLES``` statement. In addition, the ```DESCRIBE``` keyword is used to list the table structure with its fields and data types.

```bash
mysql> DESCRIBE logins;

+-----------------+--------------+
| Field           | Type         |
+-----------------+--------------+
| id              | int          |
| username        | varchar(100) |
| password        | varchar(100) |
| date_of_joining | date         |
+-----------------+--------------+
4 rows in set (0.00 sec)
```

### Table properties

Table properties in MySQL include the storage engine, auto-increment settings, indexes, character sets, collation, and foreign key constraints, among others. These properties control how the table stores data, enforces data integrity, and optimizes performance.

```sql
id INT NOT NULL AUTO_INCREMENT,
/*automatically increments the id by one every time a new item is added to the table*/

username VARCHAR(100) UNIQUE NOT NULL,
/*ensures that a particular column is never left empty*/

date_of_joining DATETIME DEFAULT NOW(),
/*used to specify the default value*/

PRIMARY KEY (id)
/*used to uniquely identify each record in the table, referring to all data of a record within a table for relational databases*/
```

The final ```CREATE TABLE``` statement:

```sql
CREATE TABLE logins (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    date_of_joining DATETIME DEFAULT NOW(),
    PRIMARY KEY (id)
    );
```

## Statements

### INSERT Statement

... used to add new records to a given table.

```bash
mysql> INSERT INTO logins VALUES(1, 'admin', 'p@ssw0rd', '2020-07-02');

Query OK, 1 row affected (0.00 sec)
```

You can skip filling columns with default values, such as ```id``` and ```date_of_joining```. This can be done by specifying the column names to insert values into a table selectively:

```bash
mysql> INSERT INTO logins(username, password) VALUES('administrator', 'adm1n_p@ss');

Query OK, 1 row affected (0.00 sec)
```

You can also insert multiple records at once:

```bash
mysql> INSERT INTO logins(username, password) VALUES ('john', 'john123!'), ('tom', 'tom123!');

Query OK, 2 rows affected (0.00 sec)
Records: 2  Duplicates: 0  Warnings: 0
```

### SELECT Statement

... lets you retrieve data.

```bash
mysql> SELECT * FROM logins;

+----+---------------+------------+---------------------+
| id | username      | password   | date_of_joining     |
+----+---------------+------------+---------------------+
|  1 | admin         | p@ssw0rd   | 2020-07-02 00:00:00 |
|  2 | administrator | adm1n_p@ss | 2020-07-02 11:30:50 |
|  3 | john          | john123!   | 2020-07-02 11:47:16 |
|  4 | tom           | tom123!    | 2020-07-02 11:47:16 |
+----+---------------+------------+---------------------+
4 rows in set (0.00 sec)


mysql> SELECT username,password FROM logins;

+---------------+------------+
| username      | password   |
+---------------+------------+
| admin         | p@ssw0rd   |
| administrator | adm1n_p@ss |
| john          | john123!   |
| tom           | tom123!    |
+---------------+------------+
4 rows in set (0.00 sec)
```

### DROP Statement

... are used to remove tables and databases from the server.

```bash
mysql> DROP TABLE logins;

Query OK, 0 rows affected (0.01 sec)


mysql> SHOW TABLES;

Empty set (0.00 sec)
```

### ALTER Statement

... are used to change the name of any table and any of its fields or to delete or add a new column to an existing table.

```bash
mysql> ALTER TABLE logins ADD newColumn INT;
# adds a new column 'newColumn' to the logins table using 'ADD'
Query OK, 0 rows affected (0.01 sec)

...

mysql> ALTER TABLE logins RENAME COLUMN newColumn TO newerColumn;
# renames the column 'newColumn' to 'newerColumn'
Query OK, 0 rows affected (0.01 sec)

...

mysql> ALTER TABLE logins MODIFY newerColumn DATE;
# changes the  datatype of the 'logins' column to 'DATE'
Query OK, 0 rows affected (0.01 sec)

...

mysql> ALTER TABLE logins DROP newerColumn;
# drops the column 'newerColumn'
Query OK, 0 rows affected (0.01 sec)
```

### UPDATE Statement

While ```ALTER``` is used to change a table's properties, the ```UPDATE``` statement can be used to update specific records within a table, based on certain conditions.

```bash
mysql> UPDATE logins SET password = 'change_password' WHERE id > 1;

Query OK, 3 rows affected (0.00 sec)
Rows matched: 3  Changed: 3  Warnings: 0


mysql> SELECT * FROM logins;

+----+---------------+-----------------+---------------------+
| id | username      | password        | date_of_joining     |
+----+---------------+-----------------+---------------------+
|  1 | admin         | p@ssw0rd        | 2020-07-02 00:00:00 |
|  2 | administrator | change_password | 2020-07-02 11:30:50 |
|  3 | john          | change_password | 2020-07-02 11:47:16 |
|  4 | tom           | change_password | 2020-07-02 11:47:16 |
+----+---------------+-----------------+---------------------+
4 rows in set (0.00 sec)
```

## Query Results

### Sorting Results

You can sort the results of any query using ```ORDER BY``` and specifying the column to sort by.

```bash
mysql> SELECT * FROM logins ORDER BY password;

+----+---------------+------------+---------------------+
| id | username      | password   | date_of_joining     |
+----+---------------+------------+---------------------+
|  2 | administrator | adm1n_p@ss | 2020-07-02 11:30:50 |
|  3 | john          | john123!   | 2020-07-02 11:47:16 |
|  1 | admin         | p@ssw0rd   | 2020-07-02 00:00:00 |
|  4 | tom           | tom123!    | 2020-07-02 11:47:16 |
+----+---------------+------------+---------------------+
4 rows in set (0.00 sec)
```

by default, the sort is done in ascending order, but you can also sort the results by ```ASC``` or ```DESC```.

It is also possible to sort by multiple columns, to have secondary sort for duplicate calues in one column.

```bash
mysql> SELECT * FROM logins ORDER BY password DESC, id ASC;

+----+---------------+-----------------+---------------------+
| id | username      | password        | date_of_joining     |
+----+---------------+-----------------+---------------------+
|  1 | admin         | p@ssw0rd        | 2020-07-02 00:00:00 |
|  2 | administrator | change_password | 2020-07-02 11:30:50 |
|  3 | john          | change_password | 2020-07-02 11:47:16 |
|  4 | tom           | change_password | 2020-07-02 11:50:20 |
+----+---------------+-----------------+---------------------+
4 rows in set (0.00 sec)
```

### Limit Results

In case your query returns a large number of records, you can ```LIMIT``` the results to what you want only, using ```LIMIT``` and the number of records you want.

```bash
mysql> SELECT * FROM logins LIMIT 2;

+----+---------------+------------+---------------------+
| id | username      | password   | date_of_joining     |
+----+---------------+------------+---------------------+
|  1 | admin         | p@ssw0rd   | 2020-07-02 00:00:00 |
|  2 | administrator | adm1n_p@ss | 2020-07-02 11:30:50 |
+----+---------------+------------+---------------------+
2 rows in set (0.00 sec)
```

To use an offset, you could specify the offset before the ```LIMIT``` count.

```bash
mysql> SELECT * FROM logins LIMIT 1, 2;

+----+---------------+------------+---------------------+
| id | username      | password   | date_of_joining     |
+----+---------------+------------+---------------------+
|  2 | administrator | adm1n_p@ss | 2020-07-02 11:30:50 |
|  3 | john          | john123!   | 2020-07-02 11:47:16 |
+----+---------------+------------+---------------------+
2 rows in set (0.00 sec)
```

> [!NOTE]
> In a MySQL query, the ```OFFSET``` keyword is used to specify the number of rows to skip before starting to return the results, typically used in conjunction with ```LIMIT``` for pagination.

### WHERE Clause

... is used to filter or search for specific data with the ```SELECT``` statement.

```bash
mysql> SELECT * FROM logins WHERE id > 1;

+----+---------------+------------+---------------------+
| id | username      | password   | date_of_joining     |
+----+---------------+------------+---------------------+
|  2 | administrator | adm1n_p@ss | 2020-07-02 11:30:50 |
|  3 | john          | john123!   | 2020-07-02 11:47:16 |
|  4 | tom           | tom123!    | 2020-07-02 11:47:16 |
+----+---------------+------------+---------------------+
3 rows in set (0.00 sec)
```

### LIKE Clause

... enables selecting records by matching a certain pattern.

```bash
mysql> SELECT * FROM logins WHERE username LIKE 'admin%';

+----+---------------+------------+---------------------+
| id | username      | password   | date_of_joining     |
+----+---------------+------------+---------------------+
|  1 | admin         | p@ssw0rd   | 2020-07-02 00:00:00 |
|  4 | administrator | adm1n_p@ss | 2020-07-02 15:19:02 |
+----+---------------+------------+---------------------+
2 rows in set (0.00 sec)
```

> [!NOTE]
> ```%``` matches any string of zero or more characters except null<br>
> ```_``` matches any single character

> [!TIP]
> In MySQL you can also use RegEx pattern matching. Take a [look](https://dev.mysql.com/doc/refman/8.4/en/pattern-matching.html)!

## SQL Operators

### AND

... takes in two conditions and returns ```true``` or ```false``` based on their evaluation.

In MySQL terms, any non-zero value is considered ```true```, and it usually returns the value '1' to signify ```true```. ```0``` is considered ```false```.

```bash
mysql> SELECT 1 = 1 AND 'test' = 'test';

+---------------------------+
| 1 = 1 AND 'test' = 'test' |
+---------------------------+
|                         1 |
+---------------------------+
1 row in set (0.00 sec)

mysql> SELECT 1 = 1 AND 'test' = 'abc';

+--------------------------+
| 1 = 1 AND 'test' = 'abc' |
+--------------------------+
|                        0 |
+--------------------------+
1 row in set (0.00 sec)
```

### OR

... takes in two expressions, and returns ```true``` when at least one of them evaluates to ```true```.

```bash
mysql> SELECT 1 = 1 OR 'test' = 'abc';

+-------------------------+
| 1 = 1 OR 'test' = 'abc' |
+-------------------------+
|                       1 |
+-------------------------+
1 row in set (0.00 sec)

mysql> SELECT 1 = 2 OR 'test' = 'abc';

+-------------------------+
| 1 = 2 OR 'test' = 'abc' |
+-------------------------+
|                       0 |
+-------------------------+
1 row in set (0.00 sec)
```

### NOT

... toggles a boolean value.

```bash
mysql> SELECT NOT 1 = 1;

+-----------+
| NOT 1 = 1 |
+-----------+
|         0 |
+-----------+
1 row in set (0.00 sec)

mysql> SELECT NOT 1 = 2;

+-----------+
| NOT 1 = 2 |
+-----------+
|         1 |
+-----------+
1 row in set (0.00 sec)
```

### Symbol Operators

```AND```, ```OR```, and ```NOT``` can also be represented as ```&&```, ```||``` and ```!```.

```bash
mysql> SELECT 1 = 1 && 'test' = 'abc';

+-------------------------+
| 1 = 1 && 'test' = 'abc' |
+-------------------------+
|                       0 |
+-------------------------+
1 row in set, 1 warning (0.00 sec)

mysql> SELECT 1 = 1 || 'test' = 'abc';

+-------------------------+
| 1 = 1 || 'test' = 'abc' |
+-------------------------+
|                       1 |
+-------------------------+
1 row in set, 1 warning (0.00 sec)

mysql> SELECT 1 != 1;

+--------+
| 1 != 1 |
+--------+
|      0 |
+--------+
1 row in set (0.00 sec)
```

### Operators in Queries

Example 1:

```bash
mysql> SELECT * FROM logins WHERE username != 'john';

+----+---------------+------------+---------------------+
| id | username      | password   | date_of_joining     |
+----+---------------+------------+---------------------+
|  1 | admin         | p@ssw0rd   | 2020-07-02 00:00:00 |
|  2 | administrator | adm1n_p@ss | 2020-07-02 11:30:50 |
|  4 | tom           | tom123!    | 2020-07-02 11:47:16 |
+----+---------------+------------+---------------------+
3 rows in set (0.00 sec)
```

Example 2:

```bash
mysql> SELECT * FROM logins WHERE username != 'john' AND id > 1;

+----+---------------+------------+---------------------+
| id | username      | password   | date_of_joining     |
+----+---------------+------------+---------------------+
|  2 | administrator | adm1n_p@ss | 2020-07-02 11:30:50 |
|  4 | tom           | tom123!    | 2020-07-02 11:47:16 |
+----+---------------+------------+---------------------+
2 rows in set (0.00 sec)
```

### Multiple Operator Precedence

SQL supports various other operations such as addition, division as well as bitwise operations. [Here](https://mariadb.com/kb/en/operator-precedence/) is a list of common operations and their precedence.

Example:

```bash
mysql> select * from logins where username != 'tom' AND id > 3 - 2;

+----+---------------+------------+---------------------+
| id | username      | password   | date_of_joining     |
+----+---------------+------------+---------------------+
|  2 | administrator | adm1n_p@ss | 2020-07-03 12:03:53 |
|  3 | john          | john123!   | 2020-07-03 12:03:57 |
+----+---------------+------------+---------------------+
2 rows in set (0.00 sec)
```