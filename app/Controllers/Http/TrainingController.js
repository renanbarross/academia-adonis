'use strict'

const Training = use("App/Models/Training")

class TrainingController {
    async index() {
        return await Training.all()
    }

    async show({ params }) {
        const training = await Training.findOrFail(params.id)
        await training.load('user')
        return training
    }

    async store({ request }) {
        const { exercises, ...data } = request.only([
            "client_id",
            "name",
            "observation",
            "exercises"
        ])

        //Quando se usa a desestruturação no nome da constante o sinal de igual fica compreendido como
        //"que está em". Assim, essa constante pede que se traga o valor do campo exercises
        //que está no objeto que se segue. Os 3 pontos (...) que significam que a constante aceita mais
        //parâmetros além de exercises e que esses parâmetros a mais serão atribuídos à variável "data".

        const training = await Training.create(data)

        if (exercises) {
            await training.exercises().attach(exercises)
        }

        //Entendendo o que acontece nesse if:
        //Se há valor atribuído a "exercises";
        //**Chama-se o registro recém criado (training);
        //**A partir da função exercises() (localizada na model Training.js), é invocado o relacionamento de Training com Exercise;
        //**Com o attach, é pedido que se anexe a training os registros de Exercise que possuam o(s) id(s) informado(s) na constante exercises.
        //  O método attach é exclusivo para um relacionamento manyToMany. Ele permite que se crie um relacionamento entre dois modelos
        //  persistentes (já armazenados no banco de dados) dentro da tabela dinâmica (exercise_training).
        //  O attach só precisa do id do modelo relacionado para formar o relacionamento dentro da tabela dinâmica.

        //Em resumo: await [registro criado].[função que retorna o relacionamento com a model exercise].[anexa-se ao registro criado os registros de exercise que possuem os ids informados, criando-se os registros necessários na tabela dinâmica]

        await training.load('exercises')
        return training
    }

    async update({ params, request }) {
        const training = await Training.findOrFail(params.id)
        const { exercises, ...data } = request.only([
            "client_id",
            "name",
            "observation",
            "exercises"
        ])

        training.merge(data)
        await training.save()

        if (exercises) {
            await training.exercises().sync(exercises)
        }

        await training.load('exercises')
        return training
    }
    
    async destroy({ params }) {
        const training = await Training.findOrFail(params.id)
        return await training.delete()
    }

    //do jeito que está aqui, o destroy não remove o vínculo (registro) criado em exercise_training
    //pesquisa sobre isso
}

module.exports = TrainingController
