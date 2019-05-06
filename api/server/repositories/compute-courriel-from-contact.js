module.exports = (contact) => {
  if (!contact) {
    return undefined
  }
  if (contact.courriel) {
    return contact.courriel
  }
  const coordonnees = [contact.coordonnees1, contact.coordonnees2, contact.coordonnees3].join(' ')
  const courriel = coordonnees.match(emailRegex)
  return courriel[0]
}

// Copied/pasted from https://emailregex.com
// eslint-disable-next-line max-len,no-useless-escape
const emailRegex = new RegExp(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/)
