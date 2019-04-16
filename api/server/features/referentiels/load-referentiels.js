module.exports = async ({ ActionFormation, Diplome, Metier, SessionFormation },
  { referentielActions, referentielDiplomes, referentielMetiers, referentielSessions }) => {
  await loadReferentiel(ActionFormation, referentielActions)
  await loadReferentiel(Diplome, referentielDiplomes)
  await loadReferentielMetiers(Metier, referentielMetiers)
  await loadReferentiel(SessionFormation, referentielSessions)
}

async function loadReferentielMetiers (Metier, referentielMetiers) {
  const createMetiersPromises = referentielMetiers.map(async (metier) => {
    const insertedMetier = await Metier.upsert(metier)
    await Promise.all(metier.diplomes.map(async (diplome) => insertedMetier.diplomes.add(diplome)))
  })
  await Promise.all(createMetiersPromises)
}

async function loadReferentiel (Model, referentiel) {
  const createPromises = referentiel.map(session => Model.upsert(session))
  await Promise.all(createPromises)
}
