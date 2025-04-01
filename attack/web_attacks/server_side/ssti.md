- [Server-Side Template Injection (SSTI)](#server-side-template-injection-ssti)
  - [Teamplating](#teamplating)
  - [SSTI](#ssti)
    - [Identifying](#identifying)
      - [Confirming SSTI](#confirming-ssti)
      - [Identifying the Template Engine](#identifying-the-template-engine)

---

# Server-Side Template Injection (SSTI)

Web applications can utilize templating engines and server-side templates to generate responses such as HTML content dynamically. This generation is often based on user input, enabling the web application to respond to user input dynamically. When an attacker can inject templacte code, a SSTI vulnerability can occur. STTI can lead to various security risks, including data leakage and even full server compromise via remote code execution.

## Teamplating

> [!NOTE]
> An everyday use case for template engines is a website with shared headers and footers for all pages. A template can dynamically add content but keep the header and footer the same. This avoids duplicates instances of header and footer in different places, reducing complexity and thus enabling better code maintainability. Popular examples of template engines are Jinja and Twig.

Template engines typically require two inputs: a **template** and a **set of values** to be inserted into the template. The template can typically be provided as a string or a file and contains pre-defined places where the template engine inserts the dynamically generated values. The values are provided as key-value pairs so the template engine can place the provided value at the location in the template marked with the corresponding key. Generating a string from the input template and input values is called _rendering_.

Jinja template string example:

```jinja
Hello {{ name }}!
```

It contains a single variable called ```name```, which is replaced with a dynamic value during rendering. When the template is rendered, the template engine must be provided with a value for the variable ```name```. For instance, if you provide the variable ```name="vautia"``` to the rendering function, the template engine will generate the following string:

```bash
Hello vautia!
```

A more complex example:

```jinja
{% for name in names %}
Hello {{ name }}!
{% endfor %}
```

The template contains a for-loop that loops over all elements in a variable ```names```. As such, you need to provide the rendering function with an object in the ```names``` variable that it can iterate over. For instance, if you pass the function with a list such as ```names=["vautia", "21y4d", "Pendant"]```, the template engine will generate the following string:

```bash
Hello vautia!
Hello 21y4d!
Hello Pedant!
```

## SSTI

... occurs when an attacker can inject templating code into a template that is later rendered by the server. If an attacker injects malicious code, the server potentially executes the code during the rendering process, enabling an attacker to take over the server completely.

### Identifying

#### Confirming SSTI

The most effective way is to inject special characters with semantic meaning in template engines and observe the web app's behavior. As such, the following test string is commonly used to provoke an error message in a web app vulnerable to SSTI, as it consists of all special characters that have a particular semantic purpose in popular template engines:

```
${{<%[%'"}}%\.
```

Since the above test string should almost certainly violate the template syntax, it should result in an error if the web app is vulnerable to SSTI. This behavior is similar to how injecting a single quote into a web app vulnerable to SQLi can break an SQL query's syntax and thus result in an SQL error.

Legit string:

![ssti 1](../../../images/ssti_1.png)

Using the test string:

![ssti 2](../../../images/ssti_2.png)

While this does not confirm that the web application is vulnerable to SSTI, it should increase your suspicion that the parameter might be vulnerable.

#### Identifying the Template Engine

To enable the successful exploitation of an SSTI vuln, you first need to determine the template engine used by the web application. You can utilize slight variations in the behavior of different template engines to achieve this. For instance, consider the following commonly used overview containing slight differences in popular template engines:

```mermaid
flowchart LR
    A["${7*7}"]
    B["a{\*comment\*}b"]
    C["${´´z´´.join(´´ab´´)}"]
    D["{{7*7}}"]
    E["{{7*'7'}}"]

    F["Not vulnerable"]

    G["Unknown"]
    H["Unknown"]

    I["Smarty"]
    J["Mako"]
    K["Jinja2"]
    L["Twig"]

    A --> B 
    B --> I
    B --> C
    C --> J
    C --> G

    linkStyle 0 stroke: green;
    linkStyle 1 stroke: green;
    linkStyle 2 stroke: red;
    linkStyle 3 stroke: green;
    linkStyle 4 stroke: red;

    A --> D
    D --> E
    D --> F
    E --> K
    E --> L
    E --> H

    linkStyle 5 stroke: red;
    linkStyle 6 stroke: green;
    linkStyle 7 stroke: red;
    linkStyle 8 stroke: green;
    linkStyle 9 stroke: green;
    linkStyle 10 stroke: red;

```

Example:

![ssti 3](../../../images/ssti_3.png)

Since the payload was not executed, you follow the red arrow and now inject the payload ```{{7*7}}```.

![ssti4](../../../images/ssti_4.png)

This time, the payload was executed by the template engine. Therefore, you follow the green arrow and inject the payload ```{{7*'7'}}```.

> [!TIP]
> In Jinja the result will be **7777777**.<br>
> In Twig the result will be **49**.