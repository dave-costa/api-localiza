import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string
  @column()
  public last_name: string
  @column()
  public local: string
  @column()
  public email: string
  @column({ serializeAs: null })
  public password: string
  @column()
  public bi_number: string
  @column()
  public photo: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
