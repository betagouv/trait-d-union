const LRU = require('lru-cache')

const maxAge = 24 * 60 * 60 * 1000 // 1 day
const _cache = new LRU({ maxAge })

module.exports = _cache
