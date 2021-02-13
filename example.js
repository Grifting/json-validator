let validator = require('./validator')

// Example 1 generalized

let raw1 = {
  a: 'string-value', // string
  b: 0,              // number
  c: true,           // boolean
  d: undefined,      // undefined
  e: null,           // object
  f: [],             // object
  g: {},             // object
  h: () => {}       // function
}

let defaults1 = {
  a: {
    required: true, // required (boolean of required) is by default true
    type: 'string', // type (string of type) is by default required to be specified
    validate: (input) => { return true }, // validate (validate of function) is by default not required
    default: 'a' // default (object) is by default required when specifing object data
  }
}

// takes raw json,
// takes default template
// and optional boolean if unspecified params in raw remove else include
let result1 = validator(raw1, defaults1, true)

console.log(result1)

// Example 2 use case

let raw2 = {
  name: 'Kevin',
  age: 21
}

let defaults2 = {
  name: {
    type: 'string',
    default: 'no_name_provided'
  },
  age: {
    type: 'number',
    validate: (age) => { return age > 0 },
    default: 'no_age_provided'
  }
}

let result2 = validator(raw2, defaults2)

console.log(result2)
