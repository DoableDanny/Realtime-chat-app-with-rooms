const defaults = require('./core')

module.exports = {
  ...defaults,
  extends: [
    ...defaults.extends
  ],
}
