import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { User } from 'App/Models'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name_service: string

  @column()
  public photo: string

  @column()
  public user_service_id: number
  @belongsTo(() => User, { foreignKey: 'user_service_id' })
  public user_service: BelongsTo<typeof User>

  @column()
  public nif_enterprise: string

  @column()
  public location: string

  @column()
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
