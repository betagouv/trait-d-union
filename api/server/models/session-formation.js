const { Interval } = require('luxon')

module.exports = (Sessionformation) => {
  Sessionformation.computeDuration = (session) => {
    return durationBetween(session.dateDebut, session.dateFin)
  }
}

function durationBetween (dateDebut, dateFin) {
  const sessionInterval = Interval.fromDateTimes(dateDebut, dateFin)
  return Math.round(sessionInterval.length('months'))
}
