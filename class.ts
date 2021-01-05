import { HasEmail, HasPhoneNumber } from "./interfaces";

export class Contact implements HasEmail {
  name: string
  email: string
  constructor(name:string, email:string) {
    this.email = email
    this.name = name
  }
}

// this is a little verbose, so typescript has a shortcut for it called PARAMETERS PROPERTIES

// Access modifier keywords
// public - everyone
// protected - me and subclasses
// private - only me

// by adding these key words like bellow we are basically creating the same setup as above.

class ParamPropContact implements HasEmail {
  constructor(public name: string, public email: string = 'no email') {
    // nothing needed
  }
}

const x = new ParamPropContact('natalya', 'oi@oi')
x.name
x.email


// Class fields can have initializers (defaults)

class OtherContact implements HasEmail, HasPhoneNumber {
  protected age: number = 0
  private password: string
  constructor(
    public name: string,
    public email: string,
    public phone: number,
    public address: string
  ) {
    this.age = 35
    this.password = Math.round(Math.random() * 1e14).toString(32)
  }
}