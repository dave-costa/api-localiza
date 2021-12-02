import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/message/chat', 'Messages/Chat.store')
})
  .prefix('/api')
  .middleware('auth')
