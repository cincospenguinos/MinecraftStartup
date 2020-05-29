process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')
environment.loaders.file.exclude(['test\.jsx', 'test\.js'])
module.exports = environment.toWebpackConfig()
