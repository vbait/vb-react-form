function buildConfig(env) {
  return require('./scripts/webpack/' + env + '.js')({ env: env })
}

module.exports = buildConfig;