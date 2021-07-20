import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Device from 'App/Models/Device'
import DevicePort from 'App/Models/DevicePort'

export default class DevicePortsController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({request}: HttpContextContract) {
    const id : string   = request.params().id
    const code : string = request.params().code
    const port : string = request.params().port


    const device = await Device.query().where('code', code).where('gateway_id', id).firstOrFail()
    const devicePort = await DevicePort.query().where('device_id', device.id).where('port', port).firstOrFail()
    devicePort.fill(Object.assign(devicePort.$attributes, request.body()))
    return await devicePort.save()
  }

  public async destroy ({}: HttpContextContract) {
  }
}
