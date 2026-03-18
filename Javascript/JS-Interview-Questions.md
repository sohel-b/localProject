# JavaScript Interview Questions

## Fundamentals
1. What are the different data types supported by JavaScript?
2. Explain the difference between `==` and `===`.
3. How does JavaScript handle type coercion?
4. What is the purpose of the `typeof` operator? Give examples.
5. Describe how variable hoisting works with `var`, `let`, and `const`.

## Scope & Closures
6. What is lexical scope? How does it differ from dynamic scope?
7. Define a closure. Provide a practical use‑case.
8. How can you create a private variable using closures?

## Asynchronous JavaScript
9. Explain the event loop and its phases.
10. What are callbacks, promises, and async/await? Compare their usage.
11. How do you handle errors in promise chains?

## Functions & Objects
12. What is the difference between a function declaration and a function expression?
13. Explain the concept of `this` in JavaScript. How does its value get determined?
14. What are arrow functions and how do they differ from regular functions regarding `this`?
15. Describe prototypal inheritance. How does it differ from classical inheritance?

## ES6+ Features
16. What are template literals and how are they used?
17. Explain destructuring assignment with examples for objects and arrays.
18. What are spread and rest operators? Provide use‑cases.
19. How do modules work in ES6? Difference between `import`/`export` and CommonJS `require`/`module.exports`.

## Performance & Optimization
20. What are the common ways to improve JavaScript performance?
21. Explain debouncing and throttling. When would you use each?

## Security
22. What is XSS and how can you mitigate it in JavaScript applications?
23. Explain the Same‑Origin Policy and CORS.

## Testing & Tooling
24. What are some popular testing frameworks for JavaScript?
25. How do you set up a linting tool (e.g., ESLint) and why is it important?

## Miscellaneous
26. What is the purpose of the `Map` and `Set` objects?
27. Explain the difference between `null` and `undefined`.
28. How does the `Array.prototype.reduce` method work? Provide an example.
29. What are Web Workers and when would you use them?
30. Describe the concept of a Service Worker.

## Coding Practice Questions
31. Write a function to deep clone an object without using JSON methods.
32. Implement a debounce function that delays execution of a given function.
33. Create a promise that resolves after a random delay between 1-5 seconds.
34. Write a recursive function to flatten a nested array.
35. Implement a simple event emitter class with `on`, `off`, and `emit` methods.
36. Write a function that returns the nth Fibonacci number using memoization.
37. Build a small utility to convert a callback‑based function to return a promise (promisify).
38. Write a function to check if two strings are anagrams of each other.
39. Implement a simple throttle function.
40. Write a function that merges two sorted arrays into a single sorted array.

## Additional Theory Questions
41. Explain event delegation and its benefits.
42. What is the difference between synchronous and asynchronous code execution?
43. Describe the JavaScript call stack and how it interacts with the event loop.
44. How does garbage collection work in JavaScript? What are common memory leak patterns?
45. Explain the concept of hoisting with function declarations vs function expressions.
46. What are the differences between var, let, and const in terms of scope and temporal dead zone?
47. Describe how prototype chaining works and how property lookup is performed.
48. What is the purpose of the "use strict" directive?
49. Explain the differences between mutable and immutable data structures in JavaScript.
50. How do you handle cross-browser compatibility issues in JavaScript?

## More Coding Practice Questions
51. Write a function to perform deep equality check between two objects.
52. Implement a simple memoization wrapper for any pure function.
53. Create a utility to debounce a function with immediate execution option.
54. Write a function that flattens an array of arbitrary depth using recursion.
55. Build a tiny state management library with getState, setState, and subscribe methods.

## Advanced Coding Questions
56. Implement a binary search algorithm for a sorted array.
57. Write a function to detect a cycle in a singly linked list.
58. Create a function that performs a deep merge of two objects.
59. Implement a simple virtual DOM diffing algorithm.
60. Write a function to generate all permutations of an array.
61. Build a lightweight promise pool to limit concurrent async operations.
62. Implement a function that parses and evaluates a basic arithmetic expression string.
63. Write a function to serialize and deserialize a binary tree.
64. Create a simple router for a single-page application without using libraries.
65. Implement a custom hook in React that synchronizes state with localStorage.

## Theory Deep Dive Questions
66. Explain the differences between event bubbling and capturing.
67. What are microtasks and macrotasks in the JavaScript event loop?
68. Discuss the pros and cons of using callbacks vs promises vs async/await.
69. How does the JavaScript engine perform just‑in‑time (JIT) compilation?
70. Describe the concept of “hoisting” for function declarations versus variable declarations.
71. Explain the role of the JavaScript engine’s “heap” and “stack”.
72. What are the security implications of eval and how can they be mitigated?
73. Discuss the impact of the “use strict” mode on error handling and variable declarations.
74. Explain how module bundlers (like Webpack) work and why they are used.
75. Compare client‑side rendering, server‑side rendering, and static site generation.

## Miscellaneous Questions
76. How would you approach debugging a memory leak in a large JavaScript application?
77. What strategies would you use to improve the load time of a web page?
78. Explain the concept of progressive web apps (PWAs) and their benefits.
79. How do you handle internationalization (i18n) in JavaScript applications?
80. What are the differences between REST and GraphQL, and when would you choose one over the other?

## Design Patterns Questions
81. Explain the Module pattern and its benefits in JavaScript.
82. Describe the Observer pattern and provide a simple implementation example.
83. What is the Singleton pattern and how can it be implemented in ES6 modules?
84. Discuss the Factory pattern and when it is appropriate to use it.
85. Explain the Strategy pattern with a code example.

## Node.js Questions
86. What is the event-driven architecture of Node.js and how does it differ from traditional threading models?
87. Explain the purpose of the `process` object and common properties/methods you use.
88. How do you handle uncaught exceptions in a Node.js application?
89. Describe how streams work in Node.js and give an example of a readable and writable stream.
90. What are the differences between `require` and `import` in a Node.js environment?

## Browser APIs Questions
91. How does the Fetch API differ from XMLHttpRequest? Provide a code example using async/await.
92. Explain the purpose of the `IntersectionObserver` API and a use‑case.
93. What is the `Web Storage API` and how do you use `localStorage` vs `sessionStorage`?
94. Describe the `Service Worker` lifecycle and its role in offline support.
95. How can you use the `Performance` API to measure page load times?

## Advanced Testing Questions
96. What is the difference between unit, integration, and end‑to‑end testing in JavaScript?
97. How do you mock dependencies with Jest or Sinon?
98. Explain code coverage metrics and how to improve them.
99. Describe how to test asynchronous code with Jest (using `done`, promises, async/await).
100. What are snapshot tests and when are they appropriate?

## DevOps / Build Tools Questions
101. Explain the purpose of a bundler like Webpack and the concept of loaders.
102. What is tree shaking and how does it reduce bundle size?
103. How do you configure Babel to transpile modern JavaScript for older browsers?
104. Describe the role of CI/CD pipelines in JavaScript project deployments.
105. What are the differences between npm, yarn, and pnpm? When would you choose one over the others?

## Algorithmic Challenges
106. Write a function to find the longest palindrome substring in a given string.
107. Implement a function that returns all unique permutations of a string.
108. Solve the "two sum" problem with O(n) time complexity.
109. Write a function to perform a topological sort on a directed acyclic graph.
110. Implement a function to find the median of two sorted arrays in O(log n) time.

## Data Structures in JavaScript
111. Explain how you would implement a stack using an array.
112. Describe how a queue can be built with two stacks.
113. Write a function to implement a doubly linked list with insert and delete operations.
114. How would you create a priority queue (min‑heap) in JavaScript?
115. Discuss the trade‑offs of using a Map vs a plain object for key‑value storage.

## Performance Tuning & Optimization
116. How do you profile a JavaScript application in Chrome DevTools?
117. Explain the impact of layout thrashing and how to avoid it.
118. What are Web Workers and when should you use them for performance?
119. Describe techniques to reduce bundle size in a large web app.
120. How would you implement lazy loading of images and components?

## Debugging Techniques
121. What are common strategies for debugging asynchronous code?
122. How can you use `console.trace()` effectively?
123. Explain how to set conditional breakpoints in VS Code.
124. Describe the use of source maps in debugging minified code.
125. How would you investigate a memory leak in a single‑page application?

## Version Control & Collaboration
126. What is the difference between `git merge` and `git rebase`?
127. How do you resolve a merge conflict in a large codebase?
128. Explain the purpose of a `.gitignore` file and common entries for JavaScript projects.
129. Describe a typical Git workflow for feature development and release.
130. How would you use Git tags to manage version releases?

## Testing Strategies
131. What is the difference between unit, integration, and end‑to‑end testing?
132. How do you mock HTTP requests in Jest?
133. Explain the role of test coverage reports and how to improve them.
134. Describe how to test React components with React Testing Library.
135. What are property‑based tests and when are they useful?

## Tooling & Build Systems
136. Compare Webpack, Rollup, and Vite for bundling JavaScript.
137. How does tree shaking work and why is it important?
138. Explain the purpose of Babel and how to configure presets.
139. What are the benefits of using ESLint with a shared config?
140. Describe how to set up a CI pipeline that runs tests on each pull request.

## Accessibility & Internationalization
141. What are ARIA attributes and how do they improve accessibility?
142. How would you test keyboard navigation for a web component?
143. Explain strategies for handling right‑to‑left (RTL) languages in CSS.
144. How do you internationalize a React app using i18next?
145. Discuss the importance of color contrast and tools to check it.

## Security Best Practices
146. What is Content Security Policy (CSP) and how does it protect a web app?
147. Explain how to securely store JWTs in the browser.
148. How do you prevent XSS when rendering user‑generated HTML?
149. Describe the principle of least privilege in API design.
150. What are common security considerations when using third‑party libraries?

## Full‑Stack JavaScript Questions
151. How does the event loop differ between the browser and Node.js environments?
152. Explain how you would structure a monolithic vs. micro‑services architecture in a JavaScript‑based backend.
153. What are the benefits and drawbacks of using Server‑Side Rendering (SSR) with frameworks like Next.js?
154. Describe how you would implement authentication (JWT, sessions, OAuth) in a full‑stack JavaScript app.
155. How do you manage environment‑specific configuration (development, staging, production) in a Node.js project?

## TypeScript Questions
156. What are the main advantages of using TypeScript over plain JavaScript?
157. How do you declare a generic function in TypeScript? Provide an example.
158. Explain the difference between `interface` and `type` aliases.
159. How does TypeScript handle declaration merging?
160. Describe how to write a custom type guard.

## Advanced Testing & CI/CD
161. How would you set up a testing matrix to run tests across multiple Node.js versions in GitHub Actions?
162. Explain the concept of mutation testing and tools that support it for JavaScript.
163. What is contract testing and how can it be applied to a JavaScript API?
164. How do you perform visual regression testing for a React component library?
165. Describe how to use code coverage thresholds to enforce quality gates in CI.

## Performance Monitoring & Profiling
166. Which browser APIs can you use to measure First Contentful Paint (FCP) and Largest Contentful Paint (LCP)?
167. How would you detect and fix memory leaks caused by event listeners in a large SPA?
168. Explain the use of the `PerformanceObserver` API.
169. What are the trade‑offs between client‑side and server‑side performance optimizations?
170. How can you leverage WebAssembly to improve performance‑critical parts of a JavaScript app?

## Security Deep Dive
171. What are the risks of using `eval` and `Function` constructors, and how can you mitigate them?
172. Explain how Content Security Policy (CSP) can prevent XSS and data injection attacks.
173. How would you securely store and rotate API keys in a Node.js application?
174. Describe the OWASP Top 10 items most relevant to JavaScript applications.
175. What are the best practices for handling CORS preflight requests securely?

## Additional Practical Questions
176. How would you implement feature flags in a JavaScript application?
177. Describe a strategy for handling large JSON payloads in the browser.
178. What are the pros and cons of using Service Workers for caching API responses?
179. Explain how you would set up a monorepo for multiple JavaScript packages.
180. How do you manage state in a large React application without Redux?
181. What are the differences between shallow and deep cloning, and when would you use each?
182. How would you detect and prevent memory leaks caused by event listeners?
183. Explain the concept of “code splitting” and how it improves performance.
184. How do you secure sensitive configuration values (e.g., API keys) in a client‑side app?
185. What is the purpose of the `package.json` “engines” field?
186. How would you migrate a legacy JavaScript codebase to TypeScript?
187. Describe how you would implement server‑side rendering with Next.js.
188. What are the benefits of using a GraphQL API over REST for a JavaScript front‑end?
189. How do you handle pagination efficiently in a large data set on the client?
190. Explain the role of WebAssembly in performance‑critical JavaScript applications.
191. How would you set up automated accessibility testing in a CI pipeline?
192. What are the differences between `npm ci` and `npm install` in CI environments?
193. How do you configure ESLint to enforce a specific coding style across a team?
194. Describe a method for measuring and improving Time‑to‑Interactive (TTI) in a web app.
195. How would you implement optimistic UI updates in a React application?
196. What are the security considerations when using third‑party scripts (e.g., analytics)?
197. Explain how you would use the PerformanceObserver API to monitor long tasks.
198. How do you handle cross‑origin resource sharing (CORS) for WebSockets?
199. What is the difference between `fetch` with `keep‑alive` and a regular request?
200. How would you design a fallback UI for when a JavaScript bundle fails to load?

## Additional Advanced Topics

201. How would you implement server‑side rendering (SSR) with React using frameworks like Next.js or Remix?
202. Explain the differences between static site generation (SSG) and incremental static regeneration (ISR).
203. What are the trade‑offs between using REST, GraphQL, and gRPC for API design?
204. How do you design a scalable real‑time system using WebSockets or Server‑Sent Events (SSE)?
205. Describe the architecture and benefits of a micro‑frontend approach.
206. How would you set up a monorepo using tools like Nx, Lerna, or Turborepo?
207. Explain the concept of “feature toggles” and how to implement them safely in production.
208. What strategies would you use to migrate a large codebase from JavaScript to TypeScript incrementally?
209. How do you configure ESLint and Prettier to enforce a consistent code style across multiple packages?
210. Describe how to implement automated code formatting in a CI pipeline (e.g., using lint‑staged and husky).
211. What are the best practices for writing secure HTTP headers (e.g., CSP, HSTS, X‑Content‑Type‑Options)?
212. How would you protect against supply‑chain attacks in npm dependencies?
213. Explain the role of dependency injection in JavaScript applications and how to implement it.
214. How do you perform contract testing for APIs using tools like Pact or Postman?
215. What is the purpose of a “service mesh” and is it applicable to JavaScript back‑ends?
216. Describe how to implement rate limiting and throttling at the API gateway level.
217. How would you set up observability (logging, tracing, metrics) for a Node.js service using OpenTelemetry?
218. Explain the differences between structured logging and unstructured logging, and why structured logging is preferred.
219. How do you configure health checks and readiness probes for containerized Node.js applications?
220. What are the considerations for deploying a JavaScript application to serverless platforms (e.g., Vercel, AWS Lambda)?
221. How would you implement zero‑downtime deployments and blue‑green or canary releases for a Node.js service?
222. Describe the process of performing a post‑mortem analysis after a production incident.
223. How do you ensure data consistency and integrity when using NoSQL databases like MongoDB?
224. Explain the CAP theorem and its relevance to choosing a database for a JavaScript application.
225. What are the advantages and disadvantages of using an ORM (e.g., Sequelize, TypeORM) versus raw queries?
226. How would you design a caching strategy using Redis, including cache invalidation patterns?
227. Describe how to implement background job processing in Node.js using libraries like Bull or Agenda.
228. What are the security implications of using eval, Function constructors, and how can you mitigate them?
229. How do you secure JWTs in both client‑side storage and server‑side verification?
230. Explain the concept of “same‑site” cookies and their role in CSRF protection.
231. How would you implement content versioning and cache busting for static assets?
232. What are the best practices for handling internationalization (i18n) and localization (l10n) in large applications?
233. Describe how to test accessibility (a11y) programmatically using tools like axe-core.
234. How do you set up visual regression testing for component libraries?
235. Explain the differences between unit, integration, contract, and end‑to‑end testing in a full‑stack JavaScript project.
236. What are the considerations for using Docker in development versus production environments?
237. How would you configure a multi‑stage Docker build for a Node.js application?
238. Describe how to use Git submodules or subtree for managing shared libraries.
239. What is the purpose of a “release train” and how can it be applied to JavaScript projects?
240. How do you manage secret rotation and storage using tools like HashiCorp Vault or AWS Secrets Manager?
241. Explain the concept of “immutable infrastructure” and its benefits.
242. How would you implement progressive enhancement and graceful degradation in web applications?
243. What are the performance implications of using large third‑party libraries, and how can you mitigate them?
244. Describe how to perform bundle analysis and reduce bundle size using tools like webpack‑bundle‑analyzer.
245. How do you implement lazy loading of modules with dynamic import() statements?
246. Explain the role of Service Workers in offline‑first applications and their limitations.
247. How would you design a fallback UI strategy for when critical JavaScript fails to load?
248. What are the best practices for handling file uploads securely in a Node.js API?
249. How do you implement pagination strategies (offset, cursor, keyset) for large datasets?
250. Describe how to use feature flags to perform A/B testing in a JavaScript application.

## Practical Coding Exercises
251. Build a small Todo app using vanilla JavaScript and localStorage.
252. Create a responsive navigation bar that collapses into a hamburger menu.
253. Implement a drag-and-drop file uploader with progress indication.
254. Write a utility to debounce API calls in a search input.
255. Develop a markdown previewer that renders markdown to HTML in real time.
256. Build a simple chat interface using WebSockets.
257. Create a form validation library that supports custom rules.
258. Implement infinite scrolling for a list of items fetched from an API.
259. Write a script to batch rename files in a directory using Node.js.
260. Build a CLI tool that scaffolds a new JavaScript project with linting and testing setup.

## Theory Deep Dive Additional
261. Explain the differences between synchronous and asynchronous iteration (for vs for...of with async).
262. Discuss the impact of JavaScript's single-threaded nature on UI responsiveness.
263. Describe how the event loop handles microtasks vs macrotasks in detail.
264. Explain the concept of backpressure in streams and how to handle it.
265. Discuss the pros and cons of using monolithic vs microservice architectures in JavaScript back‑ends.
266. Explain how tree shaking works at the module level in bundlers.
267. Describe the role of source maps in debugging minified code.
268. Discuss the security implications of third‑party script injection and CSP.
269. Explain how to use Web Workers for computationally intensive tasks.
270. Describe the process of migrating a JavaScript codebase to TypeScript incrementally.

## Comprehensive Code Review Questions
271. How would you conduct a code review for a large JavaScript codebase?
272. What are common anti‑patterns in JavaScript code and how to avoid them?
273. How do you enforce consistent coding style across multiple teams?
274. What tools can automatically detect security vulnerabilities in dependencies?
275. How would you refactor a function that has grown too large (>100 lines)?

## Advanced Theory Questions
276. Explain the concept of “event loop starvation” and how to prevent it.
277. Discuss the impact of JavaScript’s garbage collector generations on performance.
278. What is the difference between “soft” and “hard” real‑time constraints in Node.js?
279. How does the V8 engine optimize hot code paths?
280. Explain the role of “inline caches” in property access performance.

## Full‑Stack Integration Questions
281. How would you design a GraphQL schema for a real‑time chat application?
282. Describe strategies for sharing code between client and server in a monorepo.
283. How do you handle authentication tokens securely in both browser and Node.js?
284. What are the trade‑offs of using Server‑Side Rendering vs. Client‑Side Rendering for SEO?
285. How would you implement rate limiting on a public API using middleware?

## Performance Benchmarking Questions
286. Which tools would you use to benchmark Node.js API latency?
287. How do you measure and improve Time‑to‑First‑Byte (TTFB) in a JavaScript web app?
288. Explain how to use Lighthouse programmatically in CI.
289. What are the differences between micro‑benchmarks and macro‑benchmarks in JavaScript?
290. How would you profile memory usage in a long‑running Node.js service?

## Security Hardening Questions
291. How do you mitigate prototype pollution vulnerabilities?
292. What is the principle of “defense in depth” for a JavaScript application?
293. How would you securely store environment secrets in a CI pipeline?
294. Explain the risks of using eval in template literals and how to avoid them.
295. What are the best practices for handling user‑generated HTML content?

## Tooling and Automation Questions
296. How would you set up a pre‑commit hook to run ESLint and unit tests?
297. Describe a strategy for automatically updating npm dependencies with dependabot.
298. How can you enforce type safety in a JavaScript project without full TypeScript migration?
299. What are the benefits of using a monorepo tool like Nx for shared utilities?
300. How would you integrate a visual regression testing tool into a GitHub Actions workflow?

*Feel free to expand or modify these questions based on the specific role or seniority level.*









LIXICAL SCOPE
 Lexical scope, also known as static scope, In JavaScript it dictates that the accessibility of variables is determined by their physical location within the source code at the time of writing, not at the time of execution. This means a function's access to variables is fixed by where it is defined in the code, and this relationship remains constant during runtime.

HOISTING
Hoisting in JavaScript is a mechanism where variable and function declarations are conceptually moved to the top of their containing scope during the compilation phase, before the code is executed. This means that you can use variables and functions before they are formally declared in your code. 
        console.log(myVar); // undefined
        var myVar = 10;
        console.log(myVar); // 10

CLOSURES
 The crucial feature of closures is that the inner function retains access to the variables declared in its outer function's scope

The Temporal Dead Zone (TDZ) in JavaScript refers to the period within a scope where a variable declared with let or const exists but cannot be accessed. Attempting to access such a variable within its TDZ will result in a ReferenceError. 
Applies to let and const: The TDZ specifically affects variables declared with let and const. Variables declared with var do not have a TDZ; they are hoisted and initialized with undefined at the beginning of their function scope.
TEMPERAL DEAD ZONE
{
  // TDZ for 'myVariable' starts here
  console.log(myVariable); // ReferenceError: Cannot access 'myVariable' before initialization
  let myVariable = "Hello"; // TDZ for 'myVariable' ends here
  console.log(myVariable); // "Hello"
}