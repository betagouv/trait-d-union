const { expect } = require('../../test-utils')
const computeCourrielFromContact = require('./compute-courriel-from-contact')

describe('computeCourrielFromContact(contact)', () => {
  context('when contact is not defined', () => {
    it('returns a not defined courriel', () => {
      const contact = undefined

      const courriel = computeCourrielFromContact(contact)

      expect(courriel).to.be.null()
    })
  })
  context('when contact contains a courriel property', () => {
    it('returns the courriel address', () => {
      const contact = {
        courriel: 'anotherEmail',
        coordonnees1: 'courriel : some@email.fr'
      }

      const courriel = computeCourrielFromContact(contact)

      expect(courriel).to.eql('anotherEmail')
    })
  })
  context('when courriel is in coordonnees1 property', () => {
    it('returns the courriel address', () => {
      const contact = { coordonnees1: 'Courriel : some@email.fr' }

      const courriel = computeCourrielFromContact(contact)

      expect(courriel).to.eql('some@email.fr')
    })
  })
  context('when courriel is in coordonnees2 property', () => {
    it('returns the courriel address', () => {
      const contact = {
        coordonnees1: 'une adresse',
        coordonnees2: 'Courriel : some@email.fr',
        coordonnees3: 'une ville'
      }

      const courriel = computeCourrielFromContact(contact)

      expect(courriel).to.eql('some@email.fr')
    })
  })
  context('when courriel is in coordonnees3 property', () => {
    it('returns the courriel address', () => {
      const contact = { coordonnees3: 'Courriel : some@email.fr' }

      const courriel = computeCourrielFromContact(contact)

      expect(courriel).to.eql('some@email.fr')
    })
  })
  context('when courriel is not in any coordonnees property', () => {
    it('returns null', () => {
      const contact = { coordonnees1: 'no courriel' }

      const courriel = computeCourrielFromContact(contact)

      expect(courriel).to.be.null()
    })
  })
})
