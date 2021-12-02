import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/services', 'Business/Service.index')
  Route.get('/service/:id', 'Business/Service.show')
  Route.put('/service/:id', 'Business/Service.update')
  Route.delete('/service/:id', 'Business/Service.store')
  Route.post('/service', 'Business/Service.destroy')
})
  .prefix('/api')
  .middleware('auth')
