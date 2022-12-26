'use strict'

class SessionController {
    async create ({ request, auth }) {
        const { username, password } = request.all()
        return await auth.withRefreshToken().attempt(username, password)
    }

    //O auth cria o token, daí tem a opção withRefreshToken() caso queira um refreshToken para renovar o token
    //quando ele expira (aqui está estipulado para que o token dure 4h)
    //No caso, a tentativa de criação dos mesmos (attempt) é feita com base em username e password da request
    //O token é a chave para ir acessando as rotas e, pelo que foi estudado, só pode ser criado com username
    //e senha (neste projeto) e, posteriormente, atualizado com o refreshToken

    async refreshToken ({ request, auth }) {
        const refreshToken = request.input('refresh_token') //como só tem uma entrada, pode-se usar o input
        return await auth.newRefreshToken().generateForRefreshToken(refreshToken, true)
    }

    //Novamente, o auth cria um token e o newRefreshToken() cria um novo refreshToken (se ele não estiver aí,
    //será usado o refreshToken antigo)
    //Dessa vez não se usa o attempt e sim o generateForRefreshToken que considera o refreshToken na criação e
    //um true que representa o [jwtPayload], referente à segunda parte do código JWT (token) que vem separado
    //por pontos. Dentre outras coisas, essa segunda parte ou Payload representa a entidade a qual o JWT pertence.
    //Dessa forma, o true codifica o objeto user dentro do token, dizendo a quem ele pertence.
}
    //Entendendo: O usuário entra com username e senha e recebe um token e um refreshToken. Depois 
    //Basicamente, quando as rotas criadas forem acessadas será necessário ter um token para receber a resposta
    //(pois as rotas estão configuradas com middleware('auth:jwt') em routes.js)
    //Esse token só é conseguido fornecendo um login e senha que já estejam cadastrados na model User

module.exports = SessionController
