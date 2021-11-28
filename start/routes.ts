import Route from '@ioc:Adonis/Core/Route'

Route.post('/', 'register/UsersController.store')
Route.put('/:id', 'register/UsersController.update')
