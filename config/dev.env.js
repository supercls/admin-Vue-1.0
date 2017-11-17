var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '" http://www.easy-mock.com/mock/59bb7d44e0dc663341ab7963/example"',
})
