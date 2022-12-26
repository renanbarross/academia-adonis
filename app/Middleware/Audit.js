'use strict'

class Audit {
  async handle ({ request, auth }, next) {
    const user = await auth.getUser()
    request.body = Object.assign(request.body, {action_by: user.id})
    console.log(user)
    await next()
  }
}

module.exports = Audit
