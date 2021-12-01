import Route from '@ioc:Adonis/Core/Route'

Route.get('/user-message', 'Messages/ConversationsController.index').middleware('auth')
