module.exports = async ({ ActionFormation, Diplome, Metier, SessionFormation },
  { referentielActions, referentielDiplomes, referentielMetiers, referentielSessions }) => {
  await loadReferentiel(ActionFormation, referentielActions)
  await loadReferentiel(Diplome, referentielDiplomes)
  await loadReferentielMetiers(Metier, referentielMetiers)
  await loadReferentielSessions({ SessionFormation, ActionFormation }, referentielSessions)
}

async function loadReferentielMetiers (Metier, referentielMetiers) {
  const createMetiersPromises = referentielMetiers.map(async (metier) => {
    const insertedMetier = await Metier.upsert(metier)
    await Promise.all(metier.diplomes.map(async (diplome) => insertedMetier.diplomes.add(diplome)))
  })
  await Promise.all(createMetiersPromises)
}

async function loadReferentielSessions ({ SessionFormation, ActionFormation }, referentielSessions) {
  const createSessionsPromises = referentielSessions.map(async (session) => {
    const insertedSession = await SessionFormation.create(session)
    const action = await ActionFormation.findById(session.actionNumero)
    console.log(action)
    console.log(insertedSession)
  })
  await Promise.all(createSessionsPromises)
}

async function loadReferentiel (Model, referentiel) {
  const createPromises = referentiel.map(session => Model.upsert(session))
  await Promise.all(createPromises)
}
