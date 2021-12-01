import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name_service: schema.string({ trim: true }),
    photo: schema.string({ trim: true }),
    user_service_id: schema.number.optional(),
    nif_enterprise: schema.string(),
    location: schema.string(),
  })

  public messages = {}
}
