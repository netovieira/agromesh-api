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
  return { agro: 'mesh' }
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
  Route.post(':id/device/:code/:port', 'DevicePortController.update')
}).prefix('iot')

//FOR APPLICATION
Route.group(() => {
  Route.get('control', 'ControlController.index')
  Route.put('control/:id', 'ControlController.update')
  Route.resource('gateway', 'GatewayController').apiOnly()
  Route.resource('device', 'DeviceController').apiOnly().except(['index'])
  Route.resource('device-port', 'DevicePortController').apiOnly().except(['index', 'update'])
})
  .middleware('auth')
  .prefix('api')


// WORKAROUND SEEDER
Route.get('seed', async () => {

  const user = new User()

  user.name = 'Paulo Nahes'
  user.email = 'paulo@nahes.com'
  user.password = '123456'
  await user.save()

  const gateway = new Gateway()

  gateway.userId = user.id
  gateway.name = 'gw1'
  gateway.code = '579d54'
  gateway.rebooted = 'false'
  await gateway.save()

  let device = new Device()

  device.code = 'ab'
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

  device.code = 'ac'
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

  return gateway

})
