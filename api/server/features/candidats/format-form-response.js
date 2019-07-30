module.exports = (formResponse) => {
  const answers = formResponse.answers

  const candidat = {
    id: formResponse.hidden.id_user,
    email: answers[0].email,
    poleEmploiId: answers[1].text,
    nomPrenom: answers[2].text,
    telephone: answers[3].text,
    age: answers[4].number,
    cvUrl: answers[5].file_url
  }
  return {
    offreId: formResponse.hidden.id_offre,
    candidat
  }
}
