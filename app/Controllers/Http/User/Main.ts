import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { FirstAccess } from 'App/Validators/User'
import { AxiosClient } from 'App/Services/Axios'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { biNumber } = await request.validate(FirstAccess)
      const userMy = new User()
      if (biNumber === userMy.bi_number) {
        return response.badRequest({ message: 'user already exists, update your data' })
      }
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
      await userMy.save()
      return userMy
    })
  }
  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    return user
  }

  public async update({ request, params }: HttpContextContract) {
    const response = request.only(['email', 'password', 'photo'])
    const user = await User.findOrFail(params.id)
    user.merge(response)
    await user.save()
  }
}
