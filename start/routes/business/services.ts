import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/service/:id', 'Business/Service.show')
  Route.put('/service/:id', 'Business/Service.update')
  Route.post('/service', 'Business/Service.store')
  Route.delete('/service/:id', 'Business/Service.destroy')
})
  .prefix('/api')
  .middleware('auth')
Route.get('/api/services', 'Business/Service.index')
