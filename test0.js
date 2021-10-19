let Validator = require('./validator')

let input = {
  username: 'Max',
  age: 19,
  surname: 'Maxi',
  lastname: 'Eichenauer',
  country: 'Germany',
  province: undefined,
  city: undefined,
  gender: 'Male',
}

let template = {
  username: {
    type: 'string',
    required: true,
    validate: (a) => { return a.length >= 3 }
  },
  age: {
    type: 'number',
    validate: (a) => { return a > 18 && a < 100 },
    required: true
  },
  surname: {
    type: 'string'
  },
  lastname: {
    type: 'string'
  },
  country: {
    type: 'string'
  },
  province: {
    type: 'string'
  },
  city: {
    type: 'string'
  },
  browser: {
    type: 'string'
  },
  zodiac: {
    type: 'string',
    required: true
  }
}

console.log(new Validator(input, template).validation)
