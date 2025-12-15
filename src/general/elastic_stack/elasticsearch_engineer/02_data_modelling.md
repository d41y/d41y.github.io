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

## Types and Parameters

### Mapping Parameters

- In addition to the ```type```, fileds in a mapping can be configured with additional parameters
  - for example to set the analyzer for a text field:

```json
"mappings": {
    "properties": {
    ...
        "content": {
        "type": "text",
        "analyzer": "english"
    },
...
```

#### Date Formats

- Use ```format``` to set the ```date format``` used for date fields
  - defaults to ISO 8601
- Choose from built-in date formats or define your own custom format

```json
"properties": {
    "my_date_field" : {
        "type": "date",
        "format": "dd/MM/yyyy||epoch_millis"
    }
}
```

#### Coercing Data

- by default, Elasticsearch attempts to coerce data to match the data type of the field
  - for example, suppose the ```rating``` field is a ```long```:

```
PUT ratings/_doc/1
{
    "rating": 4
}
PUT ratings/_doc/2
{
    "rating": "3"
}
PUT ratings/_doc/3
{
    "rating": 4.5
}
```

- You can disable coercion if you want Elasticsearch to reject documents that have unexpected values:

```json
"mappings": {
    "properties": {
        "rating": {
            "type": "long",
            "coerce": false
        }
```

#### Not Storing Doc Values

- By default, Elasticsearch creates a ```doc values``` data structure for many fields during indexing
  - doc values enable you to aggregate/sort on those fields
  - but take up disk space
- Fields that won't be used for aggregations or sorting:
  - set ```doc_values``` to ```false```

```json
"url" : {
    "type": "keyword",
    "doc_values": false
}
```

#### Not Indexing a Field

- By default, for every field, Elasticsearch creates a data structure that enables fast queries
  - ```inverted index``` or ```BKD tree```
  - takes up disk space
- Set ```index``` to ```false``` for fields that do not require fast querying
  - fields with doc values still support slower queries

```json
"display_name": {
    "type": "keyword",
    "index": false
}
```

#### Disabling a Field

- A field that won't be used at all and should just be stored in ```_source```:
  - set ```enabled``` to ```false```

```json
"display_name": {
    "enabled": false
}
```

#### copy_to Parameter

- Consider a document with three location fields:

```
POST locations/_doc
{
    "region_name": "Victoria",
    "country_name": "Australia",
    "city_name": "Surrey Hills"
}
```

- You could use a ```bool```/```multi_match``` query to search all three fields
- Or you could copy all three values to a single field during indexing using ```copy_to```

```json
"properties": {
    "region_name": {
        "type": "keyword",
        "index": "false",
        "copy_to": "locations_combined"
    },
    "country_name": {
        "type": "keyword",
        "index": "false",
        "copy_to": "locations_combined"
    },
    "city_name": {
        "type": "keyword",
        "index": "false",
        "copy_to": "locations_combined"
    },
    "locations_combined": {
    "type": "text"
    }
```

- The ```locations_combined``` field is not stored in the ```_source```
  - but it is indexed, so you can query it

Request:

```
GET locations/_search
{
    "query": {
        "match": {
            "locations_combined": "victoria australia"
        }
    }
}
```

Response:

```json
"hits": [
    {
        "_index": "weblogs",
        "_type": "_doc",
        "_id": "1",
        "_score": 0.5753642,
        "_source": {
            "region_name": "Victoria",
            "country_name": "Australia",
            "city_name": "Surrey Hills"
        }
    }
```

### Dynamic Data

#### Use Case

- Manually defining a mapping can be tedious when you:
  - have documents with a large number of fields
  - or don't know the fields ahead of time
  - or want to change the default mapping for certain field types
- Use dynamic templates to define a field's mapping based on one of the following:
  - the field's date type
  - the name of the field
  - the path of the field

- Map any string field with a name that starts with ```ip*``` as type IP:

```
PUT my_index
{
    "mappings": {
        "dynamic_templates": [
            {
                "strings_as_ip": {
                    "match_mapping_type": "string",
                    "match": "ip*",
                    "mapping": {
                        "type": "ip"
                    }
                }
            }
        ]
    }
}
```

Request:

```
POST my_index/_doc
{
    "ip_address": "157.97.192.70"
}

GET my_index/_mapping
```

Response:

```json
"properties" : {
    "ip_address" : {
        "type" : "ip"
    }
}
```