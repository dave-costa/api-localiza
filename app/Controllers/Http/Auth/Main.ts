import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Auth'

export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, biNumber, password } = await request.validate(StoreValidator)
    if (email) {
      const token = await auth.attempt(email, password, {
        expiresIn: '15 days',
      })
      return token
    }
    if (biNumber) {
      const token = await auth.attempt(biNumber, password, {
        expiresIn: '15 days',
      })
      return token
    }
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
