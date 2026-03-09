1. What is the difference between var, let, and const?

Answer:
Var-
a. Function-scoped or global if declared outside a function. Not block-scoped.
b. Variables declared with var are hoisted to the top of their function or global scope. They are initialized with undefined.
c. You can reassign the value.
d. You can declare the same variable again in the same scope.

let-
a. Block-scoped only available inside { } where it is defined.
b. Variables are hoisted but not initialized. You cannot access them before declaration.
c. You can reassign the value.
d. You cannot declare the same variable in the same scope.

const-
a. Block-scoped same as let.
b. Hoisted but not initialized.
c. You cannot reassign a const variable.
d. You cannot declare the same variable in the same scope.
e. If the const is an object or array, the contents can be changed, but you cannot reassign the variable itself.

2. What is the spread operator (...)?

Answer: The spread operator in JavaScript is a syntax that expands an iterable (like an array, string, or object) into individual elements. It's very versatile and commonly used for copying, merging, or passing values.

3. What is the difference between map(), filter(), and forEach()?

Answer: 
  a. map():-
        * Creates a new array by transforming each element using a callback function.
        * Return new array of same length as original.
        * When you want to modify/transform each element and store the result.

  b. filter():-
        * Creates a new array containing only the elements that satisfy a condition.
        * Return new array with filtered elements.
        * When you want to select certain elements from an array.

  c. forEach():-
        * Executes a provided function for each element in the array.
        * Return undefined - it does not create a new array.
        * When you just want to perform side effects, like logging or updating something outside the array.



4. What is an arrow function?

Answer: An arrow function in JavaScript is a shorter, more concise way to write a function. It was introduced in ES6 and has some special behavior with the this keyword.

5. What are template literals?

Answer: Template literals in JavaScript are a modern way to create strings, introduced in ES6, which allow interpolation, multi-line strings, and embedded expressions. They use backticks (`) instead of single ' or double " quotes.