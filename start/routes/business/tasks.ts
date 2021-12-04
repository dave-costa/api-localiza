import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/tasks', 'Business/Task.index')
  Route.get('/task/:id', 'Business/Task.show')
  Route.put('/task/:id', 'Business/Task.update')
  Route.delete('/task/:id', 'Business/Task.destroy')
  Route.post('/task', 'Business/Task.store')
})
  .prefix('/api')
  .middleware('auth')
