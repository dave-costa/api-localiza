import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class User {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({ trim: true }),
    last_name: schema.string({ trim: true }),
    local: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }),
    biNumber: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'email' })]),
    photo: schema.string({ trim: true }),
  })
  public messages = {}
}
