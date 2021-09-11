/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Device from 'App/Models/Device'
import DevicePort from 'App/Models/DevicePort'
import Gateway from 'App/Models/Gateway'
import User from 'App/Models/User'

Route.get('/', async () => {
  return {
    agro: 'mesh',
  }
})


//FOR AUTHENTICATION
Route.group(() => {
  Route.post('login', async ({ auth, request }) => {
    console.log({
      request: {
        url: 'POST ' + request.url(),
        params: request.params(),
        body: request.body(),
      }
    });
    const email = request.input('email')
    const password = request.input('password')
    return await auth.use('api').attempt(email, password)
  })

  Route.post('logout', async ({ auth }) => {

    await auth.use('api').logout()
    return { success: true }
  })

  Route.group(() => {
    Route.get('user', async ({ auth }) => {
      return auth.use('api').user;
    })

    Route.post('refresh', async ({ auth }) => {
      return auth.use('api').revoke();
    })
  }).middleware('auth')

}).prefix('auth')

//FOR GATEWAY
Route.group(() => {
  Route.get(':id/devices', 'DeviceController.index')
  Route.post(':id', 'GatewayController.update')
  Route.post(':id/device/:code/:port', 'DevicePortController.update')
}).prefix('iot')

//FOR APPLICATION
Route.group(() => {
  Route.get('control', 'ControlController.index')
  Route.put('control/:id', 'ControlController.update')
  Route.get('control/check-updates/:time', 'ControlController.checkIfUpdate')

  Route.resource('task', 'TaskController').apiOnly()
  Route.get('task/check-updates/:time', 'TaskController.checkIfUpdate')

  Route.resource('gateway', 'GatewayController').apiOnly()
  Route.resource('device', 'DeviceController').apiOnly().except(['index'])
  Route.resource('device-port', 'DevicePortController').apiOnly().except(['index', 'update'])
  Route.resource('mobile-device', 'MobileDeviceController').apiOnly()
})
  .middleware('auth')
  .prefix('api')

// WORKAROUND SEEDER
// Route.get('send-push', async () => {
//   Fcm.send( 'Cadê o Poço 1? 🤔', 'Perdemos a comunicação com o Poço 1! 😰', await User.findOrFail(2));
//   Fcm.send( 'Ufa! Encontramos o Poço 1 🙏', 'A comunicação com o Poço 1 foi restabelecida! 🤩', await User.findOrFail(2));
//   Fcm.send( 'Alguem ligou o Poço 1 👀', 'O Poço 1 foi ligado manualmente!', await User.findOrFail(2));
//   Fcm.send( 'Alguem desligou o Poço 1 👀', 'O Poço 1 foi desligado manualmente!', await User.findOrFail(2));
// })

Route.get('test-seed', async () => {

  const user = new User()

  user.name = 'Testes'
  user.email = 'testes@agromesh.com.br'
  user.password = '123456'
  await user.save()

  const gateway = new Gateway()

  gateway.userId = user.id
  gateway.name = 'test-gw'
  gateway.code = 'GWTEST01'
  gateway.rebooted = 'false'
  await gateway.save()

  let device = new Device()

  device.code = 'a1'
  device.name = 'Poço 1'
  device.type = 'Poço de irrigação'
  device.rebooted = "false"
  device.gatewayId = gateway.id
  await device.save()

  let devicePort = new DevicePort()
  devicePort.port = 2
  devicePort.state = true
  devicePort.manual = false
  devicePort.deviceId = device.id
  await devicePort.save()

  device = new Device()

  device.code = 'a2'
  device.name = 'Poço 2'
  device.type = 'Poço de irrigação'
  device.rebooted = "false"
  device.gatewayId = gateway.id
  await device.save()

  devicePort = new DevicePort()
  devicePort.port = 2
  devicePort.state = true
  devicePort.manual = false
  devicePort.deviceId = device.id
  await devicePort.save()

  device = new Device()

  device.code = 'a3'
  device.name = 'Poço 3'
  device.type = 'Poço de irrigação'
  device.rebooted = "false"
  device.gatewayId = gateway.id
  await device.save()

  devicePort = new DevicePort()
  devicePort.port = 2
  devicePort.state = true
  devicePort.manual = false
  devicePort.deviceId = device.id
  await devicePort.save()

  device = new Device()

  device.code = 'a4'
  device.name = 'Poço 4'
  device.type = 'Poço de irrigação'
  device.rebooted = "false"
  device.gatewayId = gateway.id
  await device.save()

  devicePort = new DevicePort()
  devicePort.port = 2
  devicePort.state = true
  devicePort.manual = false
  devicePort.deviceId = device.id
  await devicePort.save()

  device = new Device()

  device.code = 'a5'
  device.name = 'Poço 5'
  device.type = 'Poço de irrigação'
  device.rebooted = "false"
  device.gatewayId = gateway.id
  await device.save()

  devicePort = new DevicePort()
  devicePort.port = 2
  devicePort.state = true
  devicePort.manual = false
  devicePort.deviceId = device.id
  await devicePort.save()

  device = new Device()

  device.code = 'a6'
  device.name = 'Poço 6'
  device.type = 'Poço de irrigação'
  device.rebooted = "false"
  device.gatewayId = gateway.id
  await device.save()

  devicePort = new DevicePort()
  devicePort.port = 2
  devicePort.state = true
  devicePort.manual = false
  devicePort.deviceId = device.id
  await devicePort.save()

  device = new Device()

  device.code = 'a7'
  device.name = 'Poço 7'
  device.type = 'Poço de irrigação'
  device.rebooted = "false"
  device.gatewayId = gateway.id
  await device.save()

  devicePort = new DevicePort()
  devicePort.port = 2
  devicePort.state = true
  devicePort.manual = false
  devicePort.deviceId = device.id
  await devicePort.save()

  device = new Device()

  device.code = 'a8'
  device.name = 'Poço 8'
  device.type = 'Poço de irrigação'
  device.rebooted = "false"
  device.gatewayId = gateway.id
  await device.save()

  devicePort = new DevicePort()
  devicePort.port = 2
  devicePort.state = true
  devicePort.manual = false
  devicePort.deviceId = device.id
  await devicePort.save()

  device = new Device()

  device.code = 'a9'
  device.name = 'Poço 9'
  device.type = 'Poço de irrigação'
  device.rebooted = "false"
  device.gatewayId = gateway.id
  await device.save()

  devicePort = new DevicePort()
  devicePort.port = 2
  devicePort.state = true
  devicePort.manual = false
  devicePort.deviceId = device.id
  await devicePort.save()

  device = new Device()

  device.code = 'aa'
  device.name = 'Poço 10'
  device.type = 'Poço de irrigação'
  device.rebooted = "false"
  device.gatewayId = gateway.id
  await device.save()

  devicePort = new DevicePort()
  devicePort.port = 2
  devicePort.state = true
  devicePort.manual = false
  devicePort.deviceId = device.id
  await devicePort.save()

  return gateway

})
