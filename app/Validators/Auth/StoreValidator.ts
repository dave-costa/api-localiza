import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string.optional({ trim: true }, [rules.email()]),
    biNumber: schema.string.optional({ trim: true }),
    password: schema.string({ trim: true }),
  })

  public messages = {}
}
