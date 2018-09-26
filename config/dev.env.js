'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEBUG_MODE: false,
  ROOT_RECALLS_API: '"/api/recall/"',
  ROOT_ERROR_API: '"/api/error"'
})
