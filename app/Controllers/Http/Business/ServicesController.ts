import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Service, User } from 'App/Models'
import { ServiceValidator } from 'App/Validators'

export default class ServicesController {
  public async index({}: HttpContextContract) {
    const services = await Service.query().orderBy('id').preload('user_service')
    return services
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(ServiceValidator)
    const user = await auth.authenticate()
    data.user_service_id = Number(user.id)
    const service = await Service.create(data)
    return service
  }

  public async show({ params }: HttpContextContract) {
    const service = await Service.findOrFail(Number(params.id))
    const user = await User.findOrFail(Number(service.user_service_id))
    return { service, user }
  }

  public async update({ request, params }: HttpContextContract) {
    const data = await request.validate(ServiceValidator)
    const service = await Service.findOrFail(Number(params.id))
    service.merge(data)
    await service.save()
    return service
  }

  public async destroy({ params }: HttpContextContract) {
    const service = await Service.findOrFail(Number(params.id))
    await service.delete()
  }
}
