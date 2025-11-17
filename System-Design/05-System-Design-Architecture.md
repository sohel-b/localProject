# System Design & Architecture for MERN Interviews

## 🏗️ Microservices Architecture

### Service Communication Patterns
```javascript
// API Gateway Pattern
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

class APIGateway {
    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
        this.setupProxies();
    }
    
    setupMiddleware() {
        this.app.use(express.json());
        
        // Request logging
        this.app.use((req, res, next) => {
            console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
            next();
        });
        
        // Rate limiting
        const rateLimit = require('express-rate-limit');
        this.app.use(rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        }));
        
        // Authentication middleware
        this.app.use(this.authenticateRequest.bind(this));
    }
    
    async authenticateRequest(req, res, next) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ error: 'No token provided' });
            }
            
            // Verify JWT with auth service
            const response = await fetch('http://auth-service/verify', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (!response.ok) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            
            const user = await response.json();
            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Authentication failed' });
        }
    }
    
    setupRoutes() {
        // Health check
        this.app.get('/health', (req, res) => {
            res.json({ status: 'healthy', timestamp: new Date().toISOString() });
        });
        
        // Service discovery endpoint
        this.app.get('/services', (req, res) => {
            res.json({
                services: [
                    { name: 'user-service', url: 'http://user-service:3001' },
                    { name: 'product-service', url: 'http://product-service:3002' },
                    { name: 'order-service', url: 'http://order-service:3003' },
                    { name: 'notification-service', url: 'http://notification-service:3004' }
                ]
            });
        });
    }
    
    setupProxies() {
        // User service routes
        this.app.use('/api/users', createProxyMiddleware({
            target: 'http://user-service:3001',
            changeOrigin: true,
            pathRewrite: { '^/api/users': '' }
        }));
        
        // Product service routes
        this.app.use('/api/products', createProxyMiddleware({
            target: 'http://product-service:3002',
            changeOrigin: true,
            pathRewrite: { '^/api/products': '' }
        }));
        
        // Order service routes
        this.app.use('/api/orders', createProxyMiddleware({
            target: 'http://order-service:3003',
            changeOrigin: true,
            pathRewrite: { '^/api/orders': '' }
        }));
        
        // Notification service routes
        this.app.use('/api/notifications', createProxyMiddleware({
            target: 'http://notification-service:3004',
            changeOrigin: true,
            pathRewrite: { '^/api/notifications': '' }
        }));
    }
    
    start(port = 3000) {
        this.app.listen(port, () => {
            console.log(`API Gateway running on port ${port}`);
        });
    }
}

// Circuit Breaker Pattern
class CircuitBreaker {
    constructor(options = {}) {
        this.failureThreshold = options.failureThreshold || 5;
        this.resetTimeout = options.resetTimeout || 60000;
        this.monitoringPeriod = options.monitoringPeriod || 10000;
        
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.successCount = 0;
    }
    
    async call(operation) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime > this.resetTimeout) {
                this.state = 'HALF_OPEN';
                this.successCount = 0;
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }
        
        try {
            const result = await operation();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        
        if (this.state === 'HALF_OPEN') {
            this.successCount++;
            if (this.successCount >= 3) {
                this.state = 'CLOSED';
            }
        }
    }
    
    onFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        
        if (this.failureCount >= this.failureThreshold) {
            this.state = 'OPEN';
        }
    }
    
    getState() {
        return {
            state: this.state,
            failureCount: this.failureCount,
            lastFailureTime: this.lastFailureTime
        };
    }
}

// Service with Circuit Breaker
class ProductService {
    constructor() {
        this.circuitBreaker = new CircuitBreaker({
            failureThreshold: 3,
            resetTimeout: 30000
        });
    }
    
    async getProduct(productId) {
        return this.circuitBreaker.call(async () => {
            const response = await fetch(`http://product-service:3002/products/${productId}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        });
    }
    
    async createProduct(productData) {
        return this.circuitBreaker.call(async () => {
            const response = await fetch('http://product-service:3002/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        });
    }
}
```

### Service Discovery & Load Balancing
```javascript
// Service Registry
class ServiceRegistry {
    constructor() {
        this.services = new Map();
        this.healthChecks = new Map();
    }
    
    register(serviceName, instanceId, url, healthCheckUrl) {
        if (!this.services.has(serviceName)) {
            this.services.set(serviceName, new Map());
        }
        
        const serviceInfo = {
            instanceId,
            url,
            healthCheckUrl,
            registeredAt: new Date(),
            lastHealthCheck: new Date(),
            status: 'healthy'
        };
        
        this.services.get(serviceName).set(instanceId, serviceInfo);
        this.startHealthCheck(serviceName, instanceId);
        
        console.log(`Registered ${serviceName}:${instanceId} at ${url}`);
        return serviceInfo;
    }
    
    unregister(serviceName, instanceId) {
        if (this.services.has(serviceName)) {
            this.services.get(serviceName).delete(instanceId);
            this.stopHealthCheck(serviceName, instanceId);
            console.log(`Unregistered ${serviceName}:${instanceId}`);
        }
    }
    
    discover(serviceName) {
        const instances = this.services.get(serviceName);
        if (!instances || instances.size === 0) {
            throw new Error(`No healthy instances found for ${serviceName}`);
        }
        
        // Simple round-robin load balancing
        const healthyInstances = Array.from(instances.values())
            .filter(instance => instance.status === 'healthy');
            
        if (healthyInstances.length === 0) {
            throw new Error(`No healthy instances found for ${serviceName}`);
        }
        
        const randomIndex = Math.floor(Math.random() * healthyInstances.length);
        return healthyInstances[randomIndex];
    }
    
    startHealthCheck(serviceName, instanceId) {
        const checkInterval = setInterval(async () => {
            try {
                const serviceInfo = this.services.get(serviceName)?.get(instanceId);
                if (!serviceInfo) {
                    clearInterval(checkInterval);
                    return;
                }
                
                const response = await fetch(serviceInfo.healthCheckUrl, {
                    timeout: 5000
                });
                
                if (response.ok) {
                    serviceInfo.status = 'healthy';
                    serviceInfo.lastHealthCheck = new Date();
                } else {
                    serviceInfo.status = 'unhealthy';
                }
            } catch (error) {
                const serviceInfo = this.services.get(serviceName)?.get(instanceId);
                if (serviceInfo) {
                    serviceInfo.status = 'unhealthy';
                }
            }
        }, 30000); // Check every 30 seconds
        
        const checkKey = `${serviceName}:${instanceId}`;
        this.healthChecks.set(checkKey, checkInterval);
    }
    
    stopHealthCheck(serviceName, instanceId) {
        const checkKey = `${serviceName}:${instanceId}`;
        const checkInterval = this.healthChecks.get(checkKey);
        if (checkInterval) {
            clearInterval(checkInterval);
            this.healthChecks.delete(checkKey);
        }
    }
    
    getAllServices() {
        const result = {};
        for (const [serviceName, instances] of this.services) {
            result[serviceName] = Array.from(instances.values());
        }
        return result;
    }
}

// Load Balancer with different strategies
class LoadBalancer {
    constructor(serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
        this.strategies = {
            'round-robin': this.roundRobinStrategy.bind(this),
            'least-connections': this.leastConnectionsStrategy.bind(this),
            'random': this.randomStrategy.bind(this),
            'weighted': this.weightedStrategy.bind(this)
        };
        this.counters = new Map();
    }
    
    async selectInstance(serviceName, strategy = 'round-robin') {
        const instances = Array.from(this.serviceRegistry.services.get(serviceName)?.values() || [])
            .filter(instance => instance.status === 'healthy');
            
        if (instances.length === 0) {
            throw new Error(`No healthy instances for ${serviceName}`);
        }
        
        const selectStrategy = this.strategies[strategy];
        if (!selectStrategy) {
            throw new Error(`Unknown load balancing strategy: ${strategy}`);
        }
        
        return selectStrategy(instances, serviceName);
    }
    
    roundRobinStrategy(instances, serviceName) {
        if (!this.counters.has(serviceName)) {
            this.counters.set(serviceName, 0);
        }
        
        const counter = this.counters.get(serviceName);
        const selectedInstance = instances[counter % instances.length];
        this.counters.set(serviceName, counter + 1);
        
        return selectedInstance;
    }
    
    leastConnectionsStrategy(instances) {
        // In a real implementation, you'd track active connections
        // For now, return a random instance
        return instances[Math.floor(Math.random() * instances.length)];
    }
    
    randomStrategy(instances) {
        return instances[Math.floor(Math.random() * instances.length)];
    }
    
    weightedStrategy(instances) {
        // In a real implementation, instances would have weights
        // For now, use round-robin
        return this.roundRobinStrategy(instances, 'default');
    }
}
```

## 🔄 Event-Driven Architecture

### Message Queue Implementation
```javascript
// Event Bus Implementation
class EventBus {
    constructor() {
        this.subscribers = new Map();
        this.middlewares = [];
    }
    
    // Subscribe to events
    subscribe(eventType, handler, options = {}) {
        if (!this.subscribers.has(eventType)) {
            this.subscribers.set(eventType, []);
        }
        
        const subscription = {
            id: this.generateId(),
            handler,
            once: options.once || false,
            priority: options.priority || 0,
            context: options.context || null
        };
        
        this.subscribers.get(eventType).push(subscription);
        
        // Sort by priority (higher priority first)
        this.subscribers.get(eventType).sort((a, b) => b.priority - a.priority);
        
        return subscription.id;
    }
    
    // Unsubscribe from events
    unsubscribe(eventType, subscriptionId) {
        const subscriptions = this.subscribers.get(eventType);
        if (subscriptions) {
            const index = subscriptions.findIndex(sub => sub.id === subscriptionId);
            if (index !== -1) {
                subscriptions.splice(index, 1);
            }
        }
    }
    
    // Publish event
    async publish(eventType, data) {
        const event = {
            type: eventType,
            data,
            timestamp: new Date(),
            id: this.generateId()
        };
        
        // Apply middlewares
        for (const middleware of this.middlewares) {
            await middleware(event);
        }
        
        const subscriptions = this.subscribers.get(eventType) || [];
        const results = [];
        
        for (const subscription of subscriptions) {
            try {
                const result = await subscription.handler.call(
                    subscription.context,
                    event
                );
                results.push(result);
                
                // Remove one-time subscribers
                if (subscription.once) {
                    this.unsubscribe(eventType, subscription.id);
                }
            } catch (error) {
                console.error(`Error in event handler for ${eventType}:`, error);
            }
        }
        
        return results;
    }
    
    // Add middleware
    use(middleware) {
        this.middlewares.push(middleware);
    }
    
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

// Event Sourcing Implementation
class EventStore {
    constructor(database) {
        this.db = database;
    }
    
    async saveEvent(aggregateId, eventType, eventData, version) {
        const event = {
            id: this.generateId(),
            aggregateId,
            eventType,
            eventData,
            version,
            timestamp: new Date()
        };
        
        await this.db.collection('events').insertOne(event);
        return event;
    }
    
    async getEvents(aggregateId, fromVersion = 0) {
        return await this.db.collection('events')
            .find({ aggregateId, version: { $gt: fromVersion } })
            .sort({ version: 1 })
            .toArray();
    }
    
    async getEventsByType(eventType, fromTimestamp = null) {
        const query = { eventType };
        if (fromTimestamp) {
            query.timestamp = { $gte: fromTimestamp };
        }
        
        return await this.db.collection('events')
            .find(query)
            .sort({ timestamp: 1 })
            .toArray();
    }
    
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

// Aggregate Root for Event Sourcing
class AggregateRoot {
    constructor(id) {
        this.id = id;
        this.version = 0;
        this.uncommittedEvents = [];
    }
    
    applyEvent(eventType, eventData) {
        const event = {
            type: eventType,
            data: eventData,
            aggregateId: this.id,
            version: this.version + 1
        };
        
        this.uncommittedEvents.push(event);
        this.apply(event);
        this.version++;
    }
    
    // To be implemented by concrete aggregates
    apply(event) {
        throw new Error('apply method must be implemented');
    }
    
    getUncommittedEvents() {
        return [...this.uncommittedEvents];
    }
    
    markEventsAsCommitted() {
        this.uncommittedEvents = [];
    }
    
    static async fromHistory(eventStore, aggregateId) {
        const events = await eventStore.getEvents(aggregateId);
        const aggregate = new this(aggregateId);
        
        for (const event of events) {
            aggregate.apply(event);
            aggregate.version = event.version;
        }
        
        return aggregate;
    }
}

// Order Aggregate Example
class Order extends AggregateRoot {
    constructor(id) {
        super(id);
        this.status = 'pending';
        this.items = [];
        this.total = 0;
        this.userId = null;
    }
    
    static create(userId, items) {
        const order = new Order(this.generateId());
        order.applyEvent('OrderCreated', { userId, items });
        return order;
    }
    
    apply(event) {
        switch (event.type) {
            case 'OrderCreated':
                this.status = 'pending';
                this.items = event.data.items;
                this.userId = event.data.userId;
                this.total = this.calculateTotal(event.data.items);
                break;
                
            case 'OrderConfirmed':
                this.status = 'confirmed';
                break;
                
            case 'OrderShipped':
                this.status = 'shipped';
                this.shippingAddress = event.data.shippingAddress;
                break;
                
            case 'OrderDelivered':
                this.status = 'delivered';
                this.deliveredAt = event.data.deliveredAt;
                break;
                
            case 'OrderCancelled':
                this.status = 'cancelled';
                this.cancelReason = event.data.reason;
                break;
        }
    }
    
    confirm() {
        if (this.status !== 'pending') {
            throw new Error('Order cannot be confirmed');
        }
        this.applyEvent('OrderConfirmed', {});
    }
    
    ship(shippingAddress) {
        if (this.status !== 'confirmed') {
            throw new Error('Order cannot be shipped');
        }
        this.applyEvent('OrderShipped', { shippingAddress });
    }
    
    deliver() {
        if (this.status !== 'shipped') {
            throw new Error('Order cannot be delivered');
        }
        this.applyEvent('OrderDelivered', { deliveredAt: new Date() });
    }
    
    cancel(reason) {
        if (['delivered', 'cancelled'].includes(this.status)) {
            throw new Error('Order cannot be cancelled');
        }
        this.applyEvent('OrderCancelled', { reason });
    }
    
    calculateTotal(items) {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    static generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}
```

## 🚀 CQRS Pattern Implementation

### Command Query Responsibility Segregation
```javascript
// Command Handler
class CommandHandler {
    constructor(eventStore) {
        this.eventStore = eventStore;
        this.handlers = new Map();
    }
    
    register(commandType, handler) {
        this.handlers.set(commandType, handler);
    }
    
    async handle(command) {
        const handler = this.handlers.get(command.type);
        if (!handler) {
            throw new Error(`No handler registered for command type: ${command.type}`);
        }
        
        return await handler(command);
    }
}

// Query Handler
class QueryHandler {
    constructor(readDatabase) {
        this.readDatabase = readDatabase;
        this.handlers = new Map();
    }
    
    register(queryType, handler) {
        this.handlers.set(queryType, handler);
    }
    
    async handle(query) {
        const handler = this.handlers.get(query.type);
        if (!handler) {
            throw new Error(`No handler registered for query type: ${query.type}`);
        }
        
        return await handler(query);
    }
}

// Read Model Projection
class OrderProjection {
    constructor(readDatabase) {
        this.readDatabase = readDatabase;
    }
    
    async handle(event) {
        switch (event.type) {
            case 'OrderCreated':
                await this.projectOrderCreated(event);
                break;
            case 'OrderConfirmed':
                await this.projectOrderConfirmed(event);
                break;
            case 'OrderShipped':
                await this.projectOrderShipped(event);
                break;
            case 'OrderDelivered':
                await this.projectOrderDelivered(event);
                break;
            case 'OrderCancelled':
                await this.projectOrderCancelled(event);
                break;
        }
    }
    
    async projectOrderCreated(event) {
        const orderData = {
            id: event.aggregateId,
            userId: event.data.userId,
            items: event.data.items,
            total: this.calculateTotal(event.data.items),
            status: 'pending',
            createdAt: event.timestamp,
            version: event.version
        };
        
        await this.readDatabase.collection('orders_read').insertOne(orderData);
    }
    
    async projectOrderConfirmed(event) {
        await this.readDatabase.collection('orders_read').updateOne(
            { id: event.aggregateId },
            { 
                $set: { 
                    status: 'confirmed',
                    confirmedAt: event.timestamp,
                    version: event.version
                }
            }
        );
    }
    
    async projectOrderShipped(event) {
        await this.readDatabase.collection('orders_read').updateOne(
            { id: event.aggregateId },
            { 
                $set: { 
                    status: 'shipped',
                    shippingAddress: event.data.shippingAddress,
                    shippedAt: event.timestamp,
                    version: event.version
                }
            }
        );
    }
    
    async projectOrderDelivered(event) {
        await this.readDatabase.collection('orders_read').updateOne(
            { id: event.aggregateId },
            { 
                $set: { 
                    status: 'delivered',
                    deliveredAt: event.data.deliveredAt,
                    version: event.version
                }
            }
        );
    }
    
    async projectOrderCancelled(event) {
        await this.readDatabase.collection('orders_read').updateOne(
            { id: event.aggregateId },
            { 
                $set: { 
                    status: 'cancelled',
                    cancelReason: event.data.reason,
                    cancelledAt: event.timestamp,
                    version: event.version
                }
            }
        );
    }
    
    calculateTotal(items) {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}

// Application Service
class OrderApplicationService {
    constructor(eventStore, commandHandler, queryHandler, eventBus) {
        this.eventStore = eventStore;
        this.commandHandler = commandHandler;
        this.queryHandler = queryHandler;
        this.eventBus = eventBus;
        
        this.setupCommandHandlers();
    }
    
    setupCommandHandlers() {
        this.commandHandler.register('CreateOrder', async (command) => {
            const order = Order.create(command.data.userId, command.data.items);
            
            for (const event of order.getUncommittedEvents()) {
                await this.eventStore.save
