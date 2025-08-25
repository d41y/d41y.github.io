- [Attacking SQL](#attacking-sql)
  - [Enumeration](#enumeration)
  - [Authentication Methods](#authentication-methods)

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

