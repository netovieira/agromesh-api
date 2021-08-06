import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from "App/Models/Task";
import {DateTime, Duration, Settings} from "luxon";

export default class TaskController {

  public async checkIfUpdate ({auth, request}: HttpContextContract) {

    const debug = {
      url: 'GET ' + request.url(),
      params: request.params(),
      body: request.body()
    };

    console.log(debug)

    const time = Number(request.params().time)
    const dateTime = DateTime.fromMillis(time);


    const tasks = await Task
      .query()
      .where('user_id', auth.user?.id || -1);

    let _changes = 0;
    tasks.forEach((_task: Task) => {
      if(_task.updatedAt.diff(dateTime) > Duration.fromMillis(0)) _changes++
    })
    console.log({response: {datetime: dateTime.toString(), time: Settings.now(), changes: _changes}})
    return {time: Settings.now(), changes: _changes}
  }

  public async index ({auth}: HttpContextContract) {
    const tasks = await Task
      .query()
      .where('user_id', auth.user?.id || -1)
      .preload('devicePort', (q) => {
        return q.preload('device')
      });

    return tasks.map((_task : Task) => {
      const _device = _task.devicePort.device
      delete _task.$preloaded.devicePort;
      return {
        ..._task.toJSON(),
        device: _device.toJSON()
      }
    })
  }

  public async store ({auth, request}: HttpContextContract) {
    const _task = new Task()
    return this.save(_task, auth, request)
  }

  public async save (_task: Task, auth, request) {
    delete request.body().device;
    _task.fill(Object.assign(_task.$attributes, request.body()));
    _task.userId = auth.user?.id || -1;
    await _task.save()
    await _task.load('devicePort')
    await _task.devicePort.load('device')
    const _device = await _task.devicePort.device
    delete _task.$preloaded.devicePort;
    return {
      ..._task.toJSON(),
      device: _device.toJSON()
    }
  }

  public async update ({auth, request}: HttpContextContract) {
    const id : string   = request.params().id
    const _task = await Task.findOrFail(id)
    return this.save(_task, auth, request)
  }

  public async destroy ({request}: HttpContextContract) {
    const id : string   = request.params().id
    const task = await Task.findOrFail(id)
    return await task.delete()
  }
}
