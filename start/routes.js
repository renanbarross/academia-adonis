'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { status: 'online' }
})

// Route.get('/users', 'UserController.index')
// Route.get('/users/:id', 'UserController.show')
// Route.post('/users', 'UserController.store')
// Route.put('/users/:id', 'UserController.update')
// Route.delete('/users/:id', 'UserController.destroy')

Route.post('/sessions', 'SessionController.create')
Route.put('/sessions', 'SessionController.refreshToken')

Route.resource('users', 'UserController').apiOnly().validator(new Map([
  [['users.store'], ['User']], [['users.update'], ['User']]
])).middleware(['auth:jwt', 'is:manager'])

//Os itens para cadastrar(store) e alterar(update) precisam estar com Accept:application/json no Headers do Postman

Route.resource('clients', 'ClientController').apiOnly().middleware(['auth:jwt', 'is:manager'])
Route.resource('exercises', 'ExerciseController').apiOnly().middleware(['auth:jwt', 'can:gerenc_exercises', 'audit'])
Route.resource('trainings', 'TrainingController').apiOnly().middleware(['auth:jwt', 'can:gerenc_exercises', 'audit'])
Route.resource('permissions', 'PermissionController').apiOnly().middleware(['auth:jwt', 'is:manager'])
Route.resource('roles', 'RoleController').apiOnly().middleware(['auth:jwt', 'is:manager'])
Route.resource('products', 'ProductController').apiOnly().middleware(['auth:jwt', 'is:manager'])

//"auth" se refere à autenticação com token

//"is" para estabelecer role

//"can" para estabelecer permission
//observação: o manager, no caso, pode acessar as rotas de exercises e trainings também pois denttro do
//role dele já está incluído a permission gerenc_exercises 

//"audit" é para saber quem está acessando a rota, já que no caso, usuários que não possuem role de administrador
//podem acessar as rotas exercises e trainings