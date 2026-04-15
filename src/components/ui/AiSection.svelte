<script lang="ts">
  interface Props {
    topicTitle: string;
    topicSlug: string;
    oncomplete?: () => void;
  }

  let { topicTitle, topicSlug, oncomplete }: Props = $props();

  const aiContent: Record<string, { hook: string; how: string; prompt: string; promptOutput: string; takeaway: string }> = {
    // Topics
    variables: {
      hook: 'Every time you chat with an AI, it stores your message in a variable before it can respond.',
      how: 'LLMs receive your prompt as a string variable, tokenize it into a number array, and thread a growing "context" variable through every layer of the network. The final output is assembled token-by-token into another string variable that becomes the reply you see.',
      prompt: 'Explain the difference between let and const in JavaScript.',
      promptOutput: 'let declares a variable that can be reassigned later. const declares a variable that cannot be reassigned after its initial value is set.',
      takeaway: 'Variables are the short-term memory of every AI system — without them, nothing can be stored, compared, or returned.',
    },
    functions: {
      hook: 'An AI model is essentially one giant function: text goes in, text comes out.',
      how: 'Under the hood, an LLM is a chain of thousands of smaller functions — attention heads, feed-forward layers, softmax — each taking an input tensor, transforming it, and passing the result to the next. Your API call wraps all of that behind a single function call: <code>generate(prompt) → response</code>.',
      prompt: 'Write a function that reverses a string.',
      promptOutput: 'function reverseString(str) {\n  return str.split("").reverse().join("");\n}',
      takeaway: 'Functions let you package complexity behind a simple interface — exactly how AI APIs let you use a billion-parameter model with one function call.',
    },
    'data-structures': {
      hook: 'AI models think in arrays. Every word you type becomes a list of numbers before the model ever sees it.',
      how: 'Your prompt is tokenized into an array of token IDs, then each ID is mapped to a high-dimensional vector (an array of ~4,000 floats). The model processes these through matrices (2-D arrays) and key-value caches (hash maps) to produce the next token. Choosing the right data structure — array vs. tree vs. map — directly affects how fast an AI pipeline runs.',
      prompt: 'What data structure would you use to store a list of unique usernames?',
      promptOutput: 'A Set — it automatically prevents duplicates and provides O(1) lookup time, making it ideal for checking if a username already exists.',
      takeaway: 'The entire AI stack — from tokenizers to attention caches — is built on the same data structures you are learning right now.',
    },
    'control-flow': {
      hook: 'AI agents use if/else logic at every decision point — should I search the web, write code, or just answer directly?',
      how: 'An AI agent is a loop: receive input → decide an action (if/else or match) → execute the action → check if done (while loop). Even inside the model, each attention head acts like a conditional gate, amplifying or suppressing information flow based on learned conditions.',
      prompt: 'Write an if/else statement that checks if a user is old enough to vote.',
      promptOutput: 'if (age >= 18) {\n  console.log("You can vote!");\n} else {\n  console.log("Too young to vote.");\n}',
      takeaway: 'Control flow is the skeleton of every AI agent — without branches and loops, there is no reasoning, no tool use, no autonomy.',
    },
    logic: {
      hook: 'When an AI says "because A is true and B is false, therefore C" — it is performing logical reasoning, the same AND/OR/NOT you are learning here.',
      how: 'Transformer attention can be seen as soft logic: instead of binary true/false, each attention weight is a probability between 0 and 1. Chain-of-thought prompting works because it forces the model to lay out logical steps explicitly, reducing errors the same way writing out a proof helps a math student.',
      prompt: 'Is this expression true or false: (true AND false) OR (NOT false)?',
      promptOutput: '(true AND false) → false\n(NOT false) → true\nfalse OR true → true\n\nThe expression evaluates to true.',
      takeaway: 'Logic is the foundation of reasoning — for humans and for AI.',
    },
    state: {
      hook: 'AI chat memory is state management — every message you send updates a growing state that shapes the next reply.',
      how: 'An LLM is stateless by itself: each API call starts from scratch. Chat "memory" is achieved by replaying the full conversation as input every time. The context window is the state container, and when it fills up, the system must decide what to summarize or drop — classic state management tradeoffs.',
      prompt: 'What is the difference between stateful and stateless?',
      promptOutput: 'Stateful means the system remembers previous interactions. Stateless means each request is independent — the system has no memory of what happened before.',
      takeaway: 'Managing state is what turns a single AI response into a conversation — and what makes chat apps, games, and databases work.',
    },
    composition: {
      hook: 'AI pipelines are composition in action: a retriever fetches documents, a summarizer condenses them, and a generator writes the final answer.',
      how: 'Retrieval-Augmented Generation (RAG) chains small, focused functions together: embed(query) → search(vector_db) → rerank(results) → generate(context + query). Each step does one thing well, and the composition produces something none could do alone.',
      prompt: 'What is function composition?',
      promptOutput: 'Function composition is combining simple functions to build complex behavior. The output of one function becomes the input of the next, like a pipeline: process(clean(load(data))).',
      takeaway: 'Composition is how you build powerful AI systems — not with one monolithic model, but by chaining focused steps together.',
    },
    classes: {
      hook: 'AI frameworks like LangChain and the Anthropic SDK are organized as classes — ChatModel, Message, Tool — each bundling data and behavior together.',
      how: 'When you write <code>new Anthropic()</code>, you instantiate a class that encapsulates your API key, HTTP client, retry logic, and methods like <code>.messages.create()</code>. The class hides all that complexity behind a clean interface — the same OOP principle you are learning here.',
      prompt: 'Write a simple class for a chatbot.',
      promptOutput: 'class Chatbot {\n  constructor(name) {\n    this.name = name;\n    this.history = [];\n  }\n  reply(message) {\n    this.history.push(message);\n    return `${this.name}: I heard "${message}"`;\n  }\n}',
      takeaway: 'Classes give AI libraries their shape — turning complex systems into objects you can create, configure, and call methods on.',
    },
    encapsulation: {
      hook: 'You never see the billions of parameters inside an AI model — that is encapsulation. You get a clean API, the internals stay hidden.',
      how: 'The Anthropic API encapsulates the entire model behind a single endpoint. You send a message; you get a response. You cannot (and should not) reach into the weights, the attention matrices, or the sampling logic. This boundary lets Anthropic improve the model without breaking your code.',
      prompt: 'Why is encapsulation important in software design?',
      promptOutput: 'Encapsulation hides internal details and exposes only what is needed. This protects data from accidental changes, simplifies the interface, and lets you change the implementation without affecting code that depends on it.',
      takeaway: 'Encapsulation is why you can upgrade to a new AI model with zero code changes — the interface stays the same even when everything inside is different.',
    },
    inheritance: {
      hook: 'In AI frameworks, a ChatModel inherits from a BaseModel, which inherits from a Runnable — each layer adding capabilities.',
      how: 'LangChain uses deep inheritance trees: <code>ChatAnthropic → BaseChatModel → BaseLanguageModel → Runnable</code>. Each parent provides shared behavior (retries, streaming, callbacks) so child classes only implement what is unique — like which API to call.',
      prompt: 'Give a simple example of inheritance.',
      promptOutput: 'class Animal {\n  speak() { return "..."; }\n}\nclass Dog extends Animal {\n  speak() { return "Woof!"; }\n}\n// Dog inherits from Animal but overrides speak()',
      takeaway: 'Inheritance lets AI frameworks share common logic across dozens of model providers without repeating code.',
    },
    polymorphism: {
      hook: 'You can swap Claude for GPT for Gemini in your code — same method call, different model. That is polymorphism.',
      how: 'AI frameworks define a common interface (e.g., <code>.invoke(prompt)</code>) that every model class implements. Your application code calls <code>model.invoke()</code> without knowing or caring which model is behind it. You can switch providers by changing one line — the rest of your code works unchanged.',
      prompt: 'What is polymorphism in simple terms?',
      promptOutput: 'Polymorphism means "many forms." Different objects can respond to the same method call in their own way. You call .speak() on any Animal — a Dog barks, a Cat meows.',
      takeaway: 'Polymorphism is why AI applications can be model-agnostic — write once, run with any provider.',
    },
    abstraction: {
      hook: 'You do not need to understand matrix multiplication to use an AI — abstraction hides the math and gives you a simple prompt-in, answer-out interface.',
      how: 'Each layer of the AI stack is an abstraction: hardware → CUDA kernels → PyTorch tensors → transformer layers → model API → chat SDK → your app. Each layer hides the complexity below it. You work at whatever level makes sense for your task.',
      prompt: 'What is abstraction in programming?',
      promptOutput: 'Abstraction means hiding complex details and showing only the essential features. A car\'s steering wheel is an abstraction — you turn it without needing to understand the steering mechanism underneath.',
      takeaway: 'Abstraction is what makes AI usable — billion-parameter models distilled down to a single function call.',
    },
    testing: {
      hook: 'AI outputs are unpredictable, which makes testing AI applications one of the hardest problems in modern software.',
      how: 'You cannot assert exact equality on AI output the way you do with normal functions. Instead, AI testing uses techniques like: checking for keywords or structure in responses, running evaluations on batches of test cases, using another AI to grade the output (LLM-as-judge), and measuring statistical metrics like accuracy over many runs.',
      prompt: 'How do you test code that uses an AI model?',
      promptOutput: 'Mock the AI response for unit tests. For integration tests, use a test suite of prompts with expected patterns. For evaluation, run the full pipeline on a benchmark dataset and measure accuracy, relevance, and safety.',
      takeaway: 'Testing AI requires new strategies — you are testing behavior and quality, not just correctness.',
    },
    qa: {
      hook: 'Quality assurance for AI is a new frontier — how do you guarantee quality when the output is different every time?',
      how: 'AI QA combines traditional software QA with new techniques: red-teaming (trying to break the model), guardrails (filtering unsafe outputs), evaluation suites (measuring quality across hundreds of test cases), and human review. The goal is not perfection but consistent, safe, helpful behavior.',
      prompt: 'What is quality assurance?',
      promptOutput: 'QA is the process of ensuring software meets its requirements and works correctly. It includes testing, code review, and monitoring to catch bugs before users do.',
      takeaway: 'AI raises the stakes for QA — the output is not deterministic, so quality has to be measured statistically, not just checked once.',
    },

    // Syntax styles
    markup: {
      hook: 'AI models output structured markup all the time — Markdown, HTML, JSON — because markup gives structure to unstructured text.',
      how: 'When you ask an AI to format a response with headings, bold text, or code blocks, it is generating Markdown markup. When AI powers a web app, it often generates HTML directly. The model learned these markup patterns from millions of documents in its training data.',
      prompt: 'Convert this text to HTML: "Hello World" as a heading and "Welcome to my site" as a paragraph.',
      promptOutput: '<h1>Hello World</h1>\n<p>Welcome to my site</p>',
      takeaway: 'Markup is the bridge between AI-generated text and the structured documents humans actually read.',
    },
    'data-formats': {
      hook: 'AI tool use depends on structured data formats — every function call an AI makes is a JSON object.',
      how: 'When an AI decides to use a tool (search, calculator, API call), it outputs a structured JSON object specifying the function name and arguments. The system parses that JSON, executes the function, and feeds the result back. Without standardized data formats, AI agents could not interact with the outside world.',
      prompt: 'Convert this data to JSON: name is Alice, age is 30, hobbies are reading and hiking.',
      promptOutput: '{\n  "name": "Alice",\n  "age": 30,\n  "hobbies": ["reading", "hiking"]\n}',
      takeaway: 'Data formats are the language AI agents use to talk to tools, APIs, and databases.',
    },
    'c-style': {
      hook: 'Most AI frameworks are written in C-style languages — Python (C-influenced), C++, CUDA C — because this syntax family dominates systems programming.',
      how: 'PyTorch is Python on the surface but C++ and CUDA underneath. The curly-brace, semicolon syntax of C-style languages is what AI models have seen most in training data, which is why they are best at generating code in JavaScript, Python, C++, Java, and TypeScript.',
      prompt: 'Write a for loop in JavaScript that prints numbers 1 to 5.',
      promptOutput: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}',
      takeaway: 'C-style syntax is the lingua franca of programming — and the language family AI models know best.',
    },
    whitespace: {
      hook: 'Python is the #1 language for AI/ML — and it is whitespace-sensitive. Every AI researcher writes indentation-dependent code daily.',
      how: 'AI models are surprisingly good at tracking indentation levels when generating Python code. The model learns that indentation is not cosmetic but structural — getting it wrong means the code will not run. This is a great test of whether an AI truly "understands" code structure.',
      prompt: 'Write a Python function that checks if a number is even or odd.',
      promptOutput: 'def check_even_odd(n):\n    if n % 2 == 0:\n        return "Even"\n    else:\n        return "Odd"',
      takeaway: 'Whitespace sensitivity forces clean structure — which is why Python became the language of choice for AI.',
    },
    'declarative-imperative': {
      hook: 'Prompting an AI is declarative — you describe what you want, not how to compute it. The model figures out the "how."',
      how: 'Traditional programming is imperative: step-by-step instructions. AI prompting flips this: you declare intent ("summarize this article") and the model generates the steps internally. SQL is declarative too — you say what data you want, not how to fetch it. AI is making more of programming feel declarative.',
      prompt: 'Explain declarative vs imperative with a cooking analogy.',
      promptOutput: 'Imperative: "Boil water, add pasta, cook 10 minutes, drain, add sauce." Declarative: "Make me spaghetti with marinara." You describe the outcome; the chef decides the steps.',
      takeaway: 'AI is shifting programming toward the declarative end — describe what you want, let the model figure out how.',
    },

    // Languages
    typescript: {
      hook: 'TypeScript is the go-to language for building AI-powered web applications — type safety catches errors before your AI integration breaks in production.',
      how: 'The Anthropic SDK, Vercel AI SDK, and most AI web frameworks are written in TypeScript. Types ensure your prompt messages, tool definitions, and API responses have the right shape. When you define a tool for an AI agent, TypeScript interfaces guarantee the schema matches what the model expects.',
      prompt: 'What is the benefit of TypeScript over JavaScript for large projects?',
      promptOutput: 'TypeScript adds static types that catch bugs at compile time instead of runtime. For large projects, this means fewer surprises in production, better IDE support, and code that documents itself through type annotations.',
      takeaway: 'TypeScript gives you guardrails — critical when integrating AI, where unexpected response shapes can silently break your app.',
    },
    python: {
      hook: 'Python is the undisputed language of AI — PyTorch, TensorFlow, scikit-learn, LangChain, and every major AI library is Python-first.',
      how: 'Python dominates AI because of its simple syntax, massive ecosystem, and the NumPy/SciPy numerical computing foundation. Training a model, running inference, building an AI pipeline — it all happens in Python. The language\'s readability also makes research papers easier to translate into working code.',
      prompt: 'Why is Python so popular for AI and machine learning?',
      promptOutput: 'Python has a simple syntax that lets researchers focus on ideas, not boilerplate. Its ecosystem (NumPy, PyTorch, TensorFlow, Hugging Face) covers every step from data processing to model deployment.',
      takeaway: 'If you want to work in AI, Python is not optional — it is the foundation.',
    },
    go: {
      hook: 'Go powers the infrastructure that AI runs on — Docker, Kubernetes, and many AI serving platforms are written in Go.',
      how: 'While Python trains the models, Go often serves them. Go\'s fast compilation, small binaries, and built-in concurrency make it ideal for building the high-throughput API servers that handle millions of AI inference requests. Many AI companies use Go for their production serving layer.',
      prompt: 'When would you choose Go over Python?',
      promptOutput: 'Choose Go for high-performance servers, CLI tools, and infrastructure. Choose Python for data science, scripting, and rapid prototyping. Go compiles to a single binary, handles concurrency natively, and runs much faster than Python.',
      takeaway: 'Go is the backstage crew of AI — you do not see it, but it keeps the infrastructure running fast.',
    },
    csharp: {
      hook: 'C# and .NET are increasingly used for enterprise AI applications through Microsoft\'s Semantic Kernel and Azure AI integrations.',
      how: 'Microsoft\'s Semantic Kernel is a C# SDK for orchestrating AI models, plugins, and memory. Enterprise teams already on .NET can build AI agents, RAG pipelines, and copilot experiences without leaving their stack. C#\'s strong typing and enterprise tooling make it a natural fit for production AI systems.',
      prompt: 'What is C# mainly used for?',
      promptOutput: 'C# is used for enterprise applications, game development (Unity), web APIs (.NET), desktop apps (WPF/MAUI), and increasingly AI applications through Azure and Semantic Kernel.',
      takeaway: 'C# brings AI into the enterprise — where type safety, tooling, and ecosystem maturity matter most.',
    },

    // Principles
    naming: {
      hook: 'Good naming helps AI too — models generate better code when variables, functions, and files have clear, descriptive names.',
      how: 'When you give an AI context with well-named code, it can infer intent and generate better continuations. <code>processData()</code> tells the model nothing; <code>validateUserEmail()</code> tells it exactly what to generate next. The same naming principles that help humans read code help AI models write it.',
      prompt: 'Rename this function to be more descriptive: function doStuff(x)',
      promptOutput: 'It depends on what it does! If it validates an email:\nfunction validateEmailFormat(email)\n\nIf it calculates tax:\nfunction calculateSalesTax(price)',
      takeaway: 'Clear names are not just for humans — they are context that helps AI models understand and extend your code.',
    },
    'keep-it-simple': {
      hook: 'The best AI solutions are often the simplest — a well-crafted prompt can outperform a complex agent pipeline.',
      how: 'AI engineering follows the same "keep it simple" principle: start with a direct prompt before building a RAG pipeline. Use a single model call before adding agents and tool chains. The simplest approach that works is the best approach — over-engineering AI systems creates fragile, hard-to-debug pipelines.',
      prompt: 'Simplify this code: if (x === true) { return true; } else { return false; }',
      promptOutput: 'return x === true;\n\nOr even simpler, if x is already a boolean:\nreturn x;',
      takeaway: 'Simplicity is a superpower in AI engineering — the fewer moving parts, the fewer things that can go wrong.',
    },
    dry: {
      hook: 'AI can spot duplicated code instantly — ask it to find DRY violations and it will refactor them for you.',
      how: 'AI excels at pattern recognition, making it a natural tool for finding repeated code. It can identify similar-but-not-identical functions, suggest shared abstractions, and refactor duplication into reusable utilities. But beware: AI can also over-abstract, creating unnecessary complexity in pursuit of DRY.',
      prompt: 'These two functions are very similar. Refactor them to remove duplication.',
      promptOutput: 'Combine them into a single function with a parameter that controls the difference. Extract the shared logic into a helper, and let each caller pass in only what is unique.',
      takeaway: 'AI is a powerful refactoring partner — but you still need judgment about when DRY is worth the abstraction cost.',
    },
    'code-organization': {
      hook: 'AI works best with well-organized codebases — clear file structure helps it understand context and generate relevant code.',
      how: 'When an AI reads your project, it uses file paths, directory structure, and module boundaries as context clues. A well-organized codebase with clear separation of concerns gives the AI a map of your system. A messy, flat structure forces it to guess what belongs where.',
      prompt: 'How should I organize a web application project?',
      promptOutput: 'Group by feature or layer:\n/src\n  /components — UI pieces\n  /lib — shared utilities\n  /routes — page endpoints\n  /styles — global CSS\n  /tests — test files',
      takeaway: 'Good organization is not just for you — it is the context that helps AI tools navigate and contribute to your codebase.',
    },
    planning: {
      hook: 'AI is a powerful planning partner — it can help you break a vague idea into concrete implementation steps.',
      how: 'Before writing code, you can ask an AI to help design a system: define requirements, identify components, plan the data model, and sequence the work. The AI draws on patterns from millions of projects to suggest architectures and flag potential issues early. But the decisions are still yours.',
      prompt: 'I want to build a to-do app. Help me plan the key features.',
      promptOutput: '1. Add/edit/delete tasks\n2. Mark tasks complete\n3. Filter by status (all/active/done)\n4. Persist data (localStorage or database)\n5. Due dates and priority levels\n\nStart with 1-3, add 4-5 after the core works.',
      takeaway: 'AI accelerates planning but does not replace it — use it to brainstorm, then apply your own judgment to prioritize.',
    },

    // Toolbox
    'version-control': {
      hook: 'AI coding tools understand git — they can write commit messages, review diffs, and help resolve merge conflicts.',
      how: 'AI assistants integrate with git to provide context-aware help: they read your diff to write meaningful commit messages, analyze PR changes to suggest improvements, and use git history to understand how code evolved. Some AI tools can even resolve merge conflicts by understanding both sides of the change.',
      prompt: 'Write a commit message for this change: added email validation to the signup form.',
      promptOutput: 'Add email format validation to signup form\n\nValidate email input on submit using regex pattern match.\nShow inline error message for invalid formats.',
      takeaway: 'Version control is even more important with AI — you need to track what the AI changed and be able to roll it back.',
    },
    'command-line': {
      hook: 'AI coding assistants like Claude Code live in the terminal — the command line is becoming the primary interface for AI-assisted development.',
      how: 'AI CLI tools can run commands, read files, search code, and make edits — all from your terminal. They combine the power of the command line (direct system access, scriptability, piping) with natural language understanding. You describe what you want; the AI translates it into the right commands.',
      prompt: 'How do I find all JavaScript files that contain the word "fetch"?',
      promptOutput: 'grep -r "fetch" --include="*.js" .\n\nOr with ripgrep (faster):\nrg "fetch" -t js',
      takeaway: 'The command line is where AI meets your file system — mastering it makes you a far more effective AI-assisted developer.',
    },
    'local-servers': {
      hook: 'Running AI models locally is increasingly popular — local servers let you develop with AI without sending data to the cloud.',
      how: 'Tools like Ollama and llama.cpp let you run AI models on your own machine, served via a local HTTP server. You start a model the same way you start a local dev server: one command, localhost, done. This is great for privacy, offline development, and experimenting without API costs.',
      prompt: 'What is a local development server?',
      promptOutput: 'A local dev server runs on your machine (usually at localhost:3000 or similar). It serves your application during development so you can preview changes instantly without deploying to a remote server.',
      takeaway: 'Local servers power both web development and local AI — same concept, different payloads.',
    },
    'admin-access': {
      hook: 'AI systems need carefully scoped permissions — giving an AI agent admin access is as risky as giving it to a junior developer on day one.',
      how: 'When AI agents interact with systems (databases, APIs, file systems), they need credentials and permissions. The principle of least privilege is critical: give the AI only the access it needs, nothing more. AI sandboxing — running agents in isolated environments — is a growing security practice.',
      prompt: 'What is the principle of least privilege?',
      promptOutput: 'Give users (or programs) only the minimum permissions they need to do their job. A blog reader should not have admin rights. A backup script should not have delete permissions.',
      takeaway: 'Permission management is crucial for AI safety — an AI agent with too much access can cause real damage.',
    },

    // Testing QA
    'unit-testing': {
      hook: 'AI can write unit tests for you — describe what a function should do and the AI generates test cases, including edge cases you might miss.',
      how: 'AI models excel at generating test cases because they have seen millions of test files. Give the AI a function signature and description, and it will generate tests covering happy paths, edge cases, error conditions, and boundary values. But always review AI-generated tests — they can be subtly wrong or test implementation details instead of behavior.',
      prompt: 'Write a unit test for a function that adds two numbers.',
      promptOutput: 'test("adds positive numbers", () => {\n  expect(add(2, 3)).toBe(5);\n});\ntest("handles zero", () => {\n  expect(add(0, 5)).toBe(5);\n});\ntest("adds negative numbers", () => {\n  expect(add(-1, -1)).toBe(-2);\n});',
      takeaway: 'AI is a great test-writing partner — it spots edge cases you overlook, but you still need to verify the tests make sense.',
    },
    'integration-testing': {
      hook: 'Testing AI integrations is hard — the model might return different responses each time, making traditional assertions brittle.',
      how: 'Integration tests for AI systems check that components work together: Does the prompt reach the API? Does the response parse correctly? Does the UI render the output? You test the plumbing, not the model. Mock the AI response for deterministic tests; use real calls for smoke tests with loose assertions (e.g., "response contains a code block").',
      prompt: 'How do you write reliable tests for code that calls an AI API?',
      promptOutput: 'Mock the API response for unit tests to get deterministic results. For integration tests, assert on structure (response has required fields) rather than exact content. Run evaluation suites periodically against the real API.',
      takeaway: 'Test the integration, not the intelligence — mock the model, verify the wiring.',
    },
    'end-to-end-testing': {
      hook: 'E2E testing an AI-powered app means testing the full loop: user types a prompt → AI responds → UI updates correctly.',
      how: 'E2E tests for AI apps use tools like Playwright or Cypress to simulate a real user interacting with the AI feature. The challenge is non-deterministic output — you check that a response appeared, that it rendered correctly, and that the UI state updated, rather than asserting exact response text.',
      prompt: 'What makes E2E testing different from unit testing?',
      promptOutput: 'E2E tests the entire application from the user\'s perspective — browser, server, database, everything. Unit tests isolate one small piece of code. E2E is slower but catches integration issues that unit tests miss.',
      takeaway: 'E2E tests prove your AI feature works for real users — not just in isolation.',
    },
    debugging: {
      hook: 'AI is one of the best debugging partners available — paste an error message and it will often pinpoint the cause instantly.',
      how: 'AI models have seen millions of error messages and their solutions. They can trace stack traces, identify common pitfalls, suggest fixes, and explain why the error occurred. For AI-specific debugging, prompt logging and tracing tools let you inspect what the model received and returned at each step.',
      prompt: 'TypeError: Cannot read properties of undefined (reading "map"). What is wrong?',
      promptOutput: 'You are calling .map() on a variable that is undefined. This usually means:\n1. An API response has not loaded yet\n2. The data structure is not what you expected\n3. You have a typo in the property name\n\nFix: Add a null check — data?.map() or check if data exists before mapping.',
      takeaway: 'AI accelerates debugging by pattern-matching errors against millions of solutions — but understanding why the fix works is still on you.',
    },
    'code-review': {
      hook: 'AI can review your code — catching bugs, suggesting improvements, and enforcing style conventions before a human reviewer even looks at it.',
      how: 'AI code review tools analyze diffs for potential bugs, security issues, style violations, and performance problems. They can explain what changed and why it might be risky. Some teams use AI as a first-pass reviewer to catch obvious issues, freeing human reviewers to focus on architecture and design decisions.',
      prompt: 'Review this code for issues: if (password == "admin123") { grantAccess(); }',
      promptOutput: 'Issues found:\n1. Hardcoded password — never embed credentials in code\n2. Using == instead of === (loose comparison)\n3. No rate limiting or account lockout\n4. Password should be hashed and compared against a stored hash',
      takeaway: 'AI catches the easy stuff in code review — freeing humans to focus on the hard stuff like design and architecture.',
    },

    // Principles (additional)
    testing: {
      hook: 'The testing principle becomes even more important when AI writes your code — trust but verify.',
      how: 'AI-generated code needs more testing, not less. The code might look correct but contain subtle bugs that only surface with edge cases. Writing tests first (TDD) and then asking AI to implement the solution is a powerful pattern — the tests act as a specification the AI must satisfy.',
      prompt: 'What is test-driven development (TDD)?',
      promptOutput: 'TDD is a development practice where you:\n1. Write a failing test first\n2. Write the minimum code to make it pass\n3. Refactor while keeping tests green\n\nThis ensures every feature has test coverage from the start.',
      takeaway: 'When AI writes code, tests are your safety net — write them first and let the AI fill in the implementation.',
    },

    // Put it together
    'choose-your-stack': {
      hook: 'AI is now a factor in choosing your tech stack — some frameworks have better AI tooling, SDK support, and copilot integration than others.',
      how: 'When choosing a stack in 2025+, consider: Does the language have good AI SDKs? (TypeScript and Python lead.) Does the framework support streaming responses? Is there a strong AI coding assistant for the language? The best stack is one where AI can help you move fast.',
      prompt: 'What tech stack would you recommend for a new web app?',
      promptOutput: 'For most projects: TypeScript + React/Next.js + PostgreSQL + Tailwind CSS.\n\nWhy: huge ecosystem, strong AI tooling, type safety, and it scales from side project to production.',
      takeaway: 'Pick a stack with strong AI support — you will move faster with good autocomplete, code generation, and SDK integrations.',
    },
    'scaffold-the-project': {
      hook: 'AI can scaffold an entire project for you — describe what you are building and it generates the file structure, configs, and boilerplate.',
      how: 'AI tools can run create-next-app, set up a database schema, configure linting, and generate initial components — all from a natural language description. The key is knowing what to ask for and then reviewing what it produces. Scaffolding is where AI saves the most time: the boring setup work that slows every new project.',
      prompt: 'Scaffold a new Express.js API project with TypeScript.',
      promptOutput: 'mkdir my-api && cd my-api\nnpm init -y\nnpm install express typescript @types/express ts-node\nnpx tsc --init\n\nCreate src/index.ts with a basic Express server and health check endpoint.',
      takeaway: 'Let AI handle the scaffolding — it knows the boilerplate by heart, freeing you to focus on what makes your project unique.',
    },
    'connect-a-database': {
      hook: 'AI can write your database queries, generate migrations, and even design your schema based on a natural language description of your data.',
      how: 'AI excels at SQL because it has seen enormous amounts of schema definitions and queries. Describe your data relationships in plain English, and the AI generates the CREATE TABLE statements, relationships, and indexes. It can also translate between ORMs (Prisma, Drizzle, SQLAlchemy) and raw SQL.',
      prompt: 'Create a SQL table for a blog with posts and comments.',
      promptOutput: 'CREATE TABLE posts (\n  id SERIAL PRIMARY KEY,\n  title VARCHAR(255) NOT NULL,\n  body TEXT NOT NULL,\n  created_at TIMESTAMP DEFAULT NOW()\n);\n\nCREATE TABLE comments (\n  id SERIAL PRIMARY KEY,\n  post_id INTEGER REFERENCES posts(id),\n  author VARCHAR(100),\n  body TEXT NOT NULL,\n  created_at TIMESTAMP DEFAULT NOW()\n);',
      takeaway: 'AI turns plain English into working database schemas — describe your data and let it generate the SQL.',
    },
    'add-authentication': {
      hook: 'AI can help implement auth — but never blindly trust AI with security code. Always review authentication logic carefully.',
      how: 'AI knows auth patterns (JWT, OAuth, session-based) and can scaffold middleware, login flows, and role-based access control. But security is where AI mistakes are most dangerous. Always review: Are secrets hardcoded? Is the token validated properly? Are permissions checked on every route? AI is a starting point, not the final answer for auth.',
      prompt: 'What is the difference between authentication and authorization?',
      promptOutput: 'Authentication = "Who are you?" (login, proving identity)\nAuthorization = "What can you do?" (permissions, access control)\n\nYou authenticate first, then the system checks what you are authorized to access.',
      takeaway: 'AI accelerates auth implementation — but security code demands human review. Trust, then verify.',
    },
    'build-an-api': {
      hook: 'AI models are accessed through APIs — and AI can help you build your own APIs faster than ever.',
      how: 'AI can generate REST endpoints, GraphQL schemas, request validation, error handling, and API documentation from a plain English description. It knows common patterns (CRUD, pagination, filtering) by heart. For AI-powered APIs specifically, you are wrapping a model behind your own endpoint — adding caching, rate limiting, and business logic.',
      prompt: 'Design a REST API for a todo list.',
      promptOutput: 'GET    /todos        — list all todos\nGET    /todos/:id    — get one todo\nPOST   /todos        — create a todo\nPUT    /todos/:id    — update a todo\nDELETE /todos/:id    — delete a todo',
      takeaway: 'APIs are how AI reaches the world — and AI is how you build APIs faster.',
    },
    'deploy-and-ship': {
      hook: 'Deploying AI-powered apps has unique challenges — model size, cold starts, GPU costs, and streaming responses all affect your deploy strategy.',
      how: 'For apps that call AI APIs (like Claude), deployment is standard — your server makes HTTP requests to the AI provider. For self-hosted models, you need GPU instances, container orchestration, and model caching. Either way, AI adds latency and cost considerations that affect architecture: streaming responses, edge caching, and fallback models.',
      prompt: 'What is the simplest way to deploy a web application?',
      promptOutput: 'Push to a platform like Vercel, Netlify, or Railway:\n1. Connect your git repo\n2. Configure build settings\n3. Push to main\n4. Auto-deploys on every commit',
      takeaway: 'Shipping is shipping — AI adds considerations around cost and latency, but the fundamentals of deployment are the same.',
    },

    // User interface
    'html-structure': {
      hook: 'AI generates HTML fluently — but semantic HTML matters. Asking for "a page" gets you divs; asking for "accessible, semantic HTML" gets you real structure.',
      how: 'AI models have trained on billions of HTML documents. They know every tag, attribute, and pattern. The quality of the HTML they generate depends on your prompt: ask for semantic markup and you get <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>. Ask generically and you get a wall of <code>&lt;div&gt;</code>s.',
      prompt: 'Write semantic HTML for a blog post page.',
      promptOutput: '<article>\n  <header>\n    <h1>Post Title</h1>\n    <time datetime="2025-01-15">Jan 15, 2025</time>\n  </header>\n  <p>Post content here...</p>\n  <footer>\n    <p>Written by Author</p>\n  </footer>\n</article>',
      takeaway: 'AI knows HTML — but you need to ask for the right kind. Semantic, accessible HTML starts with a specific prompt.',
    },
    'css-styling': {
      hook: 'AI is remarkably good at CSS — describe a layout or visual effect in words and it can write the styles instantly.',
      how: 'CSS is one of AI\'s strongest areas because visual intent translates well to natural language. "Center this vertically and horizontally" → flexbox. "Make it responsive with a sidebar that collapses on mobile" → grid + media queries. AI also excels at translating designs into CSS, especially with utility frameworks like Tailwind.',
      prompt: 'Center a div both vertically and horizontally.',
      promptOutput: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}',
      takeaway: 'AI turns visual descriptions into working CSS — describe what you see, get the code that creates it.',
    },
    'responsive-design': {
      hook: 'AI can generate responsive layouts from a single description — "a 3-column grid that stacks on mobile" becomes working CSS in seconds.',
      how: 'AI understands breakpoints, media queries, flexbox, grid, and container queries. It can transform a desktop-only layout into a responsive one, generate mobile-first styles, and suggest optimal breakpoints. With utility frameworks like Tailwind, the AI writes responsive classes inline.',
      prompt: 'Make this layout responsive: a header, sidebar, and main content area.',
      promptOutput: '.layout {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n@media (min-width: 768px) {\n  .layout {\n    grid-template-columns: 250px 1fr;\n  }\n}',
      takeaway: 'Responsive design is where AI saves the most time in UI work — it knows the patterns cold.',
    },
    'component-frameworks': {
      hook: 'AI coding assistants are trained on React, Vue, Svelte, and Angular — they can generate, refactor, and explain components in any framework.',
      how: 'Component frameworks and AI are a natural fit: components are self-contained, well-structured pieces of code that AI can generate in isolation. AI can translate components between frameworks (React → Svelte), generate new components from descriptions, and refactor existing ones to follow best practices.',
      prompt: 'Write a React component for a like button with a counter.',
      promptOutput: 'function LikeButton() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      ❤️ {count}\n    </button>\n  );\n}',
      takeaway: 'AI + component frameworks = rapid UI development. Describe the component, get working code, iterate.',
    },

    // AI topics (meta — AI about AI)
    'what-is-an-llm': {
      hook: 'You are learning about LLMs using an LLM — the tool teaching you is an instance of the thing it is explaining.',
      how: 'An LLM is a neural network trained on text to predict the next token. But that simple description hides enormous complexity: billions of parameters, months of training on thousands of GPUs, and emergent abilities like reasoning, coding, and conversation that were not explicitly programmed.',
      prompt: 'Explain what a large language model is in one sentence.',
      promptOutput: 'A large language model is a neural network trained on vast amounts of text that can generate, understand, and reason about human language.',
      takeaway: 'Understanding how LLMs work — even at a high level — makes you a better user and builder of AI systems.',
    },
    'generative-ai': {
      hook: 'This entire educational platform could have been generated by AI — text, code examples, even the structure. That is generative AI.',
      how: 'Generative AI creates new content — text, images, code, music, video — by learning patterns from training data and producing novel outputs that follow those patterns. Unlike traditional software that retrieves or transforms existing data, generative AI synthesizes something new every time.',
      prompt: 'What is the difference between generative AI and traditional AI?',
      promptOutput: 'Traditional AI classifies, predicts, or optimizes (spam filter, recommendation engine). Generative AI creates new content (writes text, generates images, composes code). Traditional AI says "this email is spam." Generative AI writes the email.',
      takeaway: 'Generative AI is a creation tool — it does not just analyze data, it produces new things from what it has learned.',
    },
    'agentic-ai': {
      hook: 'An AI agent is a program that uses an LLM as its brain — it can plan, use tools, and take actions to achieve a goal.',
      how: 'Agentic AI goes beyond chat: the model receives a goal, breaks it into steps, calls tools (search, code execution, file editing), checks results, and iterates until done. This is the loop: Think → Act → Observe → Repeat. Claude Code is an example — it reads your code, plans changes, edits files, and runs tests.',
      prompt: 'What makes an AI agent different from a chatbot?',
      promptOutput: 'A chatbot responds to messages. An agent takes actions: it can read files, run code, search the web, and make changes in the real world. A chatbot waits for you. An agent works toward a goal.',
      takeaway: 'Agentic AI turns language models from conversationalists into workers that can take real actions in the world.',
    },
    copilots: {
      hook: 'You might be using an AI copilot right now — they autocomplete code, explain errors, and pair-program alongside you in your editor.',
      how: 'AI copilots integrate directly into your development environment (VS Code, terminal, IDE). They read the file you are editing, understand the project context, and suggest completions, fixes, and refactors in real time. The best copilots do not just complete the current line — they anticipate the next function, test, or file you need.',
      prompt: 'How do AI coding assistants work?',
      promptOutput: 'They read your current file, open tabs, and project structure as context. When you pause or ask a question, they generate relevant code or explanations using a large language model. The better the context, the better the suggestions.',
      takeaway: 'AI copilots are multiplicative — they make good developers faster and help new developers learn by example.',
    },
    chatbots: {
      hook: 'The chatbot you are talking to right now is built on the same principles you are learning — messages, state, functions, and APIs.',
      how: 'A modern chatbot is a loop: accept user input → append to message history → send to LLM API → stream response back → update UI. The "intelligence" comes from the model; the engineering is state management, streaming, error handling, and UI — all things covered in this course.',
      prompt: 'What are the key components of a chatbot?',
      promptOutput: '1. User interface (input box + message display)\n2. Message history (state management)\n3. AI model (processes messages, generates responses)\n4. API layer (connects UI to model)\n5. Memory/context (maintains conversation flow)',
      takeaway: 'A chatbot is a full-stack application — UI, state, API, and AI woven together with the fundamentals you are learning.',
    },
    'ai-fine-tuning': {
      hook: 'Fine-tuning is how you take a general AI model and specialize it for your specific task — like training a generalist doctor to become a surgeon.',
      how: 'Fine-tuning starts with a pre-trained model and continues training it on a smaller, focused dataset. You provide examples of the input/output pairs you want: customer support conversations, legal document analysis, or code in a specific framework. The model adjusts its weights to get better at your specific task while retaining its general abilities.',
      prompt: 'When should you fine-tune a model vs just use prompting?',
      promptOutput: 'Use prompting first — it is faster, cheaper, and often sufficient. Fine-tune when:\n1. Prompting cannot achieve the quality you need\n2. You need consistent output format\n3. You have a large dataset of examples\n4. You want to reduce token usage (shorter prompts)',
      takeaway: 'Fine-tuning is a power tool — reach for it when prompting hits its limits, not before.',
    },
  };

  let content = $derived(aiContent[topicSlug]);
</script>

{#if content}
<div class="space-y-6">
  <!-- Hook -->
  <div class="rounded-xl border-2 border-violet-200 bg-violet-50 p-5">
    <p class="text-lg font-medium text-slate-800">{@html content.hook}</p>
  </div>

  <!-- How AI uses this concept -->
  <div>
    <h3 class="mb-2 text-lg font-bold text-slate-800">How AI Uses This</h3>
    <p class="text-slate-600">{@html content.how}</p>
  </div>

  <!-- Interactive prompt example -->
  <div>
    <h3 class="mb-3 text-lg font-bold text-slate-800">Try This Prompt</h3>
    <div class="space-y-3">
      <div class="rounded-lg border border-violet-200 bg-white p-4">
        <p class="mb-1 text-xs font-semibold uppercase tracking-wider text-violet-500">Prompt</p>
        <p class="text-sm font-medium text-slate-800">{content.prompt}</p>
      </div>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p class="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">AI Response</p>
        <pre class="whitespace-pre-wrap font-mono text-sm text-slate-700">{content.promptOutput}</pre>
      </div>
    </div>
  </div>

  <!-- Takeaway -->
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-5">
    <p class="text-sm font-semibold text-slate-500">Takeaway</p>
    <p class="mt-1 font-medium text-slate-800">{content.takeaway}</p>
  </div>

  <div>
    <button onclick={oncomplete} class="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-violet-700 active:scale-95">
      Got it
    </button>
  </div>
</div>
{:else}
<div class="py-12 text-center">
  <p class="text-slate-500">AI content coming soon for this topic.</p>
</div>
{/if}
