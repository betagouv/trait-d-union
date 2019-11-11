module.exports = (args) => {
  return !args || !args.filter || !args.filter.where || !args.filter.where.email || !args.filter.where.email.like
}
