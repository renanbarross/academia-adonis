'use strict'

const User = use("App/Models/User")

class UserController {
    async index() {
        return await User.all()
    }

    async show({ params }) {
        const user = await User.findOrFail(params.id)
        await user.loadMany(['typeUser', 'permissions', 'roles'])

        //essa linha manda carregar(load) a função typeUser que está na model User
        //além de permissions e roles que foram definidos pelo adonis ao serem configuradas

        return user
    }

    async store({ request }) {
        const { permissions, roles, ...data } = request.only([
            "name",
            "username",
            "email",
            "password",
            "type_user_id",
            "permissions",
            "roles"
        ])

        const user = await User.create(data)

        if(permissions) {
            await user.permissions().attach(permissions)
        }

        if(roles) {
            await user.roles().attach(roles)
        }

        await user.loadMany(['roles', 'permissions'])
        return user
    }

    async update({ params, request }) {
        const user = await User.findOrFail(params.id)
        const { permissions, roles, ...data } = request.only([
            "name",
            "username",
            "email",
            "password",
            "type_user_id",
            "permissions",
            "roles"
        ])

        user.merge(data)
        await user.save()

        if(permissions) {
            await user.permissions().sync(permissions)
        }

        if(roles) {
            await user.roles().sync(roles)
        }

        await user.loadMany(['roles', 'permissions'])
        return user
    }

    async destroy({ params }) {
        const user = await User.findOrFail(params.id)
        return await user.delete()
    }
}

module.exports = UserController
