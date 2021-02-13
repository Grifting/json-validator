
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
  // e validation.missing input expected default
  f: 'unexpectedContentF',
  g: 'unexpectedTypeStringG',
  h: 'inputValidationHSuccessfull',
  i: 'inputRequiredI',
  j: 'inputOptionalProvidedJ',
  k: 'inputOptionalProvidedWrongTypeK',
  l: 'inputOptionalProvidedValidationL',
  // m validation.missing input forget to specify default
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
    validate: (x) => { console.log('HALLO'); return x === 'inputValidationFUnsuccessfull' },
    default: 'defaultContentF'
  },
  g: {
    type: 'number',
    default: 3.141
  },
  h: {
    type: 'string',
    validate: (x) => { return x === 'inputValidationHSuccessfull' },
    default: 'defaultContentH'
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
