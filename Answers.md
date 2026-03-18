# Answers to System Design Interview Questions (First 100)

## 1. What is system design?
System design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. It involves high‑level decisions about scalability, reliability, performance, and maintainability.

## 2. Why is system design important for software engineers?
It enables engineers to build systems that can handle real‑world load, evolve over time, and meet business goals. Good design reduces technical debt, improves user experience, and prepares engineers for large‑scale production environments.

## 3. What are the key components of system design?
- **Clients** (web, mobile, etc.)  
- **API / Service layer** (REST, gRPC, GraphQL)  
- **Business logic** (microservices, monolith)  
- **Data storage** (SQL, NoSQL, caches)  
- **Infrastructure** (servers, containers, cloud services)  
- **Networking** (load balancers, CDNs)  
- **Observability** (logging, monitoring, tracing)  

## 4. What is the difference between functional and non‑functional requirements?
- **Functional**: What the system *does* (features, API endpoints, business rules).  
- **Non‑functional**: *How* the system behaves (scalability, latency, security, availability, maintainability).

## 5. What are scalability, availability, and reliability?
- **Scalability**: Ability to handle increased load by adding resources (vertical/horizontal).  
- **Availability**: Percentage of time the system is operational (e.g., 99.9%).  
- **Reliability**: Probability that the system performs correctly over a period; often expressed as MTBF/MTTR.

## 6. What is latency and throughput?
- **Latency**: Time taken for a single request to travel from source to destination and back.  
- **Throughput**: Number of requests processed per unit time (e.g., requests/second).

## 7. What is the CAP theorem?
In a distributed system, you can only simultaneously guarantee two of the following three: **Consistency**, **Availability**, and **Partition tolerance**.

## 8. What is the difference between strong and eventual consistency?
- **Strong consistency**: All reads see the most recent write.  
- **Eventual consistency**: Reads may return stale data, but the system converges to the latest state eventually.

## 9. What is the difference between vertical and horizontal scaling?
- **Vertical**: Adding more resources (CPU, RAM) to a single node.  
- **Horizontal**: Adding more nodes to spread the load.

## 10. What is load balancing?
Distributing incoming traffic across multiple servers to improve performance, reliability, and fault tolerance.

## 11. How do you approach a system design problem?
1. Clarify requirements (functional & non‑functional).  
2. Define high‑level architecture.  
3. Identify bottlenecks & trade‑offs.  
4. Detail components (databases, caches, queues).  
5. Sketch data flow & API contracts.  
6. Discuss scaling, reliability, and monitoring.

## 12. What are the steps in the system design process?
1. Gather requirements.  
2. Define use cases & traffic estimates.  
3. Sketch high‑level architecture.  
4. Choose storage & communication patterns.  
5. Design data model & APIs.  
6. Plan for scaling & fault tolerance.  
7. Add observability & security.  
8. Review trade‑offs.

## 13. How do you gather requirements for system design?
- Interview stakeholders.  
- Identify core user flows.  
- Determine SLAs (latency, throughput).  
- Understand data volume, read/write ratios.  
- Note regulatory or compliance constraints.

## 14. What are the trade‑offs in system design?
Typical trade‑offs involve **consistency vs. availability**, **latency vs. durability**, **complexity vs. performance**, and **cost vs. scalability**.

## 15. How do you estimate system capacity?
- Estimate QPS (queries per second) from traffic forecasts.  
- Multiply by average request cost (CPU, I/O).  
- Add safety margin (30‑50%).  
- Use load testing to validate.

## 16. What is the difference between stateful and stateless systems?
- **Stateless**: Each request contains all information needed; easier to scale.  
- **Stateful**: Server retains session data; requires sticky sessions or external storage.

## 17. What is the difference between synchronous and asynchronous communication?
- **Synchronous**: Caller waits for a response (e.g., HTTP).  
- **Asynchronous**: Caller proceeds without waiting; response delivered later (e.g., message queues).

## 18. What is the difference between monolithic and microservices architecture?
- **Monolithic**: Single deployable unit; simpler but harder to scale independently.  
- **Microservices**: Multiple small services, each owning its data and logic; enables independent scaling and deployment.

## 19. What is the difference between SQL and NoSQL databases?
- **SQL**: Relational, ACID guarantees, fixed schema.  
- **NoSQL**: Non‑relational, flexible schema, often eventual consistency; includes key‑value, document, column‑family, graph stores.

## 20. What is the difference between caching and database?
Caching stores frequently accessed data in fast storage (memory) to reduce latency and load on the primary database, which remains the source of truth.

## 21. How do you design a scalable system?
- Use horizontal scaling.  
- Partition data (sharding).  
- Add caching layers.  
- Employ stateless services behind load balancers.  
- Use asynchronous processing where possible.

## 22. What are the different types of scaling?
- **Vertical scaling** (scale‑up).  
- **Horizontal scaling** (scale‑out).  
- **Diagonal scaling** (combination of both).

## 23. How do you handle high traffic in a system?
- Load balancers to distribute traffic.  
- Auto‑scaling groups.  
- CDN for static assets.  
- Caching (CDN, edge, in‑memory).  
- Rate limiting to protect downstream services.

## 24. What is caching and how does it improve performance?
Caching stores copies of frequently accessed data closer to the client or application, reducing read latency and decreasing load on primary data stores.

## 25. What are the different caching strategies?
- **Cache‑aside (lazy loading)**  
- **Read‑through**  
- **Write‑through**  
- **Write‑behind (write‑back)**  
- **Refresh‑ahead**  

## 26. How do you implement database sharding?
- Choose a sharding key (e.g., user_id).  
- Partition rows across multiple shards based on hash/range of the key.  
- Route queries to the correct shard via a lookup service or deterministic algorithm.

## 27. What is database replication and how does it work?
Replication copies data from a primary (master) node to one or more replicas (slaves). Writes go to the primary; reads can be served from replicas to improve read scalability and availability.

## 28. How do you optimize database performance?
- Proper indexing.  
- Query optimization (avoid N+1).  
- Denormalization where appropriate.  
- Use read replicas.  
- Partition large tables.

## 29. What is connection pooling?
A pool of reusable database connections that reduces the overhead of establishing new connections for each request.

## 30. How do you handle database indexing?
- Identify high‑cardinality columns used in WHERE/JOIN/ORDER BY.  
- Create composite indexes for multi‑column queries.  
- Monitor index usage and avoid over‑indexing.

## 31. How do you design a highly available system?
- Redundant components (multiple instances, zones).  
- Failover mechanisms (DNS failover, health checks).  
- Data replication across regions.  
- Stateless services behind load balancers.

## 32. What is redundancy in system design?
Having multiple instances of a component so that failure of one does not affect overall service availability.

## 33. How do you implement failover mechanisms?
- Health checks detect unhealthy nodes.  
- Load balancer removes failed nodes and routes traffic to healthy ones.  
- Use leader election (e.g., ZooKeeper) for primary/secondary roles.

## 34. What is a disaster recovery plan?
A documented strategy to restore services after a catastrophic event, covering data backup, failover sites, RTO (Recovery Time Objective) and RPO (Recovery Point Objective).

## 35. How do you handle system failures?
- Detect via monitoring/alerts.  
- Automatic failover to standby instances.  
- Graceful degradation (disable non‑critical features).  
- Post‑mortem analysis.

## 36. What is a circuit breaker pattern?
A client‑side pattern that stops calls to a failing service after a threshold, allowing it to recover and preventing cascading failures.

## 37. How do you implement graceful degradation?
Design the system so that when a component fails, non‑essential features are disabled while core functionality remains operational.

## 38. What is the difference between high availability and fault tolerance?
- **High availability**: System remains operational most of the time (e.g., 99.9%).  
- **Fault tolerance**: System continues to operate correctly even when components fail.

## 39. How do you monitor system health?
- Metrics (CPU, latency, error rates).  
- Logs aggregation.  
- Distributed tracing.  
- Alerting on thresholds.

## 40. What are SLAs and SLOs?
- **SLA (Service Level Agreement)**: Contractual agreement with customers.  
- **SLO (Service Level Objective)**: Internal target for a specific metric (e.g., 99.9% uptime).

## 41. How do you choose between SQL and NoSQL databases?
Consider data consistency needs, schema flexibility, query patterns, scalability requirements, and operational expertise.

## 42. What are the different types of NoSQL databases?
- **Key‑Value** (Redis, DynamoDB)  
- **Document** (MongoDB, Couchbase)  
- **Column‑Family** (Cassandra, HBase)  
- **Graph** (Neo4j, JanusGraph)

## 43. How do you design a database schema?
- Identify entities and relationships.  
- Normalize to reduce redundancy.  
- Add indexes for query patterns.  
- Consider partitioning and sharding needs.

## 44. What is database normalization?
Process of organizing tables to reduce data redundancy and improve integrity, typically up to 3NF (Third Normal Form).

## 45. What is database denormalization?
Intentional duplication of data to reduce join complexity and improve read performance, at the cost of write complexity.

## 46. How do you handle database migrations?
- Versioned migration scripts (e.g., Flyway, Liquibase).  
- Apply migrations in a controlled rollout.  
- Use backward‑compatible changes when possible.

## 47. What is the difference between primary and secondary indexes?
- **Primary index**: Defines the physical ordering of data (often the primary key).  
- **Secondary index**: Additional data structures to speed up lookups on non‑primary columns.

## 48. How do you handle database transactions?
- Use ACID‑compliant DB engines.  
- Keep transactions short.  
- Apply isolation levels appropriate to consistency needs.

## 49. What is the difference between ACID and BASE properties?
- **ACID**: Atomicity, Consistency, Isolation, Durability (strong consistency).  
- **BASE**: Basically Available, Soft state, Eventual consistency (used in many NoSQL systems).

## 50. How do you implement data consistency?
- Choose appropriate consistency model (strong, eventual).  
- Use distributed consensus algorithms (Raft, Paxos) for strong consistency.  
- Apply idempotent writes and conflict resolution for eventual consistency.

## 51. What are the different types of caching?
- **In‑memory** (Redis, Memcached)  
- **Distributed** (clustered caches)  
- **Edge/CDN** caching  
- **Browser** caching

## 52. How do you implement client‑side caching?
- Set appropriate HTTP cache‑control headers.  
- Use Service Workers for offline caching.  
- Leverage localStorage/IndexedDB for custom data.

## 53. How do you implement server‑side caching?
- Cache query results in Redis/Memcached.  
- Use reverse proxies (Varnish, Nginx) for HTTP responses.  
- Implement application‑level caching layers.

## 54. What is CDN and how does it work?
A Content Delivery Network replicates static assets across geographically distributed edge nodes, serving content from the node closest to the user to reduce latency.

## 55. How do you implement cache invalidation?
- **TTL (time‑to‑live)** expiration.  
- **Write‑through/write‑behind** updates.  
- **Explicit purge** via API when underlying data changes.

## 56. What is cache warming?
Pre‑populating the cache with frequently accessed data before it is requested, often done after a cold start or deployment.

## 57. How do you handle cache stampede?
- Use **request coalescing** (single fetch for concurrent **randomized TTL** (jitter).  
- Implement **lock‑based** or **token bucket** strategies.

## 58. What is write‑through caching?
Writes go to both the cache and the underlying datastore synchronously, keeping them consistent.

## 59. What is write‑behind caching?
Writes are first stored in the cache and asynchronously persisted to the datastore, improving write latency.

## 60. How do you choose cache size and eviction policy?
- Estimate working set size based on hit‑rate analysis.  
- Use **LRU** for general workloads, **LFU** for frequency‑based, or **TTL** for time‑sensitive data.

## 61. What is load balancing and why is it important?
Distributes incoming traffic across multiple servers to avoid overload, improve response time, and provide redundancy.

## 62. What are the different load balancing algorithms?
- **Round Robin**  
- **Least Connections**  
- **IP Hash**  
- **Weighted Round Robin**  
- **Consistent Hashing** (for sticky sessions)

## 63. How does a load balancer work?
It receives client requests, selects a backend server based on its algorithm, and forwards the request while handling health checks and SSL termination.

## 64. What is the difference between L4 and L7 load balancers?
- **L4** operates at transport layer (TCP/UDP) – forwards packets without inspecting payload.  
- **L7** operates at application layer (HTTP) – can route based on URL, headers, cookies.

## 65. How do you implement session affinity?
- **IP hash** or **cookie‑based** affinity where the load balancer routes subsequent requests from the same client to the same backend instance.

## 66. What is health checking in load balancing?
Periodic probes (TCP, HTTP, gRPC) sent to backend instances to verify they are healthy; unhealthy nodes are removed from rotation.

## 67. How do you handle load balancer failures?
- Deploy multiple load balancers in active‑passive or active‑active mode.  
- Use DNS round‑robin or anycast IPs.  
- Leverage cloud‑managed load balancers with built‑in redundancy.

## 68. What is global server load balancing?
Distributes traffic across geographically dispersed data centers, often using DNS‑based routing or Anycast to direct users to the nearest healthy region.

## 69. How do you implement load balancing for microservices?
- Use a service mesh (e.g., Istio, Linkerd) that provides sidecar proxies for intra‑service load balancing.  
- Or employ API gateways that route to appropriate service instances.

## 70. What are the challenges in load balancing?
- Sticky sessions with stateful services.  
- Handling uneven load distribution (hot spots).  
- SSL termination overhead.  
- Maintaining session state across failures.

## 71. What is a message queue?
A broker that stores messages until they can be processed by consumers, enabling asynchronous communication and decoupling.

## 72. How do message queues improve system reliability?
They buffer spikes, allow retries, and isolate producer/consumer failures, preventing loss of data during transient outages.

## 73. What is the difference between point‑to‑point and publish‑subscribe?
- **Point‑to‑point**: One producer, one consumer per message (queue).  
- **Publish‑subscribe**: One producer, multiple consumers (topics) receive copies of each message.

## 74. How do you handle message ordering?
- Use FIFO queues or partition keys that preserve order within a partition.  
- Apply sequence numbers and reordering logic on the consumer side if needed.

## 75. What is message durability?
Ensuring messages are persisted to disk or replicated so they survive broker crashes.

## 76. How do you implement message filtering?
- Topic‑based subscriptions.  
- Header or attribute filtering supported by the broker (e.g., Kafka consumer groups with predicates).

## 77. What is the difference between RabbitMQ and Kafka?
- **RabbitMQ**: Traditional broker, supports complex routing, AMQP protocol, good for low‑latency tasks.  
- **Kafka**: Distributed log, high throughput, partitioned, designed for event streaming and replay.

## 78. How do you handle message duplication?
- Make consumers **idempotent** (deduplicate using message IDs).  
- Enable **exactly‑once** semantics where supported (Kafka transactional APIs).

## 79. How do you monitor message queues?
- Track queue depth, consumer lag, throughput, error rates.  
- Use broker‑provided metrics (Prometheus exporters) and alert on thresholds.

## 80. What are the use cases for message queues?
- Asynchronous processing, task queues, event sourcing, decoupling microservices, buffering spikes.

## 81. What is REST API design?
Designing HTTP‑based services that expose resources via standard verbs (GET, POST, PUT, DELETE) with stateless interactions and proper status codes.

## 82. How do you design RESTful APIs?
- Use nouns for resources.  
- Hierarchical URLs for relationships.  
- Proper use of HTTP methods.  
- Versioning (e.g., `/v1/`).  
- HATEOAS where appropriate.

## 83. What is the difference between REST and GraphQL?
- **REST**: Multiple endpoints, fixed responses.  
- **GraphQL**: Single endpoint, client specifies exact data shape, reduces over‑fetch/under‑fetch.

## 84. How do you handle API versioning?
- URL versioning (`/api/v1/`).  
- Header versioning (`Accept: application/vnd.myapi.v2+json`).  
- Use backward‑compatible changes when possible.

## 85. What is API gateway?
A single entry point that handles request routing, authentication, rate limiting, caching, and monitoring for multiple microservices.

## 86. How do you implement API authentication?
- API keys, OAuth 2.0 (Bearer tokens), JWTs, mutual TLS.  
- Validate tokens at the gateway or service level.

## 87. How do you handle API rate limiting?
- Token bucket or leaky bucket algorithms at the gateway.  
- Return `429 Too Many Requests` when limit exceeded.

## 88. What is the difference between synchronous and asynchronous APIs?
- **Synchronous**: Client waits for immediate response (e.g., HTTP).  
- **Asynchronous**: Client receives a token or callback and processes later (e.g., Webhooks, WebSockets).

## 89. How do you document APIs?
- OpenAPI/Swagger specifications.  
- Provide examples, error codes, authentication details.  
- Host interactive docs (Swagger UI, Redoc).

## 90. How do you handle API errors?
- Use appropriate HTTP status codes.  
- Return structured error payloads (code, message, details).  
- Log errors for observability.

## 91. What are the common security vulnerabilities in system design?
- Injection attacks, broken authentication, insecure deserialization, insufficient logging, misconfiguration, insecure direct object references.

## 92. How do you implement authentication and authorization?
- Authentication: Verify identity (passwords, OAuth, SSO).  
- Authorization: Enforce permissions (RBAC, ABAC, ACLs) after identity is known.

## 93. What is OAuth and how does it work?
OAuth 2.0 delegates authorization to a third‑party provider. Clients obtain an access token after user consent, which they use to access protected resources.

## 94. How do you handle data encryption?
- **At rest**: Disk‑level encryption (AES‑256), encrypted databases.  
- **In transit**: TLS/HTTPS for all network traffic.

## 95. What is a firewall and how does it work?
A network security device that filters inbound/outbound traffic based on rules (IP, port, protocol) to block unauthorized access.

## 96. How do you prevent DDoS attacks?
- Rate limiting, IP blacklisting, CDN/WAF, traffic scrubbing services, auto‑scaling to absorb traffic spikes.

## 97. What is SQL injection and how do you prevent it?
An attacker injects malicious SQL via input fields. Prevent by using prepared statements, ORM parameterization, input validation, least privilege DB accounts.

## 98. How do you handle secure communication?
- Enforce TLS 1.2+ everywhere.  
- Use mutual TLS for service‑to‑service communication.  
- Rotate certificates regularly.

## 99. What is a zero‑trust security model?
Never trust any network traffic by default; verify every request with authentication, authorization, and encryption, regardless of origin.

## 100. How do you implement security monitoring?
- Centralized logging of security events.  
- Real‑time alerting on anomalies.  
- Use SIEM tools for correlation.  
- Conduct regular audits and penetration testing.

--- 

*Prepared by Cline SR – Samsung Research*
