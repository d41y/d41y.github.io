- [Data Modelling](#data-modelling)
  - [Strings](#strings)
    - [Modelling](#modelling)
      - [Analysis Makes Text Searchable](#analysis-makes-text-searchable)
    - [Analyzers](#analyzers)
      - [Anatomy of an Analyzer](#anatomy-of-an-analyzer)
      - [Standard Analyzer](#standard-analyzer)
      - [Testing an Analyzer](#testing-an-analyzer)
    - [Text and Keyword](#text-and-keyword)
      - [Keyword vs. Text](#keyword-vs-text)
  - [Mapping](#mapping)
    - [Data Types for Fields](#data-types-for-fields)
    - [Defining a Mapping](#defining-a-mapping)
    - [When not Defining a Mapping](#when-not-defining-a-mapping)
    - [Multi-fields](#multi-fields)
      - [Text and Keyword in Mapping](#text-and-keyword-in-mapping)
      - [Multi-fields in the Mapping](#multi-fields-in-the-mapping)
    - [Mapping-Optimization](#mapping-optimization)
      - [Dynamic Mapping rarely optimal](#dynamic-mapping-rarely-optimal)
      - [Can you change a Mapping?](#can-you-change-a-mapping)
      - [Fixing Mappings](#fixing-mappings)
      - [Reindex API](#reindex-api)
      - [Defining your own Mapping](#defining-your-own-mapping)
      - [Defining your own Mapping manually](#defining-your-own-mapping-manually)
        - [Step 1](#step-1)
        - [Step 2](#step-2)
        - [Step 3](#step-3)
        - [Step 4](#step-4)

---

# Data Modelling

## Strings

### Modelling

#### Analysis Makes Text Searchable

- By defualt, text analysis breaks up a text string into individual words (_tokens_) and lowercases those words

### Analyzers

- Text analysis is done by an analyzer
- By default, Elasticsearch applies the standard analyzer
- There are many other built-in analyzers, including:
  - whitespace, stop, pattern, simple, language-specific analyzers, and more
- The built-in analyzers work great for many use cases
  - you can also define your own custom analyzers

#### Anatomy of an Analyzer

- An analyzer consists of:
  - zero or more character filters
  - exactly one tokenizer
  - zero or more token filters

#### Standard Analyzer

- The default analyzer
- No character filters
- Uses the standard tokenizer
- Lowercases all tokens
- Optionally removes stop words

#### Testing an Analyzer

- Use the ```_analyze``` API to test what an analyzer will do to next

Request:

```
GET _analyze
{
"analyzer": "english",
"text": "Tuning Go Apps in a Beat"
}
```

```mermaid
flowchart LR

    A["Tuning Go Apps in a Beat"]
    B[<b>english</b><br>analyzer]
    C[tune<br>go<br>app<br>beat]

    A --> B --> C
```

### Text and Keyword

#### Keyword vs. Text

- Elasticsearch has two kinds of string data types:
  - **text**, for full-text search:
    - text fields are analyzed
  - **keyword**, for aggregations, sorting, and exact searches:
    - keyword fields are not analyzed
    - the original strings, as they occur in the documents

## Mapping

- A mapping is a per-index schema definition that contains:
  - name of fields
  - data types of fields
  - how the field should be indexed and stored
- Elasticsearch will happily index any document without knowing its details
  - however, behind the scenes, Elasticsearch assigns data types to your fields in a mapping

### Data Types for Fields

- Simple Types:
  - **text**: for full-text strings
  - **keyword**: for exact value strings and aggregations
  - **date** and **date_nanos**: string formatted as dates, or numeric dates
  - numbers: **byte**, **short**, **integer**, **long**, **float**, **double**, **half_float**
  - **boolean**
  - **geo** types
- Hierarchical types: **obbjects**, **nested**

### Defining a Mapping

- In many cases, you will need to define your own mapping
- Defined in the mappings section of an index

```
PUT my_index
{
    "mappings": {
        define mappings here
    }
}
```

```
PUT my_index/_mapping
{
    additional mappings here
}
```

### When not Defining a Mapping

- When you index a document with unmapped fields, Elasticsearch dynamically creates the mapping for those fields
  - fields not already defined in a mapping are added

```
POST my_blogs/_doc
{
    "username": "kimchy",
    "comment": "Search is something that any application should have",
    "details": {
        "created_at": "2024-08-23T15:48:50",
        "version": 8.15,
        "employee": true
    }
}
```

... turns into:

```json
"my_blogs" : {
    "mappings" : {
        "properties" : {
            ...
            "details" : {
                "properties" :
                    "created_at" : {
                        "type" : "date"
                    },
                    "employee" : {
                        "type" : "boolean"
                    },
                    "version" : {
                        "type" : "float"
                    }}},
            "username" : {
                "type" : "text",
                "fields" : {
                    "keyword" : {
                        "type" : "keyword",
                        "ignore_above" : 256
                    }
}}}}}
```

### Multi-fields

#### Text and Keyword in Mapping

- Elasticsearch will give you both ```text``` and ```keyword``` by default

```
POST my_index/_doc
{
    "country_name": "United States"
}
```

- ```country_name``` is analyzed
- ```country_name.keyword``` is not analyzed

#### Multi-fields in the Mapping

- The ```country_name``` field is of type ```text```
- ```country_name.keyword``` is the keyword version of the country_name field

Request:

```
GET my_index/_mapping
```

Response:

```json
{
    "my_index" : {
        "mappings" : {
            "properties" : {
                "country_name" : {
                    "type" : "text",
                    "fields" : {
                        "keyword" : {
                            "type" : "keyword",
                            "ignore_above" : 256
                        }
                    }
                }
            }
        }
    }
}
```

### Mapping-Optimization

#### Dynamic Mapping rarely optimal

- for example, the default for an integer is ```long```
  - not always appropriate for the content
- A more tailored type can help save on memory and speed

#### Can you change a Mapping?

- **No** - not without reindexing your documents
  - adding new fields is possible
  - all other mapping changes require reindexing
- **Why not?**
  - if you could switch a field's data type, all the values that were already indexed before the switch would become unsearchable on that field
- Invest the time to create a great mapping before you go to production

#### Fixing Mappings

- Create a new index with the updated mapping

```
PUT blogs_v2
{
    "mappings": {
        "properties": {
            "publish_date": {
                "type": "date"
            }
        }
    }
}
```

#### Reindex API

- To populate the new index, use the ```reindex API```
  - reads data from one index and indexes them into another
  - use it to modify your mappings

```
POST _reindex
{
    "source": {
        "index": "blogs"
    },
    "dest": {
        "index": "blogs_v2"
    }
}
```

#### Defining your own Mapping

- Kibana's file uploader does an excellent job of guessing data types
  - allows you to customize the mapping before index creation

#### Defining your own Mapping manually

- if not using the file uploader, to define an explicit mapping, follow these steps:
  1. Index a sample document that contains the fields you want defined in the mapping
  2. Get the dynamic mapping that was created automatically by Elasticsearch
  3. Modify the mapping definition
  4. Create your index using your custom mapping

##### Step 1

- Start by indexing a document into a dummy index
  - Use values that will map closely to the data types you want

```
PUT blogs_temp/_doc/1
{
    "date": "November 22, 2024",
    "author": "Firstname Lastname",
    "title": "Elastic is Open Source",
    "seo_title": "A Good SEO Title",
    "url": "/blog/some-url",
    "content": "blog content",
    "locale": "ja-jp",
    "@timestamp": "2024-11-22T07:00:00.000Z",
    "category": "Engineering"
}
```

##### Step 2

- GET the mapping, then copy-paste it into Console
  - in Kibana's file uploader, this is the ```Advanced``` section after ```Import```

```json
"blogs_temp": {
    "mappings": {
        "properties": {
            "@timestamp": {
                "type": "date"
            },
            "content": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "category": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
...
```

##### Step 3

- Define the mappings according to your use case:
  - ```keyword``` might work well for ```category```
  - ```content``` may only need to be ```text```

```json
    "mappings": {
        "properties": {
            "@timestamp": {
                "type": "date"
            },
            "content": {
                "type": "text"
            },
            "category": {
                "type": "keyword"
            }
...
```

##### Step 4

- ```new_blogs``` is now a new index with our explicit mappings
- Documents can now be indexed

```
PUT new_blogs
{
    "mappings": {
        "properties": {
            "@timestamp": {
                "type": "date"
            },
            "category": {
                "type": "keyword"
            },
            "content": {
                "type": "text"
            },
...
```