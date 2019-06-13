module.exports = async ({ Candidat }, formResponse) => {
  const answers = formResponse.answers

  const candidatToCreate = {
    id: formResponse.hidden.id_user,
    email: answers[0].email,
    nomPrenom: answers[1].text,
    telephone: answers[2].text,
    cvUrl: answers[3].file_url
  }
  await Candidat.create(candidatToCreate)

  return candidatToCreate
}
