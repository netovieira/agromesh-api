import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Device from 'App/Models/Device'
import DevicePort from 'App/Models/DevicePort'
import DevicePortLog from "App/Models/DevicePortLog";
import DeviceLog from "App/Models/DeviceLog";
import RssiDeviceLog from "App/Models/RssiDeviceLog";

export default class DevicePortsController {

  public async update ({request}: HttpContextContract) {

    // console.log({
    //   request: {
    //     url: 'POST ' + request.url(),
    //     params: request.params(),
    //     body: request.body(),
    //   }
    // });

    const debug = {
      logs: {},
      warnings: [],
    };

    const rebootedValues = ['true', 'false', 'force'];
    const stateValues = [0, 1];

    const id : string   = request.params().id
    const code : string = request.params().code
    const port : string = request.params().port

    const device = await Device.query().where('code', code).preload('gateway', (gwQuery) => {
      gwQuery.where('code', id)
    }).firstOrFail()

    if(rebootedValues.indexOf(request.body().rebooted) >= 0)
      device.rebooted = request.body().rebooted;
    else {
      debug.warnings.push(
        // @ts-ignore
        'Wrong value of field "rebooted"! Value:"'+request.body().rebooted+'" not in: ('+rebootedValues.join(',')+')'
      );
    }

    if(device.rssi != request.body().rssi) {
      device.rssi = request.body().rssi;

      const rssiLog = new RssiDeviceLog()
      rssiLog.rssi = device.rssi
      rssiLog.deviceId = device.id
      await rssiLog.save()

      // @ts-ignore
      debug.logs.rssi = rssiLog.toObject()
    }

    await device.save();

    const devicePort = await DevicePort.query().where('device_id', device.id).where('port', port).firstOrFail()

    if(stateValues.indexOf(request.body().state) >= 0)
      devicePort.state = request.body().state;
    else {
      debug.warnings.push(
        // @ts-ignore
        'Wrong value of field "state"! Value:"'+request.body().state+'" not in: ('+stateValues.join(',')+')'
      );
    }

    if(request.body().manual)
      devicePort.manual = request.body().manual;
    await devicePort.save()


    if(request.body().manual) {
      const dpLog = new DevicePortLog()
      dpLog.port = devicePort.port
      dpLog.state = devicePort.state
      dpLog.manual = devicePort.manual
      dpLog.devicePortId = devicePort.id
      await dpLog.save()

      // @ts-ignore
      debug.logs.devicePort = dpLog.toObject()
    }

    if(request.body().rebooted != "false") {
      const dLog = new DeviceLog()
      dLog.rebooted = device.rebooted
      dLog.deviceId = device.id
      await dLog.save()

      // @ts-ignore
      debug.logs.Device = dLog.toObject()
    }


    // console.log({debug})
    return {
      data: devicePort,
      warnings: debug.warnings,
      errors: []
    };
  }

  public async store ({request}: HttpContextContract) {
    const devicePort = new DevicePort()
    devicePort.fill(Object.assign(devicePort.$attributes, request.body()));
    return await devicePort.save()
  }

  public async destroy ({request}: HttpContextContract) {
    const id : string   = request.params().id
    const devicePort = await DevicePort.findOrFail(id)
    return await devicePort.delete()
  }
}
