import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Task as TaskValidator } from 'App/Validators/Business'
import { Task } from 'App/Models'

export default class TasksController {
  public async index({}: HttpContextContract) {
    const tasks = await Task.query().preload('user_send')
    return tasks
  }

  public async store({ request, auth }: HttpContextContract) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name_task, description_task, photo, state } = await request.validate(TaskValidator)
    const user = await auth.authenticate()
    const task = await Task.create({
      name_task,
      description_task,
      photo,
      state,
      user_sended_id: user.id,
    })
    await task.load('user_send')
    return task
  }

  public async show({ response, params }: HttpContextContract) {
    const task = await Task.find(Number(params.id))

    if (!task) return response.notFound({ error: 'task not found' })
    if (task.state === 'finished') return response.unauthorized({ error: 'this task is closed' })
    await task.load('user_send')
    return task
  }

  public async update({ request, params, response }: HttpContextContract) {
    const data = request.only(['name_task', 'description_task', 'photo', 'state'])

    const task = await Task.find(Number(params.id))
    if (!task) return response.notFound({ message: 'not found' })
    task.merge(data)
    await task.save()
    await task.load('user_send')
    return task
  }

  public async destroy({ params, response }: HttpContextContract) {
    const task = await Task.find(Number(params.id))
    if (!task) return response.notFound({ message: 'not found' })
    await task.delete()
  }
}
