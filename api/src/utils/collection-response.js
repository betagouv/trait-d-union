module.exports = ({ h, itemName, collection, allItemsCount, offset, limit }) => {
  const currentRange = _currentRange(offset, collection.length, allItemsCount)
  const responseCode = allItemsCount > collection.length ? 206 : 200
  return h.response(collection)
    .header('Content-Range', `${itemName} ${currentRange}/${allItemsCount}`)
    .code(responseCode)
}

function _currentRange (offset, collectionLength, allItemsCount) {
  if (collectionLength === 1 && allItemsCount === 1) {
    return '1'
  } else if (collectionLength <= 1) {
    return '0'
  }
  const rangeEnd = (offset || 0) + collectionLength - 1
  return `${offset || 0}-${rangeEnd}`
}
