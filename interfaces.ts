
export interface HasEmail {
  name: string,
  email: string
}

export interface HasPhoneNumber {
  name: string,
  phone: number
}


export interface HasPhoneNumber {
  address: string
}

const a: HasPhoneNumber = {
  name: 'oi',
  phone: 121212,
  // interfaces with same names are merged!
  address: ''
}

//interfaces are kind of like functions

//type alias are sorted out eagerly and interfaces are sorted out lazily.


type NumVal = 1 | 2 | 3 | NumArr
type NumArr = NumVal[]

// let numbers: NumVal = []
const ww: NumVal = [1,2,3,3, [1,2,3,3,3]]

// type NumVal = 1 | 2 | 3 | NumArr
// interface NumArr extends Array<NumVal> {}
