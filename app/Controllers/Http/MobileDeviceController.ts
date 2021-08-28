import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MobileDevice from "App/Models/MobileDevice";

export default class MobileDeviceController {
  public async index ({}: HttpContextContract) {
  }

  public async store ({request, auth}: HttpContextContract) {
    const md = new MobileDevice()
    md.userId = auth.user?.id || -1;
    md.fill(Object.assign(md.$attributes, request.body()));
    return await md.save()
  }

  public async update ({request, auth}: HttpContextContract) {
    const code : string   = request.params().id

    let md = await MobileDevice.query().where('code', code).where('user_id', auth.user?.id || -1).first();
    if(md === null) {
      md = new MobileDevice();
      md.userId = auth.user?.id || -1;
      md.code = code;
    }

    md.fill(Object.assign(md.$attributes, request.body()));
    return await md.save()
  }

  public async destroy ({request}: HttpContextContract) {
    const id : string   = request.params().id
    const md = await MobileDevice.findOrFail(id)
    return await md.delete()
  }
}
