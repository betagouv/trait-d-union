module.exports = (formResponse) => {
  const answers = formResponse.answers

  const candidat = {
    id: formResponse.hidden.id_user,
    email: answers[0].email,
    nomPrenom: answers[1].text,
    telephone: answers[2].text,
    age: answers[3].number,
    cvUrl: answers[4].file_url
  }
  return {
    offreId: formResponse.hidden.id_offre,
    candidat
  }
}
