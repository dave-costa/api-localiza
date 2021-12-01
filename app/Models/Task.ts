import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { User } from 'App/Models/'
import { State } from 'App/utils'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name_task: string
  @column()
  public description_task: string
  @column()
  public state: State
  @column()
  public photo: string

  @column()
  public user_sended_id: number
  @belongsTo(() => User, { foreignKey: 'user_sended_id' })
  public user_send: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
