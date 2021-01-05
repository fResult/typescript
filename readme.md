## TypeScript

* Typescript is a superset of JavaScript
* Developed by Microsoft
* Compiles to JavaScript for either Browser or Node
* Three parts, Language, Language Service and Compile.
* Seems to be leading the way for javascript language features

TypeScript helps your code to stay in the browsers 'hot mode'.
when the interpreter of the browser notices a function call with same arguments, same types it basically creates a assembly code version of that code, which is called 'hot code'.


### Implicty typing
```
let ar = 'x'
 ar = 4
 error cannot assign a number to type string
```

 ### Explicity typing: Annotations
 rather then let typeScript guess the type, we provide it at the variable declaration
```
 let teacherAge: number = 34
```
  ### Explicity typing: Casting

  ```
  let input = document.querySelector('#input') as HTMLInputElement;

  or
  let input <HTMLInputElement>document.querySelector('#input');
  ```
 ### Explicity typing: Function Parameters & Return
 Functions can provide type annotations for argument and return types

  ```
  function login(username: string, password: string): User {
    /* do something */
  }

  ```
  or arrow functions
```
  const login = (username:string, password: string): User => {
    /* do something */
  }
```

### Type Sytstems & Type Equivalence

```function validateInputField(input: HTMLInputElement) {
  //
}
```
 validateInputField(x)  ->  Can we regard x as a HTMLInputElement??

 * Nominal Type System (ex Java) anwers this question based on whether x is an instance of a class/type named HTMLInputField

 * Structural Type Systems only care about the shape of an object
 This is how typeScript works!

 #### Object Shapes
 When e talk about shape of an object, we're referring to the name of properties and TYPES of their values (not the value)

`
 __CAR__
  Make String
  Model String
  Year  Number
`

myCar = { make: 'Honda', model: 'accord', year: 1992, color: {#fff}}

__Note__ that there is an extra propertie and that's fine.
Extra is fine, less is not.

```
interface RGB {
  r: number,
  g: number,
  b: number
}

function oi(c: RGB) {
  return c
}

let c = {
  r: 12,
  g: 90,
  b: 0,
  cor: 'oi'
}

oi(c)  //this is ok
```

However when working with object literals, __shape__ is checked more strictly.
Excess properties in this situation are regarded as a possible bug.

```
interface RGB { r: number, g: number, b: number }

function oi(c: RGB) {
  return c
}


oi({ r: 2, g: 4, b: 5, cor: 'oi'})//
Argument of type '{ r: number; g: number; b: number; cor: string; }' is not assignable to parameter of type 'RGB'.
Object literal may only specify known properties, and 'cor' does not exist in type 'RGB'
```

### Object Shapes: Interfaces
allows us to define a structure and __refer to it by name__
* only describe de structure, they have no implementation
* they DONT compile to any JavaScript code. They are for the compile only
* DRY type definition. easier for refactoring
* interfaces are 'open' and can be extended later on.

### The any type

* allows for value of any kind
* how every mutable js value is treated
* useful as you migrate code from JS to TS
* start with making all anys explicit and then squash as many as possible
* there is aldo a __never__ type, which is compatible with NOTHING


### Js Class vs Prototype

```
Person.prototype = {
  tags: []
}

const p1 = new Person()
const p2 = new Person()
p1.tags.push('foo')
console.log(p2.tags) // ['foo']
```
Prototype is an instaciated object.
Whereas in Class each instace will have its value

```
Class Person  {
  tags =[]
}

const p1 = new Person()
const p2 = new Person()
p1.tags.push('foo')
console.log(p2.tags) // []
```

* super key word can be used to call methods on the parent class

### Classes

You can define a class like this:

```
Class Car {
  make: string
  model: string
  constructor(make: string,
              model: string) {
                this.make = make
                this.model = model
  }

  startEngine() {
    return 'VROOMM'
  }
}
```

### Enums

* Used to define a type consisting oof ordered members
* Each has a name and a value
* often we dont care about the value


````
 enum AcctType {
   Checking,
   Savings,
   Money
 }
 ````

 ### Arrays

 They work the same as JavaScript

 * Adding a type cnstraint help is keep contents consistent

 ``let nums: number[] = [1,2,3]``

 if you dont add a type when initializing an array and then later you try to push a value
 it will complaint as it will default to 'never'

 ### Tuples
 Arrays of fixed length

 * typically represent values that are related in some way

 * consumers need to know about order

 * shines with destructured assignment

```
 let dependency: [string, number]

 dependency = ['react', 16]
```

### Type Aliases

when interface isnt the best way to describe a structure
We can use the __type__ keyword  to define a type alias

```
type Color = [number, number, number]

let red: Color = [255,0,0]
```


### Rest vs Spread

Rest => 'and the rest goes here'

`let {x, ...other} = data`

other is the rest of properties in data.

Spread => 'and all the properties of this object'

`let values = { ...other, a:99, b: 100 }`

todas as propriedades do obj other sao passadas pra values, além das dias nova propriedades
a e b.


### Getters and Setters

let name = {
  first: 'michael',
  last: 'north',
  get full() {
    return `${this.first} ${this.last}
  }

  set full() {
    let [a,b]= newVal.split(/\s+/g)
    this.first = a
    this.last = b
  }
}

### Functions types

interface CLicklisteter {
  (this: Window, e: MouseEvent): void
}

### Functions: Optional Parameters

in typescripts functions parameters are not as flexible as in javascript

````
function createPost(body: string, username: string, imageUrl: URL) {}
createPost('i am a post', 'xuxu') // Got 2 argumens, expected 3.
````

So to solve this we can create a Optional Parameter

```
function createPost(body: string, username: string, imageUrl?: URL) {}
```

### Generics

* allow us to reuse code across many types, interfaces and functions
* we still get compile-time type safety
* good way to avoid Anys

```
function gimmieFive<T>(x: T): T[] {
  return [x, x, x, x, x]
}

let threes: number[] = gimmieFive(3)
let eggs: string[] = gimmueFive('egg')
```

We can specity constrains on generic types
```
  function midpoint<T extends Point2D>(p1: T, p2: T): T {

  }
```
Generics can be used with interfaces as well
```
interface IFileReader<T extends File> {
  readFile(file: T): Blob
}
```

**
 * (1) Generics allow us to parameterize types in the same way that
 * -   functions parameterize values
 */

// // param determines the value of x
```
function wrappedValue(x: any) {
  return {
    value: x
  };
}

// // type param determines the type of x
interface WrappedValue<X> {
  value: X;
}

let val: WrappedValue<string> = { value: '' };
val.value;
```
/**
 * we can name these params whatever we want, but a common convention
 * is to use capital letters starting with `T` (a C++ convention from "templates")
 */

/**
 * (2) Type parameters can have default types
 * -   just like function parameters can have default values
 */

// // for Array.prototype.filter
```
interface FilterFunction<T = any> {
  (val: T): boolean;
}

const stringFilter: FilterFunction<string> = val => typeof val === "string";
stringFilter(0); // 🚨 ERROR
stringFilter("abc"); // ✅ OK

// // can be used with any value
const truthyFilter: FilterFunction = val => val;
truthyFilter(0); // false
truthyFilter(1); // true
truthyFilter(""); // false
truthyFilter(["abc"]); // true
```
/**
 * (3) You don't have to use exactly your type parameter as an arg
 * -   things that are based on your type parameter are fine too
 */

```
function resolveOrTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // start the timeout, reject when it triggers
    const task = setTimeout(() => reject("time up!"), timeout);

    promise.then(val => {
      // cancel the timeout
      clearTimeout(task);

      // resolve with the value
      resolve(val);
    });
  });
}
resolveOrTimeout(fetch(""), 3000);
```
/**
 * (4) Type parameters can have constraints
 */
```
function arrayToDict<T extends { id: string }>(array: T[]): { [k: string]: T } {
  const out: { [k: string]: T } = {};
  array.forEach(val => {
    out[val.id] = val;
  });
  return out;
}

const myDict = arrayToDict([
  { id: "a", value: "first", lisa: "Huang" },
  { id: "b", value: "second" }
]);
```
/**
 * (5) Type parameters are associated with scopes, just like function arguments
 */
```
function startTuple<T>(a: T) {
  return function finishTuple<U>(b: U) {
    return [a, b] as [T, U];
  };
}
const myTuple = startTuple(["first"])(42);
```
/**
 * (6) When to use generics
 *
 * - Generics are necessary when we want to describe a relationship between
 * - two or more types (i.e., a function argument and return type).
 *
 * - aside from interfaces and type aliases, If a type parameter is used only once
 * - it can probably be eliminated
 */



### Access Modifier Keywords

* public - anyone can access
* protected - seld and subclasses can access
* private - self can access


### Function Overloading
* typescript allows us to have more than one function 'head', altough we're still limited to a single implementation

```
function add(x: number, y: string): number
function add(x: string, y: number, z: number): number

now the implementation:

  function add(x:number|string,
               y:number|string,
               z: number = 10): number {
    return parseInt(`${x}`, z) + parseInt(`${y}, z)
  }

if we try:
add('1', 2) the compiler will complain cause it understands that we are using the two arguments add and the types are wrong.
```

### Iterators

allows access one item from a collection at a time, keeping track of current position
the next() methid is what's used to get the next item in the sequence

```
function fibonacci() {
  let lastLast =1
  let last = 0

  return {
    next() {
      let val = last + lastLast
      if (val > 10) {
        return { done:true }
      }
      lastLast = last
      last = val
      return { value: val, done: false }
    }
  }
}

let it = fibonacci()
for (let p = it.next(); !p.done; p = it.next()) {
  console.log(p.value)
}

```

* supports iteration with a for .. of loop
* requires implementation of the Symbol.iterator method
* Array and Map already support this

```
let arr = [1, 3, 4, 5, 6]
let it = arr[Symbol.iterator]()

it.next()
//{value: 1, done: false}
it.next()
//{value: 3, done: false}
it.next()
//{value: 4, done: false}
it.next()
//{value: 5, done: false}
it.next()
//{value: 6, done: false}
it.next()
//{value: undefined, done: true}
```

### Generators

* Define their own iterative algorithm yielding eachitem in the sequence
* Use the function*() syntax
* Return a iterator
* state od the closuse is preserved bewtween .next() calls.
* Executions is PAUSED


```

function* mySequence() {
 yield 'oi'
 yield 'ola'
 yield 'legal'
 yield 'ultimo'
 console.log('asa')
}

let x = mySequence()

x.next()
Object { value: "oi", done: false }

x.next()
Object { value: "ola", done: false }

x.next()
Object { value: "legal", done: false }

x.next()
Object { value: "ultimo", done: false }

x.next()
asa debugger eval code:6:10
Object { value: undefined, done: true }
```


### Intersection & Union types

##### Intersection

-> interfaces are opened meaning that any declations of the name are merged

```
export interface HasPhoneNumber {
  name: string,
  phone: number
}

export interface HasEmail {
  name: string,
  email: string
}

let contactInfo: HasEmail | hasPhone =
  Math.random() > 0.5
  ? {
      name: 'Mike',
      phone: 321551212
    }
  :
    {
      name:'Mike',
      email:'mike@mike.com'
    }

Intersections -> it has either one value or another
```

##### Union
```
let otherContactInfo: HasEmail & HasPhoneNumber {
  //here we MUST initialize it to a shape that's assignable to HasEmail and HasPhoneNumber
  name: 'Mike',
  email:'mike@mike.uk',
  phone'5552223321'
}

```

#### Advanced types


/**
 * (1) MAPPED TYPES allow the use of an interface to transform keys into values
 */
```
interface CommunicationMethods {
  email: HasEmail;
  phone: HasPhoneNumber;
  fax: { fax: number };
}

function contact<K extends keyof CommunicationMethods>(
  method: K,
  contact: CommunicationMethods[K] // 💡turning key into value -- a *mapped type*
) {
  //...
}
contact("email", { name: "foo", email: "mike@example.com" });
contact("phone", { name: "foo", phone: 3213332222 });
contact("fax", { fax: 1231 });
````

// // we can get all values by mapping through all keys
```
type AllCommKeys = keyof CommunicationMethods;
type AllCommValues = CommunicationMethods[keyof CommunicationMethods];
```
/**
 * (2) Type queries allow us to obtain the type from a value using typeof
 */
```
const alreadyResolvedNum = Promise.resolve(4);

type ResolveType = typeof Promise.resolve;

const x: ResolveType = Promise.resolve;
x(42).then(y => y.toPrecision(2));
```
/**
 * (3) Conditional types allow for the use of a ternary operator w/ types
 * We can also extract type parameters using the _infer_ keyword
 */
```
type EventualType<T> = T extends Promise<infer S> // if T extends Promise<any>
  ? S // extract the type the promise resolves to
  : T; // otherwise just let T pass through

let a: EventualType<Promise<number>>;
let b: EventualType<number[]>;
```
//== Built-in Utility Types ==//

/**
 * (4) Partial allows us to make all properties on an object optional
 */
 ```
type MayHaveEmail = Partial<HasEmail>;
const me: MayHaveEmail = {}; // everything is optional
```
/**
 * (5) Pick allows us to select one or more properties from an object type
 */
```
type HasThen<T> = Pick<Promise<T>, "then" | "catch">;

let hasThen: HasThen<number> = Promise.resolve(4);
hasThen.then;
hasThen.catch;

type HasSomething = Pick<{a:'', b:''}, 'a'>

let y: HasSomething
```


/**
 * (6) Extract lets us obtain a subset of types that are assignable to something
 */
```
type OnlyStrings = Extract<"a" | "b" | 1 | 2, number>;
let ab:OnlyStrings = 1
```
/**
 * (7) Exclude lets us obtain a subset of types that are NOT assignable to something
 */
 ```
type NotStrings = Exclude<"a" | "b" | 1 | 2, string>;
let cd:NotStrings = 1
```
/**
 * (8) Record helps us create a type with specified property keys and the same value type
 */
 ```
type ABCPromises = Record<"a" | "b" | "c", Promise<any>>;
```
```
#### Top Types

//== TOP TYPES ==//

/**
 * (1) "Top types" are types that can hold any value. Typescript has two of them
 */

```
let myAny: any = 32;
let myUnknown: unknown = "hello, unknown";

// Note that we can do whatever we want with an any, but nothing with an unknown

myAny.foo.bar.baz;
myUnknown.foo;
```
/**
 * (2) When to use `any`
 * Anys are good for areas of our programs where we want maximum flexibility
 * Example: sometimes a Promise<any> is fine when we don't care at all about the resolved value
 */
 ```
async function logWhenResolved(p: Promise<any>) {
  const val = await p;
  console.log("Resolved to: ", val);
}
```
/**
 * (3) When to use `unknown`
 * Unknowns are good for "private" values that we don't want to expose through a public API.
 * They can still hold any value, we just must narrow the type before we're able to use it.
 *
 * We'll do htis with a type guard.
 */
```
myUnknown.split(", "); // 🚨 ERROR
```
/**
 * (4) Built-in type guards
 */

 ```
if (typeof myUnknown === "string") {
  // in here, myUnknown is of type string
  myUnknown.split(", "); // ✅ OK
}
if (myUnknown instanceof Promise) {
  // in here, myUnknown is of type Promise<any>
  myUnknown.then(x => console.log(x));
}
```
/**
 * (5) User-defined type guards
 * We can also create our own type guards, using functions that return booleans
 */

// // 💡 Note return type
```
function isHasEmail(x: any): x is HasEmail {
  return typeof x.name === "string" && typeof x.email === "string";
}

if (isHasEmail(myUnknown)) {
  // In here, myUnknown is of type HasEmail
  console.log(myUnknown.name, myUnknown.email);
}

// // my most common guard
function isDefined<T>(arg: T | undefined): arg is T {
  return typeof arg !== "undefined";
}
```

// // NEW TS 3.7: assertion-based type guards!
```
  function assertIsStringArray(arr: any[]): asserts arr is string[] {
    if (!arr) throw new Error('not an array!');
    const strings = arr.filter(i => typeof i === 'string');
    if (strings.length !== arr.length) throw new Error('not an array of strings');
  }

  const arr: (string|number)[] = ['3', 12, '21'];
  assertIsStringArray(arr);
  arr;
```
/**
 * (6) Dealing with multiple unknowns
 * -   We kind of lose some of the benefits of structural typing when using `unknown`.
 * -   Look how we can get mixed up below
 */

```
let aa: unknown = 41;
let bb: unknown = ["a", "string", "array"];
bb = aa; // 🚨 yikes
```
```
```
#### Bottom types

/== BOTTOM TYPE: never ==//

/**
 * (8) Bottom types can hold no values. TypeScript has one of these: `never`
 */

```
let n: never = 4;
```
/**
 * A common place where you'll end up with a never
 * is through narrowing exhaustively
 */

```
let x = "abc" as string | number;

if (typeof x === "string") {
  // x is a string here
  x.split(", ");
} else if (typeof x === "number") {
  // x is a number here
  x.toFixed(2);
} else {
  x
  // x is a never here
}
```
/**
 * (9) We can use this to our advantage to create exhaustive conditionals and switches
 */

```
class UnreachableError extends Error {
  constructor(val: never, message: string) {
    super(`TypeScript thought we could never end up here\n${message}`);
  }
}

let y = 4 as string | number ;

if (typeof y === "string") {
  // y is a string here
  y.split(", ");
} else if (typeof y === "number") {
  // y is a number here
  y.toFixed(2);
} else {
  throw new UnreachableError(y, "y should be a string or number");
}

//or

function assertNever(x: never): never {
  throw new Error(`Unexpected Object ${JSON.stringify(x)}`);
}
```
// always add an exausted switch!