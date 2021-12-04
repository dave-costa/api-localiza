import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Conversation, Message } from 'App/Models/'

export default class ConversationsController {
  public async index({}: HttpContextContract) {
    const conversation = await Conversation.query().preload('userTwo')
    return conversation
  }

  public async show({ response, auth, params }: HttpContextContract) {
    const conversation = await Conversation.find(Number(params.id))
    if (!conversation) return response.notFound({ message: 'dont exists this conversation' })
    const user = await auth.authenticate()
    if (![conversation.user_one, conversation.user_two].includes(Number(user.id))) {
      return response.badRequest({ message: 'try other user' })
    }
    const message = await Message.findBy('conversation_id', Number(conversation.id))
    return message
  }
}
