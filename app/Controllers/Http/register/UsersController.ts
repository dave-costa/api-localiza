import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { PreRegisterValidator } from 'App/Validators/'
import { AxiosClient } from 'App/Services/axios'

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { biNumber } = await request.validate(PreRegisterValidator)
      const userMy = new User()
      userMy.useTransaction(trx)
      userMy.bi_number = biNumber

      const responseAPIAxiosEXTERNAL = await AxiosClient.get(`${biNumber}`)
      const user = await responseAPIAxiosEXTERNAL.data[0]

      if (!user) {
        return response.notFound({
          error: 'user not found',
        })
      }
      const alreadyExistUser = await User.findBy('bi_number', biNumber)
      if (alreadyExistUser) {
        return response.unauthorized({ error: 'user already exist' })
      }
      const city = ['luanda', 'LUANDA', 'Luanda']
      if (!city.includes(user.BIRTH_PROVINCE_NAME)) {
        return response.unauthorized({ error: `invalid province ${user.BIRTH_PROVINCE_NAME}` })
      }
      const dateExpire = user.EXPIRY_DATE.split('-')
      const currentDate = new Date()
      if (Number(dateExpire[0]) < currentDate.getFullYear()) {
        return response.unauthorized({ error: 'invalid document' })
      }
      userMy.name = user.FIRST_NAME
      userMy.last_name = user.LAST_NAME
      userMy.local = user.RESIDENCE_ADDRESS + user.RESIDENCE_NEIGHBOR
      const sendUserProperty = {
        biNumber: userMy.bi_number,
        name: userMy.name,
        lastName: userMy.last_name,
        local: userMy.local,
      }
      await userMy.save()
      return response.ok({ user: sendUserProperty })
    })
  }

  public async show({}: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    const response = request.only(['email', 'password', 'photo'])
    const user = await User.findOrFail(params.id)
    user.merge(response)
    await user.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()
  }
}
