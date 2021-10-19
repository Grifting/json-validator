let input = {
  a: 'xyz',
  b: 1,
  d: {},
  e: true
}

let template = {
  a: { type: 'String', default: undefined, validate: (a) => { return true }, required: true },
  c: { type: 'Number' },
  d: { type: 'Boolean' }
}

let validation = {
  valid: { a: 'xyz' },     // the validated inputs

  critical: { e: true }    // not by template specified

  missmatch: [ 'c' ],      // missing & optional missmatches // list of optionals / none requireds missing  // the validation.missing inputs validation.validated through fallbacks OPTIONAL | !REQUIRED
  
  unspecified: { d: {} },  // unknown inputs that were straight ignored
}


validated = type match, function match 
missing = was specified not in set
unspecified = 


required has no default => because its critical
default has no required => because its not critical