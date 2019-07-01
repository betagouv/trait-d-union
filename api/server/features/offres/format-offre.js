module.exports = ({ data, createdAt, updatedAt, status }) => {
  return Object.assign(data, { createdAt, updatedAt, status })
}
