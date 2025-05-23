- [Symfony](#symfony)
  - [Initial Setup](#initial-setup)

---

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
