const minimumCDDDuration = 6

module.exports = (offres) => {
  return offres.filter(offre => isCDI(offre) || !offre.typeContratLibelle || contractDuration(offre) >= minimumCDDDuration)
}

const isCDI = (offre) => offre.typeContrat === 'CDI'

const contractDuration = ({ typeContratLibelle }) => {
  const durationString = typeContratLibelle.match(/ (\d|\d{2}) Mois/)
  return parseInt(durationString, 10)
}
