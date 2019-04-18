module.exports = async ({ ActionFormation, Diplome, Metier, SessionFormation, Commune },
  { referentielActions, referentielDiplomes, referentielMetiers, referentielSessions, referentielCommunes }) => {
  await loadReferentiel(Metier, referentielMetiers)
  await loadReferentielDiplomes(Diplome, referentielDiplomes)
  await loadReferentiel(ActionFormation, referentielActions)
  await loadReferentiel(Commune, referentielCommunes)
  await loadReferentiel(SessionFormation, referentielSessions)
}

async function loadReferentielDiplomes (Diplome, referentielDiplomes) {
  const createDiplomesPromises = referentielDiplomes.map(async (diplome) => {
    const insertedDiplome = await Diplome.upsert(diplome)
    await Promise.all(diplome.metiers.map(async (metier) => insertedDiplome.metiers.add(metier)))
  })
  await Promise.all(createDiplomesPromises)
}

async function loadReferentiel (Model, referentiel) {
  const createPromises = referentiel.map(instance => Model.upsert(instance))
  await Promise.all(createPromises)
}
