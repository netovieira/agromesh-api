
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Device from 'App/Models/Device'

export default class DeviceController {
  public async index ({request}: HttpContextContract) {
    const id = request.params().id

    const devices = await Device.query().where('gateway_id', id).preload('devicePorts')

    return devices.flatMap((device) => {
      return {
          [device.code]: {
            rebooted: device.rebooted,
            ports: device.devicePorts.map((dPort) => {
              return {
                port: dPort.port,
                manual: dPort.manual,
                state: dPort.state
              }
            })
          }
        }
    }).values()
    
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
