# JSON-Validator

Provides a simple way to validate raw JSON input for safe handling during processing.

### Installation

`npm i json-validator --save`

### Usage

  Checkout example.js for more details

  ```javascript
  let raw = {
    a: 'string-value',
    b: 0,
    c: boolean,
    d: undefined,
    e: null,
    f: []
  }

  let defaults = {
    a: {
      required: true, // required (boolean of required) is by default true
      type: 'string', // type (string of type) is by default required to be specified
      validate: (input) => { return true }, // validate (validate of function) is by default not required
      default: 'a' // default (object) is by default required when specifing object data
    }
  }

  validator(raw, defaults, false) // takes raw json, takes default template, and optional boolean if unspecified params in raw remove or include
  ```

### Changelog

#### 1.0 - 12-02-2021

  **+** Initial release<br>

### Upcoming

- [ ] Stable tested release
- [ ] Published as official NPM Package

### Team

[@Grifting](https://github.com/Grifting)<br>
