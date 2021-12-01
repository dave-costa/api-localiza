import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MainValidator } from 'App/Validators'
import { Conversation, Message } from 'App/Models'

export default class Messages {
  public async store({ request, response, auth }: HttpContextContract) {
    const { content, receiver } = await request.validate(MainValidator)
    console.log(auth.user!.id)
    if (auth.user!.id === receiver) {
      return response.badRequest({ message: 'try other user' })
    }

    const alreadyExistConversation = await Conversation.query()
      .where({
        user_one: Number(auth.user!.id),
        user_two: Number(receiver),
      })
      .orWhere({ user_one: Number(receiver), user_two: Number(auth.user!.id) })
      .first()
    if (alreadyExistConversation) {
      const message = await Message.create({
        content: content,
        user_id: Number(auth.user!.id),
        conversation_id: Number(alreadyExistConversation.id),
      })
      return message
    }

    const conversation = await Conversation.create({
      user_one: Number(auth.user!.id),
      user_two: Number(receiver),
    })
    const message = await Message.create({
      content: content,
      user_id: Number(auth.user!.id),
      conversation_id: Number(conversation.id),
    })
    return message
  }
}
