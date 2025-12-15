# [Symfony](https://symfony.com/doc)

## Initial Setup

1. Checking requirements

```bash
symfony check:requirements
```

2. Create app

```bash
symfony new my_project_directory --version="7.2.x" --webapp
# [--version] is optional
```

3. Installing dependencies into /vendor if needed

```bash
cd my-project/
composer install
```

4. Running the app

```bash
symfony server:start
```

## Setting up DB (MariaDB)

1. Download MySQL
2. Create Database

```sql
MariaDB [(none)]> create database app;
```

3. Create specific user for DB that will later interact with Symfony

```sql
MariaDB [(none)]> create user 'app_user'@'localhost' identified by 'app_user';
```

4. Grant privileges

```sql
MariaDB [(none)]> grant all privileges on app.* to 'app_user'@'localhost';
```

5. Test connection

```bash
user@debian:~$ mysql -u app_user -p
Enter password: 
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 36
Server version: 10.11.11-MariaDB-0+deb12u1 Debian 12

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> select current_user();
+--------------------+
| current_user()     |
+--------------------+
| app_user@localhost |
+--------------------+
1 row in set (0.001 sec)
```

## Enrich DB

1. If followed steps as listed above, generate migration files from current entity mappings first

```bash
user@debian:~/projects/sylius_testing$ php bin/console doctrine:migrations:diff
 Generated new migration class to "/home/user/projects/sylius_testing/migrations/Version20250523185138.php"
 
 To run just this migration for testing purposes, you can use migrations:execute --up "DoctrineMigrations\\Version20250523185138"
 
 To revert the migration you can use migrations:execute --down "DoctrineMigrations\\Version20250523185138"
```

2. Run migration

```bash
user@debian:~/projects/sylius_testing$ php bin/console doctrine:migrations:migrate

 WARNING! You are about to execute a migration in database "app" that could result in schema changes and data loss. Are you sure you wish to continue? (yes/no) [yes]:
 > 

[notice] Migrating up to DoctrineMigrations\Version20250523185138
[notice] finished in 34.7ms, used 24M memory, 1 migrations executed, 1 sql queries
                                                                                                                        
 [OK] Successfully migrated to version: DoctrineMigrations\Version20250523185138                                        
```