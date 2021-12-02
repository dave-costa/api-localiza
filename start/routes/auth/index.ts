import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/login', 'Auth/Main.store')
Route.delete('/api/logout', 'Auth/Main.destroy').middleware('auth')
