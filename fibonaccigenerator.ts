// function* sequence() {
//   let lastResult = 0
//   while(true){
//     lastResult = yield lastResult + 5
//     console.log(`lastresult ${lastResult}`)
//   }
// }

// let mike = {
//   [Symbol.iterator]: function*() {
//     yield 'M'
//     yield 'N'
//     yield 'O'
//   }
// }

// for (let n of mike) {
//   console.log(n)
// }

export function* getFibSequence(): IterableIterator<number> {
  let a = 1
  let b = 0

  while(true) {
    let nextValue = a + b
    yield nextValue
    a = b
    b = nextValue
  }
}
