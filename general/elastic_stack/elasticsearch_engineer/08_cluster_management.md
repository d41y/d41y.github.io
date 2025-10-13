- [Cluster Management](#cluster-management)
  - [Multi-Cluster Operations](#multi-cluster-operations)
    - [Cross-Cluster Replication](#cross-cluster-replication)
      - [Disaster Recovery and High Availability](#disaster-recovery-and-high-availability)
      - [Data Locality](#data-locality)
      - [Centralized Reporting](#centralized-reporting)
      - [Replication is Pull-Based](#replication-is-pull-based)
      - [Configuring CCR](#configuring-ccr)
      - [Auto-Following Functionality](#auto-following-functionality)
    - [Cross-Cluster Search](#cross-cluster-search)
      - [Searching Remotely](#searching-remotely)
      - [Searching Multiple Cluster](#searching-multiple-cluster)
      - [Search Response](#search-response)

---

# Cluster Management

## Multi-Cluster Operations

### Cross-Cluster Replication

- Cross-cluster replication (_CCR_) enables replication of indices across clusters
- Uses an active-passive model:
  - you index to a leader index,
  - the data is replicated to one or more read-only follower indices

#### Disaster Recovery and High Availability

- Replicate data from one data center to one or more other data centers

#### Data Locality

- Bring data closer to your users or application servers to reduce latency and response time

#### Centralized Reporting

- Replicate data from many smaller clusters to a centralized reporting cluser

#### Replication is Pull-Based

- The replication is driven by the follower index
  - the follower watches for changes in the leader index
  - operations are pulled by the follower
  - causes no additional load on the server
- Replication is done at the shard level
  - the follower has the same number of shards as the leader
  - all operations on each leader shard are replicated on the corresponding follower shard
- Replication appears in near real-time

#### Configuring CCR

- Configure a remote cluster using Kibana
  - the follower configures the leader as a remote cluster
- You need a user that has the appropriate roles, and configure the appropriate TLS/SSL certificates (https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-getting-started.html)
- Use the Cross-Cluster Replication UI, or the ```_ccr``` endpoint
  - create a follower index that references both the remote cluster and the leader index

```
PUT copy_of_the_leader_index/_ccr/follow
{
    "remote_cluster" : "cluster2",
    "leader_index" : "index_to_be_replicated"
}
```

#### Auto-Following Functionality

- Useful when your leader indices automatically rollover to new indices
  - you follow a pattern

```
PUT _ccr/auto_follow/logs
{
    "remote_cluster" : "cluster2",
    "leader_index_patterns" : [ "logs*" ],
    "follow_index_pattern" : "{{leader_index}}-copy"
}
```

### Cross-Cluster Search

- Cross-cluster search enables you to execute a query across multiple clusters

#### Searching Remotely

- To search an index on a remote cluster, prefix the index name with the remote cluster name

```
GET eu-west-1:blogs/_search
{
    "query": {
        "match": {
            "title": "network"
        }
    }
}
```

#### Searching Multiple Cluster

- To perform a search across multiple clusters, list the cluster names and indices
  - you can use wildcards for the names of the remote clusters

```
GET blogs,eu-west-1:blogs,us-*:blogs/_search
{
    "query": {
        "match": {
            "title": "network"
        }
    }
}
```

#### Search Response

- All results retrieved from a remote index will be prefixed with the remote cluster's name

```
"hits": [
    {
        "_index": "eu-west-1:blogs",
        "_id": "3s1CKmIBCLh5xF6i7Y2g",
        "_score": 4.8329377,
        "_source": {
        "title": "Using Logstash to ...",
        ...
    } },
    {
        "_index": "blogs",
        "_id": "Mc1CKmIBCLh5xF6i7Y",
        "_score": 4.561167,
        "_source": {
        "title": "Brewing in Beats: New ...",
    ...
    } },
```