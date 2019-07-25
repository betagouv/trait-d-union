const minimumCDDDuration = 6

module.exports = (offres) => {
  return offres
    .filter(offre => !isContratPro(offre))
    .filter(offre => !isContratApprentissage(offre))
    .filter(offre => isCDI(offre) ||
      !offre.typeContratLibelle ||
      contractDuration(offre) >= minimumCDDDuration)
}

const isCDI = (offre) => offre.typeContrat === 'CDI'

const contractDuration = ({ typeContratLibelle }) => {
  const durationString = typeContratLibelle.match(/ (\d|\d{2}) Mois/)
  return parseInt(durationString, 10)
}

const isContratApprentissage = (offre) => offre.natureContrat && offre.natureContrat.includes('apprentissage')

const isContratPro = (offre) => offre.natureContrat && offre.natureContrat.includes('professionnalisation')
