import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/message/conversations', 'Messages/Conversation.index')
  Route.get('/message/conversations/:id', 'Messages/Conversation.show')
})
  .prefix('/api')
  .middleware('auth')
