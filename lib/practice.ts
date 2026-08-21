import type { SkillLevel } from "./types";

export type PracticeMcq = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type SkillVideo = {
  title: string;
  channel: string;
  url: string;
  duration: string;
};

/** Curated learn videos — shown when the skill is weak / major gap / needs practice. */
export const skillVideos: Record<string, SkillVideo[]> = {
  variables: [
    { title: "Variables in Python — clear basics", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=kqtD5dpn9C8", duration: "12 min" },
    { title: "JavaScript variables (let, const)", channel: "Traversy Media", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c", duration: "18 min" },
  ],
  types: [
    { title: "Data types explained", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=W6NZfCO5SIk", duration: "15 min" },
  ],
  functions: [
    { title: "Functions crash course", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=PkZNo7MFNFg", duration: "20 min" },
  ],
  params: [
    { title: "Parameters vs arguments", channel: "Web Dev Simplified", url: "https://www.youtube.com/watch?v=X0ipw1k7ygQ", duration: "8 min" },
  ],
  conditions: [
    { title: "If / else & comparisons", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=1S8SBICZL3k", duration: "10 min" },
  ],
  loops: [
    { title: "For & while loops", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=K8ct-OA6-7Y", duration: "14 min" },
  ],
  "loop-logic": [
    { title: "Loop control & off-by-one", channel: "CS Dojo", url: "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ", duration: "12 min" },
  ],
  "nested-loops": [
    { title: "Nested loops visualized", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=wxds6MAtUQ0", duration: "9 min" },
  ],
  "html-structure": [
    { title: "HTML structure full intro", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=kUMe1FH4CHE", duration: "22 min" },
  ],
  semantics: [
    { title: "Semantic HTML matters", channel: "Web Dev Simplified", url: "https://www.youtube.com/watch?v=kGW8Al_cga4", duration: "11 min" },
  ],
  "css-selectors": [
    { title: "CSS selectors deep dive", channel: "Kevin Powell", url: "https://www.youtube.com/watch?v=l1mER1bV0N0", duration: "16 min" },
  ],
  "box-model": [
    { title: "CSS box model explained", channel: "Kevin Powell", url: "https://www.youtube.com/watch?v=rGD9QSsOQhk", duration: "10 min" },
  ],
  layout: [
    { title: "Flexbox in 15 minutes", channel: "Web Dev Simplified", url: "https://www.youtube.com/watch?v=fYq5PXgSsbE", duration: "15 min" },
  ],
  responsive: [
    { title: "Responsive design basics", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=srvUrASNj0s", duration: "18 min" },
  ],
  select: [
    { title: "SQL SELECT tutorial", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=HXV3zeQukqQ", duration: "20 min" },
  ],
  where: [
    { title: "SQL WHERE filters", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=7S_tz1z_5bA", duration: "12 min" },
  ],
  joins: [
    { title: "SQL JOINs explained", channel: "Luke Barousse", url: "https://www.youtube.com/watch?v=9yeOJ0ZCTJA", duration: "14 min" },
  ],
  "inner-join": [
    { title: "INNER JOIN vs LEFT JOIN", channel: "Database Star", url: "https://www.youtube.com/watch?v=Yh4iVuvMXIg", duration: "10 min" },
  ],
  aggregates: [
    { title: "COUNT SUM AVG in SQL", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=HXV3zeQukqQ", duration: "15 min" },
  ],
  "group-by": [
    { title: "GROUP BY & HAVING", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=7S_tz1z_5bA", duration: "12 min" },
  ],
  arrays: [
    { title: "Arrays data structure", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=QJNwK2uJygs", duration: "16 min" },
  ],
  indexing: [
    { title: "Zero-based indexing & bugs", channel: "CS Dojo", url: "https://www.youtube.com/watch?v=bum_19loj9A", duration: "8 min" },
  ],
  stacks: [
    { title: "Stacks (LIFO) explained", channel: "mycodeschool", url: "https://www.youtube.com/watch?v=F1F2imiOJfk", duration: "12 min" },
  ],
  queues: [
    { title: "Queues (FIFO) explained", channel: "mycodeschool", url: "https://www.youtube.com/watch?v=XuCbpw6Bj1U", duration: "10 min" },
  ],
  complexity: [
    { title: "Big-O notation intro", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=Mo4vesaut8g", duration: "18 min" },
  ],
  traversal: [
    { title: "Traversing data structures", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=RBSGKlAvoiM", duration: "14 min" },
  ],
  commits: [
    { title: "Git commits for beginners", channel: "Traversy Media", url: "https://www.youtube.com/watch?v=SWYqp7iY_Tc", duration: "15 min" },
  ],
  staging: [
    { title: "Staging area explained", channel: "The Net Ninja", url: "https://www.youtube.com/watch?v=3BBYDF8YuIQ", duration: "8 min" },
  ],
  branches: [
    { title: "Git branches visualized", channel: "Fireship", url: "https://www.youtube.com/watch?v=e2IbNHi4uCI", duration: "9 min" },
  ],
  merge: [
    { title: "Merging branches in Git", channel: "Traversy Media", url: "https://www.youtube.com/watch?v=SWYqp7iY_Tc", duration: "12 min" },
  ],
  conflicts: [
    { title: "Fix merge conflicts", channel: "The Net Ninja", url: "https://www.youtube.com/watch?v=JtIX3HJKw4Q", duration: "10 min" },
  ],
  remote: [
    { title: "git push & pull", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=RGOj5yH7evk", duration: "14 min" },
  ],
};

export const practiceMcqs: Record<string, PracticeMcq[]> = {
  variables: [
    { id: "pv1", prompt: "After a=1; a=a+4; what is a?", options: ["1", "4", "5", "14"], correctIndex: 2, explanation: "Reassignment replaces a with 5." },
    { id: "pv2", prompt: "Which creates a reassignable JS binding?", options: ["const", "let", "static", "final"], correctIndex: 1, explanation: "let can be reassigned; const cannot." },
    { id: "pv3", prompt: "x = x is primarily about:", options: ["Loops", "Storing/updating a value", "CSS", "SQL joins"], correctIndex: 1, explanation: "Variables hold and update values." },
    { id: "pv4", prompt: "Printing a variable shows:", options: ["Its name only", "Its current value", "Always 0", "The file path"], correctIndex: 1, explanation: "Output uses the stored value." },
  ],
  types: [
    { id: "pt1", prompt: "'7' is usually a:", options: ["number", "string", "boolean", "array"], correctIndex: 1, explanation: "Quotes make a string." },
    { id: "pt2", prompt: "int('10') in Python yields:", options: ["'10'", "10", "None", "Error always"], correctIndex: 1, explanation: "Parses numeric string to int." },
    { id: "pt3", prompt: "true/false values are:", options: ["strings", "booleans", "floats only", "null"], correctIndex: 1, explanation: "Boolean type." },
    { id: "pt4", prompt: "typeof 42 in JS is:", options: ["string", "number", "object", "int"], correctIndex: 1, explanation: "Numbers are typeof number." },
  ],
  functions: [
    { id: "pf1", prompt: "A function without return in Python yields:", options: ["0", "None", "Error", "''"], correctIndex: 1, explanation: "Implicit None." },
    { id: "pf2", prompt: "Functions exist mainly to:", options: ["Style CSS", "Reuse logic", "Create tables", "Push remotes"], correctIndex: 1, explanation: "Reusable blocks of code." },
    { id: "pf3", prompt: "Calling f() runs:", options: ["The function body", "Only imports", "Git merge", "SQL"], correctIndex: 0, explanation: "Invocation executes the body." },
    { id: "pf4", prompt: "return sends a value:", options: ["To CSS", "Back to the caller", "To the DOM only", "Nowhere"], correctIndex: 1, explanation: "Caller receives the result." },
  ],
  params: [
    { id: "pp1", prompt: "In def f(n):, n is a:", options: ["global lock", "parameter", "branch", "selector"], correctIndex: 1, explanation: "Parameters receive arguments." },
    { id: "pp2", prompt: "f(5) binds 5 to:", options: ["A random var", "The first parameter", "CSS id", "HEAD"], correctIndex: 1, explanation: "Positional args map in order." },
    { id: "pp3", prompt: "Unused parameters:", options: ["Cannot exist", "Still exist but unused", "Crash always", "Delete files"], correctIndex: 1, explanation: "They can be ignored in the body." },
    { id: "pp4", prompt: "Default parameters apply when:", options: ["Always", "Arg is omitted", "On push", "Never"], correctIndex: 1, explanation: "Defaults fill missing args." },
  ],
  conditions: [
    { id: "pc1", prompt: "Is 5 > 5 true?", options: ["yes", "no", "maybe", "error"], correctIndex: 1, explanation: "Strict > excludes equality." },
    { id: "pc2", prompt: "Boundary inclusive check uses:", options: [">", ">=", "!!", "??"], correctIndex: 1, explanation: ">= includes the edge." },
    { id: "pc3", prompt: "else runs when:", options: ["if was true", "if was false", "always", "never"], correctIndex: 1, explanation: "else is the false branch." },
    { id: "pc4", prompt: "n % 2 === 0 tests:", options: ["odd", "even", "negative", "string"], correctIndex: 1, explanation: "Remainder 0 → even." },
  ],
  loops: [
    { id: "pl1", prompt: "for typically:", options: ["Runs once", "Repeats while condition holds", "Deletes DB", "Merges git"], correctIndex: 1, explanation: "Iteration construct." },
    { id: "pl2", prompt: "range(3) yields how many values?", options: ["2", "3", "4", "0"], correctIndex: 1, explanation: "0,1,2." },
    { id: "pl3", prompt: "Infinite loops often miss:", options: ["An update/exit", "CSS", "A remote", "A join"], correctIndex: 0, explanation: "Condition never becomes false." },
    { id: "pl4", prompt: "while checks condition:", options: ["Only once at end", "Before each iteration", "Never", "In CSS"], correctIndex: 1, explanation: "Pre-test loop." },
  ],
  "loop-logic": [
    { id: "pll1", prompt: "range(1,4) includes 4?", options: ["yes", "no"], correctIndex: 1, explanation: "Stop is exclusive." },
    { id: "pll2", prompt: "i < n with i from 0 runs:", options: ["n times", "n+1 times", "n-1", "0"], correctIndex: 0, explanation: "0..n-1 → n iterations." },
    { id: "pll3", prompt: "Off-by-one often comes from:", options: ["i <= n on 0..n-1", "Using print", "Git pull", "Flexbox"], correctIndex: 0, explanation: "Last index is n-1." },
    { id: "pll4", prompt: "Loop update step is needed to:", options: ["Style text", "Reach termination", "Create tables", "Name branches"], correctIndex: 1, explanation: "Progress toward exit." },
  ],
  "nested-loops": [
    { id: "pn1", prompt: "Outer 2 × inner 3 =", options: ["5", "6", "23", "1"], correctIndex: 1, explanation: "Multiply iterations." },
    { id: "pn2", prompt: "Inner loop restarts each outer pass?", options: ["yes", "no"], correctIndex: 0, explanation: "Yes, full inner run each time." },
    { id: "pn3", prompt: "Nested loops are often:", options: ["O(1)", "O(n²) when both ~n", "O(log n) always", "O(0)"], correctIndex: 1, explanation: "n×n growth." },
    { id: "pn4", prompt: "Best mental model:", options: ["Add counts", "Multiply counts", "Divide counts", "Ignore inner"], correctIndex: 1, explanation: "Cartesian passes." },
  ],
  "html-structure": [
    { id: "ph1", prompt: "Visible content belongs in:", options: ["<head>", "<body>", "<meta>", "<link>"], correctIndex: 1, explanation: "body holds page content." },
    { id: "ph2", prompt: "Valid: div inside p?", options: ["yes", "no"], correctIndex: 1, explanation: "Invalid nesting." },
    { id: "ph3", prompt: "html root usually wraps:", options: ["Only CSS", "head and body", "Only scripts", "Only images"], correctIndex: 1, explanation: "Document skeleton." },
    { id: "ph4", prompt: "External CSS uses:", options: ["<link rel=stylesheet>", "<js>", "<nav>", "<sql>"], correctIndex: 0, explanation: "link stylesheet." },
  ],
  semantics: [
    { id: "ps1", prompt: "Navigation links best in:", options: ["<div>", "<nav>", "<span>", "<b>"], correctIndex: 1, explanation: "nav is semantic." },
    { id: "ps2", prompt: "Main page title heading:", options: ["<h1>", "<h6>", "<p>", "<i>"], correctIndex: 0, explanation: "h1 for primary heading." },
    { id: "ps3", prompt: "Semantics help:", options: ["Only colors", "Accessibility & meaning", "Git only", "Big-O"], correctIndex: 1, explanation: "Meaningful structure." },
    { id: "ps4", prompt: "<article> is good for:", options: ["A self-contained post", "Only pixels", "Remotes", "Stacks"], correctIndex: 0, explanation: "Independent content." },
  ],
  "css-selectors": [
    { id: "pcs1", prompt: "Class selector starts with:", options: [".", "#", "@", "%"], correctIndex: 0, explanation: "Dot = class." },
    { id: "pcs2", prompt: "Id selector starts with:", options: [".", "#", "*", "&"], correctIndex: 1, explanation: "Hash = id." },
    { id: "pcs3", prompt: ".card targets:", options: ["id card", "class card", "tag card", "remote"], correctIndex: 1, explanation: "Class selector." },
    { id: "pcs4", prompt: "p span targets spans:", options: ["Anywhere", "Inside p", "Only body", "In head"], correctIndex: 1, explanation: "Descendant combinator." },
  ],
  "box-model": [
    { id: "pb1", prompt: "Padding is:", options: ["Outside border", "Inside border", "A git command", "A join"], correctIndex: 1, explanation: "Inner spacing." },
    { id: "pb2", prompt: "Margin is:", options: ["Inside content", "Outside border", "Font only", "Null"], correctIndex: 1, explanation: "Outer spacing." },
    { id: "pb3", prompt: "border-box width includes:", options: ["Only content", "Content+padding+border", "Only margin", "Z-index"], correctIndex: 1, explanation: "border-box model." },
    { id: "pb4", prompt: "200 + pad 10*2 + border 1*2 (content-box) =", options: ["200", "220", "222", "211"], correctIndex: 2, explanation: "222 total." },
  ],
  layout: [
    { id: "ply1", prompt: "justify-content affects:", options: ["Main axis", "Font files", "SQL", "Commits"], correctIndex: 0, explanation: "Main-axis distribution." },
    { id: "ply2", prompt: "CSS Grid is:", options: ["1D only", "2D rows+cols", "Git only", "A queue"], correctIndex: 1, explanation: "Two-dimensional." },
    { id: "ply3", prompt: "display:flex enables:", options: ["Flex layout", "Only floats forever", "INNER JOIN", "Big-O"], correctIndex: 0, explanation: "Flex formatting context." },
    { id: "ply4", prompt: "flex-direction:column main axis is:", options: ["Horizontal", "Vertical", "None", "Circular"], correctIndex: 1, explanation: "Vertical stacking." },
  ],
  responsive: [
    { id: "pr1", prompt: "max-width:600px targets:", options: ["≥600", "≤600", "Exactly 1200", "Print only"], correctIndex: 1, explanation: "Up to 600px." },
    { id: "pr2", prompt: "Fluid layouts prefer:", options: ["Only fixed px", "%/rem + breakpoints", "Tables only", "Absolute everywhere"], correctIndex: 1, explanation: "Relative units." },
    { id: "pr3", prompt: "Breakpoints change styles by:", options: ["Viewport size", "Git branch", "SQL count", "Stack depth"], correctIndex: 0, explanation: "Media queries." },
    { id: "pr4", prompt: "Mobile-first often uses:", options: ["min-width queries", "No CSS", "Only floats", "Force push"], correctIndex: 0, explanation: "Enhance as screen grows." },
  ],
  select: [
    { id: "sel1", prompt: "Read rows with:", options: ["GET", "SELECT", "PUSH", "FLEX"], correctIndex: 1, explanation: "SQL SELECT." },
    { id: "sel2", prompt: "SELECT * means:", options: ["No columns", "All columns", "Delete rows", "Merge"], correctIndex: 1, explanation: "Every column." },
    { id: "sel3", prompt: "FROM names the:", options: ["CSS file", "Table", "Branch", "Stack"], correctIndex: 1, explanation: "Source table." },
    { id: "sel4", prompt: "ORDER BY salary DESC:", options: ["Low first", "High first", "Random", "Groups"], correctIndex: 1, explanation: "Descending." },
  ],
  where: [
    { id: "w1", prompt: "Row filters use:", options: ["HAVING always", "WHERE", "GROUP only", "PUSH"], correctIndex: 1, explanation: "WHERE before groups." },
    { id: "w2", prompt: "AND means:", options: ["Either", "Both", "Neither", "Sort"], correctIndex: 1, explanation: "All conditions true." },
    { id: "w3", prompt: "LIKE 'A%' matches:", options: ["Ends with A", "Starts with A", "Contains only %", "Null"], correctIndex: 1, explanation: "Prefix match." },
    { id: "w4", prompt: "WHERE cannot use:", options: ["age > 18", "city='X'", "COUNT(*) directly on groups", "active=1"], correctIndex: 2, explanation: "Aggregates → HAVING." },
  ],
  joins: [
    { id: "j1", prompt: "JOIN combines:", options: ["CSS files", "Tables", "Branches only", "Pixels"], correctIndex: 1, explanation: "Related tables." },
    { id: "j2", prompt: "Keys compared in:", options: ["ON", "ORDER", "LIMIT", "HTML"], correctIndex: 0, explanation: "ON clause." },
    { id: "j3", prompt: "LEFT JOIN keeps:", options: ["Only matches", "All left rows", "No rows", "Only right"], correctIndex: 1, explanation: "Preserves left." },
    { id: "j4", prompt: "users.id = orders.user_id is a:", options: ["Media query", "Join condition", "Flex rule", "Commit"], correctIndex: 1, explanation: "FK relationship." },
  ],
  "inner-join": [
    { id: "ij1", prompt: "INNER JOIN returns:", options: ["Unmatched left too", "Matching rows only", "All right always", "CSS"], correctIndex: 1, explanation: "Matches only." },
    { id: "ij2", prompt: "No match in INNER JOIN →", options: ["Row with nulls kept", "Row dropped", "Error always", "New branch"], correctIndex: 1, explanation: "Dropped." },
    { id: "ij3", prompt: "INNER vs LEFT: LEFT keeps", options: ["Unmatched left", "Nothing", "Only CSS", "Stacks"], correctIndex: 0, explanation: "Left preserved." },
    { id: "ij4", prompt: "Join needs:", options: ["A key relationship", "A flexbox", "A remote", "Big-O"], correctIndex: 0, explanation: "Keys." },
  ],
  aggregates: [
    { id: "ag1", prompt: "COUNT(*) counts:", options: ["Columns only", "Rows", "Indexes only", "Remotes"], correctIndex: 1, explanation: "Row tally." },
    { id: "ag2", prompt: "SUM adds:", options: ["Strings as CSS", "Numeric values", "Branches", "Padding"], correctIndex: 1, explanation: "Numeric total." },
    { id: "ag3", prompt: "AVG computes:", options: ["Mean", "Median always", "Mode only", "Git SHAs"], correctIndex: 0, explanation: "Average." },
    { id: "ag4", prompt: "Aggregates often pair with:", options: ["GROUP BY", "flex-wrap", "pop()", "h1"], correctIndex: 0, explanation: "Grouping." },
  ],
  "group-by": [
    { id: "gb1", prompt: "GROUP BY creates:", options: ["CSS grids", "Buckets of rows", "Stacks", "Remotes"], correctIndex: 1, explanation: "Groups." },
    { id: "gb2", prompt: "Filter groups with COUNT use:", options: ["WHERE", "HAVING", "FLEX", "POP"], correctIndex: 1, explanation: "HAVING." },
    { id: "gb3", prompt: "Non-aggregated SELECT cols must be in:", options: ["GROUP BY", "margin", "stash", "nav"], correctIndex: 0, explanation: "SQL rule." },
    { id: "gb4", prompt: "HAVING runs:", options: ["Before grouping", "After aggregation", "In browser only", "Never"], correctIndex: 1, explanation: "Post-aggregate." },
  ],
  arrays: [
    { id: "ar1", prompt: "First index usually:", options: ["1", "0", "-1", "n"], correctIndex: 1, explanation: "Zero-based." },
    { id: "ar2", prompt: "arr[i] access is typically:", options: ["O(n)", "O(1)", "O(n²)", "O(2ⁿ)"], correctIndex: 1, explanation: "Direct index." },
    { id: "ar3", prompt: "Arrays store:", options: ["Only CSS", "Ordered elements", "Only remotes", "Only SQL"], correctIndex: 1, explanation: "Sequences." },
    { id: "ar4", prompt: "Length 5 last index:", options: ["5", "4", "0", "6"], correctIndex: 1, explanation: "n-1." },
  ],
  indexing: [
    { id: "ix1", prompt: "i <= n on length n is:", options: ["Safe", "Often OOB", "Required", "CSS"], correctIndex: 1, explanation: "Off-by-one." },
    { id: "ix2", prompt: "Valid indices length 3:", options: ["0,1,2", "1,2,3", "0..3", "2,3,4"], correctIndex: 0, explanation: "0..2." },
    { id: "ix3", prompt: "Index answers 'where' in a:", options: ["Sequence", "Remote only", "Padding", "Media query"], correctIndex: 0, explanation: "Position." },
    { id: "ix4", prompt: "Negative index support depends on:", options: ["Language", "Always universal", "Git only", "SQL only"], correctIndex: 0, explanation: "Varies by language." },
  ],
  stacks: [
    { id: "st1", prompt: "Stack order:", options: ["FIFO", "LIFO", "Random", "Sorted"], correctIndex: 1, explanation: "LIFO." },
    { id: "st2", prompt: "pop removes from:", options: ["Front of queue", "Top", "Middle", "Remote"], correctIndex: 1, explanation: "Top." },
    { id: "st3", prompt: "Undo history ≈", options: ["Queue", "Stack", "Grid", "JOIN"], correctIndex: 1, explanation: "Last action first." },
    { id: "st4", prompt: "push adds to:", options: ["Bottom always", "Top", "SQL", "CSS"], correctIndex: 1, explanation: "Top of stack." },
  ],
  queues: [
    { id: "qu1", prompt: "Queue order:", options: ["LIFO", "FIFO", "LRU only", "DFS"], correctIndex: 1, explanation: "FIFO." },
    { id: "qu2", prompt: "dequeue removes:", options: ["Newest", "Front/oldest", "Random", "CSS"], correctIndex: 1, explanation: "Front." },
    { id: "qu3", prompt: "Print jobs ≈", options: ["Stack", "Queue", "Hash only", "h1"], correctIndex: 1, explanation: "First in first out." },
    { id: "qu4", prompt: "enqueue adds at:", options: ["Front", "Back", "Index 0 only", "HEAD"], correctIndex: 1, explanation: "Rear." },
  ],
  complexity: [
    { id: "cx1", prompt: "Nested n×n loops ≈", options: ["O(n)", "O(n²)", "O(1)", "O(log n)"], correctIndex: 1, explanation: "Quadratic." },
    { id: "cx2", prompt: "Binary search ≈", options: ["O(n)", "O(n²)", "O(log n)", "O(2ⁿ)"], correctIndex: 2, explanation: "Halving." },
    { id: "cx3", prompt: "Big-O describes:", options: ["Git remotes", "Growth vs input size", "Padding", "Color"], correctIndex: 1, explanation: "Asymptotic cost." },
    { id: "cx4", prompt: "Single pass over n items ≈", options: ["O(1)", "O(n)", "O(n²)", "O(n!)"], correctIndex: 1, explanation: "Linear." },
  ],
  traversal: [
    { id: "tr1", prompt: "Visit each array item once ≈", options: ["O(1)", "O(n)", "O(n²)", "O(log n)"], correctIndex: 1, explanation: "Linear scan." },
    { id: "tr2", prompt: "Loop 0..n-1 uses:", options: ["i <= n", "i < n", "i == n", "i > n"], correctIndex: 1, explanation: "i < n." },
    { id: "tr3", prompt: "Traversal means:", options: ["Skipping all nodes", "Walking elements systematically", "Only merging", "Only styling"], correctIndex: 1, explanation: "Systematic visit." },
    { id: "tr4", prompt: "Double-counting is a:", options: ["Feature", "Traversal bug risk", "Required join", "Flex property"], correctIndex: 1, explanation: "Visit once carefully." },
  ],
  commits: [
    { id: "cm1", prompt: "A commit is a:", options: ["Temp undo only", "Snapshot + message", "CSS rule", "SQL table"], correctIndex: 1, explanation: "History snapshot." },
    { id: "cm2", prompt: "git log shows:", options: ["Only CSS", "Commit history", "Only staging empty", "Flex"], correctIndex: 1, explanation: "History." },
    { id: "cm3", prompt: "Good messages describe:", options: ["Random chars", "Why/what changed", "Only emojis", "Padding"], correctIndex: 1, explanation: "Clarity." },
    { id: "cm4", prompt: "Commits live in:", options: ["Browser cache only", "Repo history", "SQL HAVING", "Box model"], correctIndex: 1, explanation: "Git history." },
  ],
  staging: [
    { id: "sg1", prompt: "git add prepares for:", options: ["Push CSS", "Next commit", "DROP TABLE", "Flex"], correctIndex: 1, explanation: "Staging." },
    { id: "sg2", prompt: "git status shows:", options: ["Only remotes", "Staged vs unstaged", "Only Big-O", "Only nav"], correctIndex: 1, explanation: "Working tree state." },
    { id: "sg3", prompt: "Unstaged changes:", options: ["Always in commit", "Stay out until add", "Delete remotes", "Join tables"], correctIndex: 1, explanation: "Need staging." },
    { id: "sg4", prompt: "Unstage commonly with:", options: ["git restore --staged", "git drop db", "flex:1", "SELECT *"], correctIndex: 0, explanation: "Unstage path." },
  ],
  branches: [
    { id: "br1", prompt: "A branch is a:", options: ["Full GitHub clone always", "Pointer to commits", "CSS grid", "Queue"], correctIndex: 1, explanation: "Movable pointer." },
    { id: "br2", prompt: "Switch with:", options: ["git switch/checkout", "git sql", "display:flex", "HAVING"], correctIndex: 0, explanation: "Change HEAD." },
    { id: "br3", prompt: "Branches let you:", options: ["Only delete CSS", "Work in parallel lines", "Skip commits forever", "Avoid remotes always"], correctIndex: 1, explanation: "Parallel work." },
    { id: "br4", prompt: "git branch lists:", options: ["SQL tables", "Local branches", "Flex items", "Pixels"], correctIndex: 1, explanation: "Branch names." },
  ],
  merge: [
    { id: "mg1", prompt: "git merge applies into:", options: ["Random commit", "Current branch", "Only CSS", "Only remote tags"], correctIndex: 1, explanation: "Current branch." },
    { id: "mg2", prompt: "Merge combines:", options: ["Histories", "Padding", "Only SELECT", "Stacks only"], correctIndex: 0, explanation: "Integrate histories." },
    { id: "mg3", prompt: "Before merging check:", options: ["Current branch", "Only font", "Only AVG", "Only h1"], correctIndex: 0, explanation: "Know destination." },
    { id: "mg4", prompt: "Successful merge creates:", options: ["Always conflict", "Combined history", "Deleted .git", "SQL view"], correctIndex: 1, explanation: "Integrated commits." },
  ],
  conflicts: [
    { id: "cf1", prompt: "Conflicts happen when:", options: ["Edits overlap", "Repo is private", "Using HTTPS", "Using flex"], correctIndex: 0, explanation: "Same region changed." },
    { id: "cf2", prompt: "Markers look like:", options: ["<<<<< ===== >>>>>", "TODO only", "SELECT", "O(n)"], correctIndex: 0, explanation: "Conflict markers." },
    { id: "cf3", prompt: "After fixing you should:", options: ["Stage & commit", "Delete .git", "Only pull forever", "Ignore"], correctIndex: 0, explanation: "Complete merge." },
    { id: "cf4", prompt: "Unresolved conflicts mean:", options: ["Merge unfinished", "CSS done", "SQL indexed", "Stack empty"], correctIndex: 0, explanation: "Still merging." },
  ],
  remote: [
    { id: "rm1", prompt: "git push updates:", options: ["Only local stash", "Remote", "CSS box", "HAVING"], correctIndex: 1, explanation: "Publish commits." },
    { id: "rm2", prompt: "git pull:", options: ["Fetches & integrates", "Deletes repo", "Only styles", "Only pops"], correctIndex: 0, explanation: "Sync down." },
    { id: "rm3", prompt: "git fetch alone:", options: ["Always merges", "Updates remote-tracking refs", "Drops tables", "Flexes"], correctIndex: 1, explanation: "No merge yet." },
    { id: "rm4", prompt: "origin usually means:", options: ["Default remote", "CSS id", "SQL schema", "Stack top"], correctIndex: 0, explanation: "Common remote name." },
  ],
};

export function needsVideo(level?: SkillLevel) {
  return level === "major_gap" || level === "weak" || level === "needs_practice";
}
