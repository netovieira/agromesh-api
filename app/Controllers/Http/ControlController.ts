
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gateway from "App/Models/Gateway";
import Device from "App/Models/Device";
import DevicePort from "App/Models/DevicePort";

export default class ControlController {

  private static prepareControl(device: Device, devicePort: DevicePort) {
    return {
      id: devicePort.id,
      device_id: devicePort.deviceId,
      type: device.type,
      name: device.name,
      port: devicePort.port,
      state: devicePort.state,
    }
  }

  public async index ({auth, request}: HttpContextContract) {

    const debug = {
      url: 'GET ' + request.url(),
      params: request.params(),
      body: request.body(),
      // headers: request.headers()
    };

    console.log(debug)

    const gateway = await Gateway.query().where('user_id', auth.user?.id || -1).firstOrFail()
    const devices = await Device.query().where('gateway_id', gateway.id).preload('devicePorts')

    const ret = [];

    devices.forEach((device : Device) => {
      device.devicePorts.forEach((dPort: DevicePort) => {
        const item = ControlController.prepareControl(device, dPort);
        // @ts-ignore
        ret.push(item)
      })
    })

    return ret
  }

  public async update ({request}: HttpContextContract) {

    console.log({
      request: {
        url: 'PUT ' + request.url(),
        params: request.params(),
        body: request.body(),
      }
    });

    const devicePort = await DevicePort.query().where('id', request.params().id).preload('device').firstOrFail()
    devicePort.state = request.body().state;
    await devicePort.save()
    return ControlController.prepareControl(devicePort.device, devicePort);
  }
}
