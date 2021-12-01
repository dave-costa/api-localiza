import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { User } from 'App/Models'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_one: number
  @belongsTo(() => User, { foreignKey: 'user_one' })
  public userOne: BelongsTo<typeof User>

  @column()
  public user_two: number
  @belongsTo(() => User, { foreignKey: 'user_two' })
  public userTwo: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
