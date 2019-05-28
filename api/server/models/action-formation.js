module.exports = function (Actionformation) {
  Actionformation.computeNiveauQualificationEntree = (action) => {
    return niveauQualificationEntreeFrom(action.niveauQualificationSortie)
  }
}

function niveauQualificationEntreeFrom (niveauQualificationSortie) {
  return {
    'Pas de niveau': 'sans-diplome',
    'Niveau V - Formations équivalentes aux CAP-BEP': 'sans-diplome',
    'Niveau IV - Formations équivalentes à Bac ou Bac+1': 'cap-bep',
    'Niveau III - Formations équivalentes à Bac+2': 'bac-bac+1',
    'Niveau II - Formations équivalentes à Bac+3 ou Bac+4': 'bac+2'
  }[niveauQualificationSortie] || 'sans-diplome'
}
