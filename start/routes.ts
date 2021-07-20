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
// import Device from 'App/Models/Device'
// import DevicePort from 'App/Models/DevicePort'
// import Gateway from 'App/Models/Gateway'
// import User from 'App/Models/User'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.post('login', async ({ auth, request }) => {
  const email = request.input('email')
  const password = request.input('password')

  return await auth.use('api').attempt(email, password)
})

Route.post('logout', async ({ auth }) => {
  await auth.use('api').logout()
  return { success: true }
})


Route.get('gateway/:id/devices', 'DeviceController.index')
Route.post('gateway/:id/device/:code', 'DeviceController.update')
Route.post('gateway/:id/device/:code/:port', 'DevicePortController.update')

Route.resource('well', 'WellController').apiOnly()

// Route.get('mock', async () => {
  
//   const user = new User()

//   user.name = 'Anthero Vieira Neto'
//   user.email = 'anthero@vieira.com'
//   user.password = '123456'
//   await user.save()

//   const gateway = new Gateway()

//   gateway.userId = user.id
//   gateway.name = 'gw1'
//   await gateway.save()

//   let device = new Device()
  
//   device.code = 'aa'
//   device.rebooted = false
//   device.gatewayId = gateway.id
//   await device.save()

//   let devicePort = new DevicePort()
//   devicePort.port = '2'
//   devicePort.state = true
//   devicePort.manual = false
//   device.gatewayId = gateway.id
//   await devicePort.save()

//   devicePort = new DevicePort()
//   devicePort.port = '4'
//   devicePort.state = true
//   devicePort.manual = false
//   devicePort.deviceId = device.id
//   await devicePort.save()

//   device = new Device()
  
//   device.code = 'ab'
//   device.rebooted = false
//   device.gatewayId = gateway.id
//   await device.save()

//   devicePort = new DevicePort()
//   devicePort.port = '2'
//   devicePort.state = true
//   devicePort.manual = false
//   devicePort.deviceId = device.id 
//   await devicePort.save()
  
//   devicePort = new DevicePort()
//   devicePort.port = '4'
//   devicePort.state = true
//   devicePort.manual = false
//   devicePort.deviceId = device.id
//   await devicePort.save()

//   return gateway

// })