let Validator = require('./validator')

console.log(new Validator({
  age: 16
}, {
  age: {
    type: 'number',
    default: 'some default',
    validate: (a) => { return a > 18 && a < 100 },
    required: true
  }
}).validation)
