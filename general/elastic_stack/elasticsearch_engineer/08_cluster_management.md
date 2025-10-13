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
  - [Troubelshooting](#troubelshooting)
    - [The Health API](#the-health-api)
      - [Health Status Levels](#health-status-levels)
      - [Health Indicator Breakdown](#health-indicator-breakdown)
      - [Health Indicator Symptoms and Impacts](#health-indicator-symptoms-and-impacts)
      - [Health Indicator Diagnosis](#health-indicator-diagnosis)
    - [Monitoring Your Clusters](#monitoring-your-clusters)
      - [Monitoring the Elastic Stack](#monitoring-the-elastic-stack)
      - [Monitoring with Elastic Agent](#monitoring-with-elastic-agent)
      - [Configuring Monitoring on Elastic Cloud](#configuring-monitoring-on-elastic-cloud)

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

## Troubelshooting

### The Health API

- The Health API provide an an overview of the health of a cluster
  - Diagnose issues across different components like shards, ingestion, and search
  - Health reports include specific recommendations to fix the issues

```
GET /_health_report
```

#### Health Status Levels

- Each indicator has a health status
- The cluster's status is controlled by the worst indicator status

| Color | Meaning |
| ----- | ------- |
| Green | The indicator is healthy |
| Unknown | Could not be determined |
| Yellow | Degraded states |
| Red | Outage or feature unavailable |

#### Health Indicator Breakdown

|   |   |
| - | - |
| ```master_is_stable``` | checks if the master is changing too frequently |
| ```shards_availability``` | check if the cluster has all shards available |
| ```disk``` | reports health issues caused by lack of disk space |
| ```ilm``` | reports health issues related to ILM |
| ```repository_integrity``` | checks if any snapshot repos becomes corrupted, unknown or invalid |
| ```slm``` | reports health issues related to SLM |
| ```shards_capacity``` | checks if the cluster has enough room to add new shards |

#### Health Indicator Symptoms and Impacts

```
{"status": "red",
    "indicators": { ...
        "shards_availability": {
            "status": "red",
            "symptom": "This cluster has 1 unavailable primary shard, 1 unavailable replica shard.",
            "details": {},
            "impacts": [{ ...
                "description": "Cannot add data to 1 index [blogs_elser]. Searches might return incomplete results.",
                "impact_areas": ["ingest", "search"]
    }],
```

#### Health Indicator Diagnosis

```
"diagnosis": [{
    "cause": "Elasticsearch isn't allowed to allocate some shards from these indices to any of the nodes in the cluster",
    "action": "Diagnose the issue by calling the allocation explain API for an index [GET _cluster/allocation/explain]..."
    "help_url": "https://ela.st/diagnose-shards",
    "affected_resources": {"indices": ["blogs_elser"]}
}]
```

### Monitoring Your Clusters

#### Monitoring the Elastic Stack

- To monitor the Elastic Stack, you can use the Elastic Stack
  - Metricbeat to collect metrics
  - Filebeat to collect logs
  - Or use Elastic Agent
- It is recommended using a dedicated cluster for monitoring
  - to reduce the load and storage on the monitored cluster
  - to keep access to monitoring even for unhealthy clusters
  - to support segregation of duties

#### Monitoring with Elastic Agent

- Use Elastic Agent to collect both metrics and logs

#### Configuring Monitoring on Elastic Cloud

- Enable monitoring via the Cloud console
  - select the deployment used to monitor the Stack