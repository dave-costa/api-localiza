import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class FirstAccess {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    biNumber: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'email' })]),
  })
  public messages = {}
}
