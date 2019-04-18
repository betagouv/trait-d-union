const LRU = require('lru-cache')

const maxAge = 60 * 60 * 1000 // 1 hour
const _cache = new LRU({ maxAge })

module.exports = _cache
