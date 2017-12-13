var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '" https://www.easy-mock.com/mock/59bb7d44e0dc663341ab7963/example"',
  BASE_API:'"http://192.168.6.246:9191/"'
})
