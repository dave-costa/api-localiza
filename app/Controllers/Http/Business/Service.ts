import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Service } from 'App/Models'
import { Service as ServiceValidator } from 'App/Validators/Business'

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
    await service.load('user_service')
    return service
  }

  public async show({ response, params }: HttpContextContract) {
    const service = await Service.find(Number(params.id))

    if (!service) return response.notFound({ error: 'service not found' })
    await service.load('user_service')
    return service
  }

  public async update({ request, params, response }: HttpContextContract) {
    const data = request.only(['name_service', 'location'])
    const service = await Service.find(Number(params.id))
    if (!service) return response.notFound({ message: 'service not found' })
    service.merge(data)
    await service.save()
    await service.load('user_service')
    return service
  }

  public async destroy({ params, response }: HttpContextContract) {
    const service = await Service.find(Number(params.id))
    if (!service) return response.notFound({ message: 'service not found' })
    await service.delete()
  }
}
