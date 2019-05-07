module.exports = (contact) => {
  if (!contact) {
    return null
  }
  if (contact.courriel) {
    return contact.courriel
  }
  const coordonnees = consolidatedCoordonnees(contact)
  return extractCourrielFromCoordonnees(coordonnees)
}

// Copied/pasted from https://emailregex.com
// eslint-disable-next-line max-len,no-useless-escape
const emailRegex = new RegExp(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/)

const consolidatedCoordonnees = (contact) => [contact.coordonnees1, contact.coordonnees2, contact.coordonnees3].join(' ')

const extractCourrielFromCoordonnees = (coordonnees) => {
  const result = coordonnees.match(emailRegex)
  return (result && result.length > 0) ? result[0] : null
}
