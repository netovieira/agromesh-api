
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Device from "App/Models/Device";
import DevicePort from "App/Models/DevicePort";
import {DateTime, Duration, Settings} from "luxon";
import {ModelQueryBuilder} from "@adonisjs/lucid/build/src/Orm/QueryBuilder";

export default class ControlController {

  private static prepareControl(device: Device, devicePort: DevicePort) {
    return {
      id: devicePort.id,
      device_id: devicePort.deviceId,
      type: device.type,
      name: device.name,
      port: devicePort.port,
      state: devicePort.state,
      rssi: device.rssi + ' dB',
      node: device.code,
      health: device.health,
      updated_at: devicePort.updatedAt.toFormat('dd/MM/yyyy HH:mm'),
    }
  }

  public async checkIfUpdate ({auth, request}: HttpContextContract) {

    const debug = {
      url: 'GET ' + request.url(),
      params: request.params(),
      body: request.body()
    };

    console.log(debug)

    const time = Number(request.params().time)
    const dateTime = DateTime.fromMillis(time);


    const devices = await Device.query().whereHas('gateway', (gwQuery: ModelQueryBuilder) => {
      gwQuery.where('user_id', auth.user?.id || -1)
    }).preload('devicePorts')

    let _changes = 0;
      devices.forEach((_device: Device) => {
      _device.devicePorts.forEach((_devicePort: DevicePort) => {
        if(_devicePort.updatedAt.diff(dateTime) > Duration.fromMillis(0)) _changes++
      })
    })

    console.log({response: {datetime: dateTime.toString(), time: Settings.now(), changes: _changes}})
    return {time: Settings.now(), changes: _changes}
  }

  public async index ({auth, request}: HttpContextContract) {

    const debug = {
      url: 'GET ' + request.url(),
      params: request.params(),
      body: request.body()
    };

    console.log(debug)

    const devices = await Device.query().whereHas('gateway', (gwQuery) => {
      gwQuery.where('user_id', auth.user?.id!)
    }).preload('devicePorts').orderBy('type').orderBy('name')

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
