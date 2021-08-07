import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gateway from "App/Models/Gateway";
import GatewayLog from "../../Models/GatewayLog";

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

    console.log({
      request: {
        url: 'POST ' + request.url(),
        params: request.params(),
        body: request.body(),
      }
    });

    const id : string   = request.params().id
    const gateway = await Gateway.query().where('code', id).firstOrFail()
    const log = new GatewayLog();
    log.gatewayId = gateway.id;

    // if(request.params().rebooted)
    log.rebooted = request.params().rebooted;
    await log.save();

    gateway.fill(Object.assign(gateway.$attributes, request.body()));
    return await gateway.save()
  }

  public async destroy ({request}: HttpContextContract) {
    const id : string   = request.params().id
    const gateway = await Gateway.findOrFail(id)
    return await gateway.delete()
  }
}
