
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Device from 'App/Models/Device'
import Gateway from "App/Models/Gateway";
import {DateTime} from "luxon";

export default class DeviceController {
  public async index ({request}: HttpContextContract) {
    const code = request.params().id
    const gateway = await Gateway.query().where('code', code).firstOrFail()
    const devices = await Device.query().where('gateway_id', gateway.id).preload('devicePorts')

    // const debug = {
    //   url: 'GET ' + request.url(),
    //   params: request.params(),
    //   body: request.body(),
    //   now: Settings.now()
      // headers: request.headers()
    // };

    // console.log(debug)

    gateway.lastFetch = DateTime.now();
    gateway.save()

    const ret = {
      gw: {
        code: gateway.code,
        rebooted: gateway.rebooted,
        updated: gateway.updatedAt,
        fw_version: gateway.fw_version
      },
      nodes: {},
    };

      devices.forEach((device) => {
        ret.nodes[device.code] = {
            rebooted: device.rebooted,
            health: device.health,
            ports: device.devicePorts.map((dPort) => {
              return {
                port: dPort.port,
                // manual: dPort.manual,
                state: dPort.state
              }
            })
          }
    })

    return ret
  }

  public async store ({request}: HttpContextContract) {
    const device = new Device()
    device.fill(Object.assign(device.$attributes, request.body()));
    return await device.save()
  }

  public async update ({request}: HttpContextContract) {
    const id : string   = request.params().id
    const device = await Device.findOrFail(id)
    device.fill(Object.assign(device.$attributes, request.body()));
    return await device.save()
  }

  public async destroy ({request}: HttpContextContract) {
    const id : string   = request.params().id
    const device = await Device.findOrFail(id)
    return await device.delete()
  }
}
