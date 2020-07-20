<div align='center' style="font-size:40px;font-weight:700">
  System Design Primer
</div>

- [Performance vs Scalability](#performance-vs-scalability)
  - [Abstraction](#abstraction)
  - [Why is scalability so hard?](#why-is-scalability-so-hard)
  - [Is achieving good scalability possible?](#is-achieving-good-scalability-possible)
- [Latency vs throughput](#latency-vs-throughput)
- [CAP Theorem](#cap-theorem)
  - [CP - consistency and partition tolerance](#cp---consistency-and-partition-tolerance)
  - [AP - availability and partition tolerance](#ap---availability-and-partition-tolerance)
- [Consistency Patterns](#consistency-patterns)
  - [Weak Consistency](#weak-consistency)
  - [Eventual Consistency](#eventual-consistency)
  - [Strong Consistency](#strong-consistency)
- [Availabilty Patterns](#availabilty-patterns)
  - [Fail-over](#fail-over)
    - [Active-Active](#active-active)
    - [Active-Passive](#active-passive)
  - [Replication](#replication)
    - [Master-Slave](#master-slave)
    - [Master-Master](#master-master)
  - [Availability in numbers](#availability-in-numbers)
  - [Availability in parallel vs in sequence](#availability-in-parallel-vs-in-sequence)
- [DNS](#dns)
- [Load balancer](#load-balancer)
- [Application Layer](#application-layer)
  - [Microservices](#microservices)
  - [Service Discovery](#service-discovery)
- [Database](#database)
  - [Relational database management system (RDBMS)](#relational-database-management-system-rdbms)
    - [Abstraction](#abstraction-1)
    - [Techniques](#techniques)
      - [Federation](#federation)
      - [Sharding](#sharding)
      - [Denormalization](#denormalization)
      - [SQL Tuning](#sql-tuning)
  - [NoSQL](#nosql)
    - [Types](#types)
      - [Key-value store](#key-value-store)
      - [Document store](#document-store)
      - [Wide column store](#wide-column-store)
      - [Graph Database](#graph-database)
- [Cache](#cache)
  - [Abstraction](#abstraction-2)
  - [Advantages](#advantages)
  - [Disadvantages](#disadvantages)
  - [Types](#types-1)
    - [Client caching](#client-caching)
    - [CDN caching](#cdn-caching)
    - [Webserver caching](#webserver-caching)
    - [Database caching](#database-caching)
    - [Application caching](#application-caching)
    - [Caching database query](#caching-database-query)
    - [Caching object](#caching-object)
  - [When to update cache](#when-to-update-cache)
    - [Cache-aside](#cache-aside)
    - [Write-through](#write-through)
    - [Write-behind (write-back)](#write-behind-write-back)
    - [Refresh-ahead](#refresh-ahead)

# Performance vs Scalability

<p align="center">
  <img src="https://miro.medium.com/max/458/1*X09Q1GiwLcVzJ-iWrq2JBA.gif" alt="ps">
  <br/>
  <i><a href=https://docs.oracle.com/cd/E19284-01/819-4439/acrih/index.html>Source: Understanding Horizontal and Vertical Scalability in Messaging Server</a></i>
</p>


## Abstraction

- **Performance** is the amount of useful work accomplished by a system within a given time interval.

- **Scalability** is the ability of a system to handle a growing amount of work by adding resources to the system.

- If you have a **performance** problem, your system is slow for a single user.

- If you have a **scalability** problem, your system is fast for a single user but slow under **heavy load.**

## Why is scalability so hard?

- It requires applications and platforms to be designed with scaling in mind. It means that **adding resources** actually results in **improving the performance** or **redundancy** would **not negatively affect** the system performance.

- Growing system through scale-out results in heterogeneity. **Heterogeneity** means that some nodes will process faster or store more data than other nodes in a system which means **algorithms that rely on uniformity** either break down under these conditions or underutilize the newer resources.

## Is achieving good scalability possible?

- **Possible**. When we architect and engineer our systems to take scalability into account. 

- We must carefully inspect which axis we expect the system to row, where redundancy is required, and how to handle heterogeneity, and make sure that architects are aware of which tools they can use under which conditions, and what the common pitfalls are.

# Latency vs throughput

<p align="center">
  <img src="https://cdn.comparitech.com/wp-content/uploads/2019/01/DiagramLatency-vs-throughput-2-1024x427.jpg" alt="latencyvsthroughput">
  <br/>
  <i><a href=https://www.comparitech.com/net-admin/latency-vs-throughput/>Source: Latency vs Throughput – Understanding the Difference</a></i>
</p>

- **Latency** is the time to perform some action or to produce some results. Latency is measured in units of time - hours, minutes, seconds, nanoseconds, or clock periods.

- **Throughput** is the number of such actions or results per unit of time. This is measured in units of whatever is being produced per unit of time

Generally, you should aim for **maximal throughput** with **acceptable latency**.

# CAP Theorem

<p align="center">
  <img src="https://www.researchgate.net/profile/Hamzeh_Khazaei/publication/282679529/figure/fig2/AS:614316814372880@1523475950595/Visualization-of-CAP-theorem.png" width="400">
  <br/>
  <i><a href=http://robertgreiner.com/2014/08/cap-theorem-revisited>Source: CAP theorem revisited</a></i>
</p>

In a distributed system, you can only support two of the following guarantees:

- **Consistency** - Reads are always up to date, which means any client making a request to the database will get the same view of data.
- **Availability** - Database requests always receive a response (when valid)
- **Partition Tolerance** - Network fault doesn’t prevent messaging between nodes.

In reality, networks aren't reliable, so you'll need to support **Partition Tolerance.** Hence, you'll need to **trade-off between consistency and availability**.

## CP - consistency and partition tolerance

<p align="center">
  <img src="https://robertgreiner.com/content/images/2019/09/CAP-CP.png" alt="CAP-CP">
  <br/>
  <i><a href=http://robertgreiner.com/2014/08/cap-theorem-revisited>Source: CAP theorem revisited</a></i>
</p>


- Waiting for a response from the partitioned node might result in a timeout error. CP is a good choice if your business needs require atomic reads and writes.

## AP - availability and partition tolerance

<p align="center">
  <img src="https://robertgreiner.com/content/images/2019/09/CAP-AP.png" alt="CAP-AP">
  <br/>
  <i><a href=http://robertgreiner.com/2014/08/cap-theorem-revisited>Source: CAP theorem revisited</a></i>
</p>

- Return the most recent version of the data you have, **which could be stale.** This system state will also accept writes that can be processed later when the partition is resolved.

- AP is a good choice if the business needs allow for **eventual consistency** or when the system needs to continue working despite external errors.

# Consistency Patterns

With multiple copies of the same data, we are faced with options on how to synchronize them so clients have a consistent view of the data.

## Weak Consistency

- **After a write, reads may or may not see it.** A best effort approach is taken. This approach is seen in systems such as **memcached**.
- **Works well in real time use cases such as VoIP, video chat, and realtime multiplayer games.** 
- For example, if you are on a phone call and lose reception for a few seconds, when you regain connection you do not hear what was spoken during connection loss.

## Eventual Consistency

- **After a write, reads will eventually see it**. Data is replicated asynchronously.
- This approach is seen in systems such as DNS and email. 
- **Eventual consistency works well in highly available systems.**

## Strong Consistency

- After a write, reads will see it. Data is replicated synchronously.
- This approach is seen in file systems and RDBMSes.
- **Strong consistency works well in systems that need transactions**

# Availabilty Patterns

## Fail-over

### Active-Active

<p align="center">
  <img src="https://www.jscape.com/hubfs/images/active_active_high_availability_cluster_load_balancer.png" alt="Active-Active">
  <br/>
  <i><a href="https://www.jscape.com/blog/active-active-vs-active-passive-high-availability-cluster">Source: 
Active-Active vs. Active-Passive High-Availability Clustering</a></i>
</p>

- Allows two physical servers **concurrently working and processing data**.
- Helps ensure **availability and data safety**, which means if one server dies for any reason, there is still one server left working and processing data.
- Helps **reduce server load (load-balancer)**.

### Active-Passive

<p align="center">
  <img src="https://www.jscape.com/hubfs/images/active_passive_high_availability_cluster.png" alt="Active-Passive">
  <br/>
  <i><a href="https://www.jscape.com/blog/active-active-vs-active-passive-high-availability-cluster">Source: 
Active-Active vs. Active-Passive High-Availability Clustering</a></i>
</p>


- Consists of two physical servers: **one active and one passive**. In other words, one server is actively listening and processing request from user, one server is standby.
- When the active server is down, the system will activate the standby server and replace the main server.
- Although we **cannot improve performance** by using this model (not using load-balancer), however, it ensures **availability**.

**Disadvantages of Failover**

- Adding more hardware and complexity.
- There is a potential for **loss of data** if the active system fails before any newly written data can be replicated to the passive.

## Replication

### Master-Slave

<p align="center">
  <img src="https://camo.githubusercontent.com/6a097809b9690236258747d969b1d3e0d93bb8ca/687474703a2f2f692e696d6775722e636f6d2f4339696f47746e2e706e67" alt="Master-Slave">
  <br/>
  <i><a href=http://www.slideshare.net/jboner/scalability-availability-stability-patterns/>Source: Scalability, availability, stability, patterns</a></i>
</p>

**Abstraction**

- The master serves reads and writes, **replicating writes** to one or more slaves, which serve **only reads**.
- Slaves can also **replicate to additional slaves** in a tree-like fashion.
- If the master goes offline, the system can continue to operate in **read-only mode** until a slave is promoted to a master or a new master is provisioned.

**Disadvantages**

- Promoting a slave to a master requires additional logic.

### Master-Master

<p align="center">
  <img src="https://camo.githubusercontent.com/5862604b102ee97d85f86f89edda44bde85a5b7f/687474703a2f2f692e696d6775722e636f6d2f6b7241484c47672e706e67" alt="Master-Master">
  <br/>
  <i><a href=http://www.slideshare.net/jboner/scalability-availability-stability-patterns/>Source: Scalability, availability, stability, patterns</a></i>
</p>

**Abstraction**

- **Both masters serve reads and writes** and coordinate with each other on writes.
- If either master goes down, the system can continue to operate with **both reads and writes.**

**Disadvantages**

- You'll need **a load balancer** or you'll need to make changes to your application logic to determine where to write.
- Most master-master systems are either **loosely consistent** (violating ACID) or have **increased write latency due to synchronization**.
- Causes **conflict resolution** comes when more write nodes are added and as latency increases.

**Disadvantages of Replication**

- If there are **a lot of writes, the read replicas can get bogged down with replaying writes and can't do as many reads.**
- The **more read slaves**, **the more** you have to **replicate**, which leads to **greater replication lag**.
- On some systems, writing to the master can spawn multiple threads to write in parallel, whereas **read replicas only support writing sequentially with a single thread.**
- Adding more hardware and complexity.

## Availability in numbers

- Availability is often quantified by uptime (or downtime) as a percentage of time the service is available.
- Generally measured in the number of 9s--a service with 99.99% availability is described as having four 9s.

For example, two 9s would have downtime like this:

| Duration  | Acceptable downtime |
| --------- | ------------------- |
| Per day   | 14m 24s             |
| Per week  | 1h 40m 48s          |
| Per month | 7h 18m 17s          |
| Per year  | 3d 15h 39m 29s      |

## Availability in parallel vs in sequence

If a service consists of multiple components prone to failure, the service's overall availability depends on whether the components are in sequence or in parallel.

**In sequence**

    Availability (Total) = Availability (Foo) * Availability (Bar)

If both Foo and Bar each had 99.9% availability, their total availability in sequence would be 99.8%.

**In parallel**

    Availability (Total) = 1 - (1 - Availability (Foo)) * (1 - Availability (Bar))

If both Foo and Bar each had 99.9% availability, their total availability in parallel would be 99.9999%.

# Stability patterns

## Timeout pattern
<p align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--29ERQzjI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/e0eetjip5m311u9ofpzr.gif" alt="timeout-pattern">
  <br/>
  <i><a href=https://blog.codecentric.de/en/2019/06/resilience-design-patterns-retry-fallback-timeout-circuit-breaker/>Source: Resilience design patterns: retry, fallback, timeout, circuit breaker</a></i>
</p>


    To avoid unbounded waiting times for responses and thus treating every request as failed where no response was received within the timeout.

- Timeouts are used in almost every application to avoid requests getting stuck forever.

- Timeouts should be `high` enough to allow slower responses to arrive but `low` enough to stop waiting for a response that is never going to arrive

## Pooling pattern

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Thread_pool.svg/400px-Thread_pool.svg.png" alt="thread-pool">
  <br/>
  <i><a href=https://en.wikipedia.org/wiki/Thread_pool>Source: Thread pool</a></i>
</p>

    Used for increasing performance and avoiding latency in execution due to frequent creation and destruction of threads for short-lived task.

- Creating lots of threads does not mean increasing perfomance and lower latence because resources allocation for each thread can lead to crash in system.
- Thread pool is born to limit the number of threads can run at the same time.

## Async pattern

<p align="center">
  <img src="https://miro.medium.com/max/587/1*Y41dOkntUbR3I4UCJBx9Xg.png" alt="thread-pool">
  <br/>
  <i><a href=https://medium.com/from-the-scratch/wtf-is-synchronous-and-asynchronous-1a75afd039df>Source: WTF is Synchronous and Asynchronous!</a></i>
</p>


    When you execute something asynchronously, you can move on to another task before it finishes.

**Synchronous**

- When you execute something synchronosly, you wait for it to finish before moving on to another task.

- Execution happens in a single series. `A->B->C->D`: A will run then finish, then B will start then finish and etc 

**Asynchronous**

- You can directly switch to another task before previous task has been completed.
- One task doesn't depend on the other.

# DNS

<p align="center">
  <img src="https://camo.githubusercontent.com/fae27d1291ed38dd120595d692eacd2505cd3a9c/687474703a2f2f692e696d6775722e636f6d2f494f794c6a34692e6a7067" alt="DNS">
  <br/>
  <i><a href=http://www.slideshare.net/srikrupa5/dns-security-presentation-issa>Source: DNS security presentation</a></i>
</p>

**Abstraction**

    Translate a domain name to an IP address

- **NS record (name server)** - Specifies the DNS servers for your domain/subdomain.
- **MX record (mail exchange)** - Specifies the mail servers for accepting messages.
- **A record (address)** - Points a name to an IP address.
- **CNAME (canonical)** - Points a name to another name or CNAME (example.com to www.example.com) or to an A record.

Some DNS services can route traffic through various methods:

- **Weighed round-robin**
  - Prevent traffic from going to servers under maintenance
  - Balance between varying cluster sizes
  - A/B testing
- **Latency-based**
- **Geolocation-based**

**Disadvantages**

- Accessing a DNS server introduces a slight delay, although caching.
- DNS server management is complex and is managed by governments, ISPs, and large companies.
- Vulnerable to DDoS attack. 

# Load balancer

<p align="center">
  <img src="https://camo.githubusercontent.com/21caea3d7f67f451630012f657ae59a56709365c/687474703a2f2f692e696d6775722e636f6d2f6838316e39694b2e706e67" alt="load-balancer">
  <br/>
  <i><a href=http://horicky.blogspot.com/2010/10/scalable-system-design-patterns.html>Source: Scalable system design patterns</a></i>
</p>


**Abstraction**

    Distribute incoming requests to computing resources (servers/databases)

To protect against failures, it's common to set up multiple load balancers, either in **active-passive or active-active mode.**

**Advantages**

- Prevents requests from going to unhealthy servers
- Prevents overloading resources
- Helps to eliminate a single point of failure
- **SSL Termination** - Decrypts incoming requests and encrypt server responses. Therefore, reduce the workload for the server.
  - **Session persistence** - Directs a client's request to the same backend web or application server for the duration of a "session" or the time it takes to complete a task or transaction.

**Disadvantages**

- Can become a performance bottleneck if it does not have enough resources or not configured properly.
- Increase in complexity

**Routing based on various metrics**

- Random
- Least loaded
- Session/cookies
- Round robin / Weighted round-robin
- Layer 4
- Layer 7

**Layer 4 load balancing**

- Look at the **transport layer** to distribute requests.
- Involves source, destination IP addresses, and ports in the header, **not the contents of the packet.** 
- Forwards packets to and from the upstream server, perform **NAT.**

**Layer 7 load balancing** 

- Look at the **application layer** to distribute requests.
- Involves contents of the header, message, and cookies.
- It terminates network traffic, reads the message, makes a load-balancing decision, then opens a connection to the selected server.

**Comparisons**

- **Layer 4** requires less time and computing resources than **Layer 7.** 
- However, CPU and memory are now sufficiently fast and cheap that the performance advantage for **Layer 4** has become negligible or irrelevant in most situations.

**Vertical scaling**

- Scaling up a single server on more expensive hardware.

**Horizontal scaling**

- Improving performance and availability using commodity machines

- More cost-efficient

- Higher availability
  
    **Disadvantages**
  
  - Increase complexity and involves cloning servers. Servers should be stateless (not contain data) and sessions should be stored in a centralized database (SQL, NoSQL) or a persistent cache(Redis,  Memcached) 
  - Downstream servers (caches/databases) need to handle simultaneous connections as upstream servers scale-out.

# Application Layer

<p align="center">
  <img src="https://camo.githubusercontent.com/feeb549c5b6e94f65c613635f7166dc26e0c7de7/687474703a2f2f692e696d6775722e636f6d2f7942355359776d2e706e67" alt="architecting-systems-for-scale">
  <br/>
  <i><a href=http://lethain.com/introduction-to-architecting-systems-for-scale/#platform_layer>Source: Intro to architecting systems for scale</a></i>
</p>

**Abstraction**

- Seperates web layer from application layer
- The **single responsibility principle** advocates for small and autonomous services that work together.

**Advantages**

- Allows scaling and configuring both layers independently.
- Adds new API (adds application servers) without necessarily  adding new web servers.
- Small teams with small services can plan more aggressively for rapid growth.

**Disadvantages**

- Adding an application layer with loosely coupled services requires a different approach from an architectural, operations, and process viewpoint.
- Adds complexity in terms of deployments and operations.

## Microservices

- Independently deployable, small, and modular services.
- Each service runs a unique process and communicates through a well-defined, lightweight mechanism to serve a business goal.

## Service Discovery

- Systems such as **Consult, Etcd**, and **Zookeeper** can help find each other by keeping track of registered names, addresses, and ports.
- [Health checks](https://www.consul.io/intro/getting-started/checks.html) help verify service integrity, done using HTTP endpoint.
- The built-in **key-value store** is useful for storing config values and other shared data.

# Database

## Relational database management system (RDBMS)

### Abstraction

    A collection of data items organized in tables.

**ACID** - a set of properties of relational database transactions.

- **Atomicity** - Guarantees that all operations in a transaction are treated as a single “unit”, which either succeeds completely or fails completely.
- **Consistency** - Ensures that any changes to a database must be consistent across the whole.
- **Isolation** - Determines whether or not a change is immediately visible to the rest of the database and related code or queries.
- **Durability** - Ensure when a change is made to the database, it will survive.

### Techniques

#### Federation

<p align="center">
  <img src="https://camo.githubusercontent.com/6eb6570a8b6b4e1d52e3d7cc07e7959ea5dac75f/687474703a2f2f692e696d6775722e636f6d2f553371563333652e706e67" alt="federation">
  <br/>
  <i><a href=https://www.youtube.com/watch?v=kKjm4ehYiMs>Source: Scaling up to your first 10 million users</a></i>
</p>


**Abstraction**

- Instead of a single, monolithic database, we split up databases by function.

**Advantages**

- **Reducing read and write traffic** to each database, therefore, reduction in replication lag.
- Smaller databases result in more data that can **fit in memory**, which will **increase cache hits**.
- Without single central master serializing writes, you can write in parallel, increasing throughput.

**Disadvantages**

- Not effective when your **schema requires huge functions/tables**.
- Need logic updating to determine which database to read or write.
- Joining two databases is more complex with a server link.
- Adding more hardware and additional complexity.

#### Sharding

<p align="center">
  <img src="https://camo.githubusercontent.com/1df78be67b749171569a0e11a51aa76b3b678d4f/687474703a2f2f692e696d6775722e636f6d2f775538783549642e706e67" alt="sharding">
  <br/>
  <i><a href=http://www.slideshare.net/jboner/scalability-availability-stability-patterns/>Source: Scalability, availability, stability, patterns</a></i>
</p>

**Abstraction**

Sharding distributes data across different databases such that each database can **only manage a subset of the data.**

**Example**

Taking a user database as an example, as the number of users increases, more shards are added to the cluster.

**Advantages**

- **Less read and writes traffic, less replication, and more cache hits.**
- Index size is reduced, which speeds up queries.
- If one shard goes down, **others are still operating** (needs replication to avoid data loss).
- No single central master serializing writes, allowing writing parallel with increase throughput.

**Disadvantages**

- Needs logic updating, resulting in complex SQL queries.
- Unbalanced data distribution  can appear in a shard when a shard has more traffic comparing to others. Therefore, rebalancing adds additional complexity.
- Joining multiple shards is more complex.
- Adding more hardware and additional complexity.

#### Denormalization

**Abstraction**

- Attempting to improve read performance at the expense of some write performance.
- Avoid expensive joins by writing redundant copies of data.
- After applying techniques such as federation and sharding, managing joins across data centers can increase complexity. Denormalization helps alleviate the need for such complex joins.

**Why need?**

- In most systems, reads can heavily outnumber writes 100:1 or even 1000:1. 

- A read resulting in a complex database join can be very expensive, spending a significant amount of time on disk operations.

#### SQL Tuning

**Abstraction**

    To simulate and uncover bottlenecks

- **Benchmark** - Simulate high-load scenarios with tools [ab](http://httpd.apache.org/docs/2.2/programs/ab.html).
- **Profile** - Track performance issues by using [slow query log](http://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html).

**How**

    Tighten up the schema

- MySQL dumps to disk in contiguous blocks for fast access.

- Use `CHAR` instead of `VARCHAR` for fix-length fields (in `VARCHAR`, you must find the end of a string before moving onto the next one).

- Use `TEXT` for large block of text (blog posts). `TEXT` allows boolean searches. Using `TEXT` fields will store a pointer on disk, which is used to locate the text block.

- Use `INT` for large numbers upto 2<sup>32</sup> ~ 4 billion.

- Use `DECIMAL` for currency.

- Instead of storing large `BLOBS`, store the location of the object instead.

- Set `NOT NULL` constraint to avoid a full table scan, hence, increase search performance.
  
      Use indexes

- Speed up queries (`SELECT`, `GROUPBY`, `ORDER BY`, `JOIN`)

- [B-Tree](https://en.wikipedia.org/wiki/B-tree) keeps data sorted and allow searches, sequential access, insertions, and deletions in `O(logN)`

- Requires more space, when keeping the index in memory.

- Writes slower since index needs updating.

- Disabling indexes when loading large amounts of data and rebuild indexes later.
  
      Avoid expensive joins

- Denormalization
  
      Partition tables

- Break up a table by putting hot spots in a separate table to help keep it in memory.
  
      Tune the query cache

## NoSQL

**Abstraction**

- A collection of data items represented in a **key-value store**, **document store**, **wide column store**, or **a graph database**.

**BASE** - Availability over Consistency

- **Basically available** -  Guarantees the availability of the data. There will be a response to any request (can be a failure too).

- **Soft state** - The state of the system could change over time.

- **Eventual consistency** - The system will eventually become consistent once it stops receiving input.

### Types

#### Key-value store

**Abstraction**

    Hash Table

**Advantages**

- Allows `O(1)` reads and writes and is often backed by memory or SSD.
- Maintains keys in [lexicographics order](https://en.wikipedia.org/wiki/Lexicographical_order), allowing efficient retrieval of key ranges.
- Allows for storing metadata with value.
- Provides high performance and often used for simple data models or rapidly-changing data (in-memory cache).

#### Document store

**Abstraction**

    Key-value store with documents stored as values

- Provides APIs or a query language to query based on the internal structure of the document itself.
- Organized by collections, tags, metadata, or directories.
- Although documents can be organized/grouped together, they have fields that are completely different from each other.

**Advantages**

- High flexibility.
- Used for occasionally changing data.

**Supporting tools**

- SQL-like language: [MongoDB](https://www.mongodb.com/mongodb-architecture) and [CouchDB](https://blog.couchdb.org/2016/08/01/couchdb-2-0-architecture/)
- Both key-values and documents: [DynamoDB](http://www.read.seas.harvard.edu/~kohler/class/cs239-w08/decandia07dynamo.pdf)

#### Wide column store

<p align="center">
  <img src="https://camo.githubusercontent.com/823668b07b4bff50574e934273c9244e4e5017d6/687474703a2f2f692e696d6775722e636f6d2f6e3136694f476b2e706e67" alt="wide-column-store">
  <br/>
  <i><a href=http://blog.grio.com/2015/11/sql-nosql-a-brief-history.html>Source: SQL & NoSQL, a brief history</a></i>
</p>


**Abstraction**

    Nested map ColumnFamily<RowKey, Columns<ColKey, Value, Timestamp>>

- Stores basic unit of data is a column (name/value pair).
- A column can be grouped into column families.
- We can access each column independently with a row key, and columns with the same row key form a row.
- Each value contains timestamp for versoning and for conflict resolution

**Advantages**

- High availability
- High scalability

**Supporting tools**

- [Bigtable](http://www.read.seas.harvard.edu/~kohler/class/cs239-w08/chang06bigtable.**pdf**) - **Google**
- [Cassandra](http://docs.datastax.com/en/cassandra/3.0/cassandra/architecture/archIntro.html) - **Facebook**

#### Graph Database

<p align="center">
  <img src="https://camo.githubusercontent.com/bf6508b65e98a7210d9861515833afa0d9434436/687474703a2f2f692e696d6775722e636f6d2f664e636c3635672e706e67" alt="graph-database">
  <br/>
  <i><a href=https://en.wikipedia.org/wiki/File:GraphDatabase_PropertyGraph.png>Source: Graph database</a></i>
</p>


**Abstraction**

    Graph

- Each node is a record
- Each arc is a relationship between two nodes
- Used to represent complex relationships with many foreign keys or many-to-many relationships.

**Advantages**

- High performance for data models with complex relationships (social network).

**Disadvantages**

- New and not yet widely-used.
- Difficult to find development tools and resources.

| SQL                    | NOSQL                     |
| ---------------------- | ------------------------- |
| Structured data        | Semi-structured data      |
| Strict schema          | Dynamic/flexible schema   |
| Relational data        | Non-relational data       |
| Need for complex joins | No need for complex joins |

**SQL**

- Transactions
- Clear patterns for scaling
- More established: developers, community, code, tools, etc
- Lookups by index are very fast

**NoSQL**

- Store many TB (or PB) of data
- Very data-intensive workload
- Very high throughput for IOPS (I/O Per Second)

# Cache

<p align="center">
  <img src="https://camo.githubusercontent.com/7acedde6aa7853baf2eb4a53f88e2595ebe43756/687474703a2f2f692e696d6775722e636f6d2f51367a32344c612e706e67" alt="cache">
  <br/>
  <i><a href=http://horicky.blogspot.com/2010/10/scalable-system-design-patterns.html>Source: Scalable system design patterns</a></i>
</p>

## Abstraction

- The dispatcher will lookup if the request has been made before and try to return the previous result (if yes), in order to save the actual execution.

## Advantages

- Improves page load times and reduces the load on servers and databases.
- Because database often uses the uniform distribution of reads and writes, popular items can skew the distribution, causing **bottlenecks.** Putting cache in front of database can help reduce uneven loads and spikes in traffic.

## Disadvantages

- Need to maintain consistency between caches and database through cache invalidation.
- Increase in complexity when using cache invalidation.
- Adding Redis/memcached requires changes in application.

## Types

### Client caching

Located on client side (OS/browser), serverside or in a distinct cache layer.

### CDN caching

### Webserver caching

### Database caching

Some default levels of caching, optimized for generic use case. Tweaking these defaults can help boost performance.

### Application caching

- In-memory cache (Memcached/Redis) are key-value stores between your application and your data storage.
- Since data is held in RAM, it's much faster than typical databases where data is stored on disk.
- Due to limitation in RAM, cache invalidation algorithms such as least recently used (LRU) can help invalidate 'cold' entries and keep 'hot' data in RAM.

Redis has following features:

- Persistence option
- Built-in data structures (sorted sets, lists)

Caching fall into two general categories:

- Row level
- Query level
- Fully-formed serializable objects
- Fully-rendered HTML

Generally, we should avoid file-based caching makes cloning and auto-scaling more difficult.

### Caching database query

Whenever you query the database, hash the query as a key and store the result to the cache.

This approach has issues:

- Hard to delete cached result with complex queries
- If one piece of data changes (table cell), you need to delete all cached queries that might include the changed cell.

### Caching object

See data as an object, assemble dataset into a class instance/data structure.

- Remove object from cache when its data has changed.
- Allows for asynchronous processing - workers assemble objects by consuming latest cached object.

## When to update cache

### Cache-aside

<p align="center">
  <img src="https://camo.githubusercontent.com/7f5934e49a678b67f65e5ed53134bc258b007ebb/687474703a2f2f692e696d6775722e636f6d2f4f4e6a4f52716b2e706e67" alt="cache-aside">
  <br/>
  <i><a href=http://www.slideshare.net/tmatyashovsky/from-cache-to-in-memory-data-grid-introduction-to-hazelcast>Source: From cache to in-memory data grid</a></i>
</p>

The cache doesn't interact with storage directly. **Memcached** is generally used in this type

**Steps**

- Look for entry in cache, resulting in a cache miss
- Load entry from database
- Add entry to cache
- Return entry

**Advantages**

- Fast
- Lazy loading. Hence, avoid filling up the cache with unrequested data.

**Disadvantages**

- Each cache miss results in three trips, causing noticeable delay.
- Data becomes stale if it's updated in database. Solving this by setting time-to-live(TTL) which forces update on cache or using write-through

### Write-through


<p align="center">
  <img src="https://camo.githubusercontent.com/56b870f4d199335ccdbc98b989ef6511ed14f0e2/687474703a2f2f692e696d6775722e636f6d2f3076426330684e2e706e67" alt="write-through">
  <br/>
  <i><a href=http://www.slideshare.net/jboner/scalability-availability-stability-patterns/>Source: Scalability, availability, stability, patterns</a></i>
</p>


**Abstraction**

- Application uses cache as main data store, reading/writing data to it. 

- Cache is responsible for reading/writing to database.

**Advantages**

- Reads of just written data are fast.
- Data in cache is not stale

**Disadvantages**

- A slow overall operation due to write operation.
- Most data written might not be read (solved by minimizing TTL)

**When to use**

- Good for applications that write and then re-read data frequently. 
- It's okay to spend a bit longer writing once, but then benefit from reading frequently with low latency.

### Write-behind (write-back)

<p align="center">
  <img src="https://camo.githubusercontent.com/8aa9f1a2f050c1422898bb5e82f1f01773334e22/687474703a2f2f692e696d6775722e636f6d2f72675372766a472e706e67" alt="write-behind">
  <br/>
  <i><a href=http://www.slideshare.net/jboner/scalability-availability-stability-patterns/>Source: Scalability, availability, stability, patterns</a></i>
</p>

**Abstraction**

Application does:

- Add/update entry in cache
- Asynchronously write entry to data store, improving write performance.

**Advantages**

- Low latency
- High throughput for write-intensive applications.

**Disadvantages**

- Data loss when cache cannot write to data store.
- More complex to implement than previous methods.

**When to use**

- Best for mixed workloads (I/O).
- Avoid data loss by duplicating writes.

### Refresh-ahead

<p align="center">
  <img src="https://camo.githubusercontent.com/49dcb54307763b4f56d61a4a1369826e2e7d52e4/687474703a2f2f692e696d6775722e636f6d2f6b78746a7167452e706e67" alt="refresh-ahead">
  <br/>
  <i><a href=http://www.slideshare.net/tmatyashovsky/from-cache-to-in-memory-data-grid-introduction-to-hazelcast>Source: From cache to in-memory data grid</a></i>
</p>


**Abstraction**

    Configure the cache to automatically refresh any recently accessed cache entry before expiration.

**Advantages**

- Reduce in latency vs read-through if cache accurately predict which items will be needed in future.

**Disadvantages**

- Reduce in performance when predicting incorrectly.

# References

- Donnemartin, donnermartin. “Donnemartin/System-Design-Primer.” Github.com, 2020, github.com/donnemartin/system-design-primer.

- Goller, Alexander. “Scaling up vs Scaling out Your Security Segmentation.” The Microsegment, 9 Sept. 2019, microsegment.io/post/2019-09-15-scale-up-vs-scale-out/.

- Greiner, Robert. CAP Theorem: Revisited. 23 Sept. 2019, robertgreiner.com/cap-theorem-revisited/.

- Wodehouse, Carey. “SQL vs. NoSQL Databases: What's the Difference?: Upwork.” RSS, 2019, www.upwork.com/resources/sql-vs-nosql-databases-whats-the-difference.

- Kim, Jeeyoung. “How Sharding Works.” Medium, Medium, 5 Dec. 2014, medium.com/@jeeyoungk/how-sharding-works-b4dec46b3f6.

- Klein, Matt. “Introduction to Modern Network Load Balancing and Proxying.” Medium, Envoy Proxy, 17 Jan. 2018, blog.envoyproxy.io/introduction-to-modern-network-load-balancing-and-proxying-a57f6ff80236.

- Vogels , Werner. Eventually Consistent - Revisited, Dec. 2008, www.allthingsdistributed.com/2008/12/eventually_consistent.html.