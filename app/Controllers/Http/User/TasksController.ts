import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TaskValidator } from 'App/Validators'
import { Task, User } from 'App/Models'

export default class TasksController {
  public async index({}: HttpContextContract) {
    const tasks = await Task.query().preload('user_send')
    return tasks
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(TaskValidator)
    const user = await auth.authenticate()
    data.user_sended_id = Number(user.id)
    const task = await Task.create(data)
    return task
  }

  public async show({ response, params }: HttpContextContract) {
    const task = await Task.findOrFail(Number(params.id))

    if (!task) return response.notFound({ error: 'task not found' })
    if (task.state === 'finished') return response.unauthorized({ error: 'this task is closed' })
    const user = await User.findOrFail(Number(task.id))
    return {
      task,
      user,
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const data = request.only(['state', 'name_task', 'description_task'])
    const task = await Task.findOrFail(Number(params.id))
    task.merge(data)
    await task.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const task = await Task.findOrFail(Number(params.id))
    await task.delete()
  }
}
