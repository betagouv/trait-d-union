import Component from '@ember/component'

export default Component.extend({
  modal: true,
  retrieveAccountButtonDisabled: true,
  enteredEmail: null,

  actions: {
    onHidden () {
      this.onClose()
    },

    openForm () {
      this.openForm()
    },

    emailChanged (enteredEmail) {
      if (enteredEmail.includes('@')) {
        this.set('enteredEmail', enteredEmail)
        this.set('retrieveAccountButtonDisabled', false)
      } else {
        this.set('retrieveAccountButtonDisabled', true)
      }
    },

    retrieveAccount () {
      this.retrieveAccount(this.get('enteredEmail'))
    }
  }
})
