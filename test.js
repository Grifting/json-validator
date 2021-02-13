let validator = require('./validator')

// Tests are designed to test correct input validation
// Default templates are not validated for missing specifications

// Test 1 Check for object => empty validation

let raw1 = undefined

let defaults1 = {
  a: {
    type: 'string',
    default: 'some default'
  }
}

let results1 = validator(raw1, defaults1)

console.log(results1)

// Test 2 Correct type => use type

let raw2 = {
  a: 'some string'
}

let defaults2 = {
  a: {
    type: 'string',
    default: 'some default'
  }
}

let results2 = validator(raw2, defaults2)

console.log(results2)

// Test 3 Missmatch type => use default

let raw3 = {
  a: 1
}

let defaults3 = {
  a: {
    type: 'string',
    default: 'some default'
  }
}

let results3 = validator(raw3, defaults3)

console.log(results3)
