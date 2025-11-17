# MongoDB Advanced Concepts for MERN Interviews

## 🗄️ Database Design Patterns

### Embedding vs Referencing
```javascript
// Embedding Pattern - Good for related data that's always accessed together
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        bio: String
    },
    addresses: [{
        street: String,
        city: String,
        state: String,
        zipCode: String,
        isDefault: Boolean
    }],
    preferences: {
        theme: { type: String, default: 'light' },
        notifications: {
            email: { type: Boolean, default: true },
            sms: { type: Boolean, default: false },
            push: { type: Boolean, default: true }
        }
    }
});

// Referencing Pattern - Good for large datasets or one-to-many relationships
const authorSchema = new mongoose.Schema({
    name: String,
    email: String,
    bio: String
});

const bookSchema = new mongoose.Schema({
    title: String,
    isbn: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher' },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    publishedDate: Date,
    pageCount: Number
});

// Hybrid Pattern - Mix of embedding and referencing
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderNumber: String,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number,
        // Embed product snapshot for historical accuracy
        productSnapshot: {
            name: String,
            sku: String,
            image: String
        }
    }],
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    payment: {
        method: String,
        transactionId: String,
        status: String
    },
    total: Number,
    createdAt: { type: Date, default: Date.now }
});
```

### Schema Design Best Practices
```javascript
// Extended Schema with Validation and Indexing
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    sku: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        match: [/^[A-Z0-9-]+$/, 'SKU must contain only uppercase letters, numbers, and hyphens']
    },
    description: {
        type: String,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative'],
        get: v => v.toFixed(2),
        set: v => parseFloat(v.toFixed(2))
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory'
    }],
    attributes: {
        color: String,
        size: String,
        weight: Number,
        dimensions: {
            length: Number,
            width: Number,
            height: Number
        }
    },
    inventory: {
        quantity: { type: Number, default: 0, min: 0 },
        reserved: { type: Number, default: 0, min: 0 },
        available: {
            type: Number,
            get: function() {
                return this.inventory.quantity - this.inventory.reserved;
            }
        }
    },
    media: {
        images: [{
            url: String,
            alt: String,
            isPrimary: { type: Boolean, default: false }
        }],
        videos: [{
            url: String,
            title: String,
            duration: Number
        }]
    },
    seo: {
        title: String,
        description: String,
        keywords: [String]
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'discontinued'],
        default: 'active'
    },
    tags: [String],
    ratings: {
        average: { type: Number, default: 0, min: 0, max: 5 },
        count: { type: Number, default: 0, min: 0 }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuals
productSchema.virtual('isInStock').get(function() {
    return this.inventory.available > 0;
});

productSchema.virtual('formattedPrice').get(function() {
    return `$${this.price}`;
});

// Instance Methods
productSchema.methods.updateInventory = function(quantityChange, operation = 'subtract') {
    if (operation === 'add') {
        this.inventory.quantity += quantityChange;
    } else {
        this.inventory.quantity = Math.max(0, this.inventory.quantity - quantityChange);
    }
    return this.save();
};

// Static Methods
productSchema.statics.findByCategory = function(categoryId) {
    return this.find({ category: categoryId }).populate('category');
};

productSchema.statics.findInStock = function() {
    return this.where('inventory.available').gt(0);
};

// Middleware
productSchema.pre('save', function(next) {
    if (this.isModified('inventory.quantity')) {
        this.inventory.available = this.inventory.quantity - this.inventory.reserved;
    }
    next();
});

productSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'category',
        select: 'name slug'
    });
    next();
});
```

## 🚀 Advanced Indexing Strategies

### Compound Indexes
```javascript
// Single Field Index
productSchema.index({ sku: 1 }); // Ascending
productSchema.index({ name: -1 }); // Descending

// Compound Index - Order matters!
productSchema.index({ category: 1, status: 1, price: 1 });
// This index helps with queries like:
// - Find active products in a category
// - Find products by category and sort by price
// - Find products by category, status, and price range

// Multikey Index - For array fields
productSchema.index({ tags: 1 });
productSchema.index({ subcategories: 1 });

// Text Index - For full-text search
productSchema.index({
    name: 'text',
    description: 'text',
    'seo.keywords': 'text'
}, {
    weights: {
        name: 10,
        description: 5,
        'seo.keywords': 1
    },
    name: 'product_text_index'
});

// Geospatial Index
const locationSchema = new mongoose.Schema({
    name: String,
    address: String,
    coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere'
    }
});

// TTL Index - For automatic document expiration
const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token: String,
    expiresAt: { type: Date, default: Date.now, expires: '24h' }
});

// Sparse Index - For fields that may not exist in all documents
userSchema.index({ 'socialMedia.twitter': 1 }, { sparse: true });

// Partial Index - Index only documents that match criteria
productSchema.index(
    { price: 1 }, 
    { 
        partialFilterExpression: { status: 'active' },
        name: 'active_products_price_index'
    }
);
```

### Index Performance Analysis
```javascript
// Creating indexes with background option
db.products.createIndex(
    { category: 1, price: 1 },
    { background: true, name: 'category_price_index' }
);

// Analyzing query performance
db.products.find({ category: ObjectId('...'), status: 'active' }).explain('executionStats');

// Index usage statistics
db.products.aggregate([
    { $indexStats: {} }
]);

// Covering query - All fields in query are in index
db.products.find(
    { category: ObjectId('...'), status: 'active' },
    { name: 1, price: 1, _id: 0 }
).hint({ category: 1, status: 1, name: 1, price: 1 });

// Dropping indexes
db.products.dropIndex('category_price_index');
```

## 🔄 Aggregation Pipeline Mastery

### Complex Aggregation Stages
```javascript
// Sales Analytics Pipeline
const getSalesAnalytics = async (startDate, endDate) => {
    return await Order.aggregate([
        // Stage 1: Match documents in date range
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                },
                status: { $ne: 'cancelled' }
            }
        },
        
        // Stage 2: Unwind items array
        {
            $unwind: '$items'
        },
        
        // Stage 3: Join with product collection
        {
            $lookup: {
                from: 'products',
                localField: 'items.product',
                foreignField: '_id',
                as: 'productInfo'
            }
        },
        
        // Stage 4: Unwind product info
        {
            $unwind: '$productInfo'
        },
        
        // Stage 5: Group by product category
        {
            $group: {
                _id: '$productInfo.category',
                totalRevenue: {
                    $sum: { $multiply: ['$items.quantity', '$items.price'] }
                },
                totalQuantity: { $sum: '$items.quantity' },
                averageOrderValue: { $avg: '$total' },
                uniqueCustomers: { $addToSet: '$user' },
                orderCount: { $sum: 1 }
            }
        },
        
        // Stage 6: Add customer count
        {
            $addFields: {
                customerCount: { $size: '$uniqueCustomers' }
            }
        },
        
        // Stage 7: Lookup category details
        {
            $lookup: {
                from: 'categories',
                localField: '_id',
                foreignField: '_id',
                as: 'categoryInfo'
            }
        },
        
        // Stage 8: Unwind category info
        {
            $unwind: '$categoryInfo'
        },
        
        // Stage 9: Project final shape
        {
            $project: {
                categoryName: '$categoryInfo.name',
                totalRevenue: { $round: ['$totalRevenue', 2] },
                totalQuantity: 1,
                averageOrderValue: { $round: ['$averageOrderValue', 2] },
                customerCount: 1,
                orderCount: 1,
                revenuePerCustomer: {
                    $round: [{ $divide: ['$totalRevenue', '$customerCount'] }, 2]
                }
            }
        },
        
        // Stage 10: Sort by revenue
        {
            $sort: { totalRevenue: -1 }
        }
    ]);
};

// User Behavior Analytics
const getUserBehaviorAnalytics = async () => {
    return await User.aggregate([
        // Stage 1: Match active users
        {
            $match: {
                'status': 'active',
                'lastLoginAt': { $exists: true }
            }
        },
        
        // Stage 2: Lookup user orders
        {
            $lookup: {
                from: 'orders',
                localField: '_id',
                foreignField: 'user',
                as: 'orders'
            }
        },
        
        // Stage 3: Lookup user reviews
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'user',
                as: 'reviews'
            }
        },
        
        // Stage 4: Add computed fields
        {
            $addFields: {
                totalOrders: { $size: '$orders' },
                totalReviews: { $size: '$reviews' },
                totalSpent: {
                    $sum: '$orders.total'
                },
                averageOrderValue: {
                    $cond: {
                        if: { $gt: [{ $size: '$orders' }, 0] },
                        then: { $divide: [{ $sum: '$orders.total' }, { $size: '$orders' }] },
                        else: 0
                    }
                },
                daysSinceLastLogin: {
                    $divide: [
                        { $subtract: [new Date(), '$lastLoginAt'] },
                        1000 * 60 * 60 * 24 // Convert to days
                    ]
                },
                registrationAge: {
                    $divide: [
                        { $subtract: [new Date(), '$createdAt'] },
                        1000 * 60 * 60 * 24 // Convert to days
                    ]
                }
            }
        },
        
        // Stage 5: Categorize users
        {
            $addFields: {
                userSegment: {
                    $switch: {
                        branches: [
                            {
                                case: { $and: [
                                    { $gte: ['$totalSpent', 1000] },
                                    { $gte: ['$totalOrders', 10] }
                                ]},
                                then: 'VIP'
                            },
                            {
                                case: { $and: [
                                    { $gte: ['$totalSpent', 500] },
                                    { $gte: ['$totalOrders', 5] }
                                ]},
                                then: 'Premium'
                            },
                            {
                                case: { $gte: ['$totalOrders', 1] },
                                then: 'Regular'
                            }
                        ],
                        default: 'New'
                    }
                }
            }
        },
        
        // Stage 6: Group by user segment
        {
            $group: {
                _id: '$userSegment',
                userCount: { $sum: 1 },
                totalRevenue: { $sum: '$totalSpent' },
                averageOrdersPerUser: { $avg: '$totalOrders' },
                averageSpentPerUser: { $avg: '$totalSpent' },
                averageDaysSinceLastLogin: { $avg: '$daysSinceLastLogin' }
            }
        },
        
        // Stage 7: Sort by user count
        {
            $sort: { userCount: -1 }
        }
    ]);
};

// Real-time Inventory Management
const getInventoryReport = async () => {
    return await Product.aggregate([
        // Stage 1: Match all products
        {
            $match: {}
        },
        
        // Stage 2: Add inventory status
        {
            $addFields: {
                inventoryStatus: {
                    $switch: {
                        branches: [
                            {
                                case: { $lte: ['$inventory.available', 0] },
                                then: 'Out of Stock'
                            },
                            {
                                case: { $lte: ['$inventory.available', 10] },
                                then: 'Low Stock'
                            },
                            {
                                case: { $lte: ['$inventory.available', 50] },
                                then: 'Medium Stock'
                            }
                        ],
                        default: 'High Stock'
                    }
                },
                inventoryValue: {
                    $multiply: ['$inventory.available', '$price']
                }
            }
        },
        
        // Stage 3: Group by category
        {
            $group: {
                _id: '$category',
                totalProducts: { $sum: 1 },
                totalInventoryValue: { $sum: '$inventoryValue' },
                outOfStockCount: {
                    $sum: {
                        $cond: [{ $eq: ['$inventoryStatus', 'Out of Stock'] }, 1, 0]
                    }
                },
                lowStockCount: {
                    $sum: {
                        $cond: [{ $eq: ['$inventoryStatus', 'Low Stock'] }, 1, 0]
                    }
                },
                averagePrice: { $avg: '$price' }
            }
        },
        
        // Stage 4: Lookup category details
        {
            $lookup: {
                from: 'categories',
                localField: '_id',
                foreignField: '_id',
                as: 'categoryInfo'
            }
        },
        
        // Stage 5: Project final results
        {
            $project: {
                categoryName: { $arrayElemAt: ['$categoryInfo.name', 0] },
                totalProducts: 1,
                totalInventoryValue: { $round: ['$totalInventoryValue', 2] },
                stockHealth: {
                    $multiply: [
                        100,
                        {
                            $divide: [
                                { $subtract: ['$totalProducts', '$outOfStockCount'] },
                                '$totalProducts'
                            ]
                        }
                    ]
                },
                lowStockPercentage: {
                    $multiply: [
                        100,
                        { $divide: ['$lowStockCount', '$totalProducts'] }
                    ]
                },
                averagePrice: { $round: ['$averagePrice', 2] }
            }
        }
    ]);
};
```

## 🔍 Performance Optimization

### Query Optimization Techniques
```javascript
// Efficient pagination with cursor-based pagination
const getProductsCursor = async (cursor = null, limit = 20) => {
    const query = cursor ? { _id: { $gt: cursor } } : {};
    
    return await Product.find(query)
        .sort({ _id: 1 })
        .limit(limit)
        .lean(); // Return plain JavaScript objects for better performance
};

// Efficient text search with highlighting
const searchProducts = async (searchTerm, filters = {}) => {
    const pipeline = [];
    
    // Text search stage
    if (searchTerm) {
        pipeline.push({
            $match: {
                $text: {
                    $search: searchTerm,
                    $caseSensitive: false,
                    $diacriticSensitive: false
                }
            }
        });
        
        // Add text search score
        pipeline.push({
            $addFields: {
                searchScore: { $meta: 'textScore' }
            }
        });
    }
    
    // Apply filters
    if (filters.category) {
        pipeline.push({
            $match: { category: new mongoose.Types.ObjectId(filters.category) }
        });
    }
    
    if (filters.priceRange) {
        pipeline.push({
            $match: {
                price: {
                    $gte: filters.priceRange.min,
                    $lte: filters.priceRange.max
                }
            }
        });
    }
    
    // Sort by relevance then price
    pipeline.push({
        $sort: searchTerm 
            ? { searchScore: { $meta: 'textScore' }, price: 1 }
            : { price: 1 }
    });
    
    // Project results
    pipeline.push({
        $project: {
            name: 1,
            price: 1,
            images: { $slice: ['$media.images', 1] },
            searchScore: 1
        }
    });
    
    return await Product.aggregate(pipeline);
};

// Bulk operations for better performance
const bulkUpdateInventory = async (updates) => {
    const bulkOps = updates.map(update => ({
        updateOne: {
            filter: { _id: update.productId },
            update: { 
                $inc: { 'inventory.quantity': update.quantityChange },
                $set: { updatedAt: new Date() }
            }
        }
    }));
    
    return await Product.bulkWrite(bulkOps, { ordered: false });
};

// Projection optimization - Only fetch needed fields
const getProductList = async (categoryIds) => {
    return await Product.find(
        { category: { $in: categoryIds }, status: 'active' },
        'name price sku media.images ratings.average inventory.available' // Only select needed fields
    )
    .populate('category', 'name slug')
    .lean()
    .exec();
};

// Using lean() for read-only operations
const getPopularProducts = async () => {
    return await Product.find({ status: 'active' })
        .select('name price images ratings.average')
        .sort({ 'ratings.average': -1, 'ratings.count': -1 })
        .limit(10)
        .lean(); // Returns plain JS objects, faster for read operations
};
```

### Connection Pooling and Scaling
```javascript
// MongoDB connection configuration with pooling
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // Connection pooling options
            maxPoolSize: 10, // Maximum number of sockets in the connection pool
            serverSelectionTimeoutMS: 5000, // How long to try selecting a server
            socketTimeoutMS: 45000, // How long a send or receive on a socket can take
            family: 4, // Use IPv4, skip trying IPv6
            bufferMaxEntries: 0, // Disable mongoose buffering
            bufferCommands: false, // Disable mongoose buffering
            
            // Replica set options
            replicaSet: process.env.MONGO_REPLICA_SET,
            readPreference: 'secondaryPreferred', // Read from secondary when possible
            readConcern: { level: 'majority' },
            writeConcern: { w: 'majority', j: true }
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });
        
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

// Read preferences for different operations
const getUserById = async (userId) => {
    return await User.findById(userId)
        .read('primary') // Read from primary for consistency
        .exec();
};

const getProductCatalog = async () => {
    return await Product.find({ status: 'active' })
        .read('secondaryPreferred') // Can read from secondary for catalog
        .lean()
        .exec();
};

// Transaction support for multi-document operations
const createOrderWithTransaction = async (orderData) => {
    const session = await mongoose.startSession();
    
    try {
        await session.withTransaction(async () => {
            // Create order
            const order = new Order(orderData);
            await order.save({ session });
            
            // Update inventory
            for (const item of orderData.items) {
                await Product.updateOne(
                    { _id: item.product },
                    { $inc: { 'inventory.reserved': item.quantity } },
                    { session }
                );
            }
            
            // Update user stats
            await User.updateOne(
                { _id: orderData.user },
                { 
                    $inc: { totalOrders: 1, totalSpent: orderData.total },
                    $set: { lastOrderAt: new Date() }
                },
                { session }
            );
            
            return order;
        });
    } finally {
        await session.endSession();
    }
};
```

## 🔄 Change Streams and Real-time Features

### Implementing Change Streams
```javascript
const { MongoClient } = require('mongodb');

class ChangeStreamManager {
    constructor(uri, databaseName) {
        this.client = new MongoClient(uri);
        this.db = this.client.db(databaseName);
        this.streams = new Map();
    }
    
    async connect() {
        await this.client.connect();
        console.log('Connected to MongoDB for change streams');
    }
    
    // Watch for product changes
    watchProducts(callback) {
        const pipeline = [
            {
                $match: {
                    'operationType': { $in: ['update', 'insert', 'delete'] },
                    'fullDocument.status': 'active'
                }
            },
            {
                $project: {
                    operationType: 1,
                    'fullDocument._id': 1,
                    'fullDocument.name': 1,
                    'fullDocument.price': 1,
                    'fullDocument.inventory': 1,
                    updateDescription: 1
                }
            }
        ];
        
        const changeStream = this.db.collection('products').watch(pipeline);
        
        changeStream.on('change', (change) => {
            callback(change);
        });
        
        changeStream.on('error', (error) => {
            console.error('Product change stream error:', error);
        });
        
        this.streams.set('products', changeStream);
        return changeStream;
    }
    
    // Watch for order changes
    watchOrders(callback) {
        const pipeline = [
            {
                $match: {
                    'operationType': 'update',
                    'updateDescription.updatedFields.status': { $exists: true }
                }
            }
        ];
        
        const changeStream = this.db.collection('orders').watch(pipeline);
        
        changeStream.on('change', (change) => {
            callback(change);
        });
        
        this.streams.set('orders', changeStream);
        return changeStream;
    }
    
    // Stop all change streams
    async stopAll() {
        for (const [name, stream] of this.streams) {
            await stream.close();
            console.log(`Stopped ${name} change stream`);
        }
        this.streams.clear();
    }
    
    async disconnect() {
        await this.stopAll();
        await this.client.close();
    }
}

// Usage in Express app
const changeStreamManager = new ChangeStreamManager(process.env.MONGODB_URI, 'ecommerce');

// Real-time product updates
changeStreamManager.watchProducts((change) => {
    const io = require('./socket'); // Socket.io instance
    
    switch (change.operationType) {
        case 'update':
            io.emit('product:updated', {
                productId: change.documentKey._id,
                changes: change.updateDescription.updatedFields
            });
            break;
            
        case 'insert':
            io.emit('product:created', {
                product: change.fullDocument
            });
            break;
            
        case 'delete':
            io.emit('product:deleted', {
                productId: change.documentKey._id
            });
            break;
    }
});

// Real-time order status updates
changeStreamManager.watchOrders((change) => {
    const io = require('./socket');
    
    const newStatus = change.updateDescription.updatedFields.status;
    const orderId = change.documentKey._id;
    
    io.emit('order:status:updated', {
        orderId,
        newStatus,
        timestamp: new Date()
    });
});
```

## 🔐 Security and Data Validation

### Advanced Validation and Sanitization
```javascript
const mongoose = require('mongoose');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');

// Advanced user schema with security
const secureUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [30, 'Username cannot exceed 30 characters'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9_]+$/.test(v);
            },
            message: 'Username can only contain letters, numbers, and underscores'
        }
    },
    profile: {
        firstName: {
            type: String,
            trim: true,
            maxlength: [50, 'First name cannot exceed 50 characters'],
            set: function(v) {
                return sanitizeHtml(v, {
                    allowedTags: [],
                    allowedAttributes: {}
                });
            }
        },
        lastName:
