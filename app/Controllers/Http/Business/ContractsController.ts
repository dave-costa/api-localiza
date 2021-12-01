import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Contract } from 'App/Models'
import { ContractValidator } from 'App/Validators'
export default class ContractsController {
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(ContractValidator)
    await Contract.create(data)
  }
}
