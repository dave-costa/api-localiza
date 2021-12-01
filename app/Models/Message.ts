import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { Conversation, User } from 'App/Models'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public user_id: number
  @belongsTo(() => User, { foreignKey: 'user_id' })
  public userId: BelongsTo<typeof User>

  @column()
  public conversation_id: number
  @belongsTo(() => Conversation, { foreignKey: 'conversation_id' })
  public conversationId: BelongsTo<typeof Conversation>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
