# Answers to ReactJS Interview Questions (101‑200) – Detailed Explanations

## 101. How do you render lists in React?
Use `Array.map` to transform each item into JSX and provide a unique `key` prop so React can track items efficiently.

```jsx
<ul>
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

## 102. What is the purpose of keys in React lists?
Keys give React a stable identity for each element. During reconciliation, they allow React to match existing items with new ones, minimizing DOM operations and preventing bugs (e.g., wrong item updates).

## 103. How do you choose the right key for list items?
- Prefer a unique, stable identifier from the data (e.g., database ID).  
- Avoid using array indexes unless the list is static and never reordered, because indexes can change when items are added/removed, breaking identity.

## 104. What happens if you don't use keys in React lists?
React falls back to using the element’s position as the key, which can cause:
- Unnecessary re‑renders.  
- Incorrect state preservation (e.g., input values moving to the wrong item).  
- Poor performance.

## 105. How do you handle dynamic lists in React?
Maintain the list in state (e.g., `useState`). When adding/removing items, update the state immutably so React re‑renders with the new list.

```jsx
const [list, setList] = useState([]);
const addItem = item => setList(prev => [...prev, item]);
const removeItem = id => setList(prev => prev.filter(i => i.id !== id));
```

## 106. How do you render nested lists in React?
Map over the outer list, and inside each iteration map over the nested list.

```jsx
{categories.map(cat => (
  <div key={cat.id}>
    <h3>{cat.name}</h3>
    <ul>
      {cat.products.map(p => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  </div>
))}
```

## 107. How do you handle list item selection in React?
Store the selected item’s identifier in state and use it to apply a visual cue or trigger actions.

```jsx
const [selectedId, setSelectedId] = useState(null);
<li
  key={item.id}
  className={selectedId === item.id ? 'selected' : ''}
  onClick={() => setSelectedId(item.id)}
>
  {item.name}
</li>
```

## 108. How do you optimize list rendering performance?
- **Key stability**: Use stable keys.  
- **Memoization**: Wrap list items with `React.memo` to avoid re‑rendering unchanged items.  
- **Virtualization**: For large lists, use libraries like `react-window` or `react-virtualized` to render only visible rows.  
- **Avoid inline objects/functions**: Define handlers outside the render or memoize them with `useCallback`.

## 109. How do you implement virtual scrolling for large lists?
Use a virtualization library that renders a window of items based on scroll position.

```jsx
import { FixedSizeList as List } from 'react-window';

<List
  height={500}
  itemCount={items.length}
  itemSize={35}
  width="100%"
>
  {({ index, style }) => (
    <div style={style} key={items[index].id}>
      {items[index].name}
    </div>
  )}
</List>
```

## 110. What are the best practices for rendering lists in React?
- Use stable, unique keys.  
- Keep list data immutable (create new arrays on updates).  
- Memoize list items when possible.  
- For very long lists, adopt virtualization.  
- Avoid heavy calculations inside the `map` callback; compute them beforehand or with `useMemo`.

## 111. How do you style React components?
- **CSS files**: Import a regular `.css` file.  
- **CSS Modules**: Scoped class names (`import styles from './Button.module.css'`).  
- **Inline styles**: Pass a `style` object (`<div style={{ margin: 10 }} />`).  
- **CSS‑in‑JS**: Libraries like `styled-components` or `emotion`.  
- **Utility‑first**: Tailwind CSS classes.

## 112. What are the different ways to style React components?
1. **External CSS** (`import './App.css'`).  
2. **CSS Modules** (`import styles from './App.module.css'`).  
3. **Inline style objects**.  
4. **CSS‑in‑JS** (`styled-components`, `emotion`).  
5. **Pre‑processor** (`Sass`, `Less`) compiled to CSS.  
6. **Utility frameworks** (`Tailwind`, `Bootstrap`).

## 113. How do you use inline styles in React?
Pass a JavaScript object to the `style` prop. Property names use camelCase.

```jsx
<div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
  Inline styled box
</div>
```

## 114. How do you use CSS modules in React?
Create a file named `Component.module.css`. Import it as an object; class names become properties.

```css
/* Button.module.css */
.primary {
  background: blue;
  color: white;
}
```

```jsx
import styles from './Button.module.css';
<button className={styles.primary}>Click</button>
```

CSS Modules automatically generate unique class names, preventing collisions.

## 115. How do you use styled‑components in React?
Install `styled-components`. Define a styled element using template literals.

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => (props.primary ? 'purple' : 'gray')};
  color: white;
  padding: 8px 16px;
`;

<Button primary>Primary</Button>
```

Styled‑components generate scoped class names and support theming, props‑based styling, and nesting.

## 116. How do you use CSS‑in‑JS libraries with React?
Libraries like **Emotion**, **styled‑components**, or **JSS** let you write CSS inside JavaScript. They typically expose a `css` or `styled` API, generate unique class names, and allow dynamic styling based on props or theme.

Example with Emotion:

```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const style = css`
  color: hotpink;
`;

<div css={style}>Emotion styled</div>
```

## 117. How do you handle responsive design in React?
- **CSS media queries** in regular or module CSS.  
- **CSS‑in‑JS**: Emotion or styled‑components support media queries in template literals.  
- **Utility frameworks**: Tailwind’s responsive utilities (`md:` prefix).  
- **React hooks**: Use `useWindowSize` or `useMediaQuery` to conditionally render components based on viewport.

## 118. How do you handle CSS animations in React?
- **CSS keyframes**: Define in CSS and apply via className.  
- **Transition groups**: `react-transition-group` provides `<CSSTransition>` and `<TransitionGroup>` for entering/exiting animations.  
- **CSS‑in‑JS**: Emotion or styled‑components can embed `@keyframes`.  
- **Framer Motion**: Declarative animation library for complex motion.

## 119. How do you handle CSS preprocessing in React?
Configure a pre‑processor (Sass, Less, Stylus) in your build tool (Webpack, Vite, CRA). Example with Sass:

```bash
npm install sass
```

Then import `.scss` files directly:

```jsx
import './styles.scss';
```

The pre‑processor compiles to CSS during the build.

## 120. What are the best practices for styling in React?
- Prefer **CSS Modules** or **CSS‑in‑JS** for scoped styles.  
- Keep styles **co‑located** with components for maintainability.  
- Use **design tokens** (variables) for colors, spacing, etc., via CSS variables or a theme provider.  
- Avoid large inline style objects; they cause re‑creation on each render.  
- Leverage **utility‑first** frameworks for rapid prototyping, but extract reusable components for consistency.

## 121. What is React Router?
React Router is a declarative routing library for React that enables navigation among views, URL synchronization, and nested routing without full page reloads.

## 122. How do you set up routing in React applications?
Install `react-router-dom`, wrap your app with `<BrowserRouter>`, and define routes using `<Routes>` and `<Route>`.

```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 123. What are the different types of routes in React Router?
- **Static routes**: Fixed paths (`/about`).  
- **Dynamic routes**: Parameters (`/users/:id`).  
- **Nested routes**: Routes rendered inside parent components.  
- **Index routes**: Default child route (`<Route index element={<Dashboard />} />`).  
- **Redirects**: Using `<Navigate>` to programmatically redirect.

## 124. How do you handle route parameters in React Router?
Define a parameter with `:` in the path and retrieve it via the `useParams` hook.

```jsx
<Route path="/users/:id" element={<UserDetail />} />

// Inside UserDetail component
import { useParams } from 'react-router-dom';
const { id } = useParams();
```

## 125. How do you handle query parameters in React Router?
Use the `useLocation` hook to access the query string, then parse it (e.g., with `URLSearchParams`).

```jsx
import { useLocation } from 'react-router-dom';
const { search } = useLocation();
const query = new URLSearchParams(search);
const page = query.get('page');
```

## 126. How do you implement nested routes in React Router?
Define child `<Route>` elements inside a parent route and render an `<Outlet>` in the parent component where children should appear.

```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route path="stats" element={<Stats />} />
</Route>
```

```jsx
// DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
function DashboardLayout() {
  return (
    <div>
      <Nav />
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}
```

## 127. How do you handle route guards in React Router?
Create a wrapper component that checks authentication/authorization and either renders the child route or redirects.

```jsx
function PrivateRoute({ children }) {
  const auth = useAuth(); // custom hook
  return auth ? children : <Navigate to="/login" replace />;
}

// Usage
<Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>
```

## 128. How do you implement programmatic navigation in React Router?
Use the `useNavigate` hook to obtain a navigation function.

```jsx
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/dashboard', { replace: true });
```

## 129. How do you handle 404 pages in React Router?
Add a catch‑all route (`*`) at the end of your routes list.

```jsx
<Route path="*" element={<NotFound />} />
```

## 130. What are the best practices for routing in React?
- Keep routes **flat** where possible; use nesting only for UI composition.  
- Use **lazy loading** (`React.lazy` + `Suspense`) for route‑level code splitting.  
- Guard protected routes with a reusable component.  
- Keep URLs **semantic** and **RESTful**.  
- Preserve scroll position or reset it on navigation as needed.

## 131. How do you make HTTP requests in React?
Use the browser `fetch` API, `axios`, or data‑fetching libraries like **React Query**. Perform requests inside `useEffect` (or custom hooks) to avoid running on every render.

```jsx
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData);
}, []);
```

## 132. How do you use fetch API in React?
`fetch` returns a promise. Convert the response to JSON (or other format) and handle errors.

```jsx
async function load() {
  try {
    const response = await fetch('/api/items');
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    setItems(data);
  } catch (err) {
    setError(err.message);
  }
}
```

## 133. How do you use Axios with React?
Install `axios`, then call its methods (`axios.get`, `axios.post`, etc.). Axios automatically parses JSON and throws on non‑2xx status codes.

```bash
npm install axios
```

```jsx
import axios from 'axios';
useEffect(() => {
  axios.get('/api/users')
    .then(res => setUsers(res.data))
    .catch(err => setError(err.message));
}, []);
```

## 134. How do you handle API responses in React?
- Store the response data in component state (`useState`).  
- Show loading UI while awaiting response.  
- Handle errors by setting an error state and displaying a message.  
- Normalize data (e.g., using `normalizr`) for easier updates.

## 135. How do you handle API errors in React?
- Catch errors from `fetch`/`axios`.  
- Set an error state (`setError`).  
- Display user‑friendly messages.  
- Optionally retry with exponential backoff or provide a “Retry” button.

## 136. How do you implement loading states in React?
Maintain a `loading` boolean in state. Show a spinner or skeleton UI while `loading` is true.

```jsx
const [loading, setLoading] = useState(true);
useEffect(() => {
  fetchData().finally(() => setLoading(false));
}, []);
return loading ? <Spinner /> : <Content />;
```

## 137. How do you handle API authentication in React?
- **Token‑based**: Store JWT or API token (e.g., in `httpOnly` cookie or `localStorage` with caution).  
- Attach token to request headers (`Authorization: Bearer <token>`).  
- Refresh tokens when they expire (use an interceptor or wrapper).  
- Securely handle logout by clearing stored credentials.

## 138. How do you cache API responses in React?
- **Browser cache**: Rely on HTTP caching headers.  
- **In‑memory cache**: Store responses in a context or state management library.  
- **React Query / SWR**: Provide built‑in caching, deduplication, and background refetching.  
- **Service workers**: Cache at the network level for offline support.

## 139. How do you handle real‑time data in React?
- **WebSockets** (`ws` or `socket.io`) for bidirectional streams.  
- **Server‑Sent Events (SSE)** for one‑way push.  
- **GraphQL subscriptions** with Apollo.  
- Use a hook to manage connection lifecycle and update state on incoming messages.

## 140. What are the best practices for API integration in React?
- Keep API logic separate (service layer or custom hooks).  
- Centralize base URL and headers (e.g., Axios instance).  
- Use **cancellation** (`AbortController`) to avoid setting state on unmounted components.  
- Handle errors uniformly.  
- Leverage caching libraries for performance.

## 141. How do you optimize React application performance?
- **Code splitting** (`React.lazy`, dynamic `import`).  
- **Memoization** (`React.memo`, `useMemo`, `useCallback`).  
- **Virtualization** for large lists.  
- **Avoid unnecessary re‑renders** by keeping props stable.  
- **Lazy load images** and heavy assets.  
- **Profile** with React DevTools and Chrome Performance tab.

## 142. What is React.memo and how does it work?
`React.memo` is a higher‑order component that memoizes a functional component. It shallowly compares props; if they haven’t changed, React reuses the previous render output, skipping the component’s function execution.

```jsx
const Expensive = React.memo(({ data }) => {
  // heavy calculations
});
```

## 143. What is the useMemo hook and when should you use it?
`useMemo` memoizes the result of a computation. Provide a function and a dependency array; the function runs only when dependencies change.

```jsx
const filtered = useMemo(() => items.filter(i => i.active), [items]);
```

Use it for expensive calculations that would otherwise run on every render.

## 144. What is the useCallback hook and when should you use it?
`useCallback` memoizes a function reference, returning the same function instance unless dependencies change.

```jsx
const handleClick = useCallback(() => doSomething(id), [id]);
```

Useful when passing callbacks to memoized child components or as dependencies of other hooks.

## 145. How do you use the shouldComponentUpdate method?
In class components, override `shouldComponentUpdate(nextProps, nextState)` and return `true` to allow re‑render or `false` to skip it. Typically used for performance‑critical components.

```jsx
shouldComponentUpdate(nextProps) {
  return nextProps.value !== this.props.value;
}
```

## 146. How do you implement code splitting in React?
Use dynamic `import()` with `React.lazy` and wrap the lazy component in `<Suspense>` to show a fallback while loading.

```jsx
const Settings = React.lazy(() => import('./Settings'));

<Suspense fallback={<Spinner />}>
  <Settings />
</Suspense>
```

Webpack (or other bundlers) creates separate chunks automatically.

## 147. How do you use React.lazy for code splitting?
`React.lazy` accepts a function that returns a promise resolving to a module with a default export (the component). It must be used inside a `<Suspense>` boundary.

```jsx
const Dashboard = React.lazy(() => import('./Dashboard'));

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

## 148. How do you optimize re‑renders in React?
- **Memoize components** (`React.memo`).  
- **Memoize props** (`useCallback`, `useMemo`).  
- **Avoid inline objects/arrays** as props.  
- **Split state**: Keep only necessary state in each component.  
- **Use immutable updates** so shallow comparison works.  
- **Virtualize large lists**.

## 149. How do you use the Profiler API in React?
Wrap parts of the UI with `<Profiler id="MyComponent" onRender={callback} />`. The callback receives timing information (render duration, commit phase, etc.) for performance analysis.

```jsx
<Profiler id="App" onRender={handleRender}>
  <App />
</Profiler>
```

## 150. What are the best practices for React performance optimization?
- **Measure first** (React DevTools Profiler).  
- **Code‑split** routes and heavy components.  
- **Memoize** components and values.  
- **Virtualize** long lists.  
- **Avoid unnecessary state** and keep it local.  
- **Use production build** (`npm run build`).  
- **Leverage browser caching** and CDN for assets.

## 151. How do you test React applications?
- **Unit tests** for pure functions and components using Jest.  
- **Component tests** with React Testing Library (RTL) to render components and query the DOM.  
- **Integration tests** for flows involving multiple components or API calls (mocked).  
- **End‑to‑end tests** with Cypress or Playwright for full user journeys.

## 152. What are the popular testing libraries for React?
- **Jest** – test runner, assertions, mocking.  
- **React Testing Library** – focuses on user‑centric queries.  
- **Enzyme** (legacy) – shallow rendering and component introspection.  
- **Cypress** / **Playwright** – E2E testing.  
- **Testing Library’s user-event** – simulate real user interactions.

## 153. How do you use Jest with React?
- Install Jest (bundled with CRA).  
- Write test files with `.test.js` or `.spec.js`.  
- Use `import { render, screen } from '@testing-library/react'`.  
- Mock modules with `jest.mock`.  
- Run `npm test` to execute.

## 154. How do you use React Testing Library?
Render a component, then query the DOM using `screen.getBy*`, `screen.findBy*`, or `screen.queryBy*`. Interact with elements using `user-event` and assert expected outcomes.

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

test('increments counter', async () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /increment/i });
  await userEvent.click(button);
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
```

## 155. How do you test React components?
- Render the component with required props/context.  
- Verify UI output (text, attributes).  
- Simulate user events (click, change).  
- Assert side effects (state updates, callbacks).  
- Use snapshot testing sparingly for stable UI.

## 156. How do you test React hooks?
- Use **React Hooks Testing Library** (`@testing-library/react-hooks`) or render a test component that calls the hook.  
- Verify returned values and side effects.

```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

test('increments', () => {
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

## 157. How do you test user interactions in React?
Use `user-event` (preferred over `fireEvent`) to simulate realistic interactions (click, type, hover). Assert resulting UI changes or callback invocations.

```jsx
await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
await userEvent.click(screen.getByRole('button', { name: /submit/i }));
expect(mockSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
```

## 158. How do you test API calls in React?
- Mock the network layer (`fetch` with `jest-fetch-mock`, `axios` with `axios-mock-adapter`).  
- Assert that the component displays loading, success, or error states based on the mocked response.

```jsx
jest.spyOn(global, 'fetch').mockResolvedValue({
  ok: true,
  json: async () => ({ data: [] })
});
```

## 159. How do you test React Router?
Wrap the component under test with `<MemoryRouter>` and provide an initial route via `initialEntries`. Use `screen` to verify rendered route components.

```jsx
import { MemoryRouter } from 'react-router-dom';
render(
  <MemoryRouter initialEntries={['/about']}>
    <App />
  </MemoryRouter>
);
expect(screen.getByText(/about page/i)).toBeInTheDocument();
```

## 160. What are the best practices for testing React applications?
- **Test behavior**, not implementation details.  
- Prefer **RTL** queries that resemble how users find elements.  
- Keep tests **fast** and **isolated**.  
- Mock external dependencies (network, timers).  
- Use **coverage** as a guide, not a goal.  
- Write **descriptive test names**.

## 161. What are error boundaries in React?
A component that implements `static getDerivedStateFromError` and/or `componentDidCatch` to catch JavaScript errors in its child tree, log them, and render a fallback UI instead of crashing the whole app.

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { logError(error, info); }
  render() {
    return this.state.hasError ? <Fallback /> : this.props.children;
  }
}
```

## 162. How do you implement error boundaries in React?
Create a class component as shown above, wrap parts of the UI with `<ErrorBoundary>`. For functional components, you can use the `react-error-boundary` package which provides a hook‑based API.

## 163. How do error boundaries work with React hooks?
Hooks themselves cannot be error boundaries because they are functions, not components. However, you can place a class‑based error boundary around a component that uses hooks. The boundary will catch errors thrown during rendering, lifecycle, or effects of the child component.

## 164. How do you handle errors in error boundaries?
Inside `componentDidCatch`, log the error (e.g., to an external monitoring service). Optionally, send error details to a server for analysis. Provide a user‑friendly fallback UI that may include a “Retry” button.

## 165. How do you test error boundaries in React?
Render a component that throws an error inside a test, wrap it with the error boundary, and assert that the fallback UI appears.

```jsx
function Bomb() { throw new Error('Boom'); }

render(
  <ErrorBoundary>
    <Bomb />
  </ErrorBoundary>
);
expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
```

## 166. What are the limitations of error boundaries?
- They **do not catch** errors inside **event handlers**, **asynchronous code**, **server‑side rendering**, or **errors in the error boundary itself**.  
- They only catch errors during **render**, **lifecycle methods**, and **constructor** of child components.

## 167. How do you implement fallback UI with error boundaries?
Return a UI element (e.g., a message, a “Try again” button) when `hasError` state is true.

```jsx
return this.state.hasError ? (
  <div>
    <p>Something went wrong.</p>
    <button onClick={this.retry}>Retry</button>
  </div>
) : this.props.children;
```

## 168. How do you log errors from error boundaries?
Use `componentDidCatch(error, info)` to send details to a logging service (e.g., Sentry, LogRocket).

```jsx
componentDidCatch(error, errorInfo) {
  Sentry.captureException(error, { extra: errorInfo });
}
```

## 169. How do you handle async errors in React?
- Wrap async code in `try/catch`.  
- For promises, use `.catch`.  
- In components, handle errors in `useEffect` by setting error state.  
- Use error boundaries for synchronous render errors; async errors should be handled manually.

## 170. What are the best practices for error handling in React?
- Centralize error handling (e.g., a hook `useError`).  
- Show user‑friendly messages.  
- Log errors to a monitoring service.  
- Provide retry mechanisms where appropriate.  
- Use error boundaries for UI crashes, but handle network/async errors in component logic.

## 171. What are the common React patterns?
- **Higher‑Order Components (HOC)**  
- **Render Props**  
- **Compound Components**  
- **Provider (Context) Pattern**  
- **Controlled vs Uncontrolled Components**  
- **Custom Hooks**  
- **Container/Presentational Separation**  
- **State Reducer Pattern**  

## 172. What is the higher‑order component (HOC) pattern?
An HOC is a function that takes a component and returns a new component with added props or behavior.

```jsx
function withAuth(Component) {
  return function Authenticated(props) {
    const auth = useAuth();
    return auth ? <Component {...props} /> : <Redirect to="/login" />;
  };
}
```

## 173. What is the render prop pattern?
A component receives a function prop that returns JSX, allowing the caller to control rendering.

```jsx
<DataProvider render={data => <List items={data} />} />
```

## 174. What is the compound component pattern?
A parent component manages shared state and renders child components that communicate via context.

```jsx
<Tabs>
  <Tabs.List>
    <Tabs.Tab>One</Tabs.Tab>
    <Tabs.Tab>Two</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel>Content 1</Tabs.Panel>
    <Tabs.Panel>Content 2</Tabs.Panel>
  </Tabs.Panels>
</Tabs>
```

## 175. What is the provider pattern in React?
Use the Context API to provide a value (state, functions) to a subtree, allowing any descendant to consume it without prop drilling.

```jsx
<ThemeProvider value={theme}>
  <App />
</ThemeProvider>
```

## 176. What is the children prop pattern?
Pass JSX as `children` to a component, enabling flexible composition.

```jsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

## 177. What is the state reducer pattern?
Expose a `state` and `dispatch` from a component (often via context) and let consumers decide how to update state by sending actions, similar to Redux but scoped.

```jsx
const [state, dispatch] = useReducer(reducer, initial);
<Provider value={{ state, dispatch }}>{children}</Provider>
```

## 178. What is the control props pattern?
Pass a prop that controls a component’s internal behavior (e.g., `open` for a modal) and let the parent manage the state.

```jsx
<Modal open={isOpen} onClose={() => setOpen(false)} />
```

## 179. What is the custom hook pattern?
Encapsulate reusable logic (state, effects, subscriptions) into a function that uses built‑in hooks and can be shared across components.

```jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}
```

## 180. How do you choose the right React pattern?
- **Complex state sharing** → Context + custom hook or provider pattern.  
- **Cross‑cutting concerns** (auth, logging) → HOC or wrapper component.  
- **Reusable UI logic** → Render props or custom hook.  
- **Component composition** → Compound components or children prop.  
- Consider **readability**, **testability**, and **future scalability**.

## 181. What are the best practices for React development?
- Keep components **small** and **focused**.  
- Prefer **functional components** with hooks.  
- Use **type safety** (TypeScript or PropTypes).  
- Write **unit tests** for logic and **integration tests** for flows.  
- Follow **accessibility** guidelines (ARIA, semantic HTML).  
- Optimize performance (memoization, code splitting).  
- Use **consistent naming** and folder structure.

## 182. How do you structure React applications?
Typical folder layout:

```
src/
 ├─ components/      // reusable UI components
 ├─ pages/           // route‑level components
 ├─ hooks/           // custom hooks
 ├─ context/         // context providers
 ├─ services/        // API calls
 ├─ utils/           // helper functions
 ├─ assets/          // images, fonts
 └─ App.jsx
```

Feature‑based grouping (e.g., `features/auth/`) is also common for larger apps.

## 183. How do you organize React components?
- **Atomic design**: atoms → molecules → organisms → templates → pages.  
- **Feature folders**: each feature contains its own components, styles, tests.  
- Keep **presentational** and **container** components separate when appropriate.

## 184. How do you handle component naming conventions?
- Use **PascalCase** for component filenames and component names (`MyButton.jsx`).  
- Prefix higher‑order components with `with` (`withAuth`).  
- Use descriptive names that convey purpose (`UserList`, `SearchBar`).  
- Avoid generic names like `Component1`.

## 185. How do you manage component dependencies?
- Keep dependencies **explicit** via imports.  
- Use **dependency injection** (props, context) rather than importing globals.  
- For shared utilities, place them in a `utils` folder.  
- Avoid circular dependencies; refactor to separate concerns if they appear.

## 186. How do you handle code reuse in React?
- **Reusable components** with props for configuration.  
- **Custom hooks** for shared logic.  
- **Higher‑order components** for cross‑cutting concerns.  
- **Render props** for flexible UI injection.  
- **Component libraries** (e.g., Material‑UI) for common UI elements.

## 187. How do you implement proper error handling?
- Catch errors in async code and set error state.  
- Use **error boundaries** for UI crashes.  
- Show user‑friendly messages and fallback UI.  
- Log errors to monitoring services.  
- Provide retry mechanisms where feasible.

## 188. How do you optimize React bundle size?
- **Code splitting** (lazy load routes).  
- **Tree shaking**: import only needed functions (`import { debounce } from 'lodash'`).  
- **Remove unused dependencies** (`npm prune`).  
- Use **production build** (`npm run build`).  
- Analyze bundle with **webpack-bundle-analyzer**.

## 189. How do you handle accessibility in React?
- Use **semantic HTML** (`<button>`, `<nav>`).  
- Add appropriate **ARIA attributes** (`aria-label`, `role`).  
- Ensure focus order and keyboard navigation.  
- Provide visible focus outlines.  
- Test with screen readers and accessibility tools (axe, Lighthouse).

## 190. What are the security best practices for React?
- **Escape/encode** any user‑generated HTML (avoid `dangerouslySetInnerHTML`).  
- Use **Content Security Policy** headers.  
- Validate and sanitize inputs on the server.  
- Store tokens securely (httpOnly cookies).  
- Keep dependencies up‑to‑date (`npm audit`).  
- Avoid exposing secrets in client code.

## 191. How do you use TypeScript with React?
- Install `typescript` and `@types/react`, `@types/react-dom`.  
- Rename files to `.tsx`.  
- Define **props** and **state** interfaces or types.

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);
```

## 192. How do you type React props with TypeScript?
Use an interface or type and apply it to the component via `React.FC<Props>` or generic component typing.

```tsx
type CardProps = { title: string; children: ReactNode };
const Card: React.FC<CardProps> = ({ title, children }) => (…);
```

## 193. How do you type React state with TypeScript?
When using `useState`, provide a generic type.

```tsx
const [count, setCount] = useState<number>(0);
```

For complex objects, define an interface.

## 194. How do you type React hooks with TypeScript?
All built‑in hooks are generic. Provide types for state, refs, reducers, etc.

```tsx
const [value, setValue] = useState<string>('');
const inputRef = useRef<HTMLInputElement>(null);
```

## 195. How do you type React events in TypeScript?
Use the appropriate synthetic event type.

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

## 196. How do you type React context with TypeScript?
Create a context with a default value typed.

```tsx
type ThemeContextType = { theme: string; toggle: () => void };
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);
```

Consumers use `useContext<ThemeContextType>(ThemeContext)`.

## 197. How do you type React Router with TypeScript?
`react-router-dom` provides types. Use `useParams<{ id: string }>()` and `useNavigate()` with proper generics.

## 198. How do you type Redux with React and TypeScript?
- Define state and action types.  
- Use `configureStore` from Redux Toolkit which infers types.  
- Use `useSelector` with a typed root state.  
- Use `useDispatch<AppDispatch>()`.

## 199. What are the benefits of using TypeScript with React?
- **Compile‑time type safety** reduces runtime bugs.  
- **Better IDE autocomplete** and refactoring.  
- **Self‑documenting code** via interfaces.  
- **Easier onboarding** for new developers.

## 200. What are the challenges of using TypeScript with React?
- **Initial learning curve** for TS concepts.  
- **Verbose typings** for complex props or generics.  
- **Third‑party library typings** may be missing or outdated.  
- **Build configuration** may need extra setup (tsconfig, Babel).  

---

*All answers have been expanded with detailed explanations to aid understanding.*
