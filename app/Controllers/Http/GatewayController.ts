import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gateway from "App/Models/Gateway";

export default class GatewayController {
  public async index ({auth}: HttpContextContract) {
    return Gateway.query().where('user_id', auth.user?.id || -1)
  }

  public async store ({request}: HttpContextContract) {
    const gateway = new Gateway()
    gateway.fill(Object.assign(gateway.$attributes, request.body()));
    return await gateway.save()
  }

  public async update ({request}: HttpContextContract) {
    const id : string   = request.params().id
    const gateway = await Gateway.findOrFail(id)
    gateway.fill(Object.assign(gateway.$attributes, request.body()));
    return await gateway.save()
  }

  public async destroy ({request}: HttpContextContract) {
    const id : string   = request.params().id
    const gateway = await Gateway.findOrFail(id)
    return await gateway.delete()
  }
}
