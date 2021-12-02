import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class Task {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name_task: schema.string({ trim: true }),
    description_task: schema.string({ trim: true }),
    photo: schema.string({ trim: true }),
    state: schema.enum(['doing', 'finished'] as const),
    user_sended_id: schema.number.optional(),
  })

  public messages = {}
}
