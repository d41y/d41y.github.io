- [Distributed Datastore](#distributed-datastore)
  - [Understanding Shards](#understanding-shards)
    - [The Cluster](#the-cluster)
    - [The Node](#the-node)
    - [The Index](#the-index)
    - [The Shard](#the-shard)
    - [Primary vs. Replica](#primary-vs-replica)
    - [Configuring the Number of Primaries](#configuring-the-number-of-primaries)
    - [Why only one Primary?](#why-only-one-primary)
    - [Configuring the Number of Replicas](#configuring-the-number-of-replicas)
    - [Why create replicas?](#why-create-replicas)
    - [Scaling ES](#scaling-es)
  - [Scaling ES](#scaling-es-1)
    - [Balancing of Shards](#balancing-of-shards)
    - [Shard Overallocation](#shard-overallocation)
    - [Too much Overallocation](#too-much-overallocation)
    - [Scaling for Reads](#scaling-for-reads)
      - [Scaling for Reads](#scaling-for-reads-1)
      - [Optimzing for Read Throughput](#optimzing-for-read-throughput)
    - [Scaling for Writes](#scaling-for-writes)
      - [Scaling for Writes](#scaling-for-writes-1)
      - [Optimzing for Write Throughput](#optimzing-for-write-throughput)
  - [Distributed Operations](#distributed-operations)
    - [Write Operations](#write-operations)
      - [How data goes in](#how-data-goes-in)
      - [Document Routing](#document-routing)
      - [Write Operations on the Primary Shard](#write-operations-on-the-primary-shard)
      - [Replicas are Synced](#replicas-are-synced)
      - [Client Response](#client-response)
      - [Updates and Deletes](#updates-and-deletes)
    - [Search Operations](#search-operations)
      - [Anatomy of a Search](#anatomy-of-a-search)
      - [The Scatter Phase](#the-scatter-phase)
      - [The Gather Phase](#the-gather-phase)

---

# Distributed Datastore

## Understanding Shards

### The Cluster

- The largest unit of scale in ES is a cluster
- A cluster is made of 1 or more nodes
  - nodes communicate with each other and exchange information

### The Node

- A node is an instance of a ES
  - a node is typically deployed 1-to-1 to a host
  - to scale out your cluster, add more nodes

### The Index

- An index is a collection of documents that are related to each other
  - the documents stored in ES are distributed across nodes

### The Shard

- An index distributes documents over one or more shards
- Each shard:
  - is an instance of Lucene
  - contains all the data of any document

### Primary vs. Replica

- There are twp types of shards
  - **primary shards**: the original shards of an index
  - **replica shards**: copies of the primary shard
- Documents are replicated between a primary and its replicas
  - a primary and its replicas are guaranteed to be on different nodes

> [!NOTE]
> You can not increase the number of primary shards after an index is created. The number of replicas is dynamic.

### Configuring the Number of Primaries

- Specify the number of primary shards when you create the index
  - default is 1
  - use the ```number_of_shards``` setting

Request:

```
PUT my_new_index
{
    "settings": {
        "number_of_shards": 3
    }
}
```

### Why only one Primary?

- Oversharding is one of the most common problems users encounter
  - too many small shards consume resources
- A shard typically holds tens of gigabytes
- If more shards are needed:
  - creating multiple indices make it easy to scale
  - otherwise, the Split API enables you to increase the number of shards

### Configuring the Number of Replicas

- The default number of replicas per primary is 1
  - specify the number of replica sets when you create the index
  - use the ```number_of_replicas``` setting
  - can be changed at any time

Request:

```
PUT my_new_index/_settings
{
    "number_of_replicas": 2
}
```

### Why create replicas?

- High availability
  - you can lose a node and still have all the data available
  - replicas are promoted to primaries as needed
- Read throughput
  - a query can be performed on a primary or replica shard
  - enables you to scale your data and better utilize cluster resources

### Scaling ES

- Adding nodes to a cluster will trigger a redistribution of shards
  - and the creation of replicas

## Scaling ES

> [!INFO]
> ES is built to scale and the default settings can take you a long way. Proper design can make scaling easier.

- One shard does not scale very well

Request:

```
PUT my_index
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    }
}
```

- Two shards can scale if you add a node

Request:

```
PUT my_index
{
    "settings": {
        "number_of_shards": 2,
        "number_of_replicas": 0
    }
}
```

### Balancing of Shards

- ES automatically balances shards:
  - node1 is now responsible for half the amount of data
  - write throughput has doubled
  - the memory pressure on node1 is less than before
  - searches now use the resource of both node1 and node2

### Shard Overallocation

- If you expect your cluster to grow, then plan for that by overallocating shards:
  - number of shards > number of nodes
- Overallocating shards works well for static data, but not for time-series data
  - for time-series data, create multiple indices
- 1 index with 4 shards is similar to 2 indices each with 2 shards
  - the end result is 4 shards in both scenarios

### Too much Overallocation

- A little overallocation is good
- A kajillion shards is not good:
  - each shard comes at a cost (_Lucene indices, file descriptors, memory, CPU_)
- A shard typically holds at least tens of gigabytes
  - depends on the use case
  - a 100 MB shard is probably too small

### Scaling for Reads

#### Scaling for Reads

- Queries and aggregations scale with replicas
- For example, have one primary and as many replicas as you have additional nodes
  - use ```auto_expand_replicas``` setting to change the number of replicas automatically as you add/remove nodes

#### Optimzing for Read Throughput

- Create flat, denormalized documents
- Query the smallest number of fields
  - consider ```copy_to``` over ```multi_match```
- Map identifiers as keyword instead of as a number
  - term queries on keyword fields are very fast
- Force merge read-only indices
- Limit the scope of aggregations
- Use filters, as they are cacheable

### Scaling for Writes

#### Scaling for Writes

- Write throughput scales by increasing number of primaries
  - having many primary shards on different nodes allow ES to "fan out" the writes, so each node does less work
  - maximize throughput by using disks on all machines
- When an index is done with writes, you can shrink it

#### Optimzing for Write Throughput

- Use ```_bulk``` API to minimize the overhead of HTTP requests
- Parallelize your write requests
- Disable refreshing every second:
  - set ```index.refresh_interval``` to -1 for very large writes
  - set ```index.refresh_interval``` to 30s to increase indexing speed but affect search as little as possible
- Disable replicas, then re-enable after very large writes
  - every document also need to be written to every replica
- Use auto-generated IDs:
  - ES won't check whether a doc ID already exists

## Distributed Operations

### Write Operations

#### How data goes in

- Take a look at the details of how a document is indexed into a cluster
  - suppose you index the following document into an index which has 5 primary shards with 1 replica

```
PUT new_blogs/_doc/551
{
    "title": "A History of Logstash Output Workers",
    "category": "Engineering",
...
}
```

#### Document Routing

- The index request is sent to a chosen coordinating node
- This node will determine on which shard the document will be indexed

#### Write Operations on the Primary Shard

- When you index, delete, or update a document, the primary shard has to perform the operation first
  - node3 will forward the indexing request to node1

#### Replicas are Synced

- node1 indexes the new document, then forwards the request to all replica shards
  - P1 has one replica that is currently on node2

#### Client Response

- node1 lets the coordinating node know that the write operation is successful on every shard
  - and node3 sends the details back to the client application

#### Updates and Deletes

- Updating or deleting is similar to indexing a document
- An update to a document is actually three steps:
  1. the source of the current document is retrieved
  2. the current version of the document is deleted
  3. a merged new version of the entire document is indexed

### Search Operations

#### Anatomy of a Search

- Distributed search is a challenging task
  - you have to search for hits in a copy of every shard of the index
- And finding the documents is only half the story
  - the hits must be combined into a single sorted list of documents that represent a page of results

#### The Scatter Phase

- The initial part of a search is referred to as the scatter phase
  - the query is broadcast to a shard copy of every shard in the index
  - each shard executes the query locally
- Each shard returns the doc IDs and sort values of its top hits to the coordinating node
- The coordinating node merges these values to create a globally sorted list of results

#### The Gather Phase

- Once the coordinating node has determined the doc IDs of the top 10 hits, it can fetch the documents' _source
  - then returns the top documents to the client