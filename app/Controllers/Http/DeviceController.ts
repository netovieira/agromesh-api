
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Device from 'App/Models/Device'
import Gateway from "App/Models/Gateway";
import {DateTime} from "luxon";

export default class DeviceController {
  public async index ({request}: HttpContextContract) {
    const code = request.params().id
    const gateway = await Gateway.query().where('code', code).firstOrFail()
    const devices = await Device.query().where('gateway_id', gateway.id).preload('devicePorts')

    const debug = {
      url: 'GET ' + request.url(),
      params: request.params(),
      body: request.body(),
    };

    console.log(debug)

    gateway.lastFetch = DateTime.now();
    gateway.save()

    const ret = {
      gw: {
        code: gateway.code,
        rebooted: gateway.rebooted,
        updated: gateway.updatedAt
      },
      nodes: {},
    };

      devices.forEach((device) => {
        ret.nodes[device.code] = {
            rebooted: device.rebooted,
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

  public async update ({request}: HttpContextContract) {
    const id : string   = request.params().id
    const code : string = request.params().code

    const device = await Device.query().where('code', code).where('gateway_id', id).firstOrFail()

    // const ports = request.body().ports;

    device.fill(Object.assign(device.$attributes, request.body()));
    await device.save()

    // for (var port in ports) {
    //   const devicePort = await DevicePort.find(port.id);
    // }

    await device.save()
    await device.load('devicePorts')
    await device.refresh()

    return await device.refresh()
  }

  public async destroy ({}: HttpContextContract) {
  }
}
