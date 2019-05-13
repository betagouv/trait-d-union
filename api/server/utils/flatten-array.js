module.exports = function _flatten (element) {
  return element instanceof Array
    ? [].concat([], ...element.map(_flatten))
    : element
}
