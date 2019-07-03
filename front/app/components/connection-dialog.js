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
        console.log(this.get('enteredEmail'))
        this.set('retrieveAccountButtonDisabled', false)
      } else {
        this.set('retrieveAccountButtonDisabled', true)
      }
    },

    retrieveAccount () {
      console.log(this.get('enteredEmail'))

      this.retrieveAccount(this.get('enteredEmail'))
    }
  }
})
