import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class Contract {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    nif: schema.string({ trim: true }),
  })
  public messages = {}
}
