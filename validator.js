class Validator {

  #validation = undefined

  constructor(input, template) {
    this.validate(input, template)
  }

  get validation() {
    return this.#validation
  }

  validate(input, template) {

    this.setEmptyValidationTemplate()

    // check if arguments are empty
    if (typeof input !== 'object') {
      return this.#validation
    }

    this.validateTemplates(input, template)

    this.collectMissmatches(input, template)
    this.cleanValidationResult()
    
    return this.#validation
  }

  check(key, input, template) {
    // if its an included arg check
    // if it is the correct type and validate it
    if (input !== undefined) {
      // CHECK INPUT TYPE RESTRICTION
      if (typeof input === template.type) {

        /* START DEFAULT VALIDATION */
        if (template.validate !== undefined) {
          if (template.validate(input)) {
            this.#validation.validated[key] = input
          } else {
            let fallback = template.default
            this.#validation.validated[key] = fallback ? (typeof fallback === 'function' ? fallback(input) : fallback) : 'ERR_NO_DEFAULT_PROVIDED_1'
            this.#validation.invalid[key] = input
          }
        } else {
          this.#validation.validated[key] = input
          // console.log(template);
        }
        /* END DEFAULT VALIDATION */

      } else {
        let fallback = template.default
        this.#validation.invalid[key] = input
        if (fallback !== undefined) {
          if (template.required !== undefined) {
            if (template.required === true) {
              this.#validation.validated[key] = fallback
            }
          } else {
            this.#validation.validated[key] = fallback
          }
        } else {
          this.#validation.validated[key] = 'ERR_NO_DEFAULT_PROVIDED_2'
        }
      }

    } else {
      let fallback = template.default
      if (fallback !== undefined) {
        if (template.required === false) {
          // this.#validation.missing input is optional can be ignored
        } else {
          this.#validation.validated[key] = fallback
          this.#validation.missing.push(key)
        }
      } else {
        this.#validation.validated[key] = 'ERR_NO_DEFAULT_PROVIDED_3'
        this.#validation.missing.push(key)
      }
    }
  }

  validateTemplates(input, template) {
    Object.keys(template).forEach(key => {
      this.check(key, input[key], template[key])
    })
  }

  setEmptyValidationTemplate() {
    // validation result
    this.#validation = {
      validated: {},   // the validation.validated output created using defaults
      missing: [],     // the validation.missing inputs validation.validated through fallbacks
      missmatches: {}, // unknown inputs that were straight ignored
      invalid: {}      // not by template specified
    }
  }

  collectMissmatches(input, template) {
    // collect validation.missmatches
    Object.keys(input).forEach((key) => {
      if (template[key] === undefined) {
        this.#validation.missmatches[key] = input[key]
      }
    })
  }

  cleanValidationResult() {
    // delete validation.missing, validation.missmatches and validation.invalid if empty from result
    if (this.#validation.missing.length === 0) {
      delete this.#validation.missing
    }

    if (Object.keys(this.#validation.missmatches).length === 0) {
      delete this.#validation.missmatches
    }

    if (Object.keys(this.#validation.invalid).length === 0) {
      delete this.#validation.invalid
    }

    return this.#validation
  }

}



module.exports = Validator
