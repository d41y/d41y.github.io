- [Sylius](#sylius)
  - [Initial Setup](#initial-setup)

---

# [Sylius](https://stack.sylius.com)

## Initial Setup

1. Install the package

```bash
composer require -W \
  doctrine/orm "^2.16" \
  doctrine/doctrine-bundle \
  pagerfanta/doctrine-orm-adapter \
  symfony/asset-mapper \
  sylius/bootstrap-admin-ui \
  sylius/ui-translations
```

2. Install missing tom-select assets

```bash
symfony console importmap:require tom-select/dist/css/tom-select.default.css
```

