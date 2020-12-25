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