/*
  version 2
  takes arguments
  i.e.
  let args = { a: 1 }
  let defaults = { a: { type: 'number', default: 0, validate: () => { return bool } }, b: { type: 'number', default: 0 } }
  checks if the type is matching and fills them in if they were left out
*/
function validate(arguments, defaults) {
  // validation result
  let validation = {
    validated: {},   // the validation.validated output created using defaults
    missing: [],     // the validation.missing inputs validation.validated through fallbacks
    missmatches: {}, // unknown inputs that were straight ignored
    invalid: {}      // not by template specified
  }
  // store temporary values
  let restrains, rawInput

  // check if arguments are empty
  if (typeof arguments !== 'object') {
    return validation
  }
  
  // generate valid input from defaults and rawinput
  Object.keys(defaults).forEach(key => {
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
            validation.validated[key] = rawInput
          } else {
            let fallback = restrains.default
            validation.validated[key] = fallback ? (typeof fallback === 'function' ? fallback(rawInput) : fallback) : 'ERR_NO_DEFAULT_PROVIDED_1'
            validation.invalid[key] = rawInput
          }
        } else {
          validation.validated[key] = rawInput
          // console.log(restrains);
        }
        /* END DEFAULT VALIDATION */

      } else {
        let fallback = restrains.default
        validation.invalid[key] = rawInput
        if (fallback !== undefined) {
          if (restrains.required !== undefined) {
            if (restrains.required === true) {
              validation.validated[key] = fallback
            }
          } else {
            validation.validated[key] = fallback
          }
        } else {
          validation.validated[key] = 'ERR_NO_DEFAULT_PROVIDED_2'
        }
      }

    } else {
      let fallback = restrains.default
      if (fallback !== undefined) {
        if (restrains.required === false) {
          // validation.missing input is optional can be ignored
        } else {
          validation.validated[key] = fallback
          validation.missing.push(key)
        }
      } else {
        validation.validated[key] = 'ERR_NO_DEFAULT_PROVIDED_3'
        validation.missing.push(key)
      }
    }
  })

  // collect validation.missmatches
  Object.keys(arguments).forEach((key) => {
    if (defaults[key] === undefined) {
      validation.missmatches[key] = arguments[key]
    }
  })

  // delete validation.missing, validation.missmatches and validation.invalid if empty from result

  if (validation.missing.length === 0) {
    delete validation.missing
  }

  if (Object.keys(validation.missmatches).length === 0) {
    delete validation.missmatches
  }

  if (Object.keys(validation.invalid).length === 0) {
    delete validation.invalid
  }

  return validation
}


module.exports = validate
