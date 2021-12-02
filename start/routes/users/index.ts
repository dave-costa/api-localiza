import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/user/:id', 'User/Main.show')
Route.post('/api/user/register', 'User/Main.store')
Route.put('/api/user/register/:id', 'User/Main.update')
