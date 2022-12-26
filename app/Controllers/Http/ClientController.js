'use strict'

const Client = use("App/Models/Client")
const Antl = use("Antl")

class ClientController {
    async index() {
        return await Client.all()
    }
    async show({ params, locale }) {
        const client = await Client.findOrFail(params.id)
        await client.load('user')

        const user = client.getRelated('user')
        //getRelated traz os dados de algo que está sendo carregado junto com client, no caso user

        if (client.age >= 60) {
            client.observation = Antl.forLocale(locale).formatMessage('messages.warning', {name: user.name})
        }

        //forLocale(locale) pega automaticamente o local de onde está vindo a requisição
        //formatMessage é usado para formatar uma mensagem que no caso é o atributo "warning" do arquivo json messages
        //no segundo argumento estão os dados que serão inseridos na mensagem, no caso só o atributo "name" de user

        return client
    }
    async store({ request }) {
        const data = request.only([
            "user_id",
            "address",
            "age",
            "weight"
        ])

        const client = await Client.create(data)
        return client
    }
    async update({ params, request }) {
        const client = await Client.findOrFail(params.id)
        const data = request.only([
            "user_id",
            "address",
            "age",
            "weight"
        ])

        client.merge(data)
        await client.save()
        return client
    }
    async destroy({ params }) {
        const client = await Client.findOrFail(params.id)
        return await client.delete()
    }
}

module.exports = ClientController
