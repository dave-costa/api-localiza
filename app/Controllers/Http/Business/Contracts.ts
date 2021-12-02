import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Contract } from 'App/Models'
import { Contract as ContractValidator } from 'App/Validators/Business'
export default class ContractsController {
  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(ContractValidator)
    const user = await auth.authenticate()
    data.nif = user.bi_number
    await Contract.create(data)
  }
}
