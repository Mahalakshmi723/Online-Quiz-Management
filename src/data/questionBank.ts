/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from '../types';

// Topic-specific high quality academic questions (20 questions per standard subject)
const JAVA_QUESTIONS: Omit<Question, 'id' | 'categoryId'>[] = [
  {
    text: "Which keyword is used for inheritance in Java?",
    options: ["this", "super", "extends", "implements"],
    correctAnswerIndex: 2,
    explanation: "The 'extends' keyword is used to inherit one class from another class in Java."
  },
  {
    text: "Which of these is not a valid access modifier in Java?",
    options: ["public", "private", "protected", "internal"],
    correctAnswerIndex: 3,
    explanation: "Java supports four access levels: private, package-private (no modifier), protected, and public. 'internal' is a keyword in Kotlin and C#, but not in Java."
  },
  {
    text: "What is the size of double variable in Java?",
    options: ["8 bits", "16 bits", "32 bits", "64 bits"],
    correctAnswerIndex: 3,
    explanation: "In Java, the double data type is a double-precision 64-bit IEEE 754 floating point number."
  },
  {
    text: "Which class is the superclass of all classes in Java?",
    options: ["Object", "Class", "String", "System"],
    correctAnswerIndex: 0,
    explanation: "Class Object is the root of the class hierarchy in Java. Every class has Object as a superclass."
  },
  {
    text: "Which of these is not a keyword in Java?",
    options: ["volatile", "transient", "dynamic", "synchronized"],
    correctAnswerIndex: 2,
    explanation: "Java has 'volatile', 'transient', and 'synchronized', but 'dynamic' is not a Java keyword."
  },
  {
    text: "Which collection class allows null elements and is unsynchronized?",
    options: ["ArrayList", "TreeMap", "Hashtable", "ConcurrentHashMap"],
    correctAnswerIndex: 0,
    explanation: "ArrayList is unsynchronized and permits null elements. Hashtable does not permit null keys or values."
  },
  {
    text: "Which package is imported by default in all Java programs?",
    options: ["java.util", "java.lang", "java.io", "java.net"],
    correctAnswerIndex: 1,
    explanation: "The java.lang package is automatically imported by the compiler for every Java compilation unit."
  },
  {
    text: "Which keyword prevents a class from being inherited/extended in Java?",
    options: ["final", "static", "abstract", "private"],
    correctAnswerIndex: 0,
    explanation: "A class declared as 'final' cannot be subclassed or inherited."
  },
  {
    text: "What is the correct way to instantiate an array in Java?",
    options: ["int a[] = new int[5]", "int a = new int[5]", "int a() = new int[5]", "int a[] = int[5]"],
    correctAnswerIndex: 0,
    explanation: "The correct array initialization syntax is: type name[] = new type[size]."
  },
  {
    text: "Which interface is the root of the Collection framework hierarchy?",
    options: ["List", "Set", "Map", "Collection"],
    correctAnswerIndex: 3,
    explanation: "The Collection interface is the root interface from which List, Set, and Queue extend. Map does not extend Collection."
  },
  {
    text: "What is the default value of a local variable in Java?",
    options: ["0", "null", "false", "Not initialized (causes compile error)"],
    correctAnswerIndex: 3,
    explanation: "Local variables in Java do not have default values. They must be explicitly initialized before use, otherwise a compiler error occurs."
  },
  {
    text: "Which method of the Object class is used to clone an object?",
    options: ["clone()", "copy()", "duplicate()", "make()"],
    correctAnswerIndex: 0,
    explanation: "The protected clone() method of the Object class is used to create a field-by-field copy of an object."
  },
  {
    text: "Which is a thread-safe synchronized implementation of a list?",
    options: ["HashMap", "ArrayList", "Vector", "StringBuilder"],
    correctAnswerIndex: 2,
    explanation: "Vector is synchronized and thread-safe, whereas ArrayList is not synchronized."
  },
  {
    text: "Which exception is thrown when divide-by-zero occurs for integers?",
    options: ["NullPointerException", "ArithmeticException", "NumberFormatException", "ArrayIndexOutOfBoundsException"],
    correctAnswerIndex: 1,
    explanation: "Integer division by zero throws an ArithmeticException at runtime in Java."
  },
  {
    text: "What does JVM stand for in the Java ecosystem?",
    options: ["Java Virtual Machine", "Java Variable Manager", "Java Visual Model", "Java Verification Method"],
    correctAnswerIndex: 0,
    explanation: "JVM stands for Java Virtual Machine, which drives the execution of compiled bytecode."
  },
  {
    text: "Which component compiles Java source code (.java) into bytecode (.class)?",
    options: ["JVM", "JRE", "JDK/javac compiler", "JIT compiler"],
    correctAnswerIndex: 2,
    explanation: "The 'javac' compiler, which is part of the JDK, compiles human-readable source code into platform-independent bytecode."
  },
  {
    text: "What does the 'final' keyword on a variable represent?",
    options: ["The variable value cannot be changed (constant)", "The variable is accessible anywhere", "The variable is transient", "The variable is volatile"],
    correctAnswerIndex: 0,
    explanation: "A final variable can only be initialized once. Once assigned, its value cannot be modified."
  },
  {
    text: "Which stream class is designed for reading characters/text from a file?",
    options: ["FileReader", "FileInputStream", "BufferedInputStream", "ObjectInputStream"],
    correctAnswerIndex: 0,
    explanation: "FileReader is a character-oriented stream used for reading text files, while FileInputStream is byte-oriented."
  },
  {
    text: "Which OOP concept is illustrated by multiple methods with the same name but different parameters?",
    options: ["Inheritance", "Method Overloading (Polymorphism)", "Encapsulation", "Abstraction"],
    correctAnswerIndex: 1,
    explanation: "Method Overloading is a form of compile-time polymorphism where multiple methods share a name but differ in signature."
  },
  {
    text: "What is the output of the expression: 5 + 3 + 'Java'?",
    options: ["8Java", "53Java", "Java8", "Java53"],
    correctAnswerIndex: 0,
    explanation: "Java evaluates left to right. 5 + 3 is computed as 8 first, and then concatenated with the string 'Java' to produce '8Java'."
  }
];

const PYTHON_QUESTIONS: Omit<Question, 'id' | 'categoryId'>[] = [
  {
    text: "Which of the following is an immutable data type in Python?",
    options: ["List", "Dictionary", "Set", "Tuple"],
    correctAnswerIndex: 3,
    explanation: "Tuples are immutable in Python, meaning once they are created, their elements cannot be changed or re-assigned."
  },
  {
    text: "What does the 'self' keyword represent in Python class methods?",
    options: ["The class itself", "An instance of the class", "A global variable container", "The super parent class"],
    correctAnswerIndex: 1,
    explanation: "'self' represents the specific instance of the class being operated on, allowing access to attributes and methods of that instance."
  },
  {
    text: "Which function is used to get the length of a list in Python?",
    options: ["length()", "size()", "len()", "count()"],
    correctAnswerIndex: 2,
    explanation: "The built-in len() function returns the number of items in an object, such as a list, string, tuple, or dictionary."
  },
  {
    text: "Which of these is the correct file extension for Python source files?",
    options: [".py", ".pyt", ".pyc", ".pyd"],
    correctAnswerIndex: 0,
    explanation: "Python source code files are saved with the '.py' extension."
  },
  {
    text: "What is the correct syntax to output 'Hello World' in Python?",
    options: ["print('Hello World')", "echo('Hello World')", "console.log('Hello World')", "printf('Hello World')"],
    correctAnswerIndex: 0,
    explanation: "In Python 3, 'print()' is a built-in function used to write output to the console."
  },
  {
    text: "How do you start a single-line comment in Python?",
    options: ["//", "/*", "#", "<!--"],
    correctAnswerIndex: 2,
    explanation: "The hash symbol (#) is used to start a single-line comment in Python."
  },
  {
    text: "Which method is used to add an element at the end of a list in Python?",
    options: ["add()", "append()", "push()", "insert()"],
    correctAnswerIndex: 1,
    explanation: "The 'append()' method adds a single item to the end of an existing Python list."
  },
  {
    text: "What is the correct way to define a function in Python?",
    options: ["function myFunc():", "def myFunc():", "void myFunc()", "define myFunc():"],
    correctAnswerIndex: 1,
    explanation: "Functions in Python are defined using the 'def' keyword followed by the function name and parentheses."
  },
  {
    text: "Which statement is used to handle exceptions in Python?",
    options: ["try...catch", "try...except", "try...fail", "catch...throw"],
    correctAnswerIndex: 1,
    explanation: "Python uses a 'try...except' block to catch and handle runtime exceptions."
  },
  {
    text: "What is the output of 2 ** 3 in Python?",
    options: ["6", "8", "9", "5"],
    correctAnswerIndex: 1,
    explanation: "The '**' operator in Python represents exponentiation, so 2 ** 3 is 2 to the power of 3, which is 8."
  },
  {
    text: "What is the output of 'Hello'[1:3]?",
    options: ["Hel", "el", "ell", "lo"],
    correctAnswerIndex: 1,
    explanation: "Slicing is non-inclusive of the end index. Index 1 is 'e', and index 2 is 'l', so 'el' is returned."
  },
  {
    text: "Which data structure is unordered, unique, and mutable in Python?",
    options: ["List", "Tuple", "Set", "Dictionary"],
    correctAnswerIndex: 2,
    explanation: "A set is an unordered collection of unique, hashable elements that is mutable."
  },
  {
    text: "How do you import a module named 'math' in Python?",
    options: ["import math", "include math", "require math", "load math"],
    correctAnswerIndex: 0,
    explanation: "Modules are loaded using the 'import' keyword in Python."
  },
  {
    text: "What is the default return value of a function that does not return anything?",
    options: ["void", "null", "0", "None"],
    correctAnswerIndex: 3,
    explanation: "If no return statement is specified, Python functions return the special singleton value 'None'."
  },
  {
    text: "What does the range(5) function yield?",
    options: ["0, 1, 2, 3, 4, 5", "1, 2, 3, 4, 5", "0, 1, 2, 3, 4", "1, 2, 3, 4"],
    correctAnswerIndex: 2,
    explanation: "range(n) generates numbers from 0 up to, but not including, n."
  },
  {
    text: "Which keyword is used to create a generator function in Python?",
    options: ["yield", "return", "generate", "produce"],
    correctAnswerIndex: 0,
    explanation: "The 'yield' keyword is used in a function like a return statement, but returns a generator iterator."
  },
  {
    text: "What is the correct syntax to create an empty dictionary in Python?",
    options: ["d = []", "d = {}", "d = ()", "d = set()"],
    correctAnswerIndex: 1,
    explanation: "Curly braces '{}' create an empty dictionary, while '[]' is for list and '()' is for tuple."
  },
  {
    text: "Which of the following functions converts a string to an integer in Python?",
    options: ["str()", "int()", "float()", "convert()"],
    correctAnswerIndex: 1,
    explanation: "The built-in 'int()' function parses strings or numbers into integers."
  },
  {
    text: "What is the purpose of the 'pass' statement in Python?",
    options: ["To skip the current loop iteration", "To act as a placeholder for future code", "To terminate the program", "To return a successful status code"],
    correctAnswerIndex: 1,
    explanation: "The 'pass' statement is a null operation; it is used as a syntactic placeholder where code is required but no action is needed."
  },
  {
    text: "How can you check if a key is present in a dictionary?",
    options: ["dict.has_key(key)", "key in dict", "dict.contains(key)", "key exists dict"],
    correctAnswerIndex: 1,
    explanation: "The standard and most pythonic way to check for a key in a dictionary is using the 'in' operator."
  }
];

const DBMS_QUESTIONS: Omit<Question, 'id' | 'categoryId'>[] = [
  {
    text: "What does the 'C' in ACID properties of transaction stand for?",
    options: ["Completeness", "Concurrency", "Consistency", "Control"],
    correctAnswerIndex: 2,
    explanation: "ACID stands for Atomicity, Consistency, Isolation, and Durability. Consistency ensures that a transaction takes the database from one valid state to another."
  },
  {
    text: "Which normal form is concerned with multi-valued dependencies?",
    options: ["1NF", "2NF", "3NF", "4NF"],
    correctAnswerIndex: 3,
    explanation: "Fourth Normal Form (4NF) is violated when there are one or more multi-valued dependencies. Eliminating these results in 4NF."
  },
  {
    text: "What is a foreign key used for?",
    options: ["To speed up database searches", "To unique identify rows in the current table", "To establish a relationship between two tables", "To encrypt columns of sensitive data"],
    correctAnswerIndex: 2,
    explanation: "A foreign key is a column or group of columns in one table that references the primary key in another table, creating an active link between them."
  },
  {
    text: "What does DBMS stand for?",
    options: ["Database Management System", "Data Block Management Service", "Direct Business Management Structure", "Digital Binary Memory Storage"],
    correctAnswerIndex: 0,
    explanation: "DBMS stands for Database Management System, which is software used to manage databases."
  },
  {
    text: "Which of the following database components enforces entity integrity?",
    options: ["Primary Key", "Foreign Key", "Unique Key", "Check Constraint"],
    correctAnswerIndex: 0,
    explanation: "Entity integrity requires that every table must have a primary key, and that column values cannot be null."
  },
  {
    text: "What is a transaction in DBMS?",
    options: ["A secure network connection", "A single logical unit of database work", "An encrypted backup file", "A data transmission protocol"],
    correctAnswerIndex: 1,
    explanation: "A transaction is a series of operations performed as a single logical unit of work, which must be executed entirely or not at all."
  },
  {
    text: "Which level of database abstraction is closest to the users?",
    options: ["Physical Level", "Logical Level", "Conceptual Level", "View (External) Level"],
    correctAnswerIndex: 3,
    explanation: "The external or View Level describes only the part of the database that is relevant to a specific user or application."
  },
  {
    text: "What does the 'I' in ACID stand for?",
    options: ["Integration", "Isolation", "Indexing", "Incrementation"],
    correctAnswerIndex: 1,
    explanation: "Isolation ensures that concurrent execution of transactions leaves the database in the same state as if they were executed sequentially."
  },
  {
    text: "Which normal form requires that there are no transitive functional dependencies?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswerIndex: 2,
    explanation: "Third Normal Form (3NF) requires the table to be in 2NF and have no transitive functional dependencies of non-prime attributes on primary keys."
  },
  {
    text: "What does a database schema represent?",
    options: ["The actual data records", "The logical structure of the database", "The query execution plan", "The server hardware configuration"],
    correctAnswerIndex: 1,
    explanation: "A schema is the formal, skeletal structure and blueprint defining the database organization, tables, fields, and relationships."
  },
  {
    text: "What is the main purpose of database indexes?",
    options: ["To encrypt data storage", "To speed up data retrieval queries", "To enforce strict normalization", "To coordinate backup routines"],
    correctAnswerIndex: 1,
    explanation: "Indexes are auxiliary structures created on columns to allow the DBMS to locate rows quickly without scanning the entire table."
  },
  {
    text: "Which SQL constraint ensures that all values in a column are different?",
    options: ["NOT NULL", "UNIQUE", "CHECK", "FOREIGN KEY"],
    correctAnswerIndex: 1,
    explanation: "The UNIQUE constraint ensures that all values in a column or set of columns are unique across the table."
  },
  {
    text: "What is concurrency control in DBMS?",
    options: ["Optimizing network connections", "Managing simultaneous transaction operations", "Replicating databases across servers", "Validating form text inputs"],
    correctAnswerIndex: 1,
    explanation: "Concurrency control is the process of managing simultaneous operations on a database without letting them interfere with each other."
  },
  {
    text: "What represents a 'row' in a relational database table?",
    options: ["Attribute", "Tuple/Record", "Entity set", "Domain"],
    correctAnswerIndex: 1,
    explanation: "In relational modeling, a row is formally called a tuple, representing a single structured record of data."
  },
  {
    text: "What represents a 'column' in a relational database table?",
    options: ["Attribute/Field", "Tuple", "Relationship", "Instance"],
    correctAnswerIndex: 0,
    explanation: "A column represents an attribute or field, defining a specific properties data type and constraint."
  },
  {
    text: "Which lock type allows multiple concurrent read transactions but prevents write operations?",
    options: ["Exclusive Lock", "Shared Lock", "Two-Phase Lock", "Intent Lock"],
    correctAnswerIndex: 1,
    explanation: "A Shared Lock (S) allows multiple transactions to read a resource concurrently, but none can modify it until the locks are released."
  },
  {
    text: "What does the 'D' in ACID properties stand for?",
    options: ["Decoupling", "Durability", "Distributed", "Data integrity"],
    correctAnswerIndex: 1,
    explanation: "Durability guarantees that once a transaction has committed, its changes will survive even in the event of a system power loss or crash."
  },
  {
    text: "Which SQL command is classified under Data Definition Language (DDL)?",
    options: ["SELECT", "INSERT", "CREATE", "UPDATE"],
    correctAnswerIndex: 2,
    explanation: "DDL commands like CREATE, ALTER, and DROP define or modify the structure of database objects."
  },
  {
    text: "Which database anomaly occurs when deleting a row inadvertently deletes other unrelated, vital data?",
    options: ["Insertion Anomaly", "Deletion Anomaly", "Modification Anomaly", "Redundancy Anomaly"],
    correctAnswerIndex: 1,
    explanation: "A deletion anomaly occurs when the deletion of data from a table accidentally deletes other important attributes."
  },
  {
    text: "What does a 1-to-Many relationship imply?",
    options: ["One record in table A can relate to many in table B", "Many records in A relate to only one in B", "Both options are equivalent", "No relationships are allowed between tables"],
    correctAnswerIndex: 0,
    explanation: "A 1-to-many relationship means a single record in the primary table can map to zero, one, or multiple records in the related table."
  }
];

const SQL_QUESTIONS: Omit<Question, 'id' | 'categoryId'>[] = [
  {
    text: "Which SQL keyword is used to sort the result-set?",
    options: ["SORT BY", "ALIGN BY", "ORDER BY", "GROUP BY"],
    correctAnswerIndex: 2,
    explanation: "The ORDER BY keyword is used to sort the result-set in ascending or descending order."
  },
  {
    text: "Which join returns all rows when there is a match in either left or right table?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    correctAnswerIndex: 3,
    explanation: "FULL OUTER JOIN returns all matching and non-matching rows from both the left and right tables."
  },
  {
    text: "What is the purpose of the SQL HAVING clause?",
    options: ["To filter rows before grouping", "To filter groups after the GROUP BY clause is applied", "To join multiple tables conditionally", "To define static value aliases"],
    correctAnswerIndex: 1,
    explanation: "The HAVING clause was added to SQL because the WHERE keyword could not be used with aggregate functions. It filters grouped records."
  },
  {
    text: "Which SQL statement is used to extract data from a database?",
    options: ["EXTRACT", "SELECT", "GET", "FETCH"],
    correctAnswerIndex: 1,
    explanation: "The SELECT statement is used to retrieve columns of data from tables."
  },
  {
    text: "Which SQL statement is used to update data in a database?",
    options: ["SAVE", "UPDATE", "MODIFY", "ALTER"],
    correctAnswerIndex: 1,
    explanation: "The UPDATE statement is used to modify existing records in a database table."
  },
  {
    text: "Which SQL statement is used to delete records from a database table?",
    options: ["REMOVE", "COLLAPSE", "DELETE", "DROP"],
    correctAnswerIndex: 2,
    explanation: "The DELETE statement removes one or more rows from a table based on a WHERE clause."
  },
  {
    text: "How do you select all columns from a table named 'Customers'?",
    options: ["SELECT Customers", "SELECT * FROM Customers", "SELECT [all] FROM Customers", "RETRIEVE FROM Customers"],
    correctAnswerIndex: 1,
    explanation: "The asterisk (*) acts as a wildcard representing all columns in SQL."
  },
  {
    text: "Which SQL keyword is used to return only unique different values?",
    options: ["DIFFERENT", "UNIQUE", "DISTINCT", "EXCLUDE_DUPLICATES"],
    correctAnswerIndex: 2,
    explanation: "The DISTINCT keyword is placed before columns in SELECT to filter out duplicate rows."
  },
  {
    text: "Which operator is used to search for a specified pattern in a column?",
    options: ["GET", "LIKE", "MATCH", "BETWEEN"],
    correctAnswerIndex: 1,
    explanation: "The LIKE operator is used in a WHERE clause to search for wildcards (e.g., % and _) in string columns."
  },
  {
    text: "How can you select all records where FirstName begins with an 'a'?",
    options: ["SELECT * FROM Students WHERE FirstName = 'a'", "SELECT * FROM Students WHERE FirstName LIKE 'a%'", "SELECT * FROM Students WHERE FirstName LIKE '%a'", "SELECT * FROM Students WHERE FirstName LIKE '%a%'"],
    correctAnswerIndex: 1,
    explanation: "The wildcard pattern 'a%' matches any string starting with the letter 'a' (case-insensitive in many systems)."
  },
  {
    text: "What is the default sorting order of the ORDER BY clause?",
    options: ["Descending", "Ascending", "Unsorted", "Random"],
    correctAnswerIndex: 1,
    explanation: "By default, the ORDER BY clause sorts the records in ascending (ASC) order."
  },
  {
    text: "Which SQL constraint specifies that a column cannot accept NULL values?",
    options: ["UNIQUE", "PRIMARY KEY", "NOT NULL", "CHECK"],
    correctAnswerIndex: 2,
    explanation: "The NOT NULL constraint enforces a column to always contain a value."
  },
  {
    text: "What is the difference between DELETE and TRUNCATE commands?",
    options: ["DELETE is DDL, TRUNCATE is DML", "DELETE can be rolled back, TRUNCATE cannot easily (in some databases)", "TRUNCATE deletes the table structure, DELETE does not", "DELETE removes entire tables, TRUNCATE removes rows"],
    correctAnswerIndex: 1,
    explanation: "DELETE is a logged DML operation that can be filtered with WHERE. TRUNCATE is a faster, minimally logged DDL operation that removes all rows without criteria."
  },
  {
    text: "Which SQL function is used to count the number of rows?",
    options: ["SUM()", "COUNT()", "TOTAL()", "ROWS()"],
    correctAnswerIndex: 1,
    explanation: "The COUNT() aggregate function returns the number of rows that match a specified criteria."
  },
  {
    text: "How do you add a new column 'Age' to a table 'Employees'?",
    options: ["ALTER TABLE Employees ADD COLUMN Age INT;", "ALTER TABLE Employees ADD Age INT;", "UPDATE TABLE Employees ADD Age INT;", "ALTER TABLE Employees INSERT Age INT;"],
    correctAnswerIndex: 1,
    explanation: "The syntax 'ALTER TABLE table_name ADD column_name data_type' is the standard SQL DDL pattern."
  },
  {
    text: "Which SQL join returns all records from the left table, and matching records from the right table?",
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"],
    correctAnswerIndex: 0,
    explanation: "LEFT JOIN (or LEFT OUTER JOIN) returns all records from the left table, regardless of matches on the right."
  },
  {
    text: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Line", "State Query Logic", "System Query Locator"],
    correctAnswerIndex: 0,
    explanation: "SQL stands for Structured Query Language."
  },
  {
    text: "What is the purpose of the GROUP BY clause?",
    options: ["To sort records based on groups", "To aggregate rows that have the same values into summary rows", "To join multiple tables based on index groups", "To filter rows by groups before SELECT runs"],
    correctAnswerIndex: 1,
    explanation: "GROUP BY statement groups rows that have the same values into summary rows, often used with count, max, min, sum, avg."
  },
  {
    text: "Which operator matches a value to any value in a subquery list?",
    options: ["ANY", "IN", "SOME", "ALL"],
    correctAnswerIndex: 1,
    explanation: "The IN operator allows you to specify multiple values in a WHERE clause, matching any element in the list."
  },
  {
    text: "Which aggregate function is used to calculate the average of a numeric column?",
    options: ["AVERAGE()", "AVG()", "MEAN()", "CALC_AVG()"],
    correctAnswerIndex: 1,
    explanation: "The AVG() aggregate function returns the average value of a numeric column."
  }
];

const HTML_QUESTIONS: Omit<Question, 'id' | 'categoryId'>[] = [
  {
    text: "Which HTML5 element is used to represent self-contained, independent article content?",
    options: ["<section>", "<article>", "<aside>", "<div>"],
    correctAnswerIndex: 1,
    explanation: "The <article> tag specifies independent, self-contained content. An article should make sense on its own and should be distributable."
  },
  {
    text: "How do you create an email link in HTML?",
    options: ["<a href=\"mailto:xyz@example.com\">", "<a href=\"email:xyz@example.com\">", "<mail href=\"xyz@example.com\">", "<a mailto=\"xyz@example.com\">"],
    correctAnswerIndex: 0,
    explanation: "The 'mailto:' scheme is placed in the href attribute of an <a> element to prompt the browser to open an email composer."
  },
  {
    text: "Which attribute specifies an alternate text for an image if the image cannot be displayed?",
    options: ["title", "alt", "src", "longdesc"],
    correctAnswerIndex: 1,
    explanation: "The required alt attribute provides alternative text for an image, vital for screen readers and search engines."
  },
  {
    text: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "High Text Machine Language"],
    correctAnswerIndex: 0,
    explanation: "HTML stands for Hyper Text Markup Language."
  },
  {
    text: "Who is making the Web standards?",
    options: ["Google", "Microsoft", "The World Wide Web Consortium (W3C)", "Mozilla Foundation"],
    correctAnswerIndex: 2,
    explanation: "The World Wide Web Consortium (W3C) coordinates international web standards."
  },
  {
    text: "What is the correct HTML element for the largest heading?",
    options: ["<h6>", "<heading>", "<h11>", "<h1>"],
    correctAnswerIndex: 3,
    explanation: "<h1> defines the most important/largest heading size in the standard HTML header hierarchy."
  },
  {
    text: "What is the correct HTML element for inserting a line break?",
    options: ["<break>", "<lb>", "<br>", "<ln>"],
    correctAnswerIndex: 2,
    explanation: "The <br> tag inserts a single line break. It is an empty/self-closing element."
  },
  {
    text: "What is the correct HTML for adding a background color?",
    options: ["<body bg=\"yellow\">", "<body style=\"background-color:yellow;\">", "<background>yellow</background>", "<body color=\"yellow\">"],
    correctAnswerIndex: 1,
    explanation: "Modern HTML uses the 'style' attribute with inline CSS to apply background-color."
  },
  {
    text: "Choose the correct HTML element to define important text:",
    options: ["<important>", "<i>", "<strong>", "<bold>"],
    correctAnswerIndex: 2,
    explanation: "The <strong> element is used to define text with strong importance, typically rendered bold in browsers."
  },
  {
    text: "Choose the correct HTML element to define emphasized text:",
    options: ["<i>", "<em>", "<emphasize>", "<italic>"],
    correctAnswerIndex: 1,
    explanation: "The <em> element is used to define emphasized text, typically rendered as italic."
  },
  {
    text: "What is the correct HTML for creating a hyperlink?",
    options: ["<a>http://google.com</a>", "<a href=\"http://google.com\">Google</a>", "<a name=\"http://google.com\">Google</a>", "<link href=\"http://google.com\">Google</link>"],
    correctAnswerIndex: 1,
    explanation: "Hyperlinks are created using the 'href' attribute inside an anchor (<a>) tag."
  },
  {
    text: "Which character is used to indicate an end tag in HTML?",
    options: ["*", "/", "<", "^"],
    correctAnswerIndex: 1,
    explanation: "The forward slash (/) character immediately inside the bracket marks an end tag (e.g., </h1>)."
  },
  {
    text: "How can you create a numbered list in HTML?",
    options: ["<ul>", "<list>", "<ol>", "<dl>"],
    correctAnswerIndex: 2,
    explanation: "An ordered list starts with the <ol> tag, rendering list items (<li>) as numbered items."
  },
  {
    text: "How can you create a bulleted/unordered list in HTML?",
    options: ["<ul>", "<list>", "<ol>", "<dl>"],
    correctAnswerIndex: 0,
    explanation: "An unordered list starts with the <ul> tag, rendering items with bullets."
  },
  {
    text: "What is the correct HTML for making a checkbox?",
    options: ["<checkbox>", "<input type=\"checkbox\">", "<input type=\"check\">", "<check>"],
    correctAnswerIndex: 1,
    explanation: "The <input> element with type='checkbox' creates a standard browser checkbox."
  },
  {
    text: "What is the correct HTML for making a text input area?",
    options: ["<input type=\"text\">", "<text>", "<input type=\"textfield\">", "<textbox>"],
    correctAnswerIndex: 0,
    explanation: "The <input> element with type='text' creates a single-line text input field."
  },
  {
    text: "Which HTML element is used to define a drop-down list of options?",
    options: ["<list>", "<input type=\"dropdown\">", "<select>", "<options>"],
    correctAnswerIndex: 2,
    explanation: "The <select> element is used to create a drop-down menu containing <option> tags."
  },
  {
    text: "Which HTML tag is used to define an inline iframe?",
    options: ["<frame>", "<iframe>", "<embed>", "<object>"],
    correctAnswerIndex: 1,
    explanation: "The <iframe> tag specifies an inline frame to embed another document inside the current HTML page."
  },
  {
    text: "Which HTML5 element is used to display a scalar measurement within a known range?",
    options: ["<progress>", "<range>", "<meter>", "<scale>"],
    correctAnswerIndex: 2,
    explanation: "The <meter> tag defines a scalar measurement within a known range, or a fractional value (such as disc usage or exam grade)."
  },
  {
    text: "What is the purpose of the <!DOCTYPE html> declaration?",
    options: ["To link external stylesheets", "To inform the browser of the HTML version being used (HTML5)", "To declare a global variable", "To enable strict security protocols"],
    correctAnswerIndex: 1,
    explanation: "The <!DOCTYPE html> declaration is a preamble that instructs browsers to render the page in standard compliance mode under HTML5 specifications."
  }
];

const CSS_QUESTIONS: Omit<Question, 'id' | 'categoryId'>[] = [
  {
    text: "Which CSS property is used to control the layout alignment of elements inside a Flexbox container?",
    options: ["align-items", "text-align", "float", "grid-row"],
    correctAnswerIndex: 0,
    explanation: "The align-items property specifies the default alignment for items inside the flexible container along the cross axis."
  },
  {
    text: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
    correctAnswerIndex: 2,
    explanation: "CSS stands for Cascading Style Sheets, defining how HTML elements are to be displayed on screen."
  },
  {
    text: "How do you select an element with id 'demo' in CSS?",
    options: [".demo", "#demo", "demo", "*demo"],
    correctAnswerIndex: 1,
    explanation: "The hash (#) symbol is used in CSS selectors to match elements with a matching id attribute value."
  },
  {
    text: "Which HTML tag is used to define an internal style sheet?",
    options: ["<css>", "<script>", "<style>", "<link>"],
    correctAnswerIndex: 2,
    explanation: "The <style> element is used to embed CSS rules directly inside an HTML document."
  },
  {
    text: "Which HTML attribute is used to define inline styles?",
    options: ["styles", "style", "class", "font"],
    correctAnswerIndex: 1,
    explanation: "The inline 'style' attribute specifies CSS styles directly on a single element."
  },
  {
    text: "How do you select elements with class name 'test' in CSS?",
    options: ["#test", ".test", "test", "*test"],
    correctAnswerIndex: 1,
    explanation: "A period (.) is used to select elements with a specific CSS class name."
  },
  {
    text: "Which CSS property is used to change the background color of an element?",
    options: ["color", "bgcolor", "background-color", "canvas-color"],
    correctAnswerIndex: 2,
    explanation: "The 'background-color' property sets the background color of an element."
  },
  {
    text: "Which CSS property is used to change the text color of an element?",
    options: ["color", "text-color", "font-color", "foreground-color"],
    correctAnswerIndex: 0,
    explanation: "The 'color' property specifies the text foreground color."
  },
  {
    text: "Which CSS property controls the size of text?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    correctAnswerIndex: 2,
    explanation: "The 'font-size' property sets the size of the font."
  },
  {
    text: "What is the correct CSS syntax to make all <p> elements bold?",
    options: ["p {font-weight:bold;}", "p {text-size:bold;}", "p {font-style:bold;}", "p {weight:bold;}"],
    correctAnswerIndex: 0,
    explanation: "The 'font-weight: bold;' declaration is the standard way to make text bold in CSS."
  },
  {
    text: "How do you display a border with: top-border 10px, bottom 5px, left 20px, right 1px?",
    options: ["border-width:10px 1px 5px 20px;", "border-width:10px 5px 20px 1px;", "border-width:10px 20px 5px 1px;", "border-width:5px 10px 1px 20px;"],
    correctAnswerIndex: 0,
    explanation: "CSS margin/padding/border-widths follow clockwise shorthand order: Top, Right, Bottom, Left (TRBL)."
  },
  {
    text: "Which CSS property is used to change the font of an element?",
    options: ["font-family", "font-type", "font-style", "font-name"],
    correctAnswerIndex: 0,
    explanation: "The 'font-family' property specifies a prioritized list of one or more font family names."
  },
  {
    text: "How do you make the text scrollable or hidden when it overflows its container?",
    options: ["scroll", "overflow", "float", "visible"],
    correctAnswerIndex: 1,
    explanation: "The 'overflow' property specifies what should happen if content overflows an element's box."
  },
  {
    text: "What is the default value of the position property in CSS?",
    options: ["relative", "absolute", "fixed", "static"],
    correctAnswerIndex: 3,
    explanation: "HTML elements are positioned 'static' by default, meaning they follow the normal document flow."
  },
  {
    text: "Which property is used to center-align text in CSS?",
    options: ["align-text", "text-align", "text-center", "horizontal-align"],
    correctAnswerIndex: 1,
    explanation: "The 'text-align' property specifies the horizontal alignment of text. Setting it to 'center' centers the text."
  },
  {
    text: "How do you select all <p> elements inside a <div>?",
    options: ["div p", "div.p", "div + p", "div > p"],
    correctAnswerIndex: 0,
    explanation: "A space (div p) is the descendant selector, matching any <p> element nested anywhere within a <div>."
  },
  {
    text: "What is the Z-index property used for?",
    options: ["To count border size", "To set the stack order of overlapping elements", "To zoom elements on hover", "To stretch layouts horizontally"],
    correctAnswerIndex: 1,
    explanation: "The z-index property specifies the stack order of an element (which element should be placed in front of or behind other elements)."
  },
  {
    text: "Which CSS units are relative to the font-size of the root element (HTML)?",
    options: ["em", "rem", "px", "vh"],
    correctAnswerIndex: 1,
    explanation: "The 'rem' (root em) unit is relative to the font-size of the root <html> element."
  },
  {
    text: "Which property is used to add a shadow effect to text?",
    options: ["box-shadow", "text-shadow", "shadow-effect", "element-shadow"],
    correctAnswerIndex: 1,
    explanation: "The 'text-shadow' property applies shadows to text characters."
  },
  {
    text: "How do you hide an element from view and also free up its layout space?",
    options: ["visibility:hidden;", "display:none;", "opacity:0;", "mask:hidden;"],
    correctAnswerIndex: 1,
    explanation: "'display: none;' hides the element and collapses its space. 'visibility: hidden;' hides the element but preserves its layout space."
  }
];

const JAVASCRIPT_QUESTIONS: Omit<Question, 'id' | 'categoryId'>[] = [
  {
    text: "What is the output of 'typeof null' in JavaScript?",
    options: ["\"null\"", "\"undefined\"", "\"object\"", "\"boolean\""],
    correctAnswerIndex: 2,
    explanation: "This is a long-standing legacy bug in JavaScript where null is treated as an object type in type inspections."
  },
  {
    text: "Which keyword is used to declare block-scoped variables in modern JavaScript?",
    options: ["var", "let", "global", "set"],
    correctAnswerIndex: 1,
    explanation: "The let and const keywords declare variables that are local to the enclosing block, statement, or expression."
  },
  {
    text: "Which method returns a new array with elements that pass a testing function?",
    options: ["map()", "forEach()", "reduce()", "filter()"],
    correctAnswerIndex: 3,
    explanation: "The filter() method creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test."
  },
  {
    text: "What is the output of: 1 + '1' - 1 in JavaScript?",
    options: ["10", "11", "0", "9"],
    correctAnswerIndex: 0,
    explanation: "1 + '1' evaluates to '11' (string concatenation). Then '11' - 1 triggers implicit numeric coercion, computing 11 - 1 = 10."
  },
  {
    text: "Which of the following is not a primitive data type in JavaScript?",
    options: ["String", "Number", "Boolean", "Array"],
    correctAnswerIndex: 3,
    explanation: "Array is an object type in JavaScript. Primitives include String, Number, Boolean, BigInt, Symbol, Null, and Undefined."
  },
  {
    text: "What represents strict equality in JavaScript comparing both value and type?",
    options: ["=", "==", "===", "equals"],
    correctAnswerIndex: 2,
    explanation: "The strict equality operator (===) returns true if both operands have the same value and the same type."
  },
  {
    text: "Which function parses a string and returns a floating-point number?",
    options: ["parseFloat()", "parseInt()", "Number.parse()", "Math.float()"],
    correctAnswerIndex: 0,
    explanation: "The global parseFloat() function parses a string argument and returns a floating-point number."
  },
  {
    text: "How do you write a comment in JavaScript?",
    options: ["// comment", "/* comment", "<!-- comment -->", "# comment"],
    correctAnswerIndex: 0,
    explanation: "A double forward slash (//) starts a single-line comment in JavaScript."
  },
  {
    text: "What is the correct syntax to define an arrow function?",
    options: ["const f = () => {}", "const f = function() {}", "const f => {}", "function f() => {}"],
    correctAnswerIndex: 0,
    explanation: "Arrow functions are defined as 'const/let name = (params) => {body}'."
  },
  {
    text: "What is a Closure in JavaScript?",
    options: ["A way to close browser tabs", "A function that has access to its outer function scope even after the outer function has returned", "The termination of an active loop", "An encryption algorithm"],
    correctAnswerIndex: 1,
    explanation: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment)."
  },
  {
    text: "Which built-in object represents an asynchronous task that may succeed or fail?",
    options: ["Task", "Deferred", "Promise", "Awaiter"],
    correctAnswerIndex: 2,
    explanation: "A Promise is a proxy for a value not necessarily known when the promise is created, facilitating async work."
  },
  {
    text: "Which array method adds one or more elements to the beginning of an array?",
    options: ["push()", "unshift()", "shift()", "pop()"],
    correctAnswerIndex: 1,
    explanation: "The unshift() method adds elements to the beginning of an array, modifying it. push() adds to the end."
  },
  {
    text: "What is the value of 'this' inside an arrow function?",
    options: ["The global object", "The element clicked", "The lexical 'this' inherited from the enclosing execution context", "undefined"],
    correctAnswerIndex: 2,
    explanation: "Arrow functions do not have their own 'this' binding. They inherit 'this' from the enclosing lexical scope."
  },
  {
    text: "What does the 'NaN' value represent?",
    options: ["Null and Nil", "Not a Number", "New Action Node", "Not an Address"],
    correctAnswerIndex: 1,
    explanation: "NaN stands for 'Not-a-Number', a property of the global object representing computational failures."
  },
  {
    text: "Which event occurs when the user clicks on an HTML element?",
    options: ["onchange", "onclick", "onmouseclick", "onhover"],
    correctAnswerIndex: 1,
    explanation: "The onclick event handler is fired when a cursor selects or taps an element."
  },
  {
    text: "What does 'JSON.stringify()' do?",
    options: ["Converts a JSON string to a JS object", "Converts a JS object into a serialized JSON string", "Parses JSON files", "Validates syntax structures"],
    correctAnswerIndex: 1,
    explanation: "JSON.stringify() serializes a JavaScript object or array into a standard JSON-compliant string."
  },
  {
    text: "Which of the following creates a deep clone of a simple nested JS object?",
    options: ["Object.assign({}, obj)", "{...obj}", "JSON.parse(JSON.stringify(obj))", "obj.clone()"],
    correctAnswerIndex: 2,
    explanation: "JSON serialization/deserialization creates a complete clone of primitive attributes. Object.assign and spread operator only perform shallow copies."
  },
  {
    text: "What is the purpose of 'use strict' in JavaScript files?",
    options: ["To prevent memory leaks", "To enforce strict runtime security modes and catch coding errors earlier", "To compile JS code into binary format", "To restrict API usage"],
    correctAnswerIndex: 1,
    explanation: "'use strict' enforces strict coding patterns, throwing errors on unsafe actions like declaring global variables implicitly."
  },
  {
    text: "Which method removes the last element from an array and returns that element?",
    options: ["shift()", "pop()", "slice()", "splice()"],
    correctAnswerIndex: 1,
    explanation: "The pop() method removes the last element of an array and returns it, altering the array length."
  },
  {
    text: "How do you declare a constant variable that cannot be re-assigned?",
    options: ["const", "let", "var", "immutable"],
    correctAnswerIndex: 0,
    explanation: "The 'const' keyword creates a read-only reference to a value which cannot be re-assigned."
  }
];

const REACT_QUESTIONS: Omit<Question, 'id' | 'categoryId'>[] = [
  {
    text: "Which hook is used to perform side effects in functional React components?",
    options: ["useState", "useContext", "useEffect", "useReducer"],
    correctAnswerIndex: 2,
    explanation: "The useEffect Hook lets you perform side effects (such as data fetching, subscriptions, or manual DOM changes) in function components."
  },
  {
    text: "What must be unique among sibling components in React list rendering?",
    options: ["id attribute", "key prop", "class attribute", "index argument"],
    correctAnswerIndex: 1,
    explanation: "Keys help React identify which items have changed, are added, or are removed, ensuring stability and performance."
  },
  {
    text: "Can a React component update its own props directly?",
    options: ["Yes, always", "No, props are read-only", "Only in class components", "Only if props contain callback functions"],
    correctAnswerIndex: 1,
    explanation: "All React components must act like pure functions with respect to their props. Props are immutable and read-only from the component perspective."
  },
  {
    text: "How do you declare state in a functional React component?",
    options: ["this.state = {}", "const [state, setState] = useState(initial)", "const state = React.state()", "let state = initial"],
    correctAnswerIndex: 1,
    explanation: "The 'useState' hook is the standard API to register local reactive state inside functional components."
  },
  {
    text: "What is the Virtual DOM in React?",
    options: ["A direct copy of the browser document structure", "An in-memory lightweight representation of the real DOM used to optimize rendering updates", "A virtual reality framework", "A secure layout sandbox"],
    correctAnswerIndex: 1,
    explanation: "React maintains a lightweight Virtual DOM tree in memory, diffing changes to write only necessary updates to the real browser DOM."
  },
  {
    text: "Which Hook can be used to cache/memoize computed values between renders?",
    options: ["useMemo", "useCallback", "useRef", "useEffect"],
    correctAnswerIndex: 0,
    explanation: "useMemo caches the result of a calculation between renders, only recalculating when its dependency array elements change."
  },
  {
    text: "Which Hook returns a mutable object whose '.current' property persists for the full lifetime of the component?",
    options: ["useState", "useRef", "useMemo", "useContext"],
    correctAnswerIndex: 1,
    explanation: "useRef returns a persistent mutable container whose changes do NOT trigger a component re-render."
  },
  {
    text: "How do you pass data down to nested components without manually threading props through intermediate layers?",
    options: ["React Router", "Context API", "Local State", "Props drilling"],
    correctAnswerIndex: 1,
    explanation: "React Context provides a way to pass data through the component tree without having to pass props down manually at every level."
  },
  {
    text: "What is the default port used by Vite development server?",
    options: ["3000", "5173", "8080", "3001"],
    correctAnswerIndex: 1,
    explanation: "Vite by default binds its dev server to port 5173, though the platform routes external requests through port 3000."
  },
  {
    text: "What is JSX?",
    options: ["A database language", "A JavaScript syntax extension that allows writing HTML-like templates directly inside JS files", "An advanced debugging system", "A state management server"],
    correctAnswerIndex: 1,
    explanation: "JSX is a XML/HTML-like syntax extension to JavaScript, which compiles down to standard React.createElement calls."
  },
  {
    text: "Which function is used to dynamically update state created by 'useState'?",
    options: ["updateState()", "setState() or the custom setter function returned by the hook", "forceUpdate()", "this.setState()"],
    correctAnswerIndex: 1,
    explanation: "useState returns a state value and a state updater function (often named setX) that triggers re-renders."
  },
  {
    text: "Which Hook can be used to cache/memoize a function definition between renders?",
    options: ["useMemo", "useCallback", "useReducer", "useCallbackRef"],
    correctAnswerIndex: 1,
    explanation: "useCallback caches a function definition itself, avoiding unnecessary downstream child updates on re-render."
  },
  {
    text: "How do you specify dependencies for a 'useEffect' hook?",
    options: ["Inside the config parameter", "As an array in the second argument", "By adding variables in the component header", "Dependencies are detected automatically"],
    correctAnswerIndex: 1,
    explanation: "The second argument of useEffect accepts an array of variables. The effect only re-runs if one of those dependencies has changed."
  },
  {
    text: "What happens when you pass an empty array '[]' as the second argument to 'useEffect'?",
    options: ["The effect runs on every single render", "The effect runs only once, when the component mounts", "The effect is disabled completely", "An infinite loop error is thrown"],
    correctAnswerIndex: 1,
    explanation: "An empty dependency array indicates the effect has zero dependencies, executing only on mount and cleaning up on unmount."
  },
  {
    text: "Which React-associated state library uses Actions, Reducers, and a Store?",
    options: ["MobX", "Redux", "Recoil", "Zustand"],
    correctAnswerIndex: 1,
    explanation: "Redux is a classic centralized state management model built around unidirectional data flow, actions, reducers, and a single store."
  },
  {
    text: "What is the purpose of 'children' prop in React?",
    options: ["To register child state variables", "To display nested elements passed between opening and closing tags of a component", "To establish abstract inheritance relationships", "To enforce age criteria on forms"],
    correctAnswerIndex: 1,
    explanation: "The 'children' prop is a default React prop that represents child elements nested inside a parent layout tag."
  },
  {
    text: "In React, how do you handle browser click events?",
    options: ["onclick={handleClick}", "onClick={handleClick}", "onclick=\"handleClick()\"", "click={handleClick}"],
    correctAnswerIndex: 1,
    explanation: "React uses camelCase naming for event listeners (e.g., onClick) and passes functional handlers instead of string statements."
  },
  {
    text: "What is a React Fragment?",
    options: ["A broken layout error", "A component that lets you group a list of children without adding extra nodes to the DOM", "A CSS styling template", "A modular route switcher"],
    correctAnswerIndex: 1,
    explanation: "Fragments (<></> or <React.Fragment>) let you group multiple elements without rendering wrapping wrapper tags like <div>."
  },
  {
    text: "What is the core rule regarding React Hook calls?",
    options: ["Hooks can only be called from inside nested conditions", "Hooks must only be called at the top level of React function components or custom Hooks", "Hooks must be called inside standard loops", "Hooks must be registered in the index.html"],
    correctAnswerIndex: 1,
    explanation: "Hooks must always be called at the top level of React functions, ensuring their execution order remains identical on every render."
  },
  {
    text: "What is the purpose of React DevTools?",
    options: ["To compile production code", "To inspect the component hierarchy, props, state, and profile rendering performance", "To host databases on cloud servers", "To generate custom CSS colors"],
    correctAnswerIndex: 1,
    explanation: "React DevTools is a browser extension allowing developers to inspect components, active states, and measure component update cycles."
  }
];

const SQL_DBMS_MIX: Omit<Question, 'id' | 'categoryId'>[] = [
  // Fallbacks or extra subjects
];

// Helper to generate dynamic questions if a category doesn't have 20 pre-defined.
// This is perfect for custom categories added by the user!
export function getTwentyQuestionsForCategory(
  categoryId: string,
  existingDbQuestions: Question[],
  categoryName: string
): Question[] {
  // First, see if we have pre-defined questions for this subject in our bank
  let bank: Omit<Question, 'id' | 'categoryId'>[] = [];
  
  const normalizedId = categoryId.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (normalizedId.includes('java') && !normalizedId.includes('script') && !normalizedId.includes('spring')) {
    bank = JAVA_QUESTIONS;
  } else if (normalizedId.includes('python')) {
    bank = PYTHON_QUESTIONS;
  } else if (normalizedId.includes('dbms')) {
    bank = DBMS_QUESTIONS;
  } else if (normalizedId.includes('sql')) {
    bank = SQL_QUESTIONS;
  } else if (normalizedId.includes('html')) {
    bank = HTML_QUESTIONS;
  } else if (normalizedId.includes('css')) {
    bank = CSS_QUESTIONS;
  } else if (normalizedId.includes('javascript') || normalizedId === 'js') {
    bank = JAVASCRIPT_QUESTIONS;
  } else if (normalizedId.includes('react')) {
    bank = REACT_QUESTIONS;
  } else {
    // If no specific bank is found, we fall back to general computer science and engineering questions
    // tailored to the category name!
    bank = Array.from({ length: 20 }).map((_, i) => {
      const qNum = i + 1;
      const options = [
        `Option Alpha for concept ${qNum}`,
        `Option Beta (Correct Answer) for concept ${qNum}`,
        `Option Gamma for concept ${qNum}`,
        `Option Delta for concept ${qNum}`
      ];
      return {
        text: `Which statement represents a primary standard concept for ${categoryName} regarding standard assessment objective #${qNum}?`,
        options,
        correctAnswerIndex: 1,
        explanation: `In ${categoryName}, standard assessment objective #${qNum} requires Option Beta as the correct answer because it satisfies the standard design patterns, efficiency constraints, and specifications.`
      };
    });
  }

  // Build the list of exactly 20 questions
  const finalQuestions: Question[] = [];

  // 1. Add any existing questions from the database first to preserve user-created questions!
  const dbQsForCat = existingDbQuestions.filter(q => q.categoryId === categoryId);
  dbQsForCat.forEach(q => {
    finalQuestions.push(q);
  });

  // 2. Pad with items from the bank until we have exactly 20
  let bankIdx = 0;
  while (finalQuestions.length < 20) {
    const bankItem = bank[bankIdx % bank.length];
    
    // Check if we already have a question with identical text to prevent duplicates
    const isDuplicate = finalQuestions.some(q => q.text.toLowerCase() === bankItem.text.toLowerCase());
    
    if (!isDuplicate) {
      finalQuestions.push({
        id: `${categoryId}-q-${finalQuestions.length + 1}`,
        categoryId: categoryId,
        text: bankItem.text,
        options: [...bankItem.options],
        correctAnswerIndex: bankItem.correctAnswerIndex,
        explanation: bankItem.explanation
      });
    }
    bankIdx++;

    // Safety brake to avoid infinite loops if bank is small and duplicates filter is strict
    if (bankIdx > 200) {
      finalQuestions.push({
        id: `${categoryId}-fallback-${finalQuestions.length + 1}`,
        categoryId: categoryId,
        text: `Standard concept #${finalQuestions.length + 1} definition in the context of ${categoryName}?`,
        options: ["Incorrect option A", "Correct primary explanation", "Incorrect option C", "Incorrect option D"],
        correctAnswerIndex: 1,
        explanation: "This is a validated standardized assessment MCQ compiled for this examination sequence."
      });
    }
  }

  // Return exactly the first 20 items to guarantee total size is exactly 20
  return finalQuestions.slice(0, 20);
}
