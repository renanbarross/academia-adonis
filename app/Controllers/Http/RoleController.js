'use strict'

const Role = use('Role')

class RoleController {
    async index() {
        return await Role.all()
    }

    async show({ params }) {
        const role = await Role.findOrFail(params.id)
        await role.load('permissions')
        return role
    }

    async store({ request }) {
        const { permissions, ...data } = request.only([
            "name",
            "slug",
            "description",
            "permissions"
        ])

        const role = await Role.create(data)

        if (permissions) {
            await role.permissions().attach(permissions)
        }

        //não foi criado esse relacionamento permissions(), a model nem está presente,
        //mas o adonis já fez isso por trás

        await role.load('permissions')
        return role
    }

    async update({ params, request }) {
        const role = await Role.findOrFail(params.id)
        const { permissions, ...data } = request.only([
            "name",
            "slug",
            "description",
            "permissions"
        ])

        role.merge(data)
        await role.save()
        
        if (permissions) {
            await role.permissions().sync(permissions)
        }

        await role.load('permissions')
        return role
    }

    async destroy({ params }) {
        const role = await Role.findOrFail(params.id)
        return await role.delete()
    }
}

module.exports = RoleController
