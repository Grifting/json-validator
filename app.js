

/*
  version 1
  takes arguments
  i.e.
  let args = { a: 1 }
  let defaults = { a: 0, b: 0 }
  and fills them in if they were left out
*/
function validateV1(arguments, defaults) {
  let validated = {}

  Object.keys(defaults).forEach((key) => {
    validated[key] = arguments[key] ? arguments[key] : defaults[key]
  })

  return validated
}

/*
  version 2
  takes arguments
  i.e.
  let args = { a: 1 }
  let defaults = { a: { type: 'number', default: 0 }, b: { type: 'number', default: 0 } }
  checks if the type is matching and fills them in if they were left out
*/
function validate(arguments, defaults) {
  let validationResultNEW = {
    validated: {}, // the validated output created using defaults
    missing: [], // the missing inputs validated through fallbacks
    missmatches: {} // unknown inputs that were straight ignored
  }
  let validated = {}, missing = [], missmatches = {}, invalid = {}
  let restrains, rawInput

  // generate valid input from defaults and rawinput
  Object.keys(defaults).forEach((key) => {
    restrains = defaults[key]
    rawInput = arguments[key]

    // if its an included arg check
    // if it is the correct type and validate it
    if (rawInput !== undefined) {
      // CHECK INPUT TYPE RESTRICTION
      if (typeof rawInput === restrains.type) {

        /* START DEFAULT VALIDATION */
        if (restrains.validate !== undefined) {
          if (restrains.validate(rawInput)) {
            validated[key] = rawInput
          } else {
            let fallback = restrains.default
            validated[key] = fallback ? (typeof fallback === 'function' ? fallback(rawInput) : fallback) : 'ERR_NO_DEFAULT_PROVIDED_1'
            invalid[key] = rawInput
          }
        } else {
          validated[key] = rawInput
          console.log(restrains);
        }
        /* END DEFAULT VALIDATION */

      } else {
        let fallback = restrains.default
        invalid[key] = rawInput
        if (fallback !== undefined) {
          if (restrains.required !== undefined) {
            if (restrains.required === true) {
              validated[key] = fallback
            }
          } else {
            validated[key] = fallback
          }
        } else {
          validated[key] = 'ERR_NO_DEFAULT_PROVIDED_2'
        }
      }

    } else {
      let fallback = restrains.default
      if (fallback !== undefined) {
        if (restrains.required === false) {
          // missing input is optional can be ignored
        } else {
          validated[key] = fallback
          missing.push(key)
        }
      } else {
        validated[key] = 'ERR_NO_DEFAULT_PROVIDED_3'
        missing.push(key)
      }
    }
  })

  // collect missmatches
  Object.keys(arguments).forEach((key) => {
    if (defaults[key] === undefined) {
      missmatches[key] = arguments[key]
    }
  })

  let validationResult = {
    validated: validated
  }

  if (missing.length !== 0) {
    validationResult.missing = missing
    // delete validationResult.missing
  }

  if (Object.keys(missmatches).length !== 0) {
    validationResult.missmatches = missmatches
    // delete validationResult.missmatches
  }

  if (Object.keys(invalid).length !== 0) {
    validationResult.invalid = invalid
    // delete validationResult.invalid
  }

  return validationResult
}

/*
let arguments = {
  width: 100,
  height: 10,
  color: '#000',
  name: 'hannibal',
  locationX: 42,
  locationY: 'testo',
  purchased: false,
  penis: 'hihihi'
}

let defaults = {
  width: {
    type: 'number',
    default: 0
  },
  height: {
    type: 'number',
    default: 0
  },
  color: {
    type: 'string',
    default: '#fff'
  },
  name: {
    type: 'string',
    default: 'Maxi'
  },
  purchased: {
    type: 'boolean',
    default: true
  },
  locationX: {
    type: 'number',
    default: 0,
    validate: (l) => { return l < 50 && l > 25 }
  },
  locationY: {
    type: 'number',
    default: 0
  },
  func: {
    type: 'function',
    default: (x) => { console.log(`input is ${x}`) }
  },
  obj: {
    required: false,
    type: 'object',
    default: null
  }
}
*/
/*
let arguments = {
  a: 100,
  // c: 'KEKSE'
}

// if it provids validation then it needs to provide a default fallback value
let defaults = {
  a: {
    type: 'number',
    // default: (e) => { return e * 0.01 },
    validate: (l) => { return l > 5 && l < 15 }
  },
  /*
  b: {
    type: 'string',
    default: 'PENIS'
  }
  */
/*
}
*/

console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');

























/*
let arguments = {
  locationX: '5',
  locationY: 4,
  radius: 10
}

let defaults = {
  locationX: {
    required: false,
    type: 'number',
    default: 0
  },
  locationY: {
    type: 'number',
    default: 0
  },
  radius: {
    type: 'number',
    default: 5
  },
  color: {
    type: 'string',
    default: '#fff'
  }
}
*/









/*
let arguments = {
  name: 'Franz',
  alter: 5,
  addresse: 'pimmelstr. 5'
}

let defaults = {
  name: {
    type: 'string',
    default: 'Pimmelheins',
  },
  nachname: {
    type: 'string',
    default: 'Lapper'
  },
  alter: {
    required: true,
    type: 'number',
    default: 0
  },
  addresse: {
    required: true,
    type: 'string',
    default: 'musterstr. 1'
  }
}
*/

let specificationCoverageArguments = {
  a: 'contentA',
  b: 4,
  c: false,
  d: null,
  // e missing input expected default
  f: 'unexpectedContentF',
  g: 'unexpectedTypeStringG',
  h: 'inputValidationHSuccessfull',
  i: 'inputRequiredI',
  j: 'inputOptionalProvidedJ',
  k: 'inputOptionalProvidedWrongTypeK',
  l: 'inputOptionalProvidedValidationL',
  // m missing input forget to specify default
}

let specificationCoverageDefaults = {
  a: {
    type: 'string',
    default: 'defaultContentA'
  },
  b: {
    type: 'number',
    default: 3.141
  },
  c: {
    type: 'boolean',
    default: true
  },
  d: {
    type: 'object',
    default: undefined
  },
  e: {
    type: 'string',
    default: 'defaultContentE'
  },
  f: {
    type: 'string',
    default: 'defaultContentF',
    validate: (x) => { console.log('HALLO'); return x === 'inputValidationFUnsuccessfull' }
  },
  g: {
    type: 'number',
    default: 3.141
  },
  h: {
    type: 'string',
    default: 'defaultContentH',
    validate: (x) => { return x === 'inputValidationHSuccessfull' }
  },
  i: {
    required: true,
    type: 'string',
    default: 'defaultContentI'
  },
  j: {
    required: false,
    type: 'string',
    default: 'defaultContentJ'
  },
  k: {
    required: false,
    type: 'number',
    default: 3.141
  },
  l: {
    required: false,
    type: 'string',
    validate: (x) => { return x === 'inputOptionalProvidedValidationWRONGL' }
  },
  m: {
    type: 'string'
  }
}

let specificationCoverageExpected = {

}

let validation = validate(specificationCoverageArguments, specificationCoverageDefaults)

console.log(validation)











/*
console.log(validation);

console.log(typeof 'str');
console.log(typeof 0);
console.log(typeof true);
console.log(typeof Number);
console.log(typeof Symbol('a'));
*/
