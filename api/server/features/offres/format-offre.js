module.exports = ({ data, createdAt, updatedAt }) => {
  return Object.assign(data, { createdAt, updatedAt })
}
