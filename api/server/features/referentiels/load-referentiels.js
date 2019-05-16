module.exports = async ({ ActionFormation, Diplome, Metier, SessionFormation, Commune, Offre },
  { referentielActions, referentielDiplomes, referentielMetiers, referentielSessions, referentielCommunes, referentielOffres }) => {
  await loadReferentiel(Metier, referentielMetiers)
  await loadReferentielDiplomes(Diplome, referentielDiplomes)
  await loadReferentiel(ActionFormation, referentielActions)
  await loadReferentiel(Commune, referentielCommunes)
  await loadReferentiel(SessionFormation, referentielSessions)
  await loadReferentiel(Offre, referentielOffres)
}

async function loadReferentielDiplomes (Diplome, referentielDiplomes) {
  const createDiplomesPromises = referentielDiplomes.map(async (diplome) => {
    const insertedDiplome = await Diplome.upsert(diplome)
    await Promise.all(diplome.metiers.map(async (metier) => insertedDiplome.metiers.add(metier)))
  })
  await Promise.all(createDiplomesPromises)
}

async function loadReferentiel (Model, referentiel) {
  if (!Model || !referentiel) {
    return
  }
  const createPromises = referentiel.map(instance => Model.upsert(instance))
  await Promise.all(createPromises)
}
