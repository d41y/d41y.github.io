# GraphQL

## Introduction

GraphQL is a query language typically used by web APIs as an alternative to REST. It enables the client to fetch required data through a simple syntax while providing a wide variety of features typically provided by query languages, such as SQL. Like REST APIs, GraphQL APIs can read, update, create, or delete data. However, GraphQL APIs are typically implemented on a single endpoint that handles all queries. As such, one of the primary benefits of using GraphQL over traditional REST APIs is the efficiency in resource utilization and request handling.

### Basic Overview

A GraphQL service typically runs on a single endpoint to receive queries. Most commonly, the endpoint is located at `/graphql`, `/apu/graphql`, or a similar URL. For frontend web applications to use this GraphQL endpoint, it needs to be exposed. Just like REST APIs, you can, however, interact with the GraphQL endpoint directly without going through the frontend web application to identify security vulnerabilities.

From an abstract point of view, GraphQL queries select fields of objects. Each object is of a specific type defined by the backend. The query is structured according to GraphQL syntax, with the name of the query to run at the root. For instance, you can query the id, username, and role fields of all User objects by running the users query:

```graphql
{
  users {
    id
    username
    role
  }
}
```

The resulting GraphQL response is in the same way and might look something like this:

```graphql
{
  "data": {
    "users": [
      {
        "id": 1,
        "username": "htb-stdnt",
        "role": "user"
      },
      {
        "id": 2,
        "username": "admin",
        "role": "admin"
      }
    ]
  }
}
```

If a query supports arguments, you can add a supported argument to filter the query results. For instance, if the query users supports the username argument, you can query a specific user by supplying their username:

```graphql
{
  users(username: "admin") {
    id
    username
    role
  }
}
```

You can add or remove fields from the query you are interested in. For instance, if you are not interested in the role field and instead want to obtain the user's password, you can adjust the query accordingly:

```graphql
{
  users(username: "admin") {
    id
    username
    password
  }
}
```

Furthermore, GraphQL queries support sub-querying, which enables a query to retrieve details from an object that references another object. For instance, assume that a posts query returns a field author that holds a user object. You can then query the username and role of the author in your query like so:

```graphql
{
  posts {
    title
    author {
      username
      role
    }
  }
}
```

The result contains the title of all posts as well as the queried data of the corresponding author:

```graphql
{
  "data": {
    "posts": [
      {
        "title": "Hello World!",
        "author": {
          "username": "htb-stdnt",
          "role": "user"
        }
      },
      {
        "title": "Test",
        "author": {
          "username": "test",
          "role": "user"
        }
      }
    ]
  }
}
```

## Attacking GraphQL

### Information Disclosure

#### Identifying the GraphQL Engine

After logging in to the sample web application and investigating all functionality, you can observe multiple requests to the `/graphql` endpoints that contain GraphQL queries:

![graphql 1](../../../../images/graphql1.png)

Thus, you can definitely say that the web application implements GraphQL. As a first step, you will identify the GraphQL engine used by the web application using the tool [graphw00f](https://github.com/dolevf/graphw00f). Graphw00f will send various GraphQL queries, including malformed queries, and can determine the GraphQL engine by observing the backend's behavior and error messages in response to these queries.

After cloning the git repo, you can run the tool using the `main.py` Python script. You will run the tool in fingerprint (_`-f`_) and detect mode (_`-d`_). You can provide the web application's base URL to let graphw00f attempt to find the GraphQL endpoint by itself:

```bash
d41y@htb[/htb]$ python3 main.py -d -f -t http://172.17.0.2

                +-------------------+
                |     graphw00f     |
                +-------------------+
                  ***            ***
                **                  **
              **                      **
    +--------------+              +--------------+
    |    Node X    |              |    Node Y    |
    +--------------+              +--------------+
                  ***            ***
                     **        **
                       **    **
                    +------------+
                    |   Node Z   |
                    +------------+

                graphw00f - v1.1.17
          The fingerprinting tool for GraphQL
           Dolev Farhi <dolev@lethalbit.com>
  
[*] Checking http://172.17.0.2/
[*] Checking http://172.17.0.2/graphql
[!] Found GraphQL at http://172.17.0.2/graphql
[*] Attempting to fingerprint...
[*] Discovered GraphQL Engine: (Graphene)
[!] Attack Surface Matrix: https://github.com/nicholasaleks/graphql-threat-matrix/blob/master/implementations/graphene.md
[!] Technologies: Python
[!] Homepage: https://graphene-python.org
[*] Completed.
```

As you can see, the graphw00f identified the GraphQL Graphene. Additionally, it provides you with the corresponding detailed page in the GraphQL-Threat-Matrix, which provides more in-depth information about the identified GraphQL engine:

![graphql 2](../../../../images/graphql2.png)

Lastly, by accessing the `/graphql` endpoint in a web browser directly, you can see that the web application runs a graphiql interface. This enables you to provide GraphQL queries directly, which is a lot more convenient than running the queries through Burp, as you do not need to worry about breaking the JSON syntax.

#### Introspection

... is a GraphQL feature that enables users to query the GraphQL API about the structure of the backend system. As such, users can use introspection queries to obtain all queries supported by the API schema. These introspection queries query the `__schema` field.

For instance, you can identify all GraphQL types supported by the backend using the following query:

```graphql
{
  __schema {
    types {
      name
    }
  }
}
```

The results contain basic default types, such as `Int` or `Boolean`, but also all custom types, such as `UserObject`:

![graphql 3](../../../../images/graphql3.png)

Now that you what type, you can follow up and obtain the name of all of the type's fields with the following introspection query:

```graphql
{
  __type(name: "UserObject") {
    name
    fields {
      name
      type {
        name
        kind
      }
    }
  }
}
```

In the result, you can see details you would expect from a user object, such as username and password, as well as their data types:

![graphql 4](../../../../images/graphql4.png)

Furthermore, you can obtain all the queries supported by the backend using this query:

```graphql
{
  __schema {
    queryType {
      fields {
        name
        description
      }
    }
  }
}
```

Knowing all supported queries helps you identify potential attack vectors that you can use to obtain sensitive information. Lastly, you can use the following "general" introspection query that dumps all information about types, fields, and queries supported by the backend:

```graphql
query IntrospectionQuery {
      __schema {
        queryType { name }
        mutationType { name }
        subscriptionType { name }
        types {
          ...FullType
        }
        directives {
          name
          description
          
          locations
          args {
            ...InputValue
          }
        }
      }
    }

    fragment FullType on __Type {
      kind
      name
      description
      
      fields(includeDeprecated: true) {
        name
        description
        args {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        description
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }

    fragment InputValue on __InputValue {
      name
      description
      type { ...TypeRef }
      defaultValue
    }

    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
```

The result of this query is quite large and complex. However, you can visualize the schema using the tool [GraphQL-Voyager](https://github.com/graphql-kit/graphql-voyager).

![graphql 5](../../../../images/graphql5.png)