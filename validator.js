class Validator {

  #input = undefined
  #template = undefined

  #validation = {
    valid: {},        // valid to spec
    critical: [],     // required missing or invalid to spec
    missmatch: {},    // optional missing or invalid to spec
    unspecified: {}   // not specified in spec
  }

  constructor(input, template) {
    this.#input = input
    this.#template = template

    this.validate()
  }

  get validation() {
    return this.#validation
  }

  validate(input = this.#input, template = this.#template) {

    this.#isInputDefined()
    this.#isTemplateDefined()

    this.#filterUnspecified()

    this.#validateListToSpec()

    this.#specLeftover()

    this.#cleanValidationResult()

    return this.#validation
  }

  #specLeftover() {
    let specs = Object.keys(this.#template)

    for (let spec of specs) {
      this.#markInvalid(spec, this.#template[spec])
    }
  }

  #isInputDefined() {
    if (typeof this.#input !== 'object') {
      this.#input = { }
    }
  }

  #isTemplateDefined() {
    if (typeof this.#template !== 'object') {
      this.#template = { }
    }
  }

  #filterUnspecified() {
    let items = Object.keys(this.#input)

    for (let item of items) {
      if (this.#isSpecified(item) === false) {
        this.#validation.unspecified[item] = this.#input[item]
        delete this.#input[item]
      }
    }
  }

  #isSpecified(item) {
    let specs = Object.keys(this.#template)
    let isSpecified = false

    for (let spec of specs) {
      if (item === spec) {
        isSpecified = true
        break;
      }
    }

    return isSpecified
  }

  #cleanValidationResult() {
    if (Object.keys(this.#validation.valid).length === 0) {
      delete this.#validation.valid
    }

    if (Object.keys(this.#validation.critical).length === 0) {
      delete this.#validation.critical
    }

    if (Object.keys(this.#validation.missmatch).length === 0) {
      delete this.#validation.missmatch
    }

    if (Object.keys(this.#validation.unspecified).length === 0) {
      delete this.#validation.unspecified
    }
  }

  #validateListToSpec() {
    let items = Object.keys(this.#input)

    for (let item of items) {
      this.#validateItemToSpec(item, this.#template[item])
      delete this.#template[item]
    }
  }

  #validateItemToSpec(item, spec) {

    if (this.#isItemNull(item, spec)) {
      this.#markInvalid(item, spec)
      return
    }

    if (this.#isTypeMatching(item, spec) === false) {
      this.#markInvalid(item, spec)
      return
    }

    if (this.#isValidationMatching(item, spec) === false) {
      this.#markInvalid(item, spec)
      return
    }

    this.#validation.valid[item] = this.#input[item]
  }

  #isValidationMatching(item, spec) {
    if (spec.validate === undefined) {
      return true
    }

    if (typeof spec.validate !== 'function') {
      console.log(`WRN: spec for ${item} is not a function`)
      return true
    }

    return spec.validate(this.#input[item])
  }

  #isItemNull(item, spec) {
    return this.#input[item] === undefined
  }

  #isTypeMatching(item, spec) {
    if (spec.type === undefined) {
      return true
    }

    return typeof this.#input[item] === spec.type
  }

  #markInvalid(item, spec) {
    if (spec.required === true) {
      this.#validation.critical[item] = this.#input[item]
      // critical items can't have a default
    } else {
      this.#validation.missmatch[item] = this.#input[item]
      this.#checkDefault(item, spec)
    }
  }

  #checkDefault(item, spec) {
    if (spec.default === undefined) {
      return
    }

    this.#validation.valid[item] = spec.default
  }

}

module.exports = Validator
