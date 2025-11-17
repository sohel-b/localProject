# React Advanced Concepts for MERN Interviews

## ⚛️ React Internals Deep Dive

### Virtual DOM & Reconciliation Algorithm
```javascript
// Understanding React's Reconciliation Process
class ReconciliationExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: 1, text: 'Item 1' },
                { id: 2, text: 'Item 2' },
                { id: 3, text: 'Item 3' }
            ]
        };
    }
    
    // Bad: Using index as key causes unnecessary re-renders
    renderBadList() {
        return (
            <ul>
                {this.state.items.map((item, index) => (
                    <li key={index}>{item.text}</li>
                ))}
            </ul>
        );
    }
    
    // Good: Using stable unique keys
    renderGoodList() {
        return (
            <ul>
                {this.state.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        );
    }
    
    addItem = () => {
        const newItem = { id: Date.now(), text: `Item ${this.state.items.length + 1}` };
        this.setState(prevState => ({
            items: [newItem, ...prevState.items] // Adding to beginning
        }));
    };
    
    render() {
        return (
            <div>
                <button onClick={this.addItem}>Add Item</button>
                {this.renderGoodList()}
            </div>
        );
    }
}
```

### Fiber Architecture Understanding
```javascript
// React Fiber enables incremental rendering
// Understanding priority levels
const ReactPriorityLevels = {
    ImmediatePriority: 1,    // Immediate tasks (user input)
    UserBlockingPriority: 2, // User blocking tasks (fetching data)
    NormalPriority: 3,       // Normal tasks (network requests)
    LowPriority: 4,          // Low priority (analytics)
    IdlePriority: 5          // Idle tasks (hidden offscreen content)
};

// Scheduler API (React 18+)
import { scheduleCallback, CancelCallback } from 'scheduler';

function performExpensiveCalculation(data) {
    return scheduleCallback(ReactPriorityLevels.NormalPriority, () => {
        // Expensive computation here
        return data.reduce((sum, item) => sum + item.value, 0);
    });
}
```

## 🎣 Advanced Hooks Patterns

### Custom Hooks for Business Logic
```javascript
// useApi Hook - Generic API data fetching
import { useState, useEffect, useCallback } from 'react';

function useApi(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [url, options]);
    
    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [fetchData]);
    
    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);
    
    return { data, loading, error, refetch };
}

// useLocalStorage Hook
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });
    
    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);
    
    return [storedValue, setValue];
}

// useDebounce Hook
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    
    return debouncedValue;
}

// useInfiniteScroll Hook
function useInfiniteScroll(callback) {
    const [isFetching, setIsFetching] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop
                >= document.documentElement.offsetHeight - 1000
                && !isFetching
            ) {
                setIsFetching(true);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching]);
    
    useEffect(() => {
        if (!isFetching) return;
        
        callback().finally(() => {
            setIsFetching(false);
        });
    }, [isFetching, callback]);
    
    return [isFetching, setIsFetching];
}
```

### useReducer for Complex State Management
```javascript
import { useReducer, useCallback } from 'react';

// Complex state reducer for form management
const formReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.field]: action.value
                },
                touched: {
                    ...state.touched,
                    [action.field]: true
                }
            };
        
        case 'SET_ERRORS':
            return {
                ...state,
                errors: action.errors
            };
        
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.loading
            };
        
        case 'RESET_FORM':
            return {
                ...state,
                fields: action.initialValues,
                touched: {},
                errors: {},
                loading: false
            };
        
        default:
            return state;
    }
};

function useForm(initialValues, validationSchema) {
    const [state, dispatch] = useReducer(formReducer, {
        fields: initialValues,
        touched: {},
        errors: {},
        loading: false
    });
    
    const setFieldValue = useCallback((field, value) => {
        dispatch({ type: 'SET_FIELD', field, value });
    }, []);
    
    const validateForm = useCallback(async () => {
        if (!validationSchema) return true;
        
        try {
            await validationSchema.validate(state.fields, { abortEarly: false });
            dispatch({ type: 'SET_ERRORS', errors: {} });
            return true;
        } catch (validationErrors) {
            const errors = {};
            validationErrors.inner.forEach(error => {
                errors[error.path] = error.message;
            });
            dispatch({ type: 'SET_ERRORS', errors });
            return false;
        }
    }, [state.fields, validationSchema]);
    
    const handleSubmit = useCallback(async (onSubmit) => {
        dispatch({ type: 'SET_LOADING', loading: true });
        
        const isValid = await validateForm();
        
        if (isValid) {
            try {
                await onSubmit(state.fields);
            } catch (error) {
                console.error('Form submission error:', error);
            }
        }
        
        dispatch({ type: 'SET_LOADING', loading: false });
    }, [state.fields, validateForm]);
    
    const resetForm = useCallback(() => {
        dispatch({ type: 'RESET_FORM', initialValues });
    }, [initialValues]);
    
    return {
        ...state,
        setFieldValue,
        handleSubmit,
        validateForm,
        resetForm
    };
}
```

## 🚀 Performance Optimization Techniques

### React.memo and PureComponent
```javascript
import React, { memo, useMemo, useCallback, PureComponent } from 'react';

// React.memo for functional components
const ExpensiveComponent = memo(({ data, onUpdate }) => {
    console.log('ExpensiveComponent re-rendered');
    
    const processedData = useMemo(() => {
        console.log('Processing expensive data...');
        return data.map(item => ({
            ...item,
            computed: item.value * 2
        }));
    }, [data]);
    
    return (
        <div>
            {processedData.map(item => (
                <div key={item.id}>
                    {item.name}: {item.computed}
                </div>
            ))}
        </div>
    );
}, (prevProps, nextProps) => {
    // Custom comparison function
    return (
        prevProps.data.length === nextProps.data.length &&
        prevProps.data.every((item, index) => item.id === nextProps.data[index].id)
    );
});

// PureComponent for class components
class ExpensiveClassComponent extends PureComponent {
    render() {
        console.log('ExpensiveClassComponent re-rendered');
        
        const processedData = this.props.data.map(item => ({
            ...item,
            computed: item.value * 2
        }));
        
        return (
            <div>
                {processedData.map(item => (
                    <div key={item.id}>
                        {item.name}: {item.computed}
                    </div>
                ))}
            </div>
        );
    }
}

// Parent component with optimized callbacks
function OptimizedParent() {
    const [data, setData] = React.useState([]);
    const [count, setCount] = React.useState(0);
    
    // Memoized callback to prevent unnecessary re-renders
    const handleUpdate = useCallback((id, newValue) => {
        setData(prevData => 
            prevData.map(item => 
                item.id === id ? { ...item, value: newValue } : item
            )
        );
    }, []);
    
    // Memoized expensive computation
    const expensiveValue = useMemo(() => {
        console.log('Computing expensive value...');
        return data.reduce((sum, item) => sum + item.value, 0);
    }, [data]);
    
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>
                Re-render parent: {count}
            </button>
            <div>Total: {expensiveValue}</div>
            <ExpensiveComponent data={data} onUpdate={handleUpdate} />
        </div>
    );
}
```

### Code Splitting and Lazy Loading
```javascript
import React, { Suspense, lazy } from 'react';

// Lazy loading components
const LazyComponent = lazy(() => import('./LazyComponent'));
const AdminPanel = lazy(() => import('./AdminPanel'));

// Route-based code splitting
const Routes = () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/dashboard" component={LazyComponent} />
            <Route path="/admin" component={AdminPanel} />
        </Suspense>
    </Router>
);

// Dynamic imports with error handling
function loadComponent(scope, module) {
    return async () => {
        await __webpack_init_sharing__('default');
        const container = window[scope];
        await container.init(__webpack_share_scopes__.default);
        const factory = await container.get(module);
        const Module = factory();
        return Module;
    };
}

const DynamicComponent = lazy(loadComponent('microApp', './Component'));

// Component with error boundary for lazy loading
class LazyLoadErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Lazy loading error:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Failed to load component</h2>
                    <button onClick={() => this.setState({ hasError: false })}>
                        Try again
                    </button>
                </div>
            );
        }
        
        return this.props.children;
    }
}
```

### Virtual Scrolling Implementation
```javascript
import React, { useState, useEffect, useRef, useMemo } from 'react';

function VirtualList({ items, itemHeight = 50, containerHeight = 400 }) {
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef(null);
    
    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleEnd = Math.min(
        visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
        items.length
    );
    
    const visibleItems = useMemo(() => {
        return items.slice(visibleStart, visibleEnd).map((item, index) => ({
            ...item,
            index: visibleStart + index
        }));
    }, [items, visibleStart, visibleEnd]);
    
    const totalHeight = items.length * itemHeight;
    const offsetY = visibleStart * itemHeight;
    
    const handleScroll = useCallback((e) => {
        setScrollTop(e.target.scrollTop);
    }, []);
    
    return (
        <div
            ref={containerRef}
            style={{
                height: containerHeight,
                overflow: 'auto'
            }}
            onScroll={handleScroll}
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                <div style={{ transform: `translateY(${offsetY}px)` }}>
                    {visibleItems.map(item => (
                        <div
                            key={item.id}
                            style={{
                                height: itemHeight,
                                borderBottom: '1px solid #eee'
                            }}
                        >
                            {item.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
```

## 🎨 Advanced Patterns

### Compound Components Pattern
```javascript
import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

function Tabs({ children, defaultTab = 0 }) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    
    const value = {
        activeTab,
        setActiveTab
    };
    
    return (
        <TabsContext.Provider value={value}>
            <div className="tabs">{children}</div>
        </TabsContext.Provider>
    );
}

function TabList({ children }) {
    return <div className="tab-list">{children}</div>;
}

function Tab({ index, children }) {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    const isActive = activeTab === index;
    
    return (
        <button
            className={`tab ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
        >
            {children}
        </button>
    );
}

function TabPanels({ children }) {
    return <div className="tab-panels">{children}</div>;
}

function TabPanel({ index, children }) {
    const { activeTab } = useContext(TabsContext);
    const isActive = activeTab === index;
    
    return isActive ? <div className="tab-panel">{children}</div>;
}

// Usage
function App() {
    return (
        <Tabs defaultTab={0}>
            <TabList>
                <Tab index={0}>Tab 1</Tab>
                <Tab index={1}>Tab 2</Tab>
                <Tab index={2}>Tab 3</Tab>
            </TabList>
            <TabPanels>
                <TabPanel index={0}>Content 1</TabPanel>
                <TabPanel index={1}>Content 2</TabPanel>
                <TabPanel index={2}>Content 3</TabPanel>
            </TabPanels>
        </Tabs>
    );
}
```

### Render Props Pattern
```javascript
import React, { useState, useEffect } from 'react';

class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0
        };
    }
    
    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    };
    
    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
    }
    
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
    }
    
    render() {
        return this.props.render(this.state);
    }
}

// Usage with render prop
function App() {
    return (
        <MouseTracker
            render={({ x, y }) => (
                <div>
                    <h1>Mouse Position</h1>
                    <p>X: {x}, Y: {y}</p>
                </div>
            )}
        />
    );
}

// Usage with children as function
function AppWithChildren() {
    return (
        <MouseTracker>
            {({ x, y }) => (
                <div>
                    <h1>Mouse Position</h1>
                    <p>X: {x}, Y: {y}</p>
                </div>
            )}
        </MouseTracker>
    );
}
```

### Higher-Order Components (HOC)
```javascript
import React from 'react';

// Generic HOC for loading states
function withLoading(WrappedComponent) {
    return function WithLoadingComponent({ isLoading, ...props }) {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return <WrappedComponent {...props} />;
    };
}

// HOC for error handling
function withErrorBoundary(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false, error: null };
        }
        
        static getDerivedStateFromError(error) {
            return { hasError: true, error };
        }
        
        componentDidCatch(error, errorInfo) {
            console.error('HOC Error Boundary:', error, errorInfo);
        }
        
        render() {
            if (this.state.hasError) {
                return (
                    <div>
                        <h2>Something went wrong.</h2>
                        <details>
                            {this.state.error && this.state.error.toString()}
                        </details>
                    </div>
                );
            }
            
            return <WrappedComponent {...this.props} />;
        }
    };
}

// HOC for data fetching
function withData(url) {
    return function(WrappedComponent) {
        return class extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    data: null,
                    loading: true,
                    error: null
                };
            }
            
            async componentDidMount() {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    this.setState({ data, loading: false });
                } catch (error) {
                    this.setState({ error: error.message, loading: false });
                }
            }
            
            render() {
                const { data, loading, error } = this.state;
                
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error: {error}</div>;
                
                return <WrappedComponent data={data} {...this.props} />;
            }
        };
    };
}

// Composing HOCs
const EnhancedComponent = withErrorBoundary(
    withLoading(
        withData('/api/users')(UserList)
    )
);
```

## 🔄 State Management Patterns

### Context API with useReducer
```javascript
import React, { createContext, useContext, useReducer } from 'react';

// Create context
const AppContext = createContext();

// Initial state
const initialState = {
    user: null,
    theme: 'light',
    notifications: []
};

// Reducer
const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        
        case 'TOGGLE_THEME':
            return { 
                ...state, 
                theme: state.theme === 'light' ? 'dark' : 'light' 
            };
        
        case 'ADD_NOTIFICATION':
            return {
                ...state,
                notifications: [...state.notifications, action.payload]
            };
        
        case 'REMOVE_NOTIFICATION':
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.id !== action.payload
                )
            };
        
        default:
            return state;
    }
};

// Provider component
function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);
    
    const value = {
        ...state,
        dispatch
    };
    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

// Custom hook for using context
function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
}

// Action creators
const actions = {
    setUser: (user) => ({ type: 'SET_USER', payload: user }),
    toggleTheme: () => ({ type: 'TOGGLE_THEME' }),
    addNotification: (notification) => ({ 
        type: 'ADD_NOTIFICATION', 
        payload: { ...notification, id: Date.now() } 
    }),
    removeNotification: (id) => ({ type: 'REMOVE_NOTIFICATION', payload: id })
};

// Usage in components
function UserComponent() {
    const { user, dispatch } = useAppContext();
    
    const handleLogin = () => {
        dispatch(actions.setUser({ name: 'John Doe', email: 'john@example.com' }));
    };
    
    return (
        <div>
            {user ? (
                <div>Welcome, {user.name}!</div>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
}
```

## 🧪 Concurrent Features (React 18+)

### Suspense for Data Fetching
```javascript
import React, { Suspense } from 'react';

// Resource wrapper for promises
function createResource(promise) {
    let status = 'pending';
    let result;
    
    const suspender = promise.then(
        response => {
            status = 'success';
            result = response;
        },
        error => {
            status = 'error';
            result = error;
        }
    );
    
    return {
        read() {
            if (status === 'pending') {
                throw suspender;
            } else if (status === 'error') {
                throw result;
            } else if (status === 'success') {
                return result;
            }
        }
    };
}

// Data fetching with Suspense
const userData = createResource(
    fetch('/api/user/1').then(res => res.json())
);

function UserProfile() {
    const user = userData.read();
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
}

function App() {
    return (
        <Suspense fallback={<div>Loading user profile...</div>}>
            <UserProfile />
        </Suspense>
    );
}

// useTransition for non-urgent updates
import { useTransition, useState } from 'react';

function SearchComponent() {
    const [isPending, startTransition] = useTransition();
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    const handleChange = (e) => {
        setInput(e.target.value);
        
        // Mark the state update as a transition
        startTransition(() => {
            const results = performSearch(e.target.value);
            setSearchResults(results);
        });
    };
    
    return (
        <div>
            <input 
                type="text" 
                value={input} 
                onChange={handleChange}
                placeholder="Search..."
            />
            {isPending && <div>Searching...</div>}
            <div>
                {searchResults.map(result => (
                    <div key={result.id}>{result.name}</div>
                ))}
            </div>
        </div>
    );
}

// useDeferredValue for optimizing input
function DeferredInput() {
    const [input, setInput] = useState('');
    const deferredInput = useDeferredValue(input);
    
    const searchResults = useMemo(() => {
        return performExpensiveSearch(deferredInput);
    }, [deferredInput]);
    
    return (
        <div>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                style={{ 
                    opacity: input !== deferredInput ? 0.5 : 1 
                }}
            />
            <div>
                {searchResults.map(result => (
                    <div key={result.id}>{result.name}</div>
                ))}
            </div>
        </div>
    );
}
```

## 🧪 Interview Questions & Answers

### Q1: Explain React's reconciliation algorithm and how keys work
**Answer:** React's reconciliation algorithm compares the new Virtual DOM tree with the previous one to determine what needs to be updated. Keys help React identify which items have changed, been added, or removed. When keys are stable and unique, React can efficiently update the DOM without unnecessary re-renders.

### Q2: What's the difference between useMemo and useCallback?
**Answer:** `useMemo` memoizes a computed value, while `useCallback` memoizes a function itself. `useMemo(fn, deps)` is equivalent to `useCallback(() => fn(), deps)`. Use `useMemo` for expensive calculations and `useCallback` when passing functions to optimized child components.

### Q3: How does React 18's concurrent rendering improve performance?
**Answer:** Concurrent rendering allows React to interrupt rendering processes to handle higher-priority updates. Features like `useTransition`, `useDeferredValue`, and automatic batching help create more responsive user interfaces by deferring non-critical updates.

### Q4: When would you use a custom hook vs a context provider?
**Answer:** Use custom hooks for component-specific logic and state management. Use context providers when you need to share state across many components at different levels. Custom hooks are more localized and testable, while context is better for global state.

---

## 💡 Practice Exercises

1. **Build a virtual scrolling component with dynamic item heights**
2. **Create a custom hook for real-time data synchronization**
3. **Implement a compound component pattern for a form system**
4. **Build a suspense-based data fetching library**
5. **Create a performance monitoring HOC for React components**

This covers the essential React concepts you'll need for advanced MERN stack interviews. Focus on understanding the "why" behind each pattern, not just the "how"!
