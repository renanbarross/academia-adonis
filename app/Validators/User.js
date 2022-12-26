'use strict'

class User {
  get rules () {
    return {
      name: 'required',
      username: 'required',
      email: 'required',
      password: 'required',
      type_user_id: 'required'
    }
  }
  get messages() {
    return {
    'name.required': 'Informe a propriedade name',
    'username.required': 'Informe a propriedade username',
    'email.required': 'Informe a propriedade email',
    'password.required': 'Informe a propriedade password',
    'type_user_id.required': 'Informe a propriedade type_user_id'
    }
  }
}

module.exports = User
