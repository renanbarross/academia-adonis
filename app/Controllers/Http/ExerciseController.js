'use strict'

const Exercise = use("App/Models/Exercise")

const Helpers = use("Helpers")
//Helpers é um mecanismo do adonis que, neste caso, serve para carregar o arquivo de imagem
//e alocá-lo no diretório desejado

class ExerciseController {
    async index(/*{request}*/) {
        //console.log(request.all())
        return await Exercise.all()
    }
    async show({ params }) {
        const exercise = await Exercise.findOrFail(params.id)
        await exercise.load('user')
        return exercise
    }
    async store({ request, response }) {
        const data = request.only([
            "name",
            "observation",
            "series",
            "waiting_time"
        ])

        //console.log(request.input('action_by'))

        //O input traz somente o valor do campo informado

        const photo = request.file('image', {
            types: ['image'],
            size: '2mb'
        })

        if (photo) {
            const image = await Exercise.findBy('url_image', photo.clientName)
            if (image) {
                return response.status(400).send({error: {
                    message: 'Imagem com nome duplicado, modifique o nome.',
                    name: 'DuplicateImage'
                }})
            }

            await photo.move(Helpers.publicPath('exercises'))
            data.url_image = photo.clientName
        }

        const exercise = await Exercise.create(data)
        return exercise
    }
    async update({ params, request }) {
        const exercise = await Exercise.findOrFail(params.id)
        const data = request.only([
            "name",
            "observation",
            "series",
            "waiting_time"
        ])

        exercise.merge(data)
        await exercise.save()
        return exercise
    }
    async destroy({ params }) {
        const exercise = await Exercise.findOrFail(params.id)
        return await exercise.delete()
    }
}

module.exports = ExerciseController
