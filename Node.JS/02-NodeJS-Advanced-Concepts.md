# Node.js Advanced Concepts for MERN Interviews

## 🔄 Event Loop Deep Dive

### Event Loop Phases Explained
```javascript
const { setImmediate, nextTick } = require('timers');

console.log('Script Start');

// Timers Phase
setTimeout(() => console.log('setTimeout (Timers Phase)'), 0);

// Check Phase
setImmediate(() => console.log('setImmediate (Check Phase)'));

// Microtasks
Promise.resolve().then(() => console.log('Promise (Microtask)'));
nextTick(() => console.log('nextTick (Microtask)'));

// I/O Operations
const fs = require('fs');
fs.readFile(__filename, () => {
    console.log('File Read (I/O Callback)');
    
    setTimeout(() => console.log('setTimeout inside I/O'), 0);
    setImmediate(() => console.log('setImmediate inside I/O'));
});

console.log('Script End');

// Output Order Analysis:
// Script Start
// Script End
// nextTick (Microtask)
// Promise (Microtask)
// setTimeout (Timers Phase)
// setImmediate (Check Phase)
// File Read (I/O Callback)
// setImmediate inside I/O
// setTimeout inside I/O
```

### Event Loop Blocking Examples
```javascript
// Blocking Event Loop
function blockingOperation() {
    const start = Date.now();
    while (Date.now() - start < 5000) {
        // Block for 5 seconds
    }
    console.log('Blocking operation completed');
}

// Non-blocking with setImmediate
function nonBlockingOperation() {
    setImmediate(() => {
        console.log('Non-blocking operation completed');
    });
}

// Process.nextTick vs setImmediate
console.log('Starting');
process.nextTick(() => console.log('nextTick 1'));
process.nextTick(() => console.log('nextTick 2'));
setImmediate(() => console.log('setImmediate 1'));
setImmediate(() => console.log('setImmediate 2'));
console.log('Ending');
```

## 🌊 Streams Deep Dive

### Custom Stream Implementation
```javascript
const { Transform, Writable, Readable } = require('stream');

// Custom Readable Stream
class CounterStream extends Readable {
    constructor(options = {}) {
        super({ objectMode: false, ...options });
        this.max = options.max || 10;
        this.index = 1;
    }
    
    _read() {
        const i = this.index++;
        
        if (i > this.max) {
            this.push(null); // End of stream
        } else {
            const buf = Buffer.from(`${i}\n`, 'utf8');
            this.push(buf);
        }
    }
}

// Custom Transform Stream
class UppercaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const upperChunk = chunk.toString().toUpperCase();
        this.push(upperChunk);
        callback();
    }
}

// Custom Writable Stream
class LoggerStream extends Writable {
    constructor(options = {}) {
        super({ objectMode: false, ...options });
    }
    
    _write(chunk, encoding, callback) {
        console.log('Logging:', chunk.toString().trim());
        callback();
    }
}

// Pipeline Usage
const { pipeline } = require('stream');

const counter = new CounterStream({ max: 5 });
const upper = new UppercaseTransform();
const logger = new LoggerStream();

pipeline(
    counter,
    upper,
    logger,
    (err) => {
        if (err) console.error('Pipeline failed:', err);
        else console.log('Pipeline completed');
    }
);
```

### Stream Error Handling & Backpressure
```javascript
const fs = require('fs');

// Stream with Error Handling
function createReadStreamWithHandling(filePath) {
    const readStream = fs.createReadStream(filePath);
    
    readStream.on('error', (error) => {
        console.error('Read stream error:', error);
    });
    
    readStream.on('data', (chunk) => {
        console.log(`Received ${chunk.length} bytes`);
    });
    
    readStream.on('end', () => {
        console.log('Stream finished');
    });
    
    return readStream;
}

// Handling Backpressure
function handleBackpressure(readStream, writeStream) {
    readStream.on('data', (chunk) => {
        const canWrite = writeStream.write(chunk);
        
        if (!canWrite) {
            readStream.pause();
            console.log('Backpressure: Pausing read stream');
            
            writeStream.once('drain', () => {
                readStream.resume();
                console.log('Backpressure: Resuming read stream');
            });
        }
    });
}
```

## 🏗️ Event Emitter Pattern

### Advanced Event Emitter Implementation
```javascript
const EventEmitter = require('events');

class TaskQueue extends EventEmitter {
    constructor(concurrency = 1) {
        super();
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }
    
    addTask(task) {
        this.queue.push(task);
        this.process();
    }
    
    process() {
        while (this.running < this.concurrency && this.queue.length > 0) {
            const task = this.queue.shift();
            this.running++;
            
            this.emit('taskStart', task);
            
            task()
                .then((result) => {
                    this.emit('taskComplete', task, result);
                })
                .catch((error) => {
                    this.emit('taskError', task, error);
                })
                .finally(() => {
                    this.running--;
                    this.process();
                });
        }
    }
}

// Usage Example
const taskQueue = new TaskQueue(2);

taskQueue.on('taskStart', (task) => {
    console.log(`Starting task: ${task.name}`);
});

taskQueue.on('taskComplete', (task, result) => {
    console.log(`Completed task: ${task.name}, Result: ${result}`);
});

taskQueue.on('taskError', (task, error) => {
    console.error(`Error in task: ${task.name}, Error: ${error.message}`);
});

// Add tasks
taskQueue.addTask(() => Promise.resolve('Task 1 done').then(r => ({ name: 'Task 1', result: r })));
taskQueue.addTask(() => Promise.resolve('Task 2 done').then(r => ({ name: 'Task 2', result: r })));
taskQueue.addTask(() => Promise.reject(new Error('Task 3 failed')).then(r => ({ name: 'Task 3', result: r })));
```

## 🧵 Worker Threads & Clustering

### Worker Threads Implementation
```javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// Main Thread
if (isMainThread) {
    function runWorkerService(data) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: data
            });
            
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    }
    
    async function processWithWorkers() {
        const tasks = [
            { number: 10 },
            { number: 20 },
            { number: 30 }
        ];
        
        const workers = tasks.map(task => runWorkerService(task));
        const results = await Promise.all(workers);
        
        console.log('Results:', results);
    }
    
    processWithWorkers().catch(console.error);
} else {
    // Worker Thread
    function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    const result = fibonacci(workerData.number);
    parentPort.postMessage({ input: workerData.number, result });
}
```

### Cluster Module for Load Balancing
```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log('Starting a new worker');
        cluster.fork();
    });
    
    // Handle worker messages
    cluster.on('message', (worker, message) => {
        console.log(`Worker ${worker.process.pid}: ${message}`);
    });
} else {
    // Worker processes
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Hello from worker ${process.pid}\n`);
        
        // Send message to master
        process.send(`Request handled by worker ${process.pid}`);
    }).listen(8000);
    
    console.log(`Worker ${process.pid} started`);
}
```

## 🚀 Express.js Advanced Patterns

### Custom Middleware Architecture
```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');

// Request Logging Middleware
const requestLogger = (options = {}) => {
    return (req, res, next) => {
        const start = Date.now();
        
        res.on('finish', () => {
            const duration = Date.now() - start;
            const log = {
                method: req.method,
                url: req.url,
                status: res.statusCode,
                duration: `${duration}ms`,
                ip: req.ip,
                userAgent: req.get('User-Agent')
            };
            
            console.log(JSON.stringify(log, null, 2));
        });
        
        next();
    };
};

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    const error = {
        message: err.message,
        status: err.status || 500,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    };
    
    res.status(error.status).json({
        error: {
            message: error.message,
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
        }
    });
};

// Async Error Wrapper
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Validation Middleware
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }
        next();
    };
};

// Rate Limiting
const createRateLimiter = (windowMs, max, message) => {
    return rateLimit({
        windowMs,
        max,
        message: { error: message },
        standardHeaders: true,
        legacyHeaders: false
    });
};

// App Setup
const app = express();

// Middleware Chain
app.use(express.json());
app.use(requestLogger());
app.use('/api/', createRateLimiter(15 * 60 * 1000, 100, 'Too many requests'));

// Routes with Async Handler
app.get('/api/users', asyncHandler(async (req, res) => {
    // Simulate async operation
    const users = await Promise.resolve([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
    ]);
    res.json(users);
}));

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### Advanced Routing & API Versioning
```javascript
const express = require('express');
const router = express.Router();

// API Versioning Middleware
const apiVersion = (version) => {
    return (req, res, next) => {
        req.apiVersion = version;
        next();
    };
};

// Route Parameters with Validation
router.param('userId', (req, res, next, userId) => {
    if (!/^\d+$/.test(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }
    req.userId = parseInt(userId);
    next();
});

// Nested Routes
router.route('/users')
    .get(asyncHandler(async (req, res) => {
        // Get users logic
        res.json({ users: [] });
    }))
    .post(validate(userSchema), asyncHandler(async (req, res) => {
        // Create user logic
        res.status(201).json({ message: 'User created' });
    }));

router.route('/users/:userId')
    .get(asyncHandler(async (req, res) => {
        // Get single user
        res.json({ userId: req.userId });
    }))
    .put(validate(userSchema), asyncHandler(async (req, res) => {
        // Update user
        res.json({ message: 'User updated' });
    }))
    .delete(asyncHandler(async (req, res) => {
        // Delete user
        res.json({ message: 'User deleted' });
    }));

// Versioned Routes
app.use('/api/v1', apiVersion('v1'), router);
app.use('/api/v2', apiVersion('v2'), routerV2);
```

## 🔐 Security & Authentication

### JWT Implementation
```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// JWT Service
class JWTService {
    constructor(secretKey, options = {}) {
        this.secretKey = secretKey;
        this.options = {
            expiresIn: '24h',
            issuer: 'your-app',
            audience: 'your-users',
            ...options
        };
    }
    
    generateToken(payload) {
        return jwt.sign(payload, this.secretKey, this.options);
    }
    
    verifyToken(token) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
    
    refreshToken(token) {
        const decoded = this.verifyToken(token);
        delete decoded.iat;
        delete decoded.exp;
        return this.generateToken(decoded);
    }
}

// Password Service
class PasswordService {
    constructor(saltRounds = 12) {
        this.saltRounds = saltRounds;
    }
    
    async hashPassword(password) {
        return bcrypt.hash(password, this.saltRounds);
    }
    
    async comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
    
    generateResetToken() {
        return crypto.randomBytes(32).toString('hex');
    }
}

// Authentication Middleware
const authenticate = (jwtService) => {
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            
            if (!token) {
                return res.status(401).json({ error: 'Access denied' });
            }
            
            const decoded = jwtService.verifyToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    };
};

// Authorization Middleware
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Access denied' });
        }
        
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        
        next();
    };
};
```

## 📊 Performance & Monitoring

### Performance Monitoring
```javascript
const performance = require('perf_hooks');

class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
    }
    
    startTimer(name) {
        this.metrics.set(name, performance.performance.now());
    }
    
    endTimer(name) {
        const startTime = this.metrics.get(name);
        if (startTime) {
            const duration = performance.performance.now() - startTime;
            console.log(`${name}: ${duration.toFixed(2)}ms`);
            this.metrics.delete(name);
            return duration;
        }
    }
    
    measureFunction(fn, name) {
        return async (...args) => {
            this.startTimer(name);
            try {
                const result = await fn(...args);
                this.endTimer(name);
                return result;
            } catch (error) {
                this.endTimer(name);
                throw error;
            }
        };
    }
}

// Memory Usage Monitoring
function monitorMemoryUsage() {
    const usage = process.memoryUsage();
    console.log('Memory Usage:', {
        rss: `${(usage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(usage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(usage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        external: `${(usage.external / 1024 / 1024).toFixed(2)} MB`
    });
}

// CPU Usage Monitoring
function monitorCPUUsage() {
    const startUsage = process.cpuUsage();
    
    setTimeout(() => {
        const endUsage = process.cpuUsage(startUsage);
        console.log('CPU Usage:', {
            user: endUsage.user,
            system: endUsage.system
        });
    }, 1000);
}
```

### Caching Strategies
```javascript
const NodeCache = require('node-cache');

// Multi-level Cache
class CacheManager {
    constructor() {
        this.memoryCache = new NodeCache({ stdTTL: 600 }); // 10 minutes
        this.redisCache = null; // Redis client if available
    }
    
    async get(key) {
        // Try memory cache first
        let value = this.memoryCache.get(key);
        if (value !== undefined) {
            return { data: value, source: 'memory' };
        }
        
        // Try Redis cache
        if (this.redisCache) {
            try {
                value = await this.redisCache.get(key);
                if (value) {
                    const parsed = JSON.parse(value);
                    // Store in memory cache for faster access
                    this.memoryCache.set(key, parsed);
                    return { data: parsed, source: 'redis' };
                }
            } catch (error) {
                console.error('Redis cache error:', error);
            }
        }
        
        return null;
    }
    
    async set(key, value, ttl = 600) {
        // Set in memory cache
        this.memoryCache.set(key, value, ttl);
        
        // Set in Redis cache
        if (this.redisCache) {
            try {
                await this.redisCache.setex(key, ttl, JSON.stringify(value));
            } catch (error) {
                console.error('Redis cache error:', error);
            }
        }
    }
    
    async invalidate(pattern) {
        // Invalidate from memory cache
        const keys = this.memoryCache.keys();
        const matchingKeys = keys.filter(key => key.includes(pattern));
        this.memoryCache.del(matchingKeys);
        
        // Invalidate from Redis cache
        if (this.redisCache) {
            try {
                const redisKeys = await this.redisCache.keys(`*${pattern}*`);
                if (redisKeys.length > 0) {
                    await this.redisCache.del(redisKeys);
                }
            } catch (error) {
                console.error('Redis cache error:', error);
            }
        }
    }
}

// Cache Middleware
const cacheMiddleware = (cacheManager, ttl = 300) => {
    return async (req, res, next) => {
        const key = `cache:${req.method}:${req.originalUrl}`;
        
        try {
            const cached = await cacheManager.get(key);
            if (cached) {
                res.set('X-Cache', cached.source);
                return res.json(cached.data);
            }
            
            // Override res.json to cache response
            const originalJson = res.json;
            res.json = function(data) {
                cacheManager.set(key, data, ttl);
                return originalJson.call(this, data);
            };
            
            next();
        } catch (error) {
            next();
        }
    };
};
```

## 🧪 Interview Questions & Answers

### Q1: How does Node.js handle concurrency despite being single-threaded?
**Answer:** Node.js uses the Event Loop and non-blocking I/O operations. While JavaScript execution is single-threaded, I/O operations are handled by the underlying system (libuv) which can execute operations in parallel. The Event Loop continuously checks for completed I/O operations and executes their callbacks.

### Q2: What's the difference between process.nextTick() and setImmediate()?
**Answer:** `process.nextTick()` executes before the next Event Loop phase, while `setImmediate()` executes in the Check phase. `nextTick()` has higher priority and can starve the Event Loop if used excessively.

### Q3: How do you handle memory leaks in Node.js?
**Answer:** Common strategies include:
- Removing event listeners when components are destroyed
- Using WeakMap/WeakSet for temporary references
- Monitoring memory usage with `process.memoryUsage()`
- Using tools like heapdump and Chrome DevTools for profiling
- Avoiding closures that unintentionally keep references

### Q4: Explain the difference between spawn, exec, and fork
**Answer:** 
- `spawn()`: Launches a new process with a given command, best for large data streams
- `exec()`: Creates a shell and executes a command, buffers output, good for small commands
- `fork()`: Special case of spawn() for creating Node.js processes with IPC communication

---

## 💡 Practice Exercises

1. **Build a custom stream transformer for
